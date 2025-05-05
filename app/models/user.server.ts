import prisma from '~/lib/prisma.server'

export async function getUserByGoogleId(googleId: string) {
  return prisma.user.findFirst({
    where: {
      auths: {
        some: {
          provider: 'google',
          providerId: googleId,
        },
      },
    },
  })
}

export async function createGoogleUser(googleId: string) {
  return prisma.user.create({
    data: {
      auths: {
        create: {
          provider: 'google',
          providerId: googleId,
        },
      },
    },
  })
}
