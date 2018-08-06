import React from "react";
import RouteHistory from "../history";

/**
 * Extend the component cuase it could be a stateless one.
 * We add the shoudlComponentUpdate so that we dont rerender
 * when we dont have to (same component but different props?)
 */
const extendComponent = (Component_, middleware) => {
  // return a new reactComponent from a stateless one
  class NewComp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    shouldComponentUpdate(nextProps, nextState) {
      const update = nextProps !== this.props && nextState !== this.state;
      if (update) {
        return true;
      } else {
        return false;
      }
    }
    render() {
      const props = {
        ...this.props,
        ...Component_.props,
        location: RouteHistory.location,
        query: RouteHistory.location.query
      };
      return Component_.isReactComponent ? (
        <Component_ {...props} />
      ) : (
        React.cloneElement(Component_, props)
      );
    }
  }
  return NewComp;
};

export default extendComponent;
