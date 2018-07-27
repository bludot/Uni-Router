import React, { Component } from "react";
import history from "../history";
import ErrorComp from "./ErrorComp";
import extendComponent from "./ExtendComponent";
import BaseRouter from "../BaseRouter";

var aggregation = (baseClass, ...mixins) => {
  class base extends baseClass {
    constructor(...args) {
      super(...args);
      mixins.forEach(mixin => {
        copyProps(this, new mixin());
      });
    }
  }
  let copyProps = (target, source) => {
    // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach(prop => {
        if (
          !prop.match(
            /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
          )
        )
          Object.defineProperty(
            target,
            prop,
            Object.getOwnPropertyDescriptor(source, prop)
          );
      });
  };
  mixins.forEach(mixin => {
    // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};

/**
 * RouterBase is just the router that decides what to show.
 */
class RouterBase extends aggregation(BaseRouter, Component) {
  constructor(props) {
    super(props.config);
    this.state = {
      component: null,
      location: history.location,
      loaded: false,
      middleware: () => {
        return Promise.resolve();
      }
    };
    this.middleware = this.middleware.bind(this);
    this.init = this.init.bind(this);
  }
  getRoute() {
    return new Promise((resolve, reject) => {
      resolve(this.route(history.location.pathname));
    });
  }

  /**
   * Our middleware which runs before we render anything
   *
   * TODO:  find a better way to do this. Maybe make the
   *        router totally out?
   */

  /**
   * If the component has changed then run the middleware
   * (might not need this)
   */
  shouldComponentUpdate(nextProps, nextState) {
    const update = nextState !== this.state;
    console.log(nextState.location.pathname, this.state.location.pathname);
    if (update) {
      console.log("should update?", update);

      return true;
    }
    return false;
  }

  middleware() {
    console.log("middleware: ", this.state.middleware);
    return this.state
      .middleware(history, history.location, () => {})
      .then((...args) => {
        this.setState({
          loaded: true
        });
      })
      .catch(err => {
        const component = extendComponent(<ErrorComp error={err} />);
        this.setState({
          component: component,
          loaded: true
        });
      });
  }
  init() {
    return this.getRoute().then(route => {
      console.log("theroute", route);
      if (route instanceof Error) {
        console.log("instanceOf");
        this.setState({
          component: extendComponent(<ErrorComp error={route} />),
          middleware: () => {
            return Promise.resolve();
          }
        });
      } else {
        this.setState({
          component: extendComponent(route.component),
          middleware: route.middleware
        });
      }
      /**
       * Initialize the history so that we have every component use
       * it to update
       */
      // history.init(extendComponent, config, this.setState);
      history.init(location => {
        console.log("will change?");
        this.getRoute().then(route => {
          this.middleware().then(() => {
            if (route instanceof Error) {
              this.setState({
                location: location,
                component: extendComponent(<ErrorComp error={route} />),
                middleware: () => {
                  return Promise.resolve();
                }
              });
            } else {
              this.setState({
                location: location,
                component: extendComponent(route.component),
                middleware: route.middleware
              });
            }
          });
        });
      });
    });
  }
  /**
   * Component is mounted but middleware not done,
   * lets run middleware and set it to loaded
   */
  componentDidMount() {
    console.log("running more than once?");
    this.init().then(this.middleware);
  }

  /**
   * if loaded, show component, else nothing
   */
  render() {
    const props = {
      location: history.location
    };
    return this.state.loaded ? <this.state.component {...props} /> : null;
  }
}

export default RouterBase;
