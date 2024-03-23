/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Badge from "../global/Badge";

const UnansweredQuestionCard = (props) => {
  const [isSpoiler, setShowSpoiler] = useState({});

  const toggleSpoiler = () => {
    setShowSpoiler(!isSpoiler);
  };

  return (
    <>
      {props.questions.map((data, i) => (
        <div
          key={i}
          className="max-w-[1820px] mx-2 sm:mx-4 my-4 py-4 px-2 sm:px-8 bg-white/40 dark:bg-slate-800/60 rounded-2xl hover:ring hover:ring-rose-600 hover:bg-rose-300 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40"
        >
          <div className="mt-8 space-y-8">
            <div id="questions-text">
              <div
                id="text"
                className={`flex flex-col items-start ml-4 md:ml-6 text-gray-800 dark:text-gray-300 ${
                  data.mobile ? "max-w-4xl" : "max-w-none"
                } text-left`}
              >
                {data.spoilerQuestion ? (
                  <div>
                    <Badge text="unanswered" />
                    <h2
                      className={
                        !isSpoiler ? "hidden" : "font-bold text-lg mb-6"
                      }
                    >
                      This question contains spoilers...{" "}
                      <span
                        onClick={toggleSpoiler}
                        className="font-semibold text-md p-0.5 rounded-sm underline decoration-2 decoration-rose-800 hover:text-white hover:bg-rose-800 transition duration-150 delay-150 hover:delay-100 cursor-pointer"
                      >
                        (Show Spoiler)
                      </span>
                    </h2>
                    <h2
                      className={
                        isSpoiler ? "hidden" : "font-bold text-lg mb-6"
                      }
                    >
                      {data.spoilerQuestion
                        .replace("[", "")
                        .replace("]", "")
                        .replace("(hide spoiler)", "")}{" "}
                      <span
                        onClick={toggleSpoiler}
                        className="font-semibold text-md p-0.5 rounded-sm underline decoration-2 decoration-rose-800 hover:text-white hover:bg-rose-800 transition duration-150 delay-150 hover:delay-100 cursor-pointer"
                      >
                        (Hide Spoiler)
                      </span>
                    </h2>
                  </div>
                ) : (
                  <>
                    <Badge text="unanswered" />
                    <h2 className="font-bold text-lg mb-6">
                      Q: {data.question}
                    </h2>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UnansweredQuestionCard;
