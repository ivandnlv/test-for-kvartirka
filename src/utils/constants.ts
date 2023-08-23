export const getDaysInMonth = (month: number) => {
  const year = new Date().getFullYear();
  let isLeapYear = false;

  if (year % 4 === 0) {
    isLeapYear = true;
  }

  const monthDays = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  return monthDays[month];
};
