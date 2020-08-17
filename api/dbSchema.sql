-- We do this to synchronise Node time to database time, there might be a better way
SET @@global.time_zone = '+03:00';

DROP DATABASE IF EXISTS matcha;

CREATE DATABASE IF NOT EXISTS matcha;

USE matcha;

CREATE TABLE IF NOT EXISTS users (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(24) UNIQUE NOT NULL,
	`password` CHAR(64),
	email VARCHAR(99) UNIQUE NOT NULL,
	first_name VARCHAR(32) NOT NULL,
	last_name VARCHAR(32) NOT NULL,
	age INT DEFAULT NULL,
	fame INT DEFAULT 0,
	gender VARCHAR(1) DEFAULT '0',
	target_genders VARCHAR(2) DEFAULT 'fm',
	biography TEXT,
	email_confirmation_string VARCHAR(64),
	forgot_password_string VARCHAR(64) DEFAULT NULL,
	longitude FLOAT DEFAULT NULL,
	latitude FLOAT DEFAULT NULL,
	last_login DATETIME DEFAULT NULL,
	main_pic INT UNSIGNED DEFAULT NULL,
	`online` INT DEFAULT 0,
	login_id TEXT DEFAULT (UUID())
);

CREATE TABLE IF NOT EXISTS user_photos (
	`id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`user` INT UNSIGNED,
	`extension` VARCHAR(16),
	FOREIGN KEY (`user`) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS tags (
	string VARCHAR(32) NOT NULL,
	user INT UNSIGNED,
	PRIMARY KEY (string, user),
	FOREIGN KEY (user) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS likes (
	liker INT UNSIGNED NOT NULL,
	likee INT UNSIGNED NOT NULL,
	is_match BOOLEAN DEFAULT FALSE,
	PRIMARY KEY (liker, likee),
	FOREIGN KEY (liker) REFERENCES users(id),
	FOREIGN KEY (likee) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS visits (
	visitor INT UNSIGNED NOT NULL,
	visitee INT UNSIGNED NOT NULL,
	`time` DATETIME NOT NULL,
	PRIMARY KEY (visitor, visitee),
	FOREIGN KEY (visitor) REFERENCES users(id),
	FOREIGN KEY (visitee) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS messages (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	sender INT UNSIGNED NOT NULL,
	recipient INT UNSIGNED NOT NULL,
	content VARCHAR(512) NOT NULL,
	FOREIGN KEY (sender) REFERENCES users(id),
	FOREIGN KEY (recipient) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS blocks (
	blocker INT UNSIGNED NOT NULL,
	blockee INT UNSIGNED NOT NULL,
	`time` DATETIME NOT NULL,
	PRIMARY KEY (blocker, blockee),
	FOREIGN KEY (blocker) REFERENCES users(id),
	FOREIGN KEY (blockee) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS reports (
	reporter INT UNSIGNED NOT NULL,
	reportee INT UNSIGNED NOT NULL,
	`time` DATETIME NOT NULL,
	PRIMARY KEY (reporter, reportee),
	FOREIGN KEY (reporter) REFERENCES users(id),
	FOREIGN KEY (reportee) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS notifications (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user INT UNSIGNED NOT NULL,
	reason ENUM('like', 'unlike', 'visit') NOT NULL,
	causer INT UNSIGNED NOT NULL,
	`read` BOOLEAN DEFAULT FALSE,
	`time` DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user) REFERENCES users(id),
	FOREIGN KEY (causer) REFERENCES users(id)
);

CREATE TRIGGER notify_on_like AFTER INSERT ON likes FOR EACH ROW
INSERT INTO notifications (user, reason, causer, `time`) VALUES (new.likee, 'like', new.liker, CURRENT_TIMESTAMP - INTERVAL 3 HOUR);

CREATE TRIGGER notify_on_unlike AFTER DELETE ON likes FOR EACH ROW
INSERT INTO notifications (user, reason, causer, `time`) VALUES (old.likee, 'unlike', old.liker, CURRENT_TIMESTAMP - INTERVAL 3 HOUR);

CREATE TRIGGER notify_on_visit AFTER INSERT ON visits FOR EACH ROW
INSERT INTO notifications (user, reason, causer, `time`) VALUES (new.visitee, 'visit', new.visitor, CURRENT_TIMESTAMP - INTERVAL 3 HOUR);

-- CREATE TABLE IF NOT EXISTS chats (
-- 	id INT UNSIGNED AUTO_INCREMENT,
-- 	chatter1 INT UNSIGNED NOT NULL,
-- 	chatter2 INT UNSIGNED NOT NULL,
-- 	PRIMARY KEY (chatter1, chatter2),
-- 	FOREIGN KEY (chatter1) REFERENCES users(id),
-- 	FOREIGN KEY (chatter2) REFERENCES users(id)
-- );

-- CREATE TABLE IF NOT EXISTS messages (
-- 	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
-- 	chat INT UNSIGNED,
-- 	chatter INT UNSIGNED NOT NULL,
-- 	message VARCHAR(512) NOT NULL,
-- 	FOREIGN KEY (chat) REFERENCES chats(id),
-- 	FOREIGN KEY (chatter) REFERENCES users(id)
-- );

-- Passwords are '123'


INSERT INTO users (username, `password`, email, first_name, last_name, gender, age, latitude, longitude) VALUES
	('admin1', 'ad9b191cd8d24d4e57710893f9922c11c6aeb8143ec99baf4332f191c6bfba9c', 'admin1@example.com', 'Admin', 'One', 'm', 21, 60, 34),
	('admin2', 'b0b46aaf9bab6524f15c40e3c82febe1bbad1f5cb87def29023f3303edd709f1', 'admin2@example.com', 'Admin', 'Two', 'f', 23, 65, 35),
	('test', '09d40999b9d76c0de6b1bb578be88f82fe345cb1aa384dffcdecd365bcd0c1e2', 'test@example.com', 'test', 'asd', 'f', NULL, 55, 24),
	('test2', 'cfeb5fa5031894f731dc34c689dea99358e8809dbedbab027a92c3a509712193', 'test2@example.com', 'test1', 'bsddd', 'f', 25, -23, -170),
	('test3', 'fdab214d25d419336ad2ae505dac5443ec3b322df5a412d17c28f8a31294b0d5', 'test3@example.com', 'test3', 'csddd', 'm', 27, -30, 23),
	('test4', 'a0287221a39411046400d08d97a56aa47901168dcf5dc7e56047966e3a3a49f7', 'test4@example.com', 'test4', 'dsddd', 'm', 29, 70, -45),
	('test5', '588c4b81a8a1042addabeddc9e784fb052108452b5ce943d2c47a30212fc8ad3', 'test5@example.com', 'test5', 'esddd', 'f', 31, 64, 35),
	('test6', '01fc82a9449df43ee2c89a97ad22ed2b10226fb78011cfe5b99be2fedec043a0', 'test6@example.com', 'test6', 'fsddd', 'm', 33, 64, 38);


INSERT INTO likes (liker, likee, is_match) VALUES 
	(1, 2, 1),
	(2, 1, 0),
	(1, 3, 1),
	(3, 1, 1),
	(1, 4, 1),
	(4, 1, 1),
	(5, 1, 0),
	(3, 2, 0),
	(3, 4, 0),
	(6, 2, 0);

INSERT INTO visits (visitor, visitee, time) VALUES
(4, 1, CURRENT_TIMESTAMP),
(4, 2, CURRENT_TIMESTAMP),
(4, 3, CURRENT_TIMESTAMP),
(1, 2, CURRENT_TIMESTAMP),
(1, 3, CURRENT_TIMESTAMP),
(2, 3, CURRENT_TIMESTAMP),
(2, 5, CURRENT_TIMESTAMP),
(1, 6, CURRENT_TIMESTAMP),
(6, 1, CURRENT_TIMESTAMP),
(3, 1, CURRENT_TIMESTAMP);

INSERT INTO messages (sender, recipient, content) VALUES
(1, 2, "hello world"),
(2, 1, "ping"),
(1, 2, "pong"),
(1, 3, "asd"),
(1, 4, "123"),
(1, 5, "wow");

CREATE VIEW user_and_photos AS
SELECT * FROM users
LEFT OUTER JOIN (SELECT id AS photo_id, user, CONCAT(id, '.', extension) AS `filename` FROM user_photos) AS user_photos
ON user_photos.user = users.id;

CREATE VIEW user_and_main_photo AS
SELECT * FROM users
LEFT OUTER JOIN (SELECT id AS photo_id, user as p_user, CONCAT(id, '.', extension) AS `filename` FROM user_photos) AS user_photos
ON user_photos.p_user = users.id AND user_photos.photo_id = users.main_pic
LEFT OUTER JOIN (SELECT `user` AS tag_user, GROUP_CONCAT(string SEPARATOR ',') AS tags_string FROM tags GROUP BY tag_user) AS tags
ON tags.tag_user = users.id
LEFT OUTER JOIN (SELECT `user` AS photos_user, GROUP_CONCAT(id, '.', extension SEPARATOR ',') AS photos_string FROM user_photos GROUP BY `user`) AS photos
ON photos.photos_user = users.id;

CREATE VIEW chat_and_user AS
SELECT messages.id AS id, messages.content AS content, s.username AS sender_name, s.id AS sender_id, r.username AS recipient_name, r.id AS recipient_id FROM messages
JOIN users AS s ON s.id = messages.sender
JOIN users AS r ON r.id = messages.recipient;

-- DROP USER 'dbuser'@'%';
-- CREATE USER 'dbuser'@'%' IDENTIFIED WITH mysql_native_password BY '123dbuser';
-- GRANT ALL PRIVILEGES ON *.* TO 'dbuser'@'%';
