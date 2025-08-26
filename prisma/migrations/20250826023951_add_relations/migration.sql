/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "public"."Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "strength" INTEGER NOT NULL,
    "dexterity" INTEGER NOT NULL,
    "knowledge" INTEGER NOT NULL,
    "psyche" INTEGER NOT NULL,
    "face" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Attack" (
    "id" SERIAL NOT NULL,
    "author_uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "total_coins" INTEGER NOT NULL,
    "coin_power" INTEGER NOT NULL,
    "coin_damage" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "Attack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attack" ADD CONSTRAINT "Attack_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
