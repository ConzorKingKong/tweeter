/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Tweets` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Tweets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Tweets` DROP FOREIGN KEY `Tweets_creatorId_fkey`;

-- AlterTable
ALTER TABLE `Tweets` DROP COLUMN `creatorId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Tweets` ADD CONSTRAINT `Tweets_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
