import { filterMap } from "./filterMap";

export const buildSelectColumns = (
  filters: Record<string, string[]>,
  withHours: boolean
) => {
  const selectColumns: string[] = ["toDate(time) AS date"];
  if (withHours) selectColumns.push("formatDateTime(time, '%H:00') AS hour");

  for (const key of Object.keys(filters)) {
    if (key === "Hour") continue;
    if (filterMap[key]) {
      selectColumns.push(filterMap[key]());
    }
  }

  return selectColumns;
};

export const buildWhereClause = (
  date: string,
  filters: Record<string, string[]>
) => {
  const conditions: string[] = [`toDate(time) = '${date}'`];
  let withHours = false;

  if (filters["Hour"]) {
    const hours = filters["Hour"];
    if (hours.includes("all")) {
      withHours = true;
    } else {
      const quotedHours = hours.map((h) => `'${h}'`).join(", ");
      conditions.push(`formatDateTime(time, '%H:00') IN (${quotedHours})`);
      withHours = true;
    }
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";
  return { whereClause, withHours };
};

export const buildGroupBy = (withHours: boolean) => {
  const groupBy = ["date"];
  if (withHours) groupBy.push("hour");
  return groupBy;
};
