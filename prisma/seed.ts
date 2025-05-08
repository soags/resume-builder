import { Prisma, PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput = {
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
};

export async function main() {
  const user = await prisma.user.create({ data: userData });

  const resume = await prisma.resume.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
  if (!resume) {
    return;
  }

  await prisma.skill.createMany({
    data: [
      {
        text: "JavaScript",
        resumeId: resume.id,
      },
      {
        text: "TypeScript",
        resumeId: resume.id,
      },
      {
        text: "React",
        resumeId: resume.id,
      },
      {
        text: "Next.js",
        resumeId: resume.id,
      },
    ],
  });
}

main();
