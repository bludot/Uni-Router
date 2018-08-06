import Trie from '../../src/Router/RouteTrie';

describe('Test Trie', () => {
  it('Initialize Trie', () => {
    const trie = new Trie();
    expect(trie).toBeInstanceOf(Trie);
  });
  it('add to Trie and retrive', () => {
    const trie = new Trie();
    trie.add({
      path: '/',
      val: {
        path: '/',
        component: '<App />',
      },
    });
    const route = trie.find('/');
    expect(route).toEqual({ _prev: null, _next: {}, _param: null, _value: { path: '/', component: '<App />' }, params: {} });
  });
  it('handle params (":")', () => {
    const trie = new Trie();
    trie.add({
      path: '/test/:param',
      val: {
        path: '/test/:param',
        component: '<App />',
      },
    });
    const route = trie.find('/test/test');
    expect(route.params).toEqual({
      param: 'test',
    });
  });
  it('handle multiple params (":")', () => {
    const trie = new Trie();
    trie.add({
      path: '/test/:param/:another',
      val: {
        path: '/test/:param/:another',
        component: '<Testone />',
      },
    });
    const route = trie.find('/test/test/anothertest');
    expect(route.params).toEqual({
      param: 'test',
      another: 'anothertest',
    });
  });
  it('handle multiple params (":") and another route', () => {
    const trie = new Trie();
    trie.add({
      path: '/test/:param/:another/test',
      val: {
        path: '/test/:param/:another/test',
        component: '<Test />',
      },
    });
    const route = trie.find('/test/test/anothertest/test');
    expect(route.params).toEqual({
      param: 'test',
      another: 'anothertest',
    });
    expect(route._value.component).toEqual('<Test />');
  });
  it('handle wildcard', () => {
    const trie = new Trie();
    trie.add({
      path: '/test/*',
      val: {
        path: '/test/*',
        component: '<Wildcard />',
      },
    });
    const route = trie.find('/test/test');
    expect(route._value.component).toEqual('<Wildcard />');
  });
  it('Should fail if not found', () => {
    const trie = new Trie();
    trie.add({
      path: '/',
      val: {
        path: '/',
        component: '<App />',
      },
    });
    function getRoute() {
      trie.find('/notaroute');
    }
    expect(getRoute).toThrowError('Route not found');
  });
});
