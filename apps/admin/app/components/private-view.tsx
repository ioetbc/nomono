import type { ExhibitionRecord } from "~/data";
import {
	combineDateTime,
	formatDateForInput,
	formatTimeForInput,
} from "~/utils/date-functions";
import { inputStyle, labelStyle, labelTextStyle } from "./image-editor";

interface PrivateViewProps {
	startDate: ExhibitionRecord["private_view_start_date"] | null;
	endDate: ExhibitionRecord["private_view_end_date"] | null;
}

export function PrivateView({ startDate, endDate }: PrivateViewProps) {
	return (
		<div className="p-4 rounded-lg border border-gray-200 bg-white">
			<h2 className="text-lg font-semibold mb-4 text-gray-800">Private view</h2>
			<div style={{ display: "flex", gap: "1rem" }}>
				<div style={{ flex: 1 }}>
					<label style={labelStyle}>
						<span style={labelTextStyle}>Start Date</span>
						<input
							aria-label="Private view start date"
							defaultValue={formatDateForInput(startDate)}
							id="private_view_start_date"
							type="date"
							style={inputStyle}
							onChange={(e) => {
								const dateValue = e.target.value;
								const timeValue = (
									document.getElementById(
										"private_view_start_time",
									) as HTMLInputElement
								).value;
								(
									document.getElementById(
										"private_view_start_date_hidden",
									) as HTMLInputElement
								).value = combineDateTime(dateValue, timeValue);
							}}
						/>
					</label>
					<label style={{ ...labelStyle, marginTop: "0.5rem" }}>
						<span style={labelTextStyle}>Start Time</span>
						<input
							aria-label="Private view start time"
							defaultValue={formatTimeForInput(startDate)}
							id="private_view_start_time"
							type="time"
							style={inputStyle}
							onChange={(e) => {
								const timeValue = e.target.value;
								const dateValue = (
									document.getElementById(
										"private_view_start_date",
									) as HTMLInputElement
								).value;
								(
									document.getElementById(
										"private_view_start_date_hidden",
									) as HTMLInputElement
								).value = combineDateTime(dateValue, timeValue);
							}}
						/>
					</label>
					<input
						type="hidden"
						name="private_view_start_date"
						id="private_view_start_date_hidden"
						defaultValue={startDate ? new Date(startDate).toISOString() : ""}
					/>
				</div>
				<div style={{ flex: 1 }}>
					<label style={labelStyle}>
						<span style={labelTextStyle}>End Date</span>
						<input
							aria-label="Private view end date"
							defaultValue={formatDateForInput(endDate)}
							id="private_view_end_date"
							type="date"
							style={inputStyle}
							onChange={(e) => {
								const dateValue = e.target.value;
								const timeValue = (
									document.getElementById(
										"private_view_end_time",
									) as HTMLInputElement
								).value;
								(
									document.getElementById(
										"private_view_end_date_hidden",
									) as HTMLInputElement
								).value = combineDateTime(dateValue, timeValue);
							}}
						/>
					</label>
					<label style={{ ...labelStyle, marginTop: "0.5rem" }}>
						<span style={labelTextStyle}>End Time</span>
						<input
							aria-label="Private view end time"
							defaultValue={formatTimeForInput(endDate)}
							id="private_view_end_time"
							type="time"
							style={inputStyle}
							onChange={(e) => {
								const timeValue = e.target.value;
								const dateValue = (
									document.getElementById(
										"private_view_end_date",
									) as HTMLInputElement
								).value;
								(
									document.getElementById(
										"private_view_end_date_hidden",
									) as HTMLInputElement
								).value = combineDateTime(dateValue, timeValue);
							}}
						/>
					</label>
					<input
						type="hidden"
						name="private_view_end_date"
						id="private_view_end_date_hidden"
						defaultValue={endDate ? new Date(endDate).toISOString() : ""}
					/>
				</div>
			</div>
		</div>
	);
}
