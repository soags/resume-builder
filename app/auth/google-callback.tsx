import { redirect } from 'react-router'
import {
  authenticator,
  getSession,
  sessionStorage,
} from '~/services/auth.server'
import { createGoogleUser, getUserByGoogleId } from '~/models/user.server'
import type { Route } from './+types/google-callback'

export async function loader({ request }: Route.LoaderArgs) {
  const sessionUser = await authenticator.authenticate('google', request)

  // 初回ログインの場合、ユーザーを作成
  let user = await getUserByGoogleId(sessionUser.id)
  if (!user) {
    user = await createGoogleUser(sessionUser.id)
  }

  const session = await getSession(request)
  session.set('user', user)

  return redirect('/resumes', {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  })
}
