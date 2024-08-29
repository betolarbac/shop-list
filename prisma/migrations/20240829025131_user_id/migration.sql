/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Products_userId_key" ON "Products"("userId");
