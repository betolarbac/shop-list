-- CreateTable
CREATE TABLE "Expiration" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Expiration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expiration" ADD CONSTRAINT "Expiration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
