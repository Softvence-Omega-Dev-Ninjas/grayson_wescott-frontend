'use client';

import { EventsEnum } from '@/enum/events.enum';
import { useSocket } from '@/hooks/useSocket';
import { Conversation, ConversationsListResponse } from '@/types/chat.types';
import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const PAGE_LIMIT = 10;

export default function ChatList() {
  const {
    socket,
    currentUser,
    currentConversationId,
    setCurrentConversationId,
  } = useSocket();

  // show a loading placeholder while socket/auth is not ready
  if (!socket || !currentUser) return <div>Loading...</div>;

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [pageMeta, setPageMeta] = useState({
    page: 1,
    limit: PAGE_LIMIT,
    total: 0,
    totalPage: 1,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const pendingPageRef = useRef<number | null>(null);
  const searchDebounceRef = useRef<number | null>(null);

  // dedupe helper
  const mergeAndDedupe = (
    existing: Conversation[],
    incoming: Conversation[],
  ) => {
    const map = new Map<string, Conversation>();
    // keep order: existing first, then incoming (but incoming overwrite)
    existing.forEach((c) => map.set(c.conversationId, c));
    incoming.forEach((c) => map.set(c.conversationId, c));
    return Array.from(map.values());
  };

  // Handler for socket response
  const handleConversationList = useCallback(
    (payload: ConversationsListResponse) => {
      setLoading(false);

      const incoming = payload.data ?? [];
      const meta = payload.metadata ?? {
        page: 1,
        limit: PAGE_LIMIT,
        total: incoming.length,
        totalPage: 1,
      };

      setPageMeta(meta);

      if (meta.page === 1) {
        // replace on page 1 (fresh search or initial load)
        setConversations(incoming);
      } else {
        // append and dedupe
        setConversations((prev) => mergeAndDedupe(prev, incoming));
      }

      // mark that pending load is complete
      pendingPageRef.current = null;
    },
    [],
  );

  // emit loader function
  const loadPage = useCallback(
    (page: number) => {
      // don't request if already loading or beyond last page
      if (loading) return;
      if (pageMeta.totalPage && page > pageMeta.totalPage) return;
      if (pendingPageRef.current === page) return;

      setLoading(true);
      pendingPageRef.current = page;

      socket.emit(EventsEnum.LOAD_CONVERSATION_LIST, {
        page,
        limit: PAGE_LIMIT,
        search: searchTerm?.trim(),
      });
    },
    [socket, pageMeta.totalPage, loading, searchTerm],
  );

  // initial load + listen for socket responses
  useEffect(() => {
    // request page 1
    loadPage(1);

    socket.on(EventsEnum.CONVERSATION_LIST, handleConversationList);

    return () => {
      socket.off(EventsEnum.CONVERSATION_LIST, handleConversationList);
    };
  }, [socket, handleConversationList]);

  // handle search with debounce: reset page to 1
  useEffect(() => {
    if (searchDebounceRef.current) {
      window.clearTimeout(searchDebounceRef.current);
    }
    searchDebounceRef.current = window.setTimeout(() => {
      // reset conversations and metadata then request page 1
      setConversations([]);
      setPageMeta((m) => ({ ...m, page: 1 }));
      loadPage(1);
    }, 300); // 300ms debounce

    return () => {
      if (searchDebounceRef.current) {
        window.clearTimeout(searchDebounceRef.current);
      }
    };
  }, [searchTerm]);

  // IntersectionObserver -> load next page when sentinel visible
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        const shouldLoadNext =
          entry.isIntersecting &&
          !loading &&
          pageMeta.page < pageMeta.totalPage;

        if (shouldLoadNext) {
          loadPage(pageMeta.page + 1);
        }
      },
      {
        root: null,
        rootMargin: '200px', // prefetch a bit before reaching bottom
        threshold: 0.1,
      },
    );

    const node = sentinelRef.current;
    if (node) observerRef.current.observe(node);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loading, pageMeta.page, pageMeta.totalPage, loadPage]);

  // helper to render last message safely without mutating the object
  const renderLastMessage = (m: Conversation['lastMessage']) => {
    if (!m) return '';

    if (m.type === 'AUDIO') return 'Voice message';
    if (m.type === 'IMAGE') return 'Image';
    if (m.type === 'FILE') return 'File';

    if (typeof m.content === 'string') return m.content;
    if (m.content == null) return '';

    try {
      return typeof m.content === 'object'
        ? JSON.stringify(m.content)
        : String(m.content);
    } catch {
      return String(m.content);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-white overflow-y-auto">
      {/* Search */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search conversations..."
          className="bg-gray-800 text-white rounded-lg p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {conversations.length === 0 && !loading && (
        <div className="p-4">
          <p className="text-gray-400">No conversations found.</p>
        </div>
      )}

      {conversations.map((chat) => {
        const profile = chat.profile ?? {};
        const lastMessageText = renderLastMessage(chat.lastMessage);
        const avatar = profile.avatarUrl;
        const name = profile.name ?? 'Unnamed';

        return (
          <div
            key={chat.conversationId}
            className={`flex justify-between items-center ${
              currentConversationId === chat.conversationId ? 'bg-gray-800' : ''
            } hover:bg-gray-800 p-4 cursor-pointer`}
            title={name}
          >
            <button
              onClick={() => setCurrentConversationId(chat.conversationId)}
              className="flex gap-2 items-center flex-1"
            >
              <div className="relative">
                <Image
                  src={avatar}
                  alt={name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                {profile.isOnline ? (
                  <div className="w-3 h-3 bg-green-600 rounded-full absolute bottom-0 right-0 ring-1 ring-black" />
                ) : (
                  <div className="w-3 h-3 bg-gray-600 rounded-full absolute bottom-0 right-0 ring-1 ring-black" />
                )}
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold truncate">{name}</h3>
                <p className="text-sm text-gray-400 truncate">
                  {lastMessageText}
                </p>
              </div>
            </button>

            <div className="pr-5 md:pr-0">
              <button className="cursor-pointer" aria-label="More actions">
                <EllipsisVertical size={16} />
              </button>
            </div>
          </div>
        );
      })}

      {/* sentinel for infinite scroll */}
      <div ref={sentinelRef} />

      {/* footer status */}
      <div className="p-3 text-center text-sm text-gray-400">
        {loading
          ? 'Loading...'
          : pageMeta.page >= pageMeta.totalPage
            ? 'No more conversations'
            : ''}
      </div>
    </div>
  );
}
