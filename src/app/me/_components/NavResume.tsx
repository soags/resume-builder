"use client";

import { Award, Code, FileText, Layers, SquareChartGantt, SquareUser, Sun } from "lucide-react";
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
    title: "プロフィール",
    url: "#",
    icon: SquareUser,
  },
  {
    title: "職務要約",
    url: "#",
    icon: FileText,
  },
  {
    title: "技術スタック",
    url: "#",
    icon: Layers,
  },
  {
    title: "ハイライト",
    url: "#",
    icon: Sun,
  },
  {
    title: "職務経歴",
    url: "#",
    icon: SquareChartGantt,
  },
  {
    title: "自己PR",
    url: "#",
    icon: SquareUser,
  },
  {
    title: "業務外活動",
    url: "#",
    icon: Code,
  },
  {
    title: "資格・免許",
    url: "#",
    icon: Award,
  },
];

export function NavResume() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Resume</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
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
