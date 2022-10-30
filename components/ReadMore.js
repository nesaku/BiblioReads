import React, { useState } from "react";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 600) : text}
      <span
        onClick={toggleReadMore}
        className="p-0.5 rounded-sm underline decoration-2 decoration-rose-600 hover:text-white hover:bg-rose-600 transition duration-150 delay-150 hover:delay-100"
      >
        {isReadMore ? " ...read more." : "(Show less)"}
      </span>
    </p>
  );
};

export default ReadMore;
