'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import useUser from '@/hooks/useUser';
import { logout } from '@/services/auth';
import { ChevronsUpDown, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { user, setIsLoading, setUser } = useUser();
  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    setUser(null);
    // if (protectedRoutes.some((route) => pathname.match(route))) {
    router.push('/');
    // }
  };

  return (
    <SidebarMenu className="rounded-2xl">
      <SidebarMenuItem className="bg-[#0B1A2A] py-1 focus:ring-0">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="rounded-2xl focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
            asChild
          >
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.avatarUrl} alt={'DP'} />
                <AvatarFallback className="rounded-lg">DP</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-light-primary-text dark:text-dark-primary-txt">
                  {user?.username}
                </span>
                <span className="truncate text-xs font-medium text-light-secondary-text dark:text-dark-secondary-txt">
                  {user?.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-light-primary-text dark:text-dark-primary-txt" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 bg-primary-200 border border-secondary font-medium"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatarUrl} alt={'DP'} />
                  <AvatarFallback className="rounded-lg">DP</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-white">
                    {user?.username}
                  </span>
                  <span className="truncate text-xs font-medium text-white">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border border-secondary" />
            <button
              onClick={() => handleLogOut()}
              className="cursor-pointer bg-secondary flex items-center gap-1 w-full  py-1 text-red-600 px-3 hover:text-red-500 hover:bg-secondary"
            >
              <LogOut />
              Log out
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
