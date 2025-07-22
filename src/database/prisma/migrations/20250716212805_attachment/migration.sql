-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photoThumbnailId" TEXT;

-- CreateTable
CREATE TABLE "Attachments" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attachments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_photoThumbnailId_fkey" FOREIGN KEY ("photoThumbnailId") REFERENCES "Attachments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
