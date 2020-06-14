CREATE TABLE `Users_Types` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(50) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `status` INT(1) NOT NULL DEFAULT 0 COMMENT '1 = active, 0 = inactive',
    `created_at` DATETIME NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `updated_by` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `Permissions_Types` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `user_type_id` INT NOT NULL,
    `endpoint` VARCHAR(200) NOT NULL,
    `method` VARCHAR(10) NOT NULL,
    `status` INT(1) NOT NULL DEFAULT 0 COMMENT '1 = active, 0 = inactive',
    `created_at` DATETIME NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `updated_by` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_type_id`) REFERENCES `Users_Types` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `Users` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `user_type_id` INT NOT NULL,
    `full_name` VARCHAR(150) NOT NULL,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `email` VARCHAR(150) NOT NULL,
    `password` TEXT NOT NULL,
    `status` INT(1) NOT NULL DEFAULT 0 COMMENT '1 = active, 0 = inactive',
    `created_at` DATETIME NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `updated_by` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_type_id`) REFERENCES `Users_Types` (`id`)
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
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    `author` VARCHAR(150) NOT NULL,
    `publication_date` DATE NOT NULL,
    `number_of_pages` INT NOT NULL,
    `status` INT(1) NOT NULL DEFAULT 0 COMMENT '1 = active, 0 = inactive',
    `created_at` DATETIME NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `updated_by` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `Categories_Books` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `book_id` INT NOT NULL,
    `category_id` INT NOT NULL,
    `status` INT(1) NOT NULL DEFAULT 0 COMMENT '1 = active, 0 = inactive',
    `created_at` DATETIME NOT NULL,
    `created_by` VARCHAR(50) NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `updated_by` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`book_id`) REFERENCES `Books` (`id`),
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

