import {
	type NewGallery,
	artists,
	create_db,
	exhibition,
	exhibition_artists,
	gallery,
	images,
} from "@monorepo-template/db";

async function seed() {
	console.log("Seeding database with contacts...");
	const db = create_db();

	try {
		await db.delete(images);
		await db.delete(exhibition_artists);
		await db.delete(exhibition);
		await db.delete(artists);
		await db.delete(gallery);
		console.log("Cleared existing data from all tables");
	} catch (error) {
		console.error("Error setting up tables:", error);
	}

	// Original contact data from data.ts
	const contactsData = [
		{
			avatar:
				"https://sessionize.com/image/124e-400o400o2-wHVdAuNaxi8KJrgtN3ZKci.jpg",
			first: "Shruti",
			last: "Kapoor",
			twitter: "@shrutikapoor08",
		},
		{
			avatar:
				"https://sessionize.com/image/1940-400o400o2-Enh9dnYmrLYhJSTTPSw3MH.jpg",
			first: "Glenn",
			last: "Reyes",
			twitter: "@glnnrys",
		},
		{
			avatar:
				"https://sessionize.com/image/9273-400o400o2-3tyrUE3HjsCHJLU5aUJCja.jpg",
			first: "Ryan",
			last: "Florence",
		},
		{
			avatar:
				"https://sessionize.com/image/d14d-400o400o2-pyB229HyFPCnUcZhHf3kWS.png",
			first: "Oscar",
			last: "Newman",
			twitter: "@__oscarnewman",
		},
		{
			avatar:
				"https://sessionize.com/image/fd45-400o400o2-fw91uCdGU9hFP334dnyVCr.jpg",
			first: "Michael",
			last: "Jackson",
		},
		{
			avatar:
				"https://sessionize.com/image/b07e-400o400o2-KgNRF3S9sD5ZR4UsG7hG4g.jpg",
			first: "Christopher",
			last: "Chedeau",
			twitter: "@Vjeux",
		},
		{
			avatar:
				"https://sessionize.com/image/262f-400o400o2-UBPQueK3fayaCmsyUc1Ljf.jpg",
			first: "Cameron",
			last: "Matheson",
			twitter: "@cmatheson",
		},
		{
			avatar:
				"https://sessionize.com/image/820b-400o400o2-Ja1KDrBAu5NzYTPLSC3GW8.jpg",
			first: "Brooks",
			last: "Lybrand",
			twitter: "@BrooksLybrand",
		},
		{
			avatar:
				"https://sessionize.com/image/df38-400o400o2-JwbChVUj6V7DwZMc9vJEHc.jpg",
			first: "Alex",
			last: "Anderson",
			twitter: "@ralex1993",
		},
		{
			avatar:
				"https://sessionize.com/image/5578-400o400o2-BMT43t5kd2U1XstaNnM6Ax.jpg",
			first: "Kent C.",
			last: "Dodds",
			twitter: "@kentcdodds",
		},
	];

	try {
		// Sample gallery data
		const galleryData = [
			{
				id: "gallery-1",
				name: "Grimm Gallery",
				url: "https://grimmgallery.com",
				description: "Grimm Gallery is a contemporary art gallery located in the heart of London, showcasing a diverse range of contemporary art from emerging and established artists.",
				recommended: true,
			},
			{
				id: "gallery-2",
				name: "Greengrassi",
				url: "https://www.greengrassi.com/artists-shows/",
				description: "Greengrassi is a contemporary art gallery located in the heart of London, showcasing a diverse range of contemporary art from emerging and established artists.",
				recommended: false,
			},
			{
				id: "gallery-3",
				name: "ICA",
				url: "https://www.ica.art/exhibitions",
				description: "ICA is a contemporary art gallery located in the heart of London, showcasing a diverse range of contemporary art from emerging and established artists.",
				recommended: true,
			},
		];

		// Insert gallery items
		const galleryMap: Record<string, number> = {}; // To track generated IDs

		for (const item of galleryData) {
			const result = await db
				.insert(gallery)
				.values({
					created_at: new Date(),
					name: item.name,
					url: item.url,
					description: item.description,
					recommended: item.recommended,
				} satisfies NewGallery)
				.returning({ id: gallery.id });

			// Store the mapping from the original ID to the generated one
			galleryMap[item.id] = result[0].id;
			console.log(`Mapped ${item.id} to actual ID: ${result[0].id}`);

			console.log(`Added gallery item: ${item.name}`);
		}

		// Sample artists data
		const artistsData = [
			{
				id: "artist-1",
				name: "Jane Smith",
				instagram_handle: "@janesmith_art",
			},
			{
				id: "artist-2",
				name: "John Doe",
				instagram_handle: "@johndoe_creates",
			},
			{
				id: "artist-3",
				name: "Alex Johnson",
				instagram_handle: "@alexj_artist",
			},
			{
				id: "artist-4",
				name: "Maria Garcia",
				instagram_handle: "@maria_garcia_art",
			},
			{
				id: "artist-5",
				name: "David Kim",
				instagram_handle: "@david_kim_studio",
			},
		];
		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error inserting data:", error);
		throw error;
	} finally {
		process.exit(0);
	}
}

// Run the seed function
seed().catch((e) => {
	console.error("Error seeding database:", e);
	process.exit(1);
});
