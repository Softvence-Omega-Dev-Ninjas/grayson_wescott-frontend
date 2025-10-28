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

  // chronological order: oldest -> newest
  const [items, setItems] = useState<ChatItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  // ref to scroll container inside ChatDetails
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  // store previous scrollHeight when loading older pages
  const prevScrollHeightRef = useRef<number>(0);

  // handle socket response (paginated)
  const handleLoadConversation = useCallback(
    (res: SingleConversationResponse) => {
      console.log('📤 Conversation:', res);
      const resPage = res?.metadata?.page ?? 1;
      const resLimit = res?.metadata?.limit ?? DEFAULT_LIMIT;
      const resTotalPage = res?.metadata?.totalPage ?? 1;
      const data = Array.isArray(res.data) ? res.data : [];

      // server sends newest-first (desc). convert to chronological (oldest -> newest)
      const chronological = [...data].reverse();

      if (resPage === 1) {
        setItems(chronological);
        // after initial load, scroll to bottom
        requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop =
              scrollContainerRef.current.scrollHeight;
          }
        });
      } else {
        // preserve scroll position: remember previous scrollHeight
        const prevScroll = scrollContainerRef.current?.scrollHeight ?? 0;
        prevScrollHeightRef.current = prevScroll;

        // prepend older messages (chronological contains older->newer for that page)
        setItems((prev) => [...chronological, ...prev]);

        // restore scroll position after DOM updates
        requestAnimationFrame(() => {
          const cur = scrollContainerRef.current;
          if (!cur) return;
          const newScroll = cur.scrollHeight;
          // keep the viewport at the same message (anchor)
          cur.scrollTop = newScroll - prevScrollHeightRef.current;
        });
      }

      setPage(resPage);
      setLimit(resLimit);
      setTotalPage(resTotalPage);
      setLoading(false);
      setLoadingMore(false);
    },
    [],
  );

  // request a page from server
  const fetchPage = useCallback(
    (pageToFetch: number) => {
      if (!socket || !currentUser) return;
      setLoadingMore(pageToFetch > 1);
      socket.emit(EventsEnum.LOAD_SINGLE_CONVERSATION, {
        conversationId: selectedConversationId,
        page: pageToFetch,
        limit,
      });
    },
    [socket, currentUser, limit],
  );

  // initial load
  useEffect(() => {
    if (!socket || !currentUser) return;
    setLoading(true);
    fetchPage(1);
    socket.on(EventsEnum.SINGLE_CONVERSATION, handleLoadConversation);

    return () => {
      socket.off(EventsEnum.SINGLE_CONVERSATION, handleLoadConversation);
    };
  }, [
    socket,
    currentUser,
    fetchPage,
    handleLoadConversation,
    selectedConversationId,
  ]);

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
      console.log('📤 New message:', res);
      if (!res?.data) return;

      // append new message
      setItems((prev) => [...prev, res.data]);

      // scroll to bottom for newest message
      requestAnimationFrame(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        container.scrollTop = container.scrollHeight;
      });
    };

    socket.on(EventsEnum.NEW_MESSAGE, handleNewMessage);

    return () => {
      socket.off(EventsEnum.NEW_MESSAGE, handleNewMessage);
    };
  }, [socket]);

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
