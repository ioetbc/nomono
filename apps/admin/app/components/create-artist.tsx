import { useFetcher } from "react-router";

export const CreateArtist = () => {
	const fetcher = useFetcher();
	const busy = fetcher.state !== "idle";

	return (
		<fetcher.Form
			method="post"
			action="/artist/create"
			className="flex gap-2 flex-col"
		>
			<input
				type="text"
				placeholder="Artist Name"
				className="input w-full"
				name="artist_name"
				required
			/>
			<input
				type="text"
				placeholder="Artist Instagram"
				className="input w-full"
				name="artist_instagram"
			/>
			<input
				type="text"
				placeholder="Artist Website"
				className="input w-full"
				name="artist_website"
			/>

			<button type="submit" className="btn btn-primary">
				{busy ? "Saving..." : "Save"}
			</button>
		</fetcher.Form>
	);
};
