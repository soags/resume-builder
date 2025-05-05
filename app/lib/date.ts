import { format, parseISO } from 'date-fns'

/**
 * 日付を 'yyyy/MM/dd' にフォーマット
 */
export function formatDate(date: Date | string): string {
  const actualDate = typeof date === 'string' ? parseISO(date) : date
  return format(actualDate, 'yyyy/MM/dd')
}

/**
 * 日付を 'yyyy年MM月dd日' にフォーマット（日本語表示）
 */
export function formatJapaneseDate(date: Date | string): string {
  const actualDate = typeof date === 'string' ? parseISO(date) : date
  return format(actualDate, 'yyyy年MM月dd日')
}
