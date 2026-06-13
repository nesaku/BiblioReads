import { useState, useEffect, useRef, useCallback } from "react";
import ReviewCard from "./ReviewCard";
import FilterButton from "./FilterButton";
import SortButton from "./SortButton";

const Reviews = (props) => {
  const [showReviews, setShowReviews] = useState(false);
  const [showAvatars, setShowAvatars] = useState(false);

  const [filterStars, setFilterStars] = useState();
  const [sortBy, setSortBy] = useState();

  const [searchText, setSearchText] = useState("");

  const [reviews, setReviews] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [totalReviewCount, setTotalReviewCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  const loaderRef = useRef(null);

  // Map filter values to numeric ratings
  const filterStarValue = filterStars
    ? parseInt(filterStars.match(/\d+/)?.[0], 10)
    : undefined;

  const fetchReviews = useCallback(
    async (pageToken) => {
      if (!props.resourceID) return;

      setLoading(true);
      try {
        const res = await fetch("/api/reviews-scraper", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resourceID: props.resourceID,
            legacyBookID: props.legacyBookID,
            nextPageToken: pageToken,
          }),
        });
        const data = await res.json();

        if (data.status !== "Received" || !data.reviews) {
          setError(true);
          return;
        }

        setReviews((prev) =>
          pageToken ? [...prev, ...data.reviews] : data.reviews,
        );
        setNextPageToken(data.nextPageToken ?? null);
        if (totalReviewCount === null) setTotalReviewCount(data.totalCount);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError(true);
      } finally {
        setLoading(false);
        setHasFetchedOnce(true);
      }
    },
    [props.resourceID, props.legacyBookID, totalReviewCount],
  );

  // Initial fetch on mount
  useEffect(() => {
    if (props.resourceID && !hasFetchedOnce) {
      fetchReviews(null);
    }
  }, [props.resourceID, hasFetchedOnce, fetchReviews]);

  // Infinite scroll by keeping track of the element near the bottom of the list
  useEffect(() => {
    if (!showReviews) return;
    const sentinel = loaderRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          nextPageToken &&
          !loading &&
          filterStars === undefined &&
          sortBy === undefined &&
          searchText === ""
        ) {
          fetchReviews(nextPageToken);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [
    showReviews,
    nextPageToken,
    loading,
    filterStars,
    sortBy,
    searchText,
    fetchReviews,
  ]);

  // Filtering, searching, and sorting to the reviews loaded 
  const getDisplayedReviews = () => {
    let data = [...reviews];

    if (filterStarValue !== undefined) {
      data = data.filter((review) => review.rating === filterStarValue);
    }

    if (searchText) {
      data = data.filter((review) =>
        review.text?.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    if (sortBy === "popular") {
      data.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
    } else if (sortBy === "new-old") {
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (sortBy === "old-new") {
      data.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }

    return data;
  };

  const displayedReviews = getDisplayedReviews();

  return (
    <>
      <div id="bookReviews" className="dark:text-gray-100/80 my-8 lg:my-8">
        <h2 className="font-bold text-2xl mt-0 mb-4 underline decoration-rose-600 text-center lg:text-left">
          Reviews:
        </h2>

        {loading && reviews.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            Loading reviews…
          </p>
        )}

        {error && reviews.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            Could not load reviews.
          </p>
        )}

        {reviews.length > 0 && (
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
        )}
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
                  value={searchText}
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

            <div id="review-list">
              {displayedReviews.map((review) => (
                <div
                  className="mx-auto lg:mx-0 my-2 p-4 bg-white bg-opacity-30 dark:bg-opacity-60 dark:bg-slate-800 dark:backdrop-blur-xl dark:drop-shadow-lg rounded-lg shadow"
                  key={review.id}
                >
                  <ReviewCard
                    mobile={false}
                    showAvatars={showAvatars}
                    reviewer={review.reviewer}
                    createdAt={review.createdAt}
                    rating={review.rating}
                    text={review.text}
                    likeCount={review.likeCount}
                  />
                </div>
              ))}

              {displayedReviews.length === 0 && !loading && hasFetchedOnce && (
                <p className="text-center my-6 text-gray-700 dark:text-gray-300">
                  No reviews match your filters.
                </p>
              )}
            </div>

            {/* Sentinel element used to trigger loading more reviews via infinite scroll */}
            {filterStars === undefined &&
              sortBy === undefined &&
              searchText === "" && (
                <div ref={loaderRef} className="h-10 w-full" />
              )}

            {loading && (
              <p className="text-center my-4 text-gray-700 dark:text-gray-300">
                Loading more reviews...
              </p>
            )}

            {!loading &&
              !nextPageToken &&
              hasFetchedOnce &&
              filterStars === undefined &&
              sortBy === undefined &&
              searchText === "" && (
                <p className="text-center my-4 text-gray-500 dark:text-gray-400">
                  No more reviews to load.
                </p>
              )}

            {totalReviewCount !== null &&
              filterStars === undefined &&
              sortBy === undefined &&
              searchText === "" && (
                <p className="text-center text-sm text-gray-400 dark:text-gray-500 mb-10">
                  Showing {reviews.length.toLocaleString()} of{" "}
                  {totalReviewCount.toLocaleString()} reviews
                </p>
              )}
          </div>
        )}
      </div>
    </>
  );
};

export default Reviews;
