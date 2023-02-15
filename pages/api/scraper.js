const cheerio = require("cheerio");

const Scraper = async (req, res) => {
  if (req.method === "POST") {
    const scrapeURL = req.body.queryURL.split("?")[0];
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
      const cover = $(".ResponsiveImage").attr("src");
      const series = $("h3.Text__italic").text();
      const title = $('h1[data-testid="bookTitle"]').text();
      const author = $(".ContributorLinksList > span > a > span").text();
      const authorURL = $(".ContributorLinksList > span > a")
        .attr("href")
        .replace("https://www.goodreads.com", "");
      const rating = $("div.RatingStatistics__rating").text().slice(0, 4);
      const ratingCount = $('[data-testid="ratingsCount"]')
        .text()
        .split("rating")[0];
      const reviewsCount = $('[data-testid="reviewsCount"]').text();
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
          return {
            id: id,
            src: src,
            title: title,
            author: author,
            url: url,
          };
        })
        .toArray();

      const rating5 = $(
        ".ReviewsSectionStatistics__histogram > div > div:nth-child(1) > div:nth-child(3)"
      )
        .text()
        .split("(")[0]
        .replace(" ", "");
      const rating4 = $(
        ".ReviewsSectionStatistics__histogram > div > div:nth-child(2) > div:nth-child(3)"
      )
        .text()
        .split("(")[0]
        .replace(" ", "");
      const rating3 = $(
        ".ReviewsSectionStatistics__histogram > div > div:nth-child(3) > div:nth-child(3)"
      )
        .text()
        .split("(")[0]
        .replace(" ", "");

      const rating2 = $(
        ".ReviewsSectionStatistics__histogram > div > div:nth-child(4) > div:nth-child(3)"
      )
        .text()
        .split("(")[0]
        .replace(" ", "");

      const rating1 = $(
        ".ReviewsSectionStatistics__histogram > div > div:nth-child(5) > div:nth-child(3)"
      )
        .text()
        .split("(")[0]
        .replace(" ", "");

      const reviewBreakdown = {
        rating5: rating5,
        rating4: rating4,
        rating3: rating3,
        rating2: rating2,
        rating1: rating1,
      };

      const reviews = $(".ReviewsList > div:nth-child(2) > div")
        .map((i, el) => {
          const $el = $(el);
          const image = $el
            .find("article > div > div > section > a > img")
            .attr("src");
          const author = $el
            .find(
              "article > div > div > section:nth-child(2) > span:nth-child(1) > div > a"
            )
            .text();
          const date = $el
            .find("article > section > section:nth-child(1) > span > a")
            .text();
          const stars = $el
            .find("article > section > section:nth-child(1) > div > span")
            .attr("aria-label");
          const text = $el
            .find(
              "article > section > section:nth-child(2) > section > div > div > span"
            )
            .html();
          const likes = $el
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
        status: "Success",
        source: "https://github.com/nesaku/biblioreads",
        scrapeURL: scrapeURL,
        cover: cover,
        series: series,
        title: title,
        author: author,
        authorURL: authorURL,
        rating: rating,
        ratingCount: ratingCount,
        reviewsCount: reviewsCount,
        desc: desc,
        genres: genres,
        bookEdition: bookEdition,
        publishDate: publishDate,
        related: related,
        reviewBreakdown: reviewBreakdown,
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
