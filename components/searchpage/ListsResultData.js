/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Meta from "../global/Meta";

const SearchResults = (props) => {
  return (
    <div
      id="listsSearchResults"
      className="flex flex-col p-12 justify-center items-center"
    >
      <Meta
        title={
          props.query
            ? props.query
                .replace("https://www.goodreads.com/search?q=", "")
                .toUpperCase()
            : " "
        }
      />
      {props.result &&
        props.result.map((data, i) => (
          <div id="resultCard" key={i} className="max-w-[1000px]">
            <a href={data.listURL}>
              <div className="flex items-center justify-between text-left mt-8 py-6 sm:p-8 bg-white/40 dark:bg-slate-800 rounded-2xl hover:ring hover:ring-rose-600 hover:bg-rose-300 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40">
                <div className="ml-8 pr-2 sm:pr-8 sm:ml-16 w-40 sm:w-64 lg:w-[1000px]">
                  <Link href={data.listURL}>
                    <h3 className="text-lg sm:text-2xl font-semibold hover:underline break-words">
                      {data.title}
                    </h3>
                  </Link>

                  <div className="flex items-center mt-2">
                    <span className="capitalize">
                      <span className="hidden md:block">{data.rating}</span>
                      <span className="block md:hidden">
                        {data.rating.split("avg")[0]}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex mr-8">
                  <picture id="1">
                    <source
                      srcSet={`/img?url=${data.cover
                        .replace("._SX98_SY160_", "")
                        .replace("._SX98_", "")}&output=webp&maxage=30d`}
                      type="image/webp"
                      className="rounded-lg shadow-sm drop-shadow-sm bg-white dark:bg-slate-800"
                    />
                    <source
                      srcSet={`/img?url=${data.cover
                        .replace("._SX98_SY160_", "")
                        .replace("._SX98_", "")}&maxage=30d`}
                      type="image/jpeg"
                      className="rounded-lg shadow-sm drop-shadow-sm bg-white dark:bg-slate-800"
                    />
                    <img
                      src={`/img?url=${data.cover
                        .replace("._SX98_SY160_", "")
                        .replace("._SX98_", "")}&maxage=30d`}
                      alt={`${data.title} list cover`}
                      width="98"
                      height="148"
                      className="rounded-lg border-2 shadow-sm drop-shadow-sm bg-white dark:bg-slate-800"
                      loading="lazy"
                    />
                  </picture>
                </div>
              </div>
            </a>
          </div>
        ))}
    </div>
  );
};

export default SearchResults;
