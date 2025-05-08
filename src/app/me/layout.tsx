export default function MeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-300 px-6 py-4">
        <h1 className="text-xl font-bold">レジュメビルダー</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
