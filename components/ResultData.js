import React from "react";
import ReadMore from "./ReadMore";
import Meta from "./global-components/Meta";

// Used "const ResultData = ({ scrapedData })" instead of "const ResultData = (props.scrapedData) for readability
const ResultData = ({ scrapedData }) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
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
        <h2 className="font-bold text-3xl xl:text-4xl my-1 p-2 uppercase max-w-2xl">
          {scrapedData.title}
        </h2>

        <p className="mt-2 mx-auto max-w-sm xl:max-w-md">
          <span className="font-semibold">By:</span>{" "}
          <span className="text-md">{scrapedData.author}</span>
        </p>
        <div className="mt-10 mx-auto max-w-xs xl:max-w-sm">
          <h1 className="hidden">Cover:</h1>
          {/* Load WebP Image With JPG Fallback & 404 Not Found Image*/}
          <picture>
            <source
              srcSet={`https://wsrv.nl/?url=${scrapedData.cover}&default=${
                process.env.NEXT_PUBLIC_HOST_URL || "https://biblioreads.ml"
              }/cover-placeholder.svg&output=webp&maxage=30d`}
              type="image/webp"
              className="rounded-2xl w-fit max-h-34 mx-auto shadow-2xl drop-shadow-xl"
            />
            <source
              srcSet={`https://wsrv.nl/?url=${scrapedData.cover}&default=${
                process.env.NEXT_PUBLIC_HOST_URL || "https://biblioreads.ml"
              }/cover-placeholder.svg&maxage=30d`}
              type="image/jpeg"
              className="rounded-2xl w-fit max-h-34 mx-auto shadow-2xl drop-shadow-xl"
            />
            <img
              src={`https://wsrv.nl/?url=${scrapedData.cover}&default=${
                process.env.NEXT_PUBLIC_HOST_URL || "https://biblioreads.ml"
              }/cover-placeholder.svg&maxage=30d`}
              alt={scrapedData.coverAltText}
              className="rounded-2xl w-fit max-h-34 mx-auto shadow-2xl drop-shadow-xl"
              loading="eager"
            />
          </picture>
        </div>
      </div>
      <div className="max-w-full md:max-w-full lg:w-1/2 mx-auto lg:mx-0 p-4 lg:p-0 text-center lg:text-left">
        <h2 className="font-bold text-2xl mb-2 mt-8 lg:mt-0 underline ">
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
        <h2 className="font-bold text-2xl my-2 underline ">
          Number Of Ratings & Reviews:
        </h2>
        <span className="text-md capitalize -ml-3">
          {scrapedData.ratingCount}
        </span>
        <div className="max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl m-auto lg:m-0">
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
        <h2
          className={
            scrapedData.related ? "font-bold text-2xl my-2 underline" : "hidden"
          }
        >
          Similar Books:{" "}
        </h2>

        {scrapedData.related && (
          <div
            id="slider"
            className="no-scrollbar max-w-4xl h-fit flex gap-6 snap-x overflow-x-auto overflow-y-hidden pt-10 pb-10 px-14"
          >
            {scrapedData.related.map((data, i) => (
              <div key={i} className="snap-center shrink-0 first:-ml-12">
                <a href={`${data.url}`}>
                  <picture>
                    <source
                      srcSet={`https://wsrv.nl/?url=${data.src}&default=${
                        process.env.NEXT_PUBLIC_HOST_URL ||
                        "https://biblioreads.ml"
                      }/cover-placeholder.svg&output=webp&maxage=30d`}
                      type="image/webp"
                      className="shrink-0 w-28 h-40 rounded-lg shadow-sm drop-shadow-sm bg-white mx-auto"
                    />
                    <source
                      srcSet={`https://wsrv.nl/?url=${data.src}&default=${
                        process.env.NEXT_PUBLIC_HOST_URL ||
                        "https://biblioreads.ml"
                      }/cover-placeholder.svg&maxage=30d`}
                      type="image/jpeg"
                      className="shrink-0 w-28 h-40 rounded-lg shadow-sm drop-shadow-sm bg-white mx-auto"
                    />
                    <img
                      src={`https://wsrv.nl/?url=${data.src}&default=${
                        process.env.NEXT_PUBLIC_HOST_URL ||
                        "https://biblioreads.ml"
                      }/cover-placeholder.svg&maxage=30d`}
                      alt={scrapedData.coverAltText}
                      className="shrink-0 w-28 h-40 rounded-lg shadow-sm drop-shadow-sm bg-white mx-auto"
                      loading="eager"
                    />
                  </picture>

                  <div className="group w-36 h-20 text-center mx-auto mt-4">
                    <span className="break-words text-md">
                      {data.title.slice(0, 40)}
                      <span className="inline group-hover:hidden">...</span>
                    </span>
                    <span className="hidden group-hover:inline text-md">
                      {data.title.slice(40)}
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
        <div className="hidden md:flex max-w-4xl justify-center lg:justify-start">
          <button className="mx-3" onClick={slideLeft}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              className="fill-gray-900 dark:fill-gray-200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 0C7.16408 0 0 7.16408 0 16C0 24.8359 7.16408 32 16 32C24.8359 32 32 24.8359 32 16C32 7.16408 24.8359 0 16 0ZM20.1273 21.9102L17.3388 24.6988L11.4286 18.7886L8.64 16L11.4286 13.2114L17.3388 7.30122L20.1273 10.0898L14.2237 16L20.1273 21.9102Z" />
            </svg>
          </button>
          <button className="mx-3" onClick={slideRight}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              className="fill-gray-900 dark:fill-gray-200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 0C7.16408 0 0 7.16408 0 16C0 24.8359 7.16408 32 16 32C24.8359 32 32 24.8359 32 16C32 7.16408 24.8359 0 16 0ZM20.5714 18.7886L14.6612 24.6988L11.8727 21.9102L17.7829 16L11.8727 10.0898L14.6612 7.30122L20.5714 13.2114L23.36 16L20.5714 18.7886Z" />
            </svg>
          </button>
        </div>
        <h2 className="font-bold text-2xl my-2 underline mt-12">
          Last Scraped:{" "}
        </h2>
        <span className="text-md">
          <code>{scrapedData.lastScraped}</code>
        </span>
      </div>
    </div>
  );
};

export default ResultData;
