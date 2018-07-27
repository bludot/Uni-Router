import React from "react";

class Test extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>This is a tess: {JSON.stringify(this.props.query)}</h1>;
  }
}

export default Test;
