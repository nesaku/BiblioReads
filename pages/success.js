import React from "react";
import Meta from "../components/global/Meta";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

const Success = () => {
  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge">
      <Meta title={"Success"} />
      <Header />
      <div className="grid place-items-center w-full m-auto min-h-screen">
        <div className="shadow-lg rounded-2xl px-6 py-8 backdrop-blur-lg bg-white/40 dark:bg-gray-800">
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
              <h1 className="text-gray-700 dark:text-gray-100 text-lg mt-4">
                <p>Your Response Was Sent. </p>
                <p>Thank you.</p>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
