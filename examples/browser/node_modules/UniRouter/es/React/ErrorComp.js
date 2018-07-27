import React from "react";

var ErrorComp = function ErrorComp(_ref) {
  var error = _ref.error;

  console.error(error);
  return React.createElement(
    "h1",
    null,
    error.code,
    error.message
  );
};

export default ErrorComp;