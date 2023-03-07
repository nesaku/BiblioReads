const cheerio = require("cheerio");

const QuotesHomeScraper = async (req, res) => {
  if (req.method === "POST") {
    const scrapeURL = req.body.queryURL.replaceAll(",", "/").split("&")[0];
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
      const title = $("div.mainContent > div.mainContentFloat > h1").text();
      const quotes = $(
        "div.mainContent > div.mainContentFloat > div.leftContainer > div.quotes > div.quote"
      )
        .map((i, el) => {
          const $el = $(el);
          const text = $el.find("div.quoteDetails > div.quoteText").text();
          const imgURL = $el
            .find(" div.quoteDetails > a.leftAlignedImage")
            .attr("href");
          const img = $el
            .find(" div.quoteDetails > a.leftAlignedImage > img")
            .attr("src");
          const imgAlt = $el
            .find(" div.quoteDetails > a.leftAlignedImage > img")
            .attr("alt");
          const likes = $el
            .find(
              " div.quoteDetails > div.quoteFooter > div.right > a.smallText"
            )
            .text();
          const id = i + 1;
          return {
            id: id,
            imgURL: imgURL,
            img: img,
            imgAlt: imgAlt,
            text: text,
            likes: likes,
          };
        })
        .toArray();

      const lastScraped = new Date().toISOString();
      res.statusCode = 200;
      return res.json({
        status: "Recieved",
        source: "https://github.com/nesaku/biblioreads",
        scrapeURL: scrapeURL,
        title: title,
        quotes: quotes,
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
  }
};

export default QuotesHomeScraper;
