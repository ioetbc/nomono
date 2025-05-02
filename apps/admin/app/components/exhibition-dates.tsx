import { inputStyle, labelStyle, labelTextStyle } from "./image-editor";

interface ExhibitionDatesProps {
	startDate?: string;
	endDate?: string;
}

export function ExhibitionDates({ startDate, endDate }: ExhibitionDatesProps) {
	// Helper function to format date for input fields
	const formatDateForInput = (dateString?: string) => {
		if (!dateString) return "";
		return new Date(dateString).toISOString().split("T")[0];
	};

	return (
		<div
			style={{
				padding: "1.5rem",
				borderRadius: "8px",
				border: "1px solid #e2e8f0",
				backgroundColor: "white",
			}}
		>
			<h2
				style={{
					fontSize: "1.25rem",
					marginBottom: "1rem",
					fontWeight: 600,
					color: "#2d3748",
				}}
			>
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
