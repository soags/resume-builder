import { PrismaClient, Prisma } from '~/generated/prisma'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    auths: {
      create: {
        provider: 'google',
        providerId: '116982279492955464343',
      },
    },
    resumes: {
      createMany: {
        data: [
          {
            title: 'My Resume',
            name: '曽我 周平',
            label: 'エンジニア',
          },
          {
            title: 'My Resume',
            name: '曽我 周平',
            label: 'エンジニア',
          },
          {
            title: 'My Resume',
            name: '曽我 周平',
            label: 'エンジニア',
          },
        ],
      },
    },
  },
]

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u })
  }
}

main()
