import prisma from '~/lib/prisma.server'
import type { SkillInput } from '~/validators/skills'

export async function getSkills(resumeId: string) {
  return await prisma.skill.findMany({
    where: { resumeId },
    orderBy: { orderNo: 'asc' },
  })
}

export async function updateSkills(resumeId: string, skills: SkillInput[]) {
  await prisma.skill.deleteMany({ where: { resumeId } })

  await Promise.all(
    skills.map((skill) =>
      prisma.skill.create({
        data: {
          resumeId,
          title: skill.title,
          orderNo: skill.orderNo,
        },
      })
    )
  )
}
