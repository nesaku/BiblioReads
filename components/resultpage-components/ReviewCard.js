import React from "react";
import ReadMore from "./ReadMore";
import StarIcon from "./StarIcon";

const ReviewCard = (props) => {
  {
    /* Display the appropriate number of stars based on the starVal props */
  }
  function Stars(props) {
    const starVal = props.starVal;
    if (starVal === "it was amazing") {
      return (
        <>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </>
      );
    }
    if (starVal === "really liked it") {
      return (
        <>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </>
      );
    }
    if (starVal === "liked it") {
      return (
        <>
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </>
      );
    }
    if (starVal === "it was ok") {
      return (
        <>
          <StarIcon />
          <StarIcon />
        </>
      );
    }
    if (starVal === "did not like it") {
      return (
        <>
          <StarIcon />
        </>
      );
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
                    srcSet={`/img?url=${props.image}&output=webp&maxage=30d`}
                    type="image/webp"
                  />
                  <source
                    srcSet={`/img?url=${props.image}&maxage=30d`}
                    type="image/jpeg"
                  />
                  <img
                    src={`/img?url=${props.image}&maxage=30d`}
                    alt=""
                    loading="lazy"
                  />
                </picture>
              )}
            </div>
          )}

          <span className="text-slate-800 dark:text-gray-100 group">
            <span className="text-md font-bold underline">{props.author}</span>
            <span className="hidden text-sm md:inline-block">
              &nbsp;- {props.date}
            </span>
          </span>
        </div>

        <div className="flex items-center px-3 py-2 group mr-2 mt-1">
          <Stars starVal={props.stars} />
        </div>
      </div>
      <div className="mt-8 space-y-8">
        <div id="review-text">
          <div
            className={`flex items-start ml-4 md:ml-6 text-gray-800 dark:text-gray-300 ${
              props.mobile ? "max-w-4xl" : "max-w-none"
            } text-left`}
          >
            <ReadMore>{props.text}</ReadMore>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
