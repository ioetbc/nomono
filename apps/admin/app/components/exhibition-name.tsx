import { inputStyle, labelStyle, labelTextStyle } from "./image-editor";

interface Props {
	name: string;
}

export function ExhibitionName({ name }: Props) {
	return (
		<div className="form-group">
			<label style={labelStyle}>
				<span style={labelTextStyle}>Name</span>
				<input
					aria-label="Exhibition name"
					defaultValue={name}
					name="name"
					placeholder="Exhibition name"
					type="text"
					style={inputStyle}
				/>
			</label>
		</div>
	);
}
