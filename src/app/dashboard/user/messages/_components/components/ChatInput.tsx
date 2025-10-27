'use client';

import { EventsEnum } from '@/enum/events.enum';
import { useSocket } from '@/hooks/useSocket';
import { Mic, Plus } from 'lucide-react';
import { useState } from 'react';

export default function ChatInput() {
  const { socket } = useSocket();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = () => {
    if (!socket || !message.trim()) return;

    setIsSending(true);

    const payload = {
      content: message,
      type: 'TEXT',
      fileId: null,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.emit(EventsEnum.SEND_MESSAGE_CLIENT, payload, (response: any) => {
      console.log('📤 Message send response:', response);
      setIsSending(false);
      if (response?.success) {
        setMessage('');
      }
    });
  };

  return (
    <div className="p-4 border-t border-gray-700 flex items-center gap-2">
      <button className="cursor-pointer">
        <Plus className="bg-[#2A2D33] p-2 rounded-full" size={26} />
      </button>

      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        disabled={isSending}
        className="flex-1 px-3 py-2 rounded-lg bg-[#2A2D33] text-white outline-none"
      />

      <button disabled={isSending} className="cursor-pointer">
        <Mic className="bg-[#2A2D33] p-2 rounded-full" size={26} />
      </button>

      <button
        type="button"
        onClick={handleSendMessage}
        disabled={isSending}
        className="px-3 py-2 bg-[#2A2D33] rounded-md text-sm cursor-pointer"
      >
        {isSending ? 'Sending…' : 'Send'}
      </button>
    </div>
  );
}
