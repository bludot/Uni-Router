import RouteError from './Error';

class Node {
  set next(val) {
    this._next = val;
  }

  set param(val) {
    this._param = val;
  }

  set value(val) {
    this._value = val;
  }

  get next() {
    return this._next || null;
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
    const search = route.path.length === 1 ? ['/'] : ['/'].concat(route.path.split('/').slice(1));
    var node = this.root;
    while (search.length && node) {
      let letter = search.shift();
      if (!node.next) {
        node.next = {};
      }
      if (letter[0] === ':') {
        const word = letter.slice(1);
        if (!node.next[':']) {
          node.next[':'] = new Node(':');
        }
        node.next[':'].param = word;
        letter = ':';
      } else if (!node.next[letter]) {
        node.next[letter] = new Node(letter);
        if (search.length > 0) {
          node.next[letter].next = {};
        }
      }
      node = node.next[letter];
    }
    node.value = route.val;
  }

  find(_string) {
    const search = _string.length === 1 ? ['/'] : ['/'].concat(_string.split('/').slice(1));
    const params = {};
    let node = this.root;
    while (search.length && node) {
      if (!node.next) {
        node = undefined;
        break;
      }
      if (node.next[':']) {
        const word = search.shift();
        params[node.next[':'].param] = word;
        node = node.next[':'];
      } else if (node.next['*']) {
        node = node.next['*'];
        search.shift();
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
