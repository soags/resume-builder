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
    <div className="w-3xl rounded-lg border border-slate-300 p-8">
      <header className="mb-8">
        <h2 className="text-2xl font-bold">ハイライト</h2>
      </header>
      <HighlightList resumeId={resumeId} initial={highlights} />
    </div>
  );
}
