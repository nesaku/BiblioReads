/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="p-4 dark:bg-rose-800 dark:text-rose-100 border-b-2 dark:border-b-0 border-rose-300">
      <div className="container flex justify-between items-center h-16 mx-auto">
        <a
          href="/"
          aria-label="Back to homepage"
          className="flex items-center mx-auto lg:mx-32"
        >
          <Image
            src="/logo.svg"
            alt="BiblioReads Logo"
            width="64px"
            height="64px"
          />
        </a>
        <div>
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex">
              <Link href="/">
                <a className="flex items-center px-4 -mb-1 border-b-2 border-rose-400 hover:border-rose-600 transition duration-300 delay-150 hover:delay-100 dark:border-gray-300">
                  Home
                </a>
              </Link>
            </li>
            <li className="flex">
              <Link href="/about">
                <a className="flex items-center px-4 -mb-1 border-b-2 border-rose-400 hover:border-rose-600 transition duration-300 delay-150 hover:delay-100 dark:border-gray-300">
                  About
                </a>
              </Link>
            </li>
            <li className="flex">
              <Link href="/about#faq">
                <a className="flex items-center px-4 -mb-1 border-b-2 border-rose-400 hover:border-rose-600 transition duration-300 delay-150 hover:delay-100 dark:border-gray-300">
                  FAQ
                </a>
              </Link>
            </li>
            <li className="flex">
              <Link href="/contact">
                <a className="flex items-center px-4 -mb-1 border-b-2 border-rose-400 hover:border-rose-600 transition duration-300 delay-150 hover:delay-100 dark:border-gray-300">
                  Contact
                </a>
              </Link>
            </li>
            <li className="flex">
              <Link href="/privacy">
                <a className="flex items-center px-4 -mb-1 border-b-2 border-rose-400 hover:border-rose-600 transition duration-300 delay-150 hover:delay-100 dark:border-gray-300">
                  Privacy
                </a>
              </Link>
            </li>
            <li className="flex">
              <a
                className="ml-2 h-full w-8 text-gray-900 hover:text-gray-900/75 dark:text-gray-300 dark:hover:text-gray-300/75"
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
          </ul>
        </div>

        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="p-2 border-2 rounded-lg"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            className="h-6 w-6 text-gray-800 dark:text-gray-200"
          >
            {theme === "dark" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
