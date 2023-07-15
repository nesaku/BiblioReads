import React from "react";

const ContactHero = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-20 pb-4 lg:flex lg:mt-20">
      <div className="mx-auto max-w-3xl text-center text-gray-900 dark:text-white ">
        <h1 className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-7xl capitalize">
          Contact Us
        </h1>
        <h2 className="mt-20 text-2xl">
          Have something to say? Please feel free to open an issue on{" "}
          <a
            className="text-blue-600 dark:text-blue-500 underline"
            href="https://github.com/nesaku/BiblioReads/issues"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>{" "}
          or{" "}
          <a
            className="text-blue-600 dark:text-blue-500 underline"
            href="https://codeberg.org/nesaku/BiblioReads/issues"
            target="_blank"
            rel="noreferrer"
          >
            Codeberg
          </a>
          .{" "}
          {process.env.NEXT_PUBLIC_DISABLE_CONTACT_FORM != "true" &&
            "Alternatively, you can use the contact form below."}
        </h2>
      </div>
    </div>
  );
};

export default ContactHero;
