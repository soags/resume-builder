"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Highlight } from "@/generated/prisma/client";
import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

export type HighlightFormProps = {
  highlight: Highlight;
  dragHandleProps?: ComponentPropsWithoutRef<"div">;
  onChange: (id: string, text: string) => void;
  onDelete: (id: string) => void;
};

export function HighlightForm({ highlight, dragHandleProps, onChange, onDelete }: HighlightFormProps) {
  return (
    <div className="flex items-center gap-x-2">
      {/* ドラッグハンドル */}
      <div {...dragHandleProps} className="hover:cursor-grab">
        <GripVerticalIcon className="h-5 w-5" />
      </div>

      {/* テキスト */}
      <Input
        className="focus-visible:border-border flex-1 focus-visible:ring-0"
        value={highlight.text ?? ""}
        onChange={(e) => onChange(highlight.id, e.target.value)}
        maxLength={1000}
      />

      {/* 削除ボタン */}
      <Button
        type="submit"
        variant="link"
        size="icon"
        className="text-destructive"
        onClick={() => onDelete(highlight.id)}
      >
        <Trash2Icon />
      </Button>
    </div>
  );
}
