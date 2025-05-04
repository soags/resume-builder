import { Outlet } from 'react-router'
import { getUser } from '../services/auth.server'
import type { Route } from './+types/_'

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request)
  return { user }
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center border-b border-slate-300 px-6 py-4">
        <h1 className="text-xl font-bold">レジュメビルダー</h1>
        {user ? (
          <>
            <span>
              こんにちは、{user.name ?? user.email ?? 'ユーザー'} さん！
            </span>
            <a href="/auth/logout" className="text-blue-500">
              ログアウト
            </a>
          </>
        ) : (
          <a href="/auth/login" className="text-blue-500">
            ログイン
          </a>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </main>
    </div>
  )
}
