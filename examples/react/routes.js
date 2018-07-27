import React from "react";
import Hello from "./Hello";
import App from "./App";
import Test from "./Test";
import { createConfig, RouterError } from "./Router";

const routes = [
  {
    path: "/",
    component: <App />
  },
  {
    path: "/hello",
    component: <Hello />
  },
  {
    path: "/hello2/:apples",
    component: <Hello />,
    middleware: (res, req, next) => {
      if (!req.query.yes) {
        throw new RouterError("unAuthorized", 401);
      }
      console.log("middleware", res, req, next);
    }
  },
  {
    path: "/test",
    component: <Test />
  }
];

export default createConfig(routes);
