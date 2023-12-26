const cheerio = require("cheerio");

const EditionScraper = async (req, res) => {
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
      const book = $("div.mainContentFloat > h1 > a").text();
      const bookURL = $("div.mainContentFloat > h1 > a").attr("href");
      const author = $("div.leftContainer.workEditions > h2 > a").text();
      const authorURL = $("div.leftContainer.workEditions > h2 > a").attr(
        "href"
      );
      const firstPublished = $(
        "div.leftContainer.workEditions > h2 > span.originalPubDate"
      ).text();
      const editions = $(
        "div.leftContainer.workEditions > div.elementList.clearFix"
      )
        .map((i, el) => {
          const $el = $(el);
          const cover = $el.find("div.leftAlignedImage > a > img").attr("src");
          const title = $el.find("div.editionData > div > a.bookTitle").text();

          const url = $el
            .find("div.editionData > div > a.bookTitle")
            .attr("href");

          const publishDate = $el
            .find("div.editionData > div:nth-child(2)")
            .text();

          const editionInfo = $el
            .find("div.editionData > div:nth-child(3)")
            .text();

          const rating = $el
            .find(
              'div.editionData > div.moreDetails > div:contains("Average rating:") > div.dataValue'
            )
            .text();

          const ISBN = $el
            .find(
              'div.editionData > div.moreDetails > div:contains("ISBN:") > div.dataValue'
            )
            .text();

          const ASIN = $el
            .find(
              'div.editionData > div.moreDetails > div:contains("ASIN:") > div.dataValue'
            )
            .text();

          const editionLanguage = $el
            .find(
              'div.editionData > div.moreDetails > div:contains("Edition language:") > div.dataValue'
            )
            .text();

          const id = i + 1;
          return {
            id: id,
            cover: cover,
            title: title,
            url: url,
            publishDate: publishDate,
            editionInfo: editionInfo,
            rating: rating,
            ISBN: ISBN,
            ASIN: ASIN,
            editionLanguage: editionLanguage,
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
        book: book,
        bookURL: bookURL,
        author: author,
        authorURL: authorURL,
        firstPublished: firstPublished,
        editions: editions,
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

export default EditionScraper;
