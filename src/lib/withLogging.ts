import { logger } from "./logger";

export async function withLogging<T>(
  fn: () => Promise<T>,
  context?: string,
  onError?: () => void,
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    logger.handle(error, context);
    onError?.();
    return undefined;
  }
}
