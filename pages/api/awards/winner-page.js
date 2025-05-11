import { env } from "next-runtime-env";

const cheerio = require("cheerio");

const WinnerPage = async (req, res) => {
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
      const genre = $("div.gcaMastheader").text();
      const cover = $("div.miniBookCover > span.cover > a > img").attr("src");
      const url = $("div.miniBookCover > span.cover > a ")
        .attr("href")
        .split("?")[0]; //Split on the frontend
      const title = $(
        "div.miniBookContent > div.u-marginTopXSmall > a.winningTitle"
      ).text();

      const author = $(
        "div.miniBookContent > div.u-marginTopXSmall > div.gcaAuthor > span[itemprop='author'] > div.authorName__container > a.authorName"
      )
        .map((i, el) => {
          const $el = $(el);
          const name = $el.find("span[itemprop='name']").text();
          const url = $el
            .attr("href")
            .replace("https://www.goodreads.com", "")
            .split("?")[0];
          const id = i + 1;
          return {
            id: id,
            name: name,
            url: url,
          };
        })
        .toArray();

      const desc = $("div.miniBookContent > div.gcaBookDescription").text();
      const longDesc = $(
        "div.miniBookContent > div.gcaBookDescription > span[style='display:none']"
      ).text();
      const numberOfVotes = $(
        "div.miniBookContent > div.gcaWinnerHeader > span.greyText.gcaNumVotes"
      ).text();

      const nominees = $("div.pollContents > div.pollAnswer")
        .map((i, el) => {
          const $el = $(el);
          const url = $el
            .find(
              "div.answerWrapper > div.tooltipTrigger > a.pollAnswer__bookLink"
            )
            .attr("href")
            .split("?")[0];
          const numberOfVotes = $el.find("strong.result").text();
          const cover = $el
            .find(
              "div.answerWrapper > div.tooltipTrigger > a.pollAnswer__bookLink > img"
            )
            .attr("src");
          const title = $el
            .find(
              "div.answerWrapper > div.tooltipTrigger > a.pollAnswer__bookLink > img"
            )
            .attr("alt");
          const id = i + 1;
          return {
            id: id,
            url: url,
            numberOfVotes: numberOfVotes,
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
        genre: genre,
        cover: cover,
        url: url,
        title: title,
        author: author,
        desc: desc,
        longDesc: longDesc,
        numberOfVotes: numberOfVotes,
        nominees: nominees,
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

export default WinnerPage;
