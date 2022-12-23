import { useState } from "react";
import ReadMore from "./ReadMore";

const Reviews = (props) => {
  const [showAvatars, setShowAvatars] = useState(false);
  console.log(showAvatars);
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
    return <span>&#63;</span>;
  }

  return (
    <div id="bookReviews">
      <h2 className="font-bold text-2xl mt-8 mb-4 underline">Reviews:</h2>
      <div className="flex justify-center lg:justify-start items-center py-2">
        <span class="mr-3 text-md font-medium text-gray-900 dark:text-gray-300">
          Show Profile Avatars:
        </span>
        <label class="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            onClick={() => {
              showAvatars ? setShowAvatars(false) : setShowAvatars(true);
            }}
            class="sr-only peer"
          />
          <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-600"></div>
        </label>
      </div>

      {props.data.map((data, i) => (
        <div
          id="review"
          className="max-w-2xl lg:max-w-2xl 2xl:max-w-3xl 4xl:max-w-4xl mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-60 dark:bg-rose-600 dark:bg-opacity-40 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
          key={i}
        >
          <div className="flex justify-between items-center mt-2 ml-6">
            <div className="flex items-center">
              {showAvatars && (
                <div className="mr-2 w-12 h-12 overflow-hidden shadow rounded-full border-gray-500">
                  <picture>
                    <source
                      srcSet={`https://wsrv.nl/?url=${data.image}&default=${
                        process.env.NEXT_PUBLIC_HOST_URL ||
                        "http://localhost:3000"
                      }/cover-placeholder.svg&output=webp&maxage=30d`}
                      type="image/webp"
                    />
                    <source
                      srcSet={`https://wsrv.nl/?url=${data.image}&default=${
                        process.env.NEXT_PUBLIC_HOST_URL ||
                        "http://localhost:3000"
                      }/cover-placeholder.svg&maxage=30d`}
                      type="image/jpeg"
                    />
                    <img
                      src={`https://wsrv.nl/?url=${data.image}&default=${
                        process.env.NEXT_PUBLIC_HOST_URL ||
                        "http://localhost:3000"
                      }/cover-placeholder.svg&maxage=30d`}
                      alt="An image of the review author"
                      loading="lazy"
                    />
                  </picture>
                </div>
              )}

              <span className="text-gray-800 dark:text-gray-100 group">
                <span className="text-md font-semibold">{data.author}</span>
                <span className="hidden text-sm md:inline-block">
                  &nbsp;- {data.date}
                </span>
              </span>
            </div>
            <div className="flex items-center bg-rose-800 bg-opacity-90 dark:bg-rose-800 dark:bg-opacity-60 text-white rounded-lg px-3 py-2 group text-sm mr-2 mt-1 capitalize">
              <Stars starVal={data.stars} />
            </div>
          </div>
          <div className="mt-8 space-y-8">
            <div>
              <div className="flex items-start ml-4 md:ml-6 text-gray-800 dark:text-gray-100 max-w-4xl">
                <ReadMore>{data.text}</ReadMore>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
