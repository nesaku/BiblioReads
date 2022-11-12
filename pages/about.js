import React from "react";
import Meta from "../components/global-components/Meta";
import Header from "../components/global-components/Header";
import Footer from "../components/global-components/Footer";
import AboutHero from "../components/aboutpage-components/AboutHero";
import Divider from "../components/aboutpage-components/Divider";
import FAQ from "../components/aboutpage-components/FAQ";
import Features from "../components/aboutpage-components/Features";
import Stats from "../components/aboutpage-components/Stats";

const about = () => {
  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage h-full">
      <Meta text={"About"} />
      <Header />
      <AboutHero />
      <Divider />
      <Features />
      <Divider />
      <Stats />
      <Divider />
      <FAQ />
      <Footer />
    </div>
  );
};

export default about;
