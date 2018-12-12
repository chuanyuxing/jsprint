/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/K2Print.js":
/*!************************!*\
  !*** ./src/K2Print.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_Browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/Browser */ "./src/util/Browser.js");
/* harmony import */ var _WsSessionContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WsSessionContainer */ "./src/WsSessionContainer.js");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



/**
 * defining usable apis for jsprint.
 */

var K2Print =
/*#__PURE__*/
function () {
  function K2Print() {
    _classCallCheck(this, K2Print);

    this._settings = {
      autoCleanUp: true,
      autoReconnect: true,
      host: '127.0.0.1',
      port: '55555',
      useSsl: false
    };
    var protocol = this._settings.useSsl ? 'wss' : 'ws';
    var url = "".concat(protocol, "://").concat(this._settings.host, ":").concat(this._settings.port, "/");
    this._ws_container = new _WsSessionContainer__WEBPACK_IMPORTED_MODULE_1__["default"](url);
  }

  _createClass(K2Print, [{
    key: "reconfigure",
    value: function reconfigure(args) {
      this._ws_container && this._ws_container.destory();

      if (args) {
        if (args.constructor !== {}.constructor) {
          throw new Error('k2print expects a json object at arguments[0],as follows:\r\n' + JSON.stringify(this._settings));
        }

        Object.assign(this._settings, args);
      }

      if (this._settings.autoCleanUp && _util_Browser__WEBPACK_IMPORTED_MODULE_0__["default"].inBrowser()) {
        var k2p = this;
        var orginalHandler = window.onbeforeunload;

        window.onbeforeunload = function (event) {
          orginalHandler && orginalHandler(event);
          k2p.destory();
        };
      }

      var protocol = this._settings.useSsl ? 'wss' : 'ws';
      var url = "".concat(protocol, "://").concat(this._settings.host, ":").concat(this._settings.port, "/");
      this._ws_container = new _WsSessionContainer__WEBPACK_IMPORTED_MODULE_1__["default"](url);
    }
    /**
     * get local printer list.
     */

  }, {
    key: "get_printers",
    value: function get_printers() {
      var wsContainer = this._ws_container;
      return new Promise(function (resolve, reject) {
        var session = wsContainer.openSession('get_printers');
        session.send('-');

        session.onmessage = function (message) {
          resolve(JSON.parse(message || '{}'));
        };

        session.onerror = function (message) {
          reject(JSON.parse(message || '{}'));
        };
      });
    }
    /**
     * perform print in local pc. 
     */

  }, {
    key: "print_execute",
    value: function print_execute(args) {
      var wsContainer = this._ws_container;
      return new Promise(function (resolve, reject) {
        var session = wsContainer.openSession('print_execute');
        session.send(args);

        session.onmessage = function (message) {
          resolve(JSON.parse(message || '{}'));
        };

        session.onerror = function (message) {
          reject(JSON.parse(message || '{}'));
        };
      });
    }
  }, {
    key: "download_file",
    value: function download_file(args) {
      var wsContainer = this._ws_container;
      return new Promise(function (resolve, reject) {
        var session = wsContainer.openSession('download_file');
        session.send(args);

        session.onmessage = function (message) {
          resolve(JSON.parse(message || '{}'));
        };

        session.onerror = function (message) {
          reject(JSON.parse(message || '{}'));
        };
      });
    }
  }, {
    key: "destory",
    value: function destory() {
      this._ws_container && this._ws_container.destory();
    }
  }]);

  return K2Print;
}();

/* harmony default export */ __webpack_exports__["default"] = (K2Print);

/***/ }),

/***/ "./src/WsSession.js":
/*!**************************!*\
  !*** ./src/WsSession.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WsSession =
/*#__PURE__*/
function () {
  function WsSession(ws, api) {
    _classCallCheck(this, WsSession);

    this._api = api;
    this._messageQueue = [];
    this._ws = ws;
  }

  _createClass(WsSession, [{
    key: "send",
    value: function send(message) {
      if (!this._ws) {
        throw new Error('WsSession is not a right state.');
      }

      console.log('request[' + this._api + ']:' + message);

      if (this._ws.readyState === 1) {
        switch (message.constructor) {
          case 'test'.constructor:
            this._ws.send(message);

            break;

          case [].constructor:
            this._ws.send(message.join('|'));

            break;

          case {}.constructor:
            this._ws.send(JSON.stringify(message));

            break;

          default:
            this._ws.send(message);

        }
      } else {
        this._messageQueue.push(message);
      }
    }
  }, {
    key: "close",
    value: function close() {
      if (this._ws) {
        console.log('close connection[' + this._api + ']');

        this._ws.close();
      }
    }
  }, {
    key: "onopen",
    value: function onopen() {
      console.log('open connection[' + this._api + ']');

      while (this._messageQueue.length > 0) {
        this._ws.send(this._messageQueue.pop());
      }
    }
  }, {
    key: "onmessage",
    value: function onmessage(message) {
      console.log('response[' + this._api + ']:' + message);
    }
  }, {
    key: "onclose",
    value: function onclose() {
      console.log('close[' + this._api + ']');
    }
  }, {
    key: "onerror",
    value: function onerror(message) {
      console.log('error[' + this._api + ']:' + message);
    }
  }]);

  return WsSession;
}();

/* harmony default export */ __webpack_exports__["default"] = (WsSession);

/***/ }),

/***/ "./src/WsSessionContainer.js":
/*!***********************************!*\
  !*** ./src/WsSessionContainer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WsSession__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WsSession */ "./src/WsSession.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


'use strict';

var WsSessionContainer =
/*#__PURE__*/
function () {
  function WsSessionContainer(baseUrl) {
    _classCallCheck(this, WsSessionContainer);

    this._baseUrl = baseUrl;
    this._sessions = new Map();
  }

  _createClass(WsSessionContainer, [{
    key: "openSession",
    value: function openSession(api) {
      var _this = this;

      console.log('request api:' + api);

      if (this._sessions.has(api)) {
        return this._sessions.get(api);
      }

      var url = this._baseUrl + (this._baseUrl.endsWith('/') ? api : '/' + api);
      console.log('Open web socket from:' + url);
      var ws = new WebSocket(url);
      var session = new _WsSession__WEBPACK_IMPORTED_MODULE_0__["default"](ws, api);

      ws.onopen = function () {
        session.onopen();
      };

      ws.onmessage = function (event) {
        session.onmessage(event.data);
      };

      ws.onerror = function (error) {
        session.onerror(error);
      };

      ws.onclose = function () {
        _this._sessions.delete(api);

        session.onclose();
      };

      this._sessions.set(api, session);

      return session;
    }
  }, {
    key: "closeSession",
    value: function closeSession(api) {
      if (this._sessions.has(api)) {
        this._sessions.get(api).close();
      }
    }
  }, {
    key: "destory",
    value: function destory() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._sessions.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var session = _step.value;
          session.close();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return WsSessionContainer;
}();

/* harmony default export */ __webpack_exports__["default"] = (WsSessionContainer);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _K2Print__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./K2Print */ "./src/K2Print.js");
/**
 * Module dependencies.
 */

/**
 * Create an instance of K2Print and 
 * bind it as a property of window object.
 */

var k2print = new _K2Print__WEBPACK_IMPORTED_MODULE_0__["default"]();

if (typeof window !== 'undefined') {
  window.k2print = k2print;
}

/* harmony default export */ __webpack_exports__["default"] = (k2print);

/***/ }),

/***/ "./src/util/Browser.js":
/*!*****************************!*\
  !*** ./src/util/Browser.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Browser = {
  inBrowser: function inBrowser() {
    return typeof window !== 'undefined';
  },
  // Firefox 1.0+
  isFirefox: function isFirefox() {
    return typeof InstallTrigger !== 'undefined';
  },
  // Internet Explorer 6-11
  isIE: function isIE() {
    return navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode;
  },
  // Edge 20+
  isEdge: function isEdge() {
    return !Browser.isIE() && !!window.StyleMedia;
  },
  // Chrome 1+
  isChrome: function isChrome() {
    return !!window.chrome && !!window.chrome.webstore;
  },
  // At least Safari 3+: "[object HTMLElementConstructor]"
  isSafari: function isSafari() {
    return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || navigator.userAgent.toLowerCase().indexOf('safari') !== -1;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Browser);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0syUHJpbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1dzU2Vzc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvV3NTZXNzaW9uQ29udGFpbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9Ccm93c2VyLmpzIl0sIm5hbWVzIjpbIksyUHJpbnQiLCJfc2V0dGluZ3MiLCJhdXRvQ2xlYW5VcCIsImF1dG9SZWNvbm5lY3QiLCJob3N0IiwicG9ydCIsInVzZVNzbCIsInByb3RvY29sIiwidXJsIiwiX3dzX2NvbnRhaW5lciIsIldzU2Vzc2lvbkNvbnRhaW5lciIsImFyZ3MiLCJkZXN0b3J5IiwiY29uc3RydWN0b3IiLCJFcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJPYmplY3QiLCJhc3NpZ24iLCJCcm93c2VyIiwiaW5Ccm93c2VyIiwiazJwIiwib3JnaW5hbEhhbmRsZXIiLCJ3aW5kb3ciLCJvbmJlZm9yZXVubG9hZCIsImV2ZW50Iiwid3NDb250YWluZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNlc3Npb24iLCJvcGVuU2Vzc2lvbiIsInNlbmQiLCJvbm1lc3NhZ2UiLCJtZXNzYWdlIiwicGFyc2UiLCJvbmVycm9yIiwiV3NTZXNzaW9uIiwid3MiLCJhcGkiLCJfYXBpIiwiX21lc3NhZ2VRdWV1ZSIsIl93cyIsImNvbnNvbGUiLCJsb2ciLCJyZWFkeVN0YXRlIiwiam9pbiIsInB1c2giLCJjbG9zZSIsImxlbmd0aCIsInBvcCIsImJhc2VVcmwiLCJfYmFzZVVybCIsIl9zZXNzaW9ucyIsIk1hcCIsImhhcyIsImdldCIsImVuZHNXaXRoIiwiV2ViU29ja2V0Iiwib25vcGVuIiwiZGF0YSIsImVycm9yIiwib25jbG9zZSIsImRlbGV0ZSIsInNldCIsInZhbHVlcyIsImsycHJpbnQiLCJpc0ZpcmVmb3giLCJJbnN0YWxsVHJpZ2dlciIsImlzSUUiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJpbmRleE9mIiwiZG9jdW1lbnQiLCJkb2N1bWVudE1vZGUiLCJpc0VkZ2UiLCJTdHlsZU1lZGlhIiwiaXNDaHJvbWUiLCJjaHJvbWUiLCJ3ZWJzdG9yZSIsImlzU2FmYXJpIiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiSFRNTEVsZW1lbnQiLCJ0b0xvd2VyQ2FzZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBYTs7Ozs7Ozs7QUFFYjtBQUNBO0FBRUE7Ozs7SUFHTUEsTzs7O0FBRUYscUJBQWM7QUFBQTs7QUFDVixTQUFLQyxTQUFMLEdBQWlCO0FBQ2JDLGlCQUFXLEVBQUMsSUFEQztBQUViQyxtQkFBYSxFQUFDLElBRkQ7QUFHYkMsVUFBSSxFQUFDLFdBSFE7QUFJYkMsVUFBSSxFQUFDLE9BSlE7QUFLYkMsWUFB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dXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IEJyb3dzZXIgZnJvbSAnLi91dGlsL0Jyb3dzZXInO1xyXG5pbXBvcnQgV3NTZXNzaW9uQ29udGFpbmVyIGZyb20gJy4vV3NTZXNzaW9uQ29udGFpbmVyJztcclxuXHJcbi8qKlxyXG4gKiBkZWZpbmluZyB1c2FibGUgYXBpcyBmb3IganNwcmludC5cclxuICovXHJcbmNsYXNzIEsyUHJpbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyAgXHJcbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSB7XHJcbiAgICAgICAgICAgIGF1dG9DbGVhblVwOnRydWUsXHJcbiAgICAgICAgICAgIGF1dG9SZWNvbm5lY3Q6dHJ1ZSxcclxuICAgICAgICAgICAgaG9zdDonMTI3LjAuMC4xJyxcclxuICAgICAgICAgICAgcG9ydDonNTU1NTUnLFxyXG4gICAgICAgICAgICB1c2VTc2w6ZmFsc2VcclxuICAgICAgICB9OyAgIFxyXG4gICAgICAgIGNvbnN0IHByb3RvY29sID0gdGhpcy5fc2V0dGluZ3MudXNlU3NsID8gJ3dzcycgOiAnd3MnO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IGAke3Byb3RvY29sfTovLyR7dGhpcy5fc2V0dGluZ3MuaG9zdH06JHt0aGlzLl9zZXR0aW5ncy5wb3J0fS9gO1xyXG4gICAgICAgIHRoaXMuX3dzX2NvbnRhaW5lciA9IG5ldyBXc1Nlc3Npb25Db250YWluZXIodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICByZWNvbmZpZ3VyZShhcmdzKSB7XHJcbiAgICAgICAgdGhpcy5fd3NfY29udGFpbmVyICYmIHRoaXMuX3dzX2NvbnRhaW5lci5kZXN0b3J5KCk7ICAgICAgICAgICAgICBcclxuICAgICAgICBpZihhcmdzKSB7XHJcbiAgICAgICAgICAgIGlmKCBhcmdzLmNvbnN0cnVjdG9yICE9PSB7fS5jb25zdHJ1Y3Rvcil7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2sycHJpbnQgZXhwZWN0cyBhIGpzb24gb2JqZWN0IGF0IGFyZ3VtZW50c1swXSxhcyBmb2xsb3dzOlxcclxcbicgKyBKU09OLnN0cmluZ2lmeSh0aGlzLl9zZXR0aW5ncykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fc2V0dGluZ3MsIGFyZ3MpO1xyXG4gICAgICAgIH0gIFxyXG4gICAgICAgIGlmKHRoaXMuX3NldHRpbmdzLmF1dG9DbGVhblVwICYmIEJyb3dzZXIuaW5Ccm93c2VyKCkpIHtcclxuICAgICAgICAgICAgY29uc3QgazJwID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3Qgb3JnaW5hbEhhbmRsZXIgPSB3aW5kb3cub25iZWZvcmV1bmxvYWQ7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZD1mdW5jdGlvbihldmVudCkgeyAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgb3JnaW5hbEhhbmRsZXIgJiYgb3JnaW5hbEhhbmRsZXIoZXZlbnQpOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBrMnAuZGVzdG9yeSgpOyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9OyAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHByb3RvY29sID0gdGhpcy5fc2V0dGluZ3MudXNlU3NsID8gJ3dzcycgOiAnd3MnO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IGAke3Byb3RvY29sfTovLyR7dGhpcy5fc2V0dGluZ3MuaG9zdH06JHt0aGlzLl9zZXR0aW5ncy5wb3J0fS9gO1xyXG4gICAgICAgIHRoaXMuX3dzX2NvbnRhaW5lciA9IG5ldyBXc1Nlc3Npb25Db250YWluZXIodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCBsb2NhbCBwcmludGVyIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIGdldF9wcmludGVycygpIHsgIFxyXG4gICAgICAgIGNvbnN0IHdzQ29udGFpbmVyID0gIHRoaXMuX3dzX2NvbnRhaW5lcjtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe1xyXG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gd3NDb250YWluZXIub3BlblNlc3Npb24oJ2dldF9wcmludGVycycpO1xyXG4gICAgICAgICAgICBzZXNzaW9uLnNlbmQoJy0nKTtcclxuICAgICAgICAgICAgc2Vzc2lvbi5vbm1lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoIG1lc3NhZ2UgfHwgJ3t9JykpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZXNzaW9uLm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoSlNPTi5wYXJzZSggbWVzc2FnZSB8fCAne30nKSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwZXJmb3JtIHByaW50IGluIGxvY2FsIHBjLiBcclxuICAgICAqL1xyXG4gICAgcHJpbnRfZXhlY3V0ZShhcmdzKSB7XHJcbiAgICAgICAgY29uc3Qgd3NDb250YWluZXIgPSAgdGhpcy5fd3NfY29udGFpbmVyO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSB3c0NvbnRhaW5lci5vcGVuU2Vzc2lvbigncHJpbnRfZXhlY3V0ZScpO1xyXG4gICAgICAgICAgICBzZXNzaW9uLnNlbmQoYXJncyk7XHJcbiAgICAgICAgICAgIHNlc3Npb24ub25tZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKCBtZXNzYWdlIHx8ICd7fScpKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2Vzc2lvbi5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KEpTT04ucGFyc2UoIG1lc3NhZ2UgfHwgJ3t9JykpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRvd25sb2FkX2ZpbGUoYXJncykge1xyXG4gICAgICAgIGNvbnN0IHdzQ29udGFpbmVyID0gIHRoaXMuX3dzX2NvbnRhaW5lcjtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe1xyXG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gd3NDb250YWluZXIub3BlblNlc3Npb24oJ2Rvd25sb2FkX2ZpbGUnKTtcclxuICAgICAgICAgICAgc2Vzc2lvbi5zZW5kKGFyZ3MpO1xyXG4gICAgICAgICAgICBzZXNzaW9uLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZSggbWVzc2FnZSB8fCAne30nKSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlc3Npb24ub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChKU09OLnBhcnNlKCBtZXNzYWdlIHx8ICd7fScpKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0b3J5KCkge1xyXG4gICAgICAgIHRoaXMuX3dzX2NvbnRhaW5lciAmJiB0aGlzLl93c19jb250YWluZXIuZGVzdG9yeSgpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEsyUHJpbnQ7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY2xhc3MgV3NTZXNzaW9ue1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHdzLCBhcGkpIHtcclxuICAgICAgICB0aGlzLl9hcGkgPSBhcGk7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZVF1ZXVlID0gW107XHJcbiAgICAgICAgdGhpcy5fd3MgPSB3czsgICAgICAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzZW5kKG1lc3NhZ2UpIHsgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGlmICghdGhpcy5fd3MpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXc1Nlc3Npb24gaXMgbm90IGEgcmlnaHQgc3RhdGUuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdFsnICsgdGhpcy5fYXBpICsgJ106JyArIG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fd3MucmVhZHlTdGF0ZSA9PT0gMSkge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UuY29uc3RydWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3Rlc3QnLmNvbnN0cnVjdG9yOiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dzLnNlbmQobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFtdLmNvbnN0cnVjdG9yOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dzLnNlbmQobWVzc2FnZS5qb2luKCd8JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB7fS5jb25zdHJ1Y3RvcjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93cy5zZW5kKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd3Muc2VuZChtZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VRdWV1ZS5wdXNoKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0gIFxyXG5cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl93cykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xvc2UgY29ubmVjdGlvblsnICsgdGhpcy5fYXBpICsgJ10nKTtcclxuICAgICAgICAgICAgdGhpcy5fd3MuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25vcGVuKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvcGVuIGNvbm5lY3Rpb25bJyArIHRoaXMuX2FwaSArICddJyk7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX21lc3NhZ2VRdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dzLnNlbmQodGhpcy5fbWVzc2FnZVF1ZXVlLnBvcCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25tZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncmVzcG9uc2VbJyArIHRoaXMuX2FwaSArICddOicgKyBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbmNsb3NlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbG9zZVsnICsgdGhpcy5fYXBpICsgJ10nKTtcclxuICAgIH1cclxuXHJcbiAgICBvbmVycm9yKG1lc3NhZ2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3JbJyArIHRoaXMuX2FwaSArICddOicgKyBtZXNzYWdlKTtcclxuICAgIH0gICAgICAgXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgV3NTZXNzaW9uOyIsImltcG9ydCBXc1Nlc3Npb24gZnJvbSAnLi9Xc1Nlc3Npb24nO1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5jbGFzcyBXc1Nlc3Npb25Db250YWluZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmwpIHtcclxuICAgICAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcclxuICAgICAgICB0aGlzLl9zZXNzaW9ucyA9IG5ldyBNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuU2Vzc2lvbihhcGkpIHsgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IGFwaTonICsgYXBpKTsgICAgIFxyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2Vzc2lvbnMuaGFzKGFwaSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Nlc3Npb25zLmdldChhcGkpO1xyXG4gICAgICAgIH0gICAgICBcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5fYmFzZVVybCArICh0aGlzLl9iYXNlVXJsLmVuZHNXaXRoKCcvJykgPyAgYXBpIDogJy8nK2FwaSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ09wZW4gd2ViIHNvY2tldCBmcm9tOicgKyB1cmwpO1xyXG4gICAgICAgIGNvbnN0IHdzID0gbmV3IFdlYlNvY2tldCh1cmwpO1xyXG4gICAgICAgIGNvbnN0IHNlc3Npb24gPSBuZXcgV3NTZXNzaW9uKHdzLCBhcGkpOyAgICBcclxuICAgICAgICB3cy5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlc3Npb24ub25vcGVuKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB3cy5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHsgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNlc3Npb24ub25tZXNzYWdlKGV2ZW50LmRhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgd3Mub25lcnJvciA9IChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBzZXNzaW9uLm9uZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH07ICAgIFxyXG4gICAgICAgIHdzLm9uY2xvc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nlc3Npb25zLmRlbGV0ZShhcGkpO1xyXG4gICAgICAgICAgICBzZXNzaW9uLm9uY2xvc2UoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX3Nlc3Npb25zLnNldChhcGksIHNlc3Npb24pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBzZXNzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlU2Vzc2lvbihhcGkpIHtcclxuICAgICAgICBpZih0aGlzLl9zZXNzaW9ucy5oYXMoYXBpKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXNzaW9ucy5nZXQoYXBpKS5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZGVzdG9yeSgpIHtcclxuICAgICAgICBmb3IgKGxldCBzZXNzaW9uIG9mIHRoaXMuX3Nlc3Npb25zLnZhbHVlcygpKXtcclxuICAgICAgICAgICAgc2Vzc2lvbi5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBXc1Nlc3Npb25Db250YWluZXI7IiwiLyoqXHJcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAqL1xyXG5pbXBvcnQgSzJQcmludCBmcm9tICcuL0syUHJpbnQnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBLMlByaW50IGFuZCBcclxuICogYmluZCBpdCBhcyBhIHByb3BlcnR5IG9mIHdpbmRvdyBvYmplY3QuXHJcbiAqL1xyXG5jb25zdCBrMnByaW50ID0gbmV3IEsyUHJpbnQoKTtcclxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICB3aW5kb3cuazJwcmludCA9IGsycHJpbnQ7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgazJwcmludDtcclxuXHJcbiIsImNvbnN0IEJyb3dzZXIgPSB7XHJcbiAgICBpbkJyb3dzZXI6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEZpcmVmb3ggMS4wK1xyXG4gICAgaXNGaXJlZm94OiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBJbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCc7XHJcbiAgICB9LFxyXG4gICAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgNi0xMVxyXG4gICAgaXNJRTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ01TSUUnKSAhPT0gLTEgfHwgISFkb2N1bWVudC5kb2N1bWVudE1vZGU7XHJcbiAgICB9LFxyXG4gICAgLy8gRWRnZSAyMCtcclxuICAgIGlzRWRnZTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAhQnJvd3Nlci5pc0lFKCkgJiYgISF3aW5kb3cuU3R5bGVNZWRpYTtcclxuICAgIH0sXHJcbiAgICAvLyBDaHJvbWUgMStcclxuICAgIGlzQ2hyb21lOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICEhd2luZG93LmNocm9tZSAmJiAhIXdpbmRvdy5jaHJvbWUud2Vic3RvcmU7XHJcbiAgICB9LFxyXG4gICAgLy8gQXQgbGVhc3QgU2FmYXJpIDMrOiBcIltvYmplY3QgSFRNTEVsZW1lbnRDb25zdHJ1Y3Rvcl1cIlxyXG4gICAgaXNTYWZhcmk6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHdpbmRvdy5IVE1MRWxlbWVudCkuaW5kZXhPZignQ29uc3RydWN0b3InKSA+IDAgfHxcclxuICAgICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdzYWZhcmknKSAhPT0gLTE7XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IEJyb3dzZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==