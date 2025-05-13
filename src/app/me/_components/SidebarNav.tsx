"use client";

import { NavPlatform } from "./NavPlatform";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { NavResume } from "./NavResume";

export function SidebarNav({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="pt-16" {...props}>
      <SidebarContent>
        <NavResume />
        <NavPlatform />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
