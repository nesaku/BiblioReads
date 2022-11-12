import React from "react";
import Meta from "../components/global-components/Meta";
import Header from "../components/global-components/Header";
import Footer from "../components/global-components/Footer";
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
