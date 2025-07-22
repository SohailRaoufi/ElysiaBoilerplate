/*
  Warnings:

  - Made the column `expiresAt` on table `UserSecurityAction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserSecurityAction" ALTER COLUMN "expiresAt" SET NOT NULL;
