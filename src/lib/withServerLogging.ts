import { Result } from "@/types";
import { logger } from "./logger";

export async function withServerLogging<T>(
  fn: () => Promise<Result<T>>,
  context?: string,
): Promise<Result<T>> {
  try {
    return await fn();
  } catch (error) {
    logger.handle(error, context);
    return { ok: false, error: { code: "UNKNOWN", message: "予期しないエラーが発生しました" } };
  }
}
