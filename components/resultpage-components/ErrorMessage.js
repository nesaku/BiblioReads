/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";

const ErrorMessage = () => {
  return (
    <div className="flex flex-col justify-center max-w-2xl text-center mx-auto h-[74vh]">
      <h2 id="error" className="text-red-600 font-bold text-5xl uppercase">
        Error - Book Not Found
      </h2>
      <div className="px-2">
        <h3 className="mt-12 text-lg text-black font-bold dark:text-gray-100">
          An Example Of A Valid Query Is:{" "}
          <span className="font-normal">
            https://www.goodreads.com/book/show/5907.The_Hobbit
          </span>
        </h3>
        <h3 className="mt-8 mb-12 text-lg text-black font-semibold dark:text-gray-100">
          If you&apos;re sure your query was correct. Please report this by
          creating an issue on{" "}
          <a
            href="https://github.com/nesaku/BiblioReads/issues"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="underline hover:text-blue-600"
          >
            GitHub
          </a>{" "}
          or{" "}
          <a
            href="https://codeberg.org/nesaku/BiblioReads/issues"
            target="_blank"
            rel="noreferrer"
            aria-label="Codeberg"
            className="underline hover:text-blue-600"
          >
            Codeberg
          </a>
          .
        </h3>
      </div>
      <div className="mx-auto">
        <a
          href="/"
          className="font-semibold text-md text-gray-900 dark:text-white bg-rose-500 ring ring-rose-600 ring-offset-2 ring-offset-rose-100 py-5 px-2 rounded-xl shadow-lg shadow-rose-500 hover:shadow-xl hover:bg-rose-600 transition duration-300 delay-40 hover:delay-40"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default ErrorMessage;
