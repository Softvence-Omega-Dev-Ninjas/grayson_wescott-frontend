'use client';

import ChatMessages from '@/app/dashboard/user/messages/_components/components/ChatMessages';
import { EventsEnum } from '@/enum/events.enum';
import { useSocket } from '@/hooks/useSocket';
import {
  ChatItem,
  NewMessageResponse,
  SingleConversationResponse,
} from '@/types/chat.types';
import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_LIMIT = 15;

export default function ChatDetails({
  selectedConversationId,
}: {
  selectedConversationId: string | null;
}) {
  if (!selectedConversationId) {
    return (
      <div className="flex items-center justify-center bg-[#151519] text-gray-400 rounded-lg">
        Select a chat to start messaging
      </div>
    );
  }

  const { socket, currentUser } = useSocket();

  const [items, setItems] = useState<ChatItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(DEFAULT_LIMIT);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const prevScrollHeightRef = useRef<number>(0);

  // emit request to load a page
  const fetchPage = useCallback(
    (pageToFetch: number) => {
      if (!socket || !currentUser || !selectedConversationId) return;
      setLoadingMore(pageToFetch > 1);
      if (pageToFetch === 1) setLoading(true);
      socket.emit(EventsEnum.LOAD_SINGLE_CONVERSATION, {
        conversationId: selectedConversationId,
        page: pageToFetch,
        limit,
      });
    },
    [socket, currentUser, selectedConversationId, limit],
  );

  // register listeners and reset state when conversation changes
  useEffect(() => {
    if (!socket || !currentUser || !selectedConversationId) return;

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
    };

    // server -> client: new message pushed
    const onNewMessage = (res: NewMessageResponse) => {
      console.log('📤 NEW_MESSAGE', res);
      if (!res?.data) return;
      setItems((prev) => [...prev, res.data]);
      requestAnimationFrame(() => {
        const c = scrollContainerRef.current;
        if (c) c.scrollTop = c.scrollHeight;
      });
    };

    socket.on(EventsEnum.SINGLE_CONVERSATION, onSingleConversation);
    socket.on(EventsEnum.NEW_MESSAGE, onNewMessage);

    return () => {
      socket.off(EventsEnum.SINGLE_CONVERSATION, onSingleConversation);
      socket.off(EventsEnum.NEW_MESSAGE, onNewMessage);
    };
  }, [socket, currentUser, selectedConversationId, fetchPage]);

  // scroll -> load older pages when near top
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (container.scrollTop <= 80 && !loadingMore && page < totalPage) {
          fetchPage(page + 1);
        }
        ticking = false;
      });
    };

    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, [page, totalPage, loadingMore, fetchPage]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-full flex flex-col bg-black text-white rounded-lg">
      <ChatMessages
        chat={items}
        scrollContainerRef={
          scrollContainerRef as React.RefObject<HTMLDivElement>
        }
        loadingMore={loadingMore}
      />
    </div>
  );
}
