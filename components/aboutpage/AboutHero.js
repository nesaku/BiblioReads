import Link from "next/link";
import React from "react";

const AboutHero = () => {
  return (
    (<div
      id="hero"
      className="mx-auto max-w-screen-xl px-4 pt-32 pb-24 lg:flex lg:mt-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-7xl capitalize">
          A{" "}
          <span className="bg-green-600 hover:bg-green-500 text-transparent bg-clip-text underline decoration-red-600">
            free{" "}
          </span>
          and{" "}
          <span className="bg-orange-600 hover:bg-orange-500 text-transparent bg-clip-text underline decoration-red-600">
            open
          </span>{" "}
          <span className="bg-orange-600 hover:bg-orange-500 text-transparent bg-clip-text underline decoration-red-600">
            source
          </span>{" "}
          alternative Goodreads front-end focused on{" "}
          <span className="bg-indigo-600 hover:bg-indigo-500 text-transparent bg-clip-text underline decoration-red-600">
            privacy
          </span>
          .
        </h1>
        <Link href="/search" legacyBehavior>
          <button className="mt-20 font-semibold text-md lg:text-lg text-gray-900 dark:text-gray-100/90 bg-rose-500 dark:bg-[#a22045] ring ring-rose-600 dark:ring-rose-700 ring-offset-2 ring-offset-rose-100 py-4 px-6 rounded-xl shadow-lg shadow-rose-500 hover:shadow-xl hover:bg-rose-600 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40">
            Search Now
          </button>
        </Link>
      </div>
    </div>)
  );
};

export default AboutHero;
