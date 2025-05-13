"use server";

import prisma from "@/lib/prisma";
import { ResumeFormData } from "./schema";
import { revalidatePath } from "next/cache";
import { withServerLogging } from "@/lib/withServerLogging";

export const getResume = async (id: string) =>
  await withServerLogging(
    async () => await prisma.resume.findUnique({ where: { id } }),
    "getResume",
  );

export const updateResume = async (id: string, data: ResumeFormData) =>
  await withServerLogging(async () => {
    const resume = await prisma.resume.update({
      where: { id },
      data,
    });
    revalidatePath(`/me/resumes/${id}`);
    return resume;
  }, "updateResume");
