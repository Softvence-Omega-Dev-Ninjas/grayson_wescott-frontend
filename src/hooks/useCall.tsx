/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useCall.tsx
'use client';

import { EventsEnum } from '@/enum/events.enum';
import { useSocket } from '@/hooks/useSocket';
import { CallParticipant, ChatCall } from '@/types/chat.types';
import { useEffect, useRef, useState } from 'react';

type CallType = 'AUDIO' | 'VIDEO';
type CallStatus = 'IDLE' | 'CALLING' | 'INCOMING' | 'ONGOING' | 'ENDED';

export function useCall() {
  const { socket, currentUser, currentConversationId } = useSocket();
  const [callState, setCallState] = useState<CallStatus>('IDLE');
  const [currentCall, setCurrentCall] = useState<ChatCall | null>(null);
  const [incomingFrom, setIncomingFrom] = useState<string | null>(null);

  // media
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamsRef = useRef<Map<string, MediaStream>>(new Map());
  const [localStreamReady, setLocalStreamReady] = useState(false);

  // RTCPeerConnections (one per remote participant)
  const pcsRef = useRef<Map<string, RTCPeerConnection>>(new Map());

  // misc UI state
  const [muted, setMuted] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const pcConfig: RTCConfiguration = {
    iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
  };

  // helper: ensure local media
  const ensureLocalMedia = async (type: CallType) => {
    if (localStreamRef.current) return localStreamRef.current;
    const constraints =
      type === 'VIDEO'
        ? { audio: true, video: { width: 1280, height: 720 } }
        : { audio: true, video: false };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    localStreamRef.current = stream;
    setLocalStreamReady(true);
    // set initial states
    setMuted(stream.getAudioTracks().every((t) => !t.enabled));
    setVideoEnabled(!!stream.getVideoTracks().length);
    return stream;
  };

  // helper: create/get peer connection for remote user
  const getOrCreatePC = (remoteUserId: string, type: CallType) => {
    const existing = pcsRef.current.get(remoteUserId);
    if (existing) return existing;

    const pc = new RTCPeerConnection(pcConfig);

    // attach local tracks (if available)
    const local = localStreamRef.current;
    if (local) {
      for (const track of local.getTracks()) {
        pc.addTrack(track, local);
      }
    }

    // send ICE candidates to server
    pc.onicecandidate = (ev) => {
      if (!ev.candidate) return;
      if (!socket || !currentCall) return;
      socket.emit(EventsEnum.RTC_ICE_CANDIDATE, {
        callId: currentCall.id,
        candidate: ev.candidate.candidate,
        sdpMid: ev.candidate.sdpMid,
        sdpMLineIndex: ev.candidate.sdpMLineIndex,
      });
    };

    // remote stream handling
    const remoteStream = new MediaStream();
    pc.ontrack = (ev) => {
      if (ev.streams?.[0]) {
        ev.streams[0].getTracks().forEach((t) => remoteStream.addTrack(t));
      } else if (ev.streams.length === 0 && ev.track) {
        remoteStream.addTrack(ev.track);
      }

      remoteStreamsRef.current.set(remoteUserId, remoteStream);
      // trigger re-render
      setCallState((prevState) => {
        // update the state based on the previous state
        if (prevState === 'ONGOING') {
          return 'ENDED';
        } else {
          return prevState;
        }
      });
    };

    pc.onconnectionstatechange = () => {
      // optional logging / state transitions
      console.log('PC state', remoteUserId, pc.connectionState);
    };

    pcsRef.current.set(remoteUserId, pc);
    return pc;
  };

  // create offer for a remote peer (caller/joiner)
  const createOfferFor = async (remoteUserId: string, type: CallType) => {
    if (!currentCall || !socket) return;
    const pc = getOrCreatePC(remoteUserId, type);

    // ensure local tracks present on pc (if local stream arrived after pc creation)
    const local = localStreamRef.current;
    if (local) {
      const senders = pc.getSenders();
      for (const track of local.getTracks()) {
        if (!senders.find((s) => s.track === track)) {
          pc.addTrack(track, local);
        }
      }
    }

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit(EventsEnum.RTC_OFFER, {
      callId: currentCall.id,
      sdp: offer.sdp,
    });
  };

  // handle incoming signalling
  useEffect(() => {
    if (!socket) return;

    // incoming call
    const onIncoming = (payload: any) => {
      const data: ChatCall = payload.data ?? payload;
      // If it's our own initiated call, server might return it - treat accordingly
      setCurrentCall(data);
      setCallState('INCOMING');
      setIncomingFrom(data.initiatorId);
    };

    // someone accepted
    const onAccept = (payload: any) => {
      const { callId, userId } = payload.data ?? payload;
      if (!currentCall || callId !== currentCall.id) return;
      // if we're the initiator and someone accepted -> call becomes ONGOING
      setCallState('ONGOING');
    };

    // someone rejected
    const onReject = (payload: any) => {
      const { callId, userId } = payload.data ?? payload;
      // if call ended by rejection & no active participants, server will send CALL_END or CALL_MISSED
    };

    // call join/leave/end/missed
    const onJoin = (payload: any) => {
      const { callId, userId } = payload.data ?? payload;
      if (!currentCall || callId !== currentCall.id) return;
      // add participant placeholder
      setCallState('ONGOING');
    };
    const onLeave = (payload: any) => {
      const { callId, userId } = payload.data ?? payload;
      if (!currentCall || callId !== currentCall.id) return;
      // remove remote stream if any and possibly end if we're alone
      remoteStreamsRef.current.delete(userId);
      const pc = pcsRef.current.get(userId);
      if (pc) {
        pc.getSenders().forEach((s) => {
          try {
            pc.removeTrack(s);
          } catch {}
        });
        pc.close();
        pcsRef.current.delete(userId);
      }
      // trigger rerender
      setCallState((s) => (s === 'ONGOING' ? 'ONGOING' : s));
    };
    const onEnd = (payload: any) => {
      const { callId } = payload.data ?? payload;
      if (!currentCall || callId !== currentCall.id) return;
      // cleanup everything
      cleanupCall();
      setCallState('ENDED');
    };
    const onMissed = (payload: any) => {
      const { callId } = payload.data ?? payload;
      if (!currentCall || callId !== currentCall.id) return;
      cleanupCall();
      setCallState('ENDED');
    };

    // signalling
    const onOffer = async (payload: any) => {
      const data = payload.data ?? payload;
      const callId = data.callId;
      const from = data.from;
      const sdp = data.sdp;
      if (!currentCall || callId !== currentCall.id) {
        // In some flows, the client may get an offer for a call it isn't tracking yet.
        // If callId unknown but it's for our conversation, you could fetch call info.
        return;
      }

      // ensure local media
      await ensureLocalMedia(currentCall.callType as CallType);

      // get or create pc for "from"
      const pc = getOrCreatePC(from, currentCall.callType as CallType);
      await pc.setRemoteDescription({ type: 'offer', sdp });
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // send answer
      socket.emit(EventsEnum.RTC_ANSWER, {
        callId,
        sdp: answer.sdp,
      });
    };

    const onAnswer = async (payload: any) => {
      const data = payload.data ?? payload;
      const callId = data.callId;
      const from = data.from;
      const sdp = data.sdp;
      if (!currentCall || callId !== currentCall.id) return;
      const pc = pcsRef.current.get(from);
      if (!pc) return;
      await pc.setRemoteDescription({ type: 'answer', sdp });
    };

    const onCandidate = async (payload: any) => {
      const data = payload.data ?? payload;
      const callId = data.callId;
      const from = data.from;
      const candidate = data.candidate;
      const sdpMid = data.sdpMid;
      const sdpMLineIndex = data.sdpMLineIndex;
      if (!currentCall || callId !== currentCall.id) return;

      const pc = pcsRef.current.get(from);
      if (!pc) return;
      try {
        await pc.addIceCandidate({
          candidate,
          sdpMid,
          sdpMLineIndex,
        } as any);
      } catch (err) {
        // ignore
      }
    };

    socket.on(EventsEnum.CALL_INCOMING, onIncoming);
    socket.on(EventsEnum.CALL_ACCEPT, onAccept);
    socket.on(EventsEnum.CALL_REJECT, onReject);
    socket.on(EventsEnum.CALL_JOIN, onJoin);
    socket.on(EventsEnum.CALL_LEAVE, onLeave);
    socket.on(EventsEnum.CALL_END, onEnd);
    socket.on(EventsEnum.CALL_MISSED, onMissed);

    socket.on(EventsEnum.RTC_OFFER, onOffer);
    socket.on(EventsEnum.RTC_ANSWER, onAnswer);
    socket.on(EventsEnum.RTC_ICE_CANDIDATE, onCandidate);

    return () => {
      socket.off(EventsEnum.CALL_INCOMING, onIncoming);
      socket.off(EventsEnum.CALL_ACCEPT, onAccept);
      socket.off(EventsEnum.CALL_REJECT, onReject);
      socket.off(EventsEnum.CALL_JOIN, onJoin);
      socket.off(EventsEnum.CALL_LEAVE, onLeave);
      socket.off(EventsEnum.CALL_END, onEnd);
      socket.off(EventsEnum.CALL_MISSED, onMissed);

      socket.off(EventsEnum.RTC_OFFER, onOffer);
      socket.off(EventsEnum.RTC_ANSWER, onAnswer);
      socket.off(EventsEnum.RTC_ICE_CANDIDATE, onCandidate);
    };
  }, [socket, currentCall]);

  // cleanup helper
  const cleanupCall = () => {
    // stop local stream
    const local = localStreamRef.current;
    if (local) {
      local.getTracks().forEach((t) => {
        try {
          t.stop();
        } catch {}
      });
    }
    localStreamRef.current = null;
    setLocalStreamReady(false);

    // close peer connections
    pcsRef.current.forEach((pc) => {
      try {
        pc.close();
      } catch {}
    });
    pcsRef.current.clear();
    remoteStreamsRef.current.clear();

    setCurrentCall(null);
    setIncomingFrom(null);
    setMuted(false);
    setVideoEnabled(true);
  };

  // public actions: initiate, accept, reject, leave, end, toggle
  const initiateCall = async (type: CallType) => {
    if (!socket || !currentConversationId || !currentUser) return;
    setCallState('CALLING');

    socket.emit(
      EventsEnum.CALL_INITIATE,
      { conversationId: currentConversationId, type },
      // callback: server returns created call object
      (res: any) => {
        console.log('initiateCall', res);
        const call = res?.data ?? res;
        if (!call) {
          console.warn('No call returned from server');
          setCallState('IDLE');
          return;
        }
        setCurrentCall(call);
        // caller should prepare local media now
        ensureLocalMedia(call.type as CallType).then(async () => {
          // create peer connections for participants (server created participants)
          const others = (call.participants ?? []).filter(
            (p: CallParticipant) => p.id !== currentUser?.id,
          );
          // create pc for each other participant and create offers
          for (const p of others) {
            // create a pc and createOffer
            await createOfferFor(p.userId, call.type as CallType);
          }
          // state becomes ONGOING after first accept, but keep as CALLING for now
        });
      },
    );
  };

  const acceptCall = async (callId?: string) => {
    if (!socket || !currentCall) return;
    const cid = callId ?? currentCall.id;
    await ensureLocalMedia(currentCall.callType as CallType);
    socket.emit(EventsEnum.CALL_ACCEPT, { callId: cid });
    setCallState('ONGOING');

    // create offers to existing participants so they get our tracks
    const others = (currentCall.participants ?? []).filter(
      (p) => p.id !== currentUser?.id,
    );
    for (const p of others) {
      await createOfferFor(p.id, currentCall.callType as CallType);
    }
  };

  const rejectCall = (callId?: string) => {
    if (!socket || !currentCall) return;
    const cid = callId ?? currentCall.id;
    socket.emit(EventsEnum.CALL_REJECT, { callId: cid });
    cleanupCall();
    setCallState('IDLE');
  };

  const leaveCall = (callId?: string) => {
    if (!socket || !currentCall) return;
    const cid = callId ?? currentCall.id;
    socket.emit(EventsEnum.CALL_LEAVE, { callId: cid });
    cleanupCall();
    setCallState('IDLE');
  };

  const endCall = (callId?: string) => {
    if (!socket || !currentCall) return;
    const cid = callId ?? currentCall.id;
    socket.emit(EventsEnum.CALL_END, { callId: cid });
    cleanupCall();
    setCallState('IDLE');
  };

  const toggleMute = () => {
    const local = localStreamRef.current;
    if (!local) return;
    local.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
    setMuted(local.getAudioTracks().every((t) => !t.enabled));
  };

  const toggleVideo = () => {
    const local = localStreamRef.current;
    if (!local) return;
    local.getVideoTracks().forEach((t) => (t.enabled = !t.enabled));
    setVideoEnabled(local.getVideoTracks().some((t) => t.enabled));
  };

  // helpers to expose remote streams to UI
  const getRemoteStreams = () => {
    return Array.from(remoteStreamsRef.current.entries()).map(
      ([userId, stream]) => ({ userId, stream }),
    );
  };

  const getLocalStream = () => localStreamRef.current;

  return {
    callState,
    currentCall,
    incomingFrom,
    localStreamReady,
    getLocalStream,
    getRemoteStreams,
    initiateCall,
    acceptCall,
    rejectCall,
    leaveCall,
    endCall,
    toggleMute,
    toggleVideo,
    muted,
    videoEnabled,
  };
}
