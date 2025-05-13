"use client";

import { useState } from "react";
import { createResume } from "../actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NewResumeDialog } from "./NewResumeDialog";
import { NewResumeFormData } from "../schema";
import { withClientLogging } from "@/lib/withClientLogging";

type NewResumeButtonProps = {
  userId: string;
};

export function NewResumeButton({ userId }: NewResumeButtonProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: NewResumeFormData) => {
    await withClientLogging(
      async () => {
        const result = await createResume(userId, data);
        setOpen(false);
        if (result) {
          router.push(`/me/resumes/${result.id}`);
        }
      },
      {
        context: "createResume",
        successMessage: "職務経歴書を作成しました。",
        errorMessage: "職務経歴書の作成に失敗しました。",
      },
    );
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
