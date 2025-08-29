/*
  Warnings:

  - You are about to drop the column `total_coins` on the `Attack` table. All the data in the column will be lost.
  - You are about to drop the column `current_hp` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `current_sp` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `max_hp` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `max_sp` on the `Character` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Attack` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `totalCoins` to the `Attack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Attack" DROP COLUMN "total_coins",
ADD COLUMN     "totalCoins" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Character" DROP COLUMN "current_hp",
DROP COLUMN "current_sp",
DROP COLUMN "max_hp",
DROP COLUMN "max_sp",
ADD COLUMN     "currentHp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currentSp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxHp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxSp" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Attack_slug_key" ON "public"."Attack"("slug");
