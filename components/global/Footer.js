import React from "react";
import Link from "next/link";

const Footer = () => {
  const version = "v2.15.0";
  const versionSlug = "2150---jul-15-2023";

  console.log(`%c${version} (Oreki)`, `color:green`);

  return (
    <footer className="text-center w-full ">
      <div className="flex justify-center items-center content-center mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <nav
            aria-label="Footer Nav"
            className="rounded-3xl border-4 border-gray-900 p-6 dark:border-gray-700"
          >
            <ul className="flex flex-wrap justify-center items-center gap-8 sm:gap-6 text-sm font-bold">
              <li>
                <Link href="/search">
                  <a className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90">
                    Search
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/quotes">
                  <a className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90">
                    Quotes
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/about">
                  <a className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90">
                    About
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/contact">
                  <a className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90">
                    Contact
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/privacy">
                  <a className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90">
                    Privacy
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/disclaimer">
                  <a className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90">
                    Disclaimer
                  </a>
                </Link>
              </li>

              <li>
                <a
                  className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90"
                  href="#"
                  target="_self"
                  rel="noreferrer"
                >
                  Back to Top
                </a>
              </li>

              <li>
                <a
                  href={`https://github.com/nesaku/BiblioReads/blob/main/CHANGELOG.md#${versionSlug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-900 duration-300 delay-150 hover:delay-50 transition hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90"
                >
                  {version}
                </a>
              </li>

              <li className="items-center justify-center align-middle content-center">
                <a
                  className="text-gray-900 hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90 duration-300 delay-150 hover:delay-50 transition"
                  href="https://github.com/nesaku/BiblioReads"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <svg
                    className="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>

              <li className="items-center justify-center align-middle content-center">
                <a
                  className="text-gray-900 hover:text-rose-900 dark:text-gray-100/80 dark:hover:text-white/90 duration-300 delay-150 hover:delay-50 transition"
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
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
