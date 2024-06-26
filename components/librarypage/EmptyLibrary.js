import React from "react";

const EmptyLibrary = ({ currentTab }) => {
  return (
    <div
      id="emptyLibrary"
      className="flex flex-col justify-center items-center text-center"
    >
      <h3 className="text-2xl font-semibold pt-10 capitalize">
        No {currentTab} Saved
      </h3>
      <div className="flex items-center text-lg text-center pt-2">
        Add {currentTab} to your library by clicking the
        <svg
          viewBox="0 0 257 445"
          className="p-2 w-10 text-slate-500 dark:text-slate-300 "
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M30.0326 -1.20215e-05C13.446 -1.20215e-05 0 14.4411 0 32.254V444.073L128.5 323.718L257 444.073V32.254C257 14.4411 243.554 -1.20215e-05 226.969 -1.20215e-05H30.0326Z"></path>
        </svg>
        icon.
      </div>
    </div>
  );
};

export default EmptyLibrary;
