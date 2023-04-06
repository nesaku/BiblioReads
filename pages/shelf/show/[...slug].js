import { useRouter } from "next/router";
import Header from "../../../components/global/Header";
import Footer from "../../../components/global/Footer";
import UnsupportedRoute from "../../../components/global/UnsupportedRoute";

const Slug = () => {
  const router = useRouter();
  return (
    <div>
      <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen">
        <Header />
        <UnsupportedRoute url={`https://www.goodreads.com${router.asPath}`} />
        <Footer />
      </div>
    </div>
  );
};

export default Slug;
