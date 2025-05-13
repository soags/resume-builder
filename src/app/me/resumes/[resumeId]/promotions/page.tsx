import { redirect } from "next/navigation";
import { Header } from "../_components/Header";
import { PromotionList } from "./_components/PromotionList";
import { getPromotions } from "./actions";

export default async function PromotionsPage({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;
  const initialPromotions = await getPromotions(resumeId);
  if (typeof initialPromotions === "undefined") {
    return redirect("/me/resumes");
  }

  return (
    <>
      <Header title="資格" />
      <PromotionList resumeId={resumeId} initialPromotions={initialPromotions} />
    </>
  );
}
