import { createConfig, RouterError } from '../../../es/index.browser';
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
    middleware: (req, res) => {
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
