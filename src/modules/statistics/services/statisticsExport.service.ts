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
  const { format } = request.body as StatisticsExportBody;
  const data = await getStatistics(fastify, request);

  if (data.length === 0) return null;

  if (format === "csv") {
    const fields = Object.keys(data[0]);
    const parser = new Parser({ fields, transforms: [transformForCsv] });
    return parser.parse(data);
  }

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Statistics");
  sheet.columns = Object.keys(data[0]).map((key) => ({ header: key, key }));
  sheet.addRows(data);

  const buffer = await workbook.xlsx.writeBuffer();
  return new Uint8Array(buffer);
};
