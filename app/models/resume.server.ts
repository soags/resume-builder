import prisma from '~/lib/prisma.server'

export async function getResumeByUserId(userId: string) {
  return prisma.resume.findFirst({ where: { userId } })
}

export async function upsertResume(
  userId: string,
  name: string,
  label: string
) {
  const existing = await getResumeByUserId(userId)
  if (existing) {
    return prisma.resume.update({
      where: { id: existing.id },
      data: { name, label },
    })
  }
  return prisma.resume.create({
    data: { userId, name, label },
  })
}
