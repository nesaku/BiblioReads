import React from "react";
import Link from "next/link";
import Meta from "../components/global-components/Meta";
import Header from "../components/global-components/Header";
import Footer from "../components/global-components/Footer";

const success = () => {
  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge">
      <Meta title={"Success"} />
      <Header />
      <div className="grid place-items-center w-full m-auto h-screen ">
        <div className="shadow-lg rounded-2xl p-4 backdrop-blur-lg bg-white/40 dark:bg-gray-800">
          <div className="w-full h-full text-center">
            <div className="flex h-full flex-col justify-between">
              <svg
                className="h-12 w-12 mt-4 m-auto text-green-500"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <h1 className="text-gray-700 dark:text-gray-100 text-lg mt-4 py-2 px-6">
                Your Response Was Sent. Thank you.
              </h1>
              <div className="flex items-center justify-center gap-4 w-full mt-8">
                <Link href="/">
                  <button
                    type="button"
                    className="py-4 px-6  bg-rose-500 hover:bg-rose-700 focus:ring-rose-500 focus:ring-offset-rose-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Go Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default success;
