const cheerio = require("cheerio");

const SimilarScraper = async (req, res) => {
  if (req.method === "POST") {
    const scrapeURL = req.body.queryURL.split("&")[0];
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
      const title = $("h1.gr-h1.gr-h1--serif").text();
      const books = $(
        'div[data-react-class="ReactComponents.SimilarBooksList"] > div.listWithDividers > div.listWithDividers__item'
      )
        .map((i, el) => {
          const $el = $(el);
          const cover = $el
            .find(
              "div.responsiveBook > div.objectLockupContent > div.objectLockupContent__media > div.responsiveBook__media > a > img"
            )
            .attr("src");

          const title = $el
            .find(
              "div.responsiveBook > div.objectLockupContent > div.u-paddingBottomXSmall > a > span[itemprop = 'name']"
            )
            .text();
          const bookURL = $el
            .find(
              "div.responsiveBook > div.objectLockupContent > div.u-paddingBottomXSmall > a"
            )
            .attr("href");
          const rating = $el
            .find(
              "div.responsiveBook > div.objectLockupContent > div.u-paddingBottomXSmall > div.communityRating > span"
            )
            .text();
          const id = i + 1;
          return {
            id: id,
            cover: cover,
            title: title,
            bookURL: bookURL,
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

export default SimilarScraper;
