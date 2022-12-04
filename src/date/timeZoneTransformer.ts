export const timeZoneTransformer = (
  stringDate: string,
  timeZone = 'Europe/Paris',
) => {
  const now = new Date();
  const serverDate = new Date(stringDate);
  const utcDate = new Date(
    Date.UTC(
      serverDate.getFullYear(),
      serverDate.getMonth(),
      serverDate.getDate(),
      serverDate.getHours(),
      serverDate.getMinutes(),
      serverDate.getSeconds(),
    ),
  );
  const invdate = new Date(
    serverDate.toLocaleString('en-US', {
      timeZone,
    }),
  );
  const diff = now.getTime() - invdate.getTime();
  const adjustedDate = new Date(now.getTime() - diff);
  return {
    toUtc: utcDate,
    fromUtc: adjustedDate,
  };
};
