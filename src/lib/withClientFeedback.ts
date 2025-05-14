"use client";

import { Result } from "@/types";
import { toast } from "sonner";

type WithClientFeedbackOptions = {
  successMessage?: string;
  errorMap?: Record<string, string>;
  onLoadingChange?: (loading: boolean) => void;
};

export async function withClientFeedback<T>(
  fn: () => Promise<Result<T>>,
  options: WithClientFeedbackOptions = {},
): Promise<Result<T>> {
  const { successMessage = "登録が完了しました", errorMap = {}, onLoadingChange } = options ?? {};

  onLoadingChange?.(true);

  const promise = fn();

  const result = await toast.promise(promise, {
    loading: "保存中...",
    success: (result) => (result.ok ? successMessage : undefined),
    error: (result) =>
      !result.ok
        ? (errorMap[result.error.code] ?? result.error.message)
        : "予期しないエラーが発生しました",
  });

  onLoadingChange?.(false);

  return result.unwrap();
}
