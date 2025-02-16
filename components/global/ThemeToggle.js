import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  // Detect and use the OS/browser's preferred theme
  const [isDefaultTheme, setIsDefaultTheme] = useState(true);
  const { theme, setTheme } = useTheme();
  // If the themeSelector (theme selector) is used, save the preferred theme to LocalStorage
  const themeSelector = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsDefaultTheme(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    // Change the button icon based on the preferred theme

    (<button
      type="button"
      className="flex p-2 border-2 border-rose-200 hover:border-rose-900 dark:border-[#710e2a] hover:dark:border-rose-200 duration-200 delay-150 hover:delay-50 transition rounded-lg bg-rose-800 hover:bg-rose-900 dark:bg-[#710e2a]"
      onClick={themeSelector}
    >
      {isDefaultTheme ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Dark Mode Toggle"
        >
          <path d="M12.5 20.7747C12.2881 20.7747 12.0848 20.8589 11.935 21.0087C11.7851 21.1585 11.7009 21.3619 11.7009 21.5738V22.3729C11.7009 22.6584 11.8533 22.9222 12.1005 23.0649C12.3477 23.2076 12.6524 23.2076 12.8996 23.0649C13.1468 22.9222 13.2991 22.6584 13.2991 22.3729V21.5738C13.2991 21.3619 13.2149 21.1585 13.0651 21.0087C12.9153 20.8589 12.7119 20.7747 12.5 20.7747V20.7747Z" />
          <path d="M5.15637 18.2014L4.58896 18.7688C4.41986 18.9136 4.3189 19.1225 4.31016 19.3449C4.3016 19.5674 4.38633 19.7834 4.54365 19.9409C4.70115 20.0982 4.91716 20.1829 5.1396 20.1744C5.36203 20.1656 5.57091 20.0647 5.71574 19.8956L6.28315 19.3282C6.4592 19.1225 6.51931 18.8416 6.44243 18.5818C6.36556 18.3221 6.16239 18.119 5.90269 18.0421C5.643 17.9653 5.36204 18.0253 5.15637 18.2014L5.15637 18.2014Z" />
          <path d="M2.9107 11.1853H2.1116C1.82602 11.1853 1.56222 11.3376 1.41952 11.5849C1.27683 11.8321 1.27683 12.1367 1.41952 12.384C1.56222 12.6312 1.82603 12.7835 2.1116 12.7835H2.9107C3.19628 12.7835 3.46008 12.6312 3.60278 12.384C3.74547 12.1367 3.74547 11.8321 3.60278 11.5849C3.46008 11.3376 3.19627 11.1853 2.9107 11.1853Z" />
          <path d="M5.15654 5.7672C5.3622 5.94326 5.64313 6.00337 5.90286 5.92649C6.16259 5.84961 6.36575 5.64644 6.4426 5.38675C6.51945 5.12705 6.45937 4.8461 6.28331 4.64043L5.7159 4.07302C5.51006 3.89678 5.22913 3.83685 4.9694 3.91373C4.70969 3.99043 4.50651 4.19359 4.42984 4.45329C4.35296 4.713 4.4129 4.99394 4.58913 5.19979L5.15654 5.7672Z" />
          <path d="M12.5 3.19418C12.7119 3.19418 12.9153 3.10999 13.0651 2.96016C13.2149 2.81033 13.2991 2.60698 13.2991 2.39508V1.59597C13.2991 1.3104 13.1468 1.0466 12.8996 0.903898C12.6524 0.761201 12.3477 0.761201 12.1005 0.903898C11.8533 1.0466 11.7009 1.31041 11.7009 1.59597V2.39508C11.7009 2.60698 11.7851 2.81033 11.935 2.96016C12.0848 3.10999 12.2881 3.19418 12.5 3.19418Z" />
          <path d="M16.3758 5.92718C14.5689 4.77117 12.3403 4.48217 10.2985 5.13876C8.25626 5.79553 6.61398 7.32954 5.81971 9.3221C5.02526 11.3145 5.16189 13.5577 6.19197 15.4392C7.22209 17.3206 9.03826 18.6442 11.1446 19.0485C13.2512 19.4527 15.4284 18.8956 17.0817 17.5292C18.7353 16.1626 19.6924 14.1294 19.692 11.9843C19.7006 9.52951 18.4484 7.24214 16.3757 5.92704L16.3758 5.92718ZM6.90613 11.9844C6.90578 10.6391 7.39039 9.33863 8.27087 8.32153C9.15149 7.30447 10.3692 6.63875 11.7008 6.44664V17.5223C10.3692 17.3302 9.15149 16.6645 8.27087 15.6474C7.39044 14.6303 6.90577 13.3298 6.90613 11.9845V11.9844Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          className="h-6 w-6 text-gray-100 dark:text-gray-200/80"
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
      )}
    </button>)
  );
};

export default ThemeToggle;
