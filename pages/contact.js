import React from "react";
import ContactForm from "../components/contactpage-components/ContactForm";
import ContactHero from "../components/contactpage-components/ContactHero";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Meta from "../components/Meta";

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
