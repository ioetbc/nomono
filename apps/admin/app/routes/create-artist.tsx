import { redirect } from "react-router";
import type { Route } from "./+types/create-artist";

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();

	console.log("formData", formData);

	const artist_name = formData.get("artist_name");
	const artist_instagram = formData.get("artist_instagram");
	const artist_website = formData.get("artist_website");

	console.log(artist_name, artist_instagram, artist_website);
	return redirect("/exhibitions/2/edit");
}
