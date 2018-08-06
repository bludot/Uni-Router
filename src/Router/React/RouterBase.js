import React from "react";
import RouteHistory from "../history";
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
class RouterBase extends aggregation(BaseRouter, React.Component) {
  constructor(props) {
    super(props.config);
    this.state = {
      component: null,
      location: RouteHistory.location,
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
      resolve(this.route(RouteHistory.location.pathname));
    });
  }

  /**
   * Our middleware which runs before we render anything
   *
   * TODO:  find a better way to do this. Maybe make the
   *        router totally out?
   */

  middleware() {
    return this.state
      .middleware(RouteHistory, RouteHistory.location, () => {})
      .then((...args) => {
        this.setState({
          loaded: true
        });
      });
  }
  init() {
    return this.getRoute().then(route => {
      if (route instanceof Error) {
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
       * Initialize the RouteHistory so that we have every component use
       * it to update
       */
      // RouteHistory.init(extendComponent, config, this.setState);
      return RouteHistory.init(location => {
        this.getRoute().then(route => {
          this.setState({
            middleware: route.middleware,
          });
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
          }).catch((err) => {
            const component = extendComponent(<ErrorComp error={err} />);
            this.setState({
              location: location,
              component: component,
              middleware: () => {
                return Promise.resolve();
              },
              loaded: true
            });
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
    this.init().then(this.middleware).catch((err) => {
      const component = extendComponent(<ErrorComp error={err} />);
      this.setState({
        location: location,
        component: component,
        middleware: () => {
          return Promise.resolve();
        },
        loaded: true
      });
    });
  }

  /**
   * if loaded, show component, else nothing
   */
  render() {
    const props = {
      location: RouteHistory.location
    };
    return this.state.loaded ? <this.state.component {...props} /> : null;
  }
}

export default RouterBase;
