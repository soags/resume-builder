"use client";

import { useState } from "react";
import { createResume } from "../actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NewResumeDialog } from "./NewResumeDialog";
import { NewResumeFormData } from "../schema";
import { withClientFeedback } from "@/lib/withClientFeedback";

type NewResumeButtonProps = {
  userId: string;
};

export function NewResumeButton({ userId }: NewResumeButtonProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: NewResumeFormData) => {
    await withClientFeedback(async () => {
      const result = await createResume(userId, data);
      if (result.ok) {
        setOpen(false);
        router.push(`/me/resumes/${result.data.id}`);
      }
      return result;
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus />
        職務経歴書を追加
      </Button>
      <NewResumeDialog isOpen={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
    </>
  );
}
