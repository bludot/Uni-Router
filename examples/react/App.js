import React from "react";
import { history } from "./Router";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    {/* <Hello name="CodeSandbox" /> */}
    <span>Hello</span>
    <h2>Start editing to see some magic happen {"\u2728"}</h2>
    <button
      onClick={() => {
        history.push("/hello", null);
      }}
    >
      Click here
    </button>
  </div>
);

export default App;
