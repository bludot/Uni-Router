import { RouteHistory } from "UniRouter";

const Hello = (function() {
  const props = { params: RouteHistory.location.params };
  const element = document.createElement("h1");
  element.appendChild(
    document.createTextNode(`Hello, params: ${JSON.stringify(props.params)}`)
  );
  return element;
})();

export default Hello;
