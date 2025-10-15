/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { MessageCircle, MoreHorizontal, User } from 'lucide-react';
import Link from 'next/link';

export function ClientCard(client: any) {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-900/30 text-green-400 border border-green-800';
      case 'DEACTIVATED':
        return 'bg-yellow-900/30 text-yellow-400 border border-yellow-800';
      case 'SUSPENDED':
        return 'bg-red-900/30 text-red-400 border border-red-800';
      case 'ON_HOLD':
        return 'bg-gray-900/30 text-gray-400 border border-gray-800';
      default:
        return '';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="w-full bg-primary-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between flex-wrap mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-gray-700">
              <AvatarImage
                src={client?.userInfo?.avatarUrl || '/placeholder.svg'}
                alt={client?.userInfo?.name}
              />
              <AvatarFallback>
                {getInitials(client?.userInfo?.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-lg text-white">
                {client?.userInfo?.name}
              </h3>
              <h3 className="text-sm text-white font-light">
                {client?.userInfo?.email}
              </h3>
            </div>
          </div>
          <span
            className={`text-xs mt-1 px-2 py-1 font-medium ${getStatusClasses(client?.userInfo?.status)}`}
          >
            {client?.userInfo?.status}
          </span>
        </div>

        <div className="space-y-2 mb-4 text-base font-medium">
          <div className="flex items-center justify-between gap-2">
            <p>Program:</p>
            <p>{client?.latestAssignedProgram?.programName}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p>Progress:</p>
            <p>{client?.latestAssignedProgram?.completionPercentage}%</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p>Last Active:</p>
            <p className="font-semibold text-white ">
              {client?.userInfo?.status}
            </p>
          </div>
        </div>

        <Progress
          value={client?.latestAssignedProgram?.completionPercentage}
          className="mb-5"
        />

        <div className="flex items-center justify-between gap-1.5">
          <Link href={`/dashboard/admin/all-clients/${client?.userInfo?.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="bg-secondary text-xs w-full flex-1 border-gray-800 text-white hover:bg-gray-800 hover:text-white cursor-pointer rounded-none"
            >
              <User className="h-3 w-3 mr-1" />
              View Profile
            </Button>
          </Link>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 rounded-none"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 rounded-none"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-primary-200 border border-gray-800"
              >
                <DropdownMenuItem className="text-white hover:bg-gray-800">
                  Edit Client
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-gray-800">
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 hover:bg-gray-800">
                  Delete Client
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
