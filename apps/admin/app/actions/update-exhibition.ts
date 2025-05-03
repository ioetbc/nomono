import {
	artists,
	db,
	exhibition,
	exhibition_artists,
} from "@monorepo-template/db";
import { eq, inArray } from "drizzle-orm";

export const update_exhibition_name = async (
	exhibition_id: number,
	exhibition_name: string,
) => {
	await db
		.update(exhibition)
		.set({ name: exhibition_name })
		.where(eq(exhibition.id, exhibition_id));
};

export const update_exhibition_url = async (
	exhibition_id: number,
	exhibition_url: string,
) => {
	await db
		.update(exhibition)
		.set({ url: exhibition_url })
		.where(eq(exhibition.id, exhibition_id));
};

export const update_start_date = async (
	exhibition_id: number,
	start_date: Date,
) => {
	await db
		.update(exhibition)
		.set({ start_date: start_date })
		.where(eq(exhibition.id, exhibition_id));
};

export const update_end_date = async (
	exhibition_id: number,
	end_date: Date,
) => {
	await db
		.update(exhibition)
		.set({ end_date: end_date })
		.where(eq(exhibition.id, exhibition_id));
};

export const update_private_view_start_date = async (
	exhibition_id: number,
	private_view_start_date: Date,
) => {
	await db
		.update(exhibition)
		.set({ private_view_start_date: private_view_start_date })
		.where(eq(exhibition.id, exhibition_id));
};

export const update_private_view_end_date = async (
	exhibition_id: number,
	private_view_end_date: Date,
) => {
	await db
		.update(exhibition)
		.set({ private_view_end_date: private_view_end_date })
		.where(eq(exhibition.id, exhibition_id));
};

export const update_recommended = async (
	exhibition_id: number,
	recommended: boolean,
) => {
	await db
		.update(exhibition)
		.set({ recommended })
		.where(eq(exhibition.id, exhibition_id));
};

export const update_description = async (
	exhibition_id: number,
	description: string,
) => {
	await db
		.update(exhibition)
		.set({ description: description })
		.where(eq(exhibition.id, exhibition_id));
};

export const update_featured_artists = async (
	exhibition_id: number,
	artist_ids: number[],
) => {
	// First, remove all artist associations for this exhibition
	await db
		.delete(exhibition_artists)
		.where(eq(exhibition_artists.exhibition_id, exhibition_id));

	// Then create new relationships for each selected artist ID
	for (const artist_id of artist_ids) {
		if (!artist_id) continue;
		
		await db.insert(exhibition_artists).values({
			exhibition_id,
			artist_id,
		}).onConflictDoNothing(); // Prevent duplicate entries
	}
};
