import { useEffect, useState } from "react";
import { inputStyle } from "./image-editor";

interface FeaturedArtistsProps {
	initialArtists?: { artist: { name: string } }[];
}

export function FeaturedArtists({ initialArtists }: FeaturedArtistsProps) {
	const [artistInputs, setArtistInputs] = useState<string[]>([]);

	useEffect(() => {
		if (initialArtists && initialArtists.length > 0) {
			setArtistInputs(initialArtists.map((a) => a.artist.name));
		} else {
			setArtistInputs([""]);
		}
	}, [initialArtists]);

	const addArtistInput = () => {
		setArtistInputs([...artistInputs, ""]);
	};

	const removeArtistInput = (index: number) => {
		if (artistInputs.length > 1) {
			const newInputs = [...artistInputs];
			newInputs.splice(index, 1);
			setArtistInputs(newInputs);
		}
	};

	const handleArtistChange = (index: number, value: string) => {
		const newInputs = [...artistInputs];
		newInputs[index] = value;
		setArtistInputs(newInputs);
	};

	return (
		<div className="p-4 rounded-lg border border-gray-200 bg-white">
			<h2 className="text-lg font-semibold mb-4 text-gray-800">
				Featured Artists
			</h2>
			<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
				{artistInputs.map((artist, index) => (
					<div key={artist} style={{ display: "flex", gap: "0.5rem" }}>
						<input
							type="text"
							name="featured_artists"
							value={artist}
							onChange={(e) => handleArtistChange(index, e.target.value)}
							placeholder="Artist name"
							style={{ ...inputStyle, flex: 1 }}
						/>
						{artistInputs.length > 1 && (
							<button
								type="button"
								onClick={() => removeArtistInput(index)}
								style={{
									padding: "0.5rem",
									borderRadius: "4px",
									border: "1px solid #e53e3e",
									backgroundColor: "white",
									color: "#e53e3e",
									cursor: "pointer",
								}}
							>
								Remove
							</button>
						)}
					</div>
				))}
				<button
					type="button"
					onClick={addArtistInput}
					style={{
						padding: "0.5rem 1rem",
						borderRadius: "4px",
						border: "1px solid #3182ce",
						backgroundColor: "white",
						color: "#3182ce",
						fontWeight: 500,
						cursor: "pointer",
						alignSelf: "flex-start",
					}}
				>
					Add Artist
				</button>
			</div>
		</div>
	);
}
