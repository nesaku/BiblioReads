import React, { useState, useRef } from "react";
import { initializeDB } from "@/db/db";
import Toast from "../global/Toast";
import { parseGoodreadsCSV } from "@/utils/goodreadsCSV";

const stores = ["books", "authors", "quotes"];

const getGoodreadsId = (key, book) => {
  const value = book && book.slug ? book.slug : key;
  const match = value.toString().match(/^(\d+)/);
  return match ? match[1] : null;
};

const getDataKey = (item) => {
  if (!item) return null;
  return item.slug || item.hash || item.id || null;
};

const getStoreEntries = async (db, storeName) => {
  const [keys, items] = await Promise.all([
    db.getAllKeys(storeName),
    db.getAll(storeName),
  ]);
  return keys.map((key, index) => ({ key, item: items[index] }));
};

const getGoodreadsBookGroups = async (db) => {
  const groups = new Map();
  const entries = await getStoreEntries(db, "books");
  for (const entry of entries) {
    const key = entry.key;
    const book = entry.item;
    const id = getGoodreadsId(key, book);
    if (!id) continue;
    if (!groups.has(id)) groups.set(id, []);
    groups.get(id).push({ key, book });
  }
  return groups;
};

const getExistingKeys = async (db, storeName) => {
  const keys = new Map();
  const entries = await getStoreEntries(db, storeName);
  for (const entry of entries) {
    const matchingKey = entry.key.toString();
    if (!keys.has(matchingKey)) keys.set(matchingKey, []);
    keys.get(matchingKey).push(entry.key);

    const itemKey = getDataKey(entry.item);
    if (itemKey == null || itemKey.toString() === matchingKey) continue;
    const itemKeyString = itemKey.toString();
    if (!keys.has(itemKeyString)) keys.set(itemKeyString, []);
    keys.get(itemKeyString).push(entry.key);
  }
  return keys;
};

const LibrarySettings = () => {
  const [importFormat, setImportFormat] = useState("json");
  const [csvBooks, setCSVBooks] = useState([]);
  const [jsonData, setJSONData] = useState(null);
  const [duplicateCount, setDuplicateCount] = useState(0);
  const [duplicateStrategy, setDuplicateStrategy] = useState("skip");
  const [showImportModal, setShowImportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateBooksCount, setDuplicateBooksCount] = useState(0);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [missingCoverCount, setMissingCoverCount] = useState(0);
  const [coverFetchProgress, setCoverFetchProgress] = useState({
    completed: 0,
    total: 0,
  });
  const [coverFetchResult, setCoverFetchResult] = useState(null);
  const [isFetchingCovers, setIsFetchingCovers] = useState(false);
  const [overwriteData, setOverwriteData] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef();

  // Get and export all library data in a JSON file with a timestamp
  const handleExport = async () => {
    setIsLoading(true);
    try {
      const db = await initializeDB();
      const [books, authors, quotes] = await Promise.all([
        db.getAll("books"),
        db.getAll("authors"),
        db.getAll("quotes"),
      ]);

      books.forEach((book) => {
        delete book.rating;
        delete book.review;
        if (book.goodreads) delete book.goodreads.review;
      });
      const exportData = { books, authors, quotes };
      const now = new Date();
      const timestamp = now.toISOString().replace(/[:.]/g, "-").slice(0, 19);
      const filename = `library-export-${timestamp}.json`;

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      setToastMessage("Library exported successfully");
      setToastType("success");
    } catch (error) {
      console.error("Export failed:", error);
      setToastMessage("Error exporting library");
      setToastType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const findBooksMissingCovers = async (db) => {
    const groups = await getGoodreadsBookGroups(db);
    const missing = [];
    groups.forEach((entries, id) => {
      if (entries.every((entry) => !entry.book.cover)) {
        missing.push({ id, entries });
      }
    });
    return missing;
  };

  const handleFetchMissingCovers = async () => {
    setIsFetchingCovers(true);
    setCoverFetchResult(null);
    let fetched = 0;
    let failed = 0;
    try {
      const db = await initializeDB();
      const booksToFetch = await findBooksMissingCovers(db);
      setCoverFetchProgress({ completed: 0, total: booksToFetch.length });

      for (const [index, { id, entries }] of booksToFetch.entries()) {
        try {
          const response = await fetch("/api/book-scraper", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              queryURL: `https://www.goodreads.com/book/show/${id}`,
            }),
          });
          const data = await response.json();
          if (!response.ok || !data.cover) {
            throw new Error(`No cover returned for Goodreads book ${id}`);
          }

          const updatedDetails = { cover: data.cover };
          [
            "title",
            "series",
            "seriesURL",
            "workURL",
            "bookEdition",
            "publishDate",
            "publisher",
            "language",
            "asin",
            "isbn",
            "isbn13",
            "desc",
            "genres",
            "scrapeURL",
            "legacyBookID",
            "bookID",
            "resourceID",
            "lastScraped",
          ].forEach((field) => {
            if (data[field] != null && data[field] !== "") {
              updatedDetails[field] = data[field];
            }
          });
          if (
            Array.isArray(data.author) &&
            data.author.some((author) => author.name)
          ) {
            updatedDetails.author = data.author.filter((author) => author.name);
          }

          const tx = db.transaction("books", "readwrite");
          const store = tx.objectStore("books");
          entries.forEach((entry) =>
            store.put(Object.assign({}, entry.book, updatedDetails), entry.key),
          );
          await tx.done;
          fetched += 1;
        } catch (error) {
          failed += 1;
          console.error(`Could not fetch cover for book ${id}:`, error);
        }
        setCoverFetchProgress({
          completed: index + 1,
          total: booksToFetch.length,
        });
      }
      setCoverFetchResult({ fetched, failed });
    } catch (error) {
      console.error("Could not fetch missing book covers:", error);
      setCoverFetchResult({ fetched, failed, error: true });
    } finally {
      setIsFetchingCovers(false);
    }
  };

  const handleRemoveDuplicateBooks = async () => {
    setIsLoading(true);
    try {
      const db = await initializeDB();
      const bookGroups = await getGoodreadsBookGroups(db);
      const duplicateGroups = [];
      bookGroups.forEach((group) => {
        if (group.length > 1) duplicateGroups.push(group);
      });
      const duplicateCount = duplicateGroups.reduce(
        (count, group) => count + group.length - 1,
        0,
      );
      if (!duplicateCount) {
        setToastMessage("No duplicate books found");
        setToastType("info");
        setShowDuplicateModal(false);
        return;
      }

      const tx = db.transaction("books", "readwrite");
      const store = tx.objectStore("books");
      for (const group of duplicateGroups) {
        let keeper = group[0];
        let keeperScore = 0;
        for (const entry of group) {
          let score = 0;
          if (entry.book.cover) score += 1;
          if (entry.book.personalRating != null) score += 1;
          if (entry.book.privateNotes) score += 1;
          if (entry.book.author) {
            for (const author of entry.book.author) {
              if (author.url) {
                score += 1;
                break;
              }
            }
          }
          if (score > keeperScore) {
            keeper = entry;
            keeperScore = score;
          }
        }

        const mergedBook = Object.assign({}, keeper.book);
        for (const entry of group) {
          if (entry === keeper) continue;
          if (!mergedBook.cover && entry.book.cover) {
            mergedBook.cover = entry.book.cover;
          }
          if (
            mergedBook.personalRating == null &&
            entry.book.personalRating != null
          ) {
            mergedBook.personalRating = entry.book.personalRating;
          }
          if (!mergedBook.privateNotes && entry.book.privateNotes) {
            mergedBook.privateNotes = entry.book.privateNotes;
          }
          store.delete(entry.key);
        }
        store.put(mergedBook, keeper.key);
      }
      await tx.done;
      setShowDuplicateModal(false);
      setToastMessage(
        `Removed ${duplicateCount} duplicate ${
          duplicateCount === 1 ? "book" : "books"
        }`,
      );
      setToastType("success");
      window.location.reload();
    } catch (error) {
      console.error("Could not remove duplicate books:", error);
      setShowDuplicateModal(false);
      setToastMessage("Error removing duplicate books");
      setToastType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setImportFormat("json");
      try {
        const data = JSON.parse(await file.text());
        if (
          !data ||
          typeof data !== "object" ||
          !stores.every((store) => Array.isArray(data[store]))
        ) {
          throw new Error("Invalid file format");
        }
        setJSONData(data);
        const db = await initializeDB();
        const existingData = await Promise.all(
          stores.map((store) => getExistingKeys(db, store)),
        );
        const duplicateCount = stores.reduce(
          (count, store, index) =>
            count +
            data[store].filter((item) => {
              const key = getDataKey(item);
              return key != null && existingData[index].has(key.toString());
            }).length,
          0,
        );
        setDuplicateCount(duplicateCount);
        setDuplicateStrategy("skip");
        setShowImportModal(true);
      } catch (error) {
        console.error("JSON library import failed:", error);
        setToastMessage(error.message || "Invalid file format");
        setToastType("error");
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
      return;
    }

    try {
      const parsed = parseGoodreadsCSV(await file.text());
      const db = await initializeDB();
      const existingBooks = await getGoodreadsBookGroups(db);
      const existingIds = new Set(existingBooks.keys());
      setCSVBooks(parsed);
      setJSONData(null);
      setDuplicateCount(
        parsed.filter((book) => existingIds.has(book.slug)).length,
      );
      setImportFormat("goodreads-csv");
      setDuplicateStrategy("skip");
      setShowImportModal(true);
    } catch (error) {
      console.error("Goodreads CSV import failed:", error);
      setToastMessage(error.message || "Invalid Goodreads CSV file");
      setToastType("error");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Confirm import
  const confirmImport = async () => {
    setShowImportModal(false);
    setIsLoading(true);
    try {
      if (importFormat === "goodreads-csv") {
        const db = await initializeDB();
        const existingBooks = await getGoodreadsBookGroups(db);
        const tx = db.transaction("books", "readwrite");
        const store = tx.objectStore("books");
        let importedCount = 0;
        let skippedCount = 0;

        for (const book of csvBooks) {
          const existing = existingBooks.get(book.slug) || [];
          if (existing.length && duplicateStrategy === "skip") {
            skippedCount += 1;
            continue;
          }
          existing.forEach((entry) => store.delete(entry.key));
          const importedBook = Object.assign({}, book);
          importedBook.cover =
            existing.length && existing[0].book.cover
              ? existing[0].book.cover
              : null;
          store.put(importedBook, book.slug);
          importedCount += 1;
        }
        await tx.done;
        setToastMessage(
          `Imported ${importedCount} Goodreads ${
            importedCount === 1 ? "book" : "books"
          }${skippedCount ? `; skipped ${skippedCount} existing` : ""}`,
        );
        setToastType("success");
        setCSVBooks([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
        window.location.reload();
        return;
      }

      const data = jsonData;

      if (
        !data ||
        typeof data !== "object" ||
        !stores.every((store) => Array.isArray(data[store]))
      ) {
        setToastMessage("Invalid file format");
        setToastType("error");
        setIsLoading(false);
        return;
      }

      const db = await initializeDB();

      const existingKeys = await Promise.all(
        stores.map((store) => getExistingKeys(db, store)),
      );
      const transaction = db.transaction(stores, "readwrite");
      if (overwriteData) {
        stores.forEach((store) => transaction.objectStore(store).clear());
      }
      let importedCount = 0;
      let skippedCount = 0;
      for (const [index, store] of stores.entries()) {
        for (const item of data[store]) {
          const key = getDataKey(item);
          const isDuplicate =
            key != null && existingKeys[index].has(key.toString());
          if (!overwriteData && isDuplicate && duplicateStrategy === "skip") {
            skippedCount += 1;
            continue;
          }
          if (isDuplicate) {
            existingKeys[index]
              .get(key.toString())
              .forEach((existingKey) =>
                transaction.objectStore(store).delete(existingKey),
              );
          }
          const importedItem = Object.assign({}, item);
          if (store === "books") {
            delete importedItem.rating;
            delete importedItem.review;
            if (importedItem.goodreads) {
              importedItem.goodreads = Object.assign(
                {},
                importedItem.goodreads,
              );
              delete importedItem.goodreads.review;
            }
          }
          transaction
            .objectStore(store)
            .put(importedItem, key == null ? crypto.randomUUID() : key);
          importedCount += 1;
        }
      }
      await transaction.done;

      setToastMessage(
        `Imported ${importedCount} items${
          skippedCount ? `; skipped ${skippedCount} existing` : ""
        }`,
      );
      setToastType("success");
      setJSONData(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      window.location.reload();
    } catch (error) {
      console.error("Import failed:", error);
      setToastMessage("Error importing library");
      setToastType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckDuplicateBooks = async () => {
    setIsLoading(true);
    try {
      const db = await initializeDB();
      const bookGroups = await getGoodreadsBookGroups(db);
      const groups = [];
      bookGroups.forEach((group) => {
        if (group.length > 1) groups.push(group);
      });
      const count = groups.reduce(
        (total, group) => total + group.length - 1,
        0,
      );
      setDuplicateBooksCount(count);
      if (count > 0) {
        setShowDuplicateModal(true);
      } else {
        setToastMessage("No duplicate books found");
        setToastType("info");
      }
    } catch (error) {
      console.error("Could not check for duplicate books:", error);
      setToastMessage("Error checking for duplicate books");
      setToastType("error");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete all data from every store
  const handleDeleteAll = async () => {
    setIsLoading(true);
    try {
      const db = await initializeDB();
      for (const store of stores) {
        const keys = await db.getAllKeys(store);
        const tx = db.transaction(store, "readwrite");
        const objectStore = tx.objectStore(store);
        keys.forEach((key) => objectStore.delete(key));
        await tx.done;
      }
      setToastMessage("Library data deleted");
      setToastType("success");
      window.location.reload();
    } catch (error) {
      console.error("Delete failed:", error);
      setToastMessage("Error deleting library");
      setToastType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center px-10 py-2">
      <div id="exportLibrary" className="m-8 sm:m-10">
        <h3 className="mb-2 text-2xl font-semibold capitalize text-gray-700 dark:text-gray-300">
          Export Library
        </h3>
        <button
          onClick={handleExport}
          className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-800 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-900/60"
        >
          Export
        </button>
      </div>

      <div
        id="importLibrary"
        className="flex flex-col justify-center items-center m-8 sm:m-10"
      >
        <label className="mb-2 text-2xl font-semibold capitalize text-gray-700 dark:text-gray-300">
          Import Library
        </label>
        <p className="mt-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
          Import a BiblioReads JSON backup or Goodreads library CSV export.
        </p>
        <input
          type="file"
          accept=".json,.csv,application/json,text/csv"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="max-w-xs cursor-pointer rounded-lg border border-green-200 bg-green-50/70 px-2 py-10 text-center font-medium text-gray-700 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-green-100 file:px-3 file:py-2 file:font-semibold file:text-green-800 hover:file:bg-green-200 dark:border-green-900 dark:bg-gray-800/70 dark:text-gray-200 dark:file:bg-green-950/60 dark:file:text-green-200 dark:hover:file:bg-green-900/70"
        />
        {importFormat !== "goodreads-csv" && (
          <label className="mt-4 flex items-center rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-left text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
            <input
              type="checkbox"
              checked={overwriteData}
              onChange={() => setOverwriteData((v) => !v)}
              className="mr-2 accent-rose-600"
            />
            Overwrite existing library data
          </label>
        )}
      </div>

      <div id="removeDuplicateBooks" className="">
        <h3 className="mb-2 text-2xl font-semibold capitalize text-gray-700 dark:text-gray-300">
          Remove Duplicate Books
        </h3>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
          Keep only one copy of each book and preserve ratings and notes.
        </p>
        <button
          type="button"
          onClick={handleCheckDuplicateBooks}
          className="mb-8 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-2 font-semibold text-yellow-900 transition-colors hover:bg-yellow-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 dark:border-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-200 dark:hover:bg-yellow-900/60"
        >
          Remove Duplicate Books
        </button>
      </div>

      <div id="fetchMissingDetails" className="">
        <h3 className="mb-2 text-2xl font-semibold capitalize text-gray-700 dark:text-gray-300">
          Update Missing Book Details
        </h3>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
          Add available covers and Goodreads details, to books with missing
          details.
        </p>
        <button
          type="button"
          onClick={async () => {
            try {
              const db = await initializeDB();
              const booksToFetch = await findBooksMissingCovers(db);
              setMissingCoverCount(booksToFetch.length);
              setCoverFetchResult(null);
              setShowCoverModal(true);
            } catch (error) {
              console.error("Could not check for missing book covers:", error);
              setToastMessage("Error checking for missing book covers");
              setToastType("error");
            }
          }}
          className="rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-2 font-semibold text-cyan-800 transition-colors hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-200 dark:hover:bg-cyan-900/60"
        >
          Update Book Details
        </button>
      </div>

      <div id="deleteLibrary" className="mt-20 mb-8">
        <h3 className="mb-2 text-2xl font-semibold capitalize text-gray-700 dark:text-gray-300">
          Delete Library
        </h3>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 font-semibold text-red-800 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200 dark:hover:bg-red-900/60"
        >
          Delete All Library Data
        </button>
      </div>

      {/* Import Confirmation Modal */}
      {showImportModal && (
        <div
          id="importModal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              {importFormat === "goodreads-csv"
                ? "Import Goodreads Library"
                : "Confirm Import"}
            </h3>
            {duplicateCount > 0 && !overwriteData ? (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {duplicateCount}{" "}
                  {duplicateCount === 1
                    ? `${importFormat === "goodreads-csv" ? "book" : "item"} is already`
                    : `${importFormat === "goodreads-csv" ? "books" : "items"} are already`}{" "}
                  in your library.
                </p>
                <fieldset className="mb-4 text-left text-sm text-gray-700 dark:text-gray-200">
                  <legend className="mb-2 font-semibold">
                    Handle existing{" "}
                    {importFormat === "goodreads-csv" ? "books" : "items"}:
                  </legend>
                  <label className="mb-2 flex items-center gap-2">
                    <input
                      type="radio"
                      name="duplicateStrategy"
                      checked={duplicateStrategy === "skip"}
                      onChange={() => setDuplicateStrategy("skip")}
                    />
                    Skip duplicates
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="duplicateStrategy"
                      checked={duplicateStrategy === "replace"}
                      onChange={() => setDuplicateStrategy("replace")}
                    />
                    Replace existing{" "}
                    {importFormat === "goodreads-csv" ? "details" : "items"}
                  </label>
                </fieldset>
              </>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {importFormat === "goodreads-csv"
                  ? `Import ${csvBooks.length} ${
                      csvBooks.length === 1 ? "book" : "books"
                    } into your library?`
                  : `Are you sure you want to import this file? ${
                      overwriteData
                        ? "This will overwrite your existing library."
                        : "This will merge with existing data."
                    }`}
              </p>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmImport}
                className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 font-semibold text-green-800 transition-colors hover:bg-green-100 dark:border-green-900 dark:bg-green-950/40 dark:text-green-200 dark:hover:bg-green-900/60"
              >
                {importFormat === "goodreads-csv" ? "Import" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showCoverModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
              Update Missing Book Details
            </h3>
            {coverFetchResult ? (
              <p
                className="mb-5 text-sm text-gray-600 dark:text-gray-300"
                role="status"
              >
                {coverFetchResult.error
                  ? "Cover fetching stopped because the library could not be read."
                  : `Updated details for ${coverFetchResult.fetched} ${
                      coverFetchResult.fetched === 1 ? "book" : "books"
                    }${coverFetchResult.failed ? `; details for ${coverFetchResult.failed} could not be found` : ""}.`}
              </p>
            ) : isFetchingCovers ? (
              <div className="mb-5">
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                  Updating book details...
                </p>
                <progress
                  className="w-full h-3 appearance-none overflow-hidden rounded-full bg-rose-100
             [&::-webkit-progress-bar]:bg-rose-100
             [&::-webkit-progress-bar]:rounded-full
             [&::-webkit-progress-value]:bg-rose-600
             [&::-webkit-progress-value]:rounded-full
             [&::-webkit-progress-value]:transition-all
             [&::-moz-progress-bar]:bg-rose-600
             [&::-moz-progress-bar]:rounded-full"
                  value={coverFetchProgress.completed}
                  max={coverFetchProgress.total || 1}
                  aria-label="Cover fetch progress"
                />
                <p className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
                  {coverFetchProgress.completed} / {coverFetchProgress.total}
                </p>
              </div>
            ) : missingCoverCount ? (
              <p className="mb-5 text-sm text-gray-600 dark:text-gray-300">
                Fetch available covers for {missingCoverCount}{" "}
                {missingCoverCount === 1 ? "book" : "books"}? This may take some
                time.
              </p>
            ) : (
              <p className="mb-5 text-sm text-gray-600 dark:text-gray-300">
                All Goodreads books already have covers.
              </p>
            )}
            <div className="flex justify-center gap-2">
              {!isFetchingCovers &&
                !coverFetchResult &&
                missingCoverCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowCoverModal(false)}
                    className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100"
                  >
                    Cancel
                  </button>
                )}
              {!isFetchingCovers &&
                !coverFetchResult &&
                missingCoverCount > 0 && (
                  <button
                    type="button"
                    onClick={handleFetchMissingCovers}
                    className="rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-2 font-semibold text-cyan-800 transition-colors hover:bg-cyan-100 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-200 dark:hover:bg-cyan-900/60"
                  >
                    Update Details
                  </button>
                )}
              {!isFetchingCovers &&
                (coverFetchResult || !missingCoverCount) && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowCoverModal(false);
                      if (coverFetchResult && coverFetchResult.fetched) {
                        window.location.reload();
                      }
                    }}
                    className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100"
                  >
                    Done
                  </button>
                )}
            </div>
          </div>
        </div>
      )}

      {showDuplicateModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
              Remove Duplicate Books
            </h3>
            <p className="mb-5 text-sm text-gray-600 dark:text-gray-300">
              {duplicateBooksCount} extra{" "}
              {duplicateBooksCount === 1 ? "copy was" : "copies were"} found.
              One copy per Goodreads book will be kept, preserving any rating
              and private notes.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDuplicateModal(false)}
                className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRemoveDuplicateBooks}
                disabled={isLoading}
                className="rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-2 font-semibold text-yellow-900 transition-colors hover:bg-yellow-100 disabled:opacity-60 dark:border-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-200 dark:hover:bg-yellow-900/60"
              >
                {isLoading ? "Removing..." : "Remove Duplicates"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          id="deleteModal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Are you sure you want to{" "}
              <span className="font-bold">delete all library data</span>? This
              action cannot be undone.
            </p>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAll}
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 font-semibold text-red-800 transition-colors hover:bg-red-100 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200 dark:hover:bg-red-900/60"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/*    {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <SmallLoader other={true} />
        </div>
      )} */}

      {toastMessage && <Toast message={toastMessage} type={toastType} />}
    </div>
  );
};

export default LibrarySettings;
