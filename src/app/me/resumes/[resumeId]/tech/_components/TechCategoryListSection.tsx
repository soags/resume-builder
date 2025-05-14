"use client";

import { useId, useState } from "react";
import { TechCategoryWithStacks, TechStackFormData } from "../schema";
import TechCategoryCard from "./TechCategoryCard";
import {
  addTechCategory,
  deleteTechCategory,
  saveTechStacks,
  updateTechCategoryName,
  updateTechCategoryOrder,
} from "../actions";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { withClientFeedback } from "@/lib/withClientFeedback";

export type EditingState = {
  categoryId: string;
  mode: "name" | "stacks";
} | null;

export type TechStackListProps = {
  resumeId: string;
  initialCategories: TechCategoryWithStacks[];
};

export function TechCategoryListSection({ resumeId, initialCategories }: TechStackListProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [editing, setEditing] = useState<EditingState>(null);

  const dndId = useId();

  const handleAddCategory = async () => {
    await withClientFeedback(async () => {
      let newCategory = categories.find((category) => category.name === "");
      if (!newCategory) {
        const addResult = await addTechCategory(resumeId);
        if (!addResult.ok) {
          return addResult;
        }

        newCategory = addResult.data;
        setCategories([...categories, addResult.data]);
      }
      setEditing({ categoryId: newCategory.id, mode: "name" });

      return { ok: true, data: null };
    });
  };

  const handleUpdateCategoryName = async (categoryId: string, name: string) => {
    await withClientFeedback(async () => {
      const updateResult = await updateTechCategoryName(resumeId, categoryId, name);
      if (!updateResult.ok) {
        return updateResult;
      }

      const updatedCategories = categories.map((category) =>
        category.id === categoryId ? { ...category, name } : category,
      );
      setCategories(updatedCategories);
      setEditing(null);

      return updateResult;
    });
  };

  const handleDeleteCategory = async (categoryId: string) => {
    await withClientFeedback(async () => {
      const deleteResult = await deleteTechCategory(resumeId, categoryId);
      if (!deleteResult.ok) {
        return deleteResult;
      }

      const updatedCategories = categories.filter((category) => category.id !== categoryId);
      setCategories(updatedCategories);
      setEditing(null);

      return deleteResult;
    });
  };

  const handleSaveStacks = async (categoryId: string, data: TechStackFormData[]) => {
    await withClientFeedback(async () => {
      const saveResult = await saveTechStacks(resumeId, categoryId, data);
      if (!saveResult.ok) {
        return saveResult;
      }

      const updatedStacks = saveResult.data;
      const updatedCategories = categories.map((category) =>
        category.id === categoryId ? { ...category, stacks: updatedStacks } : category,
      );
      setCategories(updatedCategories);
      setEditing(null);

      return saveResult;
    });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    const oldIndex = categories.findIndex((item) => item.id === (active.id as string));
    const newIndex = categories.findIndex((item) => item.id === (over.id as string));
    const newCategories = arrayMove(categories, oldIndex, newIndex);
    setCategories(newCategories);

    await withClientFeedback(async () => await updateTechCategoryOrder(resumeId, newCategories));
  };

  return (
    <DndContext id={dndId} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={categories.map((category) => category.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="grid gap-6">
          {categories.map((category) => (
            <TechCategoryCard
              key={category.id}
              category={category}
              editingState={editing}
              onChangeEditingState={setEditing}
              onSaveStacks={handleSaveStacks}
              onUpdateName={handleUpdateCategoryName}
              onDelete={handleDeleteCategory}
            />
          ))}
          <Button
            variant="outline"
            className="w-fit rounded-full"
            disabled={editing !== null}
            onClick={() => handleAddCategory()}
          >
            <Plus />
            カテゴリを追加
          </Button>
        </div>
      </SortableContext>
    </DndContext>
  );
}
