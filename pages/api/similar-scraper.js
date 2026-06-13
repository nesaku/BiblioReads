import { env } from "next-runtime-env";

const GRAPHQL_URL =
  env("NEXT_PUBLIC_GRAPHQL_ENDPOINT") ||
  "https://kxbwmqov6jgg3daaamb744ycu4.appsync-api.us-east-1.amazonaws.com/graphql";

const API_KEY =
  env("NEXT_PUBLIC_GRAPHQL_API_KEY") || "da2-xpgsdydkbregjhpr6ejzqdhuwy";

const SIMILAR_BOOKS_QUERY = `
  query getSimilarBooks($id: ID!, $limit: Int!) {
    getSimilarBooks(id: $id, pagination: { limit: $limit }) {
      webUrl
      edges {
        node {
          title
          imageUrl
          webUrl
          primaryContributorEdge {
            node {
              name
            }
          }
          work {
            stats {
              averageRating
              ratingsCount
            }
          }
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
    console.warn(
      `GraphQL partial errors (${json.errors.length}):`,
      json.errors[0]?.message,
    );
  }

  if (!json.data) throw new Error("No data returned from GraphQL");

  return json.data;
};

const SimilarScraper = async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.json({ status: "Error 405 - Method Not Allowed" });
  }

  const scrapeURL = `https://www.goodreads.com/book/similar/${req.body.legacyBookID ?? ""}`;
  const bookID = req.body.bookID ?? "";

  const userAgent =
    env("NEXT_PUBLIC_USER_AGENT") ||
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36";

  try {
    const similarData = await graphqlRequest(
      SIMILAR_BOOKS_QUERY,
      { id: bookID, limit: 20 },
      userAgent,
    );

    const similarBooksList = similarData?.getSimilarBooks;

    if (!similarBooksList) {
      res.statusCode = 504;
      return res.json({ status: "Error - Similar books not found", scrapeURL });
    }

    const books = similarBooksList.edges.map(({ node }, i) => ({
      id: i + 1,
      cover: node.imageUrl ?? null,
      title: node.title ?? null,
      bookURL: node.webUrl ? new URL(node.webUrl).pathname : null,
      rating: node.work?.stats?.averageRating?.toFixed(2) ?? null,
      ratingsCount: node.work?.stats?.ratingsCount ?? null,
      author: node.primaryContributorEdge?.node?.name ?? null,
    }));
    res.statusCode = 200;
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=1800",
    );
    return res.json({
      status: "Received",
      source: "https://github.com/nesaku/biblioreads",
      scrapeURL,
      books,
      lastScraped: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Similar scraper error:", error);
    res.statusCode = 404;
    return res.json({
      status: "Error - Invalid Query",
      scrapeURL,
    });
  }
};

export default SimilarScraper;
