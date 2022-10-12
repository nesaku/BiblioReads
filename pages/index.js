import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const [inputValue, setInputValue] = React.useState("");
  const [scrapedData, setscrapedData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isQuery, setIsQuery] = React.useState(true);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    fetch("/api/scraper", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ queryURL: inputValue }),
    })
      .then((res) => res.json())
      .then((userData) => {
        setscrapedData(userData);
        setIsLoading(false);
        setIsQuery(false);
      });
  };
  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BiblioReads</title>
        <meta
          name="description"
          content="BiblioReads is a free and open source alternative Goodreads front-end focused on privacy."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6378f9" />
        <meta name="msapplication-TileColor" content="#ff0000" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <main className={styles.main}>
        <h1>BiblioReads</h1>
        <h3>Get Info About A GoodReads Book:</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Enter A GoodReads Book URL: &nbsp;
            <input
              placeholder=""
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
          </label>
          <button>Submit</button>
        </form>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <p className={styles.hidden}>Ready</p>
        )}

        <div className={styles.error}>
          <p>{scrapedData.error}</p>
        </div>
        <section className={isQuery ? styles.hidden : styles.visible}>
          <div className={styles.cover}>
            <h1>Cover:</h1>
            {/*<img src={scrapedData.cover} alt={scrapedData.coverAltText} />*/}
            <picture>
              <source
                srcSet={`https://images.weserv.nl/?url=${scrapedData.cover}&default=https://biblioreads.netlify.app/cover-placeholder.png&output=webp&maxage=30d`}
                type="image/webp"
              />
              <source
                srcSet={`https://images.weserv.nl/?url=${scrapedData.cover}&default=https://biblioreads.netlify.app/cover-placeholder.png&maxage=30d`}
                type="image/jpeg"
              />
              <img
                src={`https://images.weserv.nl/?url=${scrapedData.cover}&default=https://biblioreads.netlify.app/cover-placeholder.png&maxage=30d`}
                alt={scrapedData.coverAltText}
              />
            </picture>
          </div>
          <div>Series: {scrapedData.series}</div>
          <div>Title: {scrapedData.title}</div>
          <div>Author: {scrapedData.author}</div>
          <br></br>
          <div className={styles.descriptionContainer}>
            <p>Desciption: </p>
            <div className={styles.description}>{scrapedData.desc}</div>
          </div>
          <br></br>
          <div>Rating: {scrapedData.rating}</div>
          <br></br>
          <div>Number Of Ratings & Reviews: {scrapedData.ratingCount}</div>
          <br></br>
          <div>Publishing Date: {scrapedData.publishDate}</div>
          <br></br>
          <div>ISBN: {scrapedData.isbn}</div>
          <br></br>
          <div>Language: {scrapedData.lang}</div>
          <br></br>
          <div>Last scraped: {scrapedData.lastScraped}</div>
        </section>
        {/*
        <br />
        <div className={styles.rawData}>
        <b>Raw Data:</b>
        <code>
        <p>{scrapedData.scrapeURL}</p> 
        <p>{scrapedData.cover}</p>
        <p>{scrapedData.coverAltText}</p>
        <p>{scrapedData.series}</p>
        <p>{scrapedData.title}</p>
        <p>{scrapedData.author}</p>
        <p>{scrapedData.desc}</p>
        <p>{scrapedData.rating}</p>
        <p>{scrapedData.ratingCount}</p>
        <p>{scrapedData.publishDate}</p>
        <p>{scrapedData.isbn}</p>
        <p>{scrapedData.lang}</p>
        <p>{scrapedData.lastScraped}</p>
        </code>
        </div>
        */}
      </main>
    </div>
  );
}
