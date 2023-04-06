/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";

const QuoteCard = (props) => {
  const [imageError, setImageError] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <>
      {props.quotes.map((data, i) => (
        <div
          key={i}
          className="max-w-[1820px] mx-2 sm:mx-4 my-4 py-4 px-2 sm:px-8 bg-white/40 dark:bg-slate-800/60 rounded-2xl hover:ring hover:ring-rose-600 hover:bg-rose-300 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40"
        >
          <div className="flex flex-col justify-center">
            <div className="flex items-center justify-between">
              {data.img && (
                <Link
                  href={data.imgURL
                    .replace(
                      "https://images.gr-assets.com",
                      "/img?url=https://images.gr-assets.com"
                    )
                    .replace(
                      "https://i.gr-assets.com",
                      "/img?url=https://i.gr-assets.com"
                    )}
                >
                  <div className="hidden w-[240px] lg:block overflow-hidden hover:rounded-xl ml-10 px-4">
                    {!imageError ? (
                      <picture>
                        <source
                          srcSet={`/img?url=${data.img}&output=webp&maxage=30d`}
                          type="image/webp"
                          className="rounded-md shadow-sm drop-shadow-sm bg-white dark:bg-slate-900"
                        />
                        <source
                          srcSet={`/img?url=${data.img}&maxage=30d`}
                          type="image/jpeg"
                          className="rounded-md shadow-sm drop-shadow-sm bg-white dark:bg-slate-900"
                        />
                        <img
                          src={`/img?url=${data.img}&maxage=30d`}
                          alt={`${data.imgAlt}`}
                          className="rounded-md shadow-sm drop-shadow-sm bg-white dark:bg-slate-900"
                          loading="lazy"
                          width="60"
                          height="120"
                          onError={() => setImageError(true)}
                        />
                      </picture>
                    ) : (
                      <img
                        src="/cover-placeholder.svg"
                        alt=""
                        width="60"
                        height="120"
                        className="rounded-md shadow-sm drop-shadow-sm mx-auto"
                      />
                    )}
                  </div>
                </Link>
              )}
              <div className="mt-8 space-y-8">
                <div
                  className={`flex flex-col items-start ml-4 md:ml-6 text-gray-800 dark:text-gray-300 ${
                    data.mobile ? "max-w-4xl" : "max-w-none"
                  } text-left`}
                >
                  {data.text.length < 300 ? (
                    <>
                      <span>{data.text}</span>
                      <span className="pt-4 font-bold ">
                        - {data.author}
                        {data.bookURL ? (
                          <a
                            className="hover:underline"
                            href={
                              data.bookURL +
                              "-" +
                              data.book.toLowerCase().replaceAll(" ", "-")
                            }
                          >
                            {data.book}
                          </a>
                        ) : (
                          <span>{data.book}</span>
                        )}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className={isReadMore ? "hidden" : "block"}>
                        <span>{data.text}</span>
                        <span className="pt-4 font-bold ">
                          - {data.author}
                          {data.bookURL ? (
                            <a
                              className="hover:underline"
                              href={
                                data.bookURL +
                                "-" +
                                data.book.toLowerCase().replaceAll(" ", "-")
                              }
                            >
                              {data.book}
                            </a>
                          ) : (
                            <span>{data.book}</span>
                          )}
                        </span>
                      </span>
                      <span
                        className={
                          isReadMore ? "block h-12 overflow-hidden" : "hidden"
                        }
                      >
                        <span>{data.text}</span>
                      </span>
                      <span
                        onClick={toggleReadMore}
                        className="p-0.5 rounded-sm underline decoration-2 decoration-rose-800 hover:text-white hover:bg-rose-800 transition duration-150 delay-150 hover:delay-100 cursor-pointer"
                      >
                        {isReadMore ? " ...read more." : "(Show less)"}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            {data.likes && (
              <div
                id="review-likes"
                className="flex align-middle items-center mt-4"
              >
                <div className="ml-6 mt-1">
                  <svg
                    fill="#e5e7eb"
                    height="32px"
                    width="32px"
                    version="1.1"
                    viewBox="0 0 80 90"
                    className="fill-slate-600 dark:fill-slate-500"
                  >
                    <g id="bgCarrier" strokeWidth="0"></g>
                    <g
                      id="tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="iconCarrier">
                      <g>
                        <path d="M51.735,20h-2.934c1.419-3.934,2.799-9.714,0.942-14.247c-1.095-2.673-3.177-4.574-6.021-5.496 C43.197,0.086,42.651,0,42.101,0c-3.701,0-7.05,3.613-11.944,12.888c-2.199,4.171-5.364,7.683-7.593,9.577 c-0.946,0.804-1.702,1.624-2.315,2.431c-1.69-2.512-4.558-4.167-7.806-4.167c-5.185,0-9.404,4.219-9.404,9.404v27.294 c0,5.186,4.219,9.404,9.404,9.404c3.406,0,6.386-1.827,8.036-4.546c2.212,2.728,5.586,4.477,9.364,4.477h23.023 c9.507,0,10.926-6.136,10.926-9.793v-24.91C63.793,25.41,58.384,20,51.735,20z M15.847,57.427c0,1.877-1.527,3.404-3.403,3.404 c-1.877,0-3.404-1.527-3.404-3.404V30.133c0-1.877,1.527-3.404,3.404-3.404c1.876,0,3.403,1.527,3.403,3.404V57.427z M57.793,56.969c0,2.221-0.354,3.793-4.926,3.793H29.844c-3.34,0-6.058-2.717-6.058-6.057V32.059l0.008-0.095l-0.021-0.176 c-0.006-0.096-0.106-2.386,2.676-4.75c2.656-2.258,6.419-6.425,9.015-11.351c4.132-7.83,6.104-9.353,6.639-9.641 c1.039,0.388,1.688,1.007,2.087,1.981c1.293,3.156-0.331,9.224-2.603,13.587l-2.283,4.385h12.43c3.341,0,6.059,2.718,6.059,6.059 V56.969z"></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <div>
                  <p className="ml-1 text-slate-800 dark:text-gray-100">
                    {data.likes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default QuoteCard;
