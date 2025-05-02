import { useEffect, useRef, useState } from "react";
import type { ArtistRecord } from "../data";
import { Button } from "./button";
import { inputStyle } from "./image-editor";

interface ArtistSelectProps {
	artists?: ArtistRecord[];
	initialSelectedArtists?: ArtistRecord[];
	onAddNewArtist?: (name: string, instagram?: string) => Promise<ArtistRecord>;
}

export function ArtistSelect({
	artists,
	initialSelectedArtists = [],
	onAddNewArtist,
}: ArtistSelectProps) {
	const [searchText, setSearchText] = useState("");
	const [selectedArtists, setSelectedArtists] = useState<number[]>([]);
	const [filteredArtists, setFilteredArtists] = useState<ArtistRecord[]>(
		artists ?? [],
	);
	const [isAddingNew, setIsAddingNew] = useState(false);
	const [newArtistName, setNewArtistName] = useState("");
	const [newArtistInstagram, setNewArtistInstagram] = useState("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const dropdownRef = useRef<HTMLDivElement>(null);

	// Set initial selected artists
	useEffect(() => {
		if (initialSelectedArtists && initialSelectedArtists.length > 0) {
			setSelectedArtists(initialSelectedArtists.map((a) => a.id));
		}
	}, [initialSelectedArtists]);

	// Filter artists based on search text
	useEffect(() => {
		if (searchText.trim() === "") {
			setFilteredArtists(artists ?? []);
		} else {
			const lowercaseSearch = searchText.toLowerCase();
			const filtered = (artists ?? []).filter((artist) =>
				artist.name.toLowerCase().includes(lowercaseSearch),
			);
			setFilteredArtists(filtered);
		}
	}, [searchText, artists]);

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleArtistSelect = (artistId: number) => {
		if (selectedArtists.includes(artistId)) {
			setSelectedArtists(selectedArtists.filter((id) => id !== artistId));
		} else {
			setSelectedArtists([...selectedArtists, artistId]);
		}
	};

	const handleAddNewArtist = async () => {
		if (!newArtistName.trim()) return;

		if (onAddNewArtist) {
			try {
				const newArtist = await onAddNewArtist(
					newArtistName,
					newArtistInstagram || undefined,
				);

				// Add new artist to selected artists
				setSelectedArtists([...selectedArtists, newArtist.id]);

				// Reset form
				setNewArtistName("");
				setNewArtistInstagram("");
				setIsAddingNew(false);
			} catch (error) {
				console.error("Failed to add new artist:", error);
			}
		}
	};

	return (
		<div className="w-full flex flex-col gap-6">
			{/* Search Input */}
			<div className="relative" ref={dropdownRef}>
				<input
					type="text"
					value={searchText}
					onChange={(e) => {
						setSearchText(e.target.value);
						setIsDropdownOpen(true);
					}}
					onClick={() => setIsDropdownOpen(true)}
					placeholder="Search for artists..."
					style={inputStyle}
					className="w-full"
				/>

				{/* Dropdown */}
				{isDropdownOpen && (
					<div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
						{/* Artist List */}
						{filteredArtists.length > 0 ? (
							filteredArtists.map((artist) => (
								<div
									key={artist.id}
									className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${
										selectedArtists.includes(artist.id) ? "bg-blue-50" : ""
									}`}
									onClick={() => handleArtistSelect(artist.id)}
									onKeyUp={(e) => {
										if (e.key === "Enter") {
											handleArtistSelect(artist.id);
										}
									}}
								>
									<input
										type="checkbox"
										checked={selectedArtists.includes(artist.id)}
										onChange={() => {}}
										className="mr-2"
									/>
									<div>
										<div>{artist.name}</div>
										{artist.instagram_handle && (
											<div className="text-sm text-gray-500">
												@{artist.instagram_handle}
											</div>
										)}
									</div>
								</div>
							))
						) : (
							<div className="px-3 py-2 text-gray-500">No artists found</div>
						)}
					</div>
				)}
			</div>
			<div className="flex flex-wrap gap-2 mb-2">
				{selectedArtists.map((artistId) => {
					const artist = artists?.find((a) => a.id === artistId);
					return artist ? (
						<div
							key={artist.id}
							className="px-2 py-1 border-2 border-gray-200 rounded-md flex items-center gap-4 justify-between"
						>
							<p>{artist.name}</p>
							<button
								type="button"
								className="text-blue-500 hover:text-blue-700 cursor-pointer"
								onClick={() => handleArtistSelect(artist.id)}
							>
								×
							</button>
							{/* Hidden input to submit the selected artist IDs */}
							<input type="hidden" name="artist_ids[]" value={artist.id} />
						</div>
					) : null;
				})}
			</div>
			{/* Add New Artist Option */}
			<div className="p-2 border-b border-gray-200">
				{isAddingNew ? (
					<div className="flex gap-4 flex-col">
						<input
							type="text"
							value={newArtistName}
							onChange={(e) => setNewArtistName(e.target.value)}
							placeholder="Artist name"
							className="w-full p-2 border border-gray-300 rounded"
						/>
						<input
							type="text"
							value={newArtistInstagram}
							onChange={(e) => setNewArtistInstagram(e.target.value)}
							placeholder="Instagram handle (optional)"
							className="w-full p-2 border border-gray-300 rounded"
						/>
						<div className="flex gap-4 justify-end">
							<Button
								button_type="button"
								label="Cancel"
								handler={() => setIsAddingNew(false)}
							/>
							<Button
								button_type="button"
								label="Add Artist"
								handler={handleAddNewArtist}
								disabled={!newArtistName.trim()}
							/>
						</div>
					</div>
				) : (
					<button
						type="button"
						onClick={() => setIsAddingNew(true)}
						className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded"
					>
						+ Add new artist
					</button>
				)}
			</div>
		</div>
	);
}
