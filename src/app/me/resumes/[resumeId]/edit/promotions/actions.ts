"use server";

import prisma from "@/lib/prisma";
import { PromotionFormData } from "./schema";

export async function getPromotions(resumeId: string) {
  try {
    return prisma.promotion.findMany({
      where: { resumeId },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error(
      `[getPromotions] Error fetching highlights for resumeId=${resumeId}:`,
      error,
    );
    throw new Error("Failed to fetch highlights");
  }
}

export async function savePromotion(resumeId: string, data: PromotionFormData) {
  try {
    const id = data.id;

    if (!id) {
      const maxOrder = await prisma.promotion.aggregate({
        _max: { order: true },
        where: { resumeId },
      });

      return await prisma.promotion.create({
        data: {
          resumeId: resumeId,
          order: (maxOrder._max.order ?? 0) + 1,
          ...data,
        },
      });
    } else {
      return await prisma.promotion.update({
        where: { id },
        data: {
          ...data,
        },
      });
    }
  } catch (error) {
    console.error(
      `[savePromotion] Error saving promotion for resumeId=${resumeId}:`,
      error,
    );
    throw new Error("Failed to save promotion");
  }
}

export async function swapPromotionOrder(
  resumeId: string,
  sourceId: string,
  targetId: string,
) {
  try {
    const promotions = await prisma.promotion.findMany({
      where: {
        id: { in: [sourceId, targetId] },
        resumeId: resumeId,
      },
      select: { id: true, order: true },
    });

    if (promotions.length !== 2) {
      throw new Error("Failed to swap promotion order");
    }

    const [a, b] = promotions;
    const ops = [
      prisma.promotion.update({
        where: { id: a.id },
        data: { order: b.order },
      }),
      prisma.promotion.update({
        where: { id: b.id },
        data: { order: a.order },
      }),
    ];

    await prisma.$transaction(ops);
  } catch (error) {
    console.error(`[deletePromotion] Error swaping promotion order:`, error);
    throw new Error("Failed to swap promotion order");
  }
}

export async function deletePromotion(id: string) {
  try {
    return await prisma.promotion.delete({
      where: { id },
    });
  } catch (error) {
    console.error(
      `[deletePromotion] Error deleting promotion with id=${id}:`,
      error,
    );
    throw new Error("Failed to delete promotion");
  }
}
