
# Biblioreads

BiblioReads is a free and open source alternative Goodreads front-end focused on privacy. 

Scrapes content from the Goodreads book page and presents the results without any of the bloat.

Inspired by [Nitter](https://github.com/zedeus/nitter), [libremdb](https://github.com/zyachel/libremdb) and other open source alternative front-end projects.

## Features

- No ads or tracking
- No sign up required
- All requests are proxied - your requests are never directly made to Goodreads
- Lightweight

---
## FAQ

### How Do I Use This?
There are two ways you can use BiblioReads:
- Visit [biblioreads.netlify.app](biblioreads.netlify.app) and paste the GoodReads book url into the input box. 
Or
- Prepend the Goodreads URL of any book page with `biblioreads.netlify.app/?path=`. Then click the "Fetch Data" button. For example: '[www.goodreads.com/book/show/5907.The_Hobbit](https://www.goodreads.com/book/show/5907.The_Hobbit)' to '[biblioreads.netlify.app/?path=https://www.goodreads.com/book/show/5907.The_Hobbit](https://biblioreads.netlify.app/?path=https://www.goodreads.com/book/show/5907.The_Hobbit)'.  

### How Does This Work? - Scraping
Since Goodreads stopped issuing new developer keys for their [public developer API](https://www.goodreads.com/api) back in December of 2020 and plans to retire the current version of the their API which you can learn more about [here](https://help.goodreads.com/s/article/Does-Goodreads-support-the-use-of-APIs). BiblioReads, goes to the Goodreads book page and scrapes the required content. 

### Why Is This Slower Than Goodreads?
When you make a request for a book on BiblioReads, your request needs to be first scraped by the scraper from Goodreads before the result can be shown to you. This causes a delay from when you make the request to when the result is shown.

---
## Comparison
Comparing BiblioReads to Goodreads.

### Speed

  [The Hunger Games](https://www.goodreads.com/book/show/2767052-the-hunger-games) Book Page 
  *(Tested on Chrome v106; without scroll; no throttling)*

  | Performance              | BiblioReads| Goodreads|
  | ------------------------ | -------- | ------ |
  | Request Count            | 13       | +180   |
  | Data Transferred         | 179 kB   | +24 MB |
  | DOMContentLoaded:        | 224ms    | 1.94s  |
  | Finish Time:             | 10.62s   | 16.68s |

### Privacy

Goodreads collects information about your device and uses tracking cookies for advertising among other reasons, this can be found in their [privacy policy](https://www.goodreads.com/about/privacy). [Blacklight](https://themarkup.org/blacklight) found 16 ad trackers and 40 third-party cookies.

- See what cookies and trackers Goodreads uses: https://themarkup.org/blacklight?url=www.goodreads.com
- See what cookies and trackers BiblioReads uses: https://themarkup.org/blacklight?url=biblioreads.netlify.app

---
## Installation:

### Manual Installation

**Prerequisites:**
- [Node.js](https://nodejs.org/en/)
- [Git](https://github.com/git-guides/install-git)

1. Clone the Git Repository
```bash
git clone https://github.com/nesaku/BiblioReads.git
cd BiblioReads
```

2. Install & Start The Project

```bash
npm install
npm run start
# or
yarn install
yarn start
```

### Docker Installation
- [] To Do

---
## Development:

### Built Using
- Next.js
- Cheerio

### Getting Started
To run the development server:

```bash
git clone https://github.com/nesaku/BiblioReads.git
cd BiblioReads
# then
npm install
npm run dev
# or
yarn install
yarn dev
```
**ⓘ If you want use the API directly or run any kind of automation. Please host the API on your own server.**

## Thank You:
* [Images.weserv.nl](https://images.weserv.nl/) - For image cache and manipulation service 
* [rawpixel.com](https://www.rawpixel.com/image/6723403/open-book-education-icon-flat-graphic-vector) - For logo/favicon