"use client";

import { TechStack } from "@/generated/prisma/client";
import { getTechStacks, saveTechStacks } from "../actions";
import { TechStackFormData, TechCategoryWithStacks } from "../schema";
import { CategorySectionEdit } from "./CategorySectionEdit";
import { useState } from "react";
import { CategorySectionView } from "./CategorySectionView";

type CategorySectionProps = {
  category: TechCategoryWithStacks;
};

export default function CategorySection({ category }: CategorySectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [stacks, setStacks] = useState<TechStack[]>(category.stacks);

  const handleSubmit = async (data: TechStackFormData[]) => {
    try {
      await saveTechStacks(category.id, data);
      setStacks(await getTechStacks(category.id));
    } catch (error) {
      console.error(`[CategorySection] Error saving tech stacks:`, error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="grid gap-3">
      <h3 className="text-lg font-medium">{category.name}</h3>
      {isEditing ? (
        <CategorySectionEdit
          initialStacks={stacks}
          onSubmit={(data) => handleSubmit(data)}
          onCancel={() => {
            setIsEditing(false);
          }}
        />
      ) : (
        <CategorySectionView
          stacks={stacks}
          onStartEditing={() => setIsEditing(true)}
        />
      )}
    </div>
  );
}
