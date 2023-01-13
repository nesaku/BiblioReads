import React, { useState } from "react";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p id="text">
      {isReadMore ? text.slice(0, 600) : text}
      <span
        onClick={toggleReadMore}
        className="p-0.5 rounded-sm underline decoration-2 decoration-rose-800 hover:text-white hover:bg-rose-800 transition duration-150 delay-150 hover:delay-100 cursor-pointer"
      >
        {isReadMore ? " ...read more." : "(Show less)"}
      </span>
    </p>
  );
};

export default ReadMore;
