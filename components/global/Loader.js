import React from "react";

const Loader = (props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-rose-100 dark:bg-gray-900 min-w-screen">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      </div>
      <div className="mt-10">
        <h1 className="animate-pulse text-lg font-md text-gray-900 dark:text-gray-100">
          {props.other ? "Getting Information..." : "Getting Your Book..."}
        </h1>
      </div>
    </div>
  );
};

export default Loader;
