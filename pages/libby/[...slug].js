import { useEffect } from "react";
import { useRouter } from "next/router";

import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import Loader from "@/components/global/Loader";

const LibbyPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return;

    const id = Array.isArray(slug) ? slug[slug.length - 1] : slug;

    fetch(`/api/external/libby?id=${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.title) {
          router.replace(
            `/search/${encodeURIComponent(data.title)}?type=books`,
          );
        }
      });
  }, [slug, router]);

  return (
    <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen">
      <Header />
      <Loader other={true} />
      <Footer />
    </div>
  );
};

export default LibbyPage;
