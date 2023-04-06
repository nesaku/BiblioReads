import React from "react";

const Stats = () => {
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Speed
          </h2>

          <p className="mt-4 text-gray-500 dark:text-gray-400 sm:text-xl">
            The{" "}
            <a
              href="https://www.goodreads.com/book/show/2767052-the-hunger-games"
              className="underline"
            >
              Hunger Games Book Page
            </a>{" "}
            (Tested on Chrome v108, without scroll, no throttling, cache
            disabled)
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="flex flex-col rounded-lg border-2 border-gray-500 px-4 py-8 text-center dark:border-gray-800">
              <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                Requests
              </dt>

              <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                45
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border-2 border-gray-500 px-4 py-8 text-center dark:border-gray-800">
              <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                Data Transferred
              </dt>

              <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                137 kB
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border-2 border-gray-500 px-4 py-8 text-center dark:border-gray-800">
              <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                First Contentful Paint (FCP)
              </dt>
              <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                1.0 s
              </dd>
            </div>
            <div className="flex flex-col rounded-lg border-2 border-gray-500 px-4 py-8 text-center dark:border-gray-800">
              <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                Final Load Time
              </dt>
              <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                3.27 s
              </dd>
            </div>
          </dl>
        </div>
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-xl uppercase font-bold text-gray-900 dark:text-white sm:text-2xl">
              VS
            </h2>
            <div className="mt-8 sm:mt-12">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="flex flex-col rounded-lg border-2 border-gray-500 px-4 py-8 text-center dark:border-gray-800">
                  <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                    Requests
                  </dt>

                  <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">
                    +190
                  </dd>
                </div>

                <div className="flex flex-col rounded-lg border-2 border-gray-500 px-4 py-8 text-center dark:border-gray-800">
                  <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                    Data Transferred
                  </dt>

                  <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">
                    +24.8 MB
                  </dd>
                </div>

                <div className="flex flex-col rounded-lg border-2 border-gray-500 px-4 py-8 text-center dark:border-gray-800">
                  <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                    First Contentful Paint (FCP)
                  </dt>

                  <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">
                    8.2 s
                  </dd>
                </div>
                <div className="flex flex-col rounded-lg border-2 border-gray-500 px-4 py-8 text-center dark:border-gray-800">
                  <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                    Final Load Time
                  </dt>
                  <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">
                    9.26 s
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
