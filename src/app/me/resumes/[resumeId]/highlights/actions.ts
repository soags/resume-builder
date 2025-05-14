"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { withServerLogging } from "@/lib/withServerLogging";
import { HighlightListFormValues } from "./schema";

export const getHighlights = async (resumeId: string) =>
  await withServerLogging(async () => {
    const highlights = await prisma.highlight.findMany({
      where: { resumeId },
      orderBy: { order: "asc" },
    });

    return { ok: true, data: highlights };
  }, "getHighlights");

export const saveHighlights = async (resumeId: string, values: HighlightListFormValues) =>
  await withServerLogging(async () => {
    // Order をセット
    const items = values.highlights;
    const activeItems = items.filter((highlight) => !highlight.isDeleted);
    activeItems.forEach((item, index) => {
      item.order = index + 1;
    });

    // 登録処理
    await prisma.$transaction(async (tx) => {
      for (const item of items) {
        if (item.isNew && item.isDeleted) {
          // SKIP
          continue;
        }

        if (item.isNew && !item.isDeleted) {
          // INSERT
          await tx.highlight.create({
            data: {
              resumeId,
              text: item.text,
              order: item.order,
            },
          });
        } else if (!item.isNew && item.isDeleted) {
          // DELETE
          await tx.highlight.delete({
            where: { id: item.id },
          });
        } else if (!item.isNew && !item.isDeleted) {
          // UPDATE
          await tx.highlight.update({
            where: { id: item.id },
            data: {
              text: item.text,
              order: item.order,
            },
          });
        }
      }
    });

    revalidatePath(`/me/resumes/${resumeId}/highlights`);

    // 再取得
    const newHighlights = await prisma.highlight.findMany({
      where: { resumeId },
      orderBy: { order: "asc" },
    });

    return { ok: true, data: newHighlights };
  }, "saveHighlights");
