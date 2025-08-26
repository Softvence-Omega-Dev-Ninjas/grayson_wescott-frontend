"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
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
    <div className={"border border-secondary bg-primary-200 mt-10"}>
      <div className="pb-4 bg-secondary px-3 py-4">
        <h1 className="text-lg font-semibold text-white">{"Recent Activity"}</h1>
      </div>
      <div className="p-0">
        {/* Responsive table container with horizontal scroll on small devices */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {sampleActivities.map((activity, index) => (
              <div
                key={activity.id}
                className={cn(
                  "flex items-center justify-between p-4 hover:bg-muted/50 transition-colors",
                  "border-b border-secondary",
                  index === sampleActivities.length - 1 ? "border-b-0" : ""
                )}
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1 py-4 px-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                    <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground truncate">
                      <span className="font-medium text-lg">{activity.user.name}</span> {activity.action}
                    </p>
                    <p className="text-xs text-white/85">{activity.timestamp}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <span>{activity.status.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* {showViewAll && (
          <div className="p-4 border-t border-border">
            <Button variant="ghost" size="sm" onClick={onViewAll} className="w-full justify-center text-muted-foreground hover:text-foreground">
              View all activity →
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
}
