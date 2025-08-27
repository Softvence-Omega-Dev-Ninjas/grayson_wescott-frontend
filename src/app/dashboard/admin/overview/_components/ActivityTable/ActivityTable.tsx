"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import dp from "@/assets/home/banner.png";

const sampleActivities = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      initials: "SJ",
      avatar: dp.src,
    },
    action: "completed Week 3 of 'Advanced HIIT Program'",
    timestamp: "2 hours ago",
    status: {
      label: "Progress",
      variant: "default" as const,
    },
  },
  {
    id: "2",
    user: {
      name: "Sarah Johnson",
      initials: "SJ",
      avatar: dp.src,
    },
    action: "completed Week 3 of 'Advanced HIIT Program'",
    timestamp: "2 hours ago",
    status: {
      label: "New Signup",
      variant: "secondary" as const,
    },
  },
  {
    id: "3",
    user: {
      name: "Sarah Johnson",
      initials: "SJ",
      avatar: dp.src,
    },
    action: "completed Week 3 of 'Advanced HIIT Program'",
    timestamp: "2 hours ago",
    status: {
      label: "Payment",
      variant: "default" as const,
    },
  },
  {
    id: "4",
    user: {
      name: "Sarah Johnson",
      initials: "SJ",
      avatar: dp.src,
    },
    action: "completed Week 3 of 'Advanced HIIT Program'",
    timestamp: "2 hours ago",
    status: {
      label: "Milestone",
      variant: "outline" as const,
    },
  },
  {
    id: "5",
    user: {
      name: "Sarah Johnson",
      initials: "SJ",
      avatar: dp.src,
    },
    action: "completed Week 3 of 'Advanced HIIT Program'",
    timestamp: "2 hours ago",
    status: {
      label: "New Signup",
      variant: "secondary" as const,
    },
  },
];

export function ActivityTable() {
  return (
    <div className="border border-secondary bg-primary-200 mt-10 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-secondary px-4 py-3">
        <h1 className="text-lg font-semibold text-white">Recent Activity</h1>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-secondary">
        {sampleActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 hover:bg-muted/50 transition-colors"
          >
            {/* User + Action */}
            <div className="flex items-start sm:items-center gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm text-foreground break-words">
                  <span className="font-medium text-base sm:text-lg">{activity.user.name}</span> {activity.action}
                </p>
                <p className="text-xs text-white/85">{activity.timestamp}</p>
              </div>
            </div>

            {/* Status */}
            <div className="sm:text-right">
              <span className="text-sm font-medium">{activity.status.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-secondary flex items-center justify-end">
        <Button variant="ghost" size="sm" className="justify-center text-muted-foreground hover:text-foreground">
          View all activity →
        </Button>
      </div>
    </div>
  );
}
