import React from "react";
import { render } from "react-dom";
import routes from "./routes.js";
import { ReactRouter as Router } from "univ-router";

//render(<Hello />, document.getElementById('root'));
console.log("routes:", routes);
render(<Router config={routes} />, document.body);
