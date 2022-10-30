import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PrivacyHero from "../components/privacypage-components/PrivacyHero";

const privacy = () => {
  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage h-full">
      <Header />
      {/* Title */}
      <PrivacyHero />
      <Footer />
    </div>
  );
};

export default privacy;
