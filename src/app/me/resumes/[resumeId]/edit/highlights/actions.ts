"use server";

import { Highlight } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function getHighlights(resumeId: string): Promise<Highlight[]> {
  try {
    return prisma.highlight.findMany({
      where: { resumeId },
      orderBy: { orderNo: "asc" },
    });
  } catch (error) {
    console.error(
      `[getHighlights] Error fetching highlights for resumeId=${resumeId}:`,
      error,
    );
    throw new Error("Failed to fetch highlights");
  }
}

export async function addHighlight(resumeId: string): Promise<Highlight> {
  try {
    const maxOrderNo = await prisma.highlight.aggregate({
      _max: { orderNo: true },
      where: { resumeId },
    });

    return prisma.highlight.create({
      data: {
        resumeId,
        text: "",
        orderNo: (maxOrderNo._max.orderNo || 0) + 1,
      },
    });
  } catch (error) {
    console.error("Error creating highlight:", error);
    throw new Error("Failed to create highlight");
  }
}

export async function updateHighlight(
  id: string,
  text: string,
): Promise<Highlight> {
  try {
    return prisma.highlight.update({
      where: { id },
      data: { text },
    });
  } catch (error) {
    console.error("Error updating highlight:", error);
    throw new Error("Failed to update highlight");
  }
}

export async function updateHighlightOrder(
  resumeId: string,
  order: string[],
): Promise<void> {
  try {
    const updates = order.map((id, index) => {
      return prisma.highlight.update({
        where: { id },
        data: { orderNo: index + 1 },
      });
    });

    await prisma.$transaction(updates);
  } catch (error) {
    console.error(
      `[updateHighlightOrder] Error updating order for resumeId=${resumeId}:`,
      error,
    );
    throw new Error("Failed to update highlight order");
  }
}

export async function deleteHighlight(id: string): Promise<void> {
  try {
    await prisma.highlight.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting highlight:", error);
    throw new Error("Failed to delete highlight");
  }
}
