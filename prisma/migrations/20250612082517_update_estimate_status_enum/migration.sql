/*
  Warnings:

  - You are about to drop the column `eventType` on the `Estimate` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Estimate` table. All the data in the column will be lost.
  - You are about to drop the column `people` on the `Estimate` table. All the data in the column will be lost.
  - The `status` column on the `Estimate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `image` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the `PushSubscription` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company` to the `Estimate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service` to the `Estimate` table without a default value. This is not possible if the table is not empty.
  - Made the column `message` on table `Estimate` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `price` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Menu` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `category` on the `Menu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EstimateStatus" AS ENUM ('PENDING', 'CONFIRMED', 'REPLIED', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Estimate" DROP COLUMN "eventType",
DROP COLUMN "location",
DROP COLUMN "people",
ADD COLUMN     "budget" TEXT,
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "service" TEXT NOT NULL,
ALTER COLUMN "message" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "EstimateStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "image",
DROP COLUMN "isAvailable",
ADD COLUMN     "allergens" TEXT[],
ADD COLUMN     "isNew" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPopular" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "price" INTEGER NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL;

-- DropTable
DROP TABLE "PushSubscription";

-- DropEnum
DROP TYPE "MenuCategory";
