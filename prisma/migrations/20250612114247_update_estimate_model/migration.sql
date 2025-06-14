/*
  Warnings:

  - You are about to drop the column `budget` on the `Estimate` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Estimate` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Estimate` table. All the data in the column will be lost.
  - Added the required column `attendees` to the `Estimate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Estimate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Estimate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estimate" DROP COLUMN "budget",
DROP COLUMN "company",
DROP COLUMN "message",
ADD COLUMN     "attendees" INTEGER NOT NULL,
ADD COLUMN     "details" TEXT,
ADD COLUMN     "location" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
