var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import RouteHistory from "../history";

var ErrorComp = function () {
  function ErrorComp() {
    _classCallCheck(this, ErrorComp);

    this.props = { params: RouteHistory.location.params };
    this.props.query = { params: RouteHistory.location.params };
    this.createElement = this.createElement.bind(this);
    this.createElement();
  }

  _createClass(ErrorComp, [{
    key: "createElement",
    value: function createElement() {
      this._element = document.createElement("h1");
      this._element.textContent = "error: " + JSON.stringify(this.props);
      return this._element;
    }
  }, {
    key: "updateProps",
    value: function updateProps(props) {
      this.props = _extends({}, this.props, props);
      return this.createElement();
    }
  }, {
    key: "element",
    get: function get() {
      return this._element;
    }
  }]);

  return ErrorComp;
}();

var errorComp = new ErrorComp();

export default errorComp;