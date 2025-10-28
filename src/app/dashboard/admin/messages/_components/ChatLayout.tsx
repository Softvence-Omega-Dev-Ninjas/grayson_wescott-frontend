'use client';

import { EventsEnum } from '@/enum/events.enum';
import { useSocket } from '@/hooks/useSocket';
import { useCallback, useEffect, useState } from 'react';
import ChatDetails from './ChatDetails';
import ChatList from './ChatList';

// shape used by the UI list
type ChatItem = {
  id: string;
  name: string;
  lastMessage: string;
  img: string;
  status: boolean; // online?
  raw?: any; // keep original server object if you need it
};

export default function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chats, setChats] = useState<ChatItem[]>([]);

  const { socket, currentUser } = useSocket();
  console.log(socket, currentUser, 'Current Admin Socket');

  const mapServerConversationsToUi = (payload: any[]): ChatItem[] => {
    return payload.map((c) => {
      const profile = c.profile || {};
      const last = c.lastMessage || {};
      let lastMessageText = '';

      if (last.type === 'TEXT') lastMessageText = last.content || '';
      else if (last.type === 'AUDIO') lastMessageText = 'Voice message';
      else if (last.type === 'IMAGE') lastMessageText = 'Image';
      else if (last.type) lastMessageText = last.type.toLowerCase();

      return {
        id: c.conversationId,
        name: profile.name || 'Unnamed',
        lastMessage: lastMessageText,
        img: profile.avatarUrl || '/default-avatar.png',
        status: !!profile.isOnline,
        raw: c,
      } as ChatItem;
    });
  };

  // handle server event that returns conversation list
  // Accepts either an array or a single item (be defensive)
  const handleConversationList = useCallback(
    (data: any) => {
      const payload = Array.isArray(data) ? data : (data?.items ?? []);
      const mapped = mapServerConversationsToUi(payload);
      setChats(mapped);

      // auto-select the first conversation if none selected
      if (!selectedChat && mapped.length > 0) {
        setSelectedChat(mapped[0].id);
      }
    },
    [selectedChat],
  );

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
  }, [socket, currentUser, handleConversationList]);

  return (
    <div className="h-[calc(100vh-80px-60px)]  flex gap-5 w-full  bg-black text-white p-2">
      {/* Chat List - Mobile: hidden when chat is selected, Desktop: always visible */}
      <div
        className={`${
          selectedChat ? 'hidden lg:block' : 'block'
        } w-full lg:w-80 xl:w-96 flex-shrink-0 border-r border-gray-700`}
      >
        <ChatList
          chats={chats}
          onSelect={(id) => setSelectedChat(id)}
          selectedChat={selectedChat}
        />
      </div>

      {/* Chat Details - Mobile: visible when chat is selected, Desktop: always visible */}
      <div
        className={`${selectedChat ? 'block' : 'hidden lg:block'} flex-1 min-w-0`}
      >
        <ChatDetails chat={null} onBack={() => setSelectedChat(null)} />
      </div>
    </div>
  );
}
