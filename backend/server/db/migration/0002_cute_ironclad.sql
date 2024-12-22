ALTER TABLE "exercises" ALTER COLUMN "series" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "trainingDay" ADD COLUMN "training_number" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "exercises" DROP COLUMN IF EXISTS "training_number";