import React from "react";

const YearLinks = ({ scrapeURL }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      {Array.from({ length: new Date().getFullYear() - 2013 + 1 }, (_, i) => {
        const year = 2013 + i;

        const basePath = scrapeURL.split("/").pop().replace(/-\d+$/, "");

        // Build the new URL with the selected year
        const url = `/choiceawards/${basePath}-${year}`;

        return (
          <a
            key={year}
            href={url}
            className="px-3 py-1 m-2 rounded-full font-semibold text-sm text-gray-900 dark:text-gray-300 bg-rose-50/80 dark:bg-gray-800 ring-1 ring-rose-600 shadow-sm transition duration-300 ease-in-out hover:ring-2 hover:shadow-xl dark:hover:ring-rose-600"
          >
            {year}
          </a>
        );
      })}
    </div>
  );
};

export default YearLinks;
