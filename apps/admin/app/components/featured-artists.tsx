import { useModal } from "~/hooks/use-modal";
import type { ExhibitionRecord } from "../data";
import { Button } from "./button";
import { Body, Field, Footer, Modal, Title } from "./modal";

interface FeaturedArtistsProps {
	selected_artists?: ExhibitionRecord["featured_artists"];
	all_artists: ExhibitionRecord["featured_artists"];
}

export function FeaturedArtists({
	selected_artists,
	all_artists,
}: FeaturedArtistsProps) {
	const { toggle, reset, modal_ref } = useModal();

	return (
		<div className="p-4 rounded-lg border border-gray-200 bg-white">
			<h2 className="text-lg font-semibold mb-4 text-gray-800">
				Featured Artists
			</h2>
			<Button button_type="button" handler={toggle} label="Open Modal" />
			<Modal ref={modal_ref}>
				<Title>Featured Artists</Title>
				<Body>
					<Field name="Artist name">
						<input type="text" name="featured_artists_name" />
					</Field>
					<Field name="Artist Instagram">
						<input type="text" name="featured_artists_instagram" />
					</Field>
					<Field name="Artist Website">
						<input type="text" name="featured_artists_website" />
					</Field>
				</Body>
				<Footer>
					<button type="button" onClick={toggle} className="btn btn-ghost">
						Close
					</button>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</Footer>
			</Modal>
		</div>
	);
}
