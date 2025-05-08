import { auth, signOut } from "@/auth";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-300 px-6 py-4">
        <h1 className="text-xl font-bold">レジュメビルダー</h1>
        {session && session.user ? <div>{session.user.name}</div> : null}
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
