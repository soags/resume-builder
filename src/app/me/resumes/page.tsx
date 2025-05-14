import { Button } from "@/components/ui/button";
import { Import } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getResumes } from "./actions";
import { ResumeTable } from "./_components/ResumeTable";
import { NewResumeButton } from "./_components/NewResumeButton";

export default async function ResumesPage() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }

  const result = await getResumes(session.user.id!);
  if (!result.ok || !result.data) {
    return redirect("/me/resumes");
  }

  return (
    <div className="flex flex-col p-6">
      <div className="mb-8 flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold">職務経歴書</h2>

        <div className="flex items-center gap-2">
          <NewResumeButton userId={session.user.id!} />
          <Button asChild>
            <Link href="#">
              <Import />
              JSON/YAMLインポート
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-5xl overflow-x-auto">
          <ResumeTable items={result.data} />
        </div>
      </div>
    </div>
  );
}
