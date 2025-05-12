const isDev = process.env.NODE_ENV === "development";

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev) console.log(...args);
  },
  error: (...args: unknown[]) => {
    if (isDev) console.error(...args);
  },
  warn: (...args: unknown[]) => {
    if (isDev) console.warn(...args);
  },
  info: (...args: unknown[]) => {
    if (isDev) console.info(...args);
  },
  handle(error: unknown, context?: string) {
    if (error instanceof Error) {
      logger.error(`[${context}]`, error);
    } else {
      logger.error(`[${context}]`, new Error("Unknown error"), error);
    }
  },
};
