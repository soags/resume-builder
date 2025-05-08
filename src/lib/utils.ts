import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export const TEST_USER_ID = "9411d191-3384-49fd-b61b-88213fa7a010";

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
