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
	featured_artists: string[],
) => {
	const current_exhibition_artists = await db.query.exhibition_artists.findMany(
		{
			where: eq(exhibition_artists.exhibition_id, exhibition_id),
		},
	);

	await db
		.delete(exhibition_artists)
		.where(eq(exhibition_artists.exhibition_id, exhibition_id));

	await db.delete(artists).where(
		inArray(
			artists.id,
			current_exhibition_artists.map((artist) => artist.artist_id),
		),
	);

	for (const artist_name of featured_artists) {
		const trimmed_artist_name = artist_name.trim();
		if (!trimmed_artist_name) continue;

		const capitalized_artist_name =
			trimmed_artist_name.charAt(0).toUpperCase() +
			trimmed_artist_name.slice(1);

		const [new_artist] = await db
			.insert(artists)
			.values({ name: capitalized_artist_name })
			.returning();

		console.log("creating artist relation", new_artist);

		await db.insert(exhibition_artists).values({
			exhibition_id,
			artist_id: new_artist.id,
		});
	}
};
