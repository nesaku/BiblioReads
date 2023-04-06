import React from "react";
import Meta from "../components/global/Meta";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import AboutHero from "../components/aboutpage/AboutHero";
import Divider from "../components/aboutpage/Divider";
import FAQ from "../components/aboutpage/FAQ";
import Features from "../components/aboutpage/Features";
import Stats from "../components/aboutpage/Stats";

const About = () => {
  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage h-full">
      <Meta title={"About"} />
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

export default About;
