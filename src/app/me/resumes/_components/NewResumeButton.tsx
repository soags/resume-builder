"use client";

import { useState, useTransition } from "react";
import { createResume } from "../actions";
import { useRouter } from "next/navigation";
import { logger } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NewResumeDialog } from "./NewResumeDialog";
import { NewResumeFormData } from "../schema";

type NewResumeButtonProps = {
  userId: string;
};

export function NewResumeButton({ userId }: NewResumeButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (data: NewResumeFormData) => {
    startTransition(async () => {
      try {
        const result = await createResume(userId, data);
        setOpen(false);
        router.push(`/me/resumes/${result.id}`);
      } catch (e) {
        logger.handle(e, "NewResumeButton");
      }
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} disabled={isPending}>
        <Plus />
        職務経歴書を追加
      </Button>
      <NewResumeDialog isOpen={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
    </>
  );
}
