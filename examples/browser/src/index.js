import { BrowserRouter as Router, RouteHistory } from "Uni-Router/es/index.browser";
import routes from "./routes";

let route = RouteHistory.location.pathname;

const Route = (function() {
  const element = document.createElement("div");
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  h1.textContent = "Hello Parcel!";
  h2.textContent = `Route: ${route}`;
  element.appendChild(h1);
  element.appendChild(h2);
  return element;
})();

document.getElementById("app").appendChild(Route);
const router = new Router(routes, document.getElementById("app"));
router.render();
