// components/RecentMessages.tsx

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample data for the messages
const recentMessages = [
  {
    id: "1",
    sender: "Sarah Martinez",
    type: "user",
    avatar: "/placeholder-avatar.png", // Replace with an actual image path
    timestamp: "2 hours ago",
    content: "Great job on yesterday's session! Let's increase the weight on squats next week.",
  },
  {
    id: "2",
    sender: "System Notification",
    type: "system",
    avatar: "", // No avatar for system, will use an icon
    timestamp: "1 day ago",
    content: "New exercise videos have been added to your library. Check them out!",
  },
];

export function RecentMessages() {
  return (
    <div className=" bg-primary-200 text-white my-10">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold">Recent Messages</h2>
        <a href="#" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
          View All
        </a>
      </div>

      {/* Messages List */}
      <div className="divide-y divide-gray-800">
        {recentMessages.map((message) => (
          <div key={message.id} className="p-4 flex gap-4">
            {message.type === "user" ? (
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src={message.avatar} alt={message.sender} />
                <AvatarFallback>{message.sender.substring(0, 2)}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-800 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-megaphone"
                >
                  <path d="m3 11 18-5v12L3 18V11Z" />
                  <path d="M7 6v12" />
                  <path d="M22 6h-2" />
                  <path d="M22 18h-2" />
                  <path d="M16 4h-2" />
                  <path d="M16 20h-2" />
                </svg>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <p className="font-medium text-white">{message.sender}</p>
                <p className="text-sm text-gray-400">{message.timestamp}</p>
              </div>
              <p className="text-sm text-gray-300 mt-1 break-words">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
