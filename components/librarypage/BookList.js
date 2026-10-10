import { useState } from "react";
import { initializeDB } from "@/db/db";
import CoverImage from "../global/CoverImage";
import StarIcon from "../resultpage/StarIcon";

const BookCard = ({ book }) => {
  const [details, setDetails] = useState(book);
  const [notes, setNotes] = useState(book.privateNotes || "");
  const [hoveredRating, setHoveredRating] = useState(null);
  const [saveError, setSaveError] = useState("");
  const [notesSaved, setNotesSaved] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [removeError, setRemoveError] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);

  const updateBook = async (changes) => {
    const updatedBook = Object.assign({}, details, changes);
    delete updatedBook.rating;
    delete updatedBook.review;
    setDetails(updatedBook);
    setSaveError("");
    try {
      const db = await initializeDB();
      const [keys, books] = await Promise.all([
        db.getAllKeys("books"),
        db.getAll("books"),
      ]);
      const matchingKeys = keys.filter(
        (_, index) => books[index] && books[index].slug === details.slug,
      );
      const tx = db.transaction("books", "readwrite");
      (matchingKeys.length ? matchingKeys : [details.slug]).forEach((key) =>
        tx.objectStore("books").put(updatedBook, key),
      );
      await tx.done;
      return true;
    } catch (error) {
      console.error("Could not save book details:", error);
      setSaveError("Could not save changes.");
      return false;
    }
  };

  const setRating = async (rating) => {
    const nextRating = details.personalRating === rating ? null : rating;
    await updateBook({ personalRating: nextRating });
  };

  const saveNotes = async () => {
    const saved = await updateBook({ privateNotes: notes });
    setNotesSaved(saved);
    if (saved) setTimeout(() => setNotesSaved(false), 1500);
  };

  const removeBook = async () => {
    setIsRemoving(true);
    setRemoveError("");
    try {
      const db = await initializeDB();
      const [keys, books] = await Promise.all([
        db.getAllKeys("books"),
        db.getAll("books"),
      ]);
      const matchingKeys = keys.filter(
        (_, index) => books[index] && books[index].slug === details.slug,
      );
      const tx = db.transaction("books", "readwrite");
      (matchingKeys.length ? matchingKeys : [details.slug]).forEach((key) =>
        tx.objectStore("books").delete(key),
      );
      await tx.done;
      setIsRemoved(true);
    } catch (error) {
      console.error("Could not remove book from library:", error);
      setRemoveError("Could not remove this book. Please try again.");
      setConfirmRemove(false);
    } finally {
      setIsRemoving(false);
    }
  };

  if (isRemoved) return null;

  return (
    <article className="mt-6 rounded-2xl border border-rose-200/70 bg-white/60 p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-rose-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/80 sm:p-6">
      <div className="flex items-start gap-5">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-semibold sm:text-2xl">
              <a
                className="hover:text-rose-700 hover:underline dark:hover:text-rose-400"
                href={`/book/show/${details.slug}`}
              >
                {details.title}
              </a>
            </h3>
            {!confirmRemove ? (
              <button
                type="button"
                onClick={() => setConfirmRemove(true)}
                aria-label={`Remove ${details.title} from your library`}
                title="Remove from library"
                className="shrink-0 rounded-full p-2 text-gray-400 transition-colors hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-gray-500 dark:hover:bg-slate-700 dark:hover:text-rose-400"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h16M10 11v6m4-6v6M5 7l1 13h12l1-13M9 7V4h6v3"
                  />
                </svg>
              </button>
            ) : (
              <div className="flex shrink-0 items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-xs dark:bg-slate-700">
                <span className="text-gray-700 dark:text-gray-200">
                  Remove book?
                </span>
                <button
                  type="button"
                  onClick={removeBook}
                  disabled={isRemoving}
                  className="font-semibold text-rose-700 hover:underline disabled:opacity-60 dark:text-rose-300"
                >
                  {isRemoving ? "Removing..." : "Remove"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmRemove(false)}
                  disabled={isRemoving}
                  className="text-gray-500 hover:text-gray-800 disabled:opacity-60 dark:text-gray-300 dark:hover:text-white"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {removeError && (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {removeError}
            </p>
          )}
          {details.author && details.author.length > 0 && (
            <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {details.author.map((author, index) => (
                <span key={`${author.name}-${index}`}>
                  {index > 0 && ", "}
                  {author.url ? (
                    <a
                      className="hover:text-rose-700 hover:underline dark:hover:text-rose-400"
                      href={author.url}
                    >
                      {author.name}
                    </a>
                  ) : (
                    <span>{author.name}</span>
                  )}
                </span>
              ))}
            </div>
          )}

          <div
            className="mt-3 flex w-fit items-center gap-1 rounded-full px-1 py-0.5 transition-colors duration-200 hover:bg-rose-50/80 dark:hover:bg-slate-700/70"
            role="group"
            aria-label={`Your rating: ${
              details.personalRating == null ? "not rated" : details.personalRating
            } out of 5`}
            onMouseLeave={() => setHoveredRating(null)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setHoveredRating(null);
              }
            }}
          >
            {Array.from({ length: 5 }, (_, index) => {
              const star = index + 1;
              const rating =
                hoveredRating !== null
                  ? hoveredRating
                  : details.personalRating || 0;
              const fill = Math.max(0, Math.min(1, rating - index));
              return (
                <span
                  key={star}
                  className="relative inline-flex h-7 w-7 transition-transform duration-150 hover:scale-110"
                >
                  <span className="pointer-events-none absolute inset-0">
                    <StarIcon
                      fill="#9CA3AF"
                      className="h-7 w-7 transition-colors duration-150"
                    />
                  </span>
                  <span
                    className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden"
                    style={{
                      width: `${fill * 100}%`,
                      transition: "width 140ms ease-out",
                    }}
                  >
                    <StarIcon
                      fill="#ED8A19"
                      className="h-7 w-7 max-w-none transition-colors duration-150"
                    />
                  </span>
                  {[0.5, 1].map((value) => {
                    const rating = index + value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(rating)}
                        onMouseEnter={() => setHoveredRating(rating)}
                        onFocus={() => setHoveredRating(rating)}
                        aria-label={`Rate ${rating} out of 5 stars`}
                        aria-pressed={details.personalRating === rating}
                        title={`${rating} stars`}
                        className={`absolute inset-y-0 w-1/2 rounded-sm focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                          value === 0.5 ? "left-0" : "right-0"
                        }`}
                      />
                    );
                  })}
                </span>
              );
            })}
          </div>

          <label className="mt-4 block">
            <span className="sr-only">Private notes for {details.title}</span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              onBlur={saveNotes}
              placeholder="Add a private note..."
              rows={2}
              className="w-full resize-y rounded-lg border border-transparent bg-gray-100/80 px-3 py-2 text-sm text-gray-700 transition-colors duration-200 placeholder:text-gray-400 focus:border-rose-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 dark:bg-slate-700/70 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-rose-700 dark:focus:bg-slate-700 dark:focus:ring-rose-900"
            />
          </label>
          {(saveError || notesSaved) && (
            <p
              className={`mt-1 text-xs ${saveError ? "text-red-600" : "text-gray-500 dark:text-gray-400"}`}
              role={saveError ? "alert" : "status"}
            >
              {saveError || "Notes saved"}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Added{" "}
            {new Date(details.timestamp).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        {details.cover && (
          <CoverImage
            src={details.cover}
            alt={`${details.title} book cover`}
            width="98"
            height="148"
          />
        )}
      </div>
    </article>
  );
};

const BookList = ({ libraryData }) => {
  const booksBySlug = new Map();
  const books = Object.values(libraryData);
  books.sort((a, b) => a.timestamp - b.timestamp);
  books.forEach((book) => {
    if (!Object.keys(book).length) return;
    const existing = booksBySlug.get(book.slug);
    if (!existing) {
      booksBySlug.set(book.slug, book);
      return;
    }

    const mergedBook = Object.assign({}, existing, book);
    if (!existing.cover) mergedBook.cover = book.cover;
    if (!existing.author || !existing.author.length) {
      mergedBook.author = book.author;
    }
    if (existing.personalRating == null) {
      mergedBook.personalRating = book.personalRating;
    }
    if (!existing.privateNotes) {
      mergedBook.privateNotes = book.privateNotes || "";
    }
    booksBySlug.set(book.slug, mergedBook);
  });

  return (
    <div
      id="bookList"
      className="flex flex-col items-center justify-center px-4 dark:text-gray-100/80"
    >
      {Array.from(booksBySlug.values()).map((book) => (
        <div key={book.slug} className="w-full max-w-[1000px]">
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
};

export default BookList;
