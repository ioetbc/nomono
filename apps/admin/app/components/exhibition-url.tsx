import { inputStyle, labelStyle } from "./image-editor";

interface Props {
	url: string;
}

export function ExhibitionUrl({ url }: Props) {
	return (
		<div className="p-4 rounded-lg border border-gray-200 bg-white">
			<label style={labelStyle}>
				<h2 className="text-lg font-semibold mb-4 text-gray-800">
					Link to gallery page
				</h2>
				<input
					aria-label="Exhibition URL"
					defaultValue={url}
					name="exhibition_url"
					placeholder="https://exhibition.com"
					type="text"
					style={inputStyle}
				/>
			</label>
		</div>
	);
}
