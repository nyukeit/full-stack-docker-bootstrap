-- CREATE USER TABLE
CREATE TABLE IF NOT EXISTS `users` (
    `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `name` varchar(255) DEFAULT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `roles` varchar(255) DEFAULT 'user',
    `telephone` varchar(255) DEFAULT NULL,
    `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`uuid`),
    UNIQUE KEY `email` (`email`)
);


-- USE docker_user;
-- DROP TABLE users;
-- DELETE FROM users WHERE email = 'user@yahoo.com';
SELECT * FROM users;