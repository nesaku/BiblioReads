import { env } from "next-runtime-env";

const GRAPHQL_URL =
  env("NEXT_PUBLIC_GRAPHQL_ENDPOINT") ||
  "https://kxbwmqov6jgg3daaamb744ycu4.appsync-api.us-east-1.amazonaws.com/graphql";

const API_KEY =
  env("NEXT_PUBLIC_GRAPHQL_API_KEY") || "da2-xpgsdydkbregjhpr6ejzqdhuwy";

// Extract the legacy ID from the Goodreads book URL.
const legacyIdFromURL = (url) => {
  const match = url.match(/\/book\/show\/(\d+)/);
  if (!match) throw new Error(`Failed legacy book ID extraction: ${url}`);
  return match[1];
};

const BOOK_QUERY = `
  query getBookByLegacyId($legacyId: Int!) {
    getBookByLegacyId(legacyId: $legacyId) {
      id
      legacyId
      title
      description(stripped: true)
      imageUrl
      webUrl
      details {
        numPages
        format
        publicationTime
        publisher
        asin
        isbn13
      }
      primaryContributorEdge {
        node {
          id
          legacyId
          name
          webUrl
        }
        role
      }
      bookGenres {
        genre {
          name
          webUrl
        }
      }
      bookSeries {
        series {
          title
          webUrl
        }
        userPosition
      }
      work {
        id
        stats {
          averageRating
          ratingsCount
          textReviewsCount
          ratingsCountDist
        }
        quotes(pagination: { limit: 1 }) {
          totalCount
          webUrl
        }
        questions(pagination: { limit: 1 }) {
          totalCount
          webUrl
        }
      }
    }
  }
`;

const graphqlRequest = async (query, variables, userAgent) => {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": API_KEY,
      "User-Agent": userAgent,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed with status ${response.status}`);
  }

  const json = await response.json();

  if (json.errors?.length) {
    console.error("GraphQL errors:", JSON.stringify(json.errors, null, 2));
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }
  return json.data;
};

const BookScraper = async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.json({ status: "Error 405 - Method Not Allowed" });
  }

  const scrapeURL = req.body.queryURL.split("?")[0];
  const userAgent =
    env("NEXT_PUBLIC_USER_AGENT") ||
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36";

  try {
    const legacyBookID = parseInt(legacyIdFromURL(scrapeURL), 10);

    const data = await graphqlRequest(
      BOOK_QUERY,
      { legacyId: legacyBookID },
      userAgent,
    );

    const bookData = data?.getBookByLegacyId;

    if (!bookData) {
      res.statusCode = 504;
      return res.json({ status: "Error - Book not found", scrapeURL });
    }

    const bookID = bookData.id;
    const resourceID = bookData.work.id;

    const authorEdge = bookData.primaryContributorEdge;
    const workData = bookData.work;
    const ratingStats = workData?.stats;
    const seriesData = bookData.bookSeries?.[0]?.series ?? null;
    const quotesData = workData?.quotes ?? null;
    const questionsData = workData?.questions ?? null;

    const quotesCount = quotesData?.totalCount?.toString() ?? "0";
    const quotesURL = quotesData?.webUrl
      ? new URL(quotesData.webUrl).pathname
      : null;

    const questionsCount = questionsData?.totalCount?.toString() ?? "0";
    const questionsURL = questionsData?.webUrl
      ? new URL(questionsData.webUrl).pathname
      : null;

    const reviewBreakdown = {
      rating1: ratingStats?.ratingsCountDist?.[0]?.toString() ?? "0",
      rating2: ratingStats?.ratingsCountDist?.[1]?.toString() ?? "0",
      rating3: ratingStats?.ratingsCountDist?.[2]?.toString() ?? "0",
      rating4: ratingStats?.ratingsCountDist?.[3]?.toString() ?? "0",
      rating5: ratingStats?.ratingsCountDist?.[4]?.toString() ?? "0",
    };

    const genres =
      bookData.bookGenres?.map((g) => g.genre?.name?.trim()).filter(Boolean) ??
      [];

    const author = [
      {
        id: 1,
        name: authorEdge?.node?.name ?? null,
        url: authorEdge?.node?.webUrl
          ? new URL(authorEdge.node.webUrl).pathname
          : null,
      },
    ];
    const result = {
      status: "Received",
      statusCode: 200,
      source: "https://github.com/nesaku/biblioreads",
      scrapeURL,
      legacyBookID,
      bookID, // This is the internal API book ID
      resourceID,
      cover: bookData.imageUrl ?? null,
      series: seriesData?.title ?? null,
      seriesURL: seriesData?.webUrl
        ? new URL(seriesData.webUrl).pathname
        : null,
      workURL: bookData.webUrl ?? null,
      title: bookData.title,
      author,
      rating: ratingStats?.averageRating?.toFixed(2) ?? null,
      ratingCount: ratingStats?.ratingsCount?.toLocaleString() ?? "0",
      reviewsCount: ratingStats?.textReviewsCount?.toLocaleString() ?? "0",
      desc: bookData.description ?? "",
      genres,
      bookEdition: `${bookData.details?.numPages ?? "?"} pages, ${bookData.details?.format ?? "Unknown"}`,
      publishDate: bookData.details?.publicationTime
        ? new Date(bookData.details.publicationTime).toDateString()
        : null,
      related: [], // Moved to the SimilarBooks scraper
      reviewBreakdown,
      reviews: [], // Moved to the Reviews scraper
      quotes: quotesCount,
      quotesURL,
      questions: questionsCount,
      questionsURL,
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
      scrapeURL,
    });
  }
};

export default BookScraper;
