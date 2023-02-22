/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import * as DOMPurify from "dompurify";
import Meta from "../global-components/Meta";
import SeriesList from "./SeriesList";

const SeriesResults = ({ scrapedData }) => {
  const [imageError, setImageError] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div
      id="seriesResults"
      className="flex flex-col p-12 justify-center items-center text-center"
    >
      <Meta title={scrapedData.title} />
      <h2 className="font-bold text-5xl pt-4 my-2 underline decoration-rose-600 dark:text-gray-100/80">
        {scrapedData.title}:
      </h2>

      <div>
        {scrapedData.works && (
          <div
            id="seriesWorks"
            className="max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl m-auto lg:m-0 capitalize p-4 sm:p-8"
          >
            <h2 className="font-bold text-2xl my-2 capitalize underline decoration-rose-600">
              Works:
            </h2>
            {scrapedData.works}
          </div>
        )}

        {scrapedData.desc && (
          <div
            id="seriesDescription"
            className="max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl m-auto lg:m-0"
          >
            <h2 className="font-bold text-2xl my-2 capitalize underline decoration-rose-600">
              Description:{" "}
            </h2>

            <>
              <span
                className={isReadMore ? "hidden" : "block"}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    scrapedData.desc.replaceAll("https://www.goodreads.com", "")
                  ),
                }}
              />
              <span
                className={isReadMore ? "block h-36 overflow-hidden" : "hidden"}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    scrapedData.desc.replaceAll("https://www.goodreads.com", "")
                  ),
                }}
              />
              <span
                onClick={toggleReadMore}
                className="p-0.5 rounded-sm underline decoration-2 decoration-rose-800 hover:text-white hover:bg-rose-800 transition duration-150 delay-150 hover:delay-100 cursor-pointer"
              >
                {isReadMore ? " ...read more." : "(Show less)"}
              </span>
            </>
          </div>
        )}
      </div>
      {scrapedData.books && (
        <SeriesList
          books={scrapedData.books}
          moreBooks={scrapedData.moreBooks}
        />
      )}
    </div>
  );
};

export default SeriesResults;
