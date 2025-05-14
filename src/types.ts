export type ErrorCode = "DUPLICATE_SLUG" | "UNKNOWN";

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: ErrorCode; message: string } };
