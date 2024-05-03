/*
  Warnings:

  - Added the required column `kakao_id` to the `map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kakao_id` to the `place` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `map` ADD COLUMN `kakao_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `place` ADD COLUMN `kakao_id` VARCHAR(191) NOT NULL;
