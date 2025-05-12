import { Header } from "../_components/Header";
import { TechCategoryListSection } from "./_components/TechCategoryListSection";
import { getTechCategories } from "./actions";

export default async function TechPage({ params }: { params: Promise<{ resumeId: string }> }) {
  const { resumeId } = await params;
  const categories = await getTechCategories(resumeId);

  return (
    <>
      <Header title="技術スタック" />
      <TechCategoryListSection resumeId={resumeId} initialCategories={categories} />
    </>
  );
}
