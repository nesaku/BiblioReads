/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReadMore from "./ReadMore";
import Reviews from "./Reviews";
import ReviewsMobile from "./ReviewsMobile";
import SimilarBooks from "./SimilarBooks";
import Meta from "../global/Meta";
import ReviewBreakdown from "./ReviewBreakdown";
import Link from "next/link";
import { openDB } from "idb";
import Toast from "../global/Toast";

const ResultData = ({ scrapedData }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showToast, setShowToast] = useState("");
  const router = useRouter();

  async function initializeDB() {
    try {
      return await openDB("library", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("books")) {
            db.createObjectStore("books");
          }
        },
      });
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  }

  useEffect(() => {
    const savedBookCheck = async () => {
      try {
        const db = await initializeDB();
        if (router.query.slug) {
          const bookInDB = await db.get("books", router.query.slug[0]);
          setIsSaved(bookInDB !== undefined);
        }
      } catch (error) {
        console.error("Error checking saved book:", error);
      }
    };

    savedBookCheck();
  }, [router.query.slug]);

  useEffect(() => {
    async function manageBooks() {
      try {
        const db = await initializeDB();
        const slug = router.query.slug;

        if (slug) {
          if (isSaved && scrapedData) {
            const book = {
              slug: slug[0],
              timestamp: Date.now(),
              cover: scrapedData.cover,
              title: scrapedData.title,
              author: scrapedData.author,
              rating: scrapedData.rating,
            };

            await db.put("books", book, slug[0]);
            if (isClicked) {
              setShowToast("Book added to library");
              setTimeout(() => setShowToast(""), 3000);
            }
          } else if (slug.length > 0) {
            await db.delete("books", slug[0]);
            if (isClicked) {
              setShowToast("Book removed from library");
              setTimeout(() => setShowToast(""), 3000);
            }
          }

          /* 
          // List all books in DB
          const allBooks = await db.getAll("books");
           console.log(allBooks);
           */
        }
      } catch (error) {
        console.error("Error managing books:", error);
      }
    }

    manageBooks();
  }, [isSaved, scrapedData]);

  const externalSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -256 1850 1850"
      className="w-5 h-5 ml-2 -mr-1"
      fill="currentColor"
    >
      <g transform="matrix(1,0,0,-1,30.372881,1426.9492)">
        <path d="M 1408,608 V 288 Q 1408,169 1323.5,84.5 1239,0 1120,0 H 288 Q 169,0 84.5,84.5 0,169 0,288 v 832 Q 0,1239 84.5,1323.5 169,1408 288,1408 h 704 q 14,0 23,-9 9,-9 9,-23 v -64 q 0,-14 -9,-23 -9,-9 -23,-9 H 288 q -66,0 -113,-47 -47,-47 -47,-113 V 288 q 0,-66 47,-113 47,-47 113,-47 h 832 q 66,0 113,47 47,47 47,113 v 320 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z m 384,864 V 960 q 0,-26 -19,-45 -19,-19 -45,-19 -26,0 -45,19 L 1507,1091 855,439 q -10,-10 -23,-10 -13,0 -23,10 L 695,553 q -10,10 -10,23 0,13 10,23 l 652,652 -176,176 q -19,19 -19,45 0,26 19,45 19,19 45,19 h 512 q 26,0 45,-19 19,-19 19,-45 z" />
      </g>
    </svg>
  );

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
              <Link
                href={scrapedData.seriesURL.replace(
                  "https://www.goodreads.com",
                  ""
                )}
              >
                <a className="text-md italic text-left underline hover:text-rose-600">
                  {scrapedData.series}
                </a>
              </Link>
            )}
            <h1 className="font-bold text-3xl xl:text-4xl my-1 p-2 uppercase max-w-2xl mx-auto">
              {scrapedData.title}
            </h1>
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

            <div id="bookCover" className="mt-10 mx-auto max-w-xs xl:max-w-sm">
              {!imageLoaded && (
                <>
                  <div
                    id="addToLibraryFallback"
                    className="flex items-end justify-end font-mono text-sm font-bold -mb-24"
                  >
                    <button
                      onClick={() => {
                        !isSaved ? setIsSaved(true) : setIsSaved(false);
                        setIsClicked(true);
                      }}
                      className="w-14 z-10 h-24 flex items-center justify-center bg-[#881133] text-2xl rounded-b-md shadow-lg border-2 border-slate-800/60"
                    >
                      <svg
                        viewBox="0 0 257 445"
                        className={`w-[50%]  ${
                          !isSaved ? "text-gray-50" : "text-[#ed8a19]"
                        } hover:text-[#ed8a19] border-black`}
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M30.0326 -1.20215e-05C13.446 -1.20215e-05 0 14.4411 0 32.254V444.073L128.5 323.718L257 444.073V32.254C257 14.4411 243.554 -1.20215e-05 226.969 -1.20215e-05H30.0326Z" />
                      </svg>
                    </button>
                  </div>
                  <img
                    src="/cover-placeholder.svg"
                    alt=""
                    width="620"
                    height="962"
                  />
                </>
              )}
              <div id="libraryToast">
                {showToast && <Toast message={showToast} />}
              </div>
              {imageLoaded && (
                <div
                  id="addToLibrary"
                  className="flex items-end justify-end font-mono text-sm font-bold -mb-24"
                >
                  <button
                    onClick={() => {
                      !isSaved ? setIsSaved(true) : setIsSaved(false);
                      setIsClicked(true);
                    }}
                    className="w-14 z-10 h-24 flex items-center justify-center bg-[#881133] text-2xl rounded-b-md shadow-lg border-2 border-slate-800/60"
                  >
                    <svg
                      viewBox="0 0 257 445"
                      className={`w-[50%]  ${
                        !isSaved ? "text-gray-50" : "text-[#ed8a19]"
                      } hover:text-[#ed8a19] border-black`}
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M30.0326 -1.20215e-05C13.446 -1.20215e-05 0 14.4411 0 32.254V444.073L128.5 323.718L257 444.073V32.254C257 14.4411 243.554 -1.20215e-05 226.969 -1.20215e-05H30.0326Z" />
                    </svg>
                  </button>
                </div>
              )}
              {scrapedData.cover && (
                <>
                  {/* Load WebP Image With JPG Fallback*/}
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
                      className="rounded-2xl border-2 mx-auto shadow-2xl drop-shadow-xl"
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

              <div className="flex flex-col mt-0 lg:mt-16 xl:mt-0">
                <div
                  id="purchaseOptions"
                  className="flex flex-col justify-center items-center relative z-10"
                >
                  <button
                    onClick={() => setIsOpened(!isOpened)}
                    className="flex justify-center items-center h-16 w-72 py-5 px-4 mt-6 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-2xl shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 dark:hover:bg-slate-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-400 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600 capitalize"
                  >
                    Get a copy
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      className="w-5 h-5 ml-4"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </button>
                  {isOpened && (
                    <div className="absolute top-24 w-72 rounded-md shadow-lg mt-1 text-md font-medium bg-rose-50 dark:bg-gray-800 ring-2 ring-slate-400 dark:ring-slate-200 dark:ring-opacity-20">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.amazon.com/s?k=${encodeURIComponent(
                          scrapedData.title
                        )}`}
                        className="flex justify-between items-center px-8 py-3 hover:bg-rose-300/80 dark:hover:bg-slate-700"
                      >
                        Amazon
                        {externalSVG}
                      </a>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.barnesandnoble.com/s/${encodeURIComponent(
                          scrapedData.title
                        )}`}
                        className="flex justify-between items-center px-8 py-3 hover:bg-rose-300/80 dark:hover:bg-slate-700"
                      >
                        Barnes &amp; Noble
                        {externalSVG}
                      </a>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.abebooks.com/servlet/SearchResults?kn=${encodeURIComponent(
                          scrapedData.title
                        )}`}
                        className="flex justify-between items-center px-8 py-3 hover:bg-rose-300/80 dark:hover:bg-slate-700"
                      >
                        AbeBooks
                        {externalSVG}
                      </a>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.amazon.com/s?k=${encodeURIComponent(
                          scrapedData.title
                        )}&i=audible`}
                        className="flex justify-between items-center px-8 py-3 hover:bg-rose-300/80 dark:hover:bg-slate-700"
                      >
                        Audible {externalSVG}
                      </a>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://search.worldcat.org/search?q=${encodeURIComponent(
                          scrapedData.title
                        )}&itemType=book`}
                        className="flex justify-between items-center px-8 py-3 hover:bg-rose-300/80 dark:hover:bg-slate-700"
                      >
                        Libraries
                        {externalSVG}
                      </a>
                    </div>
                  )}
                </div>

                {scrapedData.seriesURL && (
                  <div className="mt-4 items-center justify-center flex">
                    <Link
                      href={scrapedData.seriesURL.replace(
                        "https://www.goodreads.com",
                        ""
                      )}
                    >
                      <a className="flex justify-center items-center h-16 w-72 py-5 px-4 mt-2 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-2xl shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 dark:hover:bg-slate-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-400 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600">
                        Browse This Series
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 ml-2 -mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </a>
                    </Link>
                  </div>
                )}
                <div
                  id="quotes-questions"
                  className="flex justify-around mt-2 mb-4"
                >
                  {scrapedData.quotes != "Add" && (
                    <div className="mt-4 items-center justify-center flex">
                      <Link
                        href={scrapedData.quotesURL.replace(
                          "https://www.goodreads.com",
                          ""
                        )}
                      >
                        <a className="flex items-center py-5 px-4 mx-2 xl:mx-0 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-full shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 dark:hover:bg-slate-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-400 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600">
                          {scrapedData.quotes}{" "}
                          {scrapedData.quotes == "1" ? "Quote" : "Quotes"}
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </a>
                      </Link>
                    </div>
                  )}
                  {scrapedData.questions != "Ask" && (
                    <div className="mt-4 items-center justify-center flex">
                      <Link
                        href={scrapedData.questionsURL
                          .replace("questions", "")
                          .replace(
                            "https://www.goodreads.com/book",
                            "/work/questions"
                          )}
                      >
                        <a className="flex items-center py-5 px-4 mx-2 xl:mx-0 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-full shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 dark:hover:bg-slate-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-400 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600">
                          {scrapedData.questions}{" "}
                          {scrapedData.questions == "1"
                            ? "Question"
                            : "Questions"}
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
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
            {scrapedData.bookEdition && (
              <div id="bookEdition">
                <h2 className="font-bold text-2xl my-2 capitalize underline decoration-rose-600">
                  Book Edition:
                </h2>
                <span className="flex justify-center lg:justify-start mx-auto lg:mx-0 max-w-md text-md">
                  {scrapedData.bookEdition}
                </span>
                <Link
                  href={scrapedData.quotesURL.replace(
                    "https://www.goodreads.com/work/quotes/",
                    "/work/editions/"
                  )}
                >
                  <a>
                    <p className="mt-3 mb-4 mx-auto lg:mx-0 max-w-md underline hover:text-rose-600">
                      View More Editions &#8250;
                    </p>
                  </a>
                </Link>
              </div>
            )}
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
              {scrapedData.quotesURL != "" && (
                <SimilarBooks quotesURL={scrapedData.quotesURL} mobile={true} />
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
          {scrapedData.quotesURL != "" && (
            <SimilarBooks quotesURL={scrapedData.quotesURL} mobile={false} />
          )}
          {scrapedData.reviews != "" && <Reviews data={scrapedData.reviews} />}
        </div>
      )}
    </>
  );
};

export default ResultData;
