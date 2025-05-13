"use server";

import prisma from "@/lib/prisma";
import { PromotionFormData } from "./schema";
import { revalidatePath } from "next/cache";
import { withLogging } from "@/lib/withLogging";

export const getPromotions = (resumeId: string) =>
  withLogging(
    async () =>
      prisma.promotion.findMany({
        where: { resumeId },
        orderBy: { order: "asc" },
      }),
    "getPromotions",
  );

export const savePromotion = (resumeId: string, data: PromotionFormData) =>
  withLogging(async () => {
    const id = data.id;

    let promotion;
    if (!id) {
      const maxOrder = await prisma.promotion.aggregate({
        _max: { order: true },
        where: { resumeId },
      });

      promotion = await prisma.promotion.create({
        data: {
          resumeId: resumeId,
          order: (maxOrder._max.order ?? 0) + 1,
          ...data,
        },
      });
    } else {
      promotion = await prisma.promotion.update({
        where: { id },
        data: {
          ...data,
        },
      });
    }

    revalidatePath(`/me/resumes/${resumeId}/promotions`);
    return promotion;
  }, "savePromotion");

export const swapPromotionOrder = (resumeId: string, sourceId: string, targetId: string) =>
  withLogging(async () => {
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
    revalidatePath(`/me/resumes/${resumeId}/promotions`);
  }, "swapPromotionOrder");

export const deletePromotion = (resumeId: string, id: string) =>
  withLogging(async () => {
    await prisma.promotion.delete({
      where: { id },
    });
    revalidatePath(`/me/resumes/${resumeId}/promotions`);
  }, "deletePromotion");
