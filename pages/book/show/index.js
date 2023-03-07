import Error from "next/error";
import React from "react";

const Books = () => {
  return (
    <div>
      <Error statusCode={405} />
    </div>
  );
};

export default Books;
