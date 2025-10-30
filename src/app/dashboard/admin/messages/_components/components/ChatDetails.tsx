'use client';

import ChatHeader from '@/app/dashboard/user/messages/_components/components/ChatHeader';
import ChatInput from '@/app/dashboard/user/messages/_components/components/ChatInput';
import ChatMessages from '@/app/dashboard/user/messages/_components/components/ChatMessages';
import { EventsEnum } from '@/enum/events.enum';
import { useSocket } from '@/hooks/useSocket';
import {
  ChatItem,
  NewMessageResponse,
  Sender,
  SingleConversationResponse,
} from '@/types/chat.types';
import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_LIMIT = 60;

export default function ChatDetails() {
  const { currentConversationId } = useSocket();

  if (!currentConversationId) {
    return (
      <div className="flex items-center justify-center bg-[#151519] text-gray-400 rounded-lg">
        Select a chat to start messaging
      </div>
    );
  }

  const { socket, currentUser } = useSocket();

  const [items, setItems] = useState<ChatItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [participant, setParticipant] = useState<Sender | null>(null);
  const [limit] = useState<number>(DEFAULT_LIMIT);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const prevScrollHeightRef = useRef<number>(0);

  // emit request to load a page
  const fetchPage = useCallback(
    (pageToFetch: number) => {
      if (!socket || !currentUser || !currentConversationId) return;
      setLoadingMore(pageToFetch > 1);
      if (pageToFetch === 1) setLoading(true);
      socket.emit(EventsEnum.LOAD_SINGLE_CONVERSATION, {
        conversationId: currentConversationId,
        page: pageToFetch,
        limit,
      });
    },
    [socket, currentUser, currentConversationId, limit],
  );

  // register listeners and reset state when conversation changes
  useEffect(() => {
    if (!socket || !currentUser || !currentConversationId) return;

    // reset everything for the new conversation
    setItems([]);
    setPage(1);
    setTotalPage(1);
    setLoading(true);
    setLoadingMore(false);
    prevScrollHeightRef.current = 0;
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;

    // request first page
    fetchPage(1);

    // server -> client: single conversation (paginated)
    const onSingleConversation = (res: SingleConversationResponse) => {
      console.log('📤 SINGLE_CONVERSATION', res);
      const resPage = res?.metadata?.page ?? 1;
      const resTotalPage = res?.metadata?.totalPage ?? 1;
      const data = Array.isArray(res.data) ? res.data : [];
      const chronological = [...data].reverse(); // oldest -> newest

      if (resPage === 1) {
        setItems(chronological);
        // after initial load, scroll to bottom
        requestAnimationFrame(() => {
          const c = scrollContainerRef.current;
          if (c) c.scrollTop = c.scrollHeight;
        });
      } else {
        // preserve viewport position when prepending older messages
        const prevScroll = scrollContainerRef.current?.scrollHeight ?? 0;
        prevScrollHeightRef.current = prevScroll;

        setItems((prev) => [...chronological, ...prev]);

        requestAnimationFrame(() => {
          const cur = scrollContainerRef.current;
          if (!cur) return;
          const newScroll = cur.scrollHeight;
          cur.scrollTop = newScroll - prevScrollHeightRef.current;
        });
      }

      setPage(resPage);
      setTotalPage(resTotalPage);
      setLoading(false);
      setLoadingMore(false);

      // update participant (the one with role of "USER")
      const userParticipant = res.participants.find((p) => p.role === 'USER');

      if (userParticipant) {
        setParticipant(userParticipant);
      }
    };

    socket.on(EventsEnum.SINGLE_CONVERSATION, onSingleConversation);

    return () => {
      socket.off(EventsEnum.SINGLE_CONVERSATION, onSingleConversation);
    };
  }, [socket, currentUser, currentConversationId, fetchPage]);

  // attach scroll listener for auto-pagination (load older on scroll top)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        // if near top and more pages exist, fetch next page
        if (container.scrollTop <= 80 && !loadingMore && page < totalPage) {
          fetchPage(page + 1);
        }
        ticking = false;
      });
    };

    container.addEventListener('scroll', onScroll);
    return () => {
      container.removeEventListener('scroll', onScroll);
    };
  }, [page, totalPage, loadingMore, fetchPage]);

  // append new message
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (res: NewMessageResponse) => {
      const message = res?.data;
      if (!message) return;

      const isMine = message.sender.id === currentUser?.id;
      const isCurrentConversation =
        message.conversationId === currentConversationId;

      // Ignore messages not relevant to current conversation (unless it's ours)
      if (!isMine && !isCurrentConversation) {
        console.log('📤 Message does not belong to current conversation');
        return;
      }

      // Append message to items
      setItems((prev) => [...prev, message]);

      // Scroll to bottom for newest message
      requestAnimationFrame(() => {
        const container = scrollContainerRef.current;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    };

    socket.on(EventsEnum.NEW_MESSAGE, handleNewMessage);

    return () => {
      socket.off(EventsEnum.NEW_MESSAGE, handleNewMessage);
    };
  }, [
    socket,
    currentConversationId,
    currentUser?.id,
    setItems,
    scrollContainerRef,
  ]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-full flex flex-col bg-black text-white rounded-lg">
      <ChatHeader
        onBack={() => {
          setItems([]);
          setPage(1);
          setTotalPage(1);
          setLoading(true);
          setLoadingMore(false);
          prevScrollHeightRef.current = 0;
        }}
        participant={participant as Sender}
      />
      <ChatMessages
        chat={items}
        scrollContainerRef={
          scrollContainerRef as React.RefObject<HTMLDivElement>
        }
        loadingMore={loadingMore}
      />
      <ChatInput participantId={participant?.id} />
    </div>
  );
}
