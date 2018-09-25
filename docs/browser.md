---
id: browser
title: Using with Browser DOM
---

## Routes

create A DOM element, wrap it in a function, and use it as your page/route

```javascript
// App.js

const App = function () {
  const element = document.createElement('h1');
  element.textContent = 'App';
  return element;
};

export default App;

```

```javascript
// Hello.js

import { RouteHistory } from 'univ-router/es/index.browser';

const Hello = function () {
  const props = { params: RouteHistory.location.params };
  const element = document.createElement('h1');
  element.appendChild(
    document.createTextNode(`Hello, params: ${JSON.stringify(props.params)}`),
  );
  return element;
};

export default Hello;

```

Create a routes config using the pages you created (App and Hello). The pages
will be the components (or DOM elements) that will show depending on the route.

```javascript
// routes.js

import { createConfig, RouterError } from 'univ-router/es/index.browser';
import App from './App';
import Hello from './Hello';

const routes = [
  {
    path: '/',
    component: App,
  },
  {
    path: '/hello',
    component: Hello,
    middleware: (res, req) => {
      if (!req.query.yes) {
        throw new RouterError('unAuthorized', 401);
      }
    },
  },
  {
    path: '/hello2/:apples',
    component: Hello,
  },
  {
    path: '/test',
    component: Hello,
  },
];

export default createConfig(routes);

```

## Browser setup

For setting up in the browser, just create a new `Router`/`BrowserRouter` by
passing the routes in the constructor and the root node to append it too. Then
just render the router.

```javascript
// index.js

import { BrowserRouter as Router, RouteHistory } from 'univ-router/es/index.browser';
import routes from './routes';

const route = RouteHistory.location.pathname;

const Route = (function () {
  const element = document.createElement('div');
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');
  h1.textContent = 'Hello Parcel!';
  h2.textContent = `Route: ${route}`;
  element.appendChild(h1);
  element.appendChild(h2);
  return element;
}());

document.getElementById('app').appendChild(Route);
const router = new Router(routes, document.getElementById('app'));
router.render();
```
