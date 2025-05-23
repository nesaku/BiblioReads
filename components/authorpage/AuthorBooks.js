/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import CoverImage from "../global/CoverImage";

const AuthorBooks = (props) => {
  const slideLeft = () => {
    var slider = document.getElementById(props.mobile ? "desktop" : "slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById(props.mobile ? "desktop" : "slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div id="authorBooks" className="dark:text-gray-100/80">
      <h2 className="font-bold text-2xl my-2 underline decoration-rose-600 ">
        {props.name}&apos;s Books:{" "}
      </h2>
      <div
        id={props.mobile ? "desktop" : "slider"}
        className={`no-scrollbar h-fit flex gap-6 snap-x overflow-x-auto overflow-y-hidden pt-4 pb-10 px-14 
        ${props.mobile && "max-w-4xl"}`}
      >
        {props.books.map((data, i) => (
          <div
            key={i}
            className="snap-center shrink-0 first:-ml-12 max-w-xs xl:max-w-sm p-2 sm:py-6 px-2 hover:py-6 bg-white/40 dark:bg-slate-800 rounded-2xl  hover:ring hover:ring-rose-600 hover:bg-rose-300 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40"
          >
            <Link href={`${data.url}`}>
              {data.cover && (
                <CoverImage
                  src={data.cover}
                  alt={`${data.title && data.title} book cover`}
                  extraClasses="text-center mx-auto"
                />
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
                  {data.rating.split("avg")[0].replace("really liked it", "")}
                </span>
              </div>
              <div className="group w-36 h-20 text-center mx-auto text-md font-semibold">
                <span className="break-words">{data.title.slice(0, 40)}</span>
                <span className="hidden group-hover:inline">
                  {data.title.slice(40, 50)}
                </span>
              </div>
            </Link>
          </div>
        ))}
        {props.scrapeURL && (
          <Link
            href={`${props.scrapeURL.replace(
              "https://www.goodreads.com/author/show/",
              "/author/list/"
            )}`}
            className="flex snap-center shrink-0 first:-ml-12 max-w-xs xl:max-w-sm p-2 sm:py-6 px-2 hover:py-6 bg-white/40 dark:bg-slate-800 rounded-2xl  hover:ring hover:ring-rose-600 hover:bg-rose-300 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40"
          >
            <div className="flex flex-col justify-center items-center ">
              <svg
                className="fill-gray-700 dark:fill-white max-w-24 max-h-24"
                viewBox="0 0 1024 1024"
              >
                <path
                  d="M835.8 375c-17.7-41.9-43.1-79.6-75.4-111.9-32.3-32.3-70-57.7-111.9-75.4-43.4-18.4-89.5-27.7-137-27.7s-93.6 9.3-137 27.7c-41.9 17.7-79.6 43.1-111.9 75.4-32.3 32.3-57.7 70-75.4 111.9-18.4 43.4-27.7 89.5-27.7 137s9.3 93.6 27.7 137c17.7 41.9 43.1 79.6 75.4 111.9 32.3 32.3 70 57.7 111.9 75.4 43.4 18.4 89.5 27.7 137 27.7s93.6-9.3 137-27.7c41.9-17.7 79.6-43.1 111.9-75.4 32.3-32.3 57.7-70 75.4-111.9 18.4-43.4 27.7-89.5 27.7-137s-9.4-93.6-27.7-137zM511.4 832c-176.7 0-320-143.3-320-320s143.3-320 320-320 320 143.3 320 320-143.2 320-320 320z"
                  fill=""
                />
                <path
                  d="M336 512.2m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"
                  fill=""
                />
                <path
                  d="M512 512.2m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"
                  fill=""
                />
                <path
                  d="M688 512.2m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"
                  fill=""
                />
              </svg>
              <p className="mt-2 w-36 text-center mx-auto text-lg font-semibold">
                View More Books
              </p>
            </div>
          </Link>
        )}
      </div>
      <div className="flex max-w-4xl justify-center lg:justify-start mb-8">
        <button className="mx-3" aria-label="slide left" onClick={slideLeft}>
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
        <button className="mx-3" aria-label="slide right" onClick={slideRight}>
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
    </div>
  );
};

export default AuthorBooks;
