/*
  Warnings:

  - You are about to drop the column `budget` on the `Estimate` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Estimate` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `Estimate` table. All the data in the column will be lost.
  - Added the required column `eventType` to the `Estimate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Estimate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Estimate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estimate" DROP COLUMN "budget",
DROP COLUMN "company",
DROP COLUMN "service",
ADD COLUMN     "eventType" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "people" INTEGER,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "message" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isRecommended" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "PushSubscription" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "endpoint" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,
    "userAgent" TEXT,
    "lastNotified" TIMESTAMP(3),

    CONSTRAINT "PushSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PushSubscription_endpoint_key" ON "PushSubscription"("endpoint");
