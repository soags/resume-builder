/*
  Warnings:

  - You are about to drop the column `description` on the `Promotion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "description",
ADD COLUMN     "body" TEXT NOT NULL DEFAULT '';
