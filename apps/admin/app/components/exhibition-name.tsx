import { inputStyle, labelStyle } from "./image-editor";

type Props = {
	name: string;
};

export function ExhibitionName({ name }: Props) {
	return (
		<div className="form-group">
			<label style={labelStyle}>
				<h2 className="text-lg font-semibold mb-4 text-gray-800">Name</h2>
				<input
					aria-label="Exhibition name"
					defaultValue={name}
					name="exhibition_name"
					placeholder="Exhibition name"
					type="text"
					style={inputStyle}
				/>
			</label>
		</div>
	);
}
