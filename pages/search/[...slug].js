import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "../../components/global-components/Header";
import Footer from "../../components/global-components/Footer";
import Loader from "../../components/global-components/Loader";
import ErrorMessage from "../../components/global-components/ErrorMessage";
import SearchResultData from "../../components/searchpage-components/SearchResultData";
import SearchBox from "../../components/searchpage-components/SearchBox";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { query } = router;
  const [scrapedData, setScrapedData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const scraperPath = searchType();

    // TODO: Build new api search routes based on query type
    function searchType() {
      if (query.type === "books") {
        const scraperPath = "/api/search-scraper";
        // const scraperPath = "/api/search/books";
        return scraperPath;
      } else if (query.type === "people") {
        const scraperPath = "/api/search-scraper";
        // const scraperPath = "/api/search/people"
        return scraperPath;
      } else if (query.type === "quotes") {
        const scraperPath = "/api/search-scraper";
        // const scraperPath = "/api/search/quotes"
        return scraperPath;
      } else if (query.type === "lists") {
        const scraperPath = "/api/search-scraper";
        // const scraperPath = "/api/search/lists"
        return scraperPath;
      } else if (query.type === "groups") {
        const scraperPath = "/api/search-scraper";
        // const scraperPath = "/api/search/groups"
        return scraperPath;
      } else {
        const scraperPath = "/api/search-scraper";
        // const scraperPath = "/api/search/books"
        return scraperPath;
      }
    }

    const fetchData = async () => {
      const res = await fetch(scraperPath, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          queryURL: `https://www.goodreads.com/search?q=${slug}`,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setScrapedData(data);
      } else {
        setError(true);
      }
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  return (
    <div>
      <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen">
        <Header />

        {/* Show loader or error based on the scraper data response */}
        {error && (
          <ErrorMessage
            status="500"
            url={`https://www.goodreads.com/search?utf8=%E2%9C%93&query=${slug}`}
          />
        )}
        {!error && (
          <>
            {scrapedData.status === undefined && <Loader other={true} />}
            {scrapedData.error && (
              <ErrorMessage
                status="404"
                url={`https://www.goodreads.com/search?utf8=%E2%9C%93&query=${slug}`}
              />
            )}
            {scrapedData.numberOfResults === "" && (
              <div className="flex flex-col justify-center items-center align-middle h-[70vh] w-full">
                <div className="flex flex-col xl:flex-row justify-center items-center text-center ">
                  <SearchBox />
                </div>
                <div>
                  <h2 className="font-bold text-4xl text-center pt-4 py-2 mt-24 underline decoration-rose-600 dark:text-gray-100/80 capitalize">
                    No Results Found For:{" "}
                    {scrapedData.scrapeURL &&
                      scrapedData.scrapeURL.replace(
                        "https://www.goodreads.com/search?q=",
                        ""
                      )}
                  </h2>
                </div>
              </div>
            )}
            {scrapedData && (
              <>
                {scrapedData.numberOfResults != "" && (
                  <div
                    id="searchHeader"
                    className={
                      scrapedData.status === undefined ? "hidden" : "block"
                    }
                  >
                    <h2 className="font-bold text-4xl text-center pt-4 py-2 mt-24 underline decoration-rose-600 dark:text-gray-100/80 capitalize">
                      Search Results For:{" "}
                      {scrapedData.scrapeURL &&
                        scrapedData.scrapeURL.replace(
                          "https://www.goodreads.com/search?q=",
                          ""
                        )}
                    </h2>

                    <div className="flex justify-center items-center align-middle">
                      <div className="flex flex-col xl:flex-row justify-center items-center text-center w-full mt-8">
                        <SearchBox />
                      </div>
                    </div>
                  </div>
                )}
                <SearchResultData
                  query={scrapedData.scrapeURL}
                  result={scrapedData.result}
                  numberOfResults={scrapedData.numberOfResults}
                />
                {scrapedData.numberOfResults === "No results." && (
                  <div
                    id="noResults"
                    className="flex justify-center text-center mt-10 mb-40 sm:mb-[28vh]"
                  >
                    <div className="max-w-lg break-words text-lg">
                      <h2 className="text-red-600/80 text-3xl mb-4">
                        No Results Found.
                      </h2>
                      <p>Please check your spelling and try again.</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Slug;
