import { redirect } from "next/navigation";
import { HighlightListForm } from "./_components/HighlightListForm";
import { getHighlights } from "./actions";
import PageLayout from "@/app/me/_components/PageLayout";

export default async function HighlightsPage({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;

  const result = await getHighlights(resumeId);
  if (!result.ok || !result.data) {
    return redirect("/me/resumes");
  }

  return (
    <PageLayout title="ハイライト">
      <HighlightListForm resumeId={resumeId} defaultHighlights={result.data} />
    </PageLayout>
  );
}
