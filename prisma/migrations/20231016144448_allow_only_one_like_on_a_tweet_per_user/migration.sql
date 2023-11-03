/*
  Warnings:

  - A unique constraint covering the columns `[likerId,tweetId]` on the table `Likes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Status` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `creatorId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `parentCommentId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Likes_likerId_tweetId_key` ON `Likes`(`likerId`, `tweetId`);

-- AddForeignKey
ALTER TABLE `Status` ADD CONSTRAINT `Status_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Status` ADD CONSTRAINT `Status_parentCommentId_fkey` FOREIGN KEY (`parentCommentId`) REFERENCES `Status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
