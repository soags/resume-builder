import prisma from "@/lib/prisma";
import { withServerLogging } from "@/lib/withServerLogging";

export const getResumes = (userId: string) =>
  withServerLogging(
    async () =>
      await prisma.resume.findMany({
        where: { userId },
        orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      }),
    "getResumes",
  );
