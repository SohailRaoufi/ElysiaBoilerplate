-- CreateEnum
CREATE TYPE "UserSecurityActionType" AS ENUM ('OTP', 'FORGOT_PASSWORD');

-- CreateTable
CREATE TABLE "UserSecurityAction" (
    "id" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "type" "UserSecurityActionType" NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserSecurityAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserSecurityAction" ADD CONSTRAINT "UserSecurityAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
