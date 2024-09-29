//Utility function to convert the date into "yyyy-MM-dd" format
export const formatDateForInput = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toISOString().split("T")[0];
};
