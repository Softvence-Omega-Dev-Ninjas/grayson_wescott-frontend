'use client';

import {
  ChatCall,
  ChatItem,
  ChatMessage,
  ChatMessageType,
} from '@/types/chat.types';
import { ArrowLeft, Mic, Phone, Plus, Video } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import audio from '../../../../../assets/dashboard/messages/audio.png';
import fallbackAvatar from '../../../../../assets/dashboard/messages/Avatar2.png';
import video from '../../../../../assets/dashboard/messages/video.png';

interface ChatDetailsProps {
  chat: ChatItem[] | null;
  onBack: () => void;
}

export default function ChatDetails({ chat, onBack }: ChatDetailsProps) {
  if (!chat || chat.length === 0) {
    return (
      <div className="flex items-center justify-center bg-[#151519] text-gray-400 rounded-lg h-full">
        Send a message to get started
      </div>
    );
  }

  // Determine primary participant (non-admin / client)
  const participant = useMemo(() => {
    const byRole = chat.find(
      (m) =>
        (m.type === ChatMessageType.MESSAGE &&
          (m.sender?.role === 'USER' || m.isSentByClient)) ||
        (m.type === ChatMessageType.CALL && m.isSentByClient),
    );
    if (byRole && byRole.type === ChatMessageType.MESSAGE) {
      return byRole.sender;
    }
    return chat.find((i) => i.type === ChatMessageType.MESSAGE)?.sender ?? null;
  }, [chat]);

  // Determine active status based on latest item
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
                <div
                  className={`w-3 h-3 rounded-full absolute bottom-0 right-0 ${
                    isActive ? 'bg-green-600' : 'bg-gray-600'
                  }`}
                />
              </div>

              <div>
                <h3 className="font-semibold">
                  {participant?.name ?? 'Unknown'}
                </h3>
                <p className={isActive ? 'text-green-600' : 'text-gray-400'}>
                  {isActive ? 'Active Now' : 'Offline'}
                </p>
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

      {/* Chat History */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {chat.map((item) => {
          const timeLabel = new Date(item.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          const isMine = item.isMine;

          // Message rendering
          if (item.type === ChatMessageType.MESSAGE) {
            const msg = item as ChatMessage;

            return (
              <div
                key={msg.id}
                className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex gap-2 items-end max-w-full">
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
                      {msg.messageType === 'TEXT' && <p>{msg.content}</p>}
                      {msg.messageType === 'IMAGE' && msg.file && (
                        <Image
                          src={msg.file.url}
                          alt="image"
                          width={200}
                          height={200}
                          className="rounded-lg"
                        />
                      )}
                      {msg.messageType === 'FILE' && msg.file && (
                        <a
                          href={msg.file.url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline text-blue-400"
                        >
                          {msg.file.type} File
                        </a>
                      )}
                    </div>
                    <span className="block text-xs text-gray-400 mt-1">
                      {timeLabel}
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          // Call rendering
          if (item.type === ChatMessageType.CALL) {
            const call = item as ChatCall;
            const icon =
              call.callType === 'VIDEO' ? (
                <Video size={18} />
              ) : (
                <Phone size={18} />
              );

            const callStatusColor =
              call.status === 'COMPLETED'
                ? 'text-green-400'
                : call.status === 'MISSED'
                  ? 'text-red-400'
                  : 'text-gray-400';

            return (
              <div key={call.id} className="flex justify-center">
                <div className="text-xs flex items-center gap-1 text-gray-400">
                  {icon}
                  <span className={callStatusColor}>
                    {call.status === 'COMPLETED'
                      ? 'Call completed'
                      : call.status === 'MISSED'
                        ? 'Missed call'
                        : 'Call in progress'}
                  </span>
                  <span className="text-gray-500">• {timeLabel}</span>
                </div>
              </div>
            );
          }

          return null;
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
