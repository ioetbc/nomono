import { useCallback, useState } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";
import { useFetcher } from "react-router";
import { inputStyle, labelStyle, labelTextStyle } from "./image-editor";

export const ImageDropzone = () => {
	const [imageUrl, setImageUrl] = useState("");
	const [caption, setCaption] = useState("");
	const fetcher = useFetcher();

	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (acceptedFiles.length === 0) return;

		const file = acceptedFiles[0];

		// In a real application, you would upload the file to a server and get a URL back
		// For this example, we'll use a FileReader to create a data URL
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				setImageUrl(reader.result);
			}
		};
		reader.readAsDataURL(file);
	}, []);

	const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
		console.log("File rejected:", fileRejections);
		alert("File rejected. Please try a different image file.");
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!imageUrl) {
			alert("Please select an image first");
			return;
		}

		fetcher.submit(
			{
				intent: "addImage",
				imageUrl,
				caption,
			},
			{ method: "post" },
		);

		// Reset form after submission
		setImageUrl("");
		setCaption("");
	};

	// Using react-dropzone for a better file upload experience
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		onDropRejected,
		accept: {
			"image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
		},
		maxSize: 5242880, // 5MB
		maxFiles: 1,
	});

	return (
		<div>
			<h2 className="text-lg font-semibold mb-4 text-gray-800">
				Add new image
			</h2>

			<div
				{...getRootProps()}
				style={{
					cursor: "pointer",
					padding: "2rem",
					textAlign: "center",
					borderRadius: "4px",
					border: `1px dashed ${isDragActive ? "#3182ce" : "#cbd5e0"}`,
					backgroundColor: "white",
					marginBottom: "1rem",
					outline: "none",
					transition: "border-color 0.2s ease",
					...(isDragActive ? { backgroundColor: "#ebf8ff" } : {}),
				}}
			>
				<input {...getInputProps()} />
				{imageUrl ? (
					<img
						src={imageUrl}
						alt="Preview"
						style={{
							maxWidth: "100%",
							maxHeight: "200px",
						}}
					/>
				) : (
					<div>
						<p>
							{isDragActive
								? "Drop the image here"
								: "Drag & drop an image here, or click to select"}
						</p>
						<p style={{ fontSize: "0.875rem", color: "#718096" }}>
							Supports: JPG, PNG, GIF (max 5MB)
						</p>
					</div>
				)}
			</div>

			{imageUrl && (
				<>
					<div style={{ marginBottom: "1rem" }}>
						<label style={labelStyle}>
							<span style={labelTextStyle}>Caption (optional)</span>
							<input
								type="text"
								value={caption}
								onChange={(e) => setCaption(e.target.value)}
								placeholder="Add a caption for this image"
								style={inputStyle}
							/>
						</label>
					</div>

					<button
						type="button"
						onClick={handleSubmit}
						style={{
							padding: "0.5rem 1rem",
							borderRadius: "4px",
							border: "none",
							backgroundColor: "#3182ce",
							color: "white",
							fontWeight: 500,
							cursor: "pointer",
						}}
					>
						Upload Image
					</button>
				</>
			)}
		</div>
	);
};
