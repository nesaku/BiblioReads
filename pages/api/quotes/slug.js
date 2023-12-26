const cheerio = require("cheerio");

const QuotesSlugScraper = async (req, res) => {
  if (req.method === "POST") {
    const scrapeURL = req.body.queryURL.replaceAll(",", "/").split("&")[0];
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
      const name = $("div.mainContent > div.mainContentFloat > h1").text();
      const quotes = $(
        "div.mainContent > div.mainContentFloat > div.leftContainer > div.quote.mediumText"
      )
        .map((i, el) => {
          const $el = $(el);
          const imgURL = $el
            .find("div.quoteDetails > a.leftAlignedImage")
            .attr("href");
          const img = $el
            .find("div.quoteDetails > a.leftAlignedImage > img")
            .attr("src");
          const imgAlt = $el
            .find("div.quoteDetails > a.leftAlignedImage > img")
            .attr("alt");
          const text = $el
            .find("div.quoteDetails > div.quoteText")
            .text()
            .split(" ―")[0];
          const author = $el
            .find("div.quoteDetails > div.quoteText > span.authorOrTitle")
            .text();
          const book = $el
            .find("div.quoteDetails > div.quoteText > span > a.authorOrTitle")
            .text();
          const bookURL = $el
            .find("div.quoteDetails > div.quoteText > span > a.authorOrTitle")
            .attr("href");
          const likes = $el
            .find(
              "div.quoteDetails > div.quoteFooter > div.right > a.smallText"
            )
            .text();
          const id = i + 1;
          return {
            id: id,
            imgURL: imgURL,
            img: img,
            imgAlt: imgAlt,
            text: text,
            author: author,
            book: book,
            bookURL: bookURL,
            likes: likes,
          };
        })
        .toArray();
      const popularTags = $(
        "div.bigBoxContent.containerWithHeaderContent > ul.listTagsTwoColumn > li.greyText"
      )
        .map((i, el) => {
          const $el = $(el);
          const url = $el.find("a.gr-hyperlink").attr("href");
          const name = $el.find("a.gr-hyperlink").text();
          const id = i + 1;
          return {
            id: id,
            url: url,
            name: name,
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
        name: name,
        quotes: quotes,
        popularTags: popularTags,
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

export default QuotesSlugScraper;
