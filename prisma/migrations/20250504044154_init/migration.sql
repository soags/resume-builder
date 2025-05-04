/*
  Warnings:

  - You are about to drop the column `title` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the `ResumeBasics` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `label` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResumeBasics" DROP CONSTRAINT "ResumeBasics_resumeId_fkey";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "title",
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "ResumeBasics";
