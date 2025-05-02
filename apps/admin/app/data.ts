// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";

import {
	type Exhibition,
	artists,
	create_db,
	exhibition,
	exhibition_artists,
	images,
} from "@monorepo-template/db";
import { eq, ilike } from "drizzle-orm";

// Type definitions
type ExhibitionMutation = {
	id?: number;
	name?: string;
	description?: string;
	url?: string;
	gallery_id?: number;
	recommended?: boolean;
	start_date?: string;
	end_date?: string;
	private_view_start_date?: string
	private_view_end_date?: string;
	featured_artists?: string[];
};

export type ExhibitionRecord = ExhibitionMutation & {
	id: number;
	created_at: string;
	images?: ImageRecord[];
	featured_artists?: ArtistRecord[];
};

// Initialize the database
const db = create_db();

// Exhibition API functions
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

	// Transform the data to match the expected format
	const transformedExhibitions: ExhibitionRecord[] = exhibitionList.map(
		(exhibit) => {
			return {
				id: exhibit.id,
				name: exhibit.name,
				description: exhibit.description || undefined,
				start_date: exhibit.start_date
					? new Date(exhibit.start_date).toISOString()
					: undefined,
				end_date: exhibit.end_date
					? new Date(exhibit.end_date).toISOString()
					: undefined,
				private_view_start_date: exhibit.private_view_start_date
					? new Date(exhibit.private_view_start_date).toISOString()
					: undefined,
				private_view_end_date: exhibit.private_view_end_date
					? new Date(exhibit.private_view_end_date).toISOString()
					: undefined,
				created_at: new Date(exhibit.created_at).toISOString(),
				updated_at: new Date(exhibit.updated_at).toISOString(),
				gallery_id: exhibit.gallery_id || undefined,
				url: exhibit.url || undefined,
				recommended: exhibit.recommended || false,
			};
		},
	);

	return transformedExhibitions.sort(sortBy("name", "start_date"));
}

export async function getDrizzleExhibition(id: number) {
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
		description: result.description || undefined,
		start_date: result.start_date
			? new Date(result.start_date).toISOString()
			: undefined,
		end_date: result.end_date
			? new Date(result.end_date).toISOString()
			: undefined,
		private_view_start_date: result.private_view_start_date
			? new Date(result.private_view_start_date).toISOString()
			: undefined,
		private_view_end_date: result.private_view_end_date
			? new Date(result.private_view_end_date).toISOString()
			: undefined,
		created_at: new Date(result.created_at).toISOString(),
		updated_at: new Date(result.updated_at).toISOString(),
		gallery_id: result.gallery_id || undefined,
		url: result.url || undefined,
		recommended: result.recommended || false,
		images: result.images,
		featured_artists: result.artists,
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
	updates: ExhibitionMutation,
) {
	const updateData: Record<string, string | boolean | number | Date | null> =
		{};

	if (updates.name !== undefined) updateData.name = updates.name;
	if (updates.description !== undefined)
		updateData.description = updates.description;
	if (updates.url !== undefined) updateData.url = updates.url;
	if (updates.gallery_id !== undefined)
		updateData.gallery_id = updates.gallery_id;
	if (updates.recommended !== undefined)
		updateData.recommended = updates.recommended;
	if (updates.start_date !== undefined)
		updateData.start_date = updates.start_date
			? new Date(updates.start_date)
			: null;
	if (updates.end_date !== undefined)
		updateData.end_date = updates.end_date ? new Date(updates.end_date) : null;
	if (updates.private_view_start_date !== undefined)
		updateData.private_view_start_date = updates.private_view_start_date
			? new Date(updates.private_view_start_date)
			: null;
	if (updates.private_view_end_date !== undefined)
		updateData.private_view_end_date = updates.private_view_end_date
			? new Date(updates.private_view_end_date)
			: null;

	await db.update(exhibition).set(updateData).where(eq(exhibition.id, id));

	console.log('updates?.featured_artists', updates?.featured_artists);

	// If featured artists array is provided, update relationships
	if (updates?.featured_artists && updates.featured_artists.length > 0) {
		// First, get all existing exhibition artists relationships
		const existingRelationships = await db
			.select()
			.from(exhibition_artists)
			.where(eq(exhibition_artists.exhibition_id, id));

		// Delete all existing relationships for this exhibition
		if (existingRelationships.length > 0) {
			await db
				.delete(exhibition_artists)
				.where(eq(exhibition_artists.exhibition_id, id));
		}

		// Process each artist name
		for (const artistName of updates.featured_artists) {
			// Skip empty artist names
			if (!artistName.trim()) continue;

			// Find or create artist
			let artistRecord = await db
				.select()
				.from(artists)
				.where(eq(artists.name, artistName))
				.limit(1);

			let artistId;

			if (artistRecord.length === 0) {
				// Create new artist
				const newArtist = await db
					.insert(artists)
					.values({
						name: artistName,
						created_at: new Date(),
					})
					.returning();
				
				artistId = newArtist[0].id;
			} else {
				artistId = artistRecord[0].id;
			}

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

export type ArtistRecord = {
	id: number;
	name: string;
	instagram_handle?: string;
	created_at: string;
};

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
