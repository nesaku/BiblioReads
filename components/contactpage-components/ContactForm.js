import Link from "next/link";
import React from "react";

const ContactForm = () => {
  return (
    <div>
      <div className="px-4 py-8 mb-20 mx-auto max-w-screen-sm text-center backdrop-blur-lg rounded-2xl">
        <form
          action="https://submit-form.com/4GkO3Bo7"
          method="POST"
          className="space-y-8"
        >
          <div className="hidden">
            <input type="hidden" name="_redirect" value="/success" />
            <input type="hidden" name="_error" value="/500" />
            <input type="hidden" name="_append" value="false" />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-md font-medium text-gray-900 text-center dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-center text-md rounded-lg focus:ring-rose-500 focus:ring-2 focus:focus:outline-none block w-full p-2.5 dark:backdrop-blur-sm dark:bg-white/10 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rose-500 darkdark:shadow-sm-light"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-md font-medium text-gray-900 text-center dark:text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="block p-3 w-full text-md text-gray-900 text-center bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-rose-500 focus:ring-2 focus:focus:outline-none dark:backdrop-blur-sm dark:bg-white/10 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rose-500 darkdark:shadow-sm-light"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-md font-medium text-gray-900 text-center dark:text-gray-300"
            >
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              className="block p-2.5 w-full text-md text-gray-900 text-center bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-rose-500 focus:ring-2 focus:focus:outline-none dark:backdrop-blur-sm dark:bg-white/10 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rose-500 dark:focus:border-rose-500"
              required
            ></textarea>
          </div>
          <p className="text-gray-900 dark:text-gray-400 p-4">
            By submitting this form you agree to our{" "}
            <Link href="/privacy">
              <a className="underline">Privacy Policy</a>
            </Link>
            .
          </p>
          <button
            type="submit"
            className="font-semibold text-md text-white bg-rose-500 ring ring-rose-600 ring-offset-2 ring-offset-rose-100 py-4 px-5 rounded-2xl shadow-lg shadow-rose-500 hover:shadow-xl hover:bg-rose-600 transition duration-300 delay-40 hover:delay-40"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
