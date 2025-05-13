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
    const prefix = `[${context}]`;
    if (error instanceof Error) {
      logger.error(prefix, error.stack || error.message);
    } else {
      logger.error(prefix, new Error("Unknown error"), error);
    }
  },
};
