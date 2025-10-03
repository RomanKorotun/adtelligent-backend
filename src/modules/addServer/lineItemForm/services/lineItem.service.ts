import { FastifyInstance, FastifyRequest } from "fastify";
import path from "path";
import fs from "fs";
import { pipeline } from "stream/promises";
import { createLineItem } from "../repositories/lineItemForm.repository";
import { LineItem } from "../types/lineItem.types";

export const addLineItem = async (
  fastify: FastifyInstance,
  request: FastifyRequest
) => {
  const fields: Record<string, string> = {};
  let creativeFile: any = null;

  for await (const part of request.parts()) {
    if (part.type === "file" && part.fieldname === "creativeFile") {
      creativeFile = part;
    } else if (part.type === "field" && typeof part.value === "string") {
      fields[part.fieldname] = part.value.trim();
    }
  }

  if (!creativeFile?.file) {
    throw fastify.httpErrors.badRequest("creativeFile was not uploaded");
  }

  const uploadDir = path.join(process.cwd(), "upload");
  fs.mkdirSync(uploadDir, { recursive: true });

  const ext = path.extname(creativeFile.filename);
  const uniqueName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}${ext}`;
  const filePath = path.join(uploadDir, uniqueName);

  await pipeline(creativeFile.file, fs.createWriteStream(filePath));

  const { width, height, minCPM, maxCPM, geo, adType, frequency } = fields;

  const lineItemData: LineItem = {
    width: parseInt(width),
    height: parseInt(height),
    minCPM: parseFloat(minCPM),
    maxCPM: parseFloat(maxCPM),
    geo: geo,
    adType: adType,
    frequency: frequency,
    creativePath: `/upload/${uniqueName}`,
  };

  await createLineItem(fastify.prisma, lineItemData);
};
