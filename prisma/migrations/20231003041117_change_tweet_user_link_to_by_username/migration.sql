/*
  Warnings:

  - You are about to drop the column `userId` on the `Tweets` table. All the data in the column will be lost.
  - Added the required column `creatorUsername` to the `Tweets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Tweets` DROP FOREIGN KEY `Tweets_userId_fkey`;

-- AlterTable
ALTER TABLE `Tweets` DROP COLUMN `userId`,
    ADD COLUMN `creatorUsername` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Tweets` ADD CONSTRAINT `Tweets_creatorUsername_fkey` FOREIGN KEY (`creatorUsername`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
