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
import { withClientLogging } from "@/lib/withClientLogging";

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
    await withClientLogging(
      async () => {
        let newCategory = categories.find((category) => category.name === "");
        if (!newCategory) {
          const addedCategory = await addTechCategory(resumeId);
          if (addedCategory) {
            newCategory = addedCategory;
            setCategories([...categories, addedCategory]);
          }
        }
        if (newCategory) {
          setEditing({ categoryId: newCategory.id, mode: "name" });
        }
      },
      {
        context: "TechCategoryListSection.add",
        errorMessage: "カテゴリの追加に失敗しました",
      },
    );
  };

  const handleUpdateCategoryName = async (categoryId: string, name: string) => {
    await withClientLogging(
      async () => {
        await updateTechCategoryName(resumeId, categoryId, name);
        const updatedCategories = categories.map((category) =>
          category.id === categoryId ? { ...category, name } : category,
        );
        setCategories(updatedCategories);
        setEditing(null);
      },
      {
        context: "TechCategoryListSection.updateName",
        errorMessage: "カテゴリ名の更新に失敗しました",
      },
    );
  };

  const handleDeleteCategory = async (categoryId: string) => {
    await withClientLogging(
      async () => {
        await deleteTechCategory(resumeId, categoryId);
        const updatedCategories = categories.filter((category) => category.id !== categoryId);
        setCategories(updatedCategories);
        setEditing(null);
      },
      {
        context: "TechCategoryListSection.delete",
        errorMessage: "カテゴリの削除に失敗しました",
      },
    );
  };

  const handleSaveStacks = async (categoryId: string, data: TechStackFormData[]) => {
    await withClientLogging(
      async () => {
        const updatedStacks = await saveTechStacks(resumeId, categoryId, data);
        if (updatedStacks) {
          const updatedCategories = categories.map((category) =>
            category.id === categoryId ? { ...category, stacks: updatedStacks } : category,
          );
          setCategories(updatedCategories);
          setEditing(null);
        }
      },
      {
        context: "TechCategoryListSection.saveStacks",
        errorMessage: "技術スタックの保存に失敗しました",
      },
    );
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

    await withClientLogging(
      async () => {
        await updateTechCategoryOrder(resumeId, newCategories);
      },
      {
        context: "TechCategoryListSection.updateOrder",
        errorMessage: "カテゴリの並び順の更新に失敗しました",
      },
    );
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
