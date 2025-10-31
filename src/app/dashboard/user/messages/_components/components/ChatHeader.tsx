/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { EventsEnum } from '@/enum/events.enum';
import { useSocket } from '@/hooks/useSocket';
import { CallType, Sender } from '@/types/chat.types';
import { ArrowLeft, Phone, Video, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import IncomingCallModal from './call/IncomingCallModal';
import OutgoingCallModal from './call/OutgoingCallModal';

export default function ChatHeader({
  onBack,
  participant,
}: {
  onBack: () => void;
  participant?: Sender;
}) {
  const { socket, currentUser, currentConversationId } = useSocket();

  if (!socket || !currentUser) return null;

  const [incomingCall, setIncomingCall] = useState<{
    visible: boolean;
    callerId: string;
    callId: string;
    callType: CallType;
  }>({ visible: false, callerId: '', callId: '', callType: CallType.AUDIO });

  // call session state
  const [callSession, setCallSession] = useState<{
    callId: string | null;
    status: 'IDLE' | 'RINGING' | 'ONGOING' | 'ENDED';
    type?: CallType;
    isInitiator?: boolean;
    remoteUserId?: string | null;
  }>({ callId: null, status: 'IDLE', isInitiator: false, remoteUserId: null });

  // media & RTCPeerConnections
  const localStreamRef = useRef<MediaStream | null>(null);
  const pcsRef = useRef<Map<string, RTCPeerConnection>>(new Map());
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const answeringRef = useRef<Map<string, boolean>>(new Map());
  const pendingAnswersRef = useRef<Map<string, any>>(new Map());
  const pendingCandidatesRef = useRef<Map<string, any[]>>(new Map());

  const waitForLocalOffer = (pc: RTCPeerConnection, timeout = 3000) =>
    new Promise<void>((resolve, reject) => {
      if (!pc) return reject(new Error('no-pc'));
      const okStates = ['have-local-offer', 'have-local-pranswer'];
      if (okStates.includes(pc.signalingState)) return resolve();

      const start = Date.now();
      const int = setInterval(() => {
        if (okStates.includes(pc.signalingState)) {
          clearInterval(int);
          return resolve();
        }
        if (Date.now() - start > timeout) {
          clearInterval(int);
          return reject(new Error('waitForLocalOffer timeout'));
        }
      }, 50);
    });

  /** Try to apply any pending answers/candidates for a remote */
  const tryApplyPendingFor = async (from: string) => {
    const pc = pcsRef.current.get(from);
    if (!pc) return;

    // apply answer if pending
    const pendingAnswer = pendingAnswersRef.current.get(from);
    if (pendingAnswer) {
      try {
        await waitForLocalOffer(pc, 3000);
        await pc.setRemoteDescription({
          type: 'answer',
          sdp: pendingAnswer.sdp,
        });
        pendingAnswersRef.current.delete(from);
        console.log('Applied queued remote answer for', from);
      } catch (err) {
        console.warn('Could not apply queued answer for', from, err);
      }
    }

    // apply any pending ice candidates
    const cands = pendingCandidatesRef.current.get(from) || [];
    if (cands.length) {
      for (const c of cands) {
        try {
          await pc.addIceCandidate(c as any);
        } catch (err) {
          console.warn('Failed to add queued candidate', err);
        }
      }
      pendingCandidatesRef.current.delete(from);
    }
  };

  // small helper: create/get peer connection for a remote user
  const createPeerConnection = (remoteUserId: string) => {
    const existing = pcsRef.current.get(remoteUserId);
    if (existing) return existing;

    const config: RTCConfiguration = {
      iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
    };

    const pc = new RTCPeerConnection(config);

    // attach local tracks
    const local = localStreamRef.current;
    if (local) {
      for (const track of local.getTracks()) {
        pc.addTrack(track, local);
      }
    }

    // send ICE candidates to server
    pc.onicecandidate = (ev) => {
      if (!ev.candidate || !socket || !callSession.callId) return;
      try {
        socket.emit(EventsEnum.RTC_ICE_CANDIDATE, {
          callId: callSession.callId,
          candidate: ev.candidate.candidate,
          sdpMid: ev.candidate.sdpMid,
          sdpMLineIndex: ev.candidate.sdpMLineIndex,
        });
      } catch (err) {
        console.warn('Failed to emit ICE candidate', err);
      }
    };

    // attach remote stream
    const remoteStream = new MediaStream();
    pc.ontrack = (ev) => {
      // some browsers provide ev.streams
      if (ev.streams && ev.streams[0]) {
        ev.streams[0].getTracks().forEach((t) => remoteStream.addTrack(t));
      } else if (ev.track) {
        remoteStream.addTrack(ev.track);
      }

      // attach to remote video element
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    };

    pcsRef.current.set(remoteUserId, pc);
    return pc;
  };

  // prepare local media (audio/video)
  const ensureLocalStream = async (type: CallType) => {
    if (localStreamRef.current) return localStreamRef.current;
    try {
      const constraints =
        type === CallType.VIDEO
          ? { audio: true, video: { width: 640, height: 480 } }
          : { audio: true, video: false };
      const s = await navigator.mediaDevices.getUserMedia(constraints as any);
      localStreamRef.current = s;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = s;
        localVideoRef.current.muted = true;
        try {
          await localVideoRef.current.play();
        } catch {}
      }
      return s;
    } catch (err) {
      console.error('getUserMedia error', err);
      throw err;
    }
  };

  // cleanup call resources
  const cleanupCall = () => {
    // stop local tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => {
        try {
          t.stop();
        } catch {}
      });
      localStreamRef.current = null;
    }

    // close peer connections
    pcsRef.current.forEach((pc) => {
      try {
        pc.close();
      } catch {}
    });
    pcsRef.current.clear();

    // reset video src
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    setCallSession({
      callId: null,
      status: 'IDLE',
      isInitiator: false,
      remoteUserId: null,
    });
  };

  // create offer to remote participant (initiator side)
  const createAndSendOffer = async (remoteUserId: string) => {
    if (!callSession.callId) return;
    const pc = createPeerConnection(remoteUserId);
    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket?.emit(EventsEnum.RTC_OFFER, {
        callId: callSession.callId,
        sdp: offer.sdp,
      });
    } catch (err) {
      console.error('Failed to create/send offer', err);
    }
  };

  // handle incoming socket events
  useEffect(() => {
    if (!socket) return;

    const onIncoming = (payload: any) => {
      console.log('📥 CALL_INCOMING', payload);
      const data = payload.data ?? payload;
      const initiatorId = data?.initiatorId;
      if (!initiatorId) return;

      if (initiatorId !== currentUser?.id) {
        setIncomingCall({
          visible: true,
          callerId: data?.initiatorId,
          callId: data?.id,
          callType: data?.type,
        });
      }
      setCallSession({
        callId: data?.id,
        status: 'RINGING',
        type: data?.type,
        isInitiator: false,
        remoteUserId: data?.initiatorId,
      });
    };

    const onCallAccept = (payload: any) => {
      const data = payload.data ?? payload;
      console.log('📤 CALL_ACCEPT received', data);
      const call = data?.call ?? data;
      if (!call || call.id !== callSession.callId) return;

      // call moved to ONGOING
      setCallSession((s) => ({ ...s, status: 'ONGOING', type: call.type }));

      // if we are initiator, start creating offers to others
      if (call.initiatorId === currentUser?.id) {
        // find remote participant
        const remote = (call.participants || []).find(
          (p: any) => p.userId !== currentUser?.id,
        );
        const remoteId = remote?.userId;
        if (remoteId) {
          // prepare local stream then create offer
          ensureLocalStream(call.type)
            .then(() => createAndSendOffer(remoteId))
            .catch((e) => console.error(e));
        }
      } else {
        // if we're not initiator (callee), prepare local stream to be ready to answer incoming offer
        ensureLocalStream(call.type).catch(() => {});
      }
    };

    const onCallReject = (payload: any) => {
      const data = payload.data ?? payload;
      console.log('📤 CALL_REJECT', data);
      // if our active call was rejected, cleanup
      if (data?.callId === callSession.callId) {
        cleanupCall();
      }
    };

    const onCallEnd = (payload: any) => {
      const data = payload.data ?? payload;
      console.log('📤 CALL_END', data);
      if (data?.callId === callSession.callId) {
        cleanupCall();
      }
    };

    const onOffer = async (payload: any) => {
      const data = payload.data ?? payload;
      const { callId, sdp, from } = data;
      if (callId !== callSession.callId) return;
      console.log('⤴️ RTC_OFFER received from', from);

      // simple per-peer lock to avoid concurrent answers
      if (answeringRef.current.get(from)) {
        console.warn('Already answering for', from);
        return;
      }
      answeringRef.current.set(from, true);

      try {
        const callType =
          callSession.type ?? (incomingCall.callType || CallType.AUDIO);
        await ensureLocalStream(callType!);

        const pc = createPeerConnection(from);

        console.log(
          'pc.signalingState before setRemoteDescription:',
          pc.signalingState,
        );

        // Use RTCSessionDescription for clarity
        const remoteDesc = new RTCSessionDescription({ type: 'offer', sdp });
        await pc.setRemoteDescription(remoteDesc);

        console.log(
          'pc.signalingState after setRemoteDescription:',
          pc.signalingState,
        );
        // expected: 'have-remote-offer' (or 'have-remote-pranswer' in some flows)
        if (
          !['have-remote-offer', 'have-remote-pranswer'].includes(
            pc.signalingState,
          )
        ) {
          console.warn(
            'Unexpected signalingState after setRemoteDescription:',
            pc.signalingState,
          );
          // bail out to avoid InvalidStateError
          return;
        }

        const answer = await pc.createAnswer();

        // OPTIONAL: log answer.sdp length to ensure it's valid
        console.log('Created answer, sdp length:', answer.sdp?.length ?? 0);

        await pc.setLocalDescription(answer); // this should succeed now
        // send answer
        socket.emit(EventsEnum.RTC_ANSWER, {
          callId,
          sdp: answer.sdp,
          to: from,
        });
      } catch (err) {
        console.error('Failed to handle offer', err);
        // helpful debug: print current pc state if available
        try {
          const pc = pcsRef.current.get(from);
          if (pc) {
            console.warn('pc.signalingState (error):', pc.signalingState);
            console.warn('pc.localDescription:', pc.localDescription);
            console.warn('pc.remoteDescription:', pc.remoteDescription);
          }
        } catch (error) {
          console.error('Failed to print pc state', error);
        }
      } finally {
        answeringRef.current.set(from, false);
      }
    };

    const onAnswer = async (payload: any) => {
      const data = payload.data ?? payload;
      const { callId, sdp, from } = data;
      if (callId !== callSession.callId) return;
      console.log('⤵️ RTC_ANSWER from', from);

      // find pc for that remote
      let pc = pcsRef.current.get(from);

      if (!pc) {
        // No pc found — this is a red flag (offer/answer routing mismatch).
        console.warn(
          'No PC when answer arrived for',
          from,
          ' — queueing answer and creating pc',
        );
        // create a pc so we can later try applying the answer (but we need a local offer to be set first).
        pc = createPeerConnection(from);
        // store answer for later
        pendingAnswersRef.current.set(from, { sdp });
        // also attempt to apply after a short delay to allow the local offer path to complete
        setTimeout(() => tryApplyPendingFor(from), 200);
        return;
      }

      try {
        // If pc is in stable state, the local offer probably wasn't set yet — queue.
        if (pc.signalingState === 'stable' || !pc.localDescription) {
          console.warn(
            'pc not ready to accept answer, queuing for',
            from,
            'state:',
            pc.signalingState,
          );
          pendingAnswersRef.current.set(from, { sdp });
          // try applying later when localDescription arrives or after short delay
          setTimeout(() => tryApplyPendingFor(from), 200);
          return;
        }

        await pc.setRemoteDescription({ type: 'answer', sdp });
        console.log('Applied remote answer for', from);
      } catch (err) {
        console.warn('Failed to set remote description (answer)', err);
        // queue as fallback
        pendingAnswersRef.current.set(from, { sdp });
        // diagnostic logging
        try {
          console.warn('pc.signalingState (error):', pc.signalingState);
          console.warn('pc.localDescription:', pc.localDescription);
          console.warn('pc.remoteDescription:', pc.remoteDescription);
        } catch (error) {
          console.error('Failed to print pc state', error);
        }
        // try again later
        setTimeout(() => tryApplyPendingFor(from), 300);
      }
    };

    const onCandidate = async (payload: any) => {
      const data = payload.data ?? payload;
      const { callId, candidate, sdpMid, sdpMLineIndex, from } = data;
      if (callId !== callSession.callId) return;
      const pc = pcsRef.current.get(from);
      const cand = { candidate, sdpMid, sdpMLineIndex };
      if (!pc) {
        // store candidate until pc is created
        const arr = pendingCandidatesRef.current.get(from) || [];
        arr.push(cand);
        pendingCandidatesRef.current.set(from, arr);
        return;
      }

      try {
        await pc.addIceCandidate(cand as any);
      } catch (err) {
        console.warn('Failed to add ice candidate', err);
        // if addIceCandidate fails, queue it for later
        const arr = pendingCandidatesRef.current.get(from) || [];
        arr.push(cand);
        pendingCandidatesRef.current.set(from, arr);
        // and try applying later
        setTimeout(() => tryApplyPendingFor(from), 200);
      }
    };

    socket.on(EventsEnum.CALL_INCOMING, onIncoming);
    socket.on(EventsEnum.CALL_ACCEPT, onCallAccept);
    socket.on(EventsEnum.CALL_REJECT, onCallReject);
    socket.on(EventsEnum.CALL_END, onCallEnd);

    socket.on(EventsEnum.RTC_OFFER, onOffer);
    socket.on(EventsEnum.RTC_ANSWER, onAnswer);
    socket.on(EventsEnum.RTC_ICE_CANDIDATE, onCandidate);

    return () => {
      socket.off(EventsEnum.CALL_INCOMING, onIncoming);
      socket.off(EventsEnum.CALL_ACCEPT, onCallAccept);
      socket.off(EventsEnum.CALL_REJECT, onCallReject);
      socket.off(EventsEnum.CALL_END, onCallEnd);

      socket.off(EventsEnum.RTC_OFFER, onOffer);
      socket.off(EventsEnum.RTC_ANSWER, onAnswer);
      socket.off(EventsEnum.RTC_ICE_CANDIDATE, onCandidate);
    };
  }, [socket, callSession.callId, callSession.type, incomingCall.callType]);

  /** Initiator: start call flow */
  const handleInitiateCall = (type: 'AUDIO' | 'VIDEO') => {
    if (!currentConversationId) return console.warn('No active conversation.');

    socket?.emit(
      EventsEnum.CALL_INITIATE,
      { conversationId: currentConversationId, type },
      (res: any) => {
        const call = res?.data ?? res;
        if (!call) return console.warn('No call returned');

        // determine remote participant (first other user)
        const remote = (call.participants || []).find(
          (p: any) => p.userId !== currentUser?.id,
        );
        const remoteId = remote?.userId ?? null;

        setCallSession({
          callId: call.id,
          status: 'RINGING',
          type: call.type,
          isInitiator: true,
          remoteUserId: remoteId,
        });

        // UI will show ring; actual offers will be created once CALL_ACCEPT arrives and server sets status ONGOING
        console.log('Call initiated', call.id);
      },
    );
  };

  /** Accept incoming call (callee) */
  const handleAccept = () => {
    if (!incomingCall.callId) return;
    console.log('✅ Accepting call', incomingCall.callId);
    socket.emit(
      EventsEnum.CALL_ACCEPT,
      { callId: incomingCall.callId },
      (res: any) => {
        console.log('CALL_ACCEPT callback', res);
      },
    );
    setIncomingCall({
      visible: false,
      callerId: '',
      callId: '',
      callType: CallType.AUDIO,
    });
    // we will prepare local media when CALL_ACCEPT event with ONGOING status arrives or when offer arrives
  };

  const handleReject = () => {
    if (!incomingCall.callId) return;
    console.log('❌ Rejecting', incomingCall.callId);
    socket?.emit(
      EventsEnum.CALL_REJECT,
      { callId: incomingCall.callId },
      (res: any) => {
        console.log('CALL_REJECT callback', res);
      },
    );
    setIncomingCall({
      visible: false,
      callerId: '',
      callId: '',
      callType: CallType.AUDIO,
    });
  };

  const handleEnd = () => {
    if (!callSession.callId) return;
    socket?.emit(
      EventsEnum.CALL_END,
      { callId: callSession.callId },
      (res: any) => {
        console.log('CALL_END', res);
      },
    );
    cleanupCall();
  };

  return (
    <>
      <div className="bg-[#151519] flex items-center justify-between p-4 border-b border-gray-700 rounded-t-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="lg:hidden text-white">
            <ArrowLeft size={20} />
          </button>

          <Image
            src={
              participant?.avatarUrl ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(participant?.name || 'Carbon Engines')}`
            }
            alt={participant?.name || 'Your Trainer'}
            width={44}
            height={44}
            className="rounded-full object-cover"
          />

          <div>
            <div className="font-semibold text-white">
              {participant?.name || 'Your Trainer'}
            </div>
            <div className="text-gray-400 text-sm">
              {participant?.email || 'Gym Support'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleInitiateCall('AUDIO')}
            className="text-gray-300 hover:text-white transition"
          >
            <Phone size={20} />
          </button>
          <button
            onClick={() => handleInitiateCall('VIDEO')}
            className="text-gray-300 hover:text-white transition"
          >
            <Video size={20} />
          </button>
        </div>
      </div>

      {/* out going call modal */}
      {callSession.status === 'RINGING' && (
        <OutgoingCallModal
          visible={callSession.status === 'RINGING'}
          callType={callSession.type}
          onEnd={handleEnd}
        />
      )}

      {/* Incoming Call Modal */}
      {incomingCall.visible && callSession.status === 'RINGING' && (
        <IncomingCallModal
          visible={incomingCall.visible}
          callerId={incomingCall.callerId}
          callType={incomingCall.callType}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}

      {/* Simple in-call mini UI */}
      {callSession.status === 'ONGOING' && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#0b0b0b]/90 p-3 rounded shadow-lg text-white w-[340px]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center">
                CE
              </div>
              <div>
                <div className="font-semibold">{callSession.type} call</div>
                <div className="text-xs text-gray-400">
                  Call ID: {callSession.callId}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleEnd}
                className="bg-red-600 px-3 py-1 rounded text-sm"
              >
                <X size={16} /> End
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="w-full h-28 bg-black rounded overflow-hidden flex items-center justify-center">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-28 bg-black rounded overflow-hidden flex items-center justify-center">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
