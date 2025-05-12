import { Header } from "../_components/Header";
import { HighlightList } from "./_components/HighlightList";
import { getHighlights } from "./actions";

export default async function HighlightsPage({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;

  const highlights = await getHighlights(resumeId);

  return (
    <>
      <Header title="ハイライト" />
      <HighlightList resumeId={resumeId} initial={highlights} />
    </>
  );
}
