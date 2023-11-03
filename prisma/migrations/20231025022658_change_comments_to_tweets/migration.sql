/*
  Warnings:

  - You are about to drop the column `creatorUsername` on the `Tweets` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Tweets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Tweets` DROP FOREIGN KEY `Tweets_creatorUsername_fkey`;

-- AlterTable
ALTER TABLE `Tweets` DROP COLUMN `creatorUsername`,
    ADD COLUMN `creatorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `parentTweetId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Tweets` ADD CONSTRAINT `Tweets_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tweets` ADD CONSTRAINT `Tweets_parentTweetId_fkey` FOREIGN KEY (`parentTweetId`) REFERENCES `Tweets`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
