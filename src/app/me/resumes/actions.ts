"use server";

import prisma from "@/lib/prisma";
import { NewResumeFormData } from "./schema";
import { revalidatePath } from "next/cache";
import { withLogging } from "@/lib/withLogging";

export const getResumes = (userId: string) =>
  withLogging(
    async () =>
      await prisma.resume.findMany({
        where: { userId },
        orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      }),
    "getResumes",
  );

export const createResume = (userId: string, data: NewResumeFormData) =>
  withLogging(async () => {
    const resume = await prisma.resume.create({
      data: {
        userId,
        ...data,
      },
    });
    revalidatePath("/me/resumes");
    return resume;
  }, "createResume");
