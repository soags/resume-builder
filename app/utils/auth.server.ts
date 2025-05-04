export async function requireUserId(): Promise<string> {
  // TODO: セッションから取得する処理に置き換え
  const userId = '64131899-e67f-4722-97c1-16b4216d5ebd'
  if (!userId) throw new Error('User not authenticated')
  return userId
}
