export const convertUtcToLocalHour = (
  date: string,
  hour: string,
  timezone: string
): string => {
  const [year, month, day] = date.split("-").map(Number);
  const [hourPart, minutePart] = hour.split(":").map(Number);

  const utcDate = new Date(
    Date.UTC(year, month - 1, day, hourPart, minutePart)
  );
  const localDate = new Date(
    utcDate.toLocaleString("en-US", { timeZone: timezone })
  );

  const localHour = localDate.getHours().toString().padStart(2, "0");
  return `${localHour}:00`;
};
