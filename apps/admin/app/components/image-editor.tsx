import { useFetcher } from "react-router";

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
  caption?: string;
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
        alt={image.caption || "Exhibition image"}
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
        {image.caption && (
          <div
            style={{
              backgroundColor: "#f7fafc",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, color: "#4a5568", fontSize: "0.875rem" }}>
              {image.caption}
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={handleRemove}
          style={{
            width: "100%",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            border: "1px solid #e53e3e",
            backgroundColor: "white",
            color: "#e53e3e",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}