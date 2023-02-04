import React from "react";
import Head from "next/head";

const Meta = (props) => {
  const title = `BiblioReads ${props.title ? `- ${props.title}` : ""}  `;
  const description = `${
    props.desc
      ? `${props.desc}`
      : "BiblioReads is a free and open source alternative Goodreads front-end focused on privacy."
  }`;
  const descriptionOG = `${
    props.desc
      ? `${props.desc}`
      : "BiblioReads - An Alternative Private Goodreads Front-End"
  }`;
  const coverIMG = props.coverIMG;
  const version = "Version: 2.0.4 (Oreki)";

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
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
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#121212" />
      <link rel="manifest" href="/manifest.webmanifest" />
      {coverIMG && <link rel="preload" href={coverIMG} as="image" />}
      <meta name="msapplication-TileColor" content="#121212" />
      <meta name="theme-color" content="#881337" />
      <meta property="og:title" content="BiblioReads" />
      <meta property="og:description" content={descriptionOG} />
      <meta property="og:site_name" content="BiblioReads" />
      <meta property="og:type" content="website" />
      {process.env.NEXT_PUBLIC_HOST_URL && (
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_HOST_URL}/social.png`}
        />
      )}
      {console.log(`%c${version}`, `color:green`)};
    </Head>
  );
};

export default Meta;
