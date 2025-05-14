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
import { useMemo } from "react";

export function NavResume({ resumeId }: { resumeId: string }) {
  const items = useMemo(
    () => [
      {
        title: "基本情報",
        url: `/me/resumes/${resumeId}`,
        icon: SquareUser,
      },
      {
        title: "職務要約",
        url: `/me/resumes/${resumeId}/summary`,
        icon: FileText,
      },
      {
        title: "技術スタック",
        url: `/me/resumes/${resumeId}/tech`,
        icon: Layers,
      },
      {
        title: "ハイライト",
        url: `/me/resumes/${resumeId}/highlights`,
        icon: Sun,
      },
      {
        title: "職務経歴",
        url: `/me/resumes/${resumeId}/work`,
        icon: SquareChartGantt,
      },
      {
        title: "自己PR",
        url: `/me/resumes/${resumeId}/promotions`,
        icon: SquareUser,
      },
      {
        title: "業務外活動",
        url: `/me/resumes/${resumeId}/projects`,
        icon: Code,
      },
      {
        title: "資格・免許",
        url: `/me/resumes/${resumeId}/certs`,
        icon: Award,
      },
    ],
    [resumeId],
  );

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
