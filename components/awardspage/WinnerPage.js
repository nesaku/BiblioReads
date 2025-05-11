/* eslint-disable @next/next/no-img-element */
import CoverImage from "../global/CoverImage";
import Meta from "../global/Meta";
import ReadMore from "../resultpage/ReadMore";
import NomineeGrid from "./NomineeGrid";

const WinnerPage = ({ scrapedData }) => {
  return (
    <>
      <div
        id="winnerGenre"
        className="flex flex-col justify-center items-center dark:text-gray-100/80 text-center "
      >
        <h1 className="font-bold text-5xl pt-4 mt-2 underline decoration-rose-600 capitalize">
          {scrapedData.genre} Of {scrapedData.scrapeURL.match(/\d{4}$/)}
        </h1>
      </div>
      <>
        {scrapedData.title && (
          <div
            id="winnerWrapper"
            className="bg-white/40 dark:bg-slate-800 flex flex-col lg:flex-row justify-center items-center mx-auto text-gray-900 dark:text-gray-100/80 py-8 mt-10 rounded-2xl max-w-4xl"
          >
            <Meta
              title={
                scrapedData.title
                  ? `${scrapedData.genre} Of ${scrapedData.scrapeURL.match(
                      /\d{4}$/
                    )}`
                  : " "
              }
            />

            <div id="sideContent" className="text-center mx-auto">
              <h1 className="font-bold text-3xl xl:text-4xl uppercase max-w-2xl mx-auto">
                {scrapedData.title}
              </h1>
              <div className="my-1 mx-auto max-w-sm xl:max-w-md">
                <span className="font-semibold">By:</span>{" "}
                {scrapedData.author.map((data, i) => (
                  <span key={i}>
                    <a
                      className="text-md hover:underline hover:text-rose-600"
                      href={data.url}
                    >
                      {(i ? ", " : "") + data.name}
                    </a>
                  </span>
                ))}
              </div>

              <div
                id="winnerCover"
                className="mt-6 mx-auto max-w-xs xl:max-w-sm"
              >
                {scrapedData.cover && (
                  <>
                    <CoverImage
                      src={scrapedData.cover}
                      alt={`${
                        scrapedData.title && scrapedData.title
                      } book cover`}
                      extraClasses="text-center mx-auto"
                      width="120"
                      height="186"
                      loading="eager"
                    />
                  </>
                )}
              </div>
            </div>
            <div
              id="winnerContent"
              className="max-w-full md:max-w-full lg:w-1/2 mx-auto lg:mx-0 p-4 lg:p-0 text-center lg:text-left"
            >
              <div id="numberOfVotes">
                <h2 className="font-bold text-2xl mb-2 mt-8 lg:mt-0 underline decoration-rose-600">
                  Number Of Votes:
                </h2>
                <div className="flex justify-center lg:justify-start">
                  <div>
                    <span className="text-md">
                      {scrapedData.numberOfVotes.replaceAll("\n", " ")}
                    </span>
                  </div>
                </div>
              </div>

              {scrapedData.longDesc ? (
                <div
                  id="bookDescription"
                  className="max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl m-auto lg:m-0"
                >
                  <h2 className="font-bold text-2xl my-2 capitalize underline decoration-rose-600">
                    Description:{" "}
                  </h2>
                  <div className="pr-2">
                    {scrapedData.longDesc.length < 600 ? (
                      <p id="text">{scrapedData.longDesc}</p>
                    ) : (
                      <ReadMore>{scrapedData.longDesc}</ReadMore>
                    )}{" "}
                  </div>
                </div>
              ) : (
                <div
                  id="bookDescription"
                  className="max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl m-auto lg:m-0"
                >
                  <h2 className="font-bold text-2xl my-2 capitalize underline decoration-rose-600">
                    Description:{" "}
                  </h2>
                  <p id="text" className="pr-2">
                    {scrapedData.desc}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        <NomineeGrid nominees={scrapedData.nominees} />
      </>
    </>
  );
};

export default WinnerPage;
