import React from "react";
import styles from "../styles/Home.module.css";

// Used "const ResultData = ({ scrapedData })" instead of "const ResultData = (props.scrapedData) for readability
const ResultData = ({ scrapedData }) => {
  return (
    <div>
      <div className={styles.cover}>
        <h1>Cover:</h1>
        {/* Load WebP Image With JPG Fallback & 404 Not Found Image*/}
        <picture>
          <source
            srcSet={`https://images.weserv.nl/?url=${scrapedData.cover}&default=${process.env.NEXT_PUBLIC_HOST_URL}/cover-placeholder.svg&output=webp&maxage=30d`}
            type="image/webp"
          />
          <source
            srcSet={`https://images.weserv.nl/?url=${scrapedData.cover}&default=${process.env.NEXT_PUBLIC_HOST_URL}/cover-placeholder.svg&maxage=30d`}
            type="image/jpeg"
          />
          <img
            src={`https://images.weserv.nl/?url=${scrapedData.cover}&default=${process.env.NEXT_PUBLIC_HOST_URL}/cover-placeholder.svg&maxage=30d`}
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
    </div>
  );
};

export default ResultData;
