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
import { createImage, deleteImage, getExhibition } from "../data";
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

	const exhibition_name = formData.get("exhibition_name");
	const exhibition_url = formData.get("exhibition_url");
	const start_date = formData.get("start_date");
	const end_date = formData.get("end_date");
	const private_view_start_date = formData.get("private_view_start_date");
	const private_view_end_date = formData.get("private_view_end_date");
	const description = formData.get("description");
	const featured_artists = formData.getAll("featured_artists");

	if (exhibition_name && typeof exhibition_name === "string") {
		await update_exhibition_name(exhibitionId, exhibition_name);
	}

	if (exhibition_url && typeof exhibition_url === "string") {
		await update_exhibition_url(exhibitionId, exhibition_url);
	}

	if (start_date && typeof start_date === "string") {
		const date = new Date(start_date);
		await update_start_date(exhibitionId, date);
	}

	if (end_date && typeof end_date === "string") {
		const date = new Date(end_date);
		await update_end_date(exhibitionId, date);
	}

	if (private_view_start_date && typeof private_view_start_date === "string") {
		const date = new Date(private_view_start_date);
		await update_private_view_start_date(exhibitionId, date);
	}

	if (private_view_end_date && typeof private_view_end_date === "string") {
		const date = new Date(private_view_end_date);
		await update_private_view_end_date(exhibitionId, date);
	}

	if (description && typeof description === "string") {
		await update_description(exhibitionId, description);
	}

	if (featured_artists?.every((artist) => typeof artist === "string")) {
		await update_featured_artists(exhibitionId, featured_artists);
	}

	// return redirect(`/exhibitions/${exhibitionId}`);
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
		<div className="p-4 m-auto">
			<h1 className="text-2xl font-semibold mb-4">
				Edit Exhibition: {exhibition.name}
			</h1>

			<Form
				key={exhibition.id}
				id="exhibition-form"
				method="post"
				className="grid grid-cols-[2fr_4fr] gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200"
			>
				<div>
					<div style={labelStyle}>
						{exhibition.images.length > 0 && (
							<h2 className="text-lg font-semibold mb-4 text-gray-800">
								Exhibition images
							</h2>
						)}
						<div className="grid grid-cols-[1fr_1fr] gap-4">
							{exhibition.images.map((image) => (
								<ImageEditor key={image.id} image={image} />
							))}
						</div>
						<ImageDropzone />
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
