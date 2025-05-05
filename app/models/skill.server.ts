import prisma from '~/lib/prisma.server'
import type { Skill } from '~/generated/prisma'

export async function getSkills(resumeId: string): Promise<Skill[]> {
  return await prisma.skill.findMany({
    where: { resumeId },
    orderBy: { orderNo: 'asc' },
  })
}

export async function updateSkills(
  resumeId: string,
  skills: Pick<Skill, 'text' | 'orderNo'>[]
) {
  await prisma.skill.deleteMany({ where: { resumeId } })

  await Promise.all(
    skills.map((skill) =>
      prisma.skill.create({
        data: {
          resumeId,
          text: skill.text,
          orderNo: skill.orderNo,
        },
      })
    )
  )
}
