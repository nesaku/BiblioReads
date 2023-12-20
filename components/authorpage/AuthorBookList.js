/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Meta from "../global/Meta";
import BookList from "../listpage/BookList";
import ErrorMessage from "../global/ErrorMessage";

const ListResults = ({ scrapedData }) => {
  const [updatedData, setUpdatedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const previousPageURL =
    Object.keys(updatedData).length === 0
      ? scrapedData.previousPage
      : updatedData.previousPage;

  const nextPageURL =
    Object.keys(updatedData).length === 0
      ? scrapedData.nextPage
      : updatedData.nextPage;

  const fetchPreviousPage = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/author/books`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        page: 1,
        queryURL: `https://www.goodreads.com${previousPageURL}`,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setUpdatedData(data);
      setIsLoading(false);
    } else {
      setError(true);
    }
  };

  const fetchNextPage = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/author/books`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        page: 1,
        queryURL: `https://www.goodreads.com${nextPageURL}`,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setUpdatedData(data);
      setIsLoading(false);
    } else {
      setError(true);
    }
  };

  return (
    <div id="ListResults">
      <Meta title={scrapedData.title} />
      {error ? (
        <ErrorMessage status="500" url={scrapedData.scrapeURL} />
      ) : (
        <div className="flex flex-col p-12 justify-center items-center text-center dark:text-gray-100/80">
          <h2 className="font-bold text-5xl pt-4 my-2 underline decoration-rose-600 ">
            {scrapedData.title && `${scrapedData.title}:`}
          </h2>
          <div>
            {scrapedData.works && (
              <div
                id="ListWorks"
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
                id="ListDescription"
                className="max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl m-auto mt-6 lg:m-0"
              >
                <h2 className="font-bold text-2xl my-2 capitalize underline decoration-rose-600">
                  Description:{" "}
                </h2>
                <p className="capitalize">
                  {scrapedData.desc
                    .replace("Average", " · Average")
                    .replace("rating", "rating:")}
                </p>
              </div>
            )}
          </div>
          {Object.keys(updatedData).length === 0 && scrapedData.books && (
            <BookList books={scrapedData.books} loading={isLoading} />
          )}
          {Object.keys(updatedData).length != 0 && (
            <BookList books={updatedData.books} loading={isLoading} />
          )}
          {!isLoading && (
            <div id="navigationButtons" className="flex mt-10">
              {Object.keys(updatedData).length === 0 &&
                scrapedData.previousPage && (
                  <button
                    type="button"
                    className="flex p-2 border-2 hover:border-rose-800 dark:border-[#710e2a] hover:dark:border-rose-200 duration-200 delay-150 hover:delay-50 transition rounded-lg bg-rose-200 dark:bg-[#710e2a]"
                    aria-label="previous page"
                    onClick={fetchPreviousPage}
                  >
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
                )}
              {updatedData.previousPage != undefined && (
                <button
                  type="button"
                  className="flex p-2 border-2 hover:border-rose-800 dark:border-[#710e2a] hover:dark:border-rose-200 duration-200 delay-150 hover:delay-50 transition rounded-lg bg-rose-200 dark:bg-[#710e2a]"
                  aria-label="previous page"
                  onClick={fetchPreviousPage}
                >
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
              )}
              {Object.keys(updatedData).length === 0 &&
                scrapedData.nextPage && (
                  <button
                    type="button"
                    className="flex p-2 ml-4 border-2 hover:border-rose-800 dark:border-[#710e2a] hover:dark:border-rose-200 duration-200 delay-150 hover:delay-50 transition rounded-lg bg-rose-200 dark:bg-[#710e2a]"
                    aria-label="next page"
                    onClick={fetchNextPage}
                  >
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
                )}
              {updatedData.nextPage != undefined && (
                <button
                  type="button"
                  className="flex p-2 ml-4 border-2 hover:border-rose-800 dark:border-[#710e2a] hover:dark:border-rose-200 duration-200 delay-150 hover:delay-50 transition rounded-lg bg-rose-200 dark:bg-[#710e2a]"
                  aria-label="next page"
                  onClick={fetchNextPage}
                >
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
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListResults;
