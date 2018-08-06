import RouteHistory from '../history';
import BaseRouter from '../BaseRouter';
import ErrorComp from './ErrorComp';

class Router extends BaseRouter {
  constructor(...args) { // eslint-disable-line
    super(...args);
  }

  getRoute() {
    return new Promise((resolve) => {
      resolve(this.route(RouteHistory.location.pathname));
    });
  }

  render() {
    return this.getRoute().then((route) => {
      RouteHistory.location.params = route.params;
      if (route instanceof Error) {
        route.component = ErrorComp.updateProps({ params: route.params });
      }

      return route
        .middleware(RouteHistory, RouteHistory.location, () => {})
        .then(() => {
          this.node.appendChild(route.component);
        })
        .catch((err) => {
          this.node.appendChild(
            document
              .createElement('h3')
              .appendChild(document.createTextNode(err.message)),
          );
        });
    });
  }
}

export default Router;
