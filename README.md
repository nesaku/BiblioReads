<div align="center">
<img src="./public/readme/logo.svg?raw=true" width="256" height="256" alt="">
</div>
<h1 align="center">BiblioReads</h1>
<div align="center">
BiblioReads is a free and open source alternative Goodreads front-end focused on privacy.

Scrapes content from Goodreads and presents the results without any of the bloat.

Inspired by [Nitter](https://github.com/zedeus/nitter), [libremdb](https://github.com/zyachel/libremdb) and other open source alternative front-end projects.

[GitHub](https://github.com/nesaku/BiblioReads) | [Codeberg](https://codeberg.org/nesaku/BiblioReads)

</div>

---

## Screenshots

| Dark Mode                                   | Light Mode                                   |
| ------------------------------------------- | -------------------------------------------- |
| ![](/public/readme/books-dark.png?raw=true) | ![](/public/readme/books-light.png?raw=true) |

#### View more [screenshots](#more-screenshots).

---

## Features

- No ads - simple. We don't show ads.
- No tracking or data collection - no personal information is ever collected. Tracking cookies are not used.
- No sign-up required - use BiblioReads without signing up for an account and never deal with those annoying sign-up popups.
- All requests are proxied - your requests are never directly made to Goodreads
- Lightweight
- Modern Design - responsive design with built-in light & dark mode support
- PWA Support - installable as a PWA on desktop and mobile

---

## Instances

| Instance URL                                                                                                                                  |        Country         | Provider   | Notes                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------: | ---------- | ----------------------------------------------------------- |
| [biblioreads.eu.org](https://biblioreads.eu.org)                                                                                              |          :us:          | Netlify    | Run by [me](https://github.com/nesaku)                      |
| [biblioreads.vercel.app](https://biblioreads.vercel.app)                                                                                      |          :us:          | Vercel     | Run by [me](https://github.com/nesaku)                      |
| [biblioreads.mooo.com](https://biblioreads.mooo.com)                                                                                          | :globe_with_meridians: | Cloudflare | Run by [me](https://github.com/nesaku)                      |
| [bl.vern.cc](https://bl.vern.cc)                                                                                                              |          :us:          | Hetzner    | Run by [~vern](https://vern.cc)                             |
| [biblioreads.lunar.icu](https://biblioreads.lunar.icu)                                                                                        | :globe_with_meridians: | Cloudflare | Run by [Lunar.ICU](https://lunar.icu)                       |
| [read.whateveritworks.org](https://read.whateveritworks.org)                                                                                  | :globe_with_meridians: | Cloudflare | Run by [WhateverItWorks](https://www.whateveritworks.org)   |
| [biblioreads.privacyfucking.rocks](https://biblioreads.privacyfucking.rocks)                                                                  |          :de:          | 1Blu.de    | Run by [PrivacyFucking.Rocks](https://privacyfucking.rocks) |
| [read.seitan-ayoub.lol](https://read.seitan-ayoub.lol)                                                                                        |          :de:          | Hetzner    | Run by [unstablemaple](https://seitan-ayoub.lol)            |
| Onion:                                                                                                                                        |                        |            |                                                             |
| [bl.vernccvbvyi5qhfzyqengccj7lkove6bjot2xhh5kajhwvidqafczrad.onion](http://bl.vernccvbvyi5qhfzyqengccj7lkove6bjot2xhh5kajhwvidqafczrad.onion) |          :us:          | Hetzner    | Run by [~vern](https://vern.cc)                             |
| I2P:                                                                                                                                          |                        |            |                                                             |
| [vernapl3lpo3huqdx3pjzxqgdgavxjlmdskbvejh2gfqgmjuyvxq.b32.i2p](http://vernapl3lpo3huqdx3pjzxqgdgavxjlmdskbvejh2gfqgmjuyvxq.b32.i2p)           |          :us:          | Hetzner    | Run by [~vern](https://vern.cc)                             |

### Adding Your Instance

If you'd like to add your instance to the list, please open an issue or pull request.

**Note:** If you collect any user data from your instance please set the applicable environment variables (an example can be found in `.env.local.example`).

---

## Automatic Redirection

### LibRedirect

Use [LibRedirect](https://github.com/libredirect/libredirect) to automatically redirect Goodreads links to BiblioReads.

### GreaseMonkey Userscript

There is a userscript to redirect Goodreads links to BiblioReads. The userscript can be found [here](https://codeberg.org/zortazert/GreaseMonkey-Redirect/src/branch/main/Goodreads_to_BiblioReads.user.js).

### Redirector

You can use the [Redirector](https://github.com/einaregilsson/Redirector) extension to redirect Goodreads links to BiblioReads with the configuration below (_Note:_ You can replace `biblioreads.eu.org` with any instance URL):

#### To Redirect All Supported Routes:

- Description: Goodreads to BiblioReads Pages
- Example URL: https://www.goodreads.com/book/show/5907.The_Hobbit
- Include pattern: `^(?:https?://)www\.goodreads\.com/(book|work|author|series|quotes|list)(.*)`
- Redirect to: `https://biblioreads.eu.org/$1$2`
- Pattern type: Regular Expression
- Pattern Description: Redirects all supported Goodreads URLs to BiblioReads
- Advanced options:
  - Apply to:
    - [x] Main window (address bar)

#### To Redirect Search Pages:

##### Rule 1:

- Description: Goodreads to BiblioReads Search Page - Rule 1
- Example URL: https://www.goodreads.com/search?q=the+hobbit&qid=
- Include pattern: `^https:\/\/www\.goodreads\.com\/search\?q=(.*)$`
- Redirect to: `https://biblioreads.eu.org/search/$1`
- Pattern type: Regular Expression
- Pattern Description: Redirects all Goodreads search page URLs to BiblioReads
- Advanced options:
  - Apply to:
    - [x] Main window (address bar)

##### Rule 2:

- Description: Goodreads to BiblioReads Search Page - Rule 2
- Example URL: https://www.goodreads.com/search?utf8=%E2%9C%93&q=the+hobbit&search_type=books
- Include pattern: `^https:\/\/www\.goodreads\.com\/search\?utf8=%E2%9C%93&q=(.*)$`
- Redirect to: `https://biblioreads.eu.org/search/$1`
- Pattern type: Regular Expression
- Pattern Description: Redirects all Goodreads search page URLs to BiblioReads
- Advanced options:
  - Apply to:
    - [x] Main window (address bar)

---

## FAQ

### How Do I Use This?

There are two ways you can use BiblioReads:

1. Visit [biblioreads.eu.org](https://biblioreads.eu.org) (or another instance) and paste the Goodreads book URL into the input box or search for a book using the input box.
2. Replace the `https://www.goodreads.com` of any book page URL with `https://biblioreads.eu.org` (or another instance URL). Then click the "Fetch Data" button. For example: [www.goodreads.com/book/show/5907.The_Hobbit](https://www.goodreads.com/book/show/5907.The_Hobbit) to [biblioreads.eu.org/book/show/5907.The_Hobbit](https://biblioreads.eu.org/book/show/5907.The_Hobbit).

### How Does This Work? - Scraping

Since Goodreads stopped issuing new developer keys for their [public developer API](https://www.goodreads.com/api) back in December of 2020 and plans to retire the current version of their API which you can learn more about [here](https://help.goodreads.com/s/article/Does-Goodreads-support-the-use-of-APIs). BiblioReads goes to the Goodreads book page and scrapes the required content.

### How Did You Come Up With The Name?

The "Biblio" in _BiblioReads_ comes from the prefix _biblio-_ meaning book and "Reads" comes from the ending of Goodreads which is what this website is an alternative front-end for.

### What Do You Do With My Data?

Nothing. Since we don't collect any user data, we can't use any user data.

### Why Is This Slower Than Goodreads?

When you make a request for a book on BiblioReads, your request needs to be first scraped by the scraper from Goodreads before the result can be shown to you. This causes a delay from when you make the request to when the result is shown.

### Why Is This Missing Functionality?

If you have a certain feature that you would like to see, feel free to open an issue on [GitHub](https://github.com/nesaku/BiblioReads/issues) or [Codeberg](https://codeberg.org/nesaku/BiblioReads/issues).

---

## Comparison

Comparing BiblioReads to Goodreads

### Speed

[The Hunger Games](https://www.goodreads.com/book/show/2767052-the-hunger-games) Book Page
_(Tested on Chrome v108, without scroll, no throttling, cache disabled)_

|    Performance    | BiblioReads | Goodreads |
| :---------------: | :---------: | :-------: |
|   Request Count   |     45      |   +190    |
| Data Transferred  |   137 kB    | +24.8 MB  |
| DOMContentLoaded: |    191ms    |   1.79s   |
|   Finish Time:    |    3.27s    |   9.26s   |

### Privacy

Goodreads collects information about your device and uses tracking cookies for advertising among other reasons, this can be found in their [privacy policy](https://www.goodreads.com/about/privacy). [Blacklight](https://themarkup.org/blacklight) found 16 ad trackers and 40 third-party cookies.

- See what cookies and trackers Goodreads uses: https://themarkup.org/blacklight?url=www.goodreads.com
- See what cookies and trackers BiblioReads uses: https://themarkup.org/blacklight?url=biblioreads.eu.org

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

##### Docker CLI:

```docker
docker run -d \
  --name biblioreads \
  -p 3000:3000 \
  --restart unless-stopped \
  nesaku/biblioreads:latest
```

##### Docker-Compose:

1. Download (or copy) `docker-compose.yml` from the repository
2. Edit the default environment variables with your variables (Optional)
3. Run the command `docker-compose up -d`

#### More Information:

Visit the [Docker Image Repo](https://github.com/nesaku/BiblioReads-Docker) for more information.

---

## Development

### Built Using

- Next.js
- Cheerio
- TailwindCSS
- next-themes

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

**ⓘ If you want to use the API directly or run any kind of automation. Please host the project on your own server.**

---

## More Screenshots:

| Dark Mode                                    | Light Mode                                    |
| -------------------------------------------- | --------------------------------------------- |
| ![](/public/readme/author-dark.png?raw=true) | ![](/public/readme/author-light.png?raw=true) |
| ![](/public/readme/search-dark.png?raw=true) | ![](/public/readme/search-light.png?raw=true) |
| ![](/public/readme/quote-dark.png?raw=true)  | ![](/public/readme/quote-light.png?raw=true)  |
| ![](/public/readme/home-dark.png?raw=true)   | ![](/public/readme/home-light.png?raw=true)   |

---

## License

Licensed under the [GNU AGPLv3](https://www.gnu.org/licenses/agpl-3.0.en.html). Please see [LICENSE.txt](./LICENSE.txt) for more information.

---

## Disclaimer

BiblioReads does not host any content. All content on BiblioReads is sourced from Goodreads. BiblioReads is not affiliated with Goodreads. Goodreads is a trademark of Amazon Technologies, Inc.
