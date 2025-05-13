import prisma from "@/lib/prisma";
import { withLogging } from "@/lib/withLogging";

export const getResumes = (userId: string) =>
  withLogging(
    async () =>
      await prisma.resume.findMany({
        where: { userId },
        orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      }),
    "getResumes",
  );
