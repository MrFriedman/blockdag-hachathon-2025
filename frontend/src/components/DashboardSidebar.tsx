'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { MediChainLogo } from "@/components/MediChainLogo";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Plus,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils"; // Import utility for conditional classnames

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Add Record", url: "/add-record", icon: Plus },
  { title: "Settings", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname(); // ⬅️ Next.js equivalent of useLocation()

  // Helper function to determine active state and apply classes
  const getNavCls = (path: string) =>
    cn(
      "w-full flex items-center gap-3 rounded-lg p-2 transition-colors",
      pathname === path
        ? "bg-primary text-primary-foreground"
        : "hover:bg-accent text-accent-foreground"
    );

  return (
    <Sidebar collapsible="icon">
      <div className="p-4">
        <MediChainLogo size="md" showText={state !== "collapsed"} />
      </div>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>MediChain</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {/* ⬅️ Use Link from next/link for navigation */}
                    <Link href={item.url} className={getNavCls(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sign Out */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  {/* ⬅️ Use Link for Sign Out as well */}
                  <Link href="/" className="w-full flex items-center gap-3 rounded-lg p-2 transition-colors text-destructive hover:bg-destructive/10">
                    <LogOut className="h-4 w-4" />
                    {state !== "collapsed" && <span>Sign Out</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}