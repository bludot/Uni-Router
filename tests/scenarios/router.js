import RouteError from '../../src/Router/Error';
import createConfig from '../../src/Router/config';
import Router from '../../src/Router/BaseRouter';

describe('Test the BaseRouter', () => {
  const BASE_ROUTES = [
    {
      path: '/',
      component: '<App />',
    },
    {
      path: '/hello',
      component: '<Hello />',
    },
    {
      path: '/hello2/:apples',
      component: '<Hello />',
      middleware: (res, req) => {
        if (!req.query.yes) {
          throw new RouterError('unAuthorized', 401);
        }
      },
    },
    {
      path: '/test',
      component: '<Test />',
    },
  ];
  it('initialize BaseRouter', () => {
    const router = new Router(createConfig(BASE_ROUTES));
    expect(router).toBeInstanceOf(Router);
  });
  it('test BaseRouter routes', () => {
    const router = new Router(createConfig(BASE_ROUTES));
    const match = router.match('/');
    expect(match).toBeTruthy();
    expect(match._value.component).toEqual('<App />');
    const route = router.route('/');
    expect(route).not.toBeInstanceOf(RouteError);
    expect(route.component).toEqual('<App />');
  });
  it('test BaseRouter failed Routes', () => {
    const router = new Router(createConfig(BASE_ROUTES));
    const route = router.route('/notaroute');
    expect(route).toBeInstanceOf(Error);
    expect(route.message).toEqual('Route not found!');
  });
});
