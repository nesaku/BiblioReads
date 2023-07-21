import React from "react";
import Meta from "../components/global/Meta";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import ContactForm from "../components/contactpage/ContactForm";
import ContactHero from "../components/contactpage/ContactHero";

const Contact = () => {
  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage h-full">
      <Meta title={"Contact"} />
      <Header />
      <ContactHero />
      {process.env.NEXT_PUBLIC_DISABLE_CONTACT_FORM != "true" ? (
        <ContactForm />
      ) : (
        <div className="h-screen"></div>
      )}

      <Footer />
    </div>
  );
};

export default Contact;
