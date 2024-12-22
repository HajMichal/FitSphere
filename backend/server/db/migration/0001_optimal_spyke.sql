CREATE TABLE IF NOT EXISTS "trainingDay" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL,
	"training_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_training_id_trainings_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trainingDay" ADD CONSTRAINT "trainingDay_training_id_trainings_id_fk" FOREIGN KEY ("training_id") REFERENCES "public"."trainings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercises" ADD CONSTRAINT "exercises_training_id_trainingDay_id_fk" FOREIGN KEY ("training_id") REFERENCES "public"."trainingDay"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
