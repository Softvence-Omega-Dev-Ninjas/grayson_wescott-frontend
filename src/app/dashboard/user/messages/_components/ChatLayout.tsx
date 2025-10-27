'use client';

import { EventsEnum } from '@/enum/events.enum';
import { useSocket } from '@/hooks/useSocket';
import { useCallback, useEffect, useState } from 'react';
import ChatDetails from './ChatDetails';

// Type definitions for sender and message
interface Sender {
  id: string;
  name: string;
  avatarUrl: string;
  role: 'USER' | 'SUPER_ADMIN';
  email: string;
}

interface ChatMessage {
  id: string;
  type: 'MESSAGE';
  createdAt: string;
  content: string;
  messageType: 'TEXT' | 'IMAGE' | 'FILE';
  sender: Sender;
  file: string | null;
  isMine: boolean;
  isSentByClient: boolean;
}

interface ConversationResponse {
  success: boolean;
  message: string;
  data: ChatMessage[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export default function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([]); // <-- type-safe state

  const { socket, currentUser } = useSocket();
  console.log(socket, currentUser, 'Current Socket Client');

  const handleConversationList = useCallback(
    (response: ConversationResponse) => {
      console.log(response.data, 'Conversation List');
      setChat(response.data);
    },
    [],
  );

  useEffect(() => {
    if (!socket || !currentUser) return;

    // Emit request to load admin conversation list
    socket.emit(EventsEnum.LOAD_CLIENT_CONVERSATION, { page: 1, limit: 20 });

    socket.on(EventsEnum.CLIENT_CONVERSATION, handleConversationList);

    return () => {
      socket.off(EventsEnum.CLIENT_CONVERSATION, handleConversationList);
    };
  }, [socket, currentUser]);

  return (
    <div className="h-[calc(100vh-80px-60px)] flex gap-5 w-full bg-black text-white p-2">
      <div
        className={`${selectedChat ? 'block' : 'hidden lg:block'} flex-1 min-w-0`}
      >
        <ChatDetails chat={chat} onBack={() => setSelectedChat(null)} />
      </div>
    </div>
  );
}
