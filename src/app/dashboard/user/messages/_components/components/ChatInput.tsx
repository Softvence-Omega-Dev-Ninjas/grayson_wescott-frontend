/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { EventsEnum } from '@/enum/events.enum';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useSocket } from '@/hooks/useSocket';
import { MessageType } from '@/types/chat.types';
import { Plus, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import ChatMicInput from './ChatMicInput';

export default function ChatInput({
  participantId,
}: {
  participantId?: string | null;
}) {
  const { socket, socketToken } = useSocket();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const { uploadFiles } = useFileUpload();

  // Unified send function that returns a Promise resolved/rejected when server responds
  const sendMessage = async (
    content: string,
    type: MessageType = MessageType.TEXT,
    fileId: string | null = null,
  ): Promise<any> => {
    if (!socket) return Promise.reject(new Error('No socket connected'));

    const payload = {
      clientId: participantId,
      content,
      type,
      fileId,
    };

    const event = participantId
      ? EventsEnum.SEND_MESSAGE_ADMIN
      : EventsEnum.SEND_MESSAGE_CLIENT;

    setIsSending(true);
    return new Promise((resolve, reject) => {
      socket.emit(event, payload, (response: any) => {
        setIsSending(false);
        console.log('📤 Send message response:', response);
        if (response?.success) {
          setMessage('');
          resolve(response);
        } else {
          reject(response || new Error('Unknown send error'));
        }
      });
    });
  };

  // Handle text send
  const handleSendMessage = () => {
    if (!message.trim() || !socket) return;
    // fire-and-forget or await if you want
    sendMessage(message, MessageType.TEXT);
  };

  // Handle file/image upload
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
        toast.error('File upload failed');
      }
    } catch (err) {
      console.error('Upload/send error:', err);
      toast.error(
        'File upload failed. Please try again with a less then 50 MB file.',
      );
    } finally {
      setUploadingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="pt-1 md:p-4 border-t border-gray-700 flex items-center gap-1">
      {/* File/Image Picker */}
      <button
        className="cursor-pointer relative"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploadingFile || isSending}
      >
        <Plus className="bg-[#2A2D33] p-2 rounded-full" size={30} />
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
        className="md:flex-1 p-1 text-xm rounded-lg bg-[#2A2D33] text-white outline-none"
      />

      {/* Mic Input */}
      <ChatMicInput
        sendMessage={sendMessage}
        uploadFiles={uploadFiles as any}
        socketToken={socketToken}
      />

      {/* Send Button */}
      <button
        type="button"
        onClick={handleSendMessage}
        disabled={isSending || uploadingFile}
        className="p-2 bg-[#2A2D33] rounded-md text-sm cursor-pointer flex items-center gap-1"
      >
        {isSending || uploadingFile ? 'Sending…' : <Send size={10} />}
      </button>
    </div>
  );
}
