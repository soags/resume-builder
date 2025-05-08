"use client";

import { Button } from "@/components/ui/button";
import { Resume } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";

export function NewResumeButton() {
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        const response = await fetch(`/me/resumes/api`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          console.error("Failed to create resume", response.statusText);
          return;
        }
        const resume: Resume = await response.json();
        router.push(`./resumes/${resume.id}/edit/basics`);
      }}
    >
      追加
    </Button>
  );
}
