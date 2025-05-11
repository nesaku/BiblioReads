# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.1] - May 12, 2025

### Changed

- Replace picture elements with the CoverImage component

## [3.1.0] - May 11, 2025

**First update of 2025!**

### Added

- Add the Goodreads Choice Awards route - [(ISSUE)](https://github.com/nesaku/BiblioReads/issues/30)

### Changed

- Make the CoverImage loading priority configurable

### Fixed

- Fixed the library page background not reaching the bottom of the page when more than three books are added

## [3.0.0] (Holo) - Dec 26, 2024

### Updated to Next.js 15 - Possible Breaking Changes

While v3.0.0 has been tested extensively, there is still the possibility for breaking changes.
Please open an issue if you have identified or experienced a breaking change.

### Added

- Add a short animation to reduce flashing when changing review pages

### Changed

- Update to Next.js 15
- Change the package used for pagination
- Change the package used for PWA support
- Remove <a> tags inside <Link> tags (or use legacyBehavior)

### Fixed

- Fix fetchpriority attribute spelling

## [2.25.0] - Nov 3, 2024

### Changed

- Set a maximum width for the displayed Goodreads URL
- Use a reusable `<CoverImage />` component instead of repeating code
- Update the instances list in the README and instances.json
- Allow the /search path in robots.txt

### Fixed

- Fix similar books section still being shown when there are no books
- Fix book cover images not showing in the series list
- Fix the aria-hidden attribute added to the quotes header link

## [2.24.0] - Sep 28, 2024

### Changed

- Use a utility function to return higher resolution images
- Stop using separate mobile and desktop review section components
- Made the similar books component fully responsive instead of relying on props

### Fixed

- Fix the series title not being centered in some browsers
- Fix some section titles not being the same color in dark mode
- Fix similar books titles being cut off on hover

## [2.23.2] - Sep 21, 2024

### Fixed

- Fix "+" in the search query returning no results - [(ISSUE)](https://github.com/nesaku/BiblioReads/issues/25)
- Fix page shift when switching from light to dark mode - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/86)

## [2.23.1] - Jun 22, 2024

### Changed

- Update the user agent in .env.local.example
- Update the instances list in the README and instances.json
- Use id attributes for sections in the about page

### Fixed

- Fix page height when there is no contact form is used

## [2.23.0] - May 10, 2024

### Added

- Add a "View on Goodreads" button to 404 pages - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/83)
- Add support for viewing individual quotes

### Changed

- Use the 301 status code (permanent) instead of 302 for server side redirects

### Fixed

- Fix books URLs with /vi/ returning a 404 error - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/82)

## [2.22.0] - Apr 29, 2024

### Added

- Add the authors tab to the library page and saving authors functionality

### Changed

- Separated the database initialization function into its own file
- Move the "empty library" message to its own component
- Move the "add to library" button to its own component
- Update the version Number of the IndexedDB database

### Fixed

- Fix certain series book covers not loading properly
- Fix book meta titles not being capitalized

## [2.21.0] - Apr 16, 2024

### Added

- Redirect search requests in the query parameter format - [(ISSUE)](https://github.com/nesaku/BiblioReads/issues/22)
- Add a meta title tag to the loading page

### Changed

- Make the author image smaller
- Improper use of `<a>` tags in the about page

### Fixed

- Fix certain series book covers not loading properly
- Fix book meta titles not being capitalized

## [2.20.0] - Mar 2, 2024

### Added

- Add support for unanswered book questions

### Changed

- Update the contact form to be off by default
- Update the instances list in the README and instances.json
- Improve the questions page on smaller screens and when there are no questions

### Fixed

- Fix the version saving code causing excessive logs

## [2.19.0] - Jan 14, 2024

### Changed

- Update the instances list in the README and instances.json

### Fixed

- Fix "Get A Copy" dropdown obstructing the similar books section - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/79)
- Fix the default format returning no results when filtering by edition - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/80)

## [2.18.0] - Dec 26, 2023

### Added

- Add support for multiple tabs on the library page
- Add the library page link to the footer
- Add error handling to the database code

### Changed

- Improve the scraper error response
- Improve the sessionStorage error text
- Update robots.txt to only allow the about and homepage
- Change the book page loader text
- Split library code into multiple components

### Fixed

- Fix the addToLibrary button appearing in the wrong location when the cover fails to load
- Fix the close icon not appearing in toasts
- Fix a version mismatch causing indexedDB errors

## [2.17.0] - Dec 20, 2023

### Added

- Add the library page and saving books functionality - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/76)
- Add the option to save and list locally stored books.
- Add a toast component

### Changed

- Encode search text
- Update the privacy policy to reflect IndexedDB being used

### Fixed

- Fix HTML and UI inconsistencies

## [2.16.0] - Dec 18, 2023

## Added

- Add get a copy/buy links - [(ISSUE)](https://github.com/nesaku/BiblioReads/issues/15)

### Changed

- Change the dark mode image background color

## [2.15.8] - Nov 25, 2023

### Added

- Add cache headers to API responses

### Changed

- Improve CODE_OF_CONDUCT.md
- Rename the session storage version item and include the version in the value
- Update the privacy policy to reflect session storage being used

## [2.15.7] - Nov 9, 2023

### Added

- Add CONTRIBUTING.md - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/72)
- Add Code of Conduct - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/74)
- Add a pull request template for new instances - [ISSUE](https://codeberg.org/nesaku/BiblioReads/issues/71)

### Changed

- Remove outdated instructions from the FAQ and README

### Fixed

- Fix typographical issues
- Fix similar-scraper being called multiple times
- Fix the version being logged multiple times in the console

## [2.15.6] - Oct 22, 2023

### Changed

- Improve the disclaimer grammar - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/70)
- Update the instances list in the README and instances.json
- Remove unneeded query parameters for book search results

## [2.15.5] - Oct 9, 2023

### Added

- Add Q and A before book questions and answers
- Add a hover effect to the link on the About page

### Changed

- Change the maximum text limit for titles in the author book cards

### Fixed

- Fix a spelling error
- Fix text showing up in the avg rating section

## [2.15.4] - Aug 3, 2023

### Changed

- Update the instances list in the README and instances.json
- Update the default contact form success redirect URL

### Fixed

- Fix the similar books section being blank
- Fix no edition results being shown

## [2.15.3] - Jul 24, 2023

### Added

- Add support for questions that include spoilers
- Add a cleanup function to the search and quotes tag page
- Add meta information to quotes search results

### Fixed

- Fix the book result appearing again in the similar books section
- Fix blank questions
- Fix a typo on the about page - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/66)

## [2.15.2] - Jul 17, 2023

### Changed

- Move the small loader to a global component
- Update the similar books section to have a more consistent design
- Update README text

### Fixed

- Fix the similar books section

## [2.15.1] - Jul 16, 2023

### Added

- Add a small border around most images

### Changed

- Make the author name appear clickable on the search page
- Make the "View More Editions" link appear more clickable
- Process image URL modifications client side instead of server side
- Remove the default image being shown for most image loading errors
- Remove eager loading for images that don't need it

### Fixed

- Fix author books list text overflow

## [2.15.0] - Jul 15, 2023

### Added

- Add "View More Books" option for author books - [(ISSUE)](https://github.com/nesaku/BiblioReads/issues/11)
- Add the author book list route
- Add a loader to the `BookList` component

### Changed

- Change the author scraper file location
- Remove unneeded fragments

### Fixed

- Fix incorrect fallback URL for errors on the list route

## [2.14.2] - Jun 30, 2023

### Added

- Add more details to book editions

### Fixed

- Fix spelling errors

## [2.14.1] - Jun 25, 2023

### Changed

- Update the instances list in the README and instances.json

### Fixed

- Fix an author page bug
- ~~Fix the author appearing clickable on the search page~~ (Added back in 2.15.1)

## [2.14.0] - Jun 25, 2023

### Added

- Add the book editions route - [(ISSUE)](https://github.com/nesaku/BiblioReads/issues/10)
- Add "View More Editions" link to the book page

### Fixed

- Fix "open source" term inconsistency in the README - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/65)

## [2.13.1] - May 13, 2023

### Added

- Add Goodreads lists (Listopia) searching
- Add option to disable the contact form using an env variable

## [2.13.0] - May 6, 2023

### Added

- Add the lists route

### Changed

- Rename the path for question page components
- Update default scraper user agent

## [2.12.2] - Apr 5, 2023

### Added

- Add a search button to the about page

### Fixed

- Fix unhandled scraper errors
- Fix search for a tag prompt when loading quote tags
- Fix missing alt tags for img elements

### Changed

- Retry until a successful response is received when the book page scraper encounters a 504 error
- Remove "-components" from component subfolder names
- Change button name from "submit" to "search"

## [2.12.1] - Mar 23, 2023

### Added

- Add quotes page to the header and footer

### Changed

- Retry until a successful response is received when the book page scraper encounters a 504 error
- Remove unneeded route index pages

## [2.12.0] - Mar 13, 2023

### Added

- Add quote tags search and show popular tags - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/59)
- Add quotes search - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/59)
- Add GreaseMonkey Userscript to the README - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/62)
- Add the documentation issue template - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/63)

### Changed

- Only show quotes book image if there is image data
- Update the placeholder image
- Change wildcard import for DOMPurify
- Update search page hero
- Move search scrapers to their own folder

## [2.11.0] - Mar 9, 2023

### Added

- Add questions works route

### Changed

- Only show instance information on the privacy page if the env variables are set
- Move works scrapers to their own folder
- Only show view question/quotes button on the book page if there is data
- Change book quotes page layout
- Add book questions page Redirector info to the README

## [2.10.0] - Mar 7, 2023

### Added

- Add "View More Books In This Series" buttons to the book page - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/60)
- Add "Quotes" buttons to the book page - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/59)
- Add the book link to books listed on the quotes page - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/59)
- Add configurable instance information on the privacy page - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/1)
- Add quotes works route
- Add new env variables to `.env.example`
- Add book quotes page Redirector info to the README

### Changed

- Use `next/link` with links in more components
- Use dark mode colors for images while loading

### Fixed

- Fix extra trailing slash in the quote page POST request

## [2.9.1] - Feb 26, 2023

### Changed

- Improve user error handling when no results are found on the search page
- Remove duplicate `.env` file

### Fixed

- Fix ESLint errors and warnings

## [2.9.0] - Feb 26, 2023

### Added

- Add instance specific configurable privacy information - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/1)
- Add new env variables to `.env.example`
- Add information about adding a new instance to the README

### Changed

- Hide review breakdown if no reviews exist
- Rename "Go To The Top" to "Back to Top" in the footer - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/58)
- Update the instance issue template
- Update the `.env.local.example` file with new environment variables

### Fixed

- Fix incorrect quotes pages redirection example URL in the README - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/57)

## [2.8.0] - Feb 25, 2023

### Added

- Add quotes route
- Add quotes page Redirector info to the README
- Add influences to the author page
- Add info about using the search box to the FAQ

### Changed

- Only show "...read more" button in the author, series, book descriptions and reviews after a certain character limit
- Make links in series description clearer - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/55)
- Change scraper response json message from `status: "Success"` to `status: "Received"`
- Improve home page color gradient
- Update README screenshots
- Replace the question mark with an invisible character when a review has no stars

### Fixed

- Fix incorrect loading message on the series route
- Fix text color of rating information on the series page in light mode
- Fix series description appearing when there was no series description
- Fix author links on the series page
- Fix incorrect external link in the FAQ
- Fix text under the home page hero being hidden in light mode

## [2.7.1] - Feb 22, 2023

### Added

- Add book series redirector info to the README
- Add search by buttons and path forwarding for search types (~~_Functionality not implemented yet_~~)
- Add Codeberg information for issues on the privacy policy

### Fixed

- Fix author links on the series page
- Fix images & media not being proxied in reviews
- Fix `:` appearing while loading search results
- Fix search page error location
- Fix invalid DOM property `stroke-width` in the search icon

## [2.7.0] - Feb 21, 2023

### Added

- Book series route
- Add html body color

### Changed

- Rename book scraper and change the scraper path

### Fixed

- Fix author link width on the search page

## [2.6.1] - Feb 16, 2023

### Fixed

- Fix empty Genre heading when there is no data - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/52)
- Fix slug not being defined in `/genres/[...slug]`

## [2.6.0] - Feb 16, 2023

### Added

- Add custom Error 404 and 500 pages
- Make the version number in the footer link to the `Changelog.md` file on GitHub. - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/34)
- Add "View on Goodreads" button to error pages - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/46)

### Changed

- Include error code in the route not supported message - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/46)

### Fixed

- Fix bug when there is no author description - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/50)
- Fix the separation of author names and individual author links - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/49)
- Fix review searching - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/51)

## [2.5.4] - Feb 14, 2023

### Added

- Add more unsupported routes

### Changed

- Move `ErrorMessage.js` component location
- Centralize version info to the footer component

### Fixed

- Fix bug in the number of reviews shown when there is only 1 review on the book page - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/48)
- Fix description and genre section still being shown even when there is no content

## [2.5.3] - Feb 12, 2023

### Added

- Add pagination to reviews
- Add search page Redirector info to the README - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/23)
- Show message when there are no search results

### Changed

- Remove Search link from the header - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/40)

### Fixed

- Fix search box remaining visible underneath the loader when loading search results
- Fix `<a> cannot appear as a descendant of <a>` error on the author page
- Fix review text overflow on mobile screens
- Fix review breakdown width on mobile screens
- Fix placeholder image being show on search page
- Fix review loading performance - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/26)

## [2.5.2] - Feb 11, 2023

### Changed

- Improve website accessibility

### Fixed

- Fix `<title>` element not being shown for the search results page
- Fix search box not appearing on the search results page

## [2.5.1] - Feb 11, 2023

### Added

- Add search icon to the header - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/23)
- Add addressed issue links to the CHANGELOG

### Changed

- Make search box width larger when hovered/focused - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/23)
- Update book page screenshot in the README

### Fixed

- Fix `<a> cannot appear as a descendant of <a>` error on the book page

## [2.5.0] - Feb 10, 2023

### Added

- Add review breakdown - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/25)

### Changed

- Don't show search result components when there is a scraper error
- Dark mode review background color - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/39)

## [2.4.2] - Feb 5, 2023

### Fixed

- "More screenshots" link in the README not working on Codeberg - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/38)

## [2.4.1] - Feb 5, 2023

### Added

- Add search link to the footer
- Add author death date info - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/24)
- Update Redirector info and screenshots in the README to reflect new updates - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/24)

### Changed

- Improve footer spacing on mobile screens

### Fixed

- Fix author series book covers not displaying correctly
- Fix hover effect in light mode

## [2.4.0] - Feb 5, 2023

### Added

- Add search page and search route - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/23)

### Changed

- Allow search terms and URL input on the hero page

### Fixed

- Fix default triangle icon for the `<details>` element being shown in the FAQ section - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/37)
- Fix hero overflow bug

## [2.3.1] - Feb 4, 2023

### Fixed

- Fix version numbering
- Fix unescaped-entities
- Add empty alt string for img elements

## [2.3.0] - Feb 4, 2023

### Added

- Add author route - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/24)
- Add version info to footer - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/34)

## [2.2.0] - Feb 4, 2023

### Changed

- Remove `chrome-aws-lambda` and `puppeteer`, go back to using only `Cheerio`
- Codeberg link in the FAQ and the Codeberg logo in the footer/header - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/35)

## [2.1.1] - Feb 3, 2023

### Changed

- Optimize scraper

## [2.1.0] - Feb 2, 2023

### Added

- Add `chrome-aws-lambda` dependency

### Changed

- Remove unneeded eslint rule

### Fixed

- Fix the scraper not working after the latest Goodreads update - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/31)

## [2.0.0] (Oreki) - Feb 2, 2023

### Added

- Use Puppeteer to scrape content

### Changed

- Move the scraper error to the `ErrorMessage.js` component

### Fixed

- Fix the scraper not working after the latest Goodreads update - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/31)
