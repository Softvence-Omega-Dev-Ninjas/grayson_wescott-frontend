'use client';

import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';

interface ChatListProps {
  chats: {
    id: string;
    name: string;
    lastMessage: string;
    img: string;
    status: boolean;
  }[];
  onSelect: (id: string) => void;
  selectedChat: string | null;
}

export default function ChatList({
  chats,
  onSelect,
  selectedChat,
}: ChatListProps) {
  return (
    <div className="flex flex-col h-full bg-black text-white overflow-y-auto">
      {chats.length === 0 && (
        <div className="p-4 text-gray-400">No conversations yet.</div>
      )}

      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`flex justify-between items-center ${selectedChat === chat.id ? 'bg-gray-800' : ''} hover:bg-gray-800 p-4 cursor-pointer`}
          title={chat.name}
        >
          <div
            onClick={() => onSelect(chat.id)}
            className="flex gap-2 items-center flex-1"
          >
            <div className="relative">
              <Image
                src={chat.img}
                alt={chat.name}
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              {chat.status ? (
                <div className="w-3 h-3 bg-green-600 rounded-full absolute bottom-0 right-0 ring-1 ring-black" />
              ) : (
                <div className="w-3 h-3 bg-gray-600 rounded-full absolute bottom-0 right-0 ring-1 ring-black" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold truncate">{chat.name}</h3>
              <p className="text-sm text-gray-400 truncate">
                {chat.lastMessage}
              </p>
            </div>
          </div>
          <div className="pr-5 md:pr-0">
            <button className="cursor-pointer" aria-label="More actions">
              <EllipsisVertical size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
