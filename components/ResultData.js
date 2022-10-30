import React from "react";
import ReadMore from "./ReadMore";

// Used "const ResultData = ({ scrapedData })" instead of "const ResultData = (props.scrapedData) for readability
const ResultData = ({ scrapedData }) => {
  return (
    /* Don't show result data if the title is not loaded */
    <div
      className={
        scrapedData.title
          ? "flex items-center flex-col xl:flex-row text-gray-900 dark:text-gray-200"
          : "hidden"
      }
    >
      <div className="mt-16 xl:mb-96 xl:mt-40 lg:mt-10 ml-20 mr-10 text-center max-w-sm">
        <span className="text-md italic text-left">{scrapedData.series}</span>
        <h2 className="font-bold text-4xl my-1 uppercase">
          {scrapedData.title}
        </h2>
        <p className="mt-2">
          <span className="font-semibold">By:</span>{" "}
          <span className="text-md">{scrapedData.author}</span>
        </p>
        <div className="mt-10 mx-auto">
          <h1 className="hidden">Cover:</h1>
          {/* Load WebP Image With JPG Fallback & 404 Not Found Image*/}
          <picture>
            <source
              srcSet={`https://images.weserv.nl/?url=${scrapedData.cover}&default=${process.env.NEXT_PUBLIC_HOST_URL}/cover-placeholder.svg&output=webp&maxage=30d`}
              type="image/webp"
              className="rounded-2xl w-fit h-fit mx-auto shadow-2xl drop-shadow-xl"
            />
            <source
              srcSet={`https://images.weserv.nl/?url=${scrapedData.cover}&default=${process.env.NEXT_PUBLIC_HOST_URL}/cover-placeholder.svg&maxage=30d`}
              type="image/jpeg"
              className="rounded-2xl w-fit h-fit mx-auto shadow-2xl drop-shadow-xl"
            />
            <img
              src={`https://images.weserv.nl/?url=${scrapedData.cover}&default=${process.env.NEXT_PUBLIC_HOST_URL}/cover-placeholder.svg&maxage=30d`}
              alt={scrapedData.coverAltText}
              className="rounded-2xl w-fit h-fit mx-auto shadow-2xl drop-shadow-xl"
              loading="eager"
            />
          </picture>
        </div>
      </div>
      <div id="divider" className="2xl:p-20 xl:p-0"></div>
      <div className="flex flex-col items-center xl:items-start mt-0 xl:mb-40 text-center xl:text-left py-10 xl:max-w-2xl">
        <h2 className="font-bold text-2xl mb-2 underline">Rating: </h2>
        <span className="text-md">{scrapedData.rating}</span>
        <h2 className="font-bold text-2xl my-2 underline ">
          Number Of Ratings & Reviews:
        </h2>
        <span className="text-md capitalize">{scrapedData.ratingCount}</span>
        <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl  xl:px-0 lg:px-10">
          <h2 className="font-bold text-2xl my-2 underline">Desciption: </h2>
          <ReadMore>{scrapedData.desc ? scrapedData.desc : "Loading"}</ReadMore>
        </div>
        <h2 className="font-bold text-2xl my-2 underline">Publishing Date:</h2>
        <span className="max-w-lg text-md">{scrapedData.publishDate}</span>
        <h2
          className={
            scrapedData.isbn ? "font-bold text-2xl my-2 underline" : "hidden"
          }
        >
          ISBN:
        </h2>
        <span className="text-md">{scrapedData.isbn}</span>
        <h2
          className={
            scrapedData.lang ? "font-bold text-2xl my-2 underline" : "hidden"
          }
        >
          Language:{" "}
        </h2>
        <span className="text-md">{scrapedData.lang}</span>
        <h2 className="font-bold text-2xl my-2 underline">Last scraped: </h2>
        <span className="text-md">
          <code>{scrapedData.lastScraped}</code>
        </span>
      </div>
    </div>
  );
};

export default ResultData;
