import { env } from "next-runtime-env";

const SearchScraper = async (req, res) => {
  if (req.method === "POST") {
    const scrapeURL = req.body.queryURL.split("&")[0];
    const query = scrapeURL.split("q=")[1] || "";
    const apiURL = `https://www.goodreads.com/book/auto_complete?format=json&q=${query}`; // Use the Goodreads autocomplete API

    try {
      const response = await fetch(apiURL, {
        method: "GET",
        headers: new Headers({
          "User-Agent":
            env("NEXT_PUBLIC_USER_AGENT") ||
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        }),
      });

      const data = await response.json();

      // Convert Goodreads JSON to match existing format
      const result = data.map((item, i) => ({
        id: i + 1,
        cover: item.imageUrl,
        title: item.title,
        bookURL: item.bookUrl,
        author: item.author?.name || "",
        authorURL: item.author?.profileUrl?.replace(
          "https://www.goodreads.com",
          "",
        ),
        rating: item.avgRating ? String(item.avgRating) : "0.00",
      }));

      const numberOfResults = `${result.length} results`;

      const lastScraped = new Date().toISOString();
      res.statusCode = 200;
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=600, stale-while-revalidate=1800",
      );
      return res.json({
        status: "Received",
        source: "https://github.com/nesaku/biblioreads",
        apiURL: apiURL,
        searchType: "books",
        numberOfResults: numberOfResults,
        result: result,
        lastScraped: lastScraped,
      });
    } catch (error) {
      res.statusCode = 404;
      console.error("An error has occurred with the scraper.");
      return res.json({
        status: "Error - Invalid Query",
        apiURL: apiURL,
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
