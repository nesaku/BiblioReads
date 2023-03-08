/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import Meta from "../global-components/Meta";
import QuoteCard from "./QuoteCard";

const SeriesResults = ({ scrapedData }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      id="seriesResults"
      className="flex flex-col p-12 justify-center items-center text-center"
    >
      <Meta title={scrapedData.name} />

      {scrapedData.image && (
        <Link
          href={`/search/${scrapedData.name
            .toLowerCase()
            .replaceAll(" ", "-")
            .replace("-quotes", "")}?type=books`}
        >
          <a className="flex mr-8">
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
          </a>
        </Link>
      )}
      {scrapedData.quotes && (
        <h2 className="font-bold text-5xl pt-4 pb-5 my-2 underline decoration-rose-600 dark:text-gray-100/80 capitalize">
          {scrapedData.name && `${scrapedData.name}:`}
        </h2>
      )}
      {scrapedData.quotes && scrapedData.quotes.length === 0 && (
        <div className="h-[60vh]">
          <h2 className="font-bold text-4xl text-center pt-4 py-2 mt-24 dark:text-gray-100/80 capitalize">
            No Quotes Found For:{" "}
            <span className="font-normal">{scrapedData.name}</span>
            <div className="flex justify-center mt-32">
              <a
                href={scrapedData.scrapeURL}
                target="_blank"
                rel="noreferrer"
                className="mr-12 font-semibold text-md text-white dark:text-white bg-slate-500 dark:bg-slate-700 ring ring-slate-600 ring-offset-2 ring-offset-slate-100 py-5 px-6 rounded-xl shadow-lg shadow-slate-500 hover:shadow-xl hover:bg-slate-600 hover:dark:bg-slate-600 transition duration-300 delay-40 hover:delay-40"
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
