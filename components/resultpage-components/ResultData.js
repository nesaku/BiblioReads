/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import ReadMore from "./ReadMore";
import Reviews from "./Reviews";
import ReviewsMobile from "./ReviewsMobile";
import SimilarBooks from "./SimilarBooks";
import Meta from "../global-components/Meta";
import ReviewBreakdown from "./ReviewBreakdown";

const ResultData = ({ scrapedData }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {scrapedData.title && (
        <div
          id="wrapper"
          className="flex flex-col lg:flex-row justify-center text-gray-900 dark:text-gray-100/80 mt-[5vh] lg:mt-[10vh] xl:mt-[12vh]"
        >
          <Meta
            title={scrapedData.title ? `${scrapedData.title}` : " "}
            desc={
              scrapedData.desc ? `${scrapedData.desc.slice(10, 154)}...` : ""
            }
            coverIMG={`/img?url=${scrapedData.cover}&output=webp&maxage=30d`}
          />

          <div id="sideContent" className="text-center mx-auto">
            {scrapedData.seriesURL && (
              <a
                href={scrapedData.seriesURL.replace(
                  "https://www.goodreads.com",
                  ""
                )}
                className="text-md italic text-left underline hover:text-rose-600"
              >
                {scrapedData.series}
              </a>
            )}
            <h2 className="font-bold text-3xl xl:text-4xl my-1 p-2 uppercase max-w-2xl mx-auto">
              {scrapedData.title}
            </h2>
            <div className="mt-2 mx-auto max-w-sm xl:max-w-md">
              <span className="font-semibold">By:</span>{" "}
              {scrapedData.author.map((data, i) => (
                <span key={i}>
                  <a
                    className="text-md hover:underline hover:text-rose-600"
                    href={data.url}
                  >
                    {(i ? ", " : "") + data.name}
                  </a>
                </span>
              ))}
            </div>

            <div id="bookCover" className="my-10 mx-auto max-w-xs xl:max-w-sm">
              <h1 className="hidden">Cover:</h1>
              {!imageLoaded && (
                <img
                  src="/cover-placeholder.svg"
                  alt=""
                  width="620"
                  height="962"
                />
              )}
              {scrapedData.cover && (
                <>
                  {/* Load WebP Image With JPG Fallback & 404 Not Found Image*/}
                  <picture className={imageLoaded ? "" : "hidden"}>
                    <source
                      srcSet={`/img?url=${scrapedData.cover}&output=webp&maxage=30d`}
                      type="image/webp"
                      className="rounded-2xl mx-auto shadow-2xl drop-shadow-xl"
                    />
                    <source
                      srcSet={`/img?url=${scrapedData.cover}&maxage=30d`}
                      type="image/jpeg"
                      className="rounded-2xl mx-auto shadow-2xl drop-shadow-xl"
                    />
                    <img
                      src={`/img?url=${scrapedData.cover}&maxage=30d`}
                      className="rounded-2xl mx-auto shadow-2xl drop-shadow-xl"
                      alt=""
                      width="620"
                      height="962"
                      fetchpriority="high"
                      loading="eager"
                      onLoad={() => setImageLoaded(true)}
                    />
                  </picture>
                </>
              )}
            </div>
          </div>
          <div
            id="bookContent"
            className="max-w-full md:max-w-full lg:w-1/2 mx-auto lg:mx-0 p-4 lg:p-0 text-center lg:text-left"
          >
            <div id="bookRating">
              <h2 className="font-bold text-2xl mb-2 mt-8 lg:mt-0 underline decoration-rose-600">
                Rating:{" "}
              </h2>
              <div className="flex justify-center lg:justify-start">
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
                <div>
                  <span className="ml-2 text-md">{scrapedData.rating}</span>
                </div>
              </div>
            </div>
            <div id="bookRatingsAndReviews">
              <h2 className="font-bold text-2xl mb-2 mt-8 lg:mt-0 underline decoration-rose-600">
                Number Of Ratings & Reviews:
              </h2>
              <div className="flex justify-center lg:justify-start">
                <div>
                  <span className="text-md">
                    {scrapedData.ratingCount.includes("1")
                      ? `${scrapedData.ratingCount}Rating`
                      : `${scrapedData.ratingCount}Ratings`}{" "}
                    &amp;{" "}
                    {scrapedData.reviewsCount.includes("reviews")
                      ? scrapedData.reviewsCount.split("reviews")[0]
                      : scrapedData.reviewsCount.split("review")[0]}
                    {scrapedData.reviewsCount.includes("reviews")
                      ? "Reviews"
                      : "Review"}
                  </span>
                </div>
              </div>
            </div>

            {scrapedData.desc && (
              <div
                id="bookDescription"
                className="max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl m-auto lg:m-0"
              >
                <h2 className="font-bold text-2xl my-2 capitalize underline decoration-rose-600">
                  Description:{" "}
                </h2>

                {scrapedData.desc.length < 600 ? (
                  <p id="text">{scrapedData.desc}</p>
                ) : (
                  <ReadMore>{scrapedData.desc}</ReadMore>
                )}
              </div>
            )}
            {scrapedData.genres != "" && (
              <div
                id="bookGenres"
                className={
                  scrapedData.genres
                    ? "max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl m-auto lg:m-0"
                    : "hidden"
                }
              >
                <h2 className="font-bold text-2xl my-2 capitalize underline decoration-rose-600">
                  Genres:{" "}
                </h2>
                <span>
                  {JSON.stringify(scrapedData.genres)
                    .replace("[", "")
                    .replace("]", "")
                    .replace(",", "")
                    .replaceAll(",", ", ")
                    .replaceAll('"', "")}
                </span>
              </div>
            )}
            <div id="bookEdition">
              <h2 className="font-bold text-2xl my-2 capitalize underline decoration-rose-600">
                Book Edition:
              </h2>
              <span className="flex justify-center lg:justify-start mx-auto lg:mx-0 max-w-md text-md">
                {scrapedData.bookEdition}
              </span>
            </div>
            <div id="bookPublishDate">
              <h2 className="font-bold text-2xl my-2 capitalize underline decoration-rose-600">
                Publishing Date:
              </h2>
              <span className="flex justify-center lg:justify-start mx-auto lg:mx-0 max-w-md text-md">
                {scrapedData.publishDate}
              </span>
            </div>
            <div id="bookISBN">
              <h2
                className={
                  scrapedData.isbn
                    ? "font-bold text-2xl my-2 capitalize underline decoration-rose-600"
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
                    ? "font-bold text-2xl my-2 capitalize underline decoration-rose-600"
                    : "hidden"
                }
              >
                Language:{" "}
              </h2>
              <span className="text-md">{scrapedData.lang}</span>
            </div>
            <div id="bookURL" className="hidden sm:flex flex-col mb-4">
              <h2
                className={
                  scrapedData.scrapeURL
                    ? "font-bold text-2xl my-2 capitalize underline decoration-rose-600"
                    : "hidden"
                }
              >
                Goodreads URL:{" "}
              </h2>
              <a
                className="text-blue-600 dark:text-blue-500 underline truncate"
                target="_blank"
                rel="noreferrer"
                href={
                  scrapedData.scrapeURL.includes("https://www.goodreads.com")
                    ? scrapedData.scrapeURL
                    : `https://www.goodreads.com/book/show/${scrapedData.scrapeURL}`
                }
              >
                <p className="text-sm">
                  {scrapedData.scrapeURL.includes("https://www.goodreads.com")
                    ? scrapedData.scrapeURL
                    : `https://www.goodreads.com/book/show/${scrapedData.scrapeURL}`}
                </p>
              </a>
            </div>

            {scrapedData.reviewBreakdown && scrapedData.reviews != 0 && (
              <ReviewBreakdown data={scrapedData} />
            )}
            <div className="block lg:hidden">
              {scrapedData.related != "" && (
                <SimilarBooks data={scrapedData.related} mobile={true} />
              )}
              {scrapedData.reviews != "" && (
                <ReviewsMobile data={scrapedData.reviews} />
              )}
            </div>
          </div>
        </div>
      )}
      {scrapedData.title && (
        <div className="hidden lg:block ml-[14vw] mr-[2vw] 2xl:ml-[16vw] 2xl:mr-[vw] mt-2">
          {scrapedData.related != "" && (
            <SimilarBooks data={scrapedData.related} mobile={false} />
          )}
          {scrapedData.reviews != "" && <Reviews data={scrapedData.reviews} />}
        </div>
      )}
    </>
  );
};

export default ResultData;
