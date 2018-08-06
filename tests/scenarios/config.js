import createConfig from '../../src/Router/config';

describe('Should create a config', () => {
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
  it('createConfig', () => {
    const routes = createConfig(BASE_ROUTES);
    expect(routes).toHaveProperty('/');
    expect(routes).toHaveProperty('/hello');
    expect(routes).toHaveProperty('/hello2/:apples');
    expect(routes).toHaveProperty('/test');
  });
  it('createConfig', () => {
    const routes = createConfig(BASE_ROUTES);
    expect(routes['/hello2/:apples']).toHaveProperty('middleware');
    expect(routes['/'].middleware.name).toEqual('staticMiddleware');
    expect(routes['/hello2/:apples'].middleware.name).not.toEqual('staticMiddleware');
  });
});
