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
/* harmony import */ var _WsSessionContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WsSessionContainer */ "./src/WsSessionContainer.js");


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
    this._ws_container = new _WsSessionContainer__WEBPACK_IMPORTED_MODULE_0__["default"](url);
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

      if (this._settings.autoCleanUp && typeof window !== 'undefined') {
        var k2p = this;
        var orginalHandler = window.onbeforeunload;

        window.onbeforeunload = function (event) {
          orginalHandler && orginalHandler(event);
          k2p.destory();
        };
      }

      var protocol = this._settings.useSsl ? 'wss' : 'ws';
      var url = "".concat(protocol, "://").concat(this._settings.host, ":").concat(this._settings.port, "/");
      this._ws_container = new _WsSessionContainer__WEBPACK_IMPORTED_MODULE_0__["default"](url);
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
          resolve(message);
        };

        session.onerror = function (message) {
          reject(message);
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
          resolve(message);
        };

        session.onerror = function (message) {
          reject(message);
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
          resolve(message);
        };

        session.onerror = function (message) {
          reject(message);
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0syUHJpbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1dzU2Vzc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvV3NTZXNzaW9uQ29udGFpbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJLMlByaW50IiwiX3NldHRpbmdzIiwiYXV0b0NsZWFuVXAiLCJhdXRvUmVjb25uZWN0IiwiaG9zdCIsInBvcnQiLCJ1c2VTc2wiLCJwcm90b2NvbCIsInVybCIsIl93c19jb250YWluZXIiLCJXc1Nlc3Npb25Db250YWluZXIiLCJhcmdzIiwiZGVzdG9yeSIsImNvbnN0cnVjdG9yIiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiT2JqZWN0IiwiYXNzaWduIiwid2luZG93IiwiazJwIiwib3JnaW5hbEhhbmRsZXIiLCJvbmJlZm9yZXVubG9hZCIsImV2ZW50Iiwid3NDb250YWluZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNlc3Npb24iLCJvcGVuU2Vzc2lvbiIsInNlbmQiLCJvbm1lc3NhZ2UiLCJtZXNzYWdlIiwib25lcnJvciIsIldzU2Vzc2lvbiIsIndzIiwiYXBpIiwiX2FwaSIsIl9tZXNzYWdlUXVldWUiLCJfd3MiLCJjb25zb2xlIiwibG9nIiwicmVhZHlTdGF0ZSIsImpvaW4iLCJwdXNoIiwiY2xvc2UiLCJsZW5ndGgiLCJwb3AiLCJiYXNlVXJsIiwiX2Jhc2VVcmwiLCJfc2Vzc2lvbnMiLCJNYXAiLCJoYXMiLCJnZXQiLCJlbmRzV2l0aCIsIldlYlNvY2tldCIsIm9ub3BlbiIsImRhdGEiLCJlcnJvciIsIm9uY2xvc2UiLCJkZWxldGUiLCJzZXQiLCJ2YWx1ZXMiLCJrMnByaW50Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QmpCLEdBQW5CLEVBQXdCUyxLQUF4QjtBQUNIO0FBQ0o7Ozs4QkFFUztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNOLDZCQUFvQixLQUFLSyxTQUFMLENBQWVZLE1BQWYsRUFBcEIsOEhBQTRDO0FBQUEsY0FBbkNsQyxPQUFtQztBQUN4Q0EsaUJBQU8sQ0FBQ2lCLEtBQVI7QUFDSDtBQUhLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJVDs7Ozs7O0FBRVVuQyxpRkFBZixFOzs7Ozs7Ozs7Ozs7QUNuREE7QUFBQTtBQUFBOzs7QUFHQTtBQUVBOzs7OztBQUlBLElBQU1xRCxPQUFPLEdBQUcsSUFBSS9ELGdEQUFKLEVBQWhCOztBQUNBLElBQUksT0FBT21CLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7QUFDL0JBLFFBQU0sQ0FBQzRDLE9BQVAsR0FBaUJBLE9BQWpCO0FBQ0g7O0FBQ2NBLHNFQUFmLEUiLCJmaWxlIjoiazJwcmludC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFdzU2Vzc2lvbkNvbnRhaW5lciBmcm9tICcuL1dzU2Vzc2lvbkNvbnRhaW5lcic7XHJcblxyXG4vKipcclxuICogZGVmaW5pbmcgdXNhYmxlIGFwaXMgZm9yIGpzcHJpbnQuXHJcbiAqL1xyXG5jbGFzcyBLMlByaW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyAgXHJcbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSB7XHJcbiAgICAgICAgICAgIGF1dG9DbGVhblVwOnRydWUsXHJcbiAgICAgICAgICAgIGF1dG9SZWNvbm5lY3Q6dHJ1ZSxcclxuICAgICAgICAgICAgaG9zdDonMTI3LjAuMC4xJyxcclxuICAgICAgICAgICAgcG9ydDonNTU1NTUnLFxyXG4gICAgICAgICAgICB1c2VTc2w6ZmFsc2VcclxuICAgICAgICB9OyAgIFxyXG4gICAgICAgIGNvbnN0IHByb3RvY29sID0gdGhpcy5fc2V0dGluZ3MudXNlU3NsID8gJ3dzcycgOiAnd3MnO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IGAke3Byb3RvY29sfTovLyR7dGhpcy5fc2V0dGluZ3MuaG9zdH06JHt0aGlzLl9zZXR0aW5ncy5wb3J0fS9gO1xyXG4gICAgICAgIHRoaXMuX3dzX2NvbnRhaW5lciA9IG5ldyBXc1Nlc3Npb25Db250YWluZXIodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICByZWNvbmZpZ3VyZShhcmdzKSB7XHJcbiAgICAgICAgdGhpcy5fd3NfY29udGFpbmVyICYmIHRoaXMuX3dzX2NvbnRhaW5lci5kZXN0b3J5KCk7ICAgICAgICAgICAgICBcclxuICAgICAgICBpZihhcmdzKSB7XHJcbiAgICAgICAgICAgIGlmKCBhcmdzLmNvbnN0cnVjdG9yICE9PSB7fS5jb25zdHJ1Y3Rvcil7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2sycHJpbnQgZXhwZWN0cyBhIGpzb24gb2JqZWN0IGF0IGFyZ3VtZW50c1swXSxhcyBmb2xsb3dzOlxcclxcbicgKyBKU09OLnN0cmluZ2lmeSh0aGlzLl9zZXR0aW5ncykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fc2V0dGluZ3MsIGFyZ3MpO1xyXG4gICAgICAgIH0gIFxyXG4gICAgICAgIGlmKHRoaXMuX3NldHRpbmdzLmF1dG9DbGVhblVwICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGsycCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IG9yZ2luYWxIYW5kbGVyID0gd2luZG93Lm9uYmVmb3JldW5sb2FkO1xyXG4gICAgICAgICAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQ9ZnVuY3Rpb24oZXZlbnQpIHsgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIG9yZ2luYWxIYW5kbGVyICYmIG9yZ2luYWxIYW5kbGVyKGV2ZW50KTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgazJwLmRlc3RvcnkoKTsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfTsgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwcm90b2NvbCA9IHRoaXMuX3NldHRpbmdzLnVzZVNzbCA/ICd3c3MnIDogJ3dzJztcclxuICAgICAgICBjb25zdCB1cmwgPSBgJHtwcm90b2NvbH06Ly8ke3RoaXMuX3NldHRpbmdzLmhvc3R9OiR7dGhpcy5fc2V0dGluZ3MucG9ydH0vYDtcclxuICAgICAgICB0aGlzLl93c19jb250YWluZXIgPSBuZXcgV3NTZXNzaW9uQ29udGFpbmVyKHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgbG9jYWwgcHJpbnRlciBsaXN0LlxyXG4gICAgICovXHJcbiAgICBnZXRfcHJpbnRlcnMoKSB7ICBcclxuICAgICAgICBjb25zdCB3c0NvbnRhaW5lciA9ICB0aGlzLl93c19jb250YWluZXI7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcclxuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IHdzQ29udGFpbmVyLm9wZW5TZXNzaW9uKCdnZXRfcHJpbnRlcnMnKTtcclxuICAgICAgICAgICAgc2Vzc2lvbi5zZW5kKCctJyk7XHJcbiAgICAgICAgICAgIHNlc3Npb24ub25tZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShtZXNzYWdlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2Vzc2lvbi5vbmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcGVyZm9ybSBwcmludCBpbiBsb2NhbCBwYy4gXHJcbiAgICAgKi9cclxuICAgIHByaW50X2V4ZWN1dGUoYXJncykge1xyXG4gICAgICAgIGNvbnN0IHdzQ29udGFpbmVyID0gIHRoaXMuX3dzX2NvbnRhaW5lcjtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe1xyXG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gd3NDb250YWluZXIub3BlblNlc3Npb24oJ3ByaW50X2V4ZWN1dGUnKTtcclxuICAgICAgICAgICAgc2Vzc2lvbi5zZW5kKGFyZ3MpO1xyXG4gICAgICAgICAgICBzZXNzaW9uLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlc3Npb24ub25lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChtZXNzYWdlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkb3dubG9hZF9maWxlKGFyZ3MpIHtcclxuICAgICAgICBjb25zdCB3c0NvbnRhaW5lciA9ICB0aGlzLl93c19jb250YWluZXI7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcclxuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IHdzQ29udGFpbmVyLm9wZW5TZXNzaW9uKCdkb3dubG9hZF9maWxlJyk7XHJcbiAgICAgICAgICAgIHNlc3Npb24uc2VuZChhcmdzKTtcclxuICAgICAgICAgICAgc2Vzc2lvbi5vbm1lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZXNzaW9uLm9uZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdG9yeSgpIHtcclxuICAgICAgICB0aGlzLl93c19jb250YWluZXIgJiYgdGhpcy5fd3NfY29udGFpbmVyLmRlc3RvcnkoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBLMlByaW50OyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNsYXNzIFdzU2Vzc2lvbntcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih3cywgYXBpKSB7XHJcbiAgICAgICAgdGhpcy5fYXBpID0gYXBpO1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VRdWV1ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3dzID0gd3M7ICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2VuZChtZXNzYWdlKSB7ICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICBpZiAoIXRoaXMuX3dzKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV3NTZXNzaW9uIGlzIG5vdCBhIHJpZ2h0IHN0YXRlLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3RbJyArIHRoaXMuX2FwaSArICddOicgKyBtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3dzLnJlYWR5U3RhdGUgPT09IDEpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgc3dpdGNoIChtZXNzYWdlLmNvbnN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0ZXN0Jy5jb25zdHJ1Y3RvcjogICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93cy5zZW5kKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBbXS5jb25zdHJ1Y3RvcjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93cy5zZW5kKG1lc3NhZ2Uuam9pbignfCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Uge30uY29uc3RydWN0b3I6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd3Muc2VuZChKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dzLnNlbmQobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlUXVldWUucHVzaChtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9ICBcclxuXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fd3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nsb3NlIGNvbm5lY3Rpb25bJyArIHRoaXMuX2FwaSArICddJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3dzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9ub3BlbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb3BlbiBjb25uZWN0aW9uWycgKyB0aGlzLl9hcGkgKyAnXScpO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLl9tZXNzYWdlUXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl93cy5zZW5kKHRoaXMuX21lc3NhZ2VRdWV1ZS5wb3AoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9ubWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlWycgKyB0aGlzLl9hcGkgKyAnXTonICsgbWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25jbG9zZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2xvc2VbJyArIHRoaXMuX2FwaSArICddJyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25lcnJvcihtZXNzYWdlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yWycgKyB0aGlzLl9hcGkgKyAnXTonICsgbWVzc2FnZSk7XHJcbiAgICB9ICAgICAgIFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFdzU2Vzc2lvbjsiLCJpbXBvcnQgV3NTZXNzaW9uIGZyb20gJy4vV3NTZXNzaW9uJztcclxuXHJcbid1c2Ugc3RyaWN0JztcclxuY2xhc3MgV3NTZXNzaW9uQ29udGFpbmVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsKSB7XHJcbiAgICAgICAgdGhpcy5fYmFzZVVybCA9IGJhc2VVcmw7XHJcbiAgICAgICAgdGhpcy5fc2Vzc2lvbnMgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlblNlc3Npb24oYXBpKSB7ICBcclxuICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBhcGk6JyArIGFwaSk7ICAgICBcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3Nlc3Npb25zLmhhcyhhcGkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXNzaW9ucy5nZXQoYXBpKTtcclxuICAgICAgICB9ICAgICAgXHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuX2Jhc2VVcmwgKyAodGhpcy5fYmFzZVVybC5lbmRzV2l0aCgnLycpID8gIGFwaSA6ICcvJythcGkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdPcGVuIHdlYiBzb2NrZXQgZnJvbTonICsgdXJsKTtcclxuICAgICAgICBjb25zdCB3cyA9IG5ldyBXZWJTb2NrZXQodXJsKTtcclxuICAgICAgICBjb25zdCBzZXNzaW9uID0gbmV3IFdzU2Vzc2lvbih3cywgYXBpKTsgICAgXHJcbiAgICAgICAgd3Mub25vcGVuID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXNzaW9uLm9ub3BlbigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgd3Mub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7ICAgICAgICAgIFxyXG4gICAgICAgICAgICBzZXNzaW9uLm9ubWVzc2FnZShldmVudC5kYXRhKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHdzLm9uZXJyb3IgPSAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgc2Vzc2lvbi5vbmVycm9yKGVycm9yKTtcclxuICAgICAgICB9OyAgICBcclxuICAgICAgICB3cy5vbmNsb3NlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXNzaW9ucy5kZWxldGUoYXBpKTtcclxuICAgICAgICAgICAgc2Vzc2lvbi5vbmNsb3NlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9zZXNzaW9ucy5zZXQoYXBpLCBzZXNzaW9uKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZVNlc3Npb24oYXBpKSB7XHJcbiAgICAgICAgaWYodGhpcy5fc2Vzc2lvbnMuaGFzKGFwaSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2Vzc2lvbnMuZ2V0KGFwaSkuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRlc3RvcnkoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgc2Vzc2lvbiBvZiB0aGlzLl9zZXNzaW9ucy52YWx1ZXMoKSl7XHJcbiAgICAgICAgICAgIHNlc3Npb24uY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgV3NTZXNzaW9uQ29udGFpbmVyOyIsIi8qKlxyXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxyXG4gKi9cclxuaW1wb3J0IEsyUHJpbnQgZnJvbSAnLi9LMlByaW50JztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgSzJQcmludCBhbmQgXHJcbiAqIGJpbmQgaXQgYXMgYSBwcm9wZXJ0eSBvZiB3aW5kb3cgb2JqZWN0LlxyXG4gKi9cclxuY29uc3QgazJwcmludCA9IG5ldyBLMlByaW50KCk7XHJcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgd2luZG93LmsycHJpbnQgPSBrMnByaW50O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGsycHJpbnQ7XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9