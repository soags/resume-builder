"use server";

import prisma from "@/lib/prisma";
import { ResumeFormData } from "./schema";
import { revalidatePath } from "next/cache";
import { withLogging } from "@/lib/withLogging";

export const getResume = (id: string) =>
  withLogging(async () => await prisma.resume.findUnique({ where: { id } }), "getResume");

export const updateResume = (id: string, data: ResumeFormData) =>
  withLogging(async () => {
    const resume = await prisma.resume.update({
      where: { id },
      data,
    });
    revalidatePath(`/me/resumes/${id}`);
    return resume;
  }, "updateResume");
