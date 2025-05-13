import prisma from "@/lib/prisma";
import { withServerLogging } from "@/lib/withServerLogging";

export const getResumes = async (userId: string) =>
  await withServerLogging(
    async () =>
      await prisma.resume.findMany({
        where: { userId },
        orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      }),
    "getResumes",
  );
