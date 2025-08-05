import React, { useEffect, useState } from "react";
import { initializeDB } from "@/db/db";
import SmallLoader from "../global/SmallLoader";
import BookList from "./BookList";
import AuthorList from "./AuthorList";
import EmptyLibrary from "./EmptyLibrary";
import QuoteList from "./QuoteList";
import LibrarySettings from "./LibrarySettings";

const LibraryResultData = ({ currentTab }) => {
  const [savedBooks, setSavedBooks] = useState([]);
  const [savedAuthors, setSavedAuthors] = useState([]);
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [triggerAlert, setTriggerAlert] = useState(false);

  useEffect(() => {
    const fetchLibraryData = async () => {
      setIsLoading(true);
      try {
        const db = await initializeDB();

        const [books, authors, quotes] = await Promise.all([
          db.getAll("books"),
          db.getAll("authors"),
          db.getAll("quotes"),
        ]);

        setSavedBooks(books);
        setSavedAuthors(authors);
        setSavedQuotes(quotes);
      } catch (error) {
        console.error("Error fetching library data:", error);
        setTriggerAlert(true);
        setSavedBooks([]);
        setSavedAuthors([]);
        setSavedQuotes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibraryData();
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
                  {currentTab !== "settings" && data.length === 0 && (
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
