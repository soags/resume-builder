import { auth } from "@/auth";
import { ResumeForm } from "./_components/ResumeForm";
import { getResume } from "./actions";
import { redirect } from "next/navigation";
import PageLayout from "../../_components/PageLayout";

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
    <PageLayout title="基本情報">
      <ResumeForm userId={session.user.id} resume={resume.data} />
    </PageLayout>
  );
}
