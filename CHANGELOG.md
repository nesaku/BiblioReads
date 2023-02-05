# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.1] - Feb 4, 2023

### Fixed

- Fix version numbering
- Fix unescaped-entities
- Add empty alt string for img elements

## [2.3.0] - Feb 4, 2023

### Added

- Add author route
- Add version info to footer

## [2.2.0] - Feb 4, 2023

### Changed

- Remove `chrome-aws-lambda` and `puppeteer`, go back to using only `Cheerio`
- Codeberg link in the FAQ and the Codeberg logo in the footer/header

## [2.1.1] - Feb 3, 2023

### Changed

- Optimize scraper

## [2.1.0] - Feb 2, 2023

### Added

- Add `chrome-aws-lambda` dependency

### Changed

- Remove uneeded eslint rule

### Fixed

- Fix the scraper not working after the latest Goodreads update

## [2.0.0] (Oreki) - Feb 2, 2023

### Added

- Use Puppeteer to scrape content

### Changed

- Move the scraper error to the `ErrorMessage.js` component

### Fixed

- Fix the scraper not working after the latest Goodreads update
