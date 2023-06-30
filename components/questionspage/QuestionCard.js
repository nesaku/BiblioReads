/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

const QuoteCard = (props) => {
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <>
      {props.questions.map((data, i) => (
        <div
          key={i}
          className="max-w-[1820px] mx-2 sm:mx-4 my-4 py-4 px-2 sm:px-8 bg-white/40 dark:bg-slate-800/60 rounded-2xl hover:ring hover:ring-rose-600 hover:bg-rose-300 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40"
        >
          <div>
            <div className="flex justify-between items-center mt-2 ml-6">
              <div className="flex items-center">
                <div className="mr-2 w-12 h-12 overflow-hidden shadow rounded-full border-gray-500">
                  {data.avatar && (
                    <picture>
                      <source
                        srcSet={`/img?url=${data.avatar}&output=webp&maxage=30d`}
                        type="image/webp"
                      />
                      <source
                        srcSet={`/img?url=${data.avatar}&maxage=30d`}
                        type="image/jpeg"
                      />
                      <img
                        src={`/img?url=${data.avatar}&maxage=30d`}
                        alt=""
                        loading="lazy"
                      />
                    </picture>
                  )}
                </div>

                <span className="text-slate-800 dark:text-gray-100 group">
                  <span className="text-md font-bold">{data.authorName}</span>
                  <span className="text-sm">&nbsp;- {data.date}</span>
                </span>
              </div>
            </div>
            <div className="mt-8 space-y-8">
              <div id="questions-text">
                <div
                  id="text"
                  className={`flex flex-col items-start ml-4 md:ml-6 text-gray-800 dark:text-gray-300 ${
                    data.mobile ? "max-w-4xl" : "max-w-none"
                  } text-left`}
                >
                  <h2 className="font-bold text-lg mb-6">
                    {data.question && data.question}
                  </h2>
                  {data.answer &&
                    (data.answer.length < 600 ? (
                      <span>{data.answer.replace("(less)", "")}</span>
                    ) : (
                      <>
                        <span
                          className={
                            isReadMore
                              ? "hidden"
                              : "block w-72 sm:w-full overflow-hidden"
                          }
                        >
                          {data.answer.replace("(less)", "")}
                        </span>
                        <span
                          className={
                            isReadMore
                              ? "block h-24 w-72 sm:w-full overflow-hidden"
                              : "hidden"
                          }
                        >
                          {data.answer.replace("(less)", "")}
                        </span>
                        <span
                          onClick={toggleReadMore}
                          className="p-0.5 rounded-sm underline decoration-2 decoration-rose-800 hover:text-white hover:bg-rose-800 transition duration-150 delay-150 hover:delay-100 cursor-pointer"
                        >
                          {isReadMore ? " ...read more." : "(Show less)"}
                        </span>
                      </>
                    ))}
                </div>
              </div>
            </div>
            {data.likes && (
              <div
                id="questions-likes"
                className="flex align-middle items-center mt-4"
              >
                <div className="ml-6 mt-1">
                  <svg
                    fill="#e5e7eb"
                    height="32px"
                    width="32px"
                    version="1.1"
                    viewBox="0 0 80 90"
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
