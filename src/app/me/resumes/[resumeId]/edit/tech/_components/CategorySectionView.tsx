"use client";

import { Badge } from "@/components/ui/badge";
import { TechStack } from "@/generated/prisma/client";
import { PencilIcon } from "lucide-react";

type CategorySectionViewProps = {
  stacks: TechStack[];
  onStartEditing: () => void;
};

export function CategorySectionView({
  stacks,
  onStartEditing,
}: CategorySectionViewProps) {
  return (
    <div className="flex max-w-full flex-wrap items-start gap-2">
      {stacks.map((stack) => (
        <Badge key={stack.id} className="rounded-full px-2 text-sm">
          {stack.label}
        </Badge>
      ))}
      <div
        className="inline-flex items-center py-0.5 text-sm font-medium text-gray-500 hover:cursor-pointer hover:text-gray-700"
        onClick={onStartEditing}
      >
        <PencilIcon className="size-4" />
        <span aria-hidden="true" className="invisible select-none">
          編集
        </span>
      </div>
    </div>
  );
}
