'use client';

import UserProvider from '@/context/UserContext';
import { SocketProvider } from '@/providers/SocketProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: React.ReactNode;
  token: string | null;
}

const Providers = ({ children, token }: ProvidersProps) => {
  return (
    <UserProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <Toaster position="top-center" />
        {/* Socket only mounts if token exists */}
        {token ? (
          <SocketProvider token={token}>{children}</SocketProvider>
        ) : (
          children
        )}
      </GoogleOAuthProvider>
    </UserProvider>
  );
};

export default Providers;
