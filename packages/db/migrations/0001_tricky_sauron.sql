CREATE TABLE "artists" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"instagram_handle" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"avatar" text,
	"twitter" text,
	"notes" text,
	"favorite" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "exhibition" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"private_view_start_date" timestamp with time zone,
	"private_view_end_date" timestamp with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"gallery_id" integer,
	"url" text,
	"recommended" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "exhibition_artists" (
	"exhibition_id" integer NOT NULL,
	"artist_id" integer NOT NULL,
	CONSTRAINT "exhibition_artists_exhibition_id_artist_id_pk" PRIMARY KEY("exhibition_id","artist_id")
);
--> statement-breakpoint
CREATE TABLE "gallery" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"description" text,
	"recommended" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"exhibition_id" integer NOT NULL,
	"image_url" text NOT NULL,
	"caption" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "exhibition" ADD CONSTRAINT "exhibition_gallery_id_gallery_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibition_artists" ADD CONSTRAINT "exhibition_artists_exhibition_id_exhibition_id_fk" FOREIGN KEY ("exhibition_id") REFERENCES "public"."exhibition"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exhibition_artists" ADD CONSTRAINT "exhibition_artists_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_exhibition_id_exhibition_id_fk" FOREIGN KEY ("exhibition_id") REFERENCES "public"."exhibition"("id") ON DELETE cascade ON UPDATE no action;