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
            "User-Agent":
              process.env.NEXT_PUBLIC_USER_AGENT ||
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
          }),
        }
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
        "public, s-maxage=600, stale-while-revalidate=1800"
      );
      return res.json({
        status: "Received",
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
