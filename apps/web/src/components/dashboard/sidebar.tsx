"use client";

import { ChildrenProps } from "@types";
import { Home, LinkIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~components/ui/breadcrumb";
import { Separator } from "~components/ui/separator";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "~components/ui/sidebar";
import { tw } from "~lib/helpers";

const items = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/dashboard/admin",
  },
  {
    title: "Users",
    icon: User,
    url: "/dashboard/admin/users",
  },
  {
    title: "Links",
    icon: LinkIcon,
    url: "/dashboard/admin/links",
  },
];

export function DashboardSidebar({ children }: ChildrenProps) {
  const pathname = usePathname();

  const routesList = pathname
    .slice(1)
    .split("/")
    .map((item) => item[0].toUpperCase() + item.slice(1));

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent className="dark:bg-slate-900 bg-slate-100">
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={tw(
                          "hover:bg-slate-200 dark:hover:bg-slate-800",
                          pathname === item.url
                            ? "bg-slate-200 dark:bg-slate-800"
                            : ""
                        )}
                      >
                        <Link href={item.url}>
                          <Icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {routesList.map((item, index) => (
                  <Fragment key={index + 1}>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">{item}</BreadcrumbLink>
                    </BreadcrumbItem>
                    {index >= routesList.length - 1 ? null : (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="w-full flex-1 min-h-svh">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
