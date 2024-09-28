/* eslint-disable @next/next/no-img-element */

import { cleanImageUrl } from "../../utils/cleanImageUrl";

const AuthorList = ({ libraryData }) => {
  return (
    <div
      id="AuthorList"
      className="flex flex-col dark:text-gray-100/80 px-4 items-center justify-center"
    >
      {Object.values(libraryData)
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((data, i) => {
          if (Object.keys(data).length === 0) {
            return null;
          }
          return (
            <div key={i} className="max-w-[1000px] w-full">
              <a href={`/author/show/${data.slug}`}>
                <div className="flex items-center justify-between text-left mt-8 py-6 sm:p-8 bg-white/40 dark:bg-slate-800 rounded-2xl hover:ring hover:ring-rose-600 hover:bg-rose-300 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40">
                  <div className="ml-8 sm:ml-16 w-48 sm:w-11/12">
                    <h3 className="text-xl sm:text-2xl font-semibold hover:underline">
                      {data.name}
                    </h3>
                    <div className="flex items-center mt-4 pr-2">
                      <span className="capitalize text-sm">
                        Added:{" "}
                        {new Date(data.timestamp).toLocaleString("default", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex mr-8">
                    {data.image && (
                      <picture>
                        <source
                          srcSet={`/img?url=${cleanImageUrl(
                            data.image
                          )}&output=webp&maxage=30d`}
                          type="image/webp"
                          className="rounded-lg shadow-sm drop-shadow-sm bg-white dark:bg-slate-900"
                        />
                        <source
                          srcSet={`/img?url=${cleanImageUrl(
                            data.image
                          )}&maxage=30d`}
                          type="image/jpeg"
                          className="rounded-lg shadow-sm drop-shadow-sm bg-white dark:bg-slate-900"
                        />
                        <img
                          src={`/img?url=${cleanImageUrl(
                            data.image
                          )}&maxage=30d`}
                          alt={`${data.name}'s image`}
                          width="98"
                          height="148"
                          className="rounded-lg border-2 shadow-sm drop-shadow-sm bg-white dark:bg-slate-900"
                          loading="lazy"
                        />
                      </picture>
                    )}
                  </div>
                </div>
              </a>
            </div>
          );
        })}
    </div>
  );
};

export default AuthorList;
