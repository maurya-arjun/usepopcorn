import React from "react";

const Main = ({ children }) => {
  return (
    <div className="main" style={{ display: "flex" }}>
      {children}
    </div>
  );
};

export default Main;
