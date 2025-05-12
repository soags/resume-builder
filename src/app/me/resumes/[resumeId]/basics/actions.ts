"use server";

import prisma from "@/lib/prisma";
import { BasicsFormData } from "./schema";

export async function getResume(id: string) {
  return await prisma.resume.findUnique({ where: { id } });
}

export async function createResume(userId: string) {
  return await prisma.resume.create({
    data: {
      userId,
      title: "職務経歴書",
    },
  });
}

export async function updateBasics(id: string, data: BasicsFormData) {
  return await prisma.resume.update({
    where: { id },
    data,
  });
}
