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
	return (
		<div className="p-4 rounded-lg border border-gray-200 bg-white">
			<h2 className="text-lg font-semibold mb-4 text-gray-800">
				Featured Artists
			</h2>
			<div>
				<ArtistSelect
					artists={allArtists}
					initialSelectedArtists={initialArtists}
				/>
			</div>
		</div>
	);
}
