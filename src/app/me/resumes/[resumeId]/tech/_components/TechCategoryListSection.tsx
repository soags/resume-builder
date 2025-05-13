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
import { logger } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
    try {
      let newCategory = categories.find((category) => category.name === "");
      if (!newCategory) {
        newCategory = await addTechCategory(resumeId);
        setCategories([...categories, newCategory]);
      }
      setEditing({ categoryId: newCategory.id, mode: "name" });
    } catch (error) {
      logger.handle(error, "TechCategoryListSection");
    }
  };

  const handleUpdateCategoryName = async (categoryId: string, name: string) => {
    try {
      await updateTechCategoryName(resumeId, categoryId, name);
      const updatedCategories = categories.map((category) =>
        category.id === categoryId ? { ...category, name } : category,
      );
      setCategories(updatedCategories);
      setEditing(null);
    } catch (error) {
      logger.handle(error, "TechCategoryListSection");
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteTechCategory(resumeId, categoryId);
      const updatedCategories = categories.filter((category) => category.id !== categoryId);
      setCategories(updatedCategories);
      setEditing(null);
    } catch (error) {
      logger.handle(error, "TechCategoryListSection");
    }
  };

  const handleSaveStacks = async (categoryId: string, data: TechStackFormData[]) => {
    try {
      const updatedStacks = await saveTechStacks(resumeId, categoryId, data);
      const updatedCategories = categories.map((category) =>
        category.id === categoryId ? { ...category, stacks: updatedStacks } : category,
      );
      setCategories(updatedCategories);
      setEditing(null);
    } catch (error) {
      logger.handle(error, "TechCategoryListSection");
    }
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

    try {
      await updateTechCategoryOrder(resumeId, newCategories);
    } catch (error) {
      logger.handle(error, "TechCategoryListSection");
    }
  };

  return (
    <DndContext id={dndId} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={categories.map((category) => category.id)} strategy={verticalListSortingStrategy}>
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
