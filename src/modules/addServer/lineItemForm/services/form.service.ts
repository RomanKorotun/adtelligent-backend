import fs from "fs/promises";
import path from "path";

export const readFormHtml = async (): Promise<string> => {
  const htmlPath = path.join(__dirname, "../pages/form.html");
  const html = await fs.readFile(htmlPath, "utf-8");
  return html;
};
