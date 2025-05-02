import { format } from "date-fns";

export const formatDateForInput = (dateString?: Date) => {
	if (!dateString) return "";
	return dateString.toISOString().split("T")[0];
};

export const formatTimeForInput = (dateString?: Date) => {
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
