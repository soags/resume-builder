import { redirect } from 'react-router'
import {
  authenticator,
  getSession,
  sessionStorage,
} from '~/services/auth.server'
import type { Route } from './+types/auth.google.callback'
import { createGoogleUser, getUserByGoogleId } from '~/models/user.server'

export async function loader({ request }: Route.LoaderArgs) {
  // 認証
  const sessionUser = await authenticator.authenticate('google', request)

  // 初回ログインの場合、ユーザーを作成
  const user = await getUserByGoogleId(sessionUser.id)
  if (!user) {
    await createGoogleUser(sessionUser.id)
  }

  // セッションにユーザー情報を保存
  const session = await getSession(request)
  session.set('user', sessionUser)

  // ログイン成功後のリダイレクト
  return redirect('/editor/basics', {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  })
}
