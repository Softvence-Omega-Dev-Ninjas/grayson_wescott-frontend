// components/ChatHeader.tsx
'use client';

import { useCall } from '@/hooks/useCall';
import { useSocket } from '@/hooks/useSocket';
import { Sender } from '@/types/chat.types';
import { ArrowLeft, Phone, Video } from 'lucide-react';
import Image from 'next/image';

export default function ChatHeader({
  onBack,
  participant,
}: {
  onBack: () => void;
  participant?: Sender;
}) {
  const { socket, currentUser, currentUserRole } = useSocket();

  const { initiateCall } = useCall();

  if (!socket || !currentUser || !currentUserRole) return null;

  return (
    <div className="bg-[#151519] flex items-center justify-between p-4 border-b border-gray-700 rounded-t-lg">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="lg:hidden text-white">
          <ArrowLeft size={20} />
        </button>

        <Image
          src={
            participant?.avatarUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              participant?.name || 'Carbon Engines',
            )}`
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
          onClick={() => initiateCall('AUDIO')}
          className="text-gray-300 hover:text-white transition"
        >
          <Phone size={20} />
        </button>
        <button
          onClick={() => initiateCall('VIDEO')}
          className="text-gray-300 hover:text-white transition"
        >
          <Video size={20} />
        </button>
      </div>
    </div>
  );
}
