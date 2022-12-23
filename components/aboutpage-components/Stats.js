import React from "react";

const Stats = () => {
  return (
    <div>
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
            (Tested on Chrome v106; without scroll; no throttling)
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="flex flex-col rounded-lg border-2 border-gray-500 px-4 py-8 text-center dark:border-gray-800">
              <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                Requests
              </dt>

              <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                13
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border-2 border-gray-500 px-4 py-8 text-center dark:border-gray-800">
              <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                Data Transferred
              </dt>

              <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                179 kB
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border-2 border-gray-500 px-4 py-8 text-center dark:border-gray-800">
              <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                First Contentful Paint (FCP)
              </dt>
              <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                224 ms
              </dd>
            </div>
            <div className="flex flex-col rounded-lg border-2 border-gray-500 px-4 py-8 text-center dark:border-gray-800">
              <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                Final Load Time
              </dt>
              <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                10.62 s
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
                    +180
                  </dd>
                </div>

                <div className="flex flex-col rounded-lg border-2 border-gray-500 px-4 py-8 text-center dark:border-gray-800">
                  <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                    Data Transferred
                  </dt>

                  <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">
                    +24 kB
                  </dd>
                </div>

                <div className="flex flex-col rounded-lg border-2 border-gray-500 px-4 py-8 text-center dark:border-gray-800">
                  <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                    First Contentful Paint (FCP)
                  </dt>

                  <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">
                    1.94 s
                  </dd>
                </div>
                <div className="flex flex-col rounded-lg border-2 border-gray-500 px-4 py-8 text-center dark:border-gray-800">
                  <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                    Final Load Time
                  </dt>
                  <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">
                    16.68 s
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
