// import { auth } from "@/auth";
import { SidebarNav } from "./_components/SidebarNav";
import { SiteHeader } from "./_components/SiteHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function MeLayout({ children }: { children: React.ReactNode }) {
  // const session = await auth();

  return (
    <SidebarProvider>
      <div className="relative min-h-screen w-full">
        <SiteHeader />
        <div className="flex">
          <SidebarNav />
          <main className="flex-1 pt-16">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
