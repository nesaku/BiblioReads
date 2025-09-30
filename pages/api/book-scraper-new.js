import { env } from "next-runtime-env";
const cheerio = require("cheerio");

const BookScraper = async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.json({ status: "Error 405 - Method Not Allowed" });
  }

  const scrapeURL = req.body.queryURL.split("?")[0];

  try {
    const response = await fetch(`${scrapeURL}`, {
      method: "GET",
      headers: {
        "User-Agent":
          env("NEXT_PUBLIC_USER_AGENT") ||
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
      },
    });

    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const rawJSON = $("#__NEXT_DATA__").html();
    const jsonData = JSON.parse(rawJSON);
    const apolloState = jsonData.props.pageProps.apolloState;

    // Dynamically find the book and work keys
    const bookKey = Object.keys(apolloState).find((key) =>
      key.startsWith("Book:")
    );
    const workKey = Object.keys(apolloState).find((key) =>
      key.startsWith("Work:")
    );

    const bookData = apolloState[bookKey];
    const workData = apolloState[workKey];

    const authorKey = bookData.primaryContributorEdge?.node?.__ref;
    const authorData = apolloState[authorKey];

    const seriesData =
      bookData.bookSeries?.length > 0
        ? apolloState[bookData.bookSeries[0].series.__ref]
        : null;

    const ratingStats = workData.stats;

    const quotesKey = 'quotes({"pagination":{"limit":1}})';
    const questionsKey = 'questions({"pagination":{"limit":1}})';

    const quotesData = workData[quotesKey] || null;
    const questionsData = workData[questionsKey] || null;

    const quotesCount = quotesData?.totalCount?.toString() || "0";
    const quotesURL = quotesData?.webUrl
      ? new URL(quotesData.webUrl).pathname
      : null;

    const questionsCount = questionsData?.totalCount?.toString() || "0";
    const questionsURL = questionsData?.webUrl
      ? new URL(questionsData.webUrl).pathname
      : null;

    const reviewBreakdown = {
      rating1: ratingStats.ratingsCountDist?.[0]?.toString() || "0",
      rating2: ratingStats.ratingsCountDist?.[1]?.toString() || "0",
      rating3: ratingStats.ratingsCountDist?.[2]?.toString() || "0",
      rating4: ratingStats.ratingsCountDist?.[3]?.toString() || "0",
      rating5: ratingStats.ratingsCountDist?.[4]?.toString() || "0",
    };

    const genres = bookData.bookGenres?.map((g) => g.genre?.name?.trim()) || [];

    const author = [
      {
        id: 1,
        name: authorData?.name,
        url: authorData?.webUrl ? new URL(authorData.webUrl).pathname : null,
      },
    ];

    const reviews = []; // TODO: create a new reviews scraper - source ex. https://www.goodreads.com/book/show/229717312/reviews (gets the first 30 reviews)

    const result = {
      status: "Received",
      statusCode: 200,
      source: "https://github.com/nesaku/biblioreads",
      scrapeURL: scrapeURL,
      cover: bookData.imageUrl || null,
      series: seriesData?.title || null,
      seriesURL: seriesData ? new URL(seriesData.webUrl).pathname : null,
      workURL: bookData.webUrl || null,
      title: bookData.title,
      author: author,
      rating: ratingStats.averageRating.toFixed(2),
      ratingCount: ratingStats.ratingsCount.toLocaleString(),
      reviewsCount: ratingStats.textReviewsCount.toLocaleString(),
      desc:
        bookData['description({"stripped":true})'] ||
        bookData.description ||
        "",
      genres: genres,
      bookEdition: `${bookData.details.numPages} pages, ${bookData.details.format}`,
      publishDate: new Date(bookData.details.publicationTime).toDateString(),
      related: [], // Moved to the SimilarBooks scraper
      reviewBreakdown: reviewBreakdown,
      reviews: reviews,
      bookID: bookData.legacyId?.toString() || null,
      quotes: quotesCount,
      quotesURL: quotesURL,
      questions: questionsCount,
      questionsURL: questionsURL,
      lastScraped: new Date().toISOString(),
    };

    if (!result.title) {
      res.statusCode = 504;
    }
    return res.json(result);
  } catch (error) {
    console.error("Scraper error:", error);
    res.statusCode = 404;
    return res.json({
      status: "Error - Invalid Query",
      scrapeURL: scrapeURL,
    });
  }
};

export default BookScraper;
