import React from "react";

const AboutHero = () => {
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:my-40">
        <div className="mx-auto max-w-3xl text-center ">
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
        </div>
      </div>
    </>
  );
};

export default AboutHero;
