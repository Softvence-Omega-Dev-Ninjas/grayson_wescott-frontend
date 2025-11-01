/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSocket } from '@/hooks/useSocket';
import { Sender } from '@/types/chat.types';
import {
  ArrowLeft,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Video,
  VideoOff,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Import types (adjust path as needed)
import { EventsEnum } from '@/enum/events.enum';
import {
  AcceptCallResponse,
  ApiResponse,
  CallActionDto,
  CallStatus,
  CallType,
  IncomingCallPayload,
  InitiateCallDto,
  RTCAnswerPayload,
  RTCIceCandidatePayload,
  RTCOfferPayload,
  WebRTCEvents,
} from '@/types/call.types';

type CallState = {
  callId: string | null;
  status: CallStatus | null;
  type: CallType | null;
  isIncoming: boolean;
  isOutgoing: boolean;
  remoteUserId: string | null;
};

export default function ChatHeader({
  onBack,
  participant,
}: {
  onBack: () => void;
  participant?: Sender;
}) {
  const { socket, currentUser, currentConversationId } = useSocket();

  // Call state
  const [callState, setCallState] = useState<CallState>({
    callId: null,
    status: null,
    type: null,
    isIncoming: false,
    isOutgoing: false,
    remoteUserId: null,
  });

  // Media controls
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  // WebRTC refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);

  // ICE servers configuration
  const iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ],
  };

  if (!socket || !currentUser) return null;

  // ----------------- Caller actions -----------------
  const handleInitiateCall = (type: CallType) => {
    if (!currentConversationId) {
      console.error('No active conversation');
      return;
    }

    const dto: InitiateCallDto = {
      conversationId: currentConversationId,
      type,
    };

    console.log('Initiating call:', dto);
    socket.emit(EventsEnum.CALL_INITIATE, dto);

    setCallState({
      callId: null,
      status: CallStatus.INITIATED,
      type,
      isIncoming: false,
      isOutgoing: true,
      remoteUserId: participant?.id || null,
    });
  };

  // ----------------- Callee actions -----------------
  const handleAccept = async () => {
    if (!callState.callId) return;

    const dto: CallActionDto = { callId: callState.callId };
    socket.emit(EventsEnum.CALL_ACCEPT, dto);

    setCallState((prev) => ({ ...prev, status: CallStatus.ONGOING }));

    // Start local media
    await startLocalMedia(callState.type === CallType.VIDEO);
  };

  const handleReject = () => {
    if (!callState.callId) return;

    const dto: CallActionDto = { callId: callState.callId };
    socket.emit(EventsEnum.CALL_REJECT, dto);

    resetCallState();
  };

  const handleEnd = () => {
    if (!callState.callId) return;

    const dto: CallActionDto = { callId: callState.callId };
    socket.emit(EventsEnum.CALL_END, dto);

    cleanupCall();
  };

  // ----------------- WebRTC Setup -----------------
  const startLocalMedia = async (video: boolean) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video,
      });

      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Initialize peer connection
      await initializePeerConnection();
    } catch (error) {
      console.error('Failed to get user media:', error);
    }
  };

  const initializePeerConnection = async () => {
    const pc = new RTCPeerConnection(iceServers);
    peerConnectionRef.current = pc;

    // Add local tracks
    localStreamRef.current?.getTracks().forEach((track) => {
      pc.addTrack(track, localStreamRef.current!);
    });

    // Handle remote stream
    pc.ontrack = (event) => {
      if (remoteVideoRef.current && event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0];
        remoteStreamRef.current = event.streams[0];
      }
    };

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate && callState.callId) {
        socket.emit(WebRTCEvents.SEND_ICE_CANDIDATE, {
          callId: callState.callId,
          candidate: JSON.stringify(event.candidate),
          sdpMid: event.candidate.sdpMid || '',
          sdpMLineIndex: event.candidate.sdpMLineIndex || 0,
          to: callState.remoteUserId || participant?.id || '',
        });
      }
    };

    // Connection state monitoring
    pc.onconnectionstatechange = () => {
      console.log('Connection state:', pc.connectionState);
      if (
        pc.connectionState === 'disconnected' ||
        pc.connectionState === 'failed'
      ) {
        cleanupCall();
      }
    };

    // If we're the caller (outgoing), create and send offer
    if (callState.isOutgoing) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.emit(WebRTCEvents.SEND_OFFER, {
        callId: callState.callId,
        sdp: offer.sdp || '',
        to: participant?.id || '',
      });
    }
  };

  // ----------------- Cleanup -----------------
  const resetCallState = () => {
    setCallState({
      callId: null,
      status: null,
      type: null,
      isIncoming: false,
      isOutgoing: false,
      remoteUserId: null,
    });
  };

  const cleanupCall = () => {
    // Stop all tracks
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    remoteStreamRef.current?.getTracks().forEach((track) => track.stop());

    // Close peer connection
    peerConnectionRef.current?.close();

    // Reset refs
    localStreamRef.current = null;
    remoteStreamRef.current = null;
    peerConnectionRef.current = null;

    // Clear video elements
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    resetCallState();
    setIsMuted(false);
    setIsVideoEnabled(true);
  };

  // ----------------- Media Controls -----------------
  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  // ----------------- Socket Listeners -----------------
  useEffect(() => {
    if (!socket) return;

    // Incoming call
    socket.on(
      EventsEnum.CALL_INCOMING,
      (response: ApiResponse<IncomingCallPayload>) => {
        console.log('Incoming call:', response);
        const { call, from } = response.data;

        setCallState({
          callId: call.id,
          status: call.status,
          type: call.type,
          isIncoming: true,
          isOutgoing: false,
          remoteUserId: from,
        });
      },
    );

    // Call accepted
    socket.on(
      EventsEnum.CALL_ACCEPT,
      async (response: ApiResponse<AcceptCallResponse>) => {
        console.log('Call accepted:', response);
        setCallState((prev) => ({ ...prev, status: CallStatus.ONGOING }));

        // Start media if we're the caller
        if (callState.isOutgoing) {
          await startLocalMedia(callState.type === CallType.VIDEO);
        }
      },
    );

    // Call missed/rejected
    socket.on(EventsEnum.CALL_MISSED, (response: any) => {
      console.log('Call missed:', response);
      cleanupCall();
    });

    // Call ended
    socket.on(EventsEnum.CALL_END, (response: any) => {
      console.log('Call ended:', response);
      cleanupCall();
    });

    // WebRTC: Receive offer
    socket.on(
      WebRTCEvents.RTC_OFFER,
      async (response: ApiResponse<RTCOfferPayload>) => {
        console.log('Received RTC offer:', response);
        const { sdp, callId } = response.data;

        if (!peerConnectionRef.current) {
          await initializePeerConnection();
        }

        const pc = peerConnectionRef.current!;
        await pc.setRemoteDescription(
          new RTCSessionDescription({ type: 'offer', sdp }),
        );

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socket.emit(WebRTCEvents.SEND_ANSWER, {
          callId,
          sdp: answer.sdp || '',
          to: callState.remoteUserId || participant?.id || '',
        });
      },
    );

    // WebRTC: Receive answer
    socket.on(
      WebRTCEvents.RTC_ANSWER,
      async (response: ApiResponse<RTCAnswerPayload>) => {
        console.log('Received RTC answer:', response);
        const { sdp } = response.data;

        if (peerConnectionRef.current) {
          await peerConnectionRef.current.setRemoteDescription(
            new RTCSessionDescription({ type: 'answer', sdp }),
          );
        }
      },
    );

    // WebRTC: Receive ICE candidate
    socket.on(
      WebRTCEvents.RTC_ICE_CANDIDATE,
      async (response: ApiResponse<RTCIceCandidatePayload>) => {
        console.log('Received ICE candidate:', response);
        const { candidate } = response.data;

        if (peerConnectionRef.current && candidate) {
          try {
            await peerConnectionRef.current.addIceCandidate(
              JSON.parse(candidate),
            );
          } catch (error) {
            console.error('Error adding ICE candidate:', error);
          }
        }
      },
    );

    return () => {
      socket.off(EventsEnum.CALL_INCOMING);
      socket.off(EventsEnum.CALL_ACCEPT);
      socket.off(EventsEnum.CALL_MISSED);
      socket.off(EventsEnum.CALL_END);
      socket.off(WebRTCEvents.RTC_OFFER);
      socket.off(WebRTCEvents.RTC_ANSWER);
      socket.off(WebRTCEvents.RTC_ICE_CANDIDATE);
    };
  }, [socket, callState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupCall();
    };
  }, []);

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
            onClick={() => handleInitiateCall(CallType.AUDIO)}
            className="text-gray-300 hover:text-white transition"
            title="Start audio call"
            disabled={callState.status !== null}
          >
            <Phone size={20} />
          </button>
          <button
            onClick={() => handleInitiateCall(CallType.VIDEO)}
            className="text-gray-300 hover:text-white transition"
            title="Start video call"
            disabled={callState.status !== null}
          >
            <Video size={20} />
          </button>
        </div>
      </div>

      {/* Outgoing call modal */}
      {callState.isOutgoing && callState.status === CallStatus.INITIATED && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1f] rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex flex-col items-center gap-4">
              <Image
                src={
                  participant?.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(participant?.name || 'User')}`
                }
                alt={participant?.name || 'User'}
                width={80}
                height={80}
                className="rounded-full"
              />
              <h3 className="text-xl font-semibold text-white">
                Calling {participant?.name || 'User'}...
              </h3>
              <p className="text-gray-400">
                {callState.type === CallType.VIDEO ? 'Video' : 'Audio'} call
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-gray-400 text-sm">Ringing...</span>
              </div>
              <button
                onClick={handleEnd}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full flex items-center gap-2 transition"
              >
                <PhoneOff size={20} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Incoming Call Modal */}
      {callState.isIncoming && callState.status === CallStatus.INITIATED && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1f] rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex flex-col items-center gap-4">
              <Image
                src={
                  participant?.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(participant?.name || 'User')}`
                }
                alt={participant?.name || 'User'}
                width={80}
                height={80}
                className="rounded-full"
              />
              <h3 className="text-xl font-semibold text-white">
                {participant?.name || 'User'} is calling...
              </h3>
              <p className="text-gray-400">
                Incoming {callState.type === CallType.VIDEO ? 'video' : 'audio'}{' '}
                call
              </p>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleReject}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full flex items-center gap-2 transition"
                >
                  <PhoneOff size={20} />
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full flex items-center gap-2 transition"
                >
                  <Phone size={20} />
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* In-call UI Modal */}
      {callState.status === CallStatus.ONGOING && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Video container */}
          <div className="flex-1 relative">
            {/* Remote video */}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Local video (Picture-in-Picture) */}
            {callState.type === CallType.VIDEO && (
              <div className="absolute top-4 right-4 w-48 h-36 bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Call info overlay */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white font-medium">
                  {participant?.name || 'User'}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-[#1a1a1f] p-6 flex items-center justify-center gap-4">
            <button
              onClick={toggleMute}
              className={`p-4 rounded-full transition ${
                isMuted
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <MicOff size={24} className="text-white" />
              ) : (
                <Mic size={24} className="text-white" />
              )}
            </button>

            {callState.type === CallType.VIDEO && (
              <button
                onClick={toggleVideo}
                className={`p-4 rounded-full transition ${
                  !isVideoEnabled
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                title={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
              >
                {isVideoEnabled ? (
                  <Video size={24} className="text-white" />
                ) : (
                  <VideoOff size={24} className="text-white" />
                )}
              </button>
            )}

            <button
              onClick={handleEnd}
              className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition"
              title="End call"
            >
              <PhoneOff size={24} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
