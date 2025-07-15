/**
 * Safely formats an ISO date string to a localized date/time string
 * @param isoDateString - ISO date string (e.g., "2025-07-09T19:24:09Z") or undefined
 * @returns Formatted date string or "N/A" if parsing fails or input is undefined
 */
export const formatDate = (isoDateString?: string): string => {
  if (!isoDateString) {
    return "N/A";
  }

  try {
    const date = new Date(isoDateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

/**
 * Formats date to just show date without time
 * @param isoDateString - ISO date string or undefined
 * @returns Formatted date string (MM/DD/YYYY) or "N/A"
 */
export const formatDateOnly = (isoDateString?: string): string => {
  if (!isoDateString) {
    return "N/A";
  }

  try {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return date.toLocaleDateString("en-US");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};
