"use server";

import prisma from "@/lib/prisma";
import { ResumeFormData } from "./schema";
import { revalidatePath } from "next/cache";

export async function getResume(id: string) {
  return await prisma.resume.findUnique({ where: { id } });
}

export async function updateResume(id: string, data: ResumeFormData) {
  const resume = await prisma.resume.update({
    where: { id },
    data,
  });

  revalidatePath(`/me/resumes/${id}`);

  return resume;
}
