/*!
 * Components.js v4.0.1
 * (c) 2021 compo.js@mail.ru
 * Released under the MIT License.
 */
 (function(modules) { 
 	var installedModules = {};
 	function __webpack_require__(moduleId) {
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
 		module.l = true;
 		return module.exports;
 	}
 	__webpack_require__.m = modules;
 	__webpack_require__.c = installedModules;
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};
 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
 	__webpack_require__.p = "";
 	return __webpack_require__(__webpack_require__.s = 19);
 })
 ([
 (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

 }),
 (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(12);

var iterableToArray = __webpack_require__(13);

var unsupportedIterableToArray = __webpack_require__(14);

var nonIterableSpread = __webpack_require__(15);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

 }),
 (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

 }),
 (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

 }),
 (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(7);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

 }),
 (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(6);

var assertThisInitialized = __webpack_require__(0);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

 }),
 (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

 }),
 (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

 }),
 (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

 }),
 (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

 }),
 (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(2);

var setPrototypeOf = __webpack_require__(7);

var isNativeFunction = __webpack_require__(16);

var construct = __webpack_require__(17);

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;

 }),
 (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

 }),
 (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(8);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

 }),
 (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

 }),
 (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(8);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

 }),
 (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

 }),
 (function(module, exports) {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction;

 }),
 (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(7);

var isNativeReflectConstruct = __webpack_require__(18);

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

 }),
 (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;

 }),
 (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

var classCallCheck = __webpack_require__(3);
var classCallCheck_default = __webpack_require__.n(classCallCheck);

var inherits = __webpack_require__(4);
var inherits_default = __webpack_require__.n(inherits);

var possibleConstructorReturn = __webpack_require__(5);
var possibleConstructorReturn_default = __webpack_require__.n(possibleConstructorReturn);

var getPrototypeOf = __webpack_require__(2);
var getPrototypeOf_default = __webpack_require__.n(getPrototypeOf);

var toConsumableArray = __webpack_require__(1);
var toConsumableArray_default = __webpack_require__.n(toConsumableArray);

var createClass = __webpack_require__(9);
var createClass_default = __webpack_require__.n(createClass);

var assertThisInitialized = __webpack_require__(0);
var assertThisInitialized_default = __webpack_require__.n(assertThisInitialized);

var wrapNativeSuper = __webpack_require__(10);
var wrapNativeSuper_default = __webpack_require__.n(wrapNativeSuper);

var defineProperty = __webpack_require__(11);
var defineProperty_default = __webpack_require__.n(defineProperty);

var helpers_typeof = __webpack_require__(6);
var typeof_default = __webpack_require__.n(helpers_typeof);


function clear(node) {
  if (node.nodeType === 8 || node.nodeType === 3 && !node.data.trim()) return node.remove();
  return toConsumableArray_default()(node.childNodes).forEach(clear), node;
}




var regOn = /^on/; 

function reactive(node) {
  if (node.nodeType === 8 || node.nodeType === 3 && !node.data.trim()) return node.remove(); 

  var parent = components.get(this).nodes[components.get(this).nodes.length - 1] || this.$root; 

  var data = node[node.nodeType === 2 ? 'value' : 'data']; 

  if (node.nodeType === 2 || node.nodeType === 3) {
    if (node.nodeName === 'c-for') {
      components.get(this).values.set(node, node.value); 

      var template = new DocumentFragment(); 

      !toConsumableArray_default()(clear(node.ownerElement).childNodes).forEach(function (node) {
        return template.append(node);
      }); 

      components.get(this).values.set(node.ownerElement, template);
    } 
    else {
        if (!components.get(this).sources.has(parent)) components.get(this).sources.set(parent, {}); 

        if (!components.get(this).sources.get(parent)[data]) node.nodeName === 'c-hide' ? components.get(this).sources.get(parent)[data] = components.get(this).execute.next("()=>`${".concat(node.value, "}`")).value : components.get(this).sources.get(parent)[data] = components.get(this).execute.next("()=>`".concat(data, "`")).value; 

        components.get(this).values.set(node, components.get(this).sources.get(parent)[data]);
      } 


    if (regOn.test(node.nodeName)) Object.defineProperty(node.ownerElement, '$data', {
      value: this.$data
    }); 

    var result = handler.call(this, node); 

    if (node.nodeName !== 'c-for' && node.nodeName !== 'c-hide' && data === result[result.nodeType === 2 ? 'value' : 'data']) {
      delete components.get(this).sources.get(parent)[data]; 

      components.get(this).values["delete"](node); 
    }
  } 
  else {
      if (node.attributes) {
        for (var i = 0, length = node.attributes.length; i < length; i++) {
          reactive.call(this, node.attributes[i]);
        }

        if (node.attributes['c-for']) return node; 
      } 


      for (var _i = 0; _i < node.childNodes.length; _i++) {
        reactive.call(this, node.childNodes[_i]) || _i--;
      }
    }

  return node; 
}

function change(node) {
  if (node.nodeType === 2 || node.nodeType === 3) handler.call(this, node); 
  else {
      if (node.attributes) {
        for (var i = 0, length = node.attributes.length; i < length; i++) {
          change.call(this, node.attributes[i]);
        }

        if (node.attributes['c-for']) return; 
      } 


      for (var _i = 0; _i < node.childNodes.length; _i++) {
        change.call(this, node.childNodes[_i]);
      }
    }
}



 var update = (function ($parent) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : components.get(this).index.get($parent);
  var newNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : components.get(this).values.get($parent);
  var oldNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : $parent.childNodes[index];
  if (!oldNode) $parent.append(reactive.call(this, newNode.cloneNode(true))); 
  else for (var i = 0; i < newNode.childNodes.length; i++) {
      change.call(this, $parent.childNodes[i + index]);
    } 

  components.get(this).index.set($parent, index + newNode.childNodes.length);
});


 var handler = (function (node) {
  components.get(this).nodes.push(node); 

  if (node.nodeName === 'c-hide') switch (components.get(this).execute.next(components.get(this).values.get(node)).value) {
    case 'false':
    case 'undefined':
    case 'null':
    case '0':
    case '-0':
    case 'NaN':
    case '':
      node.ownerElement.removeAttribute('hidden');
      break;

    default:
      node.ownerElement.setAttribute('hidden', '');
      break;
  } 
  else if (node.nodeName === 'c-for') {
      components.get(this).index.set(node.ownerElement, 0); 

      if (!components.get(this).iterators.has(node)) {
        var execute = components.get(this).execute; 

        components.get(this).iterators.set(node, {
          outer: execute.next('(function*(){' + 'arguments[0]=yield function*(){' + "while(true)arguments[0]=yield typeof arguments[0]===\"function\"?arguments[0]():eval(arguments[0])" + "};while(true){yield,({".concat(Object.keys(this.$data).join(','), "}=this);for(var ").concat(components.get(this).values.get(node), ")arguments[0]()}") + '})').value.call(this.$data)
        }); 

        components.get(this).execute = components.get(this).iterators.get(node).outer.next().value.call(this.$data); 

        components.get(this).execute.next(); 

        components.get(this).iterators.get(node).outer.next(update.bind(this, node.ownerElement)); 

        components.get(this).iterators.get(node).outer.next(); 

        components.get(this).iterators.get(node).inner = components.get(this).execute; 

        components.get(this).execute = execute;
      } 
      else {
          var _execute = components.get(this).execute; 

          components.get(this).execute = components.get(this).iterators.get(node).inner; 

          components.get(this).iterators.get(node).outer.next(); 

          components.get(this).execute = _execute;
        } 


      for (var i = components.get(this).index.get(node.ownerElement), length = node.ownerElement.childNodes.length; i < length; i++) {
        node.ownerElement.lastChild.remove();
      } 


      components.get(this).index["delete"](node);
    } 
    else node[node.nodeType === 2 ? 'value' : 'data'] = components.get(this).values.has(node) ? components.get(this).execute.next(components.get(this).values.get(node)).value : node[node.nodeType === 2 ? 'value' : 'data']; 

  components.get(this).nodes.pop(); 

  return node;
});




var isProxy = Symbol(); 

var keys = new Set(['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']); 

function notify(dep) {
  var _this = this;

  dep.forEach(function (node) {
    clearTimeout(components.get(_this).timers.get(node)); 

    if (!components.get(_this).values.has(node)) dep["delete"](node); 
    else components.get(_this).timers.set(node, setTimeout(function () {
        return components.get(_this).timers["delete"](handler.call(_this, node));
      }, 0));
  });
} 


function hooks(dep) {
  var _this2 = this;

  return {
    apply: function apply(target, thisArg, args) {
      var node = components.get(_this2).nodes[0]; 

      if (dep && node) dep.add(node); 

      if (target.name === 'toString') {
        return JSON.stringify(thisArg, function (key, value) {
          return typeof_default()(value) === 'object' && value.hasOwnProperty(Symbol.toPrimitive) ? value[Symbol.toPrimitive]() : value;
        }, ' ');
      } 
      else if (Array.isArray(thisArg)) {
          components.get(_this2).isKeys = true; 

          var result = target.apply(thisArg, args); 

          components.get(_this2).isKeys = false; 

          if (dep) notify.call(_this2, dep); 

          return result;
        } 


      return target.apply(thisArg, args);
    },
    get: function get(target, key, receiver) {
      if (key === isProxy) return true; 

      var value = Reflect.get(target, key, receiver); 

      if (key === 'toString' || Array.isArray(target) && keys.has(key)) return new Proxy(value, hooks.call(_this2, dep)); 

      if (!target.hasOwnProperty(key)) return value; 

      var node = components.get(_this2).nodes[0]; 

      if (dep && node) dep.add(node); 

      var deps = components.get(_this2).depends.get(target); 

      if (!deps) components.get(_this2).depends.set(target, deps = {}); 

      if (!deps.hasOwnProperty(key)) deps[key] = new Set(); 

      if (value && typeof_default()(value) === 'object' || typeof value === 'function') return components.get(_this2).proxys.has(value) ? components.get(_this2).proxys.get(value) : observable.call(_this2, value, deps[key]); 

      return node ? defineProperty_default()({}, Symbol.toPrimitive, function () {
        return deps[key].add(node), value;
      }) : value;
    },
    set: function set(target, key, value, receiver) {
      var oldValue = Reflect.get(target, key, receiver); 

      if (target.hasOwnProperty(key) && value === oldValue) return true; 

      components.get(_this2).depends["delete"](oldValue); 

      components.get(_this2).proxys["delete"](oldValue); 

      if (!Reflect.set(target, key, value, receiver)) return false; 

      if (components.get(_this2).isKeys) return true; 

      if (components.get(_this2).nodes.length) return true; 

      var deps = components.get(_this2).depends.get(target); 

      if (!deps) return true; 

      var _dep = deps[key] || dep; 


      if (_dep) notify.call(_this2, _dep); 

      return true;
    }
  };
} 


function observable(obj, dep) {
  return Reflect.get(obj, isProxy) ? obj : components.get(this).proxys.set(obj, new Proxy(obj, hooks.call(this, dep))).get(obj);
}
 var popstate = (function (events) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : location;
  events.forEach(function (event) {
    if (new RegExp("^[/]?".concat(event.type, "$")).test(target.href.replace(target.origin, ''))) {
      Object.defineProperty(event, 'target', {
        value: target,
        enumerable: true,
        writable: true
      }); 

      document.dispatchEvent(event);
    }
  });
});


function remove(node) {
  var _this = this;

  components.get(this).sources["delete"](node); 

  components.get(this).values["delete"](node); 

  if (node.attributes) toConsumableArray_default()(node.attributes).forEach(function (node) {
    return remove.call(_this, node);
  }); 

  if (node.childNodes) node.childNodes.forEach(function (node) {
    return remove.call(_this, node);
  });
}









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var components = new WeakMap(); 

var mutations = {
  childList: true,
  subtree: true
};

var component_default = function (_HTMLElement) {
  inherits_default()(_default, _HTMLElement);

  var _super = _createSuper(_default);

  function _default(component) {
    var _this;

    classCallCheck_default()(this, _default);

    _this = _super.call(this); 

    components.set(assertThisInitialized_default()(_this), {}); 

    components.get(assertThisInitialized_default()(_this)).timers = new WeakMap(); 

    components.get(assertThisInitialized_default()(_this)).sources = new WeakMap(); 

    components.get(assertThisInitialized_default()(_this)).values = new WeakMap(); 

    components.get(assertThisInitialized_default()(_this)).depends = new WeakMap(); 

    components.get(assertThisInitialized_default()(_this)).proxys = new WeakMap(); 

    components.get(assertThisInitialized_default()(_this)).iterators = new WeakMap(); 

    components.get(assertThisInitialized_default()(_this)).index = new WeakMap(); 

    components.get(assertThisInitialized_default()(_this)).object = {}; 

    components.get(assertThisInitialized_default()(_this)).nodes = []; 

    components.get(assertThisInitialized_default()(_this)).isKeys = false; 

    Object.defineProperty(assertThisInitialized_default()(_this), '$data', {
      value: new Proxy(observable.call(assertThisInitialized_default()(_this), components.get(assertThisInitialized_default()(_this)).object), {
        get: function get(target, key, receiver) {
          return Reflect.has(target, key) ? Reflect.get(target, key, receiver) : Reflect.get(assertThisInitialized_default()(_this), key);
        }
      })
    }); 

    Object.defineProperty(assertThisInitialized_default()(_this), '$root', {
      value: _this.attachShadow({
        mode: component.hasAttribute('closed') ? 'closed' : 'open'
      })
    }); 

    component = component.content ? component.content : component; 

    var scripts = toConsumableArray_default()(component.querySelectorAll('script')).map(function (script) {
      return component.removeChild(script).innerHTML;
    }).join(''); 


    !toConsumableArray_default()(component.childNodes).forEach(function (node) {
      return _this.$root.append(node);
    }); 

    Function(scripts).call(_this.$data); 

    components.get(assertThisInitialized_default()(_this)).execute = Function("return function*(".concat(Object.keys(_this.$data).join(','), "){") + "while(true)arguments[0]=yield({".concat(Object.keys(_this.$data).join(','), "}=this,typeof arguments[0]==='function'?arguments[0]():eval(arguments[0]))") + '}')().call(_this.$data); 

    components.get(assertThisInitialized_default()(_this)).execute.next(); 

    reactive.call(assertThisInitialized_default()(_this), _this.$root); 

    new MutationObserver(function (mutationRecords, observer) {
      observer.disconnect(); 

      mutationRecords.forEach(function (record) {
        record.removedNodes.forEach(function (node) {
          return remove.call(assertThisInitialized_default()(_this), node);
        }); 

        if (!record.target.attributes || !record.target.attributes['c-for']) toConsumableArray_default()(record.addedNodes).forEach(function (node) {
          return reactive.call(assertThisInitialized_default()(_this), node);
        });
      }); 

      observer.observe(_this.$root, mutations);
    }).observe(_this.$root, mutations);
    return _this;
  } 


  createClass_default()(_default, [{
    key: "$",
    value: function $(selector) {
      return this.$root.querySelector(selector);
    } 

  }, {
    key: "$$",
    value: function $$(selector) {
      return this.$root.querySelectorAll(selector);
    } 

  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      if (components.get(this.$root.host).connected) components.get(this.$root.host).connected.forEach(function (cb) {
        return cb.call(_this2.$data);
      });
    } 

  }, {
    key: "$connected",
    value: function $connected() {
      var _this3 = this;

      if (!components.get(this.$root.host).connected) components.get(this.$root.host).connected = new Set();

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.forEach(function (cb) {
        return components.get(_this3.$root.host).connected.add(cb);
      });
    } 

  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _this4 = this;

      if (components.get(this.$root.host).disconnected) components.get(this.$root.host).disconnected.forEach(function (cb) {
        return cb.call(_this4.$data);
      });
    } 

  }, {
    key: "$disconnected",
    value: function $disconnected() {
      var _this5 = this;

      if (!components.get(this.$root.host).disconnected) components.get(this.$root.host).disconnected = new Set();

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      args.forEach(function (cb) {
        return components.get(_this5.$root.host).disconnected.add(cb);
      });
    } 

  }, {
    key: "adoptedCallback",
    value: function adoptedCallback() {
      var _this6 = this;

      if (components.get(this.$root.host).adopted) components.get(this.$root.host).adopted.forEach(function (cb) {
        return cb.call(_this6.$data);
      });
    } 

  }, {
    key: "$adopted",
    value: function $adopted() {
      var _this7 = this;

      if (!components.get(this.$root.host).adopted) components.get(this.$root.host).adopted = new Set();

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      args.forEach(function (cb) {
        return components.get(_this7.$root.host).adopted.add(cb);
      });
    } 

  }, {
    key: "$event",
    value: function $event(event) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new CustomEvent(event, props);
    } 

  }, {
    key: "$router",
    value: function $router(elem) {
      var _this8 = this;

      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var events = []; 

      window.addEventListener('popstate', function () {
        return popstate(events);
      }); 

      elem.addEventListener('click', function (e) {
        var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : e.path[0];
        if (target.origin !== location.origin || /\.\w+$/.test(target.href)) return; 

        e.preventDefault(); 

        history.pushState(null, '', target.href); 

        popstate(events, target);
      }, props); 

      return function (event, callback) {
        var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        if (event instanceof RegExp) event = event.toString().slice(1, -1); 

        var _event = _this8.$event(event, opts); 


        events.push(_event); 

        document.addEventListener(event, callback); 

        if (props.start) popstate([_event]);
      };
    }
  }]);

  return _default;
}( wrapNativeSuper_default()(HTMLElement));








function compo_createSuper(Derived) { var hasNativeReflectConstruct = compo_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function compo_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }


var script = document.querySelector('script[data-compo-name]');
if (script) window[script.dataset.compoName] = create;else window.Compo = create; 

Promise.all(toConsumableArray_default()(document.querySelectorAll('template[src],template[data-src]')).map(function (template) {
  return fetch((template.attributes['src'] || template.attributes['data-src']).value).then(function (response) {
    return response.text();
  });
})).then(function (html) {
  return create(html.join(''));
}); 

function create(html) {
  var template = document.createElement('template'); 

  template.innerHTML = html; 

  !toConsumableArray_default()(template.content.children).forEach(function (component) {
    return (
      customElements.define((component.getAttribute('title') || component.nodeName).toLocaleLowerCase(), function (_Component) {
        inherits_default()(_class, _Component);

        var _super = compo_createSuper(_class);

        function _class() {
          classCallCheck_default()(this, _class);

          return _super.call(this, component.cloneNode(true));
        } 


        return _class;
      }(component_default), component.hasAttribute('to') ? {
        "extends": component.getAttribute('to').toLocaleLowerCase()
      } : null)
    );
  });
}

 })
 ]);