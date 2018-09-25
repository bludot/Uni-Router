---
id: react
title: Using with React
sidebar_label: Using with React
---

When using React, it should be the same concept just with a component instead.

## Routes

Instead of putting DOM elements as the component, we will put React Components.
These Components should be wraped in whatever layout component you have. For
example:

```jsx
// App.jsx

import Layout from './Layout';
import React, { Component } from 'react';
const App = () => (
  <Layout>
    <h1>The actual APP/Page</h1>
  </Layout>
);

export default App;
```

```javascript
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
    path: "/hello2/:apples/:testme",
    component: <Hello2 />,
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
```

## React setup

React setup should be simple. Just use the `Router`/`ReactRouter` component and
pass the routes props to it and the rest should be handled in your route config.


```javascript
// index.js

import React from 'react';
import { render } from 'react-dom';
import { ReactRouter as Router } from 'univ-router/es/react.index';
import routes from './routes.js';

// render(<Hello />, document.getElementById('root'));
render(<Router config={routes} />, document.body);

```
