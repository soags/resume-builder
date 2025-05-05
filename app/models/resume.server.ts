import prisma from '~/lib/prisma.server'

export async function getResumesByUserId(userId: string) {
  return prisma.resume.findMany({ where: { userId } })
}
