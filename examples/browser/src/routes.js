import App from "./App";
import Hello from "./Hello";
import { createConfig, RouterError } from "Uni-Router/es/index.browser";

const routes = [
  {
    path: "/",
    component: App
  },
  {
    path: "/hello",
    component: Hello,
    middleware: (res, req, next) => {
      if (!req.query.yes) {
        throw new RouterError("unAuthorized", 401);
      }
      console.log("middleware", res, req, next);
    }
  },
  {
    path: "/hello2/:apples",
    component: Hello
  },
  {
    path: "/test",
    component: Hello
  }
];

export default createConfig(routes);
