-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MenuCategory" ADD VALUE 'BUNSIK';
ALTER TYPE "MenuCategory" ADD VALUE 'HOTDOGS_BURGERS';
ALTER TYPE "MenuCategory" ADD VALUE 'DESSERTS';

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "allergens" SET DEFAULT ARRAY[]::TEXT[];
