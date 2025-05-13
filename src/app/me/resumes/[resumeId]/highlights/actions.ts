"use server";

import { Highlight } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getHighlights(resumeId: string): Promise<Highlight[]> {
  return prisma.highlight.findMany({
    where: { resumeId },
    orderBy: { order: "asc" },
  });
}

export async function addHighlight(resumeId: string): Promise<Highlight> {
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
}

export async function updateHighlight(
  resumeId: string,
  id: string,
  text: string,
): Promise<Highlight> {
  const highlight = prisma.highlight.update({
    where: { id },
    data: { text },
  });
  revalidatePath(`/me/resumes/${resumeId}/highlights`);
  return highlight;
}

export async function updateHighlightOrder(resumeId: string, order: string[]): Promise<void> {
  const updates = order.map((id, index) => {
    return prisma.highlight.update({
      where: { id },
      data: { order: index + 1 },
    });
  });

  await prisma.$transaction(updates);
  revalidatePath(`/me/resumes/${resumeId}/highlights`);
}

export async function deleteHighlight(resumeId: string, id: string): Promise<void> {
  await prisma.highlight.delete({ where: { id } });
  revalidatePath(`/me/resumes/${resumeId}/highlights`);
}
