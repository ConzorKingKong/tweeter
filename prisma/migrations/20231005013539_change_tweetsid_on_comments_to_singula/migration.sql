/*
  Warnings:

  - You are about to drop the column `tweetsId` on the `Comments` table. All the data in the column will be lost.
  - Added the required column `tweetId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_tweetsId_fkey`;

-- AlterTable
ALTER TABLE `Comments` DROP COLUMN `tweetsId`,
    ADD COLUMN `tweetId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_tweetId_fkey` FOREIGN KEY (`tweetId`) REFERENCES `Tweets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
