'use client';

import { EventsEnum } from '@/enum/events.enum';
import { useSocket } from '@/hooks/useSocket';
import { Conversation, ConversationsListResponse } from '@/types/chat.types';
import { useEffect, useState } from 'react';
import ChatDetails from './components/ChatDetails';
import ChatList from './components/ChatList';

export default function ChatLayout() {
  const { socket, currentUser, currentConversationId } = useSocket();

  if (!socket || !currentUser) return null;

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const handleConversationList = (payload: ConversationsListResponse) => {
    const data: Conversation[] = payload.data;

    setConversations(data);
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
      <div className={` w-full lg:w-80 flex-shrink-0 border-r border-gray-700`}>
        <ChatList chats={conversations} />
      </div>

      {/* Chat Details - Mobile: visible when chat is selected, Desktop: always visible */}
      <div className={` flex-1 min-w-0`}>
        {currentConversationId && currentUser ? (
          <ChatDetails />
        ) : (
          <div className="flex items-center justify-center bg-[#151519] text-gray-400 rounded-lg">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
