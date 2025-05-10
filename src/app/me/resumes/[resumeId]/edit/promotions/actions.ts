"use server";

import prisma from "@/lib/prisma";
import { PromotionFormData } from "./schema";

export async function getPromotions(resumeId: string) {
  try {
    return prisma.promotion.findMany({
      where: { resumeId },
      orderBy: { orderNo: "asc" },
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
      const maxOrderNo = await prisma.promotion.aggregate({
        _max: { orderNo: true },
        where: { resumeId },
      });

      return await prisma.promotion.create({
        data: {
          resumeId: resumeId,
          orderNo: (maxOrderNo._max.orderNo ?? 0) + 1,
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
