import React from "react";

const UnsupportedRoute = () => {
  return (
    <div className="flex justify-center items-center text-center my-[16vh]">
      <div className="flex flex-col text-gray-800 dark:text-gray-100 bg-white bg-opacity-60 dark:bg-slate-800 dark:bg-opacity-60 py-6 m-4 px-4 sm:px-12 my-[10vh] rounded-2xl max-w-lg items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="72px"
          height="72px"
          className="fill-gray-900 dark:fill-gray-200"
        >
          <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,21h-2v-7h2V21z M15,11.5 c-0.828,0-1.5-0.672-1.5-1.5s0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5S15.828,11.5,15,11.5z" />
        </svg>
        <h1 className="text-2xl font-bold my-4">
          This Route Has Not Been Implemented Yet
        </h1>
        <div>
          <p>
            If you&apos;d like to see this route implemented. Please show your
            interest by creating an issue on{" "}
            <a
              href="https://github.com/nesaku/BiblioReads/issues"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="underline hover:text-blue-600"
            >
              GitHub
            </a>{" "}
            or{" "}
            <a
              href="https://codeberg.org/nesaku/BiblioReads/issues"
              target="_blank"
              rel="noreferrer"
              aria-label="Codeberg"
              className="underline hover:text-blue-600"
            >
              Codeberg
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnsupportedRoute;
