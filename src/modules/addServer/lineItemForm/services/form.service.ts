import fs from "fs/promises";
import path from "path";

export const readFormHtml = async (): Promise<string> => {
  const basePath =
    process.env.NODE_ENV === "production"
      ? path.join(process.cwd(), "build/modules/addServer/lineItemForm/pages")
      : path.join(__dirname, "../pages");

  const htmlPath = path.join(basePath, "form.html");
  const html = await fs.readFile(htmlPath, "utf-8");
  return html;
};
