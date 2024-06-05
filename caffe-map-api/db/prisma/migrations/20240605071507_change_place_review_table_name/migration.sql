/*
  Warnings:

  - You are about to drop the `PlaceReview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PlaceReview` DROP FOREIGN KEY `PlaceReview_place_id_fkey`;

-- DropTable
DROP TABLE `PlaceReview`;

-- CreateTable
CREATE TABLE `place_review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `type` ENUM('NAVER', 'KAKAO') NOT NULL DEFAULT 'KAKAO',
    `star` INTEGER NOT NULL,
    `place_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `place_review` ADD CONSTRAINT `place_review_place_id_fkey` FOREIGN KEY (`place_id`) REFERENCES `place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

