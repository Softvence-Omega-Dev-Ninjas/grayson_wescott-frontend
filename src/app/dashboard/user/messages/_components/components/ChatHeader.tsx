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
  const remoteStreamsRef = useRef<Map<string, MediaStream>>(new Map());

  // ----------------- DEBUG CONSOLE -----------------
  const logger = {
    tag: 'ChatHeader',
    meta() {
      return {
        callId: callSession.callId ?? 'no-call',
        userId: currentUser?.id ?? 'anon',
      };
    },
    log(...args: any[]) {
      // use collapsed group for compactness
      console.groupCollapsed(`[${this.tag}] LOG`, this.meta());
      console.log(...args);
      console.groupEnd();
    },
    debug(...args: any[]) {
      console.groupCollapsed(`[${this.tag}] DEBUG`, this.meta());
      console.debug(...args);
      console.groupEnd();
    },
    warn(...args: any[]) {
      console.groupCollapsed(`[${this.tag}] WARN`, this.meta());
      console.warn(...args);
      console.groupEnd();
    },
    error(...args: any[]) {
      console.groupCollapsed(`[${this.tag}] ERROR`, this.meta());
      console.error(...args);
      console.groupEnd();
    },
  };

  // simple wait helper for local offer
  const waitForLocalOffer = (pc: RTCPeerConnection, timeout = 5000) =>
    new Promise<void>((resolve, reject) => {
      if (!pc) return reject(new Error('no-pc'));
      const okStates = ['have-local-offer', 'have-local-pranswer'];
      if (okStates.includes(pc.signalingState)) {
        logger.debug('PC already has local offer');
        return resolve();
      }

      const start = Date.now();
      const int = setInterval(() => {
        if (okStates.includes(pc.signalingState)) {
          clearInterval(int);
          logger.debug('PC reached local offer state');
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
    if (!pc) {
      logger.warn('tryApplyPending: no PC for', from);
      return;
    }

    // apply answer if pending
    const pendingAnswer = pendingAnswersRef.current.get(from);
    if (pendingAnswer) {
      try {
        logger.debug('Waiting for local offer before applying answer...');
        await waitForLocalOffer(pc, 5000);

        if (pc.signalingState !== 'have-local-offer') {
          logger.warn('PC not in correct state for answer:', pc.signalingState);
          return;
        }

        await pc.setRemoteDescription({
          type: 'answer',
          sdp: pendingAnswer.sdp,
        });
        pendingAnswersRef.current.delete(from);
        logger.log('Applied queued remote answer for', from);
      } catch (err) {
        logger.error('Could not apply queued answer for', from, err);
      }
    }

    // apply any pending ice candidates
    const cands = pendingCandidatesRef.current.get(from) || [];
    if (cands.length > 0) {
      logger.debug(`Applying ${cands.length} queued ICE candidates for`, from);
      for (const c of cands) {
        try {
          if (pc.remoteDescription) {
            await pc.addIceCandidate(c as any);
          } else {
            logger.warn('Skipping candidate - no remote description yet');
          }
        } catch (err) {
          logger.warn('Failed to add queued candidate', err);
        }
      }
      pendingCandidatesRef.current.delete(from);
      logger.log('Processed queued ICE candidates');
    }
  };

  // ----------------- Peer Connection -----------------
  const createPeerConnection = (remoteUserId: string) => {
    const existing = pcsRef.current.get(remoteUserId);
    if (existing) {
      logger.debug('Reusing existing PC for', remoteUserId);
      return existing;
    }

    logger.debug('Creating new RTCPeerConnection for', remoteUserId);

    const config: RTCConfiguration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    };

    const pc = new RTCPeerConnection(config);

    // attach local tracks
    const local = localStreamRef.current;
    if (local) {
      logger.debug(`Adding ${local.getTracks().length} local tracks to PC`);
      for (const track of local.getTracks()) {
        pc.addTrack(track, local);
      }
    } else {
      logger.warn('No local stream when creating PC');
    }

    // send ICE candidates to server
    pc.onicecandidate = (ev) => {
      if (!ev.candidate) {
        logger.debug('ICE gathering complete');
        return;
      }
      if (!socket || !callSession.callId) {
        logger.warn('Cannot send ICE candidate - no socket or callId');
        return;
      }

      logger.debug('Sending ICE candidate to', remoteUserId);
      try {
        socket.emit(EventsEnum.RTC_ICE_CANDIDATE, {
          callId: callSession.callId,
          candidate: ev.candidate.candidate,
          sdpMid: ev.candidate.sdpMid,
          sdpMLineIndex: ev.candidate.sdpMLineIndex,
          to: remoteUserId,
        });
      } catch (err) {
        logger.error('Failed to emit ICE candidate', err);
      }
    };

    // ICE connection state monitoring
    pc.oniceconnectionstatechange = () => {
      logger.debug(
        `ICE connection state for ${remoteUserId}:`,
        pc.iceConnectionState,
      );
      if (pc.iceConnectionState === 'failed') {
        logger.error('ICE connection failed for', remoteUserId);
      }
    };

    pc.onconnectionstatechange = () => {
      logger.debug(`Connection state for ${remoteUserId}:`, pc.connectionState);
    };

    // Create dedicated remote stream for this peer
    const remoteStream = new MediaStream();
    remoteStreamsRef.current.set(remoteUserId, remoteStream);

    pc.ontrack = (ev) => {
      logger.debug(
        `Received ${ev.track?.kind ?? 'track'} from ${remoteUserId}`,
      );

      if (ev.streams && ev.streams[0]) {
        logger.debug('Using track from ev.streams[0]');
        ev.streams[0].getTracks().forEach((track) => {
          if (!remoteStream.getTracks().find((t) => t.id === track.id)) {
            remoteStream.addTrack(track);
            logger.log(`Added ${track.kind} track to remote stream`);
          }
        });
      } else if (ev.track) {
        logger.debug('Using ev.track directly');
        if (!remoteStream.getTracks().find((t) => t.id === ev.track.id)) {
          remoteStream.addTrack(ev.track);
          logger.log(`Added ${ev.track.kind} track to remote stream`);
        }
      }

      if (
        remoteVideoRef.current &&
        remoteVideoRef.current.srcObject !== remoteStream
      ) {
        logger.debug('Attaching remote stream to video element');
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play().catch((err) => {
          logger.warn(
            'Autoplay failed:',
            err,
            'User interaction may be required',
          );
        });
      }
    };

    pcsRef.current.set(remoteUserId, pc);
    logger.log('PC created and stored for', remoteUserId);
    return pc;
  };

  // ----------------- Local media -----------------
  const ensureLocalStream = async (type: CallType) => {
    if (localStreamRef.current) {
      logger.debug('Reusing existing local stream');
      return localStreamRef.current;
    }

    logger.debug(`Requesting ${type} permissions...`);
    try {
      const constraints =
        type === CallType.VIDEO
          ? { audio: true, video: { width: 640, height: 480 } }
          : { audio: true, video: false };

      const stream = await navigator.mediaDevices.getUserMedia(
        constraints as any,
      );
      localStreamRef.current = stream;

      logger.log(`Got local stream with ${stream.getTracks().length} tracks`);
      stream.getTracks().forEach((track) => {
        logger.debug(`- ${track.kind}: ${track.label}`);
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.muted = true;
        await localVideoRef.current.play().catch((err) => {
          logger.warn('Local video autoplay issue:', err);
        });
      }

      return stream;
    } catch (err) {
      logger.error('getUserMedia error:', err);
      throw err;
    }
  };

  // cleanup call resources
  const cleanupCall = () => {
    logger.log('Cleaning up call resources');

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => {
        t.stop();
        logger.debug('Stopped', t.kind, 'track');
      });
      localStreamRef.current = null;
    }

    pcsRef.current.forEach((pc, userId) => {
      try {
        pc.close();
        logger.debug('Closed PC for', userId);
      } catch (err) {
        logger.error('Error closing PC:', err);
      }
    });
    pcsRef.current.clear();
    remoteStreamsRef.current.clear();

    pendingAnswersRef.current.clear();
    pendingCandidatesRef.current.clear();
    answeringRef.current.clear();

    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    setCallSession({
      callId: null,
      status: 'IDLE',
      isInitiator: false,
      remoteUserId: null,
    });

    logger.log('Cleanup complete');
  };

  // create offer to remote participant (initiator side)
  const createAndSendOffer = async (remoteUserId: string) => {
    if (!callSession.callId) {
      logger.error('No callId when creating offer');
      return;
    }

    logger.debug('Creating offer for', remoteUserId);
    const pc = createPeerConnection(remoteUserId);

    try {
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: callSession.type === CallType.VIDEO,
      });

      logger.debug('Created offer, setting local description');
      await pc.setLocalDescription(offer);
      logger.debug(
        'Local description set, signaling state:',
        pc.signalingState,
      );

      socket?.emit(EventsEnum.RTC_OFFER, {
        callId: callSession.callId,
        sdp: offer.sdp,
        from: currentUser?.id,
        to: remoteUserId,
      });
      logger.log('Offer sent to server');

      setTimeout(() => tryApplyPendingFor(remoteUserId), 100);
    } catch (err) {
      logger.error('Failed to create/send offer:', err);
    }
  };

  // ----------------- Socket event handlers -----------------
  useEffect(() => {
    if (!socket) return;

    // helper to normalize payloads coming from server
    const unwrap = (payload: any) =>
      payload?.data ?? payload?.payload ?? payload;

    const onIncoming = (payload: any) => {
      const data = unwrap(payload);
      logger.log('CALL_INCOMING', payload, data);
      // backend uses: successResponse({ call, from })
      const callObj = data?.call ?? data;
      const initiatorId =
        data?.from ?? callObj?.initiatorId ?? callObj?.initiator?.id;
      const callId = callObj?.id ?? data?.id;

      if (!callId || !initiatorId) {
        logger.warn('Malformed CALL_INCOMING payload', data);
        return;
      }

      // determine remote user id: if I'm the initiator, remote is other participant; otherwise remote is initiator
      const remoteUserId =
        initiatorId === currentUser?.id
          ? ((callObj?.participants || []).find(
              (p: any) => p.userId !== currentUser?.id,
            )?.userId ?? null)
          : initiatorId;

      setIncomingCall({
        visible: initiatorId === currentUser?.id ? false : true,
        callerId: initiatorId,
        callId,
        callType: callObj?.type ?? CallType.AUDIO,
      });

      setCallSession({
        callId,
        status: 'RINGING',
        type: callObj?.type ?? CallType.AUDIO,
        isInitiator: initiatorId === currentUser?.id,
        remoteUserId,
      });
    };

    const onCallAccept = async (payload: any) => {
      const data = unwrap(payload);
      logger.log('CALL_ACCEPT received', data);
      const call = data?.call ?? data;

      if (!call || call.id !== callSession.callId) {
        logger.warn(
          'CALL_ACCEPT for different call, ignoring',
          call?.id,
          callSession.callId,
        );
        return;
      }

      logger.log('Call moved to ONGOING');
      setCallSession((s) => ({ ...s, status: 'ONGOING', type: call.type }));

      try {
        await ensureLocalStream(call.type);
        logger.debug('Local stream ready');

        if (call.initiatorId === currentUser?.id) {
          // initiator: find remote and create offer
          const remote = (call.participants || []).find(
            (p: any) => p.userId !== currentUser?.id,
          );
          const remoteId = remote?.userId;
          if (remoteId) {
            logger.debug('Found remote participant:', remoteId);
            setCallSession((s) => ({ ...s, remoteUserId: remoteId }));
            await createAndSendOffer(remoteId);
          } else {
            logger.error('No remote participant found in ACCEPT payload');
          }
        } else {
          logger.debug('Receiver: waiting for offer from initiator');
        }
      } catch (err) {
        logger.error('Error in CALL_ACCEPT handler:', err);
      }
    };

    const onCallReject = (payload: any) => {
      const data = unwrap(payload);
      logger.log('CALL_REJECT', data);
      if (data?.callId === callSession.callId) {
        logger.log('My call was rejected, cleaning up');
        cleanupCall();
      }
    };

    const onCallEnd = (payload: any) => {
      const data = unwrap(payload);
      logger.log('CALL_END', data);
      if (data?.callId === callSession.callId) {
        logger.log('Call ended, cleaning up');
        cleanupCall();
      }
    };

    const onOffer = async (payload: any) => {
      const data = unwrap(payload);
      const callId = data?.callId ?? data?.id;
      const sdp = data?.sdp;
      const from = data?.from;

      if (callId !== callSession.callId) {
        logger.warn('Offer for different call, ignoring', callId);
        return;
      }

      logger.log('RTC_OFFER received from', from);

      if (answeringRef.current.get(from)) {
        logger.warn('Already answering for', from);
        return;
      }
      answeringRef.current.set(from, true);

      try {
        const callType =
          callSession.type ?? (incomingCall.callType || CallType.AUDIO);
        await ensureLocalStream(callType);

        const pc = createPeerConnection(from);
        logger.debug(
          'PC signaling state before setRemoteDescription:',
          pc.signalingState,
        );

        const remoteDesc = new RTCSessionDescription({ type: 'offer', sdp });
        await pc.setRemoteDescription(remoteDesc);
        logger.log('Remote description set, state:', pc.signalingState);

        const answer = await pc.createAnswer();
        logger.log('Created answer, SDP length:', answer.sdp?.length ?? 0);

        await pc.setLocalDescription(answer);
        logger.log('Local description (answer) set, state:', pc.signalingState);

        socket.emit(EventsEnum.RTC_ANSWER, {
          callId,
          sdp: answer.sdp,
          to: from,
          from: currentUser?.id,
        });
        logger.log('Answer sent to', from);
      } catch (err) {
        logger.error('Failed to handle offer:', err);
      } finally {
        answeringRef.current.set(from, false);
      }
    };

    const onAnswer = async (payload: any) => {
      const data = unwrap(payload);
      const callId = data?.callId ?? data?.id;
      const sdp = data?.sdp;
      const from = data?.from;

      if (callId !== callSession.callId) {
        logger.warn('Answer for different call, ignoring', callId);
        return;
      }

      logger.log('RTC_ANSWER from', from);

      const pc = pcsRef.current.get(from);

      if (!pc) {
        logger.warn('No PC when answer arrived for', from, '- queuing answer');
        pendingAnswersRef.current.set(from, { sdp });
        setTimeout(() => tryApplyPendingFor(from), 200);
        return;
      }

      try {
        logger.debug(
          'PC state:',
          pc.signalingState,
          'has localDesc:',
          !!pc.localDescription,
        );

        if (pc.signalingState === 'stable' || !pc.localDescription) {
          logger.warn(
            'PC not ready for answer, queuing. State:',
            pc.signalingState,
          );
          pendingAnswersRef.current.set(from, { sdp });
          setTimeout(() => tryApplyPendingFor(from), 200);
          return;
        }

        if (pc.signalingState === 'have-local-offer') {
          await pc.setRemoteDescription({ type: 'answer', sdp });
          logger.log('Applied remote answer for', from);
        } else {
          logger.warn(
            'Unexpected state when applying answer:',
            pc.signalingState,
          );
          pendingAnswersRef.current.set(from, { sdp });
          setTimeout(() => tryApplyPendingFor(from), 300);
        }
      } catch (err) {
        logger.error('Failed to set remote description (answer):', err);
        pendingAnswersRef.current.set(from, { sdp });
        setTimeout(() => tryApplyPendingFor(from), 300);
      }
    };

    const onCandidate = async (payload: any) => {
      const data = unwrap(payload);
      const callId = data?.callId;
      const { candidate, sdpMid, sdpMLineIndex, from } = data;

      if (callId !== callSession.callId) return;

      logger.debug('ICE candidate from', from);
      const pc = pcsRef.current.get(from);
      const cand = { candidate, sdpMid, sdpMLineIndex };

      if (!pc) {
        logger.warn('No PC yet, queuing candidate for', from);
        const arr = pendingCandidatesRef.current.get(from) || [];
        arr.push(cand);
        pendingCandidatesRef.current.set(from, arr);
        return;
      }

      try {
        if (!pc.remoteDescription) {
          logger.warn('No remote description yet, queuing candidate');
          const arr = pendingCandidatesRef.current.get(from) || [];
          arr.push(cand);
          pendingCandidatesRef.current.set(from, arr);
          return;
        }

        await pc.addIceCandidate(cand as any);
        logger.log('Added ICE candidate from', from);
      } catch (err) {
        logger.warn('Failed to add ICE candidate:', err);
        const arr = pendingCandidatesRef.current.get(from) || [];
        arr.push(cand);
        pendingCandidatesRef.current.set(from, arr);
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
  }, [
    socket,
    callSession.callId,
    callSession.type,
    incomingCall.callType,
    currentUser?.id,
  ]);

  // ----------------- Initiator: start call flow -----------------
  const handleInitiateCall = (type: 'AUDIO' | 'VIDEO') => {
    if (!currentConversationId) {
      logger.error('No active conversation');
      return;
    }

    logger.log(`Initiating ${type} call`);
    socket?.emit(
      EventsEnum.CALL_INITIATE,
      { conversationId: currentConversationId, type },
      (res: any) => {
        // unwrap successResponse variations
        const maybe = res?.data?.call ?? res?.data ?? res;
        const call = maybe?.call ?? maybe;
        if (!call) {
          logger.error('No call returned from CALL_INITIATE', res);
          return;
        }

        const remote = (call.participants || []).find(
          (p: any) => p.userId !== currentUser?.id,
        );
        const remoteId = remote?.userId ?? null;

        logger.log('Call initiated:', call.id, 'Remote:', remoteId);
        setCallSession({
          callId: call.id,
          status: 'RINGING',
          type: call.type,
          isInitiator: true,
          remoteUserId: remoteId,
        });
      },
    );
  };

  // ----------------- Callee actions -----------------
  const handleAccept = () => {
    if (!incomingCall.callId) return;
    logger.log('Accepting call', incomingCall.callId);

    socket.emit(
      EventsEnum.CALL_ACCEPT,
      { callId: incomingCall.callId },
      (res: any) => {
        logger.log('CALL_ACCEPT callback', res);
      },
    );

    setIncomingCall({
      visible: false,
      callerId: '',
      callId: '',
      callType: CallType.AUDIO,
    });
  };

  const handleReject = () => {
    if (!incomingCall.callId) return;
    logger.log('Rejecting', incomingCall.callId);

    socket?.emit(
      EventsEnum.CALL_REJECT,
      { callId: incomingCall.callId },
      (res: any) => {
        logger.log('CALL_REJECT callback', res);
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
    logger.log('Ending call', callSession.callId);

    socket?.emit(
      EventsEnum.CALL_END,
      { callId: callSession.callId },
      (res: any) => {
        logger.log('CALL_END callback', res);
      },
    );

    cleanupCall();
  };

  // ----------------- UI -----------------
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
            disabled={callSession.status !== 'IDLE'}
            title="Start audio call"
          >
            <Phone size={20} />
          </button>
          <button
            onClick={() => handleInitiateCall('VIDEO')}
            className="text-gray-300 hover:text-white transition"
            disabled={callSession.status !== 'IDLE'}
            title="Start video call"
          >
            <Video size={20} />
          </button>
        </div>
      </div>

      {/* Outgoing call modal */}
      {callSession.status === 'RINGING' && callSession.isInitiator && (
        <OutgoingCallModal
          visible={true}
          callType={callSession.type}
          onEnd={handleEnd}
        />
      )}

      {/* Incoming Call Modal */}
      {incomingCall.visible &&
        callSession.status === 'RINGING' &&
        !callSession.isInitiator && (
          <IncomingCallModal
            visible={incomingCall.visible}
            callerId={incomingCall.callerId}
            callType={incomingCall.callType}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        )}

      {/* In-call UI */}
      {callSession.status === 'ONGOING' && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#0b0b0b]/95 p-4 rounded-lg shadow-2xl text-white w-[380px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center animate-pulse">
                {callSession.type === CallType.VIDEO ? '📹' : '🎤'}
              </div>
              <div>
                <div className="font-semibold">{callSession.type} Call</div>
                <div className="text-xs text-gray-400">
                  {participant?.name || 'Remote User'}
                </div>
              </div>
            </div>

            <button
              onClick={handleEnd}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition"
            >
              <X size={16} /> End
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative w-full h-32 bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs">
                You
              </div>
            </div>
            <div className="relative w-full h-32 bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs">
                {participant?.name || 'Remote'}
              </div>
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-500 text-center">
            Call ID: {callSession.callId?.slice(0, 8)}...
          </div>
        </div>
      )}
    </>
  );
}
