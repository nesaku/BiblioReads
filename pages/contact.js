import React from "react";
import Meta from "../components/global/Meta";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import ContactForm from "../components/contactpage/ContactForm";
import ContactHero from "../components/contactpage/ContactHero";
import { env } from "next-runtime-env";

const Contact = () => {
  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage h-full">
      <Meta title={"Contact"} />
      <Header />
      <ContactHero />
      {env("NEXT_PUBLIC_ENABLE_CONTACT_FORM") == "true" && <ContactForm />}

      <Footer />
    </div>
  );
};

export default Contact;
