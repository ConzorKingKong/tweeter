-- DropForeignKey
ALTER TABLE `Likes` DROP FOREIGN KEY `Likes_likerId_fkey`;

-- DropForeignKey
ALTER TABLE `Likes` DROP FOREIGN KEY `Likes_tweetId_fkey`;

-- DropForeignKey
ALTER TABLE `Tweets` DROP FOREIGN KEY `Tweets_creatorId_fkey`;

-- DropForeignKey
ALTER TABLE `Tweets` DROP FOREIGN KEY `Tweets_parentTweetId_fkey`;

-- AddForeignKey
ALTER TABLE `Tweets` ADD CONSTRAINT `Tweets_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tweets` ADD CONSTRAINT `Tweets_parentTweetId_fkey` FOREIGN KEY (`parentTweetId`) REFERENCES `Tweets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_likerId_fkey` FOREIGN KEY (`likerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_tweetId_fkey` FOREIGN KEY (`tweetId`) REFERENCES `Tweets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
