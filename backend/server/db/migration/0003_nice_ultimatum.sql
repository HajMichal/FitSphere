CREATE TABLE "twoFactorAuth" (
	"email" varchar(255) PRIMARY KEY NOT NULL,
	"code" varchar(6) NOT NULL,
	"expiresAt" date NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sessions" RENAME COLUMN "expiration_in" TO "expiresAt";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "isEmailVerified" boolean DEFAULT false NOT NULL;