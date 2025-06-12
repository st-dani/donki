/*
  Warnings:

  - You are about to drop the column `isNew` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `isPopular` on the `Menu` table. All the data in the column will be lost.
  - Changed the type of `category` on the `Menu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MenuCategory" AS ENUM ('SNACKS', 'MEALS', 'DRINKS');

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "isNew",
DROP COLUMN "isPopular",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "tags" TEXT[],
DROP COLUMN "category",
ADD COLUMN     "category" "MenuCategory" NOT NULL;
