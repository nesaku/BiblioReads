import React, { useEffect, useState } from "react";
import Meta from "../components/global/Meta";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import SmallLoader from "../components/global/SmallLoader";
import Link from "next/link";
import { openDB } from "idb";

const Library = () => {
  const [savedBooks, setSavedBooks] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBooks() {
      const db = await openDB("library", 4, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("books")) {
            db.createObjectStore("books");
          }
        },
      });
      const books = await db.getAll("books");
      setSavedBooks(books);
      setIsLoading(false);
    }

    getBooks();
  }, []);

  return (
    <>
      <Meta title={"Library"} />
      <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen">
        <Header />
        <div
          id="library"
          className="flex flex-col p-12 justify-center items-center text-center dark:text-gray-100/80"
        >
          <h1 className="font-bold text-5xl pt-4 my-2 underline decoration-rose-600 ">
            Your Library
          </h1>
          <div id="libraryBooks" className="flex flex-col p-12 w-full">
            <h2 className="font-bold text-left text-3xl mb-2 mt-8 lg:mt-0 underline decoration-rose-600">
              Your Books
            </h2>
            {isLoading ? (
              <div className="min-h-[50vh] pt-20">
                <SmallLoader other={true} />
              </div>
            ) : (
              Object.keys(savedBooks).length === 0 && (
                <div className="text-left min-h-[50vh]">
                  <h3 className="text-2xl font-semibold pt-10">
                    No Books Saved
                  </h3>
                  <div className="flex items-center text-lg pt-2">
                    Add books to your library by clicking
                    <svg
                      viewBox="0 0 257 445"
                      class="p-2 w-10 text-gray-50 border-black"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M30.0326 -1.20215e-05C13.446 -1.20215e-05 0 14.4411 0 32.254V444.073L128.5 323.718L257 444.073V32.254C257 14.4411 243.554 -1.20215e-05 226.969 -1.20215e-05H30.0326Z"></path>
                    </svg>
                    icon.
                  </div>
                </div>
              )
            )}
            {Object.values(savedBooks)
              .sort((a, b) => a.timestamp - b.timestamp)
              .map((data, i) => {
                if (Object.keys(data).length === 0) {
                  return null;
                }
                return (
                  <div id="resultCard" key={i} className="max-w-[1000px]">
                    <a href={`/book/show/${data.slug}`}>
                      <div className="flex items-center justify-between text-left mt-8 py-6 sm:p-8 bg-white/40 dark:bg-slate-800 rounded-2xl hover:ring hover:ring-rose-600 hover:bg-rose-300 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40">
                        <div className="ml-8 pr-2 sm:pr-8 sm:ml-16 w-40 sm:w-64 lg:w-[1000px]">
                          {data.slug && (
                            <h3 className="text-lg sm:text-2xl font-semibold  break-words">
                              {data.title}
                            </h3>
                          )}
                          {data.author &&
                            data.author.map((data, i) => (
                              <span key={i}>
                                <Link
                                  className="text-md hover:underline hover:text-rose-600"
                                  href={data.url}
                                >
                                  {(i ? ", " : "") + data.name}
                                </Link>
                              </span>
                            ))}
                          {data.rating && (
                            <div className="flex items-center mt-4">
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
                              <span className="ml-2 capitalize">
                                <span className="hidden md:block">
                                  {data.rating.replace("—", "out of")}
                                </span>
                                <span className="block md:hidden">
                                  {data.rating.split("avg")[0]}
                                </span>
                              </span>
                            </div>
                          )}

                          <div className="flex items-center mt-4">
                            <span className="capitalize text-sm">
                              Added:{" "}
                              {new Date(data.timestamp).toLocaleString(
                                "default",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  // second: "numeric",
                                  hour12: true,
                                }
                              )}
                            </span>
                          </div>
                        </div>
                        {data.cover && (
                          <div className="flex mr-8">
                            <picture>
                              <source
                                srcSet={`/img?url=${data.cover
                                  .replace("._SX50_SY75_", "")
                                  .replace("._SY75_", "")
                                  .replace(
                                    "._SX50_",
                                    ""
                                  )}&output=webp&maxage=30d`}
                                type="image/webp"
                                className="rounded-lg shadow-sm drop-shadow-sm bg-white dark:bg-slate-800"
                              />
                              <source
                                srcSet={`/img?url=${data.cover
                                  .replace("._SX50_SY75_", "")
                                  .replace("._SY75_", "")
                                  .replace("._SX50_", "")}&maxage=30d`}
                                type="image/jpeg"
                                className="rounded-lg shadow-sm drop-shadow-sm bg-white dark:bg-slate-800"
                              />
                              <img
                                src={`/img?url=${data.cover
                                  .replace("._SX50_SY75_", "")
                                  .replace("._SY75_", "")
                                  .replace("._SX50_", "")}&maxage=30d`}
                                alt={`${data.title} book cover`}
                                width="98"
                                height="148"
                                className="rounded-lg border-2 shadow-sm drop-shadow-sm bg-white dark:bg-slate-800"
                                loading="lazy"
                              />
                            </picture>
                          </div>
                        )}
                      </div>
                    </a>
                  </div>
                );
              })}
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Library;
