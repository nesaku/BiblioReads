/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import ReadMore from "./ReadMore";
import Meta from "./global-components/Meta";
import Reviews from "./Reviews";
import SimilarBooks from "./SimilarBooks";

// Used "const ResultData = ({ scrapedData })" instead of "const ResultData = (props.scrapedData) for readability
const ResultData = ({ scrapedData }) => {
  return (
    /* Don't show result data if the title is not loaded */
    <>
      {!scrapedData.title && (
        <div className="flex flex-col justify-center max-w-2xl text-center mx-auto h-[74vh]">
          <h2 id="error" className="text-red-600 font-bold text-5xl uppercase">
            Error - Book Not Found
          </h2>
          <h3 className="my-12 text-lg text-black font-bold dark:text-gray-100">
            An Example Of A Valid Query Is:
            <span className="font-normal">
              https://www.goodreads.com/book/show/5907.The_Hobbit
            </span>
          </h3>
          <div className="mx-auto">
            <a
              href="/"
              className="font-semibold text-md text-gray-900 dark:text-white bg-rose-500 ring ring-rose-600 ring-offset-2 ring-offset-rose-100 py-5 px-2 rounded-xl shadow-lg shadow-rose-500 hover:shadow-xl hover:bg-rose-600 transition duration-300 delay-40 hover:delay-40"
            >
              Go Back Home
            </a>
          </div>
        </div>
      )}
      {scrapedData.title && (
        <div
          id="wrapper"
          className="flex flex-col lg:flex-row justify-center text-gray-900 dark:text-gray-200 my-[5vh] lg:my-[10vh] xl:my-[12vh]"
        >
          <Meta
            title={scrapedData.title ? `${scrapedData.title}` : ""}
            desc={
              scrapedData.desc ? `${scrapedData.desc.slice(10, 154)}...` : ""
            }
          />
          <div id="sideContent" className="text-center mx-auto">
            <span className="text-md italic text-left">
              {scrapedData.series}
            </span>
            <h2 className="font-bold text-3xl xl:text-4xl my-1 p-2 uppercase max-w-2xl mx-auto">
              {scrapedData.title}
            </h2>

            <p className="mt-2 mx-auto max-w-sm xl:max-w-md">
              <span className="font-semibold">By:</span>{" "}
              <span className="text-md">{scrapedData.author}</span>
            </p>
            <div id="bookCover" className="mt-10 mx-auto max-w-xs xl:max-w-sm">
              <h1 className="hidden">Cover:</h1>
              {/* Load WebP Image With JPG Fallback & 404 Not Found Image*/}
              <picture>
                <source
                  srcSet={`https://wsrv.nl/?url=${scrapedData.cover}&default=${
                    process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000"
                  }/cover-placeholder.svg&output=webp&maxage=30d`}
                  type="image/webp"
                  className="rounded-2xl w-fit max-h-34 mx-auto shadow-2xl drop-shadow-xl"
                />
                <source
                  srcSet={`https://wsrv.nl/?url=${scrapedData.cover}&default=${
                    process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000"
                  }/cover-placeholder.svg&maxage=30d`}
                  type="image/jpeg"
                  className="rounded-2xl w-fit max-h-34 mx-auto shadow-2xl drop-shadow-xl"
                />
                <img
                  src={`https://wsrv.nl/?url=${scrapedData.cover}&default=${
                    process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000"
                  }/cover-placeholder.svg&maxage=30d`}
                  alt={`${scrapedData.coverAltText} book cover`}
                  className="rounded-2xl w-fit max-h-34 mx-auto shadow-2xl drop-shadow-xl"
                  loading="eager"
                />
              </picture>
            </div>

            <div className="hidden lg:block mt-32 px-20">
              {scrapedData.reviews && <Reviews data={scrapedData.reviews} />}
            </div>
          </div>
          <div
            id="bookContent"
            className="max-w-full md:max-w-full lg:w-1/2 mx-auto lg:mx-0 p-4 lg:p-0 text-center lg:text-left"
          >
            <div id="bookRating">
              <h2 className="font-bold text-2xl mb-2 mt-8 lg:mt-0 underline">
                Rating:{" "}
              </h2>
              <div className="flex justify-center lg:justify-start">
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0621 1.65925L15.5435 6.67764C15.716 7.02667 16.0496 7.26852 16.4356 7.3244L21.9843 8.12919C22.9562 8.27027 23.344 9.46212 22.641 10.146L18.626 14.0522C18.3469 14.3239 18.2194 14.7155 18.2854 15.0989L19.2331 20.6147C19.3992 21.5807 18.3832 22.3173 17.514 21.8615L12.5514 19.2575C12.2063 19.0766 11.7937 19.0766 11.4486 19.2575L6.48598 21.8615C5.6168 22.3177 4.60078 21.5807 4.7669 20.6147L5.71455 15.0989C5.78064 14.7155 5.65306 14.3239 5.37404 14.0522L1.35905 10.146C0.655998 9.46166 1.04378 8.26982 2.01575 8.12919L7.56441 7.3244C7.95036 7.26852 8.28398 7.02667 8.45653 6.67764L10.9379 1.65925C11.372 0.780251 12.6276 0.780251 13.0621 1.65925Z"
                      fill="#ED8A19"
                    />
                  </svg>
                </div>
                <div>
                  <span className="ml-2 text-md">{scrapedData.rating}</span>
                </div>
              </div>
            </div>
            <div id="bookRatingsAndReviews">
              <h2 className="font-bold text-2xl my-2 underline ">
                Number Of Ratings & Reviews:
              </h2>
              <span className="text-md capitalize -ml-3">
                {scrapedData.ratingCount}
              </span>
            </div>
            <div
              id="bookDescription"
              className="max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl m-auto lg:m-0"
            >
              <h2 className="font-bold text-2xl my-2 underline">
                Description:{" "}
              </h2>
              <ReadMore>
                {scrapedData.desc ? scrapedData.desc : "Loading"}
              </ReadMore>
            </div>
            <div
              id="bookGenres"
              className={
                scrapedData.genres
                  ? "max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl  m-auto lg:m-0"
                  : "hidden"
              }
            >
              <h2 className="font-bold text-2xl my-2 underline">Genres: </h2>
              <span>
                {scrapedData.genres &&
                  JSON.stringify(scrapedData.genres)
                    .replace("[", "")
                    .replace("]", "")
                    .replaceAll(",", ", ")
                    .replaceAll('"', "")}
              </span>
            </div>
            <div id="bookPublishDate">
              <h2 className="font-bold text-2xl my-2 underline">
                Publishing Date:
              </h2>
              <span className="flex mx-auto lg:mx-0 max-w-md text-md">
                {scrapedData.publishDate}
              </span>
            </div>
            <div id="bookISBN">
              <h2
                className={
                  scrapedData.isbn
                    ? "font-bold text-2xl my-2 underline"
                    : "hidden"
                }
              >
                ISBN:
              </h2>
              <span className="text-md">{scrapedData.isbn}</span>
            </div>
            <div id="bookLang">
              <h2
                className={
                  scrapedData.lang
                    ? "font-bold text-2xl my-2 underline"
                    : "hidden"
                }
              >
                Language:{" "}
              </h2>
              <span className="text-md">{scrapedData.lang}</span>
            </div>
            <div id="bookURL" className="mb-6">
              <h2
                className={
                  scrapedData.scrapeURL
                    ? "font-bold text-2xl my-2 underline"
                    : "hidden"
                }
              >
                Goodreads URL:{" "}
              </h2>
              <a
                className="text-blue-600 dark:text-blue-500 underline"
                target="_blank"
                rel="noreferrer"
                href={
                  scrapedData.scrapeURL.includes("https://www.goodreads.com")
                    ? scrapedData.scrapeURL
                    : `https://www.goodreads.com/book/show/${scrapedData.scrapeURL}`
                }
              >
                <span className=" text-xs lg:text-md">
                  {scrapedData.scrapeURL.includes("https://www.goodreads.com")
                    ? scrapedData.scrapeURL
                    : `https://www.goodreads.com/book/show/${scrapedData.scrapeURL}`}
                </span>
              </a>
            </div>
            {scrapedData.related && <SimilarBooks data={scrapedData.related} />}
            <div className="block lg:hidden">
              {scrapedData.reviews && <Reviews data={scrapedData.reviews} />}
            </div>
            <div id="lastScraped" className="hidden lg:block">
              <h2 className="font-bold text-2xl my-2 underline mt-12">
                Last Scraped:{" "}
              </h2>
              <span className="text-md">
                <code>{scrapedData.lastScraped}</code>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultData;
