import { inputStyle, labelStyle, labelTextStyle } from "./image-editor";

interface Props {
	url: string;
}

export function ExhibitionUrl({ url }: Props) {
	return (
		<div className="form-group">
			<label style={labelStyle}>
				<span style={labelTextStyle}>Exhibition URL</span>
				<input
					aria-label="Exhibition URL"
					defaultValue={url}
					name="url"
					placeholder="https://exhibition.com"
					type="text"
					style={inputStyle}
				/>
			</label>
		</div>
	);
}
