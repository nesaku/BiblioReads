/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import ResultData from "../../../components/resultpage-components/ResultData";
import Header from "../../../components/global-components/Header";
import Footer from "../../../components/global-components/Footer";
import ErrorMessage from "../../../components/resultpage-components/ErrorMessage";
import Loader from "../../../components/global-components/Loader";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [scrapedData, setScrapedData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/scraper`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          queryURL: `https://www.goodreads.com/book/show/${slug}`,
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
        {error && <ErrorMessage status="500" />}
        {!error && (
          <>
            {scrapedData.title === undefined && <Loader />}
            {scrapedData.error && <ErrorMessage status="404" />}
            {scrapedData.title === "" && <ErrorMessage status="ScraperError" />}
            {scrapedData && <ResultData scrapedData={scrapedData} />}
          </>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Slug;
