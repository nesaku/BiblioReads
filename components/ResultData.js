import React from "react";
import Meta from "./Meta";
import ReadMore from "./ReadMore";

// Used "const ResultData = ({ scrapedData })" instead of "const ResultData = (props.scrapedData) for readability
const ResultData = ({ scrapedData }) => {
  return (
    /* Don't show result data if the title is not loaded */
    <div
      className={
        scrapedData.title
          ? "flex flex-col lg:flex-row justify-center text-gray-900 dark:text-gray-200 my-[5vh] lg:my-[10vh] xl:my-[12vh]"
          : "hidden"
      }
    >
      <Meta
        text={scrapedData.title ? `${scrapedData.title}` : ""}
        description={
          scrapedData.desc ? `${scrapedData.desc.slice(10, 154)}...` : ""
        }
      />
      <div className="text-center mx-auto">
        <span className="text-md italic text-left">{scrapedData.series}</span>
        <h2 className="font-bold text-4xl my-1 uppercase">
          {scrapedData.title}
        </h2>
        <p className="mt-2 max-w-md">
          <span className="font-semibold">By:</span>{" "}
          <span className="text-md">{scrapedData.author}</span>
        </p>
        <div className="mt-10 mx-auto max-w-xs xl:max-w-sm">
          <h1 className="hidden">Cover:</h1>
          {/* Load WebP Image With JPG Fallback & 404 Not Found Image*/}
          <picture>
            <source
              srcSet={`https://wsrv.nl/?url=${scrapedData.cover}&default=${process.env.NEXT_PUBLIC_HOST_URL}/cover-placeholder.svg&output=webp&maxage=30d`}
              type="image/webp"
              className="rounded-2xl w-fit h-fit mx-auto shadow-2xl drop-shadow-xl"
            />
            <source
              srcSet={`https://wsrv.nl/?url=${scrapedData.cover}&default=${process.env.NEXT_PUBLIC_HOST_URL}/cover-placeholder.svg&maxage=30d`}
              type="image/jpeg"
              className="rounded-2xl w-fit h-fit mx-auto shadow-2xl drop-shadow-xl"
            />
            <img
              src={`https://wsrv.nl/?url=${scrapedData.cover}&default=${process.env.NEXT_PUBLIC_HOST_URL}/cover-placeholder.svg&maxage=30d`}
              alt={scrapedData.coverAltText}
              className="rounded-2xl w-fit h-fit mx-auto shadow-2xl drop-shadow-xl"
              loading="eager"
            />
          </picture>
        </div>
      </div>
      <div className="max-w-sm md:max-w-full lg:w-1/2 mx-auto lg:mx-0 p-4 lg:p-0 text-center lg:text-left">
        <h2 className="font-bold text-2xl mb-2 mt-8 lg:mt-0 underline ">
          Rating:{" "}
        </h2>
        <span className="text-md">{scrapedData.rating}</span>
        <h2 className="font-bold text-2xl my-2 underline ">
          Number Of Ratings & Reviews:
        </h2>
        <span className="text-md capitalize">{scrapedData.ratingCount}</span>
        <div className="max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl">
          <h2 className="font-bold text-2xl my-2 underline">Description: </h2>
          <ReadMore>{scrapedData.desc ? scrapedData.desc : "Loading"}</ReadMore>
        </div>
        <h2 className="font-bold text-2xl my-2 underline">Publishing Date:</h2>
        <span className="flex mx-auto lg:mx-0 max-w-md text-md">
          {scrapedData.publishDate}
        </span>
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
        <h2 className="font-bold text-2xl my-2 underline">Last Scraped: </h2>
        <span className="text-md">
          <code>{scrapedData.lastScraped}</code>
        </span>
      </div>
    </div>
  );
};

export default ResultData;
