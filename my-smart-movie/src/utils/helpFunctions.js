export const range = (start, end) => {
  // Create an array with range pagination values based on a start and end value
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

export const formatDate = (inputDate) => {
  // Split the input date string into day, month, and year
  const [year, month, day] = inputDate.split("-");
  return `${day}/${month}/${year}`;
};

export const  roundToOneDecimal = (number) => {
  return Number(number.toFixed(1));
}