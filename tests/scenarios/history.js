/**
 * @jest-environment jsdom
 */
import history from '../../src/Router/history';

describe('Test route history', () => {
  it('initialize history', () => {
    expect(history).toHaveProperty('location');
  });
  it('expect history listen to work ', () => {
    const updater = jest.fn((location) => {
      expect(location.pathname).toEqual('/notaroute');
      return location;
    });
    history.init(updater);
    history.push('/notaroute');
    expect(updater).toHaveBeenCalled();
  });
  it('expect history to read query', () => {
    const updater = jest.fn((location) => {
      expect(location.pathname).toEqual('/notaroute');
      expect(location.query).toEqual({
        yes: true,
        test: 'testme',
      });
      return location;
    });
    history.init(updater);
    history.push('/notaroute?yes&test=testme');
  });
});
