/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import CoverImage from "../global/CoverImage";

const GenreGrid = ({ scrapedData }) => {
  return (
    <>
      <div
        id="awardHeading"
        className="flex flex-col justify-center items-center dark:text-gray-100/80 text-center "
      >
        {/* The heading text can't be extracted dynamically because this it an image in the 2024 Awards */}
        <h1 className="font-bold text-5xl pt-4 my-2 underline decoration-rose-600 capitalize">
          Readers' Favorite Books
          {scrapedData.scrapeURL.match(/\d{4}$/) &&
            `Of ${scrapedData.scrapeURL.match(/\d{4}$/)}`}
        </h1>
      </div>
      <div
        id="genreGrid"
        className="max-w-8xl flex flex-wrap justify-center gap-8 pt-10 mx-auto"
      >
        {scrapedData.genres.map((data, i) => (
          <div id="genreCard" key={i}>
            <a href={data.url}>
              <div className="h-[260px] w-[300px] flex flex-col items-center text-left p-6 sm:p-6 bg-white/40 dark:bg-slate-800 rounded-2xl hover:ring hover:ring-rose-600 hover:bg-rose-300 dark:hover:bg-rose-900 transition duration-300">
                {data.name && (
                  <div className="w-full text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-semibold text-center">
                      {data.name}
                    </h2>
                  </div>
                )}

                <div className="relative group m-4">
                  <CoverImage
                    src={data.cover}
                    alt={`${data.title} book cover`}
                  />
                  {/*          <span
                    className="absolute left-1/2 bottom-full -translate-x-1/2 mb-2 hidden group-hover:block 
                   bg-gray-800 text-white text-sm px-2 py-1 rounded-md shadow-lg 
                   whitespace-nowrap"
                  >
                    {data.title}
                  </span> */}
                  <span
                    id="tooltip"
                    className="absolute left-1/2 top-full -translate-x-1/2 mt-2 hidden group-hover:block 
                   bg-white/90 dark:bg-slate-800  text-sm px-2 py-1 rounded-md shadow-lg 
                   whitespace-nowrap border-2 border-slate-300 dark:border-slate-700"
                  >
                    {data.title}
                  </span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default GenreGrid;
