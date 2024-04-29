import React, { useState } from "react";
import Meta from "../components/global/Meta";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import LibraryResultData from "../components/librarypage/LibraryResultData";
import LibraryTab from "../components/librarypage/LibraryTab";

const Library = () => {
  const [selectedTab, setSelectedTab] = useState("books");

  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 h-screen">
      <Meta title="Library" />
      <Header />
      <div id="libraryResults" className="min-h-[70vh]">
        <div className="flex flex-col justify-center items-center dark:text-gray-100/80 text-center ">
          <h1 className="font-bold text-5xl pt-4 my-2 underline decoration-rose-600">
            Your Library
          </h1>
        </div>

        <ul className="flex justify-center w-full pt-8 px-2 sm:p-10 text-sm font-medium text-center text-gray-500 rounded-lg dark:divide-gray-700 dark:text-gray-400">
          <LibraryTab
            name="books"
            setTab={() => setSelectedTab("books")}
            currentTab={selectedTab}
            startTab
          />
          {
            <LibraryTab
              name="authors"
              setTab={() => setSelectedTab("authors")}
              currentTab={selectedTab}
              endTab
            /> /*
          <LibraryTab
            name="quotes"
            setTab={setSelectedTab}
            currentTab={selectedTab}
           
          />
                  <LibraryTab
            name="options"
            setTab={setSelectedTab}
            currentTab={selectedTab}
            endTab
          /> */
          }
        </ul>

        <LibraryResultData currentTab={selectedTab} />
      </div>
      <Footer />
    </div>
  );
};

export default Library;
