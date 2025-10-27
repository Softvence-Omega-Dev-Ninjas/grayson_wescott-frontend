'use client';

import { useSocket } from '@/hooks/useSocket';
import { useCallback, useEffect, useState } from 'react';
import ChatDetails from './ChatDetails';
import ChatList from './ChatList';

export default function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const { socket, currentUser } = useSocket();
  console.log(socket, currentUser, 'Current Admin Socket');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleConversationList = useCallback((data: any) => {
    console.log(data, 'Conversation List');
  }, []);

  useEffect(() => {
    if (!socket || !currentUser) return;
    if (!['SUPER_ADMIN', 'ADMIN'].includes(currentUser.role)) return;

    // Emit request to load admin conversation list
    socket.emit('private:load_conversation_list', { page: 1, limit: 20 });

    socket.on('private:conversation_list', handleConversationList);

    return () => {
      socket.off('private:conversation_list', handleConversationList);
    };
  }, [socket, currentUser]);

  return (
    <div className="h-[calc(100vh-80px-60px)]  flex gap-5 w-full  bg-black text-white p-2">
      {/* Chat List - Mobile: hidden when chat is selected, Desktop: always visible */}
      <div
        className={`${
          selectedChat ? 'hidden lg:block' : 'block'
        } w-full lg:w-80 xl:w-96 flex-shrink-0 border-r border-gray-700`}
      >
        <ChatList
          chats={[]}
          onSelect={setSelectedChat}
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
