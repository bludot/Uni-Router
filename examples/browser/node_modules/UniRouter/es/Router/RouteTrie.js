var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import RouteError from "./Error";

var Node = function () {
  function Node() {
    _classCallCheck(this, Node);

    this._prev = null;
    this._next = {};
    this._param = null;
    this._value = null;
  }

  _createClass(Node, [{
    key: "next",
    set: function set(val) {
      this._next = val;
    },
    get: function get() {
      return this._next;
    }
  }, {
    key: "param",
    set: function set(val) {
      this._param = val;
    },
    get: function get() {
      return this._param;
    }
  }, {
    key: "prev",
    set: function set(val) {
      this._prev = val;
    },
    get: function get() {
      return this._prev;
    }
  }, {
    key: "value",
    set: function set(val) {
      this._value = val;
    },
    get: function get() {
      return this._value;
    }
  }]);

  return Node;
}();

var RouteTrie = function () {
  function RouteTrie() {
    _classCallCheck(this, RouteTrie);

    this.root = new Node();
  }

  _createClass(RouteTrie, [{
    key: "add",
    value: function add(route) {
      // const node = new Node(item);
      var count = 0;
      var search = route.path.split("");
      var node = this.root;
      while (search.length) {
        var letter = search.shift();
        if (letter === ":") {
          var word = "";
          while (search[0] !== "/" && search.length) {
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
  }, {
    key: "find",
    value: function find(_string) {
      var search = _string.split("");
      var params = {};
      var node = this.root;
      while (search.length && node) {
        if (node.next[":"]) {
          var word = "";
          while (search[0] !== "/" && search.length) {
            word += search.shift();
          }
          params[node.next[":"].param] = word;
          node = node.next[":"];
        } else if (node.next["*"]) {
          node = node.next["*"];
          while (search[0] !== "/") {
            search.shift();
          }
        } else {
          node = node.next[search.shift()];
        }
      }
      if (!node || !node.value) {
        throw new RouteError("Route not found!");
      }
      return _extends({}, node, { params: params });
    }
  }]);

  return RouteTrie;
}();

export default RouteTrie;