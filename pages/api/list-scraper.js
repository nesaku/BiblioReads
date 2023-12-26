const cheerio = require("cheerio");

const ListScraper = async (req, res) => {
  if (req.method === "POST") {
    // URL might be a redirect
    const scrapeURL = req.body.queryURL
      .split("&")[0]
      .replace("https://", "http://");
    try {
      const response = await fetch(`${scrapeURL}`, {
        method: "GET",
        headers: new Headers({
          "User-Agent":
            process.env.NEXT_PUBLIC_USER_AGENT ||
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        }),
      });

      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const title = $("div.leftContainer > h1").text();
      const desc = $("div.u-paddingBottomMedium.mediumText").html();
      const books = $("tbody > tr")
        .map((i, el) => {
          const $el = $(el);
          const cover = $el
            .find("td > div.js-tooltipTrigger.tooltipTrigger > a > img")
            .attr("src");
          const title = $el.find("td > a > span").text();
          const bookURL = $el.find("td > a").attr("href");
          const author = $el
            .find("td > span[itemprop = 'author'] > div > a > span")
            .text();
          const authorURL = $el
            .find("td > span[itemprop = 'author'] > div > a")
            .attr("href");
          const rating = $el
            .find("td > div > span.greyText.smallText.uitext > span")
            .text();
          const id = i + 1;
          return {
            id: id,
            cover: cover,
            title: title,
            bookURL: bookURL,
            author: author,
            authorURL: authorURL,
            rating: rating,
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
        title: title,
        desc: desc,
        books: books,
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

export default ListScraper;
