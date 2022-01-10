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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/merchants/lull.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/raven-js/src/configError.js":
/*!**************************************************!*\
  !*** ./node_modules/raven-js/src/configError.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function RavenConfigError(message) {
  this.name = 'RavenConfigError';
  this.message = message;
}
RavenConfigError.prototype = new Error();
RavenConfigError.prototype.constructor = RavenConfigError;

module.exports = RavenConfigError;


/***/ }),

/***/ "./node_modules/raven-js/src/console.js":
/*!**********************************************!*\
  !*** ./node_modules/raven-js/src/console.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/raven-js/src/utils.js");

var wrapMethod = function(console, level, callback) {
  var originalConsoleLevel = console[level];
  var originalConsole = console;

  if (!(level in console)) {
    return;
  }

  var sentryLevel = level === 'warn' ? 'warning' : level;

  console[level] = function() {
    var args = [].slice.call(arguments);

    var msg = utils.safeJoin(args, ' ');
    var data = {level: sentryLevel, logger: 'console', extra: {arguments: args}};

    if (level === 'assert') {
      if (args[0] === false) {
        // Default browsers message
        msg =
          'Assertion failed: ' + (utils.safeJoin(args.slice(1), ' ') || 'console.assert');
        data.extra.arguments = args.slice(1);
        callback && callback(msg, data);
      }
    } else {
      callback && callback(msg, data);
    }

    // this fails for some browsers. :(
    if (originalConsoleLevel) {
      // IE9 doesn't allow calling apply on console functions directly
      // See: https://stackoverflow.com/questions/5472938/does-ie9-support-console-log-and-is-it-a-real-function#answer-5473193
      Function.prototype.apply.call(originalConsoleLevel, originalConsole, args);
    }
  };
};

module.exports = {
  wrapMethod: wrapMethod
};


/***/ }),

/***/ "./node_modules/raven-js/src/raven.js":
/*!********************************************!*\
  !*** ./node_modules/raven-js/src/raven.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*global XDomainRequest:false */

var TraceKit = __webpack_require__(/*! ../vendor/TraceKit/tracekit */ "./node_modules/raven-js/vendor/TraceKit/tracekit.js");
var stringify = __webpack_require__(/*! ../vendor/json-stringify-safe/stringify */ "./node_modules/raven-js/vendor/json-stringify-safe/stringify.js");
var md5 = __webpack_require__(/*! ../vendor/md5/md5 */ "./node_modules/raven-js/vendor/md5/md5.js");
var RavenConfigError = __webpack_require__(/*! ./configError */ "./node_modules/raven-js/src/configError.js");

var utils = __webpack_require__(/*! ./utils */ "./node_modules/raven-js/src/utils.js");
var isErrorEvent = utils.isErrorEvent;
var isDOMError = utils.isDOMError;
var isDOMException = utils.isDOMException;
var isError = utils.isError;
var isObject = utils.isObject;
var isPlainObject = utils.isPlainObject;
var isUndefined = utils.isUndefined;
var isFunction = utils.isFunction;
var isString = utils.isString;
var isArray = utils.isArray;
var isEmptyObject = utils.isEmptyObject;
var each = utils.each;
var objectMerge = utils.objectMerge;
var truncate = utils.truncate;
var objectFrozen = utils.objectFrozen;
var hasKey = utils.hasKey;
var joinRegExp = utils.joinRegExp;
var urlencode = utils.urlencode;
var uuid4 = utils.uuid4;
var htmlTreeAsString = utils.htmlTreeAsString;
var isSameException = utils.isSameException;
var isSameStacktrace = utils.isSameStacktrace;
var parseUrl = utils.parseUrl;
var fill = utils.fill;
var supportsFetch = utils.supportsFetch;
var supportsReferrerPolicy = utils.supportsReferrerPolicy;
var serializeKeysForMessage = utils.serializeKeysForMessage;
var serializeException = utils.serializeException;
var sanitize = utils.sanitize;

var wrapConsoleMethod = __webpack_require__(/*! ./console */ "./node_modules/raven-js/src/console.js").wrapMethod;

var dsnKeys = 'source protocol user pass host port path'.split(' '),
  dsnPattern = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;

function now() {
  return +new Date();
}

// This is to be defensive in environments where window does not exist (see https://github.com/getsentry/raven-js/pull/785)
var _window =
  typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
var _document = _window.document;
var _navigator = _window.navigator;

function keepOriginalCallback(original, callback) {
  return isFunction(callback)
    ? function(data) {
        return callback(data, original);
      }
    : callback;
}

// First, check for JSON support
// If there is no JSON, we no-op the core features of Raven
// since JSON is required to encode the payload
function Raven() {
  this._hasJSON = !!(typeof JSON === 'object' && JSON.stringify);
  // Raven can run in contexts where there's no document (react-native)
  this._hasDocument = !isUndefined(_document);
  this._hasNavigator = !isUndefined(_navigator);
  this._lastCapturedException = null;
  this._lastData = null;
  this._lastEventId = null;
  this._globalServer = null;
  this._globalKey = null;
  this._globalProject = null;
  this._globalContext = {};
  this._globalOptions = {
    // SENTRY_RELEASE can be injected by https://github.com/getsentry/sentry-webpack-plugin
    release: _window.SENTRY_RELEASE && _window.SENTRY_RELEASE.id,
    logger: 'javascript',
    ignoreErrors: [],
    ignoreUrls: [],
    whitelistUrls: [],
    includePaths: [],
    headers: null,
    collectWindowErrors: true,
    captureUnhandledRejections: true,
    maxMessageLength: 0,
    // By default, truncates URL values to 250 chars
    maxUrlLength: 250,
    stackTraceLimit: 50,
    autoBreadcrumbs: true,
    instrument: true,
    sampleRate: 1,
    sanitizeKeys: []
  };
  this._fetchDefaults = {
    method: 'POST',
    // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
    // https://caniuse.com/#feat=referrer-policy
    // It doesn't. And it throw exception instead of ignoring this parameter...
    // REF: https://github.com/getsentry/raven-js/issues/1233
    referrerPolicy: supportsReferrerPolicy() ? 'origin' : ''
  };
  this._ignoreOnError = 0;
  this._isRavenInstalled = false;
  this._originalErrorStackTraceLimit = Error.stackTraceLimit;
  // capture references to window.console *and* all its methods first
  // before the console plugin has a chance to monkey patch
  this._originalConsole = _window.console || {};
  this._originalConsoleMethods = {};
  this._plugins = [];
  this._startTime = now();
  this._wrappedBuiltIns = [];
  this._breadcrumbs = [];
  this._lastCapturedEvent = null;
  this._keypressTimeout;
  this._location = _window.location;
  this._lastHref = this._location && this._location.href;
  this._resetBackoff();

  // eslint-disable-next-line guard-for-in
  for (var method in this._originalConsole) {
    this._originalConsoleMethods[method] = this._originalConsole[method];
  }
}

/*
 * The core Raven singleton
 *
 * @this {Raven}
 */

Raven.prototype = {
  // Hardcode version string so that raven source can be loaded directly via
  // webpack (using a build step causes webpack #1617). Grunt verifies that
  // this value matches package.json during build.
  //   See: https://github.com/getsentry/raven-js/issues/465
  VERSION: '3.27.2',

  debug: false,

  TraceKit: TraceKit, // alias to TraceKit

  /*
     * Configure Raven with a DSN and extra options
     *
     * @param {string} dsn The public Sentry DSN
     * @param {object} options Set of global options [optional]
     * @return {Raven}
     */
  config: function(dsn, options) {
    var self = this;

    if (self._globalServer) {
      this._logDebug('error', 'Error: Raven has already been configured');
      return self;
    }
    if (!dsn) return self;

    var globalOptions = self._globalOptions;

    // merge in options
    if (options) {
      each(options, function(key, value) {
        // tags and extra are special and need to be put into context
        if (key === 'tags' || key === 'extra' || key === 'user') {
          self._globalContext[key] = value;
        } else {
          globalOptions[key] = value;
        }
      });
    }

    self.setDSN(dsn);

    // "Script error." is hard coded into browsers for errors that it can't read.
    // this is the result of a script being pulled in from an external domain and CORS.
    globalOptions.ignoreErrors.push(/^Script error\.?$/);
    globalOptions.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/);

    // join regexp rules into one big rule
    globalOptions.ignoreErrors = joinRegExp(globalOptions.ignoreErrors);
    globalOptions.ignoreUrls = globalOptions.ignoreUrls.length
      ? joinRegExp(globalOptions.ignoreUrls)
      : false;
    globalOptions.whitelistUrls = globalOptions.whitelistUrls.length
      ? joinRegExp(globalOptions.whitelistUrls)
      : false;
    globalOptions.includePaths = joinRegExp(globalOptions.includePaths);
    globalOptions.maxBreadcrumbs = Math.max(
      0,
      Math.min(globalOptions.maxBreadcrumbs || 100, 100)
    ); // default and hard limit is 100

    var autoBreadcrumbDefaults = {
      xhr: true,
      console: true,
      dom: true,
      location: true,
      sentry: true
    };

    var autoBreadcrumbs = globalOptions.autoBreadcrumbs;
    if ({}.toString.call(autoBreadcrumbs) === '[object Object]') {
      autoBreadcrumbs = objectMerge(autoBreadcrumbDefaults, autoBreadcrumbs);
    } else if (autoBreadcrumbs !== false) {
      autoBreadcrumbs = autoBreadcrumbDefaults;
    }
    globalOptions.autoBreadcrumbs = autoBreadcrumbs;

    var instrumentDefaults = {
      tryCatch: true
    };

    var instrument = globalOptions.instrument;
    if ({}.toString.call(instrument) === '[object Object]') {
      instrument = objectMerge(instrumentDefaults, instrument);
    } else if (instrument !== false) {
      instrument = instrumentDefaults;
    }
    globalOptions.instrument = instrument;

    TraceKit.collectWindowErrors = !!globalOptions.collectWindowErrors;

    // return for chaining
    return self;
  },

  /*
     * Installs a global window.onerror error handler
     * to capture and report uncaught exceptions.
     * At this point, install() is required to be called due
     * to the way TraceKit is set up.
     *
     * @return {Raven}
     */
  install: function() {
    var self = this;
    if (self.isSetup() && !self._isRavenInstalled) {
      TraceKit.report.subscribe(function() {
        self._handleOnErrorStackInfo.apply(self, arguments);
      });

      if (self._globalOptions.captureUnhandledRejections) {
        self._attachPromiseRejectionHandler();
      }

      self._patchFunctionToString();

      if (self._globalOptions.instrument && self._globalOptions.instrument.tryCatch) {
        self._instrumentTryCatch();
      }

      if (self._globalOptions.autoBreadcrumbs) self._instrumentBreadcrumbs();

      // Install all of the plugins
      self._drainPlugins();

      self._isRavenInstalled = true;
    }

    Error.stackTraceLimit = self._globalOptions.stackTraceLimit;
    return this;
  },

  /*
     * Set the DSN (can be called multiple time unlike config)
     *
     * @param {string} dsn The public Sentry DSN
     */
  setDSN: function(dsn) {
    var self = this,
      uri = self._parseDSN(dsn),
      lastSlash = uri.path.lastIndexOf('/'),
      path = uri.path.substr(1, lastSlash);

    self._dsn = dsn;
    self._globalKey = uri.user;
    self._globalSecret = uri.pass && uri.pass.substr(1);
    self._globalProject = uri.path.substr(lastSlash + 1);

    self._globalServer = self._getGlobalServer(uri);

    self._globalEndpoint =
      self._globalServer + '/' + path + 'api/' + self._globalProject + '/store/';

    // Reset backoff state since we may be pointing at a
    // new project/server
    this._resetBackoff();
  },

  /*
     * Wrap code within a context so Raven can capture errors
     * reliably across domains that is executed immediately.
     *
     * @param {object} options A specific set of options for this context [optional]
     * @param {function} func The callback to be immediately executed within the context
     * @param {array} args An array of arguments to be called with the callback [optional]
     */
  context: function(options, func, args) {
    if (isFunction(options)) {
      args = func || [];
      func = options;
      options = {};
    }

    return this.wrap(options, func).apply(this, args);
  },

  /*
     * Wrap code within a context and returns back a new function to be executed
     *
     * @param {object} options A specific set of options for this context [optional]
     * @param {function} func The function to be wrapped in a new context
     * @param {function} _before A function to call before the try/catch wrapper [optional, private]
     * @return {function} The newly wrapped functions with a context
     */
  wrap: function(options, func, _before) {
    var self = this;
    // 1 argument has been passed, and it's not a function
    // so just return it
    if (isUndefined(func) && !isFunction(options)) {
      return options;
    }

    // options is optional
    if (isFunction(options)) {
      func = options;
      options = undefined;
    }

    // At this point, we've passed along 2 arguments, and the second one
    // is not a function either, so we'll just return the second argument.
    if (!isFunction(func)) {
      return func;
    }

    // We don't wanna wrap it twice!
    try {
      if (func.__raven__) {
        return func;
      }

      // If this has already been wrapped in the past, return that
      if (func.__raven_wrapper__) {
        return func.__raven_wrapper__;
      }
    } catch (e) {
      // Just accessing custom props in some Selenium environments
      // can cause a "Permission denied" exception (see raven-js#495).
      // Bail on wrapping and return the function as-is (defers to window.onerror).
      return func;
    }

    function wrapped() {
      var args = [],
        i = arguments.length,
        deep = !options || (options && options.deep !== false);

      if (_before && isFunction(_before)) {
        _before.apply(this, arguments);
      }

      // Recursively wrap all of a function's arguments that are
      // functions themselves.
      while (i--) args[i] = deep ? self.wrap(options, arguments[i]) : arguments[i];

      try {
        // Attempt to invoke user-land function
        // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
        //       means Raven caught an error invoking your application code. This is
        //       expected behavior and NOT indicative of a bug with Raven.js.
        return func.apply(this, args);
      } catch (e) {
        self._ignoreNextOnError();
        self.captureException(e, options);
        throw e;
      }
    }

    // copy over properties of the old function
    for (var property in func) {
      if (hasKey(func, property)) {
        wrapped[property] = func[property];
      }
    }
    wrapped.prototype = func.prototype;

    func.__raven_wrapper__ = wrapped;
    // Signal that this function has been wrapped/filled already
    // for both debugging and to prevent it to being wrapped/filled twice
    wrapped.__raven__ = true;
    wrapped.__orig__ = func;

    return wrapped;
  },

  /**
   * Uninstalls the global error handler.
   *
   * @return {Raven}
   */
  uninstall: function() {
    TraceKit.report.uninstall();

    this._detachPromiseRejectionHandler();
    this._unpatchFunctionToString();
    this._restoreBuiltIns();
    this._restoreConsole();

    Error.stackTraceLimit = this._originalErrorStackTraceLimit;
    this._isRavenInstalled = false;

    return this;
  },

  /**
   * Callback used for `unhandledrejection` event
   *
   * @param {PromiseRejectionEvent} event An object containing
   *   promise: the Promise that was rejected
   *   reason: the value with which the Promise was rejected
   * @return void
   */
  _promiseRejectionHandler: function(event) {
    this._logDebug('debug', 'Raven caught unhandled promise rejection:', event);
    this.captureException(event.reason, {
      mechanism: {
        type: 'onunhandledrejection',
        handled: false
      }
    });
  },

  /**
   * Installs the global promise rejection handler.
   *
   * @return {raven}
   */
  _attachPromiseRejectionHandler: function() {
    this._promiseRejectionHandler = this._promiseRejectionHandler.bind(this);
    _window.addEventListener &&
      _window.addEventListener('unhandledrejection', this._promiseRejectionHandler);
    return this;
  },

  /**
   * Uninstalls the global promise rejection handler.
   *
   * @return {raven}
   */
  _detachPromiseRejectionHandler: function() {
    _window.removeEventListener &&
      _window.removeEventListener('unhandledrejection', this._promiseRejectionHandler);
    return this;
  },

  /**
   * Manually capture an exception and send it over to Sentry
   *
   * @param {error} ex An exception to be logged
   * @param {object} options A specific set of options for this error [optional]
   * @return {Raven}
   */
  captureException: function(ex, options) {
    options = objectMerge({trimHeadFrames: 0}, options ? options : {});

    if (isErrorEvent(ex) && ex.error) {
      // If it is an ErrorEvent with `error` property, extract it to get actual Error
      ex = ex.error;
    } else if (isDOMError(ex) || isDOMException(ex)) {
      // If it is a DOMError or DOMException (which are legacy APIs, but still supported in some browsers)
      // then we just extract the name and message, as they don't provide anything else
      // https://developer.mozilla.org/en-US/docs/Web/API/DOMError
      // https://developer.mozilla.org/en-US/docs/Web/API/DOMException
      var name = ex.name || (isDOMError(ex) ? 'DOMError' : 'DOMException');
      var message = ex.message ? name + ': ' + ex.message : name;

      return this.captureMessage(
        message,
        objectMerge(options, {
          // neither DOMError or DOMException provide stack trace and we most likely wont get it this way as well
          // but it's barely any overhead so we may at least try
          stacktrace: true,
          trimHeadFrames: options.trimHeadFrames + 1
        })
      );
    } else if (isError(ex)) {
      // we have a real Error object
      ex = ex;
    } else if (isPlainObject(ex)) {
      // If it is plain Object, serialize it manually and extract options
      // This will allow us to group events based on top-level keys
      // which is much better than creating new group when any key/value change
      options = this._getCaptureExceptionOptionsFromPlainObject(options, ex);
      ex = new Error(options.message);
    } else {
      // If none of previous checks were valid, then it means that
      // it's not a DOMError/DOMException
      // it's not a plain Object
      // it's not a valid ErrorEvent (one with an error property)
      // it's not an Error
      // So bail out and capture it as a simple message:
      return this.captureMessage(
        ex,
        objectMerge(options, {
          stacktrace: true, // if we fall back to captureMessage, default to attempting a new trace
          trimHeadFrames: options.trimHeadFrames + 1
        })
      );
    }

    // Store the raw exception object for potential debugging and introspection
    this._lastCapturedException = ex;

    // TraceKit.report will re-raise any exception passed to it,
    // which means you have to wrap it in try/catch. Instead, we
    // can wrap it here and only re-raise if TraceKit.report
    // raises an exception different from the one we asked to
    // report on.
    try {
      var stack = TraceKit.computeStackTrace(ex);
      this._handleStackInfo(stack, options);
    } catch (ex1) {
      if (ex !== ex1) {
        throw ex1;
      }
    }

    return this;
  },

  _getCaptureExceptionOptionsFromPlainObject: function(currentOptions, ex) {
    var exKeys = Object.keys(ex).sort();
    var options = objectMerge(currentOptions, {
      message:
        'Non-Error exception captured with keys: ' + serializeKeysForMessage(exKeys),
      fingerprint: [md5(exKeys)],
      extra: currentOptions.extra || {}
    });
    options.extra.__serialized__ = serializeException(ex);

    return options;
  },

  /*
     * Manually send a message to Sentry
     *
     * @param {string} msg A plain message to be captured in Sentry
     * @param {object} options A specific set of options for this message [optional]
     * @return {Raven}
     */
  captureMessage: function(msg, options) {
    // config() automagically converts ignoreErrors from a list to a RegExp so we need to test for an
    // early call; we'll error on the side of logging anything called before configuration since it's
    // probably something you should see:
    if (
      !!this._globalOptions.ignoreErrors.test &&
      this._globalOptions.ignoreErrors.test(msg)
    ) {
      return;
    }

    options = options || {};
    msg = msg + ''; // Make sure it's actually a string

    var data = objectMerge(
      {
        message: msg
      },
      options
    );

    var ex;
    // Generate a "synthetic" stack trace from this point.
    // NOTE: If you are a Sentry user, and you are seeing this stack frame, it is NOT indicative
    //       of a bug with Raven.js. Sentry generates synthetic traces either by configuration,
    //       or if it catches a thrown object without a "stack" property.
    try {
      throw new Error(msg);
    } catch (ex1) {
      ex = ex1;
    }

    // null exception name so `Error` isn't prefixed to msg
    ex.name = null;
    var stack = TraceKit.computeStackTrace(ex);

    // stack[0] is `throw new Error(msg)` call itself, we are interested in the frame that was just before that, stack[1]
    var initialCall = isArray(stack.stack) && stack.stack[1];

    // if stack[1] is `Raven.captureException`, it means that someone passed a string to it and we redirected that call
    // to be handled by `captureMessage`, thus `initialCall` is the 3rd one, not 2nd
    // initialCall => captureException(string) => captureMessage(string)
    if (initialCall && initialCall.func === 'Raven.captureException') {
      initialCall = stack.stack[2];
    }

    var fileurl = (initialCall && initialCall.url) || '';

    if (
      !!this._globalOptions.ignoreUrls.test &&
      this._globalOptions.ignoreUrls.test(fileurl)
    ) {
      return;
    }

    if (
      !!this._globalOptions.whitelistUrls.test &&
      !this._globalOptions.whitelistUrls.test(fileurl)
    ) {
      return;
    }

    // Always attempt to get stacktrace if message is empty.
    // It's the only way to provide any helpful information to the user.
    if (this._globalOptions.stacktrace || options.stacktrace || data.message === '') {
      // fingerprint on msg, not stack trace (legacy behavior, could be revisited)
      data.fingerprint = data.fingerprint == null ? msg : data.fingerprint;

      options = objectMerge(
        {
          trimHeadFrames: 0
        },
        options
      );
      // Since we know this is a synthetic trace, the top frame (this function call)
      // MUST be from Raven.js, so mark it for trimming
      // We add to the trim counter so that callers can choose to trim extra frames, such
      // as utility functions.
      options.trimHeadFrames += 1;

      var frames = this._prepareFrames(stack, options);
      data.stacktrace = {
        // Sentry expects frames oldest to newest
        frames: frames.reverse()
      };
    }

    // Make sure that fingerprint is always wrapped in an array
    if (data.fingerprint) {
      data.fingerprint = isArray(data.fingerprint)
        ? data.fingerprint
        : [data.fingerprint];
    }

    // Fire away!
    this._send(data);

    return this;
  },

  captureBreadcrumb: function(obj) {
    var crumb = objectMerge(
      {
        timestamp: now() / 1000
      },
      obj
    );

    if (isFunction(this._globalOptions.breadcrumbCallback)) {
      var result = this._globalOptions.breadcrumbCallback(crumb);

      if (isObject(result) && !isEmptyObject(result)) {
        crumb = result;
      } else if (result === false) {
        return this;
      }
    }

    this._breadcrumbs.push(crumb);
    if (this._breadcrumbs.length > this._globalOptions.maxBreadcrumbs) {
      this._breadcrumbs.shift();
    }
    return this;
  },

  addPlugin: function(plugin /*arg1, arg2, ... argN*/) {
    var pluginArgs = [].slice.call(arguments, 1);

    this._plugins.push([plugin, pluginArgs]);
    if (this._isRavenInstalled) {
      this._drainPlugins();
    }

    return this;
  },

  /*
     * Set/clear a user to be sent along with the payload.
     *
     * @param {object} user An object representing user data [optional]
     * @return {Raven}
     */
  setUserContext: function(user) {
    // Intentionally do not merge here since that's an unexpected behavior.
    this._globalContext.user = user;

    return this;
  },

  /*
     * Merge extra attributes to be sent along with the payload.
     *
     * @param {object} extra An object representing extra data [optional]
     * @return {Raven}
     */
  setExtraContext: function(extra) {
    this._mergeContext('extra', extra);

    return this;
  },

  /*
     * Merge tags to be sent along with the payload.
     *
     * @param {object} tags An object representing tags [optional]
     * @return {Raven}
     */
  setTagsContext: function(tags) {
    this._mergeContext('tags', tags);

    return this;
  },

  /*
     * Clear all of the context.
     *
     * @return {Raven}
     */
  clearContext: function() {
    this._globalContext = {};

    return this;
  },

  /*
     * Get a copy of the current context. This cannot be mutated.
     *
     * @return {object} copy of context
     */
  getContext: function() {
    // lol javascript
    return JSON.parse(stringify(this._globalContext));
  },

  /*
     * Set environment of application
     *
     * @param {string} environment Typically something like 'production'.
     * @return {Raven}
     */
  setEnvironment: function(environment) {
    this._globalOptions.environment = environment;

    return this;
  },

  /*
     * Set release version of application
     *
     * @param {string} release Typically something like a git SHA to identify version
     * @return {Raven}
     */
  setRelease: function(release) {
    this._globalOptions.release = release;

    return this;
  },

  /*
     * Set the dataCallback option
     *
     * @param {function} callback The callback to run which allows the
     *                            data blob to be mutated before sending
     * @return {Raven}
     */
  setDataCallback: function(callback) {
    var original = this._globalOptions.dataCallback;
    this._globalOptions.dataCallback = keepOriginalCallback(original, callback);
    return this;
  },

  /*
     * Set the breadcrumbCallback option
     *
     * @param {function} callback The callback to run which allows filtering
     *                            or mutating breadcrumbs
     * @return {Raven}
     */
  setBreadcrumbCallback: function(callback) {
    var original = this._globalOptions.breadcrumbCallback;
    this._globalOptions.breadcrumbCallback = keepOriginalCallback(original, callback);
    return this;
  },

  /*
     * Set the shouldSendCallback option
     *
     * @param {function} callback The callback to run which allows
     *                            introspecting the blob before sending
     * @return {Raven}
     */
  setShouldSendCallback: function(callback) {
    var original = this._globalOptions.shouldSendCallback;
    this._globalOptions.shouldSendCallback = keepOriginalCallback(original, callback);
    return this;
  },

  /**
   * Override the default HTTP transport mechanism that transmits data
   * to the Sentry server.
   *
   * @param {function} transport Function invoked instead of the default
   *                             `makeRequest` handler.
   *
   * @return {Raven}
   */
  setTransport: function(transport) {
    this._globalOptions.transport = transport;

    return this;
  },

  /*
     * Get the latest raw exception that was captured by Raven.
     *
     * @return {error}
     */
  lastException: function() {
    return this._lastCapturedException;
  },

  /*
     * Get the last event id
     *
     * @return {string}
     */
  lastEventId: function() {
    return this._lastEventId;
  },

  /*
     * Determine if Raven is setup and ready to go.
     *
     * @return {boolean}
     */
  isSetup: function() {
    if (!this._hasJSON) return false; // needs JSON support
    if (!this._globalServer) {
      if (!this.ravenNotConfiguredError) {
        this.ravenNotConfiguredError = true;
        this._logDebug('error', 'Error: Raven has not been configured.');
      }
      return false;
    }
    return true;
  },

  afterLoad: function() {
    // TODO: remove window dependence?

    // Attempt to initialize Raven on load
    var RavenConfig = _window.RavenConfig;
    if (RavenConfig) {
      this.config(RavenConfig.dsn, RavenConfig.config).install();
    }
  },

  showReportDialog: function(options) {
    if (
      !_document // doesn't work without a document (React native)
    )
      return;

    options = objectMerge(
      {
        eventId: this.lastEventId(),
        dsn: this._dsn,
        user: this._globalContext.user || {}
      },
      options
    );

    if (!options.eventId) {
      throw new RavenConfigError('Missing eventId');
    }

    if (!options.dsn) {
      throw new RavenConfigError('Missing DSN');
    }

    var encode = encodeURIComponent;
    var encodedOptions = [];

    for (var key in options) {
      if (key === 'user') {
        var user = options.user;
        if (user.name) encodedOptions.push('name=' + encode(user.name));
        if (user.email) encodedOptions.push('email=' + encode(user.email));
      } else {
        encodedOptions.push(encode(key) + '=' + encode(options[key]));
      }
    }
    var globalServer = this._getGlobalServer(this._parseDSN(options.dsn));

    var script = _document.createElement('script');
    script.async = true;
    script.src = globalServer + '/api/embed/error-page/?' + encodedOptions.join('&');
    (_document.head || _document.body).appendChild(script);
  },

  /**** Private functions ****/
  _ignoreNextOnError: function() {
    var self = this;
    this._ignoreOnError += 1;
    setTimeout(function() {
      // onerror should trigger before setTimeout
      self._ignoreOnError -= 1;
    });
  },

  _triggerEvent: function(eventType, options) {
    // NOTE: `event` is a native browser thing, so let's avoid conflicting wiht it
    var evt, key;

    if (!this._hasDocument) return;

    options = options || {};

    eventType = 'raven' + eventType.substr(0, 1).toUpperCase() + eventType.substr(1);

    if (_document.createEvent) {
      evt = _document.createEvent('HTMLEvents');
      evt.initEvent(eventType, true, true);
    } else {
      evt = _document.createEventObject();
      evt.eventType = eventType;
    }

    for (key in options)
      if (hasKey(options, key)) {
        evt[key] = options[key];
      }

    if (_document.createEvent) {
      // IE9 if standards
      _document.dispatchEvent(evt);
    } else {
      // IE8 regardless of Quirks or Standards
      // IE9 if quirks
      try {
        _document.fireEvent('on' + evt.eventType.toLowerCase(), evt);
      } catch (e) {
        // Do nothing
      }
    }
  },

  /**
   * Wraps addEventListener to capture UI breadcrumbs
   * @param evtName the event name (e.g. "click")
   * @returns {Function}
   * @private
   */
  _breadcrumbEventHandler: function(evtName) {
    var self = this;
    return function(evt) {
      // reset keypress timeout; e.g. triggering a 'click' after
      // a 'keypress' will reset the keypress debounce so that a new
      // set of keypresses can be recorded
      self._keypressTimeout = null;

      // It's possible this handler might trigger multiple times for the same
      // event (e.g. event propagation through node ancestors). Ignore if we've
      // already captured the event.
      if (self._lastCapturedEvent === evt) return;

      self._lastCapturedEvent = evt;

      // try/catch both:
      // - accessing evt.target (see getsentry/raven-js#838, #768)
      // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
      //   can throw an exception in some circumstances.
      var target;
      try {
        target = htmlTreeAsString(evt.target);
      } catch (e) {
        target = '<unknown>';
      }

      self.captureBreadcrumb({
        category: 'ui.' + evtName, // e.g. ui.click, ui.input
        message: target
      });
    };
  },

  /**
   * Wraps addEventListener to capture keypress UI events
   * @returns {Function}
   * @private
   */
  _keypressEventHandler: function() {
    var self = this,
      debounceDuration = 1000; // milliseconds

    // TODO: if somehow user switches keypress target before
    //       debounce timeout is triggered, we will only capture
    //       a single breadcrumb from the FIRST target (acceptable?)
    return function(evt) {
      var target;
      try {
        target = evt.target;
      } catch (e) {
        // just accessing event properties can throw an exception in some rare circumstances
        // see: https://github.com/getsentry/raven-js/issues/838
        return;
      }
      var tagName = target && target.tagName;

      // only consider keypress events on actual input elements
      // this will disregard keypresses targeting body (e.g. tabbing
      // through elements, hotkeys, etc)
      if (
        !tagName ||
        (tagName !== 'INPUT' && tagName !== 'TEXTAREA' && !target.isContentEditable)
      )
        return;

      // record first keypress in a series, but ignore subsequent
      // keypresses until debounce clears
      var timeout = self._keypressTimeout;
      if (!timeout) {
        self._breadcrumbEventHandler('input')(evt);
      }
      clearTimeout(timeout);
      self._keypressTimeout = setTimeout(function() {
        self._keypressTimeout = null;
      }, debounceDuration);
    };
  },

  /**
   * Captures a breadcrumb of type "navigation", normalizing input URLs
   * @param to the originating URL
   * @param from the target URL
   * @private
   */
  _captureUrlChange: function(from, to) {
    var parsedLoc = parseUrl(this._location.href);
    var parsedTo = parseUrl(to);
    var parsedFrom = parseUrl(from);

    // because onpopstate only tells you the "new" (to) value of location.href, and
    // not the previous (from) value, we need to track the value of the current URL
    // state ourselves
    this._lastHref = to;

    // Use only the path component of the URL if the URL matches the current
    // document (almost all the time when using pushState)
    if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host)
      to = parsedTo.relative;
    if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host)
      from = parsedFrom.relative;

    this.captureBreadcrumb({
      category: 'navigation',
      data: {
        to: to,
        from: from
      }
    });
  },

  _patchFunctionToString: function() {
    var self = this;
    self._originalFunctionToString = Function.prototype.toString;
    // eslint-disable-next-line no-extend-native
    Function.prototype.toString = function() {
      if (typeof this === 'function' && this.__raven__) {
        return self._originalFunctionToString.apply(this.__orig__, arguments);
      }
      return self._originalFunctionToString.apply(this, arguments);
    };
  },

  _unpatchFunctionToString: function() {
    if (this._originalFunctionToString) {
      // eslint-disable-next-line no-extend-native
      Function.prototype.toString = this._originalFunctionToString;
    }
  },

  /**
   * Wrap timer functions and event targets to catch errors and provide
   * better metadata.
   */
  _instrumentTryCatch: function() {
    var self = this;

    var wrappedBuiltIns = self._wrappedBuiltIns;

    function wrapTimeFn(orig) {
      return function(fn, t) {
        // preserve arity
        // Make a copy of the arguments to prevent deoptimization
        // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i) {
          args[i] = arguments[i];
        }
        var originalCallback = args[0];
        if (isFunction(originalCallback)) {
          args[0] = self.wrap(
            {
              mechanism: {
                type: 'instrument',
                data: {function: orig.name || '<anonymous>'}
              }
            },
            originalCallback
          );
        }

        // IE < 9 doesn't support .call/.apply on setInterval/setTimeout, but it
        // also supports only two arguments and doesn't care what this is, so we
        // can just call the original function directly.
        if (orig.apply) {
          return orig.apply(this, args);
        } else {
          return orig(args[0], args[1]);
        }
      };
    }

    var autoBreadcrumbs = this._globalOptions.autoBreadcrumbs;

    function wrapEventTarget(global) {
      var proto = _window[global] && _window[global].prototype;
      if (proto && proto.hasOwnProperty && proto.hasOwnProperty('addEventListener')) {
        fill(
          proto,
          'addEventListener',
          function(orig) {
            return function(evtName, fn, capture, secure) {
              // preserve arity
              try {
                if (fn && fn.handleEvent) {
                  fn.handleEvent = self.wrap(
                    {
                      mechanism: {
                        type: 'instrument',
                        data: {
                          target: global,
                          function: 'handleEvent',
                          handler: (fn && fn.name) || '<anonymous>'
                        }
                      }
                    },
                    fn.handleEvent
                  );
                }
              } catch (err) {
                // can sometimes get 'Permission denied to access property "handle Event'
              }

              // More breadcrumb DOM capture ... done here and not in `_instrumentBreadcrumbs`
              // so that we don't have more than one wrapper function
              var before, clickHandler, keypressHandler;

              if (
                autoBreadcrumbs &&
                autoBreadcrumbs.dom &&
                (global === 'EventTarget' || global === 'Node')
              ) {
                // NOTE: generating multiple handlers per addEventListener invocation, should
                //       revisit and verify we can just use one (almost certainly)
                clickHandler = self._breadcrumbEventHandler('click');
                keypressHandler = self._keypressEventHandler();
                before = function(evt) {
                  // need to intercept every DOM event in `before` argument, in case that
                  // same wrapped method is re-used for different events (e.g. mousemove THEN click)
                  // see #724
                  if (!evt) return;

                  var eventType;
                  try {
                    eventType = evt.type;
                  } catch (e) {
                    // just accessing event properties can throw an exception in some rare circumstances
                    // see: https://github.com/getsentry/raven-js/issues/838
                    return;
                  }
                  if (eventType === 'click') return clickHandler(evt);
                  else if (eventType === 'keypress') return keypressHandler(evt);
                };
              }
              return orig.call(
                this,
                evtName,
                self.wrap(
                  {
                    mechanism: {
                      type: 'instrument',
                      data: {
                        target: global,
                        function: 'addEventListener',
                        handler: (fn && fn.name) || '<anonymous>'
                      }
                    }
                  },
                  fn,
                  before
                ),
                capture,
                secure
              );
            };
          },
          wrappedBuiltIns
        );
        fill(
          proto,
          'removeEventListener',
          function(orig) {
            return function(evt, fn, capture, secure) {
              try {
                fn = fn && (fn.__raven_wrapper__ ? fn.__raven_wrapper__ : fn);
              } catch (e) {
                // ignore, accessing __raven_wrapper__ will throw in some Selenium environments
              }
              return orig.call(this, evt, fn, capture, secure);
            };
          },
          wrappedBuiltIns
        );
      }
    }

    fill(_window, 'setTimeout', wrapTimeFn, wrappedBuiltIns);
    fill(_window, 'setInterval', wrapTimeFn, wrappedBuiltIns);
    if (_window.requestAnimationFrame) {
      fill(
        _window,
        'requestAnimationFrame',
        function(orig) {
          return function(cb) {
            return orig(
              self.wrap(
                {
                  mechanism: {
                    type: 'instrument',
                    data: {
                      function: 'requestAnimationFrame',
                      handler: (orig && orig.name) || '<anonymous>'
                    }
                  }
                },
                cb
              )
            );
          };
        },
        wrappedBuiltIns
      );
    }

    // event targets borrowed from bugsnag-js:
    // https://github.com/bugsnag/bugsnag-js/blob/master/src/bugsnag.js#L666
    var eventTargets = [
      'EventTarget',
      'Window',
      'Node',
      'ApplicationCache',
      'AudioTrackList',
      'ChannelMergerNode',
      'CryptoOperation',
      'EventSource',
      'FileReader',
      'HTMLUnknownElement',
      'IDBDatabase',
      'IDBRequest',
      'IDBTransaction',
      'KeyOperation',
      'MediaController',
      'MessagePort',
      'ModalWindow',
      'Notification',
      'SVGElementInstance',
      'Screen',
      'TextTrack',
      'TextTrackCue',
      'TextTrackList',
      'WebSocket',
      'WebSocketWorker',
      'Worker',
      'XMLHttpRequest',
      'XMLHttpRequestEventTarget',
      'XMLHttpRequestUpload'
    ];
    for (var i = 0; i < eventTargets.length; i++) {
      wrapEventTarget(eventTargets[i]);
    }
  },

  /**
   * Instrument browser built-ins w/ breadcrumb capturing
   *  - XMLHttpRequests
   *  - DOM interactions (click/typing)
   *  - window.location changes
   *  - console
   *
   * Can be disabled or individually configured via the `autoBreadcrumbs` config option
   */
  _instrumentBreadcrumbs: function() {
    var self = this;
    var autoBreadcrumbs = this._globalOptions.autoBreadcrumbs;

    var wrappedBuiltIns = self._wrappedBuiltIns;

    function wrapProp(prop, xhr) {
      if (prop in xhr && isFunction(xhr[prop])) {
        fill(xhr, prop, function(orig) {
          return self.wrap(
            {
              mechanism: {
                type: 'instrument',
                data: {function: prop, handler: (orig && orig.name) || '<anonymous>'}
              }
            },
            orig
          );
        }); // intentionally don't track filled methods on XHR instances
      }
    }

    if (autoBreadcrumbs.xhr && 'XMLHttpRequest' in _window) {
      var xhrproto = _window.XMLHttpRequest && _window.XMLHttpRequest.prototype;
      fill(
        xhrproto,
        'open',
        function(origOpen) {
          return function(method, url) {
            // preserve arity

            // if Sentry key appears in URL, don't capture
            if (isString(url) && url.indexOf(self._globalKey) === -1) {
              this.__raven_xhr = {
                method: method,
                url: url,
                status_code: null
              };
            }

            return origOpen.apply(this, arguments);
          };
        },
        wrappedBuiltIns
      );

      fill(
        xhrproto,
        'send',
        function(origSend) {
          return function() {
            // preserve arity
            var xhr = this;

            function onreadystatechangeHandler() {
              if (xhr.__raven_xhr && xhr.readyState === 4) {
                try {
                  // touching statusCode in some platforms throws
                  // an exception
                  xhr.__raven_xhr.status_code = xhr.status;
                } catch (e) {
                  /* do nothing */
                }

                self.captureBreadcrumb({
                  type: 'http',
                  category: 'xhr',
                  data: xhr.__raven_xhr
                });
              }
            }

            var props = ['onload', 'onerror', 'onprogress'];
            for (var j = 0; j < props.length; j++) {
              wrapProp(props[j], xhr);
            }

            if ('onreadystatechange' in xhr && isFunction(xhr.onreadystatechange)) {
              fill(
                xhr,
                'onreadystatechange',
                function(orig) {
                  return self.wrap(
                    {
                      mechanism: {
                        type: 'instrument',
                        data: {
                          function: 'onreadystatechange',
                          handler: (orig && orig.name) || '<anonymous>'
                        }
                      }
                    },
                    orig,
                    onreadystatechangeHandler
                  );
                } /* intentionally don't track this instrumentation */
              );
            } else {
              // if onreadystatechange wasn't actually set by the page on this xhr, we
              // are free to set our own and capture the breadcrumb
              xhr.onreadystatechange = onreadystatechangeHandler;
            }

            return origSend.apply(this, arguments);
          };
        },
        wrappedBuiltIns
      );
    }

    if (autoBreadcrumbs.xhr && supportsFetch()) {
      fill(
        _window,
        'fetch',
        function(origFetch) {
          return function() {
            // preserve arity
            // Make a copy of the arguments to prevent deoptimization
            // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
            var args = new Array(arguments.length);
            for (var i = 0; i < args.length; ++i) {
              args[i] = arguments[i];
            }

            var fetchInput = args[0];
            var method = 'GET';
            var url;

            if (typeof fetchInput === 'string') {
              url = fetchInput;
            } else if ('Request' in _window && fetchInput instanceof _window.Request) {
              url = fetchInput.url;
              if (fetchInput.method) {
                method = fetchInput.method;
              }
            } else {
              url = '' + fetchInput;
            }

            // if Sentry key appears in URL, don't capture, as it's our own request
            if (url.indexOf(self._globalKey) !== -1) {
              return origFetch.apply(this, args);
            }

            if (args[1] && args[1].method) {
              method = args[1].method;
            }

            var fetchData = {
              method: method,
              url: url,
              status_code: null
            };

            return origFetch
              .apply(this, args)
              .then(function(response) {
                fetchData.status_code = response.status;

                self.captureBreadcrumb({
                  type: 'http',
                  category: 'fetch',
                  data: fetchData
                });

                return response;
              })
              ['catch'](function(err) {
                // if there is an error performing the request
                self.captureBreadcrumb({
                  type: 'http',
                  category: 'fetch',
                  data: fetchData,
                  level: 'error'
                });

                throw err;
              });
          };
        },
        wrappedBuiltIns
      );
    }

    // Capture breadcrumbs from any click that is unhandled / bubbled up all the way
    // to the document. Do this before we instrument addEventListener.
    if (autoBreadcrumbs.dom && this._hasDocument) {
      if (_document.addEventListener) {
        _document.addEventListener('click', self._breadcrumbEventHandler('click'), false);
        _document.addEventListener('keypress', self._keypressEventHandler(), false);
      } else if (_document.attachEvent) {
        // IE8 Compatibility
        _document.attachEvent('onclick', self._breadcrumbEventHandler('click'));
        _document.attachEvent('onkeypress', self._keypressEventHandler());
      }
    }

    // record navigation (URL) changes
    // NOTE: in Chrome App environment, touching history.pushState, *even inside
    //       a try/catch block*, will cause Chrome to output an error to console.error
    // borrowed from: https://github.com/angular/angular.js/pull/13945/files
    var chrome = _window.chrome;
    var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
    var hasPushAndReplaceState =
      !isChromePackagedApp &&
      _window.history &&
      _window.history.pushState &&
      _window.history.replaceState;
    if (autoBreadcrumbs.location && hasPushAndReplaceState) {
      // TODO: remove onpopstate handler on uninstall()
      var oldOnPopState = _window.onpopstate;
      _window.onpopstate = function() {
        var currentHref = self._location.href;
        self._captureUrlChange(self._lastHref, currentHref);

        if (oldOnPopState) {
          return oldOnPopState.apply(this, arguments);
        }
      };

      var historyReplacementFunction = function(origHistFunction) {
        // note history.pushState.length is 0; intentionally not declaring
        // params to preserve 0 arity
        return function(/* state, title, url */) {
          var url = arguments.length > 2 ? arguments[2] : undefined;

          // url argument is optional
          if (url) {
            // coerce to string (this is what pushState does)
            self._captureUrlChange(self._lastHref, url + '');
          }

          return origHistFunction.apply(this, arguments);
        };
      };

      fill(_window.history, 'pushState', historyReplacementFunction, wrappedBuiltIns);
      fill(_window.history, 'replaceState', historyReplacementFunction, wrappedBuiltIns);
    }

    if (autoBreadcrumbs.console && 'console' in _window && console.log) {
      // console
      var consoleMethodCallback = function(msg, data) {
        self.captureBreadcrumb({
          message: msg,
          level: data.level,
          category: 'console'
        });
      };

      each(['debug', 'info', 'warn', 'error', 'log'], function(_, level) {
        wrapConsoleMethod(console, level, consoleMethodCallback);
      });
    }
  },

  _restoreBuiltIns: function() {
    // restore any wrapped builtins
    var builtin;
    while (this._wrappedBuiltIns.length) {
      builtin = this._wrappedBuiltIns.shift();

      var obj = builtin[0],
        name = builtin[1],
        orig = builtin[2];

      obj[name] = orig;
    }
  },

  _restoreConsole: function() {
    // eslint-disable-next-line guard-for-in
    for (var method in this._originalConsoleMethods) {
      this._originalConsole[method] = this._originalConsoleMethods[method];
    }
  },

  _drainPlugins: function() {
    var self = this;

    // FIX ME TODO
    each(this._plugins, function(_, plugin) {
      var installer = plugin[0];
      var args = plugin[1];
      installer.apply(self, [self].concat(args));
    });
  },

  _parseDSN: function(str) {
    var m = dsnPattern.exec(str),
      dsn = {},
      i = 7;

    try {
      while (i--) dsn[dsnKeys[i]] = m[i] || '';
    } catch (e) {
      throw new RavenConfigError('Invalid DSN: ' + str);
    }

    if (dsn.pass && !this._globalOptions.allowSecretKey) {
      throw new RavenConfigError(
        'Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key'
      );
    }

    return dsn;
  },

  _getGlobalServer: function(uri) {
    // assemble the endpoint from the uri pieces
    var globalServer = '//' + uri.host + (uri.port ? ':' + uri.port : '');

    if (uri.protocol) {
      globalServer = uri.protocol + ':' + globalServer;
    }
    return globalServer;
  },

  _handleOnErrorStackInfo: function(stackInfo, options) {
    options = options || {};
    options.mechanism = options.mechanism || {
      type: 'onerror',
      handled: false
    };

    // if we are intentionally ignoring errors via onerror, bail out
    if (!this._ignoreOnError) {
      this._handleStackInfo(stackInfo, options);
    }
  },

  _handleStackInfo: function(stackInfo, options) {
    var frames = this._prepareFrames(stackInfo, options);

    this._triggerEvent('handle', {
      stackInfo: stackInfo,
      options: options
    });

    this._processException(
      stackInfo.name,
      stackInfo.message,
      stackInfo.url,
      stackInfo.lineno,
      frames,
      options
    );
  },

  _prepareFrames: function(stackInfo, options) {
    var self = this;
    var frames = [];
    if (stackInfo.stack && stackInfo.stack.length) {
      each(stackInfo.stack, function(i, stack) {
        var frame = self._normalizeFrame(stack, stackInfo.url);
        if (frame) {
          frames.push(frame);
        }
      });

      // e.g. frames captured via captureMessage throw
      if (options && options.trimHeadFrames) {
        for (var j = 0; j < options.trimHeadFrames && j < frames.length; j++) {
          frames[j].in_app = false;
        }
      }
    }
    frames = frames.slice(0, this._globalOptions.stackTraceLimit);
    return frames;
  },

  _normalizeFrame: function(frame, stackInfoUrl) {
    // normalize the frames data
    var normalized = {
      filename: frame.url,
      lineno: frame.line,
      colno: frame.column,
      function: frame.func || '?'
    };

    // Case when we don't have any information about the error
    // E.g. throwing a string or raw object, instead of an `Error` in Firefox
    // Generating synthetic error doesn't add any value here
    //
    // We should probably somehow let a user know that they should fix their code
    if (!frame.url) {
      normalized.filename = stackInfoUrl; // fallback to whole stacks url from onerror handler
    }

    normalized.in_app = !// determine if an exception came from outside of our app
    // first we check the global includePaths list.
    (
      (!!this._globalOptions.includePaths.test &&
        !this._globalOptions.includePaths.test(normalized.filename)) ||
      // Now we check for fun, if the function name is Raven or TraceKit
      /(Raven|TraceKit)\./.test(normalized['function']) ||
      // finally, we do a last ditch effort and check for raven.min.js
      /raven\.(min\.)?js$/.test(normalized.filename)
    );

    return normalized;
  },

  _processException: function(type, message, fileurl, lineno, frames, options) {
    var prefixedMessage = (type ? type + ': ' : '') + (message || '');
    if (
      !!this._globalOptions.ignoreErrors.test &&
      (this._globalOptions.ignoreErrors.test(message) ||
        this._globalOptions.ignoreErrors.test(prefixedMessage))
    ) {
      return;
    }

    var stacktrace;

    if (frames && frames.length) {
      fileurl = frames[0].filename || fileurl;
      // Sentry expects frames oldest to newest
      // and JS sends them as newest to oldest
      frames.reverse();
      stacktrace = {frames: frames};
    } else if (fileurl) {
      stacktrace = {
        frames: [
          {
            filename: fileurl,
            lineno: lineno,
            in_app: true
          }
        ]
      };
    }

    if (
      !!this._globalOptions.ignoreUrls.test &&
      this._globalOptions.ignoreUrls.test(fileurl)
    ) {
      return;
    }

    if (
      !!this._globalOptions.whitelistUrls.test &&
      !this._globalOptions.whitelistUrls.test(fileurl)
    ) {
      return;
    }

    var data = objectMerge(
      {
        // sentry.interfaces.Exception
        exception: {
          values: [
            {
              type: type,
              value: message,
              stacktrace: stacktrace
            }
          ]
        },
        transaction: fileurl
      },
      options
    );

    var ex = data.exception.values[0];
    if (ex.type == null && ex.value === '') {
      ex.value = 'Unrecoverable error caught';
    }

    // Move mechanism from options to exception interface
    // We do this, as requiring user to pass `{exception:{mechanism:{ ... }}}` would be
    // too much
    if (!data.exception.mechanism && data.mechanism) {
      data.exception.mechanism = data.mechanism;
      delete data.mechanism;
    }

    data.exception.mechanism = objectMerge(
      {
        type: 'generic',
        handled: true
      },
      data.exception.mechanism || {}
    );

    // Fire away!
    this._send(data);
  },

  _trimPacket: function(data) {
    // For now, we only want to truncate the two different messages
    // but this could/should be expanded to just trim everything
    var max = this._globalOptions.maxMessageLength;
    if (data.message) {
      data.message = truncate(data.message, max);
    }
    if (data.exception) {
      var exception = data.exception.values[0];
      exception.value = truncate(exception.value, max);
    }

    var request = data.request;
    if (request) {
      if (request.url) {
        request.url = truncate(request.url, this._globalOptions.maxUrlLength);
      }
      if (request.Referer) {
        request.Referer = truncate(request.Referer, this._globalOptions.maxUrlLength);
      }
    }

    if (data.breadcrumbs && data.breadcrumbs.values)
      this._trimBreadcrumbs(data.breadcrumbs);

    return data;
  },

  /**
   * Truncate breadcrumb values (right now just URLs)
   */
  _trimBreadcrumbs: function(breadcrumbs) {
    // known breadcrumb properties with urls
    // TODO: also consider arbitrary prop values that start with (https?)?://
    var urlProps = ['to', 'from', 'url'],
      urlProp,
      crumb,
      data;

    for (var i = 0; i < breadcrumbs.values.length; ++i) {
      crumb = breadcrumbs.values[i];
      if (
        !crumb.hasOwnProperty('data') ||
        !isObject(crumb.data) ||
        objectFrozen(crumb.data)
      )
        continue;

      data = objectMerge({}, crumb.data);
      for (var j = 0; j < urlProps.length; ++j) {
        urlProp = urlProps[j];
        if (data.hasOwnProperty(urlProp) && data[urlProp]) {
          data[urlProp] = truncate(data[urlProp], this._globalOptions.maxUrlLength);
        }
      }
      breadcrumbs.values[i].data = data;
    }
  },

  _getHttpData: function() {
    if (!this._hasNavigator && !this._hasDocument) return;
    var httpData = {};

    if (this._hasNavigator && _navigator.userAgent) {
      httpData.headers = {
        'User-Agent': _navigator.userAgent
      };
    }

    // Check in `window` instead of `document`, as we may be in ServiceWorker environment
    if (_window.location && _window.location.href) {
      httpData.url = _window.location.href;
    }

    if (this._hasDocument && _document.referrer) {
      if (!httpData.headers) httpData.headers = {};
      httpData.headers.Referer = _document.referrer;
    }

    return httpData;
  },

  _resetBackoff: function() {
    this._backoffDuration = 0;
    this._backoffStart = null;
  },

  _shouldBackoff: function() {
    return this._backoffDuration && now() - this._backoffStart < this._backoffDuration;
  },

  /**
   * Returns true if the in-process data payload matches the signature
   * of the previously-sent data
   *
   * NOTE: This has to be done at this level because TraceKit can generate
   *       data from window.onerror WITHOUT an exception object (IE8, IE9,
   *       other old browsers). This can take the form of an "exception"
   *       data object with a single frame (derived from the onerror args).
   */
  _isRepeatData: function(current) {
    var last = this._lastData;

    if (
      !last ||
      current.message !== last.message || // defined for captureMessage
      current.transaction !== last.transaction // defined for captureException/onerror
    )
      return false;

    // Stacktrace interface (i.e. from captureMessage)
    if (current.stacktrace || last.stacktrace) {
      return isSameStacktrace(current.stacktrace, last.stacktrace);
    } else if (current.exception || last.exception) {
      // Exception interface (i.e. from captureException/onerror)
      return isSameException(current.exception, last.exception);
    } else if (current.fingerprint || last.fingerprint) {
      return Boolean(current.fingerprint && last.fingerprint) &&
        JSON.stringify(current.fingerprint) === JSON.stringify(last.fingerprint)
    }

    return true;
  },

  _setBackoffState: function(request) {
    // If we are already in a backoff state, don't change anything
    if (this._shouldBackoff()) {
      return;
    }

    var status = request.status;

    // 400 - project_id doesn't exist or some other fatal
    // 401 - invalid/revoked dsn
    // 429 - too many requests
    if (!(status === 400 || status === 401 || status === 429)) return;

    var retry;
    try {
      // If Retry-After is not in Access-Control-Expose-Headers, most
      // browsers will throw an exception trying to access it
      if (supportsFetch()) {
        retry = request.headers.get('Retry-After');
      } else {
        retry = request.getResponseHeader('Retry-After');
      }

      // Retry-After is returned in seconds
      retry = parseInt(retry, 10) * 1000;
    } catch (e) {
      /* eslint no-empty:0 */
    }

    this._backoffDuration = retry
      ? // If Sentry server returned a Retry-After value, use it
        retry
      : // Otherwise, double the last backoff duration (starts at 1 sec)
        this._backoffDuration * 2 || 1000;

    this._backoffStart = now();
  },

  _send: function(data) {
    var globalOptions = this._globalOptions;

    var baseData = {
        project: this._globalProject,
        logger: globalOptions.logger,
        platform: 'javascript'
      },
      httpData = this._getHttpData();

    if (httpData) {
      baseData.request = httpData;
    }

    // HACK: delete `trimHeadFrames` to prevent from appearing in outbound payload
    if (data.trimHeadFrames) delete data.trimHeadFrames;

    data = objectMerge(baseData, data);

    // Merge in the tags and extra separately since objectMerge doesn't handle a deep merge
    data.tags = objectMerge(objectMerge({}, this._globalContext.tags), data.tags);
    data.extra = objectMerge(objectMerge({}, this._globalContext.extra), data.extra);

    // Send along our own collected metadata with extra
    data.extra['session:duration'] = now() - this._startTime;

    if (this._breadcrumbs && this._breadcrumbs.length > 0) {
      // intentionally make shallow copy so that additions
      // to breadcrumbs aren't accidentally sent in this request
      data.breadcrumbs = {
        values: [].slice.call(this._breadcrumbs, 0)
      };
    }

    if (this._globalContext.user) {
      // sentry.interfaces.User
      data.user = this._globalContext.user;
    }

    // Include the environment if it's defined in globalOptions
    if (globalOptions.environment) data.environment = globalOptions.environment;

    // Include the release if it's defined in globalOptions
    if (globalOptions.release) data.release = globalOptions.release;

    // Include server_name if it's defined in globalOptions
    if (globalOptions.serverName) data.server_name = globalOptions.serverName;

    data = this._sanitizeData(data);

    // Cleanup empty properties before sending them to the server
    Object.keys(data).forEach(function(key) {
      if (data[key] == null || data[key] === '' || isEmptyObject(data[key])) {
        delete data[key];
      }
    });

    if (isFunction(globalOptions.dataCallback)) {
      data = globalOptions.dataCallback(data) || data;
    }

    // Why??????????
    if (!data || isEmptyObject(data)) {
      return;
    }

    // Check if the request should be filtered or not
    if (
      isFunction(globalOptions.shouldSendCallback) &&
      !globalOptions.shouldSendCallback(data)
    ) {
      return;
    }

    // Backoff state: Sentry server previously responded w/ an error (e.g. 429 - too many requests),
    // so drop requests until "cool-off" period has elapsed.
    if (this._shouldBackoff()) {
      this._logDebug('warn', 'Raven dropped error due to backoff: ', data);
      return;
    }

    if (typeof globalOptions.sampleRate === 'number') {
      if (Math.random() < globalOptions.sampleRate) {
        this._sendProcessedPayload(data);
      }
    } else {
      this._sendProcessedPayload(data);
    }
  },

  _sanitizeData: function(data) {
    return sanitize(data, this._globalOptions.sanitizeKeys);
  },

  _getUuid: function() {
    return uuid4();
  },

  _sendProcessedPayload: function(data, callback) {
    var self = this;
    var globalOptions = this._globalOptions;

    if (!this.isSetup()) return;

    // Try and clean up the packet before sending by truncating long values
    data = this._trimPacket(data);

    // ideally duplicate error testing should occur *before* dataCallback/shouldSendCallback,
    // but this would require copying an un-truncated copy of the data packet, which can be
    // arbitrarily deep (extra_data) -- could be worthwhile? will revisit
    if (!this._globalOptions.allowDuplicates && this._isRepeatData(data)) {
      this._logDebug('warn', 'Raven dropped repeat event: ', data);
      return;
    }

    // Send along an event_id if not explicitly passed.
    // This event_id can be used to reference the error within Sentry itself.
    // Set lastEventId after we know the error should actually be sent
    this._lastEventId = data.event_id || (data.event_id = this._getUuid());

    // Store outbound payload after trim
    this._lastData = data;

    this._logDebug('debug', 'Raven about to send:', data);

    var auth = {
      sentry_version: '7',
      sentry_client: 'raven-js/' + this.VERSION,
      sentry_key: this._globalKey
    };

    if (this._globalSecret) {
      auth.sentry_secret = this._globalSecret;
    }

    var exception = data.exception && data.exception.values[0];

    // only capture 'sentry' breadcrumb is autoBreadcrumbs is truthy
    if (
      this._globalOptions.autoBreadcrumbs &&
      this._globalOptions.autoBreadcrumbs.sentry
    ) {
      this.captureBreadcrumb({
        category: 'sentry',
        message: exception
          ? (exception.type ? exception.type + ': ' : '') + exception.value
          : data.message,
        event_id: data.event_id,
        level: data.level || 'error' // presume error unless specified
      });
    }

    var url = this._globalEndpoint;
    (globalOptions.transport || this._makeRequest).call(this, {
      url: url,
      auth: auth,
      data: data,
      options: globalOptions,
      onSuccess: function success() {
        self._resetBackoff();

        self._triggerEvent('success', {
          data: data,
          src: url
        });
        callback && callback();
      },
      onError: function failure(error) {
        self._logDebug('error', 'Raven transport failed to send: ', error);

        if (error.request) {
          self._setBackoffState(error.request);
        }

        self._triggerEvent('failure', {
          data: data,
          src: url
        });
        error = error || new Error('Raven send failed (no additional details provided)');
        callback && callback(error);
      }
    });
  },

  _makeRequest: function(opts) {
    // Auth is intentionally sent as part of query string (NOT as custom HTTP header) to avoid preflight CORS requests
    var url = opts.url + '?' + urlencode(opts.auth);

    var evaluatedHeaders = null;
    var evaluatedFetchParameters = {};

    if (opts.options.headers) {
      evaluatedHeaders = this._evaluateHash(opts.options.headers);
    }

    if (opts.options.fetchParameters) {
      evaluatedFetchParameters = this._evaluateHash(opts.options.fetchParameters);
    }

    if (supportsFetch()) {
      evaluatedFetchParameters.body = stringify(opts.data);

      var defaultFetchOptions = objectMerge({}, this._fetchDefaults);
      var fetchOptions = objectMerge(defaultFetchOptions, evaluatedFetchParameters);

      if (evaluatedHeaders) {
        fetchOptions.headers = evaluatedHeaders;
      }

      return _window
        .fetch(url, fetchOptions)
        .then(function(response) {
          if (response.ok) {
            opts.onSuccess && opts.onSuccess();
          } else {
            var error = new Error('Sentry error code: ' + response.status);
            // It's called request only to keep compatibility with XHR interface
            // and not add more redundant checks in setBackoffState method
            error.request = response;
            opts.onError && opts.onError(error);
          }
        })
        ['catch'](function() {
          opts.onError &&
            opts.onError(new Error('Sentry error code: network unavailable'));
        });
    }

    var request = _window.XMLHttpRequest && new _window.XMLHttpRequest();
    if (!request) return;

    // if browser doesn't support CORS (e.g. IE7), we are out of luck
    var hasCORS = 'withCredentials' in request || typeof XDomainRequest !== 'undefined';

    if (!hasCORS) return;

    if ('withCredentials' in request) {
      request.onreadystatechange = function() {
        if (request.readyState !== 4) {
          return;
        } else if (request.status === 200) {
          opts.onSuccess && opts.onSuccess();
        } else if (opts.onError) {
          var err = new Error('Sentry error code: ' + request.status);
          err.request = request;
          opts.onError(err);
        }
      };
    } else {
      request = new XDomainRequest();
      // xdomainrequest cannot go http -> https (or vice versa),
      // so always use protocol relative
      url = url.replace(/^https?:/, '');

      // onreadystatechange not supported by XDomainRequest
      if (opts.onSuccess) {
        request.onload = opts.onSuccess;
      }
      if (opts.onError) {
        request.onerror = function() {
          var err = new Error('Sentry error code: XDomainRequest');
          err.request = request;
          opts.onError(err);
        };
      }
    }

    request.open('POST', url);

    if (evaluatedHeaders) {
      each(evaluatedHeaders, function(key, value) {
        request.setRequestHeader(key, value);
      });
    }

    request.send(stringify(opts.data));
  },

  _evaluateHash: function(hash) {
    var evaluated = {};

    for (var key in hash) {
      if (hash.hasOwnProperty(key)) {
        var value = hash[key];
        evaluated[key] = typeof value === 'function' ? value() : value;
      }
    }

    return evaluated;
  },

  _logDebug: function(level) {
    // We allow `Raven.debug` and `Raven.config(DSN, { debug: true })` to not make backward incompatible API change
    if (
      this._originalConsoleMethods[level] &&
      (this.debug || this._globalOptions.debug)
    ) {
      // In IE<10 console methods do not have their own 'apply' method
      Function.prototype.apply.call(
        this._originalConsoleMethods[level],
        this._originalConsole,
        [].slice.call(arguments, 1)
      );
    }
  },

  _mergeContext: function(key, context) {
    if (isUndefined(context)) {
      delete this._globalContext[key];
    } else {
      this._globalContext[key] = objectMerge(this._globalContext[key] || {}, context);
    }
  }
};

// Deprecations
Raven.prototype.setUser = Raven.prototype.setUserContext;
Raven.prototype.setReleaseContext = Raven.prototype.setRelease;

module.exports = Raven;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/raven-js/src/singleton.js":
/*!************************************************!*\
  !*** ./node_modules/raven-js/src/singleton.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Enforces a single instance of the Raven client, and the
 * main entry point for Raven. If you are a consumer of the
 * Raven library, you SHOULD load this file (vs raven.js).
 **/

var RavenConstructor = __webpack_require__(/*! ./raven */ "./node_modules/raven-js/src/raven.js");

// This is to be defensive in environments where window does not exist (see https://github.com/getsentry/raven-js/pull/785)
var _window =
  typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
var _Raven = _window.Raven;

var Raven = new RavenConstructor();

/*
 * Allow multiple versions of Raven to be installed.
 * Strip Raven from the global context and returns the instance.
 *
 * @return {Raven}
 */
Raven.noConflict = function() {
  _window.Raven = _Raven;
  return Raven;
};

Raven.afterLoad();

module.exports = Raven;

/**
 * DISCLAIMER:
 *
 * Expose `Client` constructor for cases where user want to track multiple "sub-applications" in one larger app.
 * It's not meant to be used by a wide audience, so pleaaase make sure that you know what you're doing before using it.
 * Accidentally calling `install` multiple times, may result in an unexpected behavior that's very hard to debug.
 *
 * It's called `Client' to be in-line with Raven Node implementation.
 *
 * HOWTO:
 *
 * import Raven from 'raven-js';
 *
 * const someAppReporter = new Raven.Client();
 * const someOtherAppReporter = new Raven.Client();
 *
 * someAppReporter.config('__DSN__', {
 *   ...config goes here
 * });
 *
 * someOtherAppReporter.config('__OTHER_DSN__', {
 *   ...config goes here
 * });
 *
 * someAppReporter.captureMessage(...);
 * someAppReporter.captureException(...);
 * someAppReporter.captureBreadcrumb(...);
 *
 * someOtherAppReporter.captureMessage(...);
 * someOtherAppReporter.captureException(...);
 * someOtherAppReporter.captureBreadcrumb(...);
 *
 * It should "just work".
 */
module.exports.Client = RavenConstructor;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/raven-js/src/utils.js":
/*!********************************************!*\
  !*** ./node_modules/raven-js/src/utils.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var stringify = __webpack_require__(/*! ../vendor/json-stringify-safe/stringify */ "./node_modules/raven-js/vendor/json-stringify-safe/stringify.js");

var _window =
  typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
        ? self
        : {};

function isObject(what) {
  return typeof what === 'object' && what !== null;
}

// Yanked from https://git.io/vS8DV re-used under CC0
// with some tiny modifications
function isError(value) {
  switch (Object.prototype.toString.call(value)) {
    case '[object Error]':
      return true;
    case '[object Exception]':
      return true;
    case '[object DOMException]':
      return true;
    default:
      return value instanceof Error;
  }
}

function isErrorEvent(value) {
  return Object.prototype.toString.call(value) === '[object ErrorEvent]';
}

function isDOMError(value) {
  return Object.prototype.toString.call(value) === '[object DOMError]';
}

function isDOMException(value) {
  return Object.prototype.toString.call(value) === '[object DOMException]';
}

function isUndefined(what) {
  return what === void 0;
}

function isFunction(what) {
  return typeof what === 'function';
}

function isPlainObject(what) {
  return Object.prototype.toString.call(what) === '[object Object]';
}

function isString(what) {
  return Object.prototype.toString.call(what) === '[object String]';
}

function isArray(what) {
  return Object.prototype.toString.call(what) === '[object Array]';
}

function isEmptyObject(what) {
  if (!isPlainObject(what)) return false;

  for (var _ in what) {
    if (what.hasOwnProperty(_)) {
      return false;
    }
  }
  return true;
}

function supportsErrorEvent() {
  try {
    new ErrorEvent(''); // eslint-disable-line no-new
    return true;
  } catch (e) {
    return false;
  }
}

function supportsDOMError() {
  try {
    new DOMError(''); // eslint-disable-line no-new
    return true;
  } catch (e) {
    return false;
  }
}

function supportsDOMException() {
  try {
    new DOMException(''); // eslint-disable-line no-new
    return true;
  } catch (e) {
    return false;
  }
}

function supportsFetch() {
  if (!('fetch' in _window)) return false;

  try {
    new Headers(); // eslint-disable-line no-new
    new Request(''); // eslint-disable-line no-new
    new Response(); // eslint-disable-line no-new
    return true;
  } catch (e) {
    return false;
  }
}

// Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
// https://caniuse.com/#feat=referrer-policy
// It doesn't. And it throw exception instead of ignoring this parameter...
// REF: https://github.com/getsentry/raven-js/issues/1233
function supportsReferrerPolicy() {
  if (!supportsFetch()) return false;

  try {
    // eslint-disable-next-line no-new
    new Request('pickleRick', {
      referrerPolicy: 'origin'
    });
    return true;
  } catch (e) {
    return false;
  }
}

function supportsPromiseRejectionEvent() {
  return typeof PromiseRejectionEvent === 'function';
}

function wrappedCallback(callback) {
  function dataCallback(data, original) {
    var normalizedData = callback(data) || data;
    if (original) {
      return original(normalizedData) || normalizedData;
    }
    return normalizedData;
  }

  return dataCallback;
}

function each(obj, callback) {
  var i, j;

  if (isUndefined(obj.length)) {
    for (i in obj) {
      if (hasKey(obj, i)) {
        callback.call(null, i, obj[i]);
      }
    }
  } else {
    j = obj.length;
    if (j) {
      for (i = 0; i < j; i++) {
        callback.call(null, i, obj[i]);
      }
    }
  }
}

function objectMerge(obj1, obj2) {
  if (!obj2) {
    return obj1;
  }
  each(obj2, function(key, value) {
    obj1[key] = value;
  });
  return obj1;
}

/**
 * This function is only used for react-native.
 * react-native freezes object that have already been sent over the
 * js bridge. We need this function in order to check if the object is frozen.
 * So it's ok that objectFrozen returns false if Object.isFrozen is not
 * supported because it's not relevant for other "platforms". See related issue:
 * https://github.com/getsentry/react-native-sentry/issues/57
 */
function objectFrozen(obj) {
  if (!Object.isFrozen) {
    return false;
  }
  return Object.isFrozen(obj);
}

function truncate(str, max) {
  if (typeof max !== 'number') {
    throw new Error('2nd argument to `truncate` function should be a number');
  }
  if (typeof str !== 'string' || max === 0) {
    return str;
  }
  return str.length <= max ? str : str.substr(0, max) + '\u2026';
}

/**
 * hasKey, a better form of hasOwnProperty
 * Example: hasKey(MainHostObject, property) === true/false
 *
 * @param {Object} host object to check property
 * @param {string} key to check
 */
function hasKey(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function joinRegExp(patterns) {
  // Combine an array of regular expressions and strings into one large regexp
  // Be mad.
  var sources = [],
    i = 0,
    len = patterns.length,
    pattern;

  for (; i < len; i++) {
    pattern = patterns[i];
    if (isString(pattern)) {
      // If it's a string, we need to escape it
      // Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
      sources.push(pattern.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'));
    } else if (pattern && pattern.source) {
      // If it's a regexp already, we want to extract the source
      sources.push(pattern.source);
    }
    // Intentionally skip other cases
  }
  return new RegExp(sources.join('|'), 'i');
}

function urlencode(o) {
  var pairs = [];
  each(o, function(key, value) {
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
  });
  return pairs.join('&');
}

// borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
// intentionally using regex and not <a/> href parsing trick because React Native and other
// environments where DOM might not be available
function parseUrl(url) {
  if (typeof url !== 'string') return {};
  var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);

  // coerce to undefined values to empty string so we don't get 'undefined'
  var query = match[6] || '';
  var fragment = match[8] || '';
  return {
    protocol: match[2],
    host: match[4],
    path: match[5],
    relative: match[5] + query + fragment // everything minus origin
  };
}
function uuid4() {
  var crypto = _window.crypto || _window.msCrypto;

  if (!isUndefined(crypto) && crypto.getRandomValues) {
    // Use window.crypto API if available
    // eslint-disable-next-line no-undef
    var arr = new Uint16Array(8);
    crypto.getRandomValues(arr);

    // set 4 in byte 7
    arr[3] = (arr[3] & 0xfff) | 0x4000;
    // set 2 most significant bits of byte 9 to '10'
    arr[4] = (arr[4] & 0x3fff) | 0x8000;

    var pad = function(num) {
      var v = num.toString(16);
      while (v.length < 4) {
        v = '0' + v;
      }
      return v;
    };

    return (
      pad(arr[0]) +
      pad(arr[1]) +
      pad(arr[2]) +
      pad(arr[3]) +
      pad(arr[4]) +
      pad(arr[5]) +
      pad(arr[6]) +
      pad(arr[7])
    );
  } else {
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

/**
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @param elem
 * @returns {string}
 */
function htmlTreeAsString(elem) {
  /* eslint no-extra-parens:0*/
  var MAX_TRAVERSE_HEIGHT = 5,
    MAX_OUTPUT_LEN = 80,
    out = [],
    height = 0,
    len = 0,
    separator = ' > ',
    sepLength = separator.length,
    nextStr;

  while (elem && height++ < MAX_TRAVERSE_HEIGHT) {
    nextStr = htmlElementAsString(elem);
    // bail out if
    // - nextStr is the 'html' element
    // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
    //   (ignore this limit if we are on the first iteration)
    if (
      nextStr === 'html' ||
      (height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN)
    ) {
      break;
    }

    out.push(nextStr);

    len += nextStr.length;
    elem = elem.parentNode;
  }

  return out.reverse().join(separator);
}

/**
 * Returns a simple, query-selector representation of a DOM element
 * e.g. [HTMLElement] => input#foo.btn[name=baz]
 * @param HTMLElement
 * @returns {string}
 */
function htmlElementAsString(elem) {
  var out = [],
    className,
    classes,
    key,
    attr,
    i;

  if (!elem || !elem.tagName) {
    return '';
  }

  out.push(elem.tagName.toLowerCase());
  if (elem.id) {
    out.push('#' + elem.id);
  }

  className = elem.className;
  if (className && isString(className)) {
    classes = className.split(/\s+/);
    for (i = 0; i < classes.length; i++) {
      out.push('.' + classes[i]);
    }
  }
  var attrWhitelist = ['type', 'name', 'title', 'alt'];
  for (i = 0; i < attrWhitelist.length; i++) {
    key = attrWhitelist[i];
    attr = elem.getAttribute(key);
    if (attr) {
      out.push('[' + key + '="' + attr + '"]');
    }
  }
  return out.join('');
}

/**
 * Returns true if either a OR b is truthy, but not both
 */
function isOnlyOneTruthy(a, b) {
  return !!(!!a ^ !!b);
}

/**
 * Returns true if both parameters are undefined
 */
function isBothUndefined(a, b) {
  return isUndefined(a) && isUndefined(b);
}

/**
 * Returns true if the two input exception interfaces have the same content
 */
function isSameException(ex1, ex2) {
  if (isOnlyOneTruthy(ex1, ex2)) return false;

  ex1 = ex1.values[0];
  ex2 = ex2.values[0];

  if (ex1.type !== ex2.type || ex1.value !== ex2.value) return false;

  // in case both stacktraces are undefined, we can't decide so default to false
  if (isBothUndefined(ex1.stacktrace, ex2.stacktrace)) return false;

  return isSameStacktrace(ex1.stacktrace, ex2.stacktrace);
}

/**
 * Returns true if the two input stack trace interfaces have the same content
 */
function isSameStacktrace(stack1, stack2) {
  if (isOnlyOneTruthy(stack1, stack2)) return false;

  var frames1 = stack1.frames;
  var frames2 = stack2.frames;

  // Exit early if stacktrace is malformed
  if (frames1 === undefined || frames2 === undefined) return false;

  // Exit early if frame count differs
  if (frames1.length !== frames2.length) return false;

  // Iterate through every frame; bail out if anything differs
  var a, b;
  for (var i = 0; i < frames1.length; i++) {
    a = frames1[i];
    b = frames2[i];
    if (
      a.filename !== b.filename ||
      a.lineno !== b.lineno ||
      a.colno !== b.colno ||
      a['function'] !== b['function']
    )
      return false;
  }
  return true;
}

/**
 * Polyfill a method
 * @param obj object e.g. `document`
 * @param name method name present on object e.g. `addEventListener`
 * @param replacement replacement function
 * @param track {optional} record instrumentation to an array
 */
function fill(obj, name, replacement, track) {
  if (obj == null) return;
  var orig = obj[name];
  obj[name] = replacement(orig);
  obj[name].__raven__ = true;
  obj[name].__orig__ = orig;
  if (track) {
    track.push([obj, name, orig]);
  }
}

/**
 * Join values in array
 * @param input array of values to be joined together
 * @param delimiter string to be placed in-between values
 * @returns {string}
 */
function safeJoin(input, delimiter) {
  if (!isArray(input)) return '';

  var output = [];

  for (var i = 0; i < input.length; i++) {
    try {
      output.push(String(input[i]));
    } catch (e) {
      output.push('[value cannot be serialized]');
    }
  }

  return output.join(delimiter);
}

// Default Node.js REPL depth
var MAX_SERIALIZE_EXCEPTION_DEPTH = 3;
// 50kB, as 100kB is max payload size, so half sounds reasonable
var MAX_SERIALIZE_EXCEPTION_SIZE = 50 * 1024;
var MAX_SERIALIZE_KEYS_LENGTH = 40;

function utf8Length(value) {
  return ~-encodeURI(value).split(/%..|./).length;
}

function jsonSize(value) {
  return utf8Length(JSON.stringify(value));
}

function serializeValue(value) {
  if (typeof value === 'string') {
    var maxLength = 40;
    return truncate(value, maxLength);
  } else if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined'
  ) {
    return value;
  }

  var type = Object.prototype.toString.call(value);

  // Node.js REPL notation
  if (type === '[object Object]') return '[Object]';
  if (type === '[object Array]') return '[Array]';
  if (type === '[object Function]')
    return value.name ? '[Function: ' + value.name + ']' : '[Function]';

  return value;
}

function serializeObject(value, depth) {
  if (depth === 0) return serializeValue(value);

  if (isPlainObject(value)) {
    return Object.keys(value).reduce(function(acc, key) {
      acc[key] = serializeObject(value[key], depth - 1);
      return acc;
    }, {});
  } else if (Array.isArray(value)) {
    return value.map(function(val) {
      return serializeObject(val, depth - 1);
    });
  }

  return serializeValue(value);
}

function serializeException(ex, depth, maxSize) {
  if (!isPlainObject(ex)) return ex;

  depth = typeof depth !== 'number' ? MAX_SERIALIZE_EXCEPTION_DEPTH : depth;
  maxSize = typeof depth !== 'number' ? MAX_SERIALIZE_EXCEPTION_SIZE : maxSize;

  var serialized = serializeObject(ex, depth);

  if (jsonSize(stringify(serialized)) > maxSize) {
    return serializeException(ex, depth - 1);
  }

  return serialized;
}

function serializeKeysForMessage(keys, maxLength) {
  if (typeof keys === 'number' || typeof keys === 'string') return keys.toString();
  if (!Array.isArray(keys)) return '';

  keys = keys.filter(function(key) {
    return typeof key === 'string';
  });
  if (keys.length === 0) return '[object has no keys]';

  maxLength = typeof maxLength !== 'number' ? MAX_SERIALIZE_KEYS_LENGTH : maxLength;
  if (keys[0].length >= maxLength) return keys[0];

  for (var usedKeys = keys.length; usedKeys > 0; usedKeys--) {
    var serialized = keys.slice(0, usedKeys).join(', ');
    if (serialized.length > maxLength) continue;
    if (usedKeys === keys.length) return serialized;
    return serialized + '\u2026';
  }

  return '';
}

function sanitize(input, sanitizeKeys) {
  if (!isArray(sanitizeKeys) || (isArray(sanitizeKeys) && sanitizeKeys.length === 0))
    return input;

  var sanitizeRegExp = joinRegExp(sanitizeKeys);
  var sanitizeMask = '********';
  var safeInput;

  try {
    safeInput = JSON.parse(stringify(input));
  } catch (o_O) {
    return input;
  }

  function sanitizeWorker(workerInput) {
    if (isArray(workerInput)) {
      return workerInput.map(function(val) {
        return sanitizeWorker(val);
      });
    }

    if (isPlainObject(workerInput)) {
      return Object.keys(workerInput).reduce(function(acc, k) {
        if (sanitizeRegExp.test(k)) {
          acc[k] = sanitizeMask;
        } else {
          acc[k] = sanitizeWorker(workerInput[k]);
        }
        return acc;
      }, {});
    }

    return workerInput;
  }

  return sanitizeWorker(safeInput);
}

module.exports = {
  isObject: isObject,
  isError: isError,
  isErrorEvent: isErrorEvent,
  isDOMError: isDOMError,
  isDOMException: isDOMException,
  isUndefined: isUndefined,
  isFunction: isFunction,
  isPlainObject: isPlainObject,
  isString: isString,
  isArray: isArray,
  isEmptyObject: isEmptyObject,
  supportsErrorEvent: supportsErrorEvent,
  supportsDOMError: supportsDOMError,
  supportsDOMException: supportsDOMException,
  supportsFetch: supportsFetch,
  supportsReferrerPolicy: supportsReferrerPolicy,
  supportsPromiseRejectionEvent: supportsPromiseRejectionEvent,
  wrappedCallback: wrappedCallback,
  each: each,
  objectMerge: objectMerge,
  truncate: truncate,
  objectFrozen: objectFrozen,
  hasKey: hasKey,
  joinRegExp: joinRegExp,
  urlencode: urlencode,
  uuid4: uuid4,
  htmlTreeAsString: htmlTreeAsString,
  htmlElementAsString: htmlElementAsString,
  isSameException: isSameException,
  isSameStacktrace: isSameStacktrace,
  parseUrl: parseUrl,
  fill: fill,
  safeJoin: safeJoin,
  serializeException: serializeException,
  serializeKeysForMessage: serializeKeysForMessage,
  sanitize: sanitize
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/raven-js/vendor/TraceKit/tracekit.js":
/*!***********************************************************!*\
  !*** ./node_modules/raven-js/vendor/TraceKit/tracekit.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var utils = __webpack_require__(/*! ../../src/utils */ "./node_modules/raven-js/src/utils.js");

/*
 TraceKit - Cross brower stack traces

 This was originally forked from github.com/occ/TraceKit, but has since been
 largely re-written and is now maintained as part of raven-js.  Tests for
 this are in test/vendor.

 MIT license
*/

var TraceKit = {
  collectWindowErrors: true,
  debug: false
};

// This is to be defensive in environments where window does not exist (see https://github.com/getsentry/raven-js/pull/785)
var _window =
  typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : {};

// global reference to slice
var _slice = [].slice;
var UNKNOWN_FUNCTION = '?';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types
var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;

function getLocationHref() {
  if (typeof document === 'undefined' || document.location == null) return '';
  return document.location.href;
}

function getLocationOrigin() {
  if (typeof document === 'undefined' || document.location == null) return '';

  // Oh dear IE10...
  if (!document.location.origin) {
    return (
      document.location.protocol +
      '//' +
      document.location.hostname +
      (document.location.port ? ':' + document.location.port : '')
    );
  }

  return document.location.origin;
}

/**
 * TraceKit.report: cross-browser processing of unhandled exceptions
 *
 * Syntax:
 *   TraceKit.report.subscribe(function(stackInfo) { ... })
 *   TraceKit.report.unsubscribe(function(stackInfo) { ... })
 *   TraceKit.report(exception)
 *   try { ...code... } catch(ex) { TraceKit.report(ex); }
 *
 * Supports:
 *   - Firefox: full stack trace with line numbers, plus column number
 *              on top frame; column number is not guaranteed
 *   - Opera:   full stack trace with line and column numbers
 *   - Chrome:  full stack trace with line and column numbers
 *   - Safari:  line and column number for the top frame only; some frames
 *              may be missing, and column number is not guaranteed
 *   - IE:      line and column number for the top frame only; some frames
 *              may be missing, and column number is not guaranteed
 *
 * In theory, TraceKit should work on all of the following versions:
 *   - IE5.5+ (only 8.0 tested)
 *   - Firefox 0.9+ (only 3.5+ tested)
 *   - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
 *     Exceptions Have Stacktrace to be enabled in opera:config)
 *   - Safari 3+ (only 4+ tested)
 *   - Chrome 1+ (only 5+ tested)
 *   - Konqueror 3.5+ (untested)
 *
 * Requires TraceKit.computeStackTrace.
 *
 * Tries to catch all unhandled exceptions and report them to the
 * subscribed handlers. Please note that TraceKit.report will rethrow the
 * exception. This is REQUIRED in order to get a useful stack trace in IE.
 * If the exception does not reach the top of the browser, you will only
 * get a stack trace from the point where TraceKit.report was called.
 *
 * Handlers receive a stackInfo object as described in the
 * TraceKit.computeStackTrace docs.
 */
TraceKit.report = (function reportModuleWrapper() {
  var handlers = [],
    lastArgs = null,
    lastException = null,
    lastExceptionStack = null;

  /**
   * Add a crash handler.
   * @param {Function} handler
   */
  function subscribe(handler) {
    installGlobalHandler();
    handlers.push(handler);
  }

  /**
   * Remove a crash handler.
   * @param {Function} handler
   */
  function unsubscribe(handler) {
    for (var i = handlers.length - 1; i >= 0; --i) {
      if (handlers[i] === handler) {
        handlers.splice(i, 1);
      }
    }
  }

  /**
   * Remove all crash handlers.
   */
  function unsubscribeAll() {
    uninstallGlobalHandler();
    handlers = [];
  }

  /**
   * Dispatch stack information to all handlers.
   * @param {Object.<string, *>} stack
   */
  function notifyHandlers(stack, isWindowError) {
    var exception = null;
    if (isWindowError && !TraceKit.collectWindowErrors) {
      return;
    }
    for (var i in handlers) {
      if (handlers.hasOwnProperty(i)) {
        try {
          handlers[i].apply(null, [stack].concat(_slice.call(arguments, 2)));
        } catch (inner) {
          exception = inner;
        }
      }
    }

    if (exception) {
      throw exception;
    }
  }

  var _oldOnerrorHandler, _onErrorHandlerInstalled;

  /**
   * Ensures all global unhandled exceptions are recorded.
   * Supported by Gecko and IE.
   * @param {string} msg Error message.
   * @param {string} url URL of script that generated the exception.
   * @param {(number|string)} lineNo The line number at which the error
   * occurred.
   * @param {?(number|string)} colNo The column number at which the error
   * occurred.
   * @param {?Error} ex The actual Error object.
   */
  function traceKitWindowOnError(msg, url, lineNo, colNo, ex) {
    var stack = null;
    // If 'ex' is ErrorEvent, get real Error from inside
    var exception = utils.isErrorEvent(ex) ? ex.error : ex;
    // If 'msg' is ErrorEvent, get real message from inside
    var message = utils.isErrorEvent(msg) ? msg.message : msg;

    if (lastExceptionStack) {
      TraceKit.computeStackTrace.augmentStackTraceWithInitialElement(
        lastExceptionStack,
        url,
        lineNo,
        message
      );
      processLastException();
    } else if (exception && utils.isError(exception)) {
      // non-string `exception` arg; attempt to extract stack trace

      // New chrome and blink send along a real error object
      // Let's just report that like a normal error.
      // See: https://mikewest.org/2013/08/debugging-runtime-errors-with-window-onerror
      stack = TraceKit.computeStackTrace(exception);
      notifyHandlers(stack, true);
    } else {
      var location = {
        url: url,
        line: lineNo,
        column: colNo
      };

      var name = undefined;
      var groups;

      if ({}.toString.call(message) === '[object String]') {
        var groups = message.match(ERROR_TYPES_RE);
        if (groups) {
          name = groups[1];
          message = groups[2];
        }
      }

      location.func = UNKNOWN_FUNCTION;

      stack = {
        name: name,
        message: message,
        url: getLocationHref(),
        stack: [location]
      };
      notifyHandlers(stack, true);
    }

    if (_oldOnerrorHandler) {
      return _oldOnerrorHandler.apply(this, arguments);
    }

    return false;
  }

  function installGlobalHandler() {
    if (_onErrorHandlerInstalled) {
      return;
    }
    _oldOnerrorHandler = _window.onerror;
    _window.onerror = traceKitWindowOnError;
    _onErrorHandlerInstalled = true;
  }

  function uninstallGlobalHandler() {
    if (!_onErrorHandlerInstalled) {
      return;
    }
    _window.onerror = _oldOnerrorHandler;
    _onErrorHandlerInstalled = false;
    _oldOnerrorHandler = undefined;
  }

  function processLastException() {
    var _lastExceptionStack = lastExceptionStack,
      _lastArgs = lastArgs;
    lastArgs = null;
    lastExceptionStack = null;
    lastException = null;
    notifyHandlers.apply(null, [_lastExceptionStack, false].concat(_lastArgs));
  }

  /**
   * Reports an unhandled Error to TraceKit.
   * @param {Error} ex
   * @param {?boolean} rethrow If false, do not re-throw the exception.
   * Only used for window.onerror to not cause an infinite loop of
   * rethrowing.
   */
  function report(ex, rethrow) {
    var args = _slice.call(arguments, 1);
    if (lastExceptionStack) {
      if (lastException === ex) {
        return; // already caught by an inner catch block, ignore
      } else {
        processLastException();
      }
    }

    var stack = TraceKit.computeStackTrace(ex);
    lastExceptionStack = stack;
    lastException = ex;
    lastArgs = args;

    // If the stack trace is incomplete, wait for 2 seconds for
    // slow slow IE to see if onerror occurs or not before reporting
    // this exception; otherwise, we will end up with an incomplete
    // stack trace
    setTimeout(
      function() {
        if (lastException === ex) {
          processLastException();
        }
      },
      stack.incomplete ? 2000 : 0
    );

    if (rethrow !== false) {
      throw ex; // re-throw to propagate to the top level (and cause window.onerror)
    }
  }

  report.subscribe = subscribe;
  report.unsubscribe = unsubscribe;
  report.uninstall = unsubscribeAll;
  return report;
})();

/**
 * TraceKit.computeStackTrace: cross-browser stack traces in JavaScript
 *
 * Syntax:
 *   s = TraceKit.computeStackTrace(exception) // consider using TraceKit.report instead (see below)
 * Returns:
 *   s.name              - exception name
 *   s.message           - exception message
 *   s.stack[i].url      - JavaScript or HTML file URL
 *   s.stack[i].func     - function name, or empty for anonymous functions (if guessing did not work)
 *   s.stack[i].args     - arguments passed to the function, if known
 *   s.stack[i].line     - line number, if known
 *   s.stack[i].column   - column number, if known
 *
 * Supports:
 *   - Firefox:  full stack trace with line numbers and unreliable column
 *               number on top frame
 *   - Opera 10: full stack trace with line and column numbers
 *   - Opera 9-: full stack trace with line numbers
 *   - Chrome:   full stack trace with line and column numbers
 *   - Safari:   line and column number for the topmost stacktrace element
 *               only
 *   - IE:       no line numbers whatsoever
 *
 * Tries to guess names of anonymous functions by looking for assignments
 * in the source code. In IE and Safari, we have to guess source file names
 * by searching for function bodies inside all page scripts. This will not
 * work for scripts that are loaded cross-domain.
 * Here be dragons: some function names may be guessed incorrectly, and
 * duplicate functions may be mismatched.
 *
 * TraceKit.computeStackTrace should only be used for tracing purposes.
 * Logging of unhandled exceptions should be done with TraceKit.report,
 * which builds on top of TraceKit.computeStackTrace and provides better
 * IE support by utilizing the window.onerror event to retrieve information
 * about the top of the stack.
 *
 * Note: In IE and Safari, no stack trace is recorded on the Error object,
 * so computeStackTrace instead walks its *own* chain of callers.
 * This means that:
 *  * in Safari, some methods may be missing from the stack trace;
 *  * in IE, the topmost function in the stack trace will always be the
 *    caller of computeStackTrace.
 *
 * This is okay for tracing (because you are likely to be calling
 * computeStackTrace from the function you want to be the topmost element
 * of the stack trace anyway), but not okay for logging unhandled
 * exceptions (because your catch block will likely be far away from the
 * inner function that actually caused the exception).
 *
 */
TraceKit.computeStackTrace = (function computeStackTraceWrapper() {
  // Contents of Exception in various browsers.
  //
  // SAFARI:
  // ex.message = Can't find variable: qq
  // ex.line = 59
  // ex.sourceId = 580238192
  // ex.sourceURL = http://...
  // ex.expressionBeginOffset = 96
  // ex.expressionCaretOffset = 98
  // ex.expressionEndOffset = 98
  // ex.name = ReferenceError
  //
  // FIREFOX:
  // ex.message = qq is not defined
  // ex.fileName = http://...
  // ex.lineNumber = 59
  // ex.columnNumber = 69
  // ex.stack = ...stack trace... (see the example below)
  // ex.name = ReferenceError
  //
  // CHROME:
  // ex.message = qq is not defined
  // ex.name = ReferenceError
  // ex.type = not_defined
  // ex.arguments = ['aa']
  // ex.stack = ...stack trace...
  //
  // INTERNET EXPLORER:
  // ex.message = ...
  // ex.name = ReferenceError
  //
  // OPERA:
  // ex.message = ...message... (see the example below)
  // ex.name = ReferenceError
  // ex.opera#sourceloc = 11  (pretty much useless, duplicates the info in ex.message)
  // ex.stacktrace = n/a; see 'opera:config#UserPrefs|Exceptions Have Stacktrace'

  /**
   * Computes stack trace information from the stack property.
   * Chrome and Gecko use this property.
   * @param {Error} ex
   * @return {?Object.<string, *>} Stack trace information.
   */
  function computeStackTraceFromStackProp(ex) {
    if (typeof ex.stack === 'undefined' || !ex.stack) return;

    var chrome = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
    var winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx(?:-web)|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
    // NOTE: blob urls are now supposed to always have an origin, therefore it's format
    // which is `blob:http://url/path/with-some-uuid`, is matched by `blob.*?:\/` as well
    var gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i;
    // Used to additionally parse URL/line/column from eval frames
    var geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
    var chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/;
    var lines = ex.stack.split('\n');
    var stack = [];
    var submatch;
    var parts;
    var element;
    var reference = /^(.*) is undefined$/.exec(ex.message);

    for (var i = 0, j = lines.length; i < j; ++i) {
      if ((parts = chrome.exec(lines[i]))) {
        var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line
        var isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
        if (isEval && (submatch = chromeEval.exec(parts[2]))) {
          // throw out eval line/column and use top-most line/column number
          parts[2] = submatch[1]; // url
          parts[3] = submatch[2]; // line
          parts[4] = submatch[3]; // column
        }
        element = {
          url: !isNative ? parts[2] : null,
          func: parts[1] || UNKNOWN_FUNCTION,
          args: isNative ? [parts[2]] : [],
          line: parts[3] ? +parts[3] : null,
          column: parts[4] ? +parts[4] : null
        };
      } else if ((parts = winjs.exec(lines[i]))) {
        element = {
          url: parts[2],
          func: parts[1] || UNKNOWN_FUNCTION,
          args: [],
          line: +parts[3],
          column: parts[4] ? +parts[4] : null
        };
      } else if ((parts = gecko.exec(lines[i]))) {
        var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
        if (isEval && (submatch = geckoEval.exec(parts[3]))) {
          // throw out eval line/column and use top-most line number
          parts[3] = submatch[1];
          parts[4] = submatch[2];
          parts[5] = null; // no column when eval
        } else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
          // FireFox uses this awesome columnNumber property for its top frame
          // Also note, Firefox's column number is 0-based and everything else expects 1-based,
          // so adding 1
          // NOTE: this hack doesn't work if top-most frame is eval
          stack[0].column = ex.columnNumber + 1;
        }
        element = {
          url: parts[3],
          func: parts[1] || UNKNOWN_FUNCTION,
          args: parts[2] ? parts[2].split(',') : [],
          line: parts[4] ? +parts[4] : null,
          column: parts[5] ? +parts[5] : null
        };
      } else {
        continue;
      }

      if (!element.func && element.line) {
        element.func = UNKNOWN_FUNCTION;
      }

      if (element.url && element.url.substr(0, 5) === 'blob:') {
        // Special case for handling JavaScript loaded into a blob.
        // We use a synchronous AJAX request here as a blob is already in
        // memory - it's not making a network request.  This will generate a warning
        // in the browser console, but there has already been an error so that's not
        // that much of an issue.
        var xhr = new XMLHttpRequest();
        xhr.open('GET', element.url, false);
        xhr.send(null);

        // If we failed to download the source, skip this patch
        if (xhr.status === 200) {
          var source = xhr.responseText || '';

          // We trim the source down to the last 300 characters as sourceMappingURL is always at the end of the file.
          // Why 300? To be in line with: https://github.com/getsentry/sentry/blob/4af29e8f2350e20c28a6933354e4f42437b4ba42/src/sentry/lang/javascript/processor.py#L164-L175
          source = source.slice(-300);

          // Now we dig out the source map URL
          var sourceMaps = source.match(/\/\/# sourceMappingURL=(.*)$/);

          // If we don't find a source map comment or we find more than one, continue on to the next element.
          if (sourceMaps) {
            var sourceMapAddress = sourceMaps[1];

            // Now we check to see if it's a relative URL.
            // If it is, convert it to an absolute one.
            if (sourceMapAddress.charAt(0) === '~') {
              sourceMapAddress = getLocationOrigin() + sourceMapAddress.slice(1);
            }

            // Now we strip the '.map' off of the end of the URL and update the
            // element so that Sentry can match the map to the blob.
            element.url = sourceMapAddress.slice(0, -4);
          }
        }
      }

      stack.push(element);
    }

    if (!stack.length) {
      return null;
    }

    return {
      name: ex.name,
      message: ex.message,
      url: getLocationHref(),
      stack: stack
    };
  }

  /**
   * Adds information about the first frame to incomplete stack traces.
   * Safari and IE require this to get complete data on the first frame.
   * @param {Object.<string, *>} stackInfo Stack trace information from
   * one of the compute* methods.
   * @param {string} url The URL of the script that caused an error.
   * @param {(number|string)} lineNo The line number of the script that
   * caused an error.
   * @param {string=} message The error generated by the browser, which
   * hopefully contains the name of the object that caused the error.
   * @return {boolean} Whether or not the stack information was
   * augmented.
   */
  function augmentStackTraceWithInitialElement(stackInfo, url, lineNo, message) {
    var initial = {
      url: url,
      line: lineNo
    };

    if (initial.url && initial.line) {
      stackInfo.incomplete = false;

      if (!initial.func) {
        initial.func = UNKNOWN_FUNCTION;
      }

      if (stackInfo.stack.length > 0) {
        if (stackInfo.stack[0].url === initial.url) {
          if (stackInfo.stack[0].line === initial.line) {
            return false; // already in stack trace
          } else if (
            !stackInfo.stack[0].line &&
            stackInfo.stack[0].func === initial.func
          ) {
            stackInfo.stack[0].line = initial.line;
            return false;
          }
        }
      }

      stackInfo.stack.unshift(initial);
      stackInfo.partial = true;
      return true;
    } else {
      stackInfo.incomplete = true;
    }

    return false;
  }

  /**
   * Computes stack trace information by walking the arguments.caller
   * chain at the time the exception occurred. This will cause earlier
   * frames to be missed but is the only way to get any stack trace in
   * Safari and IE. The top frame is restored by
   * {@link augmentStackTraceWithInitialElement}.
   * @param {Error} ex
   * @return {?Object.<string, *>} Stack trace information.
   */
  function computeStackTraceByWalkingCallerChain(ex, depth) {
    var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,
      stack = [],
      funcs = {},
      recursion = false,
      parts,
      item,
      source;

    for (
      var curr = computeStackTraceByWalkingCallerChain.caller;
      curr && !recursion;
      curr = curr.caller
    ) {
      if (curr === computeStackTrace || curr === TraceKit.report) {
        // console.log('skipping internal function');
        continue;
      }

      item = {
        url: null,
        func: UNKNOWN_FUNCTION,
        line: null,
        column: null
      };

      if (curr.name) {
        item.func = curr.name;
      } else if ((parts = functionName.exec(curr.toString()))) {
        item.func = parts[1];
      }

      if (typeof item.func === 'undefined') {
        try {
          item.func = parts.input.substring(0, parts.input.indexOf('{'));
        } catch (e) {}
      }

      if (funcs['' + curr]) {
        recursion = true;
      } else {
        funcs['' + curr] = true;
      }

      stack.push(item);
    }

    if (depth) {
      // console.log('depth is ' + depth);
      // console.log('stack is ' + stack.length);
      stack.splice(0, depth);
    }

    var result = {
      name: ex.name,
      message: ex.message,
      url: getLocationHref(),
      stack: stack
    };
    augmentStackTraceWithInitialElement(
      result,
      ex.sourceURL || ex.fileName,
      ex.line || ex.lineNumber,
      ex.message || ex.description
    );
    return result;
  }

  /**
   * Computes a stack trace for an exception.
   * @param {Error} ex
   * @param {(string|number)=} depth
   */
  function computeStackTrace(ex, depth) {
    var stack = null;
    depth = depth == null ? 0 : +depth;

    try {
      stack = computeStackTraceFromStackProp(ex);
      if (stack) {
        return stack;
      }
    } catch (e) {
      if (TraceKit.debug) {
        throw e;
      }
    }

    try {
      stack = computeStackTraceByWalkingCallerChain(ex, depth + 1);
      if (stack) {
        return stack;
      }
    } catch (e) {
      if (TraceKit.debug) {
        throw e;
      }
    }
    return {
      name: ex.name,
      message: ex.message,
      url: getLocationHref()
    };
  }

  computeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;
  computeStackTrace.computeStackTraceFromStackProp = computeStackTraceFromStackProp;

  return computeStackTrace;
})();

module.exports = TraceKit;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/raven-js/vendor/json-stringify-safe/stringify.js":
/*!***********************************************************************!*\
  !*** ./node_modules/raven-js/vendor/json-stringify-safe/stringify.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 json-stringify-safe
 Like JSON.stringify, but doesn't throw on circular references.

 Originally forked from https://github.com/isaacs/json-stringify-safe
 version 5.0.1 on 3/8/2017 and modified to handle Errors serialization
 and IE8 compatibility. Tests for this are in test/vendor.

 ISC license: https://github.com/isaacs/json-stringify-safe/blob/master/LICENSE
*/

exports = module.exports = stringify;
exports.getSerialize = serializer;

function indexOf(haystack, needle) {
  for (var i = 0; i < haystack.length; ++i) {
    if (haystack[i] === needle) return i;
  }
  return -1;
}

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
}

// https://github.com/ftlabs/js-abbreviate/blob/fa709e5f139e7770a71827b1893f22418097fbda/index.js#L95-L106
function stringifyError(value) {
  var err = {
    // These properties are implemented as magical getters and don't show up in for in
    stack: value.stack,
    message: value.message,
    name: value.name
  };

  for (var i in value) {
    if (Object.prototype.hasOwnProperty.call(value, i)) {
      err[i] = value[i];
    }
  }

  return err;
}

function serializer(replacer, cycleReplacer) {
  var stack = [];
  var keys = [];

  if (cycleReplacer == null) {
    cycleReplacer = function(key, value) {
      if (stack[0] === value) {
        return '[Circular ~]';
      }
      return '[Circular ~.' + keys.slice(0, indexOf(stack, value)).join('.') + ']';
    };
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = indexOf(stack, this);
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);

      if (~indexOf(stack, value)) {
        value = cycleReplacer.call(this, key, value);
      }
    } else {
      stack.push(value);
    }

    return replacer == null
      ? value instanceof Error ? stringifyError(value) : value
      : replacer.call(this, key, value);
  };
}


/***/ }),

/***/ "./node_modules/raven-js/vendor/md5/md5.js":
/*!*************************************************!*\
  !*** ./node_modules/raven-js/vendor/md5/md5.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
* Add integers, wrapping at 2^32. This uses 16-bit operations internally
* to work around bugs in some JS interpreters.
*/
function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xffff);
}

/*
* Bitwise rotate a 32-bit number to the left.
*/
function bitRotateLeft(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
* These functions implement the four basic operations the algorithm uses.
*/
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn((b & c) | (~b & d), a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
* Calculate the MD5 of an array of little-endian words, and a bit length.
*/
function binlMD5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << (len % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var i;
  var olda;
  var oldb;
  var oldc;
  var oldd;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}

/*
* Convert an array of little-endian words to a string
*/
function binl2rstr(input) {
  var i;
  var output = '';
  var length32 = input.length * 32;
  for (i = 0; i < length32; i += 8) {
    output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff);
  }
  return output;
}

/*
* Convert a raw string to an array of little-endian words
* Characters >255 have their high-byte silently ignored.
*/
function rstr2binl(input) {
  var i;
  var output = [];
  output[(input.length >> 2) - 1] = undefined;
  for (i = 0; i < output.length; i += 1) {
    output[i] = 0;
  }
  var length8 = input.length * 8;
  for (i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32);
  }
  return output;
}

/*
* Calculate the MD5 of a raw string
*/
function rstrMD5(s) {
  return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
}

/*
* Calculate the HMAC-MD5, of a key and some data (raw strings)
*/
function rstrHMACMD5(key, data) {
  var i;
  var bkey = rstr2binl(key);
  var ipad = [];
  var opad = [];
  var hash;
  ipad[15] = opad[15] = undefined;
  if (bkey.length > 16) {
    bkey = binlMD5(bkey, key.length * 8);
  }
  for (i = 0; i < 16; i += 1) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5c5c5c5c;
  }
  hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
}

/*
* Convert a raw string to a hex string
*/
function rstr2hex(input) {
  var hexTab = '0123456789abcdef';
  var output = '';
  var x;
  var i;
  for (i = 0; i < input.length; i += 1) {
    x = input.charCodeAt(i);
    output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
  }
  return output;
}

/*
* Encode a string as utf-8
*/
function str2rstrUTF8(input) {
  return unescape(encodeURIComponent(input));
}

/*
* Take string arguments and return either raw or hex encoded strings
*/
function rawMD5(s) {
  return rstrMD5(str2rstrUTF8(s));
}
function hexMD5(s) {
  return rstr2hex(rawMD5(s));
}
function rawHMACMD5(k, d) {
  return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
}
function hexHMACMD5(k, d) {
  return rstr2hex(rawHMACMD5(k, d));
}

function md5(string, key, raw) {
  if (!key) {
    if (!raw) {
      return hexMD5(string);
    }
    return rawMD5(string);
  }
  if (!raw) {
    return hexHMACMD5(key, string);
  }
  return rawHMACMD5(key, string);
}

module.exports = md5;


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/config/configProvider.js":
/*!**************************************!*\
  !*** ./src/config/configProvider.js ***!
  \**************************************/
/*! exports provided: getZibbyConfigFor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getZibbyConfigFor", function() { return getZibbyConfigFor; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/config/index.js");

function getZibbyConfigFor(env) {
  const zibbyConfig = env === 'qa' ? _index__WEBPACK_IMPORTED_MODULE_0__["qaKataPultConfig"] : _index__WEBPACK_IMPORTED_MODULE_0__["prodKataPultConfig"];

  function provideZibbyConfigFor(environment, merchantName) {
    return { ...zibbyConfig[merchantName],
      environment
    };
  }

  return provideZibbyConfigFor;
}

/***/ }),

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! exports provided: qaKataPultConfig, prodKataPultConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _qa_zibbyConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./qa/zibbyConfig */ "./src/config/qa/zibbyConfig.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "qaKataPultConfig", function() { return _qa_zibbyConfig__WEBPACK_IMPORTED_MODULE_0__["katapultConfig"]; });

/* harmony import */ var _prod_zibbyConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prod/zibbyConfig */ "./src/config/prod/zibbyConfig.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "prodKataPultConfig", function() { return _prod_zibbyConfig__WEBPACK_IMPORTED_MODULE_1__["katapultConfig"]; });





/***/ }),

/***/ "./src/config/prod/zibbyConfig.js":
/*!****************************************!*\
  !*** ./src/config/prod/zibbyConfig.js ***!
  \****************************************/
/*! exports provided: katapultConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "katapultConfig", function() { return katapultConfig; });
const katapultConfig = {
  bose: {
    api_key: "dd58f0244f11d1a0ad9e87ccc4e7dce1f8277154"
  },
  nordictrack: {
    api_key: "1b332beb37d39fd7997bfd81b8c9a01f59bc2b97"
  },
  gamestop: {
    api_key: "8d6f7d43f852f6a3e20e7a7c323d86d32837d51f"
  },
  onlinetires: {
    api_key: "a49a011cc1f0e96b3843f07e22a874ac6e2f93a1"
  },
  leesa: {
    api_key: "d7a71dc757a37492334ca18ea5f6e974f58e9fa9"
  },
  lenovo: {
    api_key: "612a96bf9ae1198b1c2e76e70bb2dad47cd3e6a1"
  },
  yeti: {
    api_key: "57597141e279013672adb11a4c6c2d6cb0dd6161"
  },
  maingear: {
    api_key: "a4001eaa8c70f36fe375fbe0a8ad33fc162aecc3"
  },
  cabelas: {
    api_key: "764e4b0f90ebf5193b0a23e285a339f6ac011866"
  },
  basspro: {
    api_key: "a82f7f6481cb6301f6750ea9a7574cf4b547ce41"
  },
  kitchenaid: {
    api_key: "e22db2e55e02ea2556bb6374222170cdb35dbc32"
  },
  cubcadet: {
    api_key: "269dd710c03e23738cc6921e0087c241bfb7c4db"
  },
  mattressfirm: {
    api_key: "6c20166242819fd8f77efb1987aa1fc72e3e06f7"
  },
  lesliespool: {
    api_key: "d8f7facb4ca191982060ed8b9843b4c7f7bfc472"
  },
  denniskirk: {
    api_key: "9acb0fe52a0b2ddcb0288989e8fe202c2dfd3d13"
  },
  xidax: {
    api_key: "3daf3e5b459177500d18b83cdbaa24d43d6a20f1"
  },
  traeger: {
    api_key: "7a9da1e8b055ce2c5d7db955a9cbc375ffcbc3ff"
  },
  kohls: {
    api_key: "7a9da1e8b055ce2c5d7db955a9cbc375ffcbc3ff"
  },
  originpc: {
    api_key: "e11398552ad309125511855f6214b46c271a23e8"
  },
  microcenter: {
    api_key: "e11398552ad309125511855f6214b46c271a23e8"
  },
  nzxt: {
    api_key: "7a9da1e8b055ce2c5d7db955a9cbc375ffcbc3ff"
  },
  staples: {
    api_key: "1e74635d4141eecce60a58f15631e50461b72ef8"
  }
};

/***/ }),

/***/ "./src/config/qa/zibbyConfig.js":
/*!**************************************!*\
  !*** ./src/config/qa/zibbyConfig.js ***!
  \**************************************/
/*! exports provided: katapultConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "katapultConfig", function() { return katapultConfig; });
const katapultConfig = {
  lull: {
    api_key: "9de1d413f9273b240c7df127ba7e277d8f943599"
  },
  bose: {
    api_key: "dd58f0244f11d1a0ad9e87ccc4e7dce1f8277154"
  },
  nordictrack: {
    api_key: "1b332beb37d39fd7997bfd81b8c9a01f59bc2b97"
  },
  gamestop: {
    api_key: "8d6f7d43f852f6a3e20e7a7c323d86d32837d51f"
  },
  turnermotorsport: {
    api_key: "c499720e6d8ce296857720979163301659d35ebf"
  },
  ecstuning: {
    api_key: "7cff8d80b8b0741b54dd3b4f389f7fc881c7930e"
  },
  officedepot: {
    api_key: "8d1bd267941624ac8441fc3100cd8214bcc86aaa"
  },
  gopro: {
    api_key: "376a1e2f12912ef665b63e40e7e401927745444f"
  },
  bowflex: {
    api_key: "050632443ea3bb654942e19bda6989ffc2cbf736"
  },
  colemanfurniture: {
    api_key: "83a8a0a105821f0c190ead61d610dd98a20219ae"
  },
  purple: {
    api_key: "1cf30316d82bc319d9499ef27a3450055e2f3450"
  },
  motorola: {
    api_key: "48c54663f171618ece44aaf24fdb47aab4741a33"
  },
  onlinetires: {
    api_key: "a49a011cc1f0e96b3843f07e22a874ac6e2f93a1"
  },
  leesa: {
    api_key: "d7a71dc757a37492334ca18ea5f6e974f58e9fa9"
  },
  lenovo: {
    api_key: "612a96bf9ae1198b1c2e76e70bb2dad47cd3e6a1"
  },
  lg: {
    api_key: "20d620336d3dc5c0404d66ea95d4b4c00553c691"
  },
  yeti: {
    api_key: "57597141e279013672adb11a4c6c2d6cb0dd6161"
  },
  maingear: {
    api_key: "a4001eaa8c70f36fe375fbe0a8ad33fc162aecc3"
  },
  cabelas: {
    api_key: "764e4b0f90ebf5193b0a23e285a339f6ac011866"
  },
  basspro: {
    api_key: "a82f7f6481cb6301f6750ea9a7574cf4b547ce41"
  },
  abesofmaine: {
    api_key: "364d939b2bd25205ec9638dffc05ab29e563a37b"
  },
  kitchenaid: {
    api_key: "e22db2e55e02ea2556bb6374222170cdb35dbc32"
  },
  potterybarn: {
    api_key: "0664bf24a949f1b304663298af418f76556ddb16"
  },
  boosted: {
    api_key: "943c1e0b6dec0bbd3b24cc9143dbea0f0fb56cb4"
  },
  cubcadet: {
    api_key: "269dd710c03e23738cc6921e0087c241bfb7c4db"
  },
  advancedAutoParts: {
    api_key: "b7ea7251a719e8b0cdbf79b3422d48f2ce298a73"
  },
  darvin: {
    api_key: "5293f1f491289c2b058bd7ed590c1856ab787e7f"
  },
  eldoradofurniture: {
    api_key: "bcf19049ab50e61416d7861b56d469a02cc1c53b"
  },
  mattressfirm: {
    api_key: "6c20166242819fd8f77efb1987aa1fc72e3e06f7"
  },
  razer: {
    api_key: "53d01624b12d594c7a9d4acbfa5879ef9b67a5ac"
  },
  lesliespool: {
    api_key: "d8f7facb4ca191982060ed8b9843b4c7f7bfc472"
  },
  denniskirk: {
    api_key: "9acb0fe52a0b2ddcb0288989e8fe202c2dfd3d13"
  },
  dreamcloudsleep: {
    api_key: "579542b8c73a59ec42d1add1942112dcf13e3ce3"
  },
  bedbathandbeyond: {
    api_key: "049f3957c3b183d2748c06493a426a51fa3b2386"
  },
  lovesac: {
    api_key: "b6805f2c4e918aa7f0c52752c7d3dd969a728303"
  },
  sleepnumber: {
    api_key: "336fbfab4ce2c1a98121a5de7aaa43294d0e1ab2"
  },
  weber: {
    api_key: "c459b3ed6b0bf85f0a4f7c7e41c6f0c424511f07"
  },
  williams: {
    api_key: "45b83bb2c0f40fdff21013cd015ae5f6fd709d91"
  },
  xidax: {
    api_key: "3daf3e5b459177500d18b83cdbaa24d43d6a20f1"
  },
  hp: {
    api_key: "b57d402e6cfbf1c8166b2afdb5fbeec9267e806f"
  },
  tractorsupply: {
    api_key: "dc898606a57565c76bbb45b9ed3704a44a8163a0"
  },
  traeger: {
    api_key: "7a9da1e8b055ce2c5d7db955a9cbc375ffcbc3ff"
  },
  theroomplace: {
    api_key: "0f4dbda387aeb936fb0aa54bd2f70426cfd2199a"
  },
  kohls: {
    api_key: "7a9da1e8b055ce2c5d7db955a9cbc375ffcbc3ff"
  },
  lazboy: {
    api_key: "744f49801f0f3a781f6d9042ddf35f3850be045c"
  },
  petco: {
    api_key: "407f522ee98d51486c019ce861f6da160a1b9617"
  },
  geappliances: {
    api_key: "f81614f3900d2ca9bc6e9b5ddca6c5c198e5bb57"
  },
  garmin: {
    api_key: "2181e9c2cc6e63ebd48eed739d9218b5740db6dc"
  },
  cyberpowerpc: {
    api_key: "cabdebc7ea5890e2c54347844a4cf88e6f650869"
  },
  originpc: {
    api_key: "e11398552ad309125511855f6214b46c271a23e8"
  },
  microcenter: {
    api_key: "e11398552ad309125511855f6214b46c271a23e8"
  },
  nzxt: {
    api_key: "943c1e0b6dec0bbd3b24cc9143dbea0f0fb56cb4"
  },
  bobsdiscountfurniture: {
    api_key: "d05abbc23595b8631f551e0d3be39da31cef0e2c"
  },
  bobmills: {
    api_key: "03284f69bafb83ff27c8210576d0603c525b9da9"
  },
  staples: {
    api_key: "1e74635d4141eecce60a58f15631e50461b72ef8"
  }
};

/***/ }),

/***/ "./src/js/CustomErrors.js":
/*!********************************!*\
  !*** ./src/js/CustomErrors.js ***!
  \********************************/
/*! exports provided: vccErrors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vccErrors", function() { return vccErrors; });
/* harmony import */ var _errorHandlers_sentryProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errorHandlers/sentryProvider */ "./src/js/errorHandlers/sentryProvider.js");

const vccErrors = function () {
  let VCCError = {
    initialise: function initError(name, message, stack, details) {
      this.name = name;
      this.message = message;
      this.stack = stack;
      this.details = details;
    },
    logToSentry: _errorHandlers_sentryProvider__WEBPACK_IMPORTED_MODULE_0__["default"].logToSentry,
    logEverything: function logToAll() {
      this.logToSentry();
    }
  };

  function create(name, message, stack, details) {
    let error = Object.create(VCCError);
    error.initialise(name, message, stack, details);
    return error;
  }

  return {
    createError: create
  };
}();

/***/ }),

/***/ "./src/js/abstractMerchant.js":
/*!************************************!*\
  !*** ./src/js/abstractMerchant.js ***!
  \************************************/
/*! exports provided: getNameFromFullName, calculateSubtotal, lesableAPIAdapter, DOMParser, AbstractMerchant */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNameFromFullName", function() { return getNameFromFullName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateSubtotal", function() { return calculateSubtotal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lesableAPIAdapter", function() { return lesableAPIAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMParser", function() { return DOMParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractMerchant", function() { return AbstractMerchant; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ "./src/js/utility.js");
/* harmony import */ var _globalHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globalHelper */ "./src/js/globalHelper.js");


function getNameFromFullName(wholeName) {
  const splitName = wholeName.split(' ');
  return [splitName.slice(0, splitName.length - 1).join(' '), splitName[splitName.length - 1]];
}
function calculateSubtotal(productList) {
  return Object(_utility__WEBPACK_IMPORTED_MODULE_0__["roundNumberToDecimalPlaces"])(productList.map(product => product.unit_price * product.quantity).reduce((price1, price2) => {
    return price1 + price2;
  }, 0));
}
function lesableAPIAdapter(products) {
  function createRequestBody() {
    return {
      item_display_name: products.map(item => item.display_name)
    };
  }

  return Object(_globalHelper__WEBPACK_IMPORTED_MODULE_1__["getAPILesable"])(createRequestBody());
}
const Logger = {
  dispatchParsingErrorEvent(e) {
    const domParsingErrorEvent = new CustomEvent(_globalHelper__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPES"][2], {
      detail: e
    });
    window.dispatchEvent(domParsingErrorEvent);
  }

};
const DOMParser = {
  parsers: {},
  logger: Object.create(Logger),

  getNodeFromDocument({
    selector
  }) {
    return document.querySelector(selector);
  },

  getNodeListFromDocument({
    selector
  }) {
    return document.querySelectorAll(selector);
  },

  runParser() {
    return Object.values(this.parsers).filter(config => Object(_utility__WEBPACK_IMPORTED_MODULE_0__["isAValidKey"])(config)).reduce((acc, config) => {
      return { ...acc,
        ...this.parse(config)
      };
    }, {});
  },

  parse(config) {
    if (config.multiple && config.callback == null) {
      throw new Error('Callback needs to be a function if multiple is true');
    }

    if (config.callbackValFn) {
      const callback = typeof config.callbackValFn == 'function' ? config.callbackValFn : this.cleanup;

      try {
        return {
          [config.key]: callback.call(this)
        };
      } catch (e) {
        this.logger.dispatchParsingErrorEvent(e);
      }
    }

    if (config.value != null) {
      return {
        [config.key]: config.value
      };
    }

    const node = config.multiple ? this.getNodeListFromDocument(config) : this.getNodeFromDocument(config);
    const callbackA = typeof config.callback == 'function' ? config.callback : config.isAmount ? this.cleanupAmount : this.cleanup;

    try {
      return {
        [config.key]: callbackA.call(this, node, config.key)
      };
    } catch (e) {
      this.logger.dispatchParsingErrorEvent(e);
    }
  },

  cleanup(node) {
    var _node$innerText, _node$value;

    if (!node) {
      throw new Error("Node passed should be a DOM Element");
    }

    return ((_node$innerText = node.innerText) === null || _node$innerText === void 0 ? void 0 : _node$innerText.trim()) || ((_node$value = node.value) === null || _node$value === void 0 ? void 0 : _node$value.trim());
  },

  cleanupAmount(node) {
    var _node$innerText2, _node$value2;

    if (!node) {
      throw new Error("Node passed should be a DOM Element");
    }

    const value = ((_node$innerText2 = node.innerText) === null || _node$innerText2 === void 0 ? void 0 : _node$innerText2.trim()) || ((_node$value2 = node.value) === null || _node$value2 === void 0 ? void 0 : _node$value2.trim());
    return parseFloat(value === null || value === void 0 ? void 0 : value.replace(/\$/g, '').replace(/\-/g, '').replace(/,/g, '').trim());
  }

};
const CustomerAddress = {
  billingSameAsShipping: false,

  getBillingAddress(data) {
    return {
      address: data['billing_address'],
      city: data['billing_city'],
      state: data['billing_state'],
      zip: data['billing_zip']
    };
  },

  addressEquals(a, b) {
    a = a || '';
    b = b || '';
    return a.toUpperCase() === b.toUpperCase();
  },

  compareBillingAndShipping(billing, shipping) {
    return this.addressEquals(billing.address, shipping.address) && this.addressEquals(billing.city, shipping.city) && this.addressEquals(billing.state, shipping.state) && this.addressEquals(billing.zip, shipping.zip);
  },

  getAddressMatchStatus(billing_address = {}, shipping_address) {
    //check country
    if (shipping_address.country !== "United States") return false;
    const isBillingConfigMissing = this.validateAddress(billing_address, val => val != null);
    const isBillingInfoBlank = this.validateAddress(billing_address, val => val !== '');
    const {
      address2,
      middle_name,
      phone,
      ...rest
    } = shipping_address;
    const isShippingValidated = this.validateAddress(rest);

    if (!isShippingValidated || !isBillingInfoBlank) {
      return false;
    }

    this.billingSameAsShipping = isBillingConfigMissing ? this.compareBillingAndShipping(billing_address, shipping_address) : this.billingSameAsShipping;
    return this.billingSameAsShipping.toString();
  },

  validateAddress(address, f = val => val) {
    const values = Object.values(address);
    return values.length > 0 && values.every(f);
  },

  setBillingSameAsShipping(status) {
    this.billingSameAsShipping = status;
  },

  getShipping(data) {
    return {
      first_name: data.first_name,
      middle_name: "",
      last_name: data.last_name,
      address: data.address,
      address2: '',
      city: data.city,
      state: data.state,
      country: data.country || "United States",
      zip: data.zip,
      email: data.email,
      phone: data.phone
    };
  }

};
const CartInfo = {
  getCartValuationDetails(data) {
    return {
      shipping_amount: data.shipping_amount,
      discounts: data.discounts,
      sales_tax: data.sales_tax,
      cart_total: data.cart_total
    };
  },

  updateLesableItems(response, products) {
    const leasable = response.prediction;
    return products.map((product, index) => {
      return { ...product,
        leasable: leasable[index]
      };
    });
  },

  checkCartIsLeasable(products) {
    return lesableAPIAdapter(products);
  },

  getSubTotal(products) {
    return calculateSubtotal(products);
  },

  getSubTotalForLeaseable(products) {
    return calculateSubtotal(products.filter(product => product.leasable));
  },

  createSingleProduct({
    display_name,
    sku,
    unit_price,
    quantity,
    leasable
  }) {
    if (this.validateProduct(display_name, sku, unit_price, quantity)) {
      return {
        display_name,
        sku,
        unit_price: Object(_utility__WEBPACK_IMPORTED_MODULE_0__["roundNumberToDecimalPlaces"])(unit_price),
        quantity,
        leasable: false
      };
    } else {
      throw new Error(`Argument cannot be null/undefined. Passed arguments are ${JSON.stringify({
        display_name,
        sku,
        unit_price,
        quantity
      })}`);
    }
  },

  validateProduct() {
    return Array.prototype.every.call(arguments, function checkNotNull(arg) {
      return arg != null;
    });
  },

  getCartItems(data) {
    return data.items.map(this.createSingleProduct.bind(this));
  }

};
const CommunicationChannel = {
  setWindowDispatcher(addresStatus = 'false', getSubTotalForValidation = 0, cartSubTotal = 0) {
    if (getSubTotalForValidation < cartSubTotal * 0.75) {
      getSubTotalForValidation = 0;
    }

    const myEvent = new CustomEvent("myevent", {
      detail: {
        shippingStatus: addresStatus,
        getSubTotalForValidation: getSubTotalForValidation,
        lesableResponseType: true
      },
      bubbles: true,
      cancelable: true,
      composed: false
    });
    console.log(myEvent.detail);
    window.dispatchEvent(myEvent);
  },

  resetKatapult() {
    //shows supported merchant on page.
    window.dispatchEvent(new CustomEvent('InitialKataPultExtension', {
      detail: {
        skipUiUpdate: true
      }
    }));
  }

};
const MerchantCache = {
  config: {},
  data: new Map(),
  leasable: {},

  setCacheConfiguration(config) {
    this.config = { ...this.config,
      ...config
    };
    return this;
  },

  updateCache(keys, that) {
    keys = this.validateKeys(keys);
    keys.forEach(key => {
      this.data.set(key, this.config[key].call(that));
    });
    this.updateCheckoutDataWithBilling();
  },

  validateKeys(keys) {
    keys.forEach(key => {
      if (!this.config[key]) {
        throw new Error('Invalid Key passed!');
      }
    });
    return keys;
  },

  updateCheckoutDataWithBilling() {
    const billing = this.data.get('billing_address');
    const checkout = this.data.get('checkOutData');

    if (billing && Object.values(billing).some(x => !(x == '' || x == null))) {
      checkout.customer.billing = { ...checkout.customer.billing,
        ...billing
      };
    }

    this.data.set('checkOutData', checkout);
  },

  setCache(data = {}) {
    Object.keys(this.config).forEach(key => {
      data[key] && this.data.set(key, data[key]);
    });
  },

  getData(key) {
    return this.data.get(key);
  }

};
/**
 * @global
 * @property {DOMParser} parser
 * @property {CustomerAddress} customerAddress
 * @property {CartInfo} cartInfo
 * @property {CommunicationChannel} communicationChannel
 * @property {MerchantCache} merchantCache
 */

const AbstractMerchant = {
  parser: Object.create(DOMParser),
  customerAddress: Object.create(CustomerAddress),
  cartInfo: Object.create(CartInfo),
  communicationChannel: Object.create(CommunicationChannel),

  /**
   * @function resetKatapult
   * @description Reset Katapult UI to initial state.
   * This will change the UI of the katapult widget to Supported merchant on Page
   */
  resetKatapult: function () {
    this.communicationChannel.resetKatapult();
  },
  merchantCache: Object.create(MerchantCache).setCacheConfiguration({
    checkOutData: function () {
      const parsedData = this.parser.runParser();
      return this.enrichWithLeasableData(this.getCheckoutData(this.composeData(parsedData)));
    },
    billing_address: function () {
      const parsedData = this.parser.runParser();
      return this.customerAddress.getBillingAddress(parsedData);
    }
  }),

  enrichWithLeasableData(checkoutData) {
    return this.getUpdatedCart(checkoutData, this.cartInfo.updateLesableItems(this.merchantCache.leasable, checkoutData.items));
  },

  createMutationObserverFor(target, callback) {
    if (target) {
      const observer = new MutationObserver(callback.bind(this));
      observer.observe(target, {
        attributes: true,
        childList: true,
        subtree: true
      });
      return observer;
    }
  },

  unsubObserver(observer) {
    observer === null || observer === void 0 ? void 0 : observer.disconnect();
  },

  init(config, parser) {
    this.parser = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["validateParser"])(parser, DOMParser);
    Object(_globalHelper__WEBPACK_IMPORTED_MODULE_1__["initializeMerchant"])(config);
  },

  setWindowDispatcher() {
    //should be called only after the run method
    const billing_address = this.merchantCache.getData('billing_address');
    const checkOutData = this.merchantCache.getData('checkOutData');
    if (!checkOutData) throw new Error('The cached data is empty. You need to call the run method before calling the setWindowDispatcher.');
    this.merchantCache.delegateListener = this.setKatapultCheckoutData(checkOutData);
    this.merchantCache.setCache({
      billing_address,
      checkOutData
    });
    this.communicationChannel.setWindowDispatcher(this.customerAddress.getAddressMatchStatus(billing_address, checkOutData.customer['shipping']), this.cartInfo.getSubTotalForLeaseable(checkOutData.items), this.cartInfo.getSubTotal(checkOutData.items));
  },

  validateParsedData(data) {
    return Object(_utility__WEBPACK_IMPORTED_MODULE_0__["isValidKeyCount"])(data);
  },

  setKatapultCheckoutData(updatedCheckoutData) {
    document.removeEventListener('click', this.merchantCache.data.get('delegateListener'));
    return Object(_globalHelper__WEBPACK_IMPORTED_MODULE_1__["delegate"])(document, 'click', '.btn-katapult-checkout-proceed', () => {
      Object(_globalHelper__WEBPACK_IMPORTED_MODULE_1__["hideWelcomeScreenUI"])();
      Object(_globalHelper__WEBPACK_IMPORTED_MODULE_1__["katapultCheckout"])(updatedCheckoutData, window.katapult);
    });
  },

  async updateCheckoutData(checkOutData, callLeasableApi = true) {
    var response;

    try {
      if (callLeasableApi) {
        response = await this.cartInfo.checkCartIsLeasable(checkOutData.items);
      } else {
        response = this.merchantCache.leasable;
      }
    } catch (e) {
      console.log(e);
      return;
    }

    const newCart = this.cartInfo.updateLesableItems(response, checkOutData.items);
    const updatedCheckoutData = this.getUpdatedCart(checkOutData, newCart);
    this.merchantCache.delegateListener = this.setKatapultCheckoutData(updatedCheckoutData);
    this.merchantCache.leasable = response;
    this.merchantCache.setCache({
      checkOutData: updatedCheckoutData
    });
    return updatedCheckoutData;
  },

  async run({
    callLeasable = true
  } = {}) {
    const parsedData = this.parser.runParser();
    console.log(' parsedData', parsedData);
    if (!this.validateParsedData(parsedData)) return;
    const billing_address = this.customerAddress.getBillingAddress(parsedData);
    const checkOutData = this.getCheckoutData(this.composeData(parsedData));
    const updatedCheckoutData = await this.updateCheckoutData(checkOutData, callLeasable);
    this.merchantCache.setCache({
      billing_address
    });
    this.communicationChannel.setWindowDispatcher(this.customerAddress.getAddressMatchStatus(billing_address, updatedCheckoutData.customer['shipping']), this.cartInfo.getSubTotalForLeaseable(updatedCheckoutData.items), this.cartInfo.getSubTotal(updatedCheckoutData.items));
  },

  updateCache(keys) {
    this.merchantCache.updateCache(keys, this);
    return this;
  },

  async tryCallingLesableApi(shouldCallApi) {
    if (shouldCallApi) {
      const checkOutData = this.merchantCache.getData('checkOutData');
      return this.updateCheckoutData(checkOutData);
    }
  },

  rerunWithUpdatedCache({
    callLeasable = false
  } = {}) {
    return this.tryCallingLesableApi(callLeasable).then(() => {
      this.setWindowDispatcher();
    });
  },

  getUpdatedCart(checkOutData, cartItems) {
    return { ...checkOutData,
      items: cartItems
    };
  },

  composeData(data) {
    return {
      shipping: this.customerAddress.getShipping(data),
      billing: this.customerAddress.getShipping(data),
      items: this.cartInfo.getCartItems(data),
      ...this.cartInfo.getCartValuationDetails(data)
    };
  },

  getCheckoutData({
    shipping,
    billing,
    items,
    shipping_amount,
    discounts,
    sales_tax,
    cart_total
  }) {
    return {
      customer: {
        shipping,
        billing
      },
      items,
      checkout: {
        customer_id: "null",
        shipping_amount,
        discounts
      },
      sales_tax,
      cart_total: parseFloat(cart_total),
      urls: {
        return: false,
        cancel: false
      }
    };
  }

};

/***/ }),

/***/ "./src/js/constants.js":
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
/*! exports provided: screens */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "screens", function() { return screens; });
const screens = {
  welcomeScreen: '.katapult-welcome-screen',
  confirmationScreen: '.katapult-confirmation-screen'
};

/***/ }),

/***/ "./src/js/errorHandlers/sentryProvider.js":
/*!************************************************!*\
  !*** ./src/js/errorHandlers/sentryProvider.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var raven_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raven-js */ "./node_modules/raven-js/src/singleton.js");
/* harmony import */ var raven_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(raven_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ "./src/js/utility.js");


let sentryProvider = {
  logToSentry: function sentry() {
    console.log(this, 'sentry error');
    raven_js__WEBPACK_IMPORTED_MODULE_0___default.a.captureException(Object(_utility__WEBPACK_IMPORTED_MODULE_1__["createError"])(this.details, this.name), {
      environment: 'qa',
      extra: {
        details: this.details
      }
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (sentryProvider);

/***/ }),

/***/ "./src/js/globalHelper.js":
/*!********************************!*\
  !*** ./src/js/globalHelper.js ***!
  \********************************/
/*! exports provided: ERROR_TYPES, extractStateZipCity, getDataRetailer, getAPILesable, katapultCheckout, createCheckoutData, uuidv4, delegate, setLisableData, isLeasbleValidation, createMapperFor, createArrayLikeObjectFor, chromeHandlerFromDom, documentProxy, handleAPIErrorLogging, calculateLoadTimes, setUniqueUser, logScriptLoadingError, loadScript, insertVCCCardIframe, initializeMerchant, setUpListenersForLocationChange, showWelcomeScreenUI, hideWelcomeScreenUI, showConfirmationScreenUI, hideConfirmationScreenUI, toggleWelcomeScreen, toggleConfirmationScreen, toggleDiv, getWelcomeScreenUI, getConfirmationScreenUI, isConfirmationOpen, getRetailerDisplayName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR_TYPES", function() { return ERROR_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractStateZipCity", function() { return extractStateZipCity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataRetailer", function() { return getDataRetailer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAPILesable", function() { return getAPILesable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "katapultCheckout", function() { return katapultCheckout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCheckoutData", function() { return createCheckoutData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uuidv4", function() { return uuidv4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delegate", function() { return delegate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLisableData", function() { return setLisableData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLeasbleValidation", function() { return isLeasbleValidation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMapperFor", function() { return createMapperFor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createArrayLikeObjectFor", function() { return createArrayLikeObjectFor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chromeHandlerFromDom", function() { return chromeHandlerFromDom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "documentProxy", function() { return documentProxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleAPIErrorLogging", function() { return handleAPIErrorLogging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateLoadTimes", function() { return calculateLoadTimes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUniqueUser", function() { return setUniqueUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logScriptLoadingError", function() { return logScriptLoadingError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadScript", function() { return loadScript; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertVCCCardIframe", function() { return insertVCCCardIframe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeMerchant", function() { return initializeMerchant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUpListenersForLocationChange", function() { return setUpListenersForLocationChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showWelcomeScreenUI", function() { return showWelcomeScreenUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideWelcomeScreenUI", function() { return hideWelcomeScreenUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showConfirmationScreenUI", function() { return showConfirmationScreenUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideConfirmationScreenUI", function() { return hideConfirmationScreenUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleWelcomeScreen", function() { return toggleWelcomeScreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleConfirmationScreen", function() { return toggleConfirmationScreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleDiv", function() { return toggleDiv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWelcomeScreenUI", function() { return getWelcomeScreenUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfirmationScreenUI", function() { return getConfirmationScreenUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isConfirmationOpen", function() { return isConfirmationOpen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRetailerDisplayName", function() { return getRetailerDisplayName; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");
/* harmony import */ var _CustomErrors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomErrors */ "./src/js/CustomErrors.js");

 //order of the array elements is important

const ERROR_TYPES = ['LEASABLE_API_ERROR', 'CARD_GEN_API_ERROR', 'VCC_DOM_PARSING_ERROR', 'LOOKUP_API_ERROR', 'SCRIPT_LOAD_ERROR', 'DOM_PARSING_ERROR', 'VIEW_CARD_API_ERROR']; //clipBoardCopy function start

function clipBoardCopy(value, elementId) {
  if (elementId) {
    var copyText = document.getElementById(elementId);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
  }

  navigator.clipboard.writeText(value).then(function () {
    console.log('copied to clipboard' + value);
  });
}

function getMerchantPaymentPageVerification(logo, checkoutText, checkoutWithKatapult, validationText) {
  return `
  <section id="true" class="addressVerification">
    <div class="ChromeWraperBlock payment-popup-show">
        <div class="chromeheader">
        <span class="img-block kp_logo">
            <img  src="${logo}"/>
        </span>
        </div>
        <div  class="checkout-block">
          <p class="info-text-checkout"><img  src="${checkoutText}"/></p>
          <a id="CheckoutBtn" class="btn-katapult-checkout" href="javascript:void(0)"><img  src="${checkoutWithKatapult}"/></a>
        </div>
    </div>
    <div class="ChromeWraperBlock addres-popup-show">
      <div class="chromeheader">
        <span class="img-block"><img  src="${logo}"/></span>
      </div>
       <div class="supported">
           <p class="info-text-checkout"><img  src="${validationText}"/></p>
       </div>
      </div>
  </section> 
    `;
}

function getSupportedMerchantOnPage(logo, supported, hostName) {
  return `
    <div class="ChromeWraperBlock supported-block pos-relative validationTextBlock">
      <div class="chromeheader">
        <span class="img-block kp_logo"><img  src="${logo}"/></span>
      </div>
       <div class="supported">
          <p class="info-text-checkout manage"><span><img  src="${supported}"/></span><span class="info-body-txt">Congrats, Katapult supports <br /> <span class="color-p">${hostName}</span> to checkout</span></p>
          </div>
      <div>
    
    `;
}

function getSupportedMerchantvalidationFailedWithLoader(logo, validationText) {
  return `
<div class="ChromeWraperBlock supported-block pos-relative validationTextBlock">
  <div class="isLesable-overLay">
      <div class="loaderIsLesable"></div>
  </div>
  <div class="chromeheader">
    <span class="img-block kp_logo"><img  src="${logo}"/></span>
  </div>
   <div class="supported">
       <p class="info-text-checkout"><img  src="${validationText}"/></p>
   </div>
  </div>

`;
}

function getSupportedMerchantvalidationFailedWithOutLoader(logo, validationText) {
  return `
<div class="ChromeWraperBlock supported-block pos-relative validationTextBlock">
<div class="chromeheader">
  <span class="img-block kp_logo"><img  src="${logo}"/></span>
</div>
 <div class="supported">
     <p class="info-text-checkout"><img  src="${validationText}"/></p>
 </div>
</div>
`;
}

function getMenuActionHtml(_relativePath, supportedPaymentIcon, supportedSiteIcon, closeIcon, popupWindow) {
  return ` 
                <div id="cx_wrapper">
                    <div id="drawer-handle">
                        <img class="menuIcon"  src="${window.location.href.includes(_relativePath) === true ? supportedPaymentIcon : supportedSiteIcon}"/>
                        <img class="closePopupIcon kp_close"   src="${closeIcon}"/>
                        </div>
                      <div id="drawer-content" class="openSlide">
                          ${popupWindow}
                      </div>
                  <div>
                   `;
} //Extract state, zip and city


function extractStateZipCity(addressString) {
  var arr = addressString.split(",");
  var revArr = arr.reverse();
  var data = revArr[1].split(" ").reverse();
  var state = data[1];
  var zip = data[0];
  data.shift();
  data.shift();
  var city = data.reverse().join(" ");
  return {
    state,
    zip,
    city
  };
}

function validateDisplayError(displayError) {
  return typeof displayError === 'function';
}

function showErrorOnScreen(displayErrorView, logo) {
  if (validateDisplayError(displayErrorView)) {
    return displayErrorView(logo);
  }

  return null;
}

function getDataRetailer(getObj, getValue, vccArgs, laodingArgs, katapultPaymentCompleteStatus = false, displayError) {
  var closeIcon, logo, userIcon, supported, checkoutText, checkoutWithKatapult, supportedMerchant, validationText, floatingOpenIcon, supportedSiteIcon, supportedPaymentIcon, bgImage, cardLogo, rightIcon, paymentIconType, clipCopy;

  if (chrome.hasOwnProperty('runtime')) {
    //var checkout = "";
    //var marqeta_data = {};
    closeIcon = chrome.runtime.getURL('src/images/closeIcon.png');
    logo = chrome.runtime.getURL('src/svg/KatapultLogo.svg'); //userIcon = chrome.runtime.getURL('src/images/userIcon.png')

    supported = chrome.runtime.getURL('src/images/supported.png');
    checkoutText = chrome.runtime.getURL("src/svg/checkoutText.svg");
    checkoutWithKatapult = chrome.runtime.getURL("src/svg/checkoutWithKatapult.svg"); //supportedMerchant = chrome.runtime.getURL("src/svg/supportedMerchant.svg")

    validationText = chrome.runtime.getURL("src/svg/validationText.svg"); //floatingOpenIcon = chrome.runtime.getURL("src/svg/floatingOpenIcon.svg")

    supportedSiteIcon = chrome.runtime.getURL('src/images/supportedSiteIcon.png');
    supportedPaymentIcon = chrome.runtime.getURL('src/images/supportedPaymentIcon.png');
    paymentIconType = chrome.extension.getURL('src/images/visa.png');
    clipCopy = chrome.extension.getURL('src/images/clip_copy.png');
    bgImage = chrome.extension.getURL('src/images/bg_image.png');
    cardLogo = chrome.extension.getURL('src/images/white_logo.png');
    rightIcon = chrome.extension.getURL('src/images/right_icon.png');
  }

  const {
    shippingStatus,
    getSubTotalForValidation,
    lesableResponseType,
    overrideRelativePath,
    skipUiUpdate
  } = getValue; // console.log(getValue)
  // retailer_lookup API Start
  // retailer_lookup API End
  // console.log('>>> step 10:: print get data ::', getValue, shippingStatus, typeof getSubTotalForValidation);

  let {
    domainName: _domainName,
    merchantToken: _merchentId,
    defaultPath: _defaultPath,
    minCartValue: _minValue,
    maxCartValue: _maxValue,
    relativePath: _relativePath
  } = getObj;
  const kxBodyExist = document.getElementById('kx_body');

  if (kxBodyExist) {
    kxBodyExist.remove();
  } //_relativePath = 'information,payment';


  let relativePathArray = _relativePath ? _relativePath.split(',').filter(path => window.location.href.includes(path.trim())) : [];
  if (relativePathArray.length > 0 && relativePathArray[0] != '') _relativePath = relativePathArray[0];
  console.log("_relativePath " + _relativePath);
  console.log(" ###########  _domainName: " + _domainName + " | window.origin: " + window.origin);

  if (window.location.href.includes(_relativePath) === true || window.origin === _domainName) {
    var kx_main_Wraper = document.createElement("div");
    kx_main_Wraper.id = "kx_body";
    var menuAction = document.createElement("div");
    menuAction.id = "drawer";
    menuAction.className = shippingStatus;
    var hostName = location.hostname; // popup start

    var MerchantPaymentPageVerification = getMerchantPaymentPageVerification(logo, checkoutText, checkoutWithKatapult, validationText);
    var supportedMerchantOnPage = getSupportedMerchantOnPage(logo, supported, hostName);
    var supportedMerchantvalidationFailedWithLoader = getSupportedMerchantvalidationFailedWithLoader(logo, validationText);
    var supportedMerchantvalidationFailedWithOutLoader = getSupportedMerchantvalidationFailedWithOutLoader(logo, validationText);
    var supportedMerchantvalidationFailed = `${lesableResponseType !== true ? supportedMerchantvalidationFailedWithLoader : supportedMerchantvalidationFailedWithOutLoader}`;
    tryAddingLoader(laodingArgs);
    var cardInformationPopup = getCardInformationPopup(logo, vccArgs, clipCopy, paymentIconType, bgImage, cardLogo, rightIcon);
    var errorInformation = showErrorOnScreen(displayError, logo); //popup end

    var sameAsShipping = "true";
    var totalValidation = getSubTotalForValidation;
    var popupWindow;
    popupWindow = (overrideRelativePath || window.location.href.includes(_relativePath) === true) && sameAsShipping == shippingStatus && totalValidation >= _minValue && totalValidation <= _maxValue ? MerchantPaymentPageVerification : katapultPaymentCompleteStatus === true ? cardInformationPopup : _domainName === document.location.origin && (window.location.href.includes(_relativePath) === true || overrideRelativePath) ? supportedMerchantvalidationFailed : supportedMerchantOnPage;
    popupWindow = errorInformation === null ? popupWindow : errorInformation;

    if (skipUiUpdate) {
      popupWindow = supportedMerchantOnPage;
    }

    menuAction.innerHTML = getMenuActionHtml(_relativePath, supportedPaymentIcon, supportedSiteIcon, closeIcon, popupWindow);
    kx_main_Wraper.appendChild(menuAction);
    document.body.appendChild(kx_main_Wraper);
    /** Open widget when cart is eligible to Pay */

    if (popupWindow === MerchantPaymentPageVerification) {
      $("#drawer-content").animate({
        "margin-right": 0
      }, "slow");
      $("#kx_body").addClass("K_open");
    }

    var $dragging = null;
    var isDrag = false;
    $(document.body).on("mousemove", function (e) {
      if ($dragging) {
        isDrag = true;
        $dragging.offset({
          top: e.pageY
        });
      } else {
        setTimeout(() => {
          isDrag = false;
        }, 1000);
      }
    });
    $("#drawer-handle").click(function (e) {
      e.preventDefault();
      if (isDrag) return;

      if (document.getElementById("kx_body").className === "K_open") {
        $("#drawer-content").animate({
          "margin-right": -354
        }, "slow");
        $("#kx_body").removeClass("K_open");
      } else {
        $("#drawer-content").animate({
          "margin-right": 0
        }, "slow");
        $("#kx_body").addClass("K_open");
      }
    });
    $(document.body).on("mousedown", "#drawer-handle", function (e) {
      e.preventDefault();
      $dragging = $(e.target);
    });
    $(document.body).on("mouseup", function (e) {
      e.preventDefault();
      $dragging = null;
    });
  }
}

function getCardInformationPopup(logo, vccArgs, clipCopy, paymentIconType, bgImage, cardLogo, rightIcon) {
  return `
    <div class="ChromeWraperBlock supported-block view-card">
      <div class="chromeheader">
        <span class="img-block kp_logo">
          <img  src="${logo}"/>
        </span>
      </div>
       <div class="supported cardInfoBlock">
           <div class="headding">
            <span class="img-block">
                <img  src="${rightIcon}"/>
            </span>Congrats! Your one-time-use Katapult Pay™ card has been issued!</div>
           <div class="view-card-iframe"></div>
           <div class="message-card">
              <div class="title">LIMITED USE</div>
              <div class="text-message">The Katapult Pay™ Card is issued by Sutton Bank, Member FDIC, pursuant to a license from Visa U.S.A. Inc. The Katapult Pay™ Card is powered by Marqeta.</div>
           </div>
       </div>
      </div>
    `;
}

function isLoaderPresent() {
  return document.querySelector('.zby-overlay') && document.querySelector('.zby-container');
}

function tryAddingLoader(laodingArgs) {
  if (laodingArgs && laodingArgs.loading) {
    if (isLoaderPresent()) return;
    document.body.classList.add("zby-overlay-opened");
    var overlay = document.createElement('div');
    overlay.className = "zby-overlay";
    document.body.insertBefore(overlay, document.body.firstChild);
    var overlayCntainer = document.createElement('div');
    overlayCntainer.className = "zby-container";
    document.body.insertBefore(overlayCntainer, document.body.firstChild);
  } else if (laodingArgs) {
    document.body.classList.remove("zby-overlay-opened");
    document.querySelector('.zby-overlay') && document.querySelector('.zby-overlay').remove();
    document.querySelector('.zby-container') && document.querySelector('.zby-container').remove();
  }
}

const formatPredictionArray = prediction => {
  return prediction.map(pred => pred === 'True');
};

const getAPILesable = reqBody => {
  const header = {
    'Content-Type': 'application/json'
  };
  const body = reqBody;
  return new Promise((resolve, reject) => {
    fetch("https://dev-isleasable.katapult.com/IsLeasable/", {
      method: "POST",
      headers: header,
      body: JSON.stringify(body)
    }).then(res => handleAPIErrorLogging(res, ERROR_TYPES[0])).then(async response => {
      setTimeout(calculateLoadTimes, 1000);

      if (response.status === 200) {
        const responseData = await response.json();
        const data = { ...responseData,
          prediction: formatPredictionArray(responseData.prediction)
        };
        resolve(data);
      } else {
        reject(response);
      }
    }).catch(err => {
      handleAPIErrorLogging(err, ERROR_TYPES[0]);
      reject(err);
    });
  });
};
function katapultCheckout(checkout, katapult) {
  document.getElementById("cx_wrapper").classList = "js_sdk_open";
  katapult && katapult.checkout && katapult.checkout.set(checkout);
  katapult && katapult.checkout && katapult.checkout.load();
}

function getBilling({
  getFirst,
  getLast,
  getAddress,
  getAddress2,
  getCity,
  getState,
  getZip,
  getPhoneNumber,
  getEmailFromWindow
}) {
  return {
    first_name: getFirst,
    middle_name: "",
    last_name: getLast,
    address: getAddress,
    address2: getAddress2,
    city: getCity,
    state: getState,
    country: "United States",
    zip: getZip,
    phone: getPhoneNumber,
    email: getEmailFromWindow
  };
}

function createCheckoutData(data) {
  return {
    customer: {
      billing: getBilling(data),
      shipping: getBilling(data)
    },
    items: data['shippingList'],
    checkout: {
      customer_id: "null",
      shipping_amount: data['getShipping'],
      discounts: [{
        discount_name: "Discount name 1",
        discount_amount: data['discountResponse']
      }]
    },
    sales_tax: parseFloat(data['getSalesTaxFormDom']),
    cart_total: parseFloat(data['getTotalFormDom']),
    urls: {
      return: false,
      cancel: false
    }
  };
}
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
function delegate(el, evt, sel, handler) {
  function delegateListener(event) {
    //event.which is set when its not a mutation event. If its a mutation event then it is undefined
    var t;

    if (event.which !== undefined) {
      t = event.target;
    } else {
      t = event.path[1];
    }

    while (t && t !== this) {
      if (t.matches(sel)) {
        handler.call(t, event);
      }

      t = t.parentNode;
    }
  }

  el.addEventListener(evt, delegateListener);
  return delegateListener;
}
function setLisableData(isLesableStatus, shippingList) {
  for (var key in shippingList) {
    shippingList[key].leasable = isLesableStatus[key];
  }

  return shippingList;
}
function isLeasbleValidation(shippingList) {
  let newObjPrice = [];

  for (var key in shippingList) {
    if (shippingList[key].leasable === "True") {
      newObjPrice.push(shippingList[key].unit_price * shippingList[key].quantity);
    }
  }

  return newObjPrice;
}
function createMapperFor(that) {
  return Array.prototype.map.bind(that);
}
function createArrayLikeObjectFor(instance) {
  instance.prototype = Array.prototype;
  return instance;
}
function chromeHandlerFromDom() {
  window.addEventListener('InitialKataPultExtension', event => {
    window.getDataRetailer({
      skipUiUpdate: event.detail.skipUiUpdate
    }, {});
  });
}

const handler = function () {
  return {
    get: function (obj, prop) {
      return function (identifier) {
        let output = document[prop](identifier);

        if (output == null || output.length === 0) {
          setTimeout(function () {
            const domParsingErrorEvent = new CustomEvent("VCC_DOM_PARSING_ERROR", {
              detail: {
                expectedDomElement: identifier,
                merchant: window.location.hostname,
                href: window.location.href
              }
            });
            window.dispatchEvent(domParsingErrorEvent);
          });
        }

        return output;
      };
    }
  };
};

function documentProxy() {
  return new Proxy({
    querySelectorAll: document.querySelectorAll,
    querySelector: document.querySelector,
    getElementById: document.getElementById,
    getElementsByClassName: document.getElementsByClassName
  }, handler());
}
function handleAPIErrorLogging(response, errorType) {
  if (!response.ok) {
    window.parent.dispatchEvent(new CustomEvent(errorType, {
      detail: response
    }));
  }

  return response;
}

function resourceNameFilter(resource) {
  return resource.name.includes("katapult");
}

function calculateLoadTimes() {
  var dataToPost = {}; // Check performance support

  if (performance === undefined) {
    console.log("= Calculate Load Times: performance NOT supported");
    return;
  } // Get a list of "resource" performance entries


  var resources = performance.getEntriesByType("resource").filter(resourceNameFilter);

  if (resources === undefined || resources.length <= 0) {
    console.log("= Calculate Load Times: there are NO `resource` performance records");
    return;
  }

  console.log("= Calculate Load Times");

  for (var i = 0; i < resources.length; i++) {
    console.log("== Resource[" + i + "] - " + resources[i].name);
    dataToPost[resources[i].name] = {};
    const ptr = dataToPost[resources[i].name]; // Redirect time

    ptr['redirectTime'] = resources[i].redirectEnd - resources[i].redirectStart;
    console.log("... Redirect time = " + ptr); // DNS time

    ptr['dnsLookupTime'] = resources[i].domainLookupEnd - resources[i].domainLookupStart;
    console.log("... DNS lookup time = " + ptr); // TCP handshake time

    ptr['tcpTime'] = resources[i].connectEnd - resources[i].connectStart;
    console.log("... TCP time = " + ptr); // Secure connection time

    ptr['secureConnectionTime'] = resources[i].secureConnectionStart > 0 ? resources[i].connectEnd - resources[i].secureConnectionStart : "0";
    console.log("... Secure connection time = " + ptr); // Response time

    ptr['responseTime'] = resources[i].responseEnd - resources[i].responseStart;
    console.log("... Response time = " + ptr); // Fetch until response end

    ptr['fetchUntilResponseEnd'] = resources[i].fetchStart > 0 ? resources[i].responseEnd - resources[i].fetchStart : "0";
    console.log("... Fetch until response end time = " + ptr); // Request start until response end

    ptr['requestStartToResponseEnd'] = resources[i].requestStart > 0 ? resources[i].responseEnd - resources[i].requestStart : "0";
    console.log("... Request start until response end time = " + ptr); // Start until response end

    ptr['totalTimeFromStartToEnd'] = resources[i].startTime > 0 ? resources[i].responseEnd - resources[i].startTime : "0";
    console.log("... Start until response end time = " + ptr);
  }

  const error = _CustomErrors__WEBPACK_IMPORTED_MODULE_1__["vccErrors"].createError('VCC_API_TIMING_LOGS', 'VCC_API_TIMING_LOGS', null, {
    detail: dataToPost
  });
  error.logToSentry();
}
function setUniqueUser() {
  return Math.random().toString(36).slice(2);
}

function loaderScript(scriptUrl) {
  return new Promise(function (res, rej) {
    let script = document.createElement('script');
    script.src = scriptUrl;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = res;
    let logError = logScriptLoadingError.bind(null, rej, scriptUrl);
    script.addEventListener('error', logError);
    script.addEventListener('load', res);
    document.body.appendChild(script);
  });
}

function logScriptLoadingError(rejection, scriptUrl, details) {
  window.dispatchEvent(new CustomEvent(ERROR_TYPES[4], {
    detail: {
      details,
      scriptUrl
    }
  }));
  rejection(details);
}
function loadScript(url) {
  $(document).ready(function () {
    loaderScript(url).then(() => {
      console.log("loaded");
    }).catch(() => {
      console.log("error");
    });
  });
}
function insertVCCCardIframe(htmlString) {
  const ifr = document.createElement('iframe');
  ifr.srcdoc = htmlString;
  ifr.style.height = '240px';
  ifr.style.setProperty('width', '332px', 'important');
  ifr.style.border = '0';
  document.querySelector('.view-card-iframe').appendChild(ifr);
}
function initializeMerchant(_katapult_config) {
  if (document.getElementById('katapult-api-key')) return;
  var apiKeyDiv = document.createElement("div");
  apiKeyDiv.setAttribute("id", "katapult-api-key");
  apiKeyDiv.style.visibility = "hidden";
  apiKeyDiv.setAttribute("data-key", _katapult_config.api_key);
  document.body.appendChild(apiKeyDiv);
  !function (e, t) {
    e.katapult = e.katapult || {};
    var n, i, r;
    i = !1, n = document.createElement("script"), n.type = "text/javascript", n.async = !0, n.src = t.environment + "/" + "plugin/js/katapult.js", n.onload = n.onreadystatechange = function () {
      i || this.readyState && "complete" != this.readyState || (i = !0, e.katapult.setConfig(t.api_key));
    }, r = document.getElementsByTagName("script")[0], r.parentNode.insertBefore(n, r);
    var s = document.createElement("link");
    s.setAttribute("rel", "stylesheet"), s.setAttribute("type", "text/css"), s.setAttribute("href", t.environment + "/" + "plugin/css/katapult.css");
    var a = document.querySelector("head");
    a.insertBefore(s, a.firstChild);
  }(window, _katapult_config);
}
function setUpListenersForLocationChange() {
  history.pushState = (f => function pushState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  })(history.pushState);

  history.replaceState = (f => function replaceState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  })(history.replaceState);

  window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'));
  });
}
const showWelcomeScreenUI = () => toggleWelcomeScreen('');
const hideWelcomeScreenUI = () => toggleWelcomeScreen('none');
const showConfirmationScreenUI = () => toggleConfirmationScreen('');
const hideConfirmationScreenUI = () => toggleConfirmationScreen('none');
function toggleWelcomeScreen(displayValue) {
  var _document$querySelect;

  (_document$querySelect = document.querySelector('#drawer-handle')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.click();
  toggleDiv(_constants__WEBPACK_IMPORTED_MODULE_0__["screens"].welcomeScreen, displayValue);
}
function toggleConfirmationScreen(displayValue) {
  var _document$querySelect2;

  (_document$querySelect2 = document.querySelector('#drawer-handle')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.click();
  toggleDiv(_constants__WEBPACK_IMPORTED_MODULE_0__["screens"].confirmationScreen, displayValue);
}
function toggleDiv(selector, displayValue) {
  const div = document.querySelector(selector);
  div.style.display = displayValue;
}
function getWelcomeScreenUI(displayValue = 'none') {
  const logo = chrome.runtime.getURL("src/svg/KatapultLogo.svg");
  const check = chrome.runtime.getURL("src/Images/check.png");
  const arrowRight = chrome.runtime.getURL("src/Images/arrowRight.png");
  const mockCard = chrome.runtime.getURL("src/svg/mockCard.svg");
  const payKatapult = chrome.runtime.getURL("src/svg/katapult-pay-btn.svg");
  const popClose = chrome.runtime.getURL("src/svg/popupClose.svg");
  const bagIcon = chrome.runtime.getURL("src/svg/bagIcon.svg");
  const oneIcon = chrome.runtime.getURL("src/svg/oneIcon.svg");
  const cartIcon = chrome.runtime.getURL("src/svg/cartIcon.svg");
  return `
    <div class="katapult-welcome-screen" style="display: ${displayValue}">
    <div class="overlay-wc">
  <div class="container-wc">
   <div class="main-wc">
    <div class="header-wc">
    <span class="img-block kp_logo welcome-logo">
        <img  src="${logo}"/>
    </span>
    <div class="katapult-welcome-screen-close"><img src="${popClose}" height="40" width="104" alt="popClose" /></div>
    </div>
    <div class="mainBody-wc">
     <div class="body-wc">
      <h1>It's easy to use the Katapult Pay™ one-time card!</h1>
      <div class="textContainer-wc">
       <div class="pointText-wc">
        <img src="${check}" alt="Step Completed" width="28px" height="28px" />
        <p>Go shopping - add items to your cart</p>
       </div>
       <div class="pointText-wc">
        <img src="${check}" alt="Step Completed" width="28px" height="28px" />
        <p>Checkout with Katapult</p>
       </div>
       <div class="pointText-wc">
        <img src="${arrowRight}" alt="Step Incomplete" width="28px" height="28px" />
        <p>Complete your lease agreement</p>
       </div>
       <div class="pointText-wc">
        <img src="${arrowRight}" alt="Step Incomplete" width="28px" height="28px" />
        <p>Make your initial payment today to start leasing your items</p>
       </div>
       <div class="pointText-wc">
        <img src="${arrowRight}" alt="Step Incomplete" width="28px" height="28px" />
        <p>Use your <strong>one-time-use</strong> <strong class="p-color">Katapult Pay™</strong> card to complete your purchase</p>
       </div>
       <div class="pointText-wc">
        <img src="${arrowRight}" alt="Step Incomplete" width="28px" height="28px" />
        <p>Congratulations! Enjoy your items as you pay over time!</p>
       </div>
      </div>
      <div class="btn-katapult-checkout-proceed"><img src="${payKatapult}" height="52" width="270" alt="payKatapult" /></div>
      
     </div>
    </div>
    <div class="footer-cs">
      <p><strong>Questions?</strong> <span>Call Katapult at</span> <strong class="p-color">833-KATAPULT (833-528-2785)</strong></p>
     </div>
   </div>
   <div class="additional-wc">
    <div class="additionalBody-wc">
     <div class="textTop-wc">
      <h3>Checkout with </br><strong class="add-font-weight-8">Katapult Pay™</strong> today!</h3>
      <p>You will get your <strong>one-time-use Katapult Pay™</strong> card after you complete the lease agreement and make your initial payment.</p>
     </div>
     <div class="card-wc">
     <img src="${mockCard}" height="223" width="245" alt="Mock Card" /></div>
     <div class="textBottom-wc">
      <div class="textDiv-wc">
       <img height="30px" width="30px" alt="icon" src="${bagIcon}" />
       <p>Easy & Convenient checkout</p>
      </div>
      <div class="textDiv-wc">
       <img height="30px" width="30px" alt="icon" src="${oneIcon}" />
       <p>One-time-use card for this order</p>
      </div>
      <div class="textDiv-wc">
       <img height="30px" width="30px" alt="icon" src="${cartIcon}" />
       <p>Simple and secure</p>
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>
 </div>
    `;
}
function getConfirmationScreenUI(displayValue = 'none', domainName = '') {
  const logo = chrome.runtime.getURL("src/svg/KatapultLogo.svg");
  const mockCardFull = chrome.runtime.getURL("src/Images/mockCardFull.png");
  const viewPayKatapult = chrome.runtime.getURL("src/svg/viewPayKatapult.svg");
  const popClose = chrome.runtime.getURL("src/svg/popupClose.svg");
  return `
    <div class="katapult-confirmation-screen" style="display: ${displayValue}">
    <div class="overlay-cs" >
  <div class="main-cs">
   <div class="header-cs">
   <span class="img-block kp_logo confirm-logo">
         <img  src="${logo}"/>
   </span>
    <div class="btn-katapult-confirmation-close"><img src="${popClose}" height="40" width="104" alt="popClose" /></div>
   </div>
   <div class="mainBody-cs">
    <div class="body-cs">
     <h1>You are almost done!</h1>
     <p class="para-cs">Your <strong>one-time-use</strong> <strong class="p-color">Katapult Pay™</strong> card is being issued.</p>
     <div class="middleContainer-cs">
      <div class="card-cs">
       <img height="160px" width="280px" alt="Mock Card" src="${mockCardFull}" />
      </div>
      <div class="textContainer-cs">
       <div class="pointText-cs">
        <div class="number-cs">1</div>
        <p>Copy <strong class="p-color">Katapult Pay™</strong> card number you’ll see on the next screen</p>
       </div>
       <div class="pointText-cs">
        <div class="number-cs">2</div>
        <p>Paste your <strong class="p-color">Katapult Pay™</strong> card number, CVV and expiration date into
         <strong class="p-color">${domainName}</strong> checkout page
        </p>
       </div>
       <div class="pointText-cs">
        <div class="number-cs">3</div>
        <p>Submit your order to <strong class="p-color">${domainName}</strong></p>
       </div>
      </div>
     </div>
     <!-- on button click card generation takes place. Do a global search for class name     -->
     <div class="btn-katapult-confirmation"><img src="${viewPayKatapult}" height="52" width="270" alt="viewPayKatapult" /></div> 
    </div>
   </div>
   <div class="footer-cs">
    <p><strong>Questions?</strong> Call Katapult at <strong class="p-color">833-KATAPULT (833-528-2785)</strong></p>
   </div>
  </div>
 </div>
 </div>
    `;
}
function isConfirmationOpen() {
  return document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["screens"].confirmationScreen).style.display !== 'none';
}
function getRetailerDisplayName(domain) {
  const hostSplit = new URL(domain).hostname.split('.');
  return hostSplit[hostSplit.length - 2];
}

/***/ }),

/***/ "./src/js/utility.js":
/*!***************************!*\
  !*** ./src/js/utility.js ***!
  \***************************/
/*! exports provided: isValidKeyCount, isAValidKey, constructParser, validateParser, roundNumberToDecimalPlaces, cleanupAmount, setStorage, getStorage, debounce, trimRight, arrayToMap, createError, convertStatetoFullForm, withEventHandler, replaceSpecialCharactersAndAlphabets */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidKeyCount", function() { return isValidKeyCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAValidKey", function() { return isAValidKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "constructParser", function() { return constructParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateParser", function() { return validateParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundNumberToDecimalPlaces", function() { return roundNumberToDecimalPlaces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanupAmount", function() { return cleanupAmount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStorage", function() { return setStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStorage", function() { return getStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimRight", function() { return trimRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayToMap", function() { return arrayToMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createError", function() { return createError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertStatetoFullForm", function() { return convertStatetoFullForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withEventHandler", function() { return withEventHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceSpecialCharactersAndAlphabets", function() { return replaceSpecialCharactersAndAlphabets; });
/* harmony import */ var _globalHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globalHelper */ "./src/js/globalHelper.js");

const validKeys = ['discounts', 'sales_tax', 'shipping_amount', 'cart_total', 'quantity', 'items', 'first_name', 'middle_name', 'last_name', 'address', 'address2', 'city', 'state', 'country', 'zip', 'email', 'phone', 'billing_address', 'billing_city', 'billing_state', 'billing_zip'];
const validKeysMap = new Map();
validKeys.forEach(key => {
  validKeysMap.set(key, true);
});
const Parser = {
  init(key, selector, multiple, callback) {
    this.key = key;
    this.selector = selector;
    this.multiple = multiple;
    this.callback = callback;
    return this;
  },

  val(v) {
    this.value = v;
    return this;
  },

  callbackFn(f) {
    if (typeof f == 'function') {
      this.callbackValFn = f;
    }

    return this;
  },

  setIsAmount(isAmount = true) {
    this.isAmount = isAmount;
    return this;
  }

};
function isValidKeyCount(obj) {
  // 13 is the minimum number of keys expected to parsed for successful checkout
  return Object.keys(obj).length >= 13;
}
function isAValidKey({
  key
}) {
  if (validKeysMap.has(key)) {
    return true;
  }

  throw new Error('Invalid Key');
}
function constructParser(key, selector, multiple, callback) {
  return Object.create(Parser).init(key, selector, multiple, callback);
}
function validateParser(parser, parentClass) {
  if (parser.__proto__ === parentClass) {
    return parser;
  } else {
    throw new Error('Parser should be created using DOMParser object.  Use Object.create(DOMParser) to create your parser. The parser object parent doesnt point to DOMParser.');
  }
}
function roundNumberToDecimalPlaces(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
function cleanupAmount(txt) {
  return parseFloat(txt === null || txt === void 0 ? void 0 : txt.replace(/\$/g, '').replace(/\-/g, '').replace(/,/g, '').trim());
}
function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
function debounce(f, sec) {
  var timeout;
  return function debouncedFunction(param) {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(f.bind(null, param), sec);
  };
}
function trimRight(str, ch) {
  return ch && typeof str === 'string' ? str[str.length - 1] === ch ? str.substring(0, str.length - 1) : str : str;
}
function arrayToMap(arr) {
  return arr.reduce((acc, curr, index, data) => {
    if (index % 2 === 0) {
      return { ...acc,
        [trimRight(curr, ':')]: data[index + 1]
      };
    }

    return acc;
  }, {});
}
function createError(message, name) {
  const error = new Error(message);
  error.name = name;
  return error;
}
function convertStatetoFullForm(shortState) {
  const mapping = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FL": "Florida",
    "GA": "Georgia",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PA": "Pennsylvania",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
  };
  const isCorrectState = shortState && mapping.hasOwnProperty(shortState);
  return isCorrectState ? mapping[shortState] : '';
}
function withEventHandler(event, handler, parserObject) {
  const selector = parserObject.selector;
  Object(_globalHelper__WEBPACK_IMPORTED_MODULE_0__["delegate"])(document, event, selector, handler);
  return parserObject;
}
function replaceSpecialCharactersAndAlphabets(str) {
  return str.replace(/[^\d\.]/g, '');
}

/***/ }),

/***/ "./src/merchants/lull.js":
/*!*******************************!*\
  !*** ./src/merchants/lull.js ***!
  \*******************************/
/*! exports provided: discountsParser, salesTaxParser, shipAmountParser, cartTotalParser, getProductName, productItemsParser, getPriceQty, phoneParser, generalParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "discountsParser", function() { return discountsParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "salesTaxParser", function() { return salesTaxParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shipAmountParser", function() { return shipAmountParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartTotalParser", function() { return cartTotalParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProductName", function() { return getProductName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "productItemsParser", function() { return productItemsParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPriceQty", function() { return getPriceQty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "phoneParser", function() { return phoneParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generalParser", function() { return generalParser; });
/* harmony import */ var _config_configProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/configProvider */ "./src/config/configProvider.js");
/* harmony import */ var _js_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/utility */ "./src/js/utility.js");
/* harmony import */ var _js_abstractMerchant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/abstractMerchant */ "./src/js/abstractMerchant.js");
var _window, _window$dataLayer, _window$dataLayer$;




function discountsParser(node) {
  let StringToNumberDiscount = node && node.innerHTML;
  return [{
    discount_name: "Total Savings",
    discount_amount: StringToNumberDiscount ? StringToNumberDiscount.replace(/\D/g, "") : "0.00"
  }];
}
function salesTaxParser(nodes) {
  const tax = parseFloat(this.cleanup(nodes[0]).replace(/\$/g, '').replace(/,/g, ""));
  return isNaN(tax) ? 0 : tax;
}
function shipAmountParser(nodes) {
  const amt = this.cleanup(nodes[0]);
  const shipAmt = parseFloat(amt.replace(/\$/g, '').replace(/,/g, ""));
  return amt !== "FREE" ? isNaN(shipAmt) ? 0 : shipAmt : 0;
}
function cartTotalParser(nodes) {
  const total = this.cleanup(nodes[0]);
  const cartTotal = parseFloat(total.replace(/[^\d\.]/g, ''));
  return isNaN(cartTotal) ? 0 : cartTotal;
}
function getProductName(dom) {
  var _dom$firstElementChil;

  return {
    display_name: (_dom$firstElementChil = dom.firstElementChild.children[0].children[1].children[0].innerText) === null || _dom$firstElementChil === void 0 ? void 0 : _dom$firstElementChil.trim(),
    sku: dom.getAttribute('data-sku').trim()
  };
}
function productItemsParser(nodes) {
  return Array.prototype.map.call(nodes, dom => ({ ...getProductName(dom),
    ...getPriceQty(dom)
  }));
}
function getPriceQty(dom) {
  const quantity = dom.getAttribute('data-quantity');
  const price = dom.getAttribute('data-price');
  return {
    unit_price: parseFloat(price.replace(/\$/g, '').replace(/,/g, "")),
    quantity
  };
}
function phoneParser(nodes) {
  return nodes[0].innerHTML.replace(/[^0-9]+/g, "");
}
function generalParser(nodes) {
  return this.cleanup(nodes[0]);
}
const parsers = {
  email: Object(_js_utility__WEBPACK_IMPORTED_MODULE_1__["constructParser"])('email').val((_window = window) === null || _window === void 0 ? void 0 : (_window$dataLayer = _window.dataLayer) === null || _window$dataLayer === void 0 ? void 0 : (_window$dataLayer$ = _window$dataLayer[0]) === null || _window$dataLayer$ === void 0 ? void 0 : _window$dataLayer$.leadEmail),
  phone: Object(_js_utility__WEBPACK_IMPORTED_MODULE_1__["constructParser"])('phone', 'address .js-output-shipping-phone', true, phoneParser),
  discounts: Object(_js_utility__WEBPACK_IMPORTED_MODULE_1__["constructParser"])('discounts', `.js-discount-value`, false, discountsParser),
  sales_tax: Object(_js_utility__WEBPACK_IMPORTED_MODULE_1__["constructParser"])('sales_tax', `#ptax`, true, salesTaxParser),
  shipping_amount: Object(_js_utility__WEBPACK_IMPORTED_MODULE_1__["constructParser"])('shipping_amount', `#pshipping`, true, shipAmountParser),
  cart_total: Object(_js_utility__WEBPACK_IMPORTED_MODULE_1__["constructParser"])('cart_total', `#ptotal`, true, cartTotalParser),
  items: Object(_js_utility__WEBPACK_IMPORTED_MODULE_1__["constructParser"])('items', '.cart-item.row', true, productItemsParser),
  first_name: Object(_js_utility__WEBPACK_IMPORTED_MODULE_1__["constructParser"])('first_name', 'address .js-output-shipping-first-name', true, generalParser),
  last_name: Object(_js_utility__WEBPACK_IMPORTED_MODULE_1__["constructParser"])('last_name', 'address .js-output-shipping-last-name', true, generalParser),
  address: Object(_js_utility__WEBPACK_IMPORTED_MODULE_1__["constructParser"])('address', 'address .js-output-shipping-address', true, generalParser),
  city: Object(_js_utility__WEBPACK_IMPORTED_MODULE_1__["constructParser"])('city', 'address .js-output-shipping-city', true, generalParser),
  state: Object(_js_utility__WEBPACK_IMPORTED_MODULE_1__["constructParser"])('state', 'address .js-output-shipping-state', true, generalParser),
  zip: Object(_js_utility__WEBPACK_IMPORTED_MODULE_1__["constructParser"])('zip', 'address .js-output-shipping-zip', true, generalParser)
};
const lullParser = Object.assign(Object.create(_js_abstractMerchant__WEBPACK_IMPORTED_MODULE_2__["DOMParser"]), {
  parsers
});
const lullMerchant = Object.create(_js_abstractMerchant__WEBPACK_IMPORTED_MODULE_2__["AbstractMerchant"]);
const provider = Object(_config_configProvider__WEBPACK_IMPORTED_MODULE_0__["getZibbyConfigFor"])('qa');
const config = provider('https://qa.ad.katapult.com', 'lull');
window.addEventListener('load', function () {
  lullMerchant.init(config, lullParser);
  lullMerchant.customerAddress.billingSameAsShipping = true;
  lullMerchant.run();
  lullMerchant.createMutationObserverFor(document.querySelector('.billing-address-different'), billingChanged);
});

function billingChanged(mutations) {
  mutations.forEach(function (mutation) {
    var shippingTarget = mutation.target.style.display;
    lullMerchant.customerAddress.billingSameAsShipping = shippingTarget === "none";
    lullMerchant.run();
  });
}

/***/ })

/******/ });
