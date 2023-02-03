const cheerio = require("cheerio");
// const puppeteer = require("puppeteer");
import chromium from "chrome-aws-lambda";

function wait(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

const Scraper = async (req, res) => {
  if (req.method === "POST") {
    // Get The URL that needs to be scraped
    const scrapeURL = req.body.queryURL.split("?")[0];
    try {
      // Start Puppeteer Configuration
      const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      });

      const page = await browser.newPage();

      await page.goto(scrapeURL, { waitUntil: "networkidle0" });

      const bodyHandle = await page.$("body");
      const { height } = await bodyHandle.boundingBox();
      await bodyHandle.dispose();

      const viewportHeight = page.viewport().height;

      let viewportIncr = 0;
      while (viewportIncr + viewportHeight < height) {
        await page.evaluate((_viewportHeight) => {
          window.scrollBy(0, _viewportHeight);
        }, viewportHeight);
        await wait(300);
        viewportIncr = viewportIncr + viewportHeight;
      }

      const pageData = await page.evaluate(() => {
        return {
          html: document.documentElement.innerHTML,
        };
      });
      // await wait(100);
      await browser.close();
      // End Puppeteer Configuration
      const $ = cheerio.load(pageData.html);
      const cover = $(".ResponsiveImage").attr("src");
      const series = $("h3.Text__italic").text();
      const title = $('h1[data-testid="bookTitle"]').text();
      const author = $('h3[aria-label="List of contributors"]')
        .text()
        .replace("...more", "");
      const rating = $("div.RatingStatistics__rating").text().slice(0, 4);
      const ratingCount = $('[data-testid="ratingsCount"]')
        .text()
        .split("rating")[0];
      const reviewsCount = $('[data-testid="reviewsCount"]')
        .text()
        .split("reviews")[0];
      const desc = $('[data-testid="description"]').text();
      const genres = $('[data-testid="genresList"] > ul > span > span')
        .map((i, el) => $(el).find("span").text().replace("Genres", ""))
        .get();
      const bookEdition = $('[data-testid="pagesFormat"]').text();
      const publishDate = $('[data-testid="publicationInfo"]').text();
      const related = $("div.DynamicCarousel__itemsArea > div > div")
        .map((i, el) => {
          const $el = $(el);
          const title = $el
            .find('div > a > div:nth-child(2) > [data-testid="title"]')
            .html();
          const author = $el
            .find('div > a > div:nth-child(2) > [data-testid="author"]')
            .html();
          const src = $el
            .find("div > a > div:nth-child(1) > div > div > img")
            .attr("src");
          const url = $el
            .find("div > a")
            .attr("href")
            .replace("https://www.goodreads.com", "");
          const id = i + 1;
          return { id: id, src: src, title: title, author: author, url: url };
        })
        .toArray();
      const reviews = $(".ReviewsList > div:nth-child(2) > div")
        .map((i, info) => {
          const $info = $(info);
          const image = $info
            .find("article > div > div > section > a > img")
            .attr("src");
          const author = $info
            .find(
              "article > div > div > section:nth-child(2) > span:nth-child(1) > div > a"
            )
            .text();
          const date = $info
            .find("article > section > section:nth-child(1) > span > a")
            .text();
          const stars = $info
            .find("article > section > section:nth-child(1) > div > span")
            .attr("aria-label");
          const text = $info
            .find(
              "article > section > section:nth-child(2) > section > div > div > span"
            )
            .html();
          const likes = $info
            .find(
              "article > section > footer > div > div:nth-child(1) > button > span"
            )
            .text();
          const id = i + 1;

          return {
            id: id,
            image: image,
            author: author,
            date: date,
            stars: stars,
            text: text,
            likes: likes,
          };
        })
        .toArray();
      const lastScraped = new Date().toISOString();
      res.statusCode = 200;
      return res.json({
        source: "https://github.com/nesaku/biblioreads",
        status: "Success",
        scrapeURL: scrapeURL,
        cover: cover,
        series: series,
        title: title,
        author: author,
        rating: rating,
        ratingCount: ratingCount,
        reviewsCount: reviewsCount,
        desc: desc,
        genres: genres,
        bookEdition: bookEdition,
        publishDate: publishDate,
        related: related,
        reviews: reviews,
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

export default Scraper;
