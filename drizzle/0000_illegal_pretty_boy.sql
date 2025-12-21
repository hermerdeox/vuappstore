CREATE TABLE `app_stats` (
	`id` text PRIMARY KEY NOT NULL,
	`total_licenses` integer DEFAULT 0 NOT NULL,
	`monthly_licenses` integer DEFAULT 0 NOT NULL,
	`yearly_licenses` integer DEFAULT 0 NOT NULL,
	`lifetime_licenses` integer DEFAULT 0 NOT NULL,
	`last_updated` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `audit_log` (
	`id` text PRIMARY KEY NOT NULL,
	`event` text NOT NULL,
	`app` text,
	`tier` text,
	`timestamp` integer NOT NULL,
	`metadata` text
);
--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`id` text PRIMARY KEY NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	`window_start` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `signature_counter` (
	`id` text PRIMARY KEY DEFAULT 'global' NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	`last_updated` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `support_tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`public_key` text NOT NULL,
	`subject` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'open' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ticket_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`ticket_id` text NOT NULL,
	`content` text NOT NULL,
	`is_staff` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL
);
