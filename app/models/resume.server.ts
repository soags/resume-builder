import prisma from '~/lib/prisma.server'
import type { ResumeBasicsInput } from '~/validators/basics'

export async function getResumesByUserId(userId: string) {
  return await prisma.resume.findMany({
    where: { userId },
    orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
  })
}

export async function getResume(resumeId: string) {
  return await prisma.resume.findUnique({ where: { id: resumeId } })
}

export async function updateResumeBasics(
  resumeId: string,
  inputs: ResumeBasicsInput
) {
  return await prisma.resume.update({
    where: { id: resumeId },
    data: {
      title: inputs.title,
      name: inputs.name,
      label: inputs.label,
      github: inputs.github,
      qiita: inputs.qiita,
      zenn: inputs.zenn,
      speakerDeck: inputs.speakerDeck,
      slideShare: inputs.slideShare,
    },
  })
}
