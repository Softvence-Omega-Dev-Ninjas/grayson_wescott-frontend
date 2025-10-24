'use client';
import calendarIcon from '@/assets/dashboard/sidebar/calenderIcon.svg';
import clientIcon from '@/assets/dashboard/sidebar/clientIcon.svg';
import dashboardIcon from '@/assets/dashboard/sidebar/dashboardIcon.svg';
import dumballIcon from '@/assets/dashboard/sidebar/dumbalIcon.svg';
import categoryIcon from '@/assets/dashboard/sidebar/layers.svg';
import messageIcon from '@/assets/dashboard/sidebar/messageIcon.svg';
import progressIcon from '@/assets/dashboard/sidebar/progressIcon.svg';
import settingsIcon from '@/assets/dashboard/sidebar/settingIcon.svg';
import logo from '@/assets/header/logo.png';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import useUser from '@/hooks/useUser';
import Image from 'next/image';
import Link from 'next/link';
import { NavMain } from './NavMain';
import { NavUser } from './NavUser';
// const isVisible = (path: string, pathname: string) => {
//   return pathname?.startsWith(path) ?? false;
// };
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  console.log('++++++++++++++++++++', user);
  const navMain = [
    {
      title: 'Dashboard',
      url: '/dashboard/admin/overview',
      icon: dashboardIcon.src,
      show: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    },
    {
      title: 'Manage Categories',
      url: '/dashboard/admin/manage-categories',
      icon: categoryIcon.src,
      show: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    },
    {
      title: 'All Clients',
      url: '/dashboard/admin/all-clients',
      icon: clientIcon.src,
      show: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    },
    {
      title: 'Clients Program Builder',
      url: '/dashboard/admin/clients-programm-builders',
      icon: calendarIcon.src,
      show: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    },
    {
      title: 'Exercise Library',
      icon: dumballIcon.src,
      show: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN', // parent visible if we’re inside /dashboard/admin/*
      items: [
        {
          title: 'All Exercise',
          url: '/dashboard/admin/all-exercise',
          show: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
        },
        {
          title: 'Add Exercise',
          url: '/dashboard/admin/add-exercise',
          show: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
        },
      ],
    },
    {
      title: 'Progress Tracking',
      url: '/dashboard/admin/progress-tracking',
      icon: progressIcon.src,
      show: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    },
    {
      title: 'Messages',
      url: '/dashboard/admin/messages',
      icon: messageIcon.src,
      show: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    },
    {
      title: 'Settings',
      url: '/dashboard/admin/settings',
      icon: settingsIcon.src,
      show: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    },

    //User Sidebar
    {
      title: 'Dashboard',
      url: '/dashboard/user/overview',
      icon: dashboardIcon.src,
      show: user?.role === 'USER',
    },
    {
      title: 'Assigned Programs',
      url: '/dashboard/user/assigned-programs',
      icon: calendarIcon.src,
      show: user?.role === 'USER',
    },
    {
      title: 'Exercise Library',
      url: '/dashboard/user/exercise-library',
      icon: dumballIcon.src,
      show: user?.role === 'USER',
    },
    {
      title: 'Progress Tracking',
      url: '/dashboard/user/progress-tracking',
      icon: progressIcon.src,
      show: user?.role === 'USER',
    },
    {
      title: 'Messages',
      url: '/dashboard/user/messages',
      icon: messageIcon.src,
      show: user?.role === 'USER',
    },
    {
      title: 'Settings',
      url: '/dashboard/user/settings',
      icon: settingsIcon.src,
      show: user?.role === 'USER',
    },
  ];

  return (
    <Sidebar collapsible="offcanvas" {...props} className="bg-black">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="mt-2">
                <div className="text-2xl font-bold text-white">
                  <Link href="/">
                    <Image src={logo} alt="logo"></Image>
                  </Link>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-2">
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
