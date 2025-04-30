ALTER TABLE "job_status" ALTER COLUMN "job_status_enum" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "job_status" ALTER COLUMN "job_status_enum" SET DEFAULT 'pending'::text;--> statement-breakpoint
DROP TYPE "public"."job_status_enum";--> statement-breakpoint
CREATE TYPE "public"."job_status_enum" AS ENUM('pending', 'completed', 'failed');--> statement-breakpoint
ALTER TABLE "job_status" ALTER COLUMN "job_status_enum" SET DEFAULT 'pending'::"public"."job_status_enum";--> statement-breakpoint
ALTER TABLE "job_status" ALTER COLUMN "job_status_enum" SET DATA TYPE "public"."job_status_enum" USING "job_status_enum"::"public"."job_status_enum";