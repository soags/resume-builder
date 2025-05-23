import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SidebarNav } from "./_components/SidebarNav";
import { SiteHeader } from "./_components/SiteHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getResumes } from "./actions";

export default async function MeLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return redirect("/login");
  }
  const result = await getResumes(session.user.id);
  if (!result.ok || !result.data) {
    return redirect("/me/resumes");
  }

  return (
    <SidebarProvider>
      <div className="relative min-h-screen w-full">
        <SiteHeader resumes={result.data} />
        <div className="flex">
          <SidebarNav />
          <main className="flex-1 pt-16">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
