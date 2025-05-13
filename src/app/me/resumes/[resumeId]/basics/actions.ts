"use server";

import prisma from "@/lib/prisma";
import { BasicsFormData } from "./schema";

export async function getResume(id: string) {
  return await prisma.resume.findUnique({ where: { id } });
}

export async function updateBasics(id: string, data: BasicsFormData) {
  return await prisma.resume.update({
    where: { id },
    data,
  });
}
