/*
 React v16.0.0
 react-dom.production.min.js

 Copyright (c) 2013-present, Facebook, Inc.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
'use strict';function Nb(Za){function Ob(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?Sc(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}function Me(a){return a[1].toUpperCase()}function $a(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;return 32<=a||13===a?a:0}function Pb(){return Ne}function Tc(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!Oe[a.type]:"textarea"===b?!0:!1}function ab(a){if(null==
a)return null;if(1===a.nodeType)return a;var b=fa.get(a);if(b)return"number"===typeof b.tag?Uc(b):Vc(b);"function"===typeof a.render?m("188"):m("213",Object.keys(a))}function Vc(){m("212")}function Uc(){m("211")}function Qb(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}function Wc(a){var b=(a?a.ownerDocument||a:document).defaultView||window;return!!(a&&("function"===typeof b.Node?a instanceof
b.Node:"object"===typeof a&&"number"===typeof a.nodeType&&"string"===typeof a.nodeName))&&3==a.nodeType}function Xc(){!Rb&&z&&(Rb="textContent"in document.documentElement?"textContent":"innerText");return Rb}function Yc(a,b){var c=Zc(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Zc(c)}}function $c(){m("196")}function Pe(a){function b(){for(;null!==w&&0===w.current.pendingWorkPriority;){w.isScheduled=
!1;var a=w.nextScheduledRoot;w.n/** @license React v16.4.2
* react-dom.development.js
*
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

(function (global, factory) {
 typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
 typeof define === 'function' && define.amd ? define(['react'], factory) :
 (global.ReactDOM = factory(global.React));
}(this, (function (React) { 'use strict';

/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
*/



/**
* Use invariant() to assert state which your program assumes to be true.
*
* Provide sprintf-style format (only %s is supported) and arguments
* to provide information about what broke and what you were
* expecting.
*
* The invariant message will be stripped in production, but the invariant
* will remain to ensure logic does not differ in production.
*/

var validateFormat = function validateFormat(format) {};

{
 validateFormat = function validateFormat(format) {
   if (format === undefined) {
     throw new Error('invariant requires an error message argument');
   }
 };
}

function invariant(condition, format, a, b, c, d, e, f) {
 validateFormat(format);

 if (!condition) {
   var error;
   if (format === undefined) {
     error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
   } else {
     var args = [a, b, c, d, e, f];
     var argIndex = 0;
     error = new Error(format.replace(/%s/g, function () {
       return args[argIndex++];
     }));
     error.name = 'Invariant Violation';
   }

   error.framesToPop = 1; // we don't care about invariant's own frame
   throw error;
 }
}

var invariant_1 = invariant;

// Relying on the `invariant()` implementation lets us
// have preserve the format and params in the www builds.

!React ? invariant_1(false, 'ReactDOM was loaded before React. Make sure you load the React package before loading ReactDOM.') : void 0;

var invokeGuardedCallback = function (name, func, context, a, b, c, d, e, f) {
 this._hasCaughtError = false;
 this._caughtError = null;
 var funcArgs = Array.prototype.slice.call(arguments, 3);
 try {
   func.apply(context, funcArgs);
 } catch (error) {
   this._caughtError = error;
   this._hasCaughtError = true;
 }
};

{
 // In DEV mode, we swap out invokeGuardedCallback for a special version
 // that plays more nicely with the browser's DevTools. The idea is to preserve
 // "Pause on exceptions" behavior. Because React wraps all user-provided
 // functions in invokeGuardedCallback, and the production version of
 // invokeGuardedCallback uses a try-catch, all user exceptions are treated
 // like caught exceptions, and the DevTools won't pause unless the developer
 // takes the extra step of enabling pause on caught exceptions. This is
 // untintuitive, though, because even though React has caught the error, from
 // the developer's perspective, the error is uncaught.
 //
 // To preserve the expected "Pause on exceptions" behavior, we don't use a
 // try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
 // DOM node, and call the user-provided callback from inside an event handler
 // for that fake event. If the callback throws, the error is "captured" using
 // a global event handler. But because the error happens in a different
 // event loop context, it does not interrupt the normal program flow.
 // Effectively, this gives us try-catch behavior without actually using
 // try-catch. Neat!

 // Check that the browser supports the APIs we need to implement our special
 // DEV version of invokeGuardedCallback
 if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
   var fakeNode = document.createElement('react');

   var invokeGuardedCallbackDev = function (name, func, context, a, b, c, d, e, f) {
     // If document doesn't exist we know for sure we will crash in this method
     // when we call document.createEvent(). However this can cause confusing
     // errors: https://github.com/facebookincubator/create-react-app/issues/3482
     // So we preemptively throw with a better message instead.
     !(typeof document !== 'undefined') ? invariant_1(false, 'The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.') : void 0;
     var evt = document.createEvent('Event');

     // Keeps track of whether the user-provided callback threw an error. We
     // set this to true at the beginning, then set it to false right after
     // calling the function. If the function errors, `didError` will never be
     // set to false. This strategy works even if the browser is flaky and
     // fails to call our global error handler, because it doesn't rely on
     // the error event at all.
     var didError = true;

     // Create an event handler for our fake event. We will synchronously
     // dispatch our fake event using `dispatchEvent`. Inside the handler, we
     // call the user-provided callback.
     var funcArgs = Array.prototype.slice.call(arguments, 3);
     function callCallback() {
       // We immediately remove the callback from event listeners so that
       // nested `invokeGuardedCallback` calls do not clash. Otherwise, a
       // nested call would trigger the fake event handlers of any call higher
       // in the stack.
       fakeNode.removeEventListener(evtType, callCallback, false);
       func.apply(context, funcArgs);
       didError = false;
     }

     // Create a global error event handler. We use this to capture the value
     // that was thrown. It's possible that this error handler will fire more
     // than once; for example, if non-React code also calls `dispatchEvent`
     // and a handler for that event throws. We should be resilient to most of
     // those cases. Even if our error event handler fires more than once, the
     // last error event is always used. If the callback actually does error,
     // we know that the last error event is the correct one, because it's not
     // possible for anything else to have happened in between our callback
     // erroring and the code that follows the `dispatchEvent` call below. If
     // the callback doesn't error, but the error event was fired, we know to
     // ignore it because `didError` will be false, as described above.
     var error = void 0;
     // Use this to track whether the error event is ever called.
     var didSetError = false;
     var isCrossOriginError = false;

     function onError(event) {
       error = event.error;
       didSetError = true;
       if (error === null && event.colno === 0 && event.lineno === 0) {
         isCrossOriginError = true;
       }
     }

     // Create a fake event type.
     var evtType = 'react-' + (name ? name : 'invokeguardedcallback');

     // Attach our event handlers
     window.addEventListener('error', onError);
     fakeNode.addEventListener(evtType, callCallback, false);

     // Synchronously dispatch our fake event. If the user-provided function
     // errors, it will trigger our global error handler.
     evt.initEvent(evtType, false, false);
     fakeNode.dispatchEvent(evt);

     if (didError) {
       if (!didSetError) {
         // The callback errored, but the error event never fired.
         error = new Error('An error was thrown inside one of your components, but React ' + "doesn't know what it was. This is likely due to browser " + 'flakiness. React does its best to preserve the "Pause on ' + 'exceptions" behavior of the DevTools, which requires some ' + "DEV-mode only tricks. It's possible that these don't work in " + 'your browser. Try triggering the error in production mode, ' + 'or switching to a modern browser. If you suspect that this is ' + 'actually an issue with React, please file an issue.');
       } else if (isCrossOriginError) {
         error = new Error("A cross-origin error was thrown. React doesn't have access to " + 'the actual error object in development. ' + 'See https://fb.me/react-crossorigin-error for more information.');
       }
       this._hasCaughtError = true;
       this._caughtError = error;
     } else {
       this._hasCaughtError = false;
       this._caughtError = null;
     }

     // Remove our event listeners
     window.removeEventListener('error', onError);
   };

   invokeGuardedCallback = invokeGuardedCallbackDev;
 }
}

var invokeGuardedCallback$1 = invokeGuardedCallback;

var ReactErrorUtils = {
 // Used by Fiber to simulate a try-catch.
 _caughtError: null,
 _hasCaughtError: false,

 // Used by event system to capture/rethrow the first error.
 _rethrowError: null,
 _hasRethrowError: false,

 /**
  * Call a function while guarding against errors that happens within it.
  * Returns an error if it throws, otherwise null.
  *
  * In production, this is implemented using a try-catch. The reason we don't
  * use a try-catch directly is so that we can swap out a different
  * implementation in DEV mode.
  *
  * @param {String} name of the guard to use for logging or debugging
  * @param {Function} func The function to invoke
  * @param {*} context The context to use when calling the function
  * @param {...*} args Arguments for function
  */
 invokeGuardedCallback: function (name, func, context, a, b, c, d, e, f) {
   invokeGuardedCallback$1.apply(ReactErrorUtils, arguments);
 },

 /**
  * Same as invokeGuardedCallback, but instead of returning an error, it stores
  * it in a global so it can be rethrown by `rethrowCaughtError` later.
  * TODO: See if _caughtError and _rethrowError can be unified.
  *
  * @param {String} name of the guard to use for logging or debugging
  * @param {Function} func The function to invoke
  * @param {*} context The context to use when calling the function
  * @param {...*} args Arguments for function
  */
 invokeGuardedCallbackAndCatchFirstError: function (name, func, context, a, b, c, d, e, f) {
   ReactErrorUtils.invokeGuardedCallback.apply(this, arguments);
   if (ReactErrorUtils.hasCaughtError()) {
     var error = ReactErrorUtils.clearCaughtError();
     if (!ReactErrorUtils._hasRethrowError) {
       ReactErrorUtils._hasRethrowError = true;
       ReactErrorUtils._rethrowError = error;
     }
   }
 },

 /**
  * During execution of guarded functions we will capture the first error which
  * we will rethrow to be handled by the top level error handler.
  */
 rethrowCaughtError: function () {
   return rethrowCaughtError.apply(ReactErrorUtils, arguments);
 },

 hasCaughtError: function () {
   return ReactErrorUtils._hasCaughtError;
 },

 clearCaughtError: function () {
   if (ReactErrorUtils._hasCaughtError) {
     var error = ReactErrorUtils._caughtError;
     ReactErrorUtils._caughtError = null;
     ReactErrorUtils._hasCaughtError = false;
     return error;
   } else {
     invariant_1(false, 'clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.');
   }
 }
};

var rethrowCaughtError = function () {
 if (ReactErrorUtils._hasRethrowError) {
   var error = ReactErrorUtils._rethrowError;
   ReactErrorUtils._rethrowError = null;
   ReactErrorUtils._hasRethrowError = false;
   throw error;
 }
};

/**
* Injectable ordering of event plugins.
*/
var eventPluginOrder = null;

/**
* Injectable mapping from names to event plugin modules.
*/
var namesToPlugins = {};

/**
* Recomputes the plugin list using the injected plugins and plugin ordering.
*
* @private
*/
function recomputePluginOrdering() {
 if (!eventPluginOrder) {
   // Wait until an `eventPluginOrder` is injected.
   return;
 }
 for (var pluginName in namesToPlugins) {
   var pluginModule = namesToPlugins[pluginName];
   var pluginIndex = eventPluginOrder.indexOf(pluginName);
   !(pluginIndex > -1) ? invariant_1(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.', pluginName) : void 0;
   if (plugins[pluginIndex]) {
     continue;
   }
   !pluginModule.extractEvents ? invariant_1(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.', pluginName) : void 0;
   plugins[pluginIndex] = pluginModule;
   var publishedEvents = pluginModule.eventTypes;
   for (var eventName in publishedEvents) {
     !publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName) ? invariant_1(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : void 0;
   }
 }
}

/**
* Publishes an event so that it can be dispatched by the supplied plugin.
*
* @param {object} dispatchConfig Dispatch configuration for the event.
* @param {object} PluginModule Plugin publishing the event.
* @return {boolean} True if the event was successfully published.
* @private
*/
function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
 !!eventNameDispatchConfigs.hasOwnProperty(eventName) ? invariant_1(false, 'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.', eventName) : void 0;
 eventNameDispatchConfigs[eventName] = dispatchConfig;

 var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
 if (phasedRegistrationNames) {
   for (var phaseName in phasedRegistrationNames) {
     if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
       var phasedRegistrationName = phasedRegistrationNames[phaseName];
       publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
     }
   }
   return true;
 } else if (dispatchConfig.registrationName) {
   publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
   return true;
 }
 return false;
}

/**
* Publishes a registration name that is used to identify dispatched events.
*
* @param {string} registrationName Registration name to add.
* @param {object} PluginModule Plugin publishing the event.
* @private
*/
function publishRegistrationName(registrationName, pluginModule, eventName) {
 !!registrationNameModules[registrationName] ? invariant_1(false, 'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.', registrationName) : void 0;
 registrationNameModules[registrationName] = pluginModule;
 registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;

 {
   var lowerCasedName = registrationName.toLowerCase();
   possibleRegistrationNames[lowerCasedName] = registrationName;

   if (registrationName === 'onDoubleClick') {
     possibleRegistrationNames.ondblclick = registrationName;
   }
 }
}

/**
* Registers plugins so that they can extract and dispatch events.
*
* @see {EventPluginHub}
*/

/**
* Ordered list of injected plugins.
*/
var plugins = [];

/**
* Mapping from event name to dispatch config
*/
var eventNameDispatchConfigs = {};

/**
* Mapping from registration name to plugin module
*/
var registrationNameModules = {};

/**
* Mapping from registration name to event name
*/
var registrationNameDependencies = {};

/**
* Mapping from lowercase registration names to the properly cased version,
* used to warn in the case of missing event handlers. Available
* only in true.
* @type {Object}
*/
var possibleRegistrationNames = {};
// Trust the developer to only use possibleRegistrationNames in true

/**
* Injects an ordering of plugins (by plugin name). This allows the ordering
* to be decoupled from injection of the actual plugins so that ordering is
* always deterministic regardless of packaging, on-the-fly injection, etc.
*
* @param {array} InjectedEventPluginOrder
* @internal
* @see {EventPluginHub.injection.injectEventPluginOrder}
*/
function injectEventPluginOrder(injectedEventPluginOrder) {
 !!eventPluginOrder ? invariant_1(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.') : void 0;
 // Clone the ordering so it cannot be dynamically mutated.
 eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
 recomputePluginOrdering();
}

/**
* Injects plugins to be used by `EventPluginHub`. The plugin names must be
* in the ordering injected by `injectEventPluginOrder`.
*
* Plugins can be injected as part of page initialization or on-the-fly.
*
* @param {object} injectedNamesToPlugins Map from names to plugin modules.
* @internal
* @see {EventPluginHub.injection.injectEventPluginsByName}
*/
function injectEventPluginsByName(injectedNamesToPlugins) {
 var isOrderingDirty = false;
 for (var pluginName in injectedNamesToPlugins) {
   if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
     continue;
   }
   var pluginModule = injectedNamesToPlugins[pluginName];
   if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
     !!namesToPlugins[pluginName] ? invariant_1(false, 'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.', pluginName) : void 0;
     namesToPlugins[pluginName] = pluginModule;
     isOrderingDirty = true;
   }
 }
 if (isOrderingDirty) {
   recomputePluginOrdering();
 }
}

var EventPluginRegistry = Object.freeze({
 plugins: plugins,
 eventNameDispatchConfigs: eventNameDispatchConfigs,
 registrationNameModules: registrationNameModules,
 registrationNameDependencies: registrationNameDependencies,
 possibleRegistrationNames: possibleRegistrationNames,
 injectEventPluginOrder: injectEventPluginOrder,
 injectEventPluginsByName: injectEventPluginsByName
});

/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
* 
*/

function makeEmptyFunction(arg) {
 return function () {
   return arg;
 };
}

/**
* This function accepts and discards inputs; it has no side effects. This is
* primarily useful idiomatically for overridable function endpoints which
* always need to be callable, since JS lacks a null-call idiom ala Cocoa.
*/
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
 return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
 return arg;
};

var emptyFunction_1 = emptyFunction;

/**
* Copyright (c) 2014-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
*/





/**
* Similar to invariant but only logs a warning if the condition is not met.
* This can be used to log issues in development environments in critical
* paths. Removing the logging code for production environments will keep the
* same logic and follow the same code paths.
*/

var warning = emptyFunction_1;

{
 var printWarning = function printWarning(format) {
   for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
     args[_key - 1] = arguments[_key];
   }

   var argIndex = 0;
   var message = 'Warning: ' + format.replace(/%s/g, function () {
     return args[argIndex++];
   });
   if (typeof console !== 'undefined') {
     console.error(message);
   }
   try {
     // --- Welcome to debugging React ---
     // This error was thrown as a convenience so that you can use this stack
     // to find the callsite that caused this warning to fire.
     throw new Error(message);
   } catch (x) {}
 };

 warning = function warning(condition, format) {
   if (format === undefined) {
     throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
   }

   if (format.indexOf('Failed Composite propType: ') === 0) {
     return; // Ignore CompositeComponent proptype check.
   }

   if (!condition) {
     for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
       args[_key2 - 2] = arguments[_key2];
     }

     printWarning.apply(undefined, [format].concat(args));
   }
 };
}

var warning_1 = warning;

var getFiberCurrentPropsFromNode = null;
var getInstanceFromNode = null;
var getNodeFromInstance = null;

var injection$1 = {
 injectComponentTree: function (Injected) {
   getFiberCurrentPropsFromNode = Injected.getFiberCurrentPropsFromNode;
   getInstanceFromNode = Injected.getInstanceFromNode;
   getNodeFromInstance = Injected.getNodeFromInstance;

   {
     !(getNodeFromInstance && getInstanceFromNode) ? warning_1(false, 'EventPluginUtils.injection.injectComponentTree(...): Injected ' + 'module is missing getNodeFromInstance or getInstanceFromNode.') : void 0;
   }
 }
};

var validateEventDispatches = void 0;
{
 validateEventDispatches = function (event) {
   var dispatchListeners = event._dispatchListeners;
   var dispatchInstances = event._dispatchInstances;

   var listenersIsArr = Array.isArray(dispatchListeners);
   var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;

   var instancesIsArr = Array.isArray(dispatchInstances);
   var instancesLen = instancesIsArr ? dispatchInstances.length : dispatchInstances ? 1 : 0;

   !(instancesIsArr === listenersIsArr && instancesLen === listenersLen) ? warning_1(false, 'EventPluginUtils: Invalid `event`.') : void 0;
 };
}

/**
* Dispatch the event to the listener.
* @param {SyntheticEvent} event SyntheticEvent to handle
* @param {boolean} simulated If the event is simulated (changes exn behavior)
* @param {function} listener Application-level callback
* @param {*} inst Internal component instance
*/
function executeDispatch(event, simulated, listener, inst) {
 var type = event.type || 'unknown-event';
 event.currentTarget = getNodeFromInstance(inst);
 ReactErrorUtils.invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
 event.currentTarget = null;
}

/**
* Standard/simple iteration through an event's collected dispatches.
*/
function executeDispatchesInOrder(event, simulated) {
 var dispatchListeners = event._dispatchListeners;
 var dispatchInstances = event._dispatchInstances;
 {
   validateEventDispatches(event);
 }
 if (Array.isArray(dispatchListeners)) {
   for (var i = 0; i < dispatchListeners.length; i++) {
     if (event.isPropagationStopped()) {
       break;
     }
     // Listeners and Instances are two parallel arrays that are always in sync.
     executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);
   }
 } else if (dispatchListeners) {
   executeDispatch(event, simulated, dispatchListeners, dispatchInstances);
 }
 event._dispatchListeners = null;
 event._dispatchInstances = null;
}

/**
* @see executeDispatchesInOrderStopAtTrueImpl
*/


/**
* Execution of a "direct" dispatch - there must be at most one dispatch
* accumulated on the event or it is considered an error. It doesn't really make
* sense for an event with multiple dispatches (bubbled) to keep track of the
* return values at each dispatch execution, but it does tend to make sense when
* dealing with "direct" dispatches.
*
* @return {*} The return value of executing the single dispatch.
*/


/**
* @param {SyntheticEvent} event
* @return {boolean} True iff number of dispatches accumulated is greater than 0.
*/

/**
* Accumulates items that must not be null or undefined into the first one. This
* is used to conserve memory by avoiding array allocations, and thus sacrifices
* API cleanness. Since `current` can be null before being passed in and not
* null after this function, make sure to assign it back to `current`:
*
* `a = accumulateInto(a, b);`
*
* This API should be sparingly used. Try `accumulate` for something cleaner.
*
* @return {*|array<*>} An accumulation of items.
*/

function accumulateInto(current, next) {
 !(next != null) ? invariant_1(false, 'accumulateInto(...): Accumulated items must not be null or undefined.') : void 0;

 if (current == null) {
   return next;
 }

 // Both are not empty. Warning: Never call x.concat(y) when you are not
 // certain that x is an Array (x could be a string with concat method).
 if (Array.isArray(current)) {
   if (Array.isArray(next)) {
     current.push.apply(current, next);
     return current;
   }
   current.push(next);
   return current;
 }

 if (Array.isArray(next)) {
   // A bit too dangerous to mutate `next`.
   return [current].concat(next);
 }

 return [current, next];
}

/**
* @param {array} arr an "accumulation" of items which is either an Array or
* a single item. Useful when paired with the `accumulate` module. This is a
* simple utility that allows us to reason about a collection of items, but
* handling the case when there is exactly one item (and we do not need to
* allocate an array).
* @param {function} cb Callback invoked with each element or a collection.
* @param {?} [scope] Scope used as `this` in a callback.
*/
function forEachAccumulated(arr, cb, scope) {
 if (Array.isArray(arr)) {
   arr.forEach(cb, scope);
 } else if (arr) {
   cb.call(scope, arr);
 }
}

/**
* Internal queue of events that have accumulated their dispatches and are
* waiting to have their dispatches executed.
*/
var eventQueue = null;

/**
* Dispatches an event and releases it back into the pool, unless persistent.
*
* @param {?object} event Synthetic event to be dispatched.
* @param {boolean} simulated If the event is simulated (changes exn behavior)
* @private
*/
var executeDispatchesAndRelease = function (event, simulated) {
 if (event) {
   executeDispatchesInOrder(event, simulated);

   if (!event.isPersistent()) {
     event.constructor.release(event);
   }
 }
};
var executeDispatchesAndReleaseSimulated = function (e) {
 return executeDispatchesAndRelease(e, true);
};
var executeDispatchesAndReleaseTopLevel = function (e) {
 return executeDispatchesAndRelease(e, false);
};

function isInteractive(tag) {
 return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
}

function shouldPreventMouseEvent(name, type, props) {
 switch (name) {
   case 'onClick':
   case 'onClickCapture':
   case 'onDoubleClick':
   case 'onDoubleClickCapture':
   case 'onMouseDown':
   case 'onMouseDownCapture':
   case 'onMouseMove':
   case 'onMouseMoveCapture':
   case 'onMouseUp':
   case 'onMouseUpCapture':
     return !!(props.disabled && isInteractive(type));
   default:
     return false;
 }
}

/**
* This is a unified interface for event plugins to be installed and configured.
*
* Event plugins can implement the following properties:
*
*   `extractEvents` {function(string, DOMEventTarget, string, object): *}
*     Required. When a top-level event is fired, this method is expected to
*     extract synthetic events that will in turn be queued and dispatched.
*
*   `eventTypes` {object}
*     Optional, plugins that fire events must publish a mapping of registration
*     names that are used to register listeners. Values of this mapping must
*     be objects that contain `registrationName` or `phasedRegistrationNames`.
*
*   `executeDispatch` {function(object, function, string)}
*     Optional, allows plugins to override how an event gets dispatched. By
*     default, the listener is simply invoked.
*
* Each plugin that is injected into `EventsPluginHub` is immediately operable.
*
* @public
*/

/**
* Methods for injecting dependencies.
*/
var injection = {
 /**
  * @param {array} InjectedEventPluginOrder
  * @public
  */
 injectEventPluginOrder: injectEventPluginOrder,

 /**
  * @param {object} injectedNamesToPlugins Map from names to plugin modules.
  */
 injectEventPluginsByName: injectEventPluginsByName
};

/**
* @param {object} inst The instance, which is the source of events.
* @param {string} registrationName Name of listener (e.g. `onClick`).
* @return {?function} The stored callback.
*/
function getListener(inst, registrationName) {
 var listener = void 0;

 // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
 // live here; needs to be moved to a better place soon
 var stateNode = inst.stateNode;
 if (!stateNode) {
   // Work in progress (ex: onload events in incremental mode).
   return null;
 }
 var props = getFiberCurrentPropsFromNode(stateNode);
 if (!props) {
   // Work in progress.
   return null;
 }
 listener = props[registrationName];
 if (shouldPreventMouseEvent(registrationName, inst.type, props)) {
   return null;
 }
 !(!listener || typeof listener === 'function') ? invariant_1(false, 'Expected `%s` listener to be a function, instead got a value of `%s` type.', registrationName, typeof listener) : void 0;
 return listener;
}

/**
* Allows registered plugins an opportunity to extract events from top-level
* native browser events.
*
* @return {*} An accumulation of synthetic events.
* @internal
*/
function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
 var events = null;
 for (var i = 0; i < plugins.length; i++) {
   // Not every plugin in the ordering may be loaded at runtime.
   var possiblePlugin = plugins[i];
   if (possiblePlugin) {
     var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
     if (extractedEvents) {
       events = accumulateInto(events, extractedEvents);
     }
   }
 }
 return events;
}

function runEventsInBatch(events, simulated) {
 if (events !== null) {
   eventQueue = accumulateInto(eventQueue, events);
 }

 // Set `eventQueue` to null before processing it so that we can tell if more
 // events get enqueued while processing.
 var processingEventQueue = eventQueue;
 eventQueue = null;

 if (!processingEventQueue) {
   return;
 }

 if (simulated) {
   forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseSimulated);
 } else {
   forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
 }
 !!eventQueue ? invariant_1(false, 'processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.') : void 0;
 // This would be a good time to rethrow if any of the event handlers threw.
 ReactErrorUtils.rethrowCaughtError();
}

function runExtractedEventsInBatch(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
 var events = extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
 runEventsInBatch(events, false);
}

var EventPluginHub = Object.freeze({
 injection: injection,
 getListener: getListener,
 runEventsInBatch: runEventsInBatch,
 runExtractedEventsInBatch: runExtractedEventsInBatch
});

var IndeterminateComponent = 0; // Before we know whether it is functional or class
var FunctionalComponent = 1;
var ClassComponent = 2;
var HostRoot = 3; // Root of a host tree. Could be nested inside another node.
var HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
var HostComponent = 5;
var HostText = 6;



var Fragment = 10;
var Mode = 11;
var ContextConsumer = 12;
var ContextProvider = 13;
var ForwardRef = 14;
var Profiler = 15;
var TimeoutComponent = 16;

var randomKey = Math.random().toString(36).slice(2);
var internalInstanceKey = '__reactInternalInstance$' + randomKey;
var internalEventHandlersKey = '__reactEventHandlers$' + randomKey;

function precacheFiberNode(hostInst, node) {
 node[internalInstanceKey] = hostInst;
}

/**
* Given a DOM node, return the closest ReactDOMComponent or
* ReactDOMTextComponent instance ancestor.
*/
function getClosestInstanceFromNode(node) {
 if (node[internalInstanceKey]) {
   return node[internalInstanceKey];
 }

 while (!node[internalInstanceKey]) {
   if (node.parentNode) {
     node = node.parentNode;
   } else {
     // Top of the tree. This node must not be part of a React tree (or is
     // unmounted, potentially).
     return null;
   }
 }

 var inst = node[internalInstanceKey];
 if (inst.tag === HostComponent || inst.tag === HostText) {
   // In Fiber, this will always be the deepest root.
   return inst;
 }

 return null;
}

/**
* Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
* instance, or null if the node was not rendered by this React.
*/
function getInstanceFromNode$1(node) {
 var inst = node[internalInstanceKey];
 if (inst) {
   if (inst.tag === HostComponent || inst.tag === HostText) {
     return inst;
   } else {
     return null;
   }
 }
 return null;
}

/**
* Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
* DOM node.
*/
function getNodeFromInstance$1(inst) {
 if (inst.tag === HostComponent || inst.tag === HostText) {
   // In Fiber this, is just the state node right now. We assume it will be
   // a host component or host text.
   return inst.stateNode;
 }

 // Without this first invariant, passing a non-DOM-component triggers the next
 // invariant for a missing parent, which is super confusing.
 invariant_1(false, 'getNodeFromInstance: Invalid argument.');
}

function getFiberCurrentPropsFromNode$1(node) {
 return node[internalEventHandlersKey] || null;
}

function updateFiberProps(node, props) {
 node[internalEventHandlersKey] = props;
}

var ReactDOMComponentTree = Object.freeze({
 precacheFiberNode: precacheFiberNode,
 getClosestInstanceFromNode: getClosestInstanceFromNode,
 getInstanceFromNode: getInstanceFromNode$1,
 getNodeFromInstance: getNodeFromInstance$1,
 getFiberCurrentPropsFromNode: getFiberCurrentPropsFromNode$1,
 updateFiberProps: updateFiberProps
});

function getParent(inst) {
 do {
   inst = inst.return;
   // TODO: If this is a HostRoot we might want to bail out.
   // That is depending on if we want nested subtrees (layers) to bubble
   // events to their parent. We could also go through parentNode on the
   // host node but that wouldn't work for React Native and doesn't let us
   // do the portal feature.
 } while (inst && inst.tag !== HostComponent);
 if (inst) {
   return inst;
 }
 return null;
}

/**
* Return the lowest common ancestor of A and B, or null if they are in
* different trees.
*/
function getLowestCommonAncestor(instA, instB) {
 var depthA = 0;
 for (var tempA = instA; tempA; tempA = getParent(tempA)) {
   depthA++;
 }
 var depthB = 0;
 for (var tempB = instB; tempB; tempB = getParent(tempB)) {
   depthB++;
 }

 // If A is deeper, crawl up.
 while (depthA - depthB > 0) {
   instA = getParent(instA);
   depthA--;
 }

 // If B is deeper, crawl up.
 while (depthB - depthA > 0) {
   instB = getParent(instB);
   depthB--;
 }

 // Walk in lockstep until we find a match.
 var depth = depthA;
 while (depth--) {
   if (instA === instB || instA === instB.alternate) {
     return instA;
   }
   instA = getParent(instA);
   instB = getParent(instB);
 }
 return null;
}

/**
* Return if A is an ancestor of B.
*/


/**
* Return the parent instance of the passed-in instance.
*/
function getParentInstance(inst) {
 return getParent(inst);
}

/**
* Simulates the traversal of a two-phase, capture/bubble event dispatch.
*/
function traverseTwoPhase(inst, fn, arg) {
 var path = [];
 while (inst) {
   path.push(inst);
   inst = getParent(inst);
 }
 var i = void 0;
 for (i = path.length; i-- > 0;) {
   fn(path[i], 'captured', arg);
 }
 for (i = 0; i < path.length; i++) {
   fn(path[i], 'bubbled', arg);
 }
}

/**
* Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
* should would receive a `mouseEnter` or `mouseLeave` event.
*
* Does not invoke the callback on the nearest common ancestor because nothing
* "entered" or "left" that element.
*/
function traverseEnterLeave(from, to, fn, argFrom, argTo) {
 var common = from && to ? getLowestCommonAncestor(from, to) : null;
 var pathFrom = [];
 while (true) {
   if (!from) {
     break;
   }
   if (from === common) {
     break;
   }
   var alternate = from.alternate;
   if (alternate !== null && alternate === common) {
     break;
   }
   pathFrom.push(from);
   from = getParent(from);
 }
 var pathTo = [];
 while (true) {
   if (!to) {
     break;
   }
   if (to === common) {
     break;
   }
   var _alternate = to.alternate;
   if (_alternate !== null && _alternate === common) {
     break;
   }
   pathTo.push(to);
   to = getParent(to);
 }
 for (var i = 0; i < pathFrom.length; i++) {
   fn(pathFrom[i], 'bubbled', argFrom);
 }
 for (var _i = pathTo.length; _i-- > 0;) {
   fn(pathTo[_i], 'captured', argTo);
 }
}

/**
* Some event types have a notion of different registration names for different
* "phases" of propagation. This finds listeners by a given phase.
*/
function listenerAtPhase(inst, event, propagationPhase) {
 var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
 return getListener(inst, registrationName);
}

/**
* A small set of propagation patterns, each of which will accept a small amount
* of information, and generate a set of "dispatch ready event objects" - which
* are sets of events that have already been annotated with a set of dispatched
* listener functions/ids. The API is designed this way to discourage these
* propagation strategies from actually executing the dispatches, since we
* always want to collect the entire set of dispatches before executing even a
* single one.
*/

/**
* Tags a `SyntheticEvent` with dispatched listeners. Creating this function
* here, allows us to not have to bind or create functions for each event.
* Mutating the event's members allows us to not have to create a wrapping
* "dispatch" object that pairs the event with the listener.
*/
function accumulateDirectionalDispatches(inst, phase, event) {
 {
   !inst ? warning_1(false, 'Dispatching inst must not be null') : void 0;
 }
 var listener = listenerAtPhase(inst, event, phase);
 if (listener) {
   event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
   event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
 }
}

/**
* Collect dispatches (must be entirely collected before dispatching - see unit
* tests). Lazily allocate the array to conserve memory.  We must loop through
* each event and perform the traversal for each one. We cannot perform a
* single traversal for the entire collection of events because each event may
* have a different target.
*/
function accumulateTwoPhaseDispatchesSingle(event) {
 if (event && event.dispatchConfig.phasedRegistrationNames) {
   traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
 }
}

/**
* Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
*/
function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
 if (event && event.dispatchConfig.phasedRegistrationNames) {
   var targetInst = event._targetInst;
   var parentInst = targetInst ? getParentInstance(targetInst) : null;
   traverseTwoPhase(parentInst, accumulateDirectionalDispatches, event);
 }
}

/**
* Accumulates without regard to direction, does not look for phased
* registration names. Same as `accumulateDirectDispatchesSingle` but without
* requiring that the `dispatchMarker` be the same as the dispatched ID.
*/
function accumulateDispatches(inst, ignoredDirection, event) {
 if (inst && event && event.dispatchConfig.registrationName) {
   var registrationName = event.dispatchConfig.registrationName;
   var listener = getListener(inst, registrationName);
   if (listener) {
     event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
     event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
   }
 }
}

/**
* Accumulates dispatches on an `SyntheticEvent`, but only for the
* `dispatchMarker`.
* @param {SyntheticEvent} event
*/
function accumulateDirectDispatchesSingle(event) {
 if (event && event.dispatchConfig.registrationName) {
   accumulateDispatches(event._targetInst, null, event);
 }
}

function accumulateTwoPhaseDispatches(events) {
 forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}

function accumulateTwoPhaseDispatchesSkipTarget(events) {
 forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
}

function accumulateEnterLeaveDispatches(leave, enter, from, to) {
 traverseEnterLeave(from, to, accumulateDispatches, leave, enter);
}

function accumulateDirectDispatches(events) {
 forEachAccumulated(events, accumulateDirectDispatchesSingle);
}

var EventPropagators = Object.freeze({
 accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
 accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
 accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches,
 accumulateDirectDispatches: accumulateDirectDispatches
});

/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
*/



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
* Simple, lightweight module assisting with the detection and context of
* Worker. Helps avoid circular dependencies and allows code to reason about
* whether or not they are in a Worker, even if they never include the main
* `ReactWorker` dependency.
*/
var ExecutionEnvironment = {

 canUseDOM: canUseDOM,

 canUseWorkers: typeof Worker !== 'undefined',

 canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

 canUseViewport: canUseDOM && !!window.screen,

 isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

var ExecutionEnvironment_1 = ExecutionEnvironment;

// Do not uses the below two methods directly!
// Instead use constants exported from DOMTopLevelEventTypes in ReactDOM.
// (It is the only module that is allowed to access these methods.)

function unsafeCastStringToDOMTopLevelType(topLevelType) {
 return topLevelType;
}

function unsafeCastDOMTopLevelTypeToString(topLevelType) {
 return topLevelType;
}

/**
* Generate a mapping of standard vendor prefixes using the defined style property and event name.
*
* @param {string} styleProp
* @param {string} eventName
* @returns {object}
*/
function makePrefixMap(styleProp, eventName) {
 var prefixes = {};

 prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
 prefixes['Webkit' + styleProp] = 'webkit' + eventName;
 prefixes['Moz' + styleProp] = 'moz' + eventName;
 prefixes['ms' + styleProp] = 'MS' + eventName;
 prefixes['O' + styleProp] = 'o' + eventName.toLowerCase();

 return prefixes;
}

/**
* A list of event names to a configurable list of vendor prefixes.
*/
var vendorPrefixes = {
 animationend: makePrefixMap('Animation', 'AnimationEnd'),
 animationiteration: makePrefixMap('Animation', 'AnimationIteration'),
 animationstart: makePrefixMap('Animation', 'AnimationStart'),
 transitionend: makePrefixMap('Transition', 'TransitionEnd')
};

/**
* Event names that have already been detected and prefixed (if applicable).
*/
var prefixedEventNames = {};

/**
* Element to check for prefixes on.
*/
var style = {};

/**
* Bootstrap if a DOM exists.
*/
if (ExecutionEnvironment_1.canUseDOM) {
 style = document.createElement('div').style;

 // On some platforms, in particular some releases of Android 4.x,
 // the un-prefixed "animation" and "transition" properties are defined on the
 // style object but the events that fire will still be prefixed, so we need
 // to check if the un-prefixed events are usable, and if not remove them from the map.
 if (!('AnimationEvent' in window)) {
   delete vendorPrefixes.animationend.animation;
   delete vendorPrefixes.animationiteration.animation;
   delete vendorPrefixes.animationstart.animation;
 }

 // Same as above
 if (!('TransitionEvent' in window)) {
   delete vendorPrefixes.transitionend.transition;
 }
}

/**
* Attempts to determine the correct vendor prefixed event name.
*
* @param {string} eventName
* @returns {string}
*/
function getVendorPrefixedEventName(eventName) {
 if (prefixedEventNames[eventName]) {
   return prefixedEventNames[eventName];
 } else if (!vendorPrefixes[eventName]) {
   return eventName;
 }

 var prefixMap = vendorPrefixes[eventName];

 for (var styleProp in prefixMap) {
   if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) {
     return prefixedEventNames[eventName] = prefixMap[styleProp];
   }
 }

 return eventName;
}

/**
* To identify top level events in ReactDOM, we use constants defined by this
* module. This is the only module that uses the unsafe* methods to express
* that the constants actually correspond to the browser event names. This lets
* us save some bundle size by avoiding a top level type -> event name map.
* The rest of ReactDOM code should import top level types from this file.
*/
var TOP_ABORT = unsafeCastStringToDOMTopLevelType('abort');
var TOP_ANIMATION_END = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationend'));
var TOP_ANIMATION_ITERATION = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationiteration'));
var TOP_ANIMATION_START = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationstart'));
var TOP_BLUR = unsafeCastStringToDOMTopLevelType('blur');
var TOP_CAN_PLAY = unsafeCastStringToDOMTopLevelType('canplay');
var TOP_CAN_PLAY_THROUGH = unsafeCastStringToDOMTopLevelType('canplaythrough');
var TOP_CANCEL = unsafeCastStringToDOMTopLevelType('cancel');
var TOP_CHANGE = unsafeCastStringToDOMTopLevelType('change');
var TOP_CLICK = unsafeCastStringToDOMTopLevelType('click');
var TOP_CLOSE = unsafeCastStringToDOMTopLevelType('close');
var TOP_COMPOSITION_END = unsafeCastStringToDOMTopLevelType('compositionend');
var TOP_COMPOSITION_START = unsafeCastStringToDOMTopLevelType('compositionstart');
var TOP_COMPOSITION_UPDATE = unsafeCastStringToDOMTopLevelType('compositionupdate');
var TOP_CONTEXT_MENU = unsafeCastStringToDOMTopLevelType('contextmenu');
var TOP_COPY = unsafeCastStringToDOMTopLevelType('copy');
var TOP_CUT = unsafeCastStringToDOMTopLevelType('cut');
var TOP_DOUBLE_CLICK = unsafeCastStringToDOMTopLevelType('dblclick');
var TOP_DRAG = unsafeCastStringToDOMTopLevelType('drag');
var TOP_DRAG_END = unsafeCastStringToDOMTopLevelType('dragend');
var TOP_DRAG_ENTER = unsafeCastStringToDOMTopLevelType('dragenter');
var TOP_DRAG_EXIT = unsafeCastStringToDOMTopLevelType('dragexit');
var TOP_DRAG_LEAVE = unsafeCastStringToDOMTopLevelType('dragleave');
var TOP_DRAG_OVER = unsafeCastStringToDOMTopLevelType('dragover');
var TOP_DRAG_START = unsafeCastStringToDOMTopLevelType('dragstart');
var TOP_DROP = unsafeCastStringToDOMTopLevelType('drop');
var TOP_DURATION_CHANGE = unsafeCastStringToDOMTopLevelType('durationchange');
var TOP_EMPTIED = unsafeCastStringToDOMTopLevelType('emptied');
var TOP_ENCRYPTED = unsafeCastStringToDOMTopLevelType('encrypted');
var TOP_ENDED = unsafeCastStringToDOMTopLevelType('ended');
var TOP_ERROR = unsafeCastStringToDOMTopLevelType('error');
var TOP_FOCUS = unsafeCastStringToDOMTopLevelType('focus');
var TOP_GOT_POINTER_CAPTURE = unsafeCastStringToDOMTopLevelType('gotpointercapture');
var TOP_INPUT = unsafeCastStringToDOMTopLevelType('input');
var TOP_INVALID = unsafeCastStringToDOMTopLevelType('invalid');
var TOP_KEY_DOWN = unsafeCastStringToDOMTopLevelType('keydown');
var TOP_KEY_PRESS = unsafeCastStringToDOMTopLevelType('keypress');
var TOP_KEY_UP = unsafeCastStringToDOMTopLevelType('keyup');
var TOP_LOAD = unsafeCastStringToDOMTopLevelType('load');
var TOP_LOAD_START = unsafeCastStringToDOMTopLevelType('loadstart');
var TOP_LOADED_DATA = unsafeCastStringToDOMTopLevelType('loadeddata');
var TOP_LOADED_METADATA = unsafeCastStringToDOMTopLevelType('loadedmetadata');
var TOP_LOST_POINTER_CAPTURE = unsafeCastStringToDOMTopLevelType('lostpointercapture');
var TOP_MOUSE_DOWN = unsafeCastStringToDOMTopLevelType('mousedown');
var TOP_MOUSE_MOVE = unsafeCastStringToDOMTopLevelType('mousemove');
var TOP_MOUSE_OUT = unsafeCastStringToDOMTopLevelType('mouseout');
var TOP_MOUSE_OVER = unsafeCastStringToDOMTopLevelType('mouseover');
var TOP_MOUSE_UP = unsafeCastStringToDOMTopLevelType('mouseup');
var TOP_PASTE = unsafeCastStringToDOMTopLevelType('paste');
var TOP_PAUSE = unsafeCastStringToDOMTopLevelType('pause');
var TOP_PLAY = unsafeCastStringToDOMTopLevelType('play');
var TOP_PLAYING = unsafeCastStringToDOMTopLevelType('playing');
var TOP_POINTER_CANCEL = unsafeCastStringToDOMTopLevelType('pointercancel');
var TOP_POINTER_DOWN = unsafeCastStringToDOMTopLevelType('pointerdown');


var TOP_POINTER_MOVE = unsafeCastStringToDOMTopLevelType('pointermove');
var TOP_POINTER_OUT = unsafeCastStringToDOMTopLevelType('pointerout');
var TOP_POINTER_OVER = unsafeCastStringToDOMTopLevelType('pointerover');
var TOP_POINTER_UP = unsafeCastStringToDOMTopLevelType('pointerup');
var TOP_PROGRESS = unsafeCastStringToDOMTopLevelType('progress');
var TOP_RATE_CHANGE = unsafeCastStringToDOMTopLevelType('ratechange');
var TOP_RESET = unsafeCastStringToDOMTopLevelType('reset');
var TOP_SCROLL = unsafeCastStringToDOMTopLevelType('scroll');
var TOP_SEEKED = unsafeCastStringToDOMTopLevelType('seeked');
var TOP_SEEKING = unsafeCastStringToDOMTopLevelType('seeking');
var TOP_SELECTION_CHANGE = unsafeCastStringToDOMTopLevelType('selectionchange');
var TOP_STALLED = unsafeCastStringToDOMTopLevelType('stalled');
var TOP_SUBMIT = unsafeCastStringToDOMTopLevelType('submit');
var TOP_SUSPEND = unsafeCastStringToDOMTopLevelType('suspend');
var TOP_TEXT_INPUT = unsafeCastStringToDOMTopLevelType('textInput');
var TOP_TIME_UPDATE = unsafeCastStringToDOMTopLevelType('timeupdate');
var TOP_TOGGLE = unsafeCastStringToDOMTopLevelType('toggle');
var TOP_TOUCH_CANCEL = unsafeCastStringToDOMTopLevelType('touchcancel');
var TOP_TOUCH_END = unsafeCastStringToDOMTopLevelType('touchend');
var TOP_TOUCH_MOVE = unsafeCastStringToDOMTopLevelType('touchmove');
var TOP_TOUCH_START = unsafeCastStringToDOMTopLevelType('touchstart');
var TOP_TRANSITION_END = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('transitionend'));
var TOP_VOLUME_CHANGE = unsafeCastStringToDOMTopLevelType('volumechange');
var TOP_WAITING = unsafeCastStringToDOMTopLevelType('waiting');
var TOP_WHEEL = unsafeCastStringToDOMTopLevelType('wheel');

// List of events that need to be individually attached to media elements.
// Note that events in this list will *not* be listened to at the top level
// unless they're explicitly whitelisted in `ReactBrowserEventEmitter.listenTo`.
var mediaEventTypes = [TOP_ABORT, TOP_CAN_PLAY, TOP_CAN_PLAY_THROUGH, TOP_DURATION_CHANGE, TOP_EMPTIED, TOP_ENCRYPTED, TOP_ENDED, TOP_ERROR, TOP_LOADED_DATA, TOP_LOADED_METADATA, TOP_LOAD_START, TOP_PAUSE, TOP_PLAY, TOP_PLAYING, TOP_PROGRESS, TOP_RATE_CHANGE, TOP_SEEKED, TOP_SEEKING, TOP_STALLED, TOP_SUSPEND, TOP_TIME_UPDATE, TOP_VOLUME_CHANGE, TOP_WAITING];

function getRawEventName(topLevelType) {
 return unsafeCastDOMTopLevelTypeToString(topLevelType);
}

var contentKey = null;

/**
* Gets the key used to access text content on a DOM node.
*
* @return {?string} Key used to access text content.
* @internal
*/
function getTextContentAccessor() {
 if (!contentKey && ExecutionEnvironment_1.canUseDOM) {
   // Prefer textContent to innerText because many browsers support both but
   // SVG <text> elements don't support innerText even when <div> does.
   contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
 }
 return contentKey;
}

/**
* This helper object stores information about text content of a target node,
* allowing comparison of content before and after a given event.
*
* Identify the node where selection currently begins, then observe
* both its text content and its current position in the DOM. Since the
* browser may natively replace the target node during composition, we can
* use its position to find its replacement.
*
*
*/
var compositionState = {
 _root: null,
 _startText: null,
 _fallbackText: null
};

function initialize(nativeEventTarget) {
 compositionState._root = nativeEventTarget;
 compositionState._startText = getText();
 return true;
}

function reset() {
 compositionState._root = null;
 compositionState._startText = null;
 compositionState._fallbackText = null;
}

function getData() {
 if (compositionState._fallbackText) {
   return compositionState._fallbackText;
 }

 var start = void 0;
 var startValue = compositionState._startText;
 var startLength = startValue.length;
 var end = void 0;
 var endValue = getText();
 var endLength = endValue.length;

 for (start = 0; start < startLength; start++) {
   if (startValue[start] !== endValue[start]) {
     break;
   }
 }

 var minEnd = startLength - start;
 for (end = 1; end <= minEnd; end++) {
   if (startValue[startLength - end] !== endValue[endLength - end]) {
     break;
   }
 }

 var sliceTail = end > 1 ? 1 - end : undefined;
 compositionState._fallbackText = endValue.slice(start, sliceTail);
 return compositionState._fallbackText;
}

function getText() {
 if ('value' in compositionState._root) {
   return compositionState._root.value;
 }
 return compositionState._root[getTextContentAccessor()];
}

var ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

var _assign = ReactInternals.assign;

/* eslint valid-typeof: 0 */

var didWarnForAddedNewProperty = false;
var EVENT_POOL_SIZE = 10;

var shouldBeReleasedProperties = ['dispatchConfig', '_targetInst', 'nativeEvent', 'isDefaultPrevented', 'isPropagationStopped', '_dispatchListeners', '_dispatchInstances'];

/**
* @interface Event
* @see http://www.w3.org/TR/DOM-Level-3-Events/
*/
var EventInterface = {
 type: null,
 target: null,
 // currentTarget is set when dispatching; no use in copying it here
 currentTarget: emptyFunction_1.thatReturnsNull,
 eventPhase: null,
 bubbles: null,
 cancelable: null,
 timeStamp: function (event) {
   return event.timeStamp || Date.now();
 },
 defaultPrevented: null,
 isTrusted: null
};

/**
* Synthetic events are dispatched by event plugins, typically in response to a
* top-level event delegation handler.
*
* These systems should generally use pooling to reduce the frequency of garbage
* collection. The system should check `isPersistent` to determine whether the
* event should be released into the pool after being dispatched. Users that
* need a persisted event should invoke `persist`.
*
* Synthetic events (and subclasses) implement the DOM Level 3 Events API by
* normalizing browser quirks. Subclasses do not necessarily have to implement a
* DOM interface; custom application-specific events can also subclass this.
*
* @param {object} dispatchConfig Configuration used to dispatch this event.
* @param {*} targetInst Marker identifying the event target.
* @param {object} nativeEvent Native browser event.
* @param {DOMEventTarget} nativeEventTarget Target node.
*/
function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
 {
   // these have a getter/setter for warnings
   delete this.nativeEvent;
   delete this.preventDefault;
   delete this.stopPropagation;
 }

 this.dispatchConfig = dispatchConfig;
 this._targetInst = targetInst;
 this.nativeEvent = nativeEvent;

 var Interface = this.constructor.Interface;
 for (var propName in Interface) {
   if (!Interface.hasOwnProperty(propName)) {
     continue;
   }
   {
     delete this[propName]; // this has a getter/setter for warnings
   }
   var normalize = Interface[propName];
   if (normalize) {
     this[propName] = normalize(nativeEvent);
   } else {
     if (propName === 'target') {
       this.target = nativeEventTarget;
     } else {
       this[propName] = nativeEvent[propName];
     }
   }
 }

 var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
 if (defaultPrevented) {
   this.isDefaultPrevented = emptyFunction_1.thatReturnsTrue;
 } else {
   this.isDefaultPrevented = emptyFunction_1.thatReturnsFalse;
 }
 this.isPropagationStopped = emptyFunction_1.thatReturnsFalse;
 return this;
}

_assign(SyntheticEvent.prototype, {
 preventDefault: function () {
   this.defaultPrevented = true;
   var event = this.nativeEvent;
   if (!event) {
     return;
   }

   if (event.preventDefault) {
     event.preventDefault();
   } else if (typeof event.returnValue !== 'unknown') {
     event.returnValue = false;
   }
   this.isDefaultPrevented = emptyFunction_1.thatReturnsTrue;
 },

 stopPropagation: function () {
   var event = this.nativeEvent;
   if (!event) {
     return;
   }

   if (event.stopPropagation) {
     event.stopPropagation();
   } else if (typeof event.cancelBubble !== 'unknown') {
     // The ChangeEventPlugin registers a "propertychange" event for
     // IE. This event does not support bubbling or cancelling, and
     // any references to cancelBubble throw "Member not found".  A
     // typeof check of "unknown" circumvents this issue (and is also
     // IE specific).
     event.cancelBubble = true;
   }

   this.isPropagationStopped = emptyFunction_1.thatReturnsTrue;
 },

 /**
  * We release all dispatched `SyntheticEvent`s after each event loop, adding
  * them back into the pool. This allows a way to hold onto a reference that
  * won't be added back into the pool.
  */
 persist: function () {
   this.isPersistent = emptyFunction_1.thatReturnsTrue;
 },

 /**
  * Checks if this event should be released back into the pool.
  *
  * @return {boolean} True if this should not be released, false otherwise.
  */
 isPersistent: emptyFunction_1.thatReturnsFalse,

 /**
  * `PooledClass` looks for `destructor` on each instance it releases.
  */
 destructor: function () {
   var Interface = this.constructor.Interface;
   for (var propName in Interface) {
     {
       Object.defineProperty(this, propName, getPooledWarningPropertyDefinition(propName, Interface[propName]));
     }
   }
   for (var i = 0; i < shouldBeReleasedProperties.length; i++) {
     this[shouldBeReleasedProperties[i]] = null;
   }
   {
     Object.defineProperty(this, 'nativeEvent', getPooledWarningPropertyDefinition('nativeEvent', null));
     Object.defineProperty(this, 'preventDefault', getPooledWarningPropertyDefinition('preventDefault', emptyFunction_1));
     Object.defineProperty(this, 'stopPropagation', getPooledWarningPropertyDefinition('stopPropagation', emptyFunction_1));
   }
 }
});

SyntheticEvent.Interface = EventInterface;

/**
* Helper to reduce boilerplate when creating subclasses.
*/
SyntheticEvent.extend = function (Interface) {
 var Super = this;

 var E = function () {};
 E.prototype = Super.prototype;
 var prototype = new E();

 function Class() {
   return Super.apply(this, arguments);
 }
 _assign(prototype, Class.prototype);
 Class.prototype = prototype;
 Class.prototype.constructor = Class;

 Class.Interface = _assign({}, Super.Interface, Interface);
 Class.extend = Super.extend;
 addEventPoolingTo(Class);

 return Class;
};

/** Proxying after everything set on SyntheticEvent
* to resolve Proxy issue on some WebKit browsers
* in which some Event properties are set to undefined (GH#10010)
*/
{
 var isProxySupported = typeof Proxy === 'function' &&
 // https://github.com/facebook/react/issues/12011
 !Object.isSealed(new Proxy({}, {}));

 if (isProxySupported) {
   /*eslint-disable no-func-assign */
   SyntheticEvent = new Proxy(SyntheticEvent, {
     construct: function (target, args) {
       return this.apply(target, Object.create(target.prototype), args);
     },
     apply: function (constructor, that, args) {
       return new Proxy(constructor.apply(that, args), {
         set: function (target, prop, value) {
           if (prop !== 'isPersistent' && !target.constructor.Interface.hasOwnProperty(prop) && shouldBeReleasedProperties.indexOf(prop) === -1) {
             !(didWarnForAddedNewProperty || target.isPersistent()) ? warning_1(false, "This synthetic event is reused for performance reasons. If you're " + "seeing this, you're adding a new property in the synthetic event object. " + 'The property is never released. See ' + 'https://fb.me/react-event-pooling for more information.') : void 0;
             didWarnForAddedNewProperty = true;
           }
           target[prop] = value;
           return true;
         }
       });
     }
   });
   /*eslint-enable no-func-assign */
 }
}

addEventPoolingTo(SyntheticEvent);

/**
* Helper to nullify syntheticEvent instance properties when destructing
*
* @param {String} propName
* @param {?object} getVal
* @return {object} defineProperty object
*/
function getPooledWarningPropertyDefinition(propName, getVal) {
 var isFunction = typeof getVal === 'function';
 return {
   configurable: true,
   set: set,
   get: get
 };

 function set(val) {
   var action = isFunction ? 'setting the method' : 'setting the property';
   warn(action, 'This is effectively a no-op');
   return val;
 }

 function get() {
   var action = isFunction ? 'accessing the method' : 'accessing the property';
   var result = isFunction ? 'This is a no-op function' : 'This is set to null';
   warn(action, result);
   return getVal;
 }

 function warn(action, result) {
   var warningCondition = false;
   !warningCondition ? warning_1(false, "This synthetic event is reused for performance reasons. If you're seeing this, " + "you're %s `%s` on a released/nullified synthetic event. %s. " + 'If you must keep the original synthetic event around, use event.persist(). ' + 'See https://fb.me/react-event-pooling for more information.', action, propName, result) : void 0;
 }
}

function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
 var EventConstructor = this;
 if (EventConstructor.eventPool.length) {
   var instance = EventConstructor.eventPool.pop();
   EventConstructor.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
   return instance;
 }
 return new EventConstructor(dispatchConfig, targetInst, nativeEvent, nativeInst);
}

function releasePooledEvent(event) {
 var EventConstructor = this;
 !(event instanceof EventConstructor) ? invariant_1(false, 'Trying to release an event instance  into a pool of a different type.') : void 0;
 event.destructor();
 if (EventConstructor.eventPool.length < EVENT_POOL_SIZE) {
   EventConstructor.eventPool.push(event);
 }
}

function addEventPoolingTo(EventConstructor) {
 EventConstructor.eventPool = [];
 EventConstructor.getPooled = getPooledEvent;
 EventConstructor.release = releasePooledEvent;
}

var SyntheticEvent$1 = SyntheticEvent;

/**
* @interface Event
* @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
*/
var SyntheticCompositionEvent = SyntheticEvent$1.extend({
 data: null
});

/**
* @interface Event
* @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
*      /#events-inputevents
*/
var SyntheticInputEvent = SyntheticEvent$1.extend({
 data: null
});

var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
var START_KEYCODE = 229;

var canUseCompositionEvent = ExecutionEnvironment_1.canUseDOM && 'CompositionEvent' in window;

var documentMode = null;
if (ExecutionEnvironment_1.canUseDOM && 'documentMode' in document) {
 documentMode = document.documentMode;
}

// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
var canUseTextInputEvent = ExecutionEnvironment_1.canUseDOM && 'TextEvent' in window && !documentMode;

// In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. Japanese ideographic
// spaces, for instance (\u3000) are not recorded correctly.
var useFallbackCompositionData = ExecutionEnvironment_1.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);

var SPACEBAR_CODE = 32;
var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);

// Events and their corresponding property names.
var eventTypes = {
 beforeInput: {
   phasedRegistrationNames: {
     bubbled: 'onBeforeInput',
     captured: 'onBeforeInputCapture'
   },
   dependencies: [TOP_COMPOSITION_END, TOP_KEY_PRESS, TOP_TEXT_INPUT, TOP_PASTE]
 },
 compositionEnd: {
   phasedRegistrationNames: {
     bubbled: 'onCompositionEnd',
     captured: 'onCompositionEndCapture'
   },
   dependencies: [TOP_BLUR, TOP_COMPOSITION_END, TOP_KEY_DOWN, TOP_KEY_PRESS, TOP_KEY_UP, TOP_MOUSE_DOWN]
 },
 compositionStart: {
   phasedRegistrationNames: {
     bubbled: 'onCompositionStart',
     captured: 'onCompositionStartCapture'
   },
   dependencies: [TOP_BLUR, TOP_COMPOSITION_START, TOP_KEY_DOWN, TOP_KEY_PRESS, TOP_KEY_UP, TOP_MOUSE_DOWN]
 },
 compositionUpdate: {
   phasedRegistrationNames: {
     bubbled: 'onCompositionUpdate',
     captured: 'onCompositionUpdateCapture'
   },
   dependencies: [TOP_BLUR, TOP_COMPOSITION_UPDATE, TOP_KEY_DOWN, TOP_KEY_PRESS, TOP_KEY_UP, TOP_MOUSE_DOWN]
 }
};

// Track whether we've ever handled a keypress on the space key.
var hasSpaceKeypress = false;

/**
* Return whether a native keypress event is assumed to be a command.
* This is required because Firefox fires `keypress` events for key commands
* (cut, copy, select-all, etc.) even though no character is inserted.
*/
function isKeypressCommand(nativeEvent) {
 return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
 // ctrlKey && altKey is equivalent to AltGr, and is not a command.
 !(nativeEvent.ctrlKey && nativeEvent.altKey);
}

/**
* Translate native top level events into event types.
*
* @param {string} topLevelType
* @return {object}
*/
function getCompositionEventType(topLevelType) {
 switch (topLevelType) {
   case TOP_COMPOSITION_START:
     return eventTypes.compositionStart;
   case TOP_COMPOSITION_END:
     return eventTypes.compositionEnd;
   case TOP_COMPOSITION_UPDATE:
     return eventTypes.compositionUpdate;
 }
}

/**
* Does our fallback best-guess model think this event signifies that
* composition has begun?
*
* @param {string} topLevelType
* @param {object} nativeEvent
* @return {boolean}
*/
function isFallbackCompositionStart(topLevelType, nativeEvent) {
 return topLevelType === TOP_KEY_DOWN && nativeEvent.keyCode === START_KEYCODE;
}

/**
* Does our fallback mode think that this event is the end of composition?
*
* @param {string} topLevelType
* @param {object} nativeEvent
* @return {boolean}
*/
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
 switch (topLevelType) {
   case TOP_KEY_UP:
     // Command keys insert or clear IME input.
     return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
   case TOP_KEY_DOWN:
     // Expect IME keyCode on each keydown. If we get any other
     // code we must have exited earlier.
     return nativeEvent.keyCode !== START_KEYCODE;
   case TOP_KEY_PRESS:
   case TOP_MOUSE_DOWN:
   case TOP_BLUR:
     // Events are not possible without cancelling IME.
     return true;
   default:
     return false;
 }
}

/**
* Google Input Tools provides composition data via a CustomEvent,
* with the `data` property populated in the `detail` object. If this
* is available on the event object, use it. If not, this is a plain
* composition event and we have nothing special to extract.
*
* @param {object} nativeEvent
* @return {?string}
*/
function getDataFromCustomEvent(nativeEvent) {
 var detail = nativeEvent.detail;
 if (typeof detail === 'object' && 'data' in detail) {
   return detail.data;
 }
 return null;
}

// Track the current IME composition status, if any.
var isComposing = false;

/**
* @return {?object} A SyntheticCompositionEvent.
*/
function extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
 var eventType = void 0;
 var fallbackData = void 0;

 if (canUseCompositionEvent) {
   eventType = getCompositionEventType(topLevelType);
 } else if (!isComposing) {
   if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
     eventType = eventTypes.compositionStart;
   }
 } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
   eventType = eventTypes.compositionEnd;
 }

 if (!eventType) {
   return null;
 }

 if (useFallbackCompositionData) {
   // The current composition is stored statically and must not be
   // overwritten while composition continues.
   if (!isComposing && eventType === eventTypes.compositionStart) {
     isComposing = initialize(nativeEventTarget);
   } else if (eventType === eventTypes.compositionEnd) {
     if (isComposing) {
       fallbackData = getData();
     }
   }
 }

 var event = SyntheticCompositionEvent.getPooled(eventType, targetInst, nativeEvent, nativeEventTarget);

 if (fallbackData) {
   // Inject data generated from fallback path into the synthetic event.
   // This matches the property of native CompositionEventInterface.
   event.data = fallbackData;
 } else {
   var customData = getDataFromCustomEvent(nativeEvent);
   if (customData !== null) {
     event.data = customData;
   }
 }

 accumulateTwoPhaseDispatches(event);
 return event;
}

/**
* @param {TopLevelType} topLevelType Number from `TopLevelType`.
* @param {object} nativeEvent Native browser event.
* @return {?string} The string corresponding to this `beforeInput` event.
*/
function getNativeBeforeInputChars(topLevelType, nativeEvent) {
 switch (topLevelType) {
   case TOP_COMPOSITION_END:
     return getDataFromCustomEvent(nativeEvent);
   case TOP_KEY_PRESS:
     /**
      * If native `textInput` events are available, our goal is to make
      * use of them. However, there is a special case: the spacebar key.
      * In Webkit, preventing default on a spacebar `textInput` event
      * cancels character insertion, but it *also* causes the browser
      * to fall back to its default spacebar behavior of scrolling the
      * page.
      *
      * Tracking at:
      * https://code.google.com/p/chromium/issues/detail?id=355103
      *
      * To avoid this issue, use the keypress event as if no `textInput`
      * event is available.
      */
     var which = nativeEvent.which;
     if (which !== SPACEBAR_CODE) {
       return null;
     }

     hasSpaceKeypress = true;
     return SPACEBAR_CHAR;

   case TOP_TEXT_INPUT:
     // Record the characters to be added to the DOM.
     var chars = nativeEvent.data;

     // If it's a spacebar character, assume that we have already handled
     // it at the keypress level and bail immediately. Android Chrome
     // doesn't give us keycodes, so we need to blacklist it.
     if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
       return null;
     }

     return chars;

   default:
     // For other native event types, do nothing.
     return null;
 }
}

/**
* For browsers that do not provide the `textInput` event, extract the
* appropriate string to use for SyntheticInputEvent.
*
* @param {number} topLevelType Number from `TopLevelEventTypes`.
* @param {object} nativeEvent Native browser event.
* @return {?string} The fallback string for this `beforeInput` event.
*/
function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
 // If we are currently composing (IME) and using a fallback to do so,
 // try to extract the composed characters from the fallback object.
 // If composition event is available, we extract a string only at
 // compositionevent, otherwise extract it at fallback events.
 if (isComposing) {
   if (topLevelType === TOP_COMPOSITION_END || !canUseCompositionEvent && isFallbackCompositionEnd(topLevelType, nativeEvent)) {
     var chars = getData();
     reset();
     isComposing = false;
     return chars;
   }
   return null;
 }

 switch (topLevelType) {
   case TOP_PASTE:
     // If a paste event occurs after a keypress, throw out the input
     // chars. Paste events should not lead to BeforeInput events.
     return null;
   case TOP_KEY_PRESS:
     /**
      * As of v27, Firefox may fire keypress events even when no character
      * will be inserted. A few possibilities:
      *
      * - `which` is `0`. Arrow keys, Esc key, etc.
      *
      * - `which` is the pressed key code, but no char is available.
      *   Ex: 'AltGr + d` in Polish. There is no modified character for
      *   this key combination and no character is inserted into the
      *   document, but FF fires the keypress for char code `100` anyway.
      *   No `input` event will occur.
      *
      * - `which` is the pressed key code, but a command combination is
      *   being used. Ex: `Cmd+C`. No character is inserted, and no
      *   `input` event will occur.
      */
     if (!isKeypressCommand(nativeEvent)) {
       // IE fires the `keypress` event when a user types an emoji via
       // Touch keyboard of Windows.  In such a case, the `char` property
       // holds an emoji character like `\uD83D\uDE0A`.  Because its length
       // is 2, the property `which` does not represent an emoji correctly.
       // In such a case, we directly return the `char` property instead of
       // using `which`.
       if (nativeEvent.char && nativeEvent.char.length > 1) {
         return nativeEvent.char;
       } else if (nativeEvent.which) {
         return String.fromCharCode(nativeEvent.which);
       }
     }
     return null;
   case TOP_COMPOSITION_END:
     return useFallbackCompositionData ? null : nativeEvent.data;
   default:
     return null;
 }
}

/**
* Extract a SyntheticInputEvent for `beforeInput`, based on either native
* `textInput` or fallback behavior.
*
* @return {?object} A SyntheticInputEvent.
*/
function extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
 var chars = void 0;

 if (canUseTextInputEvent) {
   chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
 } else {
   chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
 }

 // If no characters are being inserted, no BeforeInput event should
 // be fired.
 if (!chars) {
   return null;
 }

 var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, targetInst, nativeEvent, nativeEventTarget);

 event.data = chars;
 accumulateTwoPhaseDispatches(event);
 return event;
}

/**
* Create an `onBeforeInput` event to match
* http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
*
* This event plugin is based on the native `textInput` event
* available in Chrome, Safari, Opera, and IE. This event fires after
* `onKeyPress` and `onCompositionEnd`, but before `onInput`.
*
* `beforeInput` is spec'd but not implemented in any browsers, and
* the `input` event does not provide any useful information about what has
* actually been added, contrary to the spec. Thus, `textInput` is the best
* available event to identify the characters that have actually been inserted
* into the target node.
*
* This plugin is also responsible for emitting `composition` events, thus
* allowing us to share composition fallback code for both `beforeInput` and
* `composition` event types.
*/
var BeforeInputEventPlugin = {
 eventTypes: eventTypes,

 extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
   var composition = extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget);

   var beforeInput = extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget);

   if (composition === null) {
     return beforeInput;
   }

   if (beforeInput === null) {
     return composition;
   }

   return [composition, beforeInput];
 }
};

// Use to restore controlled state after a change event has fired.

var fiberHostComponent = null;

var ReactControlledComponentInjection = {
 injectFiberControlledHostComponent: function (hostComponentImpl) {
   // The fiber implementation doesn't use dynamic dispatch so we need to
   // inject the implementation.
   fiberHostComponent = hostComponentImpl;
 }
};

var restoreTarget = null;
var restoreQueue = null;

function restoreStateOfTarget(target) {
 // We perform this translation at the end of the event loop so that we
 // always receive the correct fiber here
 var internalInstance = getInstanceFromNode(target);
 if (!internalInstance) {
   // Unmounted
   return;
 }
 !(fiberHostComponent && typeof fiberHostComponent.restoreControlledState === 'function') ? invariant_1(false, 'Fiber needs to be injected to handle a fiber target for controlled events. This error is likely caused by a bug in React. Please file an issue.') : void 0;
 var props = getFiberCurrentPropsFromNode(internalInstance.stateNode);
 fiberHostComponent.restoreControlledState(internalInstance.stateNode, internalInstance.type, props);
}

var injection$2 = ReactControlledComponentInjection;

function enqueueStateRestore(target) {
 if (restoreTarget) {
   if (restoreQueue) {
     restoreQueue.push(target);
   } else {
     restoreQueue = [target];
   }
 } else {
   restoreTarget = target;
 }
}

function needsStateRestore() {
 return restoreTarget !== null || restoreQueue !== null;
}

function restoreStateIfNeeded() {
 if (!restoreTarget) {
   return;
 }
 var target = restoreTarget;
 var queuedTargets = restoreQueue;
 restoreTarget = null;
 restoreQueue = null;

 restoreStateOfTarget(target);
 if (queuedTargets) {
   for (var i = 0; i < queuedTargets.length; i++) {
     restoreStateOfTarget(queuedTargets[i]);
   }
 }
}

var ReactControlledComponent = Object.freeze({
 injection: injection$2,
 enqueueStateRestore: enqueueStateRestore,
 needsStateRestore: needsStateRestore,
 restoreStateIfNeeded: restoreStateIfNeeded
});

// Used as a way to call batchedUpdates when we don't have a reference to
// the renderer. Such as when we're dispatching events or if third party
// libraries need to call batchedUpdates. Eventually, this API will go away when
// everything is batched by default. We'll then have a similar API to opt-out of
// scheduled work and instead do synchronous work.

// Defaults
var _batchedUpdates = function (fn, bookkeeping) {
 return fn(bookkeeping);
};
var _interactiveUpdates = function (fn, a, b) {
 return fn(a, b);
};
var _flushInteractiveUpdates = function () {};

var isBatching = false;
function batchedUpdates(fn, bookkeeping) {
 if (isBatching) {
   // If we are currently inside another batch, we need to wait until it
   // fully completes before restoring state.
   return fn(bookkeeping);
 }
 isBatching = true;
 try {
   return _batchedUpdates(fn, bookkeeping);
 } finally {
   // Here we wait until all updates have propagated, which is important
   // when using controlled components within layers:
   // https://github.com/facebook/react/issues/1698
   // Then we restore state of any controlled component.
   isBatching = false;
   var controlledComponentsHavePendingUpdates = needsStateRestore();
   if (controlledComponentsHavePendingUpdates) {
     // If a controlled event was fired, we may need to restore the state of
     // the DOM node back to the controlled value. This is necessary when React
     // bails out of the update without touching the DOM.
     _flushInteractiveUpdates();
     restoreStateIfNeeded();
   }
 }
}

function interactiveUpdates(fn, a, b) {
 return _interactiveUpdates(fn, a, b);
}



var injection$3 = {
 injectRenderer: function (renderer) {
   _batchedUpdates = renderer.batchedUpdates;
   _interactiveUpdates = renderer.interactiveUpdates;
   _flushInteractiveUpdates = renderer.flushInteractiveUpdates;
 }
};

/**
* @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
*/
var supportedInputTypes = {
 color: true,
 date: true,
 datetime: true,
 'datetime-local': true,
 email: true,
 month: true,
 number: true,
 password: true,
 range: true,
 search: true,
 tel: true,
 text: true,
 time: true,
 url: true,
 week: true
};

function isTextInputElement(elem) {
 var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();

 if (nodeName === 'input') {
   return !!supportedInputTypes[elem.type];
 }

 if (nodeName === 'textarea') {
   return true;
 }

 return false;
}

/**
* HTML nodeType values that represent the type of the node
*/

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;

/**
* Gets the target node from a native browser event by accounting for
* inconsistencies in browser DOM APIs.
*
* @param {object} nativeEvent Native browser event.
* @return {DOMEventTarget} Target node.
*/
function getEventTarget(nativeEvent) {
 // Fallback to nativeEvent.srcElement for IE9
 // https://github.com/facebook/react/issues/12506
 var target = nativeEvent.target || nativeEvent.srcElement || window;

 // Normalize SVG <use> element events #4963
 if (target.correspondingUseElement) {
   target = target.correspondingUseElement;
 }

 // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
 // @see http://www.quirksmode.org/js/events_properties.html
 return target.nodeType === TEXT_NODE ? target.parentNode : target;
}

/**
* Checks if an event is supported in the current execution environment.
*
* NOTE: This will not work correctly for non-generic events such as `change`,
* `reset`, `load`, `error`, and `select`.
*
* Borrows from Modernizr.
*
* @param {string} eventNameSuffix Event name, e.g. "click".
* @param {?boolean} capture Check if the capture phase is supported.
* @return {boolean} True if the event is supported.
* @internal
* @license Modernizr 3.0.0pre (Custom Build) | MIT
*/
function isEventSupported(eventNameSuffix, capture) {
 if (!ExecutionEnvironment_1.canUseDOM || capture && !('addEventListener' in document)) {
   return false;
 }

 var eventName = 'on' + eventNameSuffix;
 var isSupported = eventName in document;

 if (!isSupported) {
   var element = document.createElement('div');
   element.setAttribute(eventName, 'return;');
   isSupported = typeof element[eventName] === 'function';
 }

 return isSupported;
}

function isCheckable(elem) {
 var type = elem.type;
 var nodeName = elem.nodeName;
 return nodeName && nodeName.toLowerCase() === 'input' && (type === 'checkbox' || type === 'radio');
}

function getTracker(node) {
 return node._valueTracker;
}

function detachTracker(node) {
 node._valueTracker = null;
}

function getValueFromNode(node) {
 var value = '';
 if (!node) {
   return value;
 }

 if (isCheckable(node)) {
   value = node.checked ? 'true' : 'false';
 } else {
   value = node.value;
 }

 return value;
}

function trackValueOnNode(node) {
 var valueField = isCheckable(node) ? 'checked' : 'value';
 var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);

 var currentValue = '' + node[valueField];

 // if someone has already defined a value or Safari, then bail
 // and don't track value will cause over reporting of changes,
 // but it's better then a hard failure
 // (needed for certain tests that spyOn input values and Safari)
 if (node.hasOwnProperty(valueField) || typeof descriptor === 'undefined' || typeof descriptor.get !== 'function' || typeof descriptor.set !== 'function') {
   return;
 }
 var get = descriptor.get,
     set = descriptor.set;

 Object.defineProperty(node, valueField, {
   configurable: true,
   get: function () {
     return get.call(this);
   },
   set: function (value) {
     currentValue = '' + value;
     set.call(this, value);
   }
 });
 // We could've passed this the first time
 // but it triggers a bug in IE11 and Edge 14/15.
 // Calling defineProperty() again should be equivalent.
 // https://github.com/facebook/react/issues/11768
 Object.defineProperty(node, valueField, {
   enumerable: descriptor.enumerable
 });

 var tracker = {
   getValue: function () {
     return currentValue;
   },
   setValue: function (value) {
     currentValue = '' + value;
   },
   stopTracking: function () {
     detachTracker(node);
     delete node[valueField];
   }
 };
 return tracker;
}

function track(node) {
 if (getTracker(node)) {
   return;
 }

 // TODO: Once it's just Fiber we can move this to node._wrapperState
 node._valueTracker = trackValueOnNode(node);
}

function updateValueIfChanged(node) {
 if (!node) {
   return false;
 }

 var tracker = getTracker(node);
 // if there is no tracker at this point it's unlikely
 // that trying again will succeed
 if (!tracker) {
   return true;
 }

 var lastValue = tracker.getValue();
 var nextValue = getValueFromNode(node);
 if (nextValue !== lastValue) {
   tracker.setValue(nextValue);
   return true;
 }
 return false;
}

var ReactInternals$1 = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

var ReactCurrentOwner = ReactInternals$1.ReactCurrentOwner;
var ReactDebugCurrentFrame = ReactInternals$1.ReactDebugCurrentFrame;

var describeComponentFrame = function (name, source, ownerName) {
 return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_TIMEOUT_TYPE = hasSymbol ? Symbol.for('react.timeout') : 0xead1;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
 if (maybeIterable === null || typeof maybeIterable === 'undefined') {
   return null;
 }
 var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
 if (typeof maybeIterator === 'function') {
   return maybeIterator;
 }
 return null;
}

function getComponentName(fiber) {
 var type = fiber.type;

 if (typeof type === 'function') {
   return type.displayName || type.name;
 }
 if (typeof type === 'string') {
   return type;
 }
 switch (type) {
   case REACT_ASYNC_MODE_TYPE:
     return 'AsyncMode';
   case REACT_CONTEXT_TYPE:
     return 'Context.Consumer';
   case REACT_FRAGMENT_TYPE:
     return 'ReactFragment';
   case REACT_PORTAL_TYPE:
     return 'ReactPortal';
   case REACT_PROFILER_TYPE:
     return 'Profiler(' + fiber.pendingProps.id + ')';
   case REACT_PROVIDER_TYPE:
     return 'Context.Provider';
   case REACT_STRICT_MODE_TYPE:
     return 'StrictMode';
   case REACT_TIMEOUT_TYPE:
     return 'Timeout';
 }
 if (typeof type === 'object' && type !== null) {
   switch (type.$$typeof) {
     case REACT_FORWARD_REF_TYPE:
       var functionName = type.render.displayName || type.render.name || '';
       return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
   }
 }
 return null;
}

function describeFiber(fiber) {
 switch (fiber.tag) {
   case IndeterminateComponent:
   case FunctionalComponent:
   case ClassComponent:
   case HostComponent:
     var owner = fiber._debugOwner;
     var source = fiber._debugSource;
     var name = getComponentName(fiber);
     var ownerName = null;
     if (owner) {
       ownerName = getComponentName(owner);
     }
     return describeComponentFrame(name, source, ownerName);
   default:
     return '';
 }
}

// This function can only be called with a work-in-progress fiber and
// only during begin or complete phase. Do not call it under any other
// circumstances.
function getStackAddendumByWorkInProgressFiber(workInProgress) {
 var info = '';
 var node = workInProgress;
 do {
   info += describeFiber(node);
   // Otherwise this return pointer might point to the wrong tree:
   node = node.return;
 } while (node);
 return info;
}

function getCurrentFiberOwnerName$1() {
 {
   var fiber = ReactDebugCurrentFiber.current;
   if (fiber === null) {
     return null;
   }
   var owner = fiber._debugOwner;
   if (owner !== null && typeof owner !== 'undefined') {
     return getComponentName(owner);
   }
 }
 return null;
}

function getCurrentFiberStackAddendum$1() {
 {
   var fiber = ReactDebugCurrentFiber.current;
   if (fiber === null) {
     return null;
   }
   // Safe because if current fiber exists, we are reconciling,
   // and it is guaranteed to be the work-in-progress version.
   return getStackAddendumByWorkInProgressFiber(fiber);
 }
 return null;
}

function resetCurrentFiber() {
 ReactDebugCurrentFrame.getCurrentStack = null;
 ReactDebugCurrentFiber.current = null;
 ReactDebugCurrentFiber.phase = null;
}

function setCurrentFiber(fiber) {
 ReactDebugCurrentFrame.getCurrentStack = getCurrentFiberStackAddendum$1;
 ReactDebugCurrentFiber.current = fiber;
 ReactDebugCurrentFiber.phase = null;
}

function setCurrentPhase(phase) {
 ReactDebugCurrentFiber.phase = phase;
}

var ReactDebugCurrentFiber = {
 current: null,
 phase: null,
 resetCurrentFiber: resetCurrentFiber,
 setCurrentFiber: setCurrentFiber,
 setCurrentPhase: setCurrentPhase,
 getCurrentFiberOwnerName: getCurrentFiberOwnerName$1,
 getCurrentFiberStackAddendum: getCurrentFiberStackAddendum$1
};

// A reserved attribute.
// It is handled by React separately and shouldn't be written to the DOM.
var RESERVED = 0;

// A simple string attribute.
// Attributes that aren't in the whitelist are presumed to have this type.
var STRING = 1;

// A string attribute that accepts booleans in React. In HTML, these are called
// "enumerated" attributes with "true" and "false" as possible values.
// When true, it should be set to a "true" string.
// When false, it should be set to a "false" string.
var BOOLEANISH_STRING = 2;

// A real boolean attribute.
// When true, it should be present (set either to an empty string or its name).
// When false, it should be omitted.
var BOOLEAN = 3;

// An attribute that can be used as a flag as well as with a value.
// When true, it should be present (set either to an empty string or its name).
// When false, it should be omitted.
// For any other value, should be present with that value.
var OVERLOADED_BOOLEAN = 4;

// An attribute that must be numeric or parse as a numeric.
// When falsy, it should be removed.
var NUMERIC = 5;

// An attribute that must be positive numeric or parse as a positive numeric.
// When falsy, it should be removed.
var POSITIVE_NUMERIC = 6;

/* eslint-disable max-len */
var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
/* eslint-enable max-len */
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';


var ROOT_ATTRIBUTE_NAME = 'data-reactroot';
var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');

var hasOwnProperty = Object.prototype.hasOwnProperty;
var illegalAttributeNameCache = {};
var validatedAttributeNameCache = {};

function isAttributeNameSafe(attributeName) {
 if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) {
   return true;
 }
 if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) {
   return false;
 }
 if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
   validatedAttributeNameCache[attributeName] = true;
   return true;
 }
 illegalAttributeNameCache[attributeName] = true;
 {
   warning_1(false, 'Invalid attribute name: `%s`', attributeName);
 }
 return false;
}

function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
 if (propertyInfo !== null) {
   return propertyInfo.type === RESERVED;
 }
 if (isCustomComponentTag) {
   return false;
 }
 if (name.length > 2 && (name[0] === 'o' || name[0] === 'O') && (name[1] === 'n' || name[1] === 'N')) {
   return true;
 }
 return false;
}

function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
 if (propertyInfo !== null && propertyInfo.type === RESERVED) {
   return false;
 }
 switch (typeof value) {
   case 'function':
   // $FlowIssue symbol is perfectly valid here
   case 'symbol':
     // eslint-disable-line
     return true;
   case 'boolean':
     {
       if (isCustomComponentTag) {
         return false;
       }
       if (propertyInfo !== null) {
         return !propertyInfo.acceptsBooleans;
       } else {
         var prefix = name.toLowerCase().slice(0, 5);
         return prefix !== 'data-' && prefix !== 'aria-';
       }
     }
   default:
     return false;
 }
}

function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
 if (value === null || typeof value === 'undefined') {
   return true;
 }
 if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag)) {
   return true;
 }
 if (isCustomComponentTag) {
   return false;
 }
 if (propertyInfo !== null) {
   switch (propertyInfo.type) {
     case BOOLEAN:
       return !value;
     case OVERLOADED_BOOLEAN:
       return value === false;
     case NUMERIC:
       return isNaN(value);
     case POSITIVE_NUMERIC:
       return isNaN(value) || value < 1;
   }
 }
 return false;
}

function getPropertyInfo(name) {
 return properties.hasOwnProperty(name) ? properties[name] : null;
}

function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace) {
 this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
 this.attributeName = attributeName;
 this.attributeNamespace = attributeNamespace;
 this.mustUseProperty = mustUseProperty;
 this.propertyName = name;
 this.type = type;
}

// When adding attributes to this list, be sure to also add them to
// the `possibleStandardNames` module to ensure casing and incorrect
// name warnings.
var properties = {};

// These props are reserved by React. They shouldn't be written to the DOM.
['children', 'dangerouslySetInnerHTML',
// TODO: This prevents the assignment of defaultValue to regular
// elements (not just inputs). Now that ReactDOMInput assigns to the
// defaultValue property -- do we need this?
'defaultValue', 'defaultChecked', 'innerHTML', 'suppressContentEditableWarning', 'suppressHydrationWarning', 'style'].forEach(function (name) {
 properties[name] = new PropertyInfoRecord(name, RESERVED, false, // mustUseProperty
 name, // attributeName
 null);
} // attributeNamespace
);

// A few React string attributes have a different name.
// This is a mapping from React prop names to the attribute names.
[['acceptCharset', 'accept-charset'], ['className', 'class'], ['htmlFor', 'for'], ['httpEquiv', 'http-equiv']].forEach(function (_ref) {
 var name = _ref[0],
     attributeName = _ref[1];

 properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
 attributeName, // attributeName
 null);
} // attributeNamespace
);

// These are "enumerated" HTML attributes that accept "true" and "false".
// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (name) {
 properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
 name.toLowerCase(), // attributeName
 null);
} // attributeNamespace
);

// These are "enumerated" SVG attributes that accept "true" and "false".
// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).
// Since these are SVG attributes, their attribute names are case-sensitive.
['autoReverse', 'externalResourcesRequired', 'preserveAlpha'].forEach(function (name) {
 properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
 name, // attributeName
 null);
} // attributeNamespace
);

// These are HTML boolean attributes.
['allowFullScreen', 'async',
// Note: there is a special case that prevents it from being written to the DOM
// on the client side because the browsers are inconsistent. Instead we call focus().
'autoFocus', 'autoPlay', 'controls', 'default', 'defer', 'disabled', 'formNoValidate', 'hidden', 'loop', 'noModule', 'noValidate', 'open', 'playsInline', 'readOnly', 'required', 'reversed', 'scoped', 'seamless',
// Microdata
'itemScope'].forEach(function (name) {
 properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, // mustUseProperty
 name.toLowerCase(), // attributeName
 null);
} // attributeNamespace
);

// These are the few React props that we set as DOM properties
// rather than attributes. These are all booleans.
['checked',
// Note: `option.selected` is not updated if `select.multiple` is
// disabled with `removeAttribute`. We have special logic for handling this.
'multiple', 'muted', 'selected'].forEach(function (name) {
 properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, // mustUseProperty
 name.toLowerCase(), // attributeName
 null);
} // attributeNamespace
);

// These are HTML attributes that are "overloaded booleans": they behave like
// booleans, but can also accept a string value.
['capture', 'download'].forEach(function (name) {
 properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, // mustUseProperty
 name.toLowerCase(), // attributeName
 null);
} // attributeNamespace
);

// These are HTML attributes that must be positive numbers.
['cols', 'rows', 'size', 'span'].forEach(function (name) {
 properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, // mustUseProperty
 name.toLowerCase(), // attributeName
 null);
} // attributeNamespace
);

// These are HTML attributes that must be numbers.
['rowSpan', 'start'].forEach(function (name) {
 properties[name] = new PropertyInfoRecord(name, NUMERIC, false, // mustUseProperty
 name.toLowerCase(), // attributeName
 null);
} // attributeNamespace
);

var CAMELIZE = /[\-\:]([a-z])/g;
var capitalize = function (token) {
 return token[1].toUpperCase();
};

// This is a list of all SVG attributes that need special casing, namespacing,
// or boolean value assignment. Regular attributes that just accept strings
// and have the same names are omitted, just like in the HTML whitelist.
// Some of these attributes can be hard to find. This list was created by
// scrapping the MDN documentation.
['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'xmlns:xlink', 'x-height'].forEach(function (attributeName) {
 var name = attributeName.replace(CAMELIZE, capitalize);
 properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
 attributeName, null);
} // attributeNamespace
);

// String SVG attributes with the xlink namespace.
['xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type'].forEach(function (attributeName) {
 var name = attributeName.replace(CAMELIZE, capitalize);
 properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
 attributeName, 'http://www.w3.org/1999/xlink');
});

// String SVG attributes with the xml namespace.
['xml:base', 'xml:lang', 'xml:space'].forEach(function (attributeName) {
 var name = attributeName.replace(CAMELIZE, capitalize);
 properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
 attributeName, 'http://www.w3.org/XML/1998/namespace');
});

// Special case: this attribute exists both in HTML and SVG.
// Its "tabindex" attribute name is case-sensitive in SVG so we can't just use
// its React `tabIndex` name, like we do for attributes that exist only in HTML.
properties.tabIndex = new PropertyInfoRecord('tabIndex', STRING, false, // mustUseProperty
'tabindex', // attributeName
null);

/**
* Get the value for a property on a node. Only used in DEV for SSR validation.
* The "expected" argument is used as a hint of what the expected value is.
* Some properties have multiple equivalent values.
*/
function getValueForProperty(node, name, expected, propertyInfo) {
 {
   if (propertyInfo.mustUseProperty) {
     var propertyName = propertyInfo.propertyName;

     return node[propertyName];
   } else {
     var attributeName = propertyInfo.attributeName;

     var stringValue = null;

     if (propertyInfo.type === OVERLOADED_BOOLEAN) {
       if (node.hasAttribute(attributeName)) {
         var value = node.getAttribute(attributeName);
         if (value === '') {
           return true;
         }
         if (shouldRemoveAttribute(name, expected, propertyInfo, false)) {
           return value;
         }
         if (value === '' + expected) {
           return expected;
         }
         return value;
       }
     } else if (node.hasAttribute(attributeName)) {
       if (shouldRemoveAttribute(name, expected, propertyInfo, false)) {
         // We had an attribute but shouldn't have had one, so read it
         // for the error message.
         return node.getAttribute(attributeName);
       }
       if (propertyInfo.type === BOOLEAN) {
         // If this was a boolean, it doesn't matter what the value is
         // the fact that we have it is the same as the expected.
         return expected;
       }
       // Even if this property uses a namespace we use getAttribute
       // because we assume its namespaced name is the same as our config.
       // To use getAttributeNS we need the local name which we don't have
       // in our config atm.
       stringValue = node.getAttribute(attributeName);
     }

     if (shouldRemoveAttribute(name, expected, propertyInfo, false)) {
       return stringValue === null ? expected : stringValue;
     } else if (stringValue === '' + expected) {
       return expected;
     } else {
       return stringValue;
     }
   }
 }
}

/**
* Get the value for a attribute on a node. Only used in DEV for SSR validation.
* The third argument is used as a hint of what the expected value is. Some
* attributes have multiple equivalent values.
*/
function getValueForAttribute(node, name, expected) {
 {
   if (!isAttributeNameSafe(name)) {
     return;
   }
   if (!node.hasAttribute(name)) {
     return expected === undefined ? undefined : null;
   }
   var value = node.getAttribute(name);
   if (value === '' + expected) {
     return expected;
   }
   return value;
 }
}

/**
* Sets the value for a property on a node.
*
* @param {DOMElement} node
* @param {string} name
* @param {*} value
*/
function setValueForProperty(node, name, value, isCustomComponentTag) {
 var propertyInfo = getPropertyInfo(name);
 if (shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag)) {
   return;
 }
 if (shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag)) {
   value = null;
 }
 // If the prop isn't in the special list, treat it as a simple attribute.
 if (isCustomComponentTag || propertyInfo === null) {
   if (isAttributeNameSafe(name)) {
     var _attributeName = name;
     if (value === null) {
       node.removeAttribute(_attributeName);
     } else {
       node.setAttribute(_attributeName, '' + value);
     }
   }
   return;
 }
 var mustUseProperty = propertyInfo.mustUseProperty;

 if (mustUseProperty) {
   var propertyName = propertyInfo.propertyName;

   if (value === null) {
     var type = propertyInfo.type;

     node[propertyName] = type === BOOLEAN ? false : '';
   } else {
     // Contrary to `setAttribute`, object properties are properly
     // `toString`ed by IE8/9.
     node[propertyName] = value;
   }
   return;
 }
 // The rest are treated as attributes with special cases.
 var attributeName = propertyInfo.attributeName,
     attributeNamespace = propertyInfo.attributeNamespace;

 if (value === null) {
   node.removeAttribute(attributeName);
 } else {
   var _type = propertyInfo.type;

   var attributeValue = void 0;
   if (_type === BOOLEAN || _type === OVERLOADED_BOOLEAN && value === true) {
     attributeValue = '';
   } else {
     // `setAttribute` with objects becomes only `[object]` in IE8/9,
     // ('' + value) makes it output the correct toString()-value.
     attributeValue = '' + value;
   }
   if (attributeNamespace) {
     node.setAttributeNS(attributeNamespace, attributeName, attributeValue);
   } else {
     node.setAttribute(attributeName, attributeValue);
   }
 }
}

/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



{
 var invariant$2 = invariant_1;
 var warning$2 = warning_1;
 var ReactPropTypesSecret = ReactPropTypesSecret_1;
 var loggedTypeFailures = {};
}

/**
* Assert that the values match with the type specs.
* Error messages are memorized and will only be shown once.
*
* @param {object} typeSpecs Map of name to a ReactPropType
* @param {object} values Runtime values that need to be type-checked
* @param {string} location e.g. "prop", "context", "child context"
* @param {string} componentName Name of the component for error messages.
* @param {?Function} getStack Returns the component stack.
* @private
*/
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
 {
   for (var typeSpecName in typeSpecs) {
     if (typeSpecs.hasOwnProperty(typeSpecName)) {
       var error;
       // Prop type validation may throw. In case they do, we don't want to
       // fail the render phase where it didn't fail before. So we log it.
       // After these have been cleaned up, we'll let them throw.
       try {
         // This is intentionally an invariant that gets caught. It's the same
         // behavior as without this statement except with a better message.
         invariant$2(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
         error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
       } catch (ex) {
         error = ex;
       }
       warning$2(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
       if (error instanceof Error && !(error.message in loggedTypeFailures)) {
         // Only monitor this failure once because there tends to be a lot of the
         // same error.
         loggedTypeFailures[error.message] = true;

         var stack = getStack ? getStack() : '';

         warning$2(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
       }
     }
   }
 }
}

var checkPropTypes_1 = checkPropTypes;

var ReactControlledValuePropTypes = {
 checkPropTypes: null
};

{
 var hasReadOnlyValue = {
   button: true,
   checkbox: true,
   image: true,
   hidden: true,
   radio: true,
   reset: true,
   submit: true
 };

 var propTypes = {
   value: function (props, propName, componentName) {
     if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
       return null;
     }
     return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
   },
   checked: function (props, propName, componentName) {
     if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
       return null;
     }
     return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
   }
 };

 /**
  * Provide a linked `value` attribute for controlled forms. You should not use
  * this outside of the ReactDOM controlled form components.
  */
 ReactControlledValuePropTypes.checkPropTypes = function (tagName, props, getStack) {
   checkPropTypes_1(propTypes, props, 'prop', tagName, getStack);
 };
}

// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberOwnerName = ReactDebugCurrentFiber.getCurrentFiberOwnerName;
var getCurrentFiberStackAddendum = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

var didWarnValueDefaultValue = false;
var didWarnCheckedDefaultChecked = false;
var didWarnControlledToUncontrolled = false;
var didWarnUncontrolledToControlled = false;

function isControlled(props) {
 var usesChecked = props.type === 'checkbox' || props.type === 'radio';
 return usesChecked ? props.checked != null : props.value != null;
}

/**
* Implements an <input> host component that allows setting these optional
* props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
*
* If `checked` or `value` are not supplied (or null/undefined), user actions
* that affect the checked state or value will trigger updates to the element.
*
* If they are supplied (and not null/undefined), the rendered element will not
* trigger updates to the element. Instead, the props must change in order for
* the rendered element to be updated.
*
* The rendered element will be initialized as unchecked (or `defaultChecked`)
* with an empty value (or `defaultValue`).
*
* See http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
*/

function getHostProps(element, props) {
 var node = element;
 var checked = props.checked;

 var hostProps = _assign({}, props, {
   defaultChecked: undefined,
   defaultValue: undefined,
   value: undefined,
   checked: checked != null ? checked : node._wrapperState.initialChecked
 });

 return hostProps;
}

function initWrapperState(element, props) {
 {
   ReactControlledValuePropTypes.checkPropTypes('input', props, getCurrentFiberStackAddendum);

   if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnCheckedDefaultChecked) {
     warning_1(false, '%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', getCurrentFiberOwnerName() || 'A component', props.type);
     didWarnCheckedDefaultChecked = true;
   }
   if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue) {
     warning_1(false, '%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', getCurrentFiberOwnerName() || 'A component', props.type);
     didWarnValueDefaultValue = true;
   }
 }

 var node = element;
 var defaultValue = props.defaultValue == null ? '' : props.defaultValue;

 node._wrapperState = {
   initialChecked: props.checked != null ? props.checked : props.defaultChecked,
   initialValue: getSafeValue(props.value != null ? props.value : defaultValue),
   controlled: isControlled(props)
 };
}

function updateChecked(element, props) {
 var node = element;
 var checked = props.checked;
 if (checked != null) {
   setValueForProperty(node, 'checked', checked, false);
 }
}

function updateWrapper(element, props) {
 var node = element;
 {
   var _controlled = isControlled(props);

   if (!node._wrapperState.controlled && _controlled && !didWarnUncontrolledToControlled) {
     warning_1(false, 'A component is changing an uncontrolled input of type %s to be controlled. ' + 'Input elements should not switch from uncontrolled to controlled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s', props.type, getCurrentFiberStackAddendum());
     didWarnUncontrolledToControlled = true;
   }
   if (node._wrapperState.controlled && !_controlled && !didWarnControlledToUncontrolled) {
     warning_1(false, 'A component is changing a controlled input of type %s to be uncontrolled. ' + 'Input elements should not switch from controlled to uncontrolled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s', props.type, getCurrentFiberStackAddendum());
     didWarnControlledToUncontrolled = true;
   }
 }

 updateChecked(element, props);

 var value = getSafeValue(props.value);

 if (value != null) {
   if (props.type === 'number') {
     if (value === 0 && node.value === '' ||
     // eslint-disable-next-line
     node.value != value) {
       node.value = '' + value;
     }
   } else if (node.value !== '' + value) {
     node.value = '' + value;
   }
 }

 if (props.hasOwnProperty('value')) {
   setDefaultValue(node, props.type, value);
 } else if (props.hasOwnProperty('defaultValue')) {
   setDefaultValue(node, props.type, getSafeValue(props.defaultValue));
 }

 if (props.checked == null && props.defaultChecked != null) {
   node.defaultChecked = !!props.defaultChecked;
 }
}

function postMountWrapper(element, props, isHydrating) {
 var node = element;

 if (props.hasOwnProperty('value') || props.hasOwnProperty('defaultValue')) {
   var _initialValue = '' + node._wrapperState.initialValue;
   var currentValue = node.value;

   // Do not assign value if it is already set. This prevents user text input
   // from being lost during SSR hydration.
   if (!isHydrating) {
     // Do not re-assign the value property if there is no change. This
     // potentially avoids a DOM write and prevents Firefox (~60.0.1) from
     // prematurely marking required inputs as invalid
     if (_initialValue !== currentValue) {
       node.value = _initialValue;
     }
   }

   // value must be assigned before defaultValue. This fixes an issue where the
   // visually displayed value of date inputs disappears on mobile Safari and Chrome:
   // https://github.com/facebook/react/issues/7233
   node.defaultValue = _initialValue;
 }

 // Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
 // this is needed to work around a chrome bug where setting defaultChecked
 // will sometimes influence the value of checked (even after detachment).
 // Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
 // We need to temporarily unset name to avoid disrupting radio button groups.
 var name = node.name;
 if (name !== '') {
   node.name = '';
 }
 node.defaultChecked = !node.defaultChecked;
 node.defaultChecked = !node.defaultChecked;
 if (name !== '') {
   node.name = name;
 }
}

function restoreControlledState(element, props) {
 var node = element;
 updateWrapper(node, props);
 updateNamedCousins(node, props);
}

function updateNamedCousins(rootNode, props) {
 var name = props.name;
 if (props.type === 'radio' && name != null) {
   var queryRoot = rootNode;

   while (queryRoot.parentNode) {
     queryRoot = queryRoot.parentNode;
   }

   // If `rootNode.form` was non-null, then we could try `form.elements`,
   // but that sometimes behaves strangely in IE8. We could also try using
   // `form.getElementsByName`, but that will only return direct children
   // and won't include inputs that use the HTML5 `form=` attribute. Since
   // the input might not even be in a form. It might not even be in the
   // document. Let's just use the local `querySelectorAll` to ensure we don't
   // miss anything.
   var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');

   for (var i = 0; i < group.length; i++) {
     var otherNode = group[i];
     if (otherNode === rootNode || otherNode.form !== rootNode.form) {
       continue;
     }
     // This will throw if radio buttons rendered by different copies of React
     // and the same name are rendered into the same form (same as #1939).
     // That's probably okay; we don't support it just as we don't support
     // mixing React radio buttons with non-React ones.
     var otherProps = getFiberCurrentPropsFromNode$1(otherNode);
     !otherProps ? invariant_1(false, 'ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.') : void 0;

     // We need update the tracked value on the named cousin since the value
     // was changed but the input saw no event or value set
     updateValueIfChanged(otherNode);

     // If this is a controlled radio button group, forcing the input that
     // was previously checked to update will cause it to be come re-checked
     // as appropriate.
     updateWrapper(otherNode, otherProps);
   }
 }
}

// In Chrome, assigning defaultValue to certain input types triggers input validation.
// For number inputs, the display value loses trailing decimal points. For email inputs,
// Chrome raises "The specified value <x> is not a valid email address".
//
// Here we check to see if the defaultValue has actually changed, avoiding these problems
// when the user is inputting text
//
// https://github.com/facebook/react/issues/7253
function setDefaultValue(node, type, value) {
 if (
 // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
 type !== 'number' || node.ownerDocument.activeElement !== node) {
   if (value == null) {
     node.defaultValue = '' + node._wrapperState.initialValue;
   } else if (node.defaultValue !== '' + value) {
     node.defaultValue = '' + value;
   }
 }
}

function getSafeValue(value) {
 switch (typeof value) {
   case 'boolean':
   case 'number':
   case 'object':
   case 'string':
   case 'undefined':
     return value;
   default:
     // function, symbol are assigned as empty strings
     return '';
 }
}

var eventTypes$1 = {
 change: {
   phasedRegistrationNames: {
     bubbled: 'onChange',
     captured: 'onChangeCapture'
   },
   dependencies: [TOP_BLUR, TOP_CHANGE, TOP_CLICK, TOP_FOCUS, TOP_INPUT, TOP_KEY_DOWN, TOP_KEY_UP, TOP_SELECTION_CHANGE]
 }
};

function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
 var event = SyntheticEvent$1.getPooled(eventTypes$1.change, inst, nativeEvent, target);
 event.type = 'change';
 // Flag this event loop as needing state restore.
 enqueueStateRestore(target);
 accumulateTwoPhaseDispatches(event);
 return event;
}
/**
* For IE shims
*/
var activeElement = null;
var activeElementInst = null;

/**
* SECTION: handle `change` event
*/
function shouldUseChangeEvent(elem) {
 var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
 return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
}

function manualDispatchChangeEvent(nativeEvent) {
 var event = createAndAccumulateChangeEvent(activeElementInst, nativeEvent, getEventTarget(nativeEvent));

 // If change and propertychange bubbled, we'd just bind to it like all the
 // other events and have it go through ReactBrowserEventEmitter. Since it
 // doesn't, we manually listen for the events and so we have to enqueue and
 // process the abstract event manually.
 //
 // Batching is necessary here in order to ensure that all event handlers run
 // before the next rerender (including event handlers attached to ancestor
 // elements instead of directly on the input). Without this, controlled
 // components don't work properly in conjunction with event bubbling because
 // the component is rerendered and the value reverted before all the event
 // handlers can run. See https://github.com/facebook/react/issues/708.
 batchedUpdates(runEventInBatch, event);
}

function runEventInBatch(event) {
 runEventsInBatch(event, false);
}

function getInstIfValueChanged(targetInst) {
 var targetNode = getNodeFromInstance$1(targetInst);
 if (updateValueIfChanged(targetNode)) {
   return targetInst;
 }
}

function getTargetInstForChangeEvent(topLevelType, targetInst) {
 if (topLevelType === TOP_CHANGE) {
   return targetInst;
 }
}

/**
* SECTION: handle `input` event
*/
var isInputEventSupported = false;
if (ExecutionEnvironment_1.canUseDOM) {
 // IE9 claims to support the input event but fails to trigger it when
 // deleting text, so we ignore its input events.
 isInputEventSupported = isEventSupported('input') && (!document.documentMode || document.documentMode > 9);
}

/**
* (For IE <=9) Starts tracking propertychange events on the passed-in element
* and override the value property so that we can distinguish user events from
* value changes in JS.
*/
function startWatchingForValueChange(target, targetInst) {
 activeElement = target;
 activeElementInst = targetInst;
 activeElement.attachEvent('onpropertychange', handlePropertyChange);
}

/**
* (For IE <=9) Removes the event listeners from the currently-tracked element,
* if any exists.
*/
function stopWatchingForValueChange() {
 if (!activeElement) {
   return;
 }
 activeElement.detachEvent('onpropertychange', handlePropertyChange);
 activeElement = null;
 activeElementInst = null;
}

/**
* (For IE <=9) Handles a propertychange event, sending a `change` event if
* the value of the active element has changed.
*/
function handlePropertyChange(nativeEvent) {
 if (nativeEvent.propertyName !== 'value') {
   return;
 }
 if (getInstIfValueChanged(activeElementInst)) {
   manualDispatchChangeEvent(nativeEvent);
 }
}

function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
 if (topLevelType === TOP_FOCUS) {
   // In IE9, propertychange fires for most input events but is buggy and
   // doesn't fire when text is deleted, but conveniently, selectionchange
   // appears to fire in all of the remaining cases so we catch those and
   // forward the event if the value has changed
   // In either case, we don't want to call the event handler if the value
   // is changed from JS so we redefine a setter for `.value` that updates
   // our activeElementValue variable, allowing us to ignore those changes
   //
   // stopWatching() should be a noop here but we call it just in case we
   // missed a blur event somehow.
   stopWatchingForValueChange();
   startWatchingForValueChange(target, targetInst);
 } else if (topLevelType === TOP_BLUR) {
   stopWatchingForValueChange();
 }
}

// For IE8 and IE9.
function getTargetInstForInputEventPolyfill(topLevelType, targetInst) {
 if (topLevelType === TOP_SELECTION_CHANGE || topLevelType === TOP_KEY_UP || topLevelType === TOP_KEY_DOWN) {
   // On the selectionchange event, the target is just document which isn't
   // helpful for us so just check activeElement instead.
   //
   // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
   // propertychange on the first input event after setting `value` from a
   // script and fires only keydown, keypress, keyup. Catching keyup usually
   // gets it and catching keydown lets us fire an event for the first
   // keystroke if user does a key repeat (it'll be a little delayed: right
   // before the second keystroke). Other input methods (e.g., paste) seem to
   // fire selectionchange normally.
   return getInstIfValueChanged(activeElementInst);
 }
}

/**
* SECTION: handle `click` event
*/
function shouldUseClickEvent(elem) {
 // Use the `click` event to detect changes to checkbox and radio inputs.
 // This approach works across all browsers, whereas `change` does not fire
 // until `blur` in IE8.
 var nodeName = elem.nodeName;
 return nodeName && nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
}

function getTargetInstForClickEvent(topLevelType, targetInst) {
 if (topLevelType === TOP_CLICK) {
   return getInstIfValueChanged(targetInst);
 }
}

function getTargetInstForInputOrChangeEvent(topLevelType, targetInst) {
 if (topLevelType === TOP_INPUT || topLevelType === TOP_CHANGE) {
   return getInstIfValueChanged(targetInst);
 }
}

function handleControlledInputBlur(node) {
 var state = node._wrapperState;

 if (!state || !state.controlled || node.type !== 'number') {
   return;
 }

 // If controlled, assign the value attribute to the current value on blur
 setDefaultValue(node, 'number', node.value);
}

/**
* This plugin creates an `onChange` event that normalizes change events
* across form elements. This event fires at a time when it's possible to
* change the element's value without seeing a flicker.
*
* Supported elements are:
* - input (see `isTextInputElement`)
* - textarea
* - select
*/
var ChangeEventPlugin = {
 eventTypes: eventTypes$1,

 _isInputEventSupported: isInputEventSupported,

 extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
   var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window;

   var getTargetInstFunc = void 0,
       handleEventFunc = void 0;
   if (shouldUseChangeEvent(targetNode)) {
     getTargetInstFunc = getTargetInstForChangeEvent;
   } else if (isTextInputElement(targetNode)) {
     if (isInputEventSupported) {
       getTargetInstFunc = getTargetInstForInputOrChangeEvent;
     } else {
       getTargetInstFunc = getTargetInstForInputEventPolyfill;
       handleEventFunc = handleEventsForInputEventPolyfill;
     }
   } else if (shouldUseClickEvent(targetNode)) {
     getTargetInstFunc = getTargetInstForClickEvent;
   }

   if (getTargetInstFunc) {
     var inst = getTargetInstFunc(topLevelType, targetInst);
     if (inst) {
       var event = createAndAccumulateChangeEvent(inst, nativeEvent, nativeEventTarget);
       return event;
     }
   }

   if (handleEventFunc) {
     handleEventFunc(topLevelType, targetNode, targetInst);
   }

   // When blurring, set the value attribute for number inputs
   if (topLevelType === TOP_BLUR) {
     handleControlledInputBlur(targetNode);
   }
 }
};

/**
* Module that is injectable into `EventPluginHub`, that specifies a
* deterministic ordering of `EventPlugin`s. A convenient way to reason about
* plugins, without having to package every one of them. This is better than
* having plugins be ordered in the same order that they are injected because
* that ordering would be influenced by the packaging order.
* `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
* preventing default on events is convenient in `SimpleEventPlugin` handlers.
*/
var DOMEventPluginOrder = ['ResponderEventPlugin', 'SimpleEventPlugin', 'TapEventPlugin', 'EnterLeaveEventPlugin', 'ChangeEventPlugin', 'SelectEventPlugin', 'BeforeInputEventPlugin'];

var SyntheticUIEvent = SyntheticEvent$1.extend({
 view: null,
 detail: null
});

/**
* Translation from modifier key to the associated property in the event.
* @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
*/

var modifierKeyToProp = {
 Alt: 'altKey',
 Control: 'ctrlKey',
 Meta: 'metaKey',
 Shift: 'shiftKey'
};

// IE8 does not implement getModifierState so we simply map it to the only
// modifier keys exposed by the event itself, does not support Lock-keys.
// Currently, all major browsers except Chrome seems to support Lock-keys.
function modifierStateGetter(keyArg) {
 var syntheticEvent = this;
 var nativeEvent = syntheticEvent.nativeEvent;
 if (nativeEvent.getModifierState) {
   return nativeEvent.getModifierState(keyArg);
 }
 var keyProp = modifierKeyToProp[keyArg];
 return keyProp ? !!nativeEvent[keyProp] : false;
}

function getEventModifierState(nativeEvent) {
 return modifierStateGetter;
}

/**
* @interface MouseEvent
* @see http://www.w3.org/TR/DOM-Level-3-Events/
*/
var SyntheticMouseEvent = SyntheticUIEvent.extend({
 screenX: null,
 screenY: null,
 clientX: null,
 clientY: null,
 pageX: null,
 pageY: null,
 ctrlKey: null,
 shiftKey: null,
 altKey: null,
 metaKey: null,
 getModifierState: getEventModifierState,
 button: null,
 buttons: null,
 relatedTarget: function (event) {
   return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
 }
});

/**
* @interface PointerEvent
* @see http://www.w3.org/TR/pointerevents/
*/
var SyntheticPointerEvent = SyntheticMouseEvent.extend({
 pointerId: null,
 width: null,
 height: null,
 pressure: null,
 tiltX: null,
 tiltY: null,
 pointerType: null,
 isPrimary: null
});

var eventTypes$2 = {
 mouseEnter: {
   registrationName: 'onMouseEnter',
   dependencies: [TOP_MOUSE_OUT, TOP_MOUSE_OVER]
 },
 mouseLeave: {
   registrationName: 'onMouseLeave',
   dependencies: [TOP_MOUSE_OUT, TOP_MOUSE_OVER]
 },
 pointerEnter: {
   registrationName: 'onPointerEnter',
   dependencies: [TOP_POINTER_OUT, TOP_POINTER_OVER]
 },
 pointerLeave: {
   registrationName: 'onPointerLeave',
   dependencies: [TOP_POINTER_OUT, TOP_POINTER_OVER]
 }
};

var EnterLeaveEventPlugin = {
 eventTypes: eventTypes$2,

 /**
  * For almost every interaction we care about, there will be both a top-level
  * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
  * we do not extract duplicate events. However, moving the mouse into the
  * browser from outside will not fire a `mouseout` event. In this case, we use
  * the `mouseover` top-level event.
  */
 extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
   var isOverEvent = topLevelType === TOP_MOUSE_OVER || topLevelType === TOP_POINTER_OVER;
   var isOutEvent = topLevelType === TOP_MOUSE_OUT || topLevelType === TOP_POINTER_OUT;

   if (isOverEvent && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
     return null;
   }

   if (!isOutEvent && !isOverEvent) {
     // Must not be a mouse or pointer in or out - ignoring.
     return null;
   }

   var win = void 0;
   if (nativeEventTarget.window === nativeEventTarget) {
     // `nativeEventTarget` is probably a window object.
     win = nativeEventTarget;
   } else {
     // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
     var doc = nativeEventTarget.ownerDocument;
     if (doc) {
       win = doc.defaultView || doc.parentWindow;
     } else {
       win = window;
     }
   }

   var from = void 0;
   var to = void 0;
   if (isOutEvent) {
     from = targetInst;
     var related = nativeEvent.relatedTarget || nativeEvent.toElement;
     to = related ? getClosestInstanceFromNode(related) : null;
   } else {
     // Moving to a node from outside the window.
     from = null;
     to = targetInst;
   }

   if (from === to) {
     // Nothing pertains to our managed components.
     return null;
   }

   var eventInterface = void 0,
       leaveEventType = void 0,
       enterEventType = void 0,
       eventTypePrefix = void 0;

   if (topLevelType === TOP_MOUSE_OUT || topLevelType === TOP_MOUSE_OVER) {
     eventInterface = SyntheticMouseEvent;
     leaveEventType = eventTypes$2.mouseLeave;
     enterEventType = eventTypes$2.mouseEnter;
     eventTypePrefix = 'mouse';
   } else if (topLevelType === TOP_POINTER_OUT || topLevelType === TOP_POINTER_OVER) {
     eventInterface = SyntheticPointerEvent;
     leaveEventType = eventTypes$2.pointerLeave;
     enterEventType = eventTypes$2.pointerEnter;
     eventTypePrefix = 'pointer';
   }

   var fromNode = from == null ? win : getNodeFromInstance$1(from);
   var toNode = to == null ? win : getNodeFromInstance$1(to);

   var leave = eventInterface.getPooled(leaveEventType, from, nativeEvent, nativeEventTarget);
   leave.type = eventTypePrefix + 'leave';
   leave.target = fromNode;
   leave.relatedTarget = toNode;

   var enter = eventInterface.getPooled(enterEventType, to, nativeEvent, nativeEventTarget);
   enter.type = eventTypePrefix + 'enter';
   enter.target = toNode;
   enter.relatedTarget = fromNode;

   accumulateEnterLeaveDispatches(leave, enter, from, to);

   return [leave, enter];
 }
};

/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
* @typechecks
*/

/* eslint-disable fb-www/typeof-undefined */

/**
* Same as document.activeElement but wraps in a try-catch block. In IE it is
* not safe to call document.activeElement if there is nothing focused.
*
* The activeElement will be null only if the document or document body is not
* yet defined.
*
* @param {?DOMDocument} doc Defaults to current document.
* @return {?DOMElement}
*/
function getActiveElement(doc) /*?DOMElement*/{
 doc = doc || (typeof document !== 'undefined' ? document : undefined);
 if (typeof doc === 'undefined') {
   return null;
 }
 try {
   return doc.activeElement || doc.body;
 } catch (e) {
   return doc.body;
 }
}

var getActiveElement_1 = getActiveElement;

/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
* @typechecks
* 
*/

/*eslint-disable no-self-compare */



var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

/**
* inlined Object.is polyfill to avoid requiring consumers ship their own
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
*/
function is(x, y) {
 // SameValue algorithm
 if (x === y) {
   // Steps 1-5, 7-10
   // Steps 6.b-6.e: +0 != -0
   // Added the nonzero y check to make Flow happy, but it is redundant
   return x !== 0 || y !== 0 || 1 / x === 1 / y;
 } else {
   // Step 6.a: NaN == NaN
   return x !== x && y !== y;
 }
}

/**
* Performs equality by iterating through keys on an object and returning false
* when any key has values which are not strictly equal between the arguments.
* Returns true when the values of all keys are strictly equal.
*/
function shallowEqual(objA, objB) {
 if (is(objA, objB)) {
   return true;
 }

 if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
   return false;
 }

 var keysA = Object.keys(objA);
 var keysB = Object.keys(objB);

 if (keysA.length !== keysB.length) {
   return false;
 }

 // Test for A's keys different from B.
 for (var i = 0; i < keysA.length; i++) {
   if (!hasOwnProperty$1.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
     return false;
   }
 }

 return true;
}

var shallowEqual_1 = shallowEqual;

/**
* `ReactInstanceMap` maintains a mapping from a public facing stateful
* instance (key) and the internal representation (value). This allows public
* methods to accept the user facing instance as an argument and map them back
* to internal methods.
*
* Note that this module is currently shared and assumed to be stateless.
* If this becomes an actual Map, that will break.
*/

/**
* This API should be called `delete` but we'd have to make sure to always
* transform these to strings for IE support. When this transform is fully
* supported we can rename it.
*/


function get(key) {
 return key._reactInternalFiber;
}

function has(key) {
 return key._reactInternalFiber !== undefined;
}

function set(key, value) {
 key._reactInternalFiber = value;
}

// Don't change these two values. They're used by React Dev Tools.
var NoEffect = /*              */0;
var PerformedWork = /*         */1;

// You can change the rest (and add more).
var Placement = /*             */2;
var Update = /*                */4;
var PlacementAndUpdate = /*    */6;
var Deletion = /*              */8;
var ContentReset = /*          */16;
var Callback = /*              */32;
var DidCapture = /*            */64;
var Ref = /*                   */128;
var Snapshot = /*              */256;

// Union of all host effects
var HostEffectMask = /*        */511;

var Incomplete = /*            */512;
var ShouldCapture = /*         */1024;

var MOUNTING = 1;
var MOUNTED = 2;
var UNMOUNTED = 3;

function isFiberMountedImpl(fiber) {
 var node = fiber;
 if (!fiber.alternate) {
   // If there is no alternate, this might be a new tree that isn't inserted
   // yet. If it is, then it will have a pending insertion effect on it.
   if ((node.effectTag & Placement) !== NoEffect) {
     return MOUNTING;
   }
   while (node.return) {
     node = node.return;
     if ((node.effectTag & Placement) !== NoEffect) {
       return MOUNTING;
     }
   }
 } else {
   while (node.return) {
     node = node.return;
   }
 }
 if (node.tag === HostRoot) {
   // TODO: Check if this was a nested HostRoot when used with
   // renderContainerIntoSubtree.
   return MOUNTED;
 }
 // If we didn't hit the root, that means that we're in an disconnected tree
 // that has been unmounted.
 return UNMOUNTED;
}

function isFiberMounted(fiber) {
 return isFiberMountedImpl(fiber) === MOUNTED;
}

function isMounted(component) {
 {
   var owner = ReactCurrentOwner.current;
   if (owner !== null && owner.tag === ClassComponent) {
     var ownerFiber = owner;
     var instance = ownerFiber.stateNode;
     !instance._warnedAboutRefsInRender ? warning_1(false, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', getComponentName(ownerFiber) || 'A component') : void 0;
     instance._warnedAboutRefsInRender = true;
   }
 }

 var fiber = get(component);
 if (!fiber) {
   return false;
 }
 return isFiberMountedImpl(fiber) === MOUNTED;
}

function assertIsMounted(fiber) {
 !(isFiberMountedImpl(fiber) === MOUNTED) ? invariant_1(false, 'Unable to find node on an unmounted component.') : void 0;
}

function findCurrentFiberUsingSlowPath(fiber) {
 var alternate = fiber.alternate;
 if (!alternate) {
   // If there is no alternate, then we only need to check if it is mounted.
   var state = isFiberMountedImpl(fiber);
   !(state !== UNMOUNTED) ? invariant_1(false, 'Unable to find node on an unmounted component.') : void 0;
   if (state === MOUNTING) {
     return null;
   }
   return fiber;
 }
 // If we have two possible branches, we'll walk backwards up to the root
 // to see what path the root points to. On the way we may hit one of the
 // special cases and we'll deal with them.
 var a = fiber;
 var b = alternate;
 while (true) {
   var parentA = a.return;
   var parentB = parentA ? parentA.alternate : null;
   if (!parentA || !parentB) {
     // We're at the root.
     break;
   }

   // If both copies of the parent fiber point to the same child, we can
   // assume that the child is current. This happens when we bailout on low
   // priority: the bailed out fiber's child reuses the current child.
   if (parentA.child === parentB.child) {
     var child = parentA.child;
     while (child) {
       if (child === a) {
         // We've determined that A is the current branch.
         assertIsMounted(parentA);
         return fiber;
       }
       if (child === b) {
         // We've determined that B is the current branch.
         assertIsMounted(parentA);
         return alternate;
       }
       child = child.sibling;
     }
     // We should never have an alternate for any mounting node. So the only
     // way this could possibly happen is if this was unmounted, if at all.
     invariant_1(false, 'Unable to find node on an unmounted component.');
   }

   if (a.return !== b.return) {
     // The return pointer of A and the return pointer of B point to different
     // fibers. We assume that return pointers never criss-cross, so A must
     // belong to the child set of A.return, and B must belong to the child
     // set of B.return.
     a = parentA;
     b = parentB;
   } else {
     // The return pointers point to the same fiber. We'll have to use the
     // default, slow path: scan the child sets of each parent alternate to see
     // which child belongs to which set.
     //
     // Search parent A's child set
     var didFindChild = false;
     var _child = parentA.child;
     while (_child) {
       if (_child === a) {
         didFindChild = true;
         a = parentA;
         b = parentB;
         break;
       }
       if (_child === b) {
         didFindChild = true;
         b = parentA;
         a = parentB;
         break;
       }
       _child = _child.sibling;
     }
     if (!didFindChild) {
       // Search parent B's child set
       _child = parentB.child;
       while (_child) {
         if (_child === a) {
           didFindChild = true;
           a = parentB;
           b = parentA;
           break;
         }
         if (_child === b) {
           didFindChild = true;
           b = parentB;
           a = parentA;
           break;
         }
         _child = _child.sibling;
       }
       !didFindChild ? invariant_1(false, 'Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.') : void 0;
     }
   }

   !(a.alternate === b) ? invariant_1(false, 'Return fibers should always be each others\' alternates. This error is likely caused by a bug in React. Please file an issue.') : void 0;
 }
 // If the root is not a host container, we're in a disconnected tree. I.e.
 // unmounted.
 !(a.tag === HostRoot) ? invariant_1(false, 'Unable to find node on an unmounted component.') : void 0;
 if (a.stateNode.current === a) {
   // We've determined that A is the current branch.
   return fiber;
 }
 // Otherwise B has to be current branch.
 return alternate;
}

function findCurrentHostFiber(parent) {
 var currentParent = findCurrentFiberUsingSlowPath(parent);
 if (!currentParent) {
   return null;
 }

 // Next we'll drill down this component to find the first HostComponent/Text.
 var node = currentParent;
 while (true) {
   if (node.tag === HostComponent || node.tag === HostText) {
     return node;
   } else if (node.child) {
     node.child.return = node;
     node = node.child;
     continue;
   }
   if (node === currentParent) {
     return null;
   }
   while (!node.sibling) {
     if (!node.return || node.return === currentParent) {
       return null;
     }
     node = node.return;
   }
   node.sibling.return = node.return;
   node = node.sibling;
 }
 // Flow needs the return null here, but ESLint complains about it.
 // eslint-disable-next-line no-unreachable
 return null;
}

function findCurrentHostFiberWithNoPortals(parent) {
 var currentParent = findCurrentFiberUsingSlowPath(parent);
 if (!currentParent) {
   return null;
 }

 // Next we'll drill down this component to find the first HostComponent/Text.
 var node = currentParent;
 while (true) {
   if (node.tag === HostComponent || node.tag === HostText) {
     return node;
   } else if (node.child && node.tag !== HostPortal) {
     node.child.return = node;
     node = node.child;
     continue;
   }
   if (node === currentParent) {
     return null;
   }
   while (!node.sibling) {
     if (!node.return || node.return === currentParent) {
       return null;
     }
     node = node.return;
   }
   node.sibling.return = node.return;
   node = node.sibling;
 }
 // Flow needs the return null here, but ESLint complains about it.
 // eslint-disable-next-line no-unreachable
 return null;
}

function addEventBubbleListener(element, eventType, listener) {
 element.addEventListener(eventType, listener, false);
}

function addEventCaptureListener(element, eventType, listener) {
 element.addEventListener(eventType, listener, true);
}

/**
* @interface Event
* @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
* @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
*/
var SyntheticAnimationEvent = SyntheticEvent$1.extend({
 animationName: null,
 elapsedTime: null,
 pseudoElement: null
});

/**
* @interface Event
* @see http://www.w3.org/TR/clipboard-apis/
*/
var SyntheticClipboardEvent = SyntheticEvent$1.extend({
 clipboardData: function (event) {
   return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
 }
});

/**
* @interface FocusEvent
* @see http://www.w3.org/TR/DOM-Level-3-Events/
*/
var SyntheticFocusEvent = SyntheticUIEvent.extend({
 relatedTarget: null
});

/**
* `charCode` represents the actual "character code" and is safe to use with
* `String.fromCharCode`. As such, only keys that correspond to printable
* characters produce a valid `charCode`, the only exception to this is Enter.
* The Tab-key is considered non-printable and does not have a `charCode`,
* presumably because it does not produce a tab-character in browsers.
*
* @param {object} nativeEvent Native browser event.
* @return {number} Normalized `charCode` property.
*/
function getEventCharCode(nativeEvent) {
 var charCode = void 0;
 var keyCode = nativeEvent.keyCode;

 if ('charCode' in nativeEvent) {
   charCode = nativeEvent.charCode;

   // FF does not set `charCode` for the Enter-key, check against `keyCode`.
   if (charCode === 0 && keyCode === 13) {
     charCode = 13;
   }
 } else {
   // IE8 does not implement `charCode`, but `keyCode` has the correct value.
   charCode = keyCode;
 }

 // IE and Edge (on Windows) and Chrome / Safari (on Windows and Linux)
 // report Enter as charCode 10 when ctrl is pressed.
 if (charCode === 10) {
   charCode = 13;
 }

 // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
 // Must not discard the (non-)printable Enter-key.
 if (charCode >= 32 || charCode === 13) {
   return charCode;
 }

 return 0;
}

/**
* Normalization of deprecated HTML5 `key` values
* @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
*/
var normalizeKey = {
 Esc: 'Escape',
 Spacebar: ' ',
 Left: 'ArrowLeft',
 Up: 'ArrowUp',
 Right: 'ArrowRight',
 Down: 'ArrowDown',
 Del: 'Delete',
 Win: 'OS',
 Menu: 'ContextMenu',
 Apps: 'ContextMenu',
 Scroll: 'ScrollLock',
 MozPrintableKey: 'Unidentified'
};

/**
* Translation from legacy `keyCode` to HTML5 `key`
* Only special keys supported, all others depend on keyboard layout or browser
* @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
*/
var translateToKey = {
 '8': 'Backspace',
 '9': 'Tab',
 '12': 'Clear',
 '13': 'Enter',
 '16': 'Shift',
 '17': 'Control',
 '18': 'Alt',
 '19': 'Pause',
 '20': 'CapsLock',
 '27': 'Escape',
 '32': ' ',
 '33': 'PageUp',
 '34': 'PageDown',
 '35': 'End',
 '36': 'Home',
 '37': 'ArrowLeft',
 '38': 'ArrowUp',
 '39': 'ArrowRight',
 '40': 'ArrowDown',
 '45': 'Insert',
 '46': 'Delete',
 '112': 'F1',
 '113': 'F2',
 '114': 'F3',
 '115': 'F4',
 '116': 'F5',
 '117': 'F6',
 '118': 'F7',
 '119': 'F8',
 '120': 'F9',
 '121': 'F10',
 '122': 'F11',
 '123': 'F12',
 '144': 'NumLock',
 '145': 'ScrollLock',
 '224': 'Meta'
};

/**
* @param {object} nativeEvent Native browser event.
* @return {string} Normalized `key` property.
*/
function getEventKey(nativeEvent) {
 if (nativeEvent.key) {
   // Normalize inconsistent values reported by browsers due to
   // implementations of a working draft specification.

   // FireFox implements `key` but returns `MozPrintableKey` for all
   // printable characters (normalized to `Unidentified`), ignore it.
   var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
   if (key !== 'Unidentified') {
     return key;
   }
 }

 // Browser does not implement `key`, polyfill as much of it as we can.
 if (nativeEvent.type === 'keypress') {
   var charCode = getEventCharCode(nativeEvent);

   // The enter-key is technically both printable and non-printable and can
   // thus be captured by `keypress`, no other non-printable key should.
   return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
 }
 if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
   // While user keyboard layout determines the actual meaning of each
   // `keyCode` value, almost all function keys have a universal value.
   return translateToKey[nativeEvent.keyCode] || 'Unidentified';
 }
 return '';
}

/**
* @interface KeyboardEvent
* @see http://www.w3.org/TR/DOM-Level-3-Events/
*/
var SyntheticKeyboardEvent = SyntheticUIEvent.extend({
 key: getEventKey,
 location: null,
 ctrlKey: null,
 shiftKey: null,
 altKey: null,
 metaKey: null,
 repeat: null,
 locale: null,
 getModifierState: getEventModifierState,
 // Legacy Interface
 charCode: function (event) {
   // `charCode` is the result of a KeyPress event and represents the value of
   // the actual printable character.

   // KeyPress is deprecated, but its replacement is not yet final and not
   // implemented in any major browser. Only KeyPress has charCode.
   if (event.type === 'keypress') {
     return getEventCharCode(event);
   }
   return 0;
 },
 keyCode: function (event) {
   // `keyCode` is the result of a KeyDown/Up event and represents the value of
   // physical keyboard key.

   // The actual meaning of the value depends on the users' keyboard layout
   // which cannot be detected. Assuming that it is a US keyboard layout
   // provides a surprisingly accurate mapping for US and European users.
   // Due to this, it is left to the user to implement at this time.
   if (event.type === 'keydown' || event.type === 'keyup') {
     return event.keyCode;
   }
   return 0;
 },
 which: function (event) {
   // `which` is an alias for either `keyCode` or `charCode` depending on the
   // type of the event.
   if (event.type === 'keypress') {
     return getEventCharCode(event);
   }
   if (event.type === 'keydown' || event.type === 'keyup') {
     return event.keyCode;
   }
   return 0;
 }
});

/**
* @interface DragEvent
* @see http://www.w3.org/TR/DOM-Level-3-Events/
*/
var SyntheticDragEvent = SyntheticMouseEvent.extend({
 dataTransfer: null
});

/**
* @interface TouchEvent
* @see http://www.w3.org/TR/touch-events/
*/
var SyntheticTouchEvent = SyntheticUIEvent.extend({
 touches: null,
 targetTouches: null,
 changedTouches: null,
 altKey: null,
 metaKey: null,
 ctrlKey: null,
 shiftKey: null,
 getModifierState: getEventModifierState
});

/**
* @interface Event
* @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
* @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
*/
var SyntheticTransitionEvent = SyntheticEvent$1.extend({
 propertyName: null,
 elapsedTime: null,
 pseudoElement: null
});

/**
* @interface WheelEvent
* @see http://www.w3.org/TR/DOM-Level-3-Events/
*/
var SyntheticWheelEvent = SyntheticMouseEvent.extend({
 deltaX: function (event) {
   return 'deltaX' in event ? event.deltaX : // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
   'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
 },
 deltaY: function (event) {
   return 'deltaY' in event ? event.deltaY : // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
   'wheelDeltaY' in event ? -event.wheelDeltaY : // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
   'wheelDelta' in event ? -event.wheelDelta : 0;
 },

 deltaZ: null,

 // Browsers without "deltaMode" is reporting in raw wheel delta where one
 // notch on the scroll is always +/- 120, roughly equivalent to pixels.
 // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
 // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
 deltaMode: null
});

/**
* Turns
* ['abort', ...]
* into
* eventTypes = {
*   'abort': {
*     phasedRegistrationNames: {
*       bubbled: 'onAbort',
*       captured: 'onAbortCapture',
*     },
*     dependencies: [TOP_ABORT],
*   },
*   ...
* };
* topLevelEventsToDispatchConfig = new Map([
*   [TOP_ABORT, { sameConfig }],
* ]);
*/

var interactiveEventTypeNames = [[TOP_BLUR, 'blur'], [TOP_CANCEL, 'cancel'], [TOP_CLICK, 'click'], [TOP_CLOSE, 'close'], [TOP_CONTEXT_MENU, 'contextMenu'], [TOP_COPY, 'copy'], [TOP_CUT, 'cut'], [TOP_DOUBLE_CLICK, 'doubleClick'], [TOP_DRAG_END, 'dragEnd'], [TOP_DRAG_START, 'dragStart'], [TOP_DROP, 'drop'], [TOP_FOCUS, 'focus'], [TOP_INPUT, 'input'], [TOP_INVALID, 'invalid'], [TOP_KEY_DOWN, 'keyDown'], [TOP_KEY_PRESS, 'keyPress'], [TOP_KEY_UP, 'keyUp'], [TOP_MOUSE_DOWN, 'mouseDown'], [TOP_MOUSE_UP, 'mouseUp'], [TOP_PASTE, 'paste'], [TOP_PAUSE, 'pause'], [TOP_PLAY, 'play'], [TOP_POINTER_CANCEL, 'pointerCancel'], [TOP_POINTER_DOWN, 'pointerDown'], [TOP_POINTER_UP, 'pointerUp'], [TOP_RATE_CHANGE, 'rateChange'], [TOP_RESET, 'reset'], [TOP_SEEKED, 'seeked'], [TOP_SUBMIT, 'submit'], [TOP_TOUCH_CANCEL, 'touchCancel'], [TOP_TOUCH_END, 'touchEnd'], [TOP_TOUCH_START, 'touchStart'], [TOP_VOLUME_CHANGE, 'volumeChange']];
var nonInteractiveEventTypeNames = [[TOP_ABORT, 'abort'], [TOP_ANIMATION_END, 'animationEnd'], [TOP_ANIMATION_ITERATION, 'animationIteration'], [TOP_ANIMATION_START, 'animationStart'], [TOP_CAN_PLAY, 'canPlay'], [TOP_CAN_PLAY_THROUGH, 'canPlayThrough'], [TOP_DRAG, 'drag'], [TOP_DRAG_ENTER, 'dragEnter'], [TOP_DRAG_EXIT, 'dragExit'], [TOP_DRAG_LEAVE, 'dragLeave'], [TOP_DRAG_OVER, 'dragOver'], [TOP_DURATION_CHANGE, 'durationChange'], [TOP_EMPTIED, 'emptied'], [TOP_ENCRYPTED, 'encrypted'], [TOP_ENDED, 'ended'], [TOP_ERROR, 'error'], [TOP_GOT_POINTER_CAPTURE, 'gotPointerCapture'], [TOP_LOAD, 'load'], [TOP_LOADED_DATA, 'loadedData'], [TOP_LOADED_METADATA, 'loadedMetadata'], [TOP_LOAD_START, 'loadStart'], [TOP_LOST_POINTER_CAPTURE, 'lostPointerCapture'], [TOP_MOUSE_MOVE, 'mouseMove'], [TOP_MOUSE_OUT, 'mouseOut'], [TOP_MOUSE_OVER, 'mouseOver'], [TOP_PLAYING, 'playing'], [TOP_POINTER_MOVE, 'pointerMove'], [TOP_POINTER_OUT, 'pointerOut'], [TOP_POINTER_OVER, 'pointerOver'], [TOP_PROGRESS, 'progress'], [TOP_SCROLL, 'scroll'], [TOP_SEEKING, 'seeking'], [TOP_STALLED, 'stalled'], [TOP_SUSPEND, 'suspend'], [TOP_TIME_UPDATE, 'timeUpdate'], [TOP_TOGGLE, 'toggle'], [TOP_TOUCH_MOVE, 'touchMove'], [TOP_TRANSITION_END, 'transitionEnd'], [TOP_WAITING, 'waiting'], [TOP_WHEEL, 'wheel']];

var eventTypes$4 = {};
var topLevelEventsToDispatchConfig = {};

function addEventTypeNameToConfig(_ref, isInteractive) {
 var topEvent = _ref[0],
     event = _ref[1];

 var capitalizedEvent = event[0].toUpperCase() + event.slice(1);
 var onEvent = 'on' + capitalizedEvent;

 var type = {
   phasedRegistrationNames: {
     bubbled: onEvent,
     captured: onEvent + 'Capture'
   },
   dependencies: [topEvent],
   isInteractive: isInteractive
 };
 eventTypes$4[event] = type;
 topLevelEventsToDispatchConfig[topEvent] = type;
}

interactiveEventTypeNames.forEach(function (eventTuple) {
 addEventTypeNameToConfig(eventTuple, true);
});
nonInteractiveEventTypeNames.forEach(function (eventTuple) {
 addEventTypeNameToConfig(eventTuple, false);
});

// Only used in DEV for exhaustiveness validation.
var knownHTMLTopLevelTypes = [TOP_ABORT, TOP_CANCEL, TOP_CAN_PLAY, TOP_CAN_PLAY_THROUGH, TOP_CLOSE, TOP_DURATION_CHANGE, TOP_EMPTIED, TOP_ENCRYPTED, TOP_ENDED, TOP_ERROR, TOP_INPUT, TOP_INVALID, TOP_LOAD, TOP_LOADED_DATA, TOP_LOADED_METADATA, TOP_LOAD_START, TOP_PAUSE, TOP_PLAY, TOP_PLAYING, TOP_PROGRESS, TOP_RATE_CHANGE, TOP_RESET, TOP_SEEKED, TOP_SEEKING, TOP_STALLED, TOP_SUBMIT, TOP_SUSPEND, TOP_TIME_UPDATE, TOP_TOGGLE, TOP_VOLUME_CHANGE, TOP_WAITING];

var SimpleEventPlugin = {
 eventTypes: eventTypes$4,

 isInteractiveTopLevelEventType: function (topLevelType) {
   var config = topLevelEventsToDispatchConfig[topLevelType];
   return config !== undefined && config.isInteractive === true;
 },


 extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
   var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
   if (!dispatchConfig) {
     return null;
   }
   var EventConstructor = void 0;
   switch (topLevelType) {
     case TOP_KEY_PRESS:
       // Firefox creates a keypress event for function keys too. This removes
       // the unwanted keypress events. Enter is however both printable and
       // non-printable. One would expect Tab to be as well (but it isn't).
       if (getEventCharCode(nativeEvent) === 0) {
         return null;
       }
     /* falls through */
     case TOP_KEY_DOWN:
     case TOP_KEY_UP:
       EventConstructor = SyntheticKeyboardEvent;
       break;
     case TOP_BLUR:
     case TOP_FOCUS:
       EventConstructor = SyntheticFocusEvent;
       break;
     case TOP_CLICK:
       // Firefox creates a click event on right mouse clicks. This removes the
       // unwanted click events.
       if (nativeEvent.button === 2) {
         return null;
       }
     /* falls through */
     case TOP_DOUBLE_CLICK:
     case TOP_MOUSE_DOWN:
     case TOP_MOUSE_MOVE:
     case TOP_MOUSE_UP:
     // TODO: Disabled elements should not respond to mouse events
     /* falls through */
     case TOP_MOUSE_OUT:
     case TOP_MOUSE_OVER:
     case TOP_CONTEXT_MENU:
       EventConstructor = SyntheticMouseEvent;
       break;
     case TOP_DRAG:
     case TOP_DRAG_END:
     case TOP_DRAG_ENTER:
     case TOP_DRAG_EXIT:
     case TOP_DRAG_LEAVE:
     case TOP_DRAG_OVER:
     case TOP_DRAG_START:
     case TOP_DROP:
       EventConstructor = SyntheticDragEvent;
       break;
     case TOP_TOUCH_CANCEL:
     case TOP_TOUCH_END:
     case TOP_TOUCH_MOVE:
     case TOP_TOUCH_START:
       EventConstructor = SyntheticTouchEvent;
       break;
     case TOP_ANIMATION_END:
     case TOP_ANIMATION_ITERATION:
     case TOP_ANIMATION_START:
       EventConstructor = SyntheticAnimationEvent;
       break;
     case TOP_TRANSITION_END:
       EventConstructor = SyntheticTransitionEvent;
       break;
     case TOP_SCROLL:
       EventConstructor = SyntheticUIEvent;
       break;
     case TOP_WHEEL:
       EventConstructor = SyntheticWheelEvent;
       break;
     case TOP_COPY:
     case TOP_CUT:
     case TOP_PASTE:
       EventConstructor = SyntheticClipboardEvent;
       break;
     case TOP_GOT_POINTER_CAPTURE:
     case TOP_LOST_POINTER_CAPTURE:
     case TOP_POINTER_CANCEL:
     case TOP_POINTER_DOWN:
     case TOP_POINTER_MOVE:
     case TOP_POINTER_OUT:
     case TOP_POINTER_OVER:
     case TOP_POINTER_UP:
       EventConstructor = SyntheticPointerEvent;
       break;
     default:
       {
         if (knownHTMLTopLevelTypes.indexOf(topLevelType) === -1) {
           warning_1(false, 'SimpleEventPlugin: Unhandled event type, `%s`. This warning ' + 'is likely caused by a bug in React. Please file an issue.', topLevelType);
         }
       }
       // HTML Events
       // @see http://www.w3.org/TR/html5/index.html#events-0
       EventConstructor = SyntheticEvent$1;
       break;
   }
   var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
   accumulateTwoPhaseDispatches(event);
   return event;
 }
};

var isInteractiveTopLevelEventType = SimpleEventPlugin.isInteractiveTopLevelEventType;


var CALLBACK_BOOKKEEPING_POOL_SIZE = 10;
var callbackBookkeepingPool = [];

/**
* Find the deepest React component completely containing the root of the
* passed-in instance (for use when entire React trees are nested within each
* other). If React trees are not nested, returns null.
*/
function findRootContainerNode(inst) {
 // TODO: It may be a good idea to cache this to prevent unnecessary DOM
 // traversal, but caching is difficult to do correctly without using a
 // mutation observer to listen for all DOM changes.
 while (inst.return) {
   inst = inst.return;
 }
 if (inst.tag !== HostRoot) {
   // This can happen if we're in a detached tree.
   return null;
 }
 return inst.stateNode.containerInfo;
}

// Used to store ancestor hierarchy in top level callback
function getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst) {
 if (callbackBookkeepingPool.length) {
   var instance = callbackBookkeepingPool.pop();
   instance.topLevelType = topLevelType;
   instance.nativeEvent = nativeEvent;
   instance.targetInst = targetInst;
   return instance;
 }
 return {
   topLevelType: topLevelType,
   nativeEvent: nativeEvent,
   targetInst: targetInst,
   ancestors: []
 };
}

function releaseTopLevelCallbackBookKeeping(instance) {
 instance.topLevelType = null;
 instance.nativeEvent = null;
 instance.targetInst = null;
 instance.ancestors.length = 0;
 if (callbackBookkeepingPool.length < CALLBACK_BOOKKEEPING_POOL_SIZE) {
   callbackBookkeepingPool.push(instance);
 }
}

function handleTopLevel(bookKeeping) {
 var targetInst = bookKeeping.targetInst;

 // Loop through the hierarchy, in case there's any nested components.
 // It's important that we build the array of ancestors before calling any
 // event handlers, because event handlers can modify the DOM, leading to
 // inconsistencies with ReactMount's node cache. See #1105.
 var ancestor = targetInst;
 do {
   if (!ancestor) {
     bookKeeping.ancestors.push(ancestor);
     break;
   }
   var root = findRootContainerNode(ancestor);
   if (!root) {
     break;
   }
   bookKeeping.ancestors.push(ancestor);
   ancestor = getClosestInstanceFromNode(root);
 } while (ancestor);

 for (var i = 0; i < bookKeeping.ancestors.length; i++) {
   targetInst = bookKeeping.ancestors[i];
   runExtractedEventsInBatch(bookKeeping.topLevelType, targetInst, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
 }
}

// TODO: can we stop exporting these?
var _enabled = true;

function setEnabled(enabled) {
 _enabled = !!enabled;
}

function isEnabled() {
 return _enabled;
}

/**
* Traps top-level events by using event bubbling.
*
* @param {number} topLevelType Number from `TopLevelEventTypes`.
* @param {object} element Element on which to attach listener.
* @return {?object} An object with a remove function which will forcefully
*                  remove the listener.
* @internal
*/
function trapBubbledEvent(topLevelType, element) {
 if (!element) {
   return null;
 }
 var dispatch = isInteractiveTopLevelEventType(topLevelType) ? dispatchInteractiveEvent : dispatchEvent;

 addEventBubbleListener(element, getRawEventName(topLevelType),
 // Check if interactive and wrap in interactiveUpdates
 dispatch.bind(null, topLevelType));
}

/**
* Traps a top-level event by using event capturing.
*
* @param {number} topLevelType Number from `TopLevelEventTypes`.
* @param {object} element Element on which to attach listener.
* @return {?object} An object with a remove function which will forcefully
*                  remove the listener.
* @internal
*/
function trapCapturedEvent(topLevelType, element) {
 if (!element) {
   return null;
 }
 var dispatch = isInteractiveTopLevelEventType(topLevelType) ? dispatchInteractiveEvent : dispatchEvent;

 addEventCaptureListener(element, getRawEventName(topLevelType),
 // Check if interactive and wrap in interactiveUpdates
 dispatch.bind(null, topLevelType));
}

function dispatchInteractiveEvent(topLevelType, nativeEvent) {
 interactiveUpdates(dispatchEvent, topLevelType, nativeEvent);
}

function dispatchEvent(topLevelType, nativeEvent) {
 if (!_enabled) {
   return;
 }

 var nativeEventTarget = getEventTarget(nativeEvent);
 var targetInst = getClosestInstanceFromNode(nativeEventTarget);
 if (targetInst !== null && typeof targetInst.tag === 'number' && !isFiberMounted(targetInst)) {
   // If we get an event (ex: img onload) before committing that
   // component's mount, ignore it for now (that is, treat it as if it was an
   // event on a non-React tree). We might also consider queueing events and
   // dispatching them after the mount.
   targetInst = null;
 }

 var bookKeeping = getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst);

 try {
   // Event queue being processed in the same cycle allows
   // `preventDefault`.
   batchedUpdates(handleTopLevel, bookKeeping);
 } finally {
   releaseTopLevelCallbackBookKeeping(bookKeeping);
 }
}

var ReactDOMEventListener = Object.freeze({
 get _enabled () { return _enabled; },
 setEnabled: setEnabled,
 isEnabled: isEnabled,
 trapBubbledEvent: trapBubbledEvent,
 trapCapturedEvent: trapCapturedEvent,
 dispatchEvent: dispatchEvent
});

/**
* Summary of `ReactBrowserEventEmitter` event handling:
*
*  - Top-level delegation is used to trap most native browser events. This
*    may only occur in the main thread and is the responsibility of
*    ReactDOMEventListener, which is injected and can therefore support
*    pluggable event sources. This is the only work that occurs in the main
*    thread.
*
*  - We normalize and de-duplicate events to account for browser quirks. This
*    may be done in the worker thread.
*
*  - Forward these native events (with the associated top-level type used to
*    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
*    to extract any synthetic events.
*
*  - The `EventPluginHub` will then process each event by annotating them with
*    "dispatches", a sequence of listeners and IDs that care about that event.
*
*  - The `EventPluginHub` then dispatches the events.
*
* Overview of React and the event system:
*
* +------------+    .
* |    DOM     |    .
* +------------+    .
*       |           .
*       v           .
* +------------+    .
* | ReactEvent |    .
* |  Listener  |    .
* +------------+    .                         +-----------+
*       |           .               +--------+|SimpleEvent|
*       |           .               |         |Plugin     |
* +-----|------+    .               v         +-----------+
* |     |      |    .    +--------------+                    +------------+
* |     +-----------.--->|EventPluginHub|                    |    Event   |
* |            |    .    |              |     +-----------+  | Propagators|
* | ReactEvent |    .    |              |     |TapEvent   |  |------------|
* |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
* |            |    .    |              |     +-----------+  |  utilities |
* |     +-----------.--->|              |                    +------------+
* |     |      |    .    +--------------+
* +-----|------+    .                ^        +-----------+
*       |           .                |        |Enter/Leave|
*       +           .                +-------+|Plugin     |
* +-------------+   .                         +-----------+
* | application |   .
* |-------------|   .
* |             |   .
* |             |   .
* +-------------+   .
*                   .
*    React Core     .  General Purpose Event Plugin System
*/

var alreadyListeningTo = {};
var reactTopListenersCounter = 0;

/**
* To ensure no conflicts with other potential React instances on the page
*/
var topListenersIDKey = '_reactListenersID' + ('' + Math.random()).slice(2);

function getListeningForDocument(mountAt) {
 // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
 // directly.
 if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
   mountAt[topListenersIDKey] = reactTopListenersCounter++;
   alreadyListeningTo[mountAt[topListenersIDKey]] = {};
 }
 return alreadyListeningTo[mountAt[topListenersIDKey]];
}

/**
* We listen for bubbled touch events on the document object.
*
* Firefox v8.01 (and possibly others) exhibited strange behavior when
* mounting `onmousemove` events at some node that was not the document
* element. The symptoms were that if your mouse is not moving over something
* contained within that mount point (for example on the background) the
* top-level listeners for `onmousemove` won't be called. However, if you
* register the `mousemove` on the document object, then it will of course
* catch all `mousemove`s. This along with iOS quirks, justifies restricting
* top-level listeners to the document object only, at least for these
* movement types of events and possibly all events.
*
* @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
*
* Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
* they bubble to document.
*
* @param {string} registrationName Name of listener (e.g. `onClick`).
* @param {object} mountAt Container where to mount the listener
*/
function listenTo(registrationName, mountAt) {
 var isListening = getListeningForDocument(mountAt);
 var dependencies = registrationNameDependencies[registrationName];

 for (var i = 0; i < dependencies.length; i++) {
   var dependency = dependencies[i];
   if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
     switch (dependency) {
       case TOP_SCROLL:
         trapCapturedEvent(TOP_SCROLL, mountAt);
         break;
       case TOP_FOCUS:
       case TOP_BLUR:
         trapCapturedEvent(TOP_FOCUS, mountAt);
         trapCapturedEvent(TOP_BLUR, mountAt);
         // We set the flag for a single dependency later in this function,
         // but this ensures we mark both as attached rather than just one.
         isListening[TOP_BLUR] = true;
         isListening[TOP_FOCUS] = true;
         break;
       case TOP_CANCEL:
       case TOP_CLOSE:
         if (isEventSupported(getRawEventName(dependency), true)) {
           trapCapturedEvent(dependency, mountAt);
         }
         break;
       case TOP_INVALID:
       case TOP_SUBMIT:
       case TOP_RESET:
         // We listen to them on the target DOM elements.
         // Some of them bubble so we don't want them to fire twice.
         break;
       default:
         // By default, listen on the top level to all non-media events.
         // Media events don't bubble so adding the listener wouldn't do anything.
         var isMediaEvent = mediaEventTypes.indexOf(dependency) !== -1;
         if (!isMediaEvent) {
           trapBubbledEvent(dependency, mountAt);
         }
         break;
     }
     isListening[dependency] = true;
   }
 }
}

function isListeningToAllDependencies(registrationName, mountAt) {
 var isListening = getListeningForDocument(mountAt);
 var dependencies = registrationNameDependencies[registrationName];
 for (var i = 0; i < dependencies.length; i++) {
   var dependency = dependencies[i];
   if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
     return false;
   }
 }
 return true;
}

/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
* @typechecks
*/

/**
* @param {*} object The object to check.
* @return {boolean} Whether or not the object is a DOM node.
*/
function isNode(object) {
 var doc = object ? object.ownerDocument || object : document;
 var defaultView = doc.defaultView || window;
 return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

var isNode_1 = isNode;

/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
* @typechecks
*/



/**
* @param {*} object The object to check.
* @return {boolean} Whether or not the object is a DOM text node.
*/
function isTextNode(object) {
 return isNode_1(object) && object.nodeType == 3;
}

var isTextNode_1 = isTextNode;

/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
* 
*/



/*eslint-disable no-bitwise */

/**
* Checks if a given DOM node contains or is another DOM node.
*/
function containsNode(outerNode, innerNode) {
 if (!outerNode || !innerNode) {
   return false;
 } else if (outerNode === innerNode) {
   return true;
 } else if (isTextNode_1(outerNode)) {
   return false;
 } else if (isTextNode_1(innerNode)) {
   return containsNode(outerNode, innerNode.parentNode);
 } else if ('contains' in outerNode) {
   return outerNode.contains(innerNode);
 } else if (outerNode.compareDocumentPosition) {
   return !!(outerNode.compareDocumentPosition(innerNode) & 16);
 } else {
   return false;
 }
}

var containsNode_1 = containsNode;

/**
* Given any node return the first leaf node without children.
*
* @param {DOMElement|DOMTextNode} node
* @return {DOMElement|DOMTextNode}
*/
function getLeafNode(node) {
 while (node && node.firstChild) {
   node = node.firstChild;
 }
 return node;
}

/**
* Get the next sibling within a container. This will walk up the
* DOM if a node's siblings have been exhausted.
*
* @param {DOMElement|DOMTextNode} node
* @return {?DOMElement|DOMTextNode}
*/
function getSiblingNode(node) {
 while (node) {
   if (node.nextSibling) {
     return node.nextSibling;
   }
   node = node.parentNode;
 }
}

/**
* Get object describing the nodes which contain characters at offset.
*
* @param {DOMElement|DOMTextNode} root
* @param {number} offset
* @return {?object}
*/
function getNodeForCharacterOffset(root, offset) {
 var node = getLeafNode(root);
 var nodeStart = 0;
 var nodeEnd = 0;

 while (node) {
   if (node.nodeType === TEXT_NODE) {
     nodeEnd = nodeStart + node.textContent.length;

     if (nodeStart <= offset && nodeEnd >= offset) {
       return {
         node: node,
         offset: offset - nodeStart
       };
     }

     nodeStart = nodeEnd;
   }

   node = getLeafNode(getSiblingNode(node));
 }
}

/**
* @param {DOMElement} outerNode
* @return {?object}
*/
function getOffsets(outerNode) {
 var selection = window.getSelection && window.getSelection();

 if (!selection || selection.rangeCount === 0) {
   return null;
 }

 var anchorNode = selection.anchorNode,
     anchorOffset = selection.anchorOffset,
     focusNode = selection.focusNode,
     focusOffset = selection.focusOffset;

 // In Firefox, anchorNode and focusNode can be "anonymous divs", e.g. the
 // up/down buttons on an <input type="number">. Anonymous divs do not seem to
 // expose properties, triggering a "Permission denied error" if any of its
 // properties are accessed. The only seemingly possible way to avoid erroring
 // is to access a property that typically works for non-anonymous divs and
 // catch any error that may otherwise arise. See
 // https://bugzilla.mozilla.org/show_bug.cgi?id=208427

 try {
   /* eslint-disable no-unused-expressions */
   anchorNode.nodeType;
   focusNode.nodeType;
   /* eslint-enable no-unused-expressions */
 } catch (e) {
   return null;
 }

 return getModernOffsetsFromPoints(outerNode, anchorNode, anchorOffset, focusNode, focusOffset);
}

/**
* Returns {start, end} where `start` is the character/codepoint index of
* (anchorNode, anchorOffset) within the textContent of `outerNode`, and
* `end` is the index of (focusNode, focusOffset).
*
* Returns null if you pass in garbage input but we should probably just crash.
*
* Exported only for testing.
*/
function getModernOffsetsFromPoints(outerNode, anchorNode, anchorOffset, focusNode, focusOffset) {
 var length = 0;
 var start = -1;
 var end = -1;
 var indexWithinAnchor = 0;
 var indexWithinFocus = 0;
 var node = outerNode;
 var parentNode = null;

 outer: while (true) {
   var next = null;

   while (true) {
     if (node === anchorNode && (anchorOffset === 0 || node.nodeType === TEXT_NODE)) {
       start = length + anchorOffset;
     }
     if (node === focusNode && (focusOffset === 0 || node.nodeType === TEXT_NODE)) {
       end = length + focusOffset;
     }

     if (node.nodeType === TEXT_NODE) {
       length += node.nodeValue.length;
     }

     if ((next = node.firstChild) === null) {
       break;
     }
     // Moving from `node` to its first child `next`.
     parentNode = node;
     node = next;
   }

   while (true) {
     if (node === outerNode) {
       // If `outerNode` has children, this is always the second time visiting
       // it. If it has no children, this is still the first loop, and the only
       // valid selection is anchorNode and focusNode both equal to this node
       // and both offsets 0, in which case we will have handled above.
       break outer;
     }
     if (parentNode === anchorNode && ++indexWithinAnchor === anchorOffset) {
       start = length;
     }
     if (parentNode === focusNode && ++indexWithinFocus === focusOffset) {
       end = length;
     }
     if ((next = node.nextSibling) !== null) {
       break;
     }
     node = parentNode;
     parentNode = node.parentNode;
   }

   // Moving from `node` to its next sibling `next`.
   node = next;
 }

 if (start === -1 || end === -1) {
   // This should never happen. (Would happen if the anchor/focus nodes aren't
   // actually inside the passed-in node.)
   return null;
 }

 return {
   start: start,
   end: end
 };
}

/**
* In modern non-IE browsers, we can support both forward and backward
* selections.
*
* Note: IE10+ supports the Selection object, but it does not support
* the `extend` method, which means that even in modern IE, it's not possible
* to programmatically create a backward selection. Thus, for all IE
* versions, we use the old IE API to create our selections.
*
* @param {DOMElement|DOMTextNode} node
* @param {object} offsets
*/
function setOffsets(node, offsets) {
 if (!window.getSelection) {
   return;
 }

 var selection = window.getSelection();
 var length = node[getTextContentAccessor()].length;
 var start = Math.min(offsets.start, length);
 var end = offsets.end === undefined ? start : Math.min(offsets.end, length);

 // IE 11 uses modern selection, but doesn't support the extend method.
 // Flip backward selections, so we can set with a single range.
 if (!selection.extend && start > end) {
   var temp = end;
   end = start;
   start = temp;
 }

 var startMarker = getNodeForCharacterOffset(node, start);
 var endMarker = getNodeForCharacterOffset(node, end);

 if (startMarker && endMarker) {
   if (selection.rangeCount === 1 && selection.anchorNode === startMarker.node && selection.anchorOffset === startMarker.offset && selection.focusNode === endMarker.node && selection.focusOffset === endMarker.offset) {
     return;
   }
   var range = document.createRange();
   range.setStart(startMarker.node, startMarker.offset);
   selection.removeAllRanges();

   if (start > end) {
     selection.addRange(range);
     selection.extend(endMarker.node, endMarker.offset);
   } else {
     range.setEnd(endMarker.node, endMarker.offset);
     selection.addRange(range);
   }
 }
}

function isInDocument(node) {
 return containsNode_1(document.documentElement, node);
}

/**
* @ReactInputSelection: React input selection module. Based on Selection.js,
* but modified to be suitable for react and has a couple of bug fixes (doesn't
* assume buttons have range selections allowed).
* Input selection module for React.
*/

/**
* @hasSelectionCapabilities: we get the element types that support selection
* from https://html.spec.whatwg.org/#do-not-apply, looking at `selectionStart`
* and `selectionEnd` rows.
*/
function hasSelectionCapabilities(elem) {
 var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
 return nodeName && (nodeName === 'input' && (elem.type === 'text' || elem.type === 'search' || elem.type === 'tel' || elem.type === 'url' || elem.type === 'password') || nodeName === 'textarea' || elem.contentEditable === 'true');
}

function getSelectionInformation() {
 var focusedElem = getActiveElement_1();
 return {
   focusedElem: focusedElem,
   selectionRange: hasSelectionCapabilities(focusedElem) ? getSelection$1(focusedElem) : null
 };
}

/**
* @restoreSelection: If any selection information was potentially lost,
* restore it. This is useful when performing operations that could remove dom
* nodes and place them back in, resulting in focus being lost.
*/
function restoreSelection(priorSelectionInformation) {
 var curFocusedElem = getActiveElement_1();
 var priorFocusedElem = priorSelectionInformation.focusedElem;
 var priorSelectionRange = priorSelectionInformation.selectionRange;
 if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
   if (priorSelectionRange !== null && hasSelectionCapabilities(priorFocusedElem)) {
     setSelection(priorFocusedElem, priorSelectionRange);
   }

   // Focusing a node can change the scroll position, which is undesirable
   var ancestors = [];
   var ancestor = priorFocusedElem;
   while (ancestor = ancestor.parentNode) {
     if (ancestor.nodeType === ELEMENT_NODE) {
       ancestors.push({
         element: ancestor,
         left: ancestor.scrollLeft,
         top: ancestor.scrollTop
       });
     }
   }

   if (typeof priorFocusedElem.focus === 'function') {
     priorFocusedElem.focus();
   }

   for (var i = 0; i < ancestors.length; i++) {
     var info = ancestors[i];
     info.element.scrollLeft = info.left;
     info.element.scrollTop = info.top;
   }
 }
}

/**
* @getSelection: Gets the selection bounds of a focused textarea, input or
* contentEditable node.
* -@input: Look up selection bounds of this input
* -@return {start: selectionStart, end: selectionEnd}
*/
function getSelection$1(input) {
 var selection = void 0;

 if ('selectionStart' in input) {
   // Modern browser with input or textarea.
   selection = {
     start: input.selectionStart,
     end: input.selectionEnd
   };
 } else {
   // Content editable or old IE textarea.
   selection = getOffsets(input);
 }

 return selection || { start: 0, end: 0 };
}

/**
* @setSelection: Sets the selection bounds of a textarea or input and focuses
* the input.
* -@input     Set selection bounds of this input or textarea
* -@offsets   Object of same form that is returned from get*
*/
function setSelection(input, offsets) {
 var start = offsets.start,
     end = offsets.end;

 if (end === undefined) {
   end = start;
 }

 if ('selectionStart' in input) {
   input.selectionStart = start;
   input.selectionEnd = Math.min(end, input.value.length);
 } else {
   setOffsets(input, offsets);
 }
}

var skipSelectionChangeEvent = ExecutionEnvironment_1.canUseDOM && 'documentMode' in document && document.documentMode <= 11;

var eventTypes$3 = {
 select: {
   phasedRegistrationNames: {
     bubbled: 'onSelect',
     captured: 'onSelectCapture'
   },
   dependencies: [TOP_BLUR, TOP_CONTEXT_MENU, TOP_FOCUS, TOP_KEY_DOWN, TOP_KEY_UP, TOP_MOUSE_DOWN, TOP_MOUSE_UP, TOP_SELECTION_CHANGE]
 }
};

var activeElement$1 = null;
var activeElementInst$1 = null;
var lastSelection = null;
var mouseDown = false;

/**
* Get an object which is a unique representation of the current selection.
*
* The return value will not be consistent across nodes or browsers, but
* two identical selections on the same node will return identical objects.
*
* @param {DOMElement} node
* @return {object}
*/
function getSelection(node) {
 if ('selectionStart' in node && hasSelectionCapabilities(node)) {
   return {
     start: node.selectionStart,
     end: node.selectionEnd
   };
 } else if (window.getSelection) {
   var selection = window.getSelection();
   return {
     anchorNode: selection.anchorNode,
     anchorOffset: selection.anchorOffset,
     focusNode: selection.focusNode,
     focusOffset: selection.focusOffset
   };
 }
}

/**
* Poll selection to see whether it's changed.
*
* @param {object} nativeEvent
* @return {?SyntheticEvent}
*/
function constructSelectEvent(nativeEvent, nativeEventTarget) {
 // Ensure we have the right element, and that the user is not dragging a
 // selection (this matches native `select` event behavior). In HTML5, select
 // fires only on input and textarea thus if there's no focused element we
 // won't dispatch.
 if (mouseDown || activeElement$1 == null || activeElement$1 !== getActiveElement_1()) {
   return null;
 }

 // Only fire when selection has actually changed.
 var currentSelection = getSelection(activeElement$1);
 if (!lastSelection || !shallowEqual_1(lastSelection, currentSelection)) {
   lastSelection = currentSelection;

   var syntheticEvent = SyntheticEvent$1.getPooled(eventTypes$3.select, activeElementInst$1, nativeEvent, nativeEventTarget);

   syntheticEvent.type = 'select';
   syntheticEvent.target = activeElement$1;

   accumulateTwoPhaseDispatches(syntheticEvent);

   return syntheticEvent;
 }

 return null;
}

/**
* This plugin creates an `onSelect` event that normalizes select events
* across form elements.
*
* Supported elements are:
* - input (see `isTextInputElement`)
* - textarea
* - contentEditable
*
* This differs from native browser implementations in the following ways:
* - Fires on contentEditable fields as well as inputs.
* - Fires for collapsed selection.
* - Fires after user input.
*/
var SelectEventPlugin = {
 eventTypes: eventTypes$3,

 extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
   var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : nativeEventTarget.nodeType === DOCUMENT_NODE ? nativeEventTarget : nativeEventTarget.ownerDocument;
   // Track whether all listeners exists for this plugin. If none exist, we do
   // not extract events. See #3639.
   if (!doc || !isListeningToAllDependencies('onSelect', doc)) {
     return null;
   }

   var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window;

   switch (topLevelType) {
     // Track the input node that has focus.
     case TOP_FOCUS:
       if (isTextInputElement(targetNode) || targetNode.contentEditable === 'true') {
         activeElement$1 = targetNode;
         activeElementInst$1 = targetInst;
         lastSelection = null;
       }
       break;
     case TOP_BLUR:
       activeElement$1 = null;
       activeElementInst$1 = null;
       lastSelection = null;
       break;
     // Don't fire the event while the user is dragging. This matches the
     // semantics of the native select event.
     case TOP_MOUSE_DOWN:
       mouseDown = true;
       break;
     case TOP_CONTEXT_MENU:
     case TOP_MOUSE_UP:
       mouseDown = false;
       return constructSelectEvent(nativeEvent, nativeEventTarget);
     // Chrome and IE fire non-standard event when selection is changed (and
     // sometimes when it hasn't). IE's event fires out of order with respect
     // to key and input events on deletion, so we discard it.
     //
     // Firefox doesn't support selectionchange, so check selection status
     // after each key entry. The selection changes after keydown and before
     // keyup, but we check on keydown as well in the case of holding down a
     // key, when multiple keydown events are fired but only one keyup is.
     // This is also our approach for IE handling, for the reason above.
     case TOP_SELECTION_CHANGE:
       if (skipSelectionChangeEvent) {
         break;
       }
     // falls through
     case TOP_KEY_DOWN:
     case TOP_KEY_UP:
       return constructSelectEvent(nativeEvent, nativeEventTarget);
   }

   return null;
 }
};

/**
* Inject modules for resolving DOM hierarchy and plugin ordering.
*/
injection.injectEventPluginOrder(DOMEventPluginOrder);
injection$1.injectComponentTree(ReactDOMComponentTree);

/**
* Some important event plugins included by default (without having to require
* them).
*/
injection.injectEventPluginsByName({
 SimpleEventPlugin: SimpleEventPlugin,
 EnterLeaveEventPlugin: EnterLeaveEventPlugin,
 ChangeEventPlugin: ChangeEventPlugin,
 SelectEventPlugin: SelectEventPlugin,
 BeforeInputEventPlugin: BeforeInputEventPlugin
});

/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
*/



var emptyObject = {};

{
 Object.freeze(emptyObject);
}

var emptyObject_1 = emptyObject;

// We capture a local reference to any global, in case it gets polyfilled after
// this module is initially evaluated.
// We want to be using a consistent implementation.

var localRequestAnimationFrame$1 = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : undefined;

/**
* A scheduling library to allow scheduling work with more granular priority and
* control than requestAnimationFrame and requestIdleCallback.
* Current TODO items:
* X- Pull out the scheduleWork polyfill built into React
* X- Initial test coverage
* X- Support for multiple callbacks
* - Support for two priorities; serial and deferred
* - Better test coverage
* - Better docblock
* - Polish documentation, API
*/

// This is a built-in polyfill for requestIdleCallback. It works by scheduling
// a requestAnimationFrame, storing the time for the start of the frame, then
// scheduling a postMessage which gets scheduled after paint. Within the
// postMessage handler do as much work as possible until time + frame rate.
// By separating the idle call into a separate event tick we ensure that
// layout, paint and other browser work is counted against the available time.
// The frame rate is dynamically adjusted.

// We capture a local reference to any global, in case it gets polyfilled after
// this module is initially evaluated.
// We want to be using a consistent implementation.
var localDate = Date;
var localSetTimeout = setTimeout;
var localClearTimeout = clearTimeout;

var hasNativePerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';

var now$1 = void 0;
if (hasNativePerformanceNow) {
 var Performance = performance;
 now$1 = function () {
   return Performance.now();
 };
} else {
 now$1 = function () {
   return localDate.now();
 };
}

var scheduleWork = void 0;
var cancelScheduledWork = void 0;

if (!ExecutionEnvironment_1.canUseDOM) {
 var timeoutIds = new Map();

 scheduleWork = function (callback, options) {
   // keeping return type consistent
   var callbackConfig = {
     scheduledCallback: callback,
     timeoutTime: 0,
     next: null,
     prev: null
   };
   var timeoutId = localSetTimeout(function () {
     callback({
       timeRemaining: function () {
         return Infinity;
       },

       didTimeout: false
     });
   });
   timeoutIds.set(callback, timeoutId);
   return callbackConfig;
 };
 cancelScheduledWork = function (callbackId) {
   var callback = callbackId.scheduledCallback;
   var timeoutId = timeoutIds.get(callback);
   timeoutIds.delete(callbackId);
   localClearTimeout(timeoutId);
 };
} else {
 {
   if (typeof localRequestAnimationFrame$1 !== 'function') {
     warning_1(false, 'React depends on requestAnimationFrame. Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
   }
 }

 var localRequestAnimationFrame = typeof localRequestAnimationFrame$1 === 'function' ? localRequestAnimationFrame$1 : function (callback) {
   invariant_1(false, 'React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills');
 };

 var headOfPendingCallbacksLinkedList = null;
 var tailOfPendingCallbacksLinkedList = null;

 // We track what the next soonest timeoutTime is, to be able to quickly tell
 // if none of the scheduled callbacks have timed out.
 var nextSoonestTimeoutTime = -1;

 var isIdleScheduled = false;
 var isAnimationFrameScheduled = false;

 var frameDeadline = 0;
 // We start out assuming that we run at 30fps but then the heuristic tracking
 // will adjust this value to a faster fps if we get more frequent animation
 // frames.
 var previousFrameTime = 33;
 var activeFrameTime = 33;

 var frameDeadlineObject = {
   didTimeout: false,
   timeRemaining: function () {
     var remaining = frameDeadline - now$1();
     return remaining > 0 ? remaining : 0;
   }
 };

 /**
  * Handles the case where a callback errors:
  * - don't catch the error, because this changes debugging behavior
  * - do start a new postMessage callback, to call any remaining callbacks,
  * - but only if there is an error, so there is not extra overhead.
  */
 var callUnsafely = function (callbackConfig, arg) {
   var callback = callbackConfig.scheduledCallback;
   var finishedCalling = false;
   try {
     callback(arg);
     finishedCalling = true;
   } finally {
     // always remove it from linked list
     cancelScheduledWork(callbackConfig);

     if (!finishedCalling) {
       // an error must have been thrown
       isIdleScheduled = true;
       window.postMessage(messageKey, '*');
     }
   }
 };

 /**
  * Checks for timed out callbacks, runs them, and then checks again to see if
  * any more have timed out.
  * Keeps doing this until there are none which have currently timed out.
  */
 var callTimedOutCallbacks = function () {
   if (headOfPendingCallbacksLinkedList === null) {
     return;
   }

   var currentTime = now$1();
   // TODO: this would be more efficient if deferred callbacks are stored in
   // min heap.
   // Or in a linked list with links for both timeoutTime order and insertion
   // order.
   // For now an easy compromise is the current approach:
   // Keep a pointer to the soonest timeoutTime, and check that first.
   // If it has not expired, we can skip traversing the whole list.
   // If it has expired, then we step through all the callbacks.
   if (nextSoonestTimeoutTime === -1 || nextSoonestTimeoutTime > currentTime) {
     // We know that none of them have timed out yet.
     return;
   }
   // NOTE: we intentionally wait to update the nextSoonestTimeoutTime until
   // after successfully calling any timed out callbacks.
   // If a timed out callback throws an error, we could get stuck in a state
   // where the nextSoonestTimeoutTime was set wrong.
   var updatedNextSoonestTimeoutTime = -1; // we will update nextSoonestTimeoutTime below
   var timedOutCallbacks = [];

   // iterate once to find timed out callbacks and find nextSoonestTimeoutTime
   var currentCallbackConfig = headOfPendingCallbacksLinkedList;
   while (currentCallbackConfig !== null) {
     var _timeoutTime = currentCallbackConfig.timeoutTime;
     if (_timeoutTime !== -1 && _timeoutTime <= currentTime) {
       // it has timed out!
       timedOutCallbacks.push(currentCallbackConfig);
     } else {
       if (_timeoutTime !== -1 && (updatedNextSoonestTimeoutTime === -1 || _timeoutTime < updatedNextSoonestTimeoutTime)) {
         updatedNextSoonestTimeoutTime = _timeoutTime;
       }
     }
     currentCallbackConfig = currentCallbackConfig.next;
   }

   if (timedOutCallbacks.length > 0) {
     frameDeadlineObject.didTimeout = true;
     for (var i = 0, len = timedOutCallbacks.length; i < len; i++) {
       callUnsafely(timedOutCallbacks[i], frameDeadlineObject);
     }
   }

   // NOTE: we intentionally wait to update the nextSoonestTimeoutTime until
   // after successfully calling any timed out callbacks.
   nextSoonestTimeoutTime = updatedNextSoonestTimeoutTime;
 };

 // We use the postMessage trick to defer idle work until after the repaint.
 var messageKey = '__reactIdleCallback$' + Math.random().toString(36).slice(2);
 var idleTick = function (event) {
   if (event.source !== window || event.data !== messageKey) {
     return;
   }
   isIdleScheduled = false;

   if (headOfPendingCallbacksLinkedList === null) {
     return;
   }

   // First call anything which has timed out, until we have caught up.
   callTimedOutCallbacks();

   var currentTime = now$1();
   // Next, as long as we have idle time, try calling more callbacks.
   while (frameDeadline - currentTime > 0 && headOfPendingCallbacksLinkedList !== null) {
     var latestCallbackConfig = headOfPendingCallbacksLinkedList;
     frameDeadlineObject.didTimeout = false;
     // callUnsafely will remove it from the head of the linked list
     callUnsafely(latestCallbackConfig, frameDeadlineObject);
     currentTime = now$1();
   }
   if (headOfPendingCallbacksLinkedList !== null) {
     if (!isAnimationFrameScheduled) {
       // Schedule another animation callback so we retry later.
       isAnimationFrameScheduled = true;
       localRequestAnimationFrame(animationTick);
     }
   }
 };
 // Assumes that we have addEventListener in this environment. Might need
 // something better for old IE.
 window.addEventListener('message', idleTick, false);

 var animationTick = function (rafTime) {
   isAnimationFrameScheduled = false;
   var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
   if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
     if (nextFrameTime < 8) {
       // Defensive coding. We don't support higher frame rates than 120hz.
       // If we get lower than that, it is probably a bug.
       nextFrameTime = 8;
     }
     // If one frame goes long, then the next one can be short to catch up.
     // If two frames are short in a row, then that's an indication that we
     // actually have a higher frame rate than what we're currently optimizing.
     // We adjust our heuristic dynamically accordingly. For example, if we're
     // running on 120hz display or 90hz VR display.
     // Take the max of the two in case one of them was an anomaly due to
     // missed frame deadlines.
     activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
   } else {
     previousFrameTime = nextFrameTime;
   }
   frameDeadline = rafTime + activeFrameTime;
   if (!isIdleScheduled) {
     isIdleScheduled = true;
     window.postMessage(messageKey, '*');
   }
 };

 scheduleWork = function (callback, options) /* CallbackConfigType */{
   var timeoutTime = -1;
   if (options != null && typeof options.timeout === 'number') {
     timeoutTime = now$1() + options.timeout;
   }
   if (nextSoonestTimeoutTime === -1 || timeoutTime !== -1 && timeoutTime < nextSoonestTimeoutTime) {
     nextSoonestTimeoutTime = timeoutTime;
   }

   var scheduledCallbackConfig = {
     scheduledCallback: callback,
     timeoutTime: timeoutTime,
     prev: null,
     next: null
   };
   if (headOfPendingCallbacksLinkedList === null) {
     // Make this callback the head and tail of our list
     headOfPendingCallbacksLinkedList = scheduledCallbackConfig;
     tailOfPendingCallbacksLinkedList = scheduledCallbackConfig;
   } else {
     // Add latest callback as the new tail of the list
     scheduledCallbackConfig.prev = tailOfPendingCallbacksLinkedList;
     // renaming for clarity
     var oldTailOfPendingCallbacksLinkedList = tailOfPendingCallbacksLinkedList;
     if (oldTailOfPendingCallbacksLinkedList !== null) {
       oldTailOfPendingCallbacksLinkedList.next = scheduledCallbackConfig;
     }
     tailOfPendingCallbacksLinkedList = scheduledCallbackConfig;
   }

   if (!isAnimationFrameScheduled) {
     // If rAF didn't already schedule one, we need to schedule a frame.
     // TODO: If this rAF doesn't materialize because the browser throttles, we
     // might want to still have setTimeout trigger scheduleWork as a backup to ensure
     // that we keep performing work.
     isAnimationFrameScheduled = true;
     localRequestAnimationFrame(animationTick);
   }
   return scheduledCallbackConfig;
 };

 cancelScheduledWork = function (callbackConfig /* CallbackConfigType */
 ) {
   if (callbackConfig.prev === null && headOfPendingCallbacksLinkedList !== callbackConfig) {
     // this callbackConfig has already been cancelled.
     // cancelScheduledWork should be idempotent, a no-op after first call.
     return;
   }

   /**
    * There are four possible cases:
    * - Head/nodeToRemove/Tail -> null
    *   In this case we set Head and Tail to null.
    * - Head -> ... middle nodes... -> Tail/nodeToRemove
    *   In this case we point the middle.next to null and put middle as the new
    *   Tail.
    * - Head/nodeToRemove -> ...middle nodes... -> Tail
    *   In this case we point the middle.prev at null and move the Head to
    *   middle.
    * - Head -> ... ?some nodes ... -> nodeToRemove -> ... ?some nodes ... -> Tail
    *   In this case we point the Head.next to the Tail and the Tail.prev to
    *   the Head.
    */
   var next = callbackConfig.next;
   var prev = callbackConfig.prev;
   callbackConfig.next = null;
   callbackConfig.prev = null;
   if (next !== null) {
     // we have a next

     if (prev !== null) {
       // we have a prev

       // callbackConfig is somewhere in the middle of a list of 3 or more nodes.
       prev.next = next;
       next.prev = prev;
       return;
     } else {
       // there is a next but not a previous one;
       // callbackConfig is the head of a list of 2 or more other nodes.
       next.prev = null;
       headOfPendingCallbacksLinkedList = next;
       return;
     }
   } else {
     // there is no next callback config; this must the tail of the list

     if (prev !== null) {
       // we have a prev

       // callbackConfig is the tail of a list of 2 or more other nodes.
       prev.next = null;
       tailOfPendingCallbacksLinkedList = prev;
       return;
     } else {
       // there is no previous callback config;
       // callbackConfig is the only thing in the linked list,
       // so both head and tail point to it.
       headOfPendingCallbacksLinkedList = null;
       tailOfPendingCallbacksLinkedList = null;
       return;
     }
   }
 };
}

var didWarnSelectedSetOnOption = false;

function flattenChildren(children) {
 var content = '';

 // Flatten children and warn if they aren't strings or numbers;
 // invalid types are ignored.
 // We can silently skip them because invalid DOM nesting warning
 // catches these cases in Fiber.
 React.Children.forEach(children, function (child) {
   if (child == null) {
     return;
   }
   if (typeof child === 'string' || typeof child === 'number') {
     content += child;
   }
 });

 return content;
}

/**
* Implements an <option> host component that warns when `selected` is set.
*/

function validateProps(element, props) {
 // TODO (yungsters): Remove support for `selected` in <option>.
 {
   if (props.selected != null && !didWarnSelectedSetOnOption) {
     warning_1(false, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.');
     didWarnSelectedSetOnOption = true;
   }
 }
}

function postMountWrapper$1(element, props) {
 // value="" should make a value attribute (#6219)
 if (props.value != null) {
   element.setAttribute('value', props.value);
 }
}

function getHostProps$1(element, props) {
 var hostProps = _assign({ children: undefined }, props);
 var content = flattenChildren(props.children);

 if (content) {
   hostProps.children = content;
 }

 return hostProps;
}

// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberOwnerName$3 = ReactDebugCurrentFiber.getCurrentFiberOwnerName;
var getCurrentFiberStackAddendum$3 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;


var didWarnValueDefaultValue$1 = void 0;

{
 didWarnValueDefaultValue$1 = false;
}

function getDeclarationErrorAddendum() {
 var ownerName = getCurrentFiberOwnerName$3();
 if (ownerName) {
   return '\n\nCheck the render method of `' + ownerName + '`.';
 }
 return '';
}

var valuePropNames = ['value', 'defaultValue'];

/**
* Validation function for `value` and `defaultValue`.
*/
function checkSelectPropTypes(props) {
 ReactControlledValuePropTypes.checkPropTypes('select', props, getCurrentFiberStackAddendum$3);

 for (var i = 0; i < valuePropNames.length; i++) {
   var propName = valuePropNames[i];
   if (props[propName] == null) {
     continue;
   }
   var isArray = Array.isArray(props[propName]);
   if (props.multiple && !isArray) {
     warning_1(false, 'The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.%s', propName, getDeclarationErrorAddendum());
   } else if (!props.multiple && isArray) {
     warning_1(false, 'The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.%s', propName, getDeclarationErrorAddendum());
   }
 }
}

function updateOptions(node, multiple, propValue, setDefaultSelected) {
 var options = node.options;

 if (multiple) {
   var selectedValues = propValue;
   var selectedValue = {};
   for (var i = 0; i < selectedValues.length; i++) {
     // Prefix to avoid chaos with special keys.
     selectedValue['$' + selectedValues[i]] = true;
   }
   for (var _i = 0; _i < options.length; _i++) {
     var selected = selectedValue.hasOwnProperty('$' + options[_i].value);
     if (options[_i].selected !== selected) {
       options[_i].selected = selected;
     }
     if (selected && setDefaultSelected) {
       options[_i].defaultSelected = true;
     }
   }
 } else {
   // Do not set `select.value` as exact behavior isn't consistent across all
   // browsers for all cases.
   var _selectedValue = '' + propValue;
   var defaultSelected = null;
   for (var _i2 = 0; _i2 < options.length; _i2++) {
     if (options[_i2].value === _selectedValue) {
       options[_i2].selected = true;
       if (setDefaultSelected) {
         options[_i2].defaultSelected = true;
       }
       return;
     }
     if (defaultSelected === null && !options[_i2].disabled) {
       defaultSelected = options[_i2];
     }
   }
   if (defaultSelected !== null) {
     defaultSelected.selected = true;
   }
 }
}

/**
* Implements a <select> host component that allows optionally setting the
* props `value` and `defaultValue`. If `multiple` is false, the prop must be a
* stringable. If `multiple` is true, the prop must be an array of stringables.
*
* If `value` is not supplied (or null/undefined), user actions that change the
* selected option will trigger updates to the rendered options.
*
* If it is supplied (and not null/undefined), the rendered options will not
* update in response to user actions. Instead, the `value` prop must change in
* order for the rendered options to update.
*
* If `defaultValue` is provided, any options with the supplied values will be
* selected.
*/

function getHostProps$2(element, props) {
 return _assign({}, props, {
   value: undefined
 });
}

function initWrapperState$1(element, props) {
 var node = element;
 {
   checkSelectPropTypes(props);
 }

 var value = props.value;
 node._wrapperState = {
   initialValue: value != null ? value : props.defaultValue,
   wasMultiple: !!props.multiple
 };

 {
   if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue$1) {
     warning_1(false, 'Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
     didWarnValueDefaultValue$1 = true;
   }
 }
}

function postMountWrapper$2(element, props) {
 var node = element;
 node.multiple = !!props.multiple;
 var value = props.value;
 if (value != null) {
   updateOptions(node, !!props.multiple, value, false);
 } else if (props.defaultValue != null) {
   updateOptions(node, !!props.multiple, props.defaultValue, true);
 }
}

function postUpdateWrapper(element, props) {
 var node = element;
 // After the initial mount, we control selected-ness manually so don't pass
 // this value down
 node._wrapperState.initialValue = undefined;

 var wasMultiple = node._wrapperState.wasMultiple;
 node._wrapperState.wasMultiple = !!props.multiple;

 var value = props.value;
 if (value != null) {
   updateOptions(node, !!props.multiple, value, false);
 } else if (wasMultiple !== !!props.multiple) {
   // For simplicity, reapply `defaultValue` if `multiple` is toggled.
   if (props.defaultValue != null) {
     updateOptions(node, !!props.multiple, props.defaultValue, true);
   } else {
     // Revert the select back to its default unselected state.
     updateOptions(node, !!props.multiple, props.multiple ? [] : '', false);
   }
 }
}

function restoreControlledState$2(element, props) {
 var node = element;
 var value = props.value;

 if (value != null) {
   updateOptions(node, !!props.multiple, value, false);
 }
}

// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberStackAddendum$4 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

var didWarnValDefaultVal = false;

/**
* Implements a <textarea> host component that allows setting `value`, and
* `defaultValue`. This differs from the traditional DOM API because value is
* usually set as PCDATA children.
*
* If `value` is not supplied (or null/undefined), user actions that affect the
* value will trigger updates to the element.
*
* If `value` is supplied (and not null/undefined), the rendered element will
* not trigger updates to the element. Instead, the `value` prop must change in
* order for the rendered element to be updated.
*
* The rendered element will be initialized with an empty value, the prop
* `defaultValue` if specified, or the children content (deprecated).
*/

function getHostProps$3(element, props) {
 var node = element;
 !(props.dangerouslySetInnerHTML == null) ? invariant_1(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : void 0;

 // Always set children to the same thing. In IE9, the selection range will
 // get reset if `textContent` is mutated.  We could add a check in setTextContent
 // to only set the value if/when the value differs from the node value (which would
 // completely solve this IE9 bug), but Sebastian+Sophie seemed to like this
 // solution. The value can be a boolean or object so that's why it's forced
 // to be a string.
 var hostProps = _assign({}, props, {
   value: undefined,
   defaultValue: undefined,
   children: '' + node._wrapperState.initialValue
 });

 return hostProps;
}

function initWrapperState$2(element, props) {
 var node = element;
 {
   ReactControlledValuePropTypes.checkPropTypes('textarea', props, getCurrentFiberStackAddendum$4);
   if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValDefaultVal) {
     warning_1(false, 'Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
     didWarnValDefaultVal = true;
   }
 }

 var initialValue = props.value;

 // Only bother fetching default value if we're going to use it
 if (initialValue == null) {
   var defaultValue = props.defaultValue;
   // TODO (yungsters): Remove support for children content in <textarea>.
   var children = props.children;
   if (children != null) {
     {
       warning_1(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.');
     }
     !(defaultValue == null) ? invariant_1(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : void 0;
     if (Array.isArray(children)) {
       !(children.length <= 1) ? invariant_1(false, '<textarea> can only have at most one child.') : void 0;
       children = children[0];
     }

     defaultValue = '' + children;
   }
   if (defaultValue == null) {
     defaultValue = '';
   }
   initialValue = defaultValue;
 }

 node._wrapperState = {
   initialValue: '' + initialValue
 };
}

function updateWrapper$1(element, props) {
 var node = element;
 var value = props.value;
 if (value != null) {
   // Cast `value` to a string to ensure the value is set correctly. While
   // browsers typically do this as necessary, jsdom doesn't.
   var newValue = '' + value;

   // To avoid side effects (such as losing text selection), only set value if changed
   if (newValue !== node.value) {
     node.value = newValue;
   }
   if (props.defaultValue == null) {
     node.defaultValue = newValue;
   }
 }
 if (props.defaultValue != null) {
   node.defaultValue = props.defaultValue;
 }
}

function postMountWrapper$3(element, props) {
 var node = element;
 // This is in postMount because we need access to the DOM node, which is not
 // available until after the component has mounted.
 var textContent = node.textContent;

 // Only set node.value if textContent is equal to the expected
 // initial value. In IE10/IE11 there is a bug where the placeholder attribute
 // will populate textContent as well.
 // https://developer.microsoft.com/microsoft-edge/platform/issues/101525/
 if (textContent === node._wrapperState.initialValue) {
   node.value = textContent;
 }
}

function restoreControlledState$3(element, props) {
 // DOM component is still mounted; update
 updateWrapper$1(element, props);
}

var HTML_NAMESPACE$1 = 'http://www.w3.org/1999/xhtml';
var MATH_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

var Namespaces = {
 html: HTML_NAMESPACE$1,
 mathml: MATH_NAMESPACE,
 svg: SVG_NAMESPACE
};

// Assumes there is no parent namespace.
function getIntrinsicNamespace(type) {
 switch (type) {
   case 'svg':
     return SVG_NAMESPACE;
   case 'math':
     return MATH_NAMESPACE;
   default:
     return HTML_NAMESPACE$1;
 }
}

function getChildNamespace(parentNamespace, type) {
 if (parentNamespace == null || parentNamespace === HTML_NAMESPACE$1) {
   // No (or default) parent namespace: potential entry point.
   return getIntrinsicNamespace(type);
 }
 if (parentNamespace === SVG_NAMESPACE && type === 'foreignObject') {
   // We're leaving SVG.
   return HTML_NAMESPACE$1;
 }
 // By default, pass namespace below.
 return parentNamespace;
}

/* globals MSApp */

/**
* Create a function which has 'unsafe' privileges (required by windows8 apps)
*/
var createMicrosoftUnsafeLocalFunction = function (func) {
 if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
   return function (arg0, arg1, arg2, arg3) {
     MSApp.execUnsafeLocalFunction(function () {
       return func(arg0, arg1, arg2, arg3);
     });
   };
 } else {
   return func;
 }
};

// SVG temp container for IE lacking innerHTML
var reusableSVGContainer = void 0;

/**
* Set the innerHTML property of a node
*
* @param {DOMElement} node
* @param {string} html
* @internal
*/
var setInnerHTML = createMicrosoftUnsafeLocalFunction(function (node, html) {
 // IE does not have innerHTML for SVG nodes, so instead we inject the
 // new markup in a temp node and then move the child nodes across into
 // the target node

 if (node.namespaceURI === Namespaces.svg && !('innerHTML' in node)) {
   reusableSVGContainer = reusableSVGContainer || document.createElement('div');
   reusableSVGContainer.innerHTML = '<svg>' + html + '</svg>';
   var svgNode = reusableSVGContainer.firstChild;
   while (node.firstChild) {
     node.removeChild(node.firstChild);
   }
   while (svgNode.firstChild) {
     node.appendChild(svgNode.firstChild);
   }
 } else {
   node.innerHTML = html;
 }
});

/**
* Set the textContent property of a node. For text updates, it's faster
* to set the `nodeValue` of the Text node directly instead of using
* `.textContent` which will remove the existing node and create a new one.
*
* @param {DOMElement} node
* @param {string} text
* @internal
*/
var setTextContent = function (node, text) {
 if (text) {
   var firstChild = node.firstChild;

   if (firstChild && firstChild === node.lastChild && firstChild.nodeType === TEXT_NODE) {
     firstChild.nodeValue = text;
     return;
   }
 }
 node.textContent = text;
};

/**
* CSS properties which accept numbers but are not in units of "px".
*/
var isUnitlessNumber = {
 animationIterationCount: true,
 borderImageOutset: true,
 borderImageSlice: true,
 borderImageWidth: true,
 boxFlex: true,
 boxFlexGroup: true,
 boxOrdinalGroup: true,
 columnCount: true,
 columns: true,
 flex: true,
 flexGrow: true,
 flexPositive: true,
 flexShrink: true,
 flexNegative: true,
 flexOrder: true,
 gridRow: true,
 gridRowEnd: true,
 gridRowSpan: true,
 gridRowStart: true,
 gridColumn: true,
 gridColumnEnd: true,
 gridColumnSpan: true,
 gridColumnStart: true,
 fontWeight: true,
 lineClamp: true,
 lineHeight: true,
 opacity: true,
 order: true,
 orphans: true,
 tabSize: true,
 widows: true,
 zIndex: true,
 zoom: true,

 // SVG-related properties
 fillOpacity: true,
 floodOpacity: true,
 stopOpacity: true,
 strokeDasharray: true,
 strokeDashoffset: true,
 strokeMiterlimit: true,
 strokeOpacity: true,
 strokeWidth: true
};

/**
* @param {string} prefix vendor-specific prefix, eg: Webkit
* @param {string} key style name, eg: transitionDuration
* @return {string} style name prefixed with `prefix`, properly camelCased, eg:
* WebkitTransitionDuration
*/
function prefixKey(prefix, key) {
 return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
* Support style names that may come passed in prefixed by adding permutations
* of vendor prefixes.
*/
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
 prefixes.forEach(function (prefix) {
   isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
 });
});

/**
* Convert a value into the proper css writable value. The style name `name`
* should be logical (no hyphens), as specified
* in `CSSProperty.isUnitlessNumber`.
*
* @param {string} name CSS property name such as `topMargin`.
* @param {*} value CSS property value such as `10px`.
* @return {string} Normalized style value with dimensions applied.
*/
function dangerousStyleValue(name, value, isCustomProperty) {
 // Note that we've removed escapeTextForBrowser() calls here since the
 // whole string will be escaped when the attribute is injected into
 // the markup. If you provide unsafe user data here they can inject
 // arbitrary CSS which may be problematic (I couldn't repro this):
 // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
 // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
 // This is not an XSS hole but instead a potential CSS injection issue
 // which has lead to a greater discussion about how we're going to
 // trust URLs moving forward. See #2115901

 var isEmpty = value == null || typeof value === 'boolean' || value === '';
 if (isEmpty) {
   return '';
 }

 if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
   return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
 }

 return ('' + value).trim();
}

/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
* @typechecks
*/

var _uppercasePattern = /([A-Z])/g;

/**
* Hyphenates a camelcased string, for example:
*
*   > hyphenate('backgroundColor')
*   < "background-color"
*
* For CSS style names, use `hyphenateStyleName` instead which works properly
* with all vendor prefixes, including `ms`.
*
* @param {string} string
* @return {string}
*/
function hyphenate(string) {
 return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

var hyphenate_1 = hyphenate;

/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
* @typechecks
*/





var msPattern = /^ms-/;

/**
* Hyphenates a camelcased CSS property name, for example:
*
*   > hyphenateStyleName('backgroundColor')
*   < "background-color"
*   > hyphenateStyleName('MozTransition')
*   < "-moz-transition"
*   > hyphenateStyleName('msTransition')
*   < "-ms-transition"
*
* As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
* is converted to `-ms-`.
*
* @param {string} string
* @return {string}
*/
function hyphenateStyleName(string) {
 return hyphenate_1(string).replace(msPattern, '-ms-');
}

var hyphenateStyleName_1 = hyphenateStyleName;

/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
* @typechecks
*/

var _hyphenPattern = /-(.)/g;

/**
* Camelcases a hyphenated string, for example:
*
*   > camelize('background-color')
*   < "backgroundColor"
*
* @param {string} string
* @return {string}
*/
function camelize(string) {
 return string.replace(_hyphenPattern, function (_, character) {
   return character.toUpperCase();
 });
}

var camelize_1 = camelize;

/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
* @typechecks
*/





var msPattern$1 = /^-ms-/;

/**
* Camelcases a hyphenated CSS property name, for example:
*
*   > camelizeStyleName('background-color')
*   < "backgroundColor"
*   > camelizeStyleName('-moz-transition')
*   < "MozTransition"
*   > camelizeStyleName('-ms-transition')
*   < "msTransition"
*
* As Andi Smith suggests
* (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
* is converted to lowercase `ms`.
*
* @param {string} string
* @return {string}
*/
function camelizeStyleName(string) {
 return camelize_1(string.replace(msPattern$1, 'ms-'));
}

var camelizeStyleName_1 = camelizeStyleName;

var warnValidStyle = emptyFunction_1;

{
 // 'msTransform' is correct, but the other prefixes should be capitalized
 var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

 // style values shouldn't contain a semicolon
 var badStyleValueWithSemicolonPattern = /;\s*$/;

 var warnedStyleNames = {};
 var warnedStyleValues = {};
 var warnedForNaNValue = false;
 var warnedForInfinityValue = false;

 var warnHyphenatedStyleName = function (name, getStack) {
   if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
     return;
   }

   warnedStyleNames[name] = true;
   warning_1(false, 'Unsupported style property %s. Did you mean %s?%s', name, camelizeStyleName_1(name), getStack());
 };

 var warnBadVendoredStyleName = function (name, getStack) {
   if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
     return;
   }

   warnedStyleNames[name] = true;
   warning_1(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), getStack());
 };

 var warnStyleValueWithSemicolon = function (name, value, getStack) {
   if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
     return;
   }

   warnedStyleValues[value] = true;
   warning_1(false, "Style property values shouldn't contain a semicolon. " + 'Try "%s: %s" instead.%s', name, value.replace(badStyleValueWithSemicolonPattern, ''), getStack());
 };

 var warnStyleValueIsNaN = function (name, value, getStack) {
   if (warnedForNaNValue) {
     return;
   }

   warnedForNaNValue = true;
   warning_1(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, getStack());
 };

 var warnStyleValueIsInfinity = function (name, value, getStack) {
   if (warnedForInfinityValue) {
     return;
   }

   warnedForInfinityValue = true;
   warning_1(false, '`Infinity` is an invalid value for the `%s` css style property.%s', name, getStack());
 };

 warnValidStyle = function (name, value, getStack) {
   if (name.indexOf('-') > -1) {
     warnHyphenatedStyleName(name, getStack);
   } else if (badVendoredStyleNamePattern.test(name)) {
     warnBadVendoredStyleName(name, getStack);
   } else if (badStyleValueWithSemicolonPattern.test(value)) {
     warnStyleValueWithSemicolon(name, value, getStack);
   }

   if (typeof value === 'number') {
     if (isNaN(value)) {
       warnStyleValueIsNaN(name, value, getStack);
     } else if (!isFinite(value)) {
       warnStyleValueIsInfinity(name, value, getStack);
     }
   }
 };
}

var warnValidStyle$1 = warnValidStyle;

/**
* Operations for dealing with CSS properties.
*/

/**
* This creates a string that is expected to be equivalent to the style
* attribute generated by server-side rendering. It by-passes warnings and
* security checks so it's not safe to use this value for anything other than
* comparison. It is only used in DEV for SSR validation.
*/
function createDangerousStringForStyles(styles) {
 {
   var serialized = '';
   var delimiter = '';
   for (var styleName in styles) {
     if (!styles.hasOwnProperty(styleName)) {
       continue;
     }
     var styleValue = styles[styleName];
     if (styleValue != null) {
       var isCustomProperty = styleName.indexOf('--') === 0;
       serialized += delimiter + hyphenateStyleName_1(styleName) + ':';
       serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty);

       delimiter = ';';
     }
   }
   return serialized || null;
 }
}

/**
* Sets the value for multiple styles on a node.  If a value is specified as
* '' (empty string), the corresponding style property will be unset.
*
* @param {DOMElement} node
* @param {object} styles
*/
function setValueForStyles(node, styles, getStack) {
 var style = node.style;
 for (var styleName in styles) {
   if (!styles.hasOwnProperty(styleName)) {
     continue;
   }
   var isCustomProperty = styleName.indexOf('--') === 0;
   {
     if (!isCustomProperty) {
       warnValidStyle$1(styleName, styles[styleName], getStack);
     }
   }
   var styleValue = dangerousStyleValue(styleName, styles[styleName], isCustomProperty);
   if (styleName === 'float') {
     styleName = 'cssFloat';
   }
   if (isCustomProperty) {
     style.setProperty(styleName, styleValue);
   } else {
     style[styleName] = styleValue;
   }
 }
}

// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.

var omittedCloseTags = {
 area: true,
 base: true,
 br: true,
 col: true,
 embed: true,
 hr: true,
 img: true,
 input: true,
 keygen: true,
 link: true,
 meta: true,
 param: true,
 source: true,
 track: true,
 wbr: true
 // NOTE: menuitem's close tag should be omitted, but that causes problems.
};

// For HTML, certain tags cannot have children. This has the same purpose as
// `omittedCloseTags` except that `menuitem` should still have its closing tag.

var voidElementTags = _assign({
 menuitem: true
}, omittedCloseTags);

var HTML$1 = '__html';

function assertValidProps(tag, props, getStack) {
 if (!props) {
   return;
 }
 // Note the use of `==` which checks for null or undefined.
 if (voidElementTags[tag]) {
   !(props.children == null && props.dangerouslySetInnerHTML == null) ? invariant_1(false, '%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s', tag, getStack()) : void 0;
 }
 if (props.dangerouslySetInnerHTML != null) {
   !(props.children == null) ? invariant_1(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : void 0;
   !(typeof props.dangerouslySetInnerHTML === 'object' && HTML$1 in props.dangerouslySetInnerHTML) ? invariant_1(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.') : void 0;
 }
 {
   !(props.suppressContentEditableWarning || !props.contentEditable || props.children == null) ? warning_1(false, 'A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.%s', getStack()) : void 0;
 }
 !(props.style == null || typeof props.style === 'object') ? invariant_1(false, 'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s', getStack()) : void 0;
}

function isCustomComponent(tagName, props) {
 if (tagName.indexOf('-') === -1) {
   return typeof props.is === 'string';
 }
 switch (tagName) {
   // These are reserved SVG and MathML elements.
   // We don't mind this whitelist too much because we expect it to never grow.
   // The alternative is to track the namespace in a few places which is convoluted.
   // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
   case 'annotation-xml':
   case 'color-profile':
   case 'font-face':
   case 'font-face-src':
   case 'font-face-uri':
   case 'font-face-format':
   case 'font-face-name':
   case 'missing-glyph':
     return false;
   default:
     return true;
 }
}

// When adding attributes to the HTML or SVG whitelist, be sure to
// also add them to this module to ensure casing and incorrect name
// warnings.
var possibleStandardNames = {
 // HTML
 accept: 'accept',
 acceptcharset: 'acceptCharset',
 'accept-charset': 'acceptCharset',
 accesskey: 'accessKey',
 action: 'action',
 allowfullscreen: 'allowFullScreen',
 alt: 'alt',
 as: 'as',
 async: 'async',
 autocapitalize: 'autoCapitalize',
 autocomplete: 'autoComplete',
 autocorrect: 'autoCorrect',
 autofocus: 'autoFocus',
 autoplay: 'autoPlay',
 autosave: 'autoSave',
 capture: 'capture',
 cellpadding: 'cellPadding',
 cellspacing: 'cellSpacing',
 challenge: 'challenge',
 charset: 'charSet',
 checked: 'checked',
 children: 'children',
 cite: 'cite',
 class: 'className',
 classid: 'classID',
 classname: 'className',
 cols: 'cols',
 colspan: 'colSpan',
 content: 'content',
 contenteditable: 'contentEditable',
 contextmenu: 'contextMenu',
 controls: 'controls',
 controlslist: 'controlsList',
 coords: 'coords',
 crossorigin: 'crossOrigin',
 dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
 data: 'data',
 datetime: 'dateTime',
 default: 'default',
 defaultchecked: 'defaultChecked',
 defaultvalue: 'defaultValue',
 defer: 'defer',
 dir: 'dir',
 disabled: 'disabled',
 download: 'download',
 draggable: 'draggable',
 enctype: 'encType',
 for: 'htmlFor',
 form: 'form',
 formmethod: 'formMethod',
 formaction: 'formAction',
 formenctype: 'formEncType',
 formnovalidate: 'formNoValidate',
 formtarget: 'formTarget',
 frameborder: 'frameBorder',
 headers: 'headers',
 height: 'height',
 hidden: 'hidden',
 high: 'high',
 href: 'href',
 hreflang: 'hrefLang',
 htmlfor: 'htmlFor',
 httpequiv: 'httpEquiv',
 'http-equiv': 'httpEquiv',
 icon: 'icon',
 id: 'id',
 innerhtml: 'innerHTML',
 inputmode: 'inputMode',
 integrity: 'integrity',
 is: 'is',
 itemid: 'itemID',
 itemprop: 'itemProp',
 itemref: 'itemRef',
 itemscope: 'itemScope',
 itemtype: 'itemType',
 keyparams: 'keyParams',
 keytype: 'keyType',
 kind: 'kind',
 label: 'label',
 lang: 'lang',
 list: 'list',
 loop: 'loop',
 low: 'low',
 manifest: 'manifest',
 marginwidth: 'marginWidth',
 marginheight: 'marginHeight',
 max: 'max',
 maxlength: 'maxLength',
 media: 'media',
 mediagroup: 'mediaGroup',
 method: 'method',
 min: 'min',
 minlength: 'minLength',
 multiple: 'multiple',
 muted: 'muted',
 name: 'name',
 nomodule: 'noModule',
 nonce: 'nonce',
 novalidate: 'noValidate',
 open: 'open',
 optimum: 'optimum',
 pattern: 'pattern',
 placeholder: 'placeholder',
 playsinline: 'playsInline',
 poster: 'poster',
 preload: 'preload',
 profile: 'profile',
 radiogroup: 'radioGroup',
 readonly: 'readOnly',
 referrerpolicy: 'referrerPolicy',
 rel: 'rel',
 required: 'required',
 reversed: 'reversed',
 role: 'role',
 rows: 'rows',
 rowspan: 'rowSpan',
 sandbox: 'sandbox',
 scope: 'scope',
 scoped: 'scoped',
 scrolling: 'scrolling',
 seamless: 'seamless',
 selected: 'selected',
 shape: 'shape',
 size: 'size',
 sizes: 'sizes',
 span: 'span',
 spellcheck: 'spellCheck',
 src: 'src',
 srcdoc: 'srcDoc',
 srclang: 'srcLang',
 srcset: 'srcSet',
 start: 'start',
 step: 'step',
 style: 'style',
 summary: 'summary',
 tabindex: 'tabIndex',
 target: 'target',
 title: 'title',
 type: 'type',
 usemap: 'useMap',
 value: 'value',
 width: 'width',
 wmode: 'wmode',
 wrap: 'wrap',

 // SVG
 about: 'about',
 accentheight: 'accentHeight',
 'accent-height': 'accentHeight',
 accumulate: 'accumulate',
 additive: 'additive',
 alignmentbaseline: 'alignmentBaseline',
 'alignment-baseline': 'alignmentBaseline',
 allowreorder: 'allowReorder',
 alphabetic: 'alphabetic',
 amplitude: 'amplitude',
 arabicform: 'arabicForm',
 'arabic-form': 'arabicForm',
 ascent: 'ascent',
 attributename: 'attributeName',
 attributetype: 'attributeType',
 autoreverse: 'autoReverse',
 azimuth: 'azimuth',
 basefrequency: 'baseFrequency',
 baselineshift: 'baselineShift',
 'baseline-shift': 'baselineShift',
 baseprofile: 'baseProfile',
 bbox: 'bbox',
 begin: 'begin',
 bias: 'bias',
 by: 'by',
 calcmode: 'calcMode',
 capheight: 'capHeight',
 'cap-height': 'capHeight',
 clip: 'clip',
 clippath: 'clipPath',
 'clip-path': 'clipPath',
 clippathunits: 'clipPathUnits',
 cliprule: 'clipRule',
 'clip-rule': 'clipRule',
 color: 'color',
 colorinterpolation: 'colorInterpolation',
 'color-interpolation': 'colorInterpolation',
 colorinterpolationfilters: 'colorInterpolationFilters',
 'color-interpolation-filters': 'colorInterpolationFilters',
 colorprofile: 'colorProfile',
 'color-profile': 'colorProfile',
 colorrendering: 'colorRendering',
 'color-rendering': 'colorRendering',
 contentscripttype: 'contentScriptType',
 contentstyletype: 'contentStyleType',
 cursor: 'cursor',
 cx: 'cx',
 cy: 'cy',
 d: 'd',
 datatype: 'datatype',
 decelerate: 'decelerate',
 descent: 'descent',
 diffuseconstant: 'diffuseConstant',
 direction: 'direction',
 display: 'display',
 divisor: 'divisor',
 dominantbaseline: 'dominantBaseline',
 'dominant-baseline': 'dominantBaseline',
 dur: 'dur',
 dx: 'dx',
 dy: 'dy',
 edgemode: 'edgeMode',
 elevation: 'elevation',
 enablebackground: 'enableBackground',
 'enable-background': 'enableBackground',
 end: 'end',
 exponent: 'exponent',
 externalresourcesrequired: 'externalResourcesRequired',
 fill: 'fill',
 fillopacity: 'fillOpacity',
 'fill-opacity': 'fillOpacity',
 fillrule: 'fillRule',
 'fill-rule': 'fillRule',
 filter: 'filter',
 filterres: 'filterRes',
 filterunits: 'filterUnits',
 floodopacity: 'floodOpacity',
 'flood-opacity': 'floodOpacity',
 floodcolor: 'floodColor',
 'flood-color': 'floodColor',
 focusable: 'focusable',
 fontfamily: 'fontFamily',
 'font-family': 'fontFamily',
 fontsize: 'fontSize',
 'font-size': 'fontSize',
 fontsizeadjust: 'fontSizeAdjust',
 'font-size-adjust': 'fontSizeAdjust',
 fontstretch: 'fontStretch',
 'font-stretch': 'fontStretch',
 fontstyle: 'fontStyle',
 'font-style': 'fontStyle',
 fontvariant: 'fontVariant',
 'font-variant': 'fontVariant',
 fontweight: 'fontWeight',
 'font-weight': 'fontWeight',
 format: 'format',
 from: 'from',
 fx: 'fx',
 fy: 'fy',
 g1: 'g1',
 g2: 'g2',
 glyphname: 'glyphName',
 'glyph-name': 'glyphName',
 glyphorientationhorizontal: 'glyphOrientationHorizontal',
 'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
 glyphorientationvertical: 'glyphOrientationVertical',
 'glyph-orientation-vertical': 'glyphOrientationVertical',
 glyphref: 'glyphRef',
 gradienttransform: 'gradientTransform',
 gradientunits: 'gradientUnits',
 hanging: 'hanging',
 horizadvx: 'horizAdvX',
 'horiz-adv-x': 'horizAdvX',
 horizoriginx: 'horizOriginX',
 'horiz-origin-x': 'horizOriginX',
 ideographic: 'ideographic',
 imagerendering: 'imageRendering',
 'image-rendering': 'imageRendering',
 in2: 'in2',
 in: 'in',
 inlist: 'inlist',
 intercept: 'intercept',
 k1: 'k1',
 k2: 'k2',
 k3: 'k3',
 k4: 'k4',
 k: 'k',
 kernelmatrix: 'kernelMatrix',
 kernelunitlength: 'kernelUnitLength',
 kerning: 'kerning',
 keypoints: 'keyPoints',
 keysplines: 'keySplines',
 keytimes: 'keyTimes',
 lengthadjust: 'lengthAdjust',
 letterspacing: 'letterSpacing',
 'letter-spacing': 'letterSpacing',
 lightingcolor: 'lightingColor',
 'lighting-color': 'lightingColor',
 limitingconeangle: 'limitingConeAngle',
 local: 'local',
 markerend: 'markerEnd',
 'marker-end': 'markerEnd',
 markerheight: 'markerHeight',
 markermid: 'markerMid',
 'marker-mid': 'markerMid',
 markerstart: 'markerStart',
 'marker-start': 'markerStart',
 markerunits: 'markerUnits',
 markerwidth: 'markerWidth',
 mask: 'mask',
 maskcontentunits: 'maskContentUnits',
 maskunits: 'maskUnits',
 mathematical: 'mathematical',
 mode: 'mode',
 numoctaves: 'numOctaves',
 offset: 'offset',
 opacity: 'opacity',
 operator: 'operator',
 order: 'order',
 orient: 'orient',
 orientation: 'orientation',
 origin: 'origin',
 overflow: 'overflow',
 overlineposition: 'overlinePosition',
 'overline-position': 'overlinePosition',
 overlinethickness: 'overlineThickness',
 'overline-thickness': 'overlineThickness',
 paintorder: 'paintOrder',
 'paint-order': 'paintOrder',
 panose1: 'panose1',
 'panose-1': 'panose1',
 pathlength: 'pathLength',
 patterncontentunits: 'patternContentUnits',
 patterntransform: 'patternTransform',
 patternunits: 'patternUnits',
 pointerevents: 'pointerEvents',
 'pointer-events': 'pointerEvents',
 points: 'points',
 pointsatx: 'pointsAtX',
 pointsaty: 'pointsAtY',
 pointsatz: 'pointsAtZ',
 prefix: 'prefix',
 preservealpha: 'preserveAlpha',
 preserveaspectratio: 'preserveAspectRatio',
 primitiveunits: 'primitiveUnits',
 property: 'property',
 r: 'r',
 radius: 'radius',
 refx: 'refX',
 refy: 'refY',
 renderingintent: 'renderingIntent',
 'rendering-intent': 'renderingIntent',
 repeatcount: 'repeatCount',
 repeatdur: 'repeatDur',
 requiredextensions: 'requiredExtensions',
 requiredfeatures: 'requiredFeatures',
 resource: 'resource',
 restart: 'restart',
 result: 'result',
 results: 'results',
 rotate: 'rotate',
 rx: 'rx',
 ry: 'ry',
 scale: 'scale',
 security: 'security',
 seed: 'seed',
 shaperendering: 'shapeRendering',
 'shape-rendering': 'shapeRendering',
 slope: 'slope',
 spacing: 'spacing',
 specularconstant: 'specularConstant',
 specularexponent: 'specularExponent',
 speed: 'speed',
 spreadmethod: 'spreadMethod',
 startoffset: 'startOffset',
 stddeviation: 'stdDeviation',
 stemh: 'stemh',
 stemv: 'stemv',
 stitchtiles: 'stitchTiles',
 stopcolor: 'stopColor',
 'stop-color': 'stopColor',
 stopopacity: 'stopOpacity',
 'stop-opacity': 'stopOpacity',
 strikethroughposition: 'strikethroughPosition',
 'strikethrough-position': 'strikethroughPosition',
 strikethroughthickness: 'strikethroughThickness',
 'strikethrough-thickness': 'strikethroughThickness',
 string: 'string',
 stroke: 'stroke',
 strokedasharray: 'strokeDasharray',
 'stroke-dasharray': 'strokeDasharray',
 strokedashoffset: 'strokeDashoffset',
 'stroke-dashoffset': 'strokeDashoffset',
 strokelinecap: 'strokeLinecap',
 'stroke-linecap': 'strokeLinecap',
 strokelinejoin: 'strokeLinejoin',
 'stroke-linejoin': 'strokeLinejoin',
 strokemiterlimit: 'strokeMiterlimit',
 'stroke-miterlimit': 'strokeMiterlimit',
 strokewidth: 'strokeWidth',
 'stroke-width': 'strokeWidth',
 strokeopacity: 'strokeOpacity',
 'stroke-opacity': 'strokeOpacity',
 suppresscontenteditablewarning: 'suppressContentEditableWarning',
 suppresshydrationwarning: 'suppressHydrationWarning',
 surfacescale: 'surfaceScale',
 systemlanguage: 'systemLanguage',
 tablevalues: 'tableValues',
 targetx: 'targetX',
 targety: 'targetY',
 textanchor: 'textAnchor',
 'text-anchor': 'textAnchor',
 textdecoration: 'textDecoration',
 'text-decoration': 'textDecoration',
 textlength: 'textLength',
 textrendering: 'textRendering',
 'text-rendering': 'textRendering',
 to: 'to',
 transform: 'transform',
 typeof: 'typeof',
 u1: 'u1',
 u2: 'u2',
 underlineposition: 'underlinePosition',
 'underline-position': 'underlinePosition',
 underlinethickness: 'underlineThickness',
 'underline-thickness': 'underlineThickness',
 unicode: 'unicode',
 unicodebidi: 'unicodeBidi',
 'unicode-bidi': 'unicodeBidi',
 unicoderange: 'unicodeRange',
 'unicode-range': 'unicodeRange',
 unitsperem: 'unitsPerEm',
 'units-per-em': 'unitsPerEm',
 unselectable: 'unselectable',
 valphabetic: 'vAlphabetic',
 'v-alphabetic': 'vAlphabetic',
 values: 'values',
 vectoreffect: 'vectorEffect',
 'vector-effect': 'vectorEffect',
 version: 'version',
 vertadvy: 'vertAdvY',
 'vert-adv-y': 'vertAdvY',
 vertoriginx: 'vertOriginX',
 'vert-origin-x': 'vertOriginX',
 vertoriginy: 'vertOriginY',
 'vert-origin-y': 'vertOriginY',
 vhanging: 'vHanging',
 'v-hanging': 'vHanging',
 videographic: 'vIdeographic',
 'v-ideographic': 'vIdeographic',
 viewbox: 'viewBox',
 viewtarget: 'viewTarget',
 visibility: 'visibility',
 vmathematical: 'vMathematical',
 'v-mathematical': 'vMathematical',
 vocab: 'vocab',
 widths: 'widths',
 wordspacing: 'wordSpacing',
 'word-spacing': 'wordSpacing',
 writingmode: 'writingMode',
 'writing-mode': 'writingMode',
 x1: 'x1',
 x2: 'x2',
 x: 'x',
 xchannelselector: 'xChannelSelector',
 xheight: 'xHeight',
 'x-height': 'xHeight',
 xlinkactuate: 'xlinkActuate',
 'xlink:actuate': 'xlinkActuate',
 xlinkarcrole: 'xlinkArcrole',
 'xlink:arcrole': 'xlinkArcrole',
 xlinkhref: 'xlinkHref',
 'xlink:href': 'xlinkHref',
 xlinkrole: 'xlinkRole',
 'xlink:role': 'xlinkRole',
 xlinkshow: 'xlinkShow',
 'xlink:show': 'xlinkShow',
 xlinktitle: 'xlinkTitle',
 'xlink:title': 'xlinkTitle',
 xlinktype: 'xlinkType',
 'xlink:type': 'xlinkType',
 xmlbase: 'xmlBase',
 'xml:base': 'xmlBase',
 xmllang: 'xmlLang',
 'xml:lang': 'xmlLang',
 xmlns: 'xmlns',
 'xml:space': 'xmlSpace',
 xmlnsxlink: 'xmlnsXlink',
 'xmlns:xlink': 'xmlnsXlink',
 xmlspace: 'xmlSpace',
 y1: 'y1',
 y2: 'y2',
 y: 'y',
 ychannelselector: 'yChannelSelector',
 z: 'z',
 zoomandpan: 'zoomAndPan'
};

var ariaProperties = {
 'aria-current': 0, // state
 'aria-details': 0,
 'aria-disabled': 0, // state
 'aria-hidden': 0, // state
 'aria-invalid': 0, // state
 'aria-keyshortcuts': 0,
 'aria-label': 0,
 'aria-roledescription': 0,
 // Widget Attributes
 'aria-autocomplete': 0,
 'aria-checked': 0,
 'aria-expanded': 0,
 'aria-haspopup': 0,
 'aria-level': 0,
 'aria-modal': 0,
 'aria-multiline': 0,
 'aria-multiselectable': 0,
 'aria-orientation': 0,
 'aria-placeholder': 0,
 'aria-pressed': 0,
 'aria-readonly': 0,
 'aria-required': 0,
 'aria-selected': 0,
 'aria-sort': 0,
 'aria-valuemax': 0,
 'aria-valuemin': 0,
 'aria-valuenow': 0,
 'aria-valuetext': 0,
 // Live Region Attributes
 'aria-atomic': 0,
 'aria-busy': 0,
 'aria-live': 0,
 'aria-relevant': 0,
 // Drag-and-Drop Attributes
 'aria-dropeffect': 0,
 'aria-grabbed': 0,
 // Relationship Attributes
 'aria-activedescendant': 0,
 'aria-colcount': 0,
 'aria-colindex': 0,
 'aria-colspan': 0,
 'aria-controls': 0,
 'aria-describedby': 0,
 'aria-errormessage': 0,
 'aria-flowto': 0,
 'aria-labelledby': 0,
 'aria-owns': 0,
 'aria-posinset': 0,
 'aria-rowcount': 0,
 'aria-rowindex': 0,
 'aria-rowspan': 0,
 'aria-setsize': 0
};

var warnedProperties = {};
var rARIA = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
var rARIACamel = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

var hasOwnProperty$2 = Object.prototype.hasOwnProperty;

function getStackAddendum() {
 var stack = ReactDebugCurrentFrame.getStackAddendum();
 return stack != null ? stack : '';
}

function validateProperty(tagName, name) {
 if (hasOwnProperty$2.call(warnedProperties, name) && warnedProperties[name]) {
   return true;
 }

 if (rARIACamel.test(name)) {
   var ariaName = 'aria-' + name.slice(4).toLowerCase();
   var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;

   // If this is an aria-* attribute, but is not listed in the known DOM
   // DOM properties, then it is an invalid aria-* attribute.
   if (correctName == null) {
     warning_1(false, 'Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.%s', name, getStackAddendum());
     warnedProperties[name] = true;
     return true;
   }
   // aria-* attributes should be lowercase; suggest the lowercase version.
   if (name !== correctName) {
     warning_1(false, 'Invalid ARIA attribute `%s`. Did you mean `%s`?%s', name, correctName, getStackAddendum());
     warnedProperties[name] = true;
     return true;
   }
 }

 if (rARIA.test(name)) {
   var lowerCasedName = name.toLowerCase();
   var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;

   // If this is an aria-* attribute, but is not listed in the known DOM
   // DOM properties, then it is an invalid aria-* attribute.
   if (standardName == null) {
     warnedProperties[name] = true;
     return false;
   }
   // aria-* attributes should be lowercase; suggest the lowercase version.
   if (name !== standardName) {
     warning_1(false, 'Unknown ARIA attribute `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum());
     warnedProperties[name] = true;
     return true;
   }
 }

 return true;
}

function warnInvalidARIAProps(type, props) {
 var invalidProps = [];

 for (var key in props) {
   var isValid = validateProperty(type, key);
   if (!isValid) {
     invalidProps.push(key);
   }
 }

 var unknownPropString = invalidProps.map(function (prop) {
   return '`' + prop + '`';
 }).join(', ');

 if (invalidProps.length === 1) {
   warning_1(false, 'Invalid aria prop %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum());
 } else if (invalidProps.length > 1) {
   warning_1(false, 'Invalid aria props %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum());
 }
}

function validateProperties(type, props) {
 if (isCustomComponent(type, props)) {
   return;
 }
 warnInvalidARIAProps(type, props);
}

var didWarnValueNull = false;

function getStackAddendum$1() {
 var stack = ReactDebugCurrentFrame.getStackAddendum();
 return stack != null ? stack : '';
}

function validateProperties$1(type, props) {
 if (type !== 'input' && type !== 'textarea' && type !== 'select') {
   return;
 }

 if (props != null && props.value === null && !didWarnValueNull) {
   didWarnValueNull = true;
   if (type === 'select' && props.multiple) {
     warning_1(false, '`value` prop on `%s` should not be null. ' + 'Consider using an empty array when `multiple` is set to `true` ' + 'to clear the component or `undefined` for uncontrolled components.%s', type, getStackAddendum$1());
   } else {
     warning_1(false, '`value` prop on `%s` should not be null. ' + 'Consider using an empty string to clear the component or `undefined` ' + 'for uncontrolled components.%s', type, getStackAddendum$1());
   }
 }
}

function getStackAddendum$2() {
 var stack = ReactDebugCurrentFrame.getStackAddendum();
 return stack != null ? stack : '';
}

var validateProperty$1 = function () {};

{
 var warnedProperties$1 = {};
 var _hasOwnProperty = Object.prototype.hasOwnProperty;
 var EVENT_NAME_REGEX = /^on./;
 var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
 var rARIA$1 = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
 var rARIACamel$1 = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

 validateProperty$1 = function (tagName, name, value, canUseEventSystem) {
   if (_hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
     return true;
   }

   var lowerCasedName = name.toLowerCase();
   if (lowerCasedName === 'onfocusin' || lowerCasedName === 'onfocusout') {
     warning_1(false, 'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.');
     warnedProperties$1[name] = true;
     return true;
   }

   // We can't rely on the event system being injected on the server.
   if (canUseEventSystem) {
     if (registrationNameModules.hasOwnProperty(name)) {
       return true;
     }
     var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
     if (registrationName != null) {
       warning_1(false, 'Invalid event handler property `%s`. Did you mean `%s`?%s', name, registrationName, getStackAddendum$2());
       warnedProperties$1[name] = true;
       return true;
     }
     if (EVENT_NAME_REGEX.test(name)) {
       warning_1(false, 'Unknown event handler property `%s`. It will be ignored.%s', name, getStackAddendum$2());
       warnedProperties$1[name] = true;
       return true;
     }
   } else if (EVENT_NAME_REGEX.test(name)) {
     // If no event plugins have been injected, we are in a server environment.
     // So we can't tell if the event name is correct for sure, but we can filter
     // out known bad ones like `onclick`. We can't suggest a specific replacement though.
     if (INVALID_EVENT_NAME_REGEX.test(name)) {
       warning_1(false, 'Invalid event handler property `%s`. ' + 'React events use the camelCase naming convention, for example `onClick`.%s', name, getStackAddendum$2());
     }
     warnedProperties$1[name] = true;
     return true;
   }

   // Let the ARIA attribute hook validate ARIA attributes
   if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
     return true;
   }

   if (lowerCasedName === 'innerhtml') {
     warning_1(false, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.');
     warnedProperties$1[name] = true;
     return true;
   }

   if (lowerCasedName === 'aria') {
     warning_1(false, 'The `aria` attribute is reserved for future use in React. ' + 'Pass individual `aria-` attributes instead.');
     warnedProperties$1[name] = true;
     return true;
   }

   if (lowerCasedName === 'is' && value !== null && value !== undefined && typeof value !== 'string') {
     warning_1(false, 'Received a `%s` for a string attribute `is`. If this is expected, cast ' + 'the value to a string.%s', typeof value, getStackAddendum$2());
     warnedProperties$1[name] = true;
     return true;
   }

   if (typeof value === 'number' && isNaN(value)) {
     warning_1(false, 'Received NaN for the `%s` attribute. If this is expected, cast ' + 'the value to a string.%s', name, getStackAddendum$2());
     warnedProperties$1[name] = true;
     return true;
   }

   var propertyInfo = getPropertyInfo(name);
   var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;

   // Known attributes should match the casing specified in the property config.
   if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
     var standardName = possibleStandardNames[lowerCasedName];
     if (standardName !== name) {
       warning_1(false, 'Invalid DOM property `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum$2());
       warnedProperties$1[name] = true;
       return true;
     }
   } else if (!isReserved && name !== lowerCasedName) {
     // Unknown attributes should have lowercase casing since that's how they
     // will be cased anyway with server rendering.
     warning_1(false, 'React does not recognize the `%s` prop on a DOM element. If you ' + 'intentionally want it to appear in the DOM as a custom ' + 'attribute, spell it as lowercase `%s` instead. ' + 'If you accidentally passed it from a parent component, remove ' + 'it from the DOM element.%s', name, lowerCasedName, getStackAddendum$2());
     warnedProperties$1[name] = true;
     return true;
   }

   if (typeof value === 'boolean' && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
     if (value) {
       warning_1(false, 'Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.%s', value, name, name, value, name, getStackAddendum$2());
     } else {
       warning_1(false, 'Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.%s', value, name, name, value, name, name, name, getStackAddendum$2());
     }
     warnedProperties$1[name] = true;
     return true;
   }

   // Now that we've validated casing, do not validate
   // data types for reserved props
   if (isReserved) {
     return true;
   }

   // Warn when a known attribute is a bad type
   if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
     warnedProperties$1[name] = true;
     return false;
   }

   return true;
 };
}

var warnUnknownProperties = function (type, props, canUseEventSystem) {
 var unknownProps = [];
 for (var key in props) {
   var isValid = validateProperty$1(type, key, props[key], canUseEventSystem);
   if (!isValid) {
     unknownProps.push(key);
   }
 }

 var unknownPropString = unknownProps.map(function (prop) {
   return '`' + prop + '`';
 }).join(', ');
 if (unknownProps.length === 1) {
   warning_1(false, 'Invalid value for prop %s on <%s> tag. Either remove it from the element, ' + 'or pass a string or number value to keep it in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$2());
 } else if (unknownProps.length > 1) {
   warning_1(false, 'Invalid values for props %s on <%s> tag. Either remove them from the element, ' + 'or pass a string or number value to keep them in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$2());
 }
};

function validateProperties$2(type, props, canUseEventSystem) {
 if (isCustomComponent(type, props)) {
   return;
 }
 warnUnknownProperties(type, props, canUseEventSystem);
}

// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberOwnerName$2 = ReactDebugCurrentFiber.getCurrentFiberOwnerName;
var getCurrentFiberStackAddendum$2 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

var didWarnInvalidHydration = false;
var didWarnShadyDOM = false;

var DANGEROUSLY_SET_INNER_HTML = 'dangerouslySetInnerHTML';
var SUPPRESS_CONTENT_EDITABLE_WARNING = 'suppressContentEditableWarning';
var SUPPRESS_HYDRATION_WARNING$1 = 'suppressHydrationWarning';
var AUTOFOCUS = 'autoFocus';
var CHILDREN = 'children';
var STYLE = 'style';
var HTML = '__html';

var HTML_NAMESPACE = Namespaces.html;


var getStack = emptyFunction_1.thatReturns('');

var warnedUnknownTags = void 0;
var suppressHydrationWarning = void 0;

var validatePropertiesInDevelopment = void 0;
var warnForTextDifference = void 0;
var warnForPropDifference = void 0;
var warnForExtraAttributes = void 0;
var warnForInvalidEventListener = void 0;

var normalizeMarkupForTextOrAttribute = void 0;
var normalizeHTML = void 0;

{
 getStack = getCurrentFiberStackAddendum$2;

 warnedUnknownTags = {
   // Chrome is the only major browser not shipping <time>. But as of July
   // 2017 it intends to ship it due to widespread usage. We intentionally
   // *don't* warn for <time> even if it's unrecognized by Chrome because
   // it soon will be, and many apps have been using it anyway.
   time: true,
   // There are working polyfills for <dialog>. Let people use it.
   dialog: true
 };

 validatePropertiesInDevelopment = function (type, props) {
   validateProperties(type, props);
   validateProperties$1(type, props);
   validateProperties$2(type, props, /* canUseEventSystem */true);
 };

 // HTML parsing normalizes CR and CRLF to LF.
 // It also can turn \u0000 into \uFFFD inside attributes.
 // https://www.w3.org/TR/html5/single-page.html#preprocessing-the-input-stream
 // If we have a mismatch, it might be caused by that.
 // We will still patch up in this case but not fire the warning.
 var NORMALIZE_NEWLINES_REGEX = /\r\n?/g;
 var NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;

 normalizeMarkupForTextOrAttribute = function (markup) {
   var markupString = typeof markup === 'string' ? markup : '' + markup;
   return markupString.replace(NORMALIZE_NEWLINES_REGEX, '\n').replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, '');
 };

 warnForTextDifference = function (serverText, clientText) {
   if (didWarnInvalidHydration) {
     return;
   }
   var normalizedClientText = normalizeMarkupForTextOrAttribute(clientText);
   var normalizedServerText = normalizeMarkupForTextOrAttribute(serverText);
   if (normalizedServerText === normalizedClientText) {
     return;
   }
   didWarnInvalidHydration = true;
   warning_1(false, 'Text content did not match. Server: "%s" Client: "%s"', normalizedServerText, normalizedClientText);
 };

 warnForPropDifference = function (propName, serverValue, clientValue) {
   if (didWarnInvalidHydration) {
     return;
   }
   var normalizedClientValue = normalizeMarkupForTextOrAttribute(clientValue);
   var normalizedServerValue = normalizeMarkupForTextOrAttribute(serverValue);
   if (normalizedServerValue === normalizedClientValue) {
     return;
   }
   didWarnInvalidHydration = true;
   warning_1(false, 'Prop `%s` did not match. Server: %s Client: %s', propName, JSON.stringify(normalizedServerValue), JSON.stringify(normalizedClientValue));
 };

 warnForExtraAttributes = function (attributeNames) {
   if (didWarnInvalidHydration) {
     return;
   }
   didWarnInvalidHydration = true;
   var names = [];
   attributeNames.forEach(function (name) {
     names.push(name);
   });
   warning_1(false, 'Extra attributes from the server: %s', names);
 };

 warnForInvalidEventListener = function (registrationName, listener) {
   if (listener === false) {
     warning_1(false, 'Expected `%s` listener to be a function, instead got `false`.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.%s', registrationName, registrationName, registrationName, getCurrentFiberStackAddendum$2());
   } else {
     warning_1(false, 'Expected `%s` listener to be a function, instead got a value of `%s` type.%s', registrationName, typeof listener, getCurrentFiberStackAddendum$2());
   }
 };

 // Parse the HTML and read it back to normalize the HTML string so that it
 // can be used for comparison.
 normalizeHTML = function (parent, html) {
   // We could have created a separate document here to avoid
   // re-initializing custom elements if they exist. But this breaks
   // how <noscript> is being handled. So we use the same document.
   // See the discussion in https://github.com/facebook/react/pull/11157.
   var testElement = parent.namespaceURI === HTML_NAMESPACE ? parent.ownerDocument.createElement(parent.tagName) : parent.ownerDocument.createElementNS(parent.namespaceURI, parent.tagName);
   testElement.innerHTML = html;
   return testElement.innerHTML;
 };
}

function ensureListeningTo(rootContainerElement, registrationName) {
 var isDocumentOrFragment = rootContainerElement.nodeType === DOCUMENT_NODE || rootContainerElement.nodeType === DOCUMENT_FRAGMENT_NODE;
 var doc = isDocumentOrFragment ? rootContainerElement : rootContainerElement.ownerDocument;
 listenTo(registrationName, doc);
}

function getOwnerDocumentFromRootContainer(rootContainerElement) {
 return rootContainerElement.nodeType === DOCUMENT_NODE ? rootContainerElement : rootContainerElement.ownerDocument;
}

function trapClickOnNonInteractiveElement(node) {
 // Mobile Safari does not fire properly bubble click events on
 // non-interactive elements, which means delegated click listeners do not
 // fire. The workaround for this bug involves attaching an empty click
 // listener on the target node.
 // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
 // Just set it using the onclick property so that we don't have to manage any
 // bookkeeping for it. Not sure if we need to clear it when the listener is
 // removed.
 // TODO: Only do this for the relevant Safaris maybe?
 node.onclick = emptyFunction_1;
}

function setInitialDOMProperties(tag, domElement, rootContainerElement, nextProps, isCustomComponentTag) {
 for (var propKey in nextProps) {
   if (!nextProps.hasOwnProperty(propKey)) {
     continue;
   }
   var nextProp = nextProps[propKey];
   if (propKey === STYLE) {
     {
       if (nextProp) {
         // Freeze the next style object so that we can assume it won't be
         // mutated. We have already warned for this in the past.
         Object.freeze(nextProp);
       }
     }
     // Relies on `updateStylesByID` not mutating `styleUpdates`.
     setValueForStyles(domElement, nextProp, getStack);
   } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
     var nextHtml = nextProp ? nextProp[HTML] : undefined;
     if (nextHtml != null) {
       setInnerHTML(domElement, nextHtml);
     }
   } else if (propKey === CHILDREN) {
     if (typeof nextProp === 'string') {
       // Avoid setting initial textContent when the text is empty. In IE11 setting
       // textContent on a <textarea> will cause the placeholder to not
       // show within the <textarea> until it has been focused and blurred again.
       // https://github.com/facebook/react/issues/6731#issuecomment-254874553
       var canSetTextContent = tag !== 'textarea' || nextProp !== '';
       if (canSetTextContent) {
         setTextContent(domElement, nextProp);
       }
     } else if (typeof nextProp === 'number') {
       setTextContent(domElement, '' + nextProp);
     }
   } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1) {
     // Noop
   } else if (propKey === AUTOFOCUS) {
     // We polyfill it separately on the client during commit.
     // We blacklist it here rather than in the property list because we emit it in SSR.
   } else if (registrationNameModules.hasOwnProperty(propKey)) {
     if (nextProp != null) {
       if (true && typeof nextProp !== 'function') {
         warnForInvalidEventListener(propKey, nextProp);
       }
       ensureListeningTo(rootContainerElement, propKey);
     }
   } else if (nextProp != null) {
     setValueForProperty(domElement, propKey, nextProp, isCustomComponentTag);
   }
 }
}

function updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag) {
 // TODO: Handle wasCustomComponentTag
 for (var i = 0; i < updatePayload.length; i += 2) {
   var propKey = updatePayload[i];
   var propValue = updatePayload[i + 1];
   if (propKey === STYLE) {
     setValueForStyles(domElement, propValue, getStack);
   } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
     setInnerHTML(domElement, propValue);
   } else if (propKey === CHILDREN) {
     setTextContent(domElement, propValue);
   } else {
     setValueForProperty(domElement, propKey, propValue, isCustomComponentTag);
   }
 }
}

function createElement$1(type, props, rootContainerElement, parentNamespace) {
 var isCustomComponentTag = void 0;

 // We create tags in the namespace of their parent container, except HTML
 // tags get no namespace.
 var ownerDocument = getOwnerDocumentFromRootContainer(rootContainerElement);
 var domElement = void 0;
 var namespaceURI = parentNamespace;
 if (namespaceURI === HTML_NAMESPACE) {
   namespaceURI = getIntrinsicNamespace(type);
 }
 if (namespaceURI === HTML_NAMESPACE) {
   {
     isCustomComponentTag = isCustomComponent(type, props);
     // Should this check be gated by parent namespace? Not sure we want to
     // allow <SVG> or <mATH>.
     !(isCustomComponentTag || type === type.toLowerCase()) ? warning_1(false, '<%s /> is using incorrect casing. ' + 'Use PascalCase for React components, ' + 'or lowercase for HTML elements.', type) : void 0;
   }

   if (type === 'script') {
     // Create the script via .innerHTML so its "parser-inserted" flag is
     // set to true and it does not execute
     var div = ownerDocument.createElement('div');
     div.innerHTML = '<script><' + '/script>'; // eslint-disable-line
     // This is guaranteed to yield a script element.
     var firstChild = div.firstChild;
     domElement = div.removeChild(firstChild);
   } else if (typeof props.is === 'string') {
     // $FlowIssue `createElement` should be updated for Web Components
     domElement = ownerDocument.createElement(type, { is: props.is });
   } else {
     // Separate else branch instead of using `props.is || undefined` above because of a Firefox bug.
     // See discussion in https://github.com/facebook/react/pull/6896
     // and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
     domElement = ownerDocument.createElement(type);
   }
 } else {
   domElement = ownerDocument.createElementNS(namespaceURI, type);
 }

 {
   if (namespaceURI === HTML_NAMESPACE) {
     if (!isCustomComponentTag && Object.prototype.toString.call(domElement) === '[object HTMLUnknownElement]' && !Object.prototype.hasOwnProperty.call(warnedUnknownTags, type)) {
       warnedUnknownTags[type] = true;
       warning_1(false, 'The tag <%s> is unrecognized in this browser. ' + 'If you meant to render a React component, start its name with ' + 'an uppercase letter.', type);
     }
   }
 }

 return domElement;
}

function createTextNode$1(text, rootContainerElement) {
 return getOwnerDocumentFromRootContainer(rootContainerElement).createTextNode(text);
}

function setInitialProperties$1(domElement, tag, rawProps, rootContainerElement) {
 var isCustomComponentTag = isCustomComponent(tag, rawProps);
 {
   validatePropertiesInDevelopment(tag, rawProps);
   if (isCustomComponentTag && !didWarnShadyDOM && domElement.shadyRoot) {
     warning_1(false, '%s is using shady DOM. Using shady DOM with React can ' + 'cause things to break subtly.', getCurrentFiberOwnerName$2() || 'A component');
     didWarnShadyDOM = true;
   }
 }

 // TODO: Make sure that we check isMounted before firing any of these events.
 var props = void 0;
 switch (tag) {
   case 'iframe':
   case 'object':
     trapBubbledEvent(TOP_LOAD, domElement);
     props = rawProps;
     break;
   case 'video':
   case 'audio':
     // Create listener for each media event
     for (var i = 0; i < mediaEventTypes.length; i++) {
       trapBubbledEvent(mediaEventTypes[i], domElement);
     }
     props = rawProps;
     break;
   case 'source':
     trapBubbledEvent(TOP_ERROR, domElement);
     props = rawProps;
     break;
   case 'img':
   case 'image':
   case 'link':
     trapBubbledEvent(TOP_ERROR, domElement);
     trapBubbledEvent(TOP_LOAD, domElement);
     props = rawProps;
     break;
   case 'form':
     trapBubbledEvent(TOP_RESET, domElement);
     trapBubbledEvent(TOP_SUBMIT, domElement);
     props = rawProps;
     break;
   case 'details':
     trapBubbledEvent(TOP_TOGGLE, domElement);
     props = rawProps;
     break;
   case 'input':
     initWrapperState(domElement, rawProps);
     props = getHostProps(domElement, rawProps);
     trapBubbledEvent(TOP_INVALID, domElement);
     // For controlled components we always need to ensure we're listening
     // to onChange. Even if there is no listener.
     ensureListeningTo(rootContainerElement, 'onChange');
     break;
   case 'option':
     validateProps(domElement, rawProps);
     props = getHostProps$1(domElement, rawProps);
     break;
   case 'select':
     initWrapperState$1(domElement, rawProps);
     props = getHostProps$2(domElement, rawProps);
     trapBubbledEvent(TOP_INVALID, domElement);
     // For controlled components we always need to ensure we're listening
     // to onChange. Even if there is no listener.
     ensureListeningTo(rootContainerElement, 'onChange');
     break;
   case 'textarea':
     initWrapperState$2(domElement, rawProps);
     props = getHostProps$3(domElement, rawProps);
     trapBubbledEvent(TOP_INVALID, domElement);
     // For controlled components we always need to ensure we're listening
     // to onChange. Even if there is no listener.
     ensureListeningTo(rootContainerElement, 'onChange');
     break;
   default:
     props = rawProps;
 }

 assertValidProps(tag, props, getStack);

 setInitialDOMProperties(tag, domElement, rootContainerElement, props, isCustomComponentTag);

 switch (tag) {
   case 'input':
     // TODO: Make sure we check if this is still unmounted or do any clean
     // up necessary since we never stop tracking anymore.
     track(domElement);
     postMountWrapper(domElement, rawProps, false);
     break;
   case 'textarea':
     // TODO: Make sure we check if this is still unmounted or do any clean
     // up necessary since we never stop tracking anymore.
     track(domElement);
     postMountWrapper$3(domElement, rawProps);
     break;
   case 'option':
     postMountWrapper$1(domElement, rawProps);
     break;
   case 'select':
     postMountWrapper$2(domElement, rawProps);
     break;
   default:
     if (typeof props.onClick === 'function') {
       // TODO: This cast may not be sound for SVG, MathML or custom elements.
       trapClickOnNonInteractiveElement(domElement);
     }
     break;
 }
}

// Calculate the diff between the two objects.
function diffProperties$1(domElement, tag, lastRawProps, nextRawProps, rootContainerElement) {
 {
   validatePropertiesInDevelopment(tag, nextRawProps);
 }

 var updatePayload = null;

 var lastProps = void 0;
 var nextProps = void 0;
 switch (tag) {
   case 'input':
     lastProps = getHostProps(domElement, lastRawProps);
     nextProps = getHostProps(domElement, nextRawProps);
     updatePayload = [];
     break;
   case 'option':
     lastProps = getHostProps$1(domElement, lastRawProps);
     nextProps = getHostProps$1(domElement, nextRawProps);
     updatePayload = [];
     break;
   case 'select':
     lastProps = getHostProps$2(domElement, lastRawProps);
     nextProps = getHostProps$2(domElement, nextRawProps);
     updatePayload = [];
     break;
   case 'textarea':
     lastProps = getHostProps$3(domElement, lastRawProps);
     nextProps = getHostProps$3(domElement, nextRawProps);
     updatePayload = [];
     break;
   default:
     lastProps = lastRawProps;
     nextProps = nextRawProps;
     if (typeof lastProps.onClick !== 'function' && typeof nextProps.onClick === 'function') {
       // TODO: This cast may not be sound for SVG, MathML or custom elements.
       trapClickOnNonInteractiveElement(domElement);
     }
     break;
 }

 assertValidProps(tag, nextProps, getStack);

 var propKey = void 0;
 var styleName = void 0;
 var styleUpdates = null;
 for (propKey in lastProps) {
   if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
     continue;
   }
   if (propKey === STYLE) {
     var lastStyle = lastProps[propKey];
     for (styleName in lastStyle) {
       if (lastStyle.hasOwnProperty(styleName)) {
         if (!styleUpdates) {
           styleUpdates = {};
         }
         styleUpdates[styleName] = '';
       }
     }
   } else if (propKey === DANGEROUSLY_SET_INNER_HTML || propKey === CHILDREN) {
     // Noop. This is handled by the clear text mechanism.
   } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1) {
     // Noop
   } else if (propKey === AUTOFOCUS) {
     // Noop. It doesn't work on updates anyway.
   } else if (registrationNameModules.hasOwnProperty(propKey)) {
     // This is a special case. If any listener updates we need to ensure
     // that the "current" fiber pointer gets updated so we need a commit
     // to update this element.
     if (!updatePayload) {
       updatePayload = [];
     }
   } else {
     // For all other deleted properties we add it to the queue. We use
     // the whitelist in the commit phase instead.
     (updatePayload = updatePayload || []).push(propKey, null);
   }
 }
 for (propKey in nextProps) {
   var nextProp = nextProps[propKey];
   var lastProp = lastProps != null ? lastProps[propKey] : undefined;
   if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
     continue;
   }
   if (propKey === STYLE) {
     {
       if (nextProp) {
         // Freeze the next style object so that we can assume it won't be
         // mutated. We have already warned for this in the past.
         Object.freeze(nextProp);
       }
     }
     if (lastProp) {
       // Unset styles on `lastProp` but not on `nextProp`.
       for (styleName in lastProp) {
         if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
           if (!styleUpdates) {
             styleUpdates = {};
           }
           styleUpdates[styleName] = '';
         }
       }
       // Update styles that changed since `lastProp`.
       for (styleName in nextProp) {
         if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
           if (!styleUpdates) {
             styleUpdates = {};
           }
           styleUpdates[styleName] = nextProp[styleName];
         }
       }
     } else {
       // Relies on `updateStylesByID` not mutating `styleUpdates`.
       if (!styleUpdates) {
         if (!updatePayload) {
           updatePayload = [];
         }
         updatePayload.push(propKey, styleUpdates);
       }
       styleUpdates = nextProp;
     }
   } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
     var nextHtml = nextProp ? nextProp[HTML] : undefined;
     var lastHtml = lastProp ? lastProp[HTML] : undefined;
     if (nextHtml != null) {
       if (lastHtml !== nextHtml) {
         (updatePayload = updatePayload || []).push(propKey, '' + nextHtml);
       }
     } else {
       // TODO: It might be too late to clear this if we have children
       // inserted already.
     }
   } else if (propKey === CHILDREN) {
     if (lastProp !== nextProp && (typeof nextProp === 'string' || typeof nextProp === 'number')) {
       (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
     }
   } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1) {
     // Noop
   } else if (registrationNameModules.hasOwnProperty(propKey)) {
     if (nextProp != null) {
       // We eagerly listen to this even though we haven't committed yet.
       if (true && typeof nextProp !== 'function') {
         warnForInvalidEventListener(propKey, nextProp);
       }
       ensureListeningTo(rootContainerElement, propKey);
     }
     if (!updatePayload && lastProp !== nextProp) {
       // This is a special case. If any listener updates we need to ensure
       // that the "current" props pointer gets updated so we need a commit
       // to update this element.
       updatePayload = [];
     }
   } else {
     // For any other property we always add it to the queue and then we
     // filter it out using the whitelist during the commit.
     (updatePayload = updatePayload || []).push(propKey, nextProp);
   }
 }
 if (styleUpdates) {
   (updatePayload = updatePayload || []).push(STYLE, styleUpdates);
 }
 return updatePayload;
}

// Apply the diff.
function updateProperties$1(domElement, updatePayload, tag, lastRawProps, nextRawProps) {
 // Update checked *before* name.
 // In the middle of an update, it is possible to have multiple checked.
 // When a checked radio tries to change name, browser makes another radio's checked false.
 if (tag === 'input' && nextRawProps.type === 'radio' && nextRawProps.name != null) {
   updateChecked(domElement, nextRawProps);
 }

 var wasCustomComponentTag = isCustomComponent(tag, lastRawProps);
 var isCustomComponentTag = isCustomComponent(tag, nextRawProps);
 // Apply the diff.
 updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag);

 // TODO: Ensure that an update gets scheduled if any of the special props
 // changed.
 switch (tag) {
   case 'input':
     // Update the wrapper around inputs *after* updating props. This has to
     // happen after `updateDOMProperties`. Otherwise HTML5 input validations
     // raise warnings and prevent the new value from being assigned.
     updateWrapper(domElement, nextRawProps);
     break;
   case 'textarea':
     updateWrapper$1(domElement, nextRawProps);
     break;
   case 'select':
     // <select> value update needs to occur after <option> children
     // reconciliation
     postUpdateWrapper(domElement, nextRawProps);
     break;
 }
}

function getPossibleStandardName(propName) {
 {
   var lowerCasedName = propName.toLowerCase();
   if (!possibleStandardNames.hasOwnProperty(lowerCasedName)) {
     return null;
   }
   return possibleStandardNames[lowerCasedName] || null;
 }
 return null;
}

function diffHydratedProperties$1(domElement, tag, rawProps, parentNamespace, rootContainerElement) {
 var isCustomComponentTag = void 0;
 var extraAttributeNames = void 0;

 {
   suppressHydrationWarning = rawProps[SUPPRESS_HYDRATION_WARNING$1] === true;
   isCustomComponentTag = isCustomComponent(tag, rawProps);
   validatePropertiesInDevelopment(tag, rawProps);
   if (isCustomComponentTag && !didWarnShadyDOM && domElement.shadyRoot) {
     warning_1(false, '%s is using shady DOM. Using shady DOM with React can ' + 'cause things to break subtly.', getCurrentFiberOwnerName$2() || 'A component');
     didWarnShadyDOM = true;
   }
 }

 // TODO: Make sure that we check isMounted before firing any of these events.
 switch (tag) {
   case 'iframe':
   case 'object':
     trapBubbledEvent(TOP_LOAD, domElement);
     break;
   case 'video':
   case 'audio':
     // Create listener for each media event
     for (var i = 0; i < mediaEventTypes.length; i++) {
       trapBubbledEvent(mediaEventTypes[i], domElement);
     }
     break;
   case 'source':
     trapBubbledEvent(TOP_ERROR, domElement);
     break;
   case 'img':
   case 'image':
   case 'link':
     trapBubbledEvent(TOP_ERROR, domElement);
     trapBubbledEvent(TOP_LOAD, domElement);
     break;
   case 'form':
     trapBubbledEvent(TOP_RESET, domElement);
     trapBubbledEvent(TOP_SUBMIT, domElement);
     break;
   case 'details':
     trapBubbledEvent(TOP_TOGGLE, domElement);
     break;
   case 'input':
     initWrapperState(domElement, rawProps);
     trapBubbledEvent(TOP_INVALID, domElement);
     // For controlled components we always need to ensure we're listening
     // to onChange. Even if there is no listener.
     ensureListeningTo(rootContainerElement, 'onChange');
     break;
   case 'option':
     validateProps(domElement, rawProps);
     break;
   case 'select':
     initWrapperState$1(domElement, rawProps);
     trapBubbledEvent(TOP_INVALID, domElement);
     // For controlled components we always need to ensure we're listening
     // to onChange. Even if there is no listener.
     ensureListeningTo(rootContainerElement, 'onChange');
     break;
   case 'textarea':
     initWrapperState$2(domElement, rawProps);
     trapBubbledEvent(TOP_INVALID, domElement);
     // For controlled components we always need to ensure we're listening
     // to onChange. Even if there is no listener.
     ensureListeningTo(rootContainerElement, 'onChange');
     break;
 }

 assertValidProps(tag, rawProps, getStack);

 {
   extraAttributeNames = new Set();
   var attributes = domElement.attributes;
   for (var _i = 0; _i < attributes.length; _i++) {
     var name = attributes[_i].name.toLowerCase();
     switch (name) {
       // Built-in SSR attribute is whitelisted
       case 'data-reactroot':
         break;
       // Controlled attributes are not validated
       // TODO: Only ignore them on controlled tags.
       case 'value':
         break;
       case 'checked':
         break;
       case 'selected':
         break;
       default:
         // Intentionally use the original name.
         // See discussion in https://github.com/facebook/react/pull/10676.
         extraAttributeNames.add(attributes[_i].name);
     }
   }
 }

 var updatePayload = null;
 for (var propKey in rawProps) {
   if (!rawProps.hasOwnProperty(propKey)) {
     continue;
   }
   var nextProp = rawProps[propKey];
   if (propKey === CHILDREN) {
     // For text content children we compare against textContent. This
     // might match additional HTML that is hidden when we read it using
     // textContent. E.g. "foo" will match "f<span>oo</span>" but that still
     // satisfies our requirement. Our requirement is not to produce perfect
     // HTML and attributes. Ideally we should preserve structure but it's
     // ok not to if the visible content is still enough to indicate what
     // even listeners these nodes might be wired up to.
     // TODO: Warn if there is more than a single textNode as a child.
     // TODO: Should we use domElement.firstChild.nodeValue to compare?
     if (typeof nextProp === 'string') {
       if (domElement.textContent !== nextProp) {
         if (true && !suppressHydrationWarning) {
           warnForTextDifference(domElement.textContent, nextProp);
         }
         updatePayload = [CHILDREN, nextProp];
       }
     } else if (typeof nextProp === 'number') {
       if (domElement.textContent !== '' + nextProp) {
         if (true && !suppressHydrationWarning) {
           warnForTextDifference(domElement.textContent, nextProp);
         }
         updatePayload = [CHILDREN, '' + nextProp];
       }
     }
   } else if (registrationNameModules.hasOwnProperty(propKey)) {
     if (nextProp != null) {
       if (true && typeof nextProp !== 'function') {
         warnForInvalidEventListener(propKey, nextProp);
       }
       ensureListeningTo(rootContainerElement, propKey);
     }
   } else if (true &&
   // Convince Flow we've calculated it (it's DEV-only in this method.)
   typeof isCustomComponentTag === 'boolean') {
     // Validate that the properties correspond to their expected values.
     var serverValue = void 0;
     var propertyInfo = getPropertyInfo(propKey);
     if (suppressHydrationWarning) {
       // Don't bother comparing. We're ignoring all these warnings.
     } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1 ||
     // Controlled attributes are not validated
     // TODO: Only ignore them on controlled tags.
     propKey === 'value' || propKey === 'checked' || propKey === 'selected') {
       // Noop
     } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
       var rawHtml = nextProp ? nextProp[HTML] || '' : '';
       var serverHTML = domElement.innerHTML;
       var expectedHTML = normalizeHTML(domElement, rawHtml);
       if (expectedHTML !== serverHTML) {
         warnForPropDifference(propKey, serverHTML, expectedHTML);
       }
     } else if (propKey === STYLE) {
       // $FlowFixMe - Should be inferred as not undefined.
       extraAttributeNames.delete(propKey);
       var expectedStyle = createDangerousStringForStyles(nextProp);
       serverValue = domElement.getAttribute('style');
       if (expectedStyle !== serverValue) {
         warnForPropDifference(propKey, serverValue, expectedStyle);
       }
     } else if (isCustomComponentTag) {
       // $FlowFixMe - Should be inferred as not undefined.
       extraAttributeNames.delete(propKey.toLowerCase());
       serverValue = getValueForAttribute(domElement, propKey, nextProp);

       if (nextProp !== serverValue) {
         warnForPropDifference(propKey, serverValue, nextProp);
       }
     } else if (!shouldIgnoreAttribute(propKey, propertyInfo, isCustomComponentTag) && !shouldRemoveAttribute(propKey, nextProp, propertyInfo, isCustomComponentTag)) {
       var isMismatchDueToBadCasing = false;
       if (propertyInfo !== null) {
         // $FlowFixMe - Should be inferred as not undefined.
         extraAttributeNames.delete(propertyInfo.attributeName);
         serverValue = getValueForProperty(domElement, propKey, nextProp, propertyInfo);
       } else {
         var ownNamespace = parentNamespace;
         if (ownNamespace === HTML_NAMESPACE) {
           ownNamespace = getIntrinsicNamespace(tag);
         }
         if (ownNamespace === HTML_NAMESPACE) {
           // $FlowFixMe - Should be inferred as not undefined.
           extraAttributeNames.delete(propKey.toLowerCase());
         } else {
           var standardName = getPossibleStandardName(propKey);
           if (standardName !== null && standardName !== propKey) {
             // If an SVG prop is supplied with bad casing, it will
             // be successfully parsed from HTML, but will produce a mismatch
             // (and would be incorrectly rendered on the client).
             // However, we already warn about bad casing elsewhere.
             // So we'll skip the misleading extra mismatch warning in this case.
             isMismatchDueToBadCasing = true;
             // $FlowFixMe - Should be inferred as not undefined.
             extraAttributeNames.delete(standardName);
           }
           // $FlowFixMe - Should be inferred as not undefined.
           extraAttributeNames.delete(propKey);
         }
         serverValue = getValueForAttribute(domElement, propKey, nextProp);
       }

       if (nextProp !== serverValue && !isMismatchDueToBadCasing) {
         warnForPropDifference(propKey, serverValue, nextProp);
       }
     }
   }
 }

 {
   // $FlowFixMe - Should be inferred as not undefined.
   if (extraAttributeNames.size > 0 && !suppressHydrationWarning) {
     // $FlowFixMe - Should be inferred as not undefined.
     warnForExtraAttributes(extraAttributeNames);
   }
 }

 switch (tag) {
   case 'input':
     // TODO: Make sure we check if this is still unmounted or do any clean
     // up necessary since we never stop tracking anymore.
     track(domElement);
     postMountWrapper(domElement, rawProps, true);
     break;
   case 'textarea':
     // TODO: Make sure we check if this is still unmounted or do any clean
     // up necessary since we never stop tracking anymore.
     track(domElement);
     postMountWrapper$3(domElement, rawProps);
     break;
   case 'select':
   case 'option':
     // For input and textarea we current always set the value property at
     // post mount to force it to diverge from attributes. However, for
     // option and select we don't quite do the same thing and select
     // is not resilient to the DOM state changing so we don't do that here.
     // TODO: Consider not doing this for input and textarea.
     break;
   default:
     if (typeof rawProps.onClick === 'function') {
       // TODO: This cast may not be sound for SVG, MathML or custom elements.
       trapClickOnNonInteractiveElement(domElement);
     }
     break;
 }

 return updatePayload;
}

function diffHydratedText$1(textNode, text) {
 var isDifferent = textNode.nodeValue !== text;
 return isDifferent;
}

function warnForUnmatchedText$1(textNode, text) {
 {
   warnForTextDifference(textNode.nodeValue, text);
 }
}

function warnForDeletedHydratableElement$1(parentNode, child) {
 {
   if (didWarnInvalidHydration) {
     return;
   }
   didWarnInvalidHydration = true;
   warning_1(false, 'Did not expect server HTML to contain a <%s> in <%s>.', child.nodeName.toLowerCase(), parentNode.nodeName.toLowerCase());
 }
}

function warnForDeletedHydratableText$1(parentNode, child) {
 {
   if (didWarnInvalidHydration) {
     return;
   }
   didWarnInvalidHydration = true;
   warning_1(false, 'Did not expect server HTML to contain the text node "%s" in <%s>.', child.nodeValue, parentNode.nodeName.toLowerCase());
 }
}

function warnForInsertedHydratedElement$1(parentNode, tag, props) {
 {
   if (didWarnInvalidHydration) {
     return;
   }
   didWarnInvalidHydration = true;
   warning_1(false, 'Expected server HTML to contain a matching <%s> in <%s>.', tag, parentNode.nodeName.toLowerCase());
 }
}

function warnForInsertedHydratedText$1(parentNode, text) {
 {
   if (text === '') {
     // We expect to insert empty text nodes since they're not represented in
     // the HTML.
     // TODO: Remove this special case if we can just avoid inserting empty
     // text nodes.
     return;
   }
   if (didWarnInvalidHydration) {
     return;
   }
   didWarnInvalidHydration = true;
   warning_1(false, 'Expected server HTML to contain a matching text node for "%s" in <%s>.', text, parentNode.nodeName.toLowerCase());
 }
}

function restoreControlledState$1(domElement, tag, props) {
 switch (tag) {
   case 'input':
     restoreControlledState(domElement, props);
     return;
   case 'textarea':
     restoreControlledState$3(domElement, props);
     return;
   case 'select':
     restoreControlledState$2(domElement, props);
     return;
 }
}

var ReactDOMFiberComponent = Object.freeze({
 createElement: createElement$1,
 createTextNode: createTextNode$1,
 setInitialProperties: setInitialProperties$1,
 diffProperties: diffProperties$1,
 updateProperties: updateProperties$1,
 diffHydratedProperties: diffHydratedProperties$1,
 diffHydratedText: diffHydratedText$1,
 warnForUnmatchedText: warnForUnmatchedText$1,
 warnForDeletedHydratableElement: warnForDeletedHydratableElement$1,
 warnForDeletedHydratableText: warnForDeletedHydratableText$1,
 warnForInsertedHydratedElement: warnForInsertedHydratedElement$1,
 warnForInsertedHydratedText: warnForInsertedHydratedText$1,
 restoreControlledState: restoreControlledState$1
});

// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberStackAddendum$5 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

var validateDOMNesting = emptyFunction_1;

{
 // This validation code was written based on the HTML5 parsing spec:
 // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
 //
 // Note: this does not catch all invalid nesting, nor does it try to (as it's
 // not clear what practical benefit doing so provides); instead, we warn only
 // for cases where the parser will give a parse tree differing from what React
 // intended. For example, <b><div></div></b> is invalid but we don't warn
 // because it still parses correctly; we do warn for other cases like nested
 // <p> tags where the beginning of the second element implicitly closes the
 // first, causing a confusing mess.

 // https://html.spec.whatwg.org/multipage/syntax.html#special
 var specialTags = ['address', 'applet', 'area', 'article', 'aside', 'base', 'basefont', 'bgsound', 'blockquote', 'body', 'br', 'button', 'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dir', 'div', 'dl', 'dt', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'iframe', 'img', 'input', 'isindex', 'li', 'link', 'listing', 'main', 'marquee', 'menu', 'menuitem', 'meta', 'nav', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'p', 'param', 'plaintext', 'pre', 'script', 'section', 'select', 'source', 'style', 'summary', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 'ul', 'wbr', 'xmp'];

 // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
 var inScopeTags = ['applet', 'caption', 'html', 'table', 'td', 'th', 'marquee', 'object', 'template',

 // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
 // TODO: Distinguish by namespace here -- for <title>, including it here
 // errs on the side of fewer warnings
 'foreignObject', 'desc', 'title'];

 // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-button-scope
 var buttonScopeTags = inScopeTags.concat(['button']);

 // https://html.spec.whatwg.org/multipage/syntax.html#generate-implied-end-tags
 var impliedEndTags = ['dd', 'dt', 'li', 'option', 'optgroup', 'p', 'rp', 'rt'];

 var emptyAncestorInfo = {
   current: null,

   formTag: null,
   aTagInScope: null,
   buttonTagInScope: null,
   nobrTagInScope: null,
   pTagInButtonScope: null,

   listItemTagAutoclosing: null,
   dlItemTagAutoclosing: null
 };

 var updatedAncestorInfo$1 = function (oldInfo, tag, instance) {
   var ancestorInfo = _assign({}, oldInfo || emptyAncestorInfo);
   var info = { tag: tag, instance: instance };

   if (inScopeTags.indexOf(tag) !== -1) {
     ancestorInfo.aTagInScope = null;
     ancestorInfo.buttonTagInScope = null;
     ancestorInfo.nobrTagInScope = null;
   }
   if (buttonScopeTags.indexOf(tag) !== -1) {
     ancestorInfo.pTagInButtonScope = null;
   }

   // See rules for 'li', 'dd', 'dt' start tags in
   // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
   if (specialTags.indexOf(tag) !== -1 && tag !== 'address' && tag !== 'div' && tag !== 'p') {
     ancestorInfo.listItemTagAutoclosing = null;
     ancestorInfo.dlItemTagAutoclosing = null;
   }

   ancestorInfo.current = info;

   if (tag === 'form') {
     ancestorInfo.formTag = info;
   }
   if (tag === 'a') {
     ancestorInfo.aTagInScope = info;
   }
   if (tag === 'button') {
     ancestorInfo.buttonTagInScope = info;
   }
   if (tag === 'nobr') {
     ancestorInfo.nobrTagInScope = info;
   }
   if (tag === 'p') {
     ancestorInfo.pTagInButtonScope = info;
   }
   if (tag === 'li') {
     ancestorInfo.listItemTagAutoclosing = info;
   }
   if (tag === 'dd' || tag === 'dt') {
     ancestorInfo.dlItemTagAutoclosing = info;
   }

   return ancestorInfo;
 };

 /**
  * Returns whether
  */
 var isTagValidWithParent = function (tag, parentTag) {
   // First, let's check if we're in an unusual parsing mode...
   switch (parentTag) {
     // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
     case 'select':
       return tag === 'option' || tag === 'optgroup' || tag === '#text';
     case 'optgroup':
       return tag === 'option' || tag === '#text';
     // Strictly speaking, seeing an <option> doesn't mean we're in a <select>
     // but
     case 'option':
       return tag === '#text';
     // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
     // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
     // No special behavior since these rules fall back to "in body" mode for
     // all except special table nodes which cause bad parsing behavior anyway.

     // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
     case 'tr':
       return tag === 'th' || tag === 'td' || tag === 'style' || tag === 'script' || tag === 'template';
     // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
     case 'tbody':
     case 'thead':
     case 'tfoot':
       return tag === 'tr' || tag === 'style' || tag === 'script' || tag === 'template';
     // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
     case 'colgroup':
       return tag === 'col' || tag === 'template';
     // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
     case 'table':
       return tag === 'caption' || tag === 'colgroup' || tag === 'tbody' || tag === 'tfoot' || tag === 'thead' || tag === 'style' || tag === 'script' || tag === 'template';
     // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
     case 'head':
       return tag === 'base' || tag === 'basefont' || tag === 'bgsound' || tag === 'link' || tag === 'meta' || tag === 'title' || tag === 'noscript' || tag === 'noframes' || tag === 'style' || tag === 'script' || tag === 'template';
     // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
     case 'html':
       return tag === 'head' || tag === 'body';
     case '#document':
       return tag === 'html';
   }

   // Probably in the "in body" parsing mode, so we outlaw only tag combos
   // where the parsing rules cause implicit opens or closes to be added.
   // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
   switch (tag) {
     case 'h1':
     case 'h2':
     case 'h3':
     case 'h4':
     case 'h5':
     case 'h6':
       return parentTag !== 'h1' && parentTag !== 'h2' && parentTag !== 'h3' && parentTag !== 'h4' && parentTag !== 'h5' && parentTag !== 'h6';

     case 'rp':
     case 'rt':
       return impliedEndTags.indexOf(parentTag) === -1;

     case 'body':
     case 'caption':
     case 'col':
     case 'colgroup':
     case 'frame':
     case 'head':
     case 'html':
     case 'tbody':
     case 'td':
     case 'tfoot':
     case 'th':
     case 'thead':
     case 'tr':
       // These tags are only valid with a few parents that have special child
       // parsing rules -- if we're down here, then none of those matched and
       // so we allow it only if we don't know what the parent is, as all other
       // cases are invalid.
       return parentTag == null;
   }

   return true;
 };

 /**
  * Returns whether
  */
 var findInvalidAncestorForTag = function (tag, ancestorInfo) {
   switch (tag) {
     case 'address':
     case 'article':
     case 'aside':
     case 'blockquote':
     case 'center':
     case 'details':
     case 'dialog':
     case 'dir':
     case 'div':
     case 'dl':
     case 'fieldset':
     case 'figcaption':
     case 'figure':
     case 'footer':
     case 'header':
     case 'hgroup':
     case 'main':
     case 'menu':
     case 'nav':
     case 'ol':
     case 'p':
     case 'section':
     case 'summary':
     case 'ul':
     case 'pre':
     case 'listing':
     case 'table':
     case 'hr':
     case 'xmp':
     case 'h1':
     case 'h2':
     case 'h3':
     case 'h4':
     case 'h5':
     case 'h6':
       return ancestorInfo.pTagInButtonScope;

     case 'form':
       return ancestorInfo.formTag || ancestorInfo.pTagInButtonScope;

     case 'li':
       return ancestorInfo.listItemTagAutoclosing;

     case 'dd':
     case 'dt':
       return ancestorInfo.dlItemTagAutoclosing;

     case 'button':
       return ancestorInfo.buttonTagInScope;

     case 'a':
       // Spec says something about storing a list of markers, but it sounds
       // equivalent to this check.
       return ancestorInfo.aTagInScope;

     case 'nobr':
       return ancestorInfo.nobrTagInScope;
   }

   return null;
 };

 var didWarn = {};

 validateDOMNesting = function (childTag, childText, ancestorInfo) {
   ancestorInfo = ancestorInfo || emptyAncestorInfo;
   var parentInfo = ancestorInfo.current;
   var parentTag = parentInfo && parentInfo.tag;

   if (childText != null) {
     !(childTag == null) ? warning_1(false, 'validateDOMNesting: when childText is passed, childTag should be null') : void 0;
     childTag = '#text';
   }

   var invalidParent = isTagValidWithParent(childTag, parentTag) ? null : parentInfo;
   var invalidAncestor = invalidParent ? null : findInvalidAncestorForTag(childTag, ancestorInfo);
   var invalidParentOrAncestor = invalidParent || invalidAncestor;
   if (!invalidParentOrAncestor) {
     return;
   }

   var ancestorTag = invalidParentOrAncestor.tag;
   var addendum = getCurrentFiberStackAddendum$5();

   var warnKey = !!invalidParent + '|' + childTag + '|' + ancestorTag + '|' + addendum;
   if (didWarn[warnKey]) {
     return;
   }
   didWarn[warnKey] = true;

   var tagDisplayName = childTag;
   var whitespaceInfo = '';
   if (childTag === '#text') {
     if (/\S/.test(childText)) {
       tagDisplayName = 'Text nodes';
     } else {
       tagDisplayName = 'Whitespace text nodes';
       whitespaceInfo = " Make sure you don't have any extra whitespace between tags on " + 'each line of your source code.';
     }
   } else {
     tagDisplayName = '<' + childTag + '>';
   }

   if (invalidParent) {
     var info = '';
     if (ancestorTag === 'table' && childTag === 'tr') {
       info += ' Add a <tbody> to your code to match the DOM tree generated by ' + 'the browser.';
     }
     warning_1(false, 'validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s%s', tagDisplayName, ancestorTag, whitespaceInfo, info, addendum);
   } else {
     warning_1(false, 'validateDOMNesting(...): %s cannot appear as a descendant of ' + '<%s>.%s', tagDisplayName, ancestorTag, addendum);
   }
 };

 // TODO: turn this into a named export
 validateDOMNesting.updatedAncestorInfo = updatedAncestorInfo$1;
}

var validateDOMNesting$1 = validateDOMNesting;

// Renderers that don't support persistence
// can re-export everything from this module.

function shim() {
 invariant_1(false, 'The current renderer does not support persistence. This error is likely caused by a bug in React. Please file an issue.');
}

// Persistence (when unsupported)
var supportsPersistence = false;
var cloneInstance = shim;
var createContainerChildSet = shim;
var appendChildToContainerChildSet = shim;
var finalizeContainerChildren = shim;
var replaceContainerChildren = shim;

// Unused

var createElement = createElement$1;
var createTextNode = createTextNode$1;
var setInitialProperties = setInitialProperties$1;
var diffProperties = diffProperties$1;
var updateProperties = updateProperties$1;
var diffHydratedProperties = diffHydratedProperties$1;
var diffHydratedText = diffHydratedText$1;
var warnForUnmatchedText = warnForUnmatchedText$1;
var warnForDeletedHydratableElement = warnForDeletedHydratableElement$1;
var warnForDeletedHydratableText = warnForDeletedHydratableText$1;
var warnForInsertedHydratedElement = warnForInsertedHydratedElement$1;
var warnForInsertedHydratedText = warnForInsertedHydratedText$1;
var updatedAncestorInfo = validateDOMNesting$1.updatedAncestorInfo;
var precacheFiberNode$1 = precacheFiberNode;
var updateFiberProps$1 = updateFiberProps;


var SUPPRESS_HYDRATION_WARNING = void 0;
{
 SUPPRESS_HYDRATION_WARNING = 'suppressHydrationWarning';
}

var eventsEnabled = null;
var selectionInformation = null;

function shouldAutoFocusHostComponent(type, props) {
 switch (type) {
   case 'button':
   case 'input':
   case 'select':
   case 'textarea':
     return !!props.autoFocus;
 }
 return false;
}

function getRootHostContext(rootContainerInstance) {
 var type = void 0;
 var namespace = void 0;
 var nodeType = rootContainerInstance.nodeType;
 switch (nodeType) {
   case DOCUMENT_NODE:
   case DOCUMENT_FRAGMENT_NODE:
     {
       type = nodeType === DOCUMENT_NODE ? '#document' : '#fragment';
       var root = rootContainerInstance.documentElement;
       namespace = root ? root.namespaceURI : getChildNamespace(null, '');
       break;
     }
   default:
     {
       var container = nodeType === COMMENT_NODE ? rootContainerInstance.parentNode : rootContainerInstance;
       var ownNamespace = container.namespaceURI || null;
       type = container.tagName;
       namespace = getChildNamespace(ownNamespace, type);
       break;
     }
 }
 {
   var validatedTag = type.toLowerCase();
   var _ancestorInfo = updatedAncestorInfo(null, validatedTag, null);
   return { namespace: namespace, ancestorInfo: _ancestorInfo };
 }
 return namespace;
}

function getChildHostContext(parentHostContext, type, rootContainerInstance) {
 {
   var parentHostContextDev = parentHostContext;
   var _namespace = getChildNamespace(parentHostContextDev.namespace, type);
   var _ancestorInfo2 = updatedAncestorInfo(parentHostContextDev.ancestorInfo, type, null);
   return { namespace: _namespace, ancestorInfo: _ancestorInfo2 };
 }
 var parentNamespace = parentHostContext;
 return getChildNamespace(parentNamespace, type);
}

function getPublicInstance(instance) {
 return instance;
}

function prepareForCommit(containerInfo) {
 eventsEnabled = isEnabled();
 selectionInformation = getSelectionInformation();
 setEnabled(false);
}

function resetAfterCommit(containerInfo) {
 restoreSelection(selectionInformation);
 selectionInformation = null;
 setEnabled(eventsEnabled);
 eventsEnabled = null;
}

function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
 var parentNamespace = void 0;
 {
   // TODO: take namespace into account when validating.
   var hostContextDev = hostContext;
   validateDOMNesting$1(type, null, hostContextDev.ancestorInfo);
   if (typeof props.children === 'string' || typeof props.children === 'number') {
     var string = '' + props.children;
     var ownAncestorInfo = updatedAncestorInfo(hostContextDev.ancestorInfo, type, null);
     validateDOMNesting$1(null, string, ownAncestorInfo);
   }
   parentNamespace = hostContextDev.namespace;
 }
 var domElement = createElement(type, props, rootContainerInstance, parentNamespace);
 precacheFiberNode$1(internalInstanceHandle, domElement);
 updateFiberProps$1(domElement, props);
 return domElement;
}

function appendInitialChild(parentInstance, child) {
 parentInstance.appendChild(child);
}

function finalizeInitialChildren(domElement, type, props, rootContainerInstance, hostContext) {
 setInitialProperties(domElement, type, props, rootContainerInstance);
 return shouldAutoFocusHostComponent(type, props);
}

function prepareUpdate(domElement, type, oldProps, newProps, rootContainerInstance, hostContext) {
 {
   var hostContextDev = hostContext;
   if (typeof newProps.children !== typeof oldProps.children && (typeof newProps.children === 'string' || typeof newProps.children === 'number')) {
     var string = '' + newProps.children;
     var ownAncestorInfo = updatedAncestorInfo(hostContextDev.ancestorInfo, type, null);
     validateDOMNesting$1(null, string, ownAncestorInfo);
   }
 }
 return diffProperties(domElement, type, oldProps, newProps, rootContainerInstance);
}

function shouldSetTextContent(type, props) {
 return type === 'textarea' || typeof props.children === 'string' || typeof props.children === 'number' || typeof props.dangerouslySetInnerHTML === 'object' && props.dangerouslySetInnerHTML !== null && typeof props.dangerouslySetInnerHTML.__html === 'string';
}

function shouldDeprioritizeSubtree(type, props) {
 return !!props.hidden;
}

function createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
 {
   var hostContextDev = hostContext;
   validateDOMNesting$1(null, text, hostContextDev.ancestorInfo);
 }
 var textNode = createTextNode(text, rootContainerInstance);
 precacheFiberNode$1(internalInstanceHandle, textNode);
 return textNode;
}

var now = now$1;
var isPrimaryRenderer = true;
var scheduleDeferredCallback = scheduleWork;
var cancelDeferredCallback = cancelScheduledWork;

// -------------------
//     Mutation
// -------------------

var supportsMutation = true;

function commitMount(domElement, type, newProps, internalInstanceHandle) {
 // Despite the naming that might imply otherwise, this method only
 // fires if there is an `Update` effect scheduled during mounting.
 // This happens if `finalizeInitialChildren` returns `true` (which it
 // does to implement the `autoFocus` attribute on the client). But
 // there are also other cases when this might happen (such as patching
 // up text content during hydration mismatch). So we'll check this again.
 if (shouldAutoFocusHostComponent(type, newProps)) {
   domElement.focus();
 }
}

function commitUpdate(domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
 // Update the props handle so that we know which props are the ones with
 // with current event handlers.
 updateFiberProps$1(domElement, newProps);
 // Apply the diff to the DOM node.
 updateProperties(domElement, updatePayload, type, oldProps, newProps);
}

function resetTextContent(domElement) {
 setTextContent(domElement, '');
}

function commitTextUpdate(textInstance, oldText, newText) {
 textInstance.nodeValue = newText;
}

function appendChild(parentInstance, child) {
 parentInstance.appendChild(child);
}

function appendChildToContainer(container, child) {
 if (container.nodeType === COMMENT_NODE) {
   container.parentNode.insertBefore(child, container);
 } else {
   container.appendChild(child);
 }
}

function insertBefore(parentInstance, child, beforeChild) {
 parentInstance.insertBefore(child, beforeChild);
}

function insertInContainerBefore(container, child, beforeChild) {
 if (container.nodeType === COMMENT_NODE) {
   container.parentNode.insertBefore(child, beforeChild);
 } else {
   container.insertBefore(child, beforeChild);
 }
}

function removeChild(parentInstance, child) {
 parentInstance.removeChild(child);
}

function removeChildFromContainer(container, child) {
 if (container.nodeType === COMMENT_NODE) {
   container.parentNode.removeChild(child);
 } else {
   container.removeChild(child);
 }
}

// -------------------
//     Hydration
// -------------------

var supportsHydration = true;

function canHydrateInstance(instance, type, props) {
 if (instance.nodeType !== ELEMENT_NODE || type.toLowerCase() !== instance.nodeName.toLowerCase()) {
   return null;
 }
 // This has now been refined to an element node.
 return instance;
}

function canHydrateTextInstance(instance, text) {
 if (text === '' || instance.nodeType !== TEXT_NODE) {
   // Empty strings are not parsed by HTML so there won't be a correct match here.
   return null;
 }
 // This has now been refined to a text node.
 return instance;
}

function getNextHydratableSibling(instance) {
 var node = instance.nextSibling;
 // Skip non-hydratable nodes.
 while (node && node.nodeType !== ELEMENT_NODE && node.nodeType !== TEXT_NODE) {
   node = node.nextSibling;
 }
 return node;
}

function getFirstHydratableChild(parentInstance) {
 var next = parentInstance.firstChild;
 // Skip non-hydratable nodes.
 while (next && next.nodeType !== ELEMENT_NODE && next.nodeType !== TEXT_NODE) {
   next = next.nextSibling;
 }
 return next;
}

function hydrateInstance(instance, type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
 precacheFiberNode$1(internalInstanceHandle, instance);
 // TODO: Possibly defer this until the commit phase where all the events
 // get attached.
 updateFiberProps$1(instance, props);
 var parentNamespace = void 0;
 {
   var hostContextDev = hostContext;
   parentNamespace = hostContextDev.namespace;
 }
 return diffHydratedProperties(instance, type, props, parentNamespace, rootContainerInstance);
}

function hydrateTextInstance(textInstance, text, internalInstanceHandle) {
 precacheFiberNode$1(internalInstanceHandle, textInstance);
 return diffHydratedText(textInstance, text);
}

function didNotMatchHydratedContainerTextInstance(parentContainer, textInstance, text) {
 {
   warnForUnmatchedText(textInstance, text);
 }
}

function didNotMatchHydratedTextInstance(parentType, parentProps, parentInstance, textInstance, text) {
 if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
   warnForUnmatchedText(textInstance, text);
 }
}

function didNotHydrateContainerInstance(parentContainer, instance) {
 {
   if (instance.nodeType === 1) {
     warnForDeletedHydratableElement(parentContainer, instance);
   } else {
     warnForDeletedHydratableText(parentContainer, instance);
   }
 }
}

function didNotHydrateInstance(parentType, parentProps, parentInstance, instance) {
 if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
   if (instance.nodeType === 1) {
     warnForDeletedHydratableElement(parentInstance, instance);
   } else {
     warnForDeletedHydratableText(parentInstance, instance);
   }
 }
}

function didNotFindHydratableContainerInstance(parentContainer, type, props) {
 {
   warnForInsertedHydratedElement(parentContainer, type, props);
 }
}

function didNotFindHydratableContainerTextInstance(parentContainer, text) {
 {
   warnForInsertedHydratedText(parentContainer, text);
 }
}

function didNotFindHydratableInstance(parentType, parentProps, parentInstance, type, props) {
 if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
   warnForInsertedHydratedElement(parentInstance, type, props);
 }
}

function didNotFindHydratableTextInstance(parentType, parentProps, parentInstance, text) {
 if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
   warnForInsertedHydratedText(parentInstance, text);
 }
}

// Exports ReactDOM.createRoot
var enableUserTimingAPI = true;

// Experimental error-boundary API that can recover from errors within a single
// render phase
var enableGetDerivedStateFromCatch = false;
// Suspense
var enableSuspense = false;
// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:
var debugRenderPhaseSideEffects = false;

// In some cases, StrictMode should also double-render lifecycles.
// This can be confusing for tests though,
// And it can be bad for performance in production.
// This feature flag can be used to control the behavior:
var debugRenderPhaseSideEffectsForStrictMode = true;

// To preserve the "Pause on caught exceptions" behavior of the debugger, we
// replay the begin phase of a failed component inside invokeGuardedCallback.
var replayFailedUnitOfWorkWithInvokeGuardedCallback = true;

// Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:
var warnAboutDeprecatedLifecycles = false;

// Warn about legacy context API
var warnAboutLegacyContextAPI = false;

// Gather advanced timing metrics for Profiler subtrees.
var enableProfilerTimer = true;

// Only used in www builds.

// Prefix measurements so that it's possible to filter them.
// Longer prefixes are hard to read in DevTools.
var reactEmoji = '\u269B';
var warningEmoji = '\u26D4';
var supportsUserTiming = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

// Keep track of current fiber so that we know the path to unwind on pause.
// TODO: this looks the same as nextUnitOfWork in scheduler. Can we unify them?
var currentFiber = null;
// If we're in the middle of user code, which fiber and method is it?
// Reusing `currentFiber` would be confusing for this because user code fiber
// can change during commit phase too, but we don't need to unwind it (since
// lifecycles in the commit phase don't resemble a tree).
var currentPhase = null;
var currentPhaseFiber = null;
// Did lifecycle hook schedule an update? This is often a performance problem,
// so we will keep track of it, and include it in the report.
// Track commits caused by cascading updates.
var isCommitting = false;
var hasScheduledUpdateInCurrentCommit = false;
var hasScheduledUpdateInCurrentPhase = false;
var commitCountInCurrentWorkLoop = 0;
var effectCountInCurrentCommit = 0;
var isWaitingForCallback = false;
// During commits, we only show a measurement once per method name
// to avoid stretch the commit phase with measurement overhead.
var labelsInCurrentCommit = new Set();

var formatMarkName = function (markName) {
 return reactEmoji + ' ' + markName;
};

var formatLabel = function (label, warning) {
 var prefix = warning ? warningEmoji + ' ' : reactEmoji + ' ';
 var suffix = warning ? ' Warning: ' + warning : '';
 return '' + prefix + label + suffix;
};

var beginMark = function (markName) {
 performance.mark(formatMarkName(markName));
};

var clearMark = function (markName) {
 performance.clearMarks(formatMarkName(markName));
};

var endMark = function (label, markName, warning) {
 var formattedMarkName = formatMarkName(markName);
 var formattedLabel = formatLabel(label, warning);
 try {
   performance.measure(formattedLabel, formattedMarkName);
 } catch (err) {}
 // If previous mark was missing for some reason, this will throw.
 // This could only happen if React crashed in an unexpected place earlier.
 // Don't pile on with more errors.

 // Clear marks immediately to avoid growing buffer.
 performance.clearMarks(formattedMarkName);
 performance.clearMeasures(formattedLabel);
};

var getFiberMarkName = function (label, debugID) {
 return label + ' (#' + debugID + ')';
};

var getFiberLabel = function (componentName, isMounted, phase) {
 if (phase === null) {
   // These are composite component total time measurements.
   return componentName + ' [' + (isMounted ? 'update' : 'mount') + ']';
 } else {
   // Composite component methods.
   return componentName + '.' + phase;
 }
};

var beginFiberMark = function (fiber, phase) {
 var componentName = getComponentName(fiber) || 'Unknown';
 var debugID = fiber._debugID;
 var isMounted = fiber.alternate !== null;
 var label = getFiberLabel(componentName, isMounted, phase);

 if (isCommitting && labelsInCurrentCommit.has(label)) {
   // During the commit phase, we don't show duplicate labels because
   // there is a fixed overhead for every measurement, and we don't
   // want to stretch the commit phase beyond necessary.
   return false;
 }
 labelsInCurrentCommit.add(label);

 var markName = getFiberMarkName(label, debugID);
 beginMark(markName);
 return true;
};

var clearFiberMark = function (fiber, phase) {
 var componentName = getComponentName(fiber) || 'Unknown';
 var debugID = fiber._debugID;
 var isMounted = fiber.alternate !== null;
 var label = getFiberLabel(componentName, isMounted, phase);
 var markName = getFiberMarkName(label, debugID);
 clearMark(markName);
};

var endFiberMark = function (fiber, phase, warning) {
 var componentName = getComponentName(fiber) || 'Unknown';
 var debugID = fiber._debugID;
 var isMounted = fiber.alternate !== null;
 var label = getFiberLabel(componentName, isMounted, phase);
 var markName = getFiberMarkName(label, debugID);
 endMark(label, markName, warning);
};

var shouldIgnoreFiber = function (fiber) {
 // Host components should be skipped in the timeline.
 // We could check typeof fiber.type, but does this work with RN?
 switch (fiber.tag) {
   case HostRoot:
   case HostComponent:
   case HostText:
   case HostPortal:
   case Fragment:
   case ContextProvider:
   case ContextConsumer:
   case Mode:
     return true;
   default:
     return false;
 }
};

var clearPendingPhaseMeasurement = function () {
 if (currentPhase !== null && currentPhaseFiber !== null) {
   clearFiberMark(currentPhaseFiber, currentPhase);
 }
 currentPhaseFiber = null;
 currentPhase = null;
 hasScheduledUpdateInCurrentPhase = false;
};

var pauseTimers = function () {
 // Stops all currently active measurements so that they can be resumed
 // if we continue in a later deferred loop from the same unit of work.
 var fiber = currentFiber;
 while (fiber) {
   if (fiber._debugIsCurrentlyTiming) {
     endFiberMark(fiber, null, null);
   }
   fiber = fiber.return;
 }
};

var resumeTimersRecursively = function (fiber) {
 if (fiber.return !== null) {
   resumeTimersRecursively(fiber.return);
 }
 if (fiber._debugIsCurrentlyTiming) {
   beginFiberMark(fiber, null);
 }
};

var resumeTimers = function () {
 // Resumes all measurements that were active during the last deferred loop.
 if (currentFiber !== null) {
   resumeTimersRecursively(currentFiber);
 }
};

function recordEffect() {
 if (enableUserTimingAPI) {
   effectCountInCurrentCommit++;
 }
}

function recordScheduleUpdate() {
 if (enableUserTimingAPI) {
   if (isCommitting) {
     hasScheduledUpdateInCurrentCommit = true;
   }
   if (currentPhase !== null && currentPhase !== 'componentWillMount' && currentPhase !== 'componentWillReceiveProps') {
     hasScheduledUpdateInCurrentPhase = true;
   }
 }
}

function startRequestCallbackTimer() {
 if (enableUserTimingAPI) {
   if (supportsUserTiming && !isWaitingForCallback) {
     isWaitingForCallback = true;
     beginMark('(Waiting for async callback...)');
   }
 }
}

function stopRequestCallbackTimer(didExpire, expirationTime) {
 if (enableUserTimingAPI) {
   if (supportsUserTiming) {
     isWaitingForCallback = false;
     var warning = didExpire ? 'React was blocked by main thread' : null;
     endMark('(Waiting for async callback... will force flush in ' + expirationTime + ' ms)', '(Waiting for async callback...)', warning);
   }
 }
}

function startWorkTimer(fiber) {
 if (enableUserTimingAPI) {
   if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
     return;
   }
   // If we pause, this is the fiber to unwind from.
   currentFiber = fiber;
   if (!beginFiberMark(fiber, null)) {
     return;
   }
   fiber._debugIsCurrentlyTiming = true;
 }
}

function cancelWorkTimer(fiber) {
 if (enableUserTimingAPI) {
   if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
     return;
   }
   // Remember we shouldn't complete measurement for this fiber.
   // Otherwise flamechart will be deep even for small updates.
   fiber._debugIsCurrentlyTiming = false;
   clearFiberMark(fiber, null);
 }
}

function stopWorkTimer(fiber) {
 if (enableUserTimingAPI) {
   if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
     return;
   }
   // If we pause, its parent is the fiber to unwind from.
   currentFiber = fiber.return;
   if (!fiber._debugIsCurrentlyTiming) {
     return;
   }
   fiber._debugIsCurrentlyTiming = false;
   endFiberMark(fiber, null, null);
 }
}

function stopFailedWorkTimer(fiber) {
 if (enableUserTimingAPI) {
   if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
     return;
   }
   // If we pause, its parent is the fiber to unwind from.
   currentFiber = fiber.return;
   if (!fiber._debugIsCurrentlyTiming) {
     return;
   }
   fiber._debugIsCurrentlyTiming = false;
   var warning = 'An error was thrown inside this error boundary';
   endFiberMark(fiber, null, warning);
 }
}

function startPhaseTimer(fiber, phase) {
 if (enableUserTimingAPI) {
   if (!supportsUserTiming) {
     return;
   }
   clearPendingPhaseMeasurement();
   if (!beginFiberMark(fiber, phase)) {
     return;
   }
   currentPhaseFiber = fiber;
   currentPhase = phase;
 }
}

function stopPhaseTimer() {
 if (enableUserTimingAPI) {
   if (!supportsUserTiming) {
     return;
   }
   if (currentPhase !== null && currentPhaseFiber !== null) {
     var warning = hasScheduledUpdateInCurrentPhase ? 'Scheduled a cascading update' : null;
     endFiberMark(currentPhaseFiber, currentPhase, warning);
   }
   currentPhase = null;
   currentPhaseFiber = null;
 }
}

function startWorkLoopTimer(nextUnitOfWork) {
 if (enableUserTimingAPI) {
   currentFiber = nextUnitOfWork;
   if (!supportsUserTiming) {
     return;
   }
   commitCountInCurrentWorkLoop = 0;
   // This is top level call.
   // Any other measurements are performed within.
   beginMark('(React Tree Reconciliation)');
   // Resume any measurements that were in progress during the last loop.
   resumeTimers();
 }
}

function stopWorkLoopTimer(interruptedBy, didCompleteRoot) {
 if (enableUserTimingAPI) {
   if (!supportsUserTiming) {
     return;
   }
   var warning = null;
   if (interruptedBy !== null) {
     if (interruptedBy.tag === HostRoot) {
       warning = 'A top-level update interrupted the previous render';
     } else {
       var componentName = getComponentName(interruptedBy) || 'Unknown';
       warning = 'An update to ' + componentName + ' interrupted the previous render';
     }
   } else if (commitCountInCurrentWorkLoop > 1) {
     warning = 'There were cascading updates';
   }
   commitCountInCurrentWorkLoop = 0;
   var label = didCompleteRoot ? '(React Tree Reconciliation: Completed Root)' : '(React Tree Reconciliation: Yielded)';
   // Pause any measurements until the next loop.
   pauseTimers();
   endMark(label, '(React Tree Reconciliation)', warning);
 }
}

function startCommitTimer() {
 if (enableUserTimingAPI) {
   if (!supportsUserTiming) {
     return;
   }
   isCommitting = true;
   hasScheduledUpdateInCurrentCommit = false;
   labelsInCurrentCommit.clear();
   beginMark('(Committing Changes)');
 }
}

function stopCommitTimer() {
 if (enableUserTimingAPI) {
   if (!supportsUserTiming) {
     return;
   }

   var warning = null;
   if (hasScheduledUpdateInCurrentCommit) {
     warning = 'Lifecycle hook scheduled a cascading update';
   } else if (commitCountInCurrentWorkLoop > 0) {
     warning = 'Caused by a cascading update in earlier commit';
   }
   hasScheduledUpdateInCurrentCommit = false;
   commitCountInCurrentWorkLoop++;
   isCommitting = false;
   labelsInCurrentCommit.clear();

   endMark('(Committing Changes)', '(Committing Changes)', warning);
 }
}

function startCommitSnapshotEffectsTimer() {
 if (enableUserTimingAPI) {
   if (!supportsUserTiming) {
     return;
   }
   effectCountInCurrentCommit = 0;
   beginMark('(Committing Snapshot Effects)');
 }
}

function stopCommitSnapshotEffectsTimer() {
 if (enableUserTimingAPI) {
   if (!supportsUserTiming) {
     return;
   }
   var count = effectCountInCurrentCommit;
   effectCountInCurrentCommit = 0;
   endMark('(Committing Snapshot Effects: ' + count + ' Total)', '(Committing Snapshot Effects)', null);
 }
}

function startCommitHostEffectsTimer() {
 if (enableUserTimingAPI) {
   if (!supportsUserTiming) {
     return;
   }
   effectCountInCurrentCommit = 0;
   beginMark('(Committing Host Effects)');
 }
}

function stopCommitHostEffectsTimer() {
 if (enableUserTimingAPI) {
   if (!supportsUserTiming) {
     return;
   }
   var count = effectCountInCurrentCommit;
   effectCountInCurrentCommit = 0;
   endMark('(Committing Host Effects: ' + count + ' Total)', '(Committing Host Effects)', null);
 }
}

function startCommitLifeCyclesTimer() {
 if (enableUserTimingAPI) {
   if (!supportsUserTiming) {
     return;
   }
   effectCountInCurrentCommit = 0;
   beginMark('(Calling Lifecycle Methods)');
 }
}

function stopCommitLifeCyclesTimer() {
 if (enableUserTimingAPI) {
   if (!supportsUserTiming) {
     return;
   }
   var count = effectCountInCurrentCommit;
   effectCountInCurrentCommit = 0;
   endMark('(Calling Lifecycle Methods: ' + count + ' Total)', '(Calling Lifecycle Methods)', null);
 }
}

var valueStack = [];

var fiberStack = void 0;

{
 fiberStack = [];
}

var index = -1;

function createCursor(defaultValue) {
 return {
   current: defaultValue
 };
}

function pop(cursor, fiber) {
 if (index < 0) {
   {
     warning_1(false, 'Unexpected pop.');
   }
   return;
 }

 {
   if (fiber !== fiberStack[index]) {
     warning_1(false, 'Unexpected Fiber popped.');
   }
 }

 cursor.current = valueStack[index];

 valueStack[index] = null;

 {
   fiberStack[index] = null;
 }

 index--;
}

function push(cursor, value, fiber) {
 index++;

 valueStack[index] = cursor.current;

 {
   fiberStack[index] = fiber;
 }

 cursor.current = value;
}

function checkThatStackIsEmpty() {
 {
   if (index !== -1) {
     warning_1(false, 'Expected an empty stack. Something was not reset properly.');
   }
 }
}

function resetStackAfterFatalErrorInDev() {
 {
   index = -1;
   valueStack.length = 0;
   fiberStack.length = 0;
 }
}

var warnedAboutMissingGetChildContext = void 0;

{
 warnedAboutMissingGetChildContext = {};
}

// A cursor to the current merged context object on the stack.
var contextStackCursor = createCursor(emptyObject_1);
// A cursor to a boolean indicating whether the context has changed.
var didPerformWorkStackCursor = createCursor(false);
// Keep track of the previous context object that was on the stack.
// We use this to get access to the parent context after we have already
// pushed the next context provider, and now need to merge their contexts.
var previousContext = emptyObject_1;

function getUnmaskedContext(workInProgress) {
 var hasOwnContext = isContextProvider(workInProgress);
 if (hasOwnContext) {
   // If the fiber is a context provider itself, when we read its context
   // we have already pushed its own child context on the stack. A context
   // provider should not "see" its own child context. Therefore we read the
   // previous (parent) context instead for a context provider.
   return previousContext;
 }
 return contextStackCursor.current;
}

function cacheContext(workInProgress, unmaskedContext, maskedContext) {
 var instance = workInProgress.stateNode;
 instance.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext;
 instance.__reactInternalMemoizedMaskedChildContext = maskedContext;
}

function getMaskedContext(workInProgress, unmaskedContext) {
 var type = workInProgress.type;
 var contextTypes = type.contextTypes;
 if (!contextTypes) {
   return emptyObject_1;
 }

 // Avoid recreating masked context unless unmasked context has changed.
 // Failing to do this will result in unnecessary calls to componentWillReceiveProps.
 // This may trigger infinite loops if componentWillReceiveProps calls setState.
 var instance = workInProgress.stateNode;
 if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) {
   return instance.__reactInternalMemoizedMaskedChildContext;
 }

 var context = {};
 for (var key in contextTypes) {
   context[key] = unmaskedContext[key];
 }

 {
   var name = getComponentName(workInProgress) || 'Unknown';
   checkPropTypes_1(contextTypes, context, 'context', name, ReactDebugCurrentFiber.getCurrentFiberStackAddendum);
 }

 // Cache unmasked context so we can avoid recreating masked context unless necessary.
 // Context is created before the class component is instantiated so check for instance.
 if (instance) {
   cacheContext(workInProgress, unmaskedContext, context);
 }

 return context;
}

function hasContextChanged() {
 return didPerformWorkStackCursor.current;
}

function isContextConsumer(fiber) {
 return fiber.tag === ClassComponent && fiber.type.contextTypes != null;
}

function isContextProvider(fiber) {
 return fiber.tag === ClassComponent && fiber.type.childContextTypes != null;
}

function popContextProvider(fiber) {
 if (!isContextProvider(fiber)) {
   return;
 }

 pop(didPerformWorkStackCursor, fiber);
 pop(contextStackCursor, fiber);
}

function popTopLevelContextObject(fiber) {
 pop(didPerformWorkStackCursor, fiber);
 pop(contextStackCursor, fiber);
}

function pushTopLevelContextObject(fiber, context, didChange) {
 !(contextStackCursor.current === emptyObject_1) ? invariant_1(false, 'Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.') : void 0;

 push(contextStackCursor, context, fiber);
 push(didPerformWorkStackCursor, didChange, fiber);
}

function processChildContext(fiber, parentContext) {
 var instance = fiber.stateNode;
 var childContextTypes = fiber.type.childContextTypes;

 // TODO (bvaughn) Replace this behavior with an invariant() in the future.
 // It has only been added in Fiber to match the (unintentional) behavior in Stack.
 if (typeof instance.getChildContext !== 'function') {
   {
     var componentName = getComponentName(fiber) || 'Unknown';

     if (!warnedAboutMissingGetChildContext[componentName]) {
       warnedAboutMissingGetChildContext[componentName] = true;
       warning_1(false, '%s.childContextTypes is specified but there is no getChildContext() method ' + 'on the instance. You can either define getChildContext() on %s or remove ' + 'childContextTypes from it.', componentName, componentName);
     }
   }
   return parentContext;
 }

 var childContext = void 0;
 {
   ReactDebugCurrentFiber.setCurrentPhase('getChildContext');
 }
 startPhaseTimer(fiber, 'getChildContext');
 childContext = instance.getChildContext();
 stopPhaseTimer();
 {
   ReactDebugCurrentFiber.setCurrentPhase(null);
 }
 for (var contextKey in childContext) {
   !(contextKey in childContextTypes) ? invariant_1(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', getComponentName(fiber) || 'Unknown', contextKey) : void 0;
 }
 {
   var name = getComponentName(fiber) || 'Unknown';
   checkPropTypes_1(childContextTypes, childContext, 'child context', name,
   // In practice, there is one case in which we won't get a stack. It's when
   // somebody calls unstable_renderSubtreeIntoContainer() and we process
   // context from the parent component instance. The stack will be missing
   // because it's outside of the reconciliation, and so the pointer has not
   // been set. This is rare and doesn't matter. We'll also remove that API.
   ReactDebugCurrentFiber.getCurrentFiberStackAddendum);
 }

 return _assign({}, parentContext, childContext);
}

function pushContextProvider(workInProgress) {
 if (!isContextProvider(workInProgress)) {
   return false;
 }

 var instance = workInProgress.stateNode;
 // We push the context as early as possible to ensure stack integrity.
 // If the instance does not exist yet, we will push null at first,
 // and replace it on the stack later when invalidating the context.
 var memoizedMergedChildContext = instance && instance.__reactInternalMemoizedMergedChildContext || emptyObject_1;

 // Remember the parent context so we can merge with it later.
 // Inherit the parent's did-perform-work value to avoid inadvertently blocking updates.
 previousContext = contextStackCursor.current;
 push(contextStackCursor, memoizedMergedChildContext, workInProgress);
 push(didPerformWorkStackCursor, didPerformWorkStackCursor.current, workInProgress);

 return true;
}

function invalidateContextProvider(workInProgress, didChange) {
 var instance = workInProgress.stateNode;
 !instance ? invariant_1(false, 'Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.') : void 0;

 if (didChange) {
   // Merge parent and own context.
   // Skip this if we're not updating due to sCU.
   // This avoids unnecessarily recomputing memoized values.
   var mergedContext = processChildContext(workInProgress, previousContext);
   instance.__reactInternalMemoizedMergedChildContext = mergedContext;

   // Replace the old (or empty) context with the new one.
   // It is important to unwind the context in the reverse order.
   pop(didPerformWorkStackCursor, workInProgress);
   pop(contextStackCursor, workInProgress);
   // Now push the new context and mark that it has changed.
   push(contextStackCursor, mergedContext, workInProgress);
   push(didPerformWorkStackCursor, didChange, workInProgress);
 } else {
   pop(didPerformWorkStackCursor, workInProgress);
   push(didPerformWorkStackCursor, didChange, workInProgress);
 }
}

function findCurrentUnmaskedContext(fiber) {
 // Currently this is only used with renderSubtreeIntoContainer; not sure if it
 // makes sense elsewhere
 !(isFiberMounted(fiber) && fiber.tag === ClassComponent) ? invariant_1(false, 'Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.') : void 0;

 var node = fiber;
 while (node.tag !== HostRoot) {
   if (isContextProvider(node)) {
     return node.stateNode.__reactInternalMemoizedMergedChildContext;
   }
   var parent = node.return;
   !parent ? invariant_1(false, 'Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.') : void 0;
   node = parent;
 }
 return node.stateNode.context;
}

// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
var MAX_SIGNED_31_BIT_INT = 1073741823;

// TODO: Use an opaque type once ESLint et al support the syntax


var NoWork = 0;
var Sync = 1;
var Never = MAX_SIGNED_31_BIT_INT;

var UNIT_SIZE = 10;
var MAGIC_NUMBER_OFFSET = 2;

// 1 unit of expiration time represents 10ms.
function msToExpirationTime(ms) {
 // Always add an offset so that we don't clash with the magic number for NoWork.
 return (ms / UNIT_SIZE | 0) + MAGIC_NUMBER_OFFSET;
}

function expirationTimeToMs(expirationTime) {
 return (expirationTime - MAGIC_NUMBER_OFFSET) * UNIT_SIZE;
}

function ceiling(num, precision) {
 return ((num / precision | 0) + 1) * precision;
}

function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
 return MAGIC_NUMBER_OFFSET + ceiling(currentTime - MAGIC_NUMBER_OFFSET + expirationInMs / UNIT_SIZE, bucketSizeMs / UNIT_SIZE);
}

var NoContext = 0;
var AsyncMode = 1;
var StrictMode = 2;
var ProfileMode = 4;

var hasBadMapPolyfill = void 0;

{
 hasBadMapPolyfill = false;
 try {
   var nonExtensibleObject = Object.preventExtensions({});
   var testMap = new Map([[nonExtensibleObject, null]]);
   var testSet = new Set([nonExtensibleObject]);
   // This is necessary for Rollup to not consider these unused.
   // https://github.com/rollup/rollup/issues/1771
   // TODO: we can remove these if Rollup fixes the bug.
   testMap.set(0, 0);
   testSet.add(0);
 } catch (e) {
   // TODO: Consider warning about bad polyfills
   hasBadMapPolyfill = true;
 }
}

// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.


var debugCounter = void 0;

{
 debugCounter = 1;
}

function FiberNode(tag, pendingProps, key, mode) {
 // Instance
 this.tag = tag;
 this.key = key;
 this.type = null;
 this.stateNode = null;

 // Fiber
 this.return = null;
 this.child = null;
 this.sibling = null;
 this.index = 0;

 this.ref = null;

 this.pendingProps = pendingProps;
 this.memoizedProps = null;
 this.updateQueue = null;
 this.memoizedState = null;

 this.mode = mode;

 // Effects
 this.effectTag = NoEffect;
 this.nextEffect = null;

 this.firstEffect = null;
 this.lastEffect = null;

 this.expirationTime = NoWork;

 this.alternate = null;

 if (enableProfilerTimer) {
   this.actualDuration = 0;
   this.actualStartTime = 0;
   this.selfBaseTime = 0;
   this.treeBaseTime = 0;
 }

 {
   this._debugID = debugCounter++;
   this._debugSource = null;
   this._debugOwner = null;
   this._debugIsCurrentlyTiming = false;
   if (!hasBadMapPolyfill && typeof Object.preventExtensions === 'function') {
     Object.preventExtensions(this);
   }
 }
}

// This is a constructor function, rather than a POJO constructor, still
// please ensure we do the following:
// 1) Nobody should add any instance methods on this. Instance methods can be
//    more difficult to predict when they get optimized and they are almost
//    never inlined properly in static compilers.
// 2) Nobody should rely on `instanceof Fiber` for type testing. We should
//    always know when it is a fiber.
// 3) We might want to experiment with using numeric keys since they are easier
//    to optimize in a non-JIT environment.
// 4) We can easily go from a constructor to a createFiber object literal if that
//    is faster.
// 5) It should be easy to port this to a C struct and keep a C implementation
//    compatible.
var createFiber = function (tag, pendingProps, key, mode) {
 // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
 return new FiberNode(tag, pendingProps, key, mode);
};

function shouldConstruct(Component) {
 return !!(Component.prototype && Component.prototype.isReactComponent);
}

// This is used to create an alternate fiber to do work on.
function createWorkInProgress(current, pendingProps, expirationTime) {
 var workInProgress = current.alternate;
 if (workInProgress === null) {
   // We use a double buffering pooling technique because we know that we'll
   // only ever need at most two versions of a tree. We pool the "other" unused
   // node that we're free to reuse. This is lazily created to avoid allocating
   // extra objects for things that are never updated. It also allow us to
   // reclaim the extra memory if needed.
   workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode);
   workInProgress.type = current.type;
   workInProgress.stateNode = current.stateNode;

   {
     // DEV-only fields
     workInProgress._debugID = current._debugID;
     workInProgress._debugSource = current._debugSource;
     workInProgress._debugOwner = current._debugOwner;
   }

   workInProgress.alternate = current;
   current.alternate = workInProgress;
 } else {
   workInProgress.pendingProps = pendingProps;

   // We already have an alternate.
   // Reset the effect tag.
   workInProgress.effectTag = NoEffect;

   // The effect list is no longer valid.
   workInProgress.nextEffect = null;
   workInProgress.firstEffect = null;
   workInProgress.lastEffect = null;

   if (enableProfilerTimer) {
     // We intentionally reset, rather than copy, actualDuration & actualStartTime.
     // This prevents time from endlessly accumulating in new commits.
     // This has the downside of resetting values for different priority renders,
     // But works for yielding (the common case) and should support resuming.
     workInProgress.actualDuration = 0;
     workInProgress.actualStartTime = 0;
   }
 }

 workInProgress.expirationTime = expirationTime;

 workInProgress.child = current.child;
 workInProgress.memoizedProps = current.memoizedProps;
 workInProgress.memoizedState = current.memoizedState;
 workInProgress.updateQueue = current.updateQueue;

 // These will be overridden during the parent's reconciliation
 workInProgress.sibling = current.sibling;
 workInProgress.index = current.index;
 workInProgress.ref = current.ref;

 if (enableProfilerTimer) {
   workInProgress.selfBaseTime = current.selfBaseTime;
   workInProgress.treeBaseTime = current.treeBaseTime;
 }

 return workInProgress;
}

function createHostRootFiber(isAsync) {
 var mode = isAsync ? AsyncMode | StrictMode : NoContext;
 return createFiber(HostRoot, null, null, mode);
}

function createFiberFromElement(element, mode, expirationTime) {
 var owner = null;
 {
   owner = element._owner;
 }

 var fiber = void 0;
 var type = element.type;
 var key = element.key;
 var pendingProps = element.props;

 var fiberTag = void 0;
 if (typeof type === 'function') {
   fiberTag = shouldConstruct(type) ? ClassComponent : IndeterminateComponent;
 } else if (typeof type === 'string') {
   fiberTag = HostComponent;
 } else {
   switch (type) {
     case REACT_FRAGMENT_TYPE:
       return createFiberFromFragment(pendingProps.children, mode, expirationTime, key);
     case REACT_ASYNC_MODE_TYPE:
       fiberTag = Mode;
       mode |= AsyncMode | StrictMode;
       break;
     case REACT_STRICT_MODE_TYPE:
       fiberTag = Mode;
       mode |= StrictMode;
       break;
     case REACT_PROFILER_TYPE:
       return createFiberFromProfiler(pendingProps, mode, expirationTime, key);
     case REACT_TIMEOUT_TYPE:
       fiberTag = TimeoutComponent;
       // Suspense does not require async, but its children should be strict
       // mode compatible.
       mode |= StrictMode;
       break;
     default:
       fiberTag = getFiberTagFromObjectType(type, owner);
       break;
   }
 }

 fiber = createFiber(fiberTag, pendingProps, key, mode);
 fiber.type = type;
 fiber.expirationTime = expirationTime;

 {
   fiber._debugSource = element._source;
   fiber._debugOwner = element._owner;
 }

 return fiber;
}

function getFiberTagFromObjectType(type, owner) {
 var $$typeof = typeof type === 'object' && type !== null ? type.$$typeof : null;

 switch ($$typeof) {
   case REACT_PROVIDER_TYPE:
     return ContextProvider;
   case REACT_CONTEXT_TYPE:
     // This is a consumer
     return ContextConsumer;
   case REACT_FORWARD_REF_TYPE:
     return ForwardRef;
   default:
     {
       var info = '';
       {
         if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
           info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and " + 'named imports.';
         }
         var ownerName = owner ? getComponentName(owner) : null;
         if (ownerName) {
           info += '\n\nCheck the render method of `' + ownerName + '`.';
         }
       }
       invariant_1(false, 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s', type == null ? type : typeof type, info);
     }
 }
}

function createFiberFromFragment(elements, mode, expirationTime, key) {
 var fiber = createFiber(Fragment, elements, key, mode);
 fiber.expirationTime = expirationTime;
 return fiber;
}

function createFiberFromProfiler(pendingProps, mode, expirationTime, key) {
 {
   if (typeof pendingProps.id !== 'string' || typeof pendingProps.onRender !== 'function') {
     invariant_1(false, 'Profiler must specify an "id" string and "onRender" function as props');
   }
 }

 var fiber = createFiber(Profiler, pendingProps, key, mode | ProfileMode);
 fiber.type = REACT_PROFILER_TYPE;
 fiber.expirationTime = expirationTime;

 return fiber;
}

function createFiberFromText(content, mode, expirationTime) {
 var fiber = createFiber(HostText, content, null, mode);
 fiber.expirationTime = expirationTime;
 return fiber;
}

function createFiberFromHostInstanceForDeletion() {
 var fiber = createFiber(HostComponent, null, null, NoContext);
 fiber.type = 'DELETED';
 return fiber;
}

function createFiberFromPortal(portal, mode, expirationTime) {
 var pendingProps = portal.children !== null ? portal.children : [];
 var fiber = createFiber(HostPortal, pendingProps, portal.key, mode);
 fiber.expirationTime = expirationTime;
 fiber.stateNode = {
   containerInfo: portal.containerInfo,
   pendingChildren: null, // Used by persistent updates
   implementation: portal.implementation
 };
 return fiber;
}

// Used for stashing WIP properties to replay failed work in DEV.
function assignFiberPropertiesInDEV(target, source) {
 if (target === null) {
   // This Fiber's initial properties will always be overwritten.
   // We only use a Fiber to ensure the same hidden class so DEV isn't slow.
   target = createFiber(IndeterminateComponent, null, null, NoContext);
 }

 // This is intentionally written as a list of all properties.
 // We tried to use Object.assign() instead but this is called in
 // the hottest path, and Object.assign() was too slow:
 // https://github.com/facebook/react/issues/12502
 // This code is DEV-only so size is not a concern.

 target.tag = source.tag;
 target.key = source.key;
 target.type = source.type;
 target.stateNode = source.stateNode;
 target.return = source.return;
 target.child = source.child;
 target.sibling = source.sibling;
 target.index = source.index;
 target.ref = source.ref;
 target.pendingProps = source.pendingProps;
 target.memoizedProps = source.memoizedProps;
 target.updateQueue = source.updateQueue;
 target.memoizedState = source.memoizedState;
 target.mode = source.mode;
 target.effectTag = source.effectTag;
 target.nextEffect = source.nextEffect;
 target.firstEffect = source.firstEffect;
 target.lastEffect = source.lastEffect;
 target.expirationTime = source.expirationTime;
 target.alternate = source.alternate;
 if (enableProfilerTimer) {
   target.actualDuration = source.actualDuration;
   target.actualStartTime = source.actualStartTime;
   target.selfBaseTime = source.selfBaseTime;
   target.treeBaseTime = source.treeBaseTime;
 }
 target._debugID = source._debugID;
 target._debugSource = source._debugSource;
 target._debugOwner = source._debugOwner;
 target._debugIsCurrentlyTiming = source._debugIsCurrentlyTiming;
 return target;
}

// TODO: This should be lifted into the renderer.


function createFiberRoot(containerInfo, isAsync, hydrate) {
 // Cyclic construction. This cheats the type system right now because
 // stateNode is any.
 var uninitializedFiber = createHostRootFiber(isAsync);
 var root = {
   current: uninitializedFiber,
   containerInfo: containerInfo,
   pendingChildren: null,

   earliestPendingTime: NoWork,
   latestPendingTime: NoWork,
   earliestSuspendedTime: NoWork,
   latestSuspendedTime: NoWork,
   latestPingedTime: NoWork,

   pendingCommitExpirationTime: NoWork,
   finishedWork: null,
   context: null,
   pendingContext: null,
   hydrate: hydrate,
   remainingExpirationTime: NoWork,
   firstBatch: null,
   nextScheduledRoot: null
 };
 uninitializedFiber.stateNode = root;
 return root;
}

var onCommitFiberRoot = null;
var onCommitFiberUnmount = null;
var hasLoggedError = false;

function catchErrors(fn) {
 return function (arg) {
   try {
     return fn(arg);
   } catch (err) {
     if (true && !hasLoggedError) {
       hasLoggedError = true;
       warning_1(false, 'React DevTools encountered an error: %s', err);
     }
   }
 };
}

function injectInternals(internals) {
 if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
   // No DevTools
   return false;
 }
 var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
 if (hook.isDisabled) {
   // This isn't a real property on the hook, but it can be set to opt out
   // of DevTools integration and associated warnings and logs.
   // https://github.com/facebook/react/issues/3877
   return true;
 }
 if (!hook.supportsFiber) {
   {
     warning_1(false, 'The installed version of React DevTools is too old and will not work ' + 'with the current version of React. Please update React DevTools. ' + 'https://fb.me/react-devtools');
   }
   // DevTools exists, even though it doesn't support Fiber.
   return true;
 }
 try {
   var rendererID = hook.inject(internals);
   // We have successfully injected, so now it is safe to set up hooks.
   onCommitFiberRoot = catchErrors(function (root) {
     return hook.onCommitFiberRoot(rendererID, root);
   });
   onCommitFiberUnmount = catchErrors(function (fiber) {
     return hook.onCommitFiberUnmount(rendererID, fiber);
   });
 } catch (err) {
   // Catch all errors because it is unsafe to throw during initialization.
   {
     warning_1(false, 'React DevTools encountered an error: %s.', err);
   }
 }
 // DevTools exists
 return true;
}

function onCommitRoot(root) {
 if (typeof onCommitFiberRoot === 'function') {
   onCommitFiberRoot(root);
 }
}

function onCommitUnmount(fiber) {
 if (typeof onCommitFiberUnmount === 'function') {
   onCommitFiberUnmount(fiber);
 }
}

/**
* Forked from fbjs/warning:
* https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
*
* Only change is we use console.warn instead of console.error,
* and do nothing when 'console' is not supported.
* This really simplifies the code.
* ---
* Similar to invariant but only logs a warning if the condition is not met.
* This can be used to log issues in development environments in critical
* paths. Removing the logging code for production environments will keep the
* same logic and follow the same code paths.
*/

var lowPriorityWarning = function () {};

{
 var printWarning$1 = function (format) {
   for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
     args[_key - 1] = arguments[_key];
   }

   var argIndex = 0;
   var message = 'Warning: ' + format.replace(/%s/g, function () {
     return args[argIndex++];
   });
   if (typeof console !== 'undefined') {
     console.warn(message);
   }
   try {
     // --- Welcome to debugging React ---
     // This error was thrown as a convenience so that you can use this stack
     // to find the callsite that caused this warning to fire.
     throw new Error(message);
   } catch (x) {}
 };

 lowPriorityWarning = function (condition, format) {
   if (format === undefined) {
     throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
   }
   if (!condition) {
     for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
       args[_key2 - 2] = arguments[_key2];
     }

     printWarning$1.apply(undefined, [format].concat(args));
   }
 };
}

var lowPriorityWarning$1 = lowPriorityWarning;

var ReactStrictModeWarnings = {
 discardPendingWarnings: function () {},
 flushPendingDeprecationWarnings: function () {},
 flushPendingUnsafeLifecycleWarnings: function () {},
 recordDeprecationWarnings: function (fiber, instance) {},
 recordUnsafeLifecycleWarnings: function (fiber, instance) {},
 recordLegacyContextWarning: function (fiber, instance) {},
 flushLegacyContextWarning: function () {}
};

{
 var LIFECYCLE_SUGGESTIONS = {
   UNSAFE_componentWillMount: 'componentDidMount',
   UNSAFE_componentWillReceiveProps: 'static getDerivedStateFromProps',
   UNSAFE_componentWillUpdate: 'componentDidUpdate'
 };

 var pendingComponentWillMountWarnings = [];
 var pendingComponentWillReceivePropsWarnings = [];
 var pendingComponentWillUpdateWarnings = [];
 var pendingUnsafeLifecycleWarnings = new Map();
 var pendingLegacyContextWarning = new Map();

 // Tracks components we have already warned about.
 var didWarnAboutDeprecatedLifecycles = new Set();
 var didWarnAboutUnsafeLifecycles = new Set();
 var didWarnAboutLegacyContext = new Set();

 var setToSortedString = function (set) {
   var array = [];
   set.forEach(function (value) {
     array.push(value);
   });
   return array.sort().join(', ');
 };

 ReactStrictModeWarnings.discardPendingWarnings = function () {
   pendingComponentWillMountWarnings = [];
   pendingComponentWillReceivePropsWarnings = [];
   pendingComponentWillUpdateWarnings = [];
   pendingUnsafeLifecycleWarnings = new Map();
   pendingLegacyContextWarning = new Map();
 };

 ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings = function () {
   pendingUnsafeLifecycleWarnings.forEach(function (lifecycleWarningsMap, strictRoot) {
     var lifecyclesWarningMesages = [];

     Object.keys(lifecycleWarningsMap).forEach(function (lifecycle) {
       var lifecycleWarnings = lifecycleWarningsMap[lifecycle];
       if (lifecycleWarnings.length > 0) {
         var componentNames = new Set();
         lifecycleWarnings.forEach(function (fiber) {
           componentNames.add(getComponentName(fiber) || 'Component');
           didWarnAboutUnsafeLifecycles.add(fiber.type);
         });

         var formatted = lifecycle.replace('UNSAFE_', '');
         var suggestion = LIFECYCLE_SUGGESTIONS[lifecycle];
         var sortedComponentNames = setToSortedString(componentNames);

         lifecyclesWarningMesages.push(formatted + ': Please update the following components to use ' + (suggestion + ' instead: ' + sortedComponentNames));
       }
     });

     if (lifecyclesWarningMesages.length > 0) {
       var strictRootComponentStack = getStackAddendumByWorkInProgressFiber(strictRoot);

       warning_1(false, 'Unsafe lifecycle methods were found within a strict-mode tree:%s' + '\n\n%s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-strict-mode-warnings', strictRootComponentStack, lifecyclesWarningMesages.join('\n\n'));
     }
   });

   pendingUnsafeLifecycleWarnings = new Map();
 };

 var findStrictRoot = function (fiber) {
   var maybeStrictRoot = null;

   var node = fiber;
   while (node !== null) {
     if (node.mode & StrictMode) {
       maybeStrictRoot = node;
     }
     node = node.return;
   }

   return maybeStrictRoot;
 };

 ReactStrictModeWarnings.flushPendingDeprecationWarnings = function () {
   if (pendingComponentWillMountWarnings.length > 0) {
     var uniqueNames = new Set();
     pendingComponentWillMountWarnings.forEach(function (fiber) {
       uniqueNames.add(getComponentName(fiber) || 'Component');
       didWarnAboutDeprecatedLifecycles.add(fiber.type);
     });

     var sortedNames = setToSortedString(uniqueNames);

     lowPriorityWarning$1(false, 'componentWillMount is deprecated and will be removed in the next major version. ' + 'Use componentDidMount instead. As a temporary workaround, ' + 'you can rename to UNSAFE_componentWillMount.' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-async-component-lifecycle-hooks', sortedNames);

     pendingComponentWillMountWarnings = [];
   }

   if (pendingComponentWillReceivePropsWarnings.length > 0) {
     var _uniqueNames = new Set();
     pendingComponentWillReceivePropsWarnings.forEach(function (fiber) {
       _uniqueNames.add(getComponentName(fiber) || 'Component');
       didWarnAboutDeprecatedLifecycles.add(fiber.type);
     });

     var _sortedNames = setToSortedString(_uniqueNames);

     lowPriorityWarning$1(false, 'componentWillReceiveProps is deprecated and will be removed in the next major version. ' + 'Use static getDerivedStateFromProps instead.' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-async-component-lifecycle-hooks', _sortedNames);

     pendingComponentWillReceivePropsWarnings = [];
   }

   if (pendingComponentWillUpdateWarnings.length > 0) {
     var _uniqueNames2 = new Set();
     pendingComponentWillUpdateWarnings.forEach(function (fiber) {
       _uniqueNames2.add(getComponentName(fiber) || 'Component');
       didWarnAboutDeprecatedLifecycles.add(fiber.type);
     });

     var _sortedNames2 = setToSortedString(_uniqueNames2);

     lowPriorityWarning$1(false, 'componentWillUpdate is deprecated and will be removed in the next major version. ' + 'Use componentDidUpdate instead. As a temporary workaround, ' + 'you can rename to UNSAFE_componentWillUpdate.' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-async-component-lifecycle-hooks', _sortedNames2);

     pendingComponentWillUpdateWarnings = [];
   }
 };

 ReactStrictModeWarnings.recordDeprecationWarnings = function (fiber, instance) {
   // Dedup strategy: Warn once per component.
   if (didWarnAboutDeprecatedLifecycles.has(fiber.type)) {
     return;
   }

   // Don't warn about react-lifecycles-compat polyfilled components.
   if (typeof instance.componentWillMount === 'function' && instance.componentWillMount.__suppressDeprecationWarning !== true) {
     pendingComponentWillMountWarnings.push(fiber);
   }
   if (typeof instance.componentWillReceiveProps === 'function' && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
     pendingComponentWillReceivePropsWarnings.push(fiber);
   }
   if (typeof instance.componentWillUpdate === 'function' && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
     pendingComponentWillUpdateWarnings.push(fiber);
   }
 };

 ReactStrictModeWarnings.recordUnsafeLifecycleWarnings = function (fiber, instance) {
   var strictRoot = findStrictRoot(fiber);
   if (strictRoot === null) {
     warning_1(false, 'Expected to find a StrictMode component in a strict mode tree. ' + 'This error is likely caused by a bug in React. Please file an issue.');
     return;
   }

   // Dedup strategy: Warn once per component.
   // This is difficult to track any other way since component names
   // are often vague and are likely to collide between 3rd party libraries.
   // An expand property is probably okay to use here since it's DEV-only,
   // and will only be set in the event of serious warnings.
   if (didWarnAboutUnsafeLifecycles.has(fiber.type)) {
     return;
   }

   var warningsForRoot = void 0;
   if (!pendingUnsafeLifecycleWarnings.has(strictRoot)) {
     warningsForRoot = {
       UNSAFE_componentWillMount: [],
       UNSAFE_componentWillReceiveProps: [],
       UNSAFE_componentWillUpdate: []
     };

     pendingUnsafeLifecycleWarnings.set(strictRoot, warningsForRoot);
   } else {
     warningsForRoot = pendingUnsafeLifecycleWarnings.get(strictRoot);
   }

   var unsafeLifecycles = [];
   if (typeof instance.componentWillMount === 'function' && instance.componentWillMount.__suppressDeprecationWarning !== true || typeof instance.UNSAFE_componentWillMount === 'function') {
     unsafeLifecycles.push('UNSAFE_componentWillMount');
   }
   if (typeof instance.componentWillReceiveProps === 'function' && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true || typeof instance.UNSAFE_componentWillReceiveProps === 'function') {
     unsafeLifecycles.push('UNSAFE_componentWillReceiveProps');
   }
   if (typeof instance.componentWillUpdate === 'function' && instance.componentWillUpdate.__suppressDeprecationWarning !== true || typeof instance.UNSAFE_componentWillUpdate === 'function') {
     unsafeLifecycles.push('UNSAFE_componentWillUpdate');
   }

   if (unsafeLifecycles.length > 0) {
     unsafeLifecycles.forEach(function (lifecycle) {
       warningsForRoot[lifecycle].push(fiber);
     });
   }
 };

 ReactStrictModeWarnings.recordLegacyContextWarning = function (fiber, instance) {
   var strictRoot = findStrictRoot(fiber);
   if (strictRoot === null) {
     warning_1(false, 'Expected to find a StrictMode component in a strict mode tree. ' + 'This error is likely caused by a bug in React. Please file an issue.');
     return;
   }

   // Dedup strategy: Warn once per component.
   if (didWarnAboutLegacyContext.has(fiber.type)) {
     return;
   }

   var warningsForRoot = pendingLegacyContextWarning.get(strictRoot);

   if (fiber.type.contextTypes != null || fiber.type.childContextTypes != null || instance !== null && typeof instance.getChildContext === 'function') {
     if (warningsForRoot === undefined) {
       warningsForRoot = [];
       pendingLegacyContextWarning.set(strictRoot, warningsForRoot);
     }
     warningsForRoot.push(fiber);
   }
 };

 ReactStrictModeWarnings.flushLegacyContextWarning = function () {
   pendingLegacyContextWarning.forEach(function (fiberArray, strictRoot) {
     var uniqueNames = new Set();
     fiberArray.forEach(function (fiber) {
       uniqueNames.add(getComponentName(fiber) || 'Component');
       didWarnAboutLegacyContext.add(fiber.type);
     });

     var sortedNames = setToSortedString(uniqueNames);
     var strictRootComponentStack = getStackAddendumByWorkInProgressFiber(strictRoot);

     warning_1(false, 'Legacy context API has been detected within a strict-mode tree: %s' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-strict-mode-warnings', strictRootComponentStack, sortedNames);
   });
 };
}

// This lets us hook into Fiber to debug what it's doing.
// See https://github.com/facebook/react/pull/8033.
// This is not part of the public API, not even for React DevTools.
// You may only inject a debugTool if you work on React Fiber itself.
var ReactFiberInstrumentation = {
 debugTool: null
};

var ReactFiberInstrumentation_1 = ReactFiberInstrumentation;

// TODO: Offscreen updates

function markPendingPriorityLevel(root, expirationTime) {
 if (enableSuspense) {
   // Update the latest and earliest pending times
   var earliestPendingTime = root.earliestPendingTime;
   if (earliestPendingTime === NoWork) {
     // No other pending updates.
     root.earliestPendingTime = root.latestPendingTime = expirationTime;
   } else {
     if (earliestPendingTime > expirationTime) {
       // This is the earliest pending update.
       root.earliestPendingTime = expirationTime;
     } else {
       var latestPendingTime = root.latestPendingTime;
       if (latestPendingTime < expirationTime) {
         // This is the latest pending update
         root.latestPendingTime = expirationTime;
       }
     }
   }
 }
}

function markCommittedPriorityLevels(root, currentTime, earliestRemainingTime) {
 if (enableSuspense) {
   if (earliestRemainingTime === NoWork) {
     // Fast path. There's no remaining work. Clear everything.
     root.earliestPendingTime = NoWork;
     root.latestPendingTime = NoWork;
     root.earliestSuspendedTime = NoWork;
     root.latestSuspendedTime = NoWork;
     root.latestPingedTime = NoWork;
     return;
   }

   // Let's see if the previous latest known pending level was just flushed.
   var latestPendingTime = root.latestPendingTime;
   if (latestPendingTime !== NoWork) {
     if (latestPendingTime < earliestRemainingTime) {
       // We've flushed all the known pending levels.
       root.earliestPendingTime = root.latestPendingTime = NoWork;
     } else {
       var earliestPendingTime = root.earliestPendingTime;
       if (earliestPendingTime < earliestRemainingTime) {
         // We've flushed the earliest known pending level. Set this to the
         // latest pending time.
         root.earliestPendingTime = root.latestPendingTime;
       }
     }
   }

   // Now let's handle the earliest remaining level in the whole tree. We need to
   // decide whether to treat it as a pending level or as suspended. Check
   // it falls within the range of known suspended levels.

   var earliestSuspendedTime = root.earliestSuspendedTime;
   if (earliestSuspendedTime === NoWork) {
     // There's no suspended work. Treat the earliest remaining level as a
     // pending level.
     markPendingPriorityLevel(root, earliestRemainingTime);
     return;
   }

   var latestSuspendedTime = root.latestSuspendedTime;
   if (earliestRemainingTime > latestSuspendedTime) {
     // The earliest remaining level is later than all the suspended work. That
     // means we've flushed all the suspended work.
     root.earliestSuspendedTime = NoWork;
     root.latestSuspendedTime = NoWork;
     root.latestPingedTime = NoWork;

     // There's no suspended work. Treat the earliest remaining level as a
     // pending level.
     markPendingPriorityLevel(root, earliestRemainingTime);
     return;
   }

   if (earliestRemainingTime < earliestSuspendedTime) {
     // The earliest remaining time is earlier than all the suspended work.
     // Treat it as a pending update.
     markPendingPriorityLevel(root, earliestRemainingTime);
     return;
   }

   // The earliest remaining time falls within the range of known suspended
   // levels. We should treat this as suspended work.
 }
}

function markSuspendedPriorityLevel(root, suspendedTime) {
 if (enableSuspense) {
   // First, check the known pending levels and update them if needed.
   var earliestPendingTime = root.earliestPendingTime;
   var latestPendingTime = root.latestPendingTime;
   if (earliestPendingTime === suspendedTime) {
     if (latestPendingTime === suspendedTime) {
       // Both known pending levels were suspended. Clear them.
       root.earliestPendingTime = root.latestPendingTime = NoWork;
     } else {
       // The earliest pending level was suspended. Clear by setting it to the
       // latest pending level.
       root.earliestPendingTime = latestPendingTime;
     }
   } else if (latestPendingTime === suspendedTime) {
     // The latest pending level was suspended. Clear by setting it to the
     // latest pending level.
     root.latestPendingTime = earliestPendingTime;
   }

   // Next, if we're working on the lowest known suspended level, clear the ping.
   // TODO: What if a promise suspends and pings before the root completes?
   var latestSuspendedTime = root.latestSuspendedTime;
   if (latestSuspendedTime === suspendedTime) {
     root.latestPingedTime = NoWork;
   }

   // Finally, update the known suspended levels.
   var earliestSuspendedTime = root.earliestSuspendedTime;
   if (earliestSuspendedTime === NoWork) {
     // No other suspended levels.
     root.earliestSuspendedTime = root.latestSuspendedTime = suspendedTime;
   } else {
     if (earliestSuspendedTime > suspendedTime) {
       // This is the earliest suspended level.
       root.earliestSuspendedTime = suspendedTime;
     } else if (latestSuspendedTime < suspendedTime) {
       // This is the latest suspended level
       root.latestSuspendedTime = suspendedTime;
     }
   }
 }
}

function markPingedPriorityLevel(root, pingedTime) {
 if (enableSuspense) {
   var latestSuspendedTime = root.latestSuspendedTime;
   if (latestSuspendedTime !== NoWork && latestSuspendedTime <= pingedTime) {
     var latestPingedTime = root.latestPingedTime;
     if (latestPingedTime === NoWork || latestPingedTime < pingedTime) {
       root.latestPingedTime = pingedTime;
     }
   }
 }
}

function findNextPendingPriorityLevel(root) {
 if (enableSuspense) {
   var earliestSuspendedTime = root.earliestSuspendedTime;
   var earliestPendingTime = root.earliestPendingTime;
   if (earliestSuspendedTime === NoWork) {
     // Fast path. There's no suspended work.
     return earliestPendingTime;
   }

   // First, check if there's known pending work.
   if (earliestPendingTime !== NoWork) {
     return earliestPendingTime;
   }

   // Finally, if a suspended level was pinged, work on that. Otherwise there's
   // nothing to work on.
   return root.latestPingedTime;
 } else {
   return root.current.expirationTime;
 }
}

// UpdateQueue is a linked list of prioritized updates.
//
// Like fibers, update queues come in pairs: a current queue, which represents
// the visible state of the screen, and a work-in-progress queue, which is
// can be mutated and processed asynchronously before it is committed — a form
// of double buffering. If a work-in-progress render is discarded before
// finishing, we create a new work-in-progress by cloning the current queue.
//
// Both queues share a persistent, singly-linked list structure. To schedule an
// update, we append it to the end of both queues. Each queue maintains a
// pointer to first update in the persistent list that hasn't been processed.
// The work-in-progress pointer always has a position equal to or greater than
// the current queue, since we always work on that one. The current queue's
// pointer is only updated during the commit phase, when we swap in the
// work-in-progress.
//
// For example:
//
//   Current pointer:           A - B - C - D - E - F
//   Work-in-progress pointer:              D - E - F
//                                          ^
//                                          The work-in-progress queue has
//                                          processed more updates than current.
//
// The reason we append to both queues is because otherwise we might drop
// updates without ever processing them. For example, if we only add updates to
// the work-in-progress queue, some updates could be lost whenever a work-in
// -progress render restarts by cloning from current. Similarly, if we only add
// updates to the current queue, the updates will be lost whenever an already
// in-progress queue commits and swaps with the current queue. However, by
// adding to both queues, we guarantee that the update will be part of the next
// work-in-progress. (And because the work-in-progress queue becomes the
// current queue once it commits, there's no danger of applying the same
// update twice.)
//
// Prioritization
// --------------
//
// Updates are not sorted by priority, but by insertion; new updates are always
// appended to the end of the list.
//
// The priority is still important, though. When processing the update queue
// during the render phase, only the updates with sufficient priority are
// included in the result. If we skip an update because it has insufficient
// priority, it remains in the queue to be processed later, during a lower
// priority render. Crucially, all updates subsequent to a skipped update also
// remain in the queue *regardless of their priority*. That means high priority
// updates are sometimes processed twice, at two separate priorities. We also
// keep track of a base state, that represents the state before the first
// update in the queue is applied.
//
// For example:
//
//   Given a base state of '', and the following queue of updates
//
//     A1 - B2 - C1 - D2
//
//   where the number indicates the priority, and the update is applied to the
//   previous state by appending a letter, React will process these updates as
//   two separate renders, one per distinct priority level:
//
//   First render, at priority 1:
//     Base state: ''
//     Updates: [A1, C1]
//     Result state: 'AC'
//
//   Second render, at priority 2:
//     Base state: 'A'            <-  The base state does not include C1,
//                                    because B2 was skipped.
//     Updates: [B2, C1, D2]      <-  C1 was rebased on top of B2
//     Result state: 'ABCD'
//
// Because we process updates in insertion order, and rebase high priority
// updates when preceding updates are skipped, the final result is deterministic
// regardless of priority. Intermediate state may vary according to system
// resources, but the final state is always the same.

var UpdateState = 0;
var ReplaceState = 1;
var ForceUpdate = 2;
var CaptureUpdate = 3;

// Global state that is reset at the beginning of calling `processUpdateQueue`.
// It should only be read right after calling `processUpdateQueue`, via
// `checkHasForceUpdateAfterProcessing`.
var hasForceUpdate = false;

var didWarnUpdateInsideUpdate = void 0;
var currentlyProcessingQueue = void 0;
var resetCurrentlyProcessingQueue = void 0;
{
 didWarnUpdateInsideUpdate = false;
 currentlyProcessingQueue = null;
 resetCurrentlyProcessingQueue = function () {
   currentlyProcessingQueue = null;
 };
}

function createUpdateQueue(baseState) {
 var queue = {
   expirationTime: NoWork,
   baseState: baseState,
   firstUpdate: null,
   lastUpdate: null,
   firstCapturedUpdate: null,
   lastCapturedUpdate: null,
   firstEffect: null,
   lastEffect: null,
   firstCapturedEffect: null,
   lastCapturedEffect: null
 };
 return queue;
}

function cloneUpdateQueue(currentQueue) {
 var queue = {
   expirationTime: currentQueue.expirationTime,
   baseState: currentQueue.baseState,
   firstUpdate: currentQueue.firstUpdate,
   lastUpdate: currentQueue.lastUpdate,

   // TODO: With resuming, if we bail out and resuse the child tree, we should
   // keep these effects.
   firstCapturedUpdate: null,
   lastCapturedUpdate: null,

   firstEffect: null,
   lastEffect: null,

   firstCapturedEffect: null,
   lastCapturedEffect: null
 };
 return queue;
}

function createUpdate(expirationTime) {
 return {
   expirationTime: expirationTime,

   tag: UpdateState,
   payload: null,
   callback: null,

   next: null,
   nextEffect: null
 };
}

function appendUpdateToQueue(queue, update, expirationTime) {
 // Append the update to the end of the list.
 if (queue.lastUpdate === null) {
   // Queue is empty
   queue.firstUpdate = queue.lastUpdate = update;
 } else {
   queue.lastUpdate.next = update;
   queue.lastUpdate = update;
 }
 if (queue.expirationTime === NoWork || queue.expirationTime > expirationTime) {
   // The incoming update has the earliest expiration of any update in the
   // queue. Update the queue's expiration time.
   queue.expirationTime = expirationTime;
 }
}

function enqueueUpdate(fiber, update, expirationTime) {
 // Update queues are created lazily.
 var alternate = fiber.alternate;
 var queue1 = void 0;
 var queue2 = void 0;
 if (alternate === null) {
   // There's only one fiber.
   queue1 = fiber.updateQueue;
   queue2 = null;
   if (queue1 === null) {
     queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
   }
 } else {
   // There are two owners.
   queue1 = fiber.updateQueue;
   queue2 = alternate.updateQueue;
   if (queue1 === null) {
     if (queue2 === null) {
       // Neither fiber has an update queue. Create new ones.
       queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
       queue2 = alternate.updateQueue = createUpdateQueue(alternate.memoizedState);
     } else {
       // Only one fiber has an update queue. Clone to create a new one.
       queue1 = fiber.updateQueue = cloneUpdateQueue(queue2);
     }
   } else {
     if (queue2 === null) {
       // Only one fiber has an update queue. Clone to create a new one.
       queue2 = alternate.updateQueue = cloneUpdateQueue(queue1);
     } else {
       // Both owners have an update queue.
     }
   }
 }
 if (queue2 === null || queue1 === queue2) {
   // There's only a single queue.
   appendUpdateToQueue(queue1, update, expirationTime);
 } else {
   // There are two queues. We need to append the update to both queues,
   // while accounting for the persistent structure of the list — we don't
   // want the same update to be added multiple times.
   if (queue1.lastUpdate === null || queue2.lastUpdate === null) {
     // One of the queues is not empty. We must add the update to both queues.
     appendUpdateToQueue(queue1, update, expirationTime);
     appendUpdateToQueue(queue2, update, expirationTime);
   } else {
     // Both queues are non-empty. The last update is the same in both lists,
     // because of structural sharing. So, only append to one of the lists.
     appendUpdateToQueue(queue1, update, expirationTime);
     // But we still need to update the `lastUpdate` pointer of queue2.
     queue2.lastUpdate = update;
   }
 }

 {
   if (fiber.tag === ClassComponent && (currentlyProcessingQueue === queue1 || queue2 !== null && currentlyProcessingQueue === queue2) && !didWarnUpdateInsideUpdate) {
     warning_1(false, 'An update (setState, replaceState, or forceUpdate) was scheduled ' + 'from inside an update function. Update functions should be pure, ' + 'with zero side-effects. Consider using componentDidUpdate or a ' + 'callback.');
     didWarnUpdateInsideUpdate = true;
   }
 }
}

function enqueueCapturedUpdate(workInProgress, update, renderExpirationTime) {
 // Captured updates go into a separate list, and only on the work-in-
 // progress queue.
 var workInProgressQueue = workInProgress.updateQueue;
 if (workInProgressQueue === null) {
   workInProgressQueue = workInProgress.updateQueue = createUpdateQueue(workInProgress.memoizedState);
 } else {
   // TODO: I put this here rather than createWorkInProgress so that we don't
   // clone the queue unnecessarily. There's probably a better way to
   // structure this.
   workInProgressQueue = ensureWorkInProgressQueueIsAClone(workInProgress, workInProgressQueue);
 }

 // Append the update to the end of the list.
 if (workInProgressQueue.lastCapturedUpdate === null) {
   // This is the first render phase update
   workInProgressQueue.firstCapturedUpdate = workInProgressQueue.lastCapturedUpdate = update;
 } else {
   workInProgressQueue.lastCapturedUpdate.next = update;
   workInProgressQueue.lastCapturedUpdate = update;
 }
 if (workInProgressQueue.expirationTime === NoWork || workInProgressQueue.expirationTime > renderExpirationTime) {
   // The incoming update has the earliest expiration of any update in the
   // queue. Update the queue's expiration time.
   workInProgressQueue.expirationTime = renderExpirationTime;
 }
}

function ensureWorkInProgressQueueIsAClone(workInProgress, queue) {
 var current = workInProgress.alternate;
 if (current !== null) {
   // If the work-in-progress queue is equal to the current queue,
   // we need to clone it first.
   if (queue === current.updateQueue) {
     queue = workInProgress.updateQueue = cloneUpdateQueue(queue);
   }
 }
 return queue;
}

function getStateFromUpdate(workInProgress, queue, update, prevState, nextProps, instance) {
 switch (update.tag) {
   case ReplaceState:
     {
       var _payload = update.payload;
       if (typeof _payload === 'function') {
         // Updater function
         {
           if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
             _payload.call(instance, prevState, nextProps);
           }
         }
         return _payload.call(instance, prevState, nextProps);
       }
       // State object
       return _payload;
     }
   case CaptureUpdate:
     {
       workInProgress.effectTag = workInProgress.effectTag & ~ShouldCapture | DidCapture;
     }
   // Intentional fallthrough
   case UpdateState:
     {
       var _payload2 = update.payload;
       var partialState = void 0;
       if (typeof _payload2 === 'function') {
         // Updater function
         {
           if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
             _payload2.call(instance, prevState, nextProps);
           }
         }
         partialState = _payload2.call(instance, prevState, nextProps);
       } else {
         // Partial state object
         partialState = _payload2;
       }
       if (partialState === null || partialState === undefined) {
         // Null and undefined are treated as no-ops.
         return prevState;
       }
       // Merge the partial state and the previous state.
       return _assign({}, prevState, partialState);
     }
   case ForceUpdate:
     {
       hasForceUpdate = true;
       return prevState;
     }
 }
 return prevState;
}

function processUpdateQueue(workInProgress, queue, props, instance, renderExpirationTime) {
 hasForceUpdate = false;

 if (queue.expirationTime === NoWork || queue.expirationTime > renderExpirationTime) {
   // Insufficient priority. Bailout.
   return;
 }

 queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue);

 {
   currentlyProcessingQueue = queue;
 }

 // These values may change as we process the queue.
 var newBaseState = queue.baseState;
 var newFirstUpdate = null;
 var newExpirationTime = NoWork;

 // Iterate through the list of updates to compute the result.
 var update = queue.firstUpdate;
 var resultState = newBaseState;
 while (update !== null) {
   var updateExpirationTime = update.expirationTime;
   if (updateExpirationTime > renderExpirationTime) {
     // This update does not have sufficient priority. Skip it.
     if (newFirstUpdate === null) {
       // This is the first skipped update. It will be the first update in
       // the new list.
       newFirstUpdate = update;
       // Since this is the first update that was skipped, the current result
       // is the new base state.
       newBaseState = resultState;
     }
     // Since this update will remain in the list, update the remaining
     // expiration time.
     if (newExpirationTime === NoWork || newExpirationTime > updateExpirationTime) {
       newExpirationTime = updateExpirationTime;
     }
   } else {
     // This update does have sufficient priority. Process it and compute
     // a new result.
     resultState = getStateFromUpdate(workInProgress, queue, update, resultState, props, instance);
     var _callback = update.callback;
     if (_callback !== null) {
       workInProgress.effectTag |= Callback;
       // Set this to null, in case it was mutated during an aborted render.
       update.nextEffect = null;
       if (queue.lastEffect === null) {
         queue.firstEffect = queue.lastEffect = update;
       } else {
         queue.lastEffect.nextEffect = update;
         queue.lastEffect = update;
       }
     }
   }
   // Continue to the next update.
   update = update.next;
 }

 // Separately, iterate though the list of captured updates.
 var newFirstCapturedUpdate = null;
 update = queue.firstCapturedUpdate;
 while (update !== null) {
   var _updateExpirationTime = update.expirationTime;
   if (_updateExpirationTime > renderExpirationTime) {
     // This update does not have sufficient priority. Skip it.
     if (newFirstCapturedUpdate === null) {
       // This is the first skipped captured update. It will be the first
       // update in the new list.
       newFirstCapturedUpdate = update;
       // If this is the first update that was skipped, the current result is
       // the new base state.
       if (newFirstUpdate === null) {
         newBaseState = resultState;
       }
     }
     // Since this update will remain in the list, update the remaining
     // expiration time.
     if (newExpirationTime === NoWork || newExpirationTime > _updateExpirationTime) {
       newExpirationTime = _updateExpirationTime;
     }
   } else {
     // This update does have sufficient priority. Process it and compute
     // a new result.
     resultState = getStateFromUpdate(workInProgress, queue, update, resultState, props, instance);
     var _callback2 = update.callback;
     if (_callback2 !== null) {
       workInProgress.effectTag |= Callback;
       // Set this to null, in case it was mutated during an aborted render.
       update.nextEffect = null;
       if (queue.lastCapturedEffect === null) {
         queue.firstCapturedEffect = queue.lastCapturedEffect = update;
       } else {
         queue.lastCapturedEffect.nextEffect = update;
         queue.lastCapturedEffect = update;
       }
     }
   }
   update = update.next;
 }

 if (newFirstUpdate === null) {
   queue.lastUpdate = null;
 }
 if (newFirstCapturedUpdate === null) {
   queue.lastCapturedUpdate = null;
 } else {
   workInProgress.effectTag |= Callback;
 }
 if (newFirstUpdate === null && newFirstCapturedUpdate === null) {
   // We processed every update, without skipping. That means the new base
   // state is the same as the result state.
   newBaseState = resultState;
 }

 queue.baseState = newBaseState;
 queue.firstUpdate = newFirstUpdate;
 queue.firstCapturedUpdate = newFirstCapturedUpdate;
 queue.expirationTime = newExpirationTime;

 workInProgress.memoizedState = resultState;

 {
   currentlyProcessingQueue = null;
 }
}

function callCallback(callback, context) {
 !(typeof callback === 'function') ? invariant_1(false, 'Invalid argument passed as callback. Expected a function. Instead received: %s', callback) : void 0;
 callback.call(context);
}

function resetHasForceUpdateBeforeProcessing() {
 hasForceUpdate = false;
}

function checkHasForceUpdateAfterProcessing() {
 return hasForceUpdate;
}

function commitUpdateQueue(finishedWork, finishedQueue, instance, renderExpirationTime) {
 // If the finished render included captured updates, and there are still
 // lower priority updates left over, we need to keep the captured updates
 // in the queue so that they are rebased and not dropped once we process the
 // queue again at the lower priority.
 if (finishedQueue.firstCapturedUpdate !== null) {
   // Join the captured update list to the end of the normal list.
   if (finishedQueue.lastUpdate !== null) {
     finishedQueue.lastUpdate.next = finishedQueue.firstCapturedUpdate;
     finishedQueue.lastUpdate = finishedQueue.lastCapturedUpdate;
   }
   // Clear the list of captured updates.
   finishedQueue.firstCapturedUpdate = finishedQueue.lastCapturedUpdate = null;
 }

 // Commit the effects
 var effect = finishedQueue.firstEffect;
 finishedQueue.firstEffect = finishedQueue.lastEffect = null;
 while (effect !== null) {
   var _callback3 = effect.callback;
   if (_callback3 !== null) {
     effect.callback = null;
     callCallback(_callback3, instance);
   }
   effect = effect.nextEffect;
 }

 effect = finishedQueue.firstCapturedEffect;
 finishedQueue.firstCapturedEffect = finishedQueue.lastCapturedEffect = null;
 while (effect !== null) {
   var _callback4 = effect.callback;
   if (_callback4 !== null) {
     effect.callback = null;
     callCallback(_callback4, instance);
   }
   effect = effect.nextEffect;
 }
}

function createCapturedValue(value, source) {
 // If the value is an error, call this function immediately after it is thrown
 // so the stack is accurate.
 return {
   value: value,
   source: source,
   stack: getStackAddendumByWorkInProgressFiber(source)
 };
}

var providerCursor = createCursor(null);
var valueCursor = createCursor(null);
var changedBitsCursor = createCursor(0);

var rendererSigil = void 0;
{
 // Use this to detect multiple renderers using the same context
 rendererSigil = {};
}

function pushProvider(providerFiber) {
 var context = providerFiber.type._context;

 if (isPrimaryRenderer) {
   push(changedBitsCursor, context._changedBits, providerFiber);
   push(valueCursor, context._currentValue, providerFiber);
   push(providerCursor, providerFiber, providerFiber);

   context._currentValue = providerFiber.pendingProps.value;
   context._changedBits = providerFiber.stateNode;
   {
     !(context._currentRenderer === undefined || context._currentRenderer === null || context._currentRenderer === rendererSigil) ? warning_1(false, 'Detected multiple renderers concurrently rendering the ' + 'same context provider. This is currently unsupported.') : void 0;
     context._currentRenderer = rendererSigil;
   }
 } else {
   push(changedBitsCursor, context._changedBits2, providerFiber);
   push(valueCursor, context._currentValue2, providerFiber);
   push(providerCursor, providerFiber, providerFiber);

   context._currentValue2 = providerFiber.pendingProps.value;
   context._changedBits2 = providerFiber.stateNode;
   {
     !(context._currentRenderer2 === undefined || context._currentRenderer2 === null || context._currentRenderer2 === rendererSigil) ? warning_1(false, 'Detected multiple renderers concurrently rendering the ' + 'same context provider. This is currently unsupported.') : void 0;
     context._currentRenderer2 = rendererSigil;
   }
 }
}

function popProvider(providerFiber) {
 var changedBits = changedBitsCursor.current;
 var currentValue = valueCursor.current;

 pop(providerCursor, providerFiber);
 pop(valueCursor, providerFiber);
 pop(changedBitsCursor, providerFiber);

 var context = providerFiber.type._context;
 if (isPrimaryRenderer) {
   context._currentValue = currentValue;
   context._changedBits = changedBits;
 } else {
   context._currentValue2 = currentValue;
   context._changedBits2 = changedBits;
 }
}

function getContextCurrentValue(context) {
 return isPrimaryRenderer ? context._currentValue : context._currentValue2;
}

function getContextChangedBits(context) {
 return isPrimaryRenderer ? context._changedBits : context._changedBits2;
}

var NO_CONTEXT = {};

var contextStackCursor$1 = createCursor(NO_CONTEXT);
var contextFiberStackCursor = createCursor(NO_CONTEXT);
var rootInstanceStackCursor = createCursor(NO_CONTEXT);

function requiredContext(c) {
 !(c !== NO_CONTEXT) ? invariant_1(false, 'Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.') : void 0;
 return c;
}

function getRootHostContainer() {
 var rootInstance = requiredContext(rootInstanceStackCursor.current);
 return rootInstance;
}

function pushHostContainer(fiber, nextRootInstance) {
 // Push current root instance onto the stack;
 // This allows us to reset root when portals are popped.
 push(rootInstanceStackCursor, nextRootInstance, fiber);
 // Track the context and the Fiber that provided it.
 // This enables us to pop only Fibers that provide unique contexts.
 push(contextFiberStackCursor, fiber, fiber);

 // Finally, we need to push the host context to the stack.
 // However, we can't just call getRootHostContext() and push it because
 // we'd have a different number of entries on the stack depending on
 // whether getRootHostContext() throws somewhere in renderer code or not.
 // So we push an empty value first. This lets us safely unwind on errors.
 push(contextStackCursor$1, NO_CONTEXT, fiber);
 var nextRootContext = getRootHostContext(nextRootInstance);
 // Now that we know this function doesn't throw, replace it.
 pop(contextStackCursor$1, fiber);
 push(contextStackCursor$1, nextRootContext, fiber);
}

function popHostContainer(fiber) {
 pop(contextStackCursor$1, fiber);
 pop(contextFiberStackCursor, fiber);
 pop(rootInstanceStackCursor, fiber);
}

function getHostContext() {
 var context = requiredContext(contextStackCursor$1.current);
 return context;
}

function pushHostContext(fiber) {
 var rootInstance = requiredContext(rootInstanceStackCursor.current);
 var context = requiredContext(contextStackCursor$1.current);
 var nextContext = getChildHostContext(context, fiber.type, rootInstance);

 // Don't push this Fiber's context unless it's unique.
 if (context === nextContext) {
   return;
 }

 // Track the context and the Fiber that provided it.
 // This enables us to pop only Fibers that provide unique contexts.
 push(contextFiberStackCursor, fiber, fiber);
 push(contextStackCursor$1, nextContext, fiber);
}

function popHostContext(fiber) {
 // Do not pop unless this Fiber provided the current context.
 // pushHostContext() only pushes Fibers that provide unique contexts.
 if (contextFiberStackCursor.current !== fiber) {
   return;
 }

 pop(contextStackCursor$1, fiber);
 pop(contextFiberStackCursor, fiber);
}

var commitTime = 0;

function getCommitTime() {
 return commitTime;
}

function recordCommitTime() {
 if (!enableProfilerTimer) {
   return;
 }
 commitTime = now();
}

/**
* The "actual" render time is total time required to render the descendants of a Profiler component.
* This time is stored as a stack, since Profilers can be nested.
* This time is started during the "begin" phase and stopped during the "complete" phase.
* It is paused (and accumulated) in the event of an interruption or an aborted render.
*/

var fiberStack$1 = void 0;

{
 fiberStack$1 = [];
}

var timerPausedAt = 0;
var totalElapsedPauseTime = 0;

function checkActualRenderTimeStackEmpty() {
 if (!enableProfilerTimer) {
   return;
 }
 {
   !(fiberStack$1.length === 0) ? warning_1(false, 'Expected an empty stack. Something was not reset properly.') : void 0;
 }
}

function markActualRenderTimeStarted(fiber) {
 if (!enableProfilerTimer) {
   return;
 }
 {
   fiberStack$1.push(fiber);
 }

 fiber.actualDuration = now() - fiber.actualDuration - totalElapsedPauseTime;
 fiber.actualStartTime = now();
}

function pauseActualRenderTimerIfRunning() {
 if (!enableProfilerTimer) {
   return;
 }
 if (timerPausedAt === 0) {
   timerPausedAt = now();
 }
}

function recordElapsedActualRenderTime(fiber) {
 if (!enableProfilerTimer) {
   return;
 }
 {
   !(fiber === fiberStack$1.pop()) ? warning_1(false, 'Unexpected Fiber (%s) popped.', getComponentName(fiber)) : void 0;
 }

 fiber.actualDuration = now() - totalElapsedPauseTime - fiber.actualDuration;
}

function resetActualRenderTimer() {
 if (!enableProfilerTimer) {
   return;
 }
 totalElapsedPauseTime = 0;
}

function resumeActualRenderTimerIfPaused() {
 if (!enableProfilerTimer) {
   return;
 }
 if (timerPausedAt > 0) {
   totalElapsedPauseTime += now() - timerPausedAt;
   timerPausedAt = 0;
 }
}

/**
* The "base" render time is the duration of the “begin” phase of work for a particular fiber.
* This time is measured and stored on each fiber.
* The time for all sibling fibers are accumulated and stored on their parent during the "complete" phase.
* If a fiber bails out (sCU false) then its "base" timer is cancelled and the fiber is not updated.
*/

var baseStartTime = -1;

function recordElapsedBaseRenderTimeIfRunning(fiber) {
 if (!enableProfilerTimer) {
   return;
 }
 if (baseStartTime !== -1) {
   fiber.selfBaseTime = now() - baseStartTime;
 }
}

function startBaseRenderTimer() {
 if (!enableProfilerTimer) {
   return;
 }
 {
   if (baseStartTime !== -1) {
     warning_1(false, 'Cannot start base timer that is already running. ' + 'This error is likely caused by a bug in React. ' + 'Please file an issue.');
   }
 }
 baseStartTime = now();
}

function stopBaseRenderTimerIfRunning() {
 if (!enableProfilerTimer) {
   return;
 }
 baseStartTime = -1;
}

var fakeInternalInstance = {};
var isArray = Array.isArray;

var didWarnAboutStateAssignmentForComponent = void 0;
var didWarnAboutUninitializedState = void 0;
var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = void 0;
var didWarnAboutLegacyLifecyclesAndDerivedState = void 0;
var didWarnAboutUndefinedDerivedState = void 0;
var warnOnUndefinedDerivedState = void 0;
var warnOnInvalidCallback$1 = void 0;

{
 didWarnAboutStateAssignmentForComponent = new Set();
 didWarnAboutUninitializedState = new Set();
 didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = new Set();
 didWarnAboutLegacyLifecyclesAndDerivedState = new Set();
 didWarnAboutUndefinedDerivedState = new Set();

 var didWarnOnInvalidCallback = new Set();

 warnOnInvalidCallback$1 = function (callback, callerName) {
   if (callback === null || typeof callback === 'function') {
     return;
   }
   var key = callerName + '_' + callback;
   if (!didWarnOnInvalidCallback.has(key)) {
     didWarnOnInvalidCallback.add(key);
     warning_1(false, '%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, callback);
   }
 };

 warnOnUndefinedDerivedState = function (workInProgress, partialState) {
   if (partialState === undefined) {
     var componentName = getComponentName(workInProgress) || 'Component';
     if (!didWarnAboutUndefinedDerivedState.has(componentName)) {
       didWarnAboutUndefinedDerivedState.add(componentName);
       warning_1(false, '%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. ' + 'You have returned undefined.', componentName);
     }
   }
 };

 // This is so gross but it's at least non-critical and can be removed if
 // it causes problems. This is meant to give a nicer error message for
 // ReactDOM15.unstable_renderSubtreeIntoContainer(reactDOM16Component,
 // ...)) which otherwise throws a "_processChildContext is not a function"
 // exception.
 Object.defineProperty(fakeInternalInstance, '_processChildContext', {
   enumerable: false,
   value: function () {
     invariant_1(false, '_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn\'t supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).');
   }
 });
 Object.freeze(fakeInternalInstance);
}

function applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, nextProps) {
 var prevState = workInProgress.memoizedState;

 {
   if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
     // Invoke the function an extra time to help detect side-effects.
     getDerivedStateFromProps(nextProps, prevState);
   }
 }

 var partialState = getDerivedStateFromProps(nextProps, prevState);

 {
   warnOnUndefinedDerivedState(workInProgress, partialState);
 }
 // Merge the partial state and the previous state.
 var memoizedState = partialState === null || partialState === undefined ? prevState : _assign({}, prevState, partialState);
 workInProgress.memoizedState = memoizedState;

 // Once the update queue is empty, persist the derived state onto the
 // base state.
 var updateQueue = workInProgress.updateQueue;
 if (updateQueue !== null && updateQueue.expirationTime === NoWork) {
   updateQueue.baseState = memoizedState;
 }
}

var classComponentUpdater = {
 isMounted: isMounted,
 enqueueSetState: function (inst, payload, callback) {
   var fiber = get(inst);
   var currentTime = recalculateCurrentTime();
   var expirationTime = computeExpirationForFiber(currentTime, fiber);

   var update = createUpdate(expirationTime);
   update.payload = payload;
   if (callback !== undefined && callback !== null) {
     {
       warnOnInvalidCallback$1(callback, 'setState');
     }
     update.callback = callback;
   }

   enqueueUpdate(fiber, update, expirationTime);
   scheduleWork$1(fiber, expirationTime);
 },
 enqueueReplaceState: function (inst, payload, callback) {
   var fiber = get(inst);
   var currentTime = recalculateCurrentTime();
   var expirationTime = computeExpirationForFiber(currentTime, fiber);

   var update = createUpdate(expirationTime);
   update.tag = ReplaceState;
   update.payload = payload;

   if (callback !== undefined && callback !== null) {
     {
       warnOnInvalidCallback$1(callback, 'replaceState');
     }
     update.callback = callback;
   }

   enqueueUpdate(fiber, update, expirationTime);
   scheduleWork$1(fiber, expirationTime);
 },
 enqueueForceUpdate: function (inst, callback) {
   var fiber = get(inst);
   var currentTime = recalculateCurrentTime();
   var expirationTime = computeExpirationForFiber(currentTime, fiber);

   var update = createUpdate(expirationTime);
   update.tag = ForceUpdate;

   if (callback !== undefined && callback !== null) {
     {
       warnOnInvalidCallback$1(callback, 'forceUpdate');
     }
     update.callback = callback;
   }

   enqueueUpdate(fiber, update, expirationTime);
   scheduleWork$1(fiber, expirationTime);
 }
};

function checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext) {
 var instance = workInProgress.stateNode;
 var ctor = workInProgress.type;
 if (typeof instance.shouldComponentUpdate === 'function') {
   startPhaseTimer(workInProgress, 'shouldComponentUpdate');
   var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, newContext);
   stopPhaseTimer();

   {
     !(shouldUpdate !== undefined) ? warning_1(false, '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', getComponentName(workInProgress) || 'Component') : void 0;
   }

   return shouldUpdate;
 }

 if (ctor.prototype && ctor.prototype.isPureReactComponent) {
   return !shallowEqual_1(oldProps, newProps) || !shallowEqual_1(oldState, newState);
 }

 return true;
}

function checkClassInstance(workInProgress) {
 var instance = workInProgress.stateNode;
 var type = workInProgress.type;
 {
   var name = getComponentName(workInProgress) || 'Component';
   var renderPresent = instance.render;

   if (!renderPresent) {
     if (type.prototype && typeof type.prototype.render === 'function') {
       warning_1(false, '%s(...): No `render` method found on the returned component ' + 'instance: did you accidentally return an object from the constructor?', name);
     } else {
       warning_1(false, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', name);
     }
   }

   var noGetInitialStateOnES6 = !instance.getInitialState || instance.getInitialState.isReactClassApproved || instance.state;
   !noGetInitialStateOnES6 ? warning_1(false, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', name) : void 0;
   var noGetDefaultPropsOnES6 = !instance.getDefaultProps || instance.getDefaultProps.isReactClassApproved;
   !noGetDefaultPropsOnES6 ? warning_1(false, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', name) : void 0;
   var noInstancePropTypes = !instance.propTypes;
   !noInstancePropTypes ? warning_1(false, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', name) : void 0;
   var noInstanceContextTypes = !instance.contextTypes;
   !noInstanceContextTypes ? warning_1(false, 'contextTypes was defined as an instance property on %s. Use a static ' + 'property to define contextTypes instead.', name) : void 0;
   var noComponentShouldUpdate = typeof instance.componentShouldUpdate !== 'function';
   !noComponentShouldUpdate ? warning_1(false, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', name) : void 0;
   if (type.prototype && type.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== 'undefined') {
     warning_1(false, '%s has a method called shouldComponentUpdate(). ' + 'shouldComponentUpdate should not be used when extending React.PureComponent. ' + 'Please extend React.Component if shouldComponentUpdate is used.', getComponentName(workInProgress) || 'A pure component');
   }
   var noComponentDidUnmount = typeof instance.componentDidUnmount !== 'function';
   !noComponentDidUnmount ? warning_1(false, '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', name) : void 0;
   var noComponentDidReceiveProps = typeof instance.componentDidReceiveProps !== 'function';
   !noComponentDidReceiveProps ? warning_1(false, '%s has a method called ' + 'componentDidReceiveProps(). But there is no such lifecycle method. ' + 'If you meant to update the state in response to changing props, ' + 'use componentWillReceiveProps(). If you meant to fetch data or ' + 'run side-effects or mutations after React has updated the UI, use componentDidUpdate().', name) : void 0;
   var noComponentWillRecieveProps = typeof instance.componentWillRecieveProps !== 'function';
   !noComponentWillRecieveProps ? warning_1(false, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', name) : void 0;
   var noUnsafeComponentWillRecieveProps = typeof instance.UNSAFE_componentWillRecieveProps !== 'function';
   !noUnsafeComponentWillRecieveProps ? warning_1(false, '%s has a method called ' + 'UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?', name) : void 0;
   var hasMutatedProps = instance.props !== workInProgress.pendingProps;
   !(instance.props === undefined || !hasMutatedProps) ? warning_1(false, '%s(...): When calling super() in `%s`, make sure to pass ' + "up the same props that your component's constructor was passed.", name, name) : void 0;
   var noInstanceDefaultProps = !instance.defaultProps;
   !noInstanceDefaultProps ? warning_1(false, 'Setting defaultProps as an instance property on %s is not supported and will be ignored.' + ' Instead, define defaultProps as a static property on %s.', name, name) : void 0;

   if (typeof instance.getSnapshotBeforeUpdate === 'function' && typeof instance.componentDidUpdate !== 'function' && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(type)) {
     didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(type);
     warning_1(false, '%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). ' + 'This component defines getSnapshotBeforeUpdate() only.', getComponentName(workInProgress));
   }

   var noInstanceGetDerivedStateFromProps = typeof instance.getDerivedStateFromProps !== 'function';
   !noInstanceGetDerivedStateFromProps ? warning_1(false, '%s: getDerivedStateFromProps() is defined as an instance method ' + 'and will be ignored. Instead, declare it as a static method.', name) : void 0;
   var noInstanceGetDerivedStateFromCatch = typeof instance.getDerivedStateFromCatch !== 'function';
   !noInstanceGetDerivedStateFromCatch ? warning_1(false, '%s: getDerivedStateFromCatch() is defined as an instance method ' + 'and will be ignored. Instead, declare it as a static method.', name) : void 0;
   var noStaticGetSnapshotBeforeUpdate = typeof type.getSnapshotBeforeUpdate !== 'function';
   !noStaticGetSnapshotBeforeUpdate ? warning_1(false, '%s: getSnapshotBeforeUpdate() is defined as a static method ' + 'and will be ignored. Instead, declare it as an instance method.', name) : void 0;
   var _state = instance.state;
   if (_state && (typeof _state !== 'object' || isArray(_state))) {
     warning_1(false, '%s.state: must be set to an object or null', name);
   }
   if (typeof instance.getChildContext === 'function') {
     !(typeof type.childContextTypes === 'object') ? warning_1(false, '%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', name) : void 0;
   }
 }
}

function adoptClassInstance(workInProgress, instance) {
 instance.updater = classComponentUpdater;
 workInProgress.stateNode = instance;
 // The instance needs access to the fiber so that it can schedule updates
 set(instance, workInProgress);
 {
   instance._reactInternalInstance = fakeInternalInstance;
 }
}

function constructClassInstance(workInProgress, props, renderExpirationTime) {
 var ctor = workInProgress.type;
 var unmaskedContext = getUnmaskedContext(workInProgress);
 var needsContext = isContextConsumer(workInProgress);
 var context = needsContext ? getMaskedContext(workInProgress, unmaskedContext) : emptyObject_1;

 // Instantiate twice to help detect side-effects.
 {
   if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
     new ctor(props, context); // eslint-disable-line no-new
   }
 }

 var instance = new ctor(props, context);
 var state = workInProgress.memoizedState = instance.state !== null && instance.state !== undefined ? instance.state : null;
 adoptClassInstance(workInProgress, instance);

 {
   if (typeof ctor.getDerivedStateFromProps === 'function' && state === null) {
     var componentName = getComponentName(workInProgress) || 'Component';
     if (!didWarnAboutUninitializedState.has(componentName)) {
       didWarnAboutUninitializedState.add(componentName);
       warning_1(false, '%s: Did not properly initialize state during construction. ' + 'Expected state to be an object, but it was %s.', componentName, instance.state === null ? 'null' : 'undefined');
     }
   }

   // If new component APIs are defined, "unsafe" lifecycles won't be called.
   // Warn about these lifecycles if they are present.
   // Don't warn about react-lifecycles-compat polyfilled methods though.
   if (typeof ctor.getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function') {
     var foundWillMountName = null;
     var foundWillReceivePropsName = null;
     var foundWillUpdateName = null;
     if (typeof instance.componentWillMount === 'function' && instance.componentWillMount.__suppressDeprecationWarning !== true) {
       foundWillMountName = 'componentWillMount';
     } else if (typeof instance.UNSAFE_componentWillMount === 'function') {
       foundWillMountName = 'UNSAFE_componentWillMount';
     }
     if (typeof instance.componentWillReceiveProps === 'function' && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
       foundWillReceivePropsName = 'componentWillReceiveProps';
     } else if (typeof instance.UNSAFE_componentWillReceiveProps === 'function') {
       foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
     }
     if (typeof instance.componentWillUpdate === 'function' && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
       foundWillUpdateName = 'componentWillUpdate';
     } else if (typeof instance.UNSAFE_componentWillUpdate === 'function') {
       foundWillUpdateName = 'UNSAFE_componentWillUpdate';
     }
     if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
       var _componentName = getComponentName(workInProgress) || 'Component';
       var newApiName = typeof ctor.getDerivedStateFromProps === 'function' ? 'getDerivedStateFromProps()' : 'getSnapshotBeforeUpdate()';
       if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
         didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);
         warning_1(false, 'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' + '%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\n' + 'The above lifecycles should be removed. Learn more about this warning here:\n' + 'https://fb.me/react-async-component-lifecycle-hooks', _componentName, newApiName, foundWillMountName !== null ? '\n  ' + foundWillMountName : '', foundWillReceivePropsName !== null ? '\n  ' + foundWillReceivePropsName : '', foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '');
       }
     }
   }
 }

 // Cache unmasked context so we can avoid recreating masked context unless necessary.
 // ReactFiberContext usually updates this cache but can't for newly-created instances.
 if (needsContext) {
   cacheContext(workInProgress, unmaskedContext, context);
 }

 return instance;
}

function callComponentWillMount(workInProgress, instance) {
 startPhaseTimer(workInProgress, 'componentWillMount');
 var oldState = instance.state;

 if (typeof instance.componentWillMount === 'function') {
   instance.componentWillMount();
 }
 if (typeof instance.UNSAFE_componentWillMount === 'function') {
   instance.UNSAFE_componentWillMount();
 }

 stopPhaseTimer();

 if (oldState !== instance.state) {
   {
     warning_1(false, '%s.componentWillMount(): Assigning directly to this.state is ' + "deprecated (except inside a component's " + 'constructor). Use setState instead.', getComponentName(workInProgress) || 'Component');
   }
   classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
 }
}

function callComponentWillReceiveProps(workInProgress, instance, newProps, newContext) {
 var oldState = instance.state;
 startPhaseTimer(workInProgress, 'componentWillReceiveProps');
 if (typeof instance.componentWillReceiveProps === 'function') {
   instance.componentWillReceiveProps(newProps, newContext);
 }
 if (typeof instance.UNSAFE_componentWillReceiveProps === 'function') {
   instance.UNSAFE_componentWillReceiveProps(newProps, newContext);
 }
 stopPhaseTimer();

 if (instance.state !== oldState) {
   {
     var componentName = getComponentName(workInProgress) || 'Component';
     if (!didWarnAboutStateAssignmentForComponent.has(componentName)) {
       didWarnAboutStateAssignmentForComponent.add(componentName);
       warning_1(false, '%s.componentWillReceiveProps(): Assigning directly to ' + "this.state is deprecated (except inside a component's " + 'constructor). Use setState instead.', componentName);
     }
   }
   classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
 }
}

// Invokes the mount life-cycles on a previously never rendered instance.
function mountClassInstance(workInProgress, renderExpirationTime) {
 var ctor = workInProgress.type;

 {
   checkClassInstance(workInProgress);
 }

 var instance = workInProgress.stateNode;
 var props = workInProgress.pendingProps;
 var unmaskedContext = getUnmaskedContext(workInProgress);

 instance.props = props;
 instance.state = workInProgress.memoizedState;
 instance.refs = emptyObject_1;
 instance.context = getMaskedContext(workInProgress, unmaskedContext);

 {
   if (workInProgress.mode & StrictMode) {
     ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(workInProgress, instance);

     ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, instance);
   }

   if (warnAboutDeprecatedLifecycles) {
     ReactStrictModeWarnings.recordDeprecationWarnings(workInProgress, instance);
   }
 }

 var updateQueue = workInProgress.updateQueue;
 if (updateQueue !== null) {
   processUpdateQueue(workInProgress, updateQueue, props, instance, renderExpirationTime);
   instance.state = workInProgress.memoizedState;
 }

 var getDerivedStateFromProps = workInProgress.type.getDerivedStateFromProps;
 if (typeof getDerivedStateFromProps === 'function') {
   applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, props);
   instance.state = workInProgress.memoizedState;
 }

 // In order to support react-lifecycles-compat polyfilled components,
 // Unsafe lifecycles should not be invoked for components using the new APIs.
 if (typeof ctor.getDerivedStateFromProps !== 'function' && typeof instance.getSnapshotBeforeUpdate !== 'function' && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
   callComponentWillMount(workInProgress, instance);
   // If we had additional state updates during this life-cycle, let's
   // process them now.
   updateQueue = workInProgress.updateQueue;
   if (updateQueue !== null) {
     processUpdateQueue(workInProgress, updateQueue, props, instance, renderExpirationTime);
     instance.state = workInProgress.memoizedState;
   }
 }

 if (typeof instance.componentDidMount === 'function') {
   workInProgress.effectTag |= Update;
 }
}

function resumeMountClassInstance(workInProgress, renderExpirationTime) {
 var ctor = workInProgress.type;
 var instance = workInProgress.stateNode;

 var oldProps = workInProgress.memoizedProps;
 var newProps = workInProgress.pendingProps;
 instance.props = oldProps;

 var oldContext = instance.context;
 var newUnmaskedContext = getUnmaskedContext(workInProgress);
 var newContext = getMaskedContext(workInProgress, newUnmaskedContext);

 var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
 var hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function';

 // Note: During these life-cycles, instance.props/instance.state are what
 // ever the previously attempted to render - not the "current". However,
 // during componentDidUpdate we pass the "current" props.

 // In order to support react-lifecycles-compat polyfilled components,
 // Unsafe lifecycles should not be invoked for components using the new APIs.
 if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === 'function' || typeof instance.componentWillReceiveProps === 'function')) {
   if (oldProps !== newProps || oldContext !== newContext) {
     callComponentWillReceiveProps(workInProgress, instance, newProps, newContext);
   }
 }

 resetHasForceUpdateBeforeProcessing();

 var oldState = workInProgress.memoizedState;
 var newState = instance.state = oldState;
 var updateQueue = workInProgress.updateQueue;
 if (updateQueue !== null) {
   processUpdateQueue(workInProgress, updateQueue, newProps, instance, renderExpirationTime);
   newState = workInProgress.memoizedState;
 }
 if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
   // If an update was already in progress, we should schedule an Update
   // effect even though we're bailing out, so that cWU/cDU are called.
   if (typeof instance.componentDidMount === 'function') {
     workInProgress.effectTag |= Update;
   }
   return false;
 }

 if (typeof getDerivedStateFromProps === 'function') {
   applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, newProps);
   newState = workInProgress.memoizedState;
 }

 var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext);

 if (shouldUpdate) {
   // In order to support react-lifecycles-compat polyfilled components,
   // Unsafe lifecycles should not be invoked for components using the new APIs.
   if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
     startPhaseTimer(workInProgress, 'componentWillMount');
     if (typeof instance.componentWillMount === 'function') {
       instance.componentWillMount();
     }
     if (typeof instance.UNSAFE_componentWillMount === 'function') {
       instance.UNSAFE_componentWillMount();
     }
     stopPhaseTimer();
   }
   if (typeof instance.componentDidMount === 'function') {
     workInProgress.effectTag |= Update;
   }
 } else {
   // If an update was already in progress, we should schedule an Update
   // effect even though we're bailing out, so that cWU/cDU are called.
   if (typeof instance.componentDidMount === 'function') {
     workInProgress.effectTag |= Update;
   }

   // If shouldComponentUpdate returned false, we should still update the
   // memoized state to indicate that this work can be reused.
   workInProgress.memoizedProps = newProps;
   workInProgress.memoizedState = newState;
 }

 // Update the existing instance's state, props, and context pointers even
 // if shouldComponentUpdate returns false.
 instance.props = newProps;
 instance.state = newState;
 instance.context = newContext;

 return shouldUpdate;
}

// Invokes the update life-cycles and returns false if it shouldn't rerender.
function updateClassInstance(current, workInProgress, renderExpirationTime) {
 var ctor = workInProgress.type;
 var instance = workInProgress.stateNode;

 var oldProps = workInProgress.memoizedProps;
 var newProps = workInProgress.pendingProps;
 instance.props = oldProps;

 var oldContext = instance.context;
 var newUnmaskedContext = getUnmaskedContext(workInProgress);
 var newContext = getMaskedContext(workInProgress, newUnmaskedContext);

 var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
 var hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function';

 // Note: During these life-cycles, instance.props/instance.state are what
 // ever the previously attempted to render - not the "current". However,
 // during componentDidUpdate we pass the "current" props.

 // In order to support react-lifecycles-compat polyfilled components,
 // Unsafe lifecycles should not be invoked for components using the new APIs.
 if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === 'function' || typeof instance.componentWillReceiveProps === 'function')) {
   if (oldProps !== newProps || oldContext !== newContext) {
     callComponentWillReceiveProps(workInProgress, instance, newProps, newContext);
   }
 }

 resetHasForceUpdateBeforeProcessing();

 var oldState = workInProgress.memoizedState;
 var newState = instance.state = oldState;
 var updateQueue = workInProgress.updateQueue;
 if (updateQueue !== null) {
   processUpdateQueue(workInProgress, updateQueue, newProps, instance, renderExpirationTime);
   newState = workInProgress.memoizedState;
 }

 if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
   // If an update was already in progress, we should schedule an Update
   // effect even though we're bailing out, so that cWU/cDU are called.
   if (typeof instance.componentDidUpdate === 'function') {
     if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
       workInProgress.effectTag |= Update;
     }
   }
   if (typeof instance.getSnapshotBeforeUpdate === 'function') {
     if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
       workInProgress.effectTag |= Snapshot;
     }
   }
   return false;
 }

 if (typeof getDerivedStateFromProps === 'function') {
   applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, newProps);
   newState = workInProgress.memoizedState;
 }

 var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext);

 if (shouldUpdate) {
   // In order to support react-lifecycles-compat polyfilled components,
   // Unsafe lifecycles should not be invoked for components using the new APIs.
   if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillUpdate === 'function' || typeof instance.componentWillUpdate === 'function')) {
     startPhaseTimer(workInProgress, 'componentWillUpdate');
     if (typeof instance.componentWillUpdate === 'function') {
       instance.componentWillUpdate(newProps, newState, newContext);
     }
     if (typeof instance.UNSAFE_componentWillUpdate === 'function') {
       instance.UNSAFE_componentWillUpdate(newProps, newState, newContext);
     }
     stopPhaseTimer();
   }
   if (typeof instance.componentDidUpdate === 'function') {
     workInProgress.effectTag |= Update;
   }
   if (typeof instance.getSnapshotBeforeUpdate === 'function') {
     workInProgress.effectTag |= Snapshot;
   }
 } else {
   // If an update was already in progress, we should schedule an Update
   // effect even though we're bailing out, so that cWU/cDU are called.
   if (typeof instance.componentDidUpdate === 'function') {
     if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
       workInProgress.effectTag |= Update;
     }
   }
   if (typeof instance.getSnapshotBeforeUpdate === 'function') {
     if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
       workInProgress.effectTag |= Snapshot;
     }
   }

   // If shouldComponentUpdate returned false, we should still update the
   // memoized props/state to indicate that this work can be reused.
   workInProgress.memoizedProps = newProps;
   workInProgress.memoizedState = newState;
 }

 // Update the existing instance's state, props, and context pointers even
 // if shouldComponentUpdate returns false.
 instance.props = newProps;
 instance.state = newState;
 instance.context = newContext;

 return shouldUpdate;
}

var getCurrentFiberStackAddendum$7 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;


var didWarnAboutMaps = void 0;
var didWarnAboutStringRefInStrictMode = void 0;
var ownerHasKeyUseWarning = void 0;
var ownerHasFunctionTypeWarning = void 0;
var warnForMissingKey = function (child) {};

{
 didWarnAboutMaps = false;
 didWarnAboutStringRefInStrictMode = {};

 /**
  * Warn if there's no key explicitly set on dynamic arrays of children or
  * object keys are not valid. This allows us to keep track of children between
  * updates.
  */
 ownerHasKeyUseWarning = {};
 ownerHasFunctionTypeWarning = {};

 warnForMissingKey = function (child) {
   if (child === null || typeof child !== 'object') {
     return;
   }
   if (!child._store || child._store.validated || child.key != null) {
     return;
   }
   !(typeof child._store === 'object') ? invariant_1(false, 'React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.') : void 0;
   child._store.validated = true;

   var currentComponentErrorInfo = 'Each child in an array or iterator should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.' + (getCurrentFiberStackAddendum$7() || '');
   if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
     return;
   }
   ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

   warning_1(false, 'Each child in an array or iterator should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.%s', getCurrentFiberStackAddendum$7());
 };
}

var isArray$1 = Array.isArray;

function coerceRef(returnFiber, current, element) {
 var mixedRef = element.ref;
 if (mixedRef !== null && typeof mixedRef !== 'function' && typeof mixedRef !== 'object') {
   {
     if (returnFiber.mode & StrictMode) {
       var componentName = getComponentName(returnFiber) || 'Component';
       if (!didWarnAboutStringRefInStrictMode[componentName]) {
         warning_1(false, 'A string ref, "%s", has been found within a strict mode tree. ' + 'String refs are a source of potential bugs and should be avoided. ' + 'We recommend using createRef() instead.' + '\n%s' + '\n\nLearn more about using refs safely here:' + '\nhttps://fb.me/react-strict-mode-string-ref', mixedRef, getStackAddendumByWorkInProgressFiber(returnFiber));
         didWarnAboutStringRefInStrictMode[componentName] = true;
       }
     }
   }

   if (element._owner) {
     var owner = element._owner;
     var inst = void 0;
     if (owner) {
       var ownerFiber = owner;
       !(ownerFiber.tag === ClassComponent) ? invariant_1(false, 'Stateless function components cannot have refs.') : void 0;
       inst = ownerFiber.stateNode;
     }
     !inst ? invariant_1(false, 'Missing owner for string ref %s. This error is likely caused by a bug in React. Please file an issue.', mixedRef) : void 0;
     var stringRef = '' + mixedRef;
     // Check if previous string ref matches new string ref
     if (current !== null && current.ref !== null && typeof current.ref === 'function' && current.ref._stringRef === stringRef) {
       return current.ref;
     }
     var ref = function (value) {
       var refs = inst.refs === emptyObject_1 ? inst.refs = {} : inst.refs;
       if (value === null) {
         delete refs[stringRef];
       } else {
         refs[stringRef] = value;
       }
     };
     ref._stringRef = stringRef;
     return ref;
   } else {
     !(typeof mixedRef === 'string') ? invariant_1(false, 'Expected ref to be a function or a string.') : void 0;
     !element._owner ? invariant_1(false, 'Element ref was specified as a string (%s) but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a functional component\n2. You may be adding a ref to a component that was not created inside a component\'s render method\n3. You have multiple copies of React loaded\nSee https://fb.me/react-refs-must-have-owner for more information.', mixedRef) : void 0;
   }
 }
 return mixedRef;
}

function throwOnInvalidObjectType(returnFiber, newChild) {
 if (returnFiber.type !== 'textarea') {
   var addendum = '';
   {
     addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + (getCurrentFiberStackAddendum$7() || '');
   }
   invariant_1(false, 'Objects are not valid as a React child (found: %s).%s', Object.prototype.toString.call(newChild) === '[object Object]' ? 'object with keys {' + Object.keys(newChild).join(', ') + '}' : newChild, addendum);
 }
}

function warnOnFunctionType() {
 var currentComponentErrorInfo = 'Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.' + (getCurrentFiberStackAddendum$7() || '');

 if (ownerHasFunctionTypeWarning[currentComponentErrorInfo]) {
   return;
 }
 ownerHasFunctionTypeWarning[currentComponentErrorInfo] = true;

 warning_1(false, 'Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.%s', getCurrentFiberStackAddendum$7() || '');
}

// This wrapper function exists because I expect to clone the code in each path
// to be able to optimize each path individually by branching early. This needs
// a compiler or we can do it manually. Helpers that don't need this branching
// live outside of this function.
function ChildReconciler(shouldTrackSideEffects) {
 function deleteChild(returnFiber, childToDelete) {
   if (!shouldTrackSideEffects) {
     // Noop.
     return;
   }
   // Deletions are added in reversed order so we add it to the front.
   // At this point, the return fiber's effect list is empty except for
   // deletions, so we can just append the deletion to the list. The remaining
   // effects aren't added until the complete phase. Once we implement
   // resuming, this may not be true.
   var last = returnFiber.lastEffect;
   if (last !== null) {
     last.nextEffect = childToDelete;
     returnFiber.lastEffect = childToDelete;
   } else {
     returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
   }
   childToDelete.nextEffect = null;
   childToDelete.effectTag = Deletion;
 }

 function deleteRemainingChildren(returnFiber, currentFirstChild) {
   if (!shouldTrackSideEffects) {
     // Noop.
     return null;
   }

   // TODO: For the shouldClone case, this could be micro-optimized a bit by
   // assuming that after the first child we've already added everything.
   var childToDelete = currentFirstChild;
   while (childToDelete !== null) {
     deleteChild(returnFiber, childToDelete);
     childToDelete = childToDelete.sibling;
   }
   return null;
 }

 function mapRemainingChildren(returnFiber, currentFirstChild) {
   // Add the remaining children to a temporary map so that we can find them by
   // keys quickly. Implicit (null) keys get added to this set with their index
   var existingChildren = new Map();

   var existingChild = currentFirstChild;
   while (existingChild !== null) {
     if (existingChild.key !== null) {
       existingChildren.set(existingChild.key, existingChild);
     } else {
       existingChildren.set(existingChild.index, existingChild);
     }
     existingChild = existingChild.sibling;
   }
   return existingChildren;
 }

 function useFiber(fiber, pendingProps, expirationTime) {
   // We currently set sibling to null and index to 0 here because it is easy
   // to forget to do before returning it. E.g. for the single child case.
   var clone = createWorkInProgress(fiber, pendingProps, expirationTime);
   clone.index = 0;
   clone.sibling = null;
   return clone;
 }

 function placeChild(newFiber, lastPlacedIndex, newIndex) {
   newFiber.index = newIndex;
   if (!shouldTrackSideEffects) {
     // Noop.
     return lastPlacedIndex;
   }
   var current = newFiber.alternate;
   if (current !== null) {
     var oldIndex = current.index;
     if (oldIndex < lastPlacedIndex) {
       // This is a move.
       newFiber.effectTag = Placement;
       return lastPlacedIndex;
     } else {
       // This item can stay in place.
       return oldIndex;
     }
   } else {
     // This is an insertion.
     newFiber.effectTag = Placement;
     return lastPlacedIndex;
   }
 }

 function placeSingleChild(newFiber) {
   // This is simpler for the single child case. We only need to do a
   // placement for inserting new children.
   if (shouldTrackSideEffects && newFiber.alternate === null) {
     newFiber.effectTag = Placement;
   }
   return newFiber;
 }

 function updateTextNode(returnFiber, current, textContent, expirationTime) {
   if (current === null || current.tag !== HostText) {
     // Insert
     var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
     created.return = returnFiber;
     return created;
   } else {
     // Update
     var existing = useFiber(current, textContent, expirationTime);
     existing.return = returnFiber;
     return existing;
   }
 }

 function updateElement(returnFiber, current, element, expirationTime) {
   if (current !== null && current.type === element.type) {
     // Move based on index
     var existing = useFiber(current, element.props, expirationTime);
     existing.ref = coerceRef(returnFiber, current, element);
     existing.return = returnFiber;
     {
       existing._debugSource = element._source;
       existing._debugOwner = element._owner;
     }
     return existing;
   } else {
     // Insert
     var created = createFiberFromElement(element, returnFiber.mode, expirationTime);
     created.ref = coerceRef(returnFiber, current, element);
     created.return = returnFiber;
     return created;
   }
 }

 function updatePortal(returnFiber, current, portal, expirationTime) {
   if (current === null || current.tag !== HostPortal || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) {
     // Insert
     var created = createFiberFromPortal(portal, returnFiber.mode, expirationTime);
     created.return = returnFiber;
     return created;
   } else {
     // Update
     var existing = useFiber(current, portal.children || [], expirationTime);
     existing.return = returnFiber;
     return existing;
   }
 }

 function updateFragment(returnFiber, current, fragment, expirationTime, key) {
   if (current === null || current.tag !== Fragment) {
     // Insert
     var created = createFiberFromFragment(fragment, returnFiber.mode, expirationTime, key);
     created.return = returnFiber;
     return created;
   } else {
     // Update
     var existing = useFiber(current, fragment, expirationTime);
     existing.return = returnFiber;
     return existing;
   }
 }

 function createChild(returnFiber, newChild, expirationTime) {
   if (typeof newChild === 'string' || typeof newChild === 'number') {
     // Text nodes don't have keys. If the previous node is implicitly keyed
     // we can continue to replace it without aborting even if it is not a text
     // node.
     var created = createFiberFromText('' + newChild, returnFiber.mode, expirationTime);
     created.return = returnFiber;
     return created;
   }

   if (typeof newChild === 'object' && newChild !== null) {
     switch (newChild.$$typeof) {
       case REACT_ELEMENT_TYPE:
         {
           var _created = createFiberFromElement(newChild, returnFiber.mode, expirationTime);
           _created.ref = coerceRef(returnFiber, null, newChild);
           _created.return = returnFiber;
           return _created;
         }
       case REACT_PORTAL_TYPE:
         {
           var _created2 = createFiberFromPortal(newChild, returnFiber.mode, expirationTime);
           _created2.return = returnFiber;
           return _created2;
         }
     }

     if (isArray$1(newChild) || getIteratorFn(newChild)) {
       var _created3 = createFiberFromFragment(newChild, returnFiber.mode, expirationTime, null);
       _created3.return = returnFiber;
       return _created3;
     }

     throwOnInvalidObjectType(returnFiber, newChild);
   }

   {
     if (typeof newChild === 'function') {
       warnOnFunctionType();
     }
   }

   return null;
 }

 function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
   // Update the fiber if the keys match, otherwise return null.

   var key = oldFiber !== null ? oldFiber.key : null;

   if (typeof newChild === 'string' || typeof newChild === 'number') {
     // Text nodes don't have keys. If the previous node is implicitly keyed
     // we can continue to replace it without aborting even if it is not a text
     // node.
     if (key !== null) {
       return null;
     }
     return updateTextNode(returnFiber, oldFiber, '' + newChild, expirationTime);
   }

   if (typeof newChild === 'object' && newChild !== null) {
     switch (newChild.$$typeof) {
       case REACT_ELEMENT_TYPE:
         {
           if (newChild.key === key) {
             if (newChild.type === REACT_FRAGMENT_TYPE) {
               return updateFragment(returnFiber, oldFiber, newChild.props.children, expirationTime, key);
             }
             return updateElement(returnFiber, oldFiber, newChild, expirationTime);
           } else {
             return null;
           }
         }
       case REACT_PORTAL_TYPE:
         {
           if (newChild.key === key) {
             return updatePortal(returnFiber, oldFiber, newChild, expirationTime);
           } else {
             return null;
           }
         }
     }

     if (isArray$1(newChild) || getIteratorFn(newChild)) {
       if (key !== null) {
         return null;
       }

       return updateFragment(returnFiber, oldFiber, newChild, expirationTime, null);
     }

     throwOnInvalidObjectType(returnFiber, newChild);
   }

   {
     if (typeof newChild === 'function') {
       warnOnFunctionType();
     }
   }

   return null;
 }

 function updateFromMap(existingChildren, returnFiber, newIdx, newChild, expirationTime) {
   if (typeof newChild === 'string' || typeof newChild === 'number') {
     // Text nodes don't have keys, so we neither have to check the old nor
     // new node for the key. If both are text nodes, they match.
     var matchedFiber = existingChildren.get(newIdx) || null;
     return updateTextNode(returnFiber, matchedFiber, '' + newChild, expirationTime);
   }

   if (typeof newChild === 'object' && newChild !== null) {
     switch (newChild.$$typeof) {
       case REACT_ELEMENT_TYPE:
         {
           var _matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
           if (newChild.type === REACT_FRAGMENT_TYPE) {
             return updateFragment(returnFiber, _matchedFiber, newChild.props.children, expirationTime, newChild.key);
           }
           return updateElement(returnFiber, _matchedFiber, newChild, expirationTime);
         }
       case REACT_PORTAL_TYPE:
         {
           var _matchedFiber2 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
           return updatePortal(returnFiber, _matchedFiber2, newChild, expirationTime);
         }
     }

     if (isArray$1(newChild) || getIteratorFn(newChild)) {
       var _matchedFiber3 = existingChildren.get(newIdx) || null;
       return updateFragment(returnFiber, _matchedFiber3, newChild, expirationTime, null);
     }

     throwOnInvalidObjectType(returnFiber, newChild);
   }

   {
     if (typeof newChild === 'function') {
       warnOnFunctionType();
     }
   }

   return null;
 }

 /**
  * Warns if there is a duplicate or missing key
  */
 function warnOnInvalidKey(child, knownKeys) {
   {
     if (typeof child !== 'object' || child === null) {
       return knownKeys;
     }
     switch (child.$$typeof) {
       case REACT_ELEMENT_TYPE:
       case REACT_PORTAL_TYPE:
         warnForMissingKey(child);
         var key = child.key;
         if (typeof key !== 'string') {
           break;
         }
         if (knownKeys === null) {
           knownKeys = new Set();
           knownKeys.add(key);
           break;
         }
         if (!knownKeys.has(key)) {
           knownKeys.add(key);
           break;
         }
         warning_1(false, 'Encountered two children with the same key, `%s`. ' + 'Keys should be unique so that components maintain their identity ' + 'across updates. Non-unique keys may cause children to be ' + 'duplicated and/or omitted — the behavior is unsupported and ' + 'could change in a future version.%s', key, getCurrentFiberStackAddendum$7());
         break;
       default:
         break;
     }
   }
   return knownKeys;
 }

 function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, expirationTime) {
   // This algorithm can't optimize by searching from boths ends since we
   // don't have backpointers on fibers. I'm trying to see how far we can get
   // with that model. If it ends up not being worth the tradeoffs, we can
   // add it later.

   // Even with a two ended optimization, we'd want to optimize for the case
   // where there are few changes and brute force the comparison instead of
   // going for the Map. It'd like to explore hitting that path first in
   // forward-only mode and only go for the Map once we notice that we need
   // lots of look ahead. This doesn't handle reversal as well as two ended
   // search but that's unusual. Besides, for the two ended optimization to
   // work on Iterables, we'd need to copy the whole set.

   // In this first iteration, we'll just live with hitting the bad case
   // (adding everything to a Map) in for every insert/move.

   // If you change this code, also update reconcileChildrenIterator() which
   // uses the same algorithm.

   {
     // First, validate keys.
     var knownKeys = null;
     for (var i = 0; i < newChildren.length; i++) {
       var child = newChildren[i];
       knownKeys = warnOnInvalidKey(child, knownKeys);
     }
   }

   var resultingFirstChild = null;
   var previousNewFiber = null;

   var oldFiber = currentFirstChild;
   var lastPlacedIndex = 0;
   var newIdx = 0;
   var nextOldFiber = null;
   for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
     if (oldFiber.index > newIdx) {
       nextOldFiber = oldFiber;
       oldFiber = null;
     } else {
       nextOldFiber = oldFiber.sibling;
     }
     var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);
     if (newFiber === null) {
       // TODO: This breaks on empty slots like null children. That's
       // unfortunate because it triggers the slow path all the time. We need
       // a better way to communicate whether this was a miss or null,
       // boolean, undefined, etc.
       if (oldFiber === null) {
         oldFiber = nextOldFiber;
       }
       break;
     }
     if (shouldTrackSideEffects) {
       if (oldFiber && newFiber.alternate === null) {
         // We matched the slot, but we didn't reuse the existing fiber, so we
         // need to delete the existing child.
         deleteChild(returnFiber, oldFiber);
       }
     }
     lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
     if (previousNewFiber === null) {
       // TODO: Move out of the loop. This only happens for the first run.
       resultingFirstChild = newFiber;
     } else {
       // TODO: Defer siblings if we're not at the right index for this slot.
       // I.e. if we had null values before, then we want to defer this
       // for each null value. However, we also don't want to call updateSlot
       // with the previous one.
       previousNewFiber.sibling = newFiber;
     }
     previousNewFiber = newFiber;
     oldFiber = nextOldFiber;
   }

   if (newIdx === newChildren.length) {
     // We've reached the end of the new children. We can delete the rest.
     deleteRemainingChildren(returnFiber, oldFiber);
     return resultingFirstChild;
   }

   if (oldFiber === null) {
     // If we don't have any more existing children we can choose a fast path
     // since the rest will all be insertions.
     for (; newIdx < newChildren.length; newIdx++) {
       var _newFiber = createChild(returnFiber, newChildren[newIdx], expirationTime);
       if (!_newFiber) {
         continue;
       }
       lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);
       if (previousNewFiber === null) {
         // TODO: Move out of the loop. This only happens for the first run.
         resultingFirstChild = _newFiber;
       } else {
         previousNewFiber.sibling = _newFiber;
       }
       previousNewFiber = _newFiber;
     }
     return resultingFirstChild;
   }

   // Add all children to a key map for quick lookups.
   var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

   // Keep scanning and use the map to restore deleted items as moves.
   for (; newIdx < newChildren.length; newIdx++) {
     var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], expirationTime);
     if (_newFiber2) {
       if (shouldTrackSideEffects) {
         if (_newFiber2.alternate !== null) {
           // The new fiber is a work in progress, but if there exists a
           // current, that means that we reused the fiber. We need to delete
           // it from the child list so that we don't add it to the deletion
           // list.
           existingChildren.delete(_newFiber2.key === null ? newIdx : _newFiber2.key);
         }
       }
       lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);
       if (previousNewFiber === null) {
         resultingFirstChild = _newFiber2;
       } else {
         previousNewFiber.sibling = _newFiber2;
       }
       previousNewFiber = _newFiber2;
     }
   }

   if (shouldTrackSideEffects) {
     // Any existing children that weren't consumed above were deleted. We need
     // to add them to the deletion list.
     existingChildren.forEach(function (child) {
       return deleteChild(returnFiber, child);
     });
   }

   return resultingFirstChild;
 }

 function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, expirationTime) {
   // This is the same implementation as reconcileChildrenArray(),
   // but using the iterator instead.

   var iteratorFn = getIteratorFn(newChildrenIterable);
   !(typeof iteratorFn === 'function') ? invariant_1(false, 'An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.') : void 0;

   {
     // Warn about using Maps as children
     if (newChildrenIterable.entries === iteratorFn) {
       !didWarnAboutMaps ? warning_1(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', getCurrentFiberStackAddendum$7()) : void 0;
       didWarnAboutMaps = true;
     }

     // First, validate keys.
     // We'll get a different iterator later for the main pass.
     var _newChildren = iteratorFn.call(newChildrenIterable);
     if (_newChildren) {
       var knownKeys = null;
       var _step = _newChildren.next();
       for (; !_step.done; _step = _newChildren.next()) {
         var child = _step.value;
         knownKeys = warnOnInvalidKey(child, knownKeys);
       }
     }
   }

   var newChildren = iteratorFn.call(newChildrenIterable);
   !(newChildren != null) ? invariant_1(false, 'An iterable object provided no iterator.') : void 0;

   var resultingFirstChild = null;
   var previousNewFiber = null;

   var oldFiber = currentFirstChild;
   var lastPlacedIndex = 0;
   var newIdx = 0;
   var nextOldFiber = null;

   var step = newChildren.next();
   for (; oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
     if (oldFiber.index > newIdx) {
       nextOldFiber = oldFiber;
       oldFiber = null;
     } else {
       nextOldFiber = oldFiber.sibling;
     }
     var newFiber = updateSlot(returnFiber, oldFiber, step.value, expirationTime);
     if (newFiber === null) {
       // TODO: This breaks on empty slots like null children. That's
       // unfortunate because it triggers the slow path all the time. We need
       // a better way to communicate whether this was a miss or null,
       // boolean, undefined, etc.
       if (!oldFiber) {
         oldFiber = nextOldFiber;
       }
       break;
     }
     if (shouldTrackSideEffects) {
       if (oldFiber && newFiber.alternate === null) {
         // We matched the slot, but we didn't reuse the existing fiber, so we
         // need to delete the existing child.
         deleteChild(returnFiber, oldFiber);
       }
     }
     lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
     if (previousNewFiber === null) {
       // TODO: Move out of the loop. This only happens for the first run.
       resultingFirstChild = newFiber;
     } else {
       // TODO: Defer siblings if we're not at the right index for this slot.
       // I.e. if we had null values before, then we want to defer this
       // for each null value. However, we also don't want to call updateSlot
       // with the previous one.
       previousNewFiber.sibling = newFiber;
     }
     previousNewFiber = newFiber;
     oldFiber = nextOldFiber;
   }

   if (step.done) {
     // We've reached the end of the new children. We can delete the rest.
     deleteRemainingChildren(returnFiber, oldFiber);
     return resultingFirstChild;
   }

   if (oldFiber === null) {
     // If we don't have any more existing children we can choose a fast path
     // since the rest will all be insertions.
     for (; !step.done; newIdx++, step = newChildren.next()) {
       var _newFiber3 = createChild(returnFiber, step.value, expirationTime);
       if (_newFiber3 === null) {
         continue;
       }
       lastPlacedIndex = placeChild(_newFiber3, lastPlacedIndex, newIdx);
       if (previousNewFiber === null) {
         // TODO: Move out of the loop. This only happens for the first run.
         resultingFirstChild = _newFiber3;
       } else {
         previousNewFiber.sibling = _newFiber3;
       }
       previousNewFiber = _newFiber3;
     }
     return resultingFirstChild;
   }

   // Add all children to a key map for quick lookups.
   var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

   // Keep scanning and use the map to restore deleted items as moves.
   for (; !step.done; newIdx++, step = newChildren.next()) {
     var _newFiber4 = updateFromMap(existingChildren, returnFiber, newIdx, step.value, expirationTime);
     if (_newFiber4 !== null) {
       if (shouldTrackSideEffects) {
         if (_newFiber4.alternate !== null) {
           // The new fiber is a work in progress, but if there exists a
           // current, that means that we reused the fiber. We need to delete
           // it from the child list so that we don't add it to the deletion
           // list.
           existingChildren.delete(_newFiber4.key === null ? newIdx : _newFiber4.key);
         }
       }
       lastPlacedIndex = placeChild(_newFiber4, lastPlacedIndex, newIdx);
       if (previousNewFiber === null) {
         resultingFirstChild = _newFiber4;
       } else {
         previousNewFiber.sibling = _newFiber4;
       }
       previousNewFiber = _newFiber4;
     }
   }

   if (shouldTrackSideEffects) {
     // Any existing children that weren't consumed above were deleted. We need
     // to add them to the deletion list.
     existingChildren.forEach(function (child) {
       return deleteChild(returnFiber, child);
     });
   }

   return resultingFirstChild;
 }

 function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, expirationTime) {
   // There's no need to check for keys on text nodes since we don't have a
   // way to define them.
   if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
     // We already have an existing node so let's just update it and delete
     // the rest.
     deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
     var existing = useFiber(currentFirstChild, textContent, expirationTime);
     existing.return = returnFiber;
     return existing;
   }
   // The existing first child is not a text node so we need to create one
   // and delete the existing ones.
   deleteRemainingChildren(returnFiber, currentFirstChild);
   var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
   created.return = returnFiber;
   return created;
 }

 function reconcileSingleElement(returnFiber, currentFirstChild, element, expirationTime) {
   var key = element.key;
   var child = currentFirstChild;
   while (child !== null) {
     // TODO: If key === null and child.key === null, then this only applies to
     // the first item in the list.
     if (child.key === key) {
       if (child.tag === Fragment ? element.type === REACT_FRAGMENT_TYPE : child.type === element.type) {
         deleteRemainingChildren(returnFiber, child.sibling);
         var existing = useFiber(child, element.type === REACT_FRAGMENT_TYPE ? element.props.children : element.props, expirationTime);
         existing.ref = coerceRef(returnFiber, child, element);
         existing.return = returnFiber;
         {
           existing._debugSource = element._source;
           existing._debugOwner = element._owner;
         }
         return existing;
       } else {
         deleteRemainingChildren(returnFiber, child);
         break;
       }
     } else {
       deleteChild(returnFiber, child);
     }
     child = child.sibling;
   }

   if (element.type === REACT_FRAGMENT_TYPE) {
     var created = createFiberFromFragment(element.props.children, returnFiber.mode, expirationTime, element.key);
     created.return = returnFiber;
     return created;
   } else {
     var _created4 = createFiberFromElement(element, returnFiber.mode, expirationTime);
     _created4.ref = coerceRef(returnFiber, currentFirstChild, element);
     _created4.return = returnFiber;
     return _created4;
   }
 }

 function reconcileSinglePortal(returnFiber, currentFirstChild, portal, expirationTime) {
   var key = portal.key;
   var child = currentFirstChild;
   while (child !== null) {
     // TODO: If key === null and child.key === null, then this only applies to
     // the first item in the list.
     if (child.key === key) {
       if (child.tag === HostPortal && child.stateNode.containerInfo === portal.containerInfo && child.stateNode.implementation === portal.implementation) {
         deleteRemainingChildren(returnFiber, child.sibling);
         var existing = useFiber(child, portal.children || [], expirationTime);
         existing.return = returnFiber;
         return existing;
       } else {
         deleteRemainingChildren(returnFiber, child);
         break;
       }
     } else {
       deleteChild(returnFiber, child);
     }
     child = child.sibling;
   }

   var created = createFiberFromPortal(portal, returnFiber.mode, expirationTime);
   created.return = returnFiber;
   return created;
 }

 // This API will tag the children with the side-effect of the reconciliation
 // itself. They will be added to the side-effect list as we pass through the
 // children and the parent.
 function reconcileChildFibers(returnFiber, currentFirstChild, newChild, expirationTime) {
   // This function is not recursive.
   // If the top level item is an array, we treat it as a set of children,
   // not as a fragment. Nested arrays on the other hand will be treated as
   // fragment nodes. Recursion happens at the normal flow.

   // Handle top level unkeyed fragments as if they were arrays.
   // This leads to an ambiguity between <>{[...]}</> and <>...</>.
   // We treat the ambiguous cases above the same.
   var isUnkeyedTopLevelFragment = typeof newChild === 'object' && newChild !== null && newChild.type === REACT_FRAGMENT_TYPE && newChild.key === null;
   if (isUnkeyedTopLevelFragment) {
     newChild = newChild.props.children;
   }

   // Handle object types
   var isObject = typeof newChild === 'object' && newChild !== null;

   if (isObject) {
     switch (newChild.$$typeof) {
       case REACT_ELEMENT_TYPE:
         return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, expirationTime));
       case REACT_PORTAL_TYPE:
         return placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, expirationTime));
     }
   }

   if (typeof newChild === 'string' || typeof newChild === 'number') {
     return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild, expirationTime));
   }

   if (isArray$1(newChild)) {
     return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, expirationTime);
   }

   if (getIteratorFn(newChild)) {
     return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, expirationTime);
   }

   if (isObject) {
     throwOnInvalidObjectType(returnFiber, newChild);
   }

   {
     if (typeof newChild === 'function') {
       warnOnFunctionType();
     }
   }
   if (typeof newChild === 'undefined' && !isUnkeyedTopLevelFragment) {
     // If the new child is undefined, and the return fiber is a composite
     // component, throw an error. If Fiber return types are disabled,
     // we already threw above.
     switch (returnFiber.tag) {
       case ClassComponent:
         {
           {
             var instance = returnFiber.stateNode;
             if (instance.render._isMockFunction) {
               // We allow auto-mocks to proceed as if they're returning null.
               break;
             }
           }
         }
       // Intentionally fall through to the next case, which handles both
       // functions and classes
       // eslint-disable-next-lined no-fallthrough
       case FunctionalComponent:
         {
           var Component = returnFiber.type;
           invariant_1(false, '%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.', Component.displayName || Component.name || 'Component');
         }
     }
   }

   // Remaining cases are all treated as empty.
   return deleteRemainingChildren(returnFiber, currentFirstChild);
 }

 return reconcileChildFibers;
}

var reconcileChildFibers = ChildReconciler(true);
var mountChildFibers = ChildReconciler(false);

function cloneChildFibers(current, workInProgress) {
 !(current === null || workInProgress.child === current.child) ? invariant_1(false, 'Resuming work not yet implemented.') : void 0;

 if (workInProgress.child === null) {
   return;
 }

 var currentChild = workInProgress.child;
 var newChild = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
 workInProgress.child = newChild;

 newChild.return = workInProgress;
 while (currentChild.sibling !== null) {
   currentChild = currentChild.sibling;
   newChild = newChild.sibling = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
   newChild.return = workInProgress;
 }
 newChild.sibling = null;
}

// The deepest Fiber on the stack involved in a hydration context.
// This may have been an insertion or a hydration.
var hydrationParentFiber = null;
var nextHydratableInstance = null;
var isHydrating = false;

function enterHydrationState(fiber) {
 if (!supportsHydration) {
   return false;
 }

 var parentInstance = fiber.stateNode.containerInfo;
 nextHydratableInstance = getFirstHydratableChild(parentInstance);
 hydrationParentFiber = fiber;
 isHydrating = true;
 return true;
}

function deleteHydratableInstance(returnFiber, instance) {
 {
   switch (returnFiber.tag) {
     case HostRoot:
       didNotHydrateContainerInstance(returnFiber.stateNode.containerInfo, instance);
       break;
     case HostComponent:
       didNotHydrateInstance(returnFiber.type, returnFiber.memoizedProps, returnFiber.stateNode, instance);
       break;
   }
 }

 var childToDelete = createFiberFromHostInstanceForDeletion();
 childToDelete.stateNode = instance;
 childToDelete.return = returnFiber;
 childToDelete.effectTag = Deletion;

 // This might seem like it belongs on progressedFirstDeletion. However,
 // these children are not part of the reconciliation list of children.
 // Even if we abort and rereconcile the children, that will try to hydrate
 // again and the nodes are still in the host tree so these will be
 // recreated.
 if (returnFiber.lastEffect !== null) {
   returnFiber.lastEffect.nextEffect = childToDelete;
   returnFiber.lastEffect = childToDelete;
 } else {
   returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
 }
}

function insertNonHydratedInstance(returnFiber, fiber) {
 fiber.effectTag |= Placement;
 {
   switch (returnFiber.tag) {
     case HostRoot:
       {
         var parentContainer = returnFiber.stateNode.containerInfo;
         switch (fiber.tag) {
           case HostComponent:
             var type = fiber.type;
             var props = fiber.pendingProps;
             didNotFindHydratableContainerInstance(parentContainer, type, props);
             break;
           case HostText:
             var text = fiber.pendingProps;
             didNotFindHydratableContainerTextInstance(parentContainer, text);
             break;
         }
         break;
       }
     case HostComponent:
       {
         var parentType = returnFiber.type;
         var parentProps = returnFiber.memoizedProps;
         var parentInstance = returnFiber.stateNode;
         switch (fiber.tag) {
           case HostComponent:
             var _type = fiber.type;
             var _props = fiber.pendingProps;
             didNotFindHydratableInstance(parentType, parentProps, parentInstance, _type, _props);
             break;
           case HostText:
             var _text = fiber.pendingProps;
             didNotFindHydratableTextInstance(parentType, parentProps, parentInstance, _text);
             break;
         }
         break;
       }
     default:
       return;
   }
 }
}

function tryHydrate(fiber, nextInstance) {
 switch (fiber.tag) {
   case HostComponent:
     {
       var type = fiber.type;
       var props = fiber.pendingProps;
       var instance = canHydrateInstance(nextInstance, type, props);
       if (instance !== null) {
         fiber.stateNode = instance;
         return true;
       }
       return false;
     }
   case HostText:
     {
       var text = fiber.pendingProps;
       var textInstance = canHydrateTextInstance(nextInstance, text);
       if (textInstance !== null) {
         fiber.stateNode = textInstance;
         return true;
       }
       return false;
     }
   default:
     return false;
 }
}

function tryToClaimNextHydratableInstance(fiber) {
 if (!isHydrating) {
   return;
 }
 var nextInstance = nextHydratableInstance;
 if (!nextInstance) {
   // Nothing to hydrate. Make it an insertion.
   insertNonHydratedInstance(hydrationParentFiber, fiber);
   isHydrating = false;
   hydrationParentFiber = fiber;
   return;
 }
 var firstAttemptedInstance = nextInstance;
 if (!tryHydrate(fiber, nextInstance)) {
   // If we can't hydrate this instance let's try the next one.
   // We use this as a heuristic. It's based on intuition and not data so it
   // might be flawed or unnecessary.
   nextInstance = getNextHydratableSibling(firstAttemptedInstance);
   if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
     // Nothing to hydrate. Make it an insertion.
     insertNonHydratedInstance(hydrationParentFiber, fiber);
     isHydrating = false;
     hydrationParentFiber = fiber;
     return;
   }
   // We matched the next one, we'll now assume that the first one was
   // superfluous and we'll delete it. Since we can't eagerly delete it
   // we'll have to schedule a deletion. To do that, this node needs a dummy
   // fiber associated with it.
   deleteHydratableInstance(hydrationParentFiber, firstAttemptedInstance);
 }
 hydrationParentFiber = fiber;
 nextHydratableInstance = getFirstHydratableChild(nextInstance);
}

function prepareToHydrateHostInstance(fiber, rootContainerInstance, hostContext) {
 if (!supportsHydration) {
   invariant_1(false, 'Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
 }

 var instance = fiber.stateNode;
 var updatePayload = hydrateInstance(instance, fiber.type, fiber.memoizedProps, rootContainerInstance, hostContext, fiber);
 // TODO: Type this specific to this type of component.
 fiber.updateQueue = updatePayload;
 // If the update payload indicates that there is a change or if there
 // is a new ref we mark this as an update.
 if (updatePayload !== null) {
   return true;
 }
 return false;
}

function prepareToHydrateHostTextInstance(fiber) {
 if (!supportsHydration) {
   invariant_1(false, 'Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
 }

 var textInstance = fiber.stateNode;
 var textContent = fiber.memoizedProps;
 var shouldUpdate = hydrateTextInstance(textInstance, textContent, fiber);
 {
   if (shouldUpdate) {
     // We assume that prepareToHydrateHostTextInstance is called in a context where the
     // hydration parent is the parent host component of this host text.
     var returnFiber = hydrationParentFiber;
     if (returnFiber !== null) {
       switch (returnFiber.tag) {
         case HostRoot:
           {
             var parentContainer = returnFiber.stateNode.containerInfo;
             didNotMatchHydratedContainerTextInstance(parentContainer, textInstance, textContent);
             break;
           }
         case HostComponent:
           {
             var parentType = returnFiber.type;
             var parentProps = returnFiber.memoizedProps;
             var parentInstance = returnFiber.stateNode;
             didNotMatchHydratedTextInstance(parentType, parentProps, parentInstance, textInstance, textContent);
             break;
           }
       }
     }
   }
 }
 return shouldUpdate;
}

function popToNextHostParent(fiber) {
 var parent = fiber.return;
 while (parent !== null && parent.tag !== HostComponent && parent.tag !== HostRoot) {
   parent = parent.return;
 }
 hydrationParentFiber = parent;
}

function popHydrationState(fiber) {
 if (!supportsHydration) {
   return false;
 }
 if (fiber !== hydrationParentFiber) {
   // We're deeper than the current hydration context, inside an inserted
   // tree.
   return false;
 }
 if (!isHydrating) {
   // If we're not currently hydrating but we're in a hydration context, then
   // we were an insertion and now need to pop up reenter hydration of our
   // siblings.
   popToNextHostParent(fiber);
   isHydrating = true;
   return false;
 }

 var type = fiber.type;

 // If we have any remaining hydratable nodes, we need to delete them now.
 // We only do this deeper than head and body since they tend to have random
 // other nodes in them. We also ignore components with pure text content in
 // side of them.
 // TODO: Better heuristic.
 if (fiber.tag !== HostComponent || type !== 'head' && type !== 'body' && !shouldSetTextContent(type, fiber.memoizedProps)) {
   var nextInstance = nextHydratableInstance;
   while (nextInstance) {
     deleteHydratableInstance(fiber, nextInstance);
     nextInstance = getNextHydratableSibling(nextInstance);
   }
 }

 popToNextHostParent(fiber);
 nextHydratableInstance = hydrationParentFiber ? getNextHydratableSibling(fiber.stateNode) : null;
 return true;
}

function resetHydrationState() {
 if (!supportsHydration) {
   return;
 }

 hydrationParentFiber = null;
 nextHydratableInstance = null;
 isHydrating = false;
}

var getCurrentFiberStackAddendum$6 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;


var didWarnAboutBadClass = void 0;
var didWarnAboutGetDerivedStateOnFunctionalComponent = void 0;
var didWarnAboutStatelessRefs = void 0;

{
 didWarnAboutBadClass = {};
 didWarnAboutGetDerivedStateOnFunctionalComponent = {};
 didWarnAboutStatelessRefs = {};
}

// TODO: Remove this and use reconcileChildrenAtExpirationTime directly.
function reconcileChildren(current, workInProgress, nextChildren) {
 reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, workInProgress.expirationTime);
}

function reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, renderExpirationTime) {
 if (current === null) {
   // If this is a fresh new component that hasn't been rendered yet, we
   // won't update its child set by applying minimal side-effects. Instead,
   // we will add them all to the child before it gets rendered. That means
   // we can optimize this reconciliation pass by not tracking side-effects.
   workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
 } else {
   // If the current child is the same as the work in progress, it means that
   // we haven't yet started any work on these children. Therefore, we use
   // the clone algorithm to create a copy of all the current children.

   // If we had any progressed work already, that is invalid at this point so
   // let's throw it out.
   workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderExpirationTime);
 }
}

function updateForwardRef(current, workInProgress) {
 var render = workInProgress.type.render;
 var nextProps = workInProgress.pendingProps;
 var ref = workInProgress.ref;
 if (hasContextChanged()) {
   // Normally we can bail out on props equality but if context has changed
   // we don't do the bailout and we have to reuse existing props instead.
 } else if (workInProgress.memoizedProps === nextProps) {
   var currentRef = current !== null ? current.ref : null;
   if (ref === currentRef) {
     return bailoutOnAlreadyFinishedWork(current, workInProgress);
   }
 }

 var nextChildren = void 0;
 {
   ReactCurrentOwner.current = workInProgress;
   ReactDebugCurrentFiber.setCurrentPhase('render');
   nextChildren = render(nextProps, ref);
   ReactDebugCurrentFiber.setCurrentPhase(null);
 }

 reconcileChildren(current, workInProgress, nextChildren);
 memoizeProps(workInProgress, nextProps);
 return workInProgress.child;
}

function updateFragment(current, workInProgress) {
 var nextChildren = workInProgress.pendingProps;
 if (hasContextChanged()) {
   // Normally we can bail out on props equality but if context has changed
   // we don't do the bailout and we have to reuse existing props instead.
 } else if (workInProgress.memoizedProps === nextChildren) {
   return bailoutOnAlreadyFinishedWork(current, workInProgress);
 }
 reconcileChildren(current, workInProgress, nextChildren);
 memoizeProps(workInProgress, nextChildren);
 return workInProgress.child;
}

function updateMode(current, workInProgress) {
 var nextChildren = workInProgress.pendingProps.children;
 if (hasContextChanged()) {
   // Normally we can bail out on props equality but if context has changed
   // we don't do the bailout and we have to reuse existing props instead.
 } else if (nextChildren === null || workInProgress.memoizedProps === nextChildren) {
   return bailoutOnAlreadyFinishedWork(current, workInProgress);
 }
 reconcileChildren(current, workInProgress, nextChildren);
 memoizeProps(workInProgress, nextChildren);
 return workInProgress.child;
}

function updateProfiler(current, workInProgress) {
 var nextProps = workInProgress.pendingProps;
 if (enableProfilerTimer) {
   workInProgress.effectTag |= Update;
 }
 if (workInProgress.memoizedProps === nextProps) {
   return bailoutOnAlreadyFinishedWork(current, workInProgress);
 }
 var nextChildren = nextProps.children;
 reconcileChildren(current, workInProgress, nextChildren);
 memoizeProps(workInProgress, nextProps);
 return workInProgress.child;
}

function markRef(current, workInProgress) {
 var ref = workInProgress.ref;
 if (current === null && ref !== null || current !== null && current.ref !== ref) {
   // Schedule a Ref effect
   workInProgress.effectTag |= Ref;
 }
}

function updateFunctionalComponent(current, workInProgress) {
 var fn = workInProgress.type;
 var nextProps = workInProgress.pendingProps;

 if (hasContextChanged()) {
   // Normally we can bail out on props equality but if context has changed
   // we don't do the bailout and we have to reuse existing props instead.
 } else {
   if (workInProgress.memoizedProps === nextProps) {
     return bailoutOnAlreadyFinishedWork(current, workInProgress);
   }
   // TODO: consider bringing fn.shouldComponentUpdate() back.
   // It used to be here.
 }

 var unmaskedContext = getUnmaskedContext(workInProgress);
 var context = getMaskedContext(workInProgress, unmaskedContext);

 var nextChildren = void 0;

 {
   ReactCurrentOwner.current = workInProgress;
   ReactDebugCurrentFiber.setCurrentPhase('render');
   nextChildren = fn(nextProps, context);
   ReactDebugCurrentFiber.setCurrentPhase(null);
 }
 // React DevTools reads this flag.
 workInProgress.effectTag |= PerformedWork;
 reconcileChildren(current, workInProgress, nextChildren);
 memoizeProps(workInProgress, nextProps);
 return workInProgress.child;
}

function updateClassComponent(current, workInProgress, renderExpirationTime) {
 // Push context providers early to prevent context stack mismatches.
 // During mounting we don't know the child context yet as the instance doesn't exist.
 // We will invalidate the child context in finishClassComponent() right after rendering.
 var hasContext = pushContextProvider(workInProgress);
 var shouldUpdate = void 0;
 if (current === null) {
   if (workInProgress.stateNode === null) {
     // In the initial pass we might need to construct the instance.
     constructClassInstance(workInProgress, workInProgress.pendingProps, renderExpirationTime);
     mountClassInstance(workInProgress, renderExpirationTime);

     shouldUpdate = true;
   } else {
     // In a resume, we'll already have an instance we can reuse.
     shouldUpdate = resumeMountClassInstance(workInProgress, renderExpirationTime);
   }
 } else {
   shouldUpdate = updateClassInstance(current, workInProgress, renderExpirationTime);
 }
 return finishClassComponent(current, workInProgress, shouldUpdate, hasContext, renderExpirationTime);
}

function finishClassComponent(current, workInProgress, shouldUpdate, hasContext, renderExpirationTime) {
 // Refs should update even if shouldComponentUpdate returns false
 markRef(current, workInProgress);

 var didCaptureError = (workInProgress.effectTag & DidCapture) !== NoEffect;

 if (!shouldUpdate && !didCaptureError) {
   // Context providers should defer to sCU for rendering
   if (hasContext) {
     invalidateContextProvider(workInProgress, false);
   }

   return bailoutOnAlreadyFinishedWork(current, workInProgress);
 }

 var ctor = workInProgress.type;
 var instance = workInProgress.stateNode;

 // Rerender
 ReactCurrentOwner.current = workInProgress;
 var nextChildren = void 0;
 if (didCaptureError && (!enableGetDerivedStateFromCatch || typeof ctor.getDerivedStateFromCatch !== 'function')) {
   // If we captured an error, but getDerivedStateFrom catch is not defined,
   // unmount all the children. componentDidCatch will schedule an update to
   // re-render a fallback. This is temporary until we migrate everyone to
   // the new API.
   // TODO: Warn in a future release.
   nextChildren = null;

   if (enableProfilerTimer) {
     stopBaseRenderTimerIfRunning();
   }
 } else {
   {
     ReactDebugCurrentFiber.setCurrentPhase('render');
     nextChildren = instance.render();
     if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
       instance.render();
     }
     ReactDebugCurrentFiber.setCurrentPhase(null);
   }
 }

 // React DevTools reads this flag.
 workInProgress.effectTag |= PerformedWork;
 if (didCaptureError) {
   // If we're recovering from an error, reconcile twice: first to delete
   // all the existing children.
   reconcileChildrenAtExpirationTime(current, workInProgress, null, renderExpirationTime);
   workInProgress.child = null;
   // Now we can continue reconciling like normal. This has the effect of
   // remounting all children regardless of whether their their
   // identity matches.
 }
 reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, renderExpirationTime);
 // Memoize props and state using the values we just used to render.
 // TODO: Restructure so we never read values from the instance.
 memoizeState(workInProgress, instance.state);
 memoizeProps(workInProgress, instance.props);

 // The context might have changed so we need to recalculate it.
 if (hasContext) {
   invalidateContextProvider(workInProgress, true);
 }

 return workInProgress.child;
}

function pushHostRootContext(workInProgress) {
 var root = workInProgress.stateNode;
 if (root.pendingContext) {
   pushTopLevelContextObject(workInProgress, root.pendingContext, root.pendingContext !== root.context);
 } else if (root.context) {
   // Should always be set
   pushTopLevelContextObject(workInProgress, root.context, false);
 }
 pushHostContainer(workInProgress, root.containerInfo);
}

function updateHostRoot(current, workInProgress, renderExpirationTime) {
 pushHostRootContext(workInProgress);
 var updateQueue = workInProgress.updateQueue;
 if (updateQueue !== null) {
   var nextProps = workInProgress.pendingProps;
   var prevState = workInProgress.memoizedState;
   var prevChildren = prevState !== null ? prevState.element : null;
   processUpdateQueue(workInProgress, updateQueue, nextProps, null, renderExpirationTime);
   var nextState = workInProgress.memoizedState;
   // Caution: React DevTools currently depends on this property
   // being called "element".
   var nextChildren = nextState.element;

   if (nextChildren === prevChildren) {
     // If the state is the same as before, that's a bailout because we had
     // no work that expires at this time.
     resetHydrationState();
     return bailoutOnAlreadyFinishedWork(current, workInProgress);
   }
   var root = workInProgress.stateNode;
   if ((current === null || current.child === null) && root.hydrate && enterHydrationState(workInProgress)) {
     // If we don't have any current children this might be the first pass.
     // We always try to hydrate. If this isn't a hydration pass there won't
     // be any children to hydrate which is effectively the same thing as
     // not hydrating.

     // This is a bit of a hack. We track the host root as a placement to
     // know that we're currently in a mounting state. That way isMounted
     // works as expected. We must reset this before committing.
     // TODO: Delete this when we delete isMounted and findDOMNode.
     workInProgress.effectTag |= Placement;

     // Ensure that children mount into this root without tracking
     // side-effects. This ensures that we don't store Placement effects on
     // nodes that will be hydrated.
     workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
   } else {
     // Otherwise reset hydration state in case we aborted and resumed another
     // root.
     resetHydrationState();
     reconcileChildren(current, workInProgress, nextChildren);
   }
   return workInProgress.child;
 }
 resetHydrationState();
 // If there is no update queue, that's a bailout because the root has no props.
 return bailoutOnAlreadyFinishedWork(current, workInProgress);
}

function updateHostComponent(current, workInProgress, renderExpirationTime) {
 pushHostContext(workInProgress);

 if (current === null) {
   tryToClaimNextHydratableInstance(workInProgress);
 }

 var type = workInProgress.type;
 var memoizedProps = workInProgress.memoizedProps;
 var nextProps = workInProgress.pendingProps;
 var prevProps = current !== null ? current.memoizedProps : null;

 if (hasContextChanged()) {
   // Normally we can bail out on props equality but if context has changed
   // we don't do the bailout and we have to reuse existing props instead.
 } else if (memoizedProps === nextProps) {
   var isHidden = workInProgress.mode & AsyncMode && shouldDeprioritizeSubtree(type, nextProps);
   if (isHidden) {
     // Before bailing out, make sure we've deprioritized a hidden component.
     workInProgress.expirationTime = Never;
   }
   if (!isHidden || renderExpirationTime !== Never) {
     return bailoutOnAlreadyFinishedWork(current, workInProgress);
   }
   // If we're rendering a hidden node at hidden priority, don't bailout. The
   // parent is complete, but the children may not be.
 }

 var nextChildren = nextProps.children;
 var isDirectTextChild = shouldSetTextContent(type, nextProps);

 if (isDirectTextChild) {
   // We special case a direct text child of a host node. This is a common
   // case. We won't handle it as a reified child. We will instead handle
   // this in the host environment that also have access to this prop. That
   // avoids allocating another HostText fiber and traversing it.
   nextChildren = null;
 } else if (prevProps && shouldSetTextContent(type, prevProps)) {
   // If we're switching from a direct text child to a normal child, or to
   // empty, we need to schedule the text content to be reset.
   workInProgress.effectTag |= ContentReset;
 }

 markRef(current, workInProgress);

 // Check the host config to see if the children are offscreen/hidden.
 if (renderExpirationTime !== Never && workInProgress.mode & AsyncMode && shouldDeprioritizeSubtree(type, nextProps)) {
   // Down-prioritize the children.
   workInProgress.expirationTime = Never;
   // Bailout and come back to this fiber later.
   workInProgress.memoizedProps = nextProps;
   return null;
 }

 reconcileChildren(current, workInProgress, nextChildren);
 memoizeProps(workInProgress, nextProps);
 return workInProgress.child;
}

function updateHostText(current, workInProgress) {
 if (current === null) {
   tryToClaimNextHydratableInstance(workInProgress);
 }
 var nextProps = workInProgress.pendingProps;
 memoizeProps(workInProgress, nextProps);
 // Nothing to do here. This is terminal. We'll do the completion step
 // immediately after.
 return null;
}

function mountIndeterminateComponent(current, workInProgress, renderExpirationTime) {
 !(current === null) ? invariant_1(false, 'An indeterminate component should never have mounted. This error is likely caused by a bug in React. Please file an issue.') : void 0;
 var fn = workInProgress.type;
 var props = workInProgress.pendingProps;
 var unmaskedContext = getUnmaskedContext(workInProgress);
 var context = getMaskedContext(workInProgress, unmaskedContext);

 var value = void 0;

 {
   if (fn.prototype && typeof fn.prototype.render === 'function') {
     var componentName = getComponentName(workInProgress) || 'Unknown';

     if (!didWarnAboutBadClass[componentName]) {
       warning_1(false, "The <%s /> component appears to have a render method, but doesn't extend React.Component. " + 'This is likely to cause errors. Change %s to extend React.Component instead.', componentName, componentName);
       didWarnAboutBadClass[componentName] = true;
     }
   }

   if (workInProgress.mode & StrictMode) {
     ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, null);
   }

   ReactCurrentOwner.current = workInProgress;
   value = fn(props, context);
 }
 // React DevTools reads this flag.
 workInProgress.effectTag |= PerformedWork;

 if (typeof value === 'object' && value !== null && typeof value.render === 'function' && value.$$typeof === undefined) {
   var Component = workInProgress.type;

   // Proceed under the assumption that this is a class instance
   workInProgress.tag = ClassComponent;

   workInProgress.memoizedState = value.state !== null && value.state !== undefined ? value.state : null;

   var getDerivedStateFromProps = Component.getDerivedStateFromProps;
   if (typeof getDerivedStateFromProps === 'function') {
     applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, props);
   }

   // Push context providers early to prevent context stack mismatches.
   // During mounting we don't know the child context yet as the instance doesn't exist.
   // We will invalidate the child context in finishClassComponent() right after rendering.
   var hasContext = pushContextProvider(workInProgress);
   adoptClassInstance(workInProgress, value);
   mountClassInstance(workInProgress, renderExpirationTime);
   return finishClassComponent(current, workInProgress, true, hasContext, renderExpirationTime);
 } else {
   // Proceed under the assumption that this is a functional component
   workInProgress.tag = FunctionalComponent;
   {
     var _Component = workInProgress.type;

     if (_Component) {
       !!_Component.childContextTypes ? warning_1(false, '%s(...): childContextTypes cannot be defined on a functional component.', _Component.displayName || _Component.name || 'Component') : void 0;
     }
     if (workInProgress.ref !== null) {
       var info = '';
       var ownerName = ReactDebugCurrentFiber.getCurrentFiberOwnerName();
       if (ownerName) {
         info += '\n\nCheck the render method of `' + ownerName + '`.';
       }

       var warningKey = ownerName || workInProgress._debugID || '';
       var debugSource = workInProgress._debugSource;
       if (debugSource) {
         warningKey = debugSource.fileName + ':' + debugSource.lineNumber;
       }
       if (!didWarnAboutStatelessRefs[warningKey]) {
         didWarnAboutStatelessRefs[warningKey] = true;
         warning_1(false, 'Stateless function components cannot be given refs. ' + 'Attempts to access this ref will fail.%s%s', info, ReactDebugCurrentFiber.getCurrentFiberStackAddendum());
       }
     }

     if (typeof fn.getDerivedStateFromProps === 'function') {
       var _componentName = getComponentName(workInProgress) || 'Unknown';

       if (!didWarnAboutGetDerivedStateOnFunctionalComponent[_componentName]) {
         warning_1(false, '%s: Stateless functional components do not support getDerivedStateFromProps.', _componentName);
         didWarnAboutGetDerivedStateOnFunctionalComponent[_componentName] = true;
       }
     }
   }
   reconcileChildren(current, workInProgress, value);
   memoizeProps(workInProgress, props);
   return workInProgress.child;
 }
}

function updateTimeoutComponent(current, workInProgress, renderExpirationTime) {
 if (enableSuspense) {
   var nextProps = workInProgress.pendingProps;
   var prevProps = workInProgress.memoizedProps;

   var prevDidTimeout = workInProgress.memoizedState;

   // Check if we already attempted to render the normal state. If we did,
   // and we timed out, render the placeholder state.
   var alreadyCaptured = (workInProgress.effectTag & DidCapture) === NoEffect;
   var nextDidTimeout = !alreadyCaptured;

   if (hasContextChanged()) {
     // Normally we can bail out on props equality but if context has changed
     // we don't do the bailout and we have to reuse existing props instead.
   } else if (nextProps === prevProps && nextDidTimeout === prevDidTimeout) {
     return bailoutOnAlreadyFinishedWork(current, workInProgress);
   }

   var render = nextProps.children;
   var nextChildren = render(nextDidTimeout);
   workInProgress.memoizedProps = nextProps;
   workInProgress.memoizedState = nextDidTimeout;
   reconcileChildren(current, workInProgress, nextChildren);
   return workInProgress.child;
 } else {
   return null;
 }
}

function updatePortalComponent(current, workInProgress, renderExpirationTime) {
 pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
 var nextChildren = workInProgress.pendingProps;
 if (hasContextChanged()) {
   // Normally we can bail out on props equality but if context has changed
   // we don't do the bailout and we have to reuse existing props instead.
 } else if (workInProgress.memoizedProps === nextChildren) {
   return bailoutOnAlreadyFinishedWork(current, workInProgress);
 }

 if (current === null) {
   // Portals are special because we don't append the children during mount
   // but at commit. Therefore we need to track insertions which the normal
   // flow doesn't do during mount. This doesn't happen at the root because
   // the root always starts with a "current" with a null child.
   // TODO: Consider unifying this with how the root works.
   workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
   memoizeProps(workInProgress, nextChildren);
 } else {
   reconcileChildren(current, workInProgress, nextChildren);
   memoizeProps(workInProgress, nextChildren);
 }
 return workInProgress.child;
}

function propagateContextChange(workInProgress, context, changedBits, renderExpirationTime) {
 var fiber = workInProgress.child;
 if (fiber !== null) {
   // Set the return pointer of the child to the work-in-progress fiber.
   fiber.return = workInProgress;
 }
 while (fiber !== null) {
   var nextFiber = void 0;
   // Visit this fiber.
   switch (fiber.tag) {
     case ContextConsumer:
       // Check if the context matches.
       var observedBits = fiber.stateNode | 0;
       if (fiber.type === context && (observedBits & changedBits) !== 0) {
         // Update the expiration time of all the ancestors, including
         // the alternates.
         var node = fiber;
         while (node !== null) {
           var alternate = node.alternate;
           if (node.expirationTime === NoWork || node.expirationTime > renderExpirationTime) {
             node.expirationTime = renderExpirationTime;
             if (alternate !== null && (alternate.expirationTime === NoWork || alternate.expirationTime > renderExpirationTime)) {
               alternate.expirationTime = renderExpirationTime;
             }
           } else if (alternate !== null && (alternate.expirationTime === NoWork || alternate.expirationTime > renderExpirationTime)) {
             alternate.expirationTime = renderExpirationTime;
           } else {
             // Neither alternate was updated, which means the rest of the
             // ancestor path already has sufficient priority.
             break;
           }
           node = node.return;
         }
         // Don't scan deeper than a matching consumer. When we render the
         // consumer, we'll continue scanning from that point. This way the
         // scanning work is time-sliced.
         nextFiber = null;
       } else {
         // Traverse down.
         nextFiber = fiber.child;
       }
       break;
     case ContextProvider:
       // Don't scan deeper if this is a matching provider
       nextFiber = fiber.type === workInProgress.type ? null : fiber.child;
       break;
     default:
       // Traverse down.
       nextFiber = fiber.child;
       break;
   }
   if (nextFiber !== null) {
     // Set the return pointer of the child to the work-in-progress fiber.
     nextFiber.return = fiber;
   } else {
     // No child. Traverse to next sibling.
     nextFiber = fiber;
     while (nextFiber !== null) {
       if (nextFiber === workInProgress) {
         // We're back to the root of this subtree. Exit.
         nextFiber = null;
         break;
       }
       var sibling = nextFiber.sibling;
       if (sibling !== null) {
         // Set the return pointer of the sibling to the work-in-progress fiber.
         sibling.return = nextFiber.return;
         nextFiber = sibling;
         break;
       }
       // No more siblings. Traverse up.
       nextFiber = nextFiber.return;
     }
   }
   fiber = nextFiber;
 }
}

function updateContextProvider(current, workInProgress, renderExpirationTime) {
 var providerType = workInProgress.type;
 var context = providerType._context;

 var newProps = workInProgress.pendingProps;
 var oldProps = workInProgress.memoizedProps;
 var canBailOnProps = true;

 if (hasContextChanged()) {
   canBailOnProps = false;
   // Normally we can bail out on props equality but if context has changed
   // we don't do the bailout and we have to reuse existing props instead.
 } else if (oldProps === newProps) {
   workInProgress.stateNode = 0;
   pushProvider(workInProgress);
   return bailoutOnAlreadyFinishedWork(current, workInProgress);
 }

 var newValue = newProps.value;
 workInProgress.memoizedProps = newProps;

 {
   var providerPropTypes = workInProgress.type.propTypes;

   if (providerPropTypes) {
     checkPropTypes_1(providerPropTypes, newProps, 'prop', 'Context.Provider', getCurrentFiberStackAddendum$6);
   }
 }

 var changedBits = void 0;
 if (oldProps === null) {
   // Initial render
   changedBits = MAX_SIGNED_31_BIT_INT;
 } else {
   if (oldProps.value === newProps.value) {
     // No change. Bailout early if children are the same.
     if (oldProps.children === newProps.children && canBailOnProps) {
       workInProgress.stateNode = 0;
       pushProvider(workInProgress);
       return bailoutOnAlreadyFinishedWork(current, workInProgress);
     }
     changedBits = 0;
   } else {
     var oldValue = oldProps.value;
     // Use Object.is to compare the new context value to the old value.
     // Inlined Object.is polyfill.
     // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     if (oldValue === newValue && (oldValue !== 0 || 1 / oldValue === 1 / newValue) || oldValue !== oldValue && newValue !== newValue // eslint-disable-line no-self-compare
     ) {
         // No change. Bailout early if children are the same.
         if (oldProps.children === newProps.children && canBailOnProps) {
           workInProgress.stateNode = 0;
           pushProvider(workInProgress);
           return bailoutOnAlreadyFinishedWork(current, workInProgress);
         }
         changedBits = 0;
       } else {
       changedBits = typeof context._calculateChangedBits === 'function' ? context._calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;
       {
         !((changedBits & MAX_SIGNED_31_BIT_INT) === changedBits) ? warning_1(false, 'calculateChangedBits: Expected the return value to be a ' + '31-bit integer. Instead received: %s', changedBits) : void 0;
       }
       changedBits |= 0;

       if (changedBits === 0) {
         // No change. Bailout early if children are the same.
         if (oldProps.children === newProps.children && canBailOnProps) {
           workInProgress.stateNode = 0;
           pushProvider(workInProgress);
           return bailoutOnAlreadyFinishedWork(current, workInProgress);
         }
       } else {
         propagateContextChange(workInProgress, context, changedBits, renderExpirationTime);
       }
     }
   }
 }

 workInProgress.stateNode = changedBits;
 pushProvider(workInProgress);

 var newChildren = newProps.children;
 reconcileChildren(current, workInProgress, newChildren);
 return workInProgress.child;
}

function updateContextConsumer(current, workInProgress, renderExpirationTime) {
 var context = workInProgress.type;
 var newProps = workInProgress.pendingProps;
 var oldProps = workInProgress.memoizedProps;

 var newValue = getContextCurrentValue(context);
 var changedBits = getContextChangedBits(context);

 if (hasContextChanged()) {
   // Normally we can bail out on props equality but if context has changed
   // we don't do the bailout and we have to reuse existing props instead.
 } else if (changedBits === 0 && oldProps === newProps) {
   return bailoutOnAlreadyFinishedWork(current, workInProgress);
 }
 workInProgress.memoizedProps = newProps;

 var observedBits = newProps.unstable_observedBits;
 if (observedBits === undefined || observedBits === null) {
   // Subscribe to all changes by default
   observedBits = MAX_SIGNED_31_BIT_INT;
 }
 // Store the observedBits on the fiber's stateNode for quick access.
 workInProgress.stateNode = observedBits;

 if ((changedBits & observedBits) !== 0) {
   // Context change propagation stops at matching consumers, for time-
   // slicing. Continue the propagation here.
   propagateContextChange(workInProgress, context, changedBits, renderExpirationTime);
 } else if (oldProps === newProps) {
   // Skip over a memoized parent with a bitmask bailout even
   // if we began working on it because of a deeper matching child.
   return bailoutOnAlreadyFinishedWork(current, workInProgress);
 }
 // There is no bailout on `children` equality because we expect people
 // to often pass a bound method as a child, but it may reference
 // `this.state` or `this.props` (and thus needs to re-render on `setState`).

 var render = newProps.children;

 {
   !(typeof render === 'function') ? warning_1(false, 'A context consumer was rendered with multiple children, or a child ' + "that isn't a function. A context consumer expects a single child " + 'that is a function. If you did pass a function, make sure there ' + 'is no trailing or leading whitespace around it.') : void 0;
 }

 var newChildren = void 0;
 {
   ReactCurrentOwner.current = workInProgress;
   ReactDebugCurrentFiber.setCurrentPhase('render');
   newChildren = render(newValue);
   ReactDebugCurrentFiber.setCurrentPhase(null);
 }

 // React DevTools reads this flag.
 workInProgress.effectTag |= PerformedWork;
 reconcileChildren(current, workInProgress, newChildren);
 return workInProgress.child;
}

/*
 function reuseChildrenEffects(returnFiber : Fiber, firstChild : Fiber) {
   let child = firstChild;
   do {
     // Ensure that the first and last effect of the parent corresponds
     // to the children's first and last effect.
     if (!returnFiber.firstEffect) {
       returnFiber.firstEffect = child.firstEffect;
     }
     if (child.lastEffect) {
       if (returnFiber.lastEffect) {
         returnFiber.lastEffect.nextEffect = child.firstEffect;
       }
       returnFiber.lastEffect = child.lastEffect;
     }
   } while (child = child.sibling);
 }
 */

function bailoutOnAlreadyFinishedWork(current, workInProgress) {
 cancelWorkTimer(workInProgress);

 if (enableProfilerTimer) {
   // Don't update "base" render times for bailouts.
   stopBaseRenderTimerIfRunning();
 }

 // TODO: We should ideally be able to bail out early if the children have no
 // more work to do. However, since we don't have a separation of this
 // Fiber's priority and its children yet - we don't know without doing lots
 // of the same work we do anyway. Once we have that separation we can just
 // bail out here if the children has no more work at this priority level.
 // if (workInProgress.priorityOfChildren <= priorityLevel) {
 //   // If there are side-effects in these children that have not yet been
 //   // committed we need to ensure that they get properly transferred up.
 //   if (current && current.child !== workInProgress.child) {
 //     reuseChildrenEffects(workInProgress, child);
 //   }
 //   return null;
 // }

 cloneChildFibers(current, workInProgress);
 return workInProgress.child;
}

function bailoutOnLowPriority(current, workInProgress) {
 cancelWorkTimer(workInProgress);

 if (enableProfilerTimer) {
   // Don't update "base" render times for bailouts.
   stopBaseRenderTimerIfRunning();
 }

 // TODO: Handle HostComponent tags here as well and call pushHostContext()?
 // See PR 8590 discussion for context
 switch (workInProgress.tag) {
   case HostRoot:
     pushHostRootContext(workInProgress);
     break;
   case ClassComponent:
     pushContextProvider(workInProgress);
     break;
   case HostPortal:
     pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
     break;
   case ContextProvider:
     pushProvider(workInProgress);
     break;
 }
 // TODO: What if this is currently in progress?
 // How can that happen? How is this not being cloned?
 return null;
}

// TODO: Delete memoizeProps/State and move to reconcile/bailout instead
function memoizeProps(workInProgress, nextProps) {
 workInProgress.memoizedProps = nextProps;
}

function memoizeState(workInProgress, nextState) {
 workInProgress.memoizedState = nextState;
 // Don't reset the updateQueue, in case there are pending updates. Resetting
 // is handled by processUpdateQueue.
}

function beginWork(current, workInProgress, renderExpirationTime) {
 if (enableProfilerTimer) {
   if (workInProgress.mode & ProfileMode) {
     markActualRenderTimeStarted(workInProgress);
   }
 }

 if (workInProgress.expirationTime === NoWork || workInProgress.expirationTime > renderExpirationTime) {
   return bailoutOnLowPriority(current, workInProgress);
 }

 switch (workInProgress.tag) {
   case IndeterminateComponent:
     return mountIndeterminateComponent(current, workInProgress, renderExpirationTime);
   case FunctionalComponent:
     return updateFunctionalComponent(current, workInProgress);
   case ClassComponent:
     return updateClassComponent(current, workInProgress, renderExpirationTime);
   case HostRoot:
     return updateHostRoot(current, workInProgress, renderExpirationTime);
   case HostComponent:
     return updateHostComponent(current, workInProgress, renderExpirationTime);
   case HostText:
     return updateHostText(current, workInProgress);
   case TimeoutComponent:
     return updateTimeoutComponent(current, workInProgress, renderExpirationTime);
   case HostPortal:
     return updatePortalComponent(current, workInProgress, renderExpirationTime);
   case ForwardRef:
     return updateForwardRef(current, workInProgress);
   case Fragment:
     return updateFragment(current, workInProgress);
   case Mode:
     return updateMode(current, workInProgress);
   case Profiler:
     return updateProfiler(current, workInProgress);
   case ContextProvider:
     return updateContextProvider(current, workInProgress, renderExpirationTime);
   case ContextConsumer:
     return updateContextConsumer(current, workInProgress, renderExpirationTime);
   default:
     invariant_1(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
 }
}

function markUpdate(workInProgress) {
 // Tag the fiber with an update effect. This turns a Placement into
 // a PlacementAndUpdate.
 workInProgress.effectTag |= Update;
}

function markRef$1(workInProgress) {
 workInProgress.effectTag |= Ref;
}

function appendAllChildren(parent, workInProgress) {
 // We only have the top Fiber that was created but we need recurse down its
 // children to find all the terminal nodes.
 var node = workInProgress.child;
 while (node !== null) {
   if (node.tag === HostComponent || node.tag === HostText) {
     appendInitialChild(parent, node.stateNode);
   } else if (node.tag === HostPortal) {
     // If we have a portal child, then we don't want to traverse
     // down its children. Instead, we'll get insertions from each child in
     // the portal directly.
   } else if (node.child !== null) {
     node.child.return = node;
     node = node.child;
     continue;
   }
   if (node === workInProgress) {
     return;
   }
   while (node.sibling === null) {
     if (node.return === null || node.return === workInProgress) {
       return;
     }
     node = node.return;
   }
   node.sibling.return = node.return;
   node = node.sibling;
 }
}

var updateHostContainer = void 0;
var updateHostComponent$1 = void 0;
var updateHostText$1 = void 0;
if (supportsMutation) {
 // Mutation mode

 updateHostContainer = function (workInProgress) {
   // Noop
 };
 updateHostComponent$1 = function (current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance, currentHostContext) {
   // TODO: Type this specific to this type of component.
   workInProgress.updateQueue = updatePayload;
   // If the update payload indicates that there is a change or if there
   // is a new ref we mark this as an update. All the work is done in commitWork.
   if (updatePayload) {
     markUpdate(workInProgress);
   }
 };
 updateHostText$1 = function (current, workInProgress, oldText, newText) {
   // If the text differs, mark it as an update. All the work in done in commitWork.
   if (oldText !== newText) {
     markUpdate(workInProgress);
   }
 };
} else if (supportsPersistence) {
 // Persistent host tree mode

 // An unfortunate fork of appendAllChildren because we have two different parent types.
 var appendAllChildrenToContainer = function (containerChildSet, workInProgress) {
   // We only have the top Fiber that was created but we need recurse down its
   // children to find all the terminal nodes.
   var node = workInProgress.child;
   while (node !== null) {
     if (node.tag === HostComponent || node.tag === HostText) {
       appendChildToContainerChildSet(containerChildSet, node.stateNode);
     } else if (node.tag === HostPortal) {
       // If we have a portal child, then we don't want to traverse
       // down its children. Instead, we'll get insertions from each child in
       // the portal directly.
     } else if (node.child !== null) {
       node.child.return = node;
       node = node.child;
       continue;
     }
     if (node === workInProgress) {
       return;
     }
     while (node.sibling === null) {
       if (node.return === null || node.return === workInProgress) {
         return;
       }
       node = node.return;
     }
     node.sibling.return = node.return;
     node = node.sibling;
   }
 };
 updateHostContainer = function (workInProgress) {
   var portalOrRoot = workInProgress.stateNode;
   var childrenUnchanged = workInProgress.firstEffect === null;
   if (childrenUnchanged) {
     // No changes, just reuse the existing instance.
   } else {
     var container = portalOrRoot.containerInfo;
     var newChildSet = createContainerChildSet(container);
     // If children might have changed, we have to add them all to the set.
     appendAllChildrenToContainer(newChildSet, workInProgress);
     portalOrRoot.pendingChildren = newChildSet;
     // Schedule an update on the container to swap out the container.
     markUpdate(workInProgress);
     finalizeContainerChildren(container, newChildSet);
   }
 };
 updateHostComponent$1 = function (current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance, currentHostContext) {
   // If there are no effects associated with this node, then none of our children had any updates.
   // This guarantees that we can reuse all of them.
   var childrenUnchanged = workInProgress.firstEffect === null;
   var currentInstance = current.stateNode;
   if (childrenUnchanged && updatePayload === null) {
     // No changes, just reuse the existing instance.
     // Note that this might release a previous clone.
     workInProgress.stateNode = currentInstance;
   } else {
     var recyclableInstance = workInProgress.stateNode;
     var newInstance = cloneInstance(currentInstance, updatePayload, type, oldProps, newProps, workInProgress, childrenUnchanged, recyclableInstance);
     if (finalizeInitialChildren(newInstance, type, newProps, rootContainerInstance, currentHostContext)) {
       markUpdate(workInProgress);
     }
     workInProgress.stateNode = newInstance;
     if (childrenUnchanged) {
       // If there are no other effects in this tree, we need to flag this node as having one.
       // Even though we're not going to use it for anything.
       // Otherwise parents won't know that there are new children to propagate upwards.
       markUpdate(workInProgress);
     } else {
       // If children might have changed, we have to add them all to the set.
       appendAllChildren(newInstance, workInProgress);
     }
   }
 };
 updateHostText$1 = function (current, workInProgress, oldText, newText) {
   if (oldText !== newText) {
     // If the text content differs, we'll create a new text instance for it.
     var rootContainerInstance = getRootHostContainer();
     var currentHostContext = getHostContext();
     workInProgress.stateNode = createTextInstance(newText, rootContainerInstance, currentHostContext, workInProgress);
     // We'll have to mark it as having an effect, even though we won't use the effect for anything.
     // This lets the parents know that at least one of their children has changed.
     markUpdate(workInProgress);
   }
 };
} else {
 // No host operations
 updateHostContainer = function (workInProgress) {
   // Noop
 };
 updateHostComponent$1 = function (current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance, currentHostContext) {
   // Noop
 };
 updateHostText$1 = function (current, workInProgress, oldText, newText) {
   // Noop
 };
}

function completeWork(current, workInProgress, renderExpirationTime) {
 var newProps = workInProgress.pendingProps;

 if (enableProfilerTimer) {
   if (workInProgress.mode & ProfileMode) {
     recordElapsedActualRenderTime(workInProgress);
   }
 }

 switch (workInProgress.tag) {
   case FunctionalComponent:
     return null;
   case ClassComponent:
     {
       // We are leaving this subtree, so pop context if any.
       popContextProvider(workInProgress);
       return null;
     }
   case HostRoot:
     {
       popHostContainer(workInProgress);
       popTopLevelContextObject(workInProgress);
       var fiberRoot = workInProgress.stateNode;
       if (fiberRoot.pendingContext) {
         fiberRoot.context = fiberRoot.pendingContext;
         fiberRoot.pendingContext = null;
       }
       if (current === null || current.child === null) {
         // If we hydrated, pop so that we can delete any remaining children
         // that weren't hydrated.
         popHydrationState(workInProgress);
         // This resets the hacky state to fix isMounted before committing.
         // TODO: Delete this when we delete isMounted and findDOMNode.
         workInProgress.effectTag &= ~Placement;
       }
       updateHostContainer(workInProgress);
       return null;
     }
   case HostComponent:
     {
       popHostContext(workInProgress);
       var rootContainerInstance = getRootHostContainer();
       var type = workInProgress.type;
       if (current !== null && workInProgress.stateNode != null) {
         // If we have an alternate, that means this is an update and we need to
         // schedule a side-effect to do the updates.
         var oldProps = current.memoizedProps;
         // If we get updated because one of our children updated, we don't
         // have newProps so we'll have to reuse them.
         // TODO: Split the update API as separate for the props vs. children.
         // Even better would be if children weren't special cased at all tho.
         var instance = workInProgress.stateNode;
         var currentHostContext = getHostContext();
         // TODO: Experiencing an error where oldProps is null. Suggests a host
         // component is hitting the resume path. Figure out why. Possibly
         // related to `hidden`.
         var updatePayload = prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext);

         updateHostComponent$1(current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance, currentHostContext);

         if (current.ref !== workInProgress.ref) {
           markRef$1(workInProgress);
         }
       } else {
         if (!newProps) {
           !(workInProgress.stateNode !== null) ? invariant_1(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
           // This can happen when we abort work.
           return null;
         }

         var _currentHostContext = getHostContext();
         // TODO: Move createInstance to beginWork and keep it on a context
         // "stack" as the parent. Then append children as we go in beginWork
         // or completeWork depending on we want to add then top->down or
         // bottom->up. Top->down is faster in IE11.
         var wasHydrated = popHydrationState(workInProgress);
         if (wasHydrated) {
           // TODO: Move this and createInstance step into the beginPhase
           // to consolidate.
           if (prepareToHydrateHostInstance(workInProgress, rootContainerInstance, _currentHostContext)) {
             // If changes to the hydrated node needs to be applied at the
             // commit-phase we mark this as such.
             markUpdate(workInProgress);
           }
         } else {
           var _instance = createInstance(type, newProps, rootContainerInstance, _currentHostContext, workInProgress);

           appendAllChildren(_instance, workInProgress);

           // Certain renderers require commit-time effects for initial mount.
           // (eg DOM renderer supports auto-focus for certain elements).
           // Make sure such renderers get scheduled for later work.
           if (finalizeInitialChildren(_instance, type, newProps, rootContainerInstance, _currentHostContext)) {
             markUpdate(workInProgress);
           }
           workInProgress.stateNode = _instance;
         }

         if (workInProgress.ref !== null) {
           // If there is a ref on a host node we need to schedule a callback
           markRef$1(workInProgress);
         }
       }
       return null;
     }
   case HostText:
     {
       var newText = newProps;
       if (current && workInProgress.stateNode != null) {
         var oldText = current.memoizedProps;
         // If we have an alternate, that means this is an update and we need
         // to schedule a side-effect to do the updates.
         updateHostText$1(current, workInProgress, oldText, newText);
       } else {
         if (typeof newText !== 'string') {
           !(workInProgress.stateNode !== null) ? invariant_1(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
           // This can happen when we abort work.
           return null;
         }
         var _rootContainerInstance = getRootHostContainer();
         var _currentHostContext2 = getHostContext();
         var _wasHydrated = popHydrationState(workInProgress);
         if (_wasHydrated) {
           if (prepareToHydrateHostTextInstance(workInProgress)) {
             markUpdate(workInProgress);
           }
         } else {
           workInProgress.stateNode = createTextInstance(newText, _rootContainerInstance, _currentHostContext2, workInProgress);
         }
       }
       return null;
     }
   case ForwardRef:
     return null;
   case TimeoutComponent:
     return null;
   case Fragment:
     return null;
   case Mode:
     return null;
   case Profiler:
     return null;
   case HostPortal:
     popHostContainer(workInProgress);
     updateHostContainer(workInProgress);
     return null;
   case ContextProvider:
     // Pop provider fiber
     popProvider(workInProgress);
     return null;
   case ContextConsumer:
     return null;
   // Error cases
   case IndeterminateComponent:
     invariant_1(false, 'An indeterminate component should have become determinate before completing. This error is likely caused by a bug in React. Please file an issue.');
   // eslint-disable-next-line no-fallthrough
   default:
     invariant_1(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
 }
}

// This module is forked in different environments.
// By default, return `true` to log errors to the console.
// Forks can return `false` if this isn't desirable.
function showErrorDialog(capturedError) {
 return true;
}

function logCapturedError(capturedError) {
 var logError = showErrorDialog(capturedError);

 // Allow injected showErrorDialog() to prevent default console.error logging.
 // This enables renderers like ReactNative to better manage redbox behavior.
 if (logError === false) {
   return;
 }

 var error = capturedError.error;
 var suppressLogging = error && error.suppressReactErrorLogging;
 if (suppressLogging) {
   return;
 }

 {
   var componentName = capturedError.componentName,
       componentStack = capturedError.componentStack,
       errorBoundaryName = capturedError.errorBoundaryName,
       errorBoundaryFound = capturedError.errorBoundaryFound,
       willRetry = capturedError.willRetry;


   var componentNameMessage = componentName ? 'The above error occurred in the <' + componentName + '> component:' : 'The above error occurred in one of your React components:';

   var errorBoundaryMessage = void 0;
   // errorBoundaryFound check is sufficient; errorBoundaryName check is to satisfy Flow.
   if (errorBoundaryFound && errorBoundaryName) {
     if (willRetry) {
       errorBoundaryMessage = 'React will try to recreate this component tree from scratch ' + ('using the error boundary you provided, ' + errorBoundaryName + '.');
     } else {
       errorBoundaryMessage = 'This error was initially handled by the error boundary ' + errorBoundaryName + '.\n' + 'Recreating the tree from scratch failed so React will unmount the tree.';
     }
   } else {
     errorBoundaryMessage = 'Consider adding an error boundary to your tree to customize error handling behavior.\n' + 'Visit https://fb.me/react-error-boundaries to learn more about error boundaries.';
   }
   var combinedMessage = '' + componentNameMessage + componentStack + '\n\n' + ('' + errorBoundaryMessage);

   // In development, we provide our own message with just the component stack.
   // We don't include the original error message and JS stack because the browser
   // has already printed it. Even if the application swallows the error, it is still
   // displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.
   console.error(combinedMessage);
 }
}

var invokeGuardedCallback$3 = ReactErrorUtils.invokeGuardedCallback;
var hasCaughtError$1 = ReactErrorUtils.hasCaughtError;
var clearCaughtError$1 = ReactErrorUtils.clearCaughtError;


var didWarnAboutUndefinedSnapshotBeforeUpdate = null;
{
 didWarnAboutUndefinedSnapshotBeforeUpdate = new Set();
}

function logError(boundary, errorInfo) {
 var source = errorInfo.source;
 var stack = errorInfo.stack;
 if (stack === null && source !== null) {
   stack = getStackAddendumByWorkInProgressFiber(source);
 }

 var capturedError = {
   componentName: source !== null ? getComponentName(source) : null,
   componentStack: stack !== null ? stack : '',
   error: errorInfo.value,
   errorBoundary: null,
   errorBoundaryName: null,
   errorBoundaryFound: false,
   willRetry: false
 };

 if (boundary !== null && boundary.tag === ClassComponent) {
   capturedError.errorBoundary = boundary.stateNode;
   capturedError.errorBoundaryName = getComponentName(boundary);
   capturedError.errorBoundaryFound = true;
   capturedError.willRetry = true;
 }

 try {
   logCapturedError(capturedError);
 } catch (e) {
   // Prevent cycle if logCapturedError() throws.
   // A cycle may still occur if logCapturedError renders a component that throws.
   var suppressLogging = e && e.suppressReactErrorLogging;
   if (!suppressLogging) {
     console.error(e);
   }
 }
}

var callComponentWillUnmountWithTimer = function (current, instance) {
 startPhaseTimer(current, 'componentWillUnmount');
 instance.props = current.memoizedProps;
 instance.state = current.memoizedState;
 instance.componentWillUnmount();
 stopPhaseTimer();
};

// Capture errors so they don't interrupt unmounting.
function safelyCallComponentWillUnmount(current, instance) {
 {
   invokeGuardedCallback$3(null, callComponentWillUnmountWithTimer, null, current, instance);
   if (hasCaughtError$1()) {
     var unmountError = clearCaughtError$1();
     captureCommitPhaseError(current, unmountError);
   }
 }
}

function safelyDetachRef(current) {
 var ref = current.ref;
 if (ref !== null) {
   if (typeof ref === 'function') {
     {
       invokeGuardedCallback$3(null, ref, null, null);
       if (hasCaughtError$1()) {
         var refError = clearCaughtError$1();
         captureCommitPhaseError(current, refError);
       }
     }
   } else {
     ref.current = null;
   }
 }
}

function commitBeforeMutationLifeCycles(current, finishedWork) {
 switch (finishedWork.tag) {
   case ClassComponent:
     {
       if (finishedWork.effectTag & Snapshot) {
         if (current !== null) {
           var prevProps = current.memoizedProps;
           var prevState = current.memoizedState;
           startPhaseTimer(finishedWork, 'getSnapshotBeforeUpdate');
           var instance = finishedWork.stateNode;
           instance.props = finishedWork.memoizedProps;
           instance.state = finishedWork.memoizedState;
           var snapshot = instance.getSnapshotBeforeUpdate(prevProps, prevState);
           {
             var didWarnSet = didWarnAboutUndefinedSnapshotBeforeUpdate;
             if (snapshot === undefined && !didWarnSet.has(finishedWork.type)) {
               didWarnSet.add(finishedWork.type);
               warning_1(false, '%s.getSnapshotBeforeUpdate(): A snapshot value (or null) ' + 'must be returned. You have returned undefined.', getComponentName(finishedWork));
             }
           }
           instance.__reactInternalSnapshotBeforeUpdate = snapshot;
           stopPhaseTimer();
         }
       }
       return;
     }
   case HostRoot:
   case HostComponent:
   case HostText:
   case HostPortal:
     // Nothing to do for these component types
     return;
   default:
     {
       invariant_1(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
     }
 }
}

function commitLifeCycles(finishedRoot, current, finishedWork, currentTime, committedExpirationTime) {
 switch (finishedWork.tag) {
   case ClassComponent:
     {
       var instance = finishedWork.stateNode;
       if (finishedWork.effectTag & Update) {
         if (current === null) {
           startPhaseTimer(finishedWork, 'componentDidMount');
           instance.props = finishedWork.memoizedProps;
           instance.state = finishedWork.memoizedState;
           instance.componentDidMount();
           stopPhaseTimer();
         } else {
           var prevProps = current.memoizedProps;
           var prevState = current.memoizedState;
           startPhaseTimer(finishedWork, 'componentDidUpdate');
           instance.props = finishedWork.memoizedProps;
           instance.state = finishedWork.memoizedState;
           instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
           stopPhaseTimer();
         }
       }
       var updateQueue = finishedWork.updateQueue;
       if (updateQueue !== null) {
         instance.props = finishedWork.memoizedProps;
         instance.state = finishedWork.memoizedState;
         commitUpdateQueue(finishedWork, updateQueue, instance, committedExpirationTime);
       }
       return;
     }
   case HostRoot:
     {
       var _updateQueue = finishedWork.updateQueue;
       if (_updateQueue !== null) {
         var _instance = null;
         if (finishedWork.child !== null) {
           switch (finishedWork.child.tag) {
             case HostComponent:
               _instance = getPublicInstance(finishedWork.child.stateNode);
               break;
             case ClassComponent:
               _instance = finishedWork.child.stateNode;
               break;
           }
         }
         commitUpdateQueue(finishedWork, _updateQueue, _instance, committedExpirationTime);
       }
       return;
     }
   case HostComponent:
     {
       var _instance2 = finishedWork.stateNode;

       // Renderers may schedule work to be done after host components are mounted
       // (eg DOM renderer may schedule auto-focus for inputs and form controls).
       // These effects should only be committed when components are first mounted,
       // aka when there is no current/alternate.
       if (current === null && finishedWork.effectTag & Update) {
         var type = finishedWork.type;
         var props = finishedWork.memoizedProps;
         commitMount(_instance2, type, props, finishedWork);
       }

       return;
     }
   case HostText:
     {
       // We have no life-cycles associated with text.
       return;
     }
   case HostPortal:
     {
       // We have no life-cycles associated with portals.
       return;
     }
   case Profiler:
     {
       // We have no life-cycles associated with Profiler.
       return;
     }
   case TimeoutComponent:
     {
       // We have no life-cycles associated with Timeouts.
       return;
     }
   default:
     {
       invariant_1(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
     }
 }
}

function commitAttachRef(finishedWork) {
 var ref = finishedWork.ref;
 if (ref !== null) {
   var instance = finishedWork.stateNode;
   var instanceToUse = void 0;
   switch (finishedWork.tag) {
     case HostComponent:
       instanceToUse = getPublicInstance(instance);
       break;
     default:
       instanceToUse = instance;
   }
   if (typeof ref === 'function') {
     ref(instanceToUse);
   } else {
     {
       if (!ref.hasOwnProperty('current')) {
         warning_1(false, 'Unexpected ref object provided for %s. ' + 'Use either a ref-setter function or React.createRef().%s', getComponentName(finishedWork), getStackAddendumByWorkInProgressFiber(finishedWork));
       }
     }

     ref.current = instanceToUse;
   }
 }
}

function commitDetachRef(current) {
 var currentRef = current.ref;
 if (currentRef !== null) {
   if (typeof currentRef === 'function') {
     currentRef(null);
   } else {
     currentRef.current = null;
   }
 }
}

// User-originating errors (lifecycles and refs) should not interrupt
// deletion, so don't let them throw. Host-originating errors should
// interrupt deletion, so it's okay
function commitUnmount(current) {
 if (typeof onCommitUnmount === 'function') {
   onCommitUnmount(current);
 }

 switch (current.tag) {
   case ClassComponent:
     {
       safelyDetachRef(current);
       var instance = current.stateNode;
       if (typeof instance.componentWillUnmount === 'function') {
         safelyCallComponentWillUnmount(current, instance);
       }
       return;
     }
   case HostComponent:
     {
       safelyDetachRef(current);
       return;
     }
   case HostPortal:
     {
       // TODO: this is recursive.
       // We are also not using this parent because
       // the portal will get pushed immediately.
       if (supportsMutation) {
         unmountHostComponents(current);
       } else if (supportsPersistence) {
         emptyPortalContainer(current);
       }
       return;
     }
 }
}

function commitNestedUnmounts(root) {
 // While we're inside a removed host node we don't want to call
 // removeChild on the inner nodes because they're removed by the top
 // call anyway. We also want to call componentWillUnmount on all
 // composites before this host node is removed from the tree. Therefore
 var node = root;
 while (true) {
   commitUnmount(node);
   // Visit children because they may contain more composite or host nodes.
   // Skip portals because commitUnmount() currently visits them recursively.
   if (node.child !== null && (
   // If we use mutation we drill down into portals using commitUnmount above.
   // If we don't use mutation we drill down into portals here instead.
   !supportsMutation || node.tag !== HostPortal)) {
     node.child.return = node;
     node = node.child;
     continue;
   }
   if (node === root) {
     return;
   }
   while (node.sibling === null) {
     if (node.return === null || node.return === root) {
       return;
     }
     node = node.return;
   }
   node.sibling.return = node.return;
   node = node.sibling;
 }
}

function detachFiber(current) {
 // Cut off the return pointers to disconnect it from the tree. Ideally, we
 // should clear the child pointer of the parent alternate to let this
 // get GC:ed but we don't know which for sure which parent is the current
 // one so we'll settle for GC:ing the subtree of this child. This child
 // itself will be GC:ed when the parent updates the next time.
 current.return = null;
 current.child = null;
 if (current.alternate) {
   current.alternate.child = null;
   current.alternate.return = null;
 }
}

function emptyPortalContainer(current) {
 if (!supportsPersistence) {
   return;
 }

 var portal = current.stateNode;
 var containerInfo = portal.containerInfo;

 var emptyChildSet = createContainerChildSet(containerInfo);
 replaceContainerChildren(containerInfo, emptyChildSet);
}

function commitContainer(finishedWork) {
 if (!supportsPersistence) {
   return;
 }

 switch (finishedWork.tag) {
   case ClassComponent:
     {
       return;
     }
   case HostComponent:
     {
       return;
     }
   case HostText:
     {
       return;
     }
   case HostRoot:
   case HostPortal:
     {
       var portalOrRoot = finishedWork.stateNode;
       var containerInfo = portalOrRoot.containerInfo,
           _pendingChildren = portalOrRoot.pendingChildren;

       replaceContainerChildren(containerInfo, _pendingChildren);
       return;
     }
   default:
     {
       invariant_1(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
     }
 }
}

function getHostParentFiber(fiber) {
 var parent = fiber.return;
 while (parent !== null) {
   if (isHostParent(parent)) {
     return parent;
   }
   parent = parent.return;
 }
 invariant_1(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.');
}

function isHostParent(fiber) {
 return fiber.tag === HostComponent || fiber.tag === HostRoot || fiber.tag === HostPortal;
}

function getHostSibling(fiber) {
 // We're going to search forward into the tree until we find a sibling host
 // node. Unfortunately, if multiple insertions are done in a row we have to
 // search past them. This leads to exponential search for the next sibling.
 var node = fiber;
 siblings: while (true) {
   // If we didn't find anything, let's try the next sibling.
   while (node.sibling === null) {
     if (node.return === null || isHostParent(node.return)) {
       // If we pop out of the root or hit the parent the fiber we are the
       // last sibling.
       return null;
     }
     node = node.return;
   }
   node.sibling.return = node.return;
   node = node.sibling;
   while (node.tag !== HostComponent && node.tag !== HostText) {
     // If it is not host node and, we might have a host node inside it.
     // Try to search down until we find one.
     if (node.effectTag & Placement) {
       // If we don't have a child, try the siblings instead.
       continue siblings;
     }
     // If we don't have a child, try the siblings instead.
     // We also skip portals because they are not part of this host tree.
     if (node.child === null || node.tag === HostPortal) {
       continue siblings;
     } else {
       node.child.return = node;
       node = node.child;
     }
   }
   // Check if this host node is stable or about to be placed.
   if (!(node.effectTag & Placement)) {
     // Found it!
     return node.stateNode;
   }
 }
}

function commitPlacement(finishedWork) {
 if (!supportsMutation) {
   return;
 }

 // Recursively insert all host nodes into the parent.
 var parentFiber = getHostParentFiber(finishedWork);
 var parent = void 0;
 var isContainer = void 0;
 switch (parentFiber.tag) {
   case HostComponent:
     parent = parentFiber.stateNode;
     isContainer = false;
     break;
   case HostRoot:
     parent = parentFiber.stateNode.containerInfo;
     isContainer = true;
     break;
   case HostPortal:
     parent = parentFiber.stateNode.containerInfo;
     isContainer = true;
     break;
   default:
     invariant_1(false, 'Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.');
 }
 if (parentFiber.effectTag & ContentReset) {
   // Reset the text content of the parent before doing any insertions
   resetTextContent(parent);
   // Clear ContentReset from the effect tag
   parentFiber.effectTag &= ~ContentReset;
 }

 var before = getHostSibling(finishedWork);
 // We only have the top Fiber that was inserted but we need recurse down its
 // children to find all the terminal nodes.
 var node = finishedWork;
 while (true) {
   if (node.tag === HostComponent || node.tag === HostText) {
     if (before) {
       if (isContainer) {
         insertInContainerBefore(parent, node.stateNode, before);
       } else {
         insertBefore(parent, node.stateNode, before);
       }
     } else {
       if (isContainer) {
         appendChildToContainer(parent, node.stateNode);
       } else {
         appendChild(parent, node.stateNode);
       }
     }
   } else if (node.tag === HostPortal) {
     // If the insertion itself is a portal, then we don't want to traverse
     // down its children. Instead, we'll get insertions from each child in
     // the portal directly.
   } else if (node.child !== null) {
     node.child.return = node;
     node = node.child;
     continue;
   }
   if (node === finishedWork) {
     return;
   }
   while (node.sibling === null) {
     if (node.return === null || node.return === finishedWork) {
       return;
     }
     node = node.return;
   }
   node.sibling.return = node.return;
   node = node.sibling;
 }
}

function unmountHostComponents(current) {
 // We only have the top Fiber that was inserted but we need recurse down its
 var node = current;

 // Each iteration, currentParent is populated with node's host parent if not
 // currentParentIsValid.
 var currentParentIsValid = false;
 var currentParent = void 0;
 var currentParentIsContainer = void 0;

 while (true) {
   if (!currentParentIsValid) {
     var parent = node.return;
     findParent: while (true) {
       !(parent !== null) ? invariant_1(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.') : void 0;
       switch (parent.tag) {
         case HostComponent:
           currentParent = parent.stateNode;
           currentParentIsContainer = false;
           break findParent;
         case HostRoot:
           currentParent = parent.stateNode.containerInfo;
           currentParentIsContainer = true;
           break findParent;
         case HostPortal:
           currentParent = parent.stateNode.containerInfo;
           currentParentIsContainer = true;
           break findParent;
       }
       parent = parent.return;
     }
     currentParentIsValid = true;
   }

   if (node.tag === HostComponent || node.tag === HostText) {
     commitNestedUnmounts(node);
     // After all the children have unmounted, it is now safe to remove the
     // node from the tree.
     if (currentParentIsContainer) {
       removeChildFromContainer(currentParent, node.stateNode);
     } else {
       removeChild(currentParent, node.stateNode);
     }
     // Don't visit children because we already visited them.
   } else if (node.tag === HostPortal) {
     // When we go into a portal, it becomes the parent to remove from.
     // We will reassign it back when we pop the portal on the way up.
     currentParent = node.stateNode.containerInfo;
     // Visit children because portals might contain host components.
     if (node.child !== null) {
       node.child.return = node;
       node = node.child;
       continue;
     }
   } else {
     commitUnmount(node);
     // Visit children because we may find more host components below.
     if (node.child !== null) {
       node.child.return = node;
       node = node.child;
       continue;
     }
   }
   if (node === current) {
     return;
   }
   while (node.sibling === null) {
     if (node.return === null || node.return === current) {
       return;
     }
     node = node.return;
     if (node.tag === HostPortal) {
       // When we go out of the portal, we need to restore the parent.
       // Since we don't keep a stack of them, we will search for it.
       currentParentIsValid = false;
     }
   }
   node.sibling.return = node.return;
   node = node.sibling;
 }
}

function commitDeletion(current) {
 if (supportsMutation) {
   // Recursively delete all host nodes from the parent.
   // Detach refs and call componentWillUnmount() on the whole subtree.
   unmountHostComponents(current);
 } else {
   // Detach refs and call componentWillUnmount() on the whole subtree.
   commitNestedUnmounts(current);
 }
 detachFiber(current);
}

function commitWork(current, finishedWork) {
 if (!supportsMutation) {
   commitContainer(finishedWork);
   return;
 }

 switch (finishedWork.tag) {
   case ClassComponent:
     {
       return;
     }
   case HostComponent:
     {
       var instance = finishedWork.stateNode;
       if (instance != null) {
         // Commit the work prepared earlier.
         var newProps = finishedWork.memoizedProps;
         // For hydration we reuse the update path but we treat the oldProps
         // as the newProps. The updatePayload will contain the real change in
         // this case.
         var oldProps = current !== null ? current.memoizedProps : newProps;
         var type = finishedWork.type;
         // TODO: Type the updateQueue to be specific to host components.
         var updatePayload = finishedWork.updateQueue;
         finishedWork.updateQueue = null;
         if (updatePayload !== null) {
           commitUpdate(instance, updatePayload, type, oldProps, newProps, finishedWork);
         }
       }
       return;
     }
   case HostText:
     {
       !(finishedWork.stateNode !== null) ? invariant_1(false, 'This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.') : void 0;
       var textInstance = finishedWork.stateNode;
       var newText = finishedWork.memoizedProps;
       // For hydration we reuse the update path but we treat the oldProps
       // as the newProps. The updatePayload will contain the real change in
       // this case.
       var oldText = current !== null ? current.memoizedProps : newText;
       commitTextUpdate(textInstance, oldText, newText);
       return;
     }
   case HostRoot:
     {
       return;
     }
   case Profiler:
     {
       if (enableProfilerTimer) {
         var onRender = finishedWork.memoizedProps.onRender;
         onRender(finishedWork.memoizedProps.id, current === null ? 'mount' : 'update', finishedWork.actualDuration, finishedWork.treeBaseTime, finishedWork.actualStartTime, getCommitTime());
       }
       return;
     }
   case TimeoutComponent:
     {
       return;
     }
   default:
     {
       invariant_1(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
     }
 }
}

function commitResetTextContent(current) {
 if (!supportsMutation) {
   return;
 }
 resetTextContent(current.stateNode);
}

function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
 var update = createUpdate(expirationTime);
 // Unmount the root by rendering null.
 update.tag = CaptureUpdate;
 // Caution: React DevTools currently depends on this property
 // being called "element".
 update.payload = { element: null };
 var error = errorInfo.value;
 update.callback = function () {
   onUncaughtError(error);
   logError(fiber, errorInfo);
 };
 return update;
}

function createClassErrorUpdate(fiber, errorInfo, expirationTime) {
 var update = createUpdate(expirationTime);
 update.tag = CaptureUpdate;
 var getDerivedStateFromCatch = fiber.type.getDerivedStateFromCatch;
 if (enableGetDerivedStateFromCatch && typeof getDerivedStateFromCatch === 'function') {
   var error = errorInfo.value;
   update.payload = function () {
     return getDerivedStateFromCatch(error);
   };
 }

 var inst = fiber.stateNode;
 if (inst !== null && typeof inst.componentDidCatch === 'function') {
   update.callback = function callback() {
     if (!enableGetDerivedStateFromCatch || getDerivedStateFromCatch !== 'function') {
       // To preserve the preexisting retry behavior of error boundaries,
       // we keep track of which ones already failed during this batch.
       // This gets reset before we yield back to the browser.
       // TODO: Warn in strict mode if getDerivedStateFromCatch is
       // not defined.
       markLegacyErrorBoundaryAsFailed(this);
     }
     var error = errorInfo.value;
     var stack = errorInfo.stack;
     logError(fiber, errorInfo);
     this.componentDidCatch(error, {
       componentStack: stack !== null ? stack : ''
     });
   };
 }
 return update;
}

function schedulePing(finishedWork) {
 // Once the promise resolves, we should try rendering the non-
 // placeholder state again.
 var currentTime = recalculateCurrentTime();
 var expirationTime = computeExpirationForFiber(currentTime, finishedWork);
 var recoveryUpdate = createUpdate(expirationTime);
 enqueueUpdate(finishedWork, recoveryUpdate, expirationTime);
 scheduleWork$1(finishedWork, expirationTime);
}

function throwException(root, returnFiber, sourceFiber, value, renderIsExpired, renderExpirationTime, currentTimeMs) {
 // The source fiber did not complete.
 sourceFiber.effectTag |= Incomplete;
 // Its effect list is no longer valid.
 sourceFiber.firstEffect = sourceFiber.lastEffect = null;

 if (enableSuspense && value !== null && typeof value === 'object' && typeof value.then === 'function') {
   // This is a thenable.
   var thenable = value;

   var expirationTimeMs = expirationTimeToMs(renderExpirationTime);
   var startTimeMs = expirationTimeMs - 5000;
   var elapsedMs = currentTimeMs - startTimeMs;
   if (elapsedMs < 0) {
     elapsedMs = 0;
   }
   var remainingTimeMs = expirationTimeMs - currentTimeMs;

   // Find the earliest timeout of all the timeouts in the ancestor path.
   // TODO: Alternatively, we could store the earliest timeout on the context
   // stack, rather than searching on every suspend.
   var _workInProgress = returnFiber;
   var earliestTimeoutMs = -1;
   searchForEarliestTimeout: do {
     if (_workInProgress.tag === TimeoutComponent) {
       var current = _workInProgress.alternate;
       if (current !== null && current.memoizedState === true) {
         // A parent Timeout already committed in a placeholder state. We
         // need to handle this promise immediately. In other words, we
         // should never suspend inside a tree that already expired.
         earliestTimeoutMs = 0;
         break searchForEarliestTimeout;
       }
       var timeoutPropMs = _workInProgress.pendingProps.ms;
       if (typeof timeoutPropMs === 'number') {
         if (timeoutPropMs <= 0) {
           earliestTimeoutMs = 0;
           break searchForEarliestTimeout;
         } else if (earliestTimeoutMs === -1 || timeoutPropMs < earliestTimeoutMs) {
           earliestTimeoutMs = timeoutPropMs;
         }
       } else if (earliestTimeoutMs === -1) {
         earliestTimeoutMs = remainingTimeMs;
       }
     }
     _workInProgress = _workInProgress.return;
   } while (_workInProgress !== null);

   // Compute the remaining time until the timeout.
   var msUntilTimeout = earliestTimeoutMs - elapsedMs;

   if (renderExpirationTime === Never || msUntilTimeout > 0) {
     // There's still time remaining.
     suspendRoot(root, thenable, msUntilTimeout, renderExpirationTime);
     var onResolveOrReject = function () {
       retrySuspendedRoot(root, renderExpirationTime);
     };
     thenable.then(onResolveOrReject, onResolveOrReject);
     return;
   } else {
     // No time remaining. Need to fallback to placeholder.
     // Find the nearest timeout that can be retried.
     _workInProgress = returnFiber;
     do {
       switch (_workInProgress.tag) {
         case HostRoot:
           {
             // The root expired, but no fallback was provided. Throw a
             // helpful error.
             var message = renderExpirationTime === Sync ? 'A synchronous update was suspended, but no fallback UI ' + 'was provided.' : 'An update was suspended for longer than the timeout, ' + 'but no fallback UI was provided.';
             value = new Error(message);
             break;
           }
         case TimeoutComponent:
           {
             if ((_workInProgress.effectTag & DidCapture) === NoEffect) {
               _workInProgress.effectTag |= ShouldCapture;
               var _onResolveOrReject = schedulePing.bind(null, _workInProgress);
               thenable.then(_onResolveOrReject, _onResolveOrReject);
               return;
             }
             // Already captured during this render. Continue to the next
             // Timeout ancestor.
             break;
           }
       }
       _workInProgress = _workInProgress.return;
     } while (_workInProgress !== null);
   }
 }

 // We didn't find a boundary that could handle this type of exception. Start
 // over and traverse parent path again, this time treating the exception
 // as an error.
 value = createCapturedValue(value, sourceFiber);
 var workInProgress = returnFiber;
 do {
   switch (workInProgress.tag) {
     case HostRoot:
       {
         var _errorInfo = value;
         workInProgress.effectTag |= ShouldCapture;
         var update = createRootErrorUpdate(workInProgress, _errorInfo, renderExpirationTime);
         enqueueCapturedUpdate(workInProgress, update, renderExpirationTime);
         return;
       }
     case ClassComponent:
       // Capture and retry
       var errorInfo = value;
       var ctor = workInProgress.type;
       var instance = workInProgress.stateNode;
       if ((workInProgress.effectTag & DidCapture) === NoEffect && (typeof ctor.getDerivedStateFromCatch === 'function' && enableGetDerivedStateFromCatch || instance !== null && typeof instance.componentDidCatch === 'function' && !isAlreadyFailedLegacyErrorBoundary(instance))) {
         workInProgress.effectTag |= ShouldCapture;
         // Schedule the error boundary to re-render using updated state
         var _update = createClassErrorUpdate(workInProgress, errorInfo, renderExpirationTime);
         enqueueCapturedUpdate(workInProgress, _update, renderExpirationTime);
         return;
       }
       break;
     default:
       break;
   }
   workInProgress = workInProgress.return;
 } while (workInProgress !== null);
}

function unwindWork(workInProgress, renderIsExpired, renderExpirationTime) {
 if (enableProfilerTimer) {
   if (workInProgress.mode & ProfileMode) {
     recordElapsedActualRenderTime(workInProgress);
   }
 }

 switch (workInProgress.tag) {
   case ClassComponent:
     {
       popContextProvider(workInProgress);
       var effectTag = workInProgress.effectTag;
       if (effectTag & ShouldCapture) {
         workInProgress.effectTag = effectTag & ~ShouldCapture | DidCapture;
         return workInProgress;
       }
       return null;
     }
   case HostRoot:
     {
       popHostContainer(workInProgress);
       popTopLevelContextObject(workInProgress);
       var _effectTag = workInProgress.effectTag;
       if (_effectTag & ShouldCapture) {
         workInProgress.effectTag = _effectTag & ~ShouldCapture | DidCapture;
         return workInProgress;
       }
       return null;
     }
   case HostComponent:
     {
       popHostContext(workInProgress);
       return null;
     }
   case TimeoutComponent:
     {
       var _effectTag2 = workInProgress.effectTag;
       if (_effectTag2 & ShouldCapture) {
         workInProgress.effectTag = _effectTag2 & ~ShouldCapture | DidCapture;
         return workInProgress;
       }
       return null;
     }
   case HostPortal:
     popHostContainer(workInProgress);
     return null;
   case ContextProvider:
     popProvider(workInProgress);
     return null;
   default:
     return null;
 }
}

function unwindInterruptedWork(interruptedWork) {
 if (enableProfilerTimer) {
   if (interruptedWork.mode & ProfileMode) {
     // Resume in case we're picking up on work that was paused.
     resumeActualRenderTimerIfPaused();
     recordElapsedActualRenderTime(interruptedWork);
   }
 }

 switch (interruptedWork.tag) {
   case ClassComponent:
     {
       popContextProvider(interruptedWork);
       break;
     }
   case HostRoot:
     {
       popHostContainer(interruptedWork);
       popTopLevelContextObject(interruptedWork);
       break;
     }
   case HostComponent:
     {
       popHostContext(interruptedWork);
       break;
     }
   case HostPortal:
     popHostContainer(interruptedWork);
     break;
   case ContextProvider:
     popProvider(interruptedWork);
     break;
   default:
     break;
 }
}

var invokeGuardedCallback$2 = ReactErrorUtils.invokeGuardedCallback;
var hasCaughtError = ReactErrorUtils.hasCaughtError;
var clearCaughtError = ReactErrorUtils.clearCaughtError;


var didWarnAboutStateTransition = void 0;
var didWarnSetStateChildContext = void 0;
var warnAboutUpdateOnUnmounted = void 0;
var warnAboutInvalidUpdates = void 0;

{
 didWarnAboutStateTransition = false;
 didWarnSetStateChildContext = false;
 var didWarnStateUpdateForUnmountedComponent = {};

 warnAboutUpdateOnUnmounted = function (fiber) {
   // We show the whole stack but dedupe on the top component's name because
   // the problematic code almost always lies inside that component.
   var componentName = getComponentName(fiber) || 'ReactClass';
   if (didWarnStateUpdateForUnmountedComponent[componentName]) {
     return;
   }
   warning_1(false, "Can't call setState (or forceUpdate) on an unmounted component. This " + 'is a no-op, but it indicates a memory leak in your application. To ' + 'fix, cancel all subscriptions and asynchronous tasks in the ' + 'componentWillUnmount method.%s', getStackAddendumByWorkInProgressFiber(fiber));
   didWarnStateUpdateForUnmountedComponent[componentName] = true;
 };

 warnAboutInvalidUpdates = function (instance) {
   switch (ReactDebugCurrentFiber.phase) {
     case 'getChildContext':
       if (didWarnSetStateChildContext) {
         return;
       }
       warning_1(false, 'setState(...): Cannot call setState() inside getChildContext()');
       didWarnSetStateChildContext = true;
       break;
     case 'render':
       if (didWarnAboutStateTransition) {
         return;
       }
       warning_1(false, 'Cannot update during an existing state transition (such as within ' + "`render` or another component's constructor). Render methods should " + 'be a pure function of props and state; constructor side-effects are ' + 'an anti-pattern, but can be moved to `componentWillMount`.');
       didWarnAboutStateTransition = true;
       break;
   }
 };
}

// Represents the current time in ms.
var originalStartTimeMs = now();
var mostRecentCurrentTime = msToExpirationTime(0);
var mostRecentCurrentTimeMs = originalStartTimeMs;

// Used to ensure computeUniqueAsyncExpiration is monotonically increases.
var lastUniqueAsyncExpiration = 0;

// Represents the expiration time that incoming updates should use. (If this
// is NoWork, use the default strategy: async updates in async mode, sync
// updates in sync mode.)
var expirationContext = NoWork;

var isWorking = false;

// The next work in progress fiber that we're currently working on.
var nextUnitOfWork = null;
var nextRoot = null;
// The time at which we're currently rendering work.
var nextRenderExpirationTime = NoWork;
var nextLatestTimeoutMs = -1;
var nextRenderIsExpired = false;

// The next fiber with an effect that we're currently committing.
var nextEffect = null;

var isCommitting$1 = false;

var isRootReadyForCommit = false;

var legacyErrorBoundariesThatAlreadyFailed = null;

// Used for performance tracking.
var interruptedBy = null;

var stashedWorkInProgressProperties = void 0;
var replayUnitOfWork = void 0;
var isReplayingFailedUnitOfWork = void 0;
var originalReplayError = void 0;
var rethrowOriginalError = void 0;
if (true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
 stashedWorkInProgressProperties = null;
 isReplayingFailedUnitOfWork = false;
 originalReplayError = null;
 replayUnitOfWork = function (failedUnitOfWork, thrownValue, isAsync) {
   if (thrownValue !== null && typeof thrownValue === 'object' && typeof thrownValue.then === 'function') {
     // Don't replay promises. Treat everything else like an error.
     // TODO: Need to figure out a different strategy if/when we add
     // support for catching other types.
     return;
   }

   // Restore the original state of the work-in-progress
   if (stashedWorkInProgressProperties === null) {
     // This should never happen. Don't throw because this code is DEV-only.
     warning_1(false, 'Could not replay rendering after an error. This is likely a bug in React. ' + 'Please file an issue.');
     return;
   }
   assignFiberPropertiesInDEV(failedUnitOfWork, stashedWorkInProgressProperties);

   switch (failedUnitOfWork.tag) {
     case HostRoot:
       popHostContainer(failedUnitOfWork);
       popTopLevelContextObject(failedUnitOfWork);
       break;
     case HostComponent:
       popHostContext(failedUnitOfWork);
       break;
     case ClassComponent:
       popContextProvider(failedUnitOfWork);
       break;
     case HostPortal:
       popHostContainer(failedUnitOfWork);
       break;
     case ContextProvider:
       popProvider(failedUnitOfWork);
       break;
   }
   // Replay the begin phase.
   isReplayingFailedUnitOfWork = true;
   originalReplayError = thrownValue;
   invokeGuardedCallback$2(null, workLoop, null, isAsync);
   isReplayingFailedUnitOfWork = false;
   originalReplayError = null;
   if (hasCaughtError()) {
     clearCaughtError();

     if (enableProfilerTimer) {
       if (failedUnitOfWork.mode & ProfileMode) {
         recordElapsedActualRenderTime(failedUnitOfWork);
       }

       // Stop "base" render timer again (after the re-thrown error).
       stopBaseRenderTimerIfRunning();
     }
   } else {
     // If the begin phase did not fail the second time, set this pointer
     // back to the original value.
     nextUnitOfWork = failedUnitOfWork;
   }
 };
 rethrowOriginalError = function () {
   throw originalReplayError;
 };
}

function resetStack() {
 if (nextUnitOfWork !== null) {
   var interruptedWork = nextUnitOfWork.return;
   while (interruptedWork !== null) {
     unwindInterruptedWork(interruptedWork);
     interruptedWork = interruptedWork.return;
   }
 }

 {
   ReactStrictModeWarnings.discardPendingWarnings();
   checkThatStackIsEmpty();
 }

 nextRoot = null;
 nextRenderExpirationTime = NoWork;
 nextLatestTimeoutMs = -1;
 nextRenderIsExpired = false;
 nextUnitOfWork = null;

 isRootReadyForCommit = false;
}

function commitAllHostEffects() {
 while (nextEffect !== null) {
   {
     ReactDebugCurrentFiber.setCurrentFiber(nextEffect);
   }
   recordEffect();

   var effectTag = nextEffect.effectTag;

   if (effectTag & ContentReset) {
     commitResetTextContent(nextEffect);
   }

   if (effectTag & Ref) {
     var current = nextEffect.alternate;
     if (current !== null) {
       commitDetachRef(current);
     }
   }

   // The following switch statement is only concerned about placement,
   // updates, and deletions. To avoid needing to add a case for every
   // possible bitmap value, we remove the secondary effects from the
   // effect tag and switch on that value.
   var primaryEffectTag = effectTag & (Placement | Update | Deletion);
   switch (primaryEffectTag) {
     case Placement:
       {
         commitPlacement(nextEffect);
         // Clear the "placement" from effect tag so that we know that this is inserted, before
         // any life-cycles like componentDidMount gets called.
         // TODO: findDOMNode doesn't rely on this any more but isMounted
         // does and isMounted is deprecated anyway so we should be able
         // to kill this.
         nextEffect.effectTag &= ~Placement;
         break;
       }
     case PlacementAndUpdate:
       {
         // Placement
         commitPlacement(nextEffect);
         // Clear the "placement" from effect tag so that we know that this is inserted, before
         // any life-cycles like componentDidMount gets called.
         nextEffect.effectTag &= ~Placement;

         // Update
         var _current = nextEffect.alternate;
         commitWork(_current, nextEffect);
         break;
       }
     case Update:
       {
         var _current2 = nextEffect.alternate;
         commitWork(_current2, nextEffect);
         break;
       }
     case Deletion:
       {
         commitDeletion(nextEffect);
         break;
       }
   }
   nextEffect = nextEffect.nextEffect;
 }

 {
   ReactDebugCurrentFiber.resetCurrentFiber();
 }
}

function commitBeforeMutationLifecycles() {
 while (nextEffect !== null) {
   var effectTag = nextEffect.effectTag;

   if (effectTag & Snapshot) {
     recordEffect();
     var current = nextEffect.alternate;
     commitBeforeMutationLifeCycles(current, nextEffect);
   }

   // Don't cleanup effects yet;
   // This will be done by commitAllLifeCycles()
   nextEffect = nextEffect.nextEffect;
 }
}

function commitAllLifeCycles(finishedRoot, currentTime, committedExpirationTime) {
 {
   ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings();

   if (warnAboutDeprecatedLifecycles) {
     ReactStrictModeWarnings.flushPendingDeprecationWarnings();
   }

   if (warnAboutLegacyContextAPI) {
     ReactStrictModeWarnings.flushLegacyContextWarning();
   }
 }
 while (nextEffect !== null) {
   var effectTag = nextEffect.effectTag;

   if (effectTag & (Update | Callback)) {
     recordEffect();
     var current = nextEffect.alternate;
     commitLifeCycles(finishedRoot, current, nextEffect, currentTime, committedExpirationTime);
   }

   if (effectTag & Ref) {
     recordEffect();
     commitAttachRef(nextEffect);
   }

   var next = nextEffect.nextEffect;
   // Ensure that we clean these up so that we don't accidentally keep them.
   // I'm not actually sure this matters because we can't reset firstEffect
   // and lastEffect since they're on every node, not just the effectful
   // ones. So we have to clean everything as we reuse nodes anyway.
   nextEffect.nextEffect = null;
   // Ensure that we reset the effectTag here so that we can rely on effect
   // tags to reason about the current life-cycle.
   nextEffect = next;
 }
}

function isAlreadyFailedLegacyErrorBoundary(instance) {
 return legacyErrorBoundariesThatAlreadyFailed !== null && legacyErrorBoundariesThatAlreadyFailed.has(instance);
}

function markLegacyErrorBoundaryAsFailed(instance) {
 if (legacyErrorBoundariesThatAlreadyFailed === null) {
   legacyErrorBoundariesThatAlreadyFailed = new Set([instance]);
 } else {
   legacyErrorBoundariesThatAlreadyFailed.add(instance);
 }
}

function commitRoot(finishedWork) {
 isWorking = true;
 isCommitting$1 = true;
 startCommitTimer();

 var root = finishedWork.stateNode;
 !(root.current !== finishedWork) ? invariant_1(false, 'Cannot commit the same tree as before. This is probably a bug related to the return field. This error is likely caused by a bug in React. Please file an issue.') : void 0;
 var committedExpirationTime = root.pendingCommitExpirationTime;
 !(committedExpirationTime !== NoWork) ? invariant_1(false, 'Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
 root.pendingCommitExpirationTime = NoWork;

 var currentTime = recalculateCurrentTime();

 // Reset this to null before calling lifecycles
 ReactCurrentOwner.current = null;

 var firstEffect = void 0;
 if (finishedWork.effectTag > PerformedWork) {
   // A fiber's effect list consists only of its children, not itself. So if
   // the root has an effect, we need to add it to the end of the list. The
   // resulting list is the set that would belong to the root's parent, if
   // it had one; that is, all the effects in the tree including the root.
   if (finishedWork.lastEffect !== null) {
     finishedWork.lastEffect.nextEffect = finishedWork;
     firstEffect = finishedWork.firstEffect;
   } else {
     firstEffect = finishedWork;
   }
 } else {
   // There is no effect on the root.
   firstEffect = finishedWork.firstEffect;
 }

 prepareForCommit(root.containerInfo);

 // Invoke instances of getSnapshotBeforeUpdate before mutation.
 nextEffect = firstEffect;
 startCommitSnapshotEffectsTimer();
 while (nextEffect !== null) {
   var didError = false;
   var error = void 0;
   {
     invokeGuardedCallback$2(null, commitBeforeMutationLifecycles, null);
     if (hasCaughtError()) {
       didError = true;
       error = clearCaughtError();
     }
   }
   if (didError) {
     !(nextEffect !== null) ? invariant_1(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
     captureCommitPhaseError(nextEffect, error);
     // Clean-up
     if (nextEffect !== null) {
       nextEffect = nextEffect.nextEffect;
     }
   }
 }
 stopCommitSnapshotEffectsTimer();

 if (enableProfilerTimer) {
   // Mark the current commit time to be shared by all Profilers in this batch.
   // This enables them to be grouped later.
   recordCommitTime();
 }

 // Commit all the side-effects within a tree. We'll do this in two passes.
 // The first pass performs all the host insertions, updates, deletions and
 // ref unmounts.
 nextEffect = firstEffect;
 startCommitHostEffectsTimer();
 while (nextEffect !== null) {
   var _didError = false;
   var _error = void 0;
   {
     invokeGuardedCallback$2(null, commitAllHostEffects, null);
     if (hasCaughtError()) {
       _didError = true;
       _error = clearCaughtError();
     }
   }
   if (_didError) {
     !(nextEffect !== null) ? invariant_1(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
     captureCommitPhaseError(nextEffect, _error);
     // Clean-up
     if (nextEffect !== null) {
       nextEffect = nextEffect.nextEffect;
     }
   }
 }
 stopCommitHostEffectsTimer();

 resetAfterCommit(root.containerInfo);

 // The work-in-progress tree is now the current tree. This must come after
 // the first pass of the commit phase, so that the previous tree is still
 // current during componentWillUnmount, but before the second pass, so that
 // the finished work is current during componentDidMount/Update.
 root.current = finishedWork;

 // In the second pass we'll perform all life-cycles and ref callbacks.
 // Life-cycles happen as a separate pass so that all placements, updates,
 // and deletions in the entire tree have already been invoked.
 // This pass also triggers any renderer-specific initial effects.
 nextEffect = firstEffect;
 startCommitLifeCyclesTimer();
 while (nextEffect !== null) {
   var _didError2 = false;
   var _error2 = void 0;
   {
     invokeGuardedCallback$2(null, commitAllLifeCycles, null, root, currentTime, committedExpirationTime);
     if (hasCaughtError()) {
       _didError2 = true;
       _error2 = clearCaughtError();
     }
   }
   if (_didError2) {
     !(nextEffect !== null) ? invariant_1(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
     captureCommitPhaseError(nextEffect, _error2);
     if (nextEffect !== null) {
       nextEffect = nextEffect.nextEffect;
     }
   }
 }

 if (enableProfilerTimer) {
   {
     checkActualRenderTimeStackEmpty();
   }
   resetActualRenderTimer();
 }

 isCommitting$1 = false;
 isWorking = false;
 stopCommitLifeCyclesTimer();
 stopCommitTimer();
 if (typeof onCommitRoot === 'function') {
   onCommitRoot(finishedWork.stateNode);
 }
 if (true && ReactFiberInstrumentation_1.debugTool) {
   ReactFiberInstrumentation_1.debugTool.onCommitWork(finishedWork);
 }

 markCommittedPriorityLevels(root, currentTime, root.current.expirationTime);
 var remainingTime = findNextPendingPriorityLevel(root);
 if (remainingTime === NoWork) {
   // If there's no remaining work, we can clear the set of already failed
   // error boundaries.
   legacyErrorBoundariesThatAlreadyFailed = null;
 }
 return remainingTime;
}

function resetExpirationTime(workInProgress, renderTime) {
 if (renderTime !== Never && workInProgress.expirationTime === Never) {
   // The children of this component are hidden. Don't bubble their
   // expiration times.
   return;
 }

 // Check for pending updates.
 var newExpirationTime = NoWork;
 switch (workInProgress.tag) {
   case HostRoot:
   case ClassComponent:
     {
       var updateQueue = workInProgress.updateQueue;
       if (updateQueue !== null) {
         newExpirationTime = updateQueue.expirationTime;
       }
     }
 }

 // TODO: Calls need to visit stateNode

 // Bubble up the earliest expiration time.
 // (And "base" render timers if that feature flag is enabled)
 if (enableProfilerTimer && workInProgress.mode & ProfileMode) {
   var treeBaseTime = workInProgress.selfBaseTime;
   var child = workInProgress.child;
   while (child !== null) {
     treeBaseTime += child.treeBaseTime;
     if (child.expirationTime !== NoWork && (newExpirationTime === NoWork || newExpirationTime > child.expirationTime)) {
       newExpirationTime = child.expirationTime;
     }
     child = child.sibling;
   }
   workInProgress.treeBaseTime = treeBaseTime;
 } else {
   var _child = workInProgress.child;
   while (_child !== null) {
     if (_child.expirationTime !== NoWork && (newExpirationTime === NoWork || newExpirationTime > _child.expirationTime)) {
       newExpirationTime = _child.expirationTime;
     }
     _child = _child.sibling;
   }
 }

 workInProgress.expirationTime = newExpirationTime;
}

function completeUnitOfWork(workInProgress) {
 // Attempt to complete the current unit of work, then move to the
 // next sibling. If there are no more siblings, return to the
 // parent fiber.
 while (true) {
   // The current, flushed, state of this fiber is the alternate.
   // Ideally nothing should rely on this, but relying on it here
   // means that we don't need an additional field on the work in
   // progress.
   var current = workInProgress.alternate;
   {
     ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
   }

   var returnFiber = workInProgress.return;
   var siblingFiber = workInProgress.sibling;

   if ((workInProgress.effectTag & Incomplete) === NoEffect) {
     // This fiber completed.
     var next = completeWork(current, workInProgress, nextRenderExpirationTime);
     stopWorkTimer(workInProgress);
     resetExpirationTime(workInProgress, nextRenderExpirationTime);
     {
       ReactDebugCurrentFiber.resetCurrentFiber();
     }

     if (next !== null) {
       stopWorkTimer(workInProgress);
       if (true && ReactFiberInstrumentation_1.debugTool) {
         ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
       }
       // If completing this work spawned new work, do that next. We'll come
       // back here again.
       return next;
     }

     if (returnFiber !== null &&
     // Do not append effects to parents if a sibling failed to complete
     (returnFiber.effectTag & Incomplete) === NoEffect) {
       // Append all the effects of the subtree and this fiber onto the effect
       // list of the parent. The completion order of the children affects the
       // side-effect order.
       if (returnFiber.firstEffect === null) {
         returnFiber.firstEffect = workInProgress.firstEffect;
       }
       if (workInProgress.lastEffect !== null) {
         if (returnFiber.lastEffect !== null) {
           returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
         }
         returnFiber.lastEffect = workInProgress.lastEffect;
       }

       // If this fiber had side-effects, we append it AFTER the children's
       // side-effects. We can perform certain side-effects earlier if
       // needed, by doing multiple passes over the effect list. We don't want
       // to schedule our own side-effect on our own list because if end up
       // reusing children we'll schedule this effect onto itself since we're
       // at the end.
       var effectTag = workInProgress.effectTag;
       // Skip both NoWork and PerformedWork tags when creating the effect list.
       // PerformedWork effect is read by React DevTools but shouldn't be committed.
       if (effectTag > PerformedWork) {
         if (returnFiber.lastEffect !== null) {
           returnFiber.lastEffect.nextEffect = workInProgress;
         } else {
           returnFiber.firstEffect = workInProgress;
         }
         returnFiber.lastEffect = workInProgress;
       }
     }

     if (true && ReactFiberInstrumentation_1.debugTool) {
       ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
     }

     if (siblingFiber !== null) {
       // If there is more work to do in this returnFiber, do that next.
       return siblingFiber;
     } else if (returnFiber !== null) {
       // If there's no more work in this returnFiber. Complete the returnFiber.
       workInProgress = returnFiber;
       continue;
     } else {
       // We've reached the root.
       isRootReadyForCommit = true;
       return null;
     }
   } else {
     // This fiber did not complete because something threw. Pop values off
     // the stack without entering the complete phase. If this is a boundary,
     // capture values if possible.
     var _next = unwindWork(workInProgress, nextRenderIsExpired, nextRenderExpirationTime);
     // Because this fiber did not complete, don't reset its expiration time.
     if (workInProgress.effectTag & DidCapture) {
       // Restarting an error boundary
       stopFailedWorkTimer(workInProgress);
     } else {
       stopWorkTimer(workInProgress);
     }

     {
       ReactDebugCurrentFiber.resetCurrentFiber();
     }

     if (_next !== null) {
       stopWorkTimer(workInProgress);
       if (true && ReactFiberInstrumentation_1.debugTool) {
         ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
       }
       // If completing this work spawned new work, do that next. We'll come
       // back here again.
       // Since we're restarting, remove anything that is not a host effect
       // from the effect tag.
       _next.effectTag &= HostEffectMask;
       return _next;
     }

     if (returnFiber !== null) {
       // Mark the parent fiber as incomplete and clear its effect list.
       returnFiber.firstEffect = returnFiber.lastEffect = null;
       returnFiber.effectTag |= Incomplete;
     }

     if (true && ReactFiberInstrumentation_1.debugTool) {
       ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
     }

     if (siblingFiber !== null) {
       // If there is more work to do in this returnFiber, do that next.
       return siblingFiber;
     } else if (returnFiber !== null) {
       // If there's no more work in this returnFiber. Complete the returnFiber.
       workInProgress = returnFiber;
       continue;
     } else {
       return null;
     }
   }
 }

 // Without this explicit null return Flow complains of invalid return type
 // TODO Remove the above while(true) loop
 // eslint-disable-next-line no-unreachable
 return null;
}

function performUnitOfWork(workInProgress) {
 // The current, flushed, state of this fiber is the alternate.
 // Ideally nothing should rely on this, but relying on it here
 // means that we don't need an additional field on the work in
 // progress.
 var current = workInProgress.alternate;

 // See if beginning this work spawns more work.
 startWorkTimer(workInProgress);
 {
   ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
 }

 if (true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
   stashedWorkInProgressProperties = assignFiberPropertiesInDEV(stashedWorkInProgressProperties, workInProgress);
 }

 var next = void 0;
 if (enableProfilerTimer) {
   if (workInProgress.mode & ProfileMode) {
     startBaseRenderTimer();
   }

   next = beginWork(current, workInProgress, nextRenderExpirationTime);

   if (workInProgress.mode & ProfileMode) {
     // Update "base" time if the render wasn't bailed out on.
     recordElapsedBaseRenderTimeIfRunning(workInProgress);
     stopBaseRenderTimerIfRunning();
   }
 } else {
   next = beginWork(current, workInProgress, nextRenderExpirationTime);
 }

 {
   ReactDebugCurrentFiber.resetCurrentFiber();
   if (isReplayingFailedUnitOfWork) {
     // Currently replaying a failed unit of work. This should be unreachable,
     // because the render phase is meant to be idempotent, and it should
     // have thrown again. Since it didn't, rethrow the original error, so
     // React's internal stack is not misaligned.
     rethrowOriginalError();
   }
 }
 if (true && ReactFiberInstrumentation_1.debugTool) {
   ReactFiberInstrumentation_1.debugTool.onBeginWork(workInProgress);
 }

 if (next === null) {
   // If this doesn't spawn new work, complete the current work.
   next = completeUnitOfWork(workInProgress);
 }

 ReactCurrentOwner.current = null;

 return next;
}

function workLoop(isAsync) {
 if (!isAsync) {
   // Flush all expired work.
   while (nextUnitOfWork !== null) {
     nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
   }
 } else {
   // Flush asynchronous work until the deadline runs out of time.
   while (nextUnitOfWork !== null && !shouldYield()) {
     nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
   }

   if (enableProfilerTimer) {
     // If we didn't finish, pause the "actual" render timer.
     // We'll restart it when we resume work.
     pauseActualRenderTimerIfRunning();
   }
 }
}

function renderRoot(root, expirationTime, isAsync) {
 !!isWorking ? invariant_1(false, 'renderRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;
 isWorking = true;

 // Check if we're starting from a fresh stack, or if we're resuming from
 // previously yielded work.
 if (expirationTime !== nextRenderExpirationTime || root !== nextRoot || nextUnitOfWork === null) {
   // Reset the stack and start working from the root.
   resetStack();
   nextRoot = root;
   nextRenderExpirationTime = expirationTime;
   nextLatestTimeoutMs = -1;
   nextUnitOfWork = createWorkInProgress(nextRoot.current, null, nextRenderExpirationTime);
   root.pendingCommitExpirationTime = NoWork;
 }

 var didFatal = false;

 nextRenderIsExpired = !isAsync || nextRenderExpirationTime <= mostRecentCurrentTime;

 startWorkLoopTimer(nextUnitOfWork);

 do {
   try {
     workLoop(isAsync);
   } catch (thrownValue) {
     if (enableProfilerTimer) {
       // Stop "base" render timer in the event of an error.
       stopBaseRenderTimerIfRunning();
     }

     if (nextUnitOfWork === null) {
       // This is a fatal error.
       didFatal = true;
       onUncaughtError(thrownValue);
     } else {
       {
         // Reset global debug state
         // We assume this is defined in DEV
         resetCurrentlyProcessingQueue();
       }

       var failedUnitOfWork = nextUnitOfWork;
       if (true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
         replayUnitOfWork(failedUnitOfWork, thrownValue, isAsync);
       }

       // TODO: we already know this isn't true in some cases.
       // At least this shows a nicer error message until we figure out the cause.
       // https://github.com/facebook/react/issues/12449#issuecomment-386727431
       !(nextUnitOfWork !== null) ? invariant_1(false, 'Failed to replay rendering after an error. This is likely caused by a bug in React. Please file an issue with a reproducing case to help us find it.') : void 0;

       var sourceFiber = nextUnitOfWork;
       var returnFiber = sourceFiber.return;
       if (returnFiber === null) {
         // This is the root. The root could capture its own errors. However,
         // we don't know if it errors before or after we pushed the host
         // context. This information is needed to avoid a stack mismatch.
         // Because we're not sure, treat this as a fatal error. We could track
         // which phase it fails in, but doesn't seem worth it. At least
         // for now.
         didFatal = true;
         onUncaughtError(thrownValue);
         break;
       }
       throwException(root, returnFiber, sourceFiber, thrownValue, nextRenderIsExpired, nextRenderExpirationTime, mostRecentCurrentTimeMs);
       nextUnitOfWork = completeUnitOfWork(sourceFiber);
     }
   }
   break;
 } while (true);

 // We're done performing work. Time to clean up.
 var didCompleteRoot = false;
 isWorking = false;

 // Yield back to main thread.
 if (didFatal) {
   stopWorkLoopTimer(interruptedBy, didCompleteRoot);
   interruptedBy = null;
   // There was a fatal error.
   {
     resetStackAfterFatalErrorInDev();
   }
   return null;
 } else if (nextUnitOfWork === null) {
   // We reached the root.
   if (isRootReadyForCommit) {
     didCompleteRoot = true;
     stopWorkLoopTimer(interruptedBy, didCompleteRoot);
     interruptedBy = null;
     // The root successfully completed. It's ready for commit.
     root.pendingCommitExpirationTime = expirationTime;
     var finishedWork = root.current.alternate;
     return finishedWork;
   } else {
     // The root did not complete.
     stopWorkLoopTimer(interruptedBy, didCompleteRoot);
     interruptedBy = null;
     !!nextRenderIsExpired ? invariant_1(false, 'Expired work should have completed. This error is likely caused by a bug in React. Please file an issue.') : void 0;
     markSuspendedPriorityLevel(root, expirationTime);
     if (nextLatestTimeoutMs >= 0) {
       setTimeout(function () {
         retrySuspendedRoot(root, expirationTime);
       }, nextLatestTimeoutMs);
     }
     var firstUnblockedExpirationTime = findNextPendingPriorityLevel(root);
     onBlock(firstUnblockedExpirationTime);
     return null;
   }
 } else {
   stopWorkLoopTimer(interruptedBy, didCompleteRoot);
   interruptedBy = null;
   // There's more work to do, but we ran out of time. Yield back to
   // the renderer.
   return null;
 }
}

function dispatch(sourceFiber, value, expirationTime) {
 !(!isWorking || isCommitting$1) ? invariant_1(false, 'dispatch: Cannot dispatch during the render phase.') : void 0;

 var fiber = sourceFiber.return;
 while (fiber !== null) {
   switch (fiber.tag) {
     case ClassComponent:
       var ctor = fiber.type;
       var instance = fiber.stateNode;
       if (typeof ctor.getDerivedStateFromCatch === 'function' || typeof instance.componentDidCatch === 'function' && !isAlreadyFailedLegacyErrorBoundary(instance)) {
         var errorInfo = createCapturedValue(value, sourceFiber);
         var update = createClassErrorUpdate(fiber, errorInfo, expirationTime);
         enqueueUpdate(fiber, update, expirationTime);
         scheduleWork$1(fiber, expirationTime);
         return;
       }
       break;
     case HostRoot:
       {
         var _errorInfo = createCapturedValue(value, sourceFiber);
         var _update = createRootErrorUpdate(fiber, _errorInfo, expirationTime);
         enqueueUpdate(fiber, _update, expirationTime);
         scheduleWork$1(fiber, expirationTime);
         return;
       }
   }
   fiber = fiber.return;
 }

 if (sourceFiber.tag === HostRoot) {
   // Error was thrown at the root. There is no parent, so the root
   // itself should capture it.
   var rootFiber = sourceFiber;
   var _errorInfo2 = createCapturedValue(value, rootFiber);
   var _update2 = createRootErrorUpdate(rootFiber, _errorInfo2, expirationTime);
   enqueueUpdate(rootFiber, _update2, expirationTime);
   scheduleWork$1(rootFiber, expirationTime);
 }
}

function captureCommitPhaseError(fiber, error) {
 return dispatch(fiber, error, Sync);
}

function computeAsyncExpiration(currentTime) {
 // Given the current clock time, returns an expiration time. We use rounding
 // to batch like updates together.
 // Should complete within ~5000ms. 5250ms max.
 var expirationMs = 5000;
 var bucketSizeMs = 250;
 return computeExpirationBucket(currentTime, expirationMs, bucketSizeMs);
}

function computeInteractiveExpiration(currentTime) {
 var expirationMs = void 0;
 // We intentionally set a higher expiration time for interactive updates in
 // dev than in production.
 // If the main thread is being blocked so long that you hit the expiration,
 // it's a problem that could be solved with better scheduling.
 // People will be more likely to notice this and fix it with the long
 // expiration time in development.
 // In production we opt for better UX at the risk of masking scheduling
 // problems, by expiring fast.
 {
   // Should complete within ~500ms. 600ms max.
   expirationMs = 500;
 }
 var bucketSizeMs = 100;
 return computeExpirationBucket(currentTime, expirationMs, bucketSizeMs);
}

// Creates a unique async expiration time.
function computeUniqueAsyncExpiration() {
 var currentTime = recalculateCurrentTime();
 var result = computeAsyncExpiration(currentTime);
 if (result <= lastUniqueAsyncExpiration) {
   // Since we assume the current time monotonically increases, we only hit
   // this branch when computeUniqueAsyncExpiration is fired multiple times
   // within a 200ms window (or whatever the async bucket size is).
   result = lastUniqueAsyncExpiration + 1;
 }
 lastUniqueAsyncExpiration = result;
 return lastUniqueAsyncExpiration;
}

function computeExpirationForFiber(currentTime, fiber) {
 var expirationTime = void 0;
 if (expirationContext !== NoWork) {
   // An explicit expiration context was set;
   expirationTime = expirationContext;
 } else if (isWorking) {
   if (isCommitting$1) {
     // Updates that occur during the commit phase should have sync priority
     // by default.
     expirationTime = Sync;
   } else {
     // Updates during the render phase should expire at the same time as
     // the work that is being rendered.
     expirationTime = nextRenderExpirationTime;
   }
 } else {
   // No explicit expiration context was set, and we're not currently
   // performing work. Calculate a new expiration time.
   if (fiber.mode & AsyncMode) {
     if (isBatchingInteractiveUpdates) {
       // This is an interactive update
       expirationTime = computeInteractiveExpiration(currentTime);
     } else {
       // This is an async update
       expirationTime = computeAsyncExpiration(currentTime);
     }
   } else {
     // This is a sync update
     expirationTime = Sync;
   }
 }
 if (isBatchingInteractiveUpdates) {
   // This is an interactive update. Keep track of the lowest pending
   // interactive expiration time. This allows us to synchronously flush
   // all interactive updates when needed.
   if (lowestPendingInteractiveExpirationTime === NoWork || expirationTime > lowestPendingInteractiveExpirationTime) {
     lowestPendingInteractiveExpirationTime = expirationTime;
   }
 }
 return expirationTime;
}

// TODO: Rename this to scheduleTimeout or something
function suspendRoot(root, thenable, timeoutMs, suspendedTime) {
 // Schedule the timeout.
 if (timeoutMs >= 0 && nextLatestTimeoutMs < timeoutMs) {
   nextLatestTimeoutMs = timeoutMs;
 }
}

function retrySuspendedRoot(root, suspendedTime) {
 markPingedPriorityLevel(root, suspendedTime);
 var retryTime = findNextPendingPriorityLevel(root);
 if (retryTime !== NoWork) {
   requestRetry(root, retryTime);
 }
}

function scheduleWork$1(fiber, expirationTime) {
 recordScheduleUpdate();

 {
   if (fiber.tag === ClassComponent) {
     var instance = fiber.stateNode;
     warnAboutInvalidUpdates(instance);
   }
 }

 var node = fiber;
 while (node !== null) {
   // Walk the parent path to the root and update each node's
   // expiration time.
   if (node.expirationTime === NoWork || node.expirationTime > expirationTime) {
     node.expirationTime = expirationTime;
   }
   if (node.alternate !== null) {
     if (node.alternate.expirationTime === NoWork || node.alternate.expirationTime > expirationTime) {
       node.alternate.expirationTime = expirationTime;
     }
   }
   if (node.return === null) {
     if (node.tag === HostRoot) {
       var root = node.stateNode;
       if (!isWorking && nextRenderExpirationTime !== NoWork && expirationTime < nextRenderExpirationTime) {
         // This is an interruption. (Used for performance tracking.)
         interruptedBy = fiber;
         resetStack();
       }
       markPendingPriorityLevel(root, expirationTime);
       var nextExpirationTimeToWorkOn = findNextPendingPriorityLevel(root);
       if (
       // If we're in the render phase, we don't need to schedule this root
       // for an update, because we'll do it before we exit...
       !isWorking || isCommitting$1 ||
       // ...unless this is a different root than the one we're rendering.
       nextRoot !== root) {
         requestWork(root, nextExpirationTimeToWorkOn);
       }
       if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
         invariant_1(false, 'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.');
       }
     } else {
       {
         if (fiber.tag === ClassComponent) {
           warnAboutUpdateOnUnmounted(fiber);
         }
       }
       return;
     }
   }
   node = node.return;
 }
}

function recalculateCurrentTime() {
 // Subtract initial time so it fits inside 32bits
 mostRecentCurrentTimeMs = now() - originalStartTimeMs;
 mostRecentCurrentTime = msToExpirationTime(mostRecentCurrentTimeMs);
 return mostRecentCurrentTime;
}

function deferredUpdates(fn) {
 var previousExpirationContext = expirationContext;
 var currentTime = recalculateCurrentTime();
 expirationContext = computeAsyncExpiration(currentTime);
 try {
   return fn();
 } finally {
   expirationContext = previousExpirationContext;
 }
}
function syncUpdates(fn, a, b, c, d) {
 var previousExpirationContext = expirationContext;
 expirationContext = Sync;
 try {
   return fn(a, b, c, d);
 } finally {
   expirationContext = previousExpirationContext;
 }
}

// TODO: Everything below this is written as if it has been lifted to the
// renderers. I'll do this in a follow-up.

// Linked-list of roots
var firstScheduledRoot = null;
var lastScheduledRoot = null;

var callbackExpirationTime = NoWork;
var callbackID = void 0;
var isRendering = false;
var nextFlushedRoot = null;
var nextFlushedExpirationTime = NoWork;
var lowestPendingInteractiveExpirationTime = NoWork;
var deadlineDidExpire = false;
var hasUnhandledError = false;
var unhandledError = null;
var deadline = null;

var isBatchingUpdates = false;
var isUnbatchingUpdates = false;
var isBatchingInteractiveUpdates = false;

var completedBatches = null;

// Use these to prevent an infinite loop of nested updates
var NESTED_UPDATE_LIMIT = 1000;
var nestedUpdateCount = 0;

var timeHeuristicForUnitOfWork = 1;

function scheduleCallbackWithExpiration(expirationTime) {
 if (callbackExpirationTime !== NoWork) {
   // A callback is already scheduled. Check its expiration time (timeout).
   if (expirationTime > callbackExpirationTime) {
     // Existing callback has sufficient timeout. Exit.
     return;
   } else {
     if (callbackID !== null) {
       // Existing callback has insufficient timeout. Cancel and schedule a
       // new one.
       cancelDeferredCallback(callbackID);
     }
   }
   // The request callback timer is already running. Don't start a new one.
 } else {
   startRequestCallbackTimer();
 }

 // Compute a timeout for the given expiration time.
 var currentMs = now() - originalStartTimeMs;
 var expirationMs = expirationTimeToMs(expirationTime);
 var timeout = expirationMs - currentMs;

 callbackExpirationTime = expirationTime;
 callbackID = scheduleDeferredCallback(performAsyncWork, { timeout: timeout });
}

function requestRetry(root, expirationTime) {
 if (root.remainingExpirationTime === NoWork || root.remainingExpirationTime < expirationTime) {
   // For a retry, only update the remaining expiration time if it has a
   // *lower priority* than the existing value. This is because, on a retry,
   // we should attempt to coalesce as much as possible.
   requestWork(root, expirationTime);
 }
}

// requestWork is called by the scheduler whenever a root receives an update.
// It's up to the renderer to call renderRoot at some point in the future.
function requestWork(root, expirationTime) {
 addRootToSchedule(root, expirationTime);

 if (isRendering) {
   // Prevent reentrancy. Remaining work will be scheduled at the end of
   // the currently rendering batch.
   return;
 }

 if (isBatchingUpdates) {
   // Flush work at the end of the batch.
   if (isUnbatchingUpdates) {
     // ...unless we're inside unbatchedUpdates, in which case we should
     // flush it now.
     nextFlushedRoot = root;
     nextFlushedExpirationTime = Sync;
     performWorkOnRoot(root, Sync, false);
   }
   return;
 }

 // TODO: Get rid of Sync and use current time?
 if (expirationTime === Sync) {
   performSyncWork();
 } else {
   scheduleCallbackWithExpiration(expirationTime);
 }
}

function addRootToSchedule(root, expirationTime) {
 // Add the root to the schedule.
 // Check if this root is already part of the schedule.
 if (root.nextScheduledRoot === null) {
   // This root is not already scheduled. Add it.
   root.remainingExpirationTime = expirationTime;
   if (lastScheduledRoot === null) {
     firstScheduledRoot = lastScheduledRoot = root;
     root.nextScheduledRoot = root;
   } else {
     lastScheduledRoot.nextScheduledRoot = root;
     lastScheduledRoot = root;
     lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
   }
 } else {
   // This root is already scheduled, but its priority may have increased.
   var remainingExpirationTime = root.remainingExpirationTime;
   if (remainingExpirationTime === NoWork || expirationTime < remainingExpirationTime) {
     // Update the priority.
     root.remainingExpirationTime = expirationTime;
   }
 }
}

function findHighestPriorityRoot() {
 var highestPriorityWork = NoWork;
 var highestPriorityRoot = null;
 if (lastScheduledRoot !== null) {
   var previousScheduledRoot = lastScheduledRoot;
   var root = firstScheduledRoot;
   while (root !== null) {
     var remainingExpirationTime = root.remainingExpirationTime;
     if (remainingExpirationTime === NoWork) {
       // This root no longer has work. Remove it from the scheduler.

       // TODO: This check is redudant, but Flow is confused by the branch
       // below where we set lastScheduledRoot to null, even though we break
       // from the loop right after.
       !(previousScheduledRoot !== null && lastScheduledRoot !== null) ? invariant_1(false, 'Should have a previous and last root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
       if (root === root.nextScheduledRoot) {
         // This is the only root in the list.
         root.nextScheduledRoot = null;
         firstScheduledRoot = lastScheduledRoot = null;
         break;
       } else if (root === firstScheduledRoot) {
         // This is the first root in the list.
         var next = root.nextScheduledRoot;
         firstScheduledRoot = next;
         lastScheduledRoot.nextScheduledRoot = next;
         root.nextScheduledRoot = null;
       } else if (root === lastScheduledRoot) {
         // This is the last root in the list.
         lastScheduledRoot = previousScheduledRoot;
         lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
         root.nextScheduledRoot = null;
         break;
       } else {
         previousScheduledRoot.nextScheduledRoot = root.nextScheduledRoot;
         root.nextScheduledRoot = null;
       }
       root = previousScheduledRoot.nextScheduledRoot;
     } else {
       if (highestPriorityWork === NoWork || remainingExpirationTime < highestPriorityWork) {
         // Update the priority, if it's higher
         highestPriorityWork = remainingExpirationTime;
         highestPriorityRoot = root;
       }
       if (root === lastScheduledRoot) {
         break;
       }
       previousScheduledRoot = root;
       root = root.nextScheduledRoot;
     }
   }
 }

 // If the next root is the same as the previous root, this is a nested
 // update. To prevent an infinite loop, increment the nested update count.
 var previousFlushedRoot = nextFlushedRoot;
 if (previousFlushedRoot !== null && previousFlushedRoot === highestPriorityRoot && highestPriorityWork === Sync) {
   nestedUpdateCount++;
 } else {
   // Reset whenever we switch roots.
   nestedUpdateCount = 0;
 }
 nextFlushedRoot = highestPriorityRoot;
 nextFlushedExpirationTime = highestPriorityWork;
}

function performAsyncWork(dl) {
 performWork(NoWork, true, dl);
}

function performSyncWork() {
 performWork(Sync, false, null);
}

function performWork(minExpirationTime, isAsync, dl) {
 deadline = dl;

 // Keep working on roots until there's no more work, or until the we reach
 // the deadline.
 findHighestPriorityRoot();

 if (enableProfilerTimer) {
   resumeActualRenderTimerIfPaused();
 }

 if (enableUserTimingAPI && deadline !== null) {
   var didExpire = nextFlushedExpirationTime < recalculateCurrentTime();
   var timeout = expirationTimeToMs(nextFlushedExpirationTime);
   stopRequestCallbackTimer(didExpire, timeout);
 }

 if (isAsync) {
   while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && (minExpirationTime === NoWork || minExpirationTime >= nextFlushedExpirationTime) && (!deadlineDidExpire || recalculateCurrentTime() >= nextFlushedExpirationTime)) {
     recalculateCurrentTime();
     performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, !deadlineDidExpire);
     findHighestPriorityRoot();
   }
 } else {
   while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && (minExpirationTime === NoWork || minExpirationTime >= nextFlushedExpirationTime)) {
     performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, false);
     findHighestPriorityRoot();
   }
 }

 // We're done flushing work. Either we ran out of time in this callback,
 // or there's no more work left with sufficient priority.

 // If we're inside a callback, set this to false since we just completed it.
 if (deadline !== null) {
   callbackExpirationTime = NoWork;
   callbackID = null;
 }
 // If there's work left over, schedule a new callback.
 if (nextFlushedExpirationTime !== NoWork) {
   scheduleCallbackWithExpiration(nextFlushedExpirationTime);
 }

 // Clean-up.
 deadline = null;
 deadlineDidExpire = false;

 finishRendering();
}

function flushRoot(root, expirationTime) {
 !!isRendering ? invariant_1(false, 'work.commit(): Cannot commit while already rendering. This likely means you attempted to commit from inside a lifecycle method.') : void 0;
 // Perform work on root as if the given expiration time is the current time.
 // This has the effect of synchronously flushing all work up to and
 // including the given time.
 nextFlushedRoot = root;
 nextFlushedExpirationTime = expirationTime;
 performWorkOnRoot(root, expirationTime, false);
 // Flush any sync work that was scheduled by lifecycles
 performSyncWork();
 finishRendering();
}

function finishRendering() {
 nestedUpdateCount = 0;

 if (completedBatches !== null) {
   var batches = completedBatches;
   completedBatches = null;
   for (var i = 0; i < batches.length; i++) {
     var batch = batches[i];
     try {
       batch._onComplete();
     } catch (error) {
       if (!hasUnhandledError) {
         hasUnhandledError = true;
         unhandledError = error;
       }
     }
   }
 }

 if (hasUnhandledError) {
   var error = unhandledError;
   unhandledError = null;
   hasUnhandledError = false;
   throw error;
 }
}

function performWorkOnRoot(root, expirationTime, isAsync) {
 !!isRendering ? invariant_1(false, 'performWorkOnRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;

 isRendering = true;

 // Check if this is async work or sync/expired work.
 if (!isAsync) {
   // Flush sync work.
   var finishedWork = root.finishedWork;
   if (finishedWork !== null) {
     // This root is already complete. We can commit it.
     completeRoot(root, finishedWork, expirationTime);
   } else {
     finishedWork = renderRoot(root, expirationTime, false);
     if (finishedWork !== null) {
       // We've completed the root. Commit it.
       completeRoot(root, finishedWork, expirationTime);
     }
   }
 } else {
   // Flush async work.
   var _finishedWork = root.finishedWork;
   if (_finishedWork !== null) {
     // This root is already complete. We can commit it.
     completeRoot(root, _finishedWork, expirationTime);
   } else {
     _finishedWork = renderRoot(root, expirationTime, true);
     if (_finishedWork !== null) {
       // We've completed the root. Check the deadline one more time
       // before committing.
       if (!shouldYield()) {
         // Still time left. Commit the root.
         completeRoot(root, _finishedWork, expirationTime);
       } else {
         // There's no time left. Mark this root as complete. We'll come
         // back and commit it later.
         root.finishedWork = _finishedWork;

         if (enableProfilerTimer) {
           // If we didn't finish, pause the "actual" render timer.
           // We'll restart it when we resume work.
           pauseActualRenderTimerIfRunning();
         }
       }
     }
   }
 }

 isRendering = false;
}

function completeRoot(root, finishedWork, expirationTime) {
 // Check if there's a batch that matches this expiration time.
 var firstBatch = root.firstBatch;
 if (firstBatch !== null && firstBatch._expirationTime <= expirationTime) {
   if (completedBatches === null) {
     completedBatches = [firstBatch];
   } else {
     completedBatches.push(firstBatch);
   }
   if (firstBatch._defer) {
     // This root is blocked from committing by a batch. Unschedule it until
     // we receive another update.
     root.finishedWork = finishedWork;
     root.remainingExpirationTime = NoWork;
     return;
   }
 }

 // Commit the root.
 root.finishedWork = null;
 root.remainingExpirationTime = commitRoot(finishedWork);
}

// When working on async work, the reconciler asks the renderer if it should
// yield execution. For DOM, we implement this with requestIdleCallback.
function shouldYield() {
 if (deadline === null) {
   return false;
 }
 if (deadline.timeRemaining() > timeHeuristicForUnitOfWork) {
   // Disregard deadline.didTimeout. Only expired work should be flushed
   // during a timeout. This path is only hit for non-expired work.
   return false;
 }
 deadlineDidExpire = true;
 return true;
}

function onUncaughtError(error) {
 !(nextFlushedRoot !== null) ? invariant_1(false, 'Should be working on a root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
 // Unschedule this root so we don't work on it again until there's
 // another update.
 nextFlushedRoot.remainingExpirationTime = NoWork;
 if (!hasUnhandledError) {
   hasUnhandledError = true;
   unhandledError = error;
 }
}

function onBlock(remainingExpirationTime) {
 !(nextFlushedRoot !== null) ? invariant_1(false, 'Should be working on a root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
 // This root was blocked. Unschedule it until there's another update.
 nextFlushedRoot.remainingExpirationTime = remainingExpirationTime;
}

// TODO: Batching should be implemented at the renderer level, not inside
// the reconciler.
function batchedUpdates$1(fn, a) {
 var previousIsBatchingUpdates = isBatchingUpdates;
 isBatchingUpdates = true;
 try {
   return fn(a);
 } finally {
   isBatchingUpdates = previousIsBatchingUpdates;
   if (!isBatchingUpdates && !isRendering) {
     performSyncWork();
   }
 }
}

// TODO: Batching should be implemented at the renderer level, not inside
// the reconciler.
function unbatchedUpdates(fn, a) {
 if (isBatchingUpdates && !isUnbatchingUpdates) {
   isUnbatchingUpdates = true;
   try {
     return fn(a);
   } finally {
     isUnbatchingUpdates = false;
   }
 }
 return fn(a);
}

// TODO: Batching should be implemented at the renderer level, not within
// the reconciler.
function flushSync(fn, a) {
 !!isRendering ? invariant_1(false, 'flushSync was called from inside a lifecycle method. It cannot be called when React is already rendering.') : void 0;
 var previousIsBatchingUpdates = isBatchingUpdates;
 isBatchingUpdates = true;
 try {
   return syncUpdates(fn, a);
 } finally {
   isBatchingUpdates = previousIsBatchingUpdates;
   performSyncWork();
 }
}

function interactiveUpdates$1(fn, a, b) {
 if (isBatchingInteractiveUpdates) {
   return fn(a, b);
 }
 // If there are any pending interactive updates, synchronously flush them.
 // This needs to happen before we read any handlers, because the effect of
 // the previous event may influence which handlers are called during
 // this event.
 if (!isBatchingUpdates && !isRendering && lowestPendingInteractiveExpirationTime !== NoWork) {
   // Synchronously flush pending interactive updates.
   performWork(lowestPendingInteractiveExpirationTime, false, null);
   lowestPendingInteractiveExpirationTime = NoWork;
 }
 var previousIsBatchingInteractiveUpdates = isBatchingInteractiveUpdates;
 var previousIsBatchingUpdates = isBatchingUpdates;
 isBatchingInteractiveUpdates = true;
 isBatchingUpdates = true;
 try {
   return fn(a, b);
 } finally {
   isBatchingInteractiveUpdates = previousIsBatchingInteractiveUpdates;
   isBatchingUpdates = previousIsBatchingUpdates;
   if (!isBatchingUpdates && !isRendering) {
     performSyncWork();
   }
 }
}

function flushInteractiveUpdates$1() {
 if (!isRendering && lowestPendingInteractiveExpirationTime !== NoWork) {
   // Synchronously flush pending interactive updates.
   performWork(lowestPendingInteractiveExpirationTime, false, null);
   lowestPendingInteractiveExpirationTime = NoWork;
 }
}

function flushControlled(fn) {
 var previousIsBatchingUpdates = isBatchingUpdates;
 isBatchingUpdates = true;
 try {
   syncUpdates(fn);
 } finally {
   isBatchingUpdates = previousIsBatchingUpdates;
   if (!isBatchingUpdates && !isRendering) {
     performWork(Sync, false, null);
   }
 }
}

// 0 is PROD, 1 is DEV.
// Might add PROFILE later.


var didWarnAboutNestedUpdates = void 0;

{
 didWarnAboutNestedUpdates = false;
}

function getContextForSubtree(parentComponent) {
 if (!parentComponent) {
   return emptyObject_1;
 }

 var fiber = get(parentComponent);
 var parentContext = findCurrentUnmaskedContext(fiber);
 return isContextProvider(fiber) ? processChildContext(fiber, parentContext) : parentContext;
}

function scheduleRootUpdate(current, element, expirationTime, callback) {
 {
   if (ReactDebugCurrentFiber.phase === 'render' && ReactDebugCurrentFiber.current !== null && !didWarnAboutNestedUpdates) {
     didWarnAboutNestedUpdates = true;
     warning_1(false, 'Render methods should be a pure function of props and state; ' + 'triggering nested component updates from render is not allowed. ' + 'If necessary, trigger nested updates in componentDidUpdate.\n\n' + 'Check the render method of %s.', getComponentName(ReactDebugCurrentFiber.current) || 'Unknown');
   }
 }

 var update = createUpdate(expirationTime);
 // Caution: React DevTools currently depends on this property
 // being called "element".
 update.payload = { element: element };

 callback = callback === undefined ? null : callback;
 if (callback !== null) {
   !(typeof callback === 'function') ? warning_1(false, 'render(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callback) : void 0;
   update.callback = callback;
 }
 enqueueUpdate(current, update, expirationTime);

 scheduleWork$1(current, expirationTime);
 return expirationTime;
}

function updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback) {
 // TODO: If this is a nested container, this won't be the root.
 var current = container.current;

 {
   if (ReactFiberInstrumentation_1.debugTool) {
     if (current.alternate === null) {
       ReactFiberInstrumentation_1.debugTool.onMountContainer(container);
     } else if (element === null) {
       ReactFiberInstrumentation_1.debugTool.onUnmountContainer(container);
     } else {
       ReactFiberInstrumentation_1.debugTool.onUpdateContainer(container);
     }
   }
 }

 var context = getContextForSubtree(parentComponent);
 if (container.context === null) {
   container.context = context;
 } else {
   container.pendingContext = context;
 }

 return scheduleRootUpdate(current, element, expirationTime, callback);
}

function findHostInstance(component) {
 var fiber = get(component);
 if (fiber === undefined) {
   if (typeof component.render === 'function') {
     invariant_1(false, 'Unable to find node on an unmounted component.');
   } else {
     invariant_1(false, 'Argument appears to not be a ReactComponent. Keys: %s', Object.keys(component));
   }
 }
 var hostFiber = findCurrentHostFiber(fiber);
 if (hostFiber === null) {
   return null;
 }
 return hostFiber.stateNode;
}

function createContainer(containerInfo, isAsync, hydrate) {
 return createFiberRoot(containerInfo, isAsync, hydrate);
}

function updateContainer(element, container, parentComponent, callback) {
 var current = container.current;
 var currentTime = recalculateCurrentTime();
 var expirationTime = computeExpirationForFiber(currentTime, current);
 return updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback);
}

function getPublicRootInstance(container) {
 var containerFiber = container.current;
 if (!containerFiber.child) {
   return null;
 }
 switch (containerFiber.child.tag) {
   case HostComponent:
     return getPublicInstance(containerFiber.child.stateNode);
   default:
     return containerFiber.child.stateNode;
 }
}

function findHostInstanceWithNoPortals(fiber) {
 var hostFiber = findCurrentHostFiberWithNoPortals(fiber);
 if (hostFiber === null) {
   return null;
 }
 return hostFiber.stateNode;
}

function injectIntoDevTools(devToolsConfig) {
 var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;

 return injectInternals(_assign({}, devToolsConfig, {
   findHostInstanceByFiber: function (fiber) {
     var hostFiber = findCurrentHostFiber(fiber);
     if (hostFiber === null) {
       return null;
     }
     return hostFiber.stateNode;
   },
   findFiberByHostInstance: function (instance) {
     if (!findFiberByHostInstance) {
       // Might not be implemented by the renderer.
       return null;
     }
     return findFiberByHostInstance(instance);
   }
 }));
}

// This file intentionally does *not* have the Flow annotation.
// Don't add it. See `./inline-typed.js` for an explanation.



var DOMRenderer = Object.freeze({
 updateContainerAtExpirationTime: updateContainerAtExpirationTime,
 createContainer: createContainer,
 updateContainer: updateContainer,
 flushRoot: flushRoot,
 requestWork: requestWork,
 computeUniqueAsyncExpiration: computeUniqueAsyncExpiration,
 batchedUpdates: batchedUpdates$1,
 unbatchedUpdates: unbatchedUpdates,
 deferredUpdates: deferredUpdates,
 syncUpdates: syncUpdates,
 interactiveUpdates: interactiveUpdates$1,
 flushInteractiveUpdates: flushInteractiveUpdates$1,
 flushControlled: flushControlled,
 flushSync: flushSync,
 getPublicRootInstance: getPublicRootInstance,
 findHostInstance: findHostInstance,
 findHostInstanceWithNoPortals: findHostInstanceWithNoPortals,
 injectIntoDevTools: injectIntoDevTools
});

function createPortal$1(children, containerInfo,
// TODO: figure out the API for cross-renderer implementation.
implementation) {
 var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

 return {
   // This tag allow us to uniquely identify this as a React Portal
   $$typeof: REACT_PORTAL_TYPE,
   key: key == null ? null : '' + key,
   children: children,
   containerInfo: containerInfo,
   implementation: implementation
 };
}

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.4.2';

// TODO: This type is shared between the reconciler and ReactDOM, but will
// eventually be lifted out to the renderer.
var topLevelUpdateWarnings = void 0;
var warnOnInvalidCallback = void 0;
var didWarnAboutUnstableCreatePortal = false;

{
 if (typeof Map !== 'function' ||
 // $FlowIssue Flow incorrectly thinks Map has no prototype
 Map.prototype == null || typeof Map.prototype.forEach !== 'function' || typeof Set !== 'function' ||
 // $FlowIssue Flow incorrectly thinks Set has no prototype
 Set.prototype == null || typeof Set.prototype.clear !== 'function' || typeof Set.prototype.forEach !== 'function') {
   warning_1(false, 'React depends on Map and Set built-in types. Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
 }

 topLevelUpdateWarnings = function (container) {
   if (container._reactRootContainer && container.nodeType !== COMMENT_NODE) {
     var hostInstance = findHostInstanceWithNoPortals(container._reactRootContainer._internalRoot.current);
     if (hostInstance) {
       !(hostInstance.parentNode === container) ? warning_1(false, 'render(...): It looks like the React-rendered content of this ' + 'container was removed without using React. This is not ' + 'supported and will cause errors. Instead, call ' + 'ReactDOM.unmountComponentAtNode to empty a container.') : void 0;
     }
   }

   var isRootRenderedBySomeReact = !!container._reactRootContainer;
   var rootEl = getReactRootElementInContainer(container);
   var hasNonRootReactChild = !!(rootEl && getInstanceFromNode$1(rootEl));

   !(!hasNonRootReactChild || isRootRenderedBySomeReact) ? warning_1(false, 'render(...): Replacing React-rendered children with a new root ' + 'component. If you intended to update the children of this node, ' + 'you should instead have the existing children update their state ' + 'and render the new components instead of calling ReactDOM.render.') : void 0;

   !(container.nodeType !== ELEMENT_NODE || !container.tagName || container.tagName.toUpperCase() !== 'BODY') ? warning_1(false, 'render(): Rendering components directly into document.body is ' + 'discouraged, since its children are often manipulated by third-party ' + 'scripts and browser extensions. This may lead to subtle ' + 'reconciliation issues. Try rendering into a container element created ' + 'for your app.') : void 0;
 };

 warnOnInvalidCallback = function (callback, callerName) {
   !(callback === null || typeof callback === 'function') ? warning_1(false, '%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, callback) : void 0;
 };
}

injection$2.injectFiberControlledHostComponent(ReactDOMFiberComponent);

function ReactBatch(root) {
 var expirationTime = computeUniqueAsyncExpiration();
 this._expirationTime = expirationTime;
 this._root = root;
 this._next = null;
 this._callbacks = null;
 this._didComplete = false;
 this._hasChildren = false;
 this._children = null;
 this._defer = true;
}
ReactBatch.prototype.render = function (children) {
 !this._defer ? invariant_1(false, 'batch.render: Cannot render a batch that already committed.') : void 0;
 this._hasChildren = true;
 this._children = children;
 var internalRoot = this._root._internalRoot;
 var expirationTime = this._expirationTime;
 var work = new ReactWork();
 updateContainerAtExpirationTime(children, internalRoot, null, expirationTime, work._onCommit);
 return work;
};
ReactBatch.prototype.then = function (onComplete) {
 if (this._didComplete) {
   onComplete();
   return;
 }
 var callbacks = this._callbacks;
 if (callbacks === null) {
   callbacks = this._callbacks = [];
 }
 callbacks.push(onComplete);
};
ReactBatch.prototype.commit = function () {
 var internalRoot = this._root._internalRoot;
 var firstBatch = internalRoot.firstBatch;
 !(this._defer && firstBatch !== null) ? invariant_1(false, 'batch.commit: Cannot commit a batch multiple times.') : void 0;

 if (!this._hasChildren) {
   // This batch is empty. Return.
   this._next = null;
   this._defer = false;
   return;
 }

 var expirationTime = this._expirationTime;

 // Ensure this is the first batch in the list.
 if (firstBatch !== this) {
   // This batch is not the earliest batch. We need to move it to the front.
   // Update its expiration time to be the expiration time of the earliest
   // batch, so that we can flush it without flushing the other batches.
   if (this._hasChildren) {
     expirationTime = this._expirationTime = firstBatch._expirationTime;
     // Rendering this batch again ensures its children will be the final state
     // when we flush (updates are processed in insertion order: last
     // update wins).
     // TODO: This forces a restart. Should we print a warning?
     this.render(this._children);
   }

   // Remove the batch from the list.
   var previous = null;
   var batch = firstBatch;
   while (batch !== this) {
     previous = batch;
     batch = batch._next;
   }
   !(previous !== null) ? invariant_1(false, 'batch.commit: Cannot commit a batch multiple times.') : void 0;
   previous._next = batch._next;

   // Add it to the front.
   this._next = firstBatch;
   firstBatch = internalRoot.firstBatch = this;
 }

 // Synchronously flush all the work up to this batch's expiration time.
 this._defer = false;
 flushRoot(internalRoot, expirationTime);

 // Pop the batch from the list.
 var next = this._next;
 this._next = null;
 firstBatch = internalRoot.firstBatch = next;

 // Append the next earliest batch's children to the update queue.
 if (firstBatch !== null && firstBatch._hasChildren) {
   firstBatch.render(firstBatch._children);
 }
};
ReactBatch.prototype._onComplete = function () {
 if (this._didComplete) {
   return;
 }
 this._didComplete = true;
 var callbacks = this._callbacks;
 if (callbacks === null) {
   return;
 }
 // TODO: Error handling.
 for (var i = 0; i < callbacks.length; i++) {
   var _callback = callbacks[i];
   _callback();
 }
};

function ReactWork() {
 this._callbacks = null;
 this._didCommit = false;
 // TODO: Avoid need to bind by replacing callbacks in the update queue with
 // list of Work objects.
 this._onCommit = this._onCommit.bind(this);
}
ReactWork.prototype.then = function (onCommit) {
 if (this._didCommit) {
   onCommit();
   return;
 }
 var callbacks = this._callbacks;
 if (callbacks === null) {
   callbacks = this._callbacks = [];
 }
 callbacks.push(onCommit);
};
ReactWork.prototype._onCommit = function () {
 if (this._didCommit) {
   return;
 }
 this._didCommit = true;
 var callbacks = this._callbacks;
 if (callbacks === null) {
   return;
 }
 // TODO: Error handling.
 for (var i = 0; i < callbacks.length; i++) {
   var _callback2 = callbacks[i];
   !(typeof _callback2 === 'function') ? invariant_1(false, 'Invalid argument passed as callback. Expected a function. Instead received: %s', _callback2) : void 0;
   _callback2();
 }
};

function ReactRoot(container, isAsync, hydrate) {
 var root = createContainer(container, isAsync, hydrate);
 this._internalRoot = root;
}
ReactRoot.prototype.render = function (children, callback) {
 var root = this._internalRoot;
 var work = new ReactWork();
 callback = callback === undefined ? null : callback;
 {
   warnOnInvalidCallback(callback, 'render');
 }
 if (callback !== null) {
   work.then(callback);
 }
 updateContainer(children, root, null, work._onCommit);
 return work;
};
ReactRoot.prototype.unmount = function (callback) {
 var root = this._internalRoot;
 var work = new ReactWork();
 callback = callback === undefined ? null : callback;
 {
   warnOnInvalidCallback(callback, 'render');
 }
 if (callback !== null) {
   work.then(callback);
 }
 updateContainer(null, root, null, work._onCommit);
 return work;
};
ReactRoot.prototype.legacy_renderSubtreeIntoContainer = function (parentComponent, children, callback) {
 var root = this._internalRoot;
 var work = new ReactWork();
 callback = callback === undefined ? null : callback;
 {
   warnOnInvalidCallback(callback, 'render');
 }
 if (callback !== null) {
   work.then(callback);
 }
 updateContainer(children, root, parentComponent, work._onCommit);
 return work;
};
ReactRoot.prototype.createBatch = function () {
 var batch = new ReactBatch(this);
 var expirationTime = batch._expirationTime;

 var internalRoot = this._internalRoot;
 var firstBatch = internalRoot.firstBatch;
 if (firstBatch === null) {
   internalRoot.firstBatch = batch;
   batch._next = null;
 } else {
   // Insert sorted by expiration time then insertion order
   var insertAfter = null;
   var insertBefore = firstBatch;
   while (insertBefore !== null && insertBefore._expirationTime <= expirationTime) {
     insertAfter = insertBefore;
     insertBefore = insertBefore._next;
   }
   batch._next = insertBefore;
   if (insertAfter !== null) {
     insertAfter._next = batch;
   }
 }

 return batch;
};

/**
* True if the supplied DOM node is a valid node element.
*
* @param {?DOMElement} node The candidate DOM node.
* @return {boolean} True if the DOM is a valid DOM node.
* @internal
*/
function isValidContainer(node) {
 return !!(node && (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE || node.nodeType === COMMENT_NODE && node.nodeValue === ' react-mount-point-unstable '));
}

function getReactRootElementInContainer(container) {
 if (!container) {
   return null;
 }

 if (container.nodeType === DOCUMENT_NODE) {
   return container.documentElement;
 } else {
   return container.firstChild;
 }
}

function shouldHydrateDueToLegacyHeuristic(container) {
 var rootElement = getReactRootElementInContainer(container);
 return !!(rootElement && rootElement.nodeType === ELEMENT_NODE && rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME));
}

injection$3.injectRenderer(DOMRenderer);

var warnedAboutHydrateAPI = false;

function legacyCreateRootFromDOMContainer(container, forceHydrate) {
 var shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
 // First clear any existing content.
 if (!shouldHydrate) {
   var warned = false;
   var rootSibling = void 0;
   while (rootSibling = container.lastChild) {
     {
       if (!warned && rootSibling.nodeType === ELEMENT_NODE && rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)) {
         warned = true;
         warning_1(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.');
       }
     }
     container.removeChild(rootSibling);
   }
 }
 {
   if (shouldHydrate && !forceHydrate && !warnedAboutHydrateAPI) {
     warnedAboutHydrateAPI = true;
     lowPriorityWarning$1(false, 'render(): Calling ReactDOM.render() to hydrate server-rendered markup ' + 'will stop working in React v17. Replace the ReactDOM.render() call ' + 'with ReactDOM.hydrate() if you want React to attach to the server HTML.');
   }
 }
 // Legacy roots are not async by default.
 var isAsync = false;
 return new ReactRoot(container, isAsync, shouldHydrate);
}

function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
 // TODO: Ensure all entry points contain this check
 !isValidContainer(container) ? invariant_1(false, 'Target container is not a DOM element.') : void 0;

 {
   topLevelUpdateWarnings(container);
 }

 // TODO: Without `any` type, Flow says "Property cannot be accessed on any
 // member of intersection type." Whyyyyyy.
 var root = container._reactRootContainer;
 if (!root) {
   // Initial mount
   root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);
   if (typeof callback === 'function') {
     var originalCallback = callback;
     callback = function () {
       var instance = getPublicRootInstance(root._internalRoot);
       originalCallback.call(instance);
     };
   }
   // Initial mount should not be batched.
   unbatchedUpdates(function () {
     if (parentComponent != null) {
       root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
     } else {
       root.render(children, callback);
     }
   });
 } else {
   if (typeof callback === 'function') {
     var _originalCallback = callback;
     callback = function () {
       var instance = getPublicRootInstance(root._internalRoot);
       _originalCallback.call(instance);
     };
   }
   // Update
   if (parentComponent != null) {
     root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
   } else {
     root.render(children, callback);
   }
 }
 return getPublicRootInstance(root._internalRoot);
}

function createPortal(children, container) {
 var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

 !isValidContainer(container) ? invariant_1(false, 'Target container is not a DOM element.') : void 0;
 // TODO: pass ReactDOM portal implementation as third argument
 return createPortal$1(children, container, null, key);
}

var ReactDOM = {
 createPortal: createPortal,

 findDOMNode: function (componentOrElement) {
   {
     var owner = ReactCurrentOwner.current;
     if (owner !== null && owner.stateNode !== null) {
       var warnedAboutRefsInRender = owner.stateNode._warnedAboutRefsInRender;
       !warnedAboutRefsInRender ? warning_1(false, '%s is accessing findDOMNode inside its render(). ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', getComponentName(owner) || 'A component') : void 0;
       owner.stateNode._warnedAboutRefsInRender = true;
     }
   }
   if (componentOrElement == null) {
     return null;
   }
   if (componentOrElement.nodeType === ELEMENT_NODE) {
     return componentOrElement;
   }

   return findHostInstance(componentOrElement);
 },
 hydrate: function (element, container, callback) {
   // TODO: throw or warn if we couldn't hydrate?
   return legacyRenderSubtreeIntoContainer(null, element, container, true, callback);
 },
 render: function (element, container, callback) {
   return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
 },
 unstable_renderSubtreeIntoContainer: function (parentComponent, element, containerNode, callback) {
   !(parentComponent != null && has(parentComponent)) ? invariant_1(false, 'parentComponent must be a valid React Component') : void 0;
   return legacyRenderSubtreeIntoContainer(parentComponent, element, containerNode, false, callback);
 },
 unmountComponentAtNode: function (container) {
   !isValidContainer(container) ? invariant_1(false, 'unmountComponentAtNode(...): Target container is not a DOM element.') : void 0;

   if (container._reactRootContainer) {
     {
       var rootEl = getReactRootElementInContainer(container);
       var renderedByDifferentReact = rootEl && !getInstanceFromNode$1(rootEl);
       !!renderedByDifferentReact ? warning_1(false, "unmountComponentAtNode(): The node you're attempting to unmount " + 'was rendered by another copy of React.') : void 0;
     }

     // Unmount should not be batched.
     unbatchedUpdates(function () {
       legacyRenderSubtreeIntoContainer(null, null, container, false, function () {
         container._reactRootContainer = null;
       });
     });
     // If you call unmountComponentAtNode twice in quick succession, you'll
     // get `true` twice. That's probably fine?
     return true;
   } else {
     {
       var _rootEl = getReactRootElementInContainer(container);
       var hasNonRootReactChild = !!(_rootEl && getInstanceFromNode$1(_rootEl));

       // Check if the container itself is a React root node.
       var isContainerReactRoot = container.nodeType === 1 && isValidContainer(container.parentNode) && !!container.parentNode._reactRootContainer;

       !!hasNonRootReactChild ? warning_1(false, "unmountComponentAtNode(): The node you're attempting to unmount " + 'was rendered by React and is not a top-level container. %s', isContainerReactRoot ? 'You may have accidentally passed in a React root node instead ' + 'of its container.' : 'Instead, have the parent component update its state and ' + 'rerender in order to remove this component.') : void 0;
     }

     return false;
   }
 },


 // Temporary alias since we already shipped React 16 RC with it.
 // TODO: remove in React 17.
 unstable_createPortal: function () {
   if (!didWarnAboutUnstableCreatePortal) {
     didWarnAboutUnstableCreatePortal = true;
     lowPriorityWarning$1(false, 'The ReactDOM.unstable_createPortal() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactDOM.createPortal() instead. It has the exact same API, ' + 'but without the "unstable_" prefix.');
   }
   return createPortal.apply(undefined, arguments);
 },


 unstable_batchedUpdates: batchedUpdates$1,

 unstable_deferredUpdates: deferredUpdates,

 unstable_interactiveUpdates: interactiveUpdates$1,

 flushSync: flushSync,

 unstable_flushControlled: flushControlled,

 __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
   // For TapEventPlugin which is popular in open source
   EventPluginHub: EventPluginHub,
   // Used by test-utils
   EventPluginRegistry: EventPluginRegistry,
   EventPropagators: EventPropagators,
   ReactControlledComponent: ReactControlledComponent,
   ReactDOMComponentTree: ReactDOMComponentTree,
   ReactDOMEventListener: ReactDOMEventListener
 }
};

ReactDOM.unstable_createRoot = function createRoot(container, options) {
 var hydrate = options != null && options.hydrate === true;
 return new ReactRoot(container, true, hydrate);
};

var foundDevTools = injectIntoDevTools({
 findFiberByHostInstance: getClosestInstanceFromNode,
 bundleType: 1,
 version: ReactVersion,
 rendererPackageName: 'react-dom'
});

{
 if (!foundDevTools && ExecutionEnvironment_1.canUseDOM && window.top === window.self) {
   // If we're in Chrome or Firefox, provide a download link if not installed.
   if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
     var protocol = window.location.protocol;
     // Don't warn in exotic cases like chrome-extension://.
     if (/^(https?|file):$/.test(protocol)) {
       console.info('%cDownload the React DevTools ' + 'for a better development experience: ' + 'https://fb.me/react-devtools' + (protocol === 'file:' ? '\nYou might need to use a local HTTP server (instead of file://): ' + 'https://fb.me/react-devtools-faq' : ''), 'font-weight:bold');
     }
   }
 }
}



var ReactDOM$2 = Object.freeze({
 default: ReactDOM
});

var ReactDOM$3 = ( ReactDOM$2 && ReactDOM ) || ReactDOM$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var reactDom = ReactDOM$3.default ? ReactDOM$3.default : ReactDOM$3;

return reactDom;

})));extScheduledRoot=null;if(w===I)return I=w=null,y=0,null;w=a}a=w;for(var b=null,c=0;null!==a;)0!==a.current.pendingWorkPriority&&(0===c||c>a.current.pendingWorkPriority)&&(c=a.current.pendingWorkPriority,b=a),a=a.nextScheduledRoot;if(null!==b){for(y=c;-1<da;)bb[da]=null,da--;cb=ba;ca.current=ba;S.current=!1;p();D=ad(b.current,c);b!==V&&(U=0,V=b)}else y=0,V=D=null}function c(c){X=!0;q=null;var d=c.stateNode;d.current===c?m("177"):void 0;1!==y&&2!==y||U++;db.current=null;
if(1<c.effectTag)if(null!==c.lastEffect){c.lastEffect.nextEffect=c;var p=c.firstEffect}else p=c;else p=c.firstEffect;N();for(u=p;null!==u;){var n=!1,e=void 0;try{for(;null!==u;){var f=u.effectTag;f&16&&a.resetTextContent(u.stateNode);if(f&128){var g=u.alternate;null!==g&&t(g)}switch(f&-242){case 2:E(u);u.effectTag&=-3;break;case 6:E(u);u.effectTag&=-3;bd(u.alternate,u);break;case 4:bd(u.alternate,u);break;case 8:Y=!0,Qe(u),Y=!1}u=u.nextEffect}}catch(Sb){n=!0,e=Sb}n&&(null===u?m("178"):void 0,T(u,
e),null!==u&&(u=u.nextEffect))}O();d.current=c;for(u=p;null!==u;){d=!1;p=void 0;try{for(;null!==u;){var h=u.effectTag;h&36&&Re(u.alternate,u);h&128&&r(u);if(h&64)switch(n=u,e=void 0,null!==P&&(e=P.get(n),P["delete"](n),null==e&&null!==n.alternate&&(n=n.alternate,e=P.get(n),P["delete"](n))),null==e?m("184"):void 0,n.tag){case 2:n.stateNode.componentDidCatch(e.error,{componentStack:e.componentStack});break;case 3:null===M&&(M=e.error);break;default:m("157")}var v=u.nextEffect;u.nextEffect=null;u=v}}catch(Sb){d=
!0,p=Sb}d&&(null===u?m("178"):void 0,T(u,p),null!==u&&(u=u.nextEffect))}X=!1;"function"===typeof cd&&cd(c.stateNode);B&&(B.forEach(Z),B=null);b()}function d(a){for(;;){var b=Se(a.alternate,a,y),c=a["return"],d=a.sibling;var n=a;if(!(0!==n.pendingWorkPriority&&n.pendingWorkPriority>y)){var p=n.updateQueue;p=null===p||2!==n.tag&&3!==n.tag?0:null!==p.first?p.first.priorityLevel:0;for(var e=n.child;null!==e;){var f=e.pendingWorkPriority;p=0!==p&&(0===f||f>p)?p:f;e=e.sibling}n.pendingWorkPriority=p}if(null!==
b)return b;null!==c&&(null===c.firstEffect&&(c.firstEffect=a.firstEffect),null!==a.lastEffect&&(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),1<a.effectTag&&(null!==c.lastEffect?c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a));if(null!==d)return d;if(null!==c)a=c;else{q=a;break}}return null}function e(a){var b=pa(a.alternate,a,y);null===b&&(b=d(a));db.current=null;return b}function f(a){var b=Ub(a.alternate,a,y);null===b&&(b=d(a));db.current=null;
return b}function g(a){Q(5,a)}function h(){if(null!==P&&0<P.size&&2===y)for(;null!==D;){var a=D;D=null!==P&&(P.has(a)||null!==a.alternate&&P.has(a.alternate))?f(D):e(D);if(null===D&&(null===q?m("179"):void 0,J=2,c(q),J=y,null===P||0===P.size||2!==y))break}}function k(a,d){null!==q?(J=2,c(q),h()):null===D&&b();if(!(0===y||y>a)){J=y;a:do{if(2>=y)for(;null!==D&&!(D=e(D),null===D&&(null===q?m("179"):void 0,J=2,c(q),J=y,h(),0===y||y>a||2<y)););else if(null!==d)for(;null!==D&&!F;)if(1<d.timeRemaining()){if(D=
e(D),null===D)if(null===q?m("179"):void 0,1<d.timeRemaining()){if(J=2,c(q),J=y,h(),0===y||y>a||3>y)break}else F=!0}else F=!0;switch(y){case 1:case 2:if(y<=a)continue a;break a;case 3:case 4:case 5:if(null===d)break a;if(!F&&y<=a)continue a;break a;case 0:break a;default:m("181")}}while(1)}}function Q(a,b){z?m("182"):void 0;z=!0;var c=J,d=!1,p=null;try{k(a,b)}catch(Tb){d=!0,p=Tb}for(;d;){if(R){M=p;break}var e=D;if(null===e)R=!0;else{var E=T(e,p);null===E?m("183"):void 0;if(!R){try{d=E;p=a;E=b;for(var h=
d;null!==e;){switch(e.tag){case 2:dd(e);break;case 5:n(e);break;case 3:x(e);break;case 4:x(e)}if(e===h||e.alternate===h)break;e=e["return"]}D=f(d);k(p,E)}catch(Tb){d=!0;p=Tb;continue}break}}}J=c;null!==b&&(L=!1);2<y&&!L&&(A(g),L=!0);a=M;R=F=z=!1;V=C=P=M=null;U=0;if(null!==a)throw a;}function T(a,b){var c=db.current=null,d=!1,p=!1,n=null;if(3===a.tag)c=a,eb(a)&&(R=!0);else for(var e=a["return"];null!==e&&null===c;){2===e.tag?"function"===typeof e.stateNode.componentDidCatch&&(d=!0,n=Ba(e),c=e,p=!0):
3===e.tag&&(c=e);if(eb(e)){if(Y||null!==B&&(B.has(e)||null!==e.alternate&&B.has(e.alternate)))return null;c=null;p=!1}e=e["return"]}if(null!==c){null===C&&(C=new Set);C.add(c);var f="";e=a;do{a:switch(e.tag){case 0:case 1:case 2:case 5:var E=e._debugOwner,g=e._debugSource;var h=Ba(e);var v=null;E&&(v=Ba(E));E=g;h="\n    in "+(h||"Unknown")+(E?" (at "+E.fileName.replace(/^.*[\\\/]/,"")+":"+E.lineNumber+")":v?" (created by "+v+")":"");break a;default:h=""}f+=h;e=e["return"]}while(e);e=f;a=Ba(a);null===
P&&(P=new Map);b={componentName:a,componentStack:e,error:b,errorBoundary:d?c.stateNode:null,errorBoundaryFound:d,errorBoundaryName:n,willRetry:p};P.set(c,b);try{console.error(b.error)}catch(Te){console.error(Te)}X?(null===B&&(B=new Set),B.add(c)):Z(c);return c}null===M&&(M=b);return null}function eb(a){return null!==C&&(C.has(a)||null!==a.alternate&&C.has(a.alternate))}function fb(a,b){return ed(a,b,!1)}function ed(a,b){U>aa&&(R=!0,m("185"));!z&&b<=y&&(D=null);for(var c=!0;null!==a&&c;){c=!1;if(0===
a.pendingWorkPriority||a.pendingWorkPriority>b)c=!0,a.pendingWorkPriority=b;null!==a.alternate&&(0===a.alternate.pendingWorkPriority||a.alternate.pendingWorkPriority>b)&&(c=!0,a.alternate.pendingWorkPriority=b);if(null===a["return"])if(3===a.tag){var d=a.stateNode;0===b||d.isScheduled||(d.isScheduled=!0,I?I.nextScheduledRoot=d:w=d,I=d);if(!z)switch(b){case 1:K?Q(1,null):Q(2,null);break;case 2:W?void 0:m("186");break;default:L||(A(g),L=!0)}}else break;a=a["return"]}}function l(a,b){var c=J;0===c&&
(c=!G||a.internalContextTag&1||b?4:1);return 1===c&&(z||W)?2:c}function Z(a){ed(a,2,!0)}var H=Ue(a),fd=Ve(a),x=H.popHostContainer,n=H.popHostContext,p=H.resetHostContainer,v=We(a,H,fd,fb,l),pa=v.beginWork,Ub=v.beginFailedWork,Se=Xe(a,H,fd).completeWork;H=Ye(a,T);var E=H.commitPlacement,Qe=H.commitDeletion,bd=H.commitWork,Re=H.commitLifeCycles,r=H.commitAttachRef,t=H.commitDetachRef,A=a.scheduleDeferredCallback,G=a.useSyncScheduling,N=a.prepareForCommit,O=a.resetAfterCommit,J=0,z=!1,F=!1,W=!1,K=!1,
D=null,y=0,u=null,q=null,w=null,I=null,L=!1,P=null,C=null,B=null,M=null,R=!1,X=!1,Y=!1,aa=1E3,U=0,V=null;return{scheduleUpdate:fb,getPriorityContext:l,batchedUpdates:function(a,b){var c=W;W=!0;try{return a(b)}finally{W=c,z||W||Q(2,null)}},unbatchedUpdates:function(a){var b=K,c=W;K=W;W=!1;try{return a()}finally{W=c,K=b}},flushSync:function(a){var b=W,c=J;W=!0;J=1;try{return a()}finally{W=b,J=c,z?m("187"):void 0,Q(2,null)}},deferredUpdates:function(a){var b=J;J=4;try{return a()}finally{J=b}}}}function cd(a){"function"===
typeof Vb&&Vb(a)}function Ve(a){function b(a,b){var c=new F(5,null,0);c.type="DELETED";c.stateNode=b;c["return"]=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}function c(a,b){switch(a.tag){case 5:return f(b,a.type,a.pendingProps);case 6:return g(b,a.pendingProps);default:return!1}}function d(a){for(a=a["return"];null!==a&&5!==a.tag&&3!==a.tag;)a=a["return"];l=a}var e=a.shouldSetTextContent,f=a.canHydrateInstance,g=a.canHydrateTextInstance,
h=a.getNextHydratableSibling,k=a.getFirstHydratableChild,Q=a.hydrateInstance,T=a.hydrateTextInstance,eb=a.didNotHydrateInstance,fb=a.didNotFindHydratableInstance;a=a.didNotFindHydratableTextInstance;if(!(f&&g&&h&&k&&Q&&T&&eb&&fb&&a))return{enterHydrationState:function(){return!1},resetHydrationState:function(){},tryToClaimNextHydratableInstance:function(){},prepareToHydrateHostInstance:function(){m("175")},prepareToHydrateHostTextInstance:function(){m("176")},popHydrationState:function(){return!1}};
var l=null,r=null,Z=!1;return{enterHydrationState:function(a){r=k(a.stateNode.containerInfo);l=a;return Z=!0},resetHydrationState:function(){r=l=null;Z=!1},tryToClaimNextHydratableInstance:function(a){if(Z){var d=r;if(d){if(!c(a,d)){d=h(d);if(!d||!c(a,d)){a.effectTag|=2;Z=!1;l=a;return}b(l,r)}a.stateNode=d;l=a;r=k(d)}else a.effectTag|=2,Z=!1,l=a}},prepareToHydrateHostInstance:function(a,b,c){b=Q(a.stateNode,a.type,a.memoizedProps,b,c,a);a.updateQueue=b;return null!==b?!0:!1},prepareToHydrateHostTextInstance:function(a){return T(a.stateNode,
a.memoizedProps,a)},popHydrationState:function(a){if(a!==l)return!1;if(!Z)return d(a),Z=!0,!1;var c=a.type;if(5!==a.tag||"head"!==c&&"body"!==c&&!e(c,a.memoizedProps))for(c=r;c;)b(a,c),c=h(c);d(a);r=l?h(a.stateNode):null;return!0}}}function Ue(a){function b(a){a===qa?m("174"):void 0;return a}var c=a.getChildHostContext,d=a.getRootHostContext,e={current:qa},f={current:qa},g={current:qa};return{getHostContext:function(){return b(e.current)},getRootHostContainer:function(){return b(g.current)},popHostContainer:function(a){K(e,
a);K(f,a);K(g,a)},popHostContext:function(a){f.current===a&&(K(e,a),K(f,a))},pushHostContainer:function(a,b){L(g,b,a);b=d(b);L(f,a,a);L(e,b,a)},pushHostContext:function(a){var d=b(g.current),h=b(e.current);d=c(h,a.type,d);h!==d&&(L(f,a,a),L(e,d,a))},resetHostContainer:function(){e.current=qa;g.current=qa}}}function Ye(a,b){function c(a){var c=a.ref;if(null!==c)try{c(null)}catch(p){b(a,p)}}function d(a){return 5===a.tag||3===a.tag||4===a.tag}function e(a){for(var b=a;;)if(g(b),null!==b.child&&4!==
b.tag)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;null===b.sibling;){if(null===b["return"]||b["return"]===a)return;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}function f(a){for(var b=a,c=!1,d=void 0,f=void 0;;){if(!c){c=b["return"];a:for(;;){null===c?m("160"):void 0;switch(c.tag){case 5:d=c.stateNode;f=!1;break a;case 3:d=c.stateNode.containerInfo;f=!0;break a;case 4:d=c.stateNode.containerInfo;f=!0;break a}c=c["return"]}c=!0}if(5===b.tag||6===b.tag)e(b),f?H(d,b.stateNode):
Z(d,b.stateNode);else if(4===b.tag?d=b.stateNode.containerInfo:g(b),null!==b.child){b.child["return"]=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b["return"]||b["return"]===a)return;b=b["return"];4===b.tag&&(c=!1)}b.sibling["return"]=b["return"];b=b.sibling}}function g(a){"function"===typeof gd&&gd(a);switch(a.tag){case 2:c(a);var d=a.stateNode;if("function"===typeof d.componentWillUnmount)try{d.props=a.memoizedProps,d.state=a.memoizedState,d.componentWillUnmount()}catch(p){b(a,
p)}break;case 5:c(a);break;case 7:e(a.stateNode);break;case 4:f(a)}}var h=a.commitMount,k=a.commitUpdate,Q=a.resetTextContent,T=a.commitTextUpdate,l=a.appendChild,r=a.appendChildToContainer,t=a.insertBefore,q=a.insertInContainerBefore,Z=a.removeChild,H=a.removeChildFromContainer,w=a.getPublicInstance;return{commitPlacement:function(a){a:{for(var b=a["return"];null!==b;){if(d(b)){var c=b;break a}b=b["return"]}m("160");c=void 0}var e=b=void 0;switch(c.tag){case 5:b=c.stateNode;e=!1;break;case 3:b=c.stateNode.containerInfo;
e=!0;break;case 4:b=c.stateNode.containerInfo;e=!0;break;default:m("161")}c.effectTag&16&&(Q(b),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c["return"]||d(c["return"])){c=null;break a}c=c["return"]}c.sibling["return"]=c["return"];for(c=c.sibling;5!==c.tag&&6!==c.tag;){if(c.effectTag&2)continue b;if(null===c.child||4===c.tag)continue b;else c.child["return"]=c,c=c.child}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var f=a;;){if(5===f.tag||6===f.tag)c?e?q(b,f.stateNode,c):
t(b,f.stateNode,c):e?r(b,f.stateNode):l(b,f.stateNode);else if(4!==f.tag&&null!==f.child){f.child["return"]=f;f=f.child;continue}if(f===a)break;for(;null===f.sibling;){if(null===f["return"]||f["return"]===a)return;f=f["return"]}f.sibling["return"]=f["return"];f=f.sibling}},commitDeletion:function(a){f(a);a["return"]=null;a.child=null;a.alternate&&(a.alternate.child=null,a.alternate["return"]=null)},commitWork:function(a,b){switch(b.tag){case 2:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;
a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&k(c,f,e,a,d,b)}break;case 6:null===b.stateNode?m("162"):void 0;c=b.memoizedProps;T(b.stateNode,null!==a?a.memoizedProps:c,c);break;case 3:break;case 4:break;default:m("163")}},commitLifeCycles:function(a,b){switch(b.tag){case 2:var c=b.stateNode;if(b.effectTag&4)if(null===a)c.props=b.memoizedProps,c.state=b.memoizedState,c.componentDidMount();else{var d=a.memoizedProps;a=a.memoizedState;c.props=b.memoizedProps;
c.state=b.memoizedState;c.componentDidUpdate(d,a)}b.effectTag&32&&null!==b.updateQueue&&hd(b,b.updateQueue,c);break;case 3:a=b.updateQueue;null!==a&&hd(b,a,b.child&&b.child.stateNode);break;case 5:c=b.stateNode;null===a&&b.effectTag&4&&h(c,b.type,b.memoizedProps,b);break;case 6:break;case 4:break;default:m("163")}},commitAttachRef:function(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:b(w(c));break;default:b(c)}}},commitDetachRef:function(a){a=a.ref;null!==a&&a(null)}}}function gd(a){"function"===
typeof Wb&&Wb(a)}function hd(a,b,c){a=b.callbackList;if(null!==a)for(b.callbackList=null,b=0;b<a.length;b++){var d=a[b];"function"!==typeof d?m("191",d):void 0;d.call(c)}}function Xe(a,b,c){var d=a.createInstance,e=a.createTextInstance,f=a.appendInitialChild,g=a.finalizeInitialChildren,h=a.prepareUpdate,k=b.getRootHostContainer,Q=b.popHostContext,T=b.getHostContext,l=b.popHostContainer,r=c.prepareToHydrateHostInstance,t=c.prepareToHydrateHostTextInstance,q=c.popHydrationState;return{completeWork:function(a,
b,c){var x=b.pendingProps;if(null===x)x=b.memoizedProps;else if(5!==b.pendingWorkPriority||5===c)b.pendingProps=null;switch(b.tag){case 1:return null;case 2:return dd(b),null;case 3:l(b);K(S,b);K(ca,b);x=b.stateNode;x.pendingContext&&(x.context=x.pendingContext,x.pendingContext=null);if(null===a||null===a.child)q(b),b.effectTag&=-3;return null;case 5:Q(b);c=k();var n=b.type;if(null!==a&&null!=b.stateNode){var p=a.memoizedProps,v=b.stateNode,pa=T();x=h(v,n,p,x,c,pa);if(b.updateQueue=x)b.effectTag|=
4;a.ref!==b.ref&&(b.effectTag|=128)}else{if(!x)return null===b.stateNode?m("166"):void 0,null;a=T();if(q(b))r(b,c,a)&&(b.effectTag|=4);else{a=d(n,x,c,a,b);a:for(p=b.child;null!==p;){if(5===p.tag||6===p.tag)f(a,p.stateNode);else if(4!==p.tag&&null!==p.child){p=p.child;continue}if(p===b)break a;for(;null===p.sibling;){if(null===p["return"]||p["return"]===b)break a;p=p["return"]}p=p.sibling}g(a,n,x,c)&&(b.effectTag|=4);b.stateNode=a}null!==b.ref&&(b.effectTag|=128)}return null;case 6:if(a&&null!=b.stateNode)a.memoizedProps!==
x&&(b.effectTag|=4);else{if("string"!==typeof x)return null===b.stateNode?m("166"):void 0,null;a=k();c=T();q(b)?t(b)&&(b.effectTag|=4):b.stateNode=e(x,a,c,b)}return null;case 7:(x=b.memoizedProps)?void 0:m("165");b.tag=8;c=[];a:for((n=b.stateNode)&&(n["return"]=b);null!==n;){if(5===n.tag||6===n.tag||4===n.tag)m("164");else if(9===n.tag)c.push(n.type);else if(null!==n.child){n.child["return"]=n;n=n.child;continue}for(;null===n.sibling;){if(null===n["return"]||n["return"]===b)break a;n=n["return"]}n.sibling["return"]=
n["return"];n=n.sibling}n=x.handler;x=n(x.props,c);b.child=Xb(b,null!==a?a.child:null,x,b.pendingWorkPriority);return b.child;case 8:return b.tag=7,null;case 9:return null;case 10:return null;case 4:return b.effectTag|=4,l(b),null;case 0:m("167");default:m("156")}}}}function We(a,b,c,d,e){function f(a,b,c){g(a,b,c,b.pendingWorkPriority)}function g(a,b,c,d){b.child=null===a?Yb(b,b.child,c,d):a.child===b.child?Xb(b,b.child,c,d):Zb(b,b.child,c,d)}function h(a,b){var c=b.ref;null===c||a&&a.ref===c||(b.effectTag|=
128)}function k(a,b,c,d){h(a,b);if(!c)return d&&id(b,!1),l(a,b);c=b.stateNode;Ze.current=b;var e=c.render();b.effectTag|=1;f(a,b,e);b.memoizedState=c.state;b.memoizedProps=c.props;d&&id(b,!0);return b.child}function Q(a){var b=a.stateNode;b.pendingContext?jd(a,b.pendingContext,b.pendingContext!==b.context):b.context&&jd(a,b.context,!1);H(a,b.containerInfo)}function l(a,b){null!==a&&b.child!==a.child?m("153"):void 0;if(null!==b.child){a=b.child;var c=$b(a,a.pendingWorkPriority);c.pendingProps=a.pendingProps;
b.child=c;for(c["return"]=b;null!==a.sibling;)a=a.sibling,c=c.sibling=$b(a,a.pendingWorkPriority),c.pendingProps=a.pendingProps,c["return"]=b;c.sibling=null}return b.child}function r(a,b){switch(b.tag){case 3:Q(b);break;case 2:gb(b);break;case 4:H(b,b.stateNode.containerInfo)}return null}var q=a.shouldSetTextContent,t=a.useSyncScheduling,w=a.shouldDeprioritizeSubtree,z=b.pushHostContext,H=b.pushHostContainer,A=c.enterHydrationState,x=c.resetHydrationState,n=c.tryToClaimNextHydratableInstance;a=$e(d,
e,function(a,b){a.memoizedProps=b},function(a,b){a.memoizedState=b});var p=a.adoptClassInstance,v=a.constructClassInstance,pa=a.mountClassInstance,Ub=a.updateClassInstance;return{beginWork:function(a,b,c){if(0===b.pendingWorkPriority||b.pendingWorkPriority>c)return r(a,b);switch(b.tag){case 0:null!==a?m("155"):void 0;var d=b.type,e=b.pendingProps,g=Ca(b);g=Da(b,g);d=d(e,g);b.effectTag|=1;"object"===typeof d&&null!==d&&"function"===typeof d.render?(b.tag=2,e=gb(b),p(b,d),pa(b,c),b=k(a,b,!0,e)):(b.tag=
1,f(a,b,d),b.memoizedProps=e,b=b.child);return b;case 1:a:{e=b.type;c=b.pendingProps;d=b.memoizedProps;if(S.current)null===c&&(c=d);else if(null===c||d===c){b=l(a,b);break a}d=Ca(b);d=Da(b,d);e=e(c,d);b.effectTag|=1;f(a,b,e);b.memoizedProps=c;b=b.child}return b;case 2:return e=gb(b),d=void 0,null===a?b.stateNode?m("153"):(v(b,b.pendingProps),pa(b,c),d=!0):d=Ub(a,b,c),k(a,b,d,e);case 3:return Q(b),d=b.updateQueue,null!==d?(e=b.memoizedState,d=ac(a,b,d,null,e,null,c),e===d?(x(),b=l(a,b)):(e=d.element,
null!==a&&null!==a.child||!A(b)?(x(),f(a,b,e)):(b.effectTag|=2,b.child=Yb(b,b.child,e,c)),b.memoizedState=d,b=b.child)):(x(),b=l(a,b)),b;case 5:z(b);null===a&&n(b);e=b.type;var E=b.memoizedProps;d=b.pendingProps;null===d&&(d=E,null===d?m("154"):void 0);g=null!==a?a.memoizedProps:null;S.current||null!==d&&E!==d?(E=d.children,q(e,d)?E=null:g&&q(e,g)&&(b.effectTag|=16),h(a,b),5!==c&&!t&&w(e,d)?(b.pendingWorkPriority=5,b=null):(f(a,b,E),b.memoizedProps=d,b=b.child)):b=l(a,b);return b;case 6:return null===
a&&n(b),a=b.pendingProps,null===a&&(a=b.memoizedProps),b.memoizedProps=a,null;case 8:b.tag=7;case 7:c=b.pendingProps;if(S.current)null===c&&(c=a&&a.memoizedProps,null===c?m("154"):void 0);else if(null===c||b.memoizedProps===c)c=b.memoizedProps;e=c.children;d=b.pendingWorkPriority;b.stateNode=null===a?Yb(b,b.stateNode,e,d):a.child===b.child?Xb(b,b.stateNode,e,d):Zb(b,b.stateNode,e,d);b.memoizedProps=c;return b.stateNode;case 9:return null;case 4:a:{H(b,b.stateNode.containerInfo);c=b.pendingWorkPriority;
e=b.pendingProps;if(S.current)null===e&&(e=a&&a.memoizedProps,null==e?m("154"):void 0);else if(null===e||b.memoizedProps===e){b=l(a,b);break a}null===a?b.child=Zb(b,b.child,e,c):f(a,b,e);b.memoizedProps=e;b=b.child}return b;case 10:a:{c=b.pendingProps;if(S.current)null===c&&(c=b.memoizedProps);else if(null===c||b.memoizedProps===c){b=l(a,b);break a}f(a,b,c);b.memoizedProps=c;b=b.child}return b;default:m("156")}},beginFailedWork:function(a,b,c){switch(b.tag){case 2:gb(b);break;case 3:Q(b);break;default:m("157")}b.effectTag|=
64;null===a?b.child=null:b.child!==a.child&&(b.child=a.child);if(0===b.pendingWorkPriority||b.pendingWorkPriority>c)return r(a,b);b.firstEffect=null;b.lastEffect=null;g(a,b,null,c);2===b.tag&&(a=b.stateNode,b.memoizedProps=a.props,b.memoizedState=a.state);return b.child}}}function id(a,b){var c=a.stateNode;c?void 0:m("169");if(b){var d=kd(a,cb,!0);c.__reactInternalMemoizedMergedChildContext=d;K(S,a);K(ca,a);L(ca,d,a)}else K(S,a);L(S,b,a)}function jd(a,b,c){null!=ca.cursor?m("168"):void 0;L(ca,b,a);
L(S,c,a)}function gb(a){if(!Ea(a))return!1;var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||ba;cb=ca.current;L(ca,b,a);L(S,S.current,a);return!0}function $e(a,b,c,d){function e(a,b){b.updater=f;a.stateNode=b;fa.set(b,a)}var f={isMounted:af,enqueueSetState:function(c,d,e){c=fa.get(c);var f=b(c,!1);hb(c,{priorityLevel:f,partialState:d,callback:void 0===e?null:e,isReplace:!1,isForced:!1,isTopLevelUnmount:!1,next:null});a(c,f)},enqueueReplaceState:function(c,d,e){c=fa.get(c);var f=
b(c,!1);hb(c,{priorityLevel:f,partialState:d,callback:void 0===e?null:e,isReplace:!0,isForced:!1,isTopLevelUnmount:!1,next:null});a(c,f)},enqueueForceUpdate:function(c,d){c=fa.get(c);var e=b(c,!1);hb(c,{priorityLevel:e,partialState:null,callback:void 0===d?null:d,isReplace:!1,isForced:!0,isTopLevelUnmount:!1,next:null});a(c,e)}};return{adoptClassInstance:e,constructClassInstance:function(a,b){var c=a.type,d=Ca(a),f=2===a.tag&&null!=a.type.contextTypes,g=f?Da(a,d):ba;b=new c(b,g);e(a,b);f&&(a=a.stateNode,
a.__reactInternalMemoizedUnmaskedChildContext=d,a.__reactInternalMemoizedMaskedChildContext=g);return b},mountClassInstance:function(a,b){var c=a.alternate,d=a.stateNode,e=d.state||null,g=a.pendingProps;g?void 0:m("158");var h=Ca(a);d.props=g;d.state=e;d.refs=ba;d.context=Da(a,h);null!=a.type&&null!=a.type.prototype&&!0===a.type.prototype.unstable_isAsyncReactComponent&&(a.internalContextTag|=1);"function"===typeof d.componentWillMount&&(h=d.state,d.componentWillMount(),h!==d.state&&f.enqueueReplaceState(d,
d.state,null),h=a.updateQueue,null!==h&&(d.state=ac(c,a,h,d,e,g,b)));"function"===typeof d.componentDidMount&&(a.effectTag|=4)},updateClassInstance:function(a,b,e){var g=b.stateNode;g.props=b.memoizedProps;g.state=b.memoizedState;var h=b.memoizedProps,k=b.pendingProps;k||(k=h,null==k?m("159"):void 0);var l=g.context,r=Ca(b);r=Da(b,r);"function"!==typeof g.componentWillReceiveProps||h===k&&l===r||(l=g.state,g.componentWillReceiveProps(k,r),g.state!==l&&f.enqueueReplaceState(g,g.state,null));l=b.memoizedState;
e=null!==b.updateQueue?ac(a,b,b.updateQueue,g,l,k,e):l;if(!(h!==k||l!==e||S.current||null!==b.updateQueue&&b.updateQueue.hasForceUpdate))return"function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&l===a.memoizedState||(b.effectTag|=4),!1;var q=k;if(null===h||null!==b.updateQueue&&b.updateQueue.hasForceUpdate)q=!0;else{var t=b.stateNode,w=b.type;q="function"===typeof t.shouldComponentUpdate?t.shouldComponentUpdate(q,e,r):w.prototype&&w.prototype.isPureReactComponent?!bc(h,q)||!bc(l,e):!0}q?
("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(k,e,r),"function"===typeof g.componentDidUpdate&&(b.effectTag|=4)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&l===a.memoizedState||(b.effectTag|=4),c(b,k),d(b,e));g.props=k;g.state=e;g.context=r;return q}}}function bc(a,b){if(ld(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++)if(!bf.call(b,
c[d])||!ld(a[c[d]],b[c[d]]))return!1;return!0}function cc(a,b,c){b=new F(4,a.key,b);b.pendingProps=a.children||[];b.pendingWorkPriority=c;b.stateNode={containerInfo:a.containerInfo,implementation:a.implementation};return b}function dc(a,b,c){b=new F(7,a.key,b);b.type=a.handler;b.pendingProps=a;b.pendingWorkPriority=c;return b}function ec(a,b,c){b=new F(6,null,b);b.pendingProps=a;b.pendingWorkPriority=c;return b}function md(a,b,c){b=new F(10,null,b);b.pendingProps=a;b.pendingWorkPriority=c;return b}
function fc(a,b,c){var d=a.type,e=a.key,f=void 0;"function"===typeof d?(f=d.prototype&&d.prototype.isReactComponent?new F(2,e,b):new F(0,e,b),f.type=d):"string"===typeof d?(f=new F(5,e,b),f.type=d):"object"===typeof d&&null!==d&&"number"===typeof d.tag?f=d:m("130",null==d?d:typeof d,"");b=f;b.pendingProps=a.props;b.pendingWorkPriority=c;return b}function ad(a,b){var c=a.alternate;null===c?(c=new F(a.tag,a.key,a.internalContextTag),c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):
(c.effectTag=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.pendingWorkPriority=b;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}function dd(a){Ea(a)&&(K(S,a),K(ca,a))}function Da(a,b){var c=a.type.contextTypes;if(!c)return ba;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=
b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function Ca(a){return Ea(a)?cb:ca.current}function L(a,b){da++;bb[da]=a.current;a.current=b}function K(a){0>da||(a.current=bb[da],bb[da]=null,da--)}function ac(a,b,c,d,e,f,g){null!==a&&a.updateQueue===c&&(c=b.updateQueue={first:c.first,last:c.last,callbackList:null,hasForceUpdate:!1});a=c.callbackList;for(var h=c.hasForceUpdate,m=!0,l=c.first;null!==l&&0>=gc(l.priorityLevel,
g);){c.first=l.next;null===c.first&&(c.last=null);var r;if(l.isReplace)e=nd(l,d,e,f),m=!0;else if(r=nd(l,d,e,f))e=m?q({},e,r):q(e,r),m=!1;l.isForced&&(h=!0);null===l.callback||l.isTopLevelUnmount&&null!==l.next||(a=null!==a?a:[],a.push(l.callback),b.effectTag|=32);l=l.next}c.callbackList=a;c.hasForceUpdate=h;null!==c.first||null!==a||h||(b.updateQueue=null);return e}function od(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}function hc(a,
b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}function ic(a,b){b&&(cf[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?m("137",a,""):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?m("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?
void 0:m("61")),null!=b.style&&"object"!==typeof b.style?m("62",""):void 0)}function ib(a){if(jc[a])return jc[a];if(!ra[a])return a;var b=ra[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in pd)return jc[a]=b[c];return""}function Fa(a,b){if(!z||b&&!("addEventListener"in document))return!1;b="on"+a;var c=b in document;c||(c=document.createElement("div"),c.setAttribute(b,"return;"),c="function"===typeof c[b]);!c&&qd&&"wheel"===a&&(c=document.implementation.hasFeature("Events.wheel","3.0"));return c}function df(a){return rd(a,
!1)}function ef(a){return rd(a,!0)}function rd(a,b){a&&(Ga.executeDispatchesInOrder(a,b),a.isPersistent()||a.constructor.release(a))}function Ha(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a)}function sa(a,b){null==b?m("30"):void 0;if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}function jb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===
a.nodeType?a.parentNode:a}function sd(a,b){return a(b)}function kc(a,b,c,d,e,f){return a(b,c,d,e,f)}function ff(){if(t._hasRethrowError){var a=t._rethrowError;t._rethrowError=null;t._hasRethrowError=!1;throw a;}}function td(a,b,c,d,e,f,g,h,m){t._hasCaughtError=!1;t._caughtError=null;var k=Array.prototype.slice.call(arguments,3);try{b.apply(c,k)}catch(T){t._caughtError=T,t._hasCaughtError=!0}}function Ba(a){if("function"===typeof a.getName)return a.getName();if("number"===typeof a.tag){a=a.type;if("string"===
typeof a)return a;if("function"===typeof a)return a.displayName||a.name}return null}function ka(){}function m(a){for(var b=arguments.length-1,c="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,d=0;d<b;d++)c+="\x26args[]\x3d"+encodeURIComponent(arguments[d+1]);b=Error(c+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}function Sc(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";
case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ud(){if(kb)for(var a in ta){var b=ta[a],c=kb.indexOf(a);-1<c?void 0:m("96",a);if(!ha.plugins[c]){b.extractEvents?void 0:m("97",a);ha.plugins[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;ha.eventNameDispatchConfigs.hasOwnProperty(h)?m("99",h):void 0;ha.eventNameDispatchConfigs[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&vd(k[e],g,h);e=!0}else f.registrationName?
(vd(f.registrationName,g,h),e=!0):e=!1;e?void 0:m("98",d,a)}}}}function vd(a,b,c){ha.registrationNameModules[a]?m("100",a):void 0;ha.registrationNameModules[a]=b;ha.registrationNameDependencies[a]=b.eventTypes[c].dependencies}function lb(a){return function(){return a}}function ua(a,b){return(a&b)===b}function wd(a){for(var b;b=a._renderedComponent;)a=b;return a}function xd(a,b){a=wd(a);a._hostNode=b;b[M]=a}function lc(a,b){if(!(a._flags&yd.hasCachedChildNodes)){var c=a._renderedChildren;b=b.firstChild;
var d;a:for(d in c)if(c.hasOwnProperty(d)){var e=c[d],f=wd(e)._domID;if(0!==f){for(;null!==b;b=b.nextSibling){var g=b,h=f;if(1===g.nodeType&&g.getAttribute(gf)===""+h||8===g.nodeType&&g.nodeValue===" react-text: "+h+" "||8===g.nodeType&&g.nodeValue===" react-empty: "+h+" "){xd(e,b);continue a}}m("32",f)}}a._flags|=yd.hasCachedChildNodes}}function zd(a){if(a[M])return a[M];for(var b=[];!a[M];)if(b.push(a),a.parentNode)a=a.parentNode;else return null;var c=a[M];if(5===c.tag||6===c.tag)return c;for(;a&&
(c=a[M]);a=b.pop()){var d=c;b.length&&lc(c,a)}return d}function mb(a){var b=a;if(a.alternate)for(;b["return"];)b=b["return"];else{if(0!==(b.effectTag&2))return 1;for(;b["return"];)if(b=b["return"],0!==(b.effectTag&2))return 1}return 3===b.tag?2:3}function Ad(a){2!==mb(a)?m("188"):void 0}function mc(a){var b=a.alternate;if(!b)return b=mb(a),3===b?m("188"):void 0,1===b?null:a;for(var c=a,d=b;;){var e=c["return"],f=e?e.alternate:null;if(!e||!f)break;if(e.child===f.child){for(var g=e.child;g;){if(g===
c)return Ad(e),a;if(g===d)return Ad(e),b;g=g.sibling}m("188")}if(c["return"]!==d["return"])c=e,d=f;else{g=!1;for(var h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}g?void 0:m("189")}}c.alternate!==d?m("190"):void 0}3!==c.tag?m("188"):void 0;return c.stateNode.current===c?a:b}function Bd(a,b,c,d){b=a.type||"unknown-event";a.currentTarget=nc.getNodeFromInstance(d);Cd.invokeGuardedCallbackAndCatchFirstError(b,
c,void 0,a);a.currentTarget=null}function Dd(a){if(a=Ga.getInstanceFromNode(a))if("number"===typeof a.tag){nb&&"function"===typeof nb.restoreControlledState?void 0:m("194");var b=Ga.getFiberCurrentPropsFromNode(a.stateNode);nb.restoreControlledState(a.stateNode,a.type,b)}else"function"!==typeof a.restoreControlledState?m("195"):void 0,a.restoreControlledState()}function Ed(a,b){return sd(a,b)}function hf(a){var b=a.targetInst;do{if(!b){a.ancestors.push(b);break}var c=b;if("number"===typeof c.tag){for(;c["return"];)c=
c["return"];c=3!==c.tag?null:c.stateNode.containerInfo}else{for(;c._hostParent;)c=c._hostParent;c=N.getNodeFromInstance(c).parentNode}if(!c)break;a.ancestors.push(b);b=N.getClosestInstanceFromNode(c)}while(b);for(c=0;c<a.ancestors.length;c++)b=a.ancestors[c],ia._handleTopLevel(a.topLevelType,b,a.nativeEvent,jb(a.nativeEvent))}function Fd(a,b,c){switch(a){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":return!(!c.disabled||
"button"!==b&&"input"!==b&&"select"!==b&&"textarea"!==b);default:return!1}}function ob(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;c["ms"+a]="MS"+b;c["O"+a]="o"+b.toLowerCase();return c}function Gd(a){Object.prototype.hasOwnProperty.call(a,pb)||(a[pb]=jf++,Hd[a[pb]]={});return Hd[a[pb]]}function kf(a){if(Id.hasOwnProperty(a))return!0;if(Jd.hasOwnProperty(a))return!1;if(lf.test(a))return Id[a]=!0;Jd[a]=!0;return!1}function Kd(){return null}function mf(a){var b=
"";Za.Children.forEach(a,function(a){null==a||"string"!==typeof a&&"number"!==typeof a||(b+=a)});return b}function va(a,b,c){a=a.options;if(b){b={};for(var d=0;d<c.length;d++)b["$"+c[d]]=!0;for(c=0;c<a.length;c++)d=b.hasOwnProperty("$"+a[c].value),a[c].selected!==d&&(a[c].selected=d)}else{c=""+c;b=null;for(d=0;d<a.length;d++){if(a[d].value===c){a[d].selected=!0;return}null!==b||a[d].disabled||(b=a[d])}null!==b&&(b.selected=!0)}}function Ld(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&
("checkbox"===b||"radio"===b)}function nf(a){var b=Ld(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"function"===typeof c.get&&"function"===typeof c.set)return Object.defineProperty(a,b,{enumerable:c.enumerable,configurable:!0,get:function(){return c.get.call(this)},set:function(a){d=""+a;c.set.call(this,a)}}),{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=null;delete a[b]}}}
function R(a,b){of(b,9===a.nodeType||11===a.nodeType?a:a.ownerDocument)}function gc(a,b){return 2!==a&&1!==a||2!==b&&1!==b?0===a&&0!==b?-255:0!==a&&0===b?255:a-b:0}function Md(){return{first:null,last:null,hasForceUpdate:!1,callbackList:null}}function oc(a,b,c,d){null!==c?c.next=b:(b.next=a.first,a.first=b);null!==d?b.next=d:a.last=b}function Nd(a,b){b=b.priorityLevel;var c=null;if(null!==a.last&&0>=gc(a.last.priorityLevel,b))c=a.last;else for(a=a.first;null!==a&&0>=gc(a.priorityLevel,b);)c=a,a=a.next;
return c}function hb(a,b){var c=a.alternate,d=a.updateQueue;null===d&&(d=a.updateQueue=Md());null!==c?(a=c.updateQueue,null===a&&(a=c.updateQueue=Md())):a=null;pc=d;qc=a!==d?a:null;var e=pc;c=qc;var f=Nd(e,b),g=null!==f?f.next:e.first;if(null===c)return oc(e,b,f,g),null;d=Nd(c,b);a=null!==d?d.next:c.first;oc(e,b,f,g);if(g===a&&null!==g||f===d&&null!==f)return null===d&&(c.first=b),null===a&&(c.last=null),null;b={priorityLevel:b.priorityLevel,partialState:b.partialState,callback:b.callback,isReplace:b.isReplace,
isForced:b.isForced,isTopLevelUnmount:b.isTopLevelUnmount,next:null};oc(c,b,d,a);return b}function nd(a,b,c,d){a=a.partialState;return"function"===typeof a?a.call(b,c,d):a}function Ea(a){return 2===a.tag&&null!=a.type.childContextTypes}function kd(a,b){var c=a.stateNode,d=a.type.childContextTypes;if("function"!==typeof c.getChildContext)return b;c=c.getChildContext();for(var e in c)e in d?void 0:m("108",Ba(a)||"Unknown",e);return q({},b,c)}function F(a,b,c){this.tag=a;this.key=b;this.stateNode=this.type=
null;this.sibling=this.child=this["return"]=null;this.index=0;this.memoizedState=this.updateQueue=this.memoizedProps=this.pendingProps=this.ref=null;this.internalContextTag=c;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.pendingWorkPriority=0;this.alternate=null}function Ia(a){if(null===a||"undefined"===typeof a)return null;a=Od&&a[Od]||a["@@iterator"];return"function"===typeof a?a:null}function Ja(a,b){var c=b.ref;if(null!==c&&"function"!==typeof c){if(b._owner){b=b._owner;
var d=void 0;b&&("number"===typeof b.tag?(2!==b.tag?m("110"):void 0,d=b.stateNode):d=b.getPublicInstance());d?void 0:m("147",c);var e=""+c;if(null!==a&&null!==a.ref&&a.ref._stringRef===e)return a.ref;a=function(a){var b=d.refs===ba?d.refs={}:d.refs;null===a?delete b[e]:b[e]=a};a._stringRef=e;return a}"string"!==typeof c?m("148"):void 0;b._owner?void 0:m("149",c)}return c}function qb(a,b){"textarea"!==a.type&&m("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+
"}":b,"")}function rc(a,b){function c(c,d){if(b){if(!a){if(null===d.alternate)return;d=d.alternate}var e=c.lastEffect;null!==e?(e.nextEffect=d,c.lastEffect=d):c.firstEffect=c.lastEffect=d;d.nextEffect=null;d.effectTag=8}}function d(a,d){if(!b)return null;for(;null!==d;)c(a,d),d=d.sibling;return null}function e(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function f(b,c){if(a)return b=$b(b,c),b.index=0,b.sibling=null,b;b.pendingWorkPriority=c;b.effectTag=
0;b.index=0;b.sibling=null;return b}function g(a,c,d){a.index=d;if(!b)return c;d=a.alternate;if(null!==d)return d=d.index,d<c?(a.effectTag=2,c):d;a.effectTag=2;return c}function h(a){b&&null===a.alternate&&(a.effectTag=2);return a}function k(a,b,c,d){if(null===b||6!==b.tag)return c=ec(c,a.internalContextTag,d),c["return"]=a,c;b=f(b,d);b.pendingProps=c;b["return"]=a;return b}function l(a,b,c,d){if(null===b||b.type!==c.type)return d=fc(c,a.internalContextTag,d),d.ref=Ja(b,c),d["return"]=a,d;d=f(b,d);
d.ref=Ja(b,c);d.pendingProps=c.props;d["return"]=a;return d}function r(a,b,c,d){if(null===b||7!==b.tag)return c=dc(c,a.internalContextTag,d),c["return"]=a,c;b=f(b,d);b.pendingProps=c;b["return"]=a;return b}function q(a,b,c,d){if(null===b||9!==b.tag)return b=new F(9,null,a.internalContextTag),b.type=c.value,b["return"]=a,b;b=f(b,d);b.type=c.value;b["return"]=a;return b}function t(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return c=
cc(c,a.internalContextTag,d),c["return"]=a,c;b=f(b,d);b.pendingProps=c.children||[];b["return"]=a;return b}function w(a,b,c,d){if(null===b||10!==b.tag)return c=md(c,a.internalContextTag,d),c["return"]=a,c;b=f(b,d);b.pendingProps=c;b["return"]=a;return b}function z(a,b,c){if("string"===typeof b||"number"===typeof b)return b=ec(""+b,a.internalContextTag,c),b["return"]=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case rb:return c=fc(b,a.internalContextTag,c),c.ref=Ja(null,b),c["return"]=
a,c;case sb:return b=dc(b,a.internalContextTag,c),b["return"]=a,b;case tb:return c=new F(9,null,a.internalContextTag),c.type=b.value,c["return"]=a,c;case ub:return b=cc(b,a.internalContextTag,c),b["return"]=a,b}if(vb(b)||Ia(b))return b=md(b,a.internalContextTag,c),b["return"]=a,b;qb(a,b)}return null}function A(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:k(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case rb:return c.key===
e?l(a,b,c,d):null;case sb:return c.key===e?r(a,b,c,d):null;case tb:return null===e?q(a,b,c,d):null;case ub:return c.key===e?t(a,b,c,d):null}if(vb(c)||Ia(c))return null!==e?null:w(a,b,c,d);qb(a,c)}return null}function B(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||null,k(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case rb:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e);case sb:return a=a.get(null===d.key?c:d.key)||null,r(b,a,d,e);case tb:return a=
a.get(c)||null,q(b,a,d,e);case ub:return a=a.get(null===d.key?c:d.key)||null,t(b,a,d,e)}if(vb(d)||Ia(d))return a=a.get(c)||null,w(b,a,d,e);qb(b,d)}return null}function C(a,f,h,m){for(var p=null,n=null,l=f,k=f=0,v=null;null!==l&&k<h.length;k++){l.index>k?(v=l,l=null):v=l.sibling;var r=A(a,l,h[k],m);if(null===r){null===l&&(l=v);break}b&&l&&null===r.alternate&&c(a,l);f=g(r,f,k);null===n?p=r:n.sibling=r;n=r;l=v}if(k===h.length)return d(a,l),p;if(null===l){for(;k<h.length;k++)if(l=z(a,h[k],m))f=g(l,f,
k),null===n?p=l:n.sibling=l,n=l;return p}for(l=e(a,l);k<h.length;k++)if(v=B(l,a,k,h[k],m)){if(b&&null!==v.alternate)l["delete"](null===v.key?k:v.key);f=g(v,f,k);null===n?p=v:n.sibling=v;n=v}b&&l.forEach(function(b){return c(a,b)});return p}function x(a,f,h,l){var p=Ia(h);"function"!==typeof p?m("150"):void 0;h=p.call(h);null==h?m("151"):void 0;for(var n=p=null,k=f,v=f=0,r=null,q=h.next();null!==k&&!q.done;v++,q=h.next()){k.index>v?(r=k,k=null):r=k.sibling;var t=A(a,k,q.value,l);if(null===t){k||(k=
r);break}b&&k&&null===t.alternate&&c(a,k);f=g(t,f,v);null===n?p=t:n.sibling=t;n=t;k=r}if(q.done)return d(a,k),p;if(null===k){for(;!q.done;v++,q=h.next())q=z(a,q.value,l),null!==q&&(f=g(q,f,v),null===n?p=q:n.sibling=q,n=q);return p}for(k=e(a,k);!q.done;v++,q=h.next())if(q=B(k,a,v,q.value,l),null!==q){if(b&&null!==q.alternate)k["delete"](null===q.key?v:q.key);f=g(q,f,v);null===n?p=q:n.sibling=q;n=q}b&&k.forEach(function(b){return c(a,b)});return p}return function(a,b,e,g){var k="object"===typeof e&&
null!==e;if(k)switch(e.$$typeof){case rb:a:{var l=e.key;for(k=b;null!==k;){if(k.key===l)if(k.type===e.type){d(a,k.sibling);b=f(k,g);b.ref=Ja(k,e);b.pendingProps=e.props;b["return"]=a;a=b;break a}else{d(a,k);break}else c(a,k);k=k.sibling}g=fc(e,a.internalContextTag,g);g.ref=Ja(b,e);g["return"]=a;a=g}return h(a);case sb:a:{for(k=e.key;null!==b;){if(b.key===k)if(7===b.tag){d(a,b.sibling);b=f(b,g);b.pendingProps=e;b["return"]=a;a=b;break a}else{d(a,b);break}else c(a,b);b=b.sibling}e=dc(e,a.internalContextTag,
g);e["return"]=a;a=e}return h(a);case tb:a:{if(null!==b)if(9===b.tag){d(a,b.sibling);b=f(b,g);b.type=e.value;b["return"]=a;a=b;break a}else d(a,b);b=new F(9,null,a.internalContextTag);b.type=e.value;b["return"]=a;a=b}return h(a);case ub:a:{for(k=e.key;null!==b;){if(b.key===k)if(4===b.tag&&b.stateNode.containerInfo===e.containerInfo&&b.stateNode.implementation===e.implementation){d(a,b.sibling);b=f(b,g);b.pendingProps=e.children||[];b["return"]=a;a=b;break a}else{d(a,b);break}else c(a,b);b=b.sibling}e=
cc(e,a.internalContextTag,g);e["return"]=a;a=e}return h(a)}if("string"===typeof e||"number"===typeof e)return e=""+e,null!==b&&6===b.tag?(d(a,b.sibling),b=f(b,g),b.pendingProps=e,b["return"]=a,a=b):(d(a,b),e=ec(e,a.internalContextTag,g),e["return"]=a,a=e),h(a);if(vb(e))return C(a,b,e,g);if(Ia(e))return x(a,b,e,g);k&&qb(a,e);if("undefined"===typeof e)switch(a.tag){case 2:case 1:e=a.type,m("152",e.displayName||e.name||"Component")}return d(a,b)}}function ld(a,b){return a===b?0!==a||0!==b||1/a===1/b:
a!==a&&b!==b}function Pd(a){return function(b){try{return a(b)}catch(c){}}}function sc(a){if(!a)return ba;a=fa.get(a);return"number"===typeof a.tag?$c(a):a._processChildContext(a._context)}function Zc(a){for(;a&&a.firstChild;)a=a.firstChild;return a}function Qd(a,b){return a&&b?a===b?!0:Wc(a)?!1:Wc(b)?Qd(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}function C(a){if(void 0!==a._hostParent)return a._hostParent;if("number"===typeof a.tag){do a=
a["return"];while(a&&5!==a.tag);if(a)return a}return null}function Rd(a,b){for(var c=0,d=a;d;d=C(d))c++;d=0;for(var e=b;e;e=C(e))d++;for(;0<c-d;)a=C(a),c--;for(;0<d-c;)b=C(b),d--;for(;c--;){if(a===b||a===b.alternate)return a;a=C(a);b=C(b)}return null}function Sd(a,b,c){if(b=Td(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=sa(c._dispatchListeners,b),c._dispatchInstances=sa(c._dispatchInstances,a)}function pf(a){a&&a.dispatchConfig.phasedRegistrationNames&&wb.traverseTwoPhase(a._targetInst,
Sd,a)}function qf(a){if(a&&a.dispatchConfig.phasedRegistrationNames){var b=a._targetInst;b=b?wb.getParentInstance(b):null;wb.traverseTwoPhase(b,Sd,a)}}function Ud(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Td(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=sa(c._dispatchListeners,b),c._dispatchInstances=sa(c._dispatchInstances,a))}function rf(a){a&&a.dispatchConfig.registrationName&&Ud(a._targetInst,null,a)}function Ka(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=
c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?w.thatReturnsTrue:w.thatReturnsFalse;this.isPropagationStopped=w.thatReturnsFalse;return this}function sf(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}function tf(a){a instanceof this?void 0:m("223");a.destructor();
10>this.eventPool.length&&this.eventPool.push(a)}function Vd(a){a.eventPool=[];a.getPooled=sf;a.release=tf}function Wd(a,b,c,d){return O.call(this,a,b,c,d)}function Xd(a,b,c,d){return O.call(this,a,b,c,d)}function uf(){var a=window.opera;return"object"===typeof a&&"function"===typeof a.version&&12>=parseInt(a.version(),10)}function Yd(a,b){switch(a){case "topKeyUp":return-1!==vf.indexOf(b.keyCode);case "topKeyDown":return 229!==b.keyCode;case "topKeyPress":case "topMouseDown":case "topBlur":return!0;
default:return!1}}function Zd(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}function wf(a,b){switch(a){case "topCompositionEnd":return Zd(b);case "topKeyPress":if(32!==b.which)return null;$d=!0;return ae;case "topTextInput":return a=b.data,a===ae&&$d?null:a;default:return null}}function xf(a,b){if(wa)return"topCompositionEnd"===a||!tc&&Yd(a,b)?(a=xb.getData(),xb.reset(),wa=!1,a):null;switch(a){case "topPaste":return null;case "topKeyPress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&
b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "topCompositionEnd":return be?null:b.data;default:return null}}function ce(a,b,c){a=O.getPooled(de.change,a,b,c);a.type="change";yb.enqueueStateRestore(c);la.accumulateTwoPhaseDispatches(a);return a}function yf(a){X.enqueueEvents(a);X.processEventQueue(!1)}function zb(a){var b=N.getNodeFromInstance(a);if(xa.updateValueIfChanged(b))return a}function zf(a,b){if("topChange"===a)return b}
function ee(){La&&(La.detachEvent("onpropertychange",fe),Ma=La=null)}function fe(a){"value"===a.propertyName&&zb(Ma)&&(a=ce(Ma,a,jb(a)),Ab.batchedUpdates(yf,a))}function Af(a,b,c){"topFocus"===a?(ee(),La=b,Ma=c,La.attachEvent("onpropertychange",fe)):"topBlur"===a&&ee()}function Bf(a){if("topSelectionChange"===a||"topKeyUp"===a||"topKeyDown"===a)return zb(Ma)}function Cf(a,b){if("topClick"===a)return zb(b)}function Df(a,b){if("topInput"===a||"topChange"===a)return zb(b)}function ge(a,b,c,d){return O.call(this,
a,b,c,d)}function Ne(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Ef[a])?!!b[a]:!1}function he(a,b,c,d){return Y.call(this,a,b,c,d)}function ie(a,b){if(uc||null==ya||ya!==Qb())return null;var c=ya;"selectionStart"in c&&vc.hasSelectionCapabilities(c)?c={start:c.selectionStart,end:c.selectionEnd}:window.getSelection?(c=window.getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}):c=void 0;return Na&&bc(Na,
c)?null:(Na=c,a=O.getPooled(je.select,wc,a,b),a.type="select",a.target=ya,la.accumulateTwoPhaseDispatches(a),a)}function ke(a,b,c,d){return O.call(this,a,b,c,d)}function le(a,b,c,d){return O.call(this,a,b,c,d)}function me(a,b,c,d){return Y.call(this,a,b,c,d)}function ne(a,b,c,d){return Y.call(this,a,b,c,d)}function oe(a,b,c,d){return ma.call(this,a,b,c,d)}function pe(a,b,c,d){return Y.call(this,a,b,c,d)}function qe(a,b,c,d){return O.call(this,a,b,c,d)}function re(a,b,c,d){return ma.call(this,a,b,
c,d)}function xc(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function Ff(a){a=a?9===a.nodeType?a.documentElement:a.firstChild:null;return!(!a||1!==a.nodeType||!a.hasAttribute(Gf))}function Bb(a,b,c,d,e){xc(c)?void 0:m("200");var f=c._reactRootContainer;if(f)B.updateContainer(b,f,a,e);else{if(!d&&!Ff(c))for(d=void 0;d=c.lastChild;)c.removeChild(d);var g=B.createContainer(c);f=c._reactRootContainer=g;B.unbatchedUpdates(function(){B.updateContainer(b,
g,a,e)})}return B.getPublicRootInstance(f)}function se(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;xc(b)?void 0:m("200");return te.createPortal(a,b,null,c)}Za?void 0:m("227");var z=!("undefined"===typeof window||!window.document||!window.document.createElement),q=Za.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.assign,kb=null,ta={},ha={plugins:[],eventNameDispatchConfigs:{},registrationNameModules:{},registrationNameDependencies:{},possibleRegistrationNames:null,injectEventPluginOrder:function(a){kb?
m("101"):void 0;kb=Array.prototype.slice.call(a);ud()},injectEventPluginsByName:function(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];ta.hasOwnProperty(c)&&ta[c]===d||(ta[c]?m("102",c):void 0,ta[c]=d,b=!0)}b&&ud()}},na=ha;ka.thatReturns=lb;ka.thatReturnsFalse=lb(!1);ka.thatReturnsTrue=lb(!0);ka.thatReturnsNull=lb(null);ka.thatReturnsThis=function(){return this};ka.thatReturnsArgument=function(a){return a};var w=ka,ue={listen:function(a,b,c){if(a.addEventListener)return a.addEventListener(b,
c,!1),{remove:function(){a.removeEventListener(b,c,!1)}};if(a.attachEvent)return a.attachEvent("on"+b,c),{remove:function(){a.detachEvent("on"+b,c)}}},capture:function(a,b,c){return a.addEventListener?(a.addEventListener(b,c,!0),{remove:function(){a.removeEventListener(b,c,!0)}}):{remove:w}},registerDefault:function(){}},Hf={children:!0,dangerouslySetInnerHTML:!0,autoFocus:!0,defaultValue:!0,defaultChecked:!0,innerHTML:!0,suppressContentEditableWarning:!0,style:!0},ve={MUST_USE_PROPERTY:1,HAS_BOOLEAN_VALUE:4,
HAS_NUMERIC_VALUE:8,HAS_POSITIVE_NUMERIC_VALUE:24,HAS_OVERLOADED_BOOLEAN_VALUE:32,HAS_STRING_BOOLEAN_VALUE:64,injectDOMPropertyConfig:function(a){var b=ve,c=a.Properties||{},d=a.DOMAttributeNamespaces||{},e=a.DOMAttributeNames||{};a=a.DOMMutationMethods||{};for(var f in c){aa.properties.hasOwnProperty(f)?m("48",f):void 0;var g=f.toLowerCase(),h=c[f];g={attributeName:g,attributeNamespace:null,propertyName:f,mutationMethod:null,mustUseProperty:ua(h,b.MUST_USE_PROPERTY),hasBooleanValue:ua(h,b.HAS_BOOLEAN_VALUE),
hasNumericValue:ua(h,b.HAS_NUMERIC_VALUE),hasPositiveNumericValue:ua(h,b.HAS_POSITIVE_NUMERIC_VALUE),hasOverloadedBooleanValue:ua(h,b.HAS_OVERLOADED_BOOLEAN_VALUE),hasStringBooleanValue:ua(h,b.HAS_STRING_BOOLEAN_VALUE)};1>=g.hasBooleanValue+g.hasNumericValue+g.hasOverloadedBooleanValue?void 0:m("50",f);e.hasOwnProperty(f)&&(g.attributeName=e[f]);d.hasOwnProperty(f)&&(g.attributeNamespace=d[f]);a.hasOwnProperty(f)&&(g.mutationMethod=a[f]);aa.properties[f]=g}}},aa={ID_ATTRIBUTE_NAME:"data-reactid",
ROOT_ATTRIBUTE_NAME:"data-reactroot",ATTRIBUTE_NAME_START_CHAR:":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",ATTRIBUTE_NAME_CHAR:":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",properties:{},shouldSetAttribute:function(a,
b){if(aa.isReservedProp(a)||!("o"!==a[0]&&"O"!==a[0]||"n"!==a[1]&&"N"!==a[1]))return!1;if(null===b)return!0;switch(typeof b){case "boolean":return aa.shouldAttributeAcceptBooleanValue(a);case "undefined":case "number":case "string":case "object":return!0;default:return!1}},getPropertyInfo:function(a){return aa.properties.hasOwnProperty(a)?aa.properties[a]:null},shouldAttributeAcceptBooleanValue:function(a){if(aa.isReservedProp(a))return!0;var b=aa.getPropertyInfo(a);if(b)return b.hasBooleanValue||
b.hasStringBooleanValue||b.hasOverloadedBooleanValue;a=a.toLowerCase().slice(0,5);return"data-"===a||"aria-"===a},isReservedProp:function(a){return Hf.hasOwnProperty(a)},injection:ve},A=aa,gf=A.ID_ATTRIBUTE_NAME,yd={hasCachedChildNodes:1},we=Math.random().toString(36).slice(2),M="__reactInternalInstance$"+we,xe="__reactEventHandlers$"+we,N={getClosestInstanceFromNode:zd,getInstanceFromNode:function(a){var b=a[M];if(b)return 5===b.tag||6===b.tag?b:b._hostNode===a?b:null;b=zd(a);return null!=b&&b._hostNode===
a?b:null},getNodeFromInstance:function(a){if(5===a.tag||6===a.tag)return a.stateNode;void 0===a._hostNode?m("33"):void 0;if(a._hostNode)return a._hostNode;for(var b=[];!a._hostNode;)b.push(a),a._hostParent?void 0:m("34"),a=a._hostParent;for(;b.length;a=b.pop())lc(a,a._hostNode);return a._hostNode},precacheChildNodes:lc,precacheNode:xd,uncacheNode:function(a){var b=a._hostNode;b&&(delete b[M],a._hostNode=null)},precacheFiberNode:function(a,b){b[M]=a},getFiberCurrentPropsFromNode:function(a){return a[xe]||
null},updateFiberProps:function(a,b){a[xe]=b}},fa={remove:function(a){a._reactInternalFiber=void 0},get:function(a){return a._reactInternalFiber},has:function(a){return void 0!==a._reactInternalFiber},set:function(a,b){a._reactInternalFiber=b}},yc={ReactCurrentOwner:Za.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner},Oa={isFiberMounted:function(a){return 2===mb(a)},isMounted:function(a){return(a=fa.get(a))?2===mb(a):!1},findCurrentFiberUsingSlowPath:mc,findCurrentHostFiber:function(a){a=
mc(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b["return"]||b["return"]===a)return null;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}return null},findCurrentHostFiberWithNoPortals:function(a){a=mc(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child&&4!==b.tag)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b["return"]||b["return"]===
a)return null;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}return null}},t={_caughtError:null,_hasCaughtError:!1,_rethrowError:null,_hasRethrowError:!1,injection:{injectErrorUtils:function(a){"function"!==typeof a.invokeGuardedCallback?m("197"):void 0;td=a.invokeGuardedCallback}},invokeGuardedCallback:function(a,b,c,d,e,f,g,h,k){td.apply(t,arguments)},invokeGuardedCallbackAndCatchFirstError:function(a,b,c,d,e,f,g,h,k){t.invokeGuardedCallback.apply(this,arguments);if(t.hasCaughtError()){var l=
t.clearCaughtError();t._hasRethrowError||(t._hasRethrowError=!0,t._rethrowError=l)}},rethrowCaughtError:function(){return ff.apply(t,arguments)},hasCaughtError:function(){return t._hasCaughtError},clearCaughtError:function(){if(t._hasCaughtError){var a=t._caughtError;t._caughtError=null;t._hasCaughtError=!1;return a}m("198")}},Cd=t,Cb,nc={isEndish:function(a){return"topMouseUp"===a||"topTouchEnd"===a||"topTouchCancel"===a},isMoveish:function(a){return"topMouseMove"===a||"topTouchMove"===a},isStartish:function(a){return"topMouseDown"===
a||"topTouchStart"===a},executeDirectDispatch:function(a){var b=a._dispatchListeners,c=a._dispatchInstances;Array.isArray(b)?m("103"):void 0;a.currentTarget=b?nc.getNodeFromInstance(c):null;b=b?b(a):null;a.currentTarget=null;a._dispatchListeners=null;a._dispatchInstances=null;return b},executeDispatchesInOrder:function(a,b){var c=a._dispatchListeners,d=a._dispatchInstances;if(Array.isArray(c))for(var e=0;e<c.length&&!a.isPropagationStopped();e++)Bd(a,b,c[e],d[e]);else c&&Bd(a,b,c,d);a._dispatchListeners=
null;a._dispatchInstances=null},executeDispatchesInOrderStopAtTrue:function(a){a:{var b=a._dispatchListeners;var c=a._dispatchInstances;if(Array.isArray(b))for(var d=0;d<b.length&&!a.isPropagationStopped();d++){if(b[d](a,c[d])){b=c[d];break a}}else if(b&&b(a,c)){b=c;break a}b=null}a._dispatchInstances=null;a._dispatchListeners=null;return b},hasDispatches:function(a){return!!a._dispatchListeners},getFiberCurrentPropsFromNode:function(a){return Cb.getFiberCurrentPropsFromNode(a)},getInstanceFromNode:function(a){return Cb.getInstanceFromNode(a)},
getNodeFromInstance:function(a){return Cb.getNodeFromInstance(a)},injection:{injectComponentTree:function(a){Cb=a}}},Ga=nc,nb=null,Pa=null,Qa=null,yb={injection:{injectFiberControlledHostComponent:function(a){nb=a}},enqueueStateRestore:function(a){Pa?Qa?Qa.push(a):Qa=[a]:Pa=a},restoreStateIfNeeded:function(){if(Pa){var a=Pa,b=Qa;Qa=Pa=null;Dd(a);if(b)for(a=0;a<b.length;a++)Dd(b[a])}}},zc=!1,Ab={batchedUpdates:function(a,b){if(zc)return kc(Ed,a,b);zc=!0;try{return kc(Ed,a,b)}finally{zc=!1,yb.restoreStateIfNeeded()}},
injection:{injectStackBatchedUpdates:function(a){kc=a},injectFiberBatchedUpdates:function(a){sd=a}}},Db=[],ia={_enabled:!0,_handleTopLevel:null,setHandleTopLevel:function(a){ia._handleTopLevel=a},setEnabled:function(a){ia._enabled=!!a},isEnabled:function(){return ia._enabled},trapBubbledEvent:function(a,b,c){return c?ue.listen(c,b,ia.dispatchEvent.bind(null,a)):null},trapCapturedEvent:function(a,b,c){return c?ue.capture(c,b,ia.dispatchEvent.bind(null,a)):null},dispatchEvent:function(a,b){if(ia._enabled){var c=
jb(b);c=N.getClosestInstanceFromNode(c);null===c||"number"!==typeof c.tag||Oa.isFiberMounted(c)||(c=null);if(Db.length){var d=Db.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d}else a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]};try{Ab.batchedUpdates(hf,a)}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>Db.length&&Db.push(a)}}}},G=ia,Ra=null,X={injection:{injectEventPluginOrder:na.injectEventPluginOrder,injectEventPluginsByName:na.injectEventPluginsByName},
getListener:function(a,b){if("number"===typeof a.tag){var c=a.stateNode;if(!c)return null;var d=Ga.getFiberCurrentPropsFromNode(c);if(!d)return null;c=d[b];if(Fd(b,a.type,d))return null}else{d=a._currentElement;if("string"===typeof d||"number"===typeof d||!a._rootNodeID)return null;a=d.props;c=a[b];if(Fd(b,d.type,a))return null}c&&"function"!==typeof c?m("231",b,typeof c):void 0;return c},extractEvents:function(a,b,c,d){for(var e,f=na.plugins,g=0;g<f.length;g++){var h=f[g];h&&(h=h.extractEvents(a,
b,c,d))&&(e=sa(e,h))}return e},enqueueEvents:function(a){a&&(Ra=sa(Ra,a))},processEventQueue:function(a){var b=Ra;Ra=null;a?Ha(b,ef):Ha(b,df);Ra?m("95"):void 0;Cd.rethrowCaughtError()}},qd;z&&(qd=document.implementation&&document.implementation.hasFeature&&!0!==document.implementation.hasFeature("",""));var ra={animationend:ob("Animation","AnimationEnd"),animationiteration:ob("Animation","AnimationIteration"),animationstart:ob("Animation","AnimationStart"),transitionend:ob("Transition","TransitionEnd")},
jc={},pd={};z&&(pd=document.createElement("div").style,"AnimationEvent"in window||(delete ra.animationend.animation,delete ra.animationiteration.animation,delete ra.animationstart.animation),"TransitionEvent"in window||delete ra.transitionend.transition);var ye={topAbort:"abort",topAnimationEnd:ib("animationend")||"animationend",topAnimationIteration:ib("animationiteration")||"animationiteration",topAnimationStart:ib("animationstart")||"animationstart",topBlur:"blur",topCancel:"cancel",topCanPlay:"canplay",
topCanPlayThrough:"canplaythrough",topChange:"change",topClick:"click",topClose:"close",topCompositionEnd:"compositionend",topCompositionStart:"compositionstart",topCompositionUpdate:"compositionupdate",topContextMenu:"contextmenu",topCopy:"copy",topCut:"cut",topDoubleClick:"dblclick",topDrag:"drag",topDragEnd:"dragend",topDragEnter:"dragenter",topDragExit:"dragexit",topDragLeave:"dragleave",topDragOver:"dragover",topDragStart:"dragstart",topDrop:"drop",topDurationChange:"durationchange",topEmptied:"emptied",
topEncrypted:"encrypted",topEnded:"ended",topError:"error",topFocus:"focus",topInput:"input",topKeyDown:"keydown",topKeyPress:"keypress",topKeyUp:"keyup",topLoadedData:"loadeddata",topLoad:"load",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topMouseDown:"mousedown",topMouseMove:"mousemove",topMouseOut:"mouseout",topMouseOver:"mouseover",topMouseUp:"mouseup",topPaste:"paste",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topScroll:"scroll",
topSeeked:"seeked",topSeeking:"seeking",topSelectionChange:"selectionchange",topStalled:"stalled",topSuspend:"suspend",topTextInput:"textInput",topTimeUpdate:"timeupdate",topToggle:"toggle",topTouchCancel:"touchcancel",topTouchEnd:"touchend",topTouchMove:"touchmove",topTouchStart:"touchstart",topTransitionEnd:ib("transitionend")||"transitionend",topVolumeChange:"volumechange",topWaiting:"waiting",topWheel:"wheel"},Hd={},jf=0,pb="_reactListenersID"+(""+Math.random()).slice(2),l=q({},{handleTopLevel:function(a,
b,c,d){a=X.extractEvents(a,b,c,d);X.enqueueEvents(a);X.processEventQueue(!1)}},{setEnabled:function(a){G&&G.setEnabled(a)},isEnabled:function(){return!(!G||!G.isEnabled())},listenTo:function(a,b){var c=Gd(b);a=na.registrationNameDependencies[a];for(var d=0;d<a.length;d++){var e=a[d];c.hasOwnProperty(e)&&c[e]||("topWheel"===e?Fa("wheel")?G.trapBubbledEvent("topWheel","wheel",b):Fa("mousewheel")?G.trapBubbledEvent("topWheel","mousewheel",b):G.trapBubbledEvent("topWheel","DOMMouseScroll",b):"topScroll"===
e?G.trapCapturedEvent("topScroll","scroll",b):"topFocus"===e||"topBlur"===e?(G.trapCapturedEvent("topFocus","focus",b),G.trapCapturedEvent("topBlur","blur",b),c.topBlur=!0,c.topFocus=!0):"topCancel"===e?(Fa("cancel",!0)&&G.trapCapturedEvent("topCancel","cancel",b),c.topCancel=!0):"topClose"===e?(Fa("close",!0)&&G.trapCapturedEvent("topClose","close",b),c.topClose=!0):ye.hasOwnProperty(e)&&G.trapBubbledEvent(e,ye[e],b),c[e]=!0)}},isListeningToAllDependencies:function(a,b){b=Gd(b);a=na.registrationNameDependencies[a];
for(var c=0;c<a.length;c++){var d=a[c];if(!b.hasOwnProperty(d)||!b[d])return!1}return!0},trapBubbledEvent:function(a,b,c){return G.trapBubbledEvent(a,b,c)},trapCapturedEvent:function(a,b,c){return G.trapCapturedEvent(a,b,c)}}),Sa={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,
gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},If=["Webkit","ms","Moz","O"];Object.keys(Sa).forEach(function(a){If.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);Sa[b]=Sa[a]})});var Jf={background:{backgroundAttachment:!0,
backgroundColor:!0,backgroundImage:!0,backgroundPositionX:!0,backgroundPositionY:!0,backgroundRepeat:!0},backgroundPosition:{backgroundPositionX:!0,backgroundPositionY:!0},border:{borderWidth:!0,borderStyle:!0,borderColor:!0},borderBottom:{borderBottomWidth:!0,borderBottomStyle:!0,borderBottomColor:!0},borderLeft:{borderLeftWidth:!0,borderLeftStyle:!0,borderLeftColor:!0},borderRight:{borderRightWidth:!0,borderRightStyle:!0,borderRightColor:!0},borderTop:{borderTopWidth:!0,borderTopStyle:!0,borderTopColor:!0},
font:{fontStyle:!0,fontVariant:!0,fontWeight:!0,fontSize:!0,lineHeight:!0,fontFamily:!0},outline:{outlineWidth:!0,outlineStyle:!0,outlineColor:!0}},ze=!1;if(z){var Kf=document.createElement("div").style;try{Kf.font=""}catch(a){ze=!0}}var Ae={createDangerousStringForStyles:function(){},setValueForStyles:function(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--");var e=c;var f=b[c];e=null==f||"boolean"===typeof f||""===f?"":d||"number"!==typeof f||0===f||Sa.hasOwnProperty(e)&&
Sa[e]?(""+f).trim():f+"px";"float"===c&&(c="cssFloat");if(d)a.setProperty(c,e);else if(e)a[c]=e;else if(d=ze&&Jf[c])for(var g in d)a[g]="";else a[c]=""}}},lf=new RegExp("^["+A.ATTRIBUTE_NAME_START_CHAR+"]["+A.ATTRIBUTE_NAME_CHAR+"]*$"),Jd={},Id={},Ac={setAttributeForID:function(a,b){a.setAttribute(A.ID_ATTRIBUTE_NAME,b)},setAttributeForRoot:function(a){a.setAttribute(A.ROOT_ATTRIBUTE_NAME,"")},getValueForProperty:function(){},getValueForAttribute:function(){},setValueForProperty:function(a,b,c){var d=
A.getPropertyInfo(b);if(d&&A.shouldSetAttribute(b,c)){var e=d.mutationMethod;e?e(a,c):null==c||d.hasBooleanValue&&!c||d.hasNumericValue&&isNaN(c)||d.hasPositiveNumericValue&&1>c||d.hasOverloadedBooleanValue&&!1===c?Ac.deleteValueForProperty(a,b):d.mustUseProperty?a[d.propertyName]=c:(b=d.attributeName,(e=d.attributeNamespace)?a.setAttributeNS(e,b,""+c):d.hasBooleanValue||d.hasOverloadedBooleanValue&&!0===c?a.setAttribute(b,""):a.setAttribute(b,""+c))}else Ac.setValueForAttribute(a,b,A.shouldSetAttribute(b,
c)?c:null)},setValueForAttribute:function(a,b,c){kf(b)&&(null==c?a.removeAttribute(b):a.setAttribute(b,""+c))},deleteValueForAttribute:function(a,b){a.removeAttribute(b)},deleteValueForProperty:function(a,b){var c=A.getPropertyInfo(b);c?(b=c.mutationMethod)?b(a,void 0):c.mustUseProperty?a[c.propertyName]=c.hasBooleanValue?!1:"":a.removeAttribute(c.attributeName):a.removeAttribute(b)}},oa=Ac,Be=yc.ReactDebugCurrentFrame,Ta={current:null,phase:null,resetCurrentFiber:function(){Be.getCurrentStack=null;
Ta.current=null;Ta.phase=null},setCurrentFiber:function(a,b){Be.getCurrentStack=Kd;Ta.current=a;Ta.phase=b},getCurrentFiberOwnerName:function(){return null},getCurrentFiberStackAddendum:Kd},Lf=Ta,Bc={getHostProps:function(a,b){var c=b.value,d=b.checked;return q({type:void 0,step:void 0,min:void 0,max:void 0},b,{defaultChecked:void 0,defaultValue:void 0,value:null!=c?c:a._wrapperState.initialValue,checked:null!=d?d:a._wrapperState.initialChecked})},initWrapperState:function(a,b){var c=b.defaultValue;
a._wrapperState={initialChecked:null!=b.checked?b.checked:b.defaultChecked,initialValue:null!=b.value?b.value:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}},updateWrapper:function(a,b){var c=b.checked;null!=c&&oa.setValueForProperty(a,"checked",c||!1);c=b.value;if(null!=c)if(0===c&&""===a.value)a.value="0";else if("number"===b.type){if(b=parseFloat(a.value)||0,c!=b||c==b&&a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else null==b.value&&null!=b.defaultValue&&
a.defaultValue!==""+b.defaultValue&&(a.defaultValue=""+b.defaultValue),null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)},postMountWrapper:function(a,b){switch(b.type){case "submit":case "reset":break;case "color":case "date":case "datetime":case "datetime-local":case "month":case "time":case "week":a.value="";a.value=a.defaultValue;break;default:a.value=a.value}b=a.name;""!==b&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!a.defaultChecked;""!==b&&
(a.name=b)},restoreControlledState:function(a,b){Bc.updateWrapper(a,b);var c=b.name;if("radio"===b.type&&null!=c){for(b=a;b.parentNode;)b=b.parentNode;c=b.querySelectorAll("input[name\x3d"+JSON.stringify(""+c)+'][type\x3d"radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=N.getFiberCurrentPropsFromNode(d);e?void 0:m("90");Bc.updateWrapper(d,e)}}}}},U=Bc,za={validateProps:function(){},postMountWrapper:function(a,b){null!=b.value&&a.setAttribute("value",b.value)},getHostProps:function(a,
b){a=q({children:void 0},b);if(b=mf(b.children))a.children=b;return a}},ja={getHostProps:function(a,b){return q({},b,{value:void 0})},initWrapperState:function(a,b){var c=b.value;a._wrapperState={initialValue:null!=c?c:b.defaultValue,wasMultiple:!!b.multiple}},postMountWrapper:function(a,b){a.multiple=!!b.multiple;var c=b.value;null!=c?va(a,!!b.multiple,c):null!=b.defaultValue&&va(a,!!b.multiple,b.defaultValue)},postUpdateWrapper:function(a,b){a._wrapperState.initialValue=void 0;var c=a._wrapperState.wasMultiple;
a._wrapperState.wasMultiple=!!b.multiple;var d=b.value;null!=d?va(a,!!b.multiple,d):c!==!!b.multiple&&(null!=b.defaultValue?va(a,!!b.multiple,b.defaultValue):va(a,!!b.multiple,b.multiple?[]:""))},restoreControlledState:function(a,b){var c=b.value;null!=c&&va(a,!!b.multiple,c)}},Ce={getHostProps:function(a,b){null!=b.dangerouslySetInnerHTML?m("91"):void 0;return q({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})},initWrapperState:function(a,b){var c=b.value,d=c;null==
c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?m("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:m("93"),b=b[0]),c=""+b),null==c&&(c=""),d=c);a._wrapperState={initialValue:""+d}},updateWrapper:function(a,b){var c=b.value;null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&(a.defaultValue=c));null!=b.defaultValue&&(a.defaultValue=b.defaultValue)},postMountWrapper:function(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b)},restoreControlledState:function(a,b){Ce.updateWrapper(a,
b)}},V=Ce,cf=q({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}),xa={_getTrackerFromNode:function(a){return a._valueTracker},track:function(a){a._valueTracker||(a._valueTracker=nf(a))},updateValueIfChanged:function(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=Ld(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1},stopTracking:function(a){(a=a._valueTracker)&&
a.stopTracking()}},Eb,Cc=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else for(Eb=Eb||document.createElement("div"),Eb.innerHTML="\x3csvg\x3e"+b+"\x3c/svg\x3e",b=Eb.firstChild;b.firstChild;)a.appendChild(b.firstChild)}),Mf=/["'&<>]/;z&&("textContent"in document.documentElement||(od=function(a,
b){if(3===a.nodeType)a.nodeValue=b;else{if("boolean"===typeof b||"number"===typeof b)b=""+b;else{b=""+b;var c=Mf.exec(b);if(c){var d="",e,f=0;for(e=c.index;e<b.length;e++){switch(b.charCodeAt(e)){case 34:c="\x26quot;";break;case 38:c="\x26amp;";break;case 39:c="\x26#x27;";break;case 60:c="\x26lt;";break;case 62:c="\x26gt;";break;default:continue}f!==e&&(d+=b.substring(f,e));f=e+1;d+=c}b=f!==e?d+b.substring(f,e):d}}Cc(a,b)}}));var Dc=od,Ec=Lf.getCurrentFiberOwnerName,of=l.listenTo,Fb=na.registrationNameModules,
Aa={topAbort:"abort",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topSeeked:"seeked",topSeeking:"seeking",topStalled:"stalled",topSuspend:"suspend",topTimeUpdate:"timeupdate",topVolumeChange:"volumechange",
topWaiting:"waiting"},I={createElement:function(a,b,c,d){c=9===c.nodeType?c:c.ownerDocument;"http://www.w3.org/1999/xhtml"===d&&(d=Sc(a));"http://www.w3.org/1999/xhtml"===d?"script"===a?(a=c.createElement("div"),a.innerHTML="\x3cscript\x3e\x3c/script\x3e",a=a.removeChild(a.firstChild)):a="string"===typeof b.is?c.createElement(a,{is:b.is}):c.createElement(a):a=c.createElementNS(d,a);return a},createTextNode:function(a,b){return(9===b.nodeType?b:b.ownerDocument).createTextNode(a)},setInitialProperties:function(a,
b,c,d){var e=hc(b,c);switch(b){case "iframe":case "object":l.trapBubbledEvent("topLoad","load",a);var f=c;break;case "video":case "audio":for(f in Aa)Aa.hasOwnProperty(f)&&l.trapBubbledEvent(f,Aa[f],a);f=c;break;case "source":l.trapBubbledEvent("topError","error",a);f=c;break;case "img":case "image":l.trapBubbledEvent("topError","error",a);l.trapBubbledEvent("topLoad","load",a);f=c;break;case "form":l.trapBubbledEvent("topReset","reset",a);l.trapBubbledEvent("topSubmit","submit",a);f=c;break;case "details":l.trapBubbledEvent("topToggle",
"toggle",a);f=c;break;case "input":U.initWrapperState(a,c);f=U.getHostProps(a,c);l.trapBubbledEvent("topInvalid","invalid",a);R(d,"onChange");break;case "option":za.validateProps(a,c);f=za.getHostProps(a,c);break;case "select":ja.initWrapperState(a,c);f=ja.getHostProps(a,c);l.trapBubbledEvent("topInvalid","invalid",a);R(d,"onChange");break;case "textarea":V.initWrapperState(a,c);f=V.getHostProps(a,c);l.trapBubbledEvent("topInvalid","invalid",a);R(d,"onChange");break;default:f=c}ic(b,f,Ec);var g=f,
h;for(h in g)if(g.hasOwnProperty(h)){var k=g[h];"style"===h?Ae.setValueForStyles(a,k):"dangerouslySetInnerHTML"===h?(k=k?k.__html:void 0,null!=k&&Cc(a,k)):"children"===h?"string"===typeof k?Dc(a,k):"number"===typeof k&&Dc(a,""+k):"suppressContentEditableWarning"!==h&&(Fb.hasOwnProperty(h)?null!=k&&R(d,h):e?oa.setValueForAttribute(a,h,k):null!=k&&oa.setValueForProperty(a,h,k))}switch(b){case "input":xa.track(a);U.postMountWrapper(a,c);break;case "textarea":xa.track(a);V.postMountWrapper(a,c);break;
case "option":za.postMountWrapper(a,c);break;case "select":ja.postMountWrapper(a,c);break;default:"function"===typeof f.onClick&&(a.onclick=w)}},diffProperties:function(a,b,c,d,e){var f=null;switch(b){case "input":c=U.getHostProps(a,c);d=U.getHostProps(a,d);f=[];break;case "option":c=za.getHostProps(a,c);d=za.getHostProps(a,d);f=[];break;case "select":c=ja.getHostProps(a,c);d=ja.getHostProps(a,d);f=[];break;case "textarea":c=V.getHostProps(a,c);d=V.getHostProps(a,d);f=[];break;default:"function"!==
typeof c.onClick&&"function"===typeof d.onClick&&(a.onclick=w)}ic(b,d,Ec);var g,h;a=null;for(g in c)if(!d.hasOwnProperty(g)&&c.hasOwnProperty(g)&&null!=c[g])if("style"===g)for(h in b=c[g],b)b.hasOwnProperty(h)&&(a||(a={}),a[h]="");else"dangerouslySetInnerHTML"!==g&&"children"!==g&&"suppressContentEditableWarning"!==g&&(Fb.hasOwnProperty(g)?f||(f=[]):(f=f||[]).push(g,null));for(g in d){var k=d[g];b=null!=c?c[g]:void 0;if(d.hasOwnProperty(g)&&k!==b&&(null!=k||null!=b))if("style"===g)if(b){for(h in b)!b.hasOwnProperty(h)||
k&&k.hasOwnProperty(h)||(a||(a={}),a[h]="");for(h in k)k.hasOwnProperty(h)&&b[h]!==k[h]&&(a||(a={}),a[h]=k[h])}else a||(f||(f=[]),f.push(g,a)),a=k;else"dangerouslySetInnerHTML"===g?(k=k?k.__html:void 0,b=b?b.__html:void 0,null!=k&&b!==k&&(f=f||[]).push(g,""+k)):"children"===g?b===k||"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(g,""+k):"suppressContentEditableWarning"!==g&&(Fb.hasOwnProperty(g)?(null!=k&&R(e,g),f||b===k||(f=[])):(f=f||[]).push(g,k))}a&&(f=f||[]).push("style",a);return f},
updateProperties:function(a,b,c,d,e){hc(c,d);d=hc(c,e);for(var f=0;f<b.length;f+=2){var g=b[f],h=b[f+1];"style"===g?Ae.setValueForStyles(a,h):"dangerouslySetInnerHTML"===g?Cc(a,h):"children"===g?Dc(a,h):d?null!=h?oa.setValueForAttribute(a,g,h):oa.deleteValueForAttribute(a,g):null!=h?oa.setValueForProperty(a,g,h):oa.deleteValueForProperty(a,g)}switch(c){case "input":U.updateWrapper(a,e);xa.updateValueIfChanged(a);break;case "textarea":V.updateWrapper(a,e);break;case "select":ja.postUpdateWrapper(a,
e)}},diffHydratedProperties:function(a,b,c,d,e){switch(b){case "iframe":case "object":l.trapBubbledEvent("topLoad","load",a);break;case "video":case "audio":for(var f in Aa)Aa.hasOwnProperty(f)&&l.trapBubbledEvent(f,Aa[f],a);break;case "source":l.trapBubbledEvent("topError","error",a);break;case "img":case "image":l.trapBubbledEvent("topError","error",a);l.trapBubbledEvent("topLoad","load",a);break;case "form":l.trapBubbledEvent("topReset","reset",a);l.trapBubbledEvent("topSubmit","submit",a);break;
case "details":l.trapBubbledEvent("topToggle","toggle",a);break;case "input":U.initWrapperState(a,c);l.trapBubbledEvent("topInvalid","invalid",a);R(e,"onChange");break;case "option":za.validateProps(a,c);break;case "select":ja.initWrapperState(a,c);l.trapBubbledEvent("topInvalid","invalid",a);R(e,"onChange");break;case "textarea":V.initWrapperState(a,c),l.trapBubbledEvent("topInvalid","invalid",a),R(e,"onChange")}ic(b,c,Ec);d=null;for(var g in c)c.hasOwnProperty(g)&&(f=c[g],"children"===g?"string"===
typeof f?a.textContent!==f&&(d=["children",f]):"number"===typeof f&&a.textContent!==""+f&&(d=["children",""+f]):Fb.hasOwnProperty(g)&&null!=f&&R(e,g));switch(b){case "input":xa.track(a);U.postMountWrapper(a,c);break;case "textarea":xa.track(a);V.postMountWrapper(a,c);break;case "select":case "option":break;default:"function"===typeof c.onClick&&(a.onclick=w)}return d},diffHydratedText:function(a,b){return a.nodeValue!==b},warnForDeletedHydratableElement:function(){},warnForDeletedHydratableText:function(){},
warnForInsertedHydratedElement:function(){},warnForInsertedHydratedText:function(){},restoreControlledState:function(a,b,c){switch(b){case "input":U.restoreControlledState(a,c);break;case "textarea":V.restoreControlledState(a,c);break;case "select":ja.restoreControlledState(a,c)}}},Gb=void 0;if(z)if("function"!==typeof requestIdleCallback){var De=null,Fc=null,Gc=!1,Hc=!1,Hb=0,Ib=33,Ua=33,Nf={timeRemaining:"object"===typeof performance&&"function"===typeof performance.now?function(){return Hb-performance.now()}:
function(){return Hb-Date.now()}},Ee="__reactIdleCallback$"+Math.random().toString(36).slice(2);window.addEventListener("message",function(a){a.source===window&&a.data===Ee&&(Gc=!1,a=Fc,Fc=null,null!==a&&a(Nf))},!1);var Of=function(a){Hc=!1;var b=a-Hb+Ua;b<Ua&&Ib<Ua?(8>b&&(b=8),Ua=b<Ib?Ib:b):Ib=b;Hb=a+Ua;Gc||(Gc=!0,window.postMessage(Ee,"*"));b=De;De=null;null!==b&&b(a)};Gb=function(a){Fc=a;Hc||(Hc=!0,requestAnimationFrame(Of));return 0}}else Gb=requestIdleCallback;else Gb=function(a){setTimeout(function(){a({timeRemaining:function(){return Infinity}})});
return 0};var Pf=Gb,pc=void 0,qc=void 0,ba={},bb=[],da=-1,Qf=Oa.isFiberMounted,ca={current:ba},S={current:!1},cb=ba;if("function"===typeof Symbol&&Symbol["for"]){var Fe=Symbol["for"]("react.coroutine");var Ge=Symbol["for"]("react.yield")}else Fe=60104,Ge=60105;var Rf=Ge,Sf=Fe,Ic="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.portal")||60106,te={createPortal:function(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:Ic,key:null==d?null:""+d,children:a,
containerInfo:b,implementation:c}},isPortal:function(a){return"object"===typeof a&&null!==a&&a.$$typeof===Ic},REACT_PORTAL_TYPE:Ic},sb=Sf,tb=Rf,ub=te.REACT_PORTAL_TYPE,$b=ad,vb=Array.isArray,Od="function"===typeof Symbol&&Symbol.iterator,rb="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103,Xb=rc(!0,!0),Zb=rc(!1,!0),Yb=rc(!1,!1),bf=Object.prototype.hasOwnProperty,af=Oa.isMounted,Ze=yc.ReactCurrentOwner,Vb=null,Wb=null,qa={},db=yc.ReactCurrentOwner;sc._injectFiber=function(a){$c=
a};var Tf=Oa.findCurrentHostFiber,Uf=Oa.findCurrentHostFiberWithNoPortals;sc._injectFiber(function(a){var b;a:{Qf(a)&&2===a.tag?void 0:m("170");for(b=a;3!==b.tag;){if(Ea(b)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}(b=b["return"])?void 0:m("171")}b=b.stateNode.context}return Ea(a)?kd(a,b,!1):b});var Rb=null,He={getOffsets:function(a){var b=window.getSelection&&window.getSelection();if(!b||0===b.rangeCount)return null;var c=b.anchorNode,d=b.anchorOffset,e=b.focusNode,f=b.focusOffset,
g=b.getRangeAt(0);try{g.startContainer.nodeType,g.endContainer.nodeType}catch(k){return null}b=b.anchorNode===b.focusNode&&b.anchorOffset===b.focusOffset?0:g.toString().length;var h=g.cloneRange();h.selectNodeContents(a);h.setEnd(g.startContainer,g.startOffset);a=h.startContainer===h.endContainer&&h.startOffset===h.endOffset?0:h.toString().length;g=a+b;b=document.createRange();b.setStart(c,d);b.setEnd(e,f);c=b.collapsed;return{start:c?g:a,end:c?a:g}},setOffsets:function(a,b){if(window.getSelection){var c=
window.getSelection(),d=a[Xc()].length,e=Math.min(b.start,d);b=void 0===b.end?e:Math.min(b.end,d);!c.extend&&e>b&&(d=b,b=e,e=d);d=Yc(a,e);a=Yc(a,b);if(d&&a){var f=document.createRange();f.setStart(d.node,d.offset);c.removeAllRanges();e>b?(c.addRange(f),c.extend(a.node,a.offset)):(f.setEnd(a.node,a.offset),c.addRange(f))}}}},Va={hasSelectionCapabilities:function(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&"text"===a.type||"textarea"===b||"true"===a.contentEditable)},getSelectionInformation:function(){var a=
Qb();return{focusedElem:a,selectionRange:Va.hasSelectionCapabilities(a)?Va.getSelection(a):null}},restoreSelection:function(a){var b=Qb(),c=a.focusedElem;a=a.selectionRange;if(b!==c&&Qd(document.documentElement,c)){Va.hasSelectionCapabilities(c)&&Va.setSelection(c,a);b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});try{c.focus()}catch(d){}for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}},getSelection:function(a){return("selectionStart"in
a?{start:a.selectionStart,end:a.selectionEnd}:He.getOffsets(a))||{start:0,end:0}},setSelection:function(a,b){var c=b.start,d=b.end;void 0===d&&(d=c);"selectionStart"in a?(a.selectionStart=c,a.selectionEnd=Math.min(d,a.value.length)):He.setOffsets(a,b)}},vc=Va;ab._injectFiber=function(a){Uc=a};ab._injectStack=function(a){Vc=a};var wb={isAncestor:function(a,b){for(;b;){if(a===b||a===b.alternate)return!0;b=C(b)}return!1},getLowestCommonAncestor:Rd,getParentInstance:function(a){return C(a)},traverseTwoPhase:function(a,
b,c){for(var d=[];a;)d.push(a),a=C(a);for(a=d.length;0<a--;)b(d[a],"captured",c);for(a=0;a<d.length;a++)b(d[a],"bubbled",c)},traverseEnterLeave:function(a,b,c,d,e){for(var f=a&&b?Rd(a,b):null,g=[];a&&a!==f;)g.push(a),a=C(a);for(a=[];b&&b!==f;)a.push(b),b=C(b);for(b=0;b<g.length;b++)c(g[b],"bubbled",d);for(b=a.length;0<b--;)c(a[b],"captured",e)}},Td=X.getListener,la={accumulateTwoPhaseDispatches:function(a){Ha(a,pf)},accumulateTwoPhaseDispatchesSkipTarget:function(a){Ha(a,qf)},accumulateDirectDispatches:function(a){Ha(a,
rf)},accumulateEnterLeaveDispatches:function(a,b,c,d){wb.traverseEnterLeave(c,d,Ud,a,b)}},Wa=null,Jc=null,Jb=null,Kc={initialize:function(a){Wa=a;Jc=Kc.getText();return!0},reset:function(){Jb=Jc=Wa=null},getData:function(){if(Jb)return Jb;var a,b=Jc,c=b.length,d,e=Kc.getText(),f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return Jb=e.slice(a,1<d?1-d:void 0)},getText:function(){return"value"in Wa?Wa.value:Wa[Xc()]}},xb=Kc,Ie="dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),
Vf={type:null,target:null,currentTarget:w.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};q(Ka.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=w.thatReturnsTrue)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():
"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=w.thatReturnsTrue)},persist:function(){this.isPersistent=w.thatReturnsTrue},isPersistent:w.thatReturnsFalse,destructor:function(){var a=this.constructor.Interface,b;for(b in a)this[b]=null;for(a=0;a<Ie.length;a++)this[Ie[a]]=null}});Ka.Interface=Vf;Ka.augmentClass=function(a,b){function c(){}c.prototype=this.prototype;var d=new c;q(d,a.prototype);a.prototype=d;a.prototype.constructor=a;a.Interface=q({},this.Interface,
b);a.augmentClass=this.augmentClass;Vd(a)};Vd(Ka);var O=Ka;O.augmentClass(Wd,{data:null});O.augmentClass(Xd,{data:null});var vf=[9,13,27,32],tc=z&&"CompositionEvent"in window,Xa=null;z&&"documentMode"in document&&(Xa=document.documentMode);var Wf=z&&"TextEvent"in window&&!Xa&&!uf(),be=z&&(!tc||Xa&&8<Xa&&11>=Xa),ae=String.fromCharCode(32),ea={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["topCompositionEnd","topKeyPress","topTextInput",
"topPaste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"topBlur topCompositionEnd topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",captured:"onCompositionStartCapture"},dependencies:"topBlur topCompositionStart topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},
dependencies:"topBlur topCompositionUpdate topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")}},$d=!1,wa=!1,Xf={eventTypes:ea,extractEvents:function(a,b,c,d){var e;if(tc)b:{switch(a){case "topCompositionStart":var f=ea.compositionStart;break b;case "topCompositionEnd":f=ea.compositionEnd;break b;case "topCompositionUpdate":f=ea.compositionUpdate;break b}f=void 0}else wa?Yd(a,c)&&(f=ea.compositionEnd):"topKeyDown"===a&&229===c.keyCode&&(f=ea.compositionStart);f?(be&&(wa||f!==ea.compositionStart?
f===ea.compositionEnd&&wa&&(e=xb.getData()):wa=xb.initialize(d)),f=Wd.getPooled(f,b,c,d),e?f.data=e:(e=Zd(c),null!==e&&(f.data=e)),la.accumulateTwoPhaseDispatches(f),e=f):e=null;(a=Wf?wf(a,c):xf(a,c))?(b=Xd.getPooled(ea.beforeInput,b,c,d),b.data=a,la.accumulateTwoPhaseDispatches(b)):b=null;return[e,b]}},Oe={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0},de={change:{phasedRegistrationNames:{bubbled:"onChange",
captured:"onChangeCapture"},dependencies:"topBlur topChange topClick topFocus topInput topKeyDown topKeyUp topSelectionChange".split(" ")}},La=null,Ma=null,Lc=!1;z&&(Lc=Fa("input")&&(!document.documentMode||9<document.documentMode));var Yf={eventTypes:de,_isInputEventSupported:Lc,extractEvents:function(a,b,c,d){var e=b?N.getNodeFromInstance(b):window,f=e.nodeName&&e.nodeName.toLowerCase();if("select"===f||"input"===f&&"file"===e.type)var g=zf;else if(Tc(e))if(Lc)g=Df;else{g=Bf;var h=Af}else f=e.nodeName,
!f||"input"!==f.toLowerCase()||"checkbox"!==e.type&&"radio"!==e.type||(g=Cf);if(g&&(g=g(a,b)))return ce(g,c,d);h&&h(a,e,b);"topBlur"===a&&null!=b&&(a=b._wrapperState||e._wrapperState)&&a.controlled&&"number"===e.type&&(a=""+e.value,e.getAttribute("value")!==a&&e.setAttribute("value",a))}};O.augmentClass(ge,{view:function(a){if(a.view)return a.view;a=jb(a);return a.window===a?a:(a=a.ownerDocument)?a.defaultView||a.parentWindow:window},detail:function(a){return a.detail||0}});var Y=ge,Ef={Alt:"altKey",
Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};Y.augmentClass(he,{screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:Pb,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)}});var ma=he,Mc={mouseEnter:{registrationName:"onMouseEnter",dependencies:["topMouseOut","topMouseOver"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["topMouseOut",
"topMouseOver"]}},Zf={eventTypes:Mc,extractEvents:function(a,b,c,d){if("topMouseOver"===a&&(c.relatedTarget||c.fromElement)||"topMouseOut"!==a&&"topMouseOver"!==a)return null;var e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||e.parentWindow:window;"topMouseOut"===a?(a=b,b=(b=c.relatedTarget||c.toElement)?N.getClosestInstanceFromNode(b):null):a=null;if(a===b)return null;var f=null==a?e:N.getNodeFromInstance(a);e=null==b?e:N.getNodeFromInstance(b);var g=ma.getPooled(Mc.mouseLeave,a,c,d);g.type=
"mouseleave";g.target=f;g.relatedTarget=e;c=ma.getPooled(Mc.mouseEnter,b,c,d);c.type="mouseenter";c.target=e;c.relatedTarget=f;la.accumulateEnterLeaveDispatches(g,c,a,b);return[g,c]}},$f=z&&"documentMode"in document&&11>=document.documentMode,je={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"topBlur topContextMenu topFocus topKeyDown topKeyUp topMouseDown topMouseUp topSelectionChange".split(" ")}},ya=null,wc=null,Na=null,uc=!1,ag=l.isListeningToAllDependencies,
bg={eventTypes:je,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:9===d.nodeType?d:d.ownerDocument;if(!e||!ag("onSelect",e))return null;e=b?N.getNodeFromInstance(b):window;switch(a){case "topFocus":if(Tc(e)||"true"===e.contentEditable)ya=e,wc=b,Na=null;break;case "topBlur":Na=wc=ya=null;break;case "topMouseDown":uc=!0;break;case "topContextMenu":case "topMouseUp":return uc=!1,ie(c,d);case "topSelectionChange":if($f)break;case "topKeyDown":case "topKeyUp":return ie(c,d)}return null}};
O.augmentClass(ke,{animationName:null,elapsedTime:null,pseudoElement:null});O.augmentClass(le,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}});Y.augmentClass(me,{relatedTarget:null});var cg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},dg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",
18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"};Y.augmentClass(ne,{key:function(a){if(a.key){var b=cg[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=$a(a),13===a?"Enter":String.fromCharCode(a)):
"keydown"===a.type||"keyup"===a.type?dg[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:Pb,charCode:function(a){return"keypress"===a.type?$a(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?$a(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}});ma.augmentClass(oe,{dataTransfer:null});Y.augmentClass(pe,{touches:null,targetTouches:null,
changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:Pb});O.augmentClass(qe,{propertyName:null,elapsedTime:null,pseudoElement:null});ma.augmentClass(re,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null});var Je={},Ke={};"abort animationEnd animationIteration animationStart blur cancel canPlay canPlayThrough click close contextMenu copy cut doubleClick drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error focus input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing progress rateChange reset scroll seeked seeking stalled submit suspend timeUpdate toggle touchCancel touchEnd touchMove touchStart transitionEnd volumeChange waiting wheel".split(" ").forEach(function(a){var b=
a[0].toUpperCase()+a.slice(1),c="on"+b;b="top"+b;c={phasedRegistrationNames:{bubbled:c,captured:c+"Capture"},dependencies:[b]};Je[a]=c;Ke[b]=c});var eg={eventTypes:Je,extractEvents:function(a,b,c,d){var e=Ke[a];if(!e)return null;switch(a){case "topAbort":case "topCancel":case "topCanPlay":case "topCanPlayThrough":case "topClose":case "topDurationChange":case "topEmptied":case "topEncrypted":case "topEnded":case "topError":case "topInput":case "topInvalid":case "topLoad":case "topLoadedData":case "topLoadedMetadata":case "topLoadStart":case "topPause":case "topPlay":case "topPlaying":case "topProgress":case "topRateChange":case "topReset":case "topSeeked":case "topSeeking":case "topStalled":case "topSubmit":case "topSuspend":case "topTimeUpdate":case "topToggle":case "topVolumeChange":case "topWaiting":var f=
O;break;case "topKeyPress":if(0===$a(c))return null;case "topKeyDown":case "topKeyUp":f=ne;break;case "topBlur":case "topFocus":f=me;break;case "topClick":if(2===c.button)return null;case "topDoubleClick":case "topMouseDown":case "topMouseMove":case "topMouseUp":case "topMouseOut":case "topMouseOver":case "topContextMenu":f=ma;break;case "topDrag":case "topDragEnd":case "topDragEnter":case "topDragExit":case "topDragLeave":case "topDragOver":case "topDragStart":case "topDrop":f=oe;break;case "topTouchCancel":case "topTouchEnd":case "topTouchMove":case "topTouchStart":f=
pe;break;case "topAnimationEnd":case "topAnimationIteration":case "topAnimationStart":f=ke;break;case "topTransitionEnd":f=qe;break;case "topScroll":f=Y;break;case "topWheel":f=re;break;case "topCopy":case "topCut":case "topPaste":f=le}f?void 0:m("86",a);a=f.getPooled(e,b,c,d);la.accumulateTwoPhaseDispatches(a);return a}};G.setHandleTopLevel(l.handleTopLevel);X.injection.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));
Ga.injection.injectComponentTree(N);X.injection.injectEventPluginsByName({SimpleEventPlugin:eg,EnterLeaveEventPlugin:Zf,ChangeEventPlugin:Yf,SelectEventPlugin:bg,BeforeInputEventPlugin:Xf});var Kb=A.injection.MUST_USE_PROPERTY,r=A.injection.HAS_BOOLEAN_VALUE,Le=A.injection.HAS_NUMERIC_VALUE,Lb=A.injection.HAS_POSITIVE_NUMERIC_VALUE,Ya=A.injection.HAS_STRING_BOOLEAN_VALUE,fg={Properties:{allowFullScreen:r,allowTransparency:Ya,async:r,autoPlay:r,capture:r,checked:Kb|r,cols:Lb,contentEditable:Ya,controls:r,
"default":r,defer:r,disabled:r,download:A.injection.HAS_OVERLOADED_BOOLEAN_VALUE,draggable:Ya,formNoValidate:r,hidden:r,loop:r,multiple:Kb|r,muted:Kb|r,noValidate:r,open:r,playsInline:r,readOnly:r,required:r,reversed:r,rows:Lb,rowSpan:Le,scoped:r,seamless:r,selected:Kb|r,size:Lb,start:Le,span:Lb,spellCheck:Ya,style:0,itemScope:r,acceptCharset:0,className:0,htmlFor:0,httpEquiv:0,value:Ya},DOMAttributeNames:{acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv"},DOMMutationMethods:{value:function(a,
b){if(null==b)return a.removeAttribute("value");"number"!==a.type||!1===a.hasAttribute("value")?a.setAttribute("value",""+b):a.validity&&!a.validity.badInput&&a.ownerDocument.activeElement!==a&&a.setAttribute("value",""+b)}}},Nc=A.injection.HAS_STRING_BOOLEAN_VALUE,Oc={Properties:{autoReverse:Nc,externalResourcesRequired:Nc,preserveAlpha:Nc},DOMAttributeNames:{autoReverse:"autoReverse",externalResourcesRequired:"externalResourcesRequired",preserveAlpha:"preserveAlpha"},DOMAttributeNamespaces:{xlinkActuate:"http://www.w3.org/1999/xlink",
xlinkArcrole:"http://www.w3.org/1999/xlink",xlinkHref:"http://www.w3.org/1999/xlink",xlinkRole:"http://www.w3.org/1999/xlink",xlinkShow:"http://www.w3.org/1999/xlink",xlinkTitle:"http://www.w3.org/1999/xlink",xlinkType:"http://www.w3.org/1999/xlink",xmlBase:"http://www.w3.org/XML/1998/namespace",xmlLang:"http://www.w3.org/XML/1998/namespace",xmlSpace:"http://www.w3.org/XML/1998/namespace"}},gg=/[\-\:]([a-z])/g;"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode x-height xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xmlns:xlink xml:lang xml:space".split(" ").forEach(function(a){var b=
a.replace(gg,Me);Oc.Properties[b]=0;Oc.DOMAttributeNames[b]=a});A.injection.injectDOMPropertyConfig(fg);A.injection.injectDOMPropertyConfig(Oc);var Gf=A.ROOT_ATTRIBUTE_NAME,hg=I.createElement,ig=I.createTextNode,jg=I.setInitialProperties,kg=I.diffProperties,lg=I.updateProperties,mg=I.diffHydratedProperties,ng=I.diffHydratedText,og=I.warnForDeletedHydratableElement,pg=I.warnForDeletedHydratableText,qg=I.warnForInsertedHydratedElement,rg=I.warnForInsertedHydratedText,Mb=N.precacheFiberNode,Pc=N.updateFiberProps;
yb.injection.injectFiberControlledHostComponent(I);ab._injectFiber(function(a){return B.findHostInstance(a)});var Qc=null,Rc=null,B=function(a){var b=a.getPublicInstance;a=Pe(a);var c=a.scheduleUpdate,d=a.getPriorityContext;return{createContainer:function(a){var b=new F(3,null,0);a={current:b,containerInfo:a,isScheduled:!1,nextScheduledRoot:null,context:null,pendingContext:null};return b.stateNode=a},updateContainer:function(a,b,g,h){var e=b.current;g=sc(g);null===b.context?b.context=g:b.pendingContext=
g;b=d(e,null!=a&&null!=a.type&&null!=a.type.prototype&&!0===a.type.prototype.unstable_isAsyncReactComponent);g={element:a};a=null===g.element;h={priorityLevel:b,partialState:g,callback:void 0===h?null:h,isReplace:!1,isForced:!1,isTopLevelUnmount:a,next:null};g=hb(e,h);if(a){a=pc;var f=qc;null!==a&&null!==h.next&&(h.next=null,a.last=h);null!==f&&null!==g&&null!==g.next&&(g.next=null,f.last=h)}c(e,b)},batchedUpdates:a.batchedUpdates,unbatchedUpdates:a.unbatchedUpdates,deferredUpdates:a.deferredUpdates,
flushSync:a.flushSync,getPublicRootInstance:function(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return b(a.child.stateNode);default:return a.child.stateNode}},findHostInstance:function(a){a=Tf(a);return null===a?null:a.stateNode},findHostInstanceWithNoPortals:function(a){a=Uf(a);return null===a?null:a.stateNode}}}({getRootHostContext:function(a){if(9===a.nodeType)a=(a=a.documentElement)?a.namespaceURI:Ob(null,"");else{var b=8===a.nodeType?a.parentNode:a;a=b.namespaceURI||null;
b=b.tagName;a=Ob(a,b)}return a},getChildHostContext:function(a,b){return Ob(a,b)},getPublicInstance:function(a){return a},prepareForCommit:function(){Qc=l.isEnabled();Rc=vc.getSelectionInformation();l.setEnabled(!1)},resetAfterCommit:function(){vc.restoreSelection(Rc);Rc=null;l.setEnabled(Qc);Qc=null},createInstance:function(a,b,c,d,e){a=hg(a,b,c,d);Mb(e,a);Pc(a,b);return a},appendInitialChild:function(a,b){a.appendChild(b)},finalizeInitialChildren:function(a,b,c,d){jg(a,b,c,d);a:{switch(b){case "button":case "input":case "select":case "textarea":a=
!!c.autoFocus;break a}a=!1}return a},prepareUpdate:function(a,b,c,d,e){return kg(a,b,c,d,e)},commitMount:function(a){a.focus()},commitUpdate:function(a,b,c,d,e){Pc(a,e);lg(a,b,c,d,e)},shouldSetTextContent:function(a,b){return"textarea"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&"string"===typeof b.dangerouslySetInnerHTML.__html},resetTextContent:function(a){a.textContent=""},shouldDeprioritizeSubtree:function(a,
b){return!!b.hidden},createTextInstance:function(a,b,c,d){a=ig(a,b);Mb(d,a);return a},commitTextUpdate:function(a,b,c){a.nodeValue=c},appendChild:function(a,b){a.appendChild(b)},appendChildToContainer:function(a,b){8===a.nodeType?a.parentNode.insertBefore(b,a):a.appendChild(b)},insertBefore:function(a,b,c){a.insertBefore(b,c)},insertInContainerBefore:function(a,b,c){8===a.nodeType?a.parentNode.insertBefore(b,c):a.insertBefore(b,c)},removeChild:function(a,b){a.removeChild(b)},removeChildFromContainer:function(a,
b){8===a.nodeType?a.parentNode.removeChild(b):a.removeChild(b)},canHydrateInstance:function(a,b){return 1===a.nodeType&&b===a.nodeName.toLowerCase()},canHydrateTextInstance:function(a,b){return""===b?!1:3===a.nodeType},getNextHydratableSibling:function(a){for(a=a.nextSibling;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a},getFirstHydratableChild:function(a){for(a=a.firstChild;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a},hydrateInstance:function(a,b,c,d,e,f){Mb(f,a);Pc(a,
c);return mg(a,b,c,e,d)},hydrateTextInstance:function(a,b,c){Mb(c,a);return ng(a,b)},didNotHydrateInstance:function(a,b){1===b.nodeType?og(a,b):pg(a,b)},didNotFindHydratableInstance:function(a,b,c){qg(a,b,c)},didNotFindHydratableTextInstance:function(a,b){rg(a,b)},scheduleDeferredCallback:Pf,useSyncScheduling:!0});Ab.injection.injectFiberBatchedUpdates(B.batchedUpdates);var sg={createPortal:se,hydrate:function(a,b,c){return Bb(null,a,b,!0,c)},render:function(a,b,c){return Bb(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,
b,c,d){null!=a&&fa.has(a)?void 0:m("38");return Bb(a,b,c,!1,d)},unmountComponentAtNode:function(a){xc(a)?void 0:m("40");return a._reactRootContainer?(B.unbatchedUpdates(function(){Bb(null,null,a,!1,function(){a._reactRootContainer=null})}),!0):!1},findDOMNode:ab,unstable_createPortal:se,unstable_batchedUpdates:Ab.batchedUpdates,unstable_deferredUpdates:B.deferredUpdates,flushSync:B.flushSync,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{EventPluginHub:X,EventPluginRegistry:na,EventPropagators:la,
ReactControlledComponent:yb,ReactDOMComponentTree:N,ReactDOMEventListener:G}};(function(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!b.supportsFiber)return!0;try{var c=b.inject(a);Vb=Pd(function(a){return b.onCommitFiberRoot(c,a)});Wb=Pd(function(a){return b.onCommitFiberUnmount(c,a)})}catch(d){}return!0})({findFiberByHostInstance:N.getClosestInstanceFromNode,findHostInstanceByFiber:B.findHostInstance,bundleType:0,version:"16.0.0",rendererPackageName:"react-dom"});
return sg}"object"===typeof exports&&"undefined"!==typeof module?module.exports=Nb(require("react")):"function"===typeof define&&define.amd?define(["react"],Nb):this.ReactDOM=Nb(this.React);