"use client";

import { useMutation } from "@tanstack/react-query";
import { ChildrenProps } from "@types";
import { Home, LinkIcon, Loader, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import { toast } from "sonner";
import { SwitchTheme } from "~components/common/switch-theme";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~components/ui/breadcrumb";
import { Button } from "~components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "~components/ui/dialog";
import { Separator } from "~components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { logoutAdmin } from "~services/admin";

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
  const router = useRouter();

  const routesList = pathname
    .slice(1)
    .split("/")
    .map((item) => {
      return {
        title: item[0].toUpperCase() + item.slice(1),
        url: `/dashboard/admin/${
          item === "dashboard" || item === "admin" ? "" : item
        }`,
      };
    });

  const logoutMutation = useMutation({
    mutationKey: ["logout-admin"],
    mutationFn: async () => await logoutAdmin(),
    onSuccess: async (data) => {
      toast(data.message, { closeButton: true });

      setTimeout(() => {
        router.push("/auth/login-admin");
      }, 1000);
    },
    onError: (data: any) => {
      toast(data.response.data.message);
    },
  });

  async function handleLogout() {
    await logoutMutation.mutateAsync();
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent className="dark:bg-slate-900 bg-slate-100">
          <SidebarGroup>
            <SidebarGroupLabel>Admin - Mijikai</SidebarGroupLabel>
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
                <SidebarMenuItem>
                  <Dialog>
                    <DialogTrigger asChild>
                      <SidebarMenuButton
                        className={tw("hover:bg-red-500 hover:text-slate-50")}
                      >
                        <LogOut />
                        <span>Logout</span>
                      </SidebarMenuButton>
                    </DialogTrigger>
                    <DialogOverlay />
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Warning!</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to Logout?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">No</Button>
                        </DialogClose>
                        <Button
                          type="button"
                          onClick={handleLogout}
                          disabled={logoutMutation.isPending}
                        >
                          {logoutMutation.isPending ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            "Yes"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="dark:bg-slate-900 bg-slate-100 flex items-end justify-center">
          <SwitchTheme />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex sticky top-0 backdrop-blur-md bg-white/70 dark:bg-slate-950/70 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {routesList.map((item, index) => (
                  <Fragment key={index + 1}>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href={item.url}>
                        {item.title}
                      </BreadcrumbLink>
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
