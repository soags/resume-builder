import { Settings } from "lucide-react";
import { Header } from "../_components/Header";
import { TechStackList } from "./_components/TeckStackList";
import { Button } from "@/components/ui/button";
import { getTechCategories } from "./actions";

export default async function TechPage({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;

  const categories = await getTechCategories(resumeId);

  return (
    <>
      <Header
        title="技術スタック"
        slot={
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            カテゴリ設定
          </Button>
        }
      />
      <TechStackList initialCategories={categories} />
    </>
  );
}
