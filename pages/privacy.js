import React from "react";
import Link from "next/link";
import Meta from "../components/global-components/Meta";
import Header from "../components/global-components/Header";
import Footer from "../components/global-components/Footer";

const Privacy = () => {
  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage h-full">
      <Meta title={"Privacy"} />

      <Header />
      <div className="mx-auto max-w-screen-xl px-4 py-20 lg:flex lg:mt-20">
        <div className="mx-auto max-w-3xl text-center text-gray-900 dark:text-white ">
          <h1 className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-7xl p-2 capitalize">
            Privacy Policy
          </h1>
          <div className="text-left mt-10">
            <p className="mx-auto text-lg mt-12">
              Last updated: December 23, 2022
            </p>
            <p className="mx-auto text-lg mt-12">
              At BiblioReads, we believe that privacy is a fundamental right and
              strive to be as transparent as possible about how we use your
              information. We will not sell, lease, or exchange your personal
              data to, or otherwise share your personal data with, third parties
              in ways other than described in this Privacy Policy.
            </p>
            <p className="mx-auto text-lg mt-12">
              BiblioReads (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;)
              operates
              {process.env.NEXT_PUBLIC_HOST_URL ? (
                <span>
                  {" "}
                  the{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={
                      process.env.NEXT_PUBLIC_HOST_URL ||
                      "http://localhost:3000"
                    }
                  >
                    <span className="underline">
                      {process.env.NEXT_PUBLIC_HOST_URL ||
                        "http://localhost:3000"}
                    </span>
                  </a>{" "}
                </span>
              ) : (
                <span> this </span>
              )}
              website.
            </p>
            <h2 className="text-2xl font-bold my-12 underline">
              General Data Protection Regulation (GDPR)
            </h2>
            <p className="mx-auto text-lg mt-12">
              We are a Data Controller of your information.
            </p>

            <p className="mx-auto text-lg mt-12">
              BiblioReads legal basis for collecting and using the personal
              information described in this Privacy Policy depends on the
              Personal Information we collect and the specific context in which
              we collect the information:
            </p>
            <ul className="list-disc ml-20 mt-8">
              <li>BiblioReads needs to perform a contract with you</li>
              <li>You have given BiblioReads permission to do so</li>
              <li>
                Processing your personal information is in BiblioReads
                legitimate interests
              </li>
              <li>BiblioReads needs to comply with the law</li>
            </ul>

            <p className="mx-auto text-lg mt-12">
              BiblioReads will retain your personal information only for as long
              as is necessary for the purposes set out in this Privacy Policy.
              We will retain and use your information to the extent necessary to
              comply with our legal obligations, resolve disputes, and enforce
              our policies.
            </p>

            <p className="mx-auto text-lg mt-12">
              If you are a resident of the European Economic Area (EEA), you
              have certain data protection rights. If you wish to be informed
              about what Personal Information we hold about you and if you want
              it to be removed from our systems, please contact us.
            </p>
            <p className="mx-auto text-lg mt-12">
              In certain circumstances, you have the following data protection
              rights:
            </p>
            <ul className="list-disc ml-20 mt-8">
              <li>
                The right to access, update, or delete the information we have
                on you.
              </li>
              <li>The right of rectification.</li>
              <li>The right to object.</li>
              <li>The right of restriction.</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>

            <h2 className="text-2xl font-bold my-12 underline">
              Information Collected:
            </h2>

            <p className="mx-auto text-lg mt-12">
              BiblioReads does not use analytics, third-party cookies or ad
              trackers on our website. Cache Storage and a service worker are
              used to enable progressive web app (PWA) support. We use local
              storage to remember your theme preferences, you may erase local
              storage by deleting your browser history. We do not use cookies or
              local storage objects for any other purpose. Our hosting provider
              may keep logs and collect information such as IP addresses.
            </p>
            <p className="mx-auto text-lg mt-12">
              Information voluntarily provided to BiblioReads will be recorded,
              such as contact information when the contact form is used. This
              information will be solely used to receive and respond to
              questions or comments. This information will be kept until the
              purpose for which it was collected is met.
            </p>
            <h2 className="text-2xl font-bold my-12 underline">
              Third Party Privacy Policies
            </h2>

            <p className="mx-auto text-lg mt-12">
              BiblioReads&apos;s Privacy Policy does not apply to other
              third-party websites and/or services. Thus, we are advising you to
              consult the respective privacy policies of these third-party ad
              servers for more detailed information.
            </p>
            <p className="mx-auto text-lg mt-12">
              We have no control over, and assume no responsibility, for the
              content, privacy policies or practices of any third party sites or
              services.
            </p>
            <h2 className="text-2xl font-bold my-12 underline">
              Children&apos;s Information
            </h2>

            <p className="mx-auto text-lg mt-12">
              BiblioReads does not knowingly collect any Personal Identifiable
              Information from children under the age of 13. If you think that
              your child provided this kind of information on our website, we
              strongly encourage you to contact us immediately and we will do
              our best to promptly remove such information from our records.
            </p>

            <h2 className="text-2xl font-bold my-12 underline">
              Contacting Us
            </h2>

            <p className="mx-auto text-lg mt-12">
              If you have additional questions or require more information about
              our Privacy Policy, do not hesitate to contact us. You may contact
              us by creating an{" "}
              <a
                className="underline"
                target="_blank"
                rel="noreferrer"
                href="https://github.com/nesaku/BiblioReads/issues"
              >
                issue
              </a>{" "}
              or by using the form on our{" "}
              <Link href="/contact">
                <a className="underline">contact page</a>
              </Link>
              .
            </p>

            <h2 className="text-2xl font-bold my-12 underline">Consent</h2>
            <p className="mx-auto text-lg mt-12">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
            <p className="mx-auto text-lg mt-12">
              By using our website, you hereby consent to our Privacy Policy and
              agree to its terms.{" "}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
