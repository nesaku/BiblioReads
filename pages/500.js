import Link from "next/link";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

export default function Custom500() {
  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen">
      <Header />
      <div className="flex justify-center items-center text-center my-[16vh]">
        <div className="flex flex-col text-gray-800 dark:text-gray-100 bg-white bg-opacity-60 dark:bg-slate-800 dark:bg-opacity-60 py-6 m-4 px-4 sm:px-12 my-[10vh] rounded-2xl max-w-lg items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72px"
            height="72px"
            viewBox="0 0 1000 1000"
            className="fill-gray-900 dark:fill-gray-200 my-6"
          >
            <g>
              <g>
                <g>
                  <g>
                    <path d="M982.8,871.5L555.3,70.5c-10.7-20-31.5-32.6-54.3-32.6H501c-22.7,0-43.6,12.5-54.3,32.5L17.3,871.4c-10.2,19.2-9.7,42.3,1.4,60.8c11.2,18.5,31.2,29.9,52.9,29.9h856.8c21.7,0,41.7-11.3,52.9-29.9C992.4,913.6,992.9,890.6,982.8,871.5z M501,838.9c-34,0-61.6-27.6-61.6-61.6c0-34,27.6-61.6,61.6-61.6c33.9,0,61.6,27.6,61.6,61.6C562.6,811.3,535,838.9,501,838.9z M562.6,593.4c0,34.1-27.7,61.6-61.6,61.6c-34,0-61.6-27.5-61.6-61.6V347c0-34,27.6-61.6,61.6-61.6c33.9,0,61.6,27.6,61.6,61.6V593.4z" />
                  </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </g>
          </svg>
          <h1 className="text-5xl font-extrabold my-4">Error 500</h1>
          <div className="my-4">
            <h3 className="text-xl text-black font-bold dark:text-gray-100 mt-4 mb-2">
              The server has encountered an error. Please try again later.
            </h3>
            <h3 className="mt-8 text-md text-black font-semibold dark:text-gray-100">
              If you&apos;re repeatedly get this error. Please report this by
              creating an issue on{" "}
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
            </h3>
          </div>
          <div className="flex justify-center my-8">
            <Link href="/">
              <a className="font-semibold text-md text-gray-900 dark:text-gray-100/90 bg-rose-500 dark:bg-[#a22045] ring ring-rose-600 dark:ring-rose-700 ring-offset-2 ring-offset-rose-100 py-5 px-6 rounded-xl shadow-lg shadow-rose-500 hover:shadow-xl hover:bg-rose-600 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40">
                Go Home
              </a>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
