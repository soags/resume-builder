"use server";

import prisma from "@/lib/prisma";
import { TechStackFormData } from "./schema";
import { TechCategory } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";

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

export async function addTechCategory(resumeId: string) {
  const maxOrder = await prisma.techCategory.aggregate({
    where: { resumeId },
    _max: {
      order: true,
    },
  });

  const techCategory = await prisma.techCategory.create({
    data: {
      resumeId,
      name: "",
      order: (maxOrder._max.order ?? 0) + 1,
    },
    include: {
      stacks: true,
    },
  });

  revalidatePath(`/me/resumes/${resumeId}/tech`);
  return techCategory;
}

export async function updateTechCategoryName(resumeId: string, categoryId: string, name: string) {
  await prisma.techCategory.update({
    where: { id: categoryId },
    data: { name },
  });
  revalidatePath(`/me/resumes/${resumeId}/tech`);
}

export async function updateTechCategoryOrder(resumeId: string, order: TechCategory[]) {
  const updates = order.map((category, index) =>
    prisma.techCategory.update({
      where: { id: category.id },
      data: { order: index + 1 },
    }),
  );

  await prisma.$transaction(updates);
  revalidatePath(`/me/resumes/${resumeId}/tech`);
}

export async function deleteTechCategory(resumeId: string, categoryId: string) {
  await prisma.techCategory.delete({
    where: { id: categoryId },
  });
  revalidatePath(`/me/resumes/${resumeId}/tech`);
}

export async function getTechStacks(categoryId: string) {
  return await prisma.techStack.findMany({
    where: { categoryId },
    orderBy: { order: "asc" },
  });
}

export async function saveTechStacks(resumeId: string, categoryId: string, stacks: TechStackFormData[]) {
  await prisma.$transaction([
    prisma.techStack.deleteMany({
      where: { categoryId },
    }),
    prisma.techStack.createMany({
      data: stacks.map((stack, index) => ({
        categoryId,
        name: stack.name,
        label: stack.label,
        order: index + 1,
      })),
    }),
  ]);

  revalidatePath(`/me/resumes/${resumeId}/tech`);
  return await getTechStacks(categoryId);
}
