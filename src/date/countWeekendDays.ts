export const countWeekendDays = (startDate: Date, endDate: Date): number => {
  const localStart = new Date(startDate);
  const localEnd = new Date(endDate);
  let totalWeekends = 0;
  for (let i = localStart; i <= localEnd; i.setDate(i.getDate() + 1)) {
    if (i.getDay() == 0 || i.getDay() == 6) totalWeekends++;
  }
  return totalWeekends;
};
