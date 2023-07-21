import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchByButton from "./SearchByButton";

const SearchBox = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [validQuery, setValidQuery] = useState(true);
  const [queryType, setQueryType] = useState("books");

  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.includes("https://")) {
      router.push({
        pathname: `/search/${inputValue.replaceAll("/", "-")}`,
        query: { type: queryType ? queryType : "books" },
      });
    } else {
      setValidQuery(false);
    }
  };

  useEffect(() => {
    setQueryType(props.searchType);
  }, [props.searchType]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        {props.main && (
          <h1 className="text-6xl text-black dark:text-gray-200/80 font-semibold capitalize mb - 10">
            Search For A Book Or Quote:
          </h1>
        )}

        <div className="flex justify-center text-center">
          <div
            className={`flex flex-col sm:flex-row items-center ${
              props.main ? `mt-6` : `-mt-0 sm:-mt-4`
            }`}
          >
            <div className="mt-4">
              <input
                type="text"
                name="search"
                aria-label="Search"
                placeholder="The Hobbit"
                className="rounded-md mx-10 py-3 px-5 text-left text-black dark:text-gray-200/90 text-sm bg-slate-200 dark:bg-slate-700 border-4 border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-slate-700"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
            </div>

            <button className="flex items-center mt-10 my-6 ont-semibold text-md text-gray-900 dark:text-gray-100/90 bg-rose-500 dark:bg-[#a22045] ring ring-rose-600 dark:ring-rose-700 ring-offset-2 ring-offset-rose-100 py-4 px-4 rounded-xl shadow-lg shadow-rose-500 hover:shadow-xl hover:bg-rose-600 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40">
              <svg
                className="mr-2 -ml-1 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span>Search</span>
            </button>
          </div>
        </div>
        {/* TODO: See line 22 on pages/search/[...slug].js */}
        <SearchByButton
          setQueryType={setQueryType}
          queryType={queryType}
          value="books"
          text="Books"
        />
        {/*         <SearchByButton
          setQueryType={setQueryType}
          queryType={queryType}
          value="people"
          text="People"
        /> */}
        <SearchByButton
          setQueryType={setQueryType}
          queryType={queryType}
          value="quotes"
          text="Quotes"
        />
        <SearchByButton
          setQueryType={setQueryType}
          queryType={queryType}
          value="lists"
          text="Lists"
        />
        {/*      <SearchByButton
          setQueryType={setQueryType}
          queryType={queryType}
          value="groups"
          text="Groups"
        /> */}
      </form>
      {validQuery === false && (
        <div id="formError">
          <p className="mt-2 max-w-lg text-red-600/80 break-words">
            Please make sure you are not pasting in a URL. An example of a valid
            query is: <span className="underline">The Hobbit</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
