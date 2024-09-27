/**
 * Converts an ISO date string to "MM/DD/YYYY" format.
 * @param {string} isoDate - The ISO date string to be formatted.
 * @returns {string} - The formatted date string in "MM/DD/YYYY" format.
 */
export const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US"); // Format as "MM/DD/YYYY"
};
