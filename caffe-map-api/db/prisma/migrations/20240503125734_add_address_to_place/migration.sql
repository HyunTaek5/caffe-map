/*
  Warnings:

  - Added the required column `address` to the `place` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `place` ADD COLUMN `address` VARCHAR(191) NOT NULL;
