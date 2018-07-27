import React from "react";
import PropTypes from "prop-types";
import { history } from "./Router";

class Hello extends React.Component {
  constructor(props) {
    super(props);
    console.log("i am this", this);
  }
  componentWillUnmount() {
    console.log("i am leaving");
  }

  componentDidUpdate() {
    console.log("i updated!");
  }
  render() {
    return (
      <div>
        <h1>Hello {name}!</h1>
        <button
          onClick={() => {
            history.push("/hello2/variable", null);
          }}
        >
          Click here
        </button>
      </div>
    );
  }
}

export default Hello;
