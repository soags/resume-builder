"use server";

import prisma from "@/lib/prisma";
import { NewResumeFormData } from "./schema";
import { revalidatePath } from "next/cache";
import { withServerLogging } from "@/lib/withServerLogging";

export const getResumes = async (userId: string) =>
  await withServerLogging(
    async () =>
      await prisma.resume.findMany({
        where: { userId },
        orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      }),
    "getResumes",
  );

export const createResume = async (userId: string, data: NewResumeFormData) =>
  await withServerLogging(async () => {
    const resume = await prisma.resume.create({
      data: {
        userId,
        ...data,
      },
    });
    revalidatePath("/me/resumes");
    return resume;
  }, "createResume");
