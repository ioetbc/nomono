import { useState } from "react";
import { useModal } from "~/hooks/use-modal";
import type { ExhibitionRecord } from "../data";
import { Button } from "./button";
import { CreateArtist } from "./create-artist";
import { Body, Footer, Modal } from "./modal";
import { MultiSelect } from "./multi-select";

interface FeaturedArtistsProps {
	selected_artists?: ExhibitionRecord["featured_artists"];
	all_artists: ExhibitionRecord["featured_artists"];
	onChange?: (selectedArtists: ExhibitionRecord["featured_artists"]) => void;
}

export function FeaturedArtists({
	selected_artists = [],
	all_artists = [],
	onChange,
}: FeaturedArtistsProps) {
	const { toggle, reset, modal_ref } = useModal();
	const [selectedArtistsList, setSelectedArtistsList] = useState<
		ExhibitionRecord["featured_artists"]
	>(selected_artists ?? []);

	// Convert artists to the format expected by MultiSelect
	const artistOptions = all_artists.map((artist) => ({
		id: artist.id.toString(),
		label: artist.name,
	}));

	// Convert selected artists to the format expected by MultiSelect
	const initialSelectedOptions = selected_artists.map((artist) => ({
		id: artist.id.toString(),
		label: artist.name,
	}));

	// Handle selection changes
	const handleSelectionChange = (
		selectedOptions: { id: string; label: string }[],
	) => {
		// Convert back to the format expected by the parent component
		const selectedArtists = selectedOptions.map((option) => {
			const artist = all_artists.find((a) => a.id.toString() === option.id);
			return (
				artist || {
					name: option.label,
					instagram_handle: null,
					id: Number.parseInt(option.id),
					created_at: new Date(),
				}
			);
		});

		console.log(selectedArtists);

		setSelectedArtistsList(selectedArtists);

		// Notify parent component if onChange prop is provided
		if (onChange) {
			onChange(selectedArtists);
		}
	};

	return (
		<div className="p-4 rounded-lg border border-gray-200 bg-white">
			<h2 className="text-lg font-semibold mb-4">Featured Artists</h2>

			<MultiSelect
				options={artistOptions}
				initialSelectedOptions={initialSelectedOptions}
				placeholder="Search artists..."
				onChange={handleSelectionChange}
			/>

			<div className="flex justify-between items-center">
				<span className="text-sm text-gray-500">
					{selectedArtistsList?.length} artist
					{selectedArtistsList?.length !== 1 ? "s" : ""} selected
				</span>
				<Button
					button_type="button"
					handler={toggle}
					label="Create New Artist"
				/>
			</div>

			<Modal ref={modal_ref}>
				<Body>
					<CreateArtist />
				</Body>
				<Footer>
					<button type="button" className="btn btn-ghost" onClick={toggle}>
						Close
					</button>
				</Footer>
			</Modal>
		</div>
	);
}
