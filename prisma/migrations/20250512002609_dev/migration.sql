/*
  Warnings:

  - You are about to drop the column `orderNo` on the `Highlight` table. All the data in the column will be lost.
  - You are about to drop the column `orderNo` on the `Promotion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Highlight" DROP COLUMN "orderNo",
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "orderNo",
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;
