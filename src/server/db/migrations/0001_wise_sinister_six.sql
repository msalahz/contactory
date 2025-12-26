CREATE TABLE "contact" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text,
	"display_name" text,
	"nickname" text,
	"primary_email" text,
	"primary_phone" text,
	"company" text,
	"job_title" text,
	"department" text,
	"address" jsonb,
	"notes" text,
	"website" text,
	"is_favorite" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contact" ADD CONSTRAINT "contact_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "contact_userId_idx" ON "contact" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "contact_firstName_idx" ON "contact" USING btree ("first_name");--> statement-breakpoint
CREATE INDEX "contact_lastName_idx" ON "contact" USING btree ("last_name");--> statement-breakpoint
CREATE INDEX "contact_primaryEmail_idx" ON "contact" USING btree ("primary_email");--> statement-breakpoint
CREATE INDEX "contact_isFavorite_idx" ON "contact" USING btree ("is_favorite","user_id");