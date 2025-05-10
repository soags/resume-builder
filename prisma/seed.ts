import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 既に同一IDのユーザーが存在していれば削除（開発用の前提）
  await prisma.account.deleteMany({
    where: { providerAccountId: "116982279492955464343" },
  });
  await prisma.user
    .delete({
      where: { id: "cd207f5b-dae3-4182-979b-1bb225950916" },
    })
    .catch(() => {});

  // User を作成
  const user = await prisma.user.create({
    data: {
      id: "cd207f5b-dae3-4182-979b-1bb225950916",
      name: "Shuhei Soga",
      email: "s.iehuys@gmail.com",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocKMebZb-aJ8_ylmhTAkjrHUhwC-ng7py7kcjG_Lw1fSklnv6w=s96-c",

      accounts: {
        create: {
          provider: "google",
          providerAccountId: "116982279492955464343",
          type: "oidc",
          access_token: "",
          expires_at: Math.floor(Date.now() / 1000) + 3600,
          token_type: "Bearer",
          scope:
            "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
          id_token: "",
        },
      },
    },
  });

  console.log("🌸 Seed completed. User:", user);

  // Resume の作成
  const resume = await prisma.resume.create({
    data: {
      userId: user.id,
      title: "職務経歴書",
      name: "曽我 周平",
      label: "技術と誠実を愛するエンジニア",
      github: "https://github.com/soags",
      qiita: "https://qiita.com/soags",
      zenn: "https://zenn.dev/soags",
      speakerDeck: "",
      slideShare: "",

      techCategory: {
        create: [
          {
            name: "フロントエンド",
            order: 1,
            stacks: {
              create: [
                { name: "React" },
                { name: "Next.js" },
                { name: "Tailwind CSS" },
              ],
            },
          },
          {
            name: "バックエンド",
            order: 2,
            stacks: {
              create: [
                { name: "ASP.NET Core" },
                { name: "Laravel" },
                { name: "Node.js" },
              ],
            },
          },
          {
            name: "インフラ・クラウド",
            order: 3,
            stacks: {
              create: [
                { name: "AWS Fargate" },
                { name: "Docker" },
                { name: "Windows Server" },
              ],
            },
          },
        ],
      },
    },
    include: {
      techCategory: {
        include: {
          stacks: true,
        },
      },
    },
  });

  console.log("📝 Resume created:", resume);
}

main()
  .catch((e) => {
    console.error("😢 Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
