import { useEffect, useState } from "react";
import Header from "../../components/global-components/Header";
import Footer from "../../components/global-components/Footer";
import Loader from "../../components/global-components/Loader";
import ErrorMessage from "../../components/global-components/ErrorMessage";
import QuotesResultData from "../../components/quotespage-components/QuotesResultData";

const Quotes = () => {
  const [scrapedData, setScrapedData] = useState({});
  const [error, setError] = useState(false);

  const fetchData = async () => {
    const res = await fetch(`/api/quotes/home`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        queryURL: `https://www.goodreads.com/quotes`,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setScrapedData(data);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      setError(true);
    }
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen">
        <Header />
        {/* Show loader or error based on the scraper data response */}
        {error && (
          <ErrorMessage status="500" url={`https://www.goodreads.com/quotes`} />
        )}
        {!error && (
          <>
            {scrapedData.name === undefined && <Loader other={true} />}
            {scrapedData.error && (
              <ErrorMessage
                status="404"
                url={`https://www.goodreads.com/quotes`}
              />
            )}
            {scrapedData.name === "" && (
              <ErrorMessage
                status="ScraperError"
                url={`https://www.goodreads.com/quotes`}
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

export default Quotes;
