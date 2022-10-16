import React from "react";

import styles from "../styles/Home.module.css";
import Meta from "../components/Meta";
import FormQuery from "../components/FormQuery";

const Home = () => {
  return (
    <div className={styles.container}>
      <Meta />
      <FormQuery />
    </div>
  );
};

export default Home;
