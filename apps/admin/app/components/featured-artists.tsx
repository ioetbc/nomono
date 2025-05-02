import { useFetcher } from "react-router";
import type { ExhibitionRecord } from "../data";
import { ArtistSelect } from "./artist-select";

interface FeaturedArtistsProps {
	initialArtists?: ExhibitionRecord["featured_artists"];
	allArtists: ExhibitionRecord["featured_artists"];
}

export function FeaturedArtists({
	initialArtists,
	allArtists,
}: FeaturedArtistsProps) {
	const fetcher = useFetcher();

	const handleAddNewArtist = async (name: string, instagram?: string) => {
		const formData = new FormData();
		formData.append("intent", "createArtist");
		formData.append("name", name);
		if (instagram) {
			formData.append("instagram_handle", instagram);
		}

		const result = await fetcher.submit(formData, { method: "post" });
		// Temporary cast to access data (in a real app, you'd handle this better)
		const data = fetcher.data as any;

		if (data?.success && data?.artist) {
			// Add the new artist to the allArtists array
			allArtists?.push(data.artist);
			return data.artist;
		}

		throw new Error(data?.error || "Failed to create artist");
	};

	return (
		<div className="p-4 rounded-lg border border-gray-200 bg-white">
			<h2 className="text-lg font-semibold mb-4 text-gray-800">
				Featured Artists
			</h2>
			<div>
				<ArtistSelect
					artists={allArtists}
					initialSelectedArtists={initialArtists}
					onAddNewArtist={handleAddNewArtist}
				/>
			</div>
		</div>
	);
}
