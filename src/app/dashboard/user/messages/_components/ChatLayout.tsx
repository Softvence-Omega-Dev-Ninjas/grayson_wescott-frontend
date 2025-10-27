'use client';

import { EventsEnum } from '@/enum/events.enum';
import { useSocket } from '@/hooks/useSocket';
import { ChatItem, ConversationResponse } from '@/types/chat.types';
import { useCallback, useEffect, useRef, useState } from 'react';
import ChatDetails from './ChatDetails';

const DEFAULT_LIMIT = 15;

export default function ChatLayout() {
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
  const handleConversationList = useCallback((res: ConversationResponse) => {
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
  }, []);

  // request a page from server
  const fetchPage = useCallback(
    (pageToFetch: number) => {
      if (!socket || !currentUser) return;
      setLoadingMore(pageToFetch > 1);
      socket.emit(EventsEnum.LOAD_CLIENT_CONVERSATION, {
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
    socket.on(EventsEnum.CLIENT_CONVERSATION, handleConversationList);

    return () => {
      socket.off(EventsEnum.CLIENT_CONVERSATION, handleConversationList);
    };
  }, [socket, currentUser, fetchPage, handleConversationList]);

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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-[calc(100vh-80px-60px)] flex gap-5 w-full bg-black text-white p-2">
      <div className="flex-1 min-w-0">
        <ChatDetails
          chat={items}
          onBack={() => {}}
          scrollContainerRef={
            scrollContainerRef as React.RefObject<HTMLDivElement>
          }
          loadingMore={loadingMore}
        />
      </div>
    </div>
  );
}
