/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { EventsEnum } from '@/enum/events.enum';
import { useSocket } from '@/hooks/useSocket';
import { CallType, Sender } from '@/types/chat.types';
import { ArrowLeft, Phone, Video } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import IncomingCallModal from './call/IncomingCallModal';

export default function ChatHeader({
  onBack,
  participant,
}: {
  onBack: () => void;
  participant?: Sender;
}) {
  const { socket, currentUser, currentConversationId } = useSocket();
  const [incomingCall, setIncomingCall] = useState<{
    visible: boolean;
    callerName?: string;
    callId?: string;
    callType?: 'AUDIO' | 'VIDEO';
  }>({ visible: false });

  if (!socket || !currentUser) return null;

  // --- handle initiate call ---
  const handleInitiateCall = (type: 'AUDIO' | 'VIDEO') => {
    if (!currentConversationId) return console.warn('No active conversation.');

    socket.emit(
      EventsEnum.CALL_INITIATE,
      { conversationId: currentConversationId, type },
      (response: any) => console.log('📤 CALL_INITIATE response:', response),
    );
  };

  // --- listen for CALL_INCOMING ---
  useEffect(() => {
    const onIncoming = (payload: any) => {
      console.log('📥 CALL_INCOMING received:', payload);
      const { data } = payload;
      setIncomingCall({
        visible: true,
        callerName: data?.initiatorId || 'Unknown',
        callId: data?.id,
        callType: data?.type,
      });
    };

    socket.on(EventsEnum.CALL_INCOMING, onIncoming);

    return () => {
      socket.off(EventsEnum.CALL_INCOMING, onIncoming);
    };
  }, [socket]);

  // --- accept / reject handlers ---
  const handleAccept = () => {
    if (!incomingCall.callId) return;
    socket.emit(EventsEnum.CALL_ACCEPT, { callId: incomingCall.callId });
    setIncomingCall({ visible: false });
  };

  const handleReject = () => {
    if (!incomingCall.callId) return;
    socket.emit(EventsEnum.CALL_REJECT, { callId: incomingCall.callId });
    setIncomingCall({ visible: false });
  };

  return (
    <>
      <div className="bg-[#151519] flex items-center justify-between p-4 border-b border-gray-700 rounded-t-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="lg:hidden text-white">
            <ArrowLeft size={20} />
          </button>

          <Image
            src={
              participant?.avatarUrl ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                participant?.name || 'Carbon Engines',
              )}`
            }
            alt={participant?.name || 'Your Trainer'}
            width={44}
            height={44}
            className="rounded-full object-cover"
          />

          <div>
            <div className="font-semibold text-white">
              {participant?.name || 'Your Trainer'}
            </div>
            <div className="text-gray-400 text-sm">
              {participant?.email || 'Gym Support'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleInitiateCall('AUDIO')}
            className="text-gray-300 hover:text-white transition"
          >
            <Phone size={20} />
          </button>
          <button
            onClick={() => handleInitiateCall('VIDEO')}
            className="text-gray-300 hover:text-white transition"
          >
            <Video size={20} />
          </button>
        </div>
      </div>

      {/* Incoming Call Modal */}
      <IncomingCallModal
        visible={incomingCall.visible}
        callerName={incomingCall.callerName as string}
        callType={incomingCall.callType as CallType}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </>
  );
}
