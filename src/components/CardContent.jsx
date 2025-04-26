import React from "react";

const CardContent = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      {children}
    </div>
  );
};

export default CardContent;
