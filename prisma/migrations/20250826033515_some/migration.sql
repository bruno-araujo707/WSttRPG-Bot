/*
  Warnings:

  - You are about to drop the column `author_uuid` on the `Attack` table. All the data in the column will be lost.
  - You are about to drop the column `coin_damage` on the `Attack` table. All the data in the column will be lost.
  - You are about to drop the column `coin_power` on the `Attack` table. All the data in the column will be lost.
  - You are about to drop the column `discord_user_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `coinDamage` to the `Attack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coinPower` to the `Attack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discordUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Attack" DROP COLUMN "author_uuid",
DROP COLUMN "coin_damage",
DROP COLUMN "coin_power",
ADD COLUMN     "coinDamage" INTEGER NOT NULL,
ADD COLUMN     "coinPower" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "discord_user_id",
ADD COLUMN     "discordUserId" TEXT NOT NULL;
