'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useSocket } from '@/hooks/useSocket';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import ChatDetails from './components/ChatDetails';
import ChatList from './components/ChatList';

export default function ChatLayout() {
  const { socket, currentUser, currentConversationId } = useSocket();
  const [open, setOpen] = useState(false);

  return (
    <div className="h-[calc(100vh-120px-60px)] flex w-full bg-black text-white p-2 relative">
      {/* mobile trigger button */}
      <div className="lg:hidden absolute left-4 top-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 border rounded-lg">
              <Menu />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-72 p-0 pt-10 bg-black border-r border-gray-800"
          >
            {socket && currentUser ? (
              <ChatList onSelect={() => setOpen(false)} />
            ) : null}
          </SheetContent>
        </Sheet>
      </div>

      {/* desktop sidebar */}
      <div className="hidden lg:block w-80 flex-shrink-0 border-r border-gray-700">
        {socket && currentUser ? <ChatList /> : null}
      </div>

      {/* chat details */}
      <div className="flex-1 min-w-0 ml-0 lg:ml-5">
        {currentConversationId && currentUser ? (
          <ChatDetails />
        ) : (
          <div className="flex items-center justify-center bg-[#151519] text-gray-400 rounded-lg h-full">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
