/*
  Warnings:

  - You are about to drop the `Comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_creatorId_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_parentCommentId_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_tweetId_fkey`;

-- DropForeignKey
ALTER TABLE `Status` DROP FOREIGN KEY `Status_creatorId_fkey`;

-- DropForeignKey
ALTER TABLE `Status` DROP FOREIGN KEY `Status_parentCommentId_fkey`;

-- DropTable
DROP TABLE `Comments`;

-- DropTable
DROP TABLE `Status`;
