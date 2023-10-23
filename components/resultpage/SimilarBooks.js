/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect, useState } from "react";
import SmallLoader from "../global/SmallLoader";

// Instead of waiting for the similar books section to be lazy loaded, get the results directly from the Goodreads similar books page
const SimilarBooks = ({ quotesURL, mobile }) => {
  const [scrapedData, setScrapedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/similar-scraper`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        queryURL: `${quotesURL.replace("/work/quotes/", "/book/similar/")}`,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setScrapedData(data);
      setIsLoading(false);
    } else {
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      setError(true);
    }
  }, []);

  const slideLeft = () => {
    var slider = document.getElementById(mobile ? "desktop" : "slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById(mobile ? "desktop" : "slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div id="bookRelated" className={`${error && "hidden"}`}>
      <h2 className="font-bold text-2xl my-2 underline decoration-rose-600 dark:text-gray-100/80">
        Similar Books:{" "}
      </h2>
      {isLoading ? (
        <SmallLoader height="10" />
      ) : (
        <>
          <div
            id={mobile ? "desktop" : "slider"}
            className={`no-scrollbar h-fit flex gap-6 snap-x overflow-x-auto overflow-y-hidden pt-4 pb-10 px-14 
        ${mobile && "max-w-4xl"}`}
          >
            {scrapedData.books != undefined &&
              scrapedData.books.slice(1).map((data, i) => (
                <div
                  key={i}
                  className="snap-center shrink-0 first:-ml-12 max-w-xs xl:max-w-sm p-2 sm:py-6 px-2 hover:py-6 bg-white/40 dark:bg-slate-800 rounded-2xl  hover:ring hover:ring-rose-600 hover:bg-rose-300 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40"
                >
                  <a href={`${data.bookURL}`}>
                    {data.cover && (
                      <picture>
                        <source
                          srcSet={`/img?url=${data.cover
                            .replace("._SX50_SY75_", "")
                            .replace("._SY75_", "")
                            .replace("._SX50_", "")}&output=webp&maxage=30d`}
                          type="image/webp"
                          className="rounded-lg shadow-sm drop-shadow-sm bg-white mx-auto"
                        />
                        <source
                          srcSet={`/img?url=${data.cover
                            .replace("._SX50_SY75_", "")
                            .replace("._SY75_", "")
                            .replace("._SX50_", "")}&maxage=30d`}
                          type="image/jpeg"
                          className="rounded-lg shadow-sm drop-shadow-sm bg-white mx-auto"
                        />
                        <img
                          src={`/img?url=${data.cover
                            .replace("._SX50_SY75_", "")
                            .replace("._SY75_", "")
                            .replace("._SX50_", "")}&maxage=30d`}
                          alt={`${data.title} book cover`}
                          width="98"
                          height="148"
                          className="rounded-lg border-2 shadow-sm drop-shadow-sm bg-white mx-auto mt-3"
                          loading="lazy"
                        />
                      </picture>
                    )}
                    <div className="flex justify-center items-center text-center mt-4 mb-2">
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
                      <span className="text-sm ml-2">
                        {data.rating.split("avg")[0]}
                      </span>
                    </div>
                    <div className="group w-36 h-20 text-center mx-auto text-md font-semibold">
                      <span className="break-words">
                        {data.title.slice(0, 40)}
                      </span>
                      <span className="hidden group-hover:inline">
                        {data.title.slice(40, 65)}
                      </span>
                    </div>
                  </a>
                </div>
              ))}
          </div>
          <div className="flex max-w-4xl justify-center lg:justify-start mb-8">
            <button
              className="mx-3"
              aria-label="slide left"
              onClick={slideLeft}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className="fill-gray-900 dark:fill-gray-200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 0C7.16408 0 0 7.16408 0 16C0 24.8359 7.16408 32 16 32C24.8359 32 32 24.8359 32 16C32 7.16408 24.8359 0 16 0ZM20.1273 21.9102L17.3388 24.6988L11.4286 18.7886L8.64 16L11.4286 13.2114L17.3388 7.30122L20.1273 10.0898L14.2237 16L20.1273 21.9102Z" />
              </svg>
            </button>
            <button
              className="mx-3"
              aria-label="slide right"
              onClick={slideRight}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className="fill-gray-900 dark:fill-gray-200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 0C7.16408 0 0 7.16408 0 16C0 24.8359 7.16408 32 16 32C24.8359 32 32 24.8359 32 16C32 7.16408 24.8359 0 16 0ZM20.5714 18.7886L14.6612 24.6988L11.8727 21.9102L17.7829 16L11.8727 10.0898L14.6612 7.30122L20.5714 13.2114L23.36 16L20.5714 18.7886Z" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SimilarBooks;
