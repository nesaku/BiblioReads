const cheerio = require("cheerio");

const AuthorScraper = async (req, res) => {
  if (req.method === "POST") {
    const scrapeURL = req.body.queryURL.split("?")[0];
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
      const image = $(
        "div[itemtype = 'http://schema.org/Person'] > div > a > img"
      ).attr("src");
      const name = $("h1.authorName > span").text();
      const website = $("div.dataItem > a[itemprop = 'url']").text();
      const genre = $("div.dataItem > a[href*= '/genres/']")
        .map((i, el) => $(el).text())
        .get();
      const influences = $("div.dataItem > span a[href*= '/author/']")
        .map((i, el) => {
          const $el = $(el);
          const author = $el.text();
          const url = $el.attr("href");
          const id = i + 1;
          return {
            id: id,
            author: author,
            url: url,
          };
        })
        .toArray();
      const birthDate = $(
        "div.rightContainer > div[itemprop = 'birthDate']"
      ).text();
      const deathDate = $(
        "div.rightContainer > div[itemprop = 'deathDate']"
      ).text();
      const desc = $(".aboutAuthorInfo > span").html();
      const books = $("table.stacked> tbody > tr")
        .map((i, el) => {
          const $el = $(el);
          const cover = $el.find("td > a > img").attr("src");
          const title = $el.find("td:nth-child(2) > a > span").text();
          const url = $el.find("td:nth-child(2) > a").attr("href");
          const rating = $el
            .find("td:nth-child(2) > div > span > span")
            .text()
            .replace("—", "From")
            .replace(",", "");
          const publishDate = $el.find("td:nth-child(2) > div > span").text();
          const id = i + 1;
          return {
            id: id,
            cover: cover,
            title: title,
            url: url,
            rating: rating,
            publishDate: publishDate,
          };
        })
        .toArray();

      const series = $(
        ".bigBoxBody > div > div[itemtype = 'http://schema.org/BookSeries']"
      )
        .map((i, el) => {
          const $el = $(el);
          const cover = $el.find("div.seriesCovers > a > img").attr("src");
          const title = $el
            .find("div.seriesDesc > span[itemprop = 'name'] > a")
            .text();
          const seriesURL = $el
            .find("div.seriesDesc > span[itemprop = 'name'] > a")
            .attr("href");
          const author = $el
            .find("div.seriesDesc > span[itemprop = 'author'] > div > a > span")
            .html();
          const authorURL = $el
            .find("div.seriesDesc > span[itemprop = 'author'] > div > a")
            .attr("href")
            .replaceAll("https://www.goodreads.com", "");
          const rating = $el
            .find("div.seriesDesc > span.greyText.smallText.uitext > span")
            .text();
          const id = i + 1;

          return {
            id: id,
            cover: cover,
            title: title,
            seriesURL: seriesURL,
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
        image: image,
        name: name,
        website: website,
        genre: genre,
        influences: influences,
        birthDate: birthDate,
        deathDate: deathDate,
        desc: desc,
        books: books,
        series: series,
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

export default AuthorScraper;
