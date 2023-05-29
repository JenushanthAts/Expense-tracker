export const isValidDate = (dateString) => {
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(dateFormat)) {
    return false;
  }
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};
export const isDateInCurrentMonth = (date) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const targetYear = date.getFullYear();
  const targetMonth = date.getMonth();
  return currentYear === targetYear && currentMonth === targetMonth;
};
