import { useEffect, useState } from "react";
import Meta from "../global/Meta";
import EditionsList from "./EditionsList";
import Link from "next/link";
import SmallLoader from "../global/SmallLoader";

const EditionResults = ({ scrapedData }) => {
  const [selectedEdition, setSelectedEdition] = useState("default");
  const [filteredData, setFilteredData] = useState({editions: []});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreEditions, setHasMoreEditions] = useState(true);

  const fetchData = async (selectedEdition, load_more = false) => {
    setIsLoading(true);
    const entries = selectedEdition === "default" ? scrapedData.editions.length : filteredData.editions.length
    const page = load_more ?  Math.ceil(entries / 10) + 1 : 1
    const res = await fetch(`/api/works/editions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        queryURL: `${scrapedData.scrapeURL}?filter_by_format=${selectedEdition}&page=${page}&utf8=✓`,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.editions.length > 0) {
        if (selectedEdition === "default") {
          scrapedData.editions = scrapedData.editions.concat(data.editions)
        } else {
          setFilteredData({editions: load_more ? filteredData.editions.concat(data.editions) : data.editions})
        }
        setHasMoreEditions(true);
      } else {
        setHasMoreEditions(false);
      }
    } else {
      setError(true);
    }
    setIsLoading(false);
  };

  const editionChangeHandler = (e) => {
    const edition = e.target.value;
    setSelectedEdition(edition);
  };
  
  const nextPageHandler = () => {
    fetchData(selectedEdition || "default", true);
  };
  
  useEffect(() => {
    setHasMoreEditions(true);
    if (selectedEdition && selectedEdition !== "default") {
      setFilteredData({editions: []});
      fetchData(selectedEdition, false);
    }
  }, [selectedEdition]);

  return (
    (<div
      id="editionResults"
      className="flex flex-col p-12 justify-center items-center text-center dark:text-gray-100/80"
    >
      <Meta title={scrapedData.book} />
      <h2 className="font-bold text-5xl pt-4 my-2 underline decoration-rose-600">
        {scrapedData.book && `${scrapedData.book}:`}
      </h2>
      {scrapedData.authorURL && (
        <div
          id="editionDescription"
          className="flex flex-col items-center max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl m-auto lg:m-0"
        >
          <Link href={scrapedData.authorURL} legacyBehavior>
            <p className="text-lg w-fit pt-6 pb-1">
              By:{" "}
              <span className="text-rose-900 dark:text-rose-600 hover:underline">
                {scrapedData.author}
              </span>
            </p>
          </Link>
          <p className="text-lg">
            {scrapedData.firstPublished &&
              scrapedData.firstPublished.replace(
                "First published",
                "First Published:"
              )}
          </p>
        </div>
      )}
      {scrapedData.editions && (
        <div
          id="editionFormat"
          className="max-w-2xl lg:max-w-md xl:max-w-xl 2xl:max-w-2xl m-auto lg:m-0 capitalize p-4 sm:p-8"
        >
          <h3 className="font-bold text-4xl mt-2 capitalize underline decoration-rose-600">
            Editions:
          </h3>
          <div className="flex items-center mt-6">
            <p className="mr-4">Format:</p>
            <select
              name="editionSelection"
              id="edition"
              className="p-1 rounded-md"
              onChange={(e) => editionChangeHandler(e)}
            >
              <option value="default" defaultChecked></option>
              <option value="Paperback">Paperback</option>
              <option value="Hardcover">Hardcover</option>
              <option value="Mass+Market+Paperback">
                Mass Market Paperback
              </option>
              <option value="Kindle+Edition">Kindle Edition</option>
              <option value="Nook">Nook</option>
              <option value="ebook">ebook</option>
              {/*  <option value="Library+Binding">Library Binding</option> */}
              <option value="Audiobook">Audiobook</option>
              <option value="Audio+CD">Audio CD</option>
              <option value="Audio+Cassette">Audio Cassette</option>
              <option value="Audible+Audio">Audible Audio</option>
              {/*   <option value="CD-ROM">CD-ROM</option> */}
              {/*  <option value="MP3+CD">MP3 CD</option> */}
              <option value="Unknown+Binding">Unknown Binding</option>
            </select>
          </div>
        </div>
      )}
      {scrapedData.editions && (
        <>
          {isLoading &&
          filteredData.editions &&
          selectedEdition != "default" ? (
            <div className="mt-40 min-h-[80vh]">
              <SmallLoader height="10" />
            </div>
          ) : (
            <EditionsList
              editions={
                filteredData.editions && selectedEdition != "default"
                  ? filteredData.editions
                  : scrapedData.editions
              }
            />
          )}
          {error && (
            <p className="pt-10 text-red-600 font-bold text-3xl capitalize">
              An Error Has Occurred. Please Try Again Later.
            </p>
          )}
          {!isLoading && 
           filteredData.editions &&
           filteredData.editions.length === 0 &&
           selectedEdition != "default" && (
              <p className="pt-10 text-lg capitalize min-h-[42vh]">
                There are no editions with the selected format.
              </p>
            )}
          {(!(!isLoading && filteredData.editions && filteredData.editions.length === 0 && selectedEdition != "default")) && (
            <div className="flex justify-center mt-8">
              <button
                onClick={nextPageHandler}
                disabled={isLoading || !hasMoreEditions}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold text-md transition duration-300 ${
                  isLoading || !hasMoreEditions
                    ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                    : "bg-rose-200 dark:bg-[#710e2a] hover:bg-rose-300 dark:hover:bg-rose-800"
                } border-2 border-rose-800 dark:border-[#710e2a] hover:border-rose-600 dark:hover:border-rose-200`}
              >
                {isLoading ? (
                  <>
                    <SmallLoader height="4" />
                    <span className="ml-2">Loading...</span>
                  </>
                ) : !hasMoreEditions ? (
                  "No More Editions"
                ) : (
                  "Load More Editions"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>)
  );
};

export default EditionResults;
