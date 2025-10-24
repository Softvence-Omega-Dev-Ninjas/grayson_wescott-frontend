'use client';
import Notification from '@/components/shared/dashboard/Notifiaction/Notification';
import { AppSidebar } from '@/components/shared/dashboard/Sidebar/AppSidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import useScrollTrigger from '@/hooks/useScrollTrigger';
import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { scrolled } = useScrollTrigger();
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-light-secondary-bg dark:bg-dark-secondary-bg">
          <header
            className={`flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 bg-primary-200 z-10 mx-0 md:mx-4 ${
              scrolled && 'shadow-sm shadow-secondary'
            }`}
          >
            <div className="flex items-center justify-between gap-2 px-4 w-full">
              <div>
                <SidebarTrigger className="-ml-1 text-white" />
              </div>
              <div className="flex items-center gap-4 mr-2">
                <Notification />
                {/* <Avatar className="h-10 w-10">
                  <AvatarImage src={avatar.src} alt="Sarah Johnson" />
                  <AvatarFallback className="bg-gray-700 text-white">
                    SJ
                  </AvatarFallback>
                </Avatar> */}
              </div>
            </div>
          </header>
          <div className="p-2 z-0">
            <div className="sm:p-5  min-h-[calc(100vh-80px-60px)]">
              {children}
            </div>
          </div>
          <footer className="w-full px-4 py-6 bg-primary-200 text-sm text-white text-center">
            Carbon Engines Admin — Precision in Every Rep, Control in Every
            Detail.
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
