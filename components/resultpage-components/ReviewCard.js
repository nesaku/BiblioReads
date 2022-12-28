import React from "react";
import ReadMore from "./ReadMore";

const ReviewCard = (props) => {
  function Stars(props) {
    const starVal = props.starVal;
    if (starVal === "it was amazing") {
      return <span>&#127775; &#127775; &#127775; &#127775; &#127775;</span>;
    }
    if (starVal === "really liked it") {
      return <span>&#127775; &#127775; &#127775; &#127775;</span>;
    }
    if (starVal === "liked it") {
      return <span>&#127775; &#127775; &#127775;</span>;
    }
    if (starVal === "it was ok") {
      return <span>&#127775; &#127775;</span>;
    }
    if (starVal === "did not like it") {
      return <span>&#127775;</span>;
    }
    if (starVal === undefined) {
      return <span>&#63;</span>;
    }
    return <span>Unknown</span>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mt-2 ml-6">
        <div className="flex items-center">
          {props.showAvatars && (
            <div className="mr-2 w-12 h-12 overflow-hidden shadow rounded-full border-gray-500">
              {props.image && (
                <picture>
                  <source
                    srcSet={`/img?url=${props.image}&default=${
                      process.env.NEXT_PUBLIC_HOST_URL ||
                      "http://localhost:3000"
                    }/cover-placeholder.svg&output=webp&maxage=30d`}
                    type="image/webp"
                  />
                  <source
                    srcSet={`/img?url=${props.image}&default=${
                      process.env.NEXT_PUBLIC_HOST_URL ||
                      "http://localhost:3000"
                    }/cover-placeholder.svg&maxage=30d`}
                    type="image/jpeg"
                  />
                  <img
                    src={`/img?url=${props.image}&default=${
                      process.env.NEXT_PUBLIC_HOST_URL ||
                      "http://localhost:3000"
                    }/cover-placeholder.svg&maxage=30d`}
                    alt=""
                    loading="lazy"
                  />
                </picture>
              )}
            </div>
          )}

          <span className="text-gray-800 dark:text-gray-100 group">
            <span className="text-md font-semibold">{props.author}</span>
            <span className="hidden text-sm md:inline-block">
              &nbsp;- {props.date}
            </span>
          </span>
        </div>

        <div className="flex items-center bg-rose-800 bg-opacity-90 dark:bg-rose-800 dark:bg-opacity-60 text-white rounded-lg px-3 py-2 group text-sm mr-2 mt-1 capitalize">
          <Stars starVal={props.stars} />
        </div>
      </div>
      <div className="mt-8 space-y-8">
        <div>
          <div className="flex items-start ml-4 md:ml-6 text-gray-800 dark:text-gray-100 max-w-4xl text-left">
            <ReadMore>{props.text}</ReadMore>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
