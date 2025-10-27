'use client';

import { EventsEnum } from '@/enum/events.enum';
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

    // On successful auth, server sends user data
    socket.on(EventsEnum.SUCCESS, (data) => {
      setCurrentUser(data?.data);
      setCurrentUserRole(data?.data?.role);
    });

    // On error
    socket.on(EventsEnum.ERROR, (err) => {
      console.error('Socket Error:', err);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        currentUser,
        currentUserRole,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
