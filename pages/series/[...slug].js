import { useRouter } from "next/router";
import Header from "../../components/global-components/Header";
import Footer from "../../components/global-components/Footer";
import UnsupportedRoute from "../../components/global-components/UnsupportedRoute";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen">
        <Header />
        <UnsupportedRoute url={`https://www.goodreads.com/series/${slug}`} />
        <Footer />
      </div>
    </div>
  );
};

export default Slug;
