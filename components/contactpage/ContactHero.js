import React from "react";

const ContactHero = () => {
  return (
    /*     <div className="mx-auto max-w-screen-xl min-h-[70vh] px-4 pt-20 pb-4 lg:flex lg:mt-20"> */
    <div
      className={`mx-auto max-w-screen-xl px-4 pt-20 pb-4 lg:flex lg:mt-20 ${
        process.env.NEXT_PUBLIC_ENABLE_CONTACT_FORM != "true" && "min-h-[70vh]"
      }`}
    >
      <div className="mx-auto max-w-3xl text-center text-gray-900 dark:text-white ">
        <h1 className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-7xl capitalize">
          Contact Us
        </h1>
        <div className="mt-20 text-2xl">
          <h2>Have something to say? Please feel free to open an issue on </h2>
          <a
            className="group text-blue-600 dark:text-blue-500 transition-all duration-300 ease-in-out"
            href="https://github.com/nesaku/BiblioReads/issues"
            target="_blank"
            rel="noreferrer"
          >
            <span className="bg-left-bottom bg-gradient-to-r from-rose-500 to-rose-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              GitHub
            </span>
          </a>{" "}
          or{" "}
          <a
            className="group text-blue-600 dark:text-blue-500 transition-all duration-300 ease-in-out"
            href="https://codeberg.org/nesaku/BiblioReads/issues"
            target="_blank"
            rel="noreferrer"
          >
            <span className="bg-left-bottom bg-gradient-to-r from-rose-500 to-rose-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              Codeberg
            </span>
          </a>
          .
          {process.env.NEXT_PUBLIC_ENABLE_CONTACT_FORM === "true"
            ? " Alternatively, you can use the contact form below."
            : process.env.NEXT_PUBLIC_INSTANCE_OPERATOR_LINK && (
                <div className="mt-16 text-xl h-[45vh]">
                  You can reach the owner of this instance{" "}
                  <a
                    className="group text-blue-600 dark:text-blue-500 transition-all duration-300 ease-in-out"
                    href={process.env.NEXT_PUBLIC_INSTANCE_OPERATOR_LINK}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="bg-left-bottom bg-gradient-to-r from-rose-500 to-rose-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                      here
                    </span>
                  </a>
                  .
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
