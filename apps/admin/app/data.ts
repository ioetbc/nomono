// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";

import {
	type Artist,
	type Exhibition,
	type Image,
	artists,
	create_db,
	exhibition,
	exhibition_artists,
	images,
} from "@monorepo-template/db";
import { eq, ilike } from "drizzle-orm";

export type ExhibitionRecord = Exhibition & {
	images?: Image[];
	featured_artists?: Artist[];
};

const db = create_db();

export async function getExhibitions(query?: string | null) {
	let exhibitionList: Exhibition[] = [];

	if (query) {
		exhibitionList = await db
			.select()
			.from(exhibition)
			.where(ilike(exhibition.name, `%${query}%`));
	} else {
		exhibitionList = await db.select().from(exhibition);
	}

	return exhibitionList.sort(sortBy("name", "start_date"));
}

export async function getDrizzleExhibition(
	id: number,
): Promise<ExhibitionRecord | null> {
	// Use the query builder with relations support
	const result = await db.query.exhibition.findFirst({
		where: eq(exhibition.id, id),
		with: {
			images: true,
			artists: {
				with: {
					artist: true,
				},
			},
		},
	});

	if (!result) return null;

	return {
		id: result.id,
		name: result.name,
		description: result.description || null,
		start_date: result.start_date ? new Date(result.start_date) : null,
		end_date: result.end_date ? new Date(result.end_date) : null,
		private_view_start_date: result.private_view_start_date
			? new Date(result.private_view_start_date)
			: null,
		private_view_end_date: result.private_view_end_date
			? new Date(result.private_view_end_date)
			: null,
		created_at: new Date(result.created_at),
		updated_at: new Date(result.updated_at),
		gallery_id: result.gallery_id || null,
		url: result.url || null,
		recommended: result.recommended || false,
		images: result.images,
		featured_artists: result.artists.map(({ artist }) => artist),
	};
}

export async function createDrizzleEmptyExhibition() {
	const newExhibition = await db
		.insert(exhibition)
		.values({
			created_at: new Date(),
			name: "",
			description: "",
			url: "",
			gallery_id: null,
			recommended: false,
			start_date: null,
			end_date: null,
		})
		.returning();

	return {
		id: newExhibition[0].id,
	};
}

export async function updateDrizzleExhibition(
	id: number,
	updates: ExhibitionRecord,
) {
	const currentExhibition = await db
		.select()
		.from(exhibition)
		.where(eq(exhibition.id, id))
		.limit(1);

	if (!currentExhibition.length) {
		throw new Error(`Exhibition with id ${id} not found`);
	}

	const current = currentExhibition[0];

	const updated_exhibition = {
		...current,
		...updates,
	};

	await db
		.update(exhibition)
		.set(updated_exhibition)
		.where(eq(exhibition.id, id));

	// 4. Handle featured artists if provided
	if (updates.featured_artists !== undefined) {
		// Delete all existing relationships
		await db
			.delete(exhibition_artists)
			.where(eq(exhibition_artists.exhibition_id, id));

		// Only process if there are artists to add
		if (updates.featured_artists && updates.featured_artists.length > 0) {
			for (const artist of updates.featured_artists) {
				// Skip empty artist names
				if (!artist.name.trim()) continue;

				// Find or create artist
				const artistRecord = await db
					.select()
					.from(artists)
					.where(eq(artists.name, artist.name))
					.limit(1);

				// Use the found artist ID or create a new artist
				const artistId = artistRecord.length
					? artistRecord[0].id
					: (
							await db
								.insert(artists)
								.values({
									name: artist.name,
									created_at: new Date(),
								})
								.returning()
						)[0].id;

				// Create relationship
				await db
					.insert(exhibition_artists)
					.values({
						exhibition_id: id,
						artist_id: artistId,
					})
					.onConflictDoNothing();
			}
		}
	}

	// 5. Return the updated exhibition with all its relations
	return getDrizzleExhibition(id);
}

export async function deleteDrizzleExhibition(id: number) {
	// With cascade set up in the schema, this will automatically delete related records
	await db.delete(exhibition).where(eq(exhibition.id, id));
	return null;
}

// Image API functions
export type ImageRecord = {
	id: number;
	exhibition_id: number;
	image_url: string;
	caption?: string;
	created_at: string;
};

export type ArtistRecord = Artist;

export type ImageMutation = {
	exhibition_id: number;
	image_url: string;
	caption?: string;
};

export async function getImagesForExhibition(
	exhibitionId: number,
): Promise<ImageRecord[]> {
	const imageList = await db
		.select()
		.from(images)
		.where(eq(images.exhibition_id, exhibitionId));

	return imageList.map((image) => ({
		id: image.id,
		exhibition_id: image.exhibition_id,
		image_url: image.image_url,
		caption: image.caption || undefined,
		created_at: new Date(image.created_at).toISOString(),
	}));
}

export async function getAllArtists(): Promise<Artist[]> {
	const artistList = await db.select().from(artists);

	return artistList.sort((a, b) => a.name.localeCompare(b.name));
}

export async function createArtist(
	name: string,
	instagram_handle?: string,
): Promise<ArtistRecord> {
	const trimmedName = name.trim();
	if (!trimmedName) {
		throw new Error("Artist name cannot be empty");
	}

	const capitalizedName =
		trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1);

	const [newArtist] = await db
		.insert(artists)
		.values({
			name: capitalizedName,
			instagram_handle: instagram_handle || null,
			created_at: new Date(),
		})
		.returning();

	return {
		id: newArtist.id,
		name: newArtist.name,
		instagram_handle: newArtist.instagram_handle || null,
		created_at: new Date(newArtist.created_at),
	};
}

export async function createImage(data: ImageMutation): Promise<ImageRecord> {
	const newImage = await db
		.insert(images)
		.values({
			exhibition_id: data.exhibition_id,
			image_url: data.image_url,
			caption: data.caption || null,
			created_at: new Date(),
		})
		.returning();

	return {
		id: newImage[0].id,
		exhibition_id: newImage[0].exhibition_id,
		image_url: newImage[0].image_url,
		caption: newImage[0].caption || undefined,
		created_at: new Date(newImage[0].created_at).toISOString(),
	};
}

export async function updateImage(
	id: number,
	updates: Partial<ImageMutation>,
): Promise<ImageRecord | null> {
	const updateData: Record<string, string | number | null> = {};

	if (updates.image_url !== undefined) updateData.image_url = updates.image_url;
	if (updates.caption !== undefined)
		updateData.caption = updates.caption || null;

	await db.update(images).set(updateData).where(eq(images.id, id));

	const result = await db
		.select()
		.from(images)
		.where(eq(images.id, id))
		.limit(1);

	if (!result.length) return null;

	const image = result[0];
	return {
		id: image.id,
		exhibition_id: image.exhibition_id,
		image_url: image.image_url,
		caption: image.caption || undefined,
		created_at: new Date(image.created_at).toISOString(),
	};
}

export async function deleteImage(id: number): Promise<null> {
	await db.delete(images).where(eq(images.id, id));
	return null;
}

export const getExhibition = getDrizzleExhibition;
export const createEmptyExhibition = createDrizzleEmptyExhibition;
export const updateExhibition = updateDrizzleExhibition;
export const deleteExhibition = deleteDrizzleExhibition;
