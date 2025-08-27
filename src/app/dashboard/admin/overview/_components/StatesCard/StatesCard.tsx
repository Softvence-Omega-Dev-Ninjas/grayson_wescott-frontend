import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface IStatesCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: LucideIcon;
  className?: string;
}

export function StatesCard({ title, value, change, icon: Icon, className }: IStatesCardProps) {
  return (
    <div className={cn("bg-primary-200 border border-[#a5a7ac] ", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-white">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className={cn("text-sm text-white")}>{change}</p>
          </div>
          {Icon && (
            <div className="h-12 w-12 text-white bg-secondary p-2">
              <Icon className="h-full w-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
