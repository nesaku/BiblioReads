import Link from "next/link";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

export default function Custom404() {
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
              <path d="M924.7,253.6C879.8,178.8,819.9,118.9,746.4,74C674.2,30.4,592.6,8.6,500,8.6c-92.6,0-174.2,21.8-246.4,65.3c-74.9,44.9-134.7,104.8-178.3,179.7C31.8,325.8,10,407.4,10,500s21.8,174.2,65.3,246.4c44.9,74.9,104.8,134.7,178.3,179.7c72.1,43.6,153.8,65.3,246.4,65.3c92.6,0,174.2-21.8,246.4-65.3c74.9-44.9,133.4-104.8,178.3-179.7C968.2,674.2,990,592.6,990,500S966.9,325.8,924.7,253.6z M730,674.2L674.2,730c-9.5,9.5-19.1,13.6-28.6,13.6c-13.6,0-23.1-4.1-28.6-13.6L500,615.7L384.3,730c-5.4,9.5-16.3,13.6-28.6,13.6c-10.9,0-20.4-4.1-28.6-13.6l-55.8-55.8c-9.5-9.5-13.6-19.1-13.6-29.9c0-13.6,4.1-23.1,13.6-28.6L385.7,500L271.4,382.9c-9.5-5.4-13.6-15-13.6-28.6c0-10.9,4.1-20.4,13.6-29.9l55.8-55.8c9.5-8.2,19.1-13.6,28.6-13.6c13.6,0,23.1,4.1,28.6,13.6L500,383l117.1-114.3c5.4-8.2,15-13.6,28.6-13.6c10.9,0,20.4,4.1,28.6,13.6l55.8,55.8c8.2,9.5,13.6,19.1,13.6,29.9c0,13.6-4.1,23.1-13.6,28.6L615.7,500L730,615.7c8.2,5.4,13.6,16.3,13.6,28.6C743.6,655.2,738.2,666,730,674.2z" />
            </g>
          </svg>
          <h1 className="text-5xl font-extrabold my-4">Error 404</h1>
          <div className="my-2">
            <h3 className="text-2xl text-black font-bold dark:text-gray-100 mt-4 mb-2">
              Page Not Found
            </h3>
            <h3 className="mt-8 text-md text-black font-semibold dark:text-gray-100">
              If you think you went to the right page. Please report this by
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
