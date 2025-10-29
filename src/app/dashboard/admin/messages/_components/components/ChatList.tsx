'use client';

import { EventsEnum } from '@/enum/events.enum';
import { useSocket } from '@/hooks/useSocket';
import { Conversation, ConversationsListResponse } from '@/types/chat.types';
import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ChatList() {
  const {
    socket,
    currentUser,
    currentConversationId,
    setCurrentConversationId,
  } = useSocket();

  if (!socket || !currentUser) return;

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleConversationList = (payload: ConversationsListResponse) => {
    const data: Conversation[] = payload.data;

    setConversations(data);
  };

  useEffect(() => {
    if (!socket || !currentUser) return;

    // request conversation list
    socket.emit(EventsEnum.LOAD_CONVERSATION_LIST, {
      page: 1,
      limit: 20,
      search: searchTerm,
    });

    // listen
    socket.on(EventsEnum.CONVERSATION_LIST, handleConversationList);

    // cleanup
    return () => {
      socket.off(EventsEnum.CONVERSATION_LIST, handleConversationList);
    };
  }, [socket, currentUser, searchTerm]);

  // helper to render last message safely without mutating the object
  const renderLastMessage = (m: Conversation['lastMessage']) => {
    if (!m) return '';

    // prefer friendly labels for non-TEXT types
    if (m.type === 'AUDIO') return 'Voice message';
    if (m.type === 'IMAGE') return 'Image';
    if (m.type === 'FILE') return 'File';

    // TEXT or other: attempt to display content safely
    if (typeof m.content === 'string') return m.content;
    if (m.content == null) return '';

    try {
      // don't mutate original; stringify for display
      return typeof m.content === 'object'
        ? JSON.stringify(m.content)
        : String(m.content);
    } catch {
      return String(m.content);
    }
  };

  if (!conversations) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full bg-black text-white overflow-y-auto">
      {/* Search */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search conversations..."
          className="bg-gray-800 text-white rounded-lg p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {conversations.length === 0 && (
        <div className="p-4">
          <p className="text-gray-400">No conversations found.</p>
        </div>
      )}

      {conversations.map((chat) => {
        const profile = chat.profile ?? {};
        const lastMessageText = renderLastMessage(chat.lastMessage);
        const avatar = profile.avatarUrl;
        const name = profile.name ?? 'Unnamed';

        return (
          <div
            key={chat.conversationId}
            className={`flex justify-between items-center ${
              currentConversationId === chat.conversationId ? 'bg-gray-800' : ''
            } hover:bg-gray-800 p-4 cursor-pointer`}
            title={name}
          >
            <div
              onClick={() => setCurrentConversationId(chat.conversationId)}
              className="flex gap-2 items-center flex-1"
            >
              <div className="relative">
                <Image
                  src={avatar}
                  alt={name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                {profile.isOnline ? (
                  <div className="w-3 h-3 bg-green-600 rounded-full absolute bottom-0 right-0 ring-1 ring-black" />
                ) : (
                  <div className="w-3 h-3 bg-gray-600 rounded-full absolute bottom-0 right-0 ring-1 ring-black" />
                )}
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold truncate">{name}</h3>
                <p className="text-sm text-gray-400 truncate">
                  {lastMessageText}
                </p>
              </div>
            </div>

            <div className="pr-5 md:pr-0">
              <button className="cursor-pointer" aria-label="More actions">
                <EllipsisVertical size={16} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
