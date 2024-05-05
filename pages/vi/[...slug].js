import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ErrorMessage from "../../components/global/ErrorMessage";
import Footer from "../../components/global/Footer";
import Header from "../../components/global/Header";
import Meta from "../../components/global/Meta";

// SSR redirect /vi/{path} to /vi/{path}
export async function getServerSideProps(context) {
  const { resolvedUrl } = context;
  if (resolvedUrl) {
    return {
      redirect: {
        destination: resolvedUrl.replace("/vi", ""),
        permanent: false,
      },
    };
  }

  return { props: {} };
}

// Show an error message if the redirect failed
const Redirect = () => {
  const [originalURL, setOriginalURL] = useState();
  const router = useRouter();

  useEffect(() => {
    setOriginalURL(`https://goodreads.com${router.asPath}`);
  }, [router.asPath]);

  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen">
      <Meta title={"Redirecting Error"} />
      <Header />
      <div className="flex justify-center items-center text-center">
        <ErrorMessage status="500" url={originalURL} />
      </div>
      <Footer />
    </div>
  );
};

export default Redirect;
