'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextValue {
  socket: Socket | null;
  userId: string | null;
  sendMessageClient: (
    content: string,
    type?: string,
    fileId?: string | null,
  ) => void;
  sendMessageAdmin: (
    clientId: string,
    content: string,
    type?: string,
    fileId?: string | null,
  ) => void;
}

const SocketContext = createContext<SocketContextValue | null>(null);

export const SocketProvider = ({
  token,
  children,
}: {
  token: string;
  children: React.ReactNode;
}) => {
  const socketRef = useRef<Socket | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const socket = io(`${process.env.NEXT_PUBLIC_BASE_API}/chat`, {
      transports: ['websocket'],
      autoConnect: true,
      auth: { token: `Bearer ${token}` },
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socketRef.current = socket;

    // On successful auth, server sends userId
    socket.on('success', (data) => {
      setUserId(data);
      console.log('Authenticated as:', data);
    });

    socket.on('error', (err) => {
      console.error('Socket Error:', err);
    });

    socket.on('private:new_message', (msg) => {
      console.log('📩 New Message:', msg);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  // ✅ Emit helpers
  const sendMessageClient = (
    content: string,
    type = 'TEXT',
    fileId: string | null = null,
  ) => {
    socketRef.current?.emit('private:send_message_client', {
      content,
      type,
      fileId,
    });
  };

  const sendMessageAdmin = (
    clientId: string,
    content: string,
    type = 'TEXT',
    fileId: string | null = null,
  ) => {
    socketRef.current?.emit('private:send_message_admin', {
      clientId,
      content,
      type,
      fileId,
    });
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        userId,
        sendMessageClient,
        sendMessageAdmin,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
