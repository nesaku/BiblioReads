<div align="center" width="100%">
<img src="./public/readme/logo.svg?raw=true" width="256" height="256" alt="">
</div>
<h1 align="center">BiblioReads</h1>
<div align="center" width="100%">
BiblioReads is a free and open-source alternative Goodreads front-end focused on privacy.

Scrapes content from the Goodreads book page and presents the results without any of the bloat.

Inspired by [Nitter](https://github.com/zedeus/nitter), [libremdb](https://github.com/zyachel/libremdb) and other open source alternative front-end projects.

Mirror repository is available on Codeberg: [codeberg.org/nesaku/BiblioReads](https://codeberg.org/nesaku/BiblioReads).

</div>

## Screenshots

|                Dark Mode:                |                Light Mode                 |
| :--------------------------------------: | :---------------------------------------: |
|  ![](/public/readme/dark.png?raw=true)   |  ![](/public/readme/light.png?raw=true)   |
| ![](/public/readme/dark-ui.png?raw=true) | ![](/public/readme/light-ui.png?raw=true) |

## Features

- No ads - Simple. We don't show ads.
- No tracking or data collection - No personal information is ever collected. Tracking cookies are not used.
- No sign-up required - Use BiblioReads without signing up for an account and never deal with those annoying sign-up popups.
- All requests are proxied - your requests are never directly made to Goodreads
- Lightweight
- Modern Design - responsive design with built-in light & dark mode support
- PWA Support - installable as a PWA on desktop and mobile

## Instances

| Instance URL:                                                                                                                                 |        Country:        | Provider:  |                 Notes:                 |
| :-------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------: | :--------: | :------------------------------------: |
| [biblioreads.ml](https://biblioreads.ml)                                                                                                      |          :us:          |   Vercel   | Run by [me](https://github.com/nesaku) |
| [biblioreads.ga](https://biblioreads.ga)                                                                                                      | :globe_with_meridians: | Cloudflare | Run by [me](https://github.com/nesaku) |
| [biblioreads.netlify.app](https://biblioreads.netlify.app)                                                                                    |          :us:          |  Netlify   | Run by [me](https://github.com/nesaku) |
| [bl.vern.cc](https://bl.vern.cc)                                                                                                              |          :us:          |  Hetzner   |    Run by [~vern](https://vern.cc)     |
| [biblioreads.lunar.icu](https://biblioreads.lunar.icu)                                                                                        | :globe_with_meridians: | Cloudflare | Run by [Lunar.ICU](https://lunar.icu)  |
| Onion:                                                                                                                                        |                        |            |                                        |
| [bl.vernccvbvyi5qhfzyqengccj7lkove6bjot2xhh5kajhwvidqafczrad.onion](http://bl.vernccvbvyi5qhfzyqengccj7lkove6bjot2xhh5kajhwvidqafczrad.onion) |          :us:          |  Hetzner   |    Run by [~vern](https://vern.cc)     |
| I2P:                                                                                                                                          |                        |            |                                        |
| [vernapl3lpo3huqdx3pjzxqgdgavxjlmdskbvejh2gfqgmjuyvxq.b32.i2p](http://vernapl3lpo3huqdx3pjzxqgdgavxjlmdskbvejh2gfqgmjuyvxq.b32.i2p)           |          :us:          |  Hetzner   |    Run by [~vern](https://vern.cc)     |

---

## FAQ

### How Do I Use This?

There are two ways you can use BiblioReads:

1. Visit [biblioreads.ml](https://biblioreads.ml) (or another instance) and paste the GoodReads book url into the input box.
2. Replace the `https://www.goodreads.com` of any book page url with `https://biblioreads.ml` (or another instance URL). Then click the "Fetch Data" button. For example: [www.goodreads.com/book/show/5907.The_Hobbit](https://www.goodreads.com/book/show/5907.The_Hobbit) to [biblioreads.ml/book/show/5907.The_Hobbit](https://biblioreads.ml/book/show/5907.The_Hobbit).

### How Does This Work? - Scraping

Since Goodreads stopped issuing new developer keys for their [public developer API](https://www.goodreads.com/api) back in December of 2020 and plans to retire the current version of the their API which you can learn more about [here](https://help.goodreads.com/s/article/Does-Goodreads-support-the-use-of-APIs). BiblioReads, goes to the Goodreads book page and scrapes the required content.

### How Did You Come Up With The Name?

The "Biblio" in _BiblioReads_ comes from the prefix _biblio-_ meaning book and "Reads" comes from the ending of GoodReads which is what this website is an alternative front-end for.

### What Do You Do With My Data?

Nothing. Since we don't collect any user data, we can't use any user data.

### Why Is This Slower Than Goodreads?

When you make a request for a book on BiblioReads, your request needs to be first scraped by the scraper from Goodreads before the result can be shown to you. This causes a delay from when you make the request to when the result is shown.

### Why Is This Missing Functionality?

If you have a certain feature that you would like to see, feel free to open an issue on GitHub or Codeberg.

---

## Comparison

Comparing BiblioReads to Goodreads

### Speed

[The Hunger Games](https://www.goodreads.com/book/show/2767052-the-hunger-games) Book Page
_(Tested on Chrome v106; without scroll; no throttling)_

|    Performance    | BiblioReads | Goodreads |
| :---------------: | :---------: | :-------: |
|   Request Count   |     13      |   +180    |
| Data Transferred  |   179 kB    |  +24 MB   |
| DOMContentLoaded: |    224ms    |   1.94s   |
|   Finish Time:    |   10.62s    |  16.68s   |

### Privacy

Goodreads collects information about your device and uses tracking cookies for advertising among other reasons, this can be found in their [privacy policy](https://www.goodreads.com/about/privacy). [Blacklight](https://themarkup.org/blacklight) found 16 ad trackers and 40 third-party cookies.

- See what cookies and trackers Goodreads uses: https://themarkup.org/blacklight?url=www.goodreads.com
- See what cookies and trackers BiblioReads uses: https://themarkup.org/blacklight?url=biblioreads.ml

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

```
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

**ⓘ If you want use the API directly or run any kind of automation. Please host the API on your own server.**
