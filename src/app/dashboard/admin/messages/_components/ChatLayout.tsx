'use client';

import { useSocket } from '@/hooks/useSocket';
import ChatDetails from './components/ChatDetails';
import ChatList from './components/ChatList';

export default function ChatLayout() {
  const { socket, currentUser, currentConversationId } = useSocket();

  return (
    <div className="h-[calc(100vh-120px-60px)] flex gap-5 w-full bg-black text-white p-2">
      {/* Chat List - Mobile: hidden when chat is selected, Desktop: always visible */}
      <div className={`w-full lg:w-80 flex-shrink-0 border-r border-gray-700`}>
        {socket && currentUser ? <ChatList /> : null}
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
