import { useNavigate } from "react-router";
import { Form, redirect } from "react-router";
import { Button } from "~/components/button";
import { Description } from "~/components/description";
import { ExhibitionDates } from "~/components/exhibition-dates";
import { ExhibitionName } from "~/components/exhibition-name";
import { ExhibitionUrl } from "~/components/exhibition-url";
import { FeaturedArtists } from "~/components/featured-artists";
import { ImageDropzone } from "~/components/image-dropzone";
import {
	ImageEditor,
	labelStyle,
	labelTextStyle,
} from "~/components/image-editor";
import { PrivateView } from "~/components/private-view";
import {
	createImage,
	deleteImage,
	getExhibition,
	updateExhibition,
} from "../data";
import type { Route } from "./+types/exhibition";

export async function action({ params, request }: Route.ActionArgs) {
	const formData = await request.formData();
	const intent = formData.get("intent");

	console.log("params", params);

	const exhibitionId = Number(params.exhibition_id);
	if (Number.isNaN(exhibitionId)) {
		throw new Response("Invalid exhibition ID", { status: 400 });
	}

	if (intent === "deleteImage") {
		const imageId = formData.get("imageId");
		if (imageId && typeof imageId === "string") {
			await deleteImage(Number(imageId));
			return { success: true };
		}
		return { success: false };
	}

	if (intent === "acceptImage") {
		// Placeholder for future implementation
		return { success: true };
	}

	if (intent === "addImage") {
		const imageUrl = formData.get("imageUrl");
		const caption = formData.get("caption") || "";

		if (imageUrl && typeof imageUrl === "string") {
			await createImage({
				exhibition_id: exhibitionId,
				image_url: imageUrl,
				caption: caption.toString(),
			});
			return { success: true };
		}
		return { success: false };
	}

	// Process the form entries
	const entries = Array.from(formData.entries());
	const updates: Record<string, any> = {};
	const featuredArtists: string[] = [];

	// Extract all form values
	for (const [key, value] of entries) {
		// Check if this is a featured artist field
		if (
			key.startsWith("featured_artists[") &&
			value &&
			typeof value === "string" &&
			value.trim() !== ""
		) {
			featuredArtists.push(value.trim());
		} else {
			updates[key] = value;
		}
	}

	// Add featured artists to updates
	if (featuredArtists.length > 0) {
		updates.featured_artists = featuredArtists;
	}

	console.log("updates", updates);

	if (
		updates.private_view_start_date &&
		typeof updates.private_view_start_date === "string"
	) {
		updates.private_view_start_date = new Date(
			updates.private_view_start_date,
		).toISOString();
	}

	if (
		updates.private_view_end_date &&
		typeof updates.private_view_end_date === "string"
	) {
		updates.private_view_end_date = new Date(
			updates.private_view_end_date,
		).toISOString();
	}

	await updateExhibition(exhibitionId, updates);
	return redirect(`/exhibitions/${exhibitionId}`);
}

export async function loader({ params }: Route.LoaderArgs) {
	const exhibition = await getExhibition(Number(params.exhibition_id));
	if (!exhibition) {
		throw new Response("Not Found", { status: 404 });
	}
	return { exhibition };
}

export default function EditExhibition({ loaderData }: Route.ComponentProps) {
	const navigate = useNavigate();
	const { exhibition } = loaderData;

	return (
		<div style={{ margin: "0 auto", padding: "2rem 1rem" }}>
			<h1
				style={{ fontSize: "1.75rem", marginBottom: "1.5rem", fontWeight: 600 }}
			>
				Edit Exhibition: {exhibition.name}
			</h1>

			<Form
				key={exhibition.id}
				id="exhibition-form"
				method="post"
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 4fr",
					gap: "1.5rem",
					backgroundColor: "#f7fafc",
					padding: "2rem",
					borderRadius: "8px",
					border: "1px solid #e2e8f0",
				}}
			>
				<div>
					<div style={labelStyle}>
						<span style={labelTextStyle}>Exhibition images</span>
						<div
							style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
						>
							{exhibition.images.map((image) => (
								<ImageEditor key={image.id} image={image} />
							))}

							<ImageDropzone />
						</div>
					</div>
				</div>
				<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
					<ExhibitionName name={exhibition.name} />

					<ExhibitionUrl url={exhibition.url} />

					<ExhibitionDates
						startDate={exhibition.start_date}
						endDate={exhibition.end_date}
					/>

					<PrivateView
						startDate={exhibition.private_view_start_date}
						endDate={exhibition.private_view_end_date}
					/>

					<Description description={exhibition.description} />

					<FeaturedArtists initialArtists={exhibition.featured_artists} />

					<div
						style={{
							display: "flex",
							gap: "1rem",
							marginTop: "1rem",
							justifyContent: "flex-end",
						}}
					>
						<Button
							button_type="button"
							label="Cancel"
							handler={() => navigate(-1)}
						/>

						<Button button_type="submit" label="Save Changes" />
					</div>
				</div>
			</Form>
		</div>
	);
}
