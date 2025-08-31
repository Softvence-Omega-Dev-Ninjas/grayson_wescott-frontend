const messagesData = [
  {
    type: "reminder",
    title: "Workout Reminder",
    message: "You have your workout scheduled for at 5:00",
    time: "2 hours ago",
    priority: "high",
  },
  {
    type: "message",
    title: "Trainer Message",
    message: "Great job on yesterday's session! Let's push even harder by 5lbs next time.",
    time: "1 day ago",
    priority: "normal",
  },
  {
    type: "reminder",
    title: "Rest Day Reminder",
    message: "Don't forget to take your scheduled rest day tomorrow.",
    time: "3 days ago",
    priority: "normal",
  },
]

export function MessagesPanel() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Messages & Reminders</h2>
        <button className="text-blue-400 text-sm hover:text-blue-300">+ New</button>
      </div>

      <div className="space-y-3">
        {messagesData.map((message, index) => (
          <div
            key={index}
            className={`bg-[#2A2D33] rounded-lg p-4 border-l-4 ${
              message.priority === "high" ? "border-slate-600" : "border-slate-600"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  message.type === "reminder" ? "bg-blue-600" : "bg-slate-600"
                }`}
              >
                {message.type === "reminder" ? "🔔" : "💬"}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{message.title}</h4>
                <p className="text-slate-400 text-sm mt-1">{message.message}</p>
                <span className="text-xs text-slate-500 mt-2 block">{message.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
