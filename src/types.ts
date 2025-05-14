export type ErrorCode = "DUPLICATE_SLUG" | "DUPLICATE" | "UNKNOWN";

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: ErrorCode; message: string } };
