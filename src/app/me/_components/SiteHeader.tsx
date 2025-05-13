"use client";

import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { Resume } from "@/generated/prisma/client";
import { ResumeSelectorDialog } from "./ResumeSelectorDialog";

export function SiteHeader({ resumes }: { resumes: Resume[] }) {
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
            <ResumeSelectorDialog resumes={resumes} />
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
