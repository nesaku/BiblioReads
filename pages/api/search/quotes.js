import { getUserAgent } from "@/utils/userAgent";
import { apiVersion as version } from "@/utils/version";

const cheerio = require("cheerio");

const SearchScraper = async (req, res) => {
  if (req.method === "POST") {
    const scrapeURL = req.body.queryURL.split("&")[0];

    try {
      const response = await fetch(
        `${scrapeURL}&search[source]=goodreads&search_type=quotes&tab=quotes`,
        {
          method: "GET",
          headers: new Headers({
            "User-Agent": getUserAgent(),
          }),
        },
      );
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const numberOfResults = $("h3.searchSubNavContainer").text();
      const quotes = $("table.tableList > tbody > tr")
        .map((i, el) => {
          const $el = $(el);
          const img = $el.find("tr > td > a > img").attr("src");
          const imgAlt = $el.find("tr > td > a > img").attr("alt");
          const rawText = $el.find("td:nth-child(2) > div.quoteText").text();
          const text = $el.find("td:nth-child(2) > div.quoteText").html();
          const likes = $el.find("td:nth-child(2) > a.actionLinkLite").text();
          const id = i + 1;
          return {
            id: id,
            img: img,
            imgAlt: imgAlt,
            rawText: rawText,
            text: text,
            likes: likes,
          };
        })
        .toArray();
      const lastScraped = new Date().toISOString();
      res.statusCode = 200;
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=600, stale-while-revalidate=1800",
      );
      return res.json({
        status: "Received",
        version: version,
        source: "https://github.com/nesaku/biblioreads",
        scrapeURL: scrapeURL,
        searchType: "quotes",
        numberOfResults: numberOfResults,
        quotes: quotes,
        lastScraped: lastScraped,
      });
    } catch (error) {
      res.statusCode = 404;
      console.error("An error has occurred with the scraper.");
      return res.json({
        status: "Error - Invalid Query",
        version: version,
        scrapeURL: scrapeURL,
      });
    }
  } else {
    res.statusCode = 405;
    return res.json({
      status: "Error 405 - Method Not Allowed",
      version: version,
    });
  }
};

export default SearchScraper;
