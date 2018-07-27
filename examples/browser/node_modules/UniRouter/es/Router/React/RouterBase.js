var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import history from "../history";
import ErrorComp from "./ErrorComp";
import extendComponent from "./ExtendComponent";
import BaseRouter from "../BaseRouter";

var aggregation = function aggregation(baseClass) {
  for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    mixins[_key - 1] = arguments[_key];
  }

  var base = function (_baseClass) {
    _inherits(base, _baseClass);

    function base() {
      var _ref;

      _classCallCheck(this, base);

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var _this = _possibleConstructorReturn(this, (_ref = base.__proto__ || Object.getPrototypeOf(base)).call.apply(_ref, [this].concat(args)));

      mixins.forEach(function (mixin) {
        copyProps(_this, new mixin());
      });
      return _this;
    }

    return base;
  }(baseClass);

  var copyProps = function copyProps(target, source) {
    // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source)).forEach(function (prop) {
      if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
    });
  };
  mixins.forEach(function (mixin) {
    // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};

/**
 * RouterBase is just the router that decides what to show.
 */

var RouterBase = function (_aggregation) {
  _inherits(RouterBase, _aggregation);

  function RouterBase(props) {
    _classCallCheck(this, RouterBase);

    var _this2 = _possibleConstructorReturn(this, (RouterBase.__proto__ || Object.getPrototypeOf(RouterBase)).call(this, props.config));

    _this2.state = {
      component: null,
      location: history.location,
      loaded: false,
      middleware: function middleware() {
        return Promise.resolve();
      }
    };
    _this2.middleware = _this2.middleware.bind(_this2);
    _this2.init = _this2.init.bind(_this2);
    return _this2;
  }

  _createClass(RouterBase, [{
    key: "getRoute",
    value: function getRoute() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        resolve(_this3.route(history.location.pathname));
      });
    }

    /**
     * Our middleware which runs before we render anything
     *
     * TODO:  find a better way to do this. Maybe make the
     *        router totally out?
     */

    /**
     * If the component has changed then run the middleware
     * (might not need this)
     */

  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var update = nextState !== this.state;
      console.log(nextState.location.pathname, this.state.location.pathname);
      if (update) {
        console.log("should update?", update);

        return true;
      }
      return false;
    }
  }, {
    key: "middleware",
    value: function middleware() {
      var _this4 = this;

      console.log("middleware: ", this.state.middleware);
      return this.state.middleware(history, history.location, function () {}).then(function () {
        _this4.setState({
          loaded: true
        });
      }).catch(function (err) {
        var component = extendComponent(React.createElement(ErrorComp, { error: err }));
        _this4.setState({
          component: component,
          loaded: true
        });
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this5 = this;

      return this.getRoute().then(function (route) {
        console.log("theroute", route);
        if (route instanceof Error) {
          console.log("instanceOf");
          _this5.setState({
            component: extendComponent(React.createElement(ErrorComp, { error: route })),
            middleware: function middleware() {
              return Promise.resolve();
            }
          });
        } else {
          _this5.setState({
            component: extendComponent(route.component),
            middleware: route.middleware
          });
        }
        /**
         * Initialize the history so that we have every component use
         * it to update
         */
        // history.init(extendComponent, config, this.setState);
        history.init(function (location) {
          console.log("will change?");
          _this5.getRoute().then(function (route) {
            _this5.middleware().then(function () {
              if (route instanceof Error) {
                _this5.setState({
                  location: location,
                  component: extendComponent(React.createElement(ErrorComp, { error: route })),
                  middleware: function middleware() {
                    return Promise.resolve();
                  }
                });
              } else {
                _this5.setState({
                  location: location,
                  component: extendComponent(route.component),
                  middleware: route.middleware
                });
              }
            });
          });
        });
      });
    }
    /**
     * Component is mounted but middleware not done,
     * lets run middleware and set it to loaded
     */

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log("running more than once?");
      this.init().then(this.middleware);
    }

    /**
     * if loaded, show component, else nothing
     */

  }, {
    key: "render",
    value: function render() {
      var props = {
        location: history.location
      };
      return this.state.loaded ? React.createElement(this.state.component, props) : null;
    }
  }]);

  return RouterBase;
}(aggregation(BaseRouter, Component));

export default RouterBase;