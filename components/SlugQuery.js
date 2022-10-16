import { useState } from "react";
import styles from "../styles/Home.module.css";
import ResultData from "./ResultData";
import LoadingSpinner from "./LoadingSpinner";

const SlugQuery = ({ path }) => {
  const [scrapedData, setscrapedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isQuery, setIsQuery] = useState(true);

  {
    /* When the button is clicked/submitted send a fetch request to the scraper API*/
  }

  const handleClick = async () => {
    setIsLoading(true);

    /* Send the fetch request to scraperSlug API */
    fetch("/api/scraperSlug", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ queryURL: path }),
    })
      .then((res) => res.json())
      .then((userData) => {
        setscrapedData(userData);
        setIsLoading(false);
        setIsQuery(false);
      });
  };

  return (
    <div>
      <main className={styles.main}>
        <h1>BiblioReads</h1>
        <h3>Get Info About A GoodReads Book:</h3>
        <div name="Query Slug">
          <code>{`https://www.goodreads.com/book/show/${path}`}</code>
          <br />
          <button onClick={handleClick}>Fetch Data</button>
        </div>

        {/* Show the loading spinner when the page is loading*/}
        {isLoading && <LoadingSpinner />}

        <div className={styles.error}>
          <p>{scrapedData.error}</p>
        </div>
        {/* If there is no query don't show the results component */}
        <section className={isQuery ? styles.hidden : styles.visible}>
          <ResultData scrapedData={scrapedData} />
        </section>
      </main>
    </div>
  );
};

export default SlugQuery;
