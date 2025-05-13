"use client";

import { FileText, Plus, Settings } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "レジュメ一覧",
    url: "/me/resumes",
    icon: FileText,
  },
  {
    title: "新規作成",
    url: "/me/resumes/new",
    icon: Plus,
  },
  {
    title: "アカウント設定",
    url: "/me/settings",
    icon: Settings,
  },
];

export function NavPlatform() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title}>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
