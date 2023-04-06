const cheerio = require("cheerio");

const SearchScraper = async (req, res) => {
  if (req.method === "POST") {
    const scrapeURL = req.body.queryURL.split("&")[0];

    try {
      const response = await fetch(`${scrapeURL}`, {
        method: "GET",
        headers: new Headers({
          "User-Agent":
            process.env.NEXT_PUBLIC_USER_AGENT ||
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
        }),
      });
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const numberOfResults = $(".leftContainer > h3").text();
      const result = $("table > tbody > tr")
        .map((i, el) => {
          const $el = $(el);
          const cover = $el
            .find("tr > td > a > img")
            .attr("src")
            .replace("._SX50_SY75_", "")
            .replace("._SY75_", "")
            .replace("._SX50_", "");

          const title = $el.find("tr > td:nth-child(2) > a > span").text();
          const bookURL = $el.find("tr > td:nth-child(2) > a").attr("href");
          const author = $el
            .find(
              "tr > td:nth-child(2) > span[itemprop = 'author'] > div > a > span[itemprop = 'name']"
            )
            .html();
          const authorURL = $el
            .find("tr > td:nth-child(2) > span[itemprop = 'author'] > div > a")
            .attr("href")
            .replace("https://www.goodreads.com", "")
            .split("?")[0];
          const rating = $el
            .find(
              "tr > td:nth-child(2) > div > span.greyText.smallText.uitext > span.minirating"
            )
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
      return res.json({
        status: "Recieved",
        source: "https://github.com/nesaku/biblioreads",
        scrapeURL: scrapeURL,
        searchType: "books",
        numberOfResults: numberOfResults,
        result: result,
        lastScraped: lastScraped,
      });
    } catch (error) {
      res.statusCode = 404;
      console.error("An Error Has Occured");
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

export default SearchScraper;
