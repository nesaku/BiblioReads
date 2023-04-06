import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/global/Header";
import Footer from "../../components/global/Footer";
import Loader from "../../components/global/Loader";
import ErrorMessage from "../../components/global/ErrorMessage";
import QuotesResultData from "../../components/quotespage/QuotesResultData";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [scrapedData, setScrapedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/quotes/home`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          queryURL: `https://www.goodreads.com/quotes/${slug}`,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setScrapedData(data);
      } else {
        setError(true);
      }
    };

    const fetchTagData = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/quotes/slug`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          queryURL: `https://www.goodreads.com/quotes${`/tag?id=${router.query.id}`}`,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setScrapedData(data);
        setIsLoading(false);
      } else {
        setError(true);
      }
    };
    if (slug) {
      {
        !router.query.id ? fetchData() : fetchTagData();
      }
    }
  }, [slug]);

  return (
    <div>
      <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen">
        <Header />
        {/* Show loader or error based on the scraper data response */}
        {isLoading && <Loader other={true} />}
        {error && (
          <ErrorMessage
            status="500"
            url={`https://www.goodreads.com/quotes/${slug}`}
          />
        )}
        {!error && (
          <>
            {scrapedData.name === undefined && <Loader other={true} />}
            {scrapedData.error && (
              <ErrorMessage
                status="404"
                url={`https://www.goodreads.com/quotes/${slug}`}
              />
            )}
            {scrapedData.quotes && scrapedData.quotes === "" && (
              <ErrorMessage
                status="ScraperError"
                url={`https://www.goodreads.com/quotes/${slug}`}
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
