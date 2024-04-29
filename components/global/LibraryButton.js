import React from "react";

const LibraryButton = ({ isSaved, setIsSaved, setIsClicked, fallback }) => {
  return (
    <div
      id={fallback ? "addToLibraryFallback" : "addToLibrary"}
      className="flex items-end justify-end font-mono text-sm font-bold -mb-24"
    >
      <button
        onClick={() => {
          !isSaved ? setIsSaved(true) : setIsSaved(false);
          setIsClicked(true);
        }}
        className="w-14 z-10 h-24 flex items-center justify-center bg-[#881133] text-2xl rounded-b-md shadow-lg border-2 border-slate-800/60"
        aria-label="add to library"
      >
        <svg
          viewBox="0 0 257 445"
          className={`w-[50%]  ${
            !isSaved ? "text-gray-50" : "text-[#ed8a19]"
          } hover:text-[#ed8a19] border-black`}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M30.0326 -1.20215e-05C13.446 -1.20215e-05 0 14.4411 0 32.254V444.073L128.5 323.718L257 444.073V32.254C257 14.4411 243.554 -1.20215e-05 226.969 -1.20215e-05H30.0326Z" />
        </svg>
      </button>
    </div>
  );
};

export default LibraryButton;
