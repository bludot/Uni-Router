var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var createConfig = function createConfig(routes) {
  var staticMiddleware = function staticMiddleware(req, res, next) {
    return new Promise(function (resolve, reject) {
      try {
        console.log("run static middleware");
        console.log(req, res, next);
        return resolve(next());
      } catch (err) {
        return reject(err);
      }
    });
  };
  var middlewareWrapper = function middlewareWrapper(middleware) {
    return function (req, res, next) {
      console.log("middlewareWrapper");
      return new Promise(function (resolve, reject) {
        try {
          middleware(req, res, next);
          return resolve(next());
        } catch (err) {
          return reject(err);
        }
      });
    };
  };

  return routes.reduce(function (prev, curr) {
    var route = curr;
    if (curr.middleware) {
      curr.middleware = middlewareWrapper(curr.middleware);
    }
    prev[curr.path] = _extends({ middleware: staticMiddleware }, route);
    return prev;
  }, {});
};

export default createConfig;