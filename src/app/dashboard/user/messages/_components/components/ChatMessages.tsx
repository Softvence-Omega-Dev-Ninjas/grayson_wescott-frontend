/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { EventsEnum } from '@/enum/events.enum';
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
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

interface Props {
  chat: ChatItem[] | null;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  loadingMore?: boolean;
}

function formatTime(date?: string | Date | null) {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDuration(
  start?: string | Date | null,
  end?: string | Date | null,
) {
  if (!start) return '';
  const s = typeof start === 'string' ? new Date(start) : start;
  const e = end ? (typeof end === 'string' ? new Date(end) : end) : new Date();
  const diff = Math.max(0, e.getTime() - s.getTime());
  const sec = Math.floor(diff / 1000);
  const hh = Math.floor(sec / 3600);
  const mm = Math.floor((sec % 3600) / 60);
  const ss = sec % 60;
  if (hh > 0) return `${hh}h ${mm}m`;
  if (mm > 0) return `${mm}m ${ss}s`;
  return `${ss}s`;
}

export default function ChatMessages({
  chat,
  scrollContainerRef,
  loadingMore,
}: Props) {
  const { currentUserRole, socket, currentUser } = useSocket();

  const joinCall = useCallback(
    (callId: string) => {
      if (!socket) return;
      socket.emit(EventsEnum.CALL_JOIN, { callId }, (res: any) => {
        console.log('CALL_JOIN response', res);
      });
    },
    [socket],
  );

  const endCall = useCallback(
    (callId: string) => {
      if (!socket) return;
      socket.emit(EventsEnum.CALL_END, { callId }, (res: any) => {
        console.log('CALL_END response', res);
      });
    },
    [socket],
  );

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
        const createdAt = item.createdAt ?? null;
        const time = formatTime(createdAt);
        const isMine = !!item.isMine;

        if (item.type === ChatMessageType.MESSAGE) {
          const msg = item as ChatMessage;
          const showTrainer = !isMine;

          return (
            <div
              key={msg.id ?? uuid()}
              className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex gap-2 items-end max-w-full">
                {/* default avatar when the current user is a client and the message is from the trainer */}
                {showTrainer && currentUserRole === UserRole.USER && (
                  <Image
                    src={`https://ui-avatars.com/api/?name=Carbon Engines`}
                    alt="Trainer"
                    className="rounded-full object-cover"
                    height={30}
                    width={30}
                  />
                )}

                {/* show sender profile when current user is an admin or super admin */}
                {(currentUserRole === UserRole.ADMIN ||
                  currentUserRole === UserRole.SUPER_ADMIN) &&
                  msg.sender && (
                    <Image
                      src={
                        msg.sender.avatarUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.sender.name || 'Carbon Engines')}`
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

          // expected fields on call (from backend normalization)
          // call.callType: 'AUDIO' | 'VIDEO'
          // call.status: 'INITIATED' | 'ONGOING' | 'ENDED' | 'MISSED'
          // call.startedAt, call.endedAt (ISO string or null)
          // call.initiatorId
          // call.participants: [{ id, name, status, joinedAt, leftAt }]
          // call.isMine (boolean)
          // call.isSentByClient (boolean)

          const icon =
            call.callType === 'VIDEO' ? (
              <Video size={16} />
            ) : (
              <Phone size={16} />
            );

          const statusLabel =
            call.status === 'ONGOING'
              ? 'Call in progress'
              : call.status === 'INITIATED'
                ? 'Ringing'
                : call.status === 'ENDED'
                  ? 'Call ended'
                  : 'Missed call';

          const timeToShow = call.startedAt ?? createdAt;
          const duration =
            call.status === 'ENDED'
              ? formatDuration(call.startedAt, call.endedAt)
              : '';

          const participants = Array.isArray(call.participants)
            ? call.participants
            : [];
          const totalParticipants = participants.length;
          const joinedCount = participants.filter(
            (p) => p.status === 'JOINED',
          ).length;

          const initiator =
            participants.find((p) => p.id === call.initiatorId) ??
            participants.find((p) => !!p.id) ??
            undefined;

          // determine if current user already joined
          const currentUserJoined = participants.some(
            (p) => p.id === currentUser?.id && p.status === 'JOINED',
          );

          return (
            <div
              key={call.id ?? uuid()}
              className="flex justify-center text-xs text-gray-400"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  {icon}
                  <span
                    className={`ml-1 ${
                      call.status === 'MISSED'
                        ? 'text-red-400'
                        : call.status === 'ENDED'
                          ? 'text-green-400'
                          : 'text-gray-400'
                    }`}
                  >
                    {statusLabel}
                  </span>
                  <span className="ml-2 text-gray-500">
                    • {formatTime(timeToShow)}
                  </span>
                </div>

                <div className="text-xs text-gray-400 mt-0">
                  {initiator ? (
                    <span>
                      Initiated by{' '}
                      <span className="text-white ml-1">
                        {initiator.name ?? initiator.id}
                      </span>
                    </span>
                  ) : (
                    <span>Call</span>
                  )}
                  <span className="ml-2 text-gray-500">
                    • {joinedCount}/{totalParticipants} joined
                  </span>
                  {duration && (
                    <span className="ml-2 text-gray-500">• {duration}</span>
                  )}
                </div>

                {/* Actions: Join or End (initiator) */}
                <div className="mt-1 flex gap-2">
                  {call.status === 'ONGOING' && !currentUserJoined && (
                    <button
                      onClick={() => joinCall(call.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Join
                    </button>
                  )}

                  {/* initiator can end the call */}
                  {call.isMine &&
                    call.status !== 'ENDED' &&
                    call.status !== 'MISSED' && (
                      <button
                        onClick={() => endCall(call.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                      >
                        End
                      </button>
                    )}
                </div>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
