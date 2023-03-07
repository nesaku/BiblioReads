import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../../components/global-components/Header";
import Footer from "../../../components/global-components/Footer";
import Loader from "../../../components/global-components/Loader";
import ErrorMessage from "../../../components/global-components/ErrorMessage";
import QuotesResultData from "../../../components/quotespage-components/QuotesResultData";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [scrapedData, setScrapedData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/quotes/slug/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          queryURL: `https://www.goodreads.com/quotes/tag/${slug}`,
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
            url={`https://www.goodreads.com/quotes/tag/${slug}`}
          />
        )}
        {!error && (
          <>
            {scrapedData.title === undefined && <Loader other={true} />}
            {scrapedData.error && (
              <ErrorMessage
                status="404"
                url={`https://www.goodreads.com/quotes/tag/${slug}`}
              />
            )}
            {scrapedData.quotes && scrapedData.quotes.length === 0 && (
              <ErrorMessage
                status="ScraperError"
                url={`https://www.goodreads.com/quotes/tag/${slug}`}
              />
            )}
            {scrapedData && <QuotesResultData scrapedData={scrapedData} />}
          </>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Slug;
