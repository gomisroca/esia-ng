/*
  Warnings:

  - You are about to drop the column `fullImage` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Artwork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "fullImage",
DROP COLUMN "thumbnail",
ADD COLUMN     "image" TEXT;
