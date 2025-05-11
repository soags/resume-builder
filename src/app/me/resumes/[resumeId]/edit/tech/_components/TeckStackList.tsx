"use client";

import { useState } from "react";
import { TechCategoryWithStacks } from "../schema";
import CategorySection from "./CategorySection";

type TechStackListProps = {
  initialCategories: TechCategoryWithStacks[];
};

export function TechStackList({ initialCategories }: TechStackListProps) {
  const [categories] = useState<TechCategoryWithStacks[]>(initialCategories);

  return (
    <div className="grid gap-6">
      {categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </div>
  );
}
