/*
  Warnings:

  - You are about to drop the `TechSkill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TechSkill" DROP CONSTRAINT "TechSkill_categoryId_fkey";

-- DropTable
DROP TABLE "TechSkill";

-- CreateTable
CREATE TABLE "TechStack" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechStack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TechStack" ADD CONSTRAINT "TechStack_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TechCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
