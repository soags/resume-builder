import prisma from '~/lib/prisma.server'

export async function getSkills(resumeId: string) {
  return await prisma.skill.findMany({
    where: { resumeId },
    orderBy: { orderNo: 'asc' },
  })
}
