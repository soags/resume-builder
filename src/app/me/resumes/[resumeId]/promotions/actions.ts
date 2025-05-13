"use server";

import prisma from "@/lib/prisma";
import { PromotionFormData } from "./schema";
import { revalidatePath } from "next/cache";

export async function getPromotions(resumeId: string) {
  return prisma.promotion.findMany({
    where: { resumeId },
    orderBy: { order: "asc" },
  });
}

export async function savePromotion(resumeId: string, data: PromotionFormData) {
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
}

export async function swapPromotionOrder(resumeId: string, sourceId: string, targetId: string) {
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
}

export async function deletePromotion(resumeId: string, id: string) {
  await prisma.promotion.delete({
    where: { id },
  });
  revalidatePath(`/me/resumes/${resumeId}/promotions`);
}
