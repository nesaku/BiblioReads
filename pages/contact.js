import React from "react";
import Meta from "../components/global-components/Meta";
import Header from "../components/global-components/Header";
import Footer from "../components/global-components/Footer";
import ContactForm from "../components/contactpage-components/ContactForm";
import ContactHero from "../components/contactpage-components/ContactHero";

const contact = () => {
  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage h-full">
      <Meta text={"Contact"} />
      <Header />
      <ContactHero />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default contact;
