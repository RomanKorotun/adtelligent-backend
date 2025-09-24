import { parseBbcArticle } from "./parseBbcParser";
import { parseUnianArticle } from "./unianParser";

export const parseHtmlArticle = async (url: string) => {
  if (url.includes("unian.ua")) {
    return await parseUnianArticle(url);
  } else if (url.includes("bbc.com")) {
    return await parseBbcArticle(url);
  }
};
