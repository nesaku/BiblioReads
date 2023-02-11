# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

`<a> cannot appear as a descendant of <a>` error

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

- Improve footer spacing on mobile devices

### Fixed

- Author series book covers not displaying correctly
- Hover effect in light mode

## [2.4.0] - Feb 5, 2023

### Added

- Added search page and search route - [(ISSUE)](https://codeberg.org/nesaku/BiblioReads/issues/23)

### Changed

- Allow search terms and url input on the hero page

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
