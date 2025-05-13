"use client";

import { NavPlatform } from "./NavPlatform";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { NavResume } from "./NavResume";
import { useResumeStore } from "@/stores/resumeStore";

export function SidebarNav({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const resumeId = useResumeStore((state) => state.resumeId);

  return (
    <Sidebar className="pt-16" {...props}>
      <SidebarContent>
        {resumeId && <NavResume resumeId={resumeId} />}
        <NavPlatform />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
