import React from "react";
import FormQuery from "../components/FormQuery";
import Header from "../components/global-components/Header";

const Home = () => {
  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradienthero min-h-screen flex flex-col">
      <Header />
      {/* HomePage (Form Query Page) */}
      <FormQuery />
    </div>
  );
};

export default Home;
