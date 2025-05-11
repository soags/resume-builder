"use server";

import prisma from "@/lib/prisma";
import { TechStackFormData } from "./schema";

export async function getTechCategories(resumeId: string) {
  return await prisma.techCategory.findMany({
    where: { resumeId },
    include: {
      stacks: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: { order: "asc" },
  });
}

export async function getTechStacks(categoryId: string) {
  return await prisma.techStack.findMany({
    where: { categoryId },
    orderBy: { order: "asc" },
  });
}

export async function saveTechStacks(
  categoryId: string,
  stacks: TechStackFormData[],
) {
  await prisma.techStack.deleteMany({
    where: { categoryId },
  });

  return await prisma.techStack.createMany({
    data: stacks.map((stack, index) => ({
      categoryId,
      name: stack.name,
      label: stack.label,
      order: index + 1,
    })),
  });
}
