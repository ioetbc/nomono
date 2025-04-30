import { text, serial, pgTable, boolean, integer, primaryKey, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Define the gallery table
export const gallery = pgTable("gallery", {
	id: serial("id").primaryKey(),
	created_at: timestamp("created_at").notNull().defaultNow(),
	name: text("name").notNull(),
	url: text("url").notNull(),
	description: text("description"),
	recommended: boolean("recommended").default(false),
});

// Define the exhibition table
export const exhibition = pgTable("exhibition", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	start_date: timestamp("start_date", { withTimezone: true }),
	end_date: timestamp("end_date", { withTimezone: true }),
	private_view_start_date: timestamp("private_view_start_date", {
		withTimezone: true,
	}),
	private_view_end_date: timestamp("private_view_end_date", {
		withTimezone: true,
	}),
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
	gallery_id: integer("gallery_id").references(() => gallery.id),
	url: text("url"),
	recommended: boolean("recommended").default(false),
});

// Define the artists table
export const artists = pgTable("artists", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	instagram_handle: text("instagram_handle"),
	created_at: timestamp("created_at").notNull().defaultNow(),
});

// Define the exhibition_artists join table for many-to-many relationship
export const exhibition_artists = pgTable(
	"exhibition_artists",
	{
		exhibition_id: integer("exhibition_id")
			.notNull()
			.references(() => exhibition.id, { onDelete: "cascade" }),
		artist_id: integer("artist_id")
			.notNull()
			.references(() => artists.id),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.exhibition_id, table.artist_id] }),
		};
	},
);

// Define the images table
export const images = pgTable("images", {
	id: serial("id").primaryKey(),
	exhibition_id: integer("exhibition_id")
		.notNull()
		.references(() => exhibition.id, { onDelete: "cascade" }),
	image_url: text("image_url").notNull(),
	caption: text("caption"),
	created_at: timestamp("created_at").notNull().defaultNow(),
});

// Define relations
export const exhibition_relations = relations(exhibition, ({ many }) => ({
	images: many(images),
	artists: many(exhibition_artists),
}));

export const artists_relations = relations(artists, ({ many }) => ({
	exhibitions: many(exhibition_artists),
}));

export const exhibition_artists_relations = relations(
	exhibition_artists,
	({ one }) => ({
		exhibition: one(exhibition, {
			fields: [exhibition_artists.exhibition_id],
			references: [exhibition.id],
		}),
		artist: one(artists, {
			fields: [exhibition_artists.artist_id],
			references: [artists.id],
		}),
	}),
);

export const images_relations = relations(images, ({ one }) => ({
	exhibition: one(exhibition, {
		fields: [images.exhibition_id],
		references: [exhibition.id],
	}),
}));

export const job_status_enum = pgEnum("job_status_enum", ["pending", "running", "completed", "failed"]);

export const job_status = pgTable("job_status", {
	id: serial("id").primaryKey(),
	status: job_status_enum("job_status_enum").notNull(),
	total: integer("total").notNull().default(0),
	failed: integer("failed").notNull().default(0),
	completed: integer("completed").notNull().default(0),
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
});


export type Gallery = typeof gallery.$inferSelect;
export type NewGallery = typeof gallery.$inferInsert;
export type Exhibition = typeof exhibition.$inferSelect;
export type NewExhibition = typeof exhibition.$inferInsert;
export type Artist = typeof artists.$inferSelect;
export type NewArtist = typeof artists.$inferInsert;
export type ExhibitionArtist = typeof exhibition_artists.$inferSelect;
export type NewExhibitionArtist = typeof exhibition_artists.$inferInsert;
export type Image = typeof images.$inferSelect;
export type NewImage = typeof images.$inferInsert;

export default {
  gallery,
  exhibition,
  artists,
  images,
	exhibition_artists,
	exhibition_relations,
	artists_relations,
	exhibition_artists_relations,
	images_relations,
};
