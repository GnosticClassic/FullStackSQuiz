ALTER TABLE "questions" ADD COLUMN "answer_options" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "correct_answer" integer NOT NULL;