"use client";

import { Promotion } from "@/generated/prisma/client";
import { useState } from "react";
import { deletePromotion, getPromotions, savePromotion, swapPromotionOrder } from "../actions";
import { PromotionFormData } from "../schema";
import { PromotionDialog } from "./PromotionDialog";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { PromotionItemProps } from "./PromotionItem";
import { withClientLogging } from "@/lib/withClientLogging";

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
  const [editing, setEditing] = useState<PromotionFormData | null>(null);

  const withReload = async (fn: () => Promise<void>, context: string, errorMessage: string) => {
    await withClientLogging(
      async () => {
        await fn();
        const data = await getPromotions(resumeId);
        if (data) {
          setPromotions(data);
        }
      },
      {
        context,
        errorMessage,
      },
    );
    setEditing(null);
  };

  const handleAdd = () => {
    setEditing({ title: "", body: "" } as PromotionFormData);
  };

  const handleSave = async (data: PromotionFormData) => {
    await withReload(
      async () => {
        await savePromotion(resumeId, data);
      },
      "PromotionList.save",
      "自己PRの保存に失敗しました",
    );
  };

  const handleDelete = async (id: string) => {
    await withReload(
      async () => {
        await deletePromotion(resumeId, id);
      },
      "PromotionList.delete",
      "自己PRの削除に失敗しました",
    );
  };

  const moveOrder = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= promotions.length) return;

    const source = promotions[index];
    const target = promotions[targetIndex];

    await withReload(
      async () => {
        await swapPromotionOrder(resumeId, source.id, target.id);
      },
      "PromotionList.moveOrder",
      "自己PRの並び順の更新に失敗しました",
    );
  };

  return (
    <div className="space-y-4">
      {promotions.map((promotion, index) => (
        <PromotionItem
          key={promotion.id}
          promotion={promotion}
          enableMoveUp={index > 0}
          enableMoveDown={index < promotions.length - 1}
          onStartEditing={() => setEditing(promotion)}
          onMoveUp={() => moveOrder(index, "up")}
          onMoveDown={() => moveOrder(index, "down")}
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
