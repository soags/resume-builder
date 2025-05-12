"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SectionLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-100",
        pathname === href && "bg-slate-200 font-semibold",
      )}
    >
      {children}
    </Link>
  );
}
