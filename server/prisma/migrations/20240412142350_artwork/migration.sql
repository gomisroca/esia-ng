/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Artwork" DROP CONSTRAINT "Artwork_styleId_fkey";

-- AlterTable
ALTER TABLE "Artwork" ALTER COLUMN "origin" DROP NOT NULL,
ALTER COLUMN "styleId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Artist_title_key" ON "Artist"("title");

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "ArtworkStyle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
