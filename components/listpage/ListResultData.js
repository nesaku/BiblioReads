/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import DOMPurify from "dompurify";
import Meta from "../global/Meta";
import BookList from "./BookList";

const ListResults = ({ scrapedData }) => {
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div
      id="ListResults"
      className="flex flex-col p-12 justify-center items-center text-center dark:text-gray-100/80"
    >
      <Meta title={scrapedData.title} />
      <h2 className="font-bold text-5xl pt-4 my-2 underline decoration-rose-600 ">
        {scrapedData.title && `${scrapedData.title}:`}
      </h2>

      <div>
        {scrapedData.works && (
          <div
            id="ListWorks"
            className="max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl m-auto lg:m-0 capitalize p-4 sm:p-8"
          >
            <h3 className="font-bold text-2xl my-2 capitalize underline decoration-rose-600">
              Works:
            </h3>
            {scrapedData.works}
          </div>
        )}

        {scrapedData.desc && (
          <div
            id="ListDescription"
            className="max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl m-auto lg:m-0"
          >
            <h3 className="font-bold text-2xl my-2 capitalize underline decoration-rose-600">
              Description:{" "}
            </h3>
            {scrapedData.desc.length < 200 ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    scrapedData.desc
                      .replaceAll("https://www.goodreads.com", "")
                      .replaceAll(
                        "<a",
                        '<a class="text-rose-900 dark:text-rose-600 hover:underline"'
                      )
                  ),
                }}
              />
            ) : (
              <>
                <span
                  className={isReadMore ? "hidden" : "block"}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      scrapedData.desc
                        .replaceAll("https://www.goodreads.com", "")
                        .replaceAll(
                          "<a",
                          '<a class="text-rose-900 dark:text-rose-600 hover:underline"'
                        )
                    ),
                  }}
                />
                <span
                  className={
                    isReadMore ? "block h-36 overflow-hidden" : "hidden"
                  }
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      scrapedData.desc
                        .replaceAll("https://www.goodreads.com", "")
                        .replaceAll(
                          "<a",
                          '<a class="text-rose-900 dark:text-rose-600 hover:underline"'
                        )
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
            )}
          </div>
        )}
      </div>
      {scrapedData.books && <BookList books={scrapedData.books} />}
    </div>
  );
};

export default ListResults;
