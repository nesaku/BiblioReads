/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

const SimilarBooks = (props) => {
  const [imageError, setImageError] = useState(false);

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
      <h2 className="font-bold text-2xl my-2 underline decoration-rose-600">
        Similar Books:{" "}
      </h2>
      <div
        id="slider"
        className={`no-scrollbar ${
          props.mobile && "max-w-4xl"
        } h-fit flex gap-6 snap-x overflow-x-auto overflow-y-hidden pt-10 pb-10 px-14`}
      >
        {props.data.map((data, i) => (
          <div
            key={i}
            className="snap-center shrink-0 first:-ml-12 max-w-xs xl:max-w-sm"
          >
            {imageError ? (
              <a href={`${data.url}`}>
                {data.src && (
                  <img
                    src="/cover-placeholder.svg"
                    alt=""
                    width="100"
                    height="250"
                    className="rounded-lg shadow-sm drop-shadow-sm mx-auto"
                  />
                )}
                <div className="group w-36 h-20 text-center mx-auto mt-4">
                  <span className="break-words text-md">
                    {data.title.slice(0, 40)}
                  </span>
                  <span className="hidden group-hover:inline text-md">
                    {data.title.slice(40)}
                  </span>
                </div>
              </a>
            ) : (
              <a href={`${data.url}`}>
                {data.src && (
                  <picture>
                    <source
                      srcSet={`/img?url=${data.src}&output=webp&maxage=30d`}
                      type="image/webp"
                      className="rounded-lg shadow-sm drop-shadow-sm bg-white mx-auto"
                    />
                    <source
                      srcSet={`/img?url=${data.src}&maxage=30d`}
                      type="image/jpeg"
                      className="rounded-lg shadow-sm drop-shadow-sm bg-white mx-auto"
                    />
                    <img
                      src={`/img?url=${data.src}&maxage=30d`}
                      alt={`${data.title} book cover`}
                      width="98"
                      height="148"
                      className="rounded-lg shadow-sm drop-shadow-sm bg-white mx-auto"
                      loading="lazy"
                      onError={() => setImageError(true)}
                    />
                  </picture>
                )}
                <div className="group w-36 h-20 text-center mx-auto mt-4">
                  <span className="break-words text-md">
                    {data.title.slice(0, 40)}
                  </span>
                  <span className="hidden group-hover:inline text-md">
                    {data.title.slice(40)}
                  </span>
                </div>
              </a>
            )}
          </div>
        ))}
      </div>
      <div className="flex max-w-4xl justify-center lg:justify-start">
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

export default SimilarBooks;
