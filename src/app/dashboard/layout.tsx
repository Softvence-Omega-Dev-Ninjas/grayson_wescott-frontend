"use client";
import { AppSidebar } from "@/components/shared/dashboard/Sidebar/AppSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useScrollTrigger from "@/hooks/useScrollTrigger";
import { ReactNode } from "react";

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
                {/* <Link href={"/"}>
                  <button className="rounded-xl border-2 border-slate-100 dark:border-gray-900 flex items-center justify-center h-9 w-9">
                    <HiOutlineHome className="text-xl text-light-primary-text dark:text-dark-primary-txt hover:text-primary dark:hover:text-primary transition hover:scale-105" />
                  </button>
                </Link> */}
                {/* <ThemeToggler /> */}
              </div>
            </div>
          </header>
          <div className="p-2 z-0">
            <div className="sm:p-5  min-h-screen">{children}</div>
          </div>
          {/* <footer className="w-full px-4 py-3 text-sm text-gray-600 dark:text-gray-400 text-center">© 2025 Notefy. All rights reserved.</footer> */}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
