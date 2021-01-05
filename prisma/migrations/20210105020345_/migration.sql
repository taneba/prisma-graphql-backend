/*
  Warnings:

  - You are about to drop the column `userId` on the `language` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `language` DROP FOREIGN KEY `language_ibfk_1`;

-- DropForeignKey
ALTER TABLE `word` DROP FOREIGN KEY `word_ibfk_2`;

-- DropForeignKey
ALTER TABLE `word` DROP FOREIGN KEY `word_ibfk_1`;

-- AlterTable
ALTER TABLE `language` DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `_LanguageToUser` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_LanguageToUser_AB_unique`(`A`, `B`),
INDEX `_LanguageToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_LanguageToUser` ADD FOREIGN KEY (`A`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LanguageToUser` ADD FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Word` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Word` ADD FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
