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
	const { toggle, reset, modalRef } = useModal();

	return (
		<div className="p-4 rounded-lg border border-gray-200 bg-white">
			<h2 className="text-lg font-semibold mb-4 text-gray-800">
				Featured Artists
			</h2>
			<Button button_type="button" handler={toggle} label="Open Modal" />
			<Modal ref={modalRef}>
				<Title>Featured Artists</Title>
				<Field name="Featured Artists">
					<input type="text" name="featured_artists_name" />
				</Field>
				<Body>
					<p>hello</p>
				</Body>
				<Footer>
					<Button button_type="button" handler={reset} label="Close Modal" />
				</Footer>
			</Modal>
		</div>
	);
}
