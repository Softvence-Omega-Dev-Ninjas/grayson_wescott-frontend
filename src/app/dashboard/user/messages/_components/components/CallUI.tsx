'use client';

import { useCall } from '@/hooks/useCall';
import { Mic, MicOff, Phone, Video, VideoOff, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function CallUI() {
  const {
    callState,
    currentCall,
    incomingFrom,
    localStreamReady,
    getLocalStream,
    getRemoteStreams,
    acceptCall,
    rejectCall,
    endCall,
    toggleMute,
    toggleVideo,
    muted,
    videoEnabled,
  } = useCall();

  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = localVideoRef.current;
    const s = getLocalStream();
    if (el && s) {
      el.srcObject = s;
      el.muted = true;
      el.play().catch(() => {});
    }
  }, [localStreamReady, getLocalStream]);

  // render remote videos
  const remotes = getRemoteStreams();

  return (
    <>
      {/* Incoming modal */}
      {callState === 'INCOMING' && currentCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-black/80 p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold">
              Incoming {currentCall.type} call
            </h3>
            <p className="text-sm mt-2">From: {incomingFrom}</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => acceptCall()}
                className="bg-green-600 px-4 py-2 rounded"
                aria-label="Accept call"
              >
                <Phone /> Accept
              </button>
              <button
                onClick={() => rejectCall()}
                className="bg-red-600 px-4 py-2 rounded"
                aria-label="Reject call"
              >
                <X /> Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-call UI */}
      {callState === 'ONGOING' && currentCall && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#0b0b0b]/80 p-3 rounded shadow-lg text-white w-[320px]">
          <div className="flex gap-2 mb-2">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              className="w-20 h-12 rounded bg-gray-800"
            />
            <div className="flex-1">
              <div className="font-semibold">{currentCall.type} call</div>
              <div className="text-xs text-gray-300">
                Call ID: {currentCall.id}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            {remotes.map((r) => (
              <RemoteVideo key={r.userId} userId={r.userId} stream={r.stream} />
            ))}
          </div>

          <div className="flex justify-between items-center gap-2">
            <button
              onClick={toggleMute}
              className="px-3 py-2 rounded bg-gray-800"
            >
              {muted ? <MicOff /> : <Mic />} {muted ? 'Unmute' : 'Mute'}
            </button>

            <button
              onClick={toggleVideo}
              className="px-3 py-2 rounded bg-gray-800"
            >
              {videoEnabled ? <Video /> : <VideoOff />}{' '}
              {videoEnabled ? 'Video' : 'No video'}
            </button>

            <button
              onClick={() => endCall()}
              className="px-3 py-2 rounded bg-red-600"
            >
              <X /> End
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function RemoteVideo({
  userId,
  stream,
}: {
  userId: string;
  stream: MediaStream;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
      ref.current.play().catch(() => {});
    }
  }, [stream]);
  return (
    <div className="w-full h-24 bg-black rounded overflow-hidden">
      <video
        ref={ref}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute text-xs text-white px-1">{userId}</div>
    </div>
  );
}
