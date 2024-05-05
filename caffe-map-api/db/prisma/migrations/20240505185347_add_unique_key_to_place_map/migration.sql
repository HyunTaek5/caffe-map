/*
  Warnings:

  - A unique constraint covering the columns `[place_id,map_id]` on the table `place_map` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `place_map_place_id_map_id_key` ON `place_map`(`place_id`, `map_id`);
