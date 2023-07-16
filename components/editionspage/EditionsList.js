/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const EditionsList = (props) => {
  return (
    <div id="editionsList">
      {props.editions.map((data, i) => (
        <div key={i} className="max-w-[1820px]">
          <a href={data.url}>
            <div
              id="editionInfo"
              className="flex items-center justify-between text-left mt-8 py-6 sm:p-8 bg-white/40 dark:bg-slate-800 rounded-2xl hover:ring hover:ring-rose-600 hover:bg-rose-300 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40"
            >
              <div className="ml-8 sm:ml-16 w-48 sm:w-full">
                <Link href={data.url}>
                  <h3 className="text-xl sm:text-2xl font-semibold hover:underline">
                    {data.title}
                  </h3>
                </Link>
                <div className="flex items-center mt-4 mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0621 1.65925L15.5435 6.67764C15.716 7.02667 16.0496 7.26852 16.4356 7.3244L21.9843 8.12919C22.9562 8.27027 23.344 9.46212 22.641 10.146L18.626 14.0522C18.3469 14.3239 18.2194 14.7155 18.2854 15.0989L19.2331 20.6147C19.3992 21.5807 18.3832 22.3173 17.514 21.8615L12.5514 19.2575C12.2063 19.0766 11.7937 19.0766 11.4486 19.2575L6.48598 21.8615C5.6168 22.3177 4.60078 21.5807 4.7669 20.6147L5.71455 15.0989C5.78064 14.7155 5.65306 14.3239 5.37404 14.0522L1.35905 10.146C0.655998 9.46166 1.04378 8.26982 2.01575 8.12919L7.56441 7.3244C7.95036 7.26852 8.28398 7.02667 8.45653 6.67764L10.9379 1.65925C11.372 0.780251 12.6276 0.780251 13.0621 1.65925Z"
                      fill="#ED8A19"
                    />
                  </svg>
                  <span className="ml-2 capitalize font-semibold">
                    {data.rating.split("(")[0]}
                  </span>
                  <span className="hidden sm:block ml-1 capitalize">
                    &#40;{data.rating.split("(")[1]}
                  </span>
                </div>
                <div className="text-slate-700 dark:text-gray-200 font-normal">
                  <div className="text-sm sm:text-[1rem]">
                    <p className="mb-2">{data.publishDate}</p>
                    <p>{data.editionInfo.split("Author")[0]}</p>
                  </div>
                  <div className="mt-4 text-sm">
                    {data.ISBN && (
                      <p>
                        <span className="font-bold">ISBN:</span> {data.ISBN}
                      </p>
                    )}
                    {data.ASIN && (
                      <p>
                        <span className="font-bold">ASIN:</span> {data.ASIN}
                      </p>
                    )}
                    {data.editionLanguage && (
                      <p>
                        <span className="font-bold">Edition Language:</span>{" "}
                        {data.editionLanguage}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {data.cover && (
                <div className="flex mr-8 pl-6">
                  <picture>
                    <source
                      srcSet={`/img?url=${data.cover
                        .replace("._SX50_SY75_", "")
                        .replace("._SY75_", "")
                        .replace("._SX50_", "")}&output=webp&maxage=30d`}
                      type="image/webp"
                      className="rounded-lg shadow-sm drop-shadow-sm bg-white dark:bg-slate-900"
                    />
                    <source
                      srcSet={`/img?url=${data.cover
                        .replace("._SX50_SY75_", "")
                        .replace("._SY75_", "")
                        .replace("._SX50_", "")}&maxage=30d`}
                      type="image/jpeg"
                      className="rounded-lg shadow-sm drop-shadow-sm bg-white dark:bg-slate-900"
                    />
                    <img
                      src={`/img?url=${data.cover
                        .replace("._SX50_SY75_", "")
                        .replace("._SY75_", "")
                        .replace("._SX50_", "")}&maxage=30d`}
                      alt={`${data.title} book cover`}
                      width="98"
                      height="148"
                      className="rounded-lg border-2 shadow-sm drop-shadow-sm bg-white dark:bg-slate-900 text-center"
                      loading="lazy"
                    />
                  </picture>
                </div>
              )}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default EditionsList;
