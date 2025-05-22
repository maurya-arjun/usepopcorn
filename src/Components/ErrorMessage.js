import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <p className="text-red-500 text-center text-xl">
      {" "}
      <span>☹️</span> {message}{" "}
    </p>
  );
};

export default ErrorMessage;
