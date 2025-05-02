import type { ExhibitionRecord } from "~/data";
import { formatDateForInput } from "~/utils/date-functions";
import { inputStyle, labelStyle, labelTextStyle } from "./image-editor";

interface ExhibitionDatesProps {
	startDate?: ExhibitionRecord["start_date"];
	endDate?: ExhibitionRecord["end_date"];
}

export function ExhibitionDates({ startDate, endDate }: ExhibitionDatesProps) {
	return (
		<div className="p-4 rounded-lg border border-gray-200 bg-white">
			<h2 className="text-lg font-semibold mb-4 text-gray-800">
				Exhibition Dates
			</h2>
			<div style={{ display: "flex", gap: "1rem" }}>
				<label style={{ ...labelStyle, flex: 1 }}>
					<span style={labelTextStyle}>Start Date</span>
					<input
						aria-label="Exhibition start date"
						defaultValue={formatDateForInput(startDate)}
						name="start_date"
						type="date"
						style={inputStyle}
					/>
				</label>
				<label style={{ ...labelStyle, flex: 1 }}>
					<span style={labelTextStyle}>End Date</span>
					<input
						aria-label="Exhibition end date"
						defaultValue={formatDateForInput(endDate)}
						name="end_date"
						type="date"
						style={inputStyle}
					/>
				</label>
			</div>
		</div>
	);
}
