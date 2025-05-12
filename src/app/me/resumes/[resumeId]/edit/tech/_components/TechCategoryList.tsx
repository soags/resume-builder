"use client";

import { useId, useState } from "react";
import { TechCategoryWithStacks } from "../schema";
import CategorySection from "./CategorySection";
import { addCategory, deleteCategory, updateCategoryName, updateCategoryOrder } from "../actions";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { logger } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type TechStackListProps = {
  resumeId: string;
  initialCategories: TechCategoryWithStacks[];
};

export function TechCategoryList({ resumeId, initialCategories }: TechStackListProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState<string | null>(null);

  const dndId = useId();

  const handleAddCategory = async () => {
    try {
      let newCategory = categories.find((category) => category.name === "");
      if (!newCategory) {
        newCategory = await addCategory(resumeId);
        setCategories([...categories, newCategory]);
      }
      setEditingId(newCategory.id);
    } catch (error) {
      logger.handle(error, "TechStackList");
    }
  };

  const handleUpdateCategoryName = async (categoryId: string, name: string) => {
    try {
      await updateCategoryName(categoryId, name);
      const updatedCategories = categories.map((category) =>
        category.id === categoryId ? { ...category, name } : category,
      );
      setCategories(updatedCategories);
      setEditingId(null);
    } catch (error) {
      logger.handle(error, "TechStackList");
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId);
      const updatedCategories = categories.filter((category) => category.id !== categoryId);
      setCategories(updatedCategories);
      setEditingId(null);
    } catch (error) {
      logger.handle(error, "TechStackList");
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
      await updateCategoryOrder(resumeId, newCategories);
    } catch (error) {
      logger.handle(error, "TechStackList");
    }
  };

  return (
    <DndContext id={dndId} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={categories.map((category) => category.id)} strategy={verticalListSortingStrategy}>
        <div className="grid gap-6">
          {categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              editingCategoryId={editingId}
              onEditingCategoryIdChange={(editingCategoryId) => setEditingId(editingCategoryId)}
              onUpdate={(name) => handleUpdateCategoryName(category.id, name)}
              onDelete={() => handleDeleteCategory(category.id)}
            />
          ))}
          <Button variant="outline" className="w-fit rounded-full" onClick={() => handleAddCategory()}>
            <Plus />
            カテゴリを追加
          </Button>
        </div>
      </SortableContext>
    </DndContext>
  );
}
