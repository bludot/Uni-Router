import React from "react";

const ErrorComp = ({ error }) => {
  console.error(error);
  return (
    <h1>
      {error.code}
      {error.message}
    </h1>
  );
};

export default ErrorComp;
