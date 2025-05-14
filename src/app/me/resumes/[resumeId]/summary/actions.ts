"use server";

import prisma from "@/lib/prisma";
import { SummaryFormData } from "./schema";
import { revalidatePath } from "next/cache";
import { withServerLogging } from "@/lib/withServerLogging";
import { Result } from "@/types";
import { Resume } from "@/generated/prisma/client";

export const getResume = async (id: string) =>
  await withServerLogging(async () => {
    const resume = await prisma.resume.findUnique({ where: { id } });

    return { ok: true, data: resume };
  }, "getResume");

export const updateSummary = async (id: string, data: SummaryFormData): Promise<Result<Resume>> =>
  await withServerLogging(async () => {
    const resume = await prisma.resume.update({
      where: { id },
      data,
    });

    revalidatePath(`/me/resumes/${id}`);

    return { ok: true, data: resume };
  }, "updateSummary");
