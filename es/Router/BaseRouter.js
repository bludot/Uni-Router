var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import RouteTrie from "./RouteTrie";
import RouteError from "./Error";

var routeTrie = new RouteTrie();

var Route = function () {
  function Route(routes, node) {
    _classCallCheck(this, Route);

    this.routes = routes;
    this.node = node;
    for (var i in routes) {
      routeTrie.add({
        path: i,
        val: routes[i]
      });
    }
  }

  _createClass(Route, [{
    key: "match",
    value: function match(query) {
      return routeTrie.find(query);
    }
  }, {
    key: "route",
    value: function route(url) {
      try {
        var result = this.match(url);
        console.log("the result", result);
        return _extends({}, result._value, { params: result.params }, {
          match: !!result
        });
      } catch (err) {
        /*
        if (result instanceof Error) {
        return result;
        }
        */
        console.log("yeah?", err);
        var newError = function (_RouteError) {
          _inherits(newError, _RouteError);

          function newError() {
            var _ref;

            _classCallCheck(this, newError);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, (_ref = newError.__proto__ || Object.getPrototypeOf(newError)).call.apply(_ref, [this].concat(args)));

            _this.params = {
              message: _this.message,
              code: _this.code
            };
            _this.middleware = function () {
              return Promise.resolve();
            };
            return _this;
          }

          return newError;
        }(RouteError);
        return new newError(err.message, err.code);
      }
    }
  }]);

  return Route;
}();

export default Route;