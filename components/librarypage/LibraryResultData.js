import React, { useEffect, useState } from "react";
import { openDB } from "idb";
import SmallLoader from "../global/SmallLoader";
import BookList from "./BookList";
import AuthorList from "./AuthorList";
import EmptyLibrary from "./EmptyLibrary";

const LibraryResultData = ({ currentTab }) => {
  const [savedBooks, setSavedBooks] = useState({});
  const [savedAuthors, setSavedAuthors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      const db = await openDB("library", 2, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("books")) {
            db.createObjectStore("books");
          }
        },
      });
      const books = await db.getAll("books");
      setSavedBooks(books);
      setIsLoading(false);
    };

    getBooks();
  }, []);

  useEffect(() => {
    const getAuthors = async () => {
      const db = await openDB("library", 2, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("authors")) {
            db.createObjectStore("authors");
          }
        },
      });
      const authors = await db.getAll("authors");
      setSavedAuthors(authors);
      setIsLoading(false);
    };

    getAuthors();
  }, []);

  const currentTabs = {
    books: { component: BookList, data: savedBooks },
    authors: { component: AuthorList, data: savedAuthors },
    // quotes: { component: QuotesList, data: savedQuotes },
  };
  return (<>
    {isLoading ? (
      <div className="pt-20">
        <SmallLoader other={true} />
      </div>
    ) : (
      (<>
        {Object.entries(currentTabs).map(
          ([tabKey, { component: Component, data }], i) =>
            currentTab === tabKey && (
              <div key={i}>
                {Object.keys(data).length === 0 && (
                  <EmptyLibrary currentTab={currentTab} />
                )}
                <Component libraryData={data} />
              </div>
            )
        )}
      </>)
      /*  <>
        {currentTab === "books" && (
          <>
            {Object.keys(savedBooks).length === 0 && (
              <EmptyLibrary currentTab={currentTab} />
            )}
            <BookList libraryData={savedBooks} />
          </>
        )}
        {currentTab === "authors" && (
          <>
            {Object.keys(savedAuthors).length === 0 && (
              <EmptyLibrary currentTab={currentTab} />
            )}
            <BookList libraryData={savedAuthors} />
          </>
        )}
      </> */
    )}
  </>);
};

export default LibraryResultData;
