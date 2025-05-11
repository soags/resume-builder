"use client";

import { TechStack } from "@/generated/prisma/client";
import { getTechStacks, saveTechStacks } from "../actions";
import { TechStackFormData } from "../schema";
import { TechCategoryWithSkills } from "../types";
import CategorySectionEdit from "./CategorySectionEdit";
import { useState } from "react";

type CategorySectionProps = {
  category: TechCategoryWithSkills;
};

export default function CategorySection({ category }: CategorySectionProps) {
  const [stacks, setStacks] = useState<TechStack[]>(category.stacks);

  const handleSubmit = async (data: TechStackFormData[]) => {
    try {
      await saveTechStacks(category.id, data);
      setStacks(await getTechStacks(category.id));
    } catch (error) {
      console.error(`[CategorySection] Error saving tech stacks:`, error);
    }
  };

  return (
    <CategorySectionEdit
      key={category.id}
      initialStacks={stacks}
      onSubmit={(data) => {
        handleSubmit(data);
      }}
      onCancel={() => {}}
    />
  );
}
