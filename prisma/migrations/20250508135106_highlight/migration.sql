/*
  Warnings:

  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_resumeId_fkey";

-- DropTable
DROP TABLE "Skill";

-- CreateTable
CREATE TABLE "Highlight" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "orderNo" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Highlight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Highlight" ADD CONSTRAINT "Highlight_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
