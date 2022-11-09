import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Meta from "../components/Meta";
import PrivacyContent from "../components/privacypage-components/PrivacyContent";

const privacy = () => {
  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage h-full">
      <Meta text={"Privacy"} />
      <Header />
      <PrivacyContent />
      <Footer />
    </div>
  );
};

export default privacy;
