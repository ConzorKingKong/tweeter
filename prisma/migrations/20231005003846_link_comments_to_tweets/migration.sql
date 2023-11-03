/*
  Warnings:

  - Added the required column `tweetsId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comments` ADD COLUMN `tweetsId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_tweetsId_fkey` FOREIGN KEY (`tweetsId`) REFERENCES `Tweets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
