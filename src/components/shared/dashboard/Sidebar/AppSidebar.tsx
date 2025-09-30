"use client";
import * as React from "react";
import logo from "@/assets/header/logo.png";
import dashboardIcon from "@/assets/dashboard/sidebar/dashboardIcon.svg";
import dumballIcon from "@/assets/dashboard/sidebar/dumbalIcon.svg";
import clientIcon from "@/assets/dashboard/sidebar/clientIcon.svg";
import messageIcon from "@/assets/dashboard/sidebar/messageIcon.svg";
import settingsIcon from "@/assets/dashboard/sidebar/settingIcon.svg";
import progressIcon from "@/assets/dashboard/sidebar/progressIcon.svg";
import calendarIcon from "@/assets/dashboard/sidebar/calenderIcon.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
const isVisible = (path: string, pathname: string) => {
  return pathname?.startsWith(path) ?? false;
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard/admin/overview",
      icon: dashboardIcon.src,
      show: isVisible("/dashboard/admin", pathname),
    },
    {
      title: "All Clients",
      url: "/dashboard/admin/all-clients",
      icon: clientIcon.src,
      show: isVisible("/dashboard/admin", pathname),
    },
    {
      title: "Clients Program Builder",
      url: "/dashboard/admin/clients-programm-builders",
      icon: calendarIcon.src,
      show: isVisible("/dashboard/admin", pathname),
    },
    {
      title: "Exercise Library",
      icon: dumballIcon.src,
      show: isVisible("/dashboard/admin", pathname), // parent visible if we’re inside /dashboard/admin/*
      items: [
        {
          title: "All Exercise",
          url: "/dashboard/admin/all-exercise",
          show: isVisible("/dashboard/admin", pathname),
        },
        {
          title: "Add Exercise",
          url: "/dashboard/admin/add-exercise",
          show: isVisible("/dashboard/admin", pathname),
        },
      ],
    },
    {
      title: "Progress Tracking",
      url: "/dashboard/admin/progress-tracking",
      icon: progressIcon.src,
      show: isVisible("/dashboard/admin", pathname),
    },
    {
      title: "Messages",
      url: "/dashboard/admin/messages",
      icon: messageIcon.src,
      show: isVisible("/dashboard/admin", pathname),
    },
    {
      title: "Settings",
      url: "/dashboard/admin/settings",
      icon: settingsIcon.src,
      show: isVisible("/dashboard/admin", pathname),
    },

    //User Sidebar
    {
      title: "Dashboard",
      url: "/dashboard/user/overview",
      icon: dashboardIcon.src,
      show: isVisible("/dashboard/user", pathname),
    },
    {
      title: "Assigned Programs",
      url: "/dashboard/user/assigned-programs",
      icon: calendarIcon.src,
      show: isVisible("/dashboard/user", pathname),
    },
    {
      title: "Exercise Library",
      url: "/dashboard/user/exercise-library",
      icon: dumballIcon.src,
      show: isVisible("/dashboard/user", pathname),
    },
    {
      title: "Progress Tracking",
      url: "/dashboard/user/progress-tracking",
      icon: progressIcon.src,
      show: isVisible("/dashboard/user", pathname),
    },
    {
      title: "Messages",
      url: "/dashboard/user/messages",
      icon: messageIcon.src,
      show: isVisible("/dashboard/user", pathname),
    },
    {
      title: "Settings",
      url: "/dashboard/user/settings",
      icon: settingsIcon.src,
      show: isVisible("/dashboard/user", pathname),
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
