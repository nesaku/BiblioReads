import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "../../../components/global/Header";
import Footer from "../../../components/global/Footer";
import Loader from "../../../components/global/Loader";
import ErrorMessage from "../../../components/global/ErrorMessage";
import ResultData from "../../../components/resultpage/ResultData";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [scrapedData, setScrapedData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const query = {
        queryURL: `https://www.goodreads.com/book/show/${slug}`,
      };

      try {
        // First try the old API if it doesn't work try the new one
        // TODO: remove multiple scrapers
        let res = await fetch("/api/book-scraper", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(query),
        });

        if (!res.ok) {
          res = await fetch("/api/book-scraper-new", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(query),
          });
        }

        if (res.ok) {
          const data = await res.json();
          setScrapedData(data);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  return (
    <>
      <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen">
        <Header />
        {/* Show loader or error based on the scraper data response */}
        {error && (
          <ErrorMessage
            status="500"
            url={`https://www.goodreads.com/book/show/${slug}`}
          />
        )}
        {!error && (
          <>
            {scrapedData.title === undefined && <Loader />}
            {scrapedData.error && (
              <ErrorMessage
                status="404"
                url={`https://www.goodreads.com/book/show/${slug}`}
              />
            )}
            {scrapedData.title === "" && (
              <ErrorMessage
                status="ScraperError"
                url={`https://www.goodreads.com/book/show/${slug}`}
              />
            )}
            {scrapedData && <ResultData scrapedData={scrapedData} />}
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Slug;
