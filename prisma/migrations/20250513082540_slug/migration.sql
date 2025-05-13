/*
  Warnings:

  - A unique constraint covering the columns `[userId,slug]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `Resume` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Resume_slug_key";

-- AlterTable
ALTER TABLE "Resume" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Resume_userId_slug_key" ON "Resume"("userId", "slug");
