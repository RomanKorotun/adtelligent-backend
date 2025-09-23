import axios from "axios";
import * as cheerio from "cheerio";

export const parseBbcArticle = async (url: string) => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const title = $("h1").text().trim();

  const mainImage =
    $('meta[property="og:image"]').attr("content")?.trim() || "";

  const paragraphs = $("article p")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter((text) => text.length > 0);

  const description = paragraphs
    .join(" ")
    .replace(/\s+/g, " ")
    .replace(/\\+/g, "")
    .replace(/["'«»„“”]/g, "")
    .trim();

  const isoDate =
    $('meta[property="article:published_time"]').attr("content")?.trim() ||
    $("time").attr("datetime")?.trim() ||
    $('meta[name="OriginalPublicationDate"]').attr("content")?.trim() ||
    "";

  return {
    title,
    mainImage,
    description,
    isoDate,
  };
};
