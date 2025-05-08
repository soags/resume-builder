import { getResumeById } from "@/features/resumes/models/resumes";
import { EditBasicsForm } from "./_components/EditBasicsForm";

export default async function BasicsPage({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;

  const resume = await getResumeById(resumeId);

  if (!resume) {
    return <div>職務経歴書が存在しませんわ……😢</div>;
  }

  return <EditBasicsForm resume={resume} />;
}
