import { inputStyle } from "./image-editor";
import { labelTextStyle } from "./image-editor";

import { labelStyle } from "./image-editor";

export const Description = ({ description }: { description?: string }) => {
	if (!description) return null;

	return (
		<div className="form-group">
			<label style={labelStyle}>
				<span style={labelTextStyle}>Description</span>
				<textarea
					defaultValue={description}
					name="description"
					rows={6}
					style={{
						...inputStyle,
						height: "auto",
						minHeight: "120px",
						fontFamily: "inherit",
					}}
				/>
			</label>
		</div>
	);
};
