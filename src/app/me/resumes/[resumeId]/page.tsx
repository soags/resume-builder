import { ResumeForm } from "./_components/ResumeForm";
import { getResume } from "./actions";
import { redirect } from "next/navigation";

export default async function ResumePage({ params }: { params: Promise<{ resumeId: string }> }) {
  const { resumeId } = await params;

  const resume = await getResume(resumeId);
  if (!resume) {
    redirect("/me/resumes");
  }

  return (
    <div className="flex flex-col p-6">
      <div className="mb-8 flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold">職務経歴書</h2>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl overflow-x-auto">
          <ResumeForm resume={resume} />
        </div>
      </div>
    </div>
  );
}
