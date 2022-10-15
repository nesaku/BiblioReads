import React from "react";
import { useRouter } from 'next/router';

import styles from "../styles/Home.module.css";
import Meta from "../components/Meta";
import Homepage from "../components/Homepage";


const Home = () => {

  /* Use the query path if present in URL */
  const router = useRouter();
  const { path } = router.query;
  
  return (
    <div className={styles.container}>
    <Meta />
    {/* Pass the query path to the Homepage component*/}
    <Homepage path={path}/>
   </div>
  )
}

export default Home;