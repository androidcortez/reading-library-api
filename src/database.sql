CREATE TABLE `Users` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(150) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `password` TEXT NOT NULL,
    `type` INT(1) NOT NULL DEFAULT 2 COMMENT '1 = admin, 2 = guest',
    `status` INT(1) NOT NULL DEFAULT 0 COMMENT '1 = active, 0 = inactive',
    `created_at` DATETIME NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `updated_by` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `Categories` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `status` INT(1) NOT NULL DEFAULT 0 COMMENT '1 = active, 0 = inactive',
    `created_at` DATETIME NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `updated_by` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `Books` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `category_id` INT NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    `author` VARCHAR(150) NOT NULL,
    'publication_date' DATE NOT NULL,
    `number_of_pages` INT NOT NULL,
    `status` INT(1) NOT NULL DEFAULT 0 COMMENT '1 = active, 0 = inactive',
    `created_at` DATETIME NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `updated_by` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `Users_Books` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `book_id` INT NOT NULL,
    `current_page` INT NOT NULL,
    `status` INT(1) NOT NULL DEFAULT 0 COMMENT '1 = active, 0 = inactive',
    `created_at` DATETIME NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `updated_by` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
    FOREIGN KEY (`book_id`) REFERENCES `Books` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `Users_Feedback` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `book_id` INT NOT NULL,
    `comment` TEXT NOT NULL,
    `score` FLOAT NOT NULL,
    `status` INT(1) NOT NULL DEFAULT 0 COMMENT '1 = active, 0 = inactive',
    `created_at` DATETIME NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `updated_by` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
    FOREIGN KEY (`book_id`) REFERENCES `Books` (`id`)
) ENGINE=InnoDB;

