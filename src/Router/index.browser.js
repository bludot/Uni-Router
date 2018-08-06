import { BrowserRouter } from './Browser';
import createConfig from './config';
import RouteHistory from './history';
import RouterError from './Error';

RouteHistory.init();

export { BrowserRouter, RouteHistory, createConfig, RouterError };
