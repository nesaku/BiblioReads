/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Meta from "../global-components/Meta";
import AuthorBooks from "./AuthorBooks";
import * as DOMPurify from "dompurify";
import AuthorSeries from "./AuthorSeries";

const AuthorResultData = ({ scrapedData }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <>
      {scrapedData.name && (
        <div
          id="wrapper"
          className="flex flex-col lg:flex-row justify-center text-gray-900 dark:text-gray-100/80 mt-[5vh] lg:mt-[10vh] xl:mt-[12vh]"
        >
          <Meta
            title={scrapedData.name ? `${scrapedData.name}` : " "}
            desc={
              scrapedData.desc ? `${scrapedData.desc.slice(10, 154)}...` : ""
            }
            coverIMG={`/img?url=${scrapedData.image}&output=webp&maxage=30d`}
          />
          <div id="sideContent" className="text-center mx-auto">
            <h2 className="font-bold text-3xl xl:text-4xl uppercase max-w-2xl mx-auto">
              {scrapedData.name}
            </h2>
            <div id="authorImage" className="my-6 mx-auto max-w-xs xl:max-w-sm">
              <h1 className="hidden">Cover:</h1>
              {!imageLoaded && (
                <img
                  src="/cover-placeholder.svg"
                  alt=""
                  width="620"
                  height="962"
                />
              )}
              {scrapedData.image && (
                <>
                  {/* Load WebP Image With JPG Fallback & 404 Not Found Image*/}
                  <picture className={imageLoaded ? "" : "hidden"}>
                    <source
                      srcSet={`/img?url=${scrapedData.image}&output=webp&maxage=30d`}
                      type="image/webp"
                      className="rounded-2xl mx-auto shadow-2xl drop-shadow-xl"
                    />
                    <source
                      srcSet={`/img?url=${scrapedData.image}&maxage=30d`}
                      type="image/jpeg"
                      className="rounded-2xl mx-auto shadow-2xl drop-shadow-xl"
                    />
                    <img
                      src={`/img?url=${scrapedData.image}&maxage=30d`}
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
            id="authorContent"
            className="max-w-full md:max-w-full lg:w-1/2 mx-auto lg:mx-0 p-4 lg:p-0 text-center lg:text-left"
          >
            {scrapedData.website && (
              <div id="authorWebsite">
                <h2 className="font-bold text-2xl mr-2 mt-8 lg:mt-6 underline decoration-rose-600">
                  Website:
                </h2>
                <div className="flex justify-center lg:justify-start">
                  <div>
                    <a
                      className="text-md text-blue-600 dark:text-blue-400 underline"
                      target="_blank"
                      rel="noreferrer"
                      href={scrapedData.website}
                    >
                      {scrapedData.website}
                    </a>
                  </div>
                </div>
              </div>
            )}
            <div id="authorGenre">
              <h2 className="font-bold text-2xl mr-2 mt-8 lg:mt-2 underline decoration-rose-600">
                Genre:
              </h2>
              <div className="flex justify-center lg:justify-start">
                <div>
                  <span>
                    {scrapedData.genre &&
                      JSON.stringify(scrapedData.genre)
                        .replace("[", "")
                        .replace("]", "")
                        .replaceAll(",", ", ")
                        .replaceAll('"', "")}
                  </span>
                </div>
              </div>
            </div>
            {scrapedData.birthDate && (
              <div id="authorBirthDate">
                <h2 className="font-bold text-2xl mr-2 mt-8 lg:mt-2 underline decoration-rose-600">
                  Birth Date:
                </h2>
                <div className="flex justify-center lg:justify-start">
                  <div>
                    <span className="text-md">{scrapedData.birthDate}</span>
                  </div>
                </div>
              </div>
            )}

            <div
              id="authorDescription"
              className="max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl m-auto lg:m-0"
            >
              <h2 className="font-bold text-2xl my-2 capitalize underline decoration-rose-600">
                Description:{" "}
              </h2>
              {scrapedData.desc && (
                <>
                  <span
                    className={isReadMore ? "hidden" : "block"}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(scrapedData.desc),
                    }}
                  />
                  <span
                    className={
                      isReadMore ? "block h-36 overflow-hidden" : "hidden"
                    }
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(scrapedData.desc),
                    }}
                  />
                  <span
                    onClick={toggleReadMore}
                    className="p-0.5 rounded-sm underline decoration-2 decoration-rose-800 hover:text-white hover:bg-rose-800 transition duration-150 delay-150 hover:delay-100 cursor-pointer"
                  >
                    {isReadMore ? " ...read more." : "(Show less)"}
                  </span>
                </>
              )}
            </div>

            <div id="authorURL" className="mb-6">
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
                className="text-blue-600 dark:text-blue-500 underline"
                target="_blank"
                rel="noreferrer"
                href={
                  scrapedData.scrapeURL.includes("https://www.goodreads.com")
                    ? scrapedData.scrapeURL
                    : `https://www.goodreads.com/author/show/${scrapedData.scrapeURL}`
                }
              >
                <span className=" text-xs lg:text-md">
                  {scrapedData.scrapeURL.includes("https://www.goodreads.com")
                    ? scrapedData.scrapeURL
                    : `https://www.goodreads.com/author/show/${scrapedData.scrapeURL}`}
                </span>
              </a>
            </div>
            <div className="block lg:hidden">
              {scrapedData.books != "" && (
                <AuthorBooks
                  name={scrapedData.name}
                  books={scrapedData.books}
                  mobile={true}
                />
              )}
              {scrapedData.series != "" && (
                <AuthorSeries
                  name={scrapedData.name}
                  series={scrapedData.series}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {scrapedData.name && (
        <>
          <div className="hidden lg:block ml-[14vw] mr-[2vw] 2xl:ml-[16vw] 2xl:mr-[vw] mt-2">
            {scrapedData.books != "" && (
              <AuthorBooks
                name={scrapedData.name}
                books={scrapedData.books}
                mobile={false}
              />
            )}
          </div>
          <div className="hidden lg:block ml-[14vw] mr-[2vw] 2xl:ml-[16vw] 2xl:mr-[vw] mt-2">
            {scrapedData.series != "" && (
              <AuthorSeries
                name={scrapedData.name}
                series={scrapedData.series}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default AuthorResultData;
