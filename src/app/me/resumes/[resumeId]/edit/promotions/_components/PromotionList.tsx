"use client";

import { Promotion } from "@/generated/prisma/client";
import { useState } from "react";
import { deletePromotion, getPromotions, savePromotion } from "../actions";
import { PromotionFormData } from "../schema";
import { PromotionDialog } from "./PromotionDialog";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { PromotionItemProps } from "./PromotionItem";

// DOMPurifyを使用するためにClient componentでSSRを回避する
const PromotionItem = dynamic<PromotionItemProps>(
  () => import("./PromotionItem").then((module) => module.PromotionItem),
  { ssr: false },
);

export function PromotionList({
  resumeId,
  initialPromotions,
}: {
  resumeId: string;
  initialPromotions: Promotion[];
}) {
  const [promotions, setPromotions] = useState(initialPromotions);
  const [editing, setEditing] = useState<Promotion | null>(null);

  const reloadPromotions = async () => {
    setPromotions((await getPromotions(resumeId)) ?? []);
  };

  const handleAdd = () => {
    setEditing({ title: "", body: "" } as Promotion);
  };

  const handleSave = async (data: PromotionFormData) => {
    try {
      await savePromotion(resumeId, data);
      await reloadPromotions();
    } catch (error) {
      console.error(`[PromotionList] Error updating promotion:`, error);
    } finally {
      setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePromotion(id);
      await reloadPromotions();
    } catch (error) {
      console.error(`[PromotionList] Error deleting promotion:`, error);
    }
  };

  return (
    <div className="space-y-4">
      {promotions.map((promotion) => (
        <PromotionItem
          key={promotion.id}
          promotion={promotion}
          onStartEditing={() => setEditing(promotion)}
          onDelete={() => handleDelete(promotion.id)}
        />
      ))}
      <Button
        variant="outline"
        onClick={handleAdd}
        className="flex w-full items-center justify-center gap-2 border-dashed border-gray-300 py-6"
      >
        <PlusCircleIcon className="h-5 w-5" />
        <span>自己PRを追加</span>
      </Button>
      <PromotionDialog
        open={!!editing}
        initialPromotion={editing ?? { title: "", body: "" }}
        onSave={handleSave}
        onClose={() => setEditing(null)}
      />
    </div>
  );
}
