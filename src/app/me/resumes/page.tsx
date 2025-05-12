import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { CalendarIcon, EditIcon } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getResumes } from "./actions";

export default async function ResumesPage() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/");
  }

  const resumes = await getResumes(session.user.id!);

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-3xl">
        <header className="mb-6 flex items-center px-4">
          <h2 className="text-3xl font-bold">職務経歴書</h2>
        </header>
        <div className="w-3xl rounded-lg border border-slate-300 bg-white px-4">
          {resumes.map((resume) => (
            <div key={resume.id} className="flex items-center border-b px-4 py-6 last:border-b-0">
              <div className="flex flex-1 items-center gap-4">
                <Button asChild variant="outline" size="icon">
                  <Link href={`/me/resumes/${resume.id}/basics`}>
                    <EditIcon />
                  </Link>
                </Button>
                <div className="font-medium">{resume.title}</div>
              </div>
              <p className="text-gray-500">
                <CalendarIcon className="mr-2 inline h-4 w-4" />
                {formatDate(resume.updatedAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
