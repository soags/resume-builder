import { Result } from "@/types";
import { logger } from "./logger";
import { PrismaClientKnownRequestError } from "@/generated/prisma/client/runtime/library";

export async function withServerLogging<T>(
  fn: () => Promise<Result<T>>,
  context?: string,
): Promise<Result<T>> {
  try {
    return await fn();
  } catch (error) {
    logger.handle(error, context);

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          ok: false,
          error: { code: "DUPLICATE", message: "一意制約違反です" },
        };
      }
    }

    return { ok: false, error: { code: "UNKNOWN", message: "予期しないエラーが発生しました" } };
  }
}
