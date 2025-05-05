import { artists, db } from "@monorepo-template/db";
import { redirect } from "react-router";
import type { Route } from "./+types/create-artist";

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();

	const artist_name = formData.get("artist_name");
	const artist_instagram = formData.get("artist_instagram");
	const artist_website = formData.get("artist_website");

	if (
		typeof artist_name !== "string" ||
		typeof artist_instagram !== "string" ||
		typeof artist_website !== "string"
	) {
		throw new Response("Invalid form data", { status: 400 });
	}

	try {
		await db.insert(artists).values({
			name: artist_name,
			instagram_handle: artist_instagram ?? null,
		});
	} catch (error) {
		console.error(error);
		throw new Response("Failed to create artist", { status: 500 });
	}

	const referer = request.headers.get("referer");
	const redirect_to = referer ? new URL(referer).pathname : "/exhibitions";

	return redirect(redirect_to);
}
