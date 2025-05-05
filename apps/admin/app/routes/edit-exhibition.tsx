import { useNavigate } from "react-router";
import { Form } from "react-router";
import {
	update_description,
	update_end_date,
	update_exhibition_name,
	update_exhibition_url,
	update_featured_artists,
	update_private_view_end_date,
	update_private_view_start_date,
	update_start_date,
} from "~/actions/update-exhibition";
import { Button } from "~/components/button";
import { Description } from "~/components/description";
import { ExhibitionDates } from "~/components/exhibition-dates";
import { ExhibitionName } from "~/components/exhibition-name";
import { ExhibitionUrl } from "~/components/exhibition-url";
import { FeaturedArtists } from "~/components/featured-artists";
import { ImageDropzone } from "~/components/image-dropzone";
import { ImageEditor, labelStyle } from "~/components/image-editor";
import { PrivateView } from "~/components/private-view";
import {
	createImage,
	deleteImage,
	getAllArtists,
	getExhibition,
} from "../data";
import type { Route } from "./+types/edit-exhibition";

export async function action({ params, request }: Route.ActionArgs) {
	const formData = await request.formData();
	const intent = formData.get("intent");

	console.log("params", params);

	const exhibition_id = Number(params.exhibition_id);
	if (Number.isNaN(exhibition_id)) {
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
				exhibition_id: exhibition_id,
				image_url: imageUrl,
				caption: caption.toString(),
			});
			return { success: true };
		}
		return { success: false };
	}

	// if (intent === "createArtist") {
	// 	const name = formData.get("name");
	// 	const instagram_handle = formData.get("instagram_handle");

	// 	if (name && typeof name === "string") {
	// 		try {
	// 			const newArtist = await createArtist(
	// 				name,
	// 				instagram_handle && typeof instagram_handle === "string"
	// 					? instagram_handle
	// 					: undefined,
	// 			);

	// 			// Get existing selected artist IDs
	// 			const artist_ids = formData
	// 				.getAll("artist_ids[]")
	// 				.map((id) => (typeof id === "string" ? Number(id) : id));

	// 			// Add the newly created artist to the selection
	// 			const updatedArtistIds = [...(artist_ids as number[]), newArtist.id];

	// 			// Update the exhibition with the new list of artist IDs
	// 			await update_featured_artists(exhibitionId, updatedArtistIds);

	// 			return { success: true, artist: newArtist };
	// 		} catch (error) {
	// 			return { success: false, error: "Failed to create artist" };
	// 		}
	// 	}
	// 	return { success: false, error: "Artist name is required" };
	// }

	const exhibition_name = formData.get("exhibition_name");
	const exhibition_url = formData.get("exhibition_url");
	const start_date = formData.get("start_date");
	const end_date = formData.get("end_date");
	const private_view_start_date = formData.get("private_view_start_date");
	const private_view_end_date = formData.get("private_view_end_date");
	const description = formData.get("description");

	// Get artist_ids instead of featured_artists strings
	const featured_artists_name = formData.getAll("featured_artists_name");

	if (exhibition_name && typeof exhibition_name === "string") {
		await update_exhibition_name(exhibition_id, exhibition_name);
	}

	if (exhibition_url && typeof exhibition_url === "string") {
		await update_exhibition_url(exhibition_id, exhibition_url);
	}

	if (start_date && typeof start_date === "string") {
		const date = new Date(start_date);
		await update_start_date(exhibition_id, date);
	}

	if (end_date && typeof end_date === "string") {
		const date = new Date(end_date);
		await update_end_date(exhibition_id, date);
	}

	if (private_view_start_date && typeof private_view_start_date === "string") {
		const date = new Date(private_view_start_date);
		await update_private_view_start_date(exhibition_id, date);
	}

	if (private_view_end_date && typeof private_view_end_date === "string") {
		const date = new Date(private_view_end_date);
		await update_private_view_end_date(exhibition_id, date);
	}

	if (description && typeof description === "string") {
		await update_description(exhibition_id, description);
	}

	if (
		featured_artists_name.length > 0 &&
		typeof featured_artists_name === "string"
	) {
		await update_featured_artists(exhibition_id, featured_artists_name);
	}

	// Handle artist IDs for updating featured artists
	// if (intent === "updateFeaturedArtists" || intent === "submit") {
	// 	const artist_ids = formData.getAll("artist_ids[]");

	// 	if (
	// 		artist_ids.length > 0 &&
	// 		artist_ids.every((id) => typeof id === "string")
	// 	) {
	// 		// Convert string IDs to numbers
	// 		const selectedArtistIds = artist_ids.map((id) => Number(id));

	// 		// Update with the artist IDs
	// 		await update_featured_artists(exhibitionId, selectedArtistIds);

	// 		if (intent === "updateFeaturedArtists") {
	// 			return { success: true };
	// 		}
	// 	}
	// }

	// return redirect(`/exhibitions/${exhibitionId}`);
}

export async function loader({ params }: Route.LoaderArgs) {
	const exhibition = await getExhibition(Number(params.exhibition_id));
	if (!exhibition) {
		throw new Response("Not Found", { status: 404 });
	}

	// Load all artists for the select input
	const allArtists = await getAllArtists();

	return { exhibition, allArtists };
}

export default function EditExhibition({ loaderData }: Route.ComponentProps) {
	const navigate = useNavigate();
	const { exhibition, allArtists } = loaderData;

	return (
		<div className="p-4 m-auto">
			<h1 className="text-4xl font-semibold mb-4">Edit Exhibition</h1>

			<Form
				key={exhibition.id}
				id="exhibition-form"
				method="post"
				className="grid grid-cols-[2fr_4fr] gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200"
			>
				<div>
					<div style={labelStyle}>
						{exhibition?.images && exhibition.images.length > 0 && (
							<h2 className="text-lg font-semibold mb-4 text-gray-800">
								Exhibition images
							</h2>
						)}
						<div className="grid grid-cols-[1fr_1fr] gap-4">
							{exhibition.images?.map((image) => (
								<ImageEditor key={image.caption} image={image} />
							))}
						</div>
						<ImageDropzone />
					</div>
				</div>
				<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
					<ExhibitionName name={exhibition.name} />

					<FeaturedArtists
						selected_artists={exhibition.featured_artists}
						all_artists={allArtists}
					/>

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

					<div className="flex gap-4 mt-4 justify-end">
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
