'use client';

import { UserRole } from '@/types/user.types';
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
  currentUser: SocketUser | null;
  currentUserRole: UserRole | null;
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

interface SocketUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
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
  const [currentUser, setCurrentUser] = useState<SocketUser | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);

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
      setCurrentUser(data?.data);
      setCurrentUserRole(data?.data?.role);
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
        currentUser,
        currentUserRole,
        sendMessageClient,
        sendMessageAdmin,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
