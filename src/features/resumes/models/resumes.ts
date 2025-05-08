"use server";

import prisma from "@/lib/prisma";
import { ResumeFormData } from "../schema/resumeSchema";

export async function getResumeById(id: string) {
  return await prisma.resume.findUnique({ where: { id } });
}

export async function getResumesByUser(userId: string) {
  return await prisma.resume.findMany({
    where: { userId },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });
}

export async function updateResumeBasics(
  resumeId: string,
  data: ResumeFormData,
) {
  return await prisma.resume.update({
    where: { id: resumeId },
    data: {
      ...data,
    },
  });
}
