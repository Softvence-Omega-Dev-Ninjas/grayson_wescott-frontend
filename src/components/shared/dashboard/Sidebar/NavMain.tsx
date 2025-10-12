'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/components/ui/sidebar';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { VscDebugBreakpointLogUnverified } from 'react-icons/vsc';

// Sidebar Item type (icon is now only string for Image)
export type TSidebarItem = {
  title: string;
  url?: string;
  icon: string;
  show: boolean;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}[];

export function NavMain({ items }: { items: TSidebarItem }) {
  const pathName = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-2">
        {items.map((item, idx) => {
          const isActive = pathName === item.url;

          return (
            item.show && (
              <Collapsible
                key={idx}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem className="hover:bg-transparent active:bg-transparent">
                  <CollapsibleTrigger
                    className="hover:bg-transparent active:bg-transparent hover:text-white cursor-pointer"
                    asChild
                  >
                    {item.items ? (
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={`flex items-center gap-2 w-full px-4 py-4 h-10 hover:bg-secondary/65 hover:text-white ${
                          isActive ? 'bg-secondary text-white rounded-none' : ''
                        }`}
                      >
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={20}
                          height={20}
                        />
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton
                        tooltip={item.title}
                        className="h-12 hover:bg-transparent active:bg-transparent"
                      >
                        {item.url && (
                          <Link
                            href={item.url}
                            className={`flex items-center gap-2 w-full px-2 py-4 hover:bg-secondary/65 hover:text-white ${
                              isActive
                                ? 'bg-secondary text-white rounded-none'
                                : ''
                            }`}
                          >
                            <Image
                              src={item.icon}
                              alt={item.title}
                              width={20}
                              height={20}
                            />
                            <span>{item.title}</span>
                          </Link>
                        )}
                      </SidebarMenuButton>
                    )}
                  </CollapsibleTrigger>

                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem, idx) => (
                          <Link key={idx} href={subItem.url}>
                            <div
                              className={`flex items-center justify-start gap-2 w-full px-4 py-4 h-10 hover:bg-secondary/65 hover:text-white ${
                                pathName === subItem.url
                                  ? 'bg-secondary text-white rounded-none'
                                  : ''
                              }`}
                            >
                              <VscDebugBreakpointLogUnverified />
                              <span>{subItem.title}</span>
                            </div>
                          </Link>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            )
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
