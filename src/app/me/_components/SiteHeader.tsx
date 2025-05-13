"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export function SiteHeader() {
  return (
    <header className="bg-background fixed top-0 z-40 w-full border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-xl font-bold">
                Techfolio.<span className="text-sky-800">dev</span>
              </h1>
            </Link>
            <Button variant="outline" className="ml-4">
              職務経歴書
              <ChevronDown />
            </Button>
          </div>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
