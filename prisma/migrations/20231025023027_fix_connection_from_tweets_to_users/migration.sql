-- DropForeignKey
ALTER TABLE `Tweets` DROP FOREIGN KEY `Tweets_creatorId_fkey`;

-- AddForeignKey
ALTER TABLE `Tweets` ADD CONSTRAINT `Tweets_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
