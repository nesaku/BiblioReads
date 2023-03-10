/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import Meta from "../global-components/Meta";
import QuestionCard from "./QuestionCard";

const QuestionResults = ({ scrapedData }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      id="questionResults"
      className="flex flex-col p-12 justify-center items-center text-center"
    >
      <Meta title={scrapedData.book && `${scrapedData.book} - Questions`} />

      {scrapedData.questions && (
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <Link
            href={scrapedData.bookURL.replace("https://www.goodreads.com", "")}
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
                    width="98"
                    height="98"
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
          <h2 className="max-w-xl font-bold text-5xl pt-4 pb-5 my-2  decoration-rose-600 dark:text-gray-100/80 capitalize">
            Questions About{" "}
            <Link
              href={scrapedData.bookURL.replace(
                "https://www.goodreads.com",
                ""
              )}
            >
              <a className="hover:underline">{scrapedData.book}</a>
            </Link>
            :
          </h2>
        </div>
      )}
      {scrapedData.questions && scrapedData.questions.length === 0 && (
        <div className="h-[60vh]">
          <h2 className="font-bold text-4xl text-center pt-4 py-2 mt-24 dark:text-gray-100/80 capitalize">
            No Questions Found For:{" "}
            <span className="font-normal">{scrapedData.book}</span>
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
      {scrapedData.questions && (
        <QuestionCard questions={scrapedData.questions} />
      )}
    </div>
  );
};

export default QuestionResults;
