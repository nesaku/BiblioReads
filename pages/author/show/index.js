import Error from "next/error";
import React from "react";

const SlugHome = () => {
  return (
    <div>
      <Error statusCode={405} />
    </div>
  );
};

export default SlugHome;
