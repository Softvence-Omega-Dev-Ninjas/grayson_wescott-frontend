'use client';

import { EventsEnum } from '@/enum/events.enum';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useSocket } from '@/hooks/useSocket';
import { MessageType } from '@/types/chat.types';
import { Mic, Plus, Send } from 'lucide-react';
import { useRef, useState } from 'react';

export default function ChatInput() {
  const { socket, socketToken } = useSocket();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const { uploadFiles } = useFileUpload();

  // ✅ Unified send function (handles text, image, file)
  const sendMessage = async (
    content: string,
    type: MessageType = MessageType.TEXT,
    fileId: string | null = null,
  ) => {
    if (!socket) return;

    const payload = {
      content,
      type,
      fileId,
    };

    setIsSending(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.emit(EventsEnum.SEND_MESSAGE_CLIENT, payload, (response: any) => {
      console.log('📤 Send message response:', response);
      setIsSending(false);
      if (response?.success) {
        setMessage('');
      }
    });
  };

  // ✅ Handle text send
  const handleSendMessage = () => {
    if (!message.trim() || !socket) return;
    sendMessage(message, MessageType.TEXT);
  };

  // ✅ Handle file/image upload
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (!socketToken) return alert('Socket not authenticated');

    setUploadingFile(true);

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('files', file));

    try {
      const data = await uploadFiles(formData, socketToken);

      // Support multiple file uploads
      if (Array.isArray(data)) {
        for (const file of data) {
          const fileType = file.mimeType?.startsWith('image/')
            ? MessageType.IMAGE
            : file.mimeType?.startsWith('video/')
              ? MessageType.VIDEO
              : file.mimeType?.startsWith('audio/')
                ? MessageType.AUDIO
                : MessageType.FILE;
          await sendMessage(file.originalName || 'File', fileType, file.id);
        }
      } else {
        const fileType = data.mimeType?.startsWith('image/')
          ? MessageType.IMAGE
          : data.mimeType?.startsWith('video/')
            ? MessageType.VIDEO
            : data.mimeType?.startsWith('audio/')
              ? MessageType.AUDIO
              : MessageType.FILE;
        await sendMessage(data.originalName || 'File', fileType, data.id);
      }
    } catch (err) {
      console.error('Upload/send error:', err);
      alert('Failed to upload file');
    } finally {
      setUploadingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 border-t border-gray-700 flex items-center gap-2">
      {/* File/Image Picker */}
      <button
        className="cursor-pointer relative"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploadingFile || isSending}
      >
        <Plus className="bg-[#2A2D33] p-2 rounded-full" size={26} />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Message Input */}
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        disabled={isSending || uploadingFile}
        className="flex-1 px-3 py-2 rounded-lg bg-[#2A2D33] text-white outline-none"
      />

      {/* Voice Send */}
      <button
        onClick={() => sendMessage(message, MessageType.AUDIO)}
        disabled={isSending || uploadingFile}
        className="cursor-pointer"
      >
        <Mic className="bg-[#2A2D33] p-2 rounded-full" size={26} />
      </button>

      {/* Send Button */}
      <button
        type="button"
        onClick={handleSendMessage}
        disabled={isSending || uploadingFile}
        className="px-3 py-2 bg-[#2A2D33] rounded-md text-sm cursor-pointer flex items-center gap-1"
      >
        {isSending || uploadingFile ? 'Sending…' : <Send size={16} />}
      </button>
    </div>
  );
}
