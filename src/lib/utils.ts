import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export const TEST_USER_ID = "d31bdadd-165d-46f9-ba8c-dc45c83a13d4";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "yyyy/MM/dd");
}

export function formatMonthJp(
  year: number | null,
  month: number | null,
): string {
  if (year == null) return "";
  return month != null ? `${year}年${month}月` : `${year}年`;
}
