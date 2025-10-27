'use client';

import { Mic, Plus } from 'lucide-react';

export default function ChatInput() {
  return (
    <div className="p-4 border-t border-gray-700 flex items-center gap-2">
      <button className="cursor-pointer">
        <Plus className="bg-[#2A2D33] p-2 rounded-full" size={26} />
      </button>
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 px-3 py-2 rounded-lg bg-[#2A2D33] text-white outline-none"
      />
      <button className="cursor-pointer">
        <Mic className="bg-[#2A2D33] p-2 rounded-full" size={26} />
      </button>
      <button className="px-3 py-2 bg-[#2A2D33] rounded-md text-sm cursor-pointer">
        Send
      </button>
    </div>
  );
}
