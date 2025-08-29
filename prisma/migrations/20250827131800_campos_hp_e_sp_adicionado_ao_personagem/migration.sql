/*
  Warnings:

  - Added the required column `slug` to the `Attack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Attack" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Character" ADD COLUMN     "current_hp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "current_sp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "max_hp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "max_sp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "slug" TEXT NOT NULL;
