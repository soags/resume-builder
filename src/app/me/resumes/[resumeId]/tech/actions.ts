"use server";

import prisma from "@/lib/prisma";
import { TechStackFormData } from "./schema";
import { TechCategory } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { withServerLogging } from "@/lib/withServerLogging";

export const getTechCategories = async (resumeId: string) =>
  await withServerLogging(async () => {
    const techCategories = await prisma.techCategory.findMany({
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

    return { ok: true, data: techCategories };
  }, "getTechCategories");

export const addTechCategory = async (resumeId: string) =>
  await withServerLogging(async () => {
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

    return { ok: true, data: techCategory };
  }, "addTechCategory");

export const updateTechCategoryName = async (resumeId: string, categoryId: string, name: string) =>
  await withServerLogging(async () => {
    const techCategory = await prisma.techCategory.update({
      where: { id: categoryId },
      data: { name },
    });

    revalidatePath(`/me/resumes/${resumeId}/tech`);

    return { ok: true, data: techCategory };
  }, "updateTechCategoryName");

export const updateTechCategoryOrder = async (resumeId: string, order: TechCategory[]) =>
  await withServerLogging(async () => {
    const updates = order.map((category, index) =>
      prisma.techCategory.update({
        where: { id: category.id },
        data: { order: index + 1 },
      }),
    );

    await prisma.$transaction(updates);

    revalidatePath(`/me/resumes/${resumeId}/tech`);

    return { ok: true, data: null };
  }, "updateTechCategoryOrder");

export const deleteTechCategory = async (resumeId: string, categoryId: string) =>
  await withServerLogging(async () => {
    await prisma.techCategory.delete({
      where: { id: categoryId },
    });

    revalidatePath(`/me/resumes/${resumeId}/tech`);

    return { ok: true, data: null };
  }, "deleteTechCategory");

export const getTechStacks = async (categoryId: string) =>
  await withServerLogging(async () => {
    const techStacks = await prisma.techStack.findMany({
      where: { categoryId },
      orderBy: { order: "asc" },
    });

    return { ok: true, data: techStacks };
  }, "getTechStacks");

export const saveTechStacks = async (
  resumeId: string,
  categoryId: string,
  stacks: TechStackFormData[],
) =>
  await withServerLogging(async () => {
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

    const techStacks = await getTechStacks(categoryId);
    return techStacks;
  }, "saveTechStacks");
