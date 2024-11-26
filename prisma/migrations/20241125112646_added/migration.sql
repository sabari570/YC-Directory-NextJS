/*
  Warnings:

  - Added the required column `updatedAt` to the `author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `startup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "author" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "playlist" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "startup" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
