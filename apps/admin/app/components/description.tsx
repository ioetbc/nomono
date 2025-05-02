import { inputStyle } from "./image-editor";

import { labelStyle } from "./image-editor";

export const Description = ({ description }: { description?: string }) => {
	if (!description) return null;

	return (
		<div className="p-4 rounded-lg border border-gray-200 bg-white">
			<label style={labelStyle}>
				<h2 className="text-lg font-semibold mb-4 text-gray-800">
					Description
				</h2>
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
