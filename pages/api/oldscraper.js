const cheerio = require("cheerio");

const oldScraoer = async (req, res) => {
  if (req.method === "POST") {
    const scrapeURL = req.body.queryURL.split("?")[0];
    try {
      {
        /* const response = await fetch(`${scrapeURL}`); */
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
      const rating = $("*[itemprop = 'ratingValue']").text();
      const ratingCount = $(
        "#reviewControls > div.reviewControls--left.greyText"
      )
        .text()
        .replace("·", "");
      const desc = $("#description").text().replace("...more", "");
      const genres = $(".actionLinkLite.bookPageGenreLink")
        .map((i, el) => $(el).text())
        .get();
      const bookEdition = $("#details > div:nth-child(1)").text();
      const publishDate = $("#details > div:nth-child(2)").text();
      const isbn = $("*[itemprop = 'isbn']").text();
      const lang = $("*[itemprop = 'inLanguage']").text();
      const related = $(".cover")
        .map((i, info) => {
          const $info = $(info);
          const src = $info.find("a > img").attr("src");
          const title = $info.find("a > img").attr("alt");
          const url = $info
            .find("a")
            .attr("href")
            .replace("https://www.goodreads.com", "");
          const id = i + 1;
          return { id: id, src: src, title: title, url: url };
        })
        .toArray();
      const reviews = $("*[itemprop = 'reviews']")
        .map((i, info) => {
          const $info = $(info);
          const image = $info.find("a > img").attr("src");
          const author = $info.find("*[itemprop = 'author'] > a").attr("title");
          const date = $info.find(".reviewDate").text();
          const stars = $info.find(".staticStars").attr("title");
          const text = $info
            .find(".reviewText.stacked > .readable > span")
            .html();
          const fullText = $info
            .find(".reviewText.stacked > .readable > span:nth-child(2)")
            .html();
          /*
          const text = $info
            .find(".reviewText.stacked > .readable > span")
            .text();
          */
          const likes = $info
            .find(".updateActionLinks > .likeItContainer > a > span")
            .text();
          const id = i + 1;
          return {
            id: id,
            image: image,
            author: author,
            date: date,
            stars: stars,
            text: text,
            fullText: fullText,
            likes: likes,
          };
        })
        .toArray();
      const lastScraped = new Date().toISOString();
      res.statusCode = 200;
      return res.json({
        scrapeURL: scrapeURL,
        cover: cover,
        coverAltText: coverAltText,
        series: series,
        title: title,
        author: author,
        rating: rating,
        ratingCount: ratingCount,
        desc: desc,
        genres: genres,
        bookEdition: bookEdition,
        publishDate: publishDate,
        isbn: isbn,
        lang: lang,
        related: related,
        reviews: reviews,
        lastScraped: lastScraped,
      });
    } catch (e) {
      res.statusCode = 404;
      return res.json({
        scrapeURL: scrapeURL,
        error: "Invalid Query",
      });
    }
  }
};

export default oldScraoer;
