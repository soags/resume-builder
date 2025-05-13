"use server";

import { Highlight } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { withLogging } from "@/lib/withLogging";

export const getHighlights = (resumeId: string) =>
  withLogging(
    async (): Promise<Highlight[]> =>
      prisma.highlight.findMany({
        where: { resumeId },
        orderBy: { order: "asc" },
      }),
    "getHighlights",
  );

export const addHighlight = (resumeId: string) =>
  withLogging(async (): Promise<Highlight> => {
    const maxOrder = await prisma.highlight.aggregate({
      _max: { order: true },
      where: { resumeId },
    });

    const highlight = prisma.highlight.create({
      data: {
        resumeId,
        text: "",
        order: (maxOrder._max.order || 0) + 1,
      },
    });

    revalidatePath(`/me/resumes/${resumeId}/highlights`);
    return highlight;
  }, "addHighlight");

export const updateHighlight = (resumeId: string, id: string, text: string) =>
  withLogging(async (): Promise<Highlight> => {
    const highlight = prisma.highlight.update({
      where: { id },
      data: { text },
    });
    revalidatePath(`/me/resumes/${resumeId}/highlights`);
    return highlight;
  }, "updateHighlight");

export const updateHighlightOrder = (resumeId: string, order: string[]) =>
  withLogging(async (): Promise<void> => {
    const updates = order.map((id, index) => {
      return prisma.highlight.update({
        where: { id },
        data: { order: index + 1 },
      });
    });

    await prisma.$transaction(updates);
    revalidatePath(`/me/resumes/${resumeId}/highlights`);
  }, "updateHighlightOrder");

export const deleteHighlight = (resumeId: string, id: string) =>
  withLogging(async (): Promise<void> => {
    await prisma.highlight.delete({ where: { id } });
    revalidatePath(`/me/resumes/${resumeId}/highlights`);
  }, "deleteHighlight");
