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
import videoIcon from '../../../../../assets/dashboard/messages/video.png';

interface ChatDetailsProps {
  chat: ChatItem[] | null;
  onBack: () => void;
  // parent passes a ref to the scrollable container so it can manage scroll / pagination
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  loadingMore?: boolean;
}

export default function ChatDetails({
  chat,
  onBack,
  scrollContainerRef,
  loadingMore,
}: ChatDetailsProps) {
  // when no messages yet
  if (!chat || chat.length === 0) {
    return (
      <div className="h-full flex flex-col bg-black text-white rounded-lg">
        <div className="bg-[#151519] p-4 border-b border-gray-700 rounded-t-lg">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="lg:hidden text-white">
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              <Image
                src={fallbackAvatar.src}
                alt="user"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-semibold">Client</div>
                <div className="text-sm text-gray-400">Offline</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 flex items-center justify-center text-gray-400">
          Send a message to get started
        </div>

        <div className="p-4 border-t border-gray-700 flex items-center gap-2">
          <button className="cursor-pointer">
            <Plus className="bg-[#2A2D33] p-2 rounded-full" size={26} />
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 rounded-lg bg-[#2A2D33] text-white outline-none"
          />
          <button className="cursor-pointer">
            <Mic className="bg-[#2A2D33] p-2 rounded-full" size={26} />
          </button>
          <button className="px-3 py-2 bg-[#2A2D33] rounded-md text-sm cursor-pointer">
            Send
          </button>
        </div>
      </div>
    );
  }

  // choose participant to show in header
  const participant = useMemo(() => {
    const byRole = chat.find(
      (m) =>
        (m.type === ChatMessageType.MESSAGE &&
          (m.sender?.role === 'USER' || m.isSentByClient)) ||
        (m.type === ChatMessageType.CALL && m.isSentByClient),
    );
    if (byRole && byRole.type === ChatMessageType.MESSAGE) {
      return (byRole as ChatMessage).sender;
    }
    const firstMessage = chat.find((i) => i.type === ChatMessageType.MESSAGE);
    return firstMessage ? (firstMessage as ChatMessage).sender : null;
  }, [chat]);

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
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="lg:hidden text-white">
            <ArrowLeft size={20} />
          </button>
          <Image
            src={participant?.avatarUrl ?? fallbackAvatar.src}
            alt={participant?.name ?? 'user'}
            width={44}
            height={44}
            className="rounded-full object-cover"
          />
          <div>
            <div className="font-semibold">{participant?.name ?? 'Client'}</div>
            <div className={isActive ? 'text-green-500' : 'text-gray-400'}>
              {isActive ? 'Active Now' : 'Offline'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Image src={audio.src} alt="audio" height={20} width={20} />
          <Image src={videoIcon.src} alt="video" height={20} width={20} />
        </div>
      </div>

      {/* Messages container (chronological order: oldest -> newest) */}
      <div
        ref={scrollContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-3"
        // note: parent manages infinite-scroll via this ref
      >
        {/* show loading more indicator at top when fetching older pages */}
        {loadingMore && (
          <div className="text-center text-sm text-gray-400 mb-2">
            Loading...
          </div>
        )}

        {/* render each chat item in chronological order */}
        {chat.map((item) => {
          const timeLabel = new Date(item.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          const isMine = item.isMine;

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

          if (item.type === ChatMessageType.CALL) {
            const call = item as ChatCall;
            const icon =
              call.callType === 'VIDEO' ? (
                <Video size={16} />
              ) : (
                <Phone size={16} />
              );
            const callStatusColor =
              call.status === 'COMPLETED'
                ? 'text-green-400'
                : call.status === 'MISSED'
                  ? 'text-red-400'
                  : 'text-gray-400';

            return (
              <div key={call.id} className="flex justify-center">
                <div className="text-xs flex items-center gap-2 text-gray-400">
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
          <Plus className="bg-[#2A2D33] p-2 rounded-full" size={26} />
        </button>
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 rounded-lg bg-[#2A2D33] text-white outline-none"
        />
        <button className="cursor-pointer">
          <Mic className="bg-[#2A2D33] p-2 rounded-full" size={26} />
        </button>
        <button className="px-3 py-2 bg-[#2A2D33] rounded-md text-sm cursor-pointer">
          Send
        </button>
      </div>
    </div>
  );
}
