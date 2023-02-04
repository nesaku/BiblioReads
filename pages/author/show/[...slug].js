import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "../../../components/global-components/Header";
import Footer from "../../../components/global-components/Footer";
import Loader from "../../../components/global-components/Loader";
import AuthorResultData from "../../../components/authorpage-components/AuthorResultData";
import ErrorMessage from "../../../components/resultpage-components/ErrorMessage";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [scrapedData, setScrapedData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/author-scraper`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          queryURL: `https://www.goodreads.com/author/show/${slug}`,
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
        {/*         {scrapedData.name === undefined && <Loader other={true} />}
        {scrapedData && <AuthorResultData scrapedData={scrapedData} />} */}
        {error && <ErrorMessage status="500" />}
        {!error && (
          <>
            {scrapedData.name === undefined && <Loader other={true} />}
            {scrapedData.error && <ErrorMessage status="404" />}
            {scrapedData.name === "" && <ErrorMessage status="ScraperError" />}
            {scrapedData && <AuthorResultData scrapedData={scrapedData} />}
          </>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Slug;
