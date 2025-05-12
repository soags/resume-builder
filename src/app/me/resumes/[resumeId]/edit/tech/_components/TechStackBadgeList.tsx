"use client";

import { EditBadgeButton } from "@/components/EditBadgeButton";
import { Badge } from "@/components/ui/badge";
import { TechCategoryWithStacks } from "../schema";

type CategorySectionViewProps = {
  category: TechCategoryWithStacks;
  onStartEditing: () => void;
};

export function TechStackBadgeList({ category, onStartEditing }: CategorySectionViewProps) {
  return (
    <div className="flex max-w-full flex-wrap items-start gap-2">
      {category.stacks.length > 0 ? (
        <>
          {category.stacks.map((stack) => (
            <Badge key={stack.id} className="rounded-full px-2 text-sm" aria-label={`技術スタック: ${stack.label}`}>
              {stack.label}
            </Badge>
          ))}
          <EditBadgeButton tooltip="技術スタックを編集" onClick={onStartEditing} />
        </>
      ) : (
        <>
          <div
            className="text-muted-foreground hover:bg-muted flex items-center rounded-full px-2 py-0.5 text-sm hover:cursor-pointer"
            onClick={onStartEditing}
          >
            技術スタックが未登録です
            <EditBadgeButton tooltip="技術スタックを編集" onClick={onStartEditing} />
          </div>
        </>
      )}
    </div>
  );
}
