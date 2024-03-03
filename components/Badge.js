import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="inline-flex shrink-0 items-center rounded uppercase px-2 py-1 bg-rose-900">
      <span className="text-white font-bold text-xs">{text}</span>
    </div>
  );
};

export default Badge;
