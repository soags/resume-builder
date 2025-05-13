"use server";

import prisma from "@/lib/prisma";
import { NewResumeFormData } from "./schema";
import { revalidatePath } from "next/cache";
import { withServerLogging } from "@/lib/withServerLogging";

export const getResumes = (userId: string) =>
  withServerLogging(
    async () =>
      await prisma.resume.findMany({
        where: { userId },
        orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      }),
    "getResumes",
  );

export const createResume = (userId: string, data: NewResumeFormData) =>
  withServerLogging(async () => {
    const resume = await prisma.resume.create({
      data: {
        userId,
        ...data,
      },
    });
    revalidatePath("/me/resumes");
    return resume;
  }, "createResume");
