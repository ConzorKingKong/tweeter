-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_tweetId_fkey`;

-- AlterTable
ALTER TABLE `Comments` ADD COLUMN `parentCommentId` VARCHAR(191) NULL,
    MODIFY `tweetId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_tweetId_fkey` FOREIGN KEY (`tweetId`) REFERENCES `Tweets`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_parentCommentId_fkey` FOREIGN KEY (`parentCommentId`) REFERENCES `Comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
