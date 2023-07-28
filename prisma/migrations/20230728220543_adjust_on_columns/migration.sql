/*
  Warnings:

  - You are about to drop the column `createAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `dateBirth` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `motherName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `date_birth` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mother_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "createAt",
DROP COLUMN "dateBirth",
DROP COLUMN "motherName",
DROP COLUMN "updateAt",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "mother_name" TEXT NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL;
