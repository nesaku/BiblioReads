import { useState, useEffect } from "react";
import { Pagination } from "@nextui-org/pagination";
import ReviewCard from "./ReviewCard";
import FilterButton from "./FilterButton";
import SortButton from "./SortButton";

const Reviews = (props) => {
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
    currentPage: 1,
    currentData: [],
    isFading: false,
  });

  // Pagination styling
  const customStyles = {
    wrapper: "flex capitalize justify-center items-center mb-10 mt-20 text-md",
    item: "m-2 p-3 rounded-md font-semibold text-md bg-rose-50 dark:bg-gray-800 hover:bg-rose-300 transition duration-300 delay-40 hover:delay-40 ring ring-gray-300 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600",
    activeItem: "text-rose-600 dark:text-rose-600", // Ensure full coverage with background color
    cursor: "p-2 font-semibold",
    disabled: "text-gray-500 cursor-not-allowed",
  };

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: Math.ceil(prevState.data.length / prevState.numberPerPage),
      currentData: prevState.data.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset]);

  const handlePageClick = (pageNumber) => {
    setPagination({ ...pagination, isFading: true });

    const offset = (pageNumber - 1) * pagination.numberPerPage;

    setTimeout(() => {
      setPagination((prevState) => ({
        ...prevState,
        offset,
        currentPage: pageNumber,
        currentData: prevState.data.slice(
          offset,
          offset + pagination.numberPerPage
        ),
        isFading: false, // Trigger fade-in effect
      }));
    }, 20);
  };

  const renderPaginationItem = ({
    ref,
    value,
    isActive,
    className,
    setPage,
  }) => {
    const activeClass = isActive ? customStyles.activeItem : "";
    return (
      <li
        ref={ref}
        className={`${className} ${activeClass}`}
        onClick={() => setPage(value)}
      >
        {value}
      </li>
    );
  };

  return (
    <>
      <div id="bookReviews" className="dark:text-gray-100/80 my-8 lg:my-8">
        <h2 className="font-bold text-2xl mt-0 mb-4 underline decoration-rose-600 text-center lg:text-left">
          Reviews:
        </h2>

        <button
          type="button"
          onClick={() => {
            showReviews ? setShowReviews(false) : setShowReviews(true);
          }}
          className="flex m-auto lg:mx-0 py-4 lg:py-5 px-3 lg:px-16 mt-6 mb-8 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 dark:hover:bg-slate-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-400 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600"
        >
          {showReviews ? "Hide" : "Show"} Reviews
          {!showReviews && (
            <svg
              aria-hidden="true"
              className="w-5 h-5 ml-2 -mr-1 hidden lg:block"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </button>

        {showReviews && (
          <div id="reviews">
            <div className="flex flex-col xl:flex-row justify-center lg:justify-start xl:justify-between items-center lg:items-start">
              <div
                id="filterOptions"
                className="flex flex-row justify-center items-center"
              >
                <p className="mr-2 text-md font-medium text-gray-900 dark:text-gray-300">
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
              <div id="sortOptions" className="flex flex-row items-center">
                <p className="mr-2 lg:mr-0 text-md font-medium text-gray-900 dark:text-gray-300">
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
              <div
                id="resetButton"
                className="hidden lg:flex flex-row items-center"
              >
                <button
                  id="resetAll"
                  onClick={() => {
                    setFilterStars(undefined);
                    setSortBy(undefined);
                    setSearchText("");
                  }}
                  className="m-2 p-1 font-semibold text-md text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 dark::hover:bg-gray-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-300 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600"
                >
                  Reset All
                </button>
              </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between items-center">
              <div
                id="searchFilter"
                className="flex flex-row items-center mb-2"
              >
                <p className="mr-2 text-md font-medium text-gray-900 dark:text-gray-300">
                  Search:{" "}
                </p>
                <input
                  name="search-review-text"
                  aria-label="Search Review Text"
                  type="text"
                  placeholder="Search review text"
                  className={
                    filterStars || sortBy
                      ? "form-control block w-48 lg:w-[360px] m-0 px-3 py-1.5 text-base font-normal text-gray-400 dark:text-gray-600 bg-gray-300 dark:bg-gray-600 bg-clip-padding border-2 border-solid border-gray-400 rounded-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-rose-600 focus:outline-none cursor-not-allowed"
                      : "form-control block w-48 lg:w-[360px] m-0 px-3 py-1.5 text-base font-normal text-gray-900 dark:text-gray-200 bg-rose-50 dark:bg-gray-800 bg-clip-padding border-2 border-solid border-gray-400 rounded-lg transition ease-in-out focus:text-gray-900 focus:bg-gray-200 focus:border-rose-600 focus:outline-none"
                  }
                  onChange={(e) => setSearchText(e.target.value)}
                  disabled={filterStars || sortBy}
                />
              </div>
              <div className="flex justify-center items-center my-5 lg:my-6">
                <p className="mr-3 text-md font-medium text-gray-900 dark:text-gray-100/80">
                  Show Profile Avatars:
                </p>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    name="show-avatars-toggle"
                    aria-label="Show Profile Avatars"
                    type="checkbox"
                    onClick={() => {
                      showAvatars
                        ? setShowAvatars(false)
                        : setShowAvatars(true);
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-600"></div>
                </label>

                <button
                  id="resetAll-mobile"
                  onClick={() => {
                    setFilterStars(undefined);
                    setSortBy(undefined);
                    setSearchText("");
                  }}
                  className="block lg:hidden ml-5 py-0.5 px-1 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 dark::hover:bg-gray-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-300 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600"
                >
                  Reset All
                </button>
              </div>
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
                  <div
                    className={`pagination-content ${
                      pagination.isFading ? "fade-out" : "fade-in"
                    }`}
                  >
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
                    <Pagination
                      total={pagination.pageCount}
                      initialPage={pagination.currentPage}
                      onChange={handlePageClick}
                      showShadow
                      color="primary"
                      classNames={{
                        wrapper: customStyles.wrapper,
                        item: customStyles.item,
                        cursor: customStyles.cursor,
                        disabled: customStyles.disabled,
                      }}
                      renderItem={renderPaginationItem}
                    />
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </>
  );
};

export default Reviews;
