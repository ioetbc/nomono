import { format } from "date-fns";

export const formatDateForInput = (dateString: Date | null) => {
	if (!dateString) return "";
	return dateString.toISOString().split("T")[0];
};

export const formatTimeForInput = (dateString: Date | null) => {
	if (!dateString) return "";
	const date = new Date(dateString);
	// Format time as HH:MM
	return format(date, "HH:mm");
};

export const combineDateTime = (dateValue: string, timeValue: string) => {
	if (!dateValue) return "";
	const time = timeValue || "00:00";
	return `${dateValue}T${time}`;
};

export const formatDateWithTime = (dateString: Date | null) => {
	if (!dateString) return "Not set";
	return new Date(dateString).toLocaleString("en-GB", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

export const formatDate = (dateString: Date | null) => {
	if (!dateString) return "Not set";
	return new Date(dateString).toLocaleDateString("en-GB", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};
