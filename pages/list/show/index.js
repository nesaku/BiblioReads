import Error from "next/error";
import React from "react";

const Lists = () => {
  return (
    <div>
      <Error statusCode={405} />
    </div>
  );
};

export default Lists;
