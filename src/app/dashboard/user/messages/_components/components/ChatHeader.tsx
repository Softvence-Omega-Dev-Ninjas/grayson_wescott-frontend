'use client';

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
  return (
    <div className="bg-[#151519] flex items-center justify-between p-4 border-b border-gray-700 rounded-t-lg">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="lg:hidden text-white">
          <ArrowLeft size={20} />
        </button>
        <Image
          src={
            participant?.avatarUrl ||
            `https://ui-avatars.com/api/?name=Carbon Engines`
          }
          alt={participant?.name || 'Your Trainer'}
          width={44}
          height={44}
          className="rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">
            {participant?.name || 'Your Trainer'}
          </div>
          <div className="text-gray-400 text-sm">
            {participant?.email || 'Gym Support'}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Phone className="cursor-pointer" size={20} />
        <Video className="cursor-pointer" size={20} />
      </div>
    </div>
  );
}
