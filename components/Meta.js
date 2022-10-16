import React from "react";
import Head from "next/head";

const Meta = () => {
  return (
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
      <meta name="theme-color" content="#c026d3" />
      <meta property="og:title" content="BiblioReads" />
      <meta
        property="og:description"
        content="BiblioReads - An Alternative Private Goodreads Front-End"
      />
      <meta property="og:site_name" content="BiblioReads" />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_HOST_URL}/logo.png`}
      />
    </Head>
  );
};

export default Meta;
