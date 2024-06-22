import React from "react";

const Features = () => {
  return (
    <div id="features" className="text-gray-900 dark:text-white text-center">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h2 className="text-3xl font-bold sm:text-4xl">Features</h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 capitalize">
            The features that come with using BiblioReads.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="block rounded-xl border-2 border-gray-600 dark:border-gray-800 p-8 shadow-xl transition hover:border-rose-500 hover:shadow-rose-500/20">
            <div className="w-24 mx-auto ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                className="fill-gray-900 dark:fill-gray-200"
              >
                <path
                  d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.319 1.83c.966.943 1.803 2.014 2.474 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.297 0-2.553-.313-3.729-.849l1.247-1.096c.795.285 1.626.445 2.482.445 3.516 0 6.576-2.622 8.413-5.5-.595-.932-1.318-1.838-2.145-2.637zm-3.434 3.019c.03.197.046.399.046.605 0 2.208-1.792 4-4 4-.384 0-.756-.054-1.107-.156l1.58-1.389c.895-.171 1.621-.821 1.901-1.671zm-.058-3.818c-1.197-.67-2.512-1.077-3.898-1.077-3.465 0-6.533 2.632-8.404 5.5.853 1.308 1.955 2.567 3.231 3.549l1.728-1.519c-.351-.595-.553-1.289-.553-2.03 0-2.208 1.792-4 4-4 .925 0 1.777.315 2.455.843zm-2.6 2.285c-.378-.23-.822-.362-1.296-.362-1.38 0-2.5 1.12-2.5 2.5 0 .36.076.701.213 1.011z"
                  fillRule="nonzero"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-xl uppercase font-bold text-gray-900 dark:text-white">
              No ADS & Tracking
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Simple. We don&apos;t show ads and no personal information is ever
              collected.
            </p>
          </div>

          <div className="block rounded-xl border-2 border-gray-600 dark:border-gray-800 p-8 shadow-xl transition hover:border-rose-500 hover:shadow-rose-500/20">
            <div className="w-24 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="64"
                viewBox="0 0 24 24"
                className="fill-gray-900 dark:fill-gray-200"
              >
                <path d="M8 10v-5l8 7-8 7v-5h-8v-4h8zm2-8v2h12v16h-12v2h14v-20h-14z" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl uppercase font-bold text-gray-900 dark:text-white">
              No sign up required
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Use BiblioReads without signing up for an account and you never
              have to deal with those annoying sign up popups.
            </p>
          </div>

          <div className="block rounded-xl border-2 border-gray-600 dark:border-gray-800 p-8 shadow-xl transition hover:border-rose-500 hover:shadow-rose-500/20">
            <div className="w-24 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="64"
                viewBox="0 0 24 24"
                className="fill-gray-900 dark:fill-gray-200"
              >
                <path d="M4.508 16.557l1.406-1.9c-.289-1.201-.005-2.543.869-4.008.341-.572.753-1.128 1.211-1.668.277.649.857 1.694 1.131 2.081-.036-.519-.267-2.085.002-3.286 1.036-.995 2.232-1.903 3.49-2.693.094.599.311 1.812.449 2.135.06-.433.336-1.993.77-2.851 1.875-1.032 3.814-1.787 5.516-2.141-.459 1.311-1.147 2.976-2.021 4.713-.85.59-2.346 1.092-2.908 1.189.469.132 1.544.22 2.152.247-.193.348-.392.696-.599 1.042-.526.879-1.069 1.664-1.617 2.39-.943.464-2.371.845-2.937.875.362.19 1.237.413 1.777.54-1.717 1.904-3.436 3.015-4.907 3.179 1.232-2.189 2.239-3.938 2.642-4.505-4.444 3.412-7.182 8.675-8.934 12.104l2.505-.789c.421-.77 1.727-2.952 2.772-4.829.268.041.535.06.801.06 7.398.001 13.598-15.213 13.922-18.442-8.141 0-21.536 8.975-17.492 16.557z" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl uppercase font-bold text-gray-900 dark:text-white">
              Lightweight
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View your results without any of the useless bloat.
            </p>
          </div>

          <div className="block rounded-xl border-2 border-gray-600 dark:border-gray-800 p-8 shadow-xl transition hover:border-rose-500 hover:shadow-rose-500/20">
            <div className="w-24 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="64"
                viewBox="0 0 24 24"
                className="fill-gray-900 dark:fill-gray-200"
              >
                <path d="M21.3333 14.6667V21.3334H2.66667V14.6667H0V21.3334C0 22.0407 0.280952 22.7189 0.781049 23.219C1.28115 23.7191 1.95942 24.0001 2.66667 24.0001H21.3333C22.0406 24.0001 22.7189 23.7191 23.219 23.219C23.719 22.7189 24 22.0407 24 21.3334V14.6667H21.3333Z" />
                <path d="M11.9999 18.6667L18.6666 10.6667H13.3333V0H10.6666V10.6667H5.33325L11.9999 18.6667Z" />
              </svg>
            </div>
            <h2 className="mt-8 text-xl uppercase font-bold text-gray-900 dark:text-white">
              PWA Support
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Installable as a progressive web application (PWA) on mobile for a
              native app experience.
            </p>
          </div>

          <div className="block rounded-xl border-2 border-gray-600 dark:border-gray-800 p-8 shadow-xl transition hover:border-rose-500 hover:shadow-rose-500/20">
            <div className="w-24 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="64"
                viewBox="0 0 24 24"
                className="fill-gray-900 dark:fill-gray-200"
              >
                <path d="M24 21v-6h-18v6h18zm-3-4c.553 0 1 .448 1 1s-.447 1-1 1c-.552 0-1-.448-1-1s.448-1 1-1zm-7.806 0h1.275l-.864 2h-1.274l.863-2zm-2.141 0h1.275l-.863 2h-1.275l.863-2zm-2.19 0h1.275l-.863 2h-1.275l.863-2zm-4.863.941c-2.253-.29-4-2.194-4-4.524 0-2.252 1.626-4.121 3.767-4.506.177-3.294 2.895-5.911 6.233-5.911s6.056 2.617 6.233 5.911c2.005.361 3.541 2.029 3.729 4.089h-1.991c-.279-2.105-2.674-2.333-3.65-2.401.117-1.958-.555-5.599-4.321-5.599-4.438 0-4.359 4.75-4.321 5.599-.945-.037-3.679.341-3.679 2.818 0 1.223.856 2.245 2 2.511v2.013z" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl uppercase font-bold text-gray-900 dark:text-white">
              All requests are proxied
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Every request you make on BiblioReads is proxied, your requests
              are never directly made to Goodreads.
            </p>
          </div>

          <div className="block rounded-xl border-2 border-gray-600 dark:border-gray-800 p-8 shadow-xl transition hover:border-rose-500 hover:shadow-rose-500/20">
            <div className="w-24 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="64"
                viewBox="0 0 24 24"
                className="fill-gray-900 dark:fill-gray-200"
              >
                <path d="M20 2c0-1.105-.896-2-2-2h-12c-1.105 0-2 .896-2 2v20c0 1.104.895 2 2 2h12c1.104 0 2-.896 2-2v-20zm-9.501 0h3.001c.276 0 .5.224.5.5s-.224.5-.5.5h-3.001c-.275 0-.499-.224-.499-.5s.224-.5.499-.5zm1.501 20c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm6-3h-12v-14.024h12v14.024z" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl uppercase font-bold text-gray-900 dark:text-white">
              Modern Design
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Responsive design with built-in light & dark mode support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
