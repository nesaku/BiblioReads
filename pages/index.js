import React from "react";
import FormQuery from "../components/FormQuery";
import Footer from "../components/global-components/Footer";
import Header from "../components/global-components/Header";
import Meta from "../components/global-components/Meta";

const Home = () => {
  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradienthero">
      <Meta />
      <Header />
      <FormQuery />
      <Footer />
    </div>
  );
};

export default Home;
