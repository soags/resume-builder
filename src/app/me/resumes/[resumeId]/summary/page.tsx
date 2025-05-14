import { auth } from "@/auth";
import { getResume } from "./actions";
import { redirect } from "next/navigation";
import { SummaryForm } from "./_components/SummaryForm";
import PageLayout from "@/app/me/_components/PageLayout";

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
    <PageLayout title="職務要約">
      <SummaryForm resume={resume.data} />
    </PageLayout>
  );
}
