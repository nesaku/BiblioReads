import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "./global-components/Footer";
import ResultData from "../components/resultpage-components/ResultData";

const FormQuery = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  {
    /* When the button is clicked/submitted push input value to url*/
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/${inputValue.replace("https://www.goodreads.com", "")}`);
  };

  return (
    <div className="dark:bg-gradientedge">
      <main className="flex justify-center items-center align-middle">
        <div className="flex flex-col xl:flex-row justify-center items-center text-center h-[80vh] w-full">
          <div className="mr-0 xl:mr-40">
            <h1 className="font-extrabold text-transparent text-6xl sm:text-8xl bg-clip-text bg-gradient-to-br from-pink-400 to-rose-600">
              <Link href="/">BiblioReads</Link>
            </h1>
            <h2 className="my-10 px-2 text-xl sm:text-4xl text-transparent font-bold text-black dark:text-gray-200">
              Get Info About A GoodReads Book:
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex flex-col">
                <h3 className="text-xl sm:text-2xl text-black dark:text-gray-200 font-semibold mb-10">
                  Enter A GoodReads Book URL: &nbsp;
                </h3>
                <input
                  className="rounded-md mx-10 py-3 px-5 text-left text-black text-sm bg-slate-200 border-4 border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  type="url"
                  required
                />
              </div>
              <button className="mt-10 my-6 ont-semibold text-md text-gray-900 dark:text-white bg-rose-500 ring ring-rose-600 ring-offset-2 ring-offset-rose-100 py-4 px-10 rounded-xl shadow-lg shadow-rose-500 hover:shadow-xl hover:bg-rose-600 transition duration-300 delay-40 hover:delay-40">
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default FormQuery;
