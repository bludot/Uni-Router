import React from 'react';
import RouteHistory from '../history';
import ErrorComp from './ErrorComp';
import extendComponent from './ExtendComponent';
import BaseRouter from '../BaseRouter';

const copyProps = (target, source) => {
  // this function copies all properties and symbols, filtering out some special ones
  Object.getOwnPropertyNames(source)
    .concat(Object.getOwnPropertySymbols(source))
    .forEach((prop) => {
      if (
        !prop.match(
          /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/,
        )
      ) {
        Object.defineProperty(
          target,
          prop,
          Object.getOwnPropertyDescriptor(source, prop),
        );
      }
    });
};
var aggregation = (BaseClass, ...mixins) => {
  class Base extends BaseClass {
    constructor(...args) {
      super(...args);
      mixins.forEach((Mixin) => {
        copyProps(this, new Mixin());
      });
    }
  }
  mixins.forEach((mixin) => {
    // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(Base.prototype, mixin.prototype);
    copyProps(Base, mixin);
  });
  return Base;
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
      middleware: () => Promise.resolve(),
    };
    this.middleware = this.middleware.bind(this);
    this.init = this.init.bind(this);
  }

  getRoute() {
    return new Promise((resolve) => {
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
      .then(() => {
        this.setState({
          loaded: true,
        });
      });
  }

  init() {
    return this.getRoute().then((route) => {
      if (route instanceof Error) {
        this.setState({
          component: extendComponent(<ErrorComp error={route} />),
          middleware: () => Promise.resolve(),
        });
      } else {
        this.setState({
          component: extendComponent(route.component),
          middleware: route.middleware,
        });
      }
      /**
       * Initialize the RouteHistory so that we have every component use
       * it to update
       */
      // RouteHistory.init(extendComponent, config, this.setState);
      return RouteHistory.init((location) => {
        this.getRoute().then((changedRoute) => {
          this.setState({
            middleware: changedRoute.middleware,
          });
          this.middleware().then(() => {
            if (changedRoute instanceof Error) {
              this.setState({
                location: location,
                component: extendComponent(<ErrorComp error={changedRoute} />),
                middleware: () => Promise.resolve(),
              });
            } else {
              this.setState({
                location: location,
                component: extendComponent(changedRoute.component),
                middleware: changedRoute.middleware,
              });
            }
          }).catch((err) => {
            const component = extendComponent(<ErrorComp error={err} />);
            this.setState({
              location: location,
              component: component,
              middleware: () => Promise.resolve(),
              loaded: true,
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
        middleware: () => Promise.resolve(),
        loaded: true,
      });
    });
  }

  /**
   * if loaded, show component, else nothing
   */
  render() {
    const props = {
      location: RouteHistory.location,
    };
    return this.state.loaded ? <this.state.component {...props} /> : null;
  }
}

export default RouterBase;
