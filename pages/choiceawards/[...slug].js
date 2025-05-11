import GenreGrid from "@/components/awardspage/GenreGrid";
import WinnerPage from "@/components/awardspage/WinnerPage";
import ErrorMessage from "@/components/global/ErrorMessage";
import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import Loader from "@/components/global/Loader";
import Meta from "@/components/global/Meta";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Awards = () => {
  const router = useRouter();
  const slug = router.query.slug;
  const [scrapedData, setScrapedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListData = async () => {
      const res = await fetch(`/api/awards/winners-list`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          queryURL: `https://www.goodreads.com/choiceawards/${slug}`,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setScrapedData(data);
        setIsLoading(false);
      } else {
        setError(true);
        setIsLoading(false);
      }
    };

    const fetchPageData = async () => {
      const res = await fetch(`/api/awards/winner-page`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          queryURL: `https://www.goodreads.com/choiceawards/${slug}`,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setScrapedData(data);
        setIsLoading(false);
      } else {
        setError(true);
        setIsLoading(false);
      }
    };

    if (slug && slug[0].includes("best-books")) {
      fetchListData();
    } else if (slug) {
      fetchPageData();
    }
  }, [slug]);

  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen">
      <Meta title="Awards" />
      <Header />
      {error && (
        <ErrorMessage
          status="500"
          url={`https://www.goodreads.com/choiceawards/${slug}`}
        />
      )}
      {!error && (
        <>
          {!isLoading ? (
            <div id="awardResults" className="min-h-[70vh] p-12">
              {slug && slug[0].includes("best-books") ? (
                <>
                  {scrapedData.genres && (
                    <GenreGrid scrapedData={scrapedData} />
                  )}
                </>
              ) : (
                <>
                  {scrapedData.nominees && (
                    <WinnerPage scrapedData={scrapedData} />
                  )}
                </>
              )}
            </div>
          ) : (
            <Loader other={true} />
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default Awards;
