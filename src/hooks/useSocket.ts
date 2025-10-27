import { useSocketContext } from '@/providers/SocketProvider';

export function useSocket() {
  const ctx = useSocketContext();
  if (!ctx) throw new Error('useSocket must be used inside <SocketProvider />');
  return ctx;
}
