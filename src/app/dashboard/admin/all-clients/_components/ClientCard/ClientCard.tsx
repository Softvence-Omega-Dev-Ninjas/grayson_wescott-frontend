import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { MessageCircle, MoreHorizontal, User } from "lucide-react";
import Link from "next/link";

interface ClientCardProps {
  id: string;
  name: string;
  avatar?: string;
  status: "Active" | "Inactive" | "On Hold";
  program: string;
  progress: number;
  lastActive: string;
  range?: string;
}

export function ClientCard({ name, avatar, status, program, progress, lastActive }: ClientCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-600 text-white hover:bg-green-700";
      case "Inactive":
        return "bg-gray-600 text-gray-200 hover:bg-gray-700";
      case "On Hold":
        return "bg-orange-600 text-white hover:bg-orange-700";
      default:
        return "bg-green-600 text-white hover:bg-green-700";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="w-full bg-primary-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between flex-wrap mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-gray-700">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-lg text-white">{name}</h3>
              <h3 className="text-sm text-white font-light">{"demo@gmail.com"}</h3>
            </div>
          </div>
          <span className={`text-xs mt-1 px-2 py-1 font-medium ${getStatusColor(status)}`}>{status}</span>
        </div>

        <div className="space-y-2 mb-4 text-base font-medium">
          <div className="flex items-center justify-between gap-2">
            <p>Program:</p>
            <p>{program}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p>Progress:</p>
            <p>{progress}%</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p>Last Active:</p>
            <p className="font-semibold text-white ">{lastActive}</p>
          </div>
        </div>

        <Progress value={33} className="mb-5" />

        <div className="flex items-center justify-between gap-1.5">
          <Link href={`/dashboard/admin/all-clients/${1}`}>
            <Button
              variant="outline"
              size="sm"
              className="bg-secondary text-xs w-full flex-1 border-gray-800 text-white hover:bg-gray-800 hover:text-white cursor-pointer"
            >
              <User className="h-3 w-3 mr-1" />
              View Profile
            </Button>
          </Link>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-primary-200 border border-gray-800">
                <DropdownMenuItem className="text-white hover:bg-gray-800">Edit Client</DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-gray-800">View Details</DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 hover:bg-gray-800">Delete Client</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
