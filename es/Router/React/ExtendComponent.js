var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import history from "../history";

/**
 * Extend the component cuase it could be a stateless one.
 * We add the shoudlComponentUpdate so that we dont rerender
 * when we dont have to (same component but different props?)
 */
var extendComponent = function extendComponent(Component_, middleware) {
  // return a new reactComponent from a stateless one
  var NewComp = function (_React$Component) {
    _inherits(NewComp, _React$Component);

    function NewComp(props) {
      _classCallCheck(this, NewComp);

      var _this = _possibleConstructorReturn(this, (NewComp.__proto__ || Object.getPrototypeOf(NewComp)).call(this, props));

      _this.state = {};
      return _this;
    }

    _createClass(NewComp, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        console.log("prototype");
        var update = nextProps !== this.props && nextState !== this.state;
        if (update) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "render",
      value: function render() {
        var props = _extends({}, this.props, Component_.props, {
          location: history.location,
          query: history.location.query
        });
        return Component_.isReactComponent ? React.createElement(Component_, props) : React.cloneElement(Component_, props);
      }
    }]);

    return NewComp;
  }(React.Component);

  return NewComp;
};

export default extendComponent;