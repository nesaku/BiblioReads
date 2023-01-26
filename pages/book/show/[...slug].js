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
            {/*scrapedData.title === "" && <ErrorMessage status="404" />*/}
            {scrapedData.title === "" && (
              <div className="flex flex-col justify-center max-w-2xl text-center mx-auto h-[74vh]">
                <h2
                  id="error"
                  className="text-red-600 font-bold text-5xl uppercase"
                >
                  Scraper Error
                </h2>
                <div className="px-2">
                  <h3 className="mt-12 text-lg text-black font-bold dark:text-gray-100">
                    The Goodreads website been updated. We are working on a fix,
                    you can find more information about this at:{" "}
                    <a
                      href="https://codeberg.org/nesaku/BiblioReads/issues/31"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Codeberg issue"
                      className="underline text-blue-500 hover:text-blue-600"
                    >
                      https://codeberg.org/nesaku/BiblioReads/issues/31
                    </a>
                  </h3>
                  <h3 className="mt-8 mb-12 text-lg text-black font-semibold dark:text-gray-100">
                    In the meantime, please see this book page on Goodreads:{" "}
                    <a
                      href={`https://www.goodreads.com/book/show/${slug}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Goodreads book link"
                      className="underline text-blue-500 hover:text-blue-600"
                    >
                      {`https://www.goodreads.com/book/show/${slug}`}
                    </a>
                    . Sorry for any inconvenience this may cause.
                  </h3>
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => router.reload()}
                    className="mr-12 font-semibold text-md text-white dark:text-white bg-slate-500 ring ring-slate-600 ring-offset-2 ring-offset-slate-100 py-5 px-6 rounded-xl shadow-lg shadow-slate-500 hover:shadow-xl hover:bg-slate-600 transition duration-300 delay-40 hover:delay-40"
                  >
                    Try Again
                  </button>
                  <a
                    href="/"
                    className="font-semibold text-md text-white dark:text-white bg-rose-500 ring ring-rose-600 ring-offset-2 ring-offset-rose-100 py-5 px-2 rounded-xl shadow-lg shadow-rose-500 hover:shadow-xl hover:bg-rose-600 transition duration-300 delay-40 hover:delay-40"
                  >
                    Go Back Home
                  </a>
                </div>
              </div>
            )}
            {scrapedData && <ResultData scrapedData={scrapedData} />}
          </>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Slug;
