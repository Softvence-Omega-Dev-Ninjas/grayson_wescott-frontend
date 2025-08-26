// "use client";
// import * as React from "react";
// import { LayoutDashboard, FolderOpen, BadgeCheck, ShoppingCart } from "lucide-react";
// import {
//   HiOutlineUsers, // Users
// } from "react-icons/hi";
// import dashboardIcon from "@/assets/dashboard/sidebar/dashboardIcon.svg";
// import dumballIcon from "@/assets/dashboard/sidebar/dumbalIcon.svg";
// import clientIcon from "@/assets/dashboard/sidebar/clientIcon.svg";
// import messageIcon from "@/assets/dashboard/sidebar/messageIcon.svg";
// import settingsIcon from "@/assets/dashboard/sidebar/settingIcon.svg";
// import progressIcon from "@/assets/dashboard/sidebar/progressIcon.svg";
// import calendarIcon from "@/assets/dashboard/sidebar/calenderIcon.svg";

// import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
// import { NavMain } from "./NavMain";
// import { NavUser } from "./NavUser";

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   // const user = useAppSelector(useCurrentUser);
//   const data = {
//     navMain: [
//       //Admin routes
//       {
//         title: "Dashboard",
//         url: "/dashboard/admin/overview",
//         icon: dashboardIcon.src,
//         // show: user?.role === "admin",
//         show: true,
//       },
//       {
//         title: "All Clients",
//         url: "/dashboard/admin/all-clients",
//         icon: clientIcon.src,
//         show: true,
//       },
//       {
//         title: "Clients Program Builder",
//         url: "/dashboard/admin/clients-programm-builders",
//         icon: calendarIcon.src,
//         show: true,
//       },
//       {
//         title: "Exercise Library",
//         icon: dumballIcon.src,
//         show: true,
//         items: [
//           { title: "All Exercise", url: "/dashboard/admin/all-exercise" },
//           { title: "Add Exercise", url: "/dashboard/admin/add-exercise" },
//         ],
//       },
//       {
//         title: "Progress Tracking",
//         url: "/dashboard/admin/progress-tracking",
//         icon: progressIcon.src,
//         show: true,
//       },
//       {
//         title: "Messages",
//         url: "/dashboard/admin/messages",
//         icon: messageIcon.src,
//         show: true,
//       },
//       {
//         title: "Settings",
//         url: "/dashboard/admin/settings",
//         icon: settingsIcon.src,
//         show: true,
//       },
//     ],
//   };
//   return (
//     <Sidebar collapsible="offcanvas" {...props} className="bg-black">
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <div className="mt-2">
//                 {/* <Logo /> */}
//                 <h1>Logo</h1>
//               </div>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent className="mt-2">
//         <NavMain items={data.navMain} />
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

"use client";
import * as React from "react";
import dashboardIcon from "@/assets/dashboard/sidebar/dashboardIcon.svg";
import dumballIcon from "@/assets/dashboard/sidebar/dumbalIcon.svg";
import clientIcon from "@/assets/dashboard/sidebar/clientIcon.svg";
import messageIcon from "@/assets/dashboard/sidebar/messageIcon.svg";
import settingsIcon from "@/assets/dashboard/sidebar/settingIcon.svg";
import progressIcon from "@/assets/dashboard/sidebar/progressIcon.svg";
import calendarIcon from "@/assets/dashboard/sidebar/calenderIcon.svg";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard/admin/overview",
        icon: dashboardIcon.src,
        show: true,
      },
      {
        title: "All Clients",
        url: "/dashboard/admin/all-clients",
        icon: clientIcon.src,
        show: true,
      },
      {
        title: "Clients Program Builder",
        url: "/dashboard/admin/clients-programm-builders",
        icon: calendarIcon.src,
        show: true,
      },
      {
        title: "Exercise Library",
        icon: dumballIcon.src,
        show: true,
        items: [
          { title: "All Exercise", url: "/dashboard/admin/all-exercise" },
          { title: "Add Exercise", url: "/dashboard/admin/add-exercise" },
        ],
      },
      {
        title: "Progress Tracking",
        url: "/dashboard/admin/progress-tracking",
        icon: progressIcon.src,
        show: true,
      },
      {
        title: "Messages",
        url: "/dashboard/admin/messages",
        icon: messageIcon.src,
        show: true,
      },
      {
        title: "Settings",
        url: "/dashboard/admin/settings",
        icon: settingsIcon.src,
        show: true,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props} className="bg-black">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="mt-2">
                <h1>Logo</h1>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-2">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
