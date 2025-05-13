"use server";

import prisma from "@/lib/prisma";
import { TechStackFormData } from "./schema";
import { TechCategory } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { withLogging } from "@/lib/withLogging";

export const getTechCategories = (resumeId: string) =>
  withLogging(
    async () =>
      await prisma.techCategory.findMany({
        where: { resumeId },
        include: {
          stacks: {
            orderBy: {
              order: "asc",
            },
          },
        },
        orderBy: { order: "asc" },
      }),
    "getTechCategories",
  );

export const addTechCategory = (resumeId: string) =>
  withLogging(async () => {
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
  }, "addTechCategory");

export const updateTechCategoryName = (resumeId: string, categoryId: string, name: string) =>
  withLogging(async () => {
    await prisma.techCategory.update({
      where: { id: categoryId },
      data: { name },
    });
    revalidatePath(`/me/resumes/${resumeId}/tech`);
  }, "updateTechCategoryName");

export const updateTechCategoryOrder = (resumeId: string, order: TechCategory[]) =>
  withLogging(async () => {
    const updates = order.map((category, index) =>
      prisma.techCategory.update({
        where: { id: category.id },
        data: { order: index + 1 },
      }),
    );

    await prisma.$transaction(updates);
    revalidatePath(`/me/resumes/${resumeId}/tech`);
  }, "updateTechCategoryOrder");

export const deleteTechCategory = (resumeId: string, categoryId: string) =>
  withLogging(async () => {
    await prisma.techCategory.delete({
      where: { id: categoryId },
    });
    revalidatePath(`/me/resumes/${resumeId}/tech`);
  }, "deleteTechCategory");

export const getTechStacks = (categoryId: string) =>
  withLogging(
    async () =>
      await prisma.techStack.findMany({
        where: { categoryId },
        orderBy: { order: "asc" },
      }),
    "getTechStacks",
  );

export const saveTechStacks = (resumeId: string, categoryId: string, stacks: TechStackFormData[]) =>
  withLogging(async () => {
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
  }, "saveTechStacks");
