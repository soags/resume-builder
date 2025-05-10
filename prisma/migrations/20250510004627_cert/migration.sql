/*
  Warnings:

  - Made the column `year` on table `Cert` required. This step will fail if there are existing NULL values in that column.
  - Made the column `month` on table `Cert` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cert" ALTER COLUMN "year" SET NOT NULL,
ALTER COLUMN "month" SET NOT NULL;
