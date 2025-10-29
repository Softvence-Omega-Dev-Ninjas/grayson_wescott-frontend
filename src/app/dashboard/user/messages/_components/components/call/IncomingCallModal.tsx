'use client';

import { CallType } from '@/types/chat.types';
import { Phone, PhoneOff, Video } from 'lucide-react';

interface IncomingCallModalProps {
  visible: boolean;
  callerName: string;
  callType: CallType;
  onAccept: () => void;
  onReject: () => void;
}

export default function IncomingCallModal({
  visible,
  callerName,
  callType,
  onAccept,
  onReject,
}: IncomingCallModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1f1f24] text-white p-6 rounded-2xl flex flex-col items-center space-y-4 w-[300px]">
        <div className="text-lg font-semibold">
          Incoming {callType?.toLowerCase()} call
        </div>
        <div className="text-gray-300">{callerName || 'Unknown Caller'}</div>
        <div className="flex gap-6 mt-4">
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
