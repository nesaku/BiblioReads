import React from "react";

const LibraryTab = (props) => {
  return (
    <li className="w-18 sm:w-full max-w-xs ">
      <button
        onClick={() => props.setTab(props.name)}
        className={`inline-block w-full p-4 border-2 font-semibold text-md hover:shadow-lg  transition duration-300 delay-40 hover:delay-40 capitalize 
        ${
          props.name === props.currentTab
            ? "text-slate-800 dark:text-slate-200 bg-rose-300 border-rose-600 dark:bg-rose-900 dark:border-rose-600"
            : "text-slate-700 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-200 bg-rose-50 hover:bg-rose-300 dark:border-slate-700 border-slate-300  dark:bg-slate-800 hover:dark:bg-rose-900  dark:hover:border-rose-600"
        } ${props.startTab && "rounded-s-lg"} ${
          props.endTab && "rounded-e-lg"
        }`}
      >
        {props.name}
      </button>
    </li>
  );
};

export default LibraryTab;
