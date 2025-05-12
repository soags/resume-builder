"use client";

import { TechStack } from "@/generated/prisma/client";
import { getTechStacks, saveTechStacks } from "../actions";
import { TechStackFormData, TechCategoryWithStacks } from "../schema";
import { CategorySectionEdit } from "./CategorySectionEdit";
import { useState } from "react";
import { CategorySectionView } from "./CategorySectionView";
import { EditableInput } from "@/components/EditableInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DragHandle } from "@/components/DragHandle";
import { DeleteIconButton } from "@/components/DeleteIconButton";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { logger } from "@/lib/logger";

type CategorySectionProps = {
  category: TechCategoryWithStacks;
  editingCategoryId: string | null;
  onEditingCategoryIdChange: (editingCategoryId: string | null) => void;
  onUpdate: (name: string) => void;
  onDelete: () => void;
};

export default function CategorySection({
  category,
  editingCategoryId,
  onEditingCategoryIdChange,
  onUpdate,
  onDelete,
}: CategorySectionProps) {
  const [stacks, setStacks] = useState<TechStack[]>(category.stacks);
  const [editingStacks, setEditingStacks] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: category.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragHandleProps = {
    ...attributes,
    ...listeners,
  };

  const handleSaveStacks = async (data: TechStackFormData[]) => {
    try {
      await saveTechStacks(category.id, data);
      setStacks(await getTechStacks(category.id));
      setEditingStacks(false);
    } catch (error) {
      logger.handle(error, "CategorySection");
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="grid gap-3 pt-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DragHandle dragHandleProps={dragHandleProps} />
              <EditableInput
                value={category.name}
                placeholder="カテゴリ名を入力"
                editing={editingCategoryId === category.id}
                onEditingChange={(editing) => onEditingCategoryIdChange(editing ? category.id : null)}
                onSave={onUpdate}
              />
            </div>
            <DeleteIconButton tooltip="カテゴリを削除" onClick={onDelete} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {editingStacks ? (
            <CategorySectionEdit
              initialStacks={stacks}
              onSave={(data) => handleSaveStacks(data)}
              onCancel={() => setEditingStacks(false)}
            />
          ) : (
            <CategorySectionView stacks={stacks} onStartEditing={() => setEditingStacks(true)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
