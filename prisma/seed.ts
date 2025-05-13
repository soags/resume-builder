/* eslint-disable @typescript-eslint/no-unused-vars */

import { generateSlugFromEmail } from "@/auth";
import { PrismaClient, User } from "@/generated/prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

async function main() {
  await prisma.account.deleteMany({
    where: { providerAccountId: "116982279492955464343" },
  });
  await prisma.user.deleteMany({
    where: { id: "cd207f5b-dae3-4182-979b-1bb225950916" },
  });

  const user = await prisma.user.create({
    data: {
      id: "cd207f5b-dae3-4182-979b-1bb225950916",
      slug: generateSlugFromEmail("s.iehuys@gmail.com"),
      name: "Shuhei Soga",
      email: "s.iehuys@gmail.com",
      image: "https://lh3.googleusercontent.com/a/ACg8ocKMebZb-aJ8_ylmhTAkjrHUhwC-ng7py7kcjG_Lw1fSklnv6w=s96-c",

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

  Array.from({ length: 50 }).forEach(async (_, i) => {
    await prisma.resume.create({
      data: {
        userId: user.id,
        slug: nanoid(16),
        title: "職務経歴書",
        name: "曽我 周平",
        label: "",
      },
    });
  });

  console.log("🌸 Seed completed.");
}

main()
  .catch((e) => {
    console.error("😢 Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
