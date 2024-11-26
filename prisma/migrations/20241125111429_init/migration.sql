-- CreateTable
CREATE TABLE "author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "startup" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "views" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "pitch" TEXT NOT NULL,
    "playlistId" INTEGER,

    CONSTRAINT "startup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlist" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaylistStartup" (
    "playlistId" INTEGER NOT NULL,
    "starupId" INTEGER NOT NULL,

    CONSTRAINT "PlaylistStartup_pkey" PRIMARY KEY ("playlistId","starupId")
);

-- CreateIndex
CREATE UNIQUE INDEX "author_email_key" ON "author"("email");

-- CreateIndex
CREATE UNIQUE INDEX "startup_slug_key" ON "startup"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "playlist_slug_key" ON "playlist"("slug");

-- AddForeignKey
ALTER TABLE "startup" ADD CONSTRAINT "startup_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistStartup" ADD CONSTRAINT "PlaylistStartup_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistStartup" ADD CONSTRAINT "PlaylistStartup_starupId_fkey" FOREIGN KEY ("starupId") REFERENCES "startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
