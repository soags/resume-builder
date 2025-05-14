import { auth } from "@/auth";
import { getResume } from "./actions";
import { redirect } from "next/navigation";
import { SummaryForm } from "./_components/SummaryForm";

export default async function ResumePage({ params }: { params: Promise<{ resumeId: string }> }) {
  const { resumeId } = await params;
  const session = await auth();
  if (!session?.user || !session.user.id) {
    redirect("/login");
  }

  const resume = await getResume(resumeId);
  if (!resume.ok || !resume.data) {
    redirect("/me/resumes");
  }

  return (
    <div className="flex flex-col p-6">
      <div className="mb-8 flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold">職務要約</h2>
      </div>
      <div className="flex justify-center">
        <SummaryForm resume={resume.data} />
      </div>
    </div>
  );
}
