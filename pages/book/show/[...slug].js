import React from "react";
import { useRouter } from "next/router";
import SlugQuery from "../../../components/SlugQuery";

const Slug = () => {
  /* Take the slug from the URL and pass it to the SlugQuery component */
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <SlugQuery path={`${slug}`} />
    </div>
  );
};

export default Slug;
