"use server";

import prisma from "@/lib/prisma";
import { NewResumeFormData } from "./schema";
import { revalidatePath } from "next/cache";

export async function getResumes(userId: string) {
  return await prisma.resume.findMany({
    where: { userId },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });
}

export async function createResume(userId: string, data: NewResumeFormData) {
  const resume = await prisma.resume.create({
    data: {
      userId,
      ...data,
    },
  });

  revalidatePath("/me/resumes");

  return resume;
}
