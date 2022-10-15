import { useState } from "react";

import styles from "../styles/Home.module.css";
import ResultData from "./ResultData";
import LoadingSpinner from "./LoadingSpinner";

const Homepage = ({ path }) => {
  const [inputValue, setInputValue] = useState("");
  const [scrapedData, setscrapedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isQuery, setIsQuery] = useState(true);

  {/* When the button or form is clicked/submitted send a fetch request to the scraper API*/}

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
  
  const handleClick = async () => {
    setIsLoading(true);

    fetch("/api/scraper", {
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
      {/* Show the button if the query path is used & hide when there is no query path*/}
        <div
          name="Query Path"
          className={path ? styles.visible : styles.hidden}
        >
          <code>{path}</code>
          <br />
          <button onClick={handleClick}>Fetch Data</button>
        </div>

        {/* Hide the input form if the query path is used & show when there is no query path*/}
        <div
          name="Query Form"
          className={path ? styles.hidden : styles.visible}
        >
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

export default Homepage;

