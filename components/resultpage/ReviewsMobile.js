import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ReviewCard from "./ReviewCard";
import FilterButton from "./FilterButton";
import SortButton from "./SortButton";

const ReviewsMobile = (props) => {
  const [showReviews, setShowReviews] = useState(false);
  const [showAvatars, setShowAvatars] = useState(false);

  const [filterStars, setFilterStars] = useState();
  const [sortBy, setSortBy] = useState();

  const [searchText, setSearchText] = useState("");

  const [pagination, setPagination] = useState({
    data: props.data,
    offset: 0,
    numberPerPage: 6,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData: prevState.data.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  return (
    <div id="bookReviews-mobile">
      <h2 className="font-bold text-2xl mt-8 mb-4 underline decoration-rose-600">
        Reviews:
      </h2>
      <button
        onClick={() => {
          showReviews ? setShowReviews(false) : setShowReviews(true);
        }}
        className="py-4 px-3 mt-6 mb-8 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 dark:hover:bg-slate-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-400 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600"
      >
        {showReviews ? "Hide" : "Show"} Reviews
      </button>

      {showReviews && (
        <div id="reviews">
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
              value="Rating 5 out of 5"
              text="5 Stars"
            />
            <FilterButton
              setFilterStars={setFilterStars}
              filterStars={filterStars}
              value="Rating 4 out of 5"
              text="4 Stars"
            />
            <FilterButton
              setFilterStars={setFilterStars}
              filterStars={filterStars}
              value="Rating 3 out of 5"
              text="3 Stars"
            />
            <FilterButton
              setFilterStars={setFilterStars}
              filterStars={filterStars}
              value="Rating 2 out of 5"
              text="2 Stars"
            />
            <FilterButton
              setFilterStars={setFilterStars}
              filterStars={filterStars}
              value="Rating 1 out of 5"
              text="1 Star"
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
                name="show-avatars-toggle"
                aria-label="Show Profile Avatars"
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
              className="ml-5 py-0.5 px-1 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 dark::hover:bg-gray-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-300 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600"
            >
              Reset All
            </button>
          </div>
          <div
            id="searchFilter"
            className="flex flex-row justify-center items-center my-4"
          >
            <p className="mr-3 text-md font-medium text-gray-900 dark:text-gray-300">
              Search:{" "}
            </p>
            <input
              name="search-review-text"
              aria-label="Search Review Text"
              type="text"
              placeholder="Search review text"
              className={
                filterStars || sortBy
                  ? "form-control block w-48 m-0 px-3 py-1.5 text-base font-normal text-gray-400 dark:text-gray-600 bg-gray-400 dark:bg-gray-600 bg-clip-padding border-2 border-solid border-gray-400 rounded-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-rose-600 focus:outline-none cursor-not-allowed"
                  : "form-control block w-48 m-0 px-3 py-1.5 text-base font-normal text-gray-900 dark:text-gray-200 bg-rose-50 dark:bg-gray-800 bg-clip-padding border-2 border-solid border-gray-400 rounded-lg transition ease-in-out focus:text-gray-900 focus:bg-gray-200 focus:border-rose-600 focus:outline-none"
              }
              onChange={(e) => setSearchText(e.target.value)}
              disabled={filterStars || sortBy}
            />
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
                      className="mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-30 dark:bg-opacity-60 dark:bg-slate-800 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                      key={i}
                    >
                      <ReviewCard
                        mobile={false}
                        image={data.image}
                        showAvatars={showAvatars}
                        author={data.author}
                        date={data.date}
                        stars={data.stars}
                        text={data.text}
                        likes={data.likes}
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
                  className="mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-30 dark:bg-opacity-60 dark:bg-slate-800 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                  key={i}
                >
                  <ReviewCard
                    mobile={false}
                    image={data.image}
                    showAvatars={showAvatars}
                    author={data.author}
                    date={data.date}
                    stars={data.stars}
                    text={data.text}
                    likes={data.likes}
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
                      className="mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-30 dark:bg-opacity-60 dark:bg-slate-800 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                      key={i}
                    >
                      <ReviewCard
                        mobile={false}
                        image={data.image}
                        showAvatars={showAvatars}
                        author={data.author}
                        date={data.date}
                        stars={data.stars}
                        text={data.text}
                        likes={data.likes}
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
                      className="mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-30 dark:bg-opacity-60 dark:bg-slate-800 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                      key={i}
                    >
                      <ReviewCard
                        mobile={false}
                        image={data.image}
                        showAvatars={showAvatars}
                        author={data.author}
                        date={data.date}
                        stars={data.stars}
                        text={data.text}
                        likes={data.likes}
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
                  className="mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-30 dark:bg-opacity-60 dark:bg-slate-800 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                  key={i}
                >
                  <ReviewCard
                    mobile={false}
                    image={data.image}
                    showAvatars={showAvatars}
                    author={data.author}
                    date={data.date}
                    stars={data.stars}
                    text={data.text}
                    likes={data.likes}
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
                  className="mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-30 dark:bg-opacity-60 dark:bg-slate-800 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                  key={i}
                >
                  <ReviewCard
                    mobile={false}
                    image={data.image}
                    showAvatars={showAvatars}
                    author={data.author}
                    date={data.date}
                    stars={data.stars}
                    text={data.text}
                    likes={data.likes}
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
                    className="mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-30 dark:bg-opacity-60 dark:bg-slate-800 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                    key={i}
                  >
                    <ReviewCard
                      mobile={false}
                      image={data.image}
                      showAvatars={showAvatars}
                      author={data.author}
                      date={data.date}
                      stars={data.stars}
                      text={data.text}
                      likes={data.likes}
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
                  className="mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-30 dark:bg-opacity-60 dark:bg-slate-800 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                  key={i}
                >
                  <ReviewCard
                    mobile={false}
                    image={data.image}
                    showAvatars={showAvatars}
                    author={data.author}
                    date={data.date}
                    stars={data.stars}
                    text={data.text}
                    likes={data.likes}
                  />
                </div>
              ))}

          {/* If sort order, star filter and search box are not set, then display default */}
          {searchText === "" &&
            filterStars === undefined &&
            sortBy === undefined && (
              <div id="pagination">
                {pagination.currentData &&
                  pagination.currentData.map((data, i) => (
                    <div
                      id="default"
                      className="mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-30 dark:bg-opacity-60 dark:bg-slate-800 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                      key={i}
                    >
                      <ReviewCard
                        mobile={false}
                        image={data.image}
                        showAvatars={showAvatars}
                        author={data.author}
                        date={data.date}
                        stars={data.stars}
                        text={data.text}
                        likes={data.likes}
                      />
                    </div>
                  ))}
                <ReactPaginate
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  pageCount={pagination.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={
                    "flex capitalize justify-center items-center mb-10 mt-20 text-md"
                  }
                  pageLinkClassName={
                    "m-2 p-2 sm:p-3 rounded-md font-semibold text-md bg-rose-50 dark:bg-gray-800 hover:bg-rose-300 transition duration-300 delay-40 hover:delay-40 ring ring-gray-300 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600"
                  }
                  activeClassName={"text-rose-600 dark:text-rose-600"}
                  nextLinkClassName={"p-1 sm:p-2 font-semibold"}
                  previousLinkClassName={"p-1 sm:p-2 font-semibold"}
                  disabledLinkClassName={"text-gray-500 cursor-not-allowed"}
                />
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default ReviewsMobile;
