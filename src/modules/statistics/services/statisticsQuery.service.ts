import { FastifyInstance, FastifyRequest } from "fastify";
import {
  buildSelectColumns,
  buildWhereClause,
  buildGroupBy,
} from "../utils/sqlHelpers";
import { aliasMap } from "../utils/filterMap";
import { StatisticsQueryBody } from "../schemas/statisticsQuery.schema";
import { convertUtcToLocalHour } from "../utils/convertUtcHourToLocal";

export type Row = {
  date: string;
  hour?: string;
  [key: string]: any;
};

export const getStatistics = async (
  fastify: FastifyInstance,
  request: FastifyRequest
): Promise<Row[]> => {
  const { date, filters, timezone } = request.body as StatisticsQueryBody;

  const { whereClause, withHours } = buildWhereClause(date, filters);
  const selectColumns = buildSelectColumns(filters, withHours);
  const groupBy = buildGroupBy(withHours);

  const query = `
    SELECT ${selectColumns.join(", ")}
    FROM ${fastify.config.CLICKHOUSE_DB}.${fastify.config.CLICKHOUSE_TABLE_NAME}
    ${whereClause}
    GROUP BY ${groupBy.join(", ")}
    ORDER BY ${groupBy.join(", ")}
  `;

  const result = await fastify.clickhouse.query({ query });
  const raw = (await result.json()) as { data: Row[] };

  if (filters["Hour"]?.includes("all")) {
    const hours = Array.from(
      { length: 24 },
      (_, i) => `${i.toString().padStart(2, "0")}:00`
    );

    return hours.map((localHour) => {
      const row = raw.data.find(
        (r) =>
          r.hour && convertUtcToLocalHour(date, r.hour, timezone) === localHour
      );

      const resultRow: Row = { date, hour: localHour };
      for (const key of Object.keys(filters)) {
        if (key === "Hour") continue;
        const alias = aliasMap[key];
        resultRow[alias] =
          alias === "maxCpmWinner" || alias === "topWinnerByCount"
            ? row?.[alias] ?? "-"
            : row?.[alias] ?? 0;
      }

      return resultRow;
    });
  }

  return raw.data.map((r) => {
    const localHour = r.hour
      ? convertUtcToLocalHour(date, r.hour, timezone)
      : undefined;
    const resultRow: Row = { ...r, hour: localHour };

    if (filters["Max CPM Winner"] && !resultRow["maxCpmWinner"])
      resultRow["maxCpmWinner"] = "-";
    if (filters["Top Winner by Count"] && !resultRow["topWinnerByCount"])
      resultRow["topWinnerByCount"] = "-";

    return resultRow;
  });
};
