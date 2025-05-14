"use server";

import prisma from "@/lib/prisma";
import { ResumeFormData } from "./schema";
import { revalidatePath } from "next/cache";
import { withServerLogging } from "@/lib/withServerLogging";
import { Result } from "@/types";
import { Resume } from "@/generated/prisma/client";

export const getResume = async (id: string) =>
  await withServerLogging(async () => {
    const resume = await prisma.resume.findUnique({ where: { id } });

    return { ok: true, data: resume };
  }, "getResume");

export const updateResume = async (
  id: string,
  data: ResumeFormData,
  userId: string,
): Promise<Result<Resume>> =>
  await withServerLogging(async () => {
    const existing = await prisma.resume.findFirst({
      where: {
        userId,
        slug: data.slug,
        NOT: { id },
      },
    });

    if (existing) {
      return {
        ok: false,
        error: { code: "DUPLICATE_SLUG", message: "このSlugはすでに使用されています" },
      };
    }

    const resume = await prisma.resume.update({
      where: { id },
      data,
    });

    revalidatePath(`/me/resumes/${id}`);

    return { ok: true, data: resume };
  }, "updateResume");

export const checkSlugDuplicate = async (userId: string, slug: string, resumeId?: string) =>
  await withServerLogging(async () => {
    const exists = await prisma.resume.findFirst({
      where: {
        userId,
        slug,
        NOT: resumeId ? { id: resumeId } : undefined,
      },
    });

    return { ok: true, data: !!exists };
  }, "checkSlugDuplicate");
