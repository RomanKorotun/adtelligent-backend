import { FastifyInstance, FastifyRequest } from "fastify";
import { Parser } from "json2csv";
import ExcelJS from "exceljs";
import { getStatistics } from "./statisticsQuery.service";
import { StatisticsExportBody } from "../schemas/statisticsExport.schema";
import { transformForCsv } from "../utils/transformForCsv";

export const exportStatisticsService = async (
  fastify: FastifyInstance,
  request: FastifyRequest
): Promise<string | Uint8Array | null> => {
  const { format, filters } = request.body as StatisticsExportBody;

  const data = await getStatistics(fastify, request);
  if (data.length === 0) return null;

  const keys = Object.keys(data[0]).filter(
    (key) => key !== "hour" || filters["Hour"]?.includes("all")
  );

  if (format === "csv") {
    const parser = new Parser({ fields: keys, transforms: [transformForCsv] });
    return parser.parse(data);
  }

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Statistics");
  sheet.columns = keys.map((key) => ({ header: key, key }));
  sheet.addRows(data);

  const buffer = await workbook.xlsx.writeBuffer();
  return new Uint8Array(buffer);
};
