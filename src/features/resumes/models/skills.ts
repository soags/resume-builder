"use server";

import { Skill } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export async function getSkillsByResume(resumeId: string): Promise<Skill[]> {
  return await prisma.skill.findMany({
    where: { resumeId },
    orderBy: { orderNo: "asc" },
  });
}
