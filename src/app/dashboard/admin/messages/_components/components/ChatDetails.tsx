'use client';

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

  return (
    <div className="h-full flex flex-col bg-black text-white rounded-lg"></div>
  );
}
