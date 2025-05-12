import { Header } from "../_components/Header";
import { TechCategoryList } from "./_components/TechCategoryList";
import { getTechCategories } from "./actions";

export default async function TechPage({ params }: { params: Promise<{ resumeId: string }> }) {
  const { resumeId } = await params;
  const categories = await getTechCategories(resumeId);

  return (
    <>
      <Header title="技術スタック" />
      <TechCategoryList resumeId={resumeId} initialCategories={categories} />
    </>
  );
}
