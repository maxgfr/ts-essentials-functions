export const formatDate = (date: Date, withHour = false): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return withHour
    ? `${year}-${month}-${day} ${hour}:${minute}:${second}`
    : `${year}-${month}-${day}`;
};
