import { Prisma, PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    auths: {
      create: {
        provider: "google",
        providerId: "116982279492955464343",
      },
    },
    resumes: {
      createMany: {
        data: [
          {
            title: "職務経歴書1",
            name: "曽我 周平",
          },
          {
            title: "職務経歴書2",
            name: "曽我 周平",
          },
          {
            title: "職務経歴書3",
            name: "曽我 周平",
          },
        ],
      },
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
