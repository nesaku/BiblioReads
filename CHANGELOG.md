# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.12.2] - Apr 5, 2023

### Fixed

- Fix unhandled scraper errors

## [2.12.1] - Mar 23, 2023

### Added

- Add quotes page to the header and footer

### Changed

- Retry until a successfull response is recieved when the book page scraper encounters a 504 error
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
- Added book questions page Redirector info to the README

## [2.10.0] - Mar 7, 2023

### Added

- Add "View More Books In This Series" buttons to the book page - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/60)
- Add "Quotes" buttons to the book page - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/59)
- Add the book link to books listed on the quotes page - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/59)
- Add configurable instance information on the privacy page - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/1)
- Add quotes works route
- Add new env variables to `.env.example`
- Added book quotes page Redirector info to the README

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
- Added quotes page Redirector info to the README
- Add influences to the author page
- Add info about using the search box to the FAQ

### Changed

- Only show "...read more" button in the author, series, book descriptions and reviews after a certain character limit
- Make links in series description clearer - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/55)
- Changed scraper response json message from `status: "Success"` to `status: "Received"`
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
- Add search by buttons and path forwarding for search types (_Functionality not implemented yet_)
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
- Fixed slug not being defined in `/genres/[...slug]`

## [2.6.0] - Feb 16, 2023

### Added

- Add custom Error 404 and 500 pages
- Make the version number in the footer link to the `Changelog.md` file on GitHub. - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/34)
- Add "View on Goodreads" button to error pages - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/46)

### Changed

- Include error code in the route not supported message - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/46)

### Fixed

- Fix bug when there is no author description - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/50)
- Fix the seperation of author names and individual author links - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/49)
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
- Added search page Redirector info to the README - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/23)
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
- Fix search box not apearing on the search results page

## [2.5.1] - Feb 11, 2023

### Added

- Add search icon to the header - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/23)
- Add addressed issue links to the CHANGELOG

### Changed

- Made search box width larger when hovered/focused - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/23)
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

- Added search page and search route - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/23)

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

- Remove uneeded eslint rule

### Fixed

- Fix the scraper not working after the latest Goodreads update - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/31)

## [2.0.0] (Oreki) - Feb 2, 2023

### Added

- Use Puppeteer to scrape content

### Changed

- Move the scraper error to the `ErrorMessage.js` component

### Fixed

- Fix the scraper not working after the latest Goodreads update - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/31)
