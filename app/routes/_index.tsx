export function meta() {
  return [{ title: '職務経歴書ビルダー' }, { name: 'description', content: '' }]
}

export default function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-300 bg-slate-100 p-4">
        <h2 className="mb-4 text-xl font-bold">職務経歴書アプリ</h2>
        <nav className="space-y-2">
          <a
            href="/dashboard"
            className="block text-gray-700 hover:text-blue-600"
          >
            ダッシュボード
          </a>
          <a href="/new" className="block text-gray-700 hover:text-blue-600">
            新規作成
          </a>
          <a
            href="/resumes"
            className="block text-gray-700 hover:text-blue-600"
          >
            職務経歴書一覧
          </a>
          <a
            href="/templates"
            className="block text-gray-700 hover:text-blue-600"
          >
            テンプレート選択
          </a>
          <a
            href="/settings"
            className="block text-gray-700 hover:text-blue-600"
          >
            設定
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">編集 / プレビュー</h1>
        </header>

        {/* Placeholder for content */}
        <section className="rounded-lg border border-dashed border-gray-400 p-6 text-gray-500">
          ここに編集画面やプレビューが表示されます。
        </section>
      </main>
    </div>
  )
}
