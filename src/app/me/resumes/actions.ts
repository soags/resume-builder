"use server";

import prisma from "@/lib/prisma";
import { NewResumeFormData } from "./schema";

export async function getResumes(userId: string) {
  return await prisma.resume.findMany({
    where: {
      userId,
    },
  });
}

export async function createResume(userId: string, data: NewResumeFormData) {
  return await prisma.resume.create({
    data: {
      userId,
      ...data,
    },
  });
}
