const createConfig = routes => {
  const staticMiddleware = (req, res, next) => {
    return new Promise((resolve, reject) => {
      try {
        return resolve(next());
      } catch (err) {
        return reject(err);
      }
    });
  };
  const middlewareWrapper = middleware => {
    return (req, res, next) => {
      return new Promise((resolve, reject) => {
        try {
          middleware(req, res, next);
          return resolve(next());
        } catch (err) {
          return reject(err);
        }
      });
    };
  };

  return routes.reduce((prev, curr) => {
    const route = curr;
    if (curr.middleware) {
      curr.middleware = middlewareWrapper(curr.middleware);
    }
    prev[curr.path] = { ...{ middleware: staticMiddleware }, ...route };
    return prev;
  }, {});
};

export default createConfig;
