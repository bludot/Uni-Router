import RouteHistory from "../history";
import BaseRouter from "../BaseRouter";
import ErrorComp from "./ErrorComp";
import RouteError from "../Error";

class Router extends BaseRouter {
  constructor(...args) {
    super(...args);
  }
  getRoute() {
    return new Promise((resolve, reject) => {
      resolve(this.route(RouteHistory.location.pathname));
    });
  }
  render() {
    return this.getRoute().then(route => {
      if (route instanceof Error) {
        console.log("instance of");
        RouteHistory.location.params = route.params;
        route.component = ErrorComp.updateProps({ params: route.params });
      }

      return route
        .middleware(RouteHistory, RouteHistory.location, () => {})
        .then(() => {
          this.node.appendChild(route.component);
        })
        .catch(err => {
          console.log(route);
          this.node.appendChild(
            document
              .createElement("h3")
              .appendChild(document.createTextNode(err.message))
          );
        });
    });
  }
}

export default Router;
