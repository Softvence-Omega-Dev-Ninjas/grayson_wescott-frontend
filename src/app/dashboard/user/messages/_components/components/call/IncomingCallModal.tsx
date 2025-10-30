'use client';

import { useSocket } from '@/hooks/useSocket';
import { CallType } from '@/types/chat.types';
import { Phone, PhoneOff, Video } from 'lucide-react';

interface IncomingCallModalProps {
  visible: boolean;
  callerId: string;
  callType: CallType;
  onAccept: () => void;
  onReject: () => void;
}

export default function IncomingCallModal({
  visible,
  callerId,
  callType,
  onAccept,
  onReject,
}: IncomingCallModalProps) {
  if (!visible) return null;
  console.log(callerId);

  const { currentUser } = useSocket();

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1f1f24] text-white p-6 rounded-2xl flex flex-col items-center space-y-4 w-[300px]">
        <div className="text-lg font-semibold">
          Incoming {callType?.toLowerCase()} call
        </div>
        {currentUser?.role !== 'USER' ? (
          <div className="text-gray-300">{'You are calling...'}</div>
        ) : (
          <div className="text-gray-300">{'Your Trainer is calling...'}</div>
        )}
        <div className="flex items-center space-x-4">
          <button
            onClick={onReject}
            className="bg-red-600 hover:bg-red-700 rounded-full p-3"
          >
            <PhoneOff size={20} />
          </button>
          <button
            onClick={onAccept}
            className="bg-green-600 hover:bg-green-700 rounded-full p-3"
          >
            {callType === 'VIDEO' ? <Video size={20} /> : <Phone size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
