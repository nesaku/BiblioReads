import React from "react";
import Link from "next/link";
import Meta from "../components/global/Meta";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

// Show the default privacy policy unless instance privacy info is configured
const Privacy = () => {
  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage h-full">
      <Meta title={"Privacy"} />
      <Header />

      {process.env.NEXT_PUBLIC_INSTANCE_CUSTOM_PRIVACY != "true" ? (
        // Default privacy policy
        <div className="mx-auto max-w-screen-xl px-4 py-20 lg:flex lg:mt-20">
          <div className="mx-auto max-w-3xl text-center text-gray-900 dark:text-white ">
            <h1 className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-7xl p-2 capitalize">
              Privacy Policy
            </h1>
            <div className="text-left mt-10">
              <p className="mx-auto text-lg mt-12">
                Last updated: June 30, 2023
              </p>
              <p className="mx-auto text-lg mt-12">
                At BiblioReads, we believe that privacy is a fundamental right
                and strive to be as transparent as possible about how we use
                your information. We will not sell, lease, or exchange your
                personal data to, or otherwise share your personal data with,
                third parties in ways other than described in this Privacy
                Policy.
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
                Personal Information we collect and the specific context in
                which we collect the information:
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
                BiblioReads will retain your personal information only for as
                long as is necessary for the purposes set out in this Privacy
                Policy. We will retain and use your information to the extent
                necessary to comply with our legal obligations, resolve
                disputes, and enforce our policies.
              </p>

              <p className="mx-auto text-lg mt-12">
                If you are a resident of the European Economic Area (EEA), you
                have certain data protection rights. If you wish to be informed
                about what Personal Information we hold about you and if you
                want it to be removed from our systems, please contact us.
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
                storage by deleting your browser history. We do not use cookies
                or local storage objects for any other purpose. Our hosting
                provider may keep logs and collect information such as IP
                addresses.
              </p>
              <p className="mx-auto text-lg mt-12">
                Information voluntarily provided to BiblioReads will be
                recorded, such as contact information when the contact form is
                used. This information will be solely used to receive and
                respond to questions or comments. This information will be kept
                until the purpose for which it was collected is met.
              </p>
              <h2 className="text-2xl font-bold my-12 underline">
                Third-Party Privacy Policies
              </h2>

              <p className="mx-auto text-lg mt-12">
                BiblioReads&apos;s Privacy Policy does not apply to other
                third-party websites and/or services. Thus, we are advising you
                to consult the respective privacy policies of these third-party
                ad servers for more detailed information.
              </p>
              <p className="mx-auto text-lg mt-12">
                We have no control over and assume no responsibility, for the
                content, privacy policies or practices of any third-party sites
                or services.
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
                If you have additional questions or require more information
                about our Privacy Policy, do not hesitate to contact us. You may
                contact us by creating an issue on{" "}
                <a
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/nesaku/BiblioReads/issues"
                >
                  GitHub
                </a>{" "}
                or{" "}
                <a
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                  href="https://codeberg.org/nesaku/BiblioReads/issues"
                >
                  Codeberg
                </a>
                . Alternatively, you can use the form on our{" "}
                <Link href="/contact">
                  <a className="underline">contact page</a>
                </Link>
                .
              </p>

              <h2 className="text-2xl font-bold my-12 underline">Consent</h2>
              <p className="mx-auto text-lg mt-12">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page. You are advised to review this Privacy Policy
                periodically for any changes. Changes to this Privacy Policy are
                effective when they are posted on this page.
              </p>
              <p className="mx-auto text-lg mt-12">
                By using our website, you hereby consent to our Privacy Policy
                and agree to its terms.{" "}
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Instance privacy configuration
        <div className="flex justify-center items-center text-center min-h-[80vh]">
          <div className="flex flex-col text-gray-800 dark:text-gray-100 bg-white bg-opacity-60 dark:bg-slate-800 dark:bg-opacity-60 py-6 m-4 px-4 sm:px-12 my-[10vh] rounded-2xl max-w-lg items-center">
            <svg
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 1000 1000"
              width="72px"
              height="72px"
              className="fill-gray-900 dark:fill-gray-200"
            >
              <g>
                <path d="M500,296.4c-191.2,0-346.8,155.6-346.8,346.8S308.8,990,500,990c191.2,0,346.8-155.6,346.8-346.8S691.2,296.4,500,296.4z M500,912.9c-148.7,0-269.7-121-269.7-269.7s121-269.7,269.7-269.7c148.7,0,269.7,121,269.7,269.7S648.7,912.9,500,912.9z" />
                <path d="M458.9,527.6h82.2v231.2h-82.2V527.6L458.9,527.6z" />
                <path d="M374.1,192.4c0-58.1,47.2-105.3,105.2-105.3h41.3c58,0,105.2,47.2,105.2,105.3v90.3h77.1v-90.3C702.9,91.8,621.2,10,520.7,10h-41.3c-100.5,0-182.3,81.8-182.3,182.4v90.3h77.1V192.4z" />
              </g>
            </svg>
            <h1 className="text-2xl font-bold my-4">Instance Privacy:</h1>
            <div>
              <p>
                The instance operator has indicated their instance&apos;s
                privacy practices below.
                {process.env.NEXT_PUBLIC_INSTANCE_PRIVACY_POLICY_URL &&
                  process.env.NEXT_PUBLIC_INSTANCE_PRIVACY_POLICY_URL !=
                    "false" && (
                    <span>
                      {" "}
                      For more information, see the instance operator&apos;s{" "}
                      <a
                        href={
                          process.env.NEXT_PUBLIC_INSTANCE_PRIVACY_POLICY_URL
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold hover:underline"
                      >
                        privacy policy.
                      </a>
                    </span>
                  )}
              </p>
            </div>
            <div className="mt-4 capitalize">
              <ul>
                {process.env.NEXT_PUBLIC_INSTANCE_LOG_RETENTION && (
                  <li className="py-2">
                    <span className="font-bold">Log Retention</span> -{" "}
                    {process.env.NEXT_PUBLIC_INSTANCE_LOG_RETENTION}
                  </li>
                )}
                {process.env.NEXT_PUBLIC_INSTANCE_IP_DATA === "true" && (
                  <li className="py-2">
                    <span className="font-bold">IP Addresses</span> - Internet
                    Protocol addresses are collected
                  </li>
                )}
                {process.env.NEXT_PUBLIC_INSTANCE_PAGE_VIEW_DATA === "true" && (
                  <li className="py-2">
                    <span className="font-bold">Pages Viewed</span> -
                    page/Request URLs are collected
                  </li>
                )}{" "}
                {process.env.NEXT_PUBLIC_INSTANCE_PAGE_VIEW_DATA === "true" && (
                  <li className="py-2">
                    <span className="font-bold">Device Type</span> - user agent
                    data is collected
                  </li>
                )}
                {process.env.NEXT_PUBLIC_INSTANCE_PAGE_VIEW_DATA === "true" && (
                  <li className="py-2">
                    <span className="font-bold">Diagnostic Data</span> -
                    diagnostic data is collected
                  </li>
                )}
                {process.env.NEXT_PUBLIC_INSTANCE_OTHER_DATA && (
                  <li className="py-2">
                    <span className="font-bold">Other Data</span> -{" "}
                    {process.env.NEXT_PUBLIC_INSTANCE_OTHER_DATA}
                  </li>
                )}
              </ul>
            </div>
            {/* Instance information section */}
            {process.env.NEXT_PUBLIC_INSTANCE_OPERATOR_NAME &&
              process.env.NEXT_PUBLIC_INSTANCE_PROVIDER && (
                <details className="group mt-8 p-4 bg-gray-300/40 dark:bg-gray-700/30 border-2 border-gray-300 dark:border-gray-600 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between">
                    <h2 className="font-semibold capitalize">
                      Instance information:
                    </h2>

                    <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 opacity-100 group-open:opacity-0"
                        fill="#E2E8F0"
                        viewBox="0 0 24 24"
                        stroke="black"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 opacity-0 group-open:opacity-100"
                        fill="#E2E8F0"
                        viewBox="0 0 24 24"
                        stroke="black"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-left leading-relaxed text-gray-800 dark:text-gray-200">
                    <span className="underline capitalize">
                      Instance Operator:
                    </span>
                    <br />
                    {process.env.NEXT_PUBLIC_INSTANCE_OPERATOR_NAME && (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={process.env.NEXT_PUBLIC_INSTANCE_OPERATOR_LINK}
                      >
                        {process.env.NEXT_PUBLIC_INSTANCE_OPERATOR_LINK ? (
                          <span className="hover:underline">
                            {process.env.NEXT_PUBLIC_INSTANCE_OPERATOR_NAME}
                          </span>
                        ) : (
                          <span>
                            {process.env.NEXT_PUBLIC_INSTANCE_OPERATOR_NAME}
                          </span>
                        )}
                      </a>
                    )}
                  </p>
                  <p className="mt-4 text-left leading-relaxed text-gray-800 dark:text-gray-200">
                    <span className="underline capitalize">Country:</span>
                    <br />
                    {process.env.NEXT_PUBLIC_INSTANCE_COUNTRY && (
                      <span>{process.env.NEXT_PUBLIC_INSTANCE_COUNTRY}</span>
                    )}
                  </p>
                  <p className="mt-4 text-left leading-relaxed text-gray-800 dark:text-gray-200">
                    <span className="underline capitalize">
                      Hosting Provider:
                    </span>
                    <br />
                    {process.env.NEXT_PUBLIC_INSTANCE_PROVIDER && (
                      <span>{process.env.NEXT_PUBLIC_INSTANCE_PROVIDER}</span>
                    )}
                  </p>
                  <p className="mt-4 text-left leading-relaxed text-gray-800 dark:text-gray-200">
                    <span className="underline capitalize">
                      Uses Cloudflare?
                    </span>
                    <br />
                    {process.env.NEXT_PUBLIC_INSTANCE_CLOUDFLARE === "true" ? (
                      <span>Yes</span>
                    ) : (
                      <span>No</span>
                    )}
                  </p>
                </details>
              )}
            {/* What does this mean section */}
            <details className="group mt-8 p-4 bg-gray-300/40 dark:bg-gray-700/30 border-2 border-gray-300 dark:border-gray-600 rounded-lg">
              <summary className="flex cursor-pointer items-center justify-between">
                <h2 className="font-semibold capitalize">
                  What does this mean?
                </h2>

                <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 opacity-100 group-open:opacity-0"
                    fill="#E2E8F0"
                    viewBox="0 0 24 24"
                    stroke="black"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 opacity-0 group-open:opacity-100"
                    fill="#E2E8F0"
                    viewBox="0 0 24 24"
                    stroke="black"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-left leading-relaxed text-gray-800 dark:text-gray-200">
                <span className="underline capitalize">
                  Log Information Retention
                </span>
                <br />
                How long log information is kept for.
              </p>
              <p className="mt-4 text-left leading-relaxed text-gray-800 dark:text-gray-200">
                <span className="underline">IP Addresses</span>
                <br />
                IP Addresses are a unique address that identifies a device on
                the internet. This can be used to identify a user&apos;s general
                location and internet service provider (ISP).
              </p>
              <p className="mt-4 text-left leading-relaxed text-gray-800 dark:text-gray-200">
                <span className="underline">Pages Viewed</span>
                <br />
                Page/request URLs are pages that a user visits, this includes
                the URLs of specific books.
              </p>
              <p className="mt-4 text-left leading-relaxed text-gray-800 dark:text-gray-200">
                <span className="underline">Device Type</span>
                <br />A user agent string can contain information about a
                user&apos;s operating system, device, and browser.
              </p>
              <p className="mt-4 text-left leading-relaxed text-gray-800 dark:text-gray-200">
                <span className="underline">Diagnostic Data </span>
                <br />
                Data that is only collected when an error occurs or temporarily
                collected to assist in identifying and fixing issues.
              </p>
              <p className="mt-4 text-left leading-relaxed text-gray-800 dark:text-gray-200">
                <span className="underline">Other Data </span>
                <br />
                Other data that this instance collects.
              </p>
            </details>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Privacy;
