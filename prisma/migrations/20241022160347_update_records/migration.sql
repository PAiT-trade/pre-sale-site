/*
  Warnings:

  - You are about to drop the column `signed_document_url` on the `purchases` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "signed_document_url";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "referral_earnings" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "telegram" TEXT DEFAULT '';
