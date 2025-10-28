'use client';

import { EventsEnum } from '@/enum/events.enum';
import { useSocket } from '@/hooks/useSocket';
import { Conversation, ConversationsListResponse } from '@/types/chat.types';
import { useEffect, useState } from 'react';
import ChatList from './ChatList';

export default function ChatLayout() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const { socket, currentUser } = useSocket();

  const handleConversationList = (payload: ConversationsListResponse) => {
    const data: Conversation[] = payload.data;

    setConversations(data);

    // auto-select first conversation if none selected
    if (!selectedConversationId && data.length > 0) {
      setSelectedConversationId(data[0].conversationId);
    }
  };

  useEffect(() => {
    if (!socket || !currentUser) return;

    // request conversation list
    socket.emit(EventsEnum.LOAD_CONVERSATION_LIST, { page: 1, limit: 20 });

    // listen
    socket.on(EventsEnum.CONVERSATION_LIST, handleConversationList);

    // cleanup
    return () => {
      socket.off(EventsEnum.CONVERSATION_LIST, handleConversationList);
    };
  }, [socket, currentUser]);

  return (
    <div className="h-[calc(100vh-80px-60px)] flex gap-5 w-full bg-black text-white p-2">
      {/* Chat List - Mobile: hidden when chat is selected, Desktop: always visible */}
      <div
        className={`${
          selectedConversationId ? 'hidden lg:block' : 'block'
        } w-full lg:w-80 xl:w-96 flex-shrink-0 border-r border-gray-700`}
      >
        <ChatList
          chats={conversations}
          onSelect={(id) =>
            selectedConversationId !== id && setSelectedConversationId(id)
          }
          selectedChat={selectedConversationId}
        />
      </div>

      {/* Chat Details - Mobile: visible when chat is selected, Desktop: always visible */}
      <div
        className={`${selectedConversationId ? 'block' : 'hidden lg:block'} flex-1 min-w-0`}
      >
        {/* <ChatDetails chat={null} onBack={() => selectedConversation()} /> */}
      </div>
    </div>
  );
}
