import { env } from "next-runtime-env";
import { getUserAgent } from "@/utils/userAgent";

const GRAPHQL_URL =
  env("NEXT_PUBLIC_GRAPHQL_ENDPOINT") ||
  "https://kxbwmqov6jgg3daaamb744ycu4.appsync-api.us-east-1.amazonaws.com/graphql";

const API_KEY =
  env("NEXT_PUBLIC_GRAPHQL_API_KEY") || "da2-d2fyuybwsbf3poyquvbp2mbiwu";

const REVIEWS_QUERY = `
  query getReviews($filters: BookReviewsFilterInput!, $pagination: PaginationInput) {
    getReviews(filters: $filters, pagination: $pagination) {
      totalCount
      edges {
        node {
          id
          creator {
            id: legacyId
            name
            webUrl
            imageUrlSquare
            isAuthor
            textReviewsCount
            followersCount
          }
          recommendFor
          updatedAt
          createdAt
          spoilerStatus
          lastRevisionAt
          text
          rating
          preReleaseBookSource
          shelving {
            shelf {
              name
              displayName
              webUrl
            }
            taggings {
              tag {
                name
                webUrl
              }
            }
            webUrl
          }
          likeCount
          commentCount
        }
      }
      pageInfo {
        prevPageToken
        nextPageToken
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

  // Keep the data and only log non-fatal errors
  if (json.errors?.length) {
    console.warn(
      `GraphQL partial errors (${json.errors.length}):`,
      json.errors[0]?.message,
      json.errors.length > 1 ? `...and ${json.errors.length - 1} more` : "",
    );
  }

  if (!json.data) {
    throw new Error("No data returned from GraphQL");
  }

  return json.data;
};

const ReviewsScraper = async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.json({ status: "Error 405 - Method Not Allowed" });
  }

  const scrapeURL = `https://www.goodreads.com/book/show/${req.body.legacyBookID}/reviews`;
  const nextPageToken = req.body.nextPageToken ?? null;
  const languageCode = req.body.languageCode;

  if (
    languageCode != null &&
    (typeof languageCode !== "string" ||
      languageCode.length !== 2 ||
      !/^[a-z]{2}$/i.test(languageCode))
  ) {
    res.statusCode = 400;
    return res.json({
      status: "Error - languageCode must be a two-letter ISO language code",
    });
  }

  const userAgent = getUserAgent();

  try {
    const variables = {
      filters: {
        resourceType: "WORK",
        resourceId: req.body.resourceID,
        ...(languageCode != null
          ? { languageCode: languageCode.toLowerCase() }
          : {}),
      },
      pagination: {
        limit: 30,
        ...(nextPageToken ? { after: nextPageToken } : {}),
      },
    };

    const reviewsData = await graphqlRequest(
      REVIEWS_QUERY,
      variables,
      userAgent,
    );
    const connection = reviewsData?.getReviews;

    if (!connection) {
      res.statusCode = 504;
      return res.json({ status: "Error - Reviews not found", scrapeURL });
    }

    const reviews = connection.edges.map(({ node }) => ({
      id: node.id,
      reviewer: {
        id: node.creator?.id ?? null,
        name: node.creator?.name ?? "Anonymous",
        url: node.creator?.webUrl
          ? new URL(node.creator.webUrl).pathname
          : null,
        avatar: node.creator?.imageUrlSquare ?? null,
        isAuthor: node.creator?.isAuthor ?? false,
        reviewCount: node.creator?.textReviewsCount ?? 0,
        followerCount: node.creator?.followersCount ?? 0,
      },
      rating: node.rating ?? null,
      text: node.text ?? "",
      createdAt: node.createdAt
        ? new Date(node.createdAt).toDateString()
        : null,
      updatedAt: node.updatedAt
        ? new Date(node.updatedAt).toDateString()
        : null,
      spoiler: node.spoilerStatus ?? false,
      likeCount: node.likeCount ?? 0,
      commentCount: node.commentCount ?? 0,
      recommendFor: node.recommendFor ?? null,
      shelf: node.shelving?.shelf?.name ?? null,
      reviewURL: node.shelving?.webUrl
        ? new URL(node.shelving.webUrl).pathname
        : null,
    }));

    const result = {
      status: "Received",
      statusCode: 200,
      source: "https://github.com/nesaku/biblioreads",
      scrapeURL,
      totalCount: connection.totalCount ?? 0,
      nextPageToken: connection.pageInfo?.nextPageToken ?? null,
      prevPageToken: connection.pageInfo?.prevPageToken ?? null,
      reviews,
      lastScraped: new Date().toISOString(),
    };

    return res.json(result);
  } catch (error) {
    console.error("Reviews scraper error:", error);
    res.statusCode = 404;
    return res.json({
      status: "Error - Invalid Query",
      scrapeURL,
    });
  }
};

export default ReviewsScraper;
