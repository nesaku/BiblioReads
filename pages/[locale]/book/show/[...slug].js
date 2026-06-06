import { useEffect } from "react";
import { useRouter } from "next/router";

const LocaleRedirect = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      router.replace(`/book/show/${slug.join("/")}`);
    }
  }, [slug]);

  return null;
};

export default LocaleRedirect;
