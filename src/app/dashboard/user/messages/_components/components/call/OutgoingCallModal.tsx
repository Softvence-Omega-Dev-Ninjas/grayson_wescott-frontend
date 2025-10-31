'use client';

import { CallType } from '@/types/chat.types';
import { Phone, PhoneOff, Video } from 'lucide-react';

interface OutgoingCallModalProps {
  visible: boolean;
  callType?: CallType;
  onEnd: () => void;
}

export default function OutgoingCallModal({
  visible,
  callType = CallType.AUDIO,
  onEnd,
}: OutgoingCallModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1f1f24] text-white p-6 rounded-2xl flex flex-col items-center space-y-4 w-[300px]">
        <div className="text-lg font-semibold">
          Calling {callType.toLowerCase()}...
        </div>
        <div className="text-gray-300 text-sm">
          Waiting for recipient to answer
        </div>

        <div className="flex items-center space-x-4 mt-2">
          <button
            onClick={onEnd}
            className="bg-red-600 hover:bg-red-700 rounded-full p-3 flex items-center justify-center"
          >
            <PhoneOff size={20} />
          </button>
          <div className="bg-green-600/30 rounded-full p-3 flex items-center justify-center cursor-default">
            {callType === CallType.VIDEO ? (
              <Video size={20} className="opacity-60" />
            ) : (
              <Phone size={20} className="opacity-60" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
