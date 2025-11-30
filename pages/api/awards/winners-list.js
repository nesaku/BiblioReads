import { env } from "next-runtime-env";

const cheerio = require("cheerio");

const WinnersList = async (req, res) => {
  if (req.method === "POST") {
    const scrapeURL = req.body.queryURL.split("?")[0];
    try {
      const response = await fetch(`${scrapeURL}`, {
        method: "GET",
        headers: new Headers({
          "User-Agent":
            env("NEXT_PUBLIC_USER_AGENT") ||
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        }),
      });
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const genres = $("div.categoryContainer > div.category")
        .map((i, el) => {
          const $el = $(el);
          const name = $el.find("a > h4").text();
          const url = $el.find("a").attr("href");
          // Match both regular and audio books
          const $winnerIMG = $el.find(
            "div[class^='category__winnerImageContainer'] img"
          );
          const cover = $winnerIMG.attr("src");
          const title = $winnerIMG.attr("alt");
          const id = i + 1;
          return {
            id: id,
            name: name,
            url: url,
            cover: cover,
            title: title,
          };
        })
        .toArray();
      const lastScraped = new Date().toISOString();
      res.statusCode = 200;
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=600, stale-while-revalidate=1800"
      );
      return res.json({
        status: "Received",
        source: "https://github.com/nesaku/biblioreads",
        scrapeURL: scrapeURL,
        genres: genres,
        lastScraped: lastScraped,
      });
    } catch (error) {
      res.statusCode = 404;
      console.error("An error has occurred with the scraper.");
      return res.json({
        status: "Error - Invalid Query",
        scrapeURL: scrapeURL,
      });
    }
  } else {
    res.statusCode = 405;
    return res.json({
      status: "Error 405 - Method Not Allowed",
    });
  }
};

export default WinnersList;
