-- DropForeignKey
ALTER TABLE `language` DROP FOREIGN KEY `language_ibfk_1`;

-- DropForeignKey
ALTER TABLE `word` DROP FOREIGN KEY `word_ibfk_2`;

-- DropForeignKey
ALTER TABLE `word` DROP FOREIGN KEY `word_ibfk_1`;

-- AddForeignKey
ALTER TABLE `Language` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Word` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Word` ADD FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
