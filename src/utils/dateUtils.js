//Utility function to convert the date into "yyyy-MM-dd" format
// export const formatDateForInput = (isoDate) => {
//   if (!isoDate) return "";
//   const date = new Date(isoDate);
//   return date.toISOString().split("T")[0];
// };

// Ensure the value exists before formatting it
export const formatDateForInput = (date) => {
  if (!date) return ""; // Return empty string if the date is undefined
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return ""; // If not a valid date, return empty
  return parsedDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD
};
