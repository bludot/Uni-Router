import RouteTrie from './RouteTrie';
import RouteError from './Error';

class Route {
  constructor(routes, node) {
    this.routes = routes;
    this.node = node;
    this.routeTrie = new RouteTrie();
    Object.keys(routes).forEach((key) => {
      this.routeTrie.add({
        path: key,
        val: routes[key],
      });
    });
  }

  match(query) {
    return this.routeTrie.find(query);
  }

  route(url) {
    try {
      const result = this.match(url);
      return {
        ...result._value,
        ...{ params: result.params },
        match: !!result,
      };
    } catch (err) {
      /*
    if (result instanceof Error) {
      return result;
    }
    */
      const NewError = class extends RouteError {
        constructor(...args) {
          super(...args);
          this.params = {
            message: this.message,
            code: this.code,
          };
          this.middleware = () => Promise.resolve();
        }
      };
      return new NewError(err.message, err.code);
    }
  }
}

export default Route;
