"use client";

import { logger } from "@/lib/logger";
import { toast } from "sonner";

type AsyncFunction<T> = () => Promise<T>;

type WithClientLoggingOptions = {
  context?: string;
  successMessage?: string;
  errorMessage?: string;
  onError?: (e: unknown) => void;
  setLoading?: (loading: boolean) => void;
};

export async function withClientLogging<T>(
  fn: AsyncFunction<T>,
  options: WithClientLoggingOptions = {},
): Promise<T | undefined> {
  const { context = "client", successMessage, errorMessage, onError, setLoading } = options;

  try {
    setLoading?.(true);
    const result = await fn();
    if (successMessage) toast.success(successMessage);
    return result;
  } catch (error) {
    logger.handle(error, context);
    onError?.(error);
    toast.error(errorMessage ?? "エラーが発生しました");
    return undefined;
  } finally {
    setLoading?.(false);
  }
}
