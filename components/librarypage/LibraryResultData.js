import React, { useEffect, useState } from "react";
import { openDB } from "idb";
import SmallLoader from "../global/SmallLoader";
import BookList from "./BookList";
import AuthorList from "./AuthorList";
import EmptyLibrary from "./EmptyLibrary";
import QuoteList from "./QuoteList";
import LibrarySettings from "./LibrarySettings";

const LibraryResultData = ({ currentTab }) => {
  const [savedBooks, setSavedBooks] = useState({});
  const [savedAuthors, setSavedAuthors] = useState({});
  const [savedQuotes, setSavedQuotes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [triggerAlert, setTriggerAlert] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      setIsLoading(true);
      try {
        const db = await openDB("library", 3, {
          upgrade(db) {
            if (!db.objectStoreNames.contains("books")) {
              db.createObjectStore("books");
            }
          },
        });
        const books = await db.getAll("books");
        setSavedBooks(books);
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting books:", error);
        if (error.name === "NotFoundError") {
          setTriggerAlert(true);
          setIsLoading(false);
          setSavedBooks([]);
        }
      }
    };

    getBooks();
  }, []);

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const db = await openDB("library", 3, {
          upgrade(db) {
            if (!db.objectStoreNames.contains("authors")) {
              db.createObjectStore("authors");
            }
          },
        });
        const authors = await db.getAll("authors");
        setSavedAuthors(authors);
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting authors:", error);
        if (error.name === "NotFoundError") {
          setTriggerAlert(true);
          setIsLoading(false);
          setSavedAuthors([]);
        }
      }
    };

    getAuthors();
  }, []);

  useEffect(() => {
    const getQuotes = async () => {
      setIsLoading(true);
      try {
        const db = await openDB("library", 3, {
          upgrade(db) {
            if (!db.objectStoreNames.contains("quotes")) {
              db.createObjectStore("quotes");
            }
          },
        });
        const quotes = await db.getAll("quotes");
        setSavedQuotes(quotes);
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting quotes:", error);
        if (error.name === "NotFoundError") {
          setTriggerAlert(true);
          setIsLoading(false);
          setSavedQuotes([]);
        }
      }
    };

    getQuotes();
  }, []);

  const currentTabs = {
    books: { component: BookList, data: savedBooks },
    authors: { component: AuthorList, data: savedAuthors },
    quotes: { component: QuoteList, data: savedQuotes },
    settings: { component: LibrarySettings, data: {} },
  };
  return (
    <>
      {triggerAlert && (
        <div className="mb-4 text-yellow-500 text-center">
          <b>Warning:</b> Library features may be unavailable in private
          browsing/incognito mode.
        </div>
      )}

      {isLoading ? (
        <div className="pt-32">
          <SmallLoader other={true} />
        </div>
      ) : (
        <>
          {Object.entries(currentTabs).map(
            ([tabKey, { component: Component, data }], i) =>
              currentTab === tabKey && (
                <div key={i}>
                  {currentTab != "settings" &&
                    Object.keys(data).length === 0 && (
                      <EmptyLibrary currentTab={currentTab} />
                    )}
                  <Component libraryData={data} />
                </div>
              )
          )}
        </>
      )}
    </>
  );
};

export default LibraryResultData;
