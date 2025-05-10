"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Promotion } from "@/generated/prisma/client";
import DOMPurify from "dompurify";
import { ArrowDownIcon, ArrowUpIcon, Trash2Icon } from "lucide-react";

export type PromotionItemProps = {
  promotion: Promotion;
  enableMoveUp: boolean;
  enableMoveDown: boolean;
  onStartEditing: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
};

export function PromotionItem({
  promotion,
  enableMoveUp,
  enableMoveDown,
  onStartEditing,
  onMoveUp,
  onMoveDown,
  onDelete,
}: PromotionItemProps) {
  const sanitizedHtml = DOMPurify.sanitize(
    promotion.body.replace(/\n/g, "<br />"),
  );

  return (
    <Card
      className="cursor-pointer p-0 transition-shadow hover:shadow-md"
      onClick={() => onStartEditing()}
    >
      <CardContent className="grid gap-2 p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
          <div className="text-lg font-medium">{promotion.title}</div>
          <div className="flex items-start justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:bg-red-50 hover:text-red-700"
              aria-label="削除"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2Icon className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizedHtml,
          }}
        />
        <div className="flex items-center justify-end gap-x-2">
          {enableMoveUp && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
            >
              <ArrowUpIcon />
            </Button>
          )}
          {enableMoveDown && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
            >
              <ArrowDownIcon />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
