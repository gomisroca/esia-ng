-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sort_title" TEXT NOT NULL,
    "birth" INTEGER NOT NULL,
    "death" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtworkStyle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "banner" TEXT,

    CONSTRAINT "ArtworkStyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artwork" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "styleId" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "fullImage" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exhibition" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gallery" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Exhibition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "ArtworkStyle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
