import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { nanoid } from "nanoid";
import type { Adapter, AdapterUser } from "@auth/core/adapters";
import { PrismaClientKnownRequestError } from "./generated/prisma/client/runtime/library";

export const { handlers, auth } = NextAuth({
  adapter: AppPrismaAdapter(),
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    redirect: async () => {
      return "/me/resumes";
    },
  },
});

function AppPrismaAdapter(): Adapter {
  const adapter = PrismaAdapter(prisma);
  return {
    ...adapter,
    async createUser(user) {
      const MAX_RETRIES = 5;
      let lastError: unknown;

      for (let i = 0; i < MAX_RETRIES; i++) {
        const slug = generateSlugFromEmail(user.email ?? "user@example.com");

        try {
          const created = await prisma.user.create({
            data: {
              slug,
              name: user.name ?? "",
              email: user.email,
              emailVerified: user.emailVerified,
              image: user.image,
            },
          });

          return {
            id: created.id,
            email: created.email!,
            emailVerified: created.emailVerified,
          } satisfies AdapterUser;
        } catch (e: unknown) {
          if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
            const target = e.meta?.target;
            if (Array.isArray(target) && target.includes("slug")) {
              lastError = e;
              continue;
            }
          }
          throw e;
        }
      }
      throw new Error(`Failed to create user after ${MAX_RETRIES} retries: ${lastError}`);
    },
  };
}

export function generateSlugFromEmail(email: string) {
  const localPart = email.split("@")[0] || "user";
  const base = slugify(localPart, { lower: true, strict: true });
  return `${base}-${nanoid(8)}`;
}
