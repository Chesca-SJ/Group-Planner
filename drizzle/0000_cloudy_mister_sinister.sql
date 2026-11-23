CREATE TABLE `circles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`owner` text NOT NULL,
	`invite` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `members` (
	`id` text PRIMARY KEY NOT NULL,
	`circle` text NOT NULL,
	`user` text NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `records` (
	`id` text PRIMARY KEY NOT NULL,
	`circle` text NOT NULL,
	`kind` text NOT NULL,
	`data` text NOT NULL,
	`author` text NOT NULL
);
