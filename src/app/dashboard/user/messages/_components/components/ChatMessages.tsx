'use client';

import { useSocket } from '@/hooks/useSocket';
import {
  ChatCall,
  ChatItem,
  ChatMessage,
  ChatMessageType,
  MessageType,
} from '@/types/chat.types';
import { UserRole } from '@/types/user.types';
import { Phone, Video } from 'lucide-react';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';

interface Props {
  chat: ChatItem[] | null;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  loadingMore?: boolean;
}

export default function ChatMessages({
  chat,
  scrollContainerRef,
  loadingMore,
}: Props) {
  const { currentUserRole } = useSocket();

  if (!chat || chat.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Send a message to get started
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 p-4 overflow-y-auto space-y-3"
    >
      {loadingMore && (
        <div className="text-center text-sm text-gray-400 mb-2">Loading...</div>
      )}

      {chat.map((item) => {
        const time = new Date(item.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        const isMine = item.isMine;

        if (item.type === ChatMessageType.MESSAGE) {
          const msg = item as ChatMessage;
          const showTrainer = !isMine;

          return (
            <div
              key={uuid()}
              className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex gap-2 items-end max-w-full">
                {/* Show default avatar when the current user is a client and the message is from the trainer */}
                {showTrainer && currentUserRole === UserRole.USER && (
                  <Image
                    src={`https://ui-avatars.com/api/?name=Carbon Engines`}
                    alt="Trainer"
                    className="rounded-full object-cover"
                    height={30}
                    width={30}
                  />
                )}

                {/* Show sender profile when current user is an admin or super admin */}
                {(currentUserRole === UserRole.ADMIN ||
                  currentUserRole === UserRole.SUPER_ADMIN) &&
                  msg.sender && (
                    <Image
                      src={
                        msg.sender.avatarUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          msg.sender.name || 'Carbon Engines',
                        )}`
                      }
                      alt={msg.sender.name || 'Your Trainer'}
                      className="rounded-full object-cover flex-shrink-0"
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
                    {msg.messageType === MessageType.TEXT && (
                      <p>{msg.content}</p>
                    )}
                    {msg.messageType === MessageType.IMAGE && msg.file && (
                      <Image
                        src={msg.file.url}
                        alt="image"
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    )}
                    {msg.messageType === MessageType.FILE && msg.file && (
                      <a
                        href={msg.file.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-blue-400"
                      >
                        {msg.file.type} File
                      </a>
                    )}

                    {msg.messageType === MessageType.VIDEO && msg.file && (
                      <video controls>
                        <source src={msg.file.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}

                    {msg.messageType === MessageType.AUDIO && msg.file && (
                      <audio controls>
                        <source src={msg.file.url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                  <span className="block text-xs text-gray-400 mt-1">
                    {time}
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
          const color =
            call.status === 'COMPLETED'
              ? 'text-green-400'
              : call.status === 'MISSED'
                ? 'text-red-400'
                : 'text-gray-400';

          return (
            <div
              key={call.id}
              className="flex justify-center text-xs text-gray-400"
            >
              {icon}
              <span className={`ml-1 ${color}`}>
                {call.status === 'COMPLETED'
                  ? 'Call completed'
                  : call.status === 'MISSED'
                    ? 'Missed call'
                    : 'Call in progress'}
              </span>
              <span className="ml-1 text-gray-500">• {time}</span>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
