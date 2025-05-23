import React from "react";
import Meta from "./Meta";

const Loader = (props) => {
  return (
    <>
      <Meta title="Loading..." />
      <div
        className="flex flex-col items-center justify-center min-h-screen p-5 bg-rose-100 dark:bg-gray-900 min-w-screen"
        aria-live="polite"
      >
        <div className="flex space-x-2 animate-pulse" aria-hidden="true">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
        <div className="mt-10">
          <h1 className="animate-pulse text-lg font-md text-gray-900 dark:text-gray-100">
            {props.other ? "Getting Information..." : "Loading Your Book..."}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Loader;
