"use client";

import { EditBadgeButton } from "@/components/EditBadgeButton";
import { Badge } from "@/components/ui/badge";
import { TechStack } from "@/generated/prisma/client";

type CategorySectionViewProps = {
  stacks: TechStack[];
  onStartEditing: () => void;
};

export function CategorySectionView({ stacks, onStartEditing }: CategorySectionViewProps) {
  return (
    <div className="flex max-w-full flex-wrap items-start gap-2">
      {stacks.map((stack) => (
        <Badge key={stack.id} className="rounded-full px-2 text-sm">
          {stack.label}
        </Badge>
      ))}
      <EditBadgeButton tooltip="技術スタックを編集" onClick={onStartEditing} />
    </div>
  );
}
