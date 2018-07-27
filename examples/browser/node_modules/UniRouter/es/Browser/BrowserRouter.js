var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import RouteHistory from "../history";
import BaseRouter from "../BaseRouter";
import ErrorComp from "./ErrorComp";
import RouteError from "../Error";

var Router = function (_BaseRouter) {
  _inherits(Router, _BaseRouter);

  function Router() {
    var _ref;

    _classCallCheck(this, Router);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Router.__proto__ || Object.getPrototypeOf(Router)).call.apply(_ref, [this].concat(args)));
  }

  _createClass(Router, [{
    key: "getRoute",
    value: function getRoute() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        resolve(_this2.route(RouteHistory.location.pathname));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return this.getRoute().then(function (route) {
        if (route instanceof Error) {
          console.log("instance of");
          RouteHistory.location.params = route.params;
          route.component = ErrorComp.updateProps({ params: route.params });
        }

        return route.middleware(RouteHistory, RouteHistory.location, function () {}).then(function () {
          _this3.node.appendChild(route.component);
        }).catch(function (err) {
          console.log(route);
          _this3.node.appendChild(document.createElement("h3").appendChild(document.createTextNode(err.message)));
        });
      });
    }
  }]);

  return Router;
}(BaseRouter);

export default Router;