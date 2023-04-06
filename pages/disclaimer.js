import React from "react";
import Meta from "../components/global/Meta";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

const Disclaimer = () => {
  return (
    <>
      <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage min-h-full m-0 p-0">
        <Meta title={"Disclaimer"} />
        <Header />
        <div className="flex justify-center items-center text-center">
          <div className="flex flex-col text-gray-800 dark:text-gray-100 bg-white bg-opacity-60 dark:bg-slate-800 dark:bg-opacity-60 py-6 m-4 px-4 sm:px-12 my-[10vh] rounded-2xl max-w-lg items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="72px"
              height="72px"
              className="fill-gray-900 dark:fill-gray-200"
            >
              <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,21h-2v-7h2V21z M15,11.5 c-0.828,0-1.5-0.672-1.5-1.5s0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5S15.828,11.5,15,11.5z" />
            </svg>
            <h1 className="text-2xl font-bold my-4">Disclaimer:</h1>
            <div>
              <p>
                All the information provided on this website is provided on an
                “as is” and “as available” basis and you agree that you use such
                information entirely at your own risk. BiblioReads gives no
                warranty and accepts no responsibility or liability for the
                accuracy or the completeness of the information and materials
                contained in this website. Under no circumstances will
                BiblioReads be held responsible or liable in any way for any
                claims, damages, losses, expenses, costs or liabilities
                whatsoever resulting or arising directly or indirectly from your
                use of or inability to use this website, or from your reliance
                on the information and material on this website, even if
                BiblioReads has been advised of the possibility of such damages
                in advance.
              </p>
              <br />
              <p>
                BiblioReads is not responsible for and does not share the
                opinions, views, or commentary of any review shown on this
                website, which are strictly the views of the review writer.
              </p>
              <br />
              <p>
                BiblioReads does not host any content. All content on
                BiblioReads is sourced from Goodreads. BiblioReads is not
                affiliated with Goodreads. Goodreads is a trademark of Amazon
                Technologies, Inc.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Disclaimer;
