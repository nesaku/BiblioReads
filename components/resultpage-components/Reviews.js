import { useState } from "react";
import ReviewCard from "./ReviewCard";
import FilterButton from "./FilterButton";
import SortButton from "./SortButton";

const Reviews = (props) => {
  const [showReviews, setShowReviews] = useState(false);
  const [showAvatars, setShowAvatars] = useState(false);

  const [filterStars, setFilterStars] = useState();
  const [sortBy, setSortBy] = useState();

  const [searchText, setSearchText] = useState("");

  return (
    <div id="bookReviews">
      <h2 className="font-bold text-2xl mt-8 mb-4 underline decoration-rose-600">
        Reviews:
      </h2>
      <button
        onClick={() => {
          showReviews ? setShowReviews(false) : setShowReviews(true);
        }}
        className="py-4 px-3 mt-6 mb-8 font-semibold text-md text-gray-900 dark:text-gray-300 bg-gray-300 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-400 dark:hover:bg-slate-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-400 dark:ring-gray-400 hover:ring-rose-600 dark:hover:ring-rose-600"
      >
        {showReviews ? "Hide" : "Show"} Reviews
      </button>

      {showReviews && (
        <div id="reviews">
          <div
            id="searchFilter"
            className="flex flex-row justify-center items-center mt-4 mb-2"
          >
            <p className="mr-3 text-md font-medium text-gray-900 dark:text-gray-300">
              Search:{" "}
            </p>
            <input
              type="text"
              placeholder="Search review text"
              className={
                filterStars || sortBy
                  ? "form-control block w-48 m-0 px-3 py-1.5 text-base font-normal text-gray-400 dark:text-gray-600 bg-gray-400 dark:bg-gray-600 bg-clip-padding border-2 border-solid border-gray-400 rounded-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-rose-600 focus:outline-none cursor-not-allowed"
                  : "form-control block w-48 m-0 px-3 py-1.5 text-base font-normal text-gray-900 dark:text-gray-200 bg-gray-300 dark:bg-gray-800 bg-clip-padding border-2 border-solid border-gray-400 rounded-lg transition ease-in-out focus:text-gray-900 focus:bg-gray-200 focus:border-rose-600 focus:outline-none"
              }
              onChange={(e) => setSearchText(e.target.value)}
              disabled={filterStars || sortBy}
            />
          </div>
          <div
            id="filterOptions"
            className="flex flex-row justify-center items-center"
          >
            <p className="mr-3 text-md font-medium text-gray-900 dark:text-gray-300">
              Filter:
            </p>
            <FilterButton
              setFilterStars={setFilterStars}
              filterStars={filterStars}
              value="it was amazing"
              text="5 Stars"
            />
            <FilterButton
              setFilterStars={setFilterStars}
              filterStars={filterStars}
              value="really liked it"
              text="4 Stars"
            />
            <FilterButton
              setFilterStars={setFilterStars}
              filterStars={filterStars}
              value="liked it"
              text="3 Stars"
            />
            <FilterButton
              setFilterStars={setFilterStars}
              filterStars={filterStars}
              value="it was ok"
              text="2 Stars"
            />
            <FilterButton
              setFilterStars={setFilterStars}
              filterStars={filterStars}
              value="did not like it"
              text="1 Stars"
            />
          </div>
          <div
            id="sortOptions"
            className="flex flex-row justify-center items-center"
          >
            <p className="mr-3 text-md font-medium text-gray-900 dark:text-gray-300">
              Sort By:
            </p>
            <SortButton
              setSortBy={setSortBy}
              sortBy={sortBy}
              setFilterStars={setFilterStars}
              value="popular"
              text="Popular Reviews"
            />
            <SortButton
              setSortBy={setSortBy}
              sortBy={sortBy}
              setFilterStars={setFilterStars}
              value="new-old"
              text="Newest to Oldest"
            />
            <SortButton
              setSortBy={setSortBy}
              sortBy={sortBy}
              setFilterStars={setFilterStars}
              value="old-new"
              text="Oldest to Newest"
            />
          </div>
          <div className="flex justify-center items-center mt-4 mb-6">
            <p className="mr-3 text-md font-medium text-gray-900 dark:text-gray-300">
              Show Profile Avatars:
            </p>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                onClick={() => {
                  showAvatars ? setShowAvatars(false) : setShowAvatars(true);
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-600"></div>
            </label>

            <button
              id="resetAll"
              onClick={() => {
                setFilterStars(undefined);
                setSortBy(undefined);
                setSearchText("");
              }}
              className="ml-5 py-0.5 px-1 font-semibold text-md text-gray-900 dark:text-gray-300 bg-gray-300 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-400 dark::hover:bg-gray-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-400 dark:ring-gray-400 hover:ring-rose-600 dark:hover:ring-rose-600"
            >
              Reset All
            </button>
          </div>

          {/* If popular sort order and star filter is set, order by default and then filter by stars */}
          {filterStars &&
            sortBy === "popular" &&
            props.data
              .sort((a, b) => a.id > b.id)
              .map(
                (data, i) =>
                  data.stars === filterStars && (
                    <div
                      id="review"
                      className="max-w-2xl lg:max-w-2xl 2xl:max-w-3xl 4xl:max-w-4xl mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-60 dark:bg-rose-600 dark:bg-opacity-40 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                      key={i}
                    >
                      <ReviewCard
                        image={data.image}
                        showAvatars={showAvatars}
                        author={data.author}
                        date={data.date}
                        stars={data.stars}
                        text={data.text}
                      />
                    </div>
                  )
              )}

          {/* If popular sort order is set but no star filter, then order by default */}
          {filterStars === undefined &&
            sortBy === "popular" &&
            props.data
              .sort((a, b) => a.id > b.id)
              .map((data, i) => (
                <div
                  id="sort-popular"
                  className="max-w-2xl lg:max-w-2xl 2xl:max-w-3xl 4xl:max-w-4xl mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-60 dark:bg-rose-600 dark:bg-opacity-40 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                  key={i}
                >
                  <ReviewCard
                    image={data.image}
                    showAvatars={showAvatars}
                    author={data.author}
                    date={data.date}
                    stars={data.stars}
                    text={data.text}
                  />
                </div>
              ))}

          {/* If new-old sort order and star filter is set, order by date and then filter by stars */}
          {filterStars &&
            sortBy === "new-old" &&
            props.data
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .reverse()
              .map(
                (data, i) =>
                  data.stars === filterStars && (
                    <div
                      id="filter-sort-new-old"
                      className="max-w-2xl lg:max-w-2xl 2xl:max-w-3xl 4xl:max-w-4xl mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-60 dark:bg-rose-600 dark:bg-opacity-40 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                      key={i}
                    >
                      <ReviewCard
                        image={data.image}
                        showAvatars={showAvatars}
                        author={data.author}
                        date={data.date}
                        stars={data.stars}
                        text={data.text}
                      />
                    </div>
                  )
              )}

          {/* If old-new sort order and star filter is set, order by date and then filter by stars */}
          {filterStars &&
            sortBy === "old-new" &&
            props.data
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .reverse()
              .map(
                (data, i) =>
                  data.stars === filterStars && (
                    <div
                      id="filter-sort-old-new"
                      className="max-w-2xl lg:max-w-2xl 2xl:max-w-3xl 4xl:max-w-4xl mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-60 dark:bg-rose-600 dark:bg-opacity-40 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                      key={i}
                    >
                      <ReviewCard
                        image={data.image}
                        showAvatars={showAvatars}
                        author={data.author}
                        date={data.date}
                        stars={data.stars}
                        text={data.text}
                      />
                    </div>
                  )
              )}

          {/* If new-old sort order is set but no star filter, then order by date */}
          {filterStars === undefined &&
            sortBy === "new-old" &&
            props.data
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .reverse()
              .map((data, i) => (
                <div
                  id="sort-new-old"
                  className="max-w-2xl lg:max-w-2xl 2xl:max-w-3xl 4xl:max-w-4xl mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-60 dark:bg-rose-600 dark:bg-opacity-40 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                  key={i}
                >
                  <ReviewCard
                    image={data.image}
                    showAvatars={showAvatars}
                    author={data.author}
                    date={data.date}
                    stars={data.stars}
                    text={data.text}
                  />
                </div>
              ))}

          {/* If old-new sort order is set but no star filter, then order by date */}
          {filterStars === undefined &&
            sortBy === "old-new" &&
            props.data
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .reverse()
              .map((data, i) => (
                <div
                  id="sort-old-new"
                  className="max-w-2xl lg:max-w-2xl 2xl:max-w-3xl 4xl:max-w-4xl mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-60 dark:bg-rose-600 dark:bg-opacity-40 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                  key={i}
                >
                  <ReviewCard
                    image={data.image}
                    showAvatars={showAvatars}
                    author={data.author}
                    date={data.date}
                    stars={data.stars}
                    text={data.text}
                  />
                </div>
              ))}

          {/* If sort order is not set, then filter by stars */}
          {sortBy === undefined &&
            filterStars &&
            props.data.map(
              (data, i) =>
                data.stars === filterStars && (
                  <div
                    id="filter-stars"
                    className="max-w-2xl lg:max-w-2xl 2xl:max-w-3xl 4xl:max-w-4xl mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-60 dark:bg-rose-600 dark:bg-opacity-40 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                    key={i}
                  >
                    <ReviewCard
                      image={data.image}
                      showAvatars={showAvatars}
                      author={data.author}
                      date={data.date}
                      stars={data.stars}
                      text={data.text}
                    />
                  </div>
                )
            )}

          {/* If sort order and star filter are not set and the search box is used, then display default */}
          {searchText &&
            filterStars === undefined &&
            sortBy === undefined &&
            props.data
              .filter((data) => {
                if (searchText == "") {
                  return data;
                } else if (
                  data.text.toLowerCase().includes(searchText.toLowerCase())
                ) {
                  return data;
                }
              })
              .map((data, i) => (
                <div
                  id="search-filter"
                  className="max-w-2xl lg:max-w-2xl 2xl:max-w-3xl 4xl:max-w-4xl mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-60 dark:bg-rose-600 dark:bg-opacity-40 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                  key={i}
                >
                  <ReviewCard
                    image={data.image}
                    showAvatars={showAvatars}
                    author={data.author}
                    date={data.date}
                    stars={data.stars}
                    text={data.text}
                  />
                </div>
              ))}

          {/* If sort order, star filter and search box are not set, then display default */}
          {searchText === "" &&
            filterStars === undefined &&
            sortBy === undefined &&
            props.data.map((data, i) => (
              <div
                id="default"
                className="max-w-2xl lg:max-w-2xl 2xl:max-w-3xl 4xl:max-w-4xl mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-60 dark:bg-rose-600 dark:bg-opacity-40 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                key={i}
              >
                <ReviewCard
                  image={data.image}
                  showAvatars={showAvatars}
                  author={data.author}
                  date={data.date}
                  stars={data.stars}
                  text={data.text}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
