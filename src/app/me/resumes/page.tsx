import { Button } from "@/components/ui/button";
import { Import, Plus } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getResumes } from "./actions";
import { ResumeTable } from "./_components/ResumeTable";

export default async function ResumesPage() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }

  const resumes = await getResumes(session.user.id!);

  return (
    <div className="flex flex-col p-6">
      <div className="mb-6 flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold">職務経歴書</h2>

        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/me/resumes/new">
              <Plus />
              職務経歴書を追加
            </Link>
          </Button>
          <Button asChild>
            <Link href="#">
              <Import />
              JSON/YAMLインポート
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-5xl overflow-x-auto">
          <ResumeTable items={resumes} />
        </div>
      </div>
    </div>
  );
}
