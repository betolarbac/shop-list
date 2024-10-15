/*
  Warnings:

  - Added the required column `amount` to the `Expiration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expiration" ADD COLUMN     "amount" INTEGER NOT NULL;
