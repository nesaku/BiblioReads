/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import CoverImage from "../global/CoverImage";

const NomineeGrid = ({ nominees }) => {
  return (
    <>
      <div
        id="nomineeHeading"
        className="flex flex-col justify-center items-center dark:text-gray-100/80 text-center"
      >
        <h2 className="font-bold text-4xl pt-4 mt-2 underline decoration-rose-600 capitalize">
          Nominees
        </h2>
      </div>
      <div
        id="nomineeGrid"
        className="max-w-8xl flex flex-wrap justify-center gap-8 pt-10"
      >
        {nominees.map((data, i) => (
          <div id="nomineeCard" key={i}>
            <a href={data.url}>
              <div className="h-[250px] w-[300px] flex flex-col justify-center items-center text-left p-6 sm:p-6 bg-white/40 dark:bg-slate-800 rounded-2xl hover:ring hover:ring-rose-600 hover:bg-rose-300 dark:hover:bg-rose-900 transition duration-300">
                <div className="relative group m-4">
                  <CoverImage
                    src={data.cover}
                    alt={`${data.title} book cover`}
                  />
                  <span
                    id="tooltip"
                    className="absolute left-1/2 top-full -translate-x-1/2 mt-2 hidden group-hover:block 
                   bg-white/90 dark:bg-slate-800  text-sm px-2 py-1 rounded-md shadow-lg 
                   whitespace-nowrap border-2 border-slate-300 dark:border-slate-700"
                  >
                    {data.title}
                  </span>
                </div>
                {data.numberOfVotes && (
                  <div>
                    <h3 className="text-center text-gray-300">
                      {data.numberOfVotes}
                    </h3>
                  </div>
                )}
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default NomineeGrid;
