import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "../../components/global-components/Header";
import Footer from "../../components/global-components/Footer";
import Loader from "../../components/global-components/Loader";
import ErrorMessage from "../../components/resultpage-components/ErrorMessage";
import SearchResultData from "../../components/searchpage-components/SearchResultData";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [scrapedData, setScrapedData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/search-scraper`, {
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

  console.log(scrapedData);

  return (
    <div>
      <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen">
        <Header />

        {/* Show loader or error based on the scraper data response */}
        {error && <ErrorMessage status="500" />}
        {!error && (
          <>
            {scrapedData.status === undefined && <Loader other={true} />}
            {scrapedData.error && <ErrorMessage status="404" />}
            {scrapedData.numberOfResults === "" && (
              <ErrorMessage status="ScraperError" />
            )}
            {scrapedData && (
              <SearchResultData
                query={scrapedData.scrapeURL}
                result={scrapedData.result}
                numberOfResults={scrapedData.numberOfResults}
              />
            )}
          </>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Slug;
