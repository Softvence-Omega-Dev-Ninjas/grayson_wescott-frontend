"use client";
import Image from "next/image";
import React from "react";
import { EllipsisVertical } from "lucide-react";

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
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`flex justify-between items-center ${selectedChat === chat.id ? "bg-gray-800" : ""} hover:bg-gray-800 p-4 cursor-pointer`}
        >
          <div
            onClick={() => onSelect(chat.id)}
            className="flex gap-2 items-center flex-1"
          >
            <div className="relative">
              <Image src={chat.img} alt="image" width={50} height={50} />
              {chat.status ? (
                <div className="w-3 h-3 bg-green-600 rounded-full absolute bottom-0 right-0" />
              ) : (
                <div className="w-3 h-3 bg-gray-600 rounded-full absolute bottom-0 right-0" />
              )}
            </div>
            <div>
              <h3 className="font-semibold">{chat.name}</h3>
              <p className="text-sm text-gray-400 truncate">
                {chat.lastMessage}
              </p>
            </div>
          </div>
          <div className="pr-5 md:pr-0">
            <button className="cursor-pointer">
              <EllipsisVertical size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
