/* eslint-disable @next/next/no-img-element */
import Meta from "../global-components/Meta";
import QuoteCard from "./QuoteCard";

const SeriesResults = ({ scrapedData }) => {
  return (
    <div
      id="seriesResults"
      className="flex flex-col p-12 justify-center items-center text-center"
    >
      <Meta title={scrapedData.title} />
      {scrapedData.quotes != "" && (
        <h2 className="font-bold text-5xl pt-4 pb-5 my-2 underline decoration-rose-600 dark:text-gray-100/80 capitalize">
          {scrapedData.title && `${scrapedData.title}:`}
        </h2>
      )}
      {scrapedData.quotes && <QuoteCard quotes={scrapedData.quotes} />}
    </div>
  );
};

export default SeriesResults;
