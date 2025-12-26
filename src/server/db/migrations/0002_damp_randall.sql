ALTER TABLE "contact" ADD COLUMN "street" text;--> statement-breakpoint
ALTER TABLE "contact" ADD COLUMN "city" text;--> statement-breakpoint
ALTER TABLE "contact" ADD COLUMN "state" text;--> statement-breakpoint
ALTER TABLE "contact" ADD COLUMN "postal_code" text;--> statement-breakpoint
ALTER TABLE "contact" ADD COLUMN "country" text;--> statement-breakpoint
ALTER TABLE "contact" DROP COLUMN "address";