const cheerio = require("cheerio");

const scraper = async (req, res) => {
  if (req.method === "POST") {
    const scrapeURL = req.body.queryURL;

    try {
      {
        /*const response = await fetch(`${scrapeURL}`);*/
      }
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
      const cover = $("#coverImage").attr("src");
      const coverAltText = $("#coverImage").attr("alt");
      const series = $("#bookSeries").text();
      const title = $("#bookTitle").text();
      const author = $("#bookAuthors")
        .text()
        .replace("by", "")
        .replace("(Goodreads Author)", "");
      const desc = $("#description").text().replace("...more", "");
      const rating = $("*[itemprop = 'ratingValue']").text();
      const ratingCount = $(
        "#reviewControls > div.reviewControls--left.greyText"
      )
        .text()
        .replace("·", "");
      const publishDate = $("#details > div:nth-child(2)").text();
      const isbn = $("*[itemprop = 'isbn']").text();
      const lang = $("*[itemprop = 'inLanguage']").text();
      const lastScraped = new Date().toISOString();

      res.statusCode = 200;
      return res.json({
        scrapeURL: scrapeURL,
        cover: cover,
        coverAltText: coverAltText,
        series: series,
        title: title,
        author: author,
        desc: desc,
        rating: rating,
        ratingCount: ratingCount,
        publishDate: publishDate,
        isbn: isbn,
        lang: lang,
        lastScraped: lastScraped,
      });
    } catch (e) {
      res.statusCode = 404;
      return res.json({
        scrapeURL: scrapeURL,
        error: `${scrapeURL} Not Found. An Example Of A Valid Query Is: https://www.goodreads.com/book/show/5907.The_Hobbit`,
      });
    }
  }
};

export default scraper;
