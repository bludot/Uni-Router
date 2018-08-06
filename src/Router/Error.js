class RouterError extends Error {
  constructor(...args) {
    super(...args);
    this.code = args[1];
    Error.captureStackTrace(this, RouterError);
  }
}

export default RouterError;
