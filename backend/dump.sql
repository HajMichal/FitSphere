
CREATE TABLE IF NOT EXISTS `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`surname` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`password` text NOT NULL,
	`role` text DEFAULT 'gymmer' NOT NULL,
	`country` text,
	`city` text,
	`gym_name` text,
	`age` integer NOT NULL,
	`height` real,
	`weight` real,
	`created_at` text DEFAULT (unixepoch()) NOT NULL,
	`updated_at` text DEFAULT (unixepoch()) NOT NULL
);
INSERT INTO users VALUES('918e72cd-7599-40f5-801a-a138a40f701f','John','Doe','john.doe@example.com','123456789','hashedPassword123','gymmer','USA','New York','Powerhouse Gym',30,180.24999999999999999,75.500000000000000001,'1736458940976','1736458940976');
INSERT INTO users VALUES('f37e3287-151a-434e-bbf6-7c97815a0498','Jane','Smith','jane.smith@example.com','987654321','hashedPassword456','trainer','Canada','Toronto','Fit Club',28,165.75,61.999999999999999998,'1736458940976','1736458940976');
INSERT INTO users VALUES('0684cc49-ca6a-4735-8d81-56dba21df23f','Alice','Johnson','alice.johnson@example.com','112233445','hashedPassword789','gymmer','Australia','Sydney','Iron Paradise',25,170.09999999999999431,68.299999999999997158,'1736458940976','1736458940976');


CREATE TABLE IF NOT EXISTS `trainings` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`weekly_frequency` integer NOT NULL,
	`period` integer NOT NULL,
	`created_at` text DEFAULT (unixepoch()) NOT NULL,
	`updated_at` text DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
INSERT INTO trainings VALUES('97b8a00e-0907-43f5-a586-cc893ca23e62','My Personal training','Lose 10kg',3,6,'1736458989736','1736458989736','918e72cd-7599-40f5-801a-a138a40f701f');

CREATE TABLE IF NOT EXISTS `trainingDay` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` text DEFAULT (unixepoch()) NOT NULL,
	`updated_at` text DEFAULT (unixepoch()) NOT NULL,
	`training_number` integer DEFAULT 0 NOT NULL,
	`training_id` text NOT NULL,
	FOREIGN KEY (`training_id`) REFERENCES `trainings`(`id`) ON UPDATE no action ON DELETE no action
);

INSERT INTO trainingDay VALUES('0b8fbec8-4348-4096-a1dc-6d4e9e7ecd97','PUSH',NULL,'1736458989736','1736458989736',0,'97b8a00e-0907-43f5-a586-cc893ca23e62');
INSERT INTO trainingDay VALUES('80b4dd83-2a47-4224-bc7e-78d96223cc4c','PULL',NULL,'1736458989736','1736458989736',0,'97b8a00e-0907-43f5-a586-cc893ca23e62');
INSERT INTO trainingDay VALUES('25f09b9c-c733-4df8-8b38-ce41980bb575','LEGS',NULL,'1736458989736','1736458989736',0,'97b8a00e-0907-43f5-a586-cc893ca23e62');


CREATE TABLE IF NOT EXISTS `exercises` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`series` integer NOT NULL,
	`reps` text NOT NULL,
	`kilograms` real,
	`rpe` real,
	`created_at` text DEFAULT (unixepoch()) NOT NULL,
	`updated_at` text DEFAULT (unixepoch()) NOT NULL,
	`training_id` text NOT NULL,
	FOREIGN KEY (`training_id`) REFERENCES `trainingDay`(`id`) ON UPDATE no action ON DELETE no action
);
INSERT INTO exercises VALUES('bffdf869-87fb-4b7d-8555-b9f9313a21c5','Bench press',NULL,3,'["2x6","1x10"]',60.0,NULL,'1736458989736','1736458989736','0b8fbec8-4348-4096-a1dc-6d4e9e7ecd97');
INSERT INTO exercises VALUES('559cd283-19aa-46bb-9479-1fb5e059fc00','Over Head Press (OHP)',NULL,3,'["3x10"]',30.0,NULL,'1736458989736','1736458989736','0b8fbec8-4348-4096-a1dc-6d4e9e7ecd97');
INSERT INTO exercises VALUES('0df46fb2-3349-4112-a1f2-9921149b75df','Incline DB',NULL,3,'["3x10"]',30.0,NULL,'1736458989736','1736458989736','0b8fbec8-4348-4096-a1dc-6d4e9e7ecd97');
INSERT INTO exercises VALUES('875ca772-9ff6-42a3-9d80-f1cd73393795','Tricpes',NULL,3,'["4xMAX"]',30.0,NULL,'1736458989736','1736458989736','0b8fbec8-4348-4096-a1dc-6d4e9e7ecd97');
CREATE TABLE IF NOT EXISTS `friendships` (
	`user_id` text NOT NULL,
	`friend_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`friend_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
INSERT INTO friendships VALUES('f37e3287-151a-434e-bbf6-7c97815a0498','0684cc49-ca6a-4735-8d81-56dba21df23f');
CREATE TABLE IF NOT EXISTS `pendingUsers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`surname` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`password` text NOT NULL,
	`country` text,
	`city` text,
	`gym_name` text,
	`age` integer NOT NULL
);
CREATE TABLE IF NOT EXISTS `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`token` text NOT NULL,
	`expiresAt` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
INSERT INTO sessions VALUES('61e277ea-0262-4f9f-a2b3-8af4e588dc06','Alice','','1767994989736','0684cc49-ca6a-4735-8d81-56dba21df23f');

CREATE TABLE IF NOT EXISTS `twoFactorAuth` (
	`email` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`expiresAt` text NOT NULL
);

CREATE TABLE d1_migrations(
		id         INTEGER PRIMARY KEY AUTOINCREMENT,
		name       TEXT UNIQUE,
		applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
DELETE FROM sqlite_sequence;
CREATE UNIQUE INDEX IF NOT EXISTS `pendingUsers_email_unique` ON `pendingUsers` (`email`);
CREATE UNIQUE INDEX IF NOT EXISTS `pendingUsers_phone_unique` ON `pendingUsers` (`phone`);
CREATE UNIQUE INDEX IF NOT EXISTS `users_email_unique` ON `users` (`email`);
CREATE UNIQUE INDEX IF NOT EXISTS `users_phone_unique` ON `users` (`phone`);
