'use client';

import { ArrowLeft, Mic, Plus } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import audio from '../../../../../assets/dashboard/messages/audio.png';
import fallbackAvatar from '../../../../../assets/dashboard/messages/Avatar2.png';
import video from '../../../../../assets/dashboard/messages/video.png';

type Role = 'USER' | 'SUPER_ADMIN' | 'ADMIN' | string;

interface Sender {
  id: string;
  name: string;
  avatarUrl?: string | null;
  role?: Role;
  email?: string;
}

export interface ChatMessage {
  id: string;
  type: 'MESSAGE' | string;
  createdAt: string;
  content: string;
  messageType: 'TEXT' | 'IMAGE' | 'FILE' | string;
  sender: Sender;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any | null;
  isMine: boolean;
  isSentByClient: boolean;
}

interface ChatDetailsProps {
  chat: ChatMessage[] | null;
  onBack: () => void;
}

export default function ChatDetails({ chat, onBack }: ChatDetailsProps) {
  // If no chat (no messages) show placeholder
  if (!chat || chat.length === 0) {
    return (
      <div className="flex items-center justify-center bg-[#151519] text-gray-400 rounded-lg h-full">
        Select a chat to start messaging
      </div>
    );
  }

  // Derive a "participant" to show in header (prefer the client/user)
  const participant = useMemo(() => {
    // prefer a sender with role USER or a message that was sent by client
    const byRole = chat.find(
      (m) => m.sender?.role === 'USER' || m.isSentByClient,
    );
    return byRole?.sender ?? chat[0].sender;
  }, [chat]);

  // Simple "active" heuristic: last message within 5 minutes -> active
  const isActive = useMemo(() => {
    const last = chat[chat.length - 1];
    if (!last) return false;
    const lastTs = new Date(last.createdAt).getTime();
    return Date.now() - lastTs < 5 * 60 * 1000;
  }, [chat]);

  return (
    <div className="h-full flex flex-col bg-black text-white rounded-lg">
      {/* Header */}
      <div className="bg-[#151519] flex items-center justify-between p-4 border-b border-gray-700 rounded-t-lg">
        <div className="flex w-full items-center gap-2">
          <button onClick={onBack} className="lg:hidden text-white">
            <ArrowLeft size={24} />
          </button>

          <div className="flex items-center gap-3 w-full justify-between">
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Image
                  src={participant?.avatarUrl ?? fallbackAvatar.src}
                  alt={participant?.name ?? 'user'}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                {isActive ? (
                  <div className="w-3 h-3 bg-green-600 rounded-full absolute bottom-0 right-0" />
                ) : (
                  <div className="w-3 h-3 bg-gray-600 rounded-full absolute bottom-0 right-0" />
                )}
              </div>

              <div>
                <h3 className="font-semibold">
                  {participant?.name ?? 'Unknown'}
                </h3>
                {isActive ? (
                  <p className="text-green-600">Active Now</p>
                ) : (
                  <p className="text-gray-400">Offline</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Image
                src={audio.src}
                alt="audio"
                height={20}
                width={20}
                className="cursor-pointer"
              />
              <Image
                src={video.src}
                alt="video"
                height={20}
                width={20}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {chat.map((msg) => {
          const timeLabel = new Date(msg.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          const isMine = !!msg.isMine;

          return (
            <div
              key={msg.id}
              className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex gap-2 items-end max-w-full">
                {/* show avatar for non-mine messages */}
                {!isMine && (
                  <Image
                    src={msg.sender?.avatarUrl ?? fallbackAvatar.src}
                    alt={msg.sender?.name ?? 'avatar'}
                    className="rounded-full object-cover"
                    height={30}
                    width={30}
                  />
                )}

                <div className="flex flex-col">
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl text-sm break-words ${
                      isMine
                        ? 'bg-[#2A2D33] text-white rounded-br-none'
                        : 'bg-[#2A2D33] text-gray-200 rounded-bl-none'
                    }`}
                  >
                    {/* If message type isn't TEXT, you can extend rendering logic here */}
                    <p>{msg.content}</p>
                  </div>
                  <span className="block text-xs text-gray-400 mt-1">
                    {timeLabel}
                  </span>
                </div>

                {/* if message is mine and you want to show small avatar on right, uncomment */}
                {/* {isMine && (
                  <Image src={yourAvatar} alt="me" height={30} width={30} />
                )} */}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 flex items-center gap-2">
        <button className="cursor-pointer">
          <Plus className="bg-[#2A2D33] p-2 rounded-full" size={30} />
        </button>
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 rounded-lg bg-[#2A2D33] text-white outline-none"
        />
        <button className="cursor-pointer">
          <Mic className="bg-[#2A2D33] p-2 rounded-full" size={30} />
        </button>
        <button className="md:px-4 px-2 py-2 bg-[#2A2D33] rounded-md md:rounded-2xl text-xs md:text-lg cursor-pointer">
          Send
        </button>
      </div>
    </div>
  );
}
