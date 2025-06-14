/*
  Warnings:

  - The values [SNACKS,MEALS,DRINKS,BUNSIK,HOTDOGS_BURGERS,DESSERTS] on the enum `MenuCategory` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `imageUrl` on the `Menu` table. All the data in the column will be lost.
  - Added the required column `nameEn` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `Menu` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `category` on the `Menu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MenuCategory_new" AS ENUM ('bunsik', 'meals', 'drinks', 'hotdogs_burgers', 'snacks', 'desserts');
ALTER TYPE "MenuCategory" RENAME TO "MenuCategory_old";
ALTER TYPE "MenuCategory_new" RENAME TO "MenuCategory";
DROP TYPE "MenuCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "imageUrl",
ADD COLUMN     "isNew" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPopular" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVegetarian" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nameEn" TEXT NOT NULL,
ADD COLUMN     "spicyLevel" INTEGER,
ALTER COLUMN "image" SET NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL;
