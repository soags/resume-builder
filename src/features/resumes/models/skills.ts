"use server";

import prisma from "@/lib/prisma";

export async function getSkillsByResume(resumeId: string) {
  return await prisma.skill.findMany({
    where: { resumeId },
    orderBy: { orderNo: "asc" },
  });
}
