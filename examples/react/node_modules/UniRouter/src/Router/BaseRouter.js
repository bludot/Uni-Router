import RouteTrie from "./RouteTrie";
import RouteError from "./Error";

const routeTrie = new RouteTrie();

class Route {
  constructor(routes, node) {
    this.routes = routes;
    this.node = node;
    for (var i in routes) {
      routeTrie.add({
        path: i,
        val: routes[i]
      });
    }
  }
  match(query) {
    return routeTrie.find(query);
  }
  route(url) {
    try {
      const result = this.match(url);
      console.log("the result", result);
      return {
        ...result._value,
        ...{ params: result.params },
        match: !!result
      };
    } catch (err) {
      /*
    if (result instanceof Error) {
      return result;
    }
    */
      console.log("yeah?", err);
      const newError = class extends RouteError {
        constructor(...args) {
          super(...args);
          this.params = {
            message: this.message,
            code: this.code
          };
          this.middleware = () => {
            return Promise.resolve();
          };
        }
      };
      return new newError(err.message, err.code);
    }
  }
}

export default Route;
