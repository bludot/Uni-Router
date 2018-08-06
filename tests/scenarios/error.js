import RouteError from '../../src/Router/Error';

describe('Test route error', () => {
  it('initialize history', () => {
    const err = new RouteError('Route not found!');
    expect(err.message).toEqual('Route not found!');
  });
});
