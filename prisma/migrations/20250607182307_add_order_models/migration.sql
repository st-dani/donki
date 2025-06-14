/*
  Warnings:

  - You are about to drop the column `allergens` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `isNew` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `isPopular` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `isRecommended` on the `Menu` table. All the data in the column will be lost.
  - The `category` column on the `Menu` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MenuCategory" AS ENUM ('MAIN', 'SIDE', 'DRINK', 'DESSERT');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PREPARING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "allergens",
DROP COLUMN "imageUrl",
DROP COLUMN "isNew",
DROP COLUMN "isPopular",
DROP COLUMN "isRecommended",
ADD COLUMN     "image" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "category",
ADD COLUMN     "category" "MenuCategory" NOT NULL DEFAULT 'MAIN';

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerRequest" TEXT,
    "tableNumber" INTEGER,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "menuId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
