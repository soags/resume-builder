"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { withServerLogging } from "@/lib/withServerLogging";

export const getHighlights = async (resumeId: string) =>
  await withServerLogging(async () => {
    const highlights = await prisma.highlight.findMany({
      where: { resumeId },
      orderBy: { order: "asc" },
    });

    return { ok: true, data: highlights };
  }, "getHighlights");

export const addHighlight = async (resumeId: string) =>
  await withServerLogging(async () => {
    const maxOrder = await prisma.highlight.aggregate({
      _max: { order: true },
      where: { resumeId },
    });

    const highlight = await prisma.highlight.create({
      data: {
        resumeId,
        text: "",
        order: (maxOrder._max.order || 0) + 1,
      },
    });

    revalidatePath(`/me/resumes/${resumeId}/highlights`);

    return { ok: true, data: highlight };
  }, "addHighlight");

export const updateHighlight = async (resumeId: string, id: string, text: string) =>
  await withServerLogging(async () => {
    const highlight = await prisma.highlight.update({
      where: { id },
      data: { text },
    });

    revalidatePath(`/me/resumes/${resumeId}/highlights`);

    return { ok: true, data: highlight };
  }, "updateHighlight");

export const updateHighlightOrder = async (resumeId: string, order: string[]) =>
  await withServerLogging(async () => {
    const updates = order.map((id, index) => {
      return prisma.highlight.update({
        where: { id },
        data: { order: index + 1 },
      });
    });

    await prisma.$transaction(updates);

    revalidatePath(`/me/resumes/${resumeId}/highlights`);

    return { ok: true, data: null };
  }, "updateHighlightOrder");

export const deleteHighlight = async (resumeId: string, id: string) =>
  await withServerLogging(async () => {
    await prisma.highlight.delete({ where: { id } });

    revalidatePath(`/me/resumes/${resumeId}/highlights`);

    return { ok: true, data: null };
  }, "deleteHighlight");
