import { Edit2, Plus } from 'lucide-react'
import type { Route } from './+types/certificates'
import { Button } from '~/components/ui/button'

// export async function loader({}: Route.LoaderArgs) {}

// export async function action({}: Route.ActionArgs) {}

export default function Certifications({}: Route.ComponentProps) {
  return (
    <div className="w-3xl rounded-lg border border-slate-300 p-8">
      <header>
        <h2 className="mb-4 text-2xl font-bold">資格</h2>
        <p className="mb-4 text-sm text-slate-500">
          資格はアピールしたい順に並べましょう！
        </p>
      </header>
      <div className="space-y-4">
        <div className="rounded-xl border border-slate-300 p-4">
          <div className="flex items-center gap-2">
            <div className="text-lg">応用情報技術者</div>
            <div className="text-lg text-slate-500">情報処理推進機構</div>
          </div>
          <div>2023年4月 取得</div>
        </div>
        <div className="rounded-xl border border-slate-300 p-4">
          <div className="flex items-center gap-2">
            <div className="text-lg">応用情報技術者</div>
            <div className="text-lg text-slate-500">情報処理推進機構</div>
          </div>
          <div>2023年4月 取得</div>
        </div>
        <div className="rounded-xl border border-slate-300 p-4">
          <div className="flex items-center gap-2">
            <div className="text-lg">応用情報技術者</div>
            <div className="text-lg text-slate-500">情報処理推進機構</div>
          </div>
          <div>2023年4月 取得</div>
        </div>
        <button className="flex w-full items-center justify-center rounded-xl border border-slate-300 p-4 hover:bg-slate-200">
          <Plus className="h-6 w-6 text-slate-500" />
        </button>
      </div>
    </div>
  )
}
