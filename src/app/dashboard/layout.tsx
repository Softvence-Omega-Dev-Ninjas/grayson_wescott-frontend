"use client";
import { AppSidebar } from "@/components/shared/dashboard/Sidebar/AppSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useScrollTrigger from "@/hooks/useScrollTrigger";
import { ReactNode } from "react";
import avatar from "@/assets/dashboard/add-excercise/avatar.png";
import { MdOutlineNotificationsNone } from "react-icons/md";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { scrolled } = useScrollTrigger();
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-light-secondary-bg dark:bg-dark-secondary-bg">
          <header
            className={`flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 bg-primary-200 z-10 mx-0 md:mx-4 ${
              scrolled && "shadow-sm shadow-secondary"
            }`}
          >
            <div className="flex items-center justify-between gap-2 px-4 w-full">
              <div>
                <SidebarTrigger className="-ml-1 text-white" />
              </div>
              <div className="flex items-center gap-4 mr-2">
                <MdOutlineNotificationsNone className="text-xl" />
                <Avatar className="h-10 w-10">
                  <AvatarImage src={avatar.src} alt="Sarah Johnson" />
                  <AvatarFallback className="bg-gray-700 text-white">SJ</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>
          <div className="p-2 z-0">
            <div className="sm:p-5  min-h-[calc(100vh-80px-60px)]">{children}</div>
          </div>
          {/* <footer className="w-full px-4 py-3 text-sm text-gray-600 dark:text-gray-400 text-center">© 2025 Notefy. All rights reserved.</footer> */}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
