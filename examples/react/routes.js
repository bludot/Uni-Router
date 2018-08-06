import React from 'react';
import { createConfig, RouterError } from 'univ-router';
import Hello from './Hello';
import App from './App';
import Test from './Test';

const routes = [
  {
    path: '/',
    component: <App />,
  },
  {
    path: '/hello',
    component: <Hello />,
  },
  {
    path: '/hello2/:apples',
    component: <Hello />,
    middleware: (res, req) => {
      if (!req.query.yes) {
        throw new RouterError('unAuthorized', 401);
      }
    },
  },
  {
    path: '/test',
    component: <Test />,
  },
];

export default createConfig(routes);
