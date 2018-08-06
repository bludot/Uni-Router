import RouteError from './Error';

class Node {
  constructor() {
    this._prev = null;
    this._next = {};
    this._param = null;
    this._value = null;
  }

  set next(val) {
    this._next = val;
  }

  set param(val) {
    this._param = val;
  }

  set prev(val) {
    this._prev = val;
  }

  set value(val) {
    this._value = val;
  }

  get next() {
    return this._next;
  }

  get prev() {
    return this._prev;
  }

  get value() {
    return this._value;
  }

  get param() {
    return this._param;
  }
}

class RouteTrie {
  constructor() {
    this.root = new Node();
  }

  add(route) {
    // const node = new Node(item);
    const search = route.path.split('');
    var node = this.root;
    while (search.length) {
      let letter = search.shift();
      if (letter === ':') {
        let word = '';
        while (search[0] !== '/' && search.length) {
          word += search.shift();
        }
        node.next[letter] = new Node(letter);
        node.prev = node;
        node = node.next[letter];
        node.param = word;
        letter = search.shift();
        if (!letter) {
          break;
        }
      }
      if (!node.next[letter]) {
        node.next[letter] = new Node(letter);
        node.prev = node;
      }
      node = node.next[letter];
    }
    node.value = route.val;
  }

  find(_string) {
    const search = _string.split('');
    const params = {};
    let node = this.root;
    while (search.length && node) {
      if (node.next[':']) {
        let word = '';
        while (search[0] !== '/' && search.length) {
          word += search.shift();
        }
        params[node.next[':'].param] = word;
        node = node.next[':'];
      } else if (node.next['*']) {
        node = node.next['*'];
        while (search[0] !== '/' && search.length) {
          search.shift();
        }
      } else {
        node = node.next[search.shift()];
      }
    }
    if (!node || !node.value) {
      throw new RouteError('Route not found!');
    }
    return { ...node, params };
  }
}

export default RouteTrie;
