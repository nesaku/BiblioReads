/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Meta from "../global-components/Meta";
import QuoteCard from "./QuoteCard";

const SeriesResults = ({ scrapedData }) => {
  const [imageError, setImageError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [validQuery, setValidQuery] = useState(true);

  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.includes("https://")) {
      router.push(`/quotes/tag?utf8=✓&id=${inputValue}`);
    } else {
      setValidQuery(false);
    }
  };

  return (
    <div
      id="seriesResults"
      className="flex flex-col p-12 justify-center items-center text-center"
    >
      <Meta title={scrapedData.name} />
      {scrapedData.quotes != "" && (
        <>
          <Link
            href={`/search/${
              scrapedData.name &&
              scrapedData.name
                .toLowerCase()
                .replaceAll(" ", "-")
                .replace("-quotes", "")
            }?type=books`}
          >
            <a className="flex flex-col lg:flex-row justify-center items-center">
              {scrapedData.image && (
                <div className="flex mr-8">
                  {!imageError ? (
                    <picture>
                      <source
                        srcSet={`/img?url=${scrapedData.image}&output=webp&maxage=30d`}
                        type="image/webp"
                        className="rounded-lg shadow-sm drop-shadow-sm bg-white dark:bg-slate-900"
                      />
                      <source
                        srcSet={`/img?url=${scrapedData.image}&maxage=30d`}
                        type="image/jpeg"
                        className="rounded-lg shadow-sm drop-shadow-sm bg-white dark:bg-slate-900"
                      />
                      <img
                        src={`/img?url=${scrapedData.image}&maxage=30d`}
                        width="150"
                        height="150"
                        className="rounded-lg shadow-sm drop-shadow-sm bg-white dark:bg-slate-900"
                        loading="eager"
                        onError={() => setImageError(true)}
                      />
                    </picture>
                  ) : (
                    <img
                      src="/cover-placeholder.svg"
                      alt=""
                      width="100"
                      height="250"
                      className="rounded-lg shadow-sm drop-shadow-sm mx-auto"
                    />
                  )}
                </div>
              )}
            </a>
          </Link>
          <h2 className="max-w-xl font-bold text-5xl pt-4 pb-5 my-2 hover:underline decoration-rose-600 dark:text-gray-100/80 capitalize">
            {scrapedData.name && `${scrapedData.name}:`}
          </h2>
          <div>
            <form onSubmit={onSubmit}>
              <h1 className="text-2xl text-black dark:text-gray-200/80 font-semibold">
                Search For A Tag:
              </h1>
              <div className="flex justify-center text-center">
                <div className="flex flex-col sm:flex-row items-center">
                  <div className="mt-4">
                    <input
                      type="text"
                      name="search"
                      aria-label="Search"
                      placeholder="Inspirational Quotes"
                      className="rounded-md mx-10 py-3 px-5 text-left text-black dark:text-gray-200/90 text-sm bg-slate-200 dark:bg-slate-700 border-4 border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-slate-700"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      required
                    />
                  </div>

                  <button className="flex items-center mt-10 my-6 ont-semibold text-md text-gray-900 dark:text-gray-100/90 bg-rose-500 dark:bg-[#a22045] ring ring-rose-600 dark:ring-rose-700 ring-offset-2 ring-offset-rose-100 py-4 px-4 rounded-xl shadow-lg shadow-rose-500 hover:shadow-xl hover:bg-rose-600 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40">
                    <svg
                      className="mr-2 -ml-1 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </form>
            {validQuery === false && (
              <div id="formError">
                <p className="mt-2 max-w-lg text-red-600/80 break-words">
                  Please make sure you are not pasting in a URL. An example of a
                  valid query is:{" "}
                  <span className="underline">Inspirational Quotes</span>
                </p>
              </div>
            )}
          </div>
          {scrapedData.popularTags && (
            <>
              <div className="hidden lg:flex flex-wrap justify-center align-middle items-center max-w-7xl">
                <h3 className="text-lg font-bold pr-12">Popular Tags:</h3>
                {scrapedData.popularTags.slice(0, 15).map((data, i) => (
                  <div key={i}>
                    <Link href={data.url}>
                      <button
                        className={
                          data.name.includes(scrapedData.name)
                            ? "py-0.5 px-1 m-2 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-300 dark:bg-rose-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-gray-300 transition duration-300 delay-40 hover:delay-40 ring ring-rose-600"
                            : "py-0.5 px-1 m-2 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 transition duration-300 delay-40 hover:delay-40 ring ring-gray-300 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600"
                        }
                      >
                        {data.name}
                      </button>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex lg:hidden flex-wrap justify-center align-middle items-center">
                <h3 className="text-lg font-bold pr-2">Popular Tags:</h3>
                {scrapedData.popularTags.slice(0, 5).map((data, i) => (
                  <div key={i}>
                    <Link href={data.url}>
                      <button
                        className={
                          data.name.includes(scrapedData.name)
                            ? "py-0.5 px-1 m-2 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-300 dark:bg-rose-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-gray-300 transition duration-300 delay-40 hover:delay-40 ring ring-rose-600"
                            : "py-0.5 px-1 m-2 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 transition duration-300 delay-40 hover:delay-40 ring ring-gray-300 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600"
                        }
                      >
                        {data.name}
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
      {scrapedData.quotes && scrapedData.quotes.length === 0 && (
        <div className="h-[68vh]">
          <div className="mt-[14vh]">
            <form onSubmit={onSubmit}>
              <h1 className="text-4xl text-black dark:text-gray-200/80 font-semibold">
                Search For A Tag:
              </h1>
              <div className="flex justify-center text-center">
                <div className="flex flex-col sm:flex-row items-center">
                  <div className="mt-4">
                    <input
                      type="text"
                      name="search"
                      aria-label="Search"
                      placeholder="Inspirational Quotes"
                      className="rounded-md mx-10 py-3 px-5 text-left text-black dark:text-gray-200/90 text-sm bg-slate-200 dark:bg-slate-700 border-4 border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-slate-700"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      required
                    />
                  </div>

                  <button className="flex items-center mt-10 my-6 ont-semibold text-md text-gray-900 dark:text-gray-100/90 bg-rose-500 dark:bg-[#a22045] ring ring-rose-600 dark:ring-rose-700 ring-offset-2 ring-offset-rose-100 py-4 px-4 rounded-xl shadow-lg shadow-rose-500 hover:shadow-xl hover:bg-rose-600 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40">
                    <svg
                      className="mr-2 -ml-1 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </form>
            {validQuery === false && (
              <div id="formError">
                <p className="mt-2 max-w-lg text-red-600/80 break-words">
                  Please make sure you are not pasting in a URL. An example of a
                  valid query is:{" "}
                  <span className="underline">Inspirational Quotes</span>
                </p>
              </div>
            )}
          </div>
          <h2 className="font-bold text-4xl text-center pt-4 py-2 mt-24 dark:text-gray-100/80 capitalize">
            No Quotes Found
            <div className="flex justify-center mt-10">
              <a
                href={scrapedData.scrapeURL}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-sm text-white dark:text-white bg-slate-500 dark:bg-slate-700 ring ring-slate-600 ring-offset-2 ring-offset-slate-100 py-5 px-6 rounded-xl shadow-lg shadow-slate-500 hover:shadow-xl hover:bg-slate-600 hover:dark:bg-slate-600 transition duration-300 delay-40 hover:delay-40"
              >
                View On Goodreads
              </a>
            </div>
          </h2>
        </div>
      )}
      {scrapedData.quotes && <QuoteCard quotes={scrapedData.quotes} />}
    </div>
  );
};

export default SeriesResults;
