/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="p-4 dark:bg-[#881133] text-gray-900 dark:text-gray-100/90 border-b-2 dark:border-b-0 border-rose-300">
      <div className="flex justify-evenly items-center h-16">
        <div className="flex">
          <a href="/" aria-label="Back to homepage">
            <img src="/logo.svg" alt="" width="64" height="64" />
          </a>
        </div>
        <div>
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex">
              <Link href="/">
                <a className="flex items-center px-4 -mb-1 border-b-2 border-rose-400 hover:border-rose-600 dark:hover:border-white/90 transition duration-300 delay-150 hover:delay-50 dark:border-gray-300/90 hover:text-rose-900 dark:hover:text-white/90">
                  Home
                </a>
              </Link>
            </li>
            <li className="flex">
              <Link href="/about">
                <a className="flex items-center px-4 -mb-1 border-b-2 border-rose-400 hover:border-rose-600 dark:hover:border-white/90 transition duration-300 delay-150 hover:delay-50 dark:border-gray-300/90 hover:text-rose-900 dark:hover:text-white/90">
                  About
                </a>
              </Link>
            </li>
            <li className="flex">
              <Link href="/contact">
                <a className="flex items-center px-4 -mb-1 border-b-2 border-rose-400 hover:border-rose-600 dark:hover:border-white/90 transition duration-300 delay-150 hover:delay-50 dark:border-gray-300/90 hover:text-rose-900 dark:hover:text-white/90">
                  Contact
                </a>
              </Link>
            </li>
            <li className="flex">
              <Link href="/privacy">
                <a className="flex items-center px-4 -mb-1 border-b-2 border-rose-400 hover:border-rose-600 dark:hover:border-white/90 transition duration-300 delay-150 hover:delay-50 dark:border-gray-300/90 hover:text-rose-900 dark:hover:text-white/90">
                  Privacy
                </a>
              </Link>
            </li>
            <li className="flex">
              <Link href="/disclaimer">
                <a className="flex items-center px-4 -mb-1 border-b-2 border-rose-400 hover:border-rose-600 dark:hover:border-white/90 transition duration-300 delay-150 hover:delay-50 dark:border-gray-300/90 hover:text-rose-900 dark:hover:text-white/90">
                  Disclaimer
                </a>
              </Link>
            </li>
            <li className="flex">
              <a
                className="ml-2 mt-0.5 h-full w-8 text-gray-900 hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90 duration-300 delay-150 hover:delay-50 transition"
                href="https://github.com/nesaku/BiblioReads"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </li>
            <li className="flex items-center justify-center align-middle content-center">
              <a
                className=" mt-0.5 text-gray-900 hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90 duration-300 delay-150 hover:delay-50 transition"
                href="https://codeberg.org/nesaku/BiblioReads"
                target="_blank"
                rel="noreferrer"
                aria-label="Codeberg"
              >
                <svg
                  className="h-7 w-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M11.955.49A12 12 0 0 0 0 12.49a12 12 0 0 0 1.832 6.373L11.838 5.928a.187.14 0 0 1 .324 0l10.006 12.935A12 12 0 0 0 24 12.49a12 12 0 0 0-12-12 12 12 0 0 0-.045 0zm.375 6.467 4.416 16.553a12 12 0 0 0 5.137-4.213z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
