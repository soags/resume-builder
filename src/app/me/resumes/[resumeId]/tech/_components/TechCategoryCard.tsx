"use client";

import { TechStackFormData, TechCategoryWithStacks } from "../schema";
import { TechStackEditor } from "./TechStackEditor";
import { TechStackBadgeList } from "./TechStackBadgeList";
import { EditableInput } from "@/components/EditableInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DragHandle } from "@/components/DragHandle";
import { DeleteIconButton } from "@/components/DeleteIconButton";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EditingState } from "./TechCategoryListSection";

type CategorySectionProps = {
  category: TechCategoryWithStacks;
  editingState: EditingState;
  onChangeEditingState: (state: EditingState) => void;
  onSaveStacks: (categoryId: string, data: TechStackFormData[]) => void;
  onUpdateName: (categoryId: string, newName: string) => void;
  onDelete: (categoryId: string) => void;
};

export default function TechCategoryCard({
  category,
  editingState,
  onChangeEditingState,
  onSaveStacks,
  onUpdateName,
  onDelete,
}: CategorySectionProps) {
  const isEditingName = editingState?.categoryId === category.id && editingState?.mode === "name";
  const isEditingStacks = editingState?.categoryId === category.id && editingState?.mode === "stacks";

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: category.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragHandleProps = {
    ...attributes,
    ...listeners,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="grid gap-3">
        <CardHeader className="px-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DragHandle dragHandleProps={dragHandleProps} />
              <EditableInput
                value={category.name}
                placeholder="カテゴリ名を入力"
                editing={isEditingName}
                onEditingChange={(editing) =>
                  onChangeEditingState(editing ? { categoryId: category.id, mode: "name" } : null)
                }
                onSave={(newName) => onUpdateName(category.id, newName)}
              />
            </div>
            <DeleteIconButton tooltip="カテゴリを削除" onClick={() => onDelete(category.id)} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditingStacks ? (
            <TechStackEditor
              category={category}
              onSave={(data) => onSaveStacks(category.id, data)}
              onCancel={() => onChangeEditingState(null)}
            />
          ) : (
            <TechStackBadgeList
              category={category}
              onStartEditing={() => onChangeEditingState({ categoryId: category.id, mode: "stacks" })}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
