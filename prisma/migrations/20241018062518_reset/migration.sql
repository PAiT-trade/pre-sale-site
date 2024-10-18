/*
  Warnings:

  - You are about to drop the column `uploud_id` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the `UploadFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_uploud_id_fkey";

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "uploud_id";

-- DropTable
DROP TABLE "UploadFile";
