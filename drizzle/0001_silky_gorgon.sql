CREATE TABLE `history` (
	`id` text PRIMARY KEY NOT NULL,
	`circle` text NOT NULL,
	`actor` text NOT NULL,
	`action` text NOT NULL,
	`record` text NOT NULL,
	`kind` text NOT NULL,
	`title` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `preferences` (
	`id` text PRIMARY KEY NOT NULL,
	`circle` text NOT NULL,
	`user` text NOT NULL,
	`data` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `members` ADD `role` text DEFAULT 'member' NOT NULL;--> statement-breakpoint
ALTER TABLE `records` ADD `version` integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `records` ADD `deleted` text;