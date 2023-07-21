import React from "react";

const SmallLoader = ({ height }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-[${height}vh]`}
    >
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default SmallLoader;
