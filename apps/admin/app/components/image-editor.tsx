import { useFetcher } from "react-router";
import { Button } from "./button";

// Common styles that will be shared across components
export const labelStyle = {
	display: "flex",
	flexDirection: "column" as const,
	gap: "0.25rem",
	width: "100%",
};

export const labelTextStyle = {
	fontSize: "0.875rem",
	fontWeight: 500 as const,
	color: "#4a5568",
	marginBottom: "0.25rem",
};

export const inputStyle = {
	padding: "0.5rem 0.75rem",
	borderRadius: "4px",
	border: "1px solid #cbd5e0",
	width: "100%",
};

interface ImageProps {
	id: number;
	image_url: string;
	artist_id?: number;
}

interface ImageEditorProps {
	image: ImageProps;
}

export function ImageEditor({ image }: ImageEditorProps) {
	const fetcher = useFetcher();

	const handleRemove = () => {
		if (confirm("Are you sure you want to delete this image?")) {
			fetcher.submit(
				{
					intent: "deleteImage",
					imageId: image.id.toString(),
				},
				{ method: "post" },
			);
		}
	};

	return (
		<div
			style={{
				marginBottom: "1.5rem",
				borderRadius: "8px",
				overflow: "hidden",
				border: "1px solid #e2e8f0",
			}}
		>
			<img
				src={image.image_url}
				alt={image.artist_id?.toString() ?? "Exhibition image"}
				style={{
					width: "100%",
					height: "auto",
					display: "block",
				}}
			/>

			<div
				style={{
					padding: "0.75rem",
					display: "flex",
					flexDirection: "column",
					gap: "0.5rem",
				}}
			>
				<Button button_type="button" label="Remove" handler={handleRemove} />
			</div>
		</div>
	);
}
