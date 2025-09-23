import axios from "axios";
import * as cheerio from "cheerio";

export const parseUnianArticle = async (url: string) => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const title = $("h1").text().trim();
  const mainImage =
    $('meta[property="og:image"]').attr("content")?.trim() || "";

  const paragraphs = $("p")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter((text) => text.length > 0);

  const description = paragraphs.join(" ").trim();

  const rawDate = $(".article__info-item.time").text().trim();

  const monthMap: Record<string, string> = {
    січня: "01",
    лютого: "02",
    березня: "03",
    квітня: "04",
    травня: "05",
    червня: "06",
    липня: "07",
    серпня: "08",
    вересня: "09",
    жовтня: "10",
    листопада: "11",
    грудня: "12",
  };

  let isoDate = "";

  if (rawDate) {
    const match = rawDate.match(/(\d{1,2}) (\w+) (\d{4}), (\d{2}):(\d{2})/);
    if (match) {
      const [_, day, monthName, year, hour, minute] = match;
      const month = monthMap[monthName];
      if (month) {
        const dateStr = `${year}-${month}-${day.padStart(
          2,
          "0"
        )}T${hour}:${minute}:00+03:00`;
        const parsed = new Date(dateStr);
        if (!isNaN(parsed.getTime())) {
          isoDate = parsed.toISOString();
        }
      }
    }
  }

  if (!isoDate) {
    isoDate = new Date().toISOString();
  }

  return {
    title,
    mainImage,
    description,
    isoDate,
  };
};
