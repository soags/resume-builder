import prisma from "@/lib/prisma";

export async function getResumes(userId: string) {
  return await prisma.resume.findMany({
    where: { userId },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });
}
