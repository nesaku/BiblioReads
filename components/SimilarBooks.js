import React from "react";

const SimilarBooks = (props) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div id="bookRelated">
      <h2 className="font-bold text-2xl my-2 underline">Similar Books: </h2>
      <div
        id="slider"
        className="no-scrollbar max-w-4xl h-fit flex gap-6 snap-x overflow-x-auto overflow-y-hidden pt-10 pb-10 px-14"
      >
        {props.data.map((data, i) => (
          <div key={i} className="snap-center shrink-0 first:-ml-12">
            <a href={`${data.url}`}>
              <picture>
                <source
                  srcSet={`https://wsrv.nl/?url=${data.src}&default=${
                    process.env.NEXT_PUBLIC_HOST_URL || "https://biblioreads.ml"
                  }/cover-placeholder.svg&output=webp&maxage=30d`}
                  type="image/webp"
                  className="shrink-0 w-28 h-40 rounded-lg shadow-sm drop-shadow-sm bg-white mx-auto"
                />
                <source
                  srcSet={`https://wsrv.nl/?url=${data.src}&default=${
                    process.env.NEXT_PUBLIC_HOST_URL || "https://biblioreads.ml"
                  }/cover-placeholder.svg&maxage=30d`}
                  type="image/jpeg"
                  className="shrink-0 w-28 h-40 rounded-lg shadow-sm drop-shadow-sm bg-white mx-auto"
                />
                <img
                  src={`https://wsrv.nl/?url=${data.src}&default=${
                    process.env.NEXT_PUBLIC_HOST_URL || "https://biblioreads.ml"
                  }/cover-placeholder.svg&maxage=30d`}
                  alt="Images of similar books"
                  className="shrink-0 w-28 h-40 rounded-lg shadow-sm drop-shadow-sm bg-white mx-auto"
                  loading="lazy"
                />
              </picture>
              <div className="group w-36 h-20 text-center mx-auto mt-4">
                <span className="break-words text-md">
                  {data.title.slice(0, 40)}
                  <span className="inline group-hover:hidden">...</span>
                </span>
                <span className="hidden group-hover:inline text-md">
                  {data.title.slice(40)}
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
      <div className="flex max-w-4xl justify-center lg:justify-start">
        <button className="mx-3" onClick={slideLeft}>
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
        <button className="mx-3" onClick={slideRight}>
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

export default SimilarBooks;
