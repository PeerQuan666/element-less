import { defineComponent, useSlots, useAttrs, ref, watch, resolveComponent, openBlock, createBlock, mergeProps, unref, createSlots, withCtx, createElementBlock, Fragment, renderList, renderSlot, createTextVNode, toDisplayString, getCurrentScope, onScopeDispose, getCurrentInstance, onMounted, nextTick, readonly, createElementVNode, warn, isVNode, Comment, inject, computed, isRef, provide, reactive, toRefs, normalizeClass, onBeforeUnmount, onUpdated, createVNode, resolveDynamicComponent, normalizeStyle, createCommentVNode, TransitionGroup, Transition, withDirectives, vShow, Text, toRef, h, watchEffect, createApp, shallowReactive, withModifiers, render, normalizeProps, guardReactiveProps, onErrorCaptured, resolveDirective } from "vue";
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  name: "ElsInput",
  __name: "Input",
  props: {
    modelValue: {},
    prefixTag: {},
    suffixTag: {},
    width: { default: "" },
    encode: { type: Boolean, default: !1 },
    encodeType: { default: "url" },
    fieldName: {},
    label: {},
    require: { type: Boolean },
    requireMessage: {},
    validationExpression: {},
    validationMessage: {},
    validationMethod: {},
    validationTrigger: { default: "blur" },
    hasFormItem: { type: Boolean },
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = useSlots(), i = useAttrs(), s = [];
    for (const p in a)
      s.push(p);
    const u = ref(), f = ref();
    return watch(() => n.modelValue, (p) => {
      n.encode ? (u.value = p, n.encodeType == "url" && (f.value = decodeURIComponent(u.value))) : f.value = p;
    }, { immediate: !0 }), watch(f, (p) => {
      n.encode ? t("update:modelValue", encodeURIComponent(p)) : t("update:modelValue", p);
    }), (p, m) => {
      const b = resolveComponent("el-input");
      return openBlock(), createBlock(b, mergeProps({
        modelValue: f.value,
        "onUpdate:modelValue": m[0] || (m[0] = (_) => f.value = _),
        style: [{ width: n.width.appendPx() }]
      }, unref(i)), createSlots({
        default: withCtx(() => [
          (openBlock(), createElementBlock(Fragment, null, renderList(s, (_) => renderSlot(p.$slots, _)), 64))
        ]),
        _: 2
      }, [
        !unref(a).prepend && p.prefixTag ? {
          name: "prepend",
          fn: withCtx(() => [
            createTextVNode(toDisplayString(p.prefixTag), 1)
          ]),
          key: "0"
        } : void 0,
        !unref(a).prepend && p.suffixTag ? {
          name: "append",
          fn: withCtx(() => [
            createTextVNode(toDisplayString(p.suffixTag), 1)
          ]),
          key: "1"
        } : void 0
      ]), 1040, ["modelValue", "style"]);
    };
  }
});
_sfc_main$t.install = (e) => {
  e.component(_sfc_main$t.__name, _sfc_main$t);
};
var _a;
const isClient = typeof window < "u", isString$2 = (e) => typeof e == "string", noop$1 = () => {
};
isClient && ((_a = window == null ? void 0 : window.navigator) != null && _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function resolveUnref(e) {
  return typeof e == "function" ? e() : unref(e);
}
function createFilterWrapper(e, t) {
  function n(...a) {
    return new Promise((i, s) => {
      Promise.resolve(e(() => t.apply(this, a), { fn: t, thisArg: this, args: a })).then(i).catch(s);
    });
  }
  return n;
}
function debounceFilter(e, t = {}) {
  let n, a, i = noop$1;
  const s = (f) => {
    clearTimeout(f), i(), i = noop$1;
  };
  return (f) => {
    const p = resolveUnref(e), m = resolveUnref(t.maxWait);
    return n && s(n), p <= 0 || m !== void 0 && m <= 0 ? (a && (s(a), a = null), Promise.resolve(f())) : new Promise((b, _) => {
      i = t.rejectOnCancel ? _ : b, m && !a && (a = setTimeout(() => {
        n && s(n), a = null, b(f());
      }, m)), n = setTimeout(() => {
        a && s(a), a = null, b(f());
      }, p);
    });
  };
}
function identity(e) {
  return e;
}
function tryOnScopeDispose(e) {
  return getCurrentScope() ? (onScopeDispose(e), !0) : !1;
}
function useDebounceFn(e, t = 200, n = {}) {
  return createFilterWrapper(debounceFilter(t, n), e);
}
function refDebounced(e, t = 200, n = {}) {
  const a = ref(e.value), i = useDebounceFn(() => {
    a.value = e.value;
  }, t, n);
  return watch(e, () => i()), a;
}
function tryOnMounted(e, t = !0) {
  getCurrentInstance() ? onMounted(e) : t ? e() : nextTick(e);
}
function useTimeoutFn(e, t, n = {}) {
  const {
    immediate: a = !0
  } = n, i = ref(!1);
  let s = null;
  function u() {
    s && (clearTimeout(s), s = null);
  }
  function f() {
    i.value = !1, u();
  }
  function p(...m) {
    u(), i.value = !0, s = setTimeout(() => {
      i.value = !1, s = null, e(...m);
    }, resolveUnref(t));
  }
  return a && (i.value = !0, isClient && p()), tryOnScopeDispose(f), {
    isPending: readonly(i),
    start: p,
    stop: f
  };
}
function unrefElement(e) {
  var t;
  const n = resolveUnref(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const defaultWindow = isClient ? window : void 0;
function useEventListener(...e) {
  let t, n, a, i;
  if (isString$2(e[0]) || Array.isArray(e[0]) ? ([n, a, i] = e, t = defaultWindow) : [t, n, a, i] = e, !t)
    return noop$1;
  Array.isArray(n) || (n = [n]), Array.isArray(a) || (a = [a]);
  const s = [], u = () => {
    s.forEach((b) => b()), s.length = 0;
  }, f = (b, _, E, w) => (b.addEventListener(_, E, w), () => b.removeEventListener(_, E, w)), p = watch(() => [unrefElement(t), resolveUnref(i)], ([b, _]) => {
    u(), b && s.push(...n.flatMap((E) => a.map((w) => f(b, E, w, _))));
  }, { immediate: !0, flush: "post" }), m = () => {
    p(), u();
  };
  return tryOnScopeDispose(m), m;
}
function useSupported(e, t = !1) {
  const n = ref(), a = () => n.value = !!e();
  return a(), tryOnMounted(a, t), n;
}
const _global$1 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, globalKey = "__vueuse_ssr_handlers__";
_global$1[globalKey] = _global$1[globalKey] || {};
var __getOwnPropSymbols$g = Object.getOwnPropertySymbols, __hasOwnProp$g = Object.prototype.hasOwnProperty, __propIsEnum$g = Object.prototype.propertyIsEnumerable, __objRest$2 = (e, t) => {
  var n = {};
  for (var a in e)
    __hasOwnProp$g.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
  if (e != null && __getOwnPropSymbols$g)
    for (var a of __getOwnPropSymbols$g(e))
      t.indexOf(a) < 0 && __propIsEnum$g.call(e, a) && (n[a] = e[a]);
  return n;
};
function useResizeObserver(e, t, n = {}) {
  const a = n, { window: i = defaultWindow } = a, s = __objRest$2(a, ["window"]);
  let u;
  const f = useSupported(() => i && "ResizeObserver" in i), p = () => {
    u && (u.disconnect(), u = void 0);
  }, m = watch(() => unrefElement(e), (_) => {
    p(), f.value && i && _ && (u = new ResizeObserver(t), u.observe(_, s));
  }, { immediate: !0, flush: "post" }), b = () => {
    p(), m();
  };
  return tryOnScopeDispose(b), {
    isSupported: f,
    stop: b
  };
}
var SwipeDirection;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
var __defProp = Object.defineProperty, __getOwnPropSymbols = Object.getOwnPropertySymbols, __hasOwnProp = Object.prototype.hasOwnProperty, __propIsEnum = Object.prototype.propertyIsEnumerable, __defNormalProp = (e, t, n) => t in e ? __defProp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, __spreadValues = (e, t) => {
  for (var n in t || (t = {}))
    __hasOwnProp.call(t, n) && __defNormalProp(e, n, t[n]);
  if (__getOwnPropSymbols)
    for (var n of __getOwnPropSymbols(t))
      __propIsEnum.call(t, n) && __defNormalProp(e, n, t[n]);
  return e;
};
const _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
__spreadValues({
  linear: identity
}, _TransitionPresets);
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const NOOP = () => {
}, hasOwnProperty$b = Object.prototype.hasOwnProperty, hasOwn = (e, t) => hasOwnProperty$b.call(e, t), isArray$3 = Array.isArray, isFunction$2 = (e) => typeof e == "function", isString$1 = (e) => typeof e == "string", isObject$2 = (e) => e !== null && typeof e == "object", cacheStringFunction = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, camelizeRE = /-(\w)/g, camelize = cacheStringFunction((e) => e.replace(camelizeRE, (t, n) => n ? n.toUpperCase() : "")), hyphenateRE = /\B([A-Z])/g, hyphenate = cacheStringFunction(
  (e) => e.replace(hyphenateRE, "-$1").toLowerCase()
);
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self, root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$c = Object.prototype, hasOwnProperty$a = objectProto$c.hasOwnProperty, nativeObjectToString$1 = objectProto$c.toString, symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(e) {
  var t = hasOwnProperty$a.call(e, symToStringTag$1), n = e[symToStringTag$1];
  try {
    e[symToStringTag$1] = void 0;
    var a = !0;
  } catch {
  }
  var i = nativeObjectToString$1.call(e);
  return a && (t ? e[symToStringTag$1] = n : delete e[symToStringTag$1]), i;
}
var objectProto$b = Object.prototype, nativeObjectToString = objectProto$b.toString;
function objectToString(e) {
  return nativeObjectToString.call(e);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]", symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(e) {
  return e == null ? e === void 0 ? undefinedTag : nullTag : symToStringTag && symToStringTag in Object(e) ? getRawTag(e) : objectToString(e);
}
function isObjectLike(e) {
  return e != null && typeof e == "object";
}
var symbolTag$2 = "[object Symbol]";
function isSymbol(e) {
  return typeof e == "symbol" || isObjectLike(e) && baseGetTag(e) == symbolTag$2;
}
function arrayMap(e, t) {
  for (var n = -1, a = e == null ? 0 : e.length, i = Array(a); ++n < a; )
    i[n] = t(e[n], n, e);
  return i;
}
var isArray$1 = Array.isArray;
const isArray$2 = isArray$1;
var INFINITY$1 = 1 / 0, symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;
function baseToString(e) {
  if (typeof e == "string")
    return e;
  if (isArray$2(e))
    return arrayMap(e, baseToString) + "";
  if (isSymbol(e))
    return symbolToString ? symbolToString.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -INFINITY$1 ? "-0" : t;
}
function isObject$1(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$1(e) {
  if (!isObject$1(e))
    return !1;
  var t = baseGetTag(e);
  return t == funcTag$2 || t == genTag$1 || t == asyncTag || t == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
const coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var e = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function isMasked(e) {
  return !!maskSrcKey && maskSrcKey in e;
}
var funcProto$1 = Function.prototype, funcToString$1 = funcProto$1.toString;
function toSource(e) {
  if (e != null) {
    try {
      return funcToString$1.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reIsHostCtor = /^\[object .+?Constructor\]$/, funcProto = Function.prototype, objectProto$a = Object.prototype, funcToString = funcProto.toString, hasOwnProperty$9 = objectProto$a.hasOwnProperty, reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$9).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(e) {
  if (!isObject$1(e) || isMasked(e))
    return !1;
  var t = isFunction$1(e) ? reIsNative : reIsHostCtor;
  return t.test(toSource(e));
}
function getValue$1(e, t) {
  return e == null ? void 0 : e[t];
}
function getNative(e, t) {
  var n = getValue$1(e, t);
  return baseIsNative(n) ? n : void 0;
}
var WeakMap = getNative(root$1, "WeakMap");
const WeakMap$1 = WeakMap;
var objectCreate = Object.create, baseCreate = function() {
  function e() {
  }
  return function(t) {
    if (!isObject$1(t))
      return {};
    if (objectCreate)
      return objectCreate(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}();
const baseCreate$1 = baseCreate;
function copyArray(e, t) {
  var n = -1, a = e.length;
  for (t || (t = Array(a)); ++n < a; )
    t[n] = e[n];
  return t;
}
var defineProperty = function() {
  try {
    var e = getNative(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const defineProperty$1 = defineProperty;
function arrayEach(e, t) {
  for (var n = -1, a = e == null ? 0 : e.length; ++n < a && t(e[n], n, e) !== !1; )
    ;
  return e;
}
var MAX_SAFE_INTEGER$1 = 9007199254740991, reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(e, t) {
  var n = typeof e;
  return t = t ?? MAX_SAFE_INTEGER$1, !!t && (n == "number" || n != "symbol" && reIsUint.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function baseAssignValue(e, t, n) {
  t == "__proto__" && defineProperty$1 ? defineProperty$1(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function eq(e, t) {
  return e === t || e !== e && t !== t;
}
var objectProto$9 = Object.prototype, hasOwnProperty$8 = objectProto$9.hasOwnProperty;
function assignValue(e, t, n) {
  var a = e[t];
  (!(hasOwnProperty$8.call(e, t) && eq(a, n)) || n === void 0 && !(t in e)) && baseAssignValue(e, t, n);
}
function copyObject(e, t, n, a) {
  var i = !n;
  n || (n = {});
  for (var s = -1, u = t.length; ++s < u; ) {
    var f = t[s], p = a ? a(n[f], e[f], f, n, e) : void 0;
    p === void 0 && (p = e[f]), i ? baseAssignValue(n, f, p) : assignValue(n, f, p);
  }
  return n;
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= MAX_SAFE_INTEGER;
}
function isArrayLike(e) {
  return e != null && isLength(e.length) && !isFunction$1(e);
}
var objectProto$8 = Object.prototype;
function isPrototype(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || objectProto$8;
  return e === n;
}
function baseTimes(e, t) {
  for (var n = -1, a = Array(e); ++n < e; )
    a[n] = t(n);
  return a;
}
var argsTag$2 = "[object Arguments]";
function baseIsArguments(e) {
  return isObjectLike(e) && baseGetTag(e) == argsTag$2;
}
var objectProto$7 = Object.prototype, hasOwnProperty$7 = objectProto$7.hasOwnProperty, propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable, isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(e) {
  return isObjectLike(e) && hasOwnProperty$7.call(e, "callee") && !propertyIsEnumerable$1.call(e, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return !1;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module, moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2, Buffer$2 = moduleExports$2 ? root$1.Buffer : void 0, nativeIsBuffer = Buffer$2 ? Buffer$2.isBuffer : void 0, isBuffer$1 = nativeIsBuffer || stubFalse;
const isBuffer$2 = isBuffer$1;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$4 = "[object Map]", numberTag$2 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$2 = "[object String]", weakMapTag$2 = "[object WeakMap]", arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]", typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = !0;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = !1;
function baseIsTypedArray(e) {
  return isObjectLike(e) && isLength(e.length) && !!typedArrayTags[baseGetTag(e)];
}
function baseUnary(e) {
  return function(t) {
    return e(t);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module, moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1, freeProcess = moduleExports$1 && freeGlobal$1.process, nodeUtil = function() {
  try {
    var e = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    return e || freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray, isTypedArray$1 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$2 = isTypedArray$1;
var objectProto$6 = Object.prototype, hasOwnProperty$6 = objectProto$6.hasOwnProperty;
function arrayLikeKeys(e, t) {
  var n = isArray$2(e), a = !n && isArguments$1(e), i = !n && !a && isBuffer$2(e), s = !n && !a && !i && isTypedArray$2(e), u = n || a || i || s, f = u ? baseTimes(e.length, String) : [], p = f.length;
  for (var m in e)
    (t || hasOwnProperty$6.call(e, m)) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
    (m == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (m == "offset" || m == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (m == "buffer" || m == "byteLength" || m == "byteOffset") || // Skip index properties.
    isIndex(m, p))) && f.push(m);
  return f;
}
function overArg(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$5 = Object.prototype, hasOwnProperty$5 = objectProto$5.hasOwnProperty;
function baseKeys(e) {
  if (!isPrototype(e))
    return nativeKeys$1(e);
  var t = [];
  for (var n in Object(e))
    hasOwnProperty$5.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function keys(e) {
  return isArrayLike(e) ? arrayLikeKeys(e) : baseKeys(e);
}
function nativeKeysIn(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var objectProto$4 = Object.prototype, hasOwnProperty$4 = objectProto$4.hasOwnProperty;
function baseKeysIn(e) {
  if (!isObject$1(e))
    return nativeKeysIn(e);
  var t = isPrototype(e), n = [];
  for (var a in e)
    a == "constructor" && (t || !hasOwnProperty$4.call(e, a)) || n.push(a);
  return n;
}
function keysIn(e) {
  return isArrayLike(e) ? arrayLikeKeys(e, !0) : baseKeysIn(e);
}
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey(e, t) {
  if (isArray$2(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || isSymbol(e) ? !0 : reIsPlainProp.test(e) || !reIsDeepProp.test(e) || t != null && e in Object(t);
}
var nativeCreate = getNative(Object, "create");
const nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {}, this.size = 0;
}
function hashDelete(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__", objectProto$3 = Object.prototype, hasOwnProperty$3 = objectProto$3.hasOwnProperty;
function hashGet(e) {
  var t = this.__data__;
  if (nativeCreate$1) {
    var n = t[e];
    return n === HASH_UNDEFINED$1 ? void 0 : n;
  }
  return hasOwnProperty$3.call(t, e) ? t[e] : void 0;
}
var objectProto$2 = Object.prototype, hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function hashHas(e) {
  var t = this.__data__;
  return nativeCreate$1 ? t[e] !== void 0 : hasOwnProperty$2.call(t, e);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = nativeCreate$1 && t === void 0 ? HASH_UNDEFINED : t, this;
}
function Hash(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype.delete = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [], this.size = 0;
}
function assocIndexOf(e, t) {
  for (var n = e.length; n--; )
    if (eq(e[n][0], t))
      return n;
  return -1;
}
var arrayProto = Array.prototype, splice = arrayProto.splice;
function listCacheDelete(e) {
  var t = this.__data__, n = assocIndexOf(t, e);
  if (n < 0)
    return !1;
  var a = t.length - 1;
  return n == a ? t.pop() : splice.call(t, n, 1), --this.size, !0;
}
function listCacheGet(e) {
  var t = this.__data__, n = assocIndexOf(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function listCacheHas(e) {
  return assocIndexOf(this.__data__, e) > -1;
}
function listCacheSet(e, t) {
  var n = this.__data__, a = assocIndexOf(n, e);
  return a < 0 ? (++this.size, n.push([e, t])) : n[a][1] = t, this;
}
function ListCache(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype.delete = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map$1 = getNative(root$1, "Map");
const Map$2 = Map$1;
function mapCacheClear() {
  this.size = 0, this.__data__ = {
    hash: new Hash(),
    map: new (Map$2 || ListCache)(),
    string: new Hash()
  };
}
function isKeyable(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function getMapData(e, t) {
  var n = e.__data__;
  return isKeyable(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function mapCacheDelete(e) {
  var t = getMapData(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function mapCacheGet(e) {
  return getMapData(this, e).get(e);
}
function mapCacheHas(e) {
  return getMapData(this, e).has(e);
}
function mapCacheSet(e, t) {
  var n = getMapData(this, e), a = n.size;
  return n.set(e, t), this.size += n.size == a ? 0 : 1, this;
}
function MapCache(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype.delete = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
var FUNC_ERROR_TEXT = "Expected a function";
function memoize(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(FUNC_ERROR_TEXT);
  var n = function() {
    var a = arguments, i = t ? t.apply(this, a) : a[0], s = n.cache;
    if (s.has(i))
      return s.get(i);
    var u = e.apply(this, a);
    return n.cache = s.set(i, u) || s, u;
  };
  return n.cache = new (memoize.Cache || MapCache)(), n;
}
memoize.Cache = MapCache;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(e) {
  var t = memoize(e, function(a) {
    return n.size === MAX_MEMOIZE_SIZE && n.clear(), a;
  }), n = t.cache;
  return t;
}
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, reEscapeChar = /\\(\\)?/g, stringToPath = memoizeCapped(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(rePropName, function(n, a, i, s) {
    t.push(i ? s.replace(reEscapeChar, "$1") : a || n);
  }), t;
});
const stringToPath$1 = stringToPath;
function toString$1(e) {
  return e == null ? "" : baseToString(e);
}
function castPath(e, t) {
  return isArray$2(e) ? e : isKey(e, t) ? [e] : stringToPath$1(toString$1(e));
}
var INFINITY = 1 / 0;
function toKey(e) {
  if (typeof e == "string" || isSymbol(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -INFINITY ? "-0" : t;
}
function baseGet(e, t) {
  t = castPath(t, e);
  for (var n = 0, a = t.length; e != null && n < a; )
    e = e[toKey(t[n++])];
  return n && n == a ? e : void 0;
}
function get(e, t, n) {
  var a = e == null ? void 0 : baseGet(e, t);
  return a === void 0 ? n : a;
}
function arrayPush(e, t) {
  for (var n = -1, a = t.length, i = e.length; ++n < a; )
    e[i + n] = t[n];
  return e;
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
const getPrototype$1 = getPrototype;
function castArray() {
  if (!arguments.length)
    return [];
  var e = arguments[0];
  return isArray$2(e) ? e : [e];
}
function stackClear() {
  this.__data__ = new ListCache(), this.size = 0;
}
function stackDelete(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function stackGet(e) {
  return this.__data__.get(e);
}
function stackHas(e) {
  return this.__data__.has(e);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(e, t) {
  var n = this.__data__;
  if (n instanceof ListCache) {
    var a = n.__data__;
    if (!Map$2 || a.length < LARGE_ARRAY_SIZE - 1)
      return a.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new MapCache(a);
  }
  return n.set(e, t), this.size = n.size, this;
}
function Stack(e) {
  var t = this.__data__ = new ListCache(e);
  this.size = t.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype.delete = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function baseAssign(e, t) {
  return e && copyObject(t, keys(t), e);
}
function baseAssignIn(e, t) {
  return e && copyObject(t, keysIn(t), e);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module, moduleExports = freeModule && freeModule.exports === freeExports, Buffer$1 = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : void 0;
function cloneBuffer(e, t) {
  if (t)
    return e.slice();
  var n = e.length, a = allocUnsafe ? allocUnsafe(n) : new e.constructor(n);
  return e.copy(a), a;
}
function arrayFilter(e, t) {
  for (var n = -1, a = e == null ? 0 : e.length, i = 0, s = []; ++n < a; ) {
    var u = e[n];
    t(u, n, e) && (s[i++] = u);
  }
  return s;
}
function stubArray() {
  return [];
}
var objectProto$1 = Object.prototype, propertyIsEnumerable = objectProto$1.propertyIsEnumerable, nativeGetSymbols$1 = Object.getOwnPropertySymbols, getSymbols = nativeGetSymbols$1 ? function(e) {
  return e == null ? [] : (e = Object(e), arrayFilter(nativeGetSymbols$1(e), function(t) {
    return propertyIsEnumerable.call(e, t);
  }));
} : stubArray;
const getSymbols$1 = getSymbols;
function copySymbols(e, t) {
  return copyObject(e, getSymbols$1(e), t);
}
var nativeGetSymbols = Object.getOwnPropertySymbols, getSymbolsIn = nativeGetSymbols ? function(e) {
  for (var t = []; e; )
    arrayPush(t, getSymbols$1(e)), e = getPrototype$1(e);
  return t;
} : stubArray;
const getSymbolsIn$1 = getSymbolsIn;
function copySymbolsIn(e, t) {
  return copyObject(e, getSymbolsIn$1(e), t);
}
function baseGetAllKeys(e, t, n) {
  var a = t(e);
  return isArray$2(e) ? a : arrayPush(a, n(e));
}
function getAllKeys(e) {
  return baseGetAllKeys(e, keys, getSymbols$1);
}
function getAllKeysIn(e) {
  return baseGetAllKeys(e, keysIn, getSymbolsIn$1);
}
var DataView = getNative(root$1, "DataView");
const DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
const Promise$2 = Promise$1;
var Set$1 = getNative(root$1, "Set");
const Set$2 = Set$1;
var mapTag$3 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]", dataViewTag$2 = "[object DataView]", dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$1), getTag = baseGetTag;
(DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$2 || Map$2 && getTag(new Map$2()) != mapTag$3 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$3 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$1) && (getTag = function(e) {
  var t = baseGetTag(e), n = t == objectTag$1 ? e.constructor : void 0, a = n ? toSource(n) : "";
  if (a)
    switch (a) {
      case dataViewCtorString:
        return dataViewTag$2;
      case mapCtorString:
        return mapTag$3;
      case promiseCtorString:
        return promiseTag;
      case setCtorString:
        return setTag$3;
      case weakMapCtorString:
        return weakMapTag$1;
    }
  return t;
});
const getTag$1 = getTag;
var objectProto = Object.prototype, hasOwnProperty$1 = objectProto.hasOwnProperty;
function initCloneArray(e) {
  var t = e.length, n = new e.constructor(t);
  return t && typeof e[0] == "string" && hasOwnProperty$1.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
var Uint8Array$1 = root$1.Uint8Array;
const Uint8Array$2 = Uint8Array$1;
function cloneArrayBuffer(e) {
  var t = new e.constructor(e.byteLength);
  return new Uint8Array$2(t).set(new Uint8Array$2(e)), t;
}
function cloneDataView(e, t) {
  var n = t ? cloneArrayBuffer(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(e) {
  var t = new e.constructor(e.source, reFlags.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol(e) {
  return symbolValueOf ? Object(symbolValueOf.call(e)) : {};
}
function cloneTypedArray(e, t) {
  var n = t ? cloneArrayBuffer(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]", arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(e, t, n) {
  var a = e.constructor;
  switch (t) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(e);
    case boolTag$1:
    case dateTag$1:
      return new a(+e);
    case dataViewTag$1:
      return cloneDataView(e, n);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(e, n);
    case mapTag$2:
      return new a();
    case numberTag$1:
    case stringTag$1:
      return new a(e);
    case regexpTag$1:
      return cloneRegExp(e);
    case setTag$2:
      return new a();
    case symbolTag$1:
      return cloneSymbol(e);
  }
}
function initCloneObject(e) {
  return typeof e.constructor == "function" && !isPrototype(e) ? baseCreate$1(getPrototype$1(e)) : {};
}
var mapTag$1 = "[object Map]";
function baseIsMap(e) {
  return isObjectLike(e) && getTag$1(e) == mapTag$1;
}
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap, isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
const isMap$1 = isMap;
var setTag$1 = "[object Set]";
function baseIsSet(e) {
  return isObjectLike(e) && getTag$1(e) == setTag$1;
}
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet, isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
const isSet$1 = isSet;
var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4, argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]", arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]", cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = !0;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = !1;
function baseClone(e, t, n, a, i, s) {
  var u, f = t & CLONE_DEEP_FLAG, p = t & CLONE_FLAT_FLAG, m = t & CLONE_SYMBOLS_FLAG$1;
  if (n && (u = i ? n(e, a, i, s) : n(e)), u !== void 0)
    return u;
  if (!isObject$1(e))
    return e;
  var b = isArray$2(e);
  if (b) {
    if (u = initCloneArray(e), !f)
      return copyArray(e, u);
  } else {
    var _ = getTag$1(e), E = _ == funcTag || _ == genTag;
    if (isBuffer$2(e))
      return cloneBuffer(e, f);
    if (_ == objectTag || _ == argsTag || E && !i) {
      if (u = p || E ? {} : initCloneObject(e), !f)
        return p ? copySymbolsIn(e, baseAssignIn(u, e)) : copySymbols(e, baseAssign(u, e));
    } else {
      if (!cloneableTags[_])
        return i ? e : {};
      u = initCloneByTag(e, _, f);
    }
  }
  s || (s = new Stack());
  var w = s.get(e);
  if (w)
    return w;
  s.set(e, u), isSet$1(e) ? e.forEach(function(O) {
    u.add(baseClone(O, t, n, O, e, s));
  }) : isMap$1(e) && e.forEach(function(O, I) {
    u.set(I, baseClone(O, t, n, I, e, s));
  });
  var A = m ? p ? getAllKeysIn : getAllKeys : p ? keysIn : keys, T = b ? void 0 : A(e);
  return arrayEach(T || e, function(O, I) {
    T && (I = O, O = e[I]), assignValue(u, I, baseClone(O, t, n, I, e, s));
  }), u;
}
var CLONE_SYMBOLS_FLAG = 4;
function clone$1(e) {
  return baseClone(e, CLONE_SYMBOLS_FLAG);
}
function fromPairs(e) {
  for (var t = -1, n = e == null ? 0 : e.length, a = {}; ++t < n; ) {
    var i = e[t];
    a[i[0]] = i[1];
  }
  return a;
}
function baseSet(e, t, n, a) {
  if (!isObject$1(e))
    return e;
  t = castPath(t, e);
  for (var i = -1, s = t.length, u = s - 1, f = e; f != null && ++i < s; ) {
    var p = toKey(t[i]), m = n;
    if (p === "__proto__" || p === "constructor" || p === "prototype")
      return e;
    if (i != u) {
      var b = f[p];
      m = a ? a(b, p, f) : void 0, m === void 0 && (m = isObject$1(b) ? b : isIndex(t[i + 1]) ? [] : {});
    }
    assignValue(f, p, m), f = f[p];
  }
  return e;
}
function set(e, t, n) {
  return e == null ? e : baseSet(e, t, n);
}
const isUndefined$1 = (e) => e === void 0, isBoolean$1 = (e) => typeof e == "boolean", isNumber$1 = (e) => typeof e == "number", isElement = (e) => typeof Element > "u" ? !1 : e instanceof Element, isStringNumber = (e) => isString$1(e) ? !Number.isNaN(Number(e)) : !1, keysOf = (e) => Object.keys(e), getProp = (e, t, n) => ({
  get value() {
    return get(e, t, n);
  },
  set value(a) {
    set(e, t, a);
  }
});
class ElementPlusError extends Error {
  constructor(t) {
    super(t), this.name = "ElementPlusError";
  }
}
function throwError(e, t) {
  throw new ElementPlusError(`[${e}] ${t}`);
}
function debugWarn(e, t) {
  if (process.env.NODE_ENV !== "production") {
    const n = isString$1(e) ? new ElementPlusError(`[${e}] ${t}`) : e;
    console.warn(n);
  }
}
const SCOPE$1 = "utils/dom/style", classNameToArray = (e = "") => e.split(" ").filter((t) => !!t.trim()), addClass = (e, t) => {
  !e || !t.trim() || e.classList.add(...classNameToArray(t));
}, removeClass = (e, t) => {
  !e || !t.trim() || e.classList.remove(...classNameToArray(t));
}, getStyle = (e, t) => {
  var n;
  if (!isClient || !e || !t)
    return "";
  let a = camelize(t);
  a === "float" && (a = "cssFloat");
  try {
    const i = e.style[a];
    if (i)
      return i;
    const s = (n = document.defaultView) == null ? void 0 : n.getComputedStyle(e, "");
    return s ? s[a] : "";
  } catch {
    return e.style[a];
  }
};
function addUnit(e, t = "px") {
  if (!e)
    return "";
  if (isNumber$1(e) || isStringNumber(e))
    return `${e}${t}`;
  if (isString$1(e))
    return e;
  debugWarn(SCOPE$1, "binding value must be a string or number");
}
/*! Element Plus Icons Vue v2.1.0 */
var export_helper_default = (e, t) => {
  let n = e.__vccOpts || e;
  for (let [a, i] of t)
    n[a] = i;
  return n;
}, circle_close_filled_vue_vue_type_script_lang_default = {
  name: "CircleCloseFilled"
}, _hoisted_150 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, _hoisted_250 = /* @__PURE__ */ createElementVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
  },
  null,
  -1
  /* HOISTED */
), _hoisted_349 = [
  _hoisted_250
];
function _sfc_render50(e, t, n, a, i, s) {
  return openBlock(), createElementBlock("svg", _hoisted_150, _hoisted_349);
}
var circle_close_filled_default = /* @__PURE__ */ export_helper_default(circle_close_filled_vue_vue_type_script_lang_default, [["render", _sfc_render50], ["__file", "circle-close-filled.vue"]]), close_vue_vue_type_script_lang_default = {
  name: "Close"
}, _hoisted_156 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, _hoisted_256 = /* @__PURE__ */ createElementVNode(
  "path",
  {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  },
  null,
  -1
  /* HOISTED */
), _hoisted_355 = [
  _hoisted_256
];
function _sfc_render56(e, t, n, a, i, s) {
  return openBlock(), createElementBlock("svg", _hoisted_156, _hoisted_355);
}
var close_default = /* @__PURE__ */ export_helper_default(close_vue_vue_type_script_lang_default, [["render", _sfc_render56], ["__file", "close.vue"]]), info_filled_vue_vue_type_script_lang_default = {
  name: "InfoFilled"
}, _hoisted_1143 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, _hoisted_2143 = /* @__PURE__ */ createElementVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
  },
  null,
  -1
  /* HOISTED */
), _hoisted_3142 = [
  _hoisted_2143
];
function _sfc_render143(e, t, n, a, i, s) {
  return openBlock(), createElementBlock("svg", _hoisted_1143, _hoisted_3142);
}
var info_filled_default = /* @__PURE__ */ export_helper_default(info_filled_vue_vue_type_script_lang_default, [["render", _sfc_render143], ["__file", "info-filled.vue"]]), loading_vue_vue_type_script_lang_default = {
  name: "Loading"
}, _hoisted_1150 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, _hoisted_2150 = /* @__PURE__ */ createElementVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
  },
  null,
  -1
  /* HOISTED */
), _hoisted_3149 = [
  _hoisted_2150
];
function _sfc_render150(e, t, n, a, i, s) {
  return openBlock(), createElementBlock("svg", _hoisted_1150, _hoisted_3149);
}
var loading_default = /* @__PURE__ */ export_helper_default(loading_vue_vue_type_script_lang_default, [["render", _sfc_render150], ["__file", "loading.vue"]]), success_filled_vue_vue_type_script_lang_default = {
  name: "SuccessFilled"
}, _hoisted_1249 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, _hoisted_2249 = /* @__PURE__ */ createElementVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
  },
  null,
  -1
  /* HOISTED */
), _hoisted_3248 = [
  _hoisted_2249
];
function _sfc_render249(e, t, n, a, i, s) {
  return openBlock(), createElementBlock("svg", _hoisted_1249, _hoisted_3248);
}
var success_filled_default = /* @__PURE__ */ export_helper_default(success_filled_vue_vue_type_script_lang_default, [["render", _sfc_render249], ["__file", "success-filled.vue"]]), warning_filled_vue_vue_type_script_lang_default = {
  name: "WarningFilled"
}, _hoisted_1287 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, _hoisted_2287 = /* @__PURE__ */ createElementVNode(
  "path",
  {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
  },
  null,
  -1
  /* HOISTED */
), _hoisted_3286 = [
  _hoisted_2287
];
function _sfc_render287(e, t, n, a, i, s) {
  return openBlock(), createElementBlock("svg", _hoisted_1287, _hoisted_3286);
}
var warning_filled_default = /* @__PURE__ */ export_helper_default(warning_filled_vue_vue_type_script_lang_default, [["render", _sfc_render287], ["__file", "warning-filled.vue"]]);
const epPropKey = "__epPropKey", definePropType = (e) => e, isEpProp = (e) => isObject$2(e) && !!e[epPropKey], buildProp = (e, t) => {
  if (!isObject$2(e) || isEpProp(e))
    return e;
  const { values: n, required: a, default: i, type: s, validator: u } = e, p = {
    type: s,
    required: !!a,
    validator: n || u ? (m) => {
      let b = !1, _ = [];
      if (n && (_ = Array.from(n), hasOwn(e, "default") && _.push(i), b || (b = _.includes(m))), u && (b || (b = u(m))), !b && _.length > 0) {
        const E = [...new Set(_)].map((w) => JSON.stringify(w)).join(", ");
        warn(`Invalid prop: validation failed${t ? ` for prop "${t}"` : ""}. Expected one of [${E}], got value ${JSON.stringify(m)}.`);
      }
      return b;
    } : void 0,
    [epPropKey]: !0
  };
  return hasOwn(e, "default") && (p.default = i), p;
}, buildProps = (e) => fromPairs(Object.entries(e).map(([t, n]) => [
  t,
  buildProp(n, t)
])), iconPropType = definePropType([
  String,
  Object,
  Function
]), TypeComponents = {
  Close: close_default,
  SuccessFilled: success_filled_default,
  InfoFilled: info_filled_default,
  WarningFilled: warning_filled_default,
  CircleCloseFilled: circle_close_filled_default
}, TypeComponentsMap = {
  success: success_filled_default,
  warning: warning_filled_default,
  error: circle_close_filled_default,
  info: info_filled_default
}, withInstall = (e, t) => {
  if (e.install = (n) => {
    for (const a of [e, ...Object.values(t ?? {})])
      n.component(a.name, a);
  }, t)
    for (const [n, a] of Object.entries(t))
      e[n] = a;
  return e;
}, withInstallFunction = (e, t) => (e.install = (n) => {
  e._context = n._context, n.config.globalProperties[t] = e;
}, e), withNoopInstall = (e) => (e.install = NOOP, e), EVENT_CODE = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace",
  numpadEnter: "NumpadEnter",
  pageUp: "PageUp",
  pageDown: "PageDown",
  home: "Home",
  end: "End"
}, componentSizes = ["", "default", "small", "large"];
var PatchFlags = /* @__PURE__ */ ((e) => (e[e.TEXT = 1] = "TEXT", e[e.CLASS = 2] = "CLASS", e[e.STYLE = 4] = "STYLE", e[e.PROPS = 8] = "PROPS", e[e.FULL_PROPS = 16] = "FULL_PROPS", e[e.HYDRATE_EVENTS = 32] = "HYDRATE_EVENTS", e[e.STABLE_FRAGMENT = 64] = "STABLE_FRAGMENT", e[e.KEYED_FRAGMENT = 128] = "KEYED_FRAGMENT", e[e.UNKEYED_FRAGMENT = 256] = "UNKEYED_FRAGMENT", e[e.NEED_PATCH = 512] = "NEED_PATCH", e[e.DYNAMIC_SLOTS = 1024] = "DYNAMIC_SLOTS", e[e.HOISTED = -1] = "HOISTED", e[e.BAIL = -2] = "BAIL", e))(PatchFlags || {});
function isFragment(e) {
  return isVNode(e) && e.type === Fragment;
}
function isComment(e) {
  return isVNode(e) && e.type === Comment;
}
function isValidElementNode(e) {
  return isVNode(e) && !isFragment(e) && !isComment(e);
}
const mutable = (e) => e, useDeprecated = ({ from: e, replacement: t, scope: n, version: a, ref: i, type: s = "API" }, u) => {
  watch(() => unref(u), (f) => {
    f && debugWarn(n, `[${s}] ${e} is about to be deprecated in version ${a}, please use ${t} instead.
For more detail, please visit: ${i}
`);
  }, {
    immediate: !0
  });
};
var English = {
  name: "en",
  el: {
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      defaultLabel: "color picker",
      description: "current color is {color}. press enter to select a new color."
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      selectedDate: "Selected date",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      week: "week",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      weeksFull: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      increase: "increase number"
    },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
    },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      page: "Page",
      prev: "Go to previous page",
      next: "Go to next page",
      currentPage: "page {pager}",
      prevPages: "Previous {pager} pages",
      nextPages: "Next {pager} pages",
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
    },
    dialog: {
      close: "Close this dialog"
    },
    drawer: {
      close: "Close this dialog"
    },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input",
      close: "Close this dialog"
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue"
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      defaultRangeStartLabel: "pick start value",
      defaultRangeEndLabel: "pick end value"
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum"
    },
    tree: {
      emptyText: "No Data"
    },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked"
    },
    image: {
      error: "FAILED"
    },
    pageHeader: {
      title: "Back"
    },
    popconfirm: {
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }
  }
};
const buildTranslator = (e) => (t, n) => translate(t, n, unref(e)), translate = (e, t, n) => get(n, e, e).replace(/\{(\w+)\}/g, (a, i) => {
  var s;
  return `${(s = t == null ? void 0 : t[i]) != null ? s : `{${i}}`}`;
}), buildLocaleContext = (e) => {
  const t = computed(() => unref(e).name), n = isRef(e) ? e : ref(e);
  return {
    lang: t,
    locale: n,
    t: buildTranslator(e)
  };
}, localeContextKey = Symbol("localeContextKey"), useLocale = (e) => {
  const t = e || inject(localeContextKey, ref());
  return buildLocaleContext(computed(() => t.value || English));
}, defaultNamespace = "el", statePrefix = "is-", _bem = (e, t, n, a, i) => {
  let s = `${e}-${t}`;
  return n && (s += `-${n}`), a && (s += `__${a}`), i && (s += `--${i}`), s;
}, namespaceContextKey = Symbol("namespaceContextKey"), useGetDerivedNamespace = (e) => {
  const t = e || (getCurrentInstance() ? inject(namespaceContextKey, ref(defaultNamespace)) : ref(defaultNamespace));
  return computed(() => unref(t) || defaultNamespace);
}, useNamespace = (e, t) => {
  const n = useGetDerivedNamespace(t);
  return {
    namespace: n,
    b: (T = "") => _bem(n.value, e, T, "", ""),
    e: (T) => T ? _bem(n.value, e, "", T, "") : "",
    m: (T) => T ? _bem(n.value, e, "", "", T) : "",
    be: (T, O) => T && O ? _bem(n.value, e, T, O, "") : "",
    em: (T, O) => T && O ? _bem(n.value, e, "", T, O) : "",
    bm: (T, O) => T && O ? _bem(n.value, e, T, "", O) : "",
    bem: (T, O, I) => T && O && I ? _bem(n.value, e, T, O, I) : "",
    is: (T, ...O) => {
      const I = O.length >= 1 ? O[0] : !0;
      return T && I ? `${statePrefix}${T}` : "";
    },
    cssVar: (T) => {
      const O = {};
      for (const I in T)
        T[I] && (O[`--${n.value}-${I}`] = T[I]);
      return O;
    },
    cssVarName: (T) => `--${n.value}-${T}`,
    cssVarBlock: (T) => {
      const O = {};
      for (const I in T)
        T[I] && (O[`--${n.value}-${e}-${I}`] = T[I]);
      return O;
    },
    cssVarBlockName: (T) => `--${n.value}-${e}-${T}`
  };
}, useProp = (e) => {
  const t = getCurrentInstance();
  return computed(() => {
    var n, a;
    return (a = (n = t == null ? void 0 : t.proxy) == null ? void 0 : n.$props) == null ? void 0 : a[e];
  });
}, defaultIdInjection = {
  prefix: Math.floor(Math.random() * 1e4),
  current: 0
}, ID_INJECTION_KEY = Symbol("elIdInjection"), useIdInjection = () => getCurrentInstance() ? inject(ID_INJECTION_KEY, defaultIdInjection) : defaultIdInjection, useId = (e) => {
  const t = useIdInjection();
  !isClient && t === defaultIdInjection && debugWarn("IdInjection", `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`);
  const n = useGetDerivedNamespace();
  return computed(() => unref(e) || `${n.value}-id-${t.prefix}-${t.current++}`);
}, zIndex = ref(0), defaultInitialZIndex = 2e3, zIndexContextKey = Symbol("zIndexContextKey"), useZIndex = (e) => {
  const t = e || (getCurrentInstance() ? inject(zIndexContextKey, void 0) : void 0), n = computed(() => {
    const s = unref(t);
    return isNumber$1(s) ? s : defaultInitialZIndex;
  }), a = computed(() => n.value + zIndex.value);
  return {
    initialZIndex: n,
    currentZIndex: a,
    nextZIndex: () => (zIndex.value++, a.value)
  };
}, useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: !1
}), SIZE_INJECTION_KEY = Symbol("size"), useGlobalSize = () => {
  const e = inject(SIZE_INJECTION_KEY, {});
  return computed(() => unref(e.size) || "");
}, configProviderContextKey = Symbol(), globalConfig = ref();
function useGlobalConfig(e, t = void 0) {
  const n = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig;
  return e ? computed(() => {
    var a, i;
    return (i = (a = n.value) == null ? void 0 : a[e]) != null ? i : t;
  }) : n;
}
function useGlobalComponentSettings(e, t) {
  const n = useGlobalConfig(), a = useNamespace(e, computed(() => {
    var f;
    return ((f = n.value) == null ? void 0 : f.namespace) || defaultNamespace;
  })), i = useLocale(computed(() => {
    var f;
    return (f = n.value) == null ? void 0 : f.locale;
  })), s = useZIndex(computed(() => {
    var f;
    return ((f = n.value) == null ? void 0 : f.zIndex) || defaultInitialZIndex;
  })), u = computed(() => {
    var f;
    return unref(t) || ((f = n.value) == null ? void 0 : f.size) || "";
  });
  return provideGlobalConfig(computed(() => unref(n) || {})), {
    ns: a,
    locale: i,
    zIndex: s,
    size: u
  };
}
const provideGlobalConfig = (e, t, n = !1) => {
  var a;
  const i = !!getCurrentInstance(), s = i ? useGlobalConfig() : void 0, u = (a = t == null ? void 0 : t.provide) != null ? a : i ? provide : void 0;
  if (!u) {
    debugWarn("provideGlobalConfig", "provideGlobalConfig() can only be used inside setup().");
    return;
  }
  const f = computed(() => {
    const p = unref(e);
    return s != null && s.value ? mergeConfig$1(s.value, p) : p;
  });
  return u(configProviderContextKey, f), u(localeContextKey, computed(() => f.value.locale)), u(namespaceContextKey, computed(() => f.value.namespace)), u(zIndexContextKey, computed(() => f.value.zIndex)), u(SIZE_INJECTION_KEY, {
    size: computed(() => f.value.size || "")
  }), (n || !globalConfig.value) && (globalConfig.value = f.value), f;
}, mergeConfig$1 = (e, t) => {
  var n;
  const a = [.../* @__PURE__ */ new Set([...keysOf(e), ...keysOf(t)])], i = {};
  for (const s of a)
    i[s] = (n = t[s]) != null ? n : e[s];
  return i;
}, configProviderProps = buildProps({
  a11y: {
    type: Boolean,
    default: !0
  },
  locale: {
    type: definePropType(Object)
  },
  size: useSizeProp,
  button: {
    type: definePropType(Object)
  },
  experimentalFeatures: {
    type: definePropType(Object)
  },
  keyboardNavigation: {
    type: Boolean,
    default: !0
  },
  message: {
    type: definePropType(Object)
  },
  zIndex: Number,
  namespace: {
    type: String,
    default: "el"
  }
}), messageConfig = {};
defineComponent({
  name: "ElConfigProvider",
  props: configProviderProps,
  setup(e, { slots: t }) {
    watch(() => e.message, (a) => {
      Object.assign(messageConfig, a ?? {});
    }, { immediate: !0, deep: !0 });
    const n = provideGlobalConfig(e);
    return () => renderSlot(t, "default", { config: n == null ? void 0 : n.value });
  }
});
var _export_sfc$1 = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, i] of t)
    n[a] = i;
  return n;
};
const iconProps = buildProps({
  size: {
    type: definePropType([Number, String])
  },
  color: {
    type: String
  }
}), __default__$6 = defineComponent({
  name: "ElIcon",
  inheritAttrs: !1
}), _sfc_main$s = /* @__PURE__ */ defineComponent({
  ...__default__$6,
  props: iconProps,
  setup(e) {
    const t = e, n = useNamespace("icon"), a = computed(() => {
      const { size: i, color: s } = t;
      return !i && !s ? {} : {
        fontSize: isUndefined$1(i) ? void 0 : addUnit(i),
        "--color": s
      };
    });
    return (i, s) => (openBlock(), createElementBlock("i", mergeProps({
      class: unref(n).b(),
      style: unref(a)
    }, i.$attrs), [
      renderSlot(i.$slots, "default")
    ], 16));
  }
});
var Icon = /* @__PURE__ */ _export_sfc$1(_sfc_main$s, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
const ElIcon = withInstall(Icon), formContextKey = Symbol("formContextKey"), formItemContextKey = Symbol("formItemContextKey"), useFormSize = (e, t = {}) => {
  const n = ref(void 0), a = t.prop ? n : useProp("size"), i = t.global ? n : useGlobalSize(), s = t.form ? { size: void 0 } : inject(formContextKey, void 0), u = t.formItem ? { size: void 0 } : inject(formItemContextKey, void 0);
  return computed(() => a.value || unref(e) || (u == null ? void 0 : u.size) || (s == null ? void 0 : s.size) || i.value || "");
}, useFormDisabled = (e) => {
  const t = useProp("disabled"), n = inject(formContextKey, void 0);
  return computed(() => t.value || unref(e) || (n == null ? void 0 : n.disabled) || !1);
}, useFormItem = () => {
  const e = inject(formContextKey, void 0), t = inject(formItemContextKey, void 0);
  return {
    form: e,
    formItem: t
  };
}, formMetaProps = buildProps({
  size: {
    type: String,
    values: componentSizes
  },
  disabled: Boolean
}), formProps = buildProps({
  ...formMetaProps,
  model: Object,
  rules: {
    type: definePropType(Object)
  },
  labelPosition: {
    type: String,
    values: ["left", "right", "top"],
    default: "right"
  },
  requireAsteriskPosition: {
    type: String,
    values: ["left", "right"],
    default: "left"
  },
  labelWidth: {
    type: [String, Number],
    default: ""
  },
  labelSuffix: {
    type: String,
    default: ""
  },
  inline: Boolean,
  inlineMessage: Boolean,
  statusIcon: Boolean,
  showMessage: {
    type: Boolean,
    default: !0
  },
  validateOnRuleChange: {
    type: Boolean,
    default: !0
  },
  hideRequiredAsterisk: Boolean,
  scrollToError: Boolean,
  scrollIntoViewOptions: {
    type: [Object, Boolean]
  }
}), formEmits = {
  validate: (e, t, n) => (isArray$3(e) || isString$1(e)) && isBoolean$1(t) && isString$1(n)
}, SCOPE = "ElForm";
function useFormLabelWidth() {
  const e = ref([]), t = computed(() => {
    if (!e.value.length)
      return "0";
    const s = Math.max(...e.value);
    return s ? `${s}px` : "";
  });
  function n(s) {
    const u = e.value.indexOf(s);
    return u === -1 && t.value === "0" && debugWarn(SCOPE, `unexpected width ${s}`), u;
  }
  function a(s, u) {
    if (s && u) {
      const f = n(u);
      e.value.splice(f, 1, s);
    } else
      s && e.value.push(s);
  }
  function i(s) {
    const u = n(s);
    u > -1 && e.value.splice(u, 1);
  }
  return {
    autoLabelWidth: t,
    registerLabelWidth: a,
    deregisterLabelWidth: i
  };
}
const filterFields = (e, t) => {
  const n = castArray(t);
  return n.length > 0 ? e.filter((a) => a.prop && n.includes(a.prop)) : e;
}, COMPONENT_NAME$1 = "ElForm", __default__$5 = defineComponent({
  name: COMPONENT_NAME$1
}), _sfc_main$r = /* @__PURE__ */ defineComponent({
  ...__default__$5,
  props: formProps,
  emits: formEmits,
  setup(e, { expose: t, emit: n }) {
    const a = e, i = [], s = useFormSize(), u = useNamespace("form"), f = computed(() => {
      const { labelPosition: H, inline: L } = a;
      return [
        u.b(),
        u.m(s.value || "default"),
        {
          [u.m(`label-${H}`)]: H,
          [u.m("inline")]: L
        }
      ];
    }), p = (H) => {
      i.push(H);
    }, m = (H) => {
      H.prop && i.splice(i.indexOf(H), 1);
    }, b = (H = []) => {
      if (!a.model) {
        debugWarn(COMPONENT_NAME$1, "model is required for resetFields to work.");
        return;
      }
      filterFields(i, H).forEach((L) => L.resetField());
    }, _ = (H = []) => {
      filterFields(i, H).forEach((L) => L.clearValidate());
    }, E = computed(() => {
      const H = !!a.model;
      return H || debugWarn(COMPONENT_NAME$1, "model is required for validate to work."), H;
    }), w = (H) => {
      if (i.length === 0)
        return [];
      const L = filterFields(i, H);
      return L.length ? L : (debugWarn(COMPONENT_NAME$1, "please pass correct props!"), []);
    }, A = async (H) => O(void 0, H), T = async (H = []) => {
      if (!E.value)
        return !1;
      const L = w(H);
      if (L.length === 0)
        return !0;
      let z = {};
      for (const G of L)
        try {
          await G.validate("");
        } catch (Z) {
          z = {
            ...z,
            ...Z
          };
        }
      return Object.keys(z).length === 0 ? !0 : Promise.reject(z);
    }, O = async (H = [], L) => {
      const z = !isFunction$2(L);
      try {
        const G = await T(H);
        return G === !0 && (L == null || L(G)), G;
      } catch (G) {
        if (G instanceof Error)
          throw G;
        const Z = G;
        return a.scrollToError && I(Object.keys(Z)[0]), L == null || L(!1, Z), z && Promise.reject(Z);
      }
    }, I = (H) => {
      var L;
      const z = filterFields(i, H)[0];
      z && ((L = z.$el) == null || L.scrollIntoView(a.scrollIntoViewOptions));
    };
    return watch(() => a.rules, () => {
      a.validateOnRuleChange && A().catch((H) => debugWarn(H));
    }, { deep: !0 }), provide(formContextKey, reactive({
      ...toRefs(a),
      emit: n,
      resetFields: b,
      clearValidate: _,
      validateField: O,
      addField: p,
      removeField: m,
      ...useFormLabelWidth()
    })), t({
      validate: A,
      validateField: O,
      resetFields: b,
      clearValidate: _,
      scrollToField: I
    }), (H, L) => (openBlock(), createElementBlock("form", {
      class: normalizeClass(unref(f))
    }, [
      renderSlot(H.$slots, "default")
    ], 2));
  }
});
var Form = /* @__PURE__ */ _export_sfc$1(_sfc_main$r, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/form/src/form.vue"]]);
function _extends$1() {
  return _extends$1 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, _extends$1.apply(this, arguments);
}
function _inheritsLoose(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, _setPrototypeOf(e, t);
}
function _getPrototypeOf(e) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, _getPrototypeOf(e);
}
function _setPrototypeOf(e, t) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, i) {
    return a.__proto__ = i, a;
  }, _setPrototypeOf(e, t);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function _construct(e, t, n) {
  return _isNativeReflectConstruct() ? _construct = Reflect.construct.bind() : _construct = function(i, s, u) {
    var f = [null];
    f.push.apply(f, s);
    var p = Function.bind.apply(i, f), m = new p();
    return u && _setPrototypeOf(m, u.prototype), m;
  }, _construct.apply(null, arguments);
}
function _isNativeFunction(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper = function(a) {
    if (a === null || !_isNativeFunction(a))
      return a;
    if (typeof a != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(a))
        return t.get(a);
      t.set(a, i);
    }
    function i() {
      return _construct(a, arguments, _getPrototypeOf(this).constructor);
    }
    return i.prototype = Object.create(a.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), _setPrototypeOf(i, a);
  }, _wrapNativeSuper(e);
}
var formatRegExp = /%[sdj%]/g, warning = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (warning = function(t, n) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && n.every(function(a) {
    return typeof a == "string";
  }) && console.warn(t, n);
});
function convertFieldsError(e) {
  if (!e || !e.length)
    return null;
  var t = {};
  return e.forEach(function(n) {
    var a = n.field;
    t[a] = t[a] || [], t[a].push(n);
  }), t;
}
function format(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  var i = 0, s = n.length;
  if (typeof e == "function")
    return e.apply(null, n);
  if (typeof e == "string") {
    var u = e.replace(formatRegExp, function(f) {
      if (f === "%%")
        return "%";
      if (i >= s)
        return f;
      switch (f) {
        case "%s":
          return String(n[i++]);
        case "%d":
          return Number(n[i++]);
        case "%j":
          try {
            return JSON.stringify(n[i++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return f;
      }
    });
    return u;
  }
  return e;
}
function isNativeStringType(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function isEmptyValue(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || isNativeStringType(t) && typeof e == "string" && !e);
}
function asyncParallelArray(e, t, n) {
  var a = [], i = 0, s = e.length;
  function u(f) {
    a.push.apply(a, f || []), i++, i === s && n(a);
  }
  e.forEach(function(f) {
    t(f, u);
  });
}
function asyncSerialArray(e, t, n) {
  var a = 0, i = e.length;
  function s(u) {
    if (u && u.length) {
      n(u);
      return;
    }
    var f = a;
    a = a + 1, f < i ? t(e[f], s) : n([]);
  }
  s([]);
}
function flattenObjArr(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    t.push.apply(t, e[n] || []);
  }), t;
}
var AsyncValidationError = /* @__PURE__ */ function(e) {
  _inheritsLoose(t, e);
  function t(n, a) {
    var i;
    return i = e.call(this, "Async Validation Error") || this, i.errors = n, i.fields = a, i;
  }
  return t;
}(/* @__PURE__ */ _wrapNativeSuper(Error));
function asyncMap(e, t, n, a, i) {
  if (t.first) {
    var s = new Promise(function(E, w) {
      var A = function(I) {
        return a(I), I.length ? w(new AsyncValidationError(I, convertFieldsError(I))) : E(i);
      }, T = flattenObjArr(e);
      asyncSerialArray(T, n, A);
    });
    return s.catch(function(E) {
      return E;
    }), s;
  }
  var u = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], f = Object.keys(e), p = f.length, m = 0, b = [], _ = new Promise(function(E, w) {
    var A = function(O) {
      if (b.push.apply(b, O), m++, m === p)
        return a(b), b.length ? w(new AsyncValidationError(b, convertFieldsError(b))) : E(i);
    };
    f.length || (a(b), E(i)), f.forEach(function(T) {
      var O = e[T];
      u.indexOf(T) !== -1 ? asyncSerialArray(O, n, A) : asyncParallelArray(O, n, A);
    });
  });
  return _.catch(function(E) {
    return E;
  }), _;
}
function isErrorObj(e) {
  return !!(e && e.message !== void 0);
}
function getValue(e, t) {
  for (var n = e, a = 0; a < t.length; a++) {
    if (n == null)
      return n;
    n = n[t[a]];
  }
  return n;
}
function complementError(e, t) {
  return function(n) {
    var a;
    return e.fullFields ? a = getValue(t, e.fullFields) : a = t[n.field || e.fullField], isErrorObj(n) ? (n.field = n.field || e.fullField, n.fieldValue = a, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: a,
      field: n.field || e.fullField
    };
  };
}
function deepMerge(e, t) {
  if (t) {
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var a = t[n];
        typeof a == "object" && typeof e[n] == "object" ? e[n] = _extends$1({}, e[n], a) : e[n] = a;
      }
  }
  return e;
}
var required$1 = function(t, n, a, i, s, u) {
  t.required && (!a.hasOwnProperty(t.field) || isEmptyValue(n, u || t.type)) && i.push(format(s.messages.required, t.fullField));
}, whitespace = function(t, n, a, i, s) {
  (/^\s+$/.test(n) || n === "") && i.push(format(s.messages.whitespace, t.fullField));
}, urlReg, getUrlRegex = function() {
  if (urlReg)
    return urlReg;
  var e = "[a-fA-F\\d:]", t = function(z) {
    return z && z.includeBoundaries ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))" : "";
  }, n = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", a = "[a-fA-F\\d]{1,4}", i = (`
(?:
(?:` + a + ":){7}(?:" + a + `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` + a + ":){6}(?:" + n + "|:" + a + `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` + a + ":){5}(?::" + n + "|(?::" + a + `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` + a + ":){4}(?:(?::" + a + "){0,1}:" + n + "|(?::" + a + `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` + a + ":){3}(?:(?::" + a + "){0,2}:" + n + "|(?::" + a + `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` + a + ":){2}(?:(?::" + a + "){0,3}:" + n + "|(?::" + a + `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` + a + ":){1}(?:(?::" + a + "){0,4}:" + n + "|(?::" + a + `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` + a + "){0,5}:" + n + "|(?::" + a + `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), s = new RegExp("(?:^" + n + "$)|(?:^" + i + "$)"), u = new RegExp("^" + n + "$"), f = new RegExp("^" + i + "$"), p = function(z) {
    return z && z.exact ? s : new RegExp("(?:" + t(z) + n + t(z) + ")|(?:" + t(z) + i + t(z) + ")", "g");
  };
  p.v4 = function(L) {
    return L && L.exact ? u : new RegExp("" + t(L) + n + t(L), "g");
  }, p.v6 = function(L) {
    return L && L.exact ? f : new RegExp("" + t(L) + i + t(L), "g");
  };
  var m = "(?:(?:[a-z]+:)?//)", b = "(?:\\S+(?::\\S*)?@)?", _ = p.v4().source, E = p.v6().source, w = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", A = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", T = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", O = "(?::\\d{2,5})?", I = '(?:[/?#][^\\s"]*)?', H = "(?:" + m + "|www\\.)" + b + "(?:localhost|" + _ + "|" + E + "|" + w + A + T + ")" + O + I;
  return urlReg = new RegExp("(?:^" + H + "$)", "i"), urlReg;
}, pattern$2 = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, types = {
  integer: function(t) {
    return types.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return types.number(t) && !types.integer(t);
  },
  array: function(t) {
    return Array.isArray(t);
  },
  regexp: function(t) {
    if (t instanceof RegExp)
      return !0;
    try {
      return !!new RegExp(t);
    } catch {
      return !1;
    }
  },
  date: function(t) {
    return typeof t.getTime == "function" && typeof t.getMonth == "function" && typeof t.getYear == "function" && !isNaN(t.getTime());
  },
  number: function(t) {
    return isNaN(t) ? !1 : typeof t == "number";
  },
  object: function(t) {
    return typeof t == "object" && !types.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(pattern$2.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(getUrlRegex());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(pattern$2.hex);
  }
}, type$1 = function(t, n, a, i, s) {
  if (t.required && n === void 0) {
    required$1(t, n, a, i, s);
    return;
  }
  var u = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], f = t.type;
  u.indexOf(f) > -1 ? types[f](n) || i.push(format(s.messages.types[f], t.fullField, t.type)) : f && typeof n !== t.type && i.push(format(s.messages.types[f], t.fullField, t.type));
}, range = function(t, n, a, i, s) {
  var u = typeof t.len == "number", f = typeof t.min == "number", p = typeof t.max == "number", m = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, b = n, _ = null, E = typeof n == "number", w = typeof n == "string", A = Array.isArray(n);
  if (E ? _ = "number" : w ? _ = "string" : A && (_ = "array"), !_)
    return !1;
  A && (b = n.length), w && (b = n.replace(m, "_").length), u ? b !== t.len && i.push(format(s.messages[_].len, t.fullField, t.len)) : f && !p && b < t.min ? i.push(format(s.messages[_].min, t.fullField, t.min)) : p && !f && b > t.max ? i.push(format(s.messages[_].max, t.fullField, t.max)) : f && p && (b < t.min || b > t.max) && i.push(format(s.messages[_].range, t.fullField, t.min, t.max));
}, ENUM$1 = "enum", enumerable$1 = function(t, n, a, i, s) {
  t[ENUM$1] = Array.isArray(t[ENUM$1]) ? t[ENUM$1] : [], t[ENUM$1].indexOf(n) === -1 && i.push(format(s.messages[ENUM$1], t.fullField, t[ENUM$1].join(", ")));
}, pattern$1 = function(t, n, a, i, s) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(n) || i.push(format(s.messages.pattern.mismatch, t.fullField, n, t.pattern));
    else if (typeof t.pattern == "string") {
      var u = new RegExp(t.pattern);
      u.test(n) || i.push(format(s.messages.pattern.mismatch, t.fullField, n, t.pattern));
    }
  }
}, rules = {
  required: required$1,
  whitespace,
  type: type$1,
  range,
  enum: enumerable$1,
  pattern: pattern$1
}, string = function(t, n, a, i, s) {
  var u = [], f = t.required || !t.required && i.hasOwnProperty(t.field);
  if (f) {
    if (isEmptyValue(n, "string") && !t.required)
      return a();
    rules.required(t, n, i, u, s, "string"), isEmptyValue(n, "string") || (rules.type(t, n, i, u, s), rules.range(t, n, i, u, s), rules.pattern(t, n, i, u, s), t.whitespace === !0 && rules.whitespace(t, n, i, u, s));
  }
  a(u);
}, method = function(t, n, a, i, s) {
  var u = [], f = t.required || !t.required && i.hasOwnProperty(t.field);
  if (f) {
    if (isEmptyValue(n) && !t.required)
      return a();
    rules.required(t, n, i, u, s), n !== void 0 && rules.type(t, n, i, u, s);
  }
  a(u);
}, number = function(t, n, a, i, s) {
  var u = [], f = t.required || !t.required && i.hasOwnProperty(t.field);
  if (f) {
    if (n === "" && (n = void 0), isEmptyValue(n) && !t.required)
      return a();
    rules.required(t, n, i, u, s), n !== void 0 && (rules.type(t, n, i, u, s), rules.range(t, n, i, u, s));
  }
  a(u);
}, _boolean = function(t, n, a, i, s) {
  var u = [], f = t.required || !t.required && i.hasOwnProperty(t.field);
  if (f) {
    if (isEmptyValue(n) && !t.required)
      return a();
    rules.required(t, n, i, u, s), n !== void 0 && rules.type(t, n, i, u, s);
  }
  a(u);
}, regexp = function(t, n, a, i, s) {
  var u = [], f = t.required || !t.required && i.hasOwnProperty(t.field);
  if (f) {
    if (isEmptyValue(n) && !t.required)
      return a();
    rules.required(t, n, i, u, s), isEmptyValue(n) || rules.type(t, n, i, u, s);
  }
  a(u);
}, integer = function(t, n, a, i, s) {
  var u = [], f = t.required || !t.required && i.hasOwnProperty(t.field);
  if (f) {
    if (isEmptyValue(n) && !t.required)
      return a();
    rules.required(t, n, i, u, s), n !== void 0 && (rules.type(t, n, i, u, s), rules.range(t, n, i, u, s));
  }
  a(u);
}, floatFn = function(t, n, a, i, s) {
  var u = [], f = t.required || !t.required && i.hasOwnProperty(t.field);
  if (f) {
    if (isEmptyValue(n) && !t.required)
      return a();
    rules.required(t, n, i, u, s), n !== void 0 && (rules.type(t, n, i, u, s), rules.range(t, n, i, u, s));
  }
  a(u);
}, array = function(t, n, a, i, s) {
  var u = [], f = t.required || !t.required && i.hasOwnProperty(t.field);
  if (f) {
    if (n == null && !t.required)
      return a();
    rules.required(t, n, i, u, s, "array"), n != null && (rules.type(t, n, i, u, s), rules.range(t, n, i, u, s));
  }
  a(u);
}, object = function(t, n, a, i, s) {
  var u = [], f = t.required || !t.required && i.hasOwnProperty(t.field);
  if (f) {
    if (isEmptyValue(n) && !t.required)
      return a();
    rules.required(t, n, i, u, s), n !== void 0 && rules.type(t, n, i, u, s);
  }
  a(u);
}, ENUM = "enum", enumerable = function(t, n, a, i, s) {
  var u = [], f = t.required || !t.required && i.hasOwnProperty(t.field);
  if (f) {
    if (isEmptyValue(n) && !t.required)
      return a();
    rules.required(t, n, i, u, s), n !== void 0 && rules[ENUM](t, n, i, u, s);
  }
  a(u);
}, pattern = function(t, n, a, i, s) {
  var u = [], f = t.required || !t.required && i.hasOwnProperty(t.field);
  if (f) {
    if (isEmptyValue(n, "string") && !t.required)
      return a();
    rules.required(t, n, i, u, s), isEmptyValue(n, "string") || rules.pattern(t, n, i, u, s);
  }
  a(u);
}, date = function(t, n, a, i, s) {
  var u = [], f = t.required || !t.required && i.hasOwnProperty(t.field);
  if (f) {
    if (isEmptyValue(n, "date") && !t.required)
      return a();
    if (rules.required(t, n, i, u, s), !isEmptyValue(n, "date")) {
      var p;
      n instanceof Date ? p = n : p = new Date(n), rules.type(t, p, i, u, s), p && rules.range(t, p.getTime(), i, u, s);
    }
  }
  a(u);
}, required = function(t, n, a, i, s) {
  var u = [], f = Array.isArray(n) ? "array" : typeof n;
  rules.required(t, n, i, u, s, f), a(u);
}, type = function(t, n, a, i, s) {
  var u = t.type, f = [], p = t.required || !t.required && i.hasOwnProperty(t.field);
  if (p) {
    if (isEmptyValue(n, u) && !t.required)
      return a();
    rules.required(t, n, i, f, s, u), isEmptyValue(n, u) || rules.type(t, n, i, f, s);
  }
  a(f);
}, any = function(t, n, a, i, s) {
  var u = [], f = t.required || !t.required && i.hasOwnProperty(t.field);
  if (f) {
    if (isEmptyValue(n) && !t.required)
      return a();
    rules.required(t, n, i, u, s);
  }
  a(u);
}, validators$2 = {
  string,
  method,
  number,
  boolean: _boolean,
  regexp,
  integer,
  float: floatFn,
  array,
  object,
  enum: enumerable,
  pattern,
  date,
  url: type,
  hex: type,
  email: type,
  required,
  any
};
function newMessages() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function() {
      var t = JSON.parse(JSON.stringify(this));
      return t.clone = this.clone, t;
    }
  };
}
var messages = newMessages(), Schema = /* @__PURE__ */ function() {
  function e(n) {
    this.rules = null, this._messages = messages, this.define(n);
  }
  var t = e.prototype;
  return t.define = function(a) {
    var i = this;
    if (!a)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof a != "object" || Array.isArray(a))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(a).forEach(function(s) {
      var u = a[s];
      i.rules[s] = Array.isArray(u) ? u : [u];
    });
  }, t.messages = function(a) {
    return a && (this._messages = deepMerge(newMessages(), a)), this._messages;
  }, t.validate = function(a, i, s) {
    var u = this;
    i === void 0 && (i = {}), s === void 0 && (s = function() {
    });
    var f = a, p = i, m = s;
    if (typeof p == "function" && (m = p, p = {}), !this.rules || Object.keys(this.rules).length === 0)
      return m && m(null, f), Promise.resolve(f);
    function b(T) {
      var O = [], I = {};
      function H(z) {
        if (Array.isArray(z)) {
          var G;
          O = (G = O).concat.apply(G, z);
        } else
          O.push(z);
      }
      for (var L = 0; L < T.length; L++)
        H(T[L]);
      O.length ? (I = convertFieldsError(O), m(O, I)) : m(null, f);
    }
    if (p.messages) {
      var _ = this.messages();
      _ === messages && (_ = newMessages()), deepMerge(_, p.messages), p.messages = _;
    } else
      p.messages = this.messages();
    var E = {}, w = p.keys || Object.keys(this.rules);
    w.forEach(function(T) {
      var O = u.rules[T], I = f[T];
      O.forEach(function(H) {
        var L = H;
        typeof L.transform == "function" && (f === a && (f = _extends$1({}, f)), I = f[T] = L.transform(I)), typeof L == "function" ? L = {
          validator: L
        } : L = _extends$1({}, L), L.validator = u.getValidationMethod(L), L.validator && (L.field = T, L.fullField = L.fullField || T, L.type = u.getType(L), E[T] = E[T] || [], E[T].push({
          rule: L,
          value: I,
          source: f,
          field: T
        }));
      });
    });
    var A = {};
    return asyncMap(E, p, function(T, O) {
      var I = T.rule, H = (I.type === "object" || I.type === "array") && (typeof I.fields == "object" || typeof I.defaultField == "object");
      H = H && (I.required || !I.required && T.value), I.field = T.field;
      function L(Z, J) {
        return _extends$1({}, J, {
          fullField: I.fullField + "." + Z,
          fullFields: I.fullFields ? [].concat(I.fullFields, [Z]) : [Z]
        });
      }
      function z(Z) {
        Z === void 0 && (Z = []);
        var J = Array.isArray(Z) ? Z : [Z];
        !p.suppressWarning && J.length && e.warning("async-validator:", J), J.length && I.message !== void 0 && (J = [].concat(I.message));
        var x = J.map(complementError(I, f));
        if (p.first && x.length)
          return A[I.field] = 1, O(x);
        if (!H)
          O(x);
        else {
          if (I.required && !T.value)
            return I.message !== void 0 ? x = [].concat(I.message).map(complementError(I, f)) : p.error && (x = [p.error(I, format(p.messages.required, I.field))]), O(x);
          var q = {};
          I.defaultField && Object.keys(T.value).map(function(oe) {
            q[oe] = I.defaultField;
          }), q = _extends$1({}, q, T.rule.fields);
          var B = {};
          Object.keys(q).forEach(function(oe) {
            var R = q[oe], W = Array.isArray(R) ? R : [R];
            B[oe] = W.map(L.bind(null, oe));
          });
          var Y = new e(B);
          Y.messages(p.messages), T.rule.options && (T.rule.options.messages = p.messages, T.rule.options.error = p.error), Y.validate(T.value, T.rule.options || p, function(oe) {
            var R = [];
            x && x.length && R.push.apply(R, x), oe && oe.length && R.push.apply(R, oe), O(R.length ? R : null);
          });
        }
      }
      var G;
      if (I.asyncValidator)
        G = I.asyncValidator(I, T.value, z, T.source, p);
      else if (I.validator) {
        try {
          G = I.validator(I, T.value, z, T.source, p);
        } catch (Z) {
          console.error == null || console.error(Z), p.suppressValidatorError || setTimeout(function() {
            throw Z;
          }, 0), z(Z.message);
        }
        G === !0 ? z() : G === !1 ? z(typeof I.message == "function" ? I.message(I.fullField || I.field) : I.message || (I.fullField || I.field) + " fails") : G instanceof Array ? z(G) : G instanceof Error && z(G.message);
      }
      G && G.then && G.then(function() {
        return z();
      }, function(Z) {
        return z(Z);
      });
    }, function(T) {
      b(T);
    }, f);
  }, t.getType = function(a) {
    if (a.type === void 0 && a.pattern instanceof RegExp && (a.type = "pattern"), typeof a.validator != "function" && a.type && !validators$2.hasOwnProperty(a.type))
      throw new Error(format("Unknown rule type %s", a.type));
    return a.type || "string";
  }, t.getValidationMethod = function(a) {
    if (typeof a.validator == "function")
      return a.validator;
    var i = Object.keys(a), s = i.indexOf("message");
    return s !== -1 && i.splice(s, 1), i.length === 1 && i[0] === "required" ? validators$2.required : validators$2[this.getType(a)] || void 0;
  }, e;
}();
Schema.register = function(t, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  validators$2[t] = n;
};
Schema.warning = warning;
Schema.messages = messages;
Schema.validators = validators$2;
const formItemValidateStates = [
  "",
  "error",
  "validating",
  "success"
], formItemProps = buildProps({
  label: String,
  labelWidth: {
    type: [String, Number],
    default: ""
  },
  prop: {
    type: definePropType([String, Array])
  },
  required: {
    type: Boolean,
    default: void 0
  },
  rules: {
    type: definePropType([Object, Array])
  },
  error: String,
  validateStatus: {
    type: String,
    values: formItemValidateStates
  },
  for: String,
  inlineMessage: {
    type: [String, Boolean],
    default: ""
  },
  showMessage: {
    type: Boolean,
    default: !0
  },
  size: {
    type: String,
    values: componentSizes
  }
}), COMPONENT_NAME = "ElLabelWrap";
var FormLabelWrap = defineComponent({
  name: COMPONENT_NAME,
  props: {
    isAutoWidth: Boolean,
    updateAll: Boolean
  },
  setup(e, {
    slots: t
  }) {
    const n = inject(formContextKey, void 0), a = inject(formItemContextKey);
    a || throwError(COMPONENT_NAME, "usage: <el-form-item><label-wrap /></el-form-item>");
    const i = useNamespace("form"), s = ref(), u = ref(0), f = () => {
      var b;
      if ((b = s.value) != null && b.firstElementChild) {
        const _ = window.getComputedStyle(s.value.firstElementChild).width;
        return Math.ceil(Number.parseFloat(_));
      } else
        return 0;
    }, p = (b = "update") => {
      nextTick(() => {
        t.default && e.isAutoWidth && (b === "update" ? u.value = f() : b === "remove" && (n == null || n.deregisterLabelWidth(u.value)));
      });
    }, m = () => p("update");
    return onMounted(() => {
      m();
    }), onBeforeUnmount(() => {
      p("remove");
    }), onUpdated(() => m()), watch(u, (b, _) => {
      e.updateAll && (n == null || n.registerLabelWidth(b, _));
    }), useResizeObserver(computed(() => {
      var b, _;
      return (_ = (b = s.value) == null ? void 0 : b.firstElementChild) != null ? _ : null;
    }), m), () => {
      var b, _;
      if (!t)
        return null;
      const {
        isAutoWidth: E
      } = e;
      if (E) {
        const w = n == null ? void 0 : n.autoLabelWidth, A = a == null ? void 0 : a.hasLabel, T = {};
        if (A && w && w !== "auto") {
          const O = Math.max(0, Number.parseInt(w, 10) - u.value), I = n.labelPosition === "left" ? "marginRight" : "marginLeft";
          O && (T[I] = `${O}px`);
        }
        return createVNode("div", {
          ref: s,
          class: [i.be("item", "label-wrap")],
          style: T
        }, [(b = t.default) == null ? void 0 : b.call(t)]);
      } else
        return createVNode(Fragment, {
          ref: s
        }, [(_ = t.default) == null ? void 0 : _.call(t)]);
    };
  }
});
const _hoisted_1$9 = ["role", "aria-labelledby"], __default__$4 = defineComponent({
  name: "ElFormItem"
}), _sfc_main$q = /* @__PURE__ */ defineComponent({
  ...__default__$4,
  props: formItemProps,
  setup(e, { expose: t }) {
    const n = e, a = useSlots(), i = inject(formContextKey, void 0), s = inject(formItemContextKey, void 0), u = useFormSize(void 0, { formItem: !1 }), f = useNamespace("form-item"), p = useId().value, m = ref([]), b = ref(""), _ = refDebounced(b, 100), E = ref(""), w = ref();
    let A, T = !1;
    const O = computed(() => {
      if ((i == null ? void 0 : i.labelPosition) === "top")
        return {};
      const ee = addUnit(n.labelWidth || (i == null ? void 0 : i.labelWidth) || "");
      return ee ? { width: ee } : {};
    }), I = computed(() => {
      if ((i == null ? void 0 : i.labelPosition) === "top" || i != null && i.inline)
        return {};
      if (!n.label && !n.labelWidth && q)
        return {};
      const ee = addUnit(n.labelWidth || (i == null ? void 0 : i.labelWidth) || "");
      return !n.label && !a.label ? { marginLeft: ee } : {};
    }), H = computed(() => [
      f.b(),
      f.m(u.value),
      f.is("error", b.value === "error"),
      f.is("validating", b.value === "validating"),
      f.is("success", b.value === "success"),
      f.is("required", W.value || n.required),
      f.is("no-asterisk", i == null ? void 0 : i.hideRequiredAsterisk),
      (i == null ? void 0 : i.requireAsteriskPosition) === "right" ? "asterisk-right" : "asterisk-left",
      { [f.m("feedback")]: i == null ? void 0 : i.statusIcon }
    ]), L = computed(() => isBoolean$1(n.inlineMessage) ? n.inlineMessage : (i == null ? void 0 : i.inlineMessage) || !1), z = computed(() => [
      f.e("error"),
      { [f.em("error", "inline")]: L.value }
    ]), G = computed(() => n.prop ? isString$1(n.prop) ? n.prop : n.prop.join(".") : ""), Z = computed(() => !!(n.label || a.label)), J = computed(() => n.for || m.value.length === 1 ? m.value[0] : void 0), x = computed(() => !J.value && Z.value), q = !!s, B = computed(() => {
      const ee = i == null ? void 0 : i.model;
      if (!(!ee || !n.prop))
        return getProp(ee, n.prop).value;
    }), Y = computed(() => {
      const { required: ee } = n, ge = [];
      n.rules && ge.push(...castArray(n.rules));
      const xe = i == null ? void 0 : i.rules;
      if (xe && n.prop) {
        const Ie = getProp(xe, n.prop).value;
        Ie && ge.push(...castArray(Ie));
      }
      if (ee !== void 0) {
        const Ie = ge.map((Ue, ft) => [Ue, ft]).filter(([Ue]) => Object.keys(Ue).includes("required"));
        if (Ie.length > 0)
          for (const [Ue, ft] of Ie)
            Ue.required !== ee && (ge[ft] = { ...Ue, required: ee });
        else
          ge.push({ required: ee });
      }
      return ge;
    }), oe = computed(() => Y.value.length > 0), R = (ee) => Y.value.filter((xe) => !xe.trigger || !ee ? !0 : Array.isArray(xe.trigger) ? xe.trigger.includes(ee) : xe.trigger === ee).map(({ trigger: xe, ...Ie }) => Ie), W = computed(() => Y.value.some((ee) => ee.required)), te = computed(() => {
      var ee;
      return _.value === "error" && n.showMessage && ((ee = i == null ? void 0 : i.showMessage) != null ? ee : !0);
    }), le = computed(() => `${n.label || ""}${(i == null ? void 0 : i.labelSuffix) || ""}`), fe = (ee) => {
      b.value = ee;
    }, $ = (ee) => {
      var ge, xe;
      const { errors: Ie, fields: Ue } = ee;
      (!Ie || !Ue) && console.error(ee), fe("error"), E.value = Ie ? (xe = (ge = Ie == null ? void 0 : Ie[0]) == null ? void 0 : ge.message) != null ? xe : `${n.prop} is required` : "", i == null || i.emit("validate", n.prop, !1, E.value);
    }, U = () => {
      fe("success"), i == null || i.emit("validate", n.prop, !0, "");
    }, ne = async (ee) => {
      const ge = G.value;
      return new Schema({
        [ge]: ee
      }).validate({ [ge]: B.value }, { firstFields: !0 }).then(() => (U(), !0)).catch((Ie) => ($(Ie), Promise.reject(Ie)));
    }, se = async (ee, ge) => {
      if (T || !n.prop)
        return !1;
      const xe = isFunction$2(ge);
      if (!oe.value)
        return ge == null || ge(!1), !1;
      const Ie = R(ee);
      return Ie.length === 0 ? (ge == null || ge(!0), !0) : (fe("validating"), ne(Ie).then(() => (ge == null || ge(!0), !0)).catch((Ue) => {
        const { fields: ft } = Ue;
        return ge == null || ge(!1, ft), xe ? !1 : Promise.reject(ft);
      }));
    }, Pe = () => {
      fe(""), E.value = "", T = !1;
    }, ct = async () => {
      const ee = i == null ? void 0 : i.model;
      if (!ee || !n.prop)
        return;
      const ge = getProp(ee, n.prop);
      T = !0, ge.value = clone$1(A), await nextTick(), Pe(), T = !1;
    }, Ot = (ee) => {
      m.value.includes(ee) || m.value.push(ee);
    }, tt = (ee) => {
      m.value = m.value.filter((ge) => ge !== ee);
    };
    watch(() => n.error, (ee) => {
      E.value = ee || "", fe(ee ? "error" : "");
    }, { immediate: !0 }), watch(() => n.validateStatus, (ee) => fe(ee || ""));
    const be = reactive({
      ...toRefs(n),
      $el: w,
      size: u,
      validateState: b,
      labelId: p,
      inputIds: m,
      isGroup: x,
      hasLabel: Z,
      addInputId: Ot,
      removeInputId: tt,
      resetField: ct,
      clearValidate: Pe,
      validate: se
    });
    return provide(formItemContextKey, be), onMounted(() => {
      n.prop && (i == null || i.addField(be), A = clone$1(B.value));
    }), onBeforeUnmount(() => {
      i == null || i.removeField(be);
    }), t({
      size: u,
      validateMessage: E,
      validateState: b,
      validate: se,
      clearValidate: Pe,
      resetField: ct
    }), (ee, ge) => {
      var xe;
      return openBlock(), createElementBlock("div", {
        ref_key: "formItemRef",
        ref: w,
        class: normalizeClass(unref(H)),
        role: unref(x) ? "group" : void 0,
        "aria-labelledby": unref(x) ? unref(p) : void 0
      }, [
        createVNode(unref(FormLabelWrap), {
          "is-auto-width": unref(O).width === "auto",
          "update-all": ((xe = unref(i)) == null ? void 0 : xe.labelWidth) === "auto"
        }, {
          default: withCtx(() => [
            unref(Z) ? (openBlock(), createBlock(resolveDynamicComponent(unref(J) ? "label" : "div"), {
              key: 0,
              id: unref(p),
              for: unref(J),
              class: normalizeClass(unref(f).e("label")),
              style: normalizeStyle(unref(O))
            }, {
              default: withCtx(() => [
                renderSlot(ee.$slots, "label", { label: unref(le) }, () => [
                  createTextVNode(toDisplayString(unref(le)), 1)
                ])
              ]),
              _: 3
            }, 8, ["id", "for", "class", "style"])) : createCommentVNode("v-if", !0)
          ]),
          _: 3
        }, 8, ["is-auto-width", "update-all"]),
        createElementVNode("div", {
          class: normalizeClass(unref(f).e("content")),
          style: normalizeStyle(unref(I))
        }, [
          renderSlot(ee.$slots, "default"),
          createVNode(TransitionGroup, {
            name: `${unref(f).namespace.value}-zoom-in-top`
          }, {
            default: withCtx(() => [
              unref(te) ? renderSlot(ee.$slots, "error", {
                key: 0,
                error: E.value
              }, () => [
                createElementVNode("div", {
                  class: normalizeClass(unref(z))
                }, toDisplayString(E.value), 3)
              ]) : createCommentVNode("v-if", !0)
            ]),
            _: 3
          }, 8, ["name"])
        ], 6)
      ], 10, _hoisted_1$9);
    };
  }
});
var FormItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$q, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/form/src/form-item.vue"]]);
const ElForm = withInstall(Form, {
  FormItem
});
withNoopInstall(FormItem);
const badgeProps = buildProps({
  value: {
    type: [String, Number],
    default: ""
  },
  max: {
    type: Number,
    default: 99
  },
  isDot: Boolean,
  hidden: Boolean,
  type: {
    type: String,
    values: ["primary", "success", "warning", "info", "danger"],
    default: "danger"
  }
}), _hoisted_1$8 = ["textContent"], __default__$3 = defineComponent({
  name: "ElBadge"
}), _sfc_main$p = /* @__PURE__ */ defineComponent({
  ...__default__$3,
  props: badgeProps,
  setup(e, { expose: t }) {
    const n = e, a = useNamespace("badge"), i = computed(() => n.isDot ? "" : isNumber$1(n.value) && isNumber$1(n.max) ? n.max < n.value ? `${n.max}+` : `${n.value}` : `${n.value}`);
    return t({
      content: i
    }), (s, u) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(unref(a).b())
    }, [
      renderSlot(s.$slots, "default"),
      createVNode(Transition, {
        name: `${unref(a).namespace.value}-zoom-in-center`,
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("sup", {
            class: normalizeClass([
              unref(a).e("content"),
              unref(a).em("content", s.type),
              unref(a).is("fixed", !!s.$slots.default),
              unref(a).is("dot", s.isDot)
            ]),
            textContent: toDisplayString(unref(i))
          }, null, 10, _hoisted_1$8), [
            [vShow, !s.hidden && (unref(i) || s.isDot)]
          ])
        ]),
        _: 1
      }, 8, ["name"])
    ], 2));
  }
});
var Badge = /* @__PURE__ */ _export_sfc$1(_sfc_main$p, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/badge/src/badge.vue"]]);
const ElBadge = withInstall(Badge), buttonGroupContextKey = Symbol("buttonGroupContextKey"), useButton = (e, t) => {
  useDeprecated({
    from: "type.text",
    replacement: "link",
    version: "3.0.0",
    scope: "props",
    ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
  }, computed(() => e.type === "text"));
  const n = inject(buttonGroupContextKey, void 0), a = useGlobalConfig("button"), { form: i } = useFormItem(), s = useFormSize(computed(() => n == null ? void 0 : n.size)), u = useFormDisabled(), f = ref(), p = useSlots(), m = computed(() => e.type || (n == null ? void 0 : n.type) || ""), b = computed(() => {
    var A, T, O;
    return (O = (T = e.autoInsertSpace) != null ? T : (A = a.value) == null ? void 0 : A.autoInsertSpace) != null ? O : !1;
  }), _ = computed(() => e.tag === "button" ? {
    ariaDisabled: u.value || e.loading,
    disabled: u.value || e.loading,
    autofocus: e.autofocus,
    type: e.nativeType
  } : {}), E = computed(() => {
    var A;
    const T = (A = p.default) == null ? void 0 : A.call(p);
    if (b.value && (T == null ? void 0 : T.length) === 1) {
      const O = T[0];
      if ((O == null ? void 0 : O.type) === Text) {
        const I = O.children;
        return /^\p{Unified_Ideograph}{2}$/u.test(I.trim());
      }
    }
    return !1;
  });
  return {
    _disabled: u,
    _size: s,
    _type: m,
    _ref: f,
    _props: _,
    shouldAddSpace: E,
    handleClick: (A) => {
      e.nativeType === "reset" && (i == null || i.resetFields()), t("click", A);
    }
  };
}, buttonTypes = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  "text",
  ""
], buttonNativeTypes = ["button", "submit", "reset"], buttonProps = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  type: {
    type: String,
    values: buttonTypes,
    default: ""
  },
  icon: {
    type: iconPropType
  },
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: "button"
  },
  loading: Boolean,
  loadingIcon: {
    type: iconPropType,
    default: () => loading_default
  },
  plain: Boolean,
  text: Boolean,
  link: Boolean,
  bg: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String,
  dark: Boolean,
  autoInsertSpace: {
    type: Boolean,
    default: void 0
  },
  tag: {
    type: definePropType([String, Object]),
    default: "button"
  }
}), buttonEmits = {
  click: (e) => e instanceof MouseEvent
};
function bound01(e, t) {
  isOnePointZero(e) && (e = "100%");
  var n = isPercentage(e);
  return e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e))), n && (e = parseInt(String(e * t), 10) / 100), Math.abs(e - t) < 1e-6 ? 1 : (t === 360 ? e = (e < 0 ? e % t + t : e % t) / parseFloat(String(t)) : e = e % t / parseFloat(String(t)), e);
}
function clamp01(e) {
  return Math.min(1, Math.max(0, e));
}
function isOnePointZero(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function isPercentage(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function boundAlpha(e) {
  return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function convertToPercentage(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function pad2(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function rgbToRgb(e, t, n) {
  return {
    r: bound01(e, 255) * 255,
    g: bound01(t, 255) * 255,
    b: bound01(n, 255) * 255
  };
}
function rgbToHsl(e, t, n) {
  e = bound01(e, 255), t = bound01(t, 255), n = bound01(n, 255);
  var a = Math.max(e, t, n), i = Math.min(e, t, n), s = 0, u = 0, f = (a + i) / 2;
  if (a === i)
    u = 0, s = 0;
  else {
    var p = a - i;
    switch (u = f > 0.5 ? p / (2 - a - i) : p / (a + i), a) {
      case e:
        s = (t - n) / p + (t < n ? 6 : 0);
        break;
      case t:
        s = (n - e) / p + 2;
        break;
      case n:
        s = (e - t) / p + 4;
        break;
    }
    s /= 6;
  }
  return { h: s, s: u, l: f };
}
function hue2rgb(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * (6 * n) : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function hslToRgb(e, t, n) {
  var a, i, s;
  if (e = bound01(e, 360), t = bound01(t, 100), n = bound01(n, 100), t === 0)
    i = n, s = n, a = n;
  else {
    var u = n < 0.5 ? n * (1 + t) : n + t - n * t, f = 2 * n - u;
    a = hue2rgb(f, u, e + 1 / 3), i = hue2rgb(f, u, e), s = hue2rgb(f, u, e - 1 / 3);
  }
  return { r: a * 255, g: i * 255, b: s * 255 };
}
function rgbToHsv(e, t, n) {
  e = bound01(e, 255), t = bound01(t, 255), n = bound01(n, 255);
  var a = Math.max(e, t, n), i = Math.min(e, t, n), s = 0, u = a, f = a - i, p = a === 0 ? 0 : f / a;
  if (a === i)
    s = 0;
  else {
    switch (a) {
      case e:
        s = (t - n) / f + (t < n ? 6 : 0);
        break;
      case t:
        s = (n - e) / f + 2;
        break;
      case n:
        s = (e - t) / f + 4;
        break;
    }
    s /= 6;
  }
  return { h: s, s: p, v: u };
}
function hsvToRgb(e, t, n) {
  e = bound01(e, 360) * 6, t = bound01(t, 100), n = bound01(n, 100);
  var a = Math.floor(e), i = e - a, s = n * (1 - t), u = n * (1 - i * t), f = n * (1 - (1 - i) * t), p = a % 6, m = [n, u, s, s, f, n][p], b = [f, n, n, u, s, s][p], _ = [s, s, f, n, n, u][p];
  return { r: m * 255, g: b * 255, b: _ * 255 };
}
function rgbToHex(e, t, n, a) {
  var i = [
    pad2(Math.round(e).toString(16)),
    pad2(Math.round(t).toString(16)),
    pad2(Math.round(n).toString(16))
  ];
  return a && i[0].startsWith(i[0].charAt(1)) && i[1].startsWith(i[1].charAt(1)) && i[2].startsWith(i[2].charAt(1)) ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) : i.join("");
}
function rgbaToHex(e, t, n, a, i) {
  var s = [
    pad2(Math.round(e).toString(16)),
    pad2(Math.round(t).toString(16)),
    pad2(Math.round(n).toString(16)),
    pad2(convertDecimalToHex(a))
  ];
  return i && s[0].startsWith(s[0].charAt(1)) && s[1].startsWith(s[1].charAt(1)) && s[2].startsWith(s[2].charAt(1)) && s[3].startsWith(s[3].charAt(1)) ? s[0].charAt(0) + s[1].charAt(0) + s[2].charAt(0) + s[3].charAt(0) : s.join("");
}
function convertDecimalToHex(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function convertHexToDecimal(e) {
  return parseIntFromHex(e) / 255;
}
function parseIntFromHex(e) {
  return parseInt(e, 16);
}
function numberInputToObject(e) {
  return {
    r: e >> 16,
    g: (e & 65280) >> 8,
    b: e & 255
  };
}
var names = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function inputToRGB(e) {
  var t = { r: 0, g: 0, b: 0 }, n = 1, a = null, i = null, s = null, u = !1, f = !1;
  return typeof e == "string" && (e = stringInputToObject(e)), typeof e == "object" && (isValidCSSUnit(e.r) && isValidCSSUnit(e.g) && isValidCSSUnit(e.b) ? (t = rgbToRgb(e.r, e.g, e.b), u = !0, f = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : isValidCSSUnit(e.h) && isValidCSSUnit(e.s) && isValidCSSUnit(e.v) ? (a = convertToPercentage(e.s), i = convertToPercentage(e.v), t = hsvToRgb(e.h, a, i), u = !0, f = "hsv") : isValidCSSUnit(e.h) && isValidCSSUnit(e.s) && isValidCSSUnit(e.l) && (a = convertToPercentage(e.s), s = convertToPercentage(e.l), t = hslToRgb(e.h, a, s), u = !0, f = "hsl"), Object.prototype.hasOwnProperty.call(e, "a") && (n = e.a)), n = boundAlpha(n), {
    ok: u,
    format: e.format || f,
    r: Math.min(255, Math.max(t.r, 0)),
    g: Math.min(255, Math.max(t.g, 0)),
    b: Math.min(255, Math.max(t.b, 0)),
    a: n
  };
}
var CSS_INTEGER = "[-\\+]?\\d+%?", CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?", CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")"), PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?"), PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?"), matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
  rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
  hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
  hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
  hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
  hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function stringInputToObject(e) {
  if (e = e.trim().toLowerCase(), e.length === 0)
    return !1;
  var t = !1;
  if (names[e])
    e = names[e], t = !0;
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var n = matchers.rgb.exec(e);
  return n ? { r: n[1], g: n[2], b: n[3] } : (n = matchers.rgba.exec(e), n ? { r: n[1], g: n[2], b: n[3], a: n[4] } : (n = matchers.hsl.exec(e), n ? { h: n[1], s: n[2], l: n[3] } : (n = matchers.hsla.exec(e), n ? { h: n[1], s: n[2], l: n[3], a: n[4] } : (n = matchers.hsv.exec(e), n ? { h: n[1], s: n[2], v: n[3] } : (n = matchers.hsva.exec(e), n ? { h: n[1], s: n[2], v: n[3], a: n[4] } : (n = matchers.hex8.exec(e), n ? {
    r: parseIntFromHex(n[1]),
    g: parseIntFromHex(n[2]),
    b: parseIntFromHex(n[3]),
    a: convertHexToDecimal(n[4]),
    format: t ? "name" : "hex8"
  } : (n = matchers.hex6.exec(e), n ? {
    r: parseIntFromHex(n[1]),
    g: parseIntFromHex(n[2]),
    b: parseIntFromHex(n[3]),
    format: t ? "name" : "hex"
  } : (n = matchers.hex4.exec(e), n ? {
    r: parseIntFromHex(n[1] + n[1]),
    g: parseIntFromHex(n[2] + n[2]),
    b: parseIntFromHex(n[3] + n[3]),
    a: convertHexToDecimal(n[4] + n[4]),
    format: t ? "name" : "hex8"
  } : (n = matchers.hex3.exec(e), n ? {
    r: parseIntFromHex(n[1] + n[1]),
    g: parseIntFromHex(n[2] + n[2]),
    b: parseIntFromHex(n[3] + n[3]),
    format: t ? "name" : "hex"
  } : !1)))))))));
}
function isValidCSSUnit(e) {
  return !!matchers.CSS_UNIT.exec(String(e));
}
var TinyColor = (
  /** @class */
  function() {
    function e(t, n) {
      t === void 0 && (t = ""), n === void 0 && (n = {});
      var a;
      if (t instanceof e)
        return t;
      typeof t == "number" && (t = numberInputToObject(t)), this.originalInput = t;
      var i = inputToRGB(t);
      this.originalInput = t, this.r = i.r, this.g = i.g, this.b = i.b, this.a = i.a, this.roundA = Math.round(100 * this.a) / 100, this.format = (a = n.format) !== null && a !== void 0 ? a : i.format, this.gradientType = n.gradientType, this.r < 1 && (this.r = Math.round(this.r)), this.g < 1 && (this.g = Math.round(this.g)), this.b < 1 && (this.b = Math.round(this.b)), this.isValid = i.ok;
    }
    return e.prototype.isDark = function() {
      return this.getBrightness() < 128;
    }, e.prototype.isLight = function() {
      return !this.isDark();
    }, e.prototype.getBrightness = function() {
      var t = this.toRgb();
      return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3;
    }, e.prototype.getLuminance = function() {
      var t = this.toRgb(), n, a, i, s = t.r / 255, u = t.g / 255, f = t.b / 255;
      return s <= 0.03928 ? n = s / 12.92 : n = Math.pow((s + 0.055) / 1.055, 2.4), u <= 0.03928 ? a = u / 12.92 : a = Math.pow((u + 0.055) / 1.055, 2.4), f <= 0.03928 ? i = f / 12.92 : i = Math.pow((f + 0.055) / 1.055, 2.4), 0.2126 * n + 0.7152 * a + 0.0722 * i;
    }, e.prototype.getAlpha = function() {
      return this.a;
    }, e.prototype.setAlpha = function(t) {
      return this.a = boundAlpha(t), this.roundA = Math.round(100 * this.a) / 100, this;
    }, e.prototype.isMonochrome = function() {
      var t = this.toHsl().s;
      return t === 0;
    }, e.prototype.toHsv = function() {
      var t = rgbToHsv(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
    }, e.prototype.toHsvString = function() {
      var t = rgbToHsv(this.r, this.g, this.b), n = Math.round(t.h * 360), a = Math.round(t.s * 100), i = Math.round(t.v * 100);
      return this.a === 1 ? "hsv(".concat(n, ", ").concat(a, "%, ").concat(i, "%)") : "hsva(".concat(n, ", ").concat(a, "%, ").concat(i, "%, ").concat(this.roundA, ")");
    }, e.prototype.toHsl = function() {
      var t = rgbToHsl(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
    }, e.prototype.toHslString = function() {
      var t = rgbToHsl(this.r, this.g, this.b), n = Math.round(t.h * 360), a = Math.round(t.s * 100), i = Math.round(t.l * 100);
      return this.a === 1 ? "hsl(".concat(n, ", ").concat(a, "%, ").concat(i, "%)") : "hsla(".concat(n, ", ").concat(a, "%, ").concat(i, "%, ").concat(this.roundA, ")");
    }, e.prototype.toHex = function(t) {
      return t === void 0 && (t = !1), rgbToHex(this.r, this.g, this.b, t);
    }, e.prototype.toHexString = function(t) {
      return t === void 0 && (t = !1), "#" + this.toHex(t);
    }, e.prototype.toHex8 = function(t) {
      return t === void 0 && (t = !1), rgbaToHex(this.r, this.g, this.b, this.a, t);
    }, e.prototype.toHex8String = function(t) {
      return t === void 0 && (t = !1), "#" + this.toHex8(t);
    }, e.prototype.toHexShortString = function(t) {
      return t === void 0 && (t = !1), this.a === 1 ? this.toHexString(t) : this.toHex8String(t);
    }, e.prototype.toRgb = function() {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a
      };
    }, e.prototype.toRgbString = function() {
      var t = Math.round(this.r), n = Math.round(this.g), a = Math.round(this.b);
      return this.a === 1 ? "rgb(".concat(t, ", ").concat(n, ", ").concat(a, ")") : "rgba(".concat(t, ", ").concat(n, ", ").concat(a, ", ").concat(this.roundA, ")");
    }, e.prototype.toPercentageRgb = function() {
      var t = function(n) {
        return "".concat(Math.round(bound01(n, 255) * 100), "%");
      };
      return {
        r: t(this.r),
        g: t(this.g),
        b: t(this.b),
        a: this.a
      };
    }, e.prototype.toPercentageRgbString = function() {
      var t = function(n) {
        return Math.round(bound01(n, 255) * 100);
      };
      return this.a === 1 ? "rgb(".concat(t(this.r), "%, ").concat(t(this.g), "%, ").concat(t(this.b), "%)") : "rgba(".concat(t(this.r), "%, ").concat(t(this.g), "%, ").concat(t(this.b), "%, ").concat(this.roundA, ")");
    }, e.prototype.toName = function() {
      if (this.a === 0)
        return "transparent";
      if (this.a < 1)
        return !1;
      for (var t = "#" + rgbToHex(this.r, this.g, this.b, !1), n = 0, a = Object.entries(names); n < a.length; n++) {
        var i = a[n], s = i[0], u = i[1];
        if (t === u)
          return s;
      }
      return !1;
    }, e.prototype.toString = function(t) {
      var n = !!t;
      t = t ?? this.format;
      var a = !1, i = this.a < 1 && this.a >= 0, s = !n && i && (t.startsWith("hex") || t === "name");
      return s ? t === "name" && this.a === 0 ? this.toName() : this.toRgbString() : (t === "rgb" && (a = this.toRgbString()), t === "prgb" && (a = this.toPercentageRgbString()), (t === "hex" || t === "hex6") && (a = this.toHexString()), t === "hex3" && (a = this.toHexString(!0)), t === "hex4" && (a = this.toHex8String(!0)), t === "hex8" && (a = this.toHex8String()), t === "name" && (a = this.toName()), t === "hsl" && (a = this.toHslString()), t === "hsv" && (a = this.toHsvString()), a || this.toHexString());
    }, e.prototype.toNumber = function() {
      return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    }, e.prototype.clone = function() {
      return new e(this.toString());
    }, e.prototype.lighten = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.l += t / 100, n.l = clamp01(n.l), new e(n);
    }, e.prototype.brighten = function(t) {
      t === void 0 && (t = 10);
      var n = this.toRgb();
      return n.r = Math.max(0, Math.min(255, n.r - Math.round(255 * -(t / 100)))), n.g = Math.max(0, Math.min(255, n.g - Math.round(255 * -(t / 100)))), n.b = Math.max(0, Math.min(255, n.b - Math.round(255 * -(t / 100)))), new e(n);
    }, e.prototype.darken = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.l -= t / 100, n.l = clamp01(n.l), new e(n);
    }, e.prototype.tint = function(t) {
      return t === void 0 && (t = 10), this.mix("white", t);
    }, e.prototype.shade = function(t) {
      return t === void 0 && (t = 10), this.mix("black", t);
    }, e.prototype.desaturate = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.s -= t / 100, n.s = clamp01(n.s), new e(n);
    }, e.prototype.saturate = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.s += t / 100, n.s = clamp01(n.s), new e(n);
    }, e.prototype.greyscale = function() {
      return this.desaturate(100);
    }, e.prototype.spin = function(t) {
      var n = this.toHsl(), a = (n.h + t) % 360;
      return n.h = a < 0 ? 360 + a : a, new e(n);
    }, e.prototype.mix = function(t, n) {
      n === void 0 && (n = 50);
      var a = this.toRgb(), i = new e(t).toRgb(), s = n / 100, u = {
        r: (i.r - a.r) * s + a.r,
        g: (i.g - a.g) * s + a.g,
        b: (i.b - a.b) * s + a.b,
        a: (i.a - a.a) * s + a.a
      };
      return new e(u);
    }, e.prototype.analogous = function(t, n) {
      t === void 0 && (t = 6), n === void 0 && (n = 30);
      var a = this.toHsl(), i = 360 / n, s = [this];
      for (a.h = (a.h - (i * t >> 1) + 720) % 360; --t; )
        a.h = (a.h + i) % 360, s.push(new e(a));
      return s;
    }, e.prototype.complement = function() {
      var t = this.toHsl();
      return t.h = (t.h + 180) % 360, new e(t);
    }, e.prototype.monochromatic = function(t) {
      t === void 0 && (t = 6);
      for (var n = this.toHsv(), a = n.h, i = n.s, s = n.v, u = [], f = 1 / t; t--; )
        u.push(new e({ h: a, s: i, v: s })), s = (s + f) % 1;
      return u;
    }, e.prototype.splitcomplement = function() {
      var t = this.toHsl(), n = t.h;
      return [
        this,
        new e({ h: (n + 72) % 360, s: t.s, l: t.l }),
        new e({ h: (n + 216) % 360, s: t.s, l: t.l })
      ];
    }, e.prototype.onBackground = function(t) {
      var n = this.toRgb(), a = new e(t).toRgb(), i = n.a + a.a * (1 - n.a);
      return new e({
        r: (n.r * n.a + a.r * a.a * (1 - n.a)) / i,
        g: (n.g * n.a + a.g * a.a * (1 - n.a)) / i,
        b: (n.b * n.a + a.b * a.a * (1 - n.a)) / i,
        a: i
      });
    }, e.prototype.triad = function() {
      return this.polyad(3);
    }, e.prototype.tetrad = function() {
      return this.polyad(4);
    }, e.prototype.polyad = function(t) {
      for (var n = this.toHsl(), a = n.h, i = [this], s = 360 / t, u = 1; u < t; u++)
        i.push(new e({ h: (a + u * s) % 360, s: n.s, l: n.l }));
      return i;
    }, e.prototype.equals = function(t) {
      return this.toRgbString() === new e(t).toRgbString();
    }, e;
  }()
);
function darken(e, t = 20) {
  return e.mix("#141414", t).toString();
}
function useButtonCustomStyle(e) {
  const t = useFormDisabled(), n = useNamespace("button");
  return computed(() => {
    let a = {};
    const i = e.color;
    if (i) {
      const s = new TinyColor(i), u = e.dark ? s.tint(20).toString() : darken(s, 20);
      if (e.plain)
        a = n.cssVarBlock({
          "bg-color": e.dark ? darken(s, 90) : s.tint(90).toString(),
          "text-color": i,
          "border-color": e.dark ? darken(s, 50) : s.tint(50).toString(),
          "hover-text-color": `var(${n.cssVarName("color-white")})`,
          "hover-bg-color": i,
          "hover-border-color": i,
          "active-bg-color": u,
          "active-text-color": `var(${n.cssVarName("color-white")})`,
          "active-border-color": u
        }), t.value && (a[n.cssVarBlockName("disabled-bg-color")] = e.dark ? darken(s, 90) : s.tint(90).toString(), a[n.cssVarBlockName("disabled-text-color")] = e.dark ? darken(s, 50) : s.tint(50).toString(), a[n.cssVarBlockName("disabled-border-color")] = e.dark ? darken(s, 80) : s.tint(80).toString());
      else {
        const f = e.dark ? darken(s, 30) : s.tint(30).toString(), p = s.isDark() ? `var(${n.cssVarName("color-white")})` : `var(${n.cssVarName("color-black")})`;
        if (a = n.cssVarBlock({
          "bg-color": i,
          "text-color": p,
          "border-color": i,
          "hover-bg-color": f,
          "hover-text-color": p,
          "hover-border-color": f,
          "active-bg-color": u,
          "active-border-color": u
        }), t.value) {
          const m = e.dark ? darken(s, 50) : s.tint(50).toString();
          a[n.cssVarBlockName("disabled-bg-color")] = m, a[n.cssVarBlockName("disabled-text-color")] = e.dark ? "rgba(255, 255, 255, 0.5)" : `var(${n.cssVarName("color-white")})`, a[n.cssVarBlockName("disabled-border-color")] = m;
        }
      }
    }
    return a;
  });
}
const __default__$2 = defineComponent({
  name: "ElButton"
}), _sfc_main$o = /* @__PURE__ */ defineComponent({
  ...__default__$2,
  props: buttonProps,
  emits: buttonEmits,
  setup(e, { expose: t, emit: n }) {
    const a = e, i = useButtonCustomStyle(a), s = useNamespace("button"), { _ref: u, _size: f, _type: p, _disabled: m, _props: b, shouldAddSpace: _, handleClick: E } = useButton(a, n);
    return t({
      ref: u,
      size: f,
      type: p,
      disabled: m,
      shouldAddSpace: _
    }), (w, A) => (openBlock(), createBlock(resolveDynamicComponent(w.tag), mergeProps({
      ref_key: "_ref",
      ref: u
    }, unref(b), {
      class: [
        unref(s).b(),
        unref(s).m(unref(p)),
        unref(s).m(unref(f)),
        unref(s).is("disabled", unref(m)),
        unref(s).is("loading", w.loading),
        unref(s).is("plain", w.plain),
        unref(s).is("round", w.round),
        unref(s).is("circle", w.circle),
        unref(s).is("text", w.text),
        unref(s).is("link", w.link),
        unref(s).is("has-bg", w.bg)
      ],
      style: unref(i),
      onClick: unref(E)
    }), {
      default: withCtx(() => [
        w.loading ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          w.$slots.loading ? renderSlot(w.$slots, "loading", { key: 0 }) : (openBlock(), createBlock(unref(ElIcon), {
            key: 1,
            class: normalizeClass(unref(s).is("loading"))
          }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(w.loadingIcon)))
            ]),
            _: 1
          }, 8, ["class"]))
        ], 64)) : w.icon || w.$slots.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
          default: withCtx(() => [
            w.icon ? (openBlock(), createBlock(resolveDynamicComponent(w.icon), { key: 0 })) : renderSlot(w.$slots, "icon", { key: 1 })
          ]),
          _: 3
        })) : createCommentVNode("v-if", !0),
        w.$slots.default ? (openBlock(), createElementBlock("span", {
          key: 2,
          class: normalizeClass({ [unref(s).em("text", "expand")]: unref(_) })
        }, [
          renderSlot(w.$slots, "default")
        ], 2)) : createCommentVNode("v-if", !0)
      ]),
      _: 3
    }, 16, ["class", "style", "onClick"]));
  }
});
var Button = /* @__PURE__ */ _export_sfc$1(_sfc_main$o, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button.vue"]]);
const buttonGroupProps = {
  size: buttonProps.size,
  type: buttonProps.type
}, __default__$1 = defineComponent({
  name: "ElButtonGroup"
}), _sfc_main$n = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: buttonGroupProps,
  setup(e) {
    const t = e;
    provide(buttonGroupContextKey, reactive({
      size: toRef(t, "size"),
      type: toRef(t, "type")
    }));
    const n = useNamespace("button");
    return (a, i) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(`${unref(n).b("group")}`)
    }, [
      renderSlot(a.$slots, "default")
    ], 2));
  }
});
var ButtonGroup = /* @__PURE__ */ _export_sfc$1(_sfc_main$n, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button-group.vue"]]);
const ElButton = withInstall(Button, {
  ButtonGroup
});
withNoopInstall(ButtonGroup);
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
const spaceItemProps = buildProps({
  prefixCls: {
    type: String
  }
}), SpaceItem = defineComponent({
  name: "ElSpaceItem",
  props: spaceItemProps,
  setup(e, { slots: t }) {
    const n = useNamespace("space"), a = computed(() => `${e.prefixCls || n.b()}__item`);
    return () => h("div", { class: a.value }, renderSlot(t, "default"));
  }
}), SIZE_MAP = {
  small: 8,
  default: 12,
  large: 16
};
function useSpace(e) {
  const t = useNamespace("space"), n = computed(() => [t.b(), t.m(e.direction), e.class]), a = ref(0), i = ref(0), s = computed(() => {
    const f = e.wrap || e.fill ? { flexWrap: "wrap", marginBottom: `-${i.value}px` } : {}, p = {
      alignItems: e.alignment
    };
    return [f, p, e.style];
  }), u = computed(() => {
    const f = {
      paddingBottom: `${i.value}px`,
      marginRight: `${a.value}px`
    }, p = e.fill ? { flexGrow: 1, minWidth: `${e.fillRatio}%` } : {};
    return [f, p];
  });
  return watchEffect(() => {
    const { size: f = "small", wrap: p, direction: m, fill: b } = e;
    if (isArray$3(f)) {
      const [_ = 0, E = 0] = f;
      a.value = _, i.value = E;
    } else {
      let _;
      isNumber$1(f) ? _ = f : _ = SIZE_MAP[f || "small"] || SIZE_MAP.small, (p || b) && m === "horizontal" ? a.value = i.value = _ : m === "horizontal" ? (a.value = _, i.value = 0) : (i.value = _, a.value = 0);
    }
  }), {
    classes: n,
    containerStyle: s,
    itemStyle: u
  };
}
const spaceProps = buildProps({
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  class: {
    type: definePropType([
      String,
      Object,
      Array
    ]),
    default: ""
  },
  style: {
    type: definePropType([String, Array, Object]),
    default: ""
  },
  alignment: {
    type: definePropType(String),
    default: "center"
  },
  prefixCls: {
    type: String
  },
  spacer: {
    type: definePropType([Object, String, Number, Array]),
    default: null,
    validator: (e) => isVNode(e) || isNumber$1(e) || isString$1(e)
  },
  wrap: Boolean,
  fill: Boolean,
  fillRatio: {
    type: Number,
    default: 100
  },
  size: {
    type: [String, Array, Number],
    values: componentSizes,
    validator: (e) => isNumber$1(e) || isArray$3(e) && e.length === 2 && e.every(isNumber$1)
  }
}), Space = defineComponent({
  name: "ElSpace",
  props: spaceProps,
  setup(e, { slots: t }) {
    const { classes: n, containerStyle: a, itemStyle: i } = useSpace(e);
    function s(u, f = "", p = []) {
      const { prefixCls: m } = e;
      return u.forEach((b, _) => {
        isFragment(b) ? isArray$3(b.children) && b.children.forEach((E, w) => {
          isFragment(E) && isArray$3(E.children) ? s(E.children, `${f + w}-`, p) : p.push(createVNode(SpaceItem, {
            style: i.value,
            prefixCls: m,
            key: `nested-${f + w}`
          }, {
            default: () => [E]
          }, PatchFlags.PROPS | PatchFlags.STYLE, ["style", "prefixCls"]));
        }) : isValidElementNode(b) && p.push(createVNode(SpaceItem, {
          style: i.value,
          prefixCls: m,
          key: `LoopKey${f + _}`
        }, {
          default: () => [b]
        }, PatchFlags.PROPS | PatchFlags.STYLE, ["style", "prefixCls"]));
      }), p;
    }
    return () => {
      var u;
      const { spacer: f, direction: p } = e, m = renderSlot(t, "default", { key: 0 }, () => []);
      if (((u = m.children) != null ? u : []).length === 0)
        return null;
      if (isArray$3(m.children)) {
        let b = s(m.children);
        if (f) {
          const _ = b.length - 1;
          b = b.reduce((E, w, A) => {
            const T = [...E, w];
            return A !== _ && T.push(createVNode("span", {
              style: [
                i.value,
                p === "vertical" ? "width: 100%" : null
              ],
              key: A
            }, [
              isVNode(f) ? f : createTextVNode(f, PatchFlags.TEXT)
            ], PatchFlags.STYLE)), T;
          }, []);
        }
        return createVNode("div", {
          class: n.value,
          style: a.value
        }, b, PatchFlags.STYLE | PatchFlags.CLASS);
      }
      return m.children;
    };
  }
}), ElSpace = withInstall(Space);
function createLoadingComponent(e) {
  let t;
  const n = ref(!1), a = reactive({
    ...e,
    originalPosition: "",
    originalOverflow: "",
    visible: !1
  });
  function i(E) {
    a.text = E;
  }
  function s() {
    const E = a.parent, w = _.ns;
    if (!E.vLoadingAddClassList) {
      let A = E.getAttribute("loading-number");
      A = Number.parseInt(A) - 1, A ? E.setAttribute("loading-number", A.toString()) : (removeClass(E, w.bm("parent", "relative")), E.removeAttribute("loading-number")), removeClass(E, w.bm("parent", "hidden"));
    }
    u(), b.unmount();
  }
  function u() {
    var E, w;
    (w = (E = _.$el) == null ? void 0 : E.parentNode) == null || w.removeChild(_.$el);
  }
  function f() {
    var E;
    e.beforeClose && !e.beforeClose() || (n.value = !0, clearTimeout(t), t = window.setTimeout(p, 400), a.visible = !1, (E = e.closed) == null || E.call(e));
  }
  function p() {
    if (!n.value)
      return;
    const E = a.parent;
    n.value = !1, E.vLoadingAddClassList = void 0, s();
  }
  const m = defineComponent({
    name: "ElLoading",
    setup(E, { expose: w }) {
      const { ns: A, zIndex: T } = useGlobalComponentSettings("loading");
      return w({
        ns: A,
        zIndex: T
      }), () => {
        const O = a.spinner || a.svg, I = h("svg", {
          class: "circular",
          viewBox: a.svgViewBox ? a.svgViewBox : "0 0 50 50",
          ...O ? { innerHTML: O } : {}
        }, [
          h("circle", {
            class: "path",
            cx: "25",
            cy: "25",
            r: "20",
            fill: "none"
          })
        ]), H = a.text ? h("p", { class: A.b("text") }, [a.text]) : void 0;
        return h(Transition, {
          name: A.b("fade"),
          onAfterLeave: p
        }, {
          default: withCtx(() => [
            withDirectives(createVNode("div", {
              style: {
                backgroundColor: a.background || ""
              },
              class: [
                A.b("mask"),
                a.customClass,
                a.fullscreen ? "is-fullscreen" : ""
              ]
            }, [
              h("div", {
                class: A.b("spinner")
              }, [I, H])
            ]), [[vShow, a.visible]])
          ])
        });
      };
    }
  }), b = createApp(m), _ = b.mount(document.createElement("div"));
  return {
    ...toRefs(a),
    setText: i,
    removeElLoadingChild: u,
    close: f,
    handleAfterLeave: p,
    vm: _,
    get $el() {
      return _.$el;
    }
  };
}
let fullscreenInstance;
const Loading = function(e = {}) {
  if (!isClient)
    return;
  const t = resolveOptions(e);
  if (t.fullscreen && fullscreenInstance)
    return fullscreenInstance;
  const n = createLoadingComponent({
    ...t,
    closed: () => {
      var i;
      (i = t.closed) == null || i.call(t), t.fullscreen && (fullscreenInstance = void 0);
    }
  });
  addStyle(t, t.parent, n), addClassList(t, t.parent, n), t.parent.vLoadingAddClassList = () => addClassList(t, t.parent, n);
  let a = t.parent.getAttribute("loading-number");
  return a ? a = `${Number.parseInt(a) + 1}` : a = "1", t.parent.setAttribute("loading-number", a), t.parent.appendChild(n.$el), nextTick(() => n.visible.value = t.visible), t.fullscreen && (fullscreenInstance = n), n;
}, resolveOptions = (e) => {
  var t, n, a, i;
  let s;
  return isString$1(e.target) ? s = (t = document.querySelector(e.target)) != null ? t : document.body : s = e.target || document.body, {
    parent: s === document.body || e.body ? document.body : s,
    background: e.background || "",
    svg: e.svg || "",
    svgViewBox: e.svgViewBox || "",
    spinner: e.spinner || !1,
    text: e.text || "",
    fullscreen: s === document.body && ((n = e.fullscreen) != null ? n : !0),
    lock: (a = e.lock) != null ? a : !1,
    customClass: e.customClass || "",
    visible: (i = e.visible) != null ? i : !0,
    target: s
  };
}, addStyle = async (e, t, n) => {
  const { nextZIndex: a } = n.vm.zIndex || n.vm._.exposed.zIndex, i = {};
  if (e.fullscreen)
    n.originalPosition.value = getStyle(document.body, "position"), n.originalOverflow.value = getStyle(document.body, "overflow"), i.zIndex = a();
  else if (e.parent === document.body) {
    n.originalPosition.value = getStyle(document.body, "position"), await nextTick();
    for (const s of ["top", "left"]) {
      const u = s === "top" ? "scrollTop" : "scrollLeft";
      i[s] = `${e.target.getBoundingClientRect()[s] + document.body[u] + document.documentElement[u] - Number.parseInt(getStyle(document.body, `margin-${s}`), 10)}px`;
    }
    for (const s of ["height", "width"])
      i[s] = `${e.target.getBoundingClientRect()[s]}px`;
  } else
    n.originalPosition.value = getStyle(t, "position");
  for (const [s, u] of Object.entries(i))
    n.$el.style[s] = u;
}, addClassList = (e, t, n) => {
  const a = n.vm.ns || n.vm._.exposed.ns;
  ["absolute", "fixed", "sticky"].includes(n.originalPosition.value) ? removeClass(t, a.bm("parent", "relative")) : addClass(t, a.bm("parent", "relative")), e.fullscreen && e.lock ? addClass(t, a.bm("parent", "hidden")) : removeClass(t, a.bm("parent", "hidden"));
}, INSTANCE_KEY = Symbol("ElLoading"), createInstance$1 = (e, t) => {
  var n, a, i, s;
  const u = t.instance, f = (E) => isObject$2(t.value) ? t.value[E] : void 0, p = (E) => {
    const w = isString$1(E) && (u == null ? void 0 : u[E]) || E;
    return w && ref(w);
  }, m = (E) => p(f(E) || e.getAttribute(`element-loading-${hyphenate(E)}`)), b = (n = f("fullscreen")) != null ? n : t.modifiers.fullscreen, _ = {
    text: m("text"),
    svg: m("svg"),
    svgViewBox: m("svgViewBox"),
    spinner: m("spinner"),
    background: m("background"),
    customClass: m("customClass"),
    fullscreen: b,
    target: (a = f("target")) != null ? a : b ? void 0 : e,
    body: (i = f("body")) != null ? i : t.modifiers.body,
    lock: (s = f("lock")) != null ? s : t.modifiers.lock
  };
  e[INSTANCE_KEY] = {
    options: _,
    instance: Loading(_)
  };
}, updateOptions = (e, t) => {
  for (const n of Object.keys(t))
    isRef(t[n]) && (t[n].value = e[n]);
}, vLoading = {
  mounted(e, t) {
    t.value && createInstance$1(e, t);
  },
  updated(e, t) {
    const n = e[INSTANCE_KEY];
    t.oldValue !== t.value && (t.value && !t.oldValue ? createInstance$1(e, t) : t.value && t.oldValue ? isObject$2(t.value) && updateOptions(t.value, n.options) : n == null || n.instance.close());
  },
  unmounted(e) {
    var t;
    (t = e[INSTANCE_KEY]) == null || t.instance.close();
  }
}, ElLoading = {
  install(e) {
    e.directive("loading", vLoading), e.config.globalProperties.$loading = Loading;
  },
  directive: vLoading,
  service: Loading
}, messageTypes = ["success", "info", "warning", "error"], messageDefaults = mutable({
  customClass: "",
  center: !1,
  dangerouslyUseHTMLString: !1,
  duration: 3e3,
  icon: void 0,
  id: "",
  message: "",
  onClose: void 0,
  showClose: !1,
  type: "info",
  offset: 16,
  zIndex: 0,
  grouping: !1,
  repeatNum: 1,
  appendTo: isClient ? document.body : void 0
}), messageProps = buildProps({
  customClass: {
    type: String,
    default: messageDefaults.customClass
  },
  center: {
    type: Boolean,
    default: messageDefaults.center
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString
  },
  duration: {
    type: Number,
    default: messageDefaults.duration
  },
  icon: {
    type: iconPropType,
    default: messageDefaults.icon
  },
  id: {
    type: String,
    default: messageDefaults.id
  },
  message: {
    type: definePropType([
      String,
      Object,
      Function
    ]),
    default: messageDefaults.message
  },
  onClose: {
    type: definePropType(Function),
    required: !1
  },
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose
  },
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type
  },
  offset: {
    type: Number,
    default: messageDefaults.offset
  },
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex
  },
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping
  },
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum
  }
}), messageEmits = {
  destroy: () => !0
}, instances = shallowReactive([]), getInstance = (e) => {
  const t = instances.findIndex((i) => i.id === e), n = instances[t];
  let a;
  return t > 0 && (a = instances[t - 1]), { current: n, prev: a };
}, getLastOffset = (e) => {
  const { prev: t } = getInstance(e);
  return t ? t.vm.exposed.bottom.value : 0;
}, getOffsetOrSpace = (e, t) => instances.findIndex((a) => a.id === e) > 0 ? 20 : t, _hoisted_1$7 = ["id"], _hoisted_2$4 = ["innerHTML"], __default__ = defineComponent({
  name: "ElMessage"
}), _sfc_main$m = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: messageProps,
  emits: messageEmits,
  setup(e, { expose: t }) {
    const n = e, { Close: a } = TypeComponents, { ns: i, zIndex: s } = useGlobalComponentSettings("message"), { currentZIndex: u, nextZIndex: f } = s, p = ref(), m = ref(!1), b = ref(0);
    let _;
    const E = computed(() => n.type ? n.type === "error" ? "danger" : n.type : "info"), w = computed(() => {
      const J = n.type;
      return { [i.bm("icon", J)]: J && TypeComponentsMap[J] };
    }), A = computed(() => n.icon || TypeComponentsMap[n.type] || ""), T = computed(() => getLastOffset(n.id)), O = computed(() => getOffsetOrSpace(n.id, n.offset) + T.value), I = computed(() => b.value + O.value), H = computed(() => ({
      top: `${O.value}px`,
      zIndex: u.value
    }));
    function L() {
      n.duration !== 0 && ({ stop: _ } = useTimeoutFn(() => {
        G();
      }, n.duration));
    }
    function z() {
      _ == null || _();
    }
    function G() {
      m.value = !1;
    }
    function Z({ code: J }) {
      J === EVENT_CODE.esc && G();
    }
    return onMounted(() => {
      L(), f(), m.value = !0;
    }), watch(() => n.repeatNum, () => {
      z(), L();
    }), useEventListener(document, "keydown", Z), useResizeObserver(p, () => {
      b.value = p.value.getBoundingClientRect().height;
    }), t({
      visible: m,
      bottom: I,
      close: G
    }), (J, x) => (openBlock(), createBlock(Transition, {
      name: unref(i).b("fade"),
      onBeforeLeave: J.onClose,
      onAfterLeave: x[0] || (x[0] = (q) => J.$emit("destroy")),
      persisted: ""
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", {
          id: J.id,
          ref_key: "messageRef",
          ref: p,
          class: normalizeClass([
            unref(i).b(),
            { [unref(i).m(J.type)]: J.type && !J.icon },
            unref(i).is("center", J.center),
            unref(i).is("closable", J.showClose),
            J.customClass
          ]),
          style: normalizeStyle(unref(H)),
          role: "alert",
          onMouseenter: z,
          onMouseleave: L
        }, [
          J.repeatNum > 1 ? (openBlock(), createBlock(unref(ElBadge), {
            key: 0,
            value: J.repeatNum,
            type: unref(E),
            class: normalizeClass(unref(i).e("badge"))
          }, null, 8, ["value", "type", "class"])) : createCommentVNode("v-if", !0),
          unref(A) ? (openBlock(), createBlock(unref(ElIcon), {
            key: 1,
            class: normalizeClass([unref(i).e("icon"), unref(w)])
          }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(unref(A))))
            ]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("v-if", !0),
          renderSlot(J.$slots, "default", {}, () => [
            J.dangerouslyUseHTMLString ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
              createElementVNode("p", {
                class: normalizeClass(unref(i).e("content")),
                innerHTML: J.message
              }, null, 10, _hoisted_2$4)
            ], 2112)) : (openBlock(), createElementBlock("p", {
              key: 0,
              class: normalizeClass(unref(i).e("content"))
            }, toDisplayString(J.message), 3))
          ]),
          J.showClose ? (openBlock(), createBlock(unref(ElIcon), {
            key: 2,
            class: normalizeClass(unref(i).e("closeBtn")),
            onClick: withModifiers(G, ["stop"])
          }, {
            default: withCtx(() => [
              createVNode(unref(a))
            ]),
            _: 1
          }, 8, ["class", "onClick"])) : createCommentVNode("v-if", !0)
        ], 46, _hoisted_1$7), [
          [vShow, m.value]
        ])
      ]),
      _: 3
    }, 8, ["name", "onBeforeLeave"]));
  }
});
var MessageConstructor = /* @__PURE__ */ _export_sfc$1(_sfc_main$m, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/message/src/message.vue"]]);
let seed = 1;
const normalizeOptions = (e) => {
  const t = !e || isString$1(e) || isVNode(e) || isFunction$2(e) ? { message: e } : e, n = {
    ...messageDefaults,
    ...t
  };
  if (!n.appendTo)
    n.appendTo = document.body;
  else if (isString$1(n.appendTo)) {
    let a = document.querySelector(n.appendTo);
    isElement(a) || (debugWarn("ElMessage", "the appendTo option is not an HTMLElement. Falling back to document.body."), a = document.body), n.appendTo = a;
  }
  return n;
}, closeMessage = (e) => {
  const t = instances.indexOf(e);
  if (t === -1)
    return;
  instances.splice(t, 1);
  const { handler: n } = e;
  n.close();
}, createMessage = ({ appendTo: e, ...t }, n) => {
  const a = `message_${seed++}`, i = t.onClose, s = document.createElement("div"), u = {
    ...t,
    id: a,
    onClose: () => {
      i == null || i(), closeMessage(b);
    },
    onDestroy: () => {
      render(null, s);
    }
  }, f = createVNode(MessageConstructor, u, isFunction$2(u.message) || isVNode(u.message) ? {
    default: isFunction$2(u.message) ? u.message : () => u.message
  } : null);
  f.appContext = n || message._context, render(f, s), e.appendChild(s.firstElementChild);
  const p = f.component, b = {
    id: a,
    vnode: f,
    vm: p,
    handler: {
      close: () => {
        p.exposed.visible.value = !1;
      }
    },
    props: f.component.props
  };
  return b;
}, message = (e = {}, t) => {
  if (!isClient)
    return { close: () => {
    } };
  if (isNumber$1(messageConfig.max) && instances.length >= messageConfig.max)
    return { close: () => {
    } };
  const n = normalizeOptions(e);
  if (n.grouping && instances.length) {
    const i = instances.find(({ vnode: s }) => {
      var u;
      return ((u = s.props) == null ? void 0 : u.message) === n.message;
    });
    if (i)
      return i.props.repeatNum += 1, i.props.type = n.type, i.handler;
  }
  const a = createMessage(n, t);
  return instances.push(a), a.handler;
};
messageTypes.forEach((e) => {
  message[e] = (t = {}, n) => {
    const a = normalizeOptions(t);
    return message({ ...a, type: e }, n);
  };
});
function closeAll(e) {
  for (const t of instances)
    (!e || e === t.props.type) && t.handler.close();
}
message.closeAll = closeAll;
message._context = null;
const ElMessage = withInstallFunction(message, "$message");
function bind(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString } = Object.prototype, { getPrototypeOf } = Object, kindOf = ((e) => (t) => {
  const n = toString.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), kindOfTest = (e) => (e = e.toLowerCase(), (t) => kindOf(t) === e), typeOfTest = (e) => (t) => typeof t === e, { isArray } = Array, isUndefined = typeOfTest("undefined");
function isBuffer(e) {
  return e !== null && !isUndefined(e) && e.constructor !== null && !isUndefined(e.constructor) && isFunction(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && isArrayBuffer(e.buffer), t;
}
const isString = typeOfTest("string"), isFunction = typeOfTest("function"), isNumber = typeOfTest("number"), isObject = (e) => e !== null && typeof e == "object", isBoolean = (e) => e === !0 || e === !1, isPlainObject = (e) => {
  if (kindOf(e) !== "object")
    return !1;
  const t = getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, isDate = kindOfTest("Date"), isFile = kindOfTest("File"), isBlob = kindOfTest("Blob"), isFileList = kindOfTest("FileList"), isStream = (e) => isObject(e) && isFunction(e.pipe), isFormData = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || isFunction(e.append) && ((t = kindOf(e)) === "formdata" || // detect form-data instance
  t === "object" && isFunction(e.toString) && e.toString() === "[object FormData]"));
}, isURLSearchParams = kindOfTest("URLSearchParams"), trim = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let a, i;
  if (typeof e != "object" && (e = [e]), isArray(e))
    for (a = 0, i = e.length; a < i; a++)
      t.call(null, e[a], a, e);
  else {
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e), u = s.length;
    let f;
    for (a = 0; a < u; a++)
      f = s[a], t.call(null, e[f], f, e);
  }
}
function findKey(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let a = n.length, i;
  for (; a-- > 0; )
    if (i = n[a], t === i.toLowerCase())
      return i;
  return null;
}
const _global = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), isContextDefined = (e) => !isUndefined(e) && e !== _global;
function merge() {
  const { caseless: e } = isContextDefined(this) && this || {}, t = {}, n = (a, i) => {
    const s = e && findKey(t, i) || i;
    isPlainObject(t[s]) && isPlainObject(a) ? t[s] = merge(t[s], a) : isPlainObject(a) ? t[s] = merge({}, a) : isArray(a) ? t[s] = a.slice() : t[s] = a;
  };
  for (let a = 0, i = arguments.length; a < i; a++)
    arguments[a] && forEach(arguments[a], n);
  return t;
}
const extend$1 = (e, t, n, { allOwnKeys: a } = {}) => (forEach(t, (i, s) => {
  n && isFunction(i) ? e[s] = bind(i, n) : e[s] = i;
}, { allOwnKeys: a }), e), stripBOM = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), inherits = (e, t, n, a) => {
  e.prototype = Object.create(t.prototype, a), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, toFlatObject = (e, t, n, a) => {
  let i, s, u;
  const f = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (i = Object.getOwnPropertyNames(e), s = i.length; s-- > 0; )
      u = i[s], (!a || a(u, e, t)) && !f[u] && (t[u] = e[u], f[u] = !0);
    e = n !== !1 && getPrototypeOf(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, endsWith = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const a = e.indexOf(t, n);
  return a !== -1 && a === n;
}, toArray = (e) => {
  if (!e)
    return null;
  if (isArray(e))
    return e;
  let t = e.length;
  if (!isNumber(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, isTypedArray = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && getPrototypeOf(Uint8Array)), forEachEntry = (e, t) => {
  const a = (e && e[Symbol.iterator]).call(e);
  let i;
  for (; (i = a.next()) && !i.done; ) {
    const s = i.value;
    t.call(e, s[0], s[1]);
  }
}, matchAll = (e, t) => {
  let n;
  const a = [];
  for (; (n = e.exec(t)) !== null; )
    a.push(n);
  return a;
}, isHTMLForm = kindOfTest("HTMLFormElement"), toCamelCase = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, a, i) {
    return a.toUpperCase() + i;
  }
), hasOwnProperty = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), isRegExp = kindOfTest("RegExp"), reduceDescriptors = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), a = {};
  forEach(n, (i, s) => {
    t(i, s, e) !== !1 && (a[s] = i);
  }), Object.defineProperties(e, a);
}, freezeMethods = (e) => {
  reduceDescriptors(e, (t, n) => {
    if (isFunction(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const a = e[n];
    if (isFunction(a)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, toObjectSet = (e, t) => {
  const n = {}, a = (i) => {
    i.forEach((s) => {
      n[s] = !0;
    });
  };
  return isArray(e) ? a(e) : a(String(e).split(t)), n;
}, noop = () => {
}, toFiniteNumber = (e, t) => (e = +e, Number.isFinite(e) ? e : t), ALPHA = "abcdefghijklmnopqrstuvwxyz", DIGIT = "0123456789", ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
}, generateString = (e = 16, t = ALPHABET.ALPHA_DIGIT) => {
  let n = "";
  const { length: a } = t;
  for (; e--; )
    n += t[Math.random() * a | 0];
  return n;
};
function isSpecCompliantForm(e) {
  return !!(e && isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const toJSONObject = (e) => {
  const t = new Array(10), n = (a, i) => {
    if (isObject(a)) {
      if (t.indexOf(a) >= 0)
        return;
      if (!("toJSON" in a)) {
        t[i] = a;
        const s = isArray(a) ? [] : {};
        return forEach(a, (u, f) => {
          const p = n(u, i + 1);
          !isUndefined(p) && (s[f] = p);
        }), t[i] = void 0, s;
      }
    }
    return a;
  };
  return n(e, 0);
}, isAsyncFn = kindOfTest("AsyncFunction"), isThenable = (e) => e && (isObject(e) || isFunction(e)) && isFunction(e.then) && isFunction(e.catch), utils = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend: extend$1,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
};
function AxiosError(e, t, n, a, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), a && (this.request = a), i && (this.response = i);
}
utils.inherits(AxiosError, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const prototype$1 = AxiosError.prototype, descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  descriptors[e] = { value: e };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: !0 });
AxiosError.from = (e, t, n, a, i, s) => {
  const u = Object.create(prototype$1);
  return utils.toFlatObject(e, u, function(p) {
    return p !== Error.prototype;
  }, (f) => f !== "isAxiosError"), AxiosError.call(u, e.message, t, n, a, i), u.cause = e, u.name = e.name, s && Object.assign(u, s), u;
};
const httpAdapter = null;
function isVisitable(e) {
  return utils.isPlainObject(e) || utils.isArray(e);
}
function removeBrackets(e) {
  return utils.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function renderKey(e, t, n) {
  return e ? e.concat(t).map(function(i, s) {
    return i = removeBrackets(i), !n && s ? "[" + i + "]" : i;
  }).join(n ? "." : "") : t;
}
function isFlatArray(e) {
  return utils.isArray(e) && !e.some(isVisitable);
}
const predicates = utils.toFlatObject(utils, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function toFormData(e, t, n) {
  if (!utils.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = utils.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(T, O) {
    return !utils.isUndefined(O[T]);
  });
  const a = n.metaTokens, i = n.visitor || b, s = n.dots, u = n.indexes, p = (n.Blob || typeof Blob < "u" && Blob) && utils.isSpecCompliantForm(t);
  if (!utils.isFunction(i))
    throw new TypeError("visitor must be a function");
  function m(A) {
    if (A === null)
      return "";
    if (utils.isDate(A))
      return A.toISOString();
    if (!p && utils.isBlob(A))
      throw new AxiosError("Blob is not supported. Use a Buffer instead.");
    return utils.isArrayBuffer(A) || utils.isTypedArray(A) ? p && typeof Blob == "function" ? new Blob([A]) : Buffer.from(A) : A;
  }
  function b(A, T, O) {
    let I = A;
    if (A && !O && typeof A == "object") {
      if (utils.endsWith(T, "{}"))
        T = a ? T : T.slice(0, -2), A = JSON.stringify(A);
      else if (utils.isArray(A) && isFlatArray(A) || (utils.isFileList(A) || utils.endsWith(T, "[]")) && (I = utils.toArray(A)))
        return T = removeBrackets(T), I.forEach(function(L, z) {
          !(utils.isUndefined(L) || L === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            u === !0 ? renderKey([T], z, s) : u === null ? T : T + "[]",
            m(L)
          );
        }), !1;
    }
    return isVisitable(A) ? !0 : (t.append(renderKey(O, T, s), m(A)), !1);
  }
  const _ = [], E = Object.assign(predicates, {
    defaultVisitor: b,
    convertValue: m,
    isVisitable
  });
  function w(A, T) {
    if (!utils.isUndefined(A)) {
      if (_.indexOf(A) !== -1)
        throw Error("Circular reference detected in " + T.join("."));
      _.push(A), utils.forEach(A, function(I, H) {
        (!(utils.isUndefined(I) || I === null) && i.call(
          t,
          I,
          utils.isString(H) ? H.trim() : H,
          T,
          E
        )) === !0 && w(I, T ? T.concat(H) : [H]);
      }), _.pop();
    }
  }
  if (!utils.isObject(e))
    throw new TypeError("data must be an object");
  return w(e), t;
}
function encode$1(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(a) {
    return t[a];
  });
}
function AxiosURLSearchParams(e, t) {
  this._pairs = [], e && toFormData(e, this, t);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function(t, n) {
  this._pairs.push([t, n]);
};
prototype.toString = function(t) {
  const n = t ? function(a) {
    return t.call(this, a, encode$1);
  } : encode$1;
  return this._pairs.map(function(i) {
    return n(i[0]) + "=" + n(i[1]);
  }, "").join("&");
};
function encode(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(e, t, n) {
  if (!t)
    return e;
  const a = n && n.encode || encode, i = n && n.serialize;
  let s;
  if (i ? s = i(t, n) : s = utils.isURLSearchParams(t) ? t.toString() : new AxiosURLSearchParams(t, n).toString(a), s) {
    const u = e.indexOf("#");
    u !== -1 && (e = e.slice(0, u)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, a) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: a ? a.synchronous : !1,
      runWhen: a ? a.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    utils.forEach(this.handlers, function(a) {
      a !== null && t(a);
    });
  }
}
const InterceptorManager$1 = InterceptorManager, transitionalDefaults = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, URLSearchParams$1 = typeof URLSearchParams < "u" ? URLSearchParams : AxiosURLSearchParams, FormData$1 = typeof FormData < "u" ? FormData : null, Blob$1 = typeof Blob < "u" ? Blob : null, isStandardBrowserEnv = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), isStandardBrowserWebWorkerEnv = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), platform = {
  isBrowser: !0,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function toURLEncodedForm(e, t) {
  return toFormData(e, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(n, a, i, s) {
      return platform.isNode && utils.isBuffer(n) ? (this.append(a, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function parsePropPath(e) {
  return utils.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function arrayToObject(e) {
  const t = {}, n = Object.keys(e);
  let a;
  const i = n.length;
  let s;
  for (a = 0; a < i; a++)
    s = n[a], t[s] = e[s];
  return t;
}
function formDataToJSON(e) {
  function t(n, a, i, s) {
    let u = n[s++];
    const f = Number.isFinite(+u), p = s >= n.length;
    return u = !u && utils.isArray(i) ? i.length : u, p ? (utils.hasOwnProp(i, u) ? i[u] = [i[u], a] : i[u] = a, !f) : ((!i[u] || !utils.isObject(i[u])) && (i[u] = []), t(n, a, i[u], s) && utils.isArray(i[u]) && (i[u] = arrayToObject(i[u])), !f);
  }
  if (utils.isFormData(e) && utils.isFunction(e.entries)) {
    const n = {};
    return utils.forEachEntry(e, (a, i) => {
      t(parsePropPath(a), i, n, 0);
    }), n;
  }
  return null;
}
const DEFAULT_CONTENT_TYPE = {
  "Content-Type": void 0
};
function stringifySafely(e, t, n) {
  if (utils.isString(e))
    try {
      return (t || JSON.parse)(e), utils.trim(e);
    } catch (a) {
      if (a.name !== "SyntaxError")
        throw a;
    }
  return (n || JSON.stringify)(e);
}
const defaults$1 = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, n) {
    const a = n.getContentType() || "", i = a.indexOf("application/json") > -1, s = utils.isObject(t);
    if (s && utils.isHTMLForm(t) && (t = new FormData(t)), utils.isFormData(t))
      return i && i ? JSON.stringify(formDataToJSON(t)) : t;
    if (utils.isArrayBuffer(t) || utils.isBuffer(t) || utils.isStream(t) || utils.isFile(t) || utils.isBlob(t))
      return t;
    if (utils.isArrayBufferView(t))
      return t.buffer;
    if (utils.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let f;
    if (s) {
      if (a.indexOf("application/x-www-form-urlencoded") > -1)
        return toURLEncodedForm(t, this.formSerializer).toString();
      if ((f = utils.isFileList(t)) || a.indexOf("multipart/form-data") > -1) {
        const p = this.env && this.env.FormData;
        return toFormData(
          f ? { "files[]": t } : t,
          p && new p(),
          this.formSerializer
        );
      }
    }
    return s || i ? (n.setContentType("application/json", !1), stringifySafely(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || defaults$1.transitional, a = n && n.forcedJSONParsing, i = this.responseType === "json";
    if (t && utils.isString(t) && (a && !this.responseType || i)) {
      const u = !(n && n.silentJSONParsing) && i;
      try {
        return JSON.parse(t);
      } catch (f) {
        if (u)
          throw f.name === "SyntaxError" ? AxiosError.from(f, AxiosError.ERR_BAD_RESPONSE, this, null, this.response) : f;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
utils.forEach(["delete", "get", "head"], function(t) {
  defaults$1.headers[t] = {};
});
utils.forEach(["post", "put", "patch"], function(t) {
  defaults$1.headers[t] = utils.merge(DEFAULT_CONTENT_TYPE);
});
const defaults$2 = defaults$1, ignoreDuplicateOf = utils.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), parseHeaders = (e) => {
  const t = {};
  let n, a, i;
  return e && e.split(`
`).forEach(function(u) {
    i = u.indexOf(":"), n = u.substring(0, i).trim().toLowerCase(), a = u.substring(i + 1).trim(), !(!n || t[n] && ignoreDuplicateOf[n]) && (n === "set-cookie" ? t[n] ? t[n].push(a) : t[n] = [a] : t[n] = t[n] ? t[n] + ", " + a : a);
  }), t;
}, $internals = Symbol("internals");
function normalizeHeader(e) {
  return e && String(e).trim().toLowerCase();
}
function normalizeValue(e) {
  return e === !1 || e == null ? e : utils.isArray(e) ? e.map(normalizeValue) : String(e);
}
function parseTokens(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let a;
  for (; a = n.exec(e); )
    t[a[1]] = a[2];
  return t;
}
const isValidHeaderName = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function matchHeaderValue(e, t, n, a, i) {
  if (utils.isFunction(a))
    return a.call(this, t, n);
  if (i && (t = n), !!utils.isString(t)) {
    if (utils.isString(a))
      return t.indexOf(a) !== -1;
    if (utils.isRegExp(a))
      return a.test(t);
  }
}
function formatHeader(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, a) => n.toUpperCase() + a);
}
function buildAccessors(e, t) {
  const n = utils.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((a) => {
    Object.defineProperty(e, a + n, {
      value: function(i, s, u) {
        return this[a].call(this, t, i, s, u);
      },
      configurable: !0
    });
  });
}
class AxiosHeaders {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, a) {
    const i = this;
    function s(f, p, m) {
      const b = normalizeHeader(p);
      if (!b)
        throw new Error("header name must be a non-empty string");
      const _ = utils.findKey(i, b);
      (!_ || i[_] === void 0 || m === !0 || m === void 0 && i[_] !== !1) && (i[_ || p] = normalizeValue(f));
    }
    const u = (f, p) => utils.forEach(f, (m, b) => s(m, b, p));
    return utils.isPlainObject(t) || t instanceof this.constructor ? u(t, n) : utils.isString(t) && (t = t.trim()) && !isValidHeaderName(t) ? u(parseHeaders(t), n) : t != null && s(n, t, a), this;
  }
  get(t, n) {
    if (t = normalizeHeader(t), t) {
      const a = utils.findKey(this, t);
      if (a) {
        const i = this[a];
        if (!n)
          return i;
        if (n === !0)
          return parseTokens(i);
        if (utils.isFunction(n))
          return n.call(this, i, a);
        if (utils.isRegExp(n))
          return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = normalizeHeader(t), t) {
      const a = utils.findKey(this, t);
      return !!(a && this[a] !== void 0 && (!n || matchHeaderValue(this, this[a], a, n)));
    }
    return !1;
  }
  delete(t, n) {
    const a = this;
    let i = !1;
    function s(u) {
      if (u = normalizeHeader(u), u) {
        const f = utils.findKey(a, u);
        f && (!n || matchHeaderValue(a, a[f], f, n)) && (delete a[f], i = !0);
      }
    }
    return utils.isArray(t) ? t.forEach(s) : s(t), i;
  }
  clear(t) {
    const n = Object.keys(this);
    let a = n.length, i = !1;
    for (; a--; ) {
      const s = n[a];
      (!t || matchHeaderValue(this, this[s], s, t, !0)) && (delete this[s], i = !0);
    }
    return i;
  }
  normalize(t) {
    const n = this, a = {};
    return utils.forEach(this, (i, s) => {
      const u = utils.findKey(a, s);
      if (u) {
        n[u] = normalizeValue(i), delete n[s];
        return;
      }
      const f = t ? formatHeader(s) : String(s).trim();
      f !== s && delete n[s], n[f] = normalizeValue(i), a[f] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return utils.forEach(this, (a, i) => {
      a != null && a !== !1 && (n[i] = t && utils.isArray(a) ? a.join(", ") : a);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const a = new this(t);
    return n.forEach((i) => a.set(i)), a;
  }
  static accessor(t) {
    const a = (this[$internals] = this[$internals] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function s(u) {
      const f = normalizeHeader(u);
      a[f] || (buildAccessors(i, u), a[f] = !0);
    }
    return utils.isArray(t) ? t.forEach(s) : s(t), this;
  }
}
AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils.freezeMethods(AxiosHeaders.prototype);
utils.freezeMethods(AxiosHeaders);
const AxiosHeaders$1 = AxiosHeaders;
function transformData(e, t) {
  const n = this || defaults$2, a = t || n, i = AxiosHeaders$1.from(a.headers);
  let s = a.data;
  return utils.forEach(e, function(f) {
    s = f.call(n, s, i.normalize(), t ? t.status : void 0);
  }), i.normalize(), s;
}
function isCancel(e) {
  return !!(e && e.__CANCEL__);
}
function CanceledError(e, t, n) {
  AxiosError.call(this, e ?? "canceled", AxiosError.ERR_CANCELED, t, n), this.name = "CanceledError";
}
utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: !0
});
function settle(e, t, n) {
  const a = n.config.validateStatus;
  !n.status || !a || a(n.status) ? e(n) : t(new AxiosError(
    "Request failed with status code " + n.status,
    [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const cookies = platform.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(n, a, i, s, u, f) {
        const p = [];
        p.push(n + "=" + encodeURIComponent(a)), utils.isNumber(i) && p.push("expires=" + new Date(i).toGMTString()), utils.isString(s) && p.push("path=" + s), utils.isString(u) && p.push("domain=" + u), f === !0 && p.push("secure"), document.cookie = p.join("; ");
      },
      read: function(n) {
        const a = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
        return a ? decodeURIComponent(a[3]) : null;
      },
      remove: function(n) {
        this.write(n, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }()
);
function isAbsoluteURL(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function combineURLs(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function buildFullPath(e, t) {
  return e && !isAbsoluteURL(t) ? combineURLs(e, t) : t;
}
const isURLSameOrigin = platform.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
    let a;
    function i(s) {
      let u = s;
      return t && (n.setAttribute("href", u), u = n.href), n.setAttribute("href", u), {
        href: n.href,
        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
        host: n.host,
        search: n.search ? n.search.replace(/^\?/, "") : "",
        hash: n.hash ? n.hash.replace(/^#/, "") : "",
        hostname: n.hostname,
        port: n.port,
        pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
      };
    }
    return a = i(window.location.href), function(u) {
      const f = utils.isString(u) ? i(u) : u;
      return f.protocol === a.protocol && f.host === a.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function() {
    return function() {
      return !0;
    };
  }()
);
function parseProtocol(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function speedometer(e, t) {
  e = e || 10;
  const n = new Array(e), a = new Array(e);
  let i = 0, s = 0, u;
  return t = t !== void 0 ? t : 1e3, function(p) {
    const m = Date.now(), b = a[s];
    u || (u = m), n[i] = p, a[i] = m;
    let _ = s, E = 0;
    for (; _ !== i; )
      E += n[_++], _ = _ % e;
    if (i = (i + 1) % e, i === s && (s = (s + 1) % e), m - u < t)
      return;
    const w = b && m - b;
    return w ? Math.round(E * 1e3 / w) : void 0;
  };
}
function progressEventReducer(e, t) {
  let n = 0;
  const a = speedometer(50, 250);
  return (i) => {
    const s = i.loaded, u = i.lengthComputable ? i.total : void 0, f = s - n, p = a(f), m = s <= u;
    n = s;
    const b = {
      loaded: s,
      total: u,
      progress: u ? s / u : void 0,
      bytes: f,
      rate: p || void 0,
      estimated: p && u && m ? (u - s) / p : void 0,
      event: i
    };
    b[t ? "download" : "upload"] = !0, e(b);
  };
}
const isXHRAdapterSupported = typeof XMLHttpRequest < "u", xhrAdapter = isXHRAdapterSupported && function(e) {
  return new Promise(function(n, a) {
    let i = e.data;
    const s = AxiosHeaders$1.from(e.headers).normalize(), u = e.responseType;
    let f;
    function p() {
      e.cancelToken && e.cancelToken.unsubscribe(f), e.signal && e.signal.removeEventListener("abort", f);
    }
    utils.isFormData(i) && (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv ? s.setContentType(!1) : s.setContentType("multipart/form-data;", !1));
    let m = new XMLHttpRequest();
    if (e.auth) {
      const w = e.auth.username || "", A = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      s.set("Authorization", "Basic " + btoa(w + ":" + A));
    }
    const b = buildFullPath(e.baseURL, e.url);
    m.open(e.method.toUpperCase(), buildURL(b, e.params, e.paramsSerializer), !0), m.timeout = e.timeout;
    function _() {
      if (!m)
        return;
      const w = AxiosHeaders$1.from(
        "getAllResponseHeaders" in m && m.getAllResponseHeaders()
      ), T = {
        data: !u || u === "text" || u === "json" ? m.responseText : m.response,
        status: m.status,
        statusText: m.statusText,
        headers: w,
        config: e,
        request: m
      };
      settle(function(I) {
        n(I), p();
      }, function(I) {
        a(I), p();
      }, T), m = null;
    }
    if ("onloadend" in m ? m.onloadend = _ : m.onreadystatechange = function() {
      !m || m.readyState !== 4 || m.status === 0 && !(m.responseURL && m.responseURL.indexOf("file:") === 0) || setTimeout(_);
    }, m.onabort = function() {
      m && (a(new AxiosError("Request aborted", AxiosError.ECONNABORTED, e, m)), m = null);
    }, m.onerror = function() {
      a(new AxiosError("Network Error", AxiosError.ERR_NETWORK, e, m)), m = null;
    }, m.ontimeout = function() {
      let A = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const T = e.transitional || transitionalDefaults;
      e.timeoutErrorMessage && (A = e.timeoutErrorMessage), a(new AxiosError(
        A,
        T.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        e,
        m
      )), m = null;
    }, platform.isStandardBrowserEnv) {
      const w = (e.withCredentials || isURLSameOrigin(b)) && e.xsrfCookieName && cookies.read(e.xsrfCookieName);
      w && s.set(e.xsrfHeaderName, w);
    }
    i === void 0 && s.setContentType(null), "setRequestHeader" in m && utils.forEach(s.toJSON(), function(A, T) {
      m.setRequestHeader(T, A);
    }), utils.isUndefined(e.withCredentials) || (m.withCredentials = !!e.withCredentials), u && u !== "json" && (m.responseType = e.responseType), typeof e.onDownloadProgress == "function" && m.addEventListener("progress", progressEventReducer(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && m.upload && m.upload.addEventListener("progress", progressEventReducer(e.onUploadProgress)), (e.cancelToken || e.signal) && (f = (w) => {
      m && (a(!w || w.type ? new CanceledError(null, e, m) : w), m.abort(), m = null);
    }, e.cancelToken && e.cancelToken.subscribe(f), e.signal && (e.signal.aborted ? f() : e.signal.addEventListener("abort", f)));
    const E = parseProtocol(b);
    if (E && platform.protocols.indexOf(E) === -1) {
      a(new AxiosError("Unsupported protocol " + E + ":", AxiosError.ERR_BAD_REQUEST, e));
      return;
    }
    m.send(i || null);
  });
}, knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};
utils.forEach(knownAdapters, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const adapters = {
  getAdapter: (e) => {
    e = utils.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, a;
    for (let i = 0; i < t && (n = e[i], !(a = utils.isString(n) ? knownAdapters[n.toLowerCase()] : n)); i++)
      ;
    if (!a)
      throw a === !1 ? new AxiosError(
        `Adapter ${n} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        utils.hasOwnProp(knownAdapters, n) ? `Adapter '${n}' is not available in the build` : `Unknown adapter '${n}'`
      );
    if (!utils.isFunction(a))
      throw new TypeError("adapter is not a function");
    return a;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new CanceledError(null, e);
}
function dispatchRequest(e) {
  return throwIfCancellationRequested(e), e.headers = AxiosHeaders$1.from(e.headers), e.data = transformData.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), adapters.getAdapter(e.adapter || defaults$2.adapter)(e).then(function(a) {
    return throwIfCancellationRequested(e), a.data = transformData.call(
      e,
      e.transformResponse,
      a
    ), a.headers = AxiosHeaders$1.from(a.headers), a;
  }, function(a) {
    return isCancel(a) || (throwIfCancellationRequested(e), a && a.response && (a.response.data = transformData.call(
      e,
      e.transformResponse,
      a.response
    ), a.response.headers = AxiosHeaders$1.from(a.response.headers))), Promise.reject(a);
  });
}
const headersToObject = (e) => e instanceof AxiosHeaders$1 ? e.toJSON() : e;
function mergeConfig(e, t) {
  t = t || {};
  const n = {};
  function a(m, b, _) {
    return utils.isPlainObject(m) && utils.isPlainObject(b) ? utils.merge.call({ caseless: _ }, m, b) : utils.isPlainObject(b) ? utils.merge({}, b) : utils.isArray(b) ? b.slice() : b;
  }
  function i(m, b, _) {
    if (utils.isUndefined(b)) {
      if (!utils.isUndefined(m))
        return a(void 0, m, _);
    } else
      return a(m, b, _);
  }
  function s(m, b) {
    if (!utils.isUndefined(b))
      return a(void 0, b);
  }
  function u(m, b) {
    if (utils.isUndefined(b)) {
      if (!utils.isUndefined(m))
        return a(void 0, m);
    } else
      return a(void 0, b);
  }
  function f(m, b, _) {
    if (_ in t)
      return a(m, b);
    if (_ in e)
      return a(void 0, m);
  }
  const p = {
    url: s,
    method: s,
    data: s,
    baseURL: u,
    transformRequest: u,
    transformResponse: u,
    paramsSerializer: u,
    timeout: u,
    timeoutMessage: u,
    withCredentials: u,
    adapter: u,
    responseType: u,
    xsrfCookieName: u,
    xsrfHeaderName: u,
    onUploadProgress: u,
    onDownloadProgress: u,
    decompress: u,
    maxContentLength: u,
    maxBodyLength: u,
    beforeRedirect: u,
    transport: u,
    httpAgent: u,
    httpsAgent: u,
    cancelToken: u,
    socketPath: u,
    responseEncoding: u,
    validateStatus: f,
    headers: (m, b) => i(headersToObject(m), headersToObject(b), !0)
  };
  return utils.forEach(Object.keys(Object.assign({}, e, t)), function(b) {
    const _ = p[b] || i, E = _(e[b], t[b], b);
    utils.isUndefined(E) && _ !== f || (n[b] = E);
  }), n;
}
const VERSION = "1.4.0", validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  validators$1[e] = function(a) {
    return typeof a === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function(t, n, a) {
  function i(s, u) {
    return "[Axios v" + VERSION + "] Transitional option '" + s + "'" + u + (a ? ". " + a : "");
  }
  return (s, u, f) => {
    if (t === !1)
      throw new AxiosError(
        i(u, " has been removed" + (n ? " in " + n : "")),
        AxiosError.ERR_DEPRECATED
      );
    return n && !deprecatedWarnings[u] && (deprecatedWarnings[u] = !0, console.warn(
      i(
        u,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(s, u, f) : !0;
  };
};
function assertOptions(e, t, n) {
  if (typeof e != "object")
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  const a = Object.keys(e);
  let i = a.length;
  for (; i-- > 0; ) {
    const s = a[i], u = t[s];
    if (u) {
      const f = e[s], p = f === void 0 || u(f, s, e);
      if (p !== !0)
        throw new AxiosError("option " + s + " must be " + p, AxiosError.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new AxiosError("Unknown option " + s, AxiosError.ERR_BAD_OPTION);
  }
}
const validator = {
  assertOptions,
  validators: validators$1
}, validators = validator.validators;
class Axios {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = mergeConfig(this.defaults, n);
    const { transitional: a, paramsSerializer: i, headers: s } = n;
    a !== void 0 && validator.assertOptions(a, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, !1), i != null && (utils.isFunction(i) ? n.paramsSerializer = {
      serialize: i
    } : validator.assertOptions(i, {
      encode: validators.function,
      serialize: validators.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let u;
    u = s && utils.merge(
      s.common,
      s[n.method]
    ), u && utils.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (A) => {
        delete s[A];
      }
    ), n.headers = AxiosHeaders$1.concat(u, s);
    const f = [];
    let p = !0;
    this.interceptors.request.forEach(function(T) {
      typeof T.runWhen == "function" && T.runWhen(n) === !1 || (p = p && T.synchronous, f.unshift(T.fulfilled, T.rejected));
    });
    const m = [];
    this.interceptors.response.forEach(function(T) {
      m.push(T.fulfilled, T.rejected);
    });
    let b, _ = 0, E;
    if (!p) {
      const A = [dispatchRequest.bind(this), void 0];
      for (A.unshift.apply(A, f), A.push.apply(A, m), E = A.length, b = Promise.resolve(n); _ < E; )
        b = b.then(A[_++], A[_++]);
      return b;
    }
    E = f.length;
    let w = n;
    for (_ = 0; _ < E; ) {
      const A = f[_++], T = f[_++];
      try {
        w = A(w);
      } catch (O) {
        T.call(this, O);
        break;
      }
    }
    try {
      b = dispatchRequest.call(this, w);
    } catch (A) {
      return Promise.reject(A);
    }
    for (_ = 0, E = m.length; _ < E; )
      b = b.then(m[_++], m[_++]);
    return b;
  }
  getUri(t) {
    t = mergeConfig(this.defaults, t);
    const n = buildFullPath(t.baseURL, t.url);
    return buildURL(n, t.params, t.paramsSerializer);
  }
}
utils.forEach(["delete", "get", "head", "options"], function(t) {
  Axios.prototype[t] = function(n, a) {
    return this.request(mergeConfig(a || {}, {
      method: t,
      url: n,
      data: (a || {}).data
    }));
  };
});
utils.forEach(["post", "put", "patch"], function(t) {
  function n(a) {
    return function(s, u, f) {
      return this.request(mergeConfig(f || {}, {
        method: t,
        headers: a ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: u
      }));
    };
  }
  Axios.prototype[t] = n(), Axios.prototype[t + "Form"] = n(!0);
});
const Axios$1 = Axios;
class CancelToken {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(s) {
      n = s;
    });
    const a = this;
    this.promise.then((i) => {
      if (!a._listeners)
        return;
      let s = a._listeners.length;
      for (; s-- > 0; )
        a._listeners[s](i);
      a._listeners = null;
    }), this.promise.then = (i) => {
      let s;
      const u = new Promise((f) => {
        a.subscribe(f), s = f;
      }).then(i);
      return u.cancel = function() {
        a.unsubscribe(s);
      }, u;
    }, t(function(s, u, f) {
      a.reason || (a.reason = new CanceledError(s, u, f), n(a.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new CancelToken(function(i) {
        t = i;
      }),
      cancel: t
    };
  }
}
const CancelToken$1 = CancelToken;
function spread(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function isAxiosError(e) {
  return utils.isObject(e) && e.isAxiosError === !0;
}
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(([e, t]) => {
  HttpStatusCode[t] = e;
});
const HttpStatusCode$1 = HttpStatusCode;
function createInstance(e) {
  const t = new Axios$1(e), n = bind(Axios$1.prototype.request, t);
  return utils.extend(n, Axios$1.prototype, t, { allOwnKeys: !0 }), utils.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(i) {
    return createInstance(mergeConfig(e, i));
  }, n;
}
const axios = createInstance(defaults$2);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;
axios.AxiosError = AxiosError;
axios.Cancel = axios.CanceledError;
axios.all = function(t) {
  return Promise.all(t);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (e) => formDataToJSON(utils.isHTMLForm(e) ? new FormData(e) : e);
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const axios$1 = axios, lessCom = {
  getCompareClass(e) {
    return !e || e === "-" ? "" : parseFloat(e) < 0 ? "txt-color-green" : "txt-color-red";
  },
  getHBResult(e, t) {
    let n = e[t], a = e.HBData[t];
    return !n || !a ? "-" : (n = n.toString().toFloat(4), a = a.toString().toFloat(4), !n || !a ? "-" : ((n - a) / a * 100).toFixed(2) + "%");
  },
  getTBResult(e, t) {
    let n = e[t], a = e.TBData[t];
    return !n || !a ? "-" : (n = n.toString().toFloat(4), a = a.toString().toFloat(4), !n || !a ? "-" : ((n - a) / a * 100).toFixed(2) + "%");
  },
  getAvgDayResult(e, t = 2, n = 1) {
    return e ? (e / n).toFixed(t) : "-";
  },
  getUrlParms(e) {
    for (var t = window.location.search.substring(1), n = t.split("&"), a = 0; a < n.length; a++) {
      var i = n[a].split("=");
      if (i[0] == e)
        return i[1];
    }
    return "";
  },
  formatDate(e, t) {
    e = new Date(e);
    let n;
    const a = {
      "Y+": e.getFullYear().toString(),
      "y+": e.getFullYear().toString(),
      // 年
      "M+": (e.getMonth() + 1).toString(),
      // 月
      "m+": e.getMinutes().toString(),
      // 分
      "D+": e.getDate().toString(),
      // 日
      "d+": e.getDate().toString(),
      // 日
      "H+": e.getHours().toString(),
      // 时
      "h+": e.getHours().toString(),
      "S+": e.getSeconds().toString(),
      // 秒
      "s+": e.getSeconds().toString()
      // 秒
    };
    for (let i in a)
      n = new RegExp("(" + i + ")").exec(t), n && (t = t.replace(n[1], n[1].length == 1 ? a[i] : a[i].padStart(n[1].length, "0")));
    return t;
  },
  parseTime(e, t = "") {
    if (arguments.length === 0)
      return null;
    const n = t || "{y}-{m}-{d} {h}:{i}:{s}";
    let a;
    typeof e == "object" ? a = e : (("" + e).length === 10 && (e = parseInt(e) * 1e3), a = new Date(e));
    const i = {
      y: a.getFullYear(),
      m: a.getMonth() + 1,
      d: a.getDate(),
      h: a.getHours(),
      i: a.getMinutes(),
      s: a.getSeconds(),
      a: a.getDay()
    };
    return n.replace(/{(y|m|d|h|i|s|a)+}/g, (u, f) => {
      let p = i[f];
      return f === "a" ? ["一", "二", "三", "四", "五", "六", "日"][p - 1] : (u.length > 0 && p < 10 && (p = "0" + p), p || 0);
    });
  },
  exportTable(e, t = [], n = 0, a = {}, i = "") {
    console.log(e), console.log(t), console.log(n), console.log(a), console.log(i);
  },
  exportJSON(e) {
    console.log(e);
  },
  getObjectKey(e, t, n = "$") {
    let a = [];
    return t.toListString().forEach((i) => {
      a.push(e[i]);
    }), a.join(n);
  },
  sumArray(e) {
    if (e.length) {
      let t = e.filter((n) => this.isNumber(n));
      return t.length ? t.map((a) => parseFloat(a)).reduce(function(a, i) {
        return a || (a = 0), i || (i = 0), a + i;
      }).toFixedNumber() : 0;
    }
    return 0;
  },
  pageArray(e, t, n) {
    var a = t * n, i = a + n >= e.length ? e.slice(a, e.length) : e.slice(a, a + n);
    return i;
  },
  removeArrayItem(e, t) {
    let n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  orderBy(e, t) {
    e && e.sort(function(n, a) {
      var i = n[t] ? n[t] : 0, s = a[t] ? a[t] : 0;
      return lessCom.isNumber(i) && lessCom.isNumber(s) && (i = parseFloat(i), s = parseFloat(s)), i < s ? -1 : i > s ? 1 : 0;
    });
  },
  orderByDescending(e, t) {
    e && e.sort(function(n, a) {
      var i = a[t] ? a[t] : 0, s = n[t] ? n[t] : 0;
      return lessCom.isNumber(i) && lessCom.isNumber(s) && (i = parseFloat(i), s = parseFloat(s)), i < s ? -1 : i > s ? 1 : 0;
    });
  },
  getQueryData(e) {
    if (!e)
      return {};
    let t = {};
    for (let f in e) {
      var n = e[f];
      if (n.QueryParameterType != "NoPost")
        if (f == "PageSize" || f == "PageIndex")
          t["Query_" + f] = n.Value;
        else if (n.QueryParameterType == "Sort") {
          var a = f.startsWith("Sort_") ? f : "Sort_" + f, i = n.QueryFieldName, s = n.Value;
          if (s) {
            var u = n.SignatureMD5;
            t[a] = i + "$" + s + "$" + u;
          }
        } else if ((n.QueryType !== void 0 && n.QueryType == "Query" || n.QueryParameterType !== void 0 && n.QueryParameterType != "NoQuery") && n.QueryMethod !== "NoAuto") {
          let p = "Query_" + f, m = n.QueryFieldName, b = n.QueryMethod, _ = n.QueryDataType, E = n.SignatureMD5, w = n.Value;
          n.IsAroundComma === !0 && w && !w.startsWith(",") && (w = `,${w},`), (w || typeof w == "number") && (t[p] = m + "$" + b + "$" + _ + "$" + E + "$" + w);
        } else
          t[f] = n.Value;
    }
    return t;
  },
  handleApiResult(e) {
    if (!e.EventActionData && e.ResultCode == "0") {
      ElMessage.success(e.ResultMessage);
      return;
    } else if (!e.EventActionData && e.ResultCode != "0") {
      ElMessage.error(e.ResultMessage);
      return;
    }
    e.EventActionData.forEach((t) => {
      switch (t.Name) {
        case "Alert":
          ElMessage.success({ message: t.Value });
          break;
        case "TargetUrl":
          window.location.href = t.Value;
          break;
      }
    });
  },
  getToolHeight() {
    return 0;
  },
  Guid() {
    for (var e = "", t = 1; t <= 32; t++) {
      var n = Math.floor(Math.random() * 16).toString(16);
      e += n, (t == 8 || t == 12 || t == 16 || t == 20) && (e += "-");
    }
    return e;
  },
  Guid32() {
    return lessCom.Guid().replace(/-/g, "");
  },
  cloneObj(e) {
    return e ? JSON.parse(JSON.stringify(e)) : {};
  },
  isObject: (e) => Object.prototype.toString.call(e).indexOf("Object") > -1 || Object.prototype.toString.call(e).indexOf("Array") > -1,
  isNumber(e) {
    var t = /^\d+(\.\d+)?$/, n = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
    return !!(t.test(e) || n.test(e));
  },
  dtGroupBy(e, t, n = "") {
    const a = {};
    if (e.forEach(function(i) {
      const s = i[t];
      a[s] = a[s] || [], a[s].push(i);
    }), n) {
      let i = Object.keys(a).map(function(s) {
        let u = a[s], f = u[0][n];
        return { key: s, sort: f || 0, value: u };
      });
      return this.orderBy(i, "sort"), i;
    } else
      return Object.keys(a).map(function(i) {
        return { key: i, value: a[i] };
      });
  },
  post(e, t, n = !0) {
    return t || (t = []), new Promise((a, i) => {
      axios$1.post(e, t).then((s) => {
        s.status == 200 ? a(s.data) : i(s);
      }).catch((s) => {
        n && ElMessage.error({ message: "接口调用异常" }), console.log(s), i(s);
      });
    });
  },
  get(e, t, n = !0) {
    return t || (t = []), new Promise((a, i) => {
      axios$1.get(e, { params: t }).then((s) => {
        s.status == 200 ? a(s.data) : i(s);
      }).catch((s) => {
        n && ElMessage.error({ message: "接口调用异常" }), console.log(s), i(s);
      });
    });
  }
};
Number.prototype.appendPx = function() {
  return this ? this + "px" : "";
};
String.prototype.toCamel = function() {
  return this.replace(/-([a-z])/g, function(e, t) {
    return console.log(e), t.toUpperCase();
  });
};
String.prototype.appendPx = function() {
  return this ? lessCom.isNumber(this.toString()) ? this + "px" : this.toString() : "";
};
String.prototype.toList = function(e = ",") {
  return this ? this.toString().split(e) : [];
};
String.prototype.toListNumber = function(e = ",") {
  return this ? this.toString().split(e).map((t) => parseFloat(t)) : [];
};
String.prototype.cutWord = function(e) {
  return this && this.length > e ? this.substring(0, e) + "..." : this.toString();
};
String.prototype.replacePowerUrl = function() {
  try {
    if (this && this.indexOf("{Power_CoteID}") > -1 && location.host)
      return this.replace("{Power_CoteID}", location.host.split(".")[0]);
  } catch (t) {
    console.log(t);
  }
  return this.toString();
};
String.prototype.post = function(t, n = !0) {
  return lessCom.post(this.toString(), t, n);
};
String.prototype.get = function(t, n = !0) {
  return lessCom.get(this.toString(), t, n);
};
var ValueType = /* @__PURE__ */ ((e) => (e.Auto = "", e.String = "string", e.Number = "number", e))(ValueType || {}), QueryMethod = /* @__PURE__ */ ((e) => (e.Equal = "Equal", e.GreaterThan = "GreaterThan", e.GreaterThanOrEqual = "GreaterThanOrEqual", e.LessThan = "LessThan", e.LessThanOrEqual = "LessThanOrEqual", e.NotEqual = "NotEqual", e.StartsWith = "StartsWith", e.EndsWith = "EndsWith", e.Contains = "Contains", e.Like = "Like", e.StdIn = "StdIn", e.In = "In", e.ORLike = "ORLike", e.NoAuto = "NoAuto", e))(QueryMethod || {}), QueryDataType = /* @__PURE__ */ ((e) => (e.String = "String", e.Int = "Int", e.Guid = "Guid", e.Date = "Date", e.Object = "Object", e.TimeStamp = "TimeStamp", e.SecondStamp = "SecondStamp", e))(QueryDataType || {});
const _hoisted_1$6 = {
  key: 0,
  class: "check"
}, _hoisted_2$3 = {
  key: 0,
  class: "check"
}, _hoisted_3$2 = {
  key: 0,
  class: "check"
}, _sfc_main$l = /* @__PURE__ */ defineComponent({
  name: "ElsSelect",
  __name: "Select",
  props: {
    data: {},
    url: {},
    modelValue: {},
    labelField: { default: "label" },
    valueField: { default: "value" },
    disabledField: { default: "disabled" },
    selectIndex: { default: -1 },
    isClearWithSearch: { type: Boolean },
    isClearSearchWithNoSelect: { type: Boolean },
    groupField: {},
    noExistOptionPrefix: { default: "未知选项" },
    hasNoExistOption: { type: Boolean, default: !0 },
    isInitTriggerSelect: { type: Boolean, default: !0 },
    resetValueByChangeData: { type: Boolean, default: !0 },
    valueType: { default: ValueType.Auto },
    loading: { type: Boolean },
    width: {},
    onChange: {},
    valueSeparator: { default: "," },
    fieldName: {},
    label: {},
    require: { type: Boolean },
    requireMessage: {},
    validationExpression: {},
    validationMessage: {},
    validationMethod: {},
    validationTrigger: { default: "change" },
    hasFormItem: { type: Boolean },
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean }
  },
  emits: ["update:modelValue", "update:select", "update:select-label", "change", "click-option", "select", "blur", "clear", "readdataed"],
  setup(e, { emit: t }) {
    const n = e, a = useSlots(), i = useAttrs(), s = ref(!1), u = ref(""), f = ref(!1), p = ref(""), m = i.multiple !== void 0 && i.multiple !== !1;
    m && (p.value = []);
    const b = ref(), _ = ref(""), E = reactive([]), w = reactive([]), A = reactive([]), T = reactive([]), O = reactive({ searchKey: "", idString: "" }), I = computed(() => E.concat(A).concat(w));
    watch(() => n.selectIndex, () => {
      L();
    }), watch(() => n.url, () => {
      n.resetValueByChangeData && (m ? p.value = [] : p.value = ""), B();
    }), watch(() => n.data, (R, W) => {
      R === void 0 && W === void 0 || R != W && JSON.stringify(R) != JSON.stringify(W) && R && (n.resetValueByChangeData && (m ? p.value = [] : p.value = ""), E.length = 0, E.push(...R), G(), L());
    }), watch(() => n.modelValue, () => {
      H(), G();
    }), watch(p, (R) => {
      if (m) {
        oe(R.join(n.valueSeparator));
        return;
      }
      oe(R);
    }), provide("type", "select"), provide("multiple", m), provide("setExtraOption", z);
    function H() {
      let R = n.valueType;
      i["allow-create"] && (R = ValueType.String), !(n.modelValue === "" || n.modelValue === void 0) && (m ? R === ValueType.Number ? p.value = n.modelValue.toString().toListNumber(n.valueSeparator) : R === ValueType.String ? p.value = n.modelValue.toString().toList(n.valueSeparator) : I.value.length && typeof I.value[0][n.valueField] == "number" ? p.value = n.modelValue.toString().toListNumber(n.valueSeparator) : n.modelValue && (p.value = n.modelValue.toString().toList(n.valueSeparator)) : R === ValueType.Number ? p.value = parseFloat(n.modelValue.toString()) : R === ValueType.String ? p.value = n.modelValue.toString() : I.value.length && n.modelValue.toString().length < 12 && typeof I.value[0][n.valueField] == "number" ? p.value = parseFloat(n.modelValue.toString()) : p.value = n.modelValue);
    }
    function L() {
      n.selectIndex > -1 && !n.modelValue && I.value.length && (p.value = I.value[n.selectIndex][n.valueField], m && (p.value = [p]));
    }
    function z(R) {
      if (I.value.findIndex((te) => te[n.valueField] == R.value) == -1) {
        let te = {};
        te[n.labelField] = R.label, te[n.valueField] = R.value, te.DataIsExtra = !0, A.push(te);
      }
    }
    function G() {
      nextTick(() => {
        if (w.length = 0, n.hasNoExistOption) {
          if (m) {
            if (p.value.length) {
              let R = p.value.filter((W) => !I.value.map((te) => te[n.valueField]).includes(W));
              R && R.length && R.forEach((W) => {
                if (W === 0 || W) {
                  let te = {};
                  i["allow-create"] ? te[n.labelField] = W : te[n.labelField] = n.noExistOptionPrefix ? n.noExistOptionPrefix + "-" + W : W, te[n.valueField] = W, te.DataNoExist = !0, w.push(te);
                }
              });
            }
          } else if (p.value) {
            let R = I.value.find((W) => W[n.valueField] == p.value);
            if (R)
              R[n.valueField] = p.value;
            else {
              let W = {};
              i["allow-create"] ? W[n.labelField] = p.value : W[n.labelField] = n.noExistOptionPrefix ? n.noExistOptionPrefix + "-" + p.value : p.value, W[n.valueField] = p.value, W.DataNoExist = !0, w.push(W);
            }
          }
        }
      });
    }
    function Z(R) {
      try {
        if ((R || R === 0) && I.value.length) {
          let W = I.value, te = R;
          m ? (b.value = W.filter((le) => R.toString().indexOf(le[n.valueField]) > -1), _.value = b.value.map((le) => le[n.labelField]).toString(), te = R.toString()) : (b.value = W.find((le) => R === le[n.valueField]), b.value && (_.value = b.value[n.labelField])), t("select", { selectItem: b.value, selectLabel: _.value, selectValue: te, preSelectValue: u.value }), u.value = R;
        }
      } catch (W) {
        console.log(W);
      }
    }
    function J() {
      n.isClearSearchWithNoSelect && O.searchKey && !p.value && q(""), t("blur");
    }
    function x() {
      n.isClearWithSearch && O.searchKey && q(""), t("clear");
    }
    function q(R) {
      var W;
      i.remote === void 0 || i.remote === !1 || (O.idString = (W = p.value) == null ? void 0 : W.toString(), O.searchKey = R, B());
    }
    function B() {
      var W;
      f.value = !0;
      let R = ((W = n.url) == null ? void 0 : W.replacePowerUrl()) ?? "";
      return new Promise((te, le) => {
        R.post(O).then((fe) => {
          fe.ResultCode == "0" ? (E.length = 0, E.push(...fe.Data), H(), G(), L(), t("readdataed", E)) : ElMessage.error(fe.ResultMessage), f.value = !1, te(!0);
        }).catch((fe) => {
          le(fe);
        });
      });
    }
    function Y(R) {
      t("click-option", R);
    }
    function oe(R) {
      if (R === void 0 && (R = ""), t("update:modelValue", R), s && (R || R === 0)) {
        if (n.valueField && n.labelField)
          if (m)
            t("update:select", I.value.filter((W) => R.indexOf(W[n.valueField]) > -1)), t("update:select-label", I.value.filter((W) => R.indexOf(W[n.valueField]) > -1).map((W) => W[n.labelField]).toString());
          else {
            let W = I.value.find((te) => R == te[n.valueField]);
            t("update:select", W), W ? t("update:select-label", W[n.labelField]) : t("update:select-label", "");
          }
        Z(R), t("change", R);
      }
      s.value = !0;
    }
    return (i.remote === !0 || i.remote === "") && n.url && n.modelValue && (O.idString = n.modelValue.toString()), f.value = n.loading, n.url ? B() : (E.length = 0, n.data && E.push(...n.data), H(), G(), L()), (R, W) => {
      var $;
      const te = resolveComponent("el-option"), le = resolveComponent("el-option-group"), fe = resolveComponent("el-select");
      return openBlock(), createBlock(fe, {
        modelValue: p.value,
        "onUpdate:modelValue": W[0] || (W[0] = (U) => p.value = U),
        "remote-method": q,
        style: normalizeStyle({ width: ($ = n.width) == null ? void 0 : $.appendPx() }),
        loading: f.value,
        "remote-show-suffix": "",
        onBlur: J,
        onClear: x
      }, createSlots({
        default: withCtx(() => [
          renderSlot(R.$slots, "extra", {}, void 0, !0),
          (R.url || R.data && R.data.length > 0 || E.length) && !R.groupField && !T.length ? (openBlock(!0), createElementBlock(Fragment, { key: 0 }, renderList(E, (U) => (openBlock(), createBlock(te, {
            onClick: (ne) => Y(U),
            disabled: U[R.disabledField] === !0,
            key: U[R.valueField],
            label: U[R.labelField],
            value: U[R.valueField]
          }, {
            default: withCtx(() => [
              unref(m) ? (openBlock(), createElementBlock("i", _hoisted_1$6)) : createCommentVNode("", !0),
              renderSlot(R.$slots, "default", { item: U }, () => [
                createTextVNode(toDisplayString(U[R.labelField]), 1)
              ], !0)
            ]),
            _: 2
          }, 1032, ["onClick", "disabled", "label", "value"]))), 128)) : (R.url || R.data && R.data.length > 0 || E.length) && R.groupField && !T.length ? (openBlock(!0), createElementBlock(Fragment, { key: 1 }, renderList(unref(lessCom).dtGroupBy(E, R.groupField), (U) => (openBlock(), createBlock(le, {
            key: U.key,
            label: U.key
          }, {
            default: withCtx(() => [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(U.value, (ne) => (openBlock(), createBlock(te, {
                onClick: (se) => Y(ne),
                key: ne[R.valueField],
                label: ne[R.labelField],
                value: ne[R.valueField]
              }, {
                default: withCtx(() => [
                  unref(m) ? (openBlock(), createElementBlock("i", _hoisted_2$3)) : createCommentVNode("", !0),
                  renderSlot(R.$slots, "default", { item: ne }, () => [
                    createTextVNode(toDisplayString(ne[R.labelField]), 1)
                  ], !0)
                ]),
                _: 2
              }, 1032, ["onClick", "label", "value"]))), 128))
            ]),
            _: 2
          }, 1032, ["label"]))), 128)) : renderSlot(R.$slots, "default", { key: 2 }, void 0, !0),
          (openBlock(!0), createElementBlock(Fragment, null, renderList(w, (U) => (openBlock(), createBlock(te, {
            onClick: (ne) => Y(U),
            key: U[R.valueField],
            label: U[R.labelField],
            value: U[R.valueField]
          }, {
            default: withCtx(() => [
              unref(i).multiple ? (openBlock(), createElementBlock("i", _hoisted_3$2)) : createCommentVNode("", !0),
              createTextVNode(" " + toDisplayString(U[R.labelField]), 1)
            ]),
            _: 2
          }, 1032, ["onClick", "label", "value"]))), 128))
        ]),
        _: 2
      }, [
        unref(a).empty ? {
          name: "empty",
          fn: withCtx(() => [
            renderSlot(R.$slots, "empty", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        unref(a).prefix ? {
          name: "prefix",
          fn: withCtx(() => [
            renderSlot(R.$slots, "prefix", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1032, ["modelValue", "style", "loading"]);
    };
  }
}), Select_vue_vue_type_style_index_0_scoped_1cf93038_lang = "", _export_sfc = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, i] of t)
    n[a] = i;
  return n;
}, Select = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-1cf93038"]]);
Select.install = (e) => {
  e.component(Select.__name, Select);
};
const _hoisted_1$5 = {
  key: 0,
  class: "check"
}, _sfc_main$k = /* @__PURE__ */ defineComponent({
  name: "ElsOption",
  __name: "Option",
  props: {
    type: {},
    label: {},
    value: { type: [String, Number, Boolean] }
  },
  setup(e) {
    var b, _;
    const t = e, n = ref(""), a = ref(""), i = ref(!1), s = inject("type") ?? "", u = inject("optionWidth", ""), f = useSlots(), p = reactive([]);
    if (u && p.push({ width: u.appendPx() }), s != "tabs" && s != "dropdown")
      switch (s) {
        case "radio":
          n.value = "el-radio";
          break;
        case "radiobutton":
          n.value = "el-radio-button";
          break;
        case "checkbox":
          n.value = "el-checkbox";
          break;
        case "checkboxbutton":
          n.value = "el-checkbox-button";
          break;
      }
    i.value = inject("multiple", !1), a.value = t.label ?? "", (s == "select" || s.indexOf("checkbox") > -1 || s.indexOf("radio") > -1) && f.default && ((b = f.default()[0].type) == null ? void 0 : b.toString()) == "Symbol(v-txt)" && (a.value = ((_ = f.default()[0].children) == null ? void 0 : _.toString()) ?? "");
    const m = inject("setExtraOption");
    return m && m({ label: a.value, value: t.value }), (E, w) => {
      const A = resolveComponent("el-option"), T = resolveComponent("el-tab-pane"), O = resolveComponent("el-dropdown-item");
      return unref(s) == "select" ? (openBlock(), createBlock(A, mergeProps({
        key: 0,
        label: a.value,
        value: E.value
      }, E.$attrs), {
        default: withCtx(() => [
          i.value ? (openBlock(), createElementBlock("i", _hoisted_1$5)) : createCommentVNode("", !0),
          renderSlot(E.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(a.value), 1)
          ])
        ]),
        _: 3
      }, 16, ["label", "value"])) : unref(s) == "tabs" ? (openBlock(), createBlock(T, mergeProps({
        key: 1,
        label: E.label,
        name: E.value
      }, E.$attrs), createSlots({
        default: withCtx(() => [
          renderSlot(E.$slots, "default")
        ]),
        _: 2
      }, [
        E.$slots.label ? {
          name: "label",
          fn: withCtx(() => [
            renderSlot(E.$slots, "label")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["label", "name"])) : unref(s) == "dropdown" ? (openBlock(), createBlock(O, mergeProps({
        key: 2,
        command: E.value
      }, E.$attrs), createSlots({
        default: withCtx(() => [
          renderSlot(E.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(E.label), 1)
          ])
        ]),
        _: 2
      }, [
        E.$slots.dropdown ? {
          name: "dropdown",
          fn: withCtx(() => [
            renderSlot(E.$slots, "dropdown")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["command"])) : (openBlock(), createBlock(resolveDynamicComponent(n.value), mergeProps({
        key: 3,
        style: p
      }, E.$attrs, { label: E.value }), {
        default: withCtx(() => [
          renderSlot(E.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(E.label), 1)
          ])
        ]),
        _: 3
      }, 16, ["style", "label"]));
    };
  }
}), _hoisted_1$4 = {
  key: 1,
  style: { width: "100%" }
}, _hoisted_2$2 = { class: "els-radio-group-item" }, _sfc_main$j = /* @__PURE__ */ defineComponent({
  name: "ElsOptionGroup",
  __name: "OptionGroup",
  props: {
    label: {}
  },
  setup(e) {
    const t = inject("type");
    console.info(t);
    const n = useAttrs();
    return (a, i) => {
      const s = resolveComponent("el-option-group");
      return unref(t) == "select" ? (openBlock(), createBlock(s, mergeProps({
        key: 0,
        label: a.label
      }, unref(n)), {
        default: withCtx(() => [
          renderSlot(a.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["label"])) : (openBlock(), createElementBlock("div", _hoisted_1$4, [
        createElementVNode("div", _hoisted_2$2, toDisplayString(a.label), 1),
        renderSlot(a.$slots, "default", normalizeProps(guardReactiveProps(unref(n))), void 0, !0)
      ]));
    };
  }
}), OptionGroup_vue_vue_type_style_index_0_scoped_12e7da9e_lang = "", OptionGroup = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-12e7da9e"]]), _hoisted_1$3 = { key: 0 }, _sfc_main$i = /* @__PURE__ */ defineComponent({
  name: "ElsRadio",
  __name: "Radio",
  props: {
    type: { default: "radio" },
    modelValue: {},
    width: {},
    height: {},
    optionWidth: {},
    labelField: { default: "label" },
    valueField: { default: "value" },
    noExistOptionPrefix: { default: "未知选项" },
    filterable: { type: Boolean },
    hasNoExistOption: { type: Boolean, default: !0 },
    disabledField: { default: "disabled" },
    selectIndex: { default: -1 },
    url: {},
    groupField: {},
    data: {},
    isInitTriggerSelect: { type: Boolean, default: !0 },
    resetValueByChangeData: { type: Boolean, default: !0 },
    valueType: {},
    onChange: {},
    fieldName: {},
    label: {},
    require: { type: Boolean },
    requireMessage: {},
    validationExpression: {},
    validationMessage: {},
    validationMethod: {},
    validationTrigger: { default: "change" },
    hasFormItem: { type: Boolean },
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean }
  },
  emits: ["select", "readdataed", "click-option", "update:modelValue", "update:select", "update:select-label", "change"],
  setup(e, { emit: t }) {
    const n = e, a = ref(), i = ref(""), s = ref(), u = ref(""), f = ref(""), p = ref(!1), m = reactive([]), b = reactive([]), _ = reactive([]), E = reactive([]), w = reactive({ searchKey: "", idString: "" }), A = useAttrs(), T = reactive([]), O = computed(() => m.concat(_).concat(b));
    watch(a, (B) => {
      q(B);
    }), watch(() => n.selectIndex, () => {
      L();
    }), watch(() => n.modelValue, () => {
      H(), G();
    }), watch(() => n.url, () => {
      n.resetValueByChangeData && (a.value = ""), J();
    }), watch(() => n.data, (B) => {
      n.resetValueByChangeData && (a.value = ""), m.length = 0, E.length = 0, B && (m.push(...B), E.push(...B)), G(), L();
    }), watch(f, (B) => {
      m.length = 0, m.push(...E.filter((Y) => Y[n.labelField].toLowerCase().indexOf(B.toLowerCase()) > -1));
    }), n.type == "button" ? provide("type", "radiobutton") : (provide("type", "radio"), provide("optionWidth", n.optionWidth)), provide("setExtraOption", z);
    const I = reactive([]);
    n.type == "radio" ? (T.push({ "text-align": "left" }), n.width && T.push({ width: n.width.appendPx() }), I.push("els-radio-default")) : I.push("els-radio"), n.height && (I.push("scrollheight"), n.height && T.push({ "max-height": n.height.appendPx() }));
    function H() {
      let B = n.valueType;
      if (n.modelValue === "" || n.modelValue === void 0) {
        a.value = "";
        return;
      }
      B === ValueType.Number ? a.value = parseFloat(n.modelValue.toString()) : B === ValueType.String ? a.value = n.modelValue.toString() : O.value.length && n.modelValue.toString().length < 12 && typeof O.value[0][n.valueField] == "number" ? a.value = parseFloat(n.modelValue.toString()) : a.value = n.modelValue;
    }
    function L() {
      n.selectIndex > -1 && !n.modelValue && O.value.length && (a.value = O.value[n.selectIndex][n.valueField]);
    }
    function z(B) {
      if (O.value.findIndex((oe) => oe[n.valueField] == B.value) == -1) {
        let oe = {};
        oe[n.labelField] = B.label, oe[n.valueField] = B.value, oe.DataIsExtra = !0, _.push(oe);
      }
    }
    function G() {
      nextTick(() => {
        if (b.length = 0, n.hasNoExistOption && a.value) {
          let B = O.value.find((Y) => Y[n.valueField] == a.value);
          if (B)
            B[n.valueField] = a.value;
          else {
            let Y = {};
            A["allow-create"] ? Y[n.labelField] = a.value : Y[n.labelField] = n.noExistOptionPrefix ? n.noExistOptionPrefix + "-" + a.value : a.value, Y[n.valueField] = a.value, Y.DataNoExist = !0, b.push(Y);
          }
        }
      });
    }
    function Z(B) {
      try {
        if ((B || B === 0) && O.value.length) {
          let Y = B;
          s.value = O.value.find((oe) => B === oe[n.valueField]), s.value && (u.value = s.value[n.labelField]), t("select", { selectItem: s.value, selectLabel: u.value, selectValue: Y, preSelectValue: i.value }), i.value = B;
        }
      } catch (Y) {
        console.log(Y);
      }
    }
    function J() {
      var Y, oe;
      let B = ((Y = n.url) == null ? void 0 : Y.replacePowerUrl()) ?? "";
      return w.idString = (oe = a.value) == null ? void 0 : oe.toString(), new Promise((R, W) => {
        B.post(w).then((te) => {
          te.ResultCode == "0" ? (m.length = 0, m.push(...te.Data), E.length = 0, E.push(...te.Data), H(), G(), L(), t("readdataed", m)) : ElMessage.error(te.ResultMessage), R(!0);
        }).catch((te) => {
          W(te);
        });
      });
    }
    function x(B) {
      t("click-option", B);
    }
    function q(B) {
      if (B === void 0 && (B = ""), t("update:modelValue", B), p.value && (B || B === 0)) {
        if (n.valueField && n.labelField) {
          let Y = O.value.find((oe) => B == oe[n.valueField]);
          t("update:select", Y), Y ? t("update:select-label", Y[n.labelField]) : t("update:select-label", "");
        }
        Z(B), t("change", B);
      }
      p.value = !0;
    }
    return p.value = n.isInitTriggerSelect, n.modelValue === "" && (p.value = !0), n.url ? J() : (n.data && (m.push(...n.data), E.push(...n.data)), H(), G(), L()), (B, Y) => {
      const oe = resolveComponent("el-input"), R = resolveComponent("el-radio"), W = resolveComponent("el-empty"), te = resolveComponent("el-radio-group");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(I),
        style: normalizeStyle(T)
      }, [
        n.filterable ? (openBlock(), createElementBlock("div", _hoisted_1$3, [
          B.filterable ? (openBlock(), createBlock(oe, {
            key: 0,
            style: { width: "200px" },
            "suffix-icon": "Search",
            placeholder: "输入关键字进行过滤",
            modelValue: f.value,
            "onUpdate:modelValue": Y[0] || (Y[0] = (le) => f.value = le),
            clearable: ""
          }, null, 8, ["modelValue"])) : createCommentVNode("", !0)
        ])) : createCommentVNode("", !0),
        !B.url && (!B.data || !B.data.length) && !O.value.length ? (openBlock(), createBlock(R, mergeProps({
          key: 1,
          ref: "leo-radio",
          modelValue: a.value,
          "onUpdate:modelValue": Y[1] || (Y[1] = (le) => a.value = le)
        }, unref(A)), {
          default: withCtx(() => [
            renderSlot(B.$slots, "default", {}, void 0, !0)
          ]),
          _: 3
        }, 16, ["modelValue"])) : (openBlock(), createBlock(te, mergeProps({
          key: 2,
          modelValue: a.value,
          "onUpdate:modelValue": Y[2] || (Y[2] = (le) => a.value = le),
          ref: "els-radio-group"
        }, unref(A)), {
          default: withCtx(() => [
            renderSlot(B.$slots, "extra", {}, void 0, !0),
            f.value && !O.value.length ? (openBlock(), createBlock(W, { key: 0 })) : (B.url || B.data && B.data.length > 0 || m.length) && !B.groupField ? (openBlock(!0), createElementBlock(Fragment, { key: 1 }, renderList(m, (le, fe) => (openBlock(), createBlock(_sfc_main$k, {
              type: B.type,
              key: fe,
              value: le[B.valueField],
              disabled: le[B.disabledField] === !0,
              onClick: ($) => x(le)
            }, {
              default: withCtx(() => [
                renderSlot(B.$slots, "default", { item: le }, () => [
                  createTextVNode(toDisplayString(le[B.labelField]), 1)
                ], !0)
              ]),
              _: 2
            }, 1032, ["type", "value", "disabled", "onClick"]))), 128)) : (B.url || B.data && B.data.length > 0) && B.groupField ? (openBlock(!0), createElementBlock(Fragment, { key: 2 }, renderList(unref(lessCom).dtGroupBy(m, B.groupField), (le) => (openBlock(), createBlock(OptionGroup, {
              label: le.key ?? "未分组"
            }, {
              default: withCtx(() => [
                (openBlock(!0), createElementBlock(Fragment, null, renderList(le.value, (fe, $) => (openBlock(), createBlock(_sfc_main$k, {
                  type: B.type,
                  key: $,
                  value: fe[B.valueField],
                  disabled: fe[B.disabledField] === !0,
                  onClick: (U) => x(fe)
                }, {
                  default: withCtx(() => [
                    renderSlot(B.$slots, "default", { item: fe }, () => [
                      createTextVNode(toDisplayString(fe[B.labelField]), 1)
                    ], !0)
                  ]),
                  _: 2
                }, 1032, ["type", "value", "disabled", "onClick"]))), 128))
              ]),
              _: 2
            }, 1032, ["label"]))), 256)) : renderSlot(B.$slots, "default", { key: 3 }, void 0, !0),
            (openBlock(!0), createElementBlock(Fragment, null, renderList(b, (le) => (openBlock(), createBlock(_sfc_main$k, {
              type: B.type,
              key: le[B.valueField],
              value: le[B.valueField],
              onClick: (fe) => x(le)
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(le[B.labelField]), 1)
              ]),
              _: 2
            }, 1032, ["type", "value", "onClick"]))), 128))
          ]),
          _: 3
        }, 16, ["modelValue"]))
      ], 6);
    };
  }
}), Radio_vue_vue_type_style_index_0_scoped_d4a73b1a_lang = "", ElsRadio = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-d4a73b1a"]]);
ElsRadio.install = (e) => {
  e.component(ElsRadio.__name, ElsRadio);
};
const _hoisted_1$2 = {
  key: 0,
  style: { "margin-bottom": "15px", "text-align": "left" }
}, _sfc_main$h = /* @__PURE__ */ defineComponent({
  name: "ElsCheckbox",
  __name: "Checkbox",
  props: {
    type: { default: "checkbox" },
    modelValue: {},
    width: {},
    height: {},
    optionWidth: {},
    labelField: { default: "label" },
    valueField: { default: "value" },
    disabledField: { default: "disabled" },
    noExistOptionPrefix: { default: "未知选项" },
    hasNoExistOption: { type: Boolean, default: !0 },
    url: {},
    data: {},
    groupField: {},
    filterable: { type: Boolean },
    showCheckall: { type: Boolean },
    showInverse: { type: Boolean },
    resetValueByChangeData: { type: Boolean, default: !0 },
    isInitTriggerSelect: { type: Boolean },
    valueType: {},
    fieldName: {},
    label: {},
    require: { type: Boolean },
    requireMessage: {},
    validationExpression: {},
    validationMessage: {},
    validationMethod: {},
    validationTrigger: {},
    hasFormItem: { type: Boolean },
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean }
  },
  emits: ["update:modelValue", "update:select", "update:select-label", "change", "click-option", "select", "blur", "clear", "readdataed"],
  setup(e, { emit: t }) {
    const n = e, a = useAttrs();
    let i = ref(!1);
    const s = ref([]), u = ref(), f = ref(), p = ref([]), m = ref(), b = reactive([]), _ = reactive([]), E = reactive([]), w = reactive([]), A = ref(!1), T = ref(!1), O = ref(!1), I = ref("");
    let H = ref(!0);
    const L = reactive({ searchKey: "", idString: "" }), z = computed(() => b.concat(E).concat(_)), G = reactive([]), Z = reactive([]);
    provide("type", n.type), provide("setExtraOption", q), provide("optionWidth", n.optionWidth), n.type == "checkbox" ? (Z.push({ "text-align": "left" }), n.width && Z.push({ width: n.width.appendPx() }), G.push("els-checkbox-default")) : G.push("els-checkbox"), n.height && (G.push("scrollheight"), n.height && Z.push({ "max-height": n.height.appendPx() })), watch(I, ($) => {
      b.length = 0, b.push(...w.filter((U) => U[n.labelField].toLowerCase().indexOf($.toLowerCase()) > -1));
    }), watch(() => n.url, () => {
      n.resetValueByChangeData && (H.value ? p.value = [] : m.value = ""), R();
    }), watch(() => n.data, ($, U) => {
      $ === void 0 && U === void 0 || $ != U && JSON.stringify($) != JSON.stringify(U) && $ && (n.resetValueByChangeData && (H.value ? p.value = [] : m.value = ""), b.length = 0, w.length = 0, $ && (b.push(...$), w.push(...$)), x());
    }), watch(() => n.modelValue, () => {
      oe(), x();
    }), watch(p, ($) => {
      fe($), W();
    }), watch(m, ($) => {
      fe($);
    });
    function J() {
      !n.url && (!n.data || !n.data.length) && !z.value.length && (H.value = !1), n.url ? (L.idString = n.modelValue ?? "", R()) : (n.data && (b.push(...n.data), w.push(...n.data)), oe(), x(), W());
    }
    function x() {
      nextTick(() => {
        if (_.length = 0, n.hasNoExistOption && H && p.length) {
          let $ = p.filter((U) => !z.value.map((ne) => ne[n.valueField]).includes(U));
          $ && $.length && $.forEach((U) => {
            if (U === 0 || U) {
              let ne = {};
              ne[n.labelField] = n.noExistOptionPrefix ? n.noExistOptionPrefix + "-" + U : U, ne[n.valueField] = U, ne.DataNoExist = !0, _.push(ne);
            }
          });
        }
      });
    }
    function q($) {
      if (H.value || (H.value = !0, p.value = []), z.value.findIndex((ne) => ne[n.valueField] == $.value) == -1) {
        let ne = {};
        ne[n.labelField] = $.label, ne[n.valueField] = $.value, ne.DataIsExtra = !0, E.push(ne);
      }
    }
    function B() {
      p.value = z.value.filter(($) => !p.value.includes($[n.valueField])).map(($) => $[n.valueField]);
    }
    function Y($) {
      p.value = $ ? z.value.map((U) => U[n.valueField]) : [], O.value = !1;
    }
    function oe() {
      let $ = n.valueType, U = n.modelValue;
      if (typeof U == "string" && (U = U.replace(/^,+/, "").replace(/,+$/, "")), U === "" || U === void 0) {
        p.value.length > 0 && (p.value = []), m.value = "";
        return;
      }
      if (H.value)
        $ === ValueType.Number ? p.value = U.split(",").map((ne) => parseFloat(ne)) : $ === "string" && U !== "" ? p.value = U.split(",") : z.value.length && typeof z.value[0][n.valueField] == "number" ? p.value = U.split(",").map((ne) => parseFloat(ne)) : U && (p.value = U.split(","));
      else {
        $ === ValueType.Number ? m.value = parseFloat(U) : $ === ValueType.String ? m.value = U.toString() : z.value.length && U.length < 12 && typeof z.value[0][n.valueField] == "number" ? m.value = parseFloat(U) : m.value = U;
        return;
      }
    }
    function R() {
      var U;
      let $ = ((U = n.url) == null ? void 0 : U.replacePowerUrl()) ?? "";
      return new Promise((ne, se) => {
        $.post(L).then((Pe) => {
          Pe.ResultCode == "0" ? (b.length = 0, b.push(...Pe.Data), w.length = 0, w.push(...Pe.Data), oe(), x(), W(), t("readdataed", b)) : ElMessage.error(Pe.ResultMessage), ne(!0);
        }).catch((Pe) => {
          se(Pe);
        });
      });
    }
    function W() {
      if (n.showCheckall) {
        let $ = p.value.length;
        T.value = $ > 0 && $ === z.value.length, O.value = $ > 0 && $ < z.value.length;
      }
    }
    function te($) {
      try {
        if ($ && b.length) {
          let U = b, ne = $;
          H.value ? (u.value = U.filter((se) => $.indexOf(se[n.valueField]) > -1), f.value = u.value.map((se) => se[n.labelField]).toString(), ne = $.toString()) : (u.value = U.find((se) => $ === se[n.valueField]), u && (f.value = u[n.labelField])), t("select", { selectItem: u, selectLabel: f, selectValue: ne, preSelectValue: s }), s.value = $;
        }
      } catch (U) {
        console.log(U);
      }
    }
    function le($) {
      t("click-option", $);
    }
    function fe($) {
      if ($ === void 0 && ($ = ""), H.value ? t("update:modelValue", $.toString()) : t("update:modelValue", $), i && $) {
        if (n.valueField && n.labelField)
          if (H.value)
            t("update:select", z.value.filter((U) => $.indexOf(U[n.valueField]) > -1)), t("update:select-label", z.value.filter((U) => $.indexOf(U[n.valueField]) > -1).map((U) => U[n.labelField]).toString());
          else {
            let U = z.value.find((ne) => $ == ne[n.valueField]);
            t("update:select", U), U ? t("update:select-label", U[n.labelField]) : t("update:select-label", "");
          }
        te($);
      }
      i.value = !0;
    }
    return i.value = n.isInitTriggerSelect, n.modelValue === "" && (i.value = !0), onMounted(() => {
      J();
    }), ($, U) => {
      const ne = resolveComponent("el-checkbox"), se = resolveComponent("el-input"), Pe = resolveComponent("el-empty"), ct = resolveComponent("els-option"), Ot = resolveComponent("els-option-group"), tt = resolveComponent("el-checkbox-group");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(G),
        style: normalizeStyle(Z)
      }, [
        $.showCheckall || $.filterable ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
          $.showCheckall ? (openBlock(), createBlock(ne, {
            key: 0,
            indeterminate: O.value,
            modelValue: T.value,
            "onUpdate:modelValue": U[0] || (U[0] = (be) => T.value = be),
            onChange: Y
          }, {
            default: withCtx(() => [
              createTextVNode("全选")
            ]),
            _: 1
          }, 8, ["indeterminate", "modelValue"])) : createCommentVNode("", !0),
          $.showInverse ? (openBlock(), createBlock(ne, {
            key: 1,
            modelValue: A.value,
            "onUpdate:modelValue": U[1] || (U[1] = (be) => A.value = be),
            onChange: B
          }, {
            default: withCtx(() => [
              createTextVNode("反选")
            ]),
            _: 1
          }, 8, ["modelValue"])) : createCommentVNode("", !0),
          $.filterable ? (openBlock(), createBlock(se, {
            key: 2,
            style: normalizeStyle([{ width: "200px" }, $.showCheckall ? "margin-left:15px;" : ""]),
            "suffix-icon": "Search",
            placeholder: "输入关键字进行过滤",
            modelValue: I.value,
            "onUpdate:modelValue": U[2] || (U[2] = (be) => I.value = be),
            clearable: ""
          }, null, 8, ["style", "modelValue"])) : createCommentVNode("", !0)
        ])) : createCommentVNode("", !0),
        !$.url && (!$.data || !$.data.length) && !z.value.length ? (openBlock(), createBlock(ne, mergeProps({
          key: 1,
          ref: "els-checkbox",
          modelValue: m.value,
          "onUpdate:modelValue": U[3] || (U[3] = (be) => m.value = be)
        }, unref(a)), {
          default: withCtx(() => [
            renderSlot($.$slots, "default", {}, void 0, !0)
          ]),
          _: 3
        }, 16, ["modelValue"])) : (openBlock(), createBlock(tt, mergeProps({
          key: 2,
          modelValue: p.value,
          "onUpdate:modelValue": U[4] || (U[4] = (be) => p.value = be),
          ref: "els-checkbox-group"
        }, unref(a)), {
          default: withCtx(() => [
            renderSlot($.$slots, "extra", {}, void 0, !0),
            I.value && !z.value.length ? (openBlock(), createBlock(Pe, { key: 0 })) : ($.url || $.data && $.data.length > 0 || b.length) && !$.groupField ? (openBlock(!0), createElementBlock(Fragment, { key: 1 }, renderList(b, (be, ee) => (openBlock(), createBlock(ct, {
              key: ee,
              value: be[$.valueField],
              disabled: be[$.disabledField] === !0,
              onClick: (ge) => le(be)
            }, {
              default: withCtx(() => [
                renderSlot($.$slots, "default", { item: be }, () => [
                  createTextVNode(toDisplayString(be[$.labelField]), 1)
                ], !0)
              ]),
              _: 2
            }, 1032, ["value", "disabled", "onClick"]))), 128)) : ($.url || $.data && $.data.length > 0) && $.groupField ? (openBlock(!0), createElementBlock(Fragment, { key: 2 }, renderList(unref(lessCom).dtGroupBy(b, $.groupField), (be) => (openBlock(), createBlock(Ot, {
              label: be.key ?? "未分组"
            }, {
              default: withCtx(() => [
                (openBlock(!0), createElementBlock(Fragment, null, renderList(be.value, (ee, ge) => (openBlock(), createBlock(ct, {
                  key: ge,
                  value: ee[$.valueField],
                  disabled: ee[$.disabledField] === !0,
                  onClick: (xe) => le(ee)
                }, {
                  default: withCtx(() => [
                    renderSlot($.$slots, "default", { item: ee }, () => [
                      createTextVNode(toDisplayString(ee[$.labelField]), 1)
                    ], !0)
                  ]),
                  _: 2
                }, 1032, ["value", "disabled", "onClick"]))), 128))
              ]),
              _: 2
            }, 1032, ["label"]))), 256)) : renderSlot($.$slots, "default", { key: 3 }, void 0, !0),
            (openBlock(!0), createElementBlock(Fragment, null, renderList(_, (be) => (openBlock(), createBlock(ct, {
              key: be[$.valueField],
              value: be[$.valueField],
              onClick: (ee) => le(be)
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(be[$.labelField]), 1)
              ]),
              _: 2
            }, 1032, ["value", "onClick"]))), 128))
          ]),
          _: 3
        }, 16, ["modelValue"]))
      ], 6);
    };
  }
}), Checkbox_vue_vue_type_style_index_0_scoped_6f7fed81_lang = "", ElsCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-6f7fed81"]]);
ElsCheckbox.install = (e) => {
  e.component(ElsCheckbox.__name, ElsCheckbox);
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  name: "ElsCheckboxButton",
  __name: "CheckboxButton",
  props: {
    type: { default: "checkboxbutton" },
    modelValue: {},
    width: {},
    height: {},
    optionWidth: {},
    labelField: { default: "label" },
    valueField: { default: "value" },
    disabledField: { default: "disabled" },
    noExistOptionPrefix: { default: "未知选项" },
    hasNoExistOption: { type: Boolean, default: !0 },
    url: {},
    data: {},
    groupField: {},
    filterable: { type: Boolean },
    showCheckall: { type: Boolean },
    showInverse: { type: Boolean },
    resetValueByChangeData: { type: Boolean, default: !0 },
    isInitTriggerSelect: { type: Boolean },
    valueType: {},
    fieldName: {},
    label: {},
    require: { type: Boolean },
    requireMessage: {},
    validationExpression: {},
    validationMessage: {},
    validationMethod: {},
    validationTrigger: {},
    hasFormItem: { type: Boolean },
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = useSlots(), i = ref("");
    i.value = n.modelValue ?? "", watch(() => n.modelValue, (u) => {
      i.value = u ?? "";
    }), watch(i, (u) => {
      t("update:modelValue", u);
    });
    const s = [];
    for (const u in a)
      s.push(u);
    return (u, f) => (openBlock(), createBlock(ElsCheckbox, mergeProps({
      modelValue: i.value,
      "onUpdate:modelValue": f[0] || (f[0] = (p) => i.value = p)
    }, n), {
      default: withCtx(() => [
        (openBlock(), createElementBlock(Fragment, null, renderList(s, (p) => renderSlot(u.$slots, p)), 64))
      ]),
      _: 3
    }, 16, ["modelValue"]));
  }
});
_sfc_main$g.install = (e) => {
  e.component(_sfc_main$g.__name, _sfc_main$g);
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  name: "ElsRadioButton",
  __name: "RadioButton",
  props: {
    type: { default: "button" },
    modelValue: {},
    width: {},
    height: {},
    optionWidth: {},
    labelField: { default: "label" },
    valueField: { default: "value" },
    noExistOptionPrefix: { default: "未知选项" },
    filterable: { type: Boolean },
    hasNoExistOption: { type: Boolean, default: !0 },
    disabledField: { default: "disabled" },
    selectIndex: { default: -1 },
    url: {},
    groupField: {},
    data: {},
    isInitTriggerSelect: { type: Boolean, default: !0 },
    resetValueByChangeData: { type: Boolean, default: !0 },
    valueType: {},
    onChange: {},
    fieldName: {},
    label: {},
    require: { type: Boolean },
    requireMessage: {},
    validationExpression: {},
    validationMessage: {},
    validationMethod: {},
    validationTrigger: {},
    hasFormItem: { type: Boolean },
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = useSlots(), i = ref("");
    i.value = n.modelValue, watch(() => n.modelValue, (u) => {
      i.value = u;
    }), watch(i, (u) => {
      t("update:modelValue", u);
    });
    const s = [];
    for (const u in a)
      s.push(u);
    return (u, f) => (openBlock(), createBlock(ElsRadio, mergeProps({
      modelValue: i.value,
      "onUpdate:modelValue": f[0] || (f[0] = (p) => i.value = p)
    }, n), {
      default: withCtx(() => [
        (openBlock(), createElementBlock(Fragment, null, renderList(s, (p) => renderSlot(u.$slots, p)), 64))
      ]),
      _: 3
    }, 16, ["modelValue"]));
  }
});
_sfc_main$f.install = (e) => {
  e.component(_sfc_main$f.__name, _sfc_main$f);
};
_sfc_main$k.install = (e) => {
  e.component(_sfc_main$k.__name, _sfc_main$k);
};
OptionGroup.install = (e) => {
  e.component(OptionGroup.__name, OptionGroup);
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  name: "ElsRow",
  __name: "Row",
  setup(e) {
    const t = useSlots(), n = ref({ count: 24 });
    provide("getSpan", a), provide("colData", n);
    function a() {
      if (t.default) {
        if (t.default().length == 1 && t.default()[0].type.toString() == "Symbol(Fragment)") {
          let s = t.default()[0].children.filter((u) => u.type && u.type.name == "ElsCol");
          return n.value.count = s.length, 24 / s.length;
        }
        let i = t.default().filter((s) => s.type && s.type.name == "ElsCol");
        return n.value.count = i.length, 24 / i.length;
      }
      return 24;
    }
    return (i, s) => {
      const u = resolveComponent("el-row");
      return openBlock(), createBlock(u, null, {
        default: withCtx(() => [
          renderSlot(i.$slots, "default")
        ]),
        _: 3
      });
    };
  }
});
_sfc_main$e.install = (e) => {
  e.component(_sfc_main$e.__name, _sfc_main$e);
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  name: "ElsCol",
  __name: "Col",
  props: {
    span: { default: 24 }
  },
  setup(e) {
    const t = e, n = useSlots(), a = ref(24), i = inject("getSpan"), s = inject("colData"), u = inject("formData");
    return watch(s, (f) => {
      a.value = t.span, t.span == 24 && (a.value = 24 / f.count);
    }, { deep: !0 }), onMounted(() => {
      a.value = t.span, t.span == 24 && i && (a.value = i());
    }), (f, p) => {
      const m = resolveComponent("ElsFormItem"), b = resolveComponent("el-col");
      return openBlock(), createBlock(b, { span: a.value }, {
        default: withCtx(() => [
          unref(u) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createCommentVNode("", !0),
            unref(n).default ? renderSlot(f.$slots, "edit", { key: 1 }, () => [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(n).default(), (_) => {
                var E, w;
                return openBlock(), createElementBlock(Fragment, null, [
                  !_.type.name || _.type.name === "ElFormItem" || ((E = _.type) == null ? void 0 : E.name) === "ElsFormItem" || _.props && _.props.hasFormItem === !1 ? (openBlock(), createBlock(resolveDynamicComponent(() => _), { key: 0 })) : (openBlock(), createBlock(m, mergeProps({
                    key: 1,
                    validationTrigger: (w = _.type.props.validationTrigger) == null ? void 0 : w.default
                  }, _.props ?? {}), {
                    default: withCtx(({ key: A }) => [
                      _.props.hasOwnProperty("modelValue") ? (openBlock(), createBlock(resolveDynamicComponent(_), { key: 0 })) : unref(u) ? (openBlock(), createBlock(resolveDynamicComponent(_), {
                        key: 1,
                        modelValue: unref(u)[A],
                        "onUpdate:modelValue": (T) => unref(u)[A] = T
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock(resolveDynamicComponent(_), { key: 2 }))
                    ]),
                    _: 2
                  }, 1040, ["validationTrigger"]))
                ], 64);
              }), 256))
            ]) : createCommentVNode("", !0)
          ], 64)) : renderSlot(f.$slots, "default", { key: 1 })
        ]),
        _: 3
      }, 8, ["span"]);
    };
  }
});
_sfc_main$d.install = (e) => {
  e.component(_sfc_main$d.__name, _sfc_main$d);
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  name: "ElsFormItem",
  __name: "FormItem",
  props: {
    spacer: {},
    spaceWrap: { type: Boolean },
    spaceSize: {},
    fieldName: {},
    label: {},
    require: { type: Boolean },
    requireMessage: {},
    validationExpression: {},
    validationMessage: {},
    validationMethod: { type: Function },
    validationTrigger: {},
    hasFormItem: { type: Boolean },
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean }
  },
  setup(e) {
    const t = e, n = useAttrs(), a = ref(), i = inject("setQueryData", () => {
    }), s = inject("getQueryData", () => {
    }), u = inject("formType", ""), f = useSlots();
    function p() {
      a.value && a.value.clearValidate();
      let w = [], A = t.label ? t.label : "";
      return n.rules ? n.rules : (t.require && w.push({ required: !0, message: t.requireMessage ? t.requireMessage : (t.validationTrigger == "change" ? "请选择" : "请输入") + A, trigger: t.validationTrigger }), t.validationExpression && w.push({ pattern: new RegExp(t.validationExpression), message: t.requireMessage ? t.requireMessage : A + "格式错误" }), t.validationMethod && w.push({ validator: t.validationMethod, trigger: t.validationTrigger }), w);
    }
    function m() {
      if (s) {
        let w = t.fieldName ?? lessCom.Guid32();
        const A = s();
        return A && A[w] && (w += "_" + lessCom.Guid32()), {
          key: w,
          fieldName: t == null ? void 0 : t.fieldName,
          method: t.queryMethod,
          dataType: t.queryDataType,
          isAroundComma: t.queryAroundComma,
          isAutoQuery: t.queryAutoReadData,
          Value: t.queryDefaultValue
        };
      }
      return null;
    }
    const b = computed(() => p());
    let _ = t.fieldName, E = reactive({});
    return u == "Query" && i && (E = m(), E && i(E), _ = E == null ? void 0 : E.key), (w, A) => {
      const T = resolveComponent("el-form-item");
      return openBlock(), createBlock(T, {
        ref_key: "formItem",
        ref: a,
        label: w.label,
        prop: unref(_),
        rules: b.value
      }, createSlots({
        default: withCtx(() => [
          w.spacer ? (openBlock(), createBlock(unref(ElSpace), {
            key: 0,
            wrap: w.spaceWrap,
            spacer: w.spacer,
            size: w.spaceSize
          }, {
            default: withCtx(() => [
              renderSlot(w.$slots, "default")
            ]),
            _: 3
          }, 8, ["wrap", "spacer", "size"])) : createCommentVNode("", !0),
          renderSlot(w.$slots, "default", normalizeProps(guardReactiveProps({ key: unref(_) }))),
          unref(f).error ? renderSlot(w.$slots, "error", { key: 1 }) : createCommentVNode("", !0)
        ]),
        _: 2
      }, [
        unref(f).label ? {
          name: "label",
          fn: withCtx(() => [
            renderSlot(w.$slots, "label")
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["label", "prop", "rules"]);
    };
  }
}), FormItem_vue_vue_type_style_index_0_lang = "", _sfc_main$b = /* @__PURE__ */ defineComponent({
  name: "ElsForm",
  __name: "Form",
  props: {
    type: {},
    modelValue: {},
    formName: {},
    queryTableRef: {},
    queryAutoReadData: { type: Boolean },
    queryParameterType: { default: "Query" },
    labelWidth: { default: "100" }
  },
  setup(e, { expose: t }) {
    const n = e, a = useSlots(), i = ref(), s = ref();
    let u = n.modelValue;
    provide("labelWidth", n.labelWidth), provide("formData", u), onMounted(() => {
      console.info("加载完成");
    }), onBeforeUnmount(() => {
      console.info("卸载");
    });
    function f() {
      nextTick(() => {
        i.value.clearValidate();
      });
    }
    function p() {
      return new Promise((_) => {
        i.value ? i.value.validate().then((E) => {
          _(E);
        }).catch((E) => {
          console.log(E), _(!1);
        }) : _(!0);
      });
    }
    function m(_) {
      return i.value.validateField(_);
    }
    function b() {
      s.value.$el.trigger("click");
    }
    return t({
      clearValidate: f,
      validateField: m,
      validate: p,
      handleSubmitButton: b
    }), (_, E) => (openBlock(), createBlock(unref(ElForm), {
      model: unref(u),
      ref_key: "dataForm",
      ref: i,
      onsubmit: "return false;",
      "label-width": _.labelWidth
    }, {
      default: withCtx(() => [
        createCommentVNode("", !0),
        unref(a).default ? renderSlot(_.$slots, "edit", { key: 1 }, () => [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(a).default(), (w) => {
            var A, T;
            return openBlock(), createElementBlock(Fragment, null, [
              !w.type.name || w.type.name === "ElFormItem" || ((A = w.type) == null ? void 0 : A.name) === "ElsFormItem" || !w.type.props || !w.type.props.hasFormItem || w.props && w.props.hasFormItem === !1 ? (openBlock(), createBlock(resolveDynamicComponent(() => w), { key: 0 })) : (openBlock(), createBlock(_sfc_main$c, mergeProps({
                key: 1,
                validationTrigger: (T = w.type.props.validationTrigger) == null ? void 0 : T.default
              }, w.props ?? {}), {
                default: withCtx(({ key: O }) => [
                  w.props.hasOwnProperty("modelValue") ? (openBlock(), createBlock(resolveDynamicComponent(w), { key: 0 })) : unref(u) ? (openBlock(), createBlock(resolveDynamicComponent(w), {
                    key: 1,
                    modelValue: unref(u)[O],
                    "onUpdate:modelValue": (I) => unref(u)[O] = I
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock(resolveDynamicComponent(w), { key: 2 }))
                ]),
                _: 2
              }, 1040, ["validationTrigger"]))
            ], 64);
          }), 256))
        ]) : createCommentVNode("", !0)
      ]),
      _: 3
    }, 8, ["model", "label-width"]));
  }
});
_sfc_main$b.install = (e) => {
  e.component(_sfc_main$b.__name, _sfc_main$b);
};
var lodash$1 = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
lodash$1.exports;
(function(e, t) {
  (function() {
    var n, a = "4.17.21", i = 200, s = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", u = "Expected a function", f = "Invalid `variable` option passed into `_.template`", p = "__lodash_hash_undefined__", m = 500, b = "__lodash_placeholder__", _ = 1, E = 2, w = 4, A = 1, T = 2, O = 1, I = 2, H = 4, L = 8, z = 16, G = 32, Z = 64, J = 128, x = 256, q = 512, B = 30, Y = "...", oe = 800, R = 16, W = 1, te = 2, le = 3, fe = 1 / 0, $ = 9007199254740991, U = 17976931348623157e292, ne = 0 / 0, se = 4294967295, Pe = se - 1, ct = se >>> 1, Ot = [
      ["ary", J],
      ["bind", O],
      ["bindKey", I],
      ["curry", L],
      ["curryRight", z],
      ["flip", q],
      ["partial", G],
      ["partialRight", Z],
      ["rearg", x]
    ], tt = "[object Arguments]", be = "[object Array]", ee = "[object AsyncFunction]", ge = "[object Boolean]", xe = "[object Date]", Ie = "[object DOMException]", Ue = "[object Error]", ft = "[object Function]", zo = "[object GeneratorFunction]", dt = "[object Map]", pn = "[object Number]", El = "[object Null]", St = "[object Object]", qo = "[object Promise]", wl = "[object Proxy]", hn = "[object RegExp]", pt = "[object Set]", gn = "[object String]", Pn = "[object Symbol]", Cl = "[object Undefined]", mn = "[object WeakMap]", Tl = "[object WeakSet]", vn = "[object ArrayBuffer]", Qt = "[object DataView]", Er = "[object Float32Array]", wr = "[object Float64Array]", Cr = "[object Int8Array]", Tr = "[object Int16Array]", xr = "[object Int32Array]", Dr = "[object Uint8Array]", Ar = "[object Uint8ClampedArray]", kr = "[object Uint16Array]", $r = "[object Uint32Array]", xl = /\b__p \+= '';/g, Dl = /\b(__p \+=) '' \+/g, Al = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Wo = /&(?:amp|lt|gt|quot|#39);/g, Ko = /[&<>"']/g, kl = RegExp(Wo.source), $l = RegExp(Ko.source), Ol = /<%-([\s\S]+?)%>/g, Il = /<%([\s\S]+?)%>/g, Go = /<%=([\s\S]+?)%>/g, Pl = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Bl = /^\w*$/, Fl = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Or = /[\\^$.*+?()[\]{}|]/g, Rl = RegExp(Or.source), Ir = /^\s+/, Nl = /\s/, Ml = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Ll = /\{\n\/\* \[wrapped with (.+)\] \*/, Vl = /,? & /, Ul = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Hl = /[()=,{}\[\]\/\s]/, jl = /\\(\\)?/g, zl = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Yo = /\w*$/, ql = /^[-+]0x[0-9a-f]+$/i, Wl = /^0b[01]+$/i, Kl = /^\[object .+?Constructor\]$/, Gl = /^0o[0-7]+$/i, Yl = /^(?:0|[1-9]\d*)$/, Ql = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Bn = /($^)/, Jl = /['\n\r\u2028\u2029\\]/g, Fn = "\\ud800-\\udfff", Xl = "\\u0300-\\u036f", Zl = "\\ufe20-\\ufe2f", es = "\\u20d0-\\u20ff", Qo = Xl + Zl + es, Jo = "\\u2700-\\u27bf", Xo = "a-z\\xdf-\\xf6\\xf8-\\xff", ts = "\\xac\\xb1\\xd7\\xf7", ns = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rs = "\\u2000-\\u206f", os = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Zo = "A-Z\\xc0-\\xd6\\xd8-\\xde", ea = "\\ufe0e\\ufe0f", ta = ts + ns + rs + os, Pr = "['’]", as = "[" + Fn + "]", na = "[" + ta + "]", Rn = "[" + Qo + "]", ra = "\\d+", is = "[" + Jo + "]", oa = "[" + Xo + "]", aa = "[^" + Fn + ta + ra + Jo + Xo + Zo + "]", Br = "\\ud83c[\\udffb-\\udfff]", ls = "(?:" + Rn + "|" + Br + ")", ia = "[^" + Fn + "]", Fr = "(?:\\ud83c[\\udde6-\\uddff]){2}", Rr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Jt = "[" + Zo + "]", la = "\\u200d", sa = "(?:" + oa + "|" + aa + ")", ss = "(?:" + Jt + "|" + aa + ")", ua = "(?:" + Pr + "(?:d|ll|m|re|s|t|ve))?", ca = "(?:" + Pr + "(?:D|LL|M|RE|S|T|VE))?", fa = ls + "?", da = "[" + ea + "]?", us = "(?:" + la + "(?:" + [ia, Fr, Rr].join("|") + ")" + da + fa + ")*", cs = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", fs = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", pa = da + fa + us, ds = "(?:" + [is, Fr, Rr].join("|") + ")" + pa, ps = "(?:" + [ia + Rn + "?", Rn, Fr, Rr, as].join("|") + ")", hs = RegExp(Pr, "g"), gs = RegExp(Rn, "g"), Nr = RegExp(Br + "(?=" + Br + ")|" + ps + pa, "g"), ms = RegExp([
      Jt + "?" + oa + "+" + ua + "(?=" + [na, Jt, "$"].join("|") + ")",
      ss + "+" + ca + "(?=" + [na, Jt + sa, "$"].join("|") + ")",
      Jt + "?" + sa + "+" + ua,
      Jt + "+" + ca,
      fs,
      cs,
      ra,
      ds
    ].join("|"), "g"), vs = RegExp("[" + la + Fn + Qo + ea + "]"), ys = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, bs = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], _s = -1, Te = {};
    Te[Er] = Te[wr] = Te[Cr] = Te[Tr] = Te[xr] = Te[Dr] = Te[Ar] = Te[kr] = Te[$r] = !0, Te[tt] = Te[be] = Te[vn] = Te[ge] = Te[Qt] = Te[xe] = Te[Ue] = Te[ft] = Te[dt] = Te[pn] = Te[St] = Te[hn] = Te[pt] = Te[gn] = Te[mn] = !1;
    var Ce = {};
    Ce[tt] = Ce[be] = Ce[vn] = Ce[Qt] = Ce[ge] = Ce[xe] = Ce[Er] = Ce[wr] = Ce[Cr] = Ce[Tr] = Ce[xr] = Ce[dt] = Ce[pn] = Ce[St] = Ce[hn] = Ce[pt] = Ce[gn] = Ce[Pn] = Ce[Dr] = Ce[Ar] = Ce[kr] = Ce[$r] = !0, Ce[Ue] = Ce[ft] = Ce[mn] = !1;
    var Ss = {
      // Latin-1 Supplement block.
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      // Latin Extended-A block.
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, Es = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, ws = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, Cs = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, Ts = parseFloat, xs = parseInt, ha = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal, Ds = typeof self == "object" && self && self.Object === Object && self, Ne = ha || Ds || Function("return this")(), Mr = t && !t.nodeType && t, Ut = Mr && !0 && e && !e.nodeType && e, ga = Ut && Ut.exports === Mr, Lr = ga && ha.process, nt = function() {
      try {
        var D = Ut && Ut.require && Ut.require("util").types;
        return D || Lr && Lr.binding && Lr.binding("util");
      } catch {
      }
    }(), ma = nt && nt.isArrayBuffer, va = nt && nt.isDate, ya = nt && nt.isMap, ba = nt && nt.isRegExp, Sa = nt && nt.isSet, Ea = nt && nt.isTypedArray;
    function Ye(D, F, P) {
      switch (P.length) {
        case 0:
          return D.call(F);
        case 1:
          return D.call(F, P[0]);
        case 2:
          return D.call(F, P[0], P[1]);
        case 3:
          return D.call(F, P[0], P[1], P[2]);
      }
      return D.apply(F, P);
    }
    function As(D, F, P, Q) {
      for (var ue = -1, _e = D == null ? 0 : D.length; ++ue < _e; ) {
        var Be = D[ue];
        F(Q, Be, P(Be), D);
      }
      return Q;
    }
    function rt(D, F) {
      for (var P = -1, Q = D == null ? 0 : D.length; ++P < Q && F(D[P], P, D) !== !1; )
        ;
      return D;
    }
    function ks(D, F) {
      for (var P = D == null ? 0 : D.length; P-- && F(D[P], P, D) !== !1; )
        ;
      return D;
    }
    function wa(D, F) {
      for (var P = -1, Q = D == null ? 0 : D.length; ++P < Q; )
        if (!F(D[P], P, D))
          return !1;
      return !0;
    }
    function It(D, F) {
      for (var P = -1, Q = D == null ? 0 : D.length, ue = 0, _e = []; ++P < Q; ) {
        var Be = D[P];
        F(Be, P, D) && (_e[ue++] = Be);
      }
      return _e;
    }
    function Nn(D, F) {
      var P = D == null ? 0 : D.length;
      return !!P && Xt(D, F, 0) > -1;
    }
    function Vr(D, F, P) {
      for (var Q = -1, ue = D == null ? 0 : D.length; ++Q < ue; )
        if (P(F, D[Q]))
          return !0;
      return !1;
    }
    function De(D, F) {
      for (var P = -1, Q = D == null ? 0 : D.length, ue = Array(Q); ++P < Q; )
        ue[P] = F(D[P], P, D);
      return ue;
    }
    function Pt(D, F) {
      for (var P = -1, Q = F.length, ue = D.length; ++P < Q; )
        D[ue + P] = F[P];
      return D;
    }
    function Ur(D, F, P, Q) {
      var ue = -1, _e = D == null ? 0 : D.length;
      for (Q && _e && (P = D[++ue]); ++ue < _e; )
        P = F(P, D[ue], ue, D);
      return P;
    }
    function $s(D, F, P, Q) {
      var ue = D == null ? 0 : D.length;
      for (Q && ue && (P = D[--ue]); ue--; )
        P = F(P, D[ue], ue, D);
      return P;
    }
    function Hr(D, F) {
      for (var P = -1, Q = D == null ? 0 : D.length; ++P < Q; )
        if (F(D[P], P, D))
          return !0;
      return !1;
    }
    var Os = jr("length");
    function Is(D) {
      return D.split("");
    }
    function Ps(D) {
      return D.match(Ul) || [];
    }
    function Ca(D, F, P) {
      var Q;
      return P(D, function(ue, _e, Be) {
        if (F(ue, _e, Be))
          return Q = _e, !1;
      }), Q;
    }
    function Mn(D, F, P, Q) {
      for (var ue = D.length, _e = P + (Q ? 1 : -1); Q ? _e-- : ++_e < ue; )
        if (F(D[_e], _e, D))
          return _e;
      return -1;
    }
    function Xt(D, F, P) {
      return F === F ? qs(D, F, P) : Mn(D, Ta, P);
    }
    function Bs(D, F, P, Q) {
      for (var ue = P - 1, _e = D.length; ++ue < _e; )
        if (Q(D[ue], F))
          return ue;
      return -1;
    }
    function Ta(D) {
      return D !== D;
    }
    function xa(D, F) {
      var P = D == null ? 0 : D.length;
      return P ? qr(D, F) / P : ne;
    }
    function jr(D) {
      return function(F) {
        return F == null ? n : F[D];
      };
    }
    function zr(D) {
      return function(F) {
        return D == null ? n : D[F];
      };
    }
    function Da(D, F, P, Q, ue) {
      return ue(D, function(_e, Be, we) {
        P = Q ? (Q = !1, _e) : F(P, _e, Be, we);
      }), P;
    }
    function Fs(D, F) {
      var P = D.length;
      for (D.sort(F); P--; )
        D[P] = D[P].value;
      return D;
    }
    function qr(D, F) {
      for (var P, Q = -1, ue = D.length; ++Q < ue; ) {
        var _e = F(D[Q]);
        _e !== n && (P = P === n ? _e : P + _e);
      }
      return P;
    }
    function Wr(D, F) {
      for (var P = -1, Q = Array(D); ++P < D; )
        Q[P] = F(P);
      return Q;
    }
    function Rs(D, F) {
      return De(F, function(P) {
        return [P, D[P]];
      });
    }
    function Aa(D) {
      return D && D.slice(0, Ia(D) + 1).replace(Ir, "");
    }
    function Qe(D) {
      return function(F) {
        return D(F);
      };
    }
    function Kr(D, F) {
      return De(F, function(P) {
        return D[P];
      });
    }
    function yn(D, F) {
      return D.has(F);
    }
    function ka(D, F) {
      for (var P = -1, Q = D.length; ++P < Q && Xt(F, D[P], 0) > -1; )
        ;
      return P;
    }
    function $a(D, F) {
      for (var P = D.length; P-- && Xt(F, D[P], 0) > -1; )
        ;
      return P;
    }
    function Ns(D, F) {
      for (var P = D.length, Q = 0; P--; )
        D[P] === F && ++Q;
      return Q;
    }
    var Ms = zr(Ss), Ls = zr(Es);
    function Vs(D) {
      return "\\" + Cs[D];
    }
    function Us(D, F) {
      return D == null ? n : D[F];
    }
    function Zt(D) {
      return vs.test(D);
    }
    function Hs(D) {
      return ys.test(D);
    }
    function js(D) {
      for (var F, P = []; !(F = D.next()).done; )
        P.push(F.value);
      return P;
    }
    function Gr(D) {
      var F = -1, P = Array(D.size);
      return D.forEach(function(Q, ue) {
        P[++F] = [ue, Q];
      }), P;
    }
    function Oa(D, F) {
      return function(P) {
        return D(F(P));
      };
    }
    function Bt(D, F) {
      for (var P = -1, Q = D.length, ue = 0, _e = []; ++P < Q; ) {
        var Be = D[P];
        (Be === F || Be === b) && (D[P] = b, _e[ue++] = P);
      }
      return _e;
    }
    function Ln(D) {
      var F = -1, P = Array(D.size);
      return D.forEach(function(Q) {
        P[++F] = Q;
      }), P;
    }
    function zs(D) {
      var F = -1, P = Array(D.size);
      return D.forEach(function(Q) {
        P[++F] = [Q, Q];
      }), P;
    }
    function qs(D, F, P) {
      for (var Q = P - 1, ue = D.length; ++Q < ue; )
        if (D[Q] === F)
          return Q;
      return -1;
    }
    function Ws(D, F, P) {
      for (var Q = P + 1; Q--; )
        if (D[Q] === F)
          return Q;
      return Q;
    }
    function en(D) {
      return Zt(D) ? Gs(D) : Os(D);
    }
    function ht(D) {
      return Zt(D) ? Ys(D) : Is(D);
    }
    function Ia(D) {
      for (var F = D.length; F-- && Nl.test(D.charAt(F)); )
        ;
      return F;
    }
    var Ks = zr(ws);
    function Gs(D) {
      for (var F = Nr.lastIndex = 0; Nr.test(D); )
        ++F;
      return F;
    }
    function Ys(D) {
      return D.match(Nr) || [];
    }
    function Qs(D) {
      return D.match(ms) || [];
    }
    var Js = function D(F) {
      F = F == null ? Ne : tn.defaults(Ne.Object(), F, tn.pick(Ne, bs));
      var P = F.Array, Q = F.Date, ue = F.Error, _e = F.Function, Be = F.Math, we = F.Object, Yr = F.RegExp, Xs = F.String, ot = F.TypeError, Vn = P.prototype, Zs = _e.prototype, nn = we.prototype, Un = F["__core-js_shared__"], Hn = Zs.toString, Ee = nn.hasOwnProperty, eu = 0, Pa = function() {
        var r = /[^.]+$/.exec(Un && Un.keys && Un.keys.IE_PROTO || "");
        return r ? "Symbol(src)_1." + r : "";
      }(), jn = nn.toString, tu = Hn.call(we), nu = Ne._, ru = Yr(
        "^" + Hn.call(Ee).replace(Or, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), zn = ga ? F.Buffer : n, Ft = F.Symbol, qn = F.Uint8Array, Ba = zn ? zn.allocUnsafe : n, Wn = Oa(we.getPrototypeOf, we), Fa = we.create, Ra = nn.propertyIsEnumerable, Kn = Vn.splice, Na = Ft ? Ft.isConcatSpreadable : n, bn = Ft ? Ft.iterator : n, Ht = Ft ? Ft.toStringTag : n, Gn = function() {
        try {
          var r = Kt(we, "defineProperty");
          return r({}, "", {}), r;
        } catch {
        }
      }(), ou = F.clearTimeout !== Ne.clearTimeout && F.clearTimeout, au = Q && Q.now !== Ne.Date.now && Q.now, iu = F.setTimeout !== Ne.setTimeout && F.setTimeout, Yn = Be.ceil, Qn = Be.floor, Qr = we.getOwnPropertySymbols, lu = zn ? zn.isBuffer : n, Ma = F.isFinite, su = Vn.join, uu = Oa(we.keys, we), Fe = Be.max, Le = Be.min, cu = Q.now, fu = F.parseInt, La = Be.random, du = Vn.reverse, Jr = Kt(F, "DataView"), _n = Kt(F, "Map"), Xr = Kt(F, "Promise"), rn = Kt(F, "Set"), Sn = Kt(F, "WeakMap"), En = Kt(we, "create"), Jn = Sn && new Sn(), an = {}, pu = Gt(Jr), hu = Gt(_n), gu = Gt(Xr), mu = Gt(rn), vu = Gt(Sn), Xn = Ft ? Ft.prototype : n, wn = Xn ? Xn.valueOf : n, Va = Xn ? Xn.toString : n;
      function g(r) {
        if (ke(r) && !ce(r) && !(r instanceof ve)) {
          if (r instanceof at)
            return r;
          if (Ee.call(r, "__wrapped__"))
            return Ui(r);
        }
        return new at(r);
      }
      var ln = function() {
        function r() {
        }
        return function(o) {
          if (!Ae(o))
            return {};
          if (Fa)
            return Fa(o);
          r.prototype = o;
          var l = new r();
          return r.prototype = n, l;
        };
      }();
      function Zn() {
      }
      function at(r, o) {
        this.__wrapped__ = r, this.__actions__ = [], this.__chain__ = !!o, this.__index__ = 0, this.__values__ = n;
      }
      g.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: Ol,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: Il,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: Go,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: g
        }
      }, g.prototype = Zn.prototype, g.prototype.constructor = g, at.prototype = ln(Zn.prototype), at.prototype.constructor = at;
      function ve(r) {
        this.__wrapped__ = r, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = se, this.__views__ = [];
      }
      function yu() {
        var r = new ve(this.__wrapped__);
        return r.__actions__ = qe(this.__actions__), r.__dir__ = this.__dir__, r.__filtered__ = this.__filtered__, r.__iteratees__ = qe(this.__iteratees__), r.__takeCount__ = this.__takeCount__, r.__views__ = qe(this.__views__), r;
      }
      function bu() {
        if (this.__filtered__) {
          var r = new ve(this);
          r.__dir__ = -1, r.__filtered__ = !0;
        } else
          r = this.clone(), r.__dir__ *= -1;
        return r;
      }
      function _u() {
        var r = this.__wrapped__.value(), o = this.__dir__, l = ce(r), c = o < 0, d = l ? r.length : 0, y = Ic(0, d, this.__views__), S = y.start, C = y.end, k = C - S, N = c ? C : S - 1, M = this.__iteratees__, V = M.length, K = 0, X = Le(k, this.__takeCount__);
        if (!l || !c && d == k && X == k)
          return ci(r, this.__actions__);
        var ae = [];
        e:
          for (; k-- && K < X; ) {
            N += o;
            for (var pe = -1, ie = r[N]; ++pe < V; ) {
              var me = M[pe], ye = me.iteratee, Ze = me.type, ze = ye(ie);
              if (Ze == te)
                ie = ze;
              else if (!ze) {
                if (Ze == W)
                  continue e;
                break e;
              }
            }
            ae[K++] = ie;
          }
        return ae;
      }
      ve.prototype = ln(Zn.prototype), ve.prototype.constructor = ve;
      function jt(r) {
        var o = -1, l = r == null ? 0 : r.length;
        for (this.clear(); ++o < l; ) {
          var c = r[o];
          this.set(c[0], c[1]);
        }
      }
      function Su() {
        this.__data__ = En ? En(null) : {}, this.size = 0;
      }
      function Eu(r) {
        var o = this.has(r) && delete this.__data__[r];
        return this.size -= o ? 1 : 0, o;
      }
      function wu(r) {
        var o = this.__data__;
        if (En) {
          var l = o[r];
          return l === p ? n : l;
        }
        return Ee.call(o, r) ? o[r] : n;
      }
      function Cu(r) {
        var o = this.__data__;
        return En ? o[r] !== n : Ee.call(o, r);
      }
      function Tu(r, o) {
        var l = this.__data__;
        return this.size += this.has(r) ? 0 : 1, l[r] = En && o === n ? p : o, this;
      }
      jt.prototype.clear = Su, jt.prototype.delete = Eu, jt.prototype.get = wu, jt.prototype.has = Cu, jt.prototype.set = Tu;
      function Et(r) {
        var o = -1, l = r == null ? 0 : r.length;
        for (this.clear(); ++o < l; ) {
          var c = r[o];
          this.set(c[0], c[1]);
        }
      }
      function xu() {
        this.__data__ = [], this.size = 0;
      }
      function Du(r) {
        var o = this.__data__, l = er(o, r);
        if (l < 0)
          return !1;
        var c = o.length - 1;
        return l == c ? o.pop() : Kn.call(o, l, 1), --this.size, !0;
      }
      function Au(r) {
        var o = this.__data__, l = er(o, r);
        return l < 0 ? n : o[l][1];
      }
      function ku(r) {
        return er(this.__data__, r) > -1;
      }
      function $u(r, o) {
        var l = this.__data__, c = er(l, r);
        return c < 0 ? (++this.size, l.push([r, o])) : l[c][1] = o, this;
      }
      Et.prototype.clear = xu, Et.prototype.delete = Du, Et.prototype.get = Au, Et.prototype.has = ku, Et.prototype.set = $u;
      function wt(r) {
        var o = -1, l = r == null ? 0 : r.length;
        for (this.clear(); ++o < l; ) {
          var c = r[o];
          this.set(c[0], c[1]);
        }
      }
      function Ou() {
        this.size = 0, this.__data__ = {
          hash: new jt(),
          map: new (_n || Et)(),
          string: new jt()
        };
      }
      function Iu(r) {
        var o = dr(this, r).delete(r);
        return this.size -= o ? 1 : 0, o;
      }
      function Pu(r) {
        return dr(this, r).get(r);
      }
      function Bu(r) {
        return dr(this, r).has(r);
      }
      function Fu(r, o) {
        var l = dr(this, r), c = l.size;
        return l.set(r, o), this.size += l.size == c ? 0 : 1, this;
      }
      wt.prototype.clear = Ou, wt.prototype.delete = Iu, wt.prototype.get = Pu, wt.prototype.has = Bu, wt.prototype.set = Fu;
      function zt(r) {
        var o = -1, l = r == null ? 0 : r.length;
        for (this.__data__ = new wt(); ++o < l; )
          this.add(r[o]);
      }
      function Ru(r) {
        return this.__data__.set(r, p), this;
      }
      function Nu(r) {
        return this.__data__.has(r);
      }
      zt.prototype.add = zt.prototype.push = Ru, zt.prototype.has = Nu;
      function gt(r) {
        var o = this.__data__ = new Et(r);
        this.size = o.size;
      }
      function Mu() {
        this.__data__ = new Et(), this.size = 0;
      }
      function Lu(r) {
        var o = this.__data__, l = o.delete(r);
        return this.size = o.size, l;
      }
      function Vu(r) {
        return this.__data__.get(r);
      }
      function Uu(r) {
        return this.__data__.has(r);
      }
      function Hu(r, o) {
        var l = this.__data__;
        if (l instanceof Et) {
          var c = l.__data__;
          if (!_n || c.length < i - 1)
            return c.push([r, o]), this.size = ++l.size, this;
          l = this.__data__ = new wt(c);
        }
        return l.set(r, o), this.size = l.size, this;
      }
      gt.prototype.clear = Mu, gt.prototype.delete = Lu, gt.prototype.get = Vu, gt.prototype.has = Uu, gt.prototype.set = Hu;
      function Ua(r, o) {
        var l = ce(r), c = !l && Yt(r), d = !l && !c && Vt(r), y = !l && !c && !d && fn(r), S = l || c || d || y, C = S ? Wr(r.length, Xs) : [], k = C.length;
        for (var N in r)
          (o || Ee.call(r, N)) && !(S && // Safari 9 has enumerable `arguments.length` in strict mode.
          (N == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          d && (N == "offset" || N == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          y && (N == "buffer" || N == "byteLength" || N == "byteOffset") || // Skip index properties.
          Dt(N, k))) && C.push(N);
        return C;
      }
      function Ha(r) {
        var o = r.length;
        return o ? r[uo(0, o - 1)] : n;
      }
      function ju(r, o) {
        return pr(qe(r), qt(o, 0, r.length));
      }
      function zu(r) {
        return pr(qe(r));
      }
      function Zr(r, o, l) {
        (l !== n && !mt(r[o], l) || l === n && !(o in r)) && Ct(r, o, l);
      }
      function Cn(r, o, l) {
        var c = r[o];
        (!(Ee.call(r, o) && mt(c, l)) || l === n && !(o in r)) && Ct(r, o, l);
      }
      function er(r, o) {
        for (var l = r.length; l--; )
          if (mt(r[l][0], o))
            return l;
        return -1;
      }
      function qu(r, o, l, c) {
        return Rt(r, function(d, y, S) {
          o(c, d, l(d), S);
        }), c;
      }
      function ja(r, o) {
        return r && bt(o, Re(o), r);
      }
      function Wu(r, o) {
        return r && bt(o, Ke(o), r);
      }
      function Ct(r, o, l) {
        o == "__proto__" && Gn ? Gn(r, o, {
          configurable: !0,
          enumerable: !0,
          value: l,
          writable: !0
        }) : r[o] = l;
      }
      function eo(r, o) {
        for (var l = -1, c = o.length, d = P(c), y = r == null; ++l < c; )
          d[l] = y ? n : Fo(r, o[l]);
        return d;
      }
      function qt(r, o, l) {
        return r === r && (l !== n && (r = r <= l ? r : l), o !== n && (r = r >= o ? r : o)), r;
      }
      function it(r, o, l, c, d, y) {
        var S, C = o & _, k = o & E, N = o & w;
        if (l && (S = d ? l(r, c, d, y) : l(r)), S !== n)
          return S;
        if (!Ae(r))
          return r;
        var M = ce(r);
        if (M) {
          if (S = Bc(r), !C)
            return qe(r, S);
        } else {
          var V = Ve(r), K = V == ft || V == zo;
          if (Vt(r))
            return pi(r, C);
          if (V == St || V == tt || K && !d) {
            if (S = k || K ? {} : Ii(r), !C)
              return k ? wc(r, Wu(S, r)) : Ec(r, ja(S, r));
          } else {
            if (!Ce[V])
              return d ? r : {};
            S = Fc(r, V, C);
          }
        }
        y || (y = new gt());
        var X = y.get(r);
        if (X)
          return X;
        y.set(r, S), ll(r) ? r.forEach(function(ie) {
          S.add(it(ie, o, l, ie, r, y));
        }) : al(r) && r.forEach(function(ie, me) {
          S.set(me, it(ie, o, l, me, r, y));
        });
        var ae = N ? k ? So : _o : k ? Ke : Re, pe = M ? n : ae(r);
        return rt(pe || r, function(ie, me) {
          pe && (me = ie, ie = r[me]), Cn(S, me, it(ie, o, l, me, r, y));
        }), S;
      }
      function Ku(r) {
        var o = Re(r);
        return function(l) {
          return za(l, r, o);
        };
      }
      function za(r, o, l) {
        var c = l.length;
        if (r == null)
          return !c;
        for (r = we(r); c--; ) {
          var d = l[c], y = o[d], S = r[d];
          if (S === n && !(d in r) || !y(S))
            return !1;
        }
        return !0;
      }
      function qa(r, o, l) {
        if (typeof r != "function")
          throw new ot(u);
        return On(function() {
          r.apply(n, l);
        }, o);
      }
      function Tn(r, o, l, c) {
        var d = -1, y = Nn, S = !0, C = r.length, k = [], N = o.length;
        if (!C)
          return k;
        l && (o = De(o, Qe(l))), c ? (y = Vr, S = !1) : o.length >= i && (y = yn, S = !1, o = new zt(o));
        e:
          for (; ++d < C; ) {
            var M = r[d], V = l == null ? M : l(M);
            if (M = c || M !== 0 ? M : 0, S && V === V) {
              for (var K = N; K--; )
                if (o[K] === V)
                  continue e;
              k.push(M);
            } else
              y(o, V, c) || k.push(M);
          }
        return k;
      }
      var Rt = yi(yt), Wa = yi(no, !0);
      function Gu(r, o) {
        var l = !0;
        return Rt(r, function(c, d, y) {
          return l = !!o(c, d, y), l;
        }), l;
      }
      function tr(r, o, l) {
        for (var c = -1, d = r.length; ++c < d; ) {
          var y = r[c], S = o(y);
          if (S != null && (C === n ? S === S && !Xe(S) : l(S, C)))
            var C = S, k = y;
        }
        return k;
      }
      function Yu(r, o, l, c) {
        var d = r.length;
        for (l = de(l), l < 0 && (l = -l > d ? 0 : d + l), c = c === n || c > d ? d : de(c), c < 0 && (c += d), c = l > c ? 0 : ul(c); l < c; )
          r[l++] = o;
        return r;
      }
      function Ka(r, o) {
        var l = [];
        return Rt(r, function(c, d, y) {
          o(c, d, y) && l.push(c);
        }), l;
      }
      function Me(r, o, l, c, d) {
        var y = -1, S = r.length;
        for (l || (l = Nc), d || (d = []); ++y < S; ) {
          var C = r[y];
          o > 0 && l(C) ? o > 1 ? Me(C, o - 1, l, c, d) : Pt(d, C) : c || (d[d.length] = C);
        }
        return d;
      }
      var to = bi(), Ga = bi(!0);
      function yt(r, o) {
        return r && to(r, o, Re);
      }
      function no(r, o) {
        return r && Ga(r, o, Re);
      }
      function nr(r, o) {
        return It(o, function(l) {
          return At(r[l]);
        });
      }
      function Wt(r, o) {
        o = Mt(o, r);
        for (var l = 0, c = o.length; r != null && l < c; )
          r = r[_t(o[l++])];
        return l && l == c ? r : n;
      }
      function Ya(r, o, l) {
        var c = o(r);
        return ce(r) ? c : Pt(c, l(r));
      }
      function He(r) {
        return r == null ? r === n ? Cl : El : Ht && Ht in we(r) ? Oc(r) : zc(r);
      }
      function ro(r, o) {
        return r > o;
      }
      function Qu(r, o) {
        return r != null && Ee.call(r, o);
      }
      function Ju(r, o) {
        return r != null && o in we(r);
      }
      function Xu(r, o, l) {
        return r >= Le(o, l) && r < Fe(o, l);
      }
      function oo(r, o, l) {
        for (var c = l ? Vr : Nn, d = r[0].length, y = r.length, S = y, C = P(y), k = 1 / 0, N = []; S--; ) {
          var M = r[S];
          S && o && (M = De(M, Qe(o))), k = Le(M.length, k), C[S] = !l && (o || d >= 120 && M.length >= 120) ? new zt(S && M) : n;
        }
        M = r[0];
        var V = -1, K = C[0];
        e:
          for (; ++V < d && N.length < k; ) {
            var X = M[V], ae = o ? o(X) : X;
            if (X = l || X !== 0 ? X : 0, !(K ? yn(K, ae) : c(N, ae, l))) {
              for (S = y; --S; ) {
                var pe = C[S];
                if (!(pe ? yn(pe, ae) : c(r[S], ae, l)))
                  continue e;
              }
              K && K.push(ae), N.push(X);
            }
          }
        return N;
      }
      function Zu(r, o, l, c) {
        return yt(r, function(d, y, S) {
          o(c, l(d), y, S);
        }), c;
      }
      function xn(r, o, l) {
        o = Mt(o, r), r = Ri(r, o);
        var c = r == null ? r : r[_t(st(o))];
        return c == null ? n : Ye(c, r, l);
      }
      function Qa(r) {
        return ke(r) && He(r) == tt;
      }
      function ec(r) {
        return ke(r) && He(r) == vn;
      }
      function tc(r) {
        return ke(r) && He(r) == xe;
      }
      function Dn(r, o, l, c, d) {
        return r === o ? !0 : r == null || o == null || !ke(r) && !ke(o) ? r !== r && o !== o : nc(r, o, l, c, Dn, d);
      }
      function nc(r, o, l, c, d, y) {
        var S = ce(r), C = ce(o), k = S ? be : Ve(r), N = C ? be : Ve(o);
        k = k == tt ? St : k, N = N == tt ? St : N;
        var M = k == St, V = N == St, K = k == N;
        if (K && Vt(r)) {
          if (!Vt(o))
            return !1;
          S = !0, M = !1;
        }
        if (K && !M)
          return y || (y = new gt()), S || fn(r) ? ki(r, o, l, c, d, y) : kc(r, o, k, l, c, d, y);
        if (!(l & A)) {
          var X = M && Ee.call(r, "__wrapped__"), ae = V && Ee.call(o, "__wrapped__");
          if (X || ae) {
            var pe = X ? r.value() : r, ie = ae ? o.value() : o;
            return y || (y = new gt()), d(pe, ie, l, c, y);
          }
        }
        return K ? (y || (y = new gt()), $c(r, o, l, c, d, y)) : !1;
      }
      function rc(r) {
        return ke(r) && Ve(r) == dt;
      }
      function ao(r, o, l, c) {
        var d = l.length, y = d, S = !c;
        if (r == null)
          return !y;
        for (r = we(r); d--; ) {
          var C = l[d];
          if (S && C[2] ? C[1] !== r[C[0]] : !(C[0] in r))
            return !1;
        }
        for (; ++d < y; ) {
          C = l[d];
          var k = C[0], N = r[k], M = C[1];
          if (S && C[2]) {
            if (N === n && !(k in r))
              return !1;
          } else {
            var V = new gt();
            if (c)
              var K = c(N, M, k, r, o, V);
            if (!(K === n ? Dn(M, N, A | T, c, V) : K))
              return !1;
          }
        }
        return !0;
      }
      function Ja(r) {
        if (!Ae(r) || Lc(r))
          return !1;
        var o = At(r) ? ru : Kl;
        return o.test(Gt(r));
      }
      function oc(r) {
        return ke(r) && He(r) == hn;
      }
      function ac(r) {
        return ke(r) && Ve(r) == pt;
      }
      function ic(r) {
        return ke(r) && br(r.length) && !!Te[He(r)];
      }
      function Xa(r) {
        return typeof r == "function" ? r : r == null ? Ge : typeof r == "object" ? ce(r) ? ti(r[0], r[1]) : ei(r) : _l(r);
      }
      function io(r) {
        if (!$n(r))
          return uu(r);
        var o = [];
        for (var l in we(r))
          Ee.call(r, l) && l != "constructor" && o.push(l);
        return o;
      }
      function lc(r) {
        if (!Ae(r))
          return jc(r);
        var o = $n(r), l = [];
        for (var c in r)
          c == "constructor" && (o || !Ee.call(r, c)) || l.push(c);
        return l;
      }
      function lo(r, o) {
        return r < o;
      }
      function Za(r, o) {
        var l = -1, c = We(r) ? P(r.length) : [];
        return Rt(r, function(d, y, S) {
          c[++l] = o(d, y, S);
        }), c;
      }
      function ei(r) {
        var o = wo(r);
        return o.length == 1 && o[0][2] ? Bi(o[0][0], o[0][1]) : function(l) {
          return l === r || ao(l, r, o);
        };
      }
      function ti(r, o) {
        return To(r) && Pi(o) ? Bi(_t(r), o) : function(l) {
          var c = Fo(l, r);
          return c === n && c === o ? Ro(l, r) : Dn(o, c, A | T);
        };
      }
      function rr(r, o, l, c, d) {
        r !== o && to(o, function(y, S) {
          if (d || (d = new gt()), Ae(y))
            sc(r, o, S, l, rr, c, d);
          else {
            var C = c ? c(Do(r, S), y, S + "", r, o, d) : n;
            C === n && (C = y), Zr(r, S, C);
          }
        }, Ke);
      }
      function sc(r, o, l, c, d, y, S) {
        var C = Do(r, l), k = Do(o, l), N = S.get(k);
        if (N) {
          Zr(r, l, N);
          return;
        }
        var M = y ? y(C, k, l + "", r, o, S) : n, V = M === n;
        if (V) {
          var K = ce(k), X = !K && Vt(k), ae = !K && !X && fn(k);
          M = k, K || X || ae ? ce(C) ? M = C : $e(C) ? M = qe(C) : X ? (V = !1, M = pi(k, !0)) : ae ? (V = !1, M = hi(k, !0)) : M = [] : In(k) || Yt(k) ? (M = C, Yt(C) ? M = cl(C) : (!Ae(C) || At(C)) && (M = Ii(k))) : V = !1;
        }
        V && (S.set(k, M), d(M, k, c, y, S), S.delete(k)), Zr(r, l, M);
      }
      function ni(r, o) {
        var l = r.length;
        if (l)
          return o += o < 0 ? l : 0, Dt(o, l) ? r[o] : n;
      }
      function ri(r, o, l) {
        o.length ? o = De(o, function(y) {
          return ce(y) ? function(S) {
            return Wt(S, y.length === 1 ? y[0] : y);
          } : y;
        }) : o = [Ge];
        var c = -1;
        o = De(o, Qe(re()));
        var d = Za(r, function(y, S, C) {
          var k = De(o, function(N) {
            return N(y);
          });
          return { criteria: k, index: ++c, value: y };
        });
        return Fs(d, function(y, S) {
          return Sc(y, S, l);
        });
      }
      function uc(r, o) {
        return oi(r, o, function(l, c) {
          return Ro(r, c);
        });
      }
      function oi(r, o, l) {
        for (var c = -1, d = o.length, y = {}; ++c < d; ) {
          var S = o[c], C = Wt(r, S);
          l(C, S) && An(y, Mt(S, r), C);
        }
        return y;
      }
      function cc(r) {
        return function(o) {
          return Wt(o, r);
        };
      }
      function so(r, o, l, c) {
        var d = c ? Bs : Xt, y = -1, S = o.length, C = r;
        for (r === o && (o = qe(o)), l && (C = De(r, Qe(l))); ++y < S; )
          for (var k = 0, N = o[y], M = l ? l(N) : N; (k = d(C, M, k, c)) > -1; )
            C !== r && Kn.call(C, k, 1), Kn.call(r, k, 1);
        return r;
      }
      function ai(r, o) {
        for (var l = r ? o.length : 0, c = l - 1; l--; ) {
          var d = o[l];
          if (l == c || d !== y) {
            var y = d;
            Dt(d) ? Kn.call(r, d, 1) : po(r, d);
          }
        }
        return r;
      }
      function uo(r, o) {
        return r + Qn(La() * (o - r + 1));
      }
      function fc(r, o, l, c) {
        for (var d = -1, y = Fe(Yn((o - r) / (l || 1)), 0), S = P(y); y--; )
          S[c ? y : ++d] = r, r += l;
        return S;
      }
      function co(r, o) {
        var l = "";
        if (!r || o < 1 || o > $)
          return l;
        do
          o % 2 && (l += r), o = Qn(o / 2), o && (r += r);
        while (o);
        return l;
      }
      function he(r, o) {
        return Ao(Fi(r, o, Ge), r + "");
      }
      function dc(r) {
        return Ha(dn(r));
      }
      function pc(r, o) {
        var l = dn(r);
        return pr(l, qt(o, 0, l.length));
      }
      function An(r, o, l, c) {
        if (!Ae(r))
          return r;
        o = Mt(o, r);
        for (var d = -1, y = o.length, S = y - 1, C = r; C != null && ++d < y; ) {
          var k = _t(o[d]), N = l;
          if (k === "__proto__" || k === "constructor" || k === "prototype")
            return r;
          if (d != S) {
            var M = C[k];
            N = c ? c(M, k, C) : n, N === n && (N = Ae(M) ? M : Dt(o[d + 1]) ? [] : {});
          }
          Cn(C, k, N), C = C[k];
        }
        return r;
      }
      var ii = Jn ? function(r, o) {
        return Jn.set(r, o), r;
      } : Ge, hc = Gn ? function(r, o) {
        return Gn(r, "toString", {
          configurable: !0,
          enumerable: !1,
          value: Mo(o),
          writable: !0
        });
      } : Ge;
      function gc(r) {
        return pr(dn(r));
      }
      function lt(r, o, l) {
        var c = -1, d = r.length;
        o < 0 && (o = -o > d ? 0 : d + o), l = l > d ? d : l, l < 0 && (l += d), d = o > l ? 0 : l - o >>> 0, o >>>= 0;
        for (var y = P(d); ++c < d; )
          y[c] = r[c + o];
        return y;
      }
      function mc(r, o) {
        var l;
        return Rt(r, function(c, d, y) {
          return l = o(c, d, y), !l;
        }), !!l;
      }
      function or(r, o, l) {
        var c = 0, d = r == null ? c : r.length;
        if (typeof o == "number" && o === o && d <= ct) {
          for (; c < d; ) {
            var y = c + d >>> 1, S = r[y];
            S !== null && !Xe(S) && (l ? S <= o : S < o) ? c = y + 1 : d = y;
          }
          return d;
        }
        return fo(r, o, Ge, l);
      }
      function fo(r, o, l, c) {
        var d = 0, y = r == null ? 0 : r.length;
        if (y === 0)
          return 0;
        o = l(o);
        for (var S = o !== o, C = o === null, k = Xe(o), N = o === n; d < y; ) {
          var M = Qn((d + y) / 2), V = l(r[M]), K = V !== n, X = V === null, ae = V === V, pe = Xe(V);
          if (S)
            var ie = c || ae;
          else
            N ? ie = ae && (c || K) : C ? ie = ae && K && (c || !X) : k ? ie = ae && K && !X && (c || !pe) : X || pe ? ie = !1 : ie = c ? V <= o : V < o;
          ie ? d = M + 1 : y = M;
        }
        return Le(y, Pe);
      }
      function li(r, o) {
        for (var l = -1, c = r.length, d = 0, y = []; ++l < c; ) {
          var S = r[l], C = o ? o(S) : S;
          if (!l || !mt(C, k)) {
            var k = C;
            y[d++] = S === 0 ? 0 : S;
          }
        }
        return y;
      }
      function si(r) {
        return typeof r == "number" ? r : Xe(r) ? ne : +r;
      }
      function Je(r) {
        if (typeof r == "string")
          return r;
        if (ce(r))
          return De(r, Je) + "";
        if (Xe(r))
          return Va ? Va.call(r) : "";
        var o = r + "";
        return o == "0" && 1 / r == -fe ? "-0" : o;
      }
      function Nt(r, o, l) {
        var c = -1, d = Nn, y = r.length, S = !0, C = [], k = C;
        if (l)
          S = !1, d = Vr;
        else if (y >= i) {
          var N = o ? null : Dc(r);
          if (N)
            return Ln(N);
          S = !1, d = yn, k = new zt();
        } else
          k = o ? [] : C;
        e:
          for (; ++c < y; ) {
            var M = r[c], V = o ? o(M) : M;
            if (M = l || M !== 0 ? M : 0, S && V === V) {
              for (var K = k.length; K--; )
                if (k[K] === V)
                  continue e;
              o && k.push(V), C.push(M);
            } else
              d(k, V, l) || (k !== C && k.push(V), C.push(M));
          }
        return C;
      }
      function po(r, o) {
        return o = Mt(o, r), r = Ri(r, o), r == null || delete r[_t(st(o))];
      }
      function ui(r, o, l, c) {
        return An(r, o, l(Wt(r, o)), c);
      }
      function ar(r, o, l, c) {
        for (var d = r.length, y = c ? d : -1; (c ? y-- : ++y < d) && o(r[y], y, r); )
          ;
        return l ? lt(r, c ? 0 : y, c ? y + 1 : d) : lt(r, c ? y + 1 : 0, c ? d : y);
      }
      function ci(r, o) {
        var l = r;
        return l instanceof ve && (l = l.value()), Ur(o, function(c, d) {
          return d.func.apply(d.thisArg, Pt([c], d.args));
        }, l);
      }
      function ho(r, o, l) {
        var c = r.length;
        if (c < 2)
          return c ? Nt(r[0]) : [];
        for (var d = -1, y = P(c); ++d < c; )
          for (var S = r[d], C = -1; ++C < c; )
            C != d && (y[d] = Tn(y[d] || S, r[C], o, l));
        return Nt(Me(y, 1), o, l);
      }
      function fi(r, o, l) {
        for (var c = -1, d = r.length, y = o.length, S = {}; ++c < d; ) {
          var C = c < y ? o[c] : n;
          l(S, r[c], C);
        }
        return S;
      }
      function go(r) {
        return $e(r) ? r : [];
      }
      function mo(r) {
        return typeof r == "function" ? r : Ge;
      }
      function Mt(r, o) {
        return ce(r) ? r : To(r, o) ? [r] : Vi(Se(r));
      }
      var vc = he;
      function Lt(r, o, l) {
        var c = r.length;
        return l = l === n ? c : l, !o && l >= c ? r : lt(r, o, l);
      }
      var di = ou || function(r) {
        return Ne.clearTimeout(r);
      };
      function pi(r, o) {
        if (o)
          return r.slice();
        var l = r.length, c = Ba ? Ba(l) : new r.constructor(l);
        return r.copy(c), c;
      }
      function vo(r) {
        var o = new r.constructor(r.byteLength);
        return new qn(o).set(new qn(r)), o;
      }
      function yc(r, o) {
        var l = o ? vo(r.buffer) : r.buffer;
        return new r.constructor(l, r.byteOffset, r.byteLength);
      }
      function bc(r) {
        var o = new r.constructor(r.source, Yo.exec(r));
        return o.lastIndex = r.lastIndex, o;
      }
      function _c(r) {
        return wn ? we(wn.call(r)) : {};
      }
      function hi(r, o) {
        var l = o ? vo(r.buffer) : r.buffer;
        return new r.constructor(l, r.byteOffset, r.length);
      }
      function gi(r, o) {
        if (r !== o) {
          var l = r !== n, c = r === null, d = r === r, y = Xe(r), S = o !== n, C = o === null, k = o === o, N = Xe(o);
          if (!C && !N && !y && r > o || y && S && k && !C && !N || c && S && k || !l && k || !d)
            return 1;
          if (!c && !y && !N && r < o || N && l && d && !c && !y || C && l && d || !S && d || !k)
            return -1;
        }
        return 0;
      }
      function Sc(r, o, l) {
        for (var c = -1, d = r.criteria, y = o.criteria, S = d.length, C = l.length; ++c < S; ) {
          var k = gi(d[c], y[c]);
          if (k) {
            if (c >= C)
              return k;
            var N = l[c];
            return k * (N == "desc" ? -1 : 1);
          }
        }
        return r.index - o.index;
      }
      function mi(r, o, l, c) {
        for (var d = -1, y = r.length, S = l.length, C = -1, k = o.length, N = Fe(y - S, 0), M = P(k + N), V = !c; ++C < k; )
          M[C] = o[C];
        for (; ++d < S; )
          (V || d < y) && (M[l[d]] = r[d]);
        for (; N--; )
          M[C++] = r[d++];
        return M;
      }
      function vi(r, o, l, c) {
        for (var d = -1, y = r.length, S = -1, C = l.length, k = -1, N = o.length, M = Fe(y - C, 0), V = P(M + N), K = !c; ++d < M; )
          V[d] = r[d];
        for (var X = d; ++k < N; )
          V[X + k] = o[k];
        for (; ++S < C; )
          (K || d < y) && (V[X + l[S]] = r[d++]);
        return V;
      }
      function qe(r, o) {
        var l = -1, c = r.length;
        for (o || (o = P(c)); ++l < c; )
          o[l] = r[l];
        return o;
      }
      function bt(r, o, l, c) {
        var d = !l;
        l || (l = {});
        for (var y = -1, S = o.length; ++y < S; ) {
          var C = o[y], k = c ? c(l[C], r[C], C, l, r) : n;
          k === n && (k = r[C]), d ? Ct(l, C, k) : Cn(l, C, k);
        }
        return l;
      }
      function Ec(r, o) {
        return bt(r, Co(r), o);
      }
      function wc(r, o) {
        return bt(r, $i(r), o);
      }
      function ir(r, o) {
        return function(l, c) {
          var d = ce(l) ? As : qu, y = o ? o() : {};
          return d(l, r, re(c, 2), y);
        };
      }
      function sn(r) {
        return he(function(o, l) {
          var c = -1, d = l.length, y = d > 1 ? l[d - 1] : n, S = d > 2 ? l[2] : n;
          for (y = r.length > 3 && typeof y == "function" ? (d--, y) : n, S && je(l[0], l[1], S) && (y = d < 3 ? n : y, d = 1), o = we(o); ++c < d; ) {
            var C = l[c];
            C && r(o, C, c, y);
          }
          return o;
        });
      }
      function yi(r, o) {
        return function(l, c) {
          if (l == null)
            return l;
          if (!We(l))
            return r(l, c);
          for (var d = l.length, y = o ? d : -1, S = we(l); (o ? y-- : ++y < d) && c(S[y], y, S) !== !1; )
            ;
          return l;
        };
      }
      function bi(r) {
        return function(o, l, c) {
          for (var d = -1, y = we(o), S = c(o), C = S.length; C--; ) {
            var k = S[r ? C : ++d];
            if (l(y[k], k, y) === !1)
              break;
          }
          return o;
        };
      }
      function Cc(r, o, l) {
        var c = o & O, d = kn(r);
        function y() {
          var S = this && this !== Ne && this instanceof y ? d : r;
          return S.apply(c ? l : this, arguments);
        }
        return y;
      }
      function _i(r) {
        return function(o) {
          o = Se(o);
          var l = Zt(o) ? ht(o) : n, c = l ? l[0] : o.charAt(0), d = l ? Lt(l, 1).join("") : o.slice(1);
          return c[r]() + d;
        };
      }
      function un(r) {
        return function(o) {
          return Ur(yl(vl(o).replace(hs, "")), r, "");
        };
      }
      function kn(r) {
        return function() {
          var o = arguments;
          switch (o.length) {
            case 0:
              return new r();
            case 1:
              return new r(o[0]);
            case 2:
              return new r(o[0], o[1]);
            case 3:
              return new r(o[0], o[1], o[2]);
            case 4:
              return new r(o[0], o[1], o[2], o[3]);
            case 5:
              return new r(o[0], o[1], o[2], o[3], o[4]);
            case 6:
              return new r(o[0], o[1], o[2], o[3], o[4], o[5]);
            case 7:
              return new r(o[0], o[1], o[2], o[3], o[4], o[5], o[6]);
          }
          var l = ln(r.prototype), c = r.apply(l, o);
          return Ae(c) ? c : l;
        };
      }
      function Tc(r, o, l) {
        var c = kn(r);
        function d() {
          for (var y = arguments.length, S = P(y), C = y, k = cn(d); C--; )
            S[C] = arguments[C];
          var N = y < 3 && S[0] !== k && S[y - 1] !== k ? [] : Bt(S, k);
          if (y -= N.length, y < l)
            return Ti(
              r,
              o,
              lr,
              d.placeholder,
              n,
              S,
              N,
              n,
              n,
              l - y
            );
          var M = this && this !== Ne && this instanceof d ? c : r;
          return Ye(M, this, S);
        }
        return d;
      }
      function Si(r) {
        return function(o, l, c) {
          var d = we(o);
          if (!We(o)) {
            var y = re(l, 3);
            o = Re(o), l = function(C) {
              return y(d[C], C, d);
            };
          }
          var S = r(o, l, c);
          return S > -1 ? d[y ? o[S] : S] : n;
        };
      }
      function Ei(r) {
        return xt(function(o) {
          var l = o.length, c = l, d = at.prototype.thru;
          for (r && o.reverse(); c--; ) {
            var y = o[c];
            if (typeof y != "function")
              throw new ot(u);
            if (d && !S && fr(y) == "wrapper")
              var S = new at([], !0);
          }
          for (c = S ? c : l; ++c < l; ) {
            y = o[c];
            var C = fr(y), k = C == "wrapper" ? Eo(y) : n;
            k && xo(k[0]) && k[1] == (J | L | G | x) && !k[4].length && k[9] == 1 ? S = S[fr(k[0])].apply(S, k[3]) : S = y.length == 1 && xo(y) ? S[C]() : S.thru(y);
          }
          return function() {
            var N = arguments, M = N[0];
            if (S && N.length == 1 && ce(M))
              return S.plant(M).value();
            for (var V = 0, K = l ? o[V].apply(this, N) : M; ++V < l; )
              K = o[V].call(this, K);
            return K;
          };
        });
      }
      function lr(r, o, l, c, d, y, S, C, k, N) {
        var M = o & J, V = o & O, K = o & I, X = o & (L | z), ae = o & q, pe = K ? n : kn(r);
        function ie() {
          for (var me = arguments.length, ye = P(me), Ze = me; Ze--; )
            ye[Ze] = arguments[Ze];
          if (X)
            var ze = cn(ie), et = Ns(ye, ze);
          if (c && (ye = mi(ye, c, d, X)), y && (ye = vi(ye, y, S, X)), me -= et, X && me < N) {
            var Oe = Bt(ye, ze);
            return Ti(
              r,
              o,
              lr,
              ie.placeholder,
              l,
              ye,
              Oe,
              C,
              k,
              N - me
            );
          }
          var vt = V ? l : this, $t = K ? vt[r] : r;
          return me = ye.length, C ? ye = qc(ye, C) : ae && me > 1 && ye.reverse(), M && k < me && (ye.length = k), this && this !== Ne && this instanceof ie && ($t = pe || kn($t)), $t.apply(vt, ye);
        }
        return ie;
      }
      function wi(r, o) {
        return function(l, c) {
          return Zu(l, r, o(c), {});
        };
      }
      function sr(r, o) {
        return function(l, c) {
          var d;
          if (l === n && c === n)
            return o;
          if (l !== n && (d = l), c !== n) {
            if (d === n)
              return c;
            typeof l == "string" || typeof c == "string" ? (l = Je(l), c = Je(c)) : (l = si(l), c = si(c)), d = r(l, c);
          }
          return d;
        };
      }
      function yo(r) {
        return xt(function(o) {
          return o = De(o, Qe(re())), he(function(l) {
            var c = this;
            return r(o, function(d) {
              return Ye(d, c, l);
            });
          });
        });
      }
      function ur(r, o) {
        o = o === n ? " " : Je(o);
        var l = o.length;
        if (l < 2)
          return l ? co(o, r) : o;
        var c = co(o, Yn(r / en(o)));
        return Zt(o) ? Lt(ht(c), 0, r).join("") : c.slice(0, r);
      }
      function xc(r, o, l, c) {
        var d = o & O, y = kn(r);
        function S() {
          for (var C = -1, k = arguments.length, N = -1, M = c.length, V = P(M + k), K = this && this !== Ne && this instanceof S ? y : r; ++N < M; )
            V[N] = c[N];
          for (; k--; )
            V[N++] = arguments[++C];
          return Ye(K, d ? l : this, V);
        }
        return S;
      }
      function Ci(r) {
        return function(o, l, c) {
          return c && typeof c != "number" && je(o, l, c) && (l = c = n), o = kt(o), l === n ? (l = o, o = 0) : l = kt(l), c = c === n ? o < l ? 1 : -1 : kt(c), fc(o, l, c, r);
        };
      }
      function cr(r) {
        return function(o, l) {
          return typeof o == "string" && typeof l == "string" || (o = ut(o), l = ut(l)), r(o, l);
        };
      }
      function Ti(r, o, l, c, d, y, S, C, k, N) {
        var M = o & L, V = M ? S : n, K = M ? n : S, X = M ? y : n, ae = M ? n : y;
        o |= M ? G : Z, o &= ~(M ? Z : G), o & H || (o &= ~(O | I));
        var pe = [
          r,
          o,
          d,
          X,
          V,
          ae,
          K,
          C,
          k,
          N
        ], ie = l.apply(n, pe);
        return xo(r) && Ni(ie, pe), ie.placeholder = c, Mi(ie, r, o);
      }
      function bo(r) {
        var o = Be[r];
        return function(l, c) {
          if (l = ut(l), c = c == null ? 0 : Le(de(c), 292), c && Ma(l)) {
            var d = (Se(l) + "e").split("e"), y = o(d[0] + "e" + (+d[1] + c));
            return d = (Se(y) + "e").split("e"), +(d[0] + "e" + (+d[1] - c));
          }
          return o(l);
        };
      }
      var Dc = rn && 1 / Ln(new rn([, -0]))[1] == fe ? function(r) {
        return new rn(r);
      } : Uo;
      function xi(r) {
        return function(o) {
          var l = Ve(o);
          return l == dt ? Gr(o) : l == pt ? zs(o) : Rs(o, r(o));
        };
      }
      function Tt(r, o, l, c, d, y, S, C) {
        var k = o & I;
        if (!k && typeof r != "function")
          throw new ot(u);
        var N = c ? c.length : 0;
        if (N || (o &= ~(G | Z), c = d = n), S = S === n ? S : Fe(de(S), 0), C = C === n ? C : de(C), N -= d ? d.length : 0, o & Z) {
          var M = c, V = d;
          c = d = n;
        }
        var K = k ? n : Eo(r), X = [
          r,
          o,
          l,
          c,
          d,
          M,
          V,
          y,
          S,
          C
        ];
        if (K && Hc(X, K), r = X[0], o = X[1], l = X[2], c = X[3], d = X[4], C = X[9] = X[9] === n ? k ? 0 : r.length : Fe(X[9] - N, 0), !C && o & (L | z) && (o &= ~(L | z)), !o || o == O)
          var ae = Cc(r, o, l);
        else
          o == L || o == z ? ae = Tc(r, o, C) : (o == G || o == (O | G)) && !d.length ? ae = xc(r, o, l, c) : ae = lr.apply(n, X);
        var pe = K ? ii : Ni;
        return Mi(pe(ae, X), r, o);
      }
      function Di(r, o, l, c) {
        return r === n || mt(r, nn[l]) && !Ee.call(c, l) ? o : r;
      }
      function Ai(r, o, l, c, d, y) {
        return Ae(r) && Ae(o) && (y.set(o, r), rr(r, o, n, Ai, y), y.delete(o)), r;
      }
      function Ac(r) {
        return In(r) ? n : r;
      }
      function ki(r, o, l, c, d, y) {
        var S = l & A, C = r.length, k = o.length;
        if (C != k && !(S && k > C))
          return !1;
        var N = y.get(r), M = y.get(o);
        if (N && M)
          return N == o && M == r;
        var V = -1, K = !0, X = l & T ? new zt() : n;
        for (y.set(r, o), y.set(o, r); ++V < C; ) {
          var ae = r[V], pe = o[V];
          if (c)
            var ie = S ? c(pe, ae, V, o, r, y) : c(ae, pe, V, r, o, y);
          if (ie !== n) {
            if (ie)
              continue;
            K = !1;
            break;
          }
          if (X) {
            if (!Hr(o, function(me, ye) {
              if (!yn(X, ye) && (ae === me || d(ae, me, l, c, y)))
                return X.push(ye);
            })) {
              K = !1;
              break;
            }
          } else if (!(ae === pe || d(ae, pe, l, c, y))) {
            K = !1;
            break;
          }
        }
        return y.delete(r), y.delete(o), K;
      }
      function kc(r, o, l, c, d, y, S) {
        switch (l) {
          case Qt:
            if (r.byteLength != o.byteLength || r.byteOffset != o.byteOffset)
              return !1;
            r = r.buffer, o = o.buffer;
          case vn:
            return !(r.byteLength != o.byteLength || !y(new qn(r), new qn(o)));
          case ge:
          case xe:
          case pn:
            return mt(+r, +o);
          case Ue:
            return r.name == o.name && r.message == o.message;
          case hn:
          case gn:
            return r == o + "";
          case dt:
            var C = Gr;
          case pt:
            var k = c & A;
            if (C || (C = Ln), r.size != o.size && !k)
              return !1;
            var N = S.get(r);
            if (N)
              return N == o;
            c |= T, S.set(r, o);
            var M = ki(C(r), C(o), c, d, y, S);
            return S.delete(r), M;
          case Pn:
            if (wn)
              return wn.call(r) == wn.call(o);
        }
        return !1;
      }
      function $c(r, o, l, c, d, y) {
        var S = l & A, C = _o(r), k = C.length, N = _o(o), M = N.length;
        if (k != M && !S)
          return !1;
        for (var V = k; V--; ) {
          var K = C[V];
          if (!(S ? K in o : Ee.call(o, K)))
            return !1;
        }
        var X = y.get(r), ae = y.get(o);
        if (X && ae)
          return X == o && ae == r;
        var pe = !0;
        y.set(r, o), y.set(o, r);
        for (var ie = S; ++V < k; ) {
          K = C[V];
          var me = r[K], ye = o[K];
          if (c)
            var Ze = S ? c(ye, me, K, o, r, y) : c(me, ye, K, r, o, y);
          if (!(Ze === n ? me === ye || d(me, ye, l, c, y) : Ze)) {
            pe = !1;
            break;
          }
          ie || (ie = K == "constructor");
        }
        if (pe && !ie) {
          var ze = r.constructor, et = o.constructor;
          ze != et && "constructor" in r && "constructor" in o && !(typeof ze == "function" && ze instanceof ze && typeof et == "function" && et instanceof et) && (pe = !1);
        }
        return y.delete(r), y.delete(o), pe;
      }
      function xt(r) {
        return Ao(Fi(r, n, zi), r + "");
      }
      function _o(r) {
        return Ya(r, Re, Co);
      }
      function So(r) {
        return Ya(r, Ke, $i);
      }
      var Eo = Jn ? function(r) {
        return Jn.get(r);
      } : Uo;
      function fr(r) {
        for (var o = r.name + "", l = an[o], c = Ee.call(an, o) ? l.length : 0; c--; ) {
          var d = l[c], y = d.func;
          if (y == null || y == r)
            return d.name;
        }
        return o;
      }
      function cn(r) {
        var o = Ee.call(g, "placeholder") ? g : r;
        return o.placeholder;
      }
      function re() {
        var r = g.iteratee || Lo;
        return r = r === Lo ? Xa : r, arguments.length ? r(arguments[0], arguments[1]) : r;
      }
      function dr(r, o) {
        var l = r.__data__;
        return Mc(o) ? l[typeof o == "string" ? "string" : "hash"] : l.map;
      }
      function wo(r) {
        for (var o = Re(r), l = o.length; l--; ) {
          var c = o[l], d = r[c];
          o[l] = [c, d, Pi(d)];
        }
        return o;
      }
      function Kt(r, o) {
        var l = Us(r, o);
        return Ja(l) ? l : n;
      }
      function Oc(r) {
        var o = Ee.call(r, Ht), l = r[Ht];
        try {
          r[Ht] = n;
          var c = !0;
        } catch {
        }
        var d = jn.call(r);
        return c && (o ? r[Ht] = l : delete r[Ht]), d;
      }
      var Co = Qr ? function(r) {
        return r == null ? [] : (r = we(r), It(Qr(r), function(o) {
          return Ra.call(r, o);
        }));
      } : Ho, $i = Qr ? function(r) {
        for (var o = []; r; )
          Pt(o, Co(r)), r = Wn(r);
        return o;
      } : Ho, Ve = He;
      (Jr && Ve(new Jr(new ArrayBuffer(1))) != Qt || _n && Ve(new _n()) != dt || Xr && Ve(Xr.resolve()) != qo || rn && Ve(new rn()) != pt || Sn && Ve(new Sn()) != mn) && (Ve = function(r) {
        var o = He(r), l = o == St ? r.constructor : n, c = l ? Gt(l) : "";
        if (c)
          switch (c) {
            case pu:
              return Qt;
            case hu:
              return dt;
            case gu:
              return qo;
            case mu:
              return pt;
            case vu:
              return mn;
          }
        return o;
      });
      function Ic(r, o, l) {
        for (var c = -1, d = l.length; ++c < d; ) {
          var y = l[c], S = y.size;
          switch (y.type) {
            case "drop":
              r += S;
              break;
            case "dropRight":
              o -= S;
              break;
            case "take":
              o = Le(o, r + S);
              break;
            case "takeRight":
              r = Fe(r, o - S);
              break;
          }
        }
        return { start: r, end: o };
      }
      function Pc(r) {
        var o = r.match(Ll);
        return o ? o[1].split(Vl) : [];
      }
      function Oi(r, o, l) {
        o = Mt(o, r);
        for (var c = -1, d = o.length, y = !1; ++c < d; ) {
          var S = _t(o[c]);
          if (!(y = r != null && l(r, S)))
            break;
          r = r[S];
        }
        return y || ++c != d ? y : (d = r == null ? 0 : r.length, !!d && br(d) && Dt(S, d) && (ce(r) || Yt(r)));
      }
      function Bc(r) {
        var o = r.length, l = new r.constructor(o);
        return o && typeof r[0] == "string" && Ee.call(r, "index") && (l.index = r.index, l.input = r.input), l;
      }
      function Ii(r) {
        return typeof r.constructor == "function" && !$n(r) ? ln(Wn(r)) : {};
      }
      function Fc(r, o, l) {
        var c = r.constructor;
        switch (o) {
          case vn:
            return vo(r);
          case ge:
          case xe:
            return new c(+r);
          case Qt:
            return yc(r, l);
          case Er:
          case wr:
          case Cr:
          case Tr:
          case xr:
          case Dr:
          case Ar:
          case kr:
          case $r:
            return hi(r, l);
          case dt:
            return new c();
          case pn:
          case gn:
            return new c(r);
          case hn:
            return bc(r);
          case pt:
            return new c();
          case Pn:
            return _c(r);
        }
      }
      function Rc(r, o) {
        var l = o.length;
        if (!l)
          return r;
        var c = l - 1;
        return o[c] = (l > 1 ? "& " : "") + o[c], o = o.join(l > 2 ? ", " : " "), r.replace(Ml, `{
/* [wrapped with ` + o + `] */
`);
      }
      function Nc(r) {
        return ce(r) || Yt(r) || !!(Na && r && r[Na]);
      }
      function Dt(r, o) {
        var l = typeof r;
        return o = o ?? $, !!o && (l == "number" || l != "symbol" && Yl.test(r)) && r > -1 && r % 1 == 0 && r < o;
      }
      function je(r, o, l) {
        if (!Ae(l))
          return !1;
        var c = typeof o;
        return (c == "number" ? We(l) && Dt(o, l.length) : c == "string" && o in l) ? mt(l[o], r) : !1;
      }
      function To(r, o) {
        if (ce(r))
          return !1;
        var l = typeof r;
        return l == "number" || l == "symbol" || l == "boolean" || r == null || Xe(r) ? !0 : Bl.test(r) || !Pl.test(r) || o != null && r in we(o);
      }
      function Mc(r) {
        var o = typeof r;
        return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? r !== "__proto__" : r === null;
      }
      function xo(r) {
        var o = fr(r), l = g[o];
        if (typeof l != "function" || !(o in ve.prototype))
          return !1;
        if (r === l)
          return !0;
        var c = Eo(l);
        return !!c && r === c[0];
      }
      function Lc(r) {
        return !!Pa && Pa in r;
      }
      var Vc = Un ? At : jo;
      function $n(r) {
        var o = r && r.constructor, l = typeof o == "function" && o.prototype || nn;
        return r === l;
      }
      function Pi(r) {
        return r === r && !Ae(r);
      }
      function Bi(r, o) {
        return function(l) {
          return l == null ? !1 : l[r] === o && (o !== n || r in we(l));
        };
      }
      function Uc(r) {
        var o = vr(r, function(c) {
          return l.size === m && l.clear(), c;
        }), l = o.cache;
        return o;
      }
      function Hc(r, o) {
        var l = r[1], c = o[1], d = l | c, y = d < (O | I | J), S = c == J && l == L || c == J && l == x && r[7].length <= o[8] || c == (J | x) && o[7].length <= o[8] && l == L;
        if (!(y || S))
          return r;
        c & O && (r[2] = o[2], d |= l & O ? 0 : H);
        var C = o[3];
        if (C) {
          var k = r[3];
          r[3] = k ? mi(k, C, o[4]) : C, r[4] = k ? Bt(r[3], b) : o[4];
        }
        return C = o[5], C && (k = r[5], r[5] = k ? vi(k, C, o[6]) : C, r[6] = k ? Bt(r[5], b) : o[6]), C = o[7], C && (r[7] = C), c & J && (r[8] = r[8] == null ? o[8] : Le(r[8], o[8])), r[9] == null && (r[9] = o[9]), r[0] = o[0], r[1] = d, r;
      }
      function jc(r) {
        var o = [];
        if (r != null)
          for (var l in we(r))
            o.push(l);
        return o;
      }
      function zc(r) {
        return jn.call(r);
      }
      function Fi(r, o, l) {
        return o = Fe(o === n ? r.length - 1 : o, 0), function() {
          for (var c = arguments, d = -1, y = Fe(c.length - o, 0), S = P(y); ++d < y; )
            S[d] = c[o + d];
          d = -1;
          for (var C = P(o + 1); ++d < o; )
            C[d] = c[d];
          return C[o] = l(S), Ye(r, this, C);
        };
      }
      function Ri(r, o) {
        return o.length < 2 ? r : Wt(r, lt(o, 0, -1));
      }
      function qc(r, o) {
        for (var l = r.length, c = Le(o.length, l), d = qe(r); c--; ) {
          var y = o[c];
          r[c] = Dt(y, l) ? d[y] : n;
        }
        return r;
      }
      function Do(r, o) {
        if (!(o === "constructor" && typeof r[o] == "function") && o != "__proto__")
          return r[o];
      }
      var Ni = Li(ii), On = iu || function(r, o) {
        return Ne.setTimeout(r, o);
      }, Ao = Li(hc);
      function Mi(r, o, l) {
        var c = o + "";
        return Ao(r, Rc(c, Wc(Pc(c), l)));
      }
      function Li(r) {
        var o = 0, l = 0;
        return function() {
          var c = cu(), d = R - (c - l);
          if (l = c, d > 0) {
            if (++o >= oe)
              return arguments[0];
          } else
            o = 0;
          return r.apply(n, arguments);
        };
      }
      function pr(r, o) {
        var l = -1, c = r.length, d = c - 1;
        for (o = o === n ? c : o; ++l < o; ) {
          var y = uo(l, d), S = r[y];
          r[y] = r[l], r[l] = S;
        }
        return r.length = o, r;
      }
      var Vi = Uc(function(r) {
        var o = [];
        return r.charCodeAt(0) === 46 && o.push(""), r.replace(Fl, function(l, c, d, y) {
          o.push(d ? y.replace(jl, "$1") : c || l);
        }), o;
      });
      function _t(r) {
        if (typeof r == "string" || Xe(r))
          return r;
        var o = r + "";
        return o == "0" && 1 / r == -fe ? "-0" : o;
      }
      function Gt(r) {
        if (r != null) {
          try {
            return Hn.call(r);
          } catch {
          }
          try {
            return r + "";
          } catch {
          }
        }
        return "";
      }
      function Wc(r, o) {
        return rt(Ot, function(l) {
          var c = "_." + l[0];
          o & l[1] && !Nn(r, c) && r.push(c);
        }), r.sort();
      }
      function Ui(r) {
        if (r instanceof ve)
          return r.clone();
        var o = new at(r.__wrapped__, r.__chain__);
        return o.__actions__ = qe(r.__actions__), o.__index__ = r.__index__, o.__values__ = r.__values__, o;
      }
      function Kc(r, o, l) {
        (l ? je(r, o, l) : o === n) ? o = 1 : o = Fe(de(o), 0);
        var c = r == null ? 0 : r.length;
        if (!c || o < 1)
          return [];
        for (var d = 0, y = 0, S = P(Yn(c / o)); d < c; )
          S[y++] = lt(r, d, d += o);
        return S;
      }
      function Gc(r) {
        for (var o = -1, l = r == null ? 0 : r.length, c = 0, d = []; ++o < l; ) {
          var y = r[o];
          y && (d[c++] = y);
        }
        return d;
      }
      function Yc() {
        var r = arguments.length;
        if (!r)
          return [];
        for (var o = P(r - 1), l = arguments[0], c = r; c--; )
          o[c - 1] = arguments[c];
        return Pt(ce(l) ? qe(l) : [l], Me(o, 1));
      }
      var Qc = he(function(r, o) {
        return $e(r) ? Tn(r, Me(o, 1, $e, !0)) : [];
      }), Jc = he(function(r, o) {
        var l = st(o);
        return $e(l) && (l = n), $e(r) ? Tn(r, Me(o, 1, $e, !0), re(l, 2)) : [];
      }), Xc = he(function(r, o) {
        var l = st(o);
        return $e(l) && (l = n), $e(r) ? Tn(r, Me(o, 1, $e, !0), n, l) : [];
      });
      function Zc(r, o, l) {
        var c = r == null ? 0 : r.length;
        return c ? (o = l || o === n ? 1 : de(o), lt(r, o < 0 ? 0 : o, c)) : [];
      }
      function ef(r, o, l) {
        var c = r == null ? 0 : r.length;
        return c ? (o = l || o === n ? 1 : de(o), o = c - o, lt(r, 0, o < 0 ? 0 : o)) : [];
      }
      function tf(r, o) {
        return r && r.length ? ar(r, re(o, 3), !0, !0) : [];
      }
      function nf(r, o) {
        return r && r.length ? ar(r, re(o, 3), !0) : [];
      }
      function rf(r, o, l, c) {
        var d = r == null ? 0 : r.length;
        return d ? (l && typeof l != "number" && je(r, o, l) && (l = 0, c = d), Yu(r, o, l, c)) : [];
      }
      function Hi(r, o, l) {
        var c = r == null ? 0 : r.length;
        if (!c)
          return -1;
        var d = l == null ? 0 : de(l);
        return d < 0 && (d = Fe(c + d, 0)), Mn(r, re(o, 3), d);
      }
      function ji(r, o, l) {
        var c = r == null ? 0 : r.length;
        if (!c)
          return -1;
        var d = c - 1;
        return l !== n && (d = de(l), d = l < 0 ? Fe(c + d, 0) : Le(d, c - 1)), Mn(r, re(o, 3), d, !0);
      }
      function zi(r) {
        var o = r == null ? 0 : r.length;
        return o ? Me(r, 1) : [];
      }
      function of(r) {
        var o = r == null ? 0 : r.length;
        return o ? Me(r, fe) : [];
      }
      function af(r, o) {
        var l = r == null ? 0 : r.length;
        return l ? (o = o === n ? 1 : de(o), Me(r, o)) : [];
      }
      function lf(r) {
        for (var o = -1, l = r == null ? 0 : r.length, c = {}; ++o < l; ) {
          var d = r[o];
          c[d[0]] = d[1];
        }
        return c;
      }
      function qi(r) {
        return r && r.length ? r[0] : n;
      }
      function sf(r, o, l) {
        var c = r == null ? 0 : r.length;
        if (!c)
          return -1;
        var d = l == null ? 0 : de(l);
        return d < 0 && (d = Fe(c + d, 0)), Xt(r, o, d);
      }
      function uf(r) {
        var o = r == null ? 0 : r.length;
        return o ? lt(r, 0, -1) : [];
      }
      var cf = he(function(r) {
        var o = De(r, go);
        return o.length && o[0] === r[0] ? oo(o) : [];
      }), ff = he(function(r) {
        var o = st(r), l = De(r, go);
        return o === st(l) ? o = n : l.pop(), l.length && l[0] === r[0] ? oo(l, re(o, 2)) : [];
      }), df = he(function(r) {
        var o = st(r), l = De(r, go);
        return o = typeof o == "function" ? o : n, o && l.pop(), l.length && l[0] === r[0] ? oo(l, n, o) : [];
      });
      function pf(r, o) {
        return r == null ? "" : su.call(r, o);
      }
      function st(r) {
        var o = r == null ? 0 : r.length;
        return o ? r[o - 1] : n;
      }
      function hf(r, o, l) {
        var c = r == null ? 0 : r.length;
        if (!c)
          return -1;
        var d = c;
        return l !== n && (d = de(l), d = d < 0 ? Fe(c + d, 0) : Le(d, c - 1)), o === o ? Ws(r, o, d) : Mn(r, Ta, d, !0);
      }
      function gf(r, o) {
        return r && r.length ? ni(r, de(o)) : n;
      }
      var mf = he(Wi);
      function Wi(r, o) {
        return r && r.length && o && o.length ? so(r, o) : r;
      }
      function vf(r, o, l) {
        return r && r.length && o && o.length ? so(r, o, re(l, 2)) : r;
      }
      function yf(r, o, l) {
        return r && r.length && o && o.length ? so(r, o, n, l) : r;
      }
      var bf = xt(function(r, o) {
        var l = r == null ? 0 : r.length, c = eo(r, o);
        return ai(r, De(o, function(d) {
          return Dt(d, l) ? +d : d;
        }).sort(gi)), c;
      });
      function _f(r, o) {
        var l = [];
        if (!(r && r.length))
          return l;
        var c = -1, d = [], y = r.length;
        for (o = re(o, 3); ++c < y; ) {
          var S = r[c];
          o(S, c, r) && (l.push(S), d.push(c));
        }
        return ai(r, d), l;
      }
      function ko(r) {
        return r == null ? r : du.call(r);
      }
      function Sf(r, o, l) {
        var c = r == null ? 0 : r.length;
        return c ? (l && typeof l != "number" && je(r, o, l) ? (o = 0, l = c) : (o = o == null ? 0 : de(o), l = l === n ? c : de(l)), lt(r, o, l)) : [];
      }
      function Ef(r, o) {
        return or(r, o);
      }
      function wf(r, o, l) {
        return fo(r, o, re(l, 2));
      }
      function Cf(r, o) {
        var l = r == null ? 0 : r.length;
        if (l) {
          var c = or(r, o);
          if (c < l && mt(r[c], o))
            return c;
        }
        return -1;
      }
      function Tf(r, o) {
        return or(r, o, !0);
      }
      function xf(r, o, l) {
        return fo(r, o, re(l, 2), !0);
      }
      function Df(r, o) {
        var l = r == null ? 0 : r.length;
        if (l) {
          var c = or(r, o, !0) - 1;
          if (mt(r[c], o))
            return c;
        }
        return -1;
      }
      function Af(r) {
        return r && r.length ? li(r) : [];
      }
      function kf(r, o) {
        return r && r.length ? li(r, re(o, 2)) : [];
      }
      function $f(r) {
        var o = r == null ? 0 : r.length;
        return o ? lt(r, 1, o) : [];
      }
      function Of(r, o, l) {
        return r && r.length ? (o = l || o === n ? 1 : de(o), lt(r, 0, o < 0 ? 0 : o)) : [];
      }
      function If(r, o, l) {
        var c = r == null ? 0 : r.length;
        return c ? (o = l || o === n ? 1 : de(o), o = c - o, lt(r, o < 0 ? 0 : o, c)) : [];
      }
      function Pf(r, o) {
        return r && r.length ? ar(r, re(o, 3), !1, !0) : [];
      }
      function Bf(r, o) {
        return r && r.length ? ar(r, re(o, 3)) : [];
      }
      var Ff = he(function(r) {
        return Nt(Me(r, 1, $e, !0));
      }), Rf = he(function(r) {
        var o = st(r);
        return $e(o) && (o = n), Nt(Me(r, 1, $e, !0), re(o, 2));
      }), Nf = he(function(r) {
        var o = st(r);
        return o = typeof o == "function" ? o : n, Nt(Me(r, 1, $e, !0), n, o);
      });
      function Mf(r) {
        return r && r.length ? Nt(r) : [];
      }
      function Lf(r, o) {
        return r && r.length ? Nt(r, re(o, 2)) : [];
      }
      function Vf(r, o) {
        return o = typeof o == "function" ? o : n, r && r.length ? Nt(r, n, o) : [];
      }
      function $o(r) {
        if (!(r && r.length))
          return [];
        var o = 0;
        return r = It(r, function(l) {
          if ($e(l))
            return o = Fe(l.length, o), !0;
        }), Wr(o, function(l) {
          return De(r, jr(l));
        });
      }
      function Ki(r, o) {
        if (!(r && r.length))
          return [];
        var l = $o(r);
        return o == null ? l : De(l, function(c) {
          return Ye(o, n, c);
        });
      }
      var Uf = he(function(r, o) {
        return $e(r) ? Tn(r, o) : [];
      }), Hf = he(function(r) {
        return ho(It(r, $e));
      }), jf = he(function(r) {
        var o = st(r);
        return $e(o) && (o = n), ho(It(r, $e), re(o, 2));
      }), zf = he(function(r) {
        var o = st(r);
        return o = typeof o == "function" ? o : n, ho(It(r, $e), n, o);
      }), qf = he($o);
      function Wf(r, o) {
        return fi(r || [], o || [], Cn);
      }
      function Kf(r, o) {
        return fi(r || [], o || [], An);
      }
      var Gf = he(function(r) {
        var o = r.length, l = o > 1 ? r[o - 1] : n;
        return l = typeof l == "function" ? (r.pop(), l) : n, Ki(r, l);
      });
      function Gi(r) {
        var o = g(r);
        return o.__chain__ = !0, o;
      }
      function Yf(r, o) {
        return o(r), r;
      }
      function hr(r, o) {
        return o(r);
      }
      var Qf = xt(function(r) {
        var o = r.length, l = o ? r[0] : 0, c = this.__wrapped__, d = function(y) {
          return eo(y, r);
        };
        return o > 1 || this.__actions__.length || !(c instanceof ve) || !Dt(l) ? this.thru(d) : (c = c.slice(l, +l + (o ? 1 : 0)), c.__actions__.push({
          func: hr,
          args: [d],
          thisArg: n
        }), new at(c, this.__chain__).thru(function(y) {
          return o && !y.length && y.push(n), y;
        }));
      });
      function Jf() {
        return Gi(this);
      }
      function Xf() {
        return new at(this.value(), this.__chain__);
      }
      function Zf() {
        this.__values__ === n && (this.__values__ = sl(this.value()));
        var r = this.__index__ >= this.__values__.length, o = r ? n : this.__values__[this.__index__++];
        return { done: r, value: o };
      }
      function ed() {
        return this;
      }
      function td(r) {
        for (var o, l = this; l instanceof Zn; ) {
          var c = Ui(l);
          c.__index__ = 0, c.__values__ = n, o ? d.__wrapped__ = c : o = c;
          var d = c;
          l = l.__wrapped__;
        }
        return d.__wrapped__ = r, o;
      }
      function nd() {
        var r = this.__wrapped__;
        if (r instanceof ve) {
          var o = r;
          return this.__actions__.length && (o = new ve(this)), o = o.reverse(), o.__actions__.push({
            func: hr,
            args: [ko],
            thisArg: n
          }), new at(o, this.__chain__);
        }
        return this.thru(ko);
      }
      function rd() {
        return ci(this.__wrapped__, this.__actions__);
      }
      var od = ir(function(r, o, l) {
        Ee.call(r, l) ? ++r[l] : Ct(r, l, 1);
      });
      function ad(r, o, l) {
        var c = ce(r) ? wa : Gu;
        return l && je(r, o, l) && (o = n), c(r, re(o, 3));
      }
      function id(r, o) {
        var l = ce(r) ? It : Ka;
        return l(r, re(o, 3));
      }
      var ld = Si(Hi), sd = Si(ji);
      function ud(r, o) {
        return Me(gr(r, o), 1);
      }
      function cd(r, o) {
        return Me(gr(r, o), fe);
      }
      function fd(r, o, l) {
        return l = l === n ? 1 : de(l), Me(gr(r, o), l);
      }
      function Yi(r, o) {
        var l = ce(r) ? rt : Rt;
        return l(r, re(o, 3));
      }
      function Qi(r, o) {
        var l = ce(r) ? ks : Wa;
        return l(r, re(o, 3));
      }
      var dd = ir(function(r, o, l) {
        Ee.call(r, l) ? r[l].push(o) : Ct(r, l, [o]);
      });
      function pd(r, o, l, c) {
        r = We(r) ? r : dn(r), l = l && !c ? de(l) : 0;
        var d = r.length;
        return l < 0 && (l = Fe(d + l, 0)), _r(r) ? l <= d && r.indexOf(o, l) > -1 : !!d && Xt(r, o, l) > -1;
      }
      var hd = he(function(r, o, l) {
        var c = -1, d = typeof o == "function", y = We(r) ? P(r.length) : [];
        return Rt(r, function(S) {
          y[++c] = d ? Ye(o, S, l) : xn(S, o, l);
        }), y;
      }), gd = ir(function(r, o, l) {
        Ct(r, l, o);
      });
      function gr(r, o) {
        var l = ce(r) ? De : Za;
        return l(r, re(o, 3));
      }
      function md(r, o, l, c) {
        return r == null ? [] : (ce(o) || (o = o == null ? [] : [o]), l = c ? n : l, ce(l) || (l = l == null ? [] : [l]), ri(r, o, l));
      }
      var vd = ir(function(r, o, l) {
        r[l ? 0 : 1].push(o);
      }, function() {
        return [[], []];
      });
      function yd(r, o, l) {
        var c = ce(r) ? Ur : Da, d = arguments.length < 3;
        return c(r, re(o, 4), l, d, Rt);
      }
      function bd(r, o, l) {
        var c = ce(r) ? $s : Da, d = arguments.length < 3;
        return c(r, re(o, 4), l, d, Wa);
      }
      function _d(r, o) {
        var l = ce(r) ? It : Ka;
        return l(r, yr(re(o, 3)));
      }
      function Sd(r) {
        var o = ce(r) ? Ha : dc;
        return o(r);
      }
      function Ed(r, o, l) {
        (l ? je(r, o, l) : o === n) ? o = 1 : o = de(o);
        var c = ce(r) ? ju : pc;
        return c(r, o);
      }
      function wd(r) {
        var o = ce(r) ? zu : gc;
        return o(r);
      }
      function Cd(r) {
        if (r == null)
          return 0;
        if (We(r))
          return _r(r) ? en(r) : r.length;
        var o = Ve(r);
        return o == dt || o == pt ? r.size : io(r).length;
      }
      function Td(r, o, l) {
        var c = ce(r) ? Hr : mc;
        return l && je(r, o, l) && (o = n), c(r, re(o, 3));
      }
      var xd = he(function(r, o) {
        if (r == null)
          return [];
        var l = o.length;
        return l > 1 && je(r, o[0], o[1]) ? o = [] : l > 2 && je(o[0], o[1], o[2]) && (o = [o[0]]), ri(r, Me(o, 1), []);
      }), mr = au || function() {
        return Ne.Date.now();
      };
      function Dd(r, o) {
        if (typeof o != "function")
          throw new ot(u);
        return r = de(r), function() {
          if (--r < 1)
            return o.apply(this, arguments);
        };
      }
      function Ji(r, o, l) {
        return o = l ? n : o, o = r && o == null ? r.length : o, Tt(r, J, n, n, n, n, o);
      }
      function Xi(r, o) {
        var l;
        if (typeof o != "function")
          throw new ot(u);
        return r = de(r), function() {
          return --r > 0 && (l = o.apply(this, arguments)), r <= 1 && (o = n), l;
        };
      }
      var Oo = he(function(r, o, l) {
        var c = O;
        if (l.length) {
          var d = Bt(l, cn(Oo));
          c |= G;
        }
        return Tt(r, c, o, l, d);
      }), Zi = he(function(r, o, l) {
        var c = O | I;
        if (l.length) {
          var d = Bt(l, cn(Zi));
          c |= G;
        }
        return Tt(o, c, r, l, d);
      });
      function el(r, o, l) {
        o = l ? n : o;
        var c = Tt(r, L, n, n, n, n, n, o);
        return c.placeholder = el.placeholder, c;
      }
      function tl(r, o, l) {
        o = l ? n : o;
        var c = Tt(r, z, n, n, n, n, n, o);
        return c.placeholder = tl.placeholder, c;
      }
      function nl(r, o, l) {
        var c, d, y, S, C, k, N = 0, M = !1, V = !1, K = !0;
        if (typeof r != "function")
          throw new ot(u);
        o = ut(o) || 0, Ae(l) && (M = !!l.leading, V = "maxWait" in l, y = V ? Fe(ut(l.maxWait) || 0, o) : y, K = "trailing" in l ? !!l.trailing : K);
        function X(Oe) {
          var vt = c, $t = d;
          return c = d = n, N = Oe, S = r.apply($t, vt), S;
        }
        function ae(Oe) {
          return N = Oe, C = On(me, o), M ? X(Oe) : S;
        }
        function pe(Oe) {
          var vt = Oe - k, $t = Oe - N, Sl = o - vt;
          return V ? Le(Sl, y - $t) : Sl;
        }
        function ie(Oe) {
          var vt = Oe - k, $t = Oe - N;
          return k === n || vt >= o || vt < 0 || V && $t >= y;
        }
        function me() {
          var Oe = mr();
          if (ie(Oe))
            return ye(Oe);
          C = On(me, pe(Oe));
        }
        function ye(Oe) {
          return C = n, K && c ? X(Oe) : (c = d = n, S);
        }
        function Ze() {
          C !== n && di(C), N = 0, c = k = d = C = n;
        }
        function ze() {
          return C === n ? S : ye(mr());
        }
        function et() {
          var Oe = mr(), vt = ie(Oe);
          if (c = arguments, d = this, k = Oe, vt) {
            if (C === n)
              return ae(k);
            if (V)
              return di(C), C = On(me, o), X(k);
          }
          return C === n && (C = On(me, o)), S;
        }
        return et.cancel = Ze, et.flush = ze, et;
      }
      var Ad = he(function(r, o) {
        return qa(r, 1, o);
      }), kd = he(function(r, o, l) {
        return qa(r, ut(o) || 0, l);
      });
      function $d(r) {
        return Tt(r, q);
      }
      function vr(r, o) {
        if (typeof r != "function" || o != null && typeof o != "function")
          throw new ot(u);
        var l = function() {
          var c = arguments, d = o ? o.apply(this, c) : c[0], y = l.cache;
          if (y.has(d))
            return y.get(d);
          var S = r.apply(this, c);
          return l.cache = y.set(d, S) || y, S;
        };
        return l.cache = new (vr.Cache || wt)(), l;
      }
      vr.Cache = wt;
      function yr(r) {
        if (typeof r != "function")
          throw new ot(u);
        return function() {
          var o = arguments;
          switch (o.length) {
            case 0:
              return !r.call(this);
            case 1:
              return !r.call(this, o[0]);
            case 2:
              return !r.call(this, o[0], o[1]);
            case 3:
              return !r.call(this, o[0], o[1], o[2]);
          }
          return !r.apply(this, o);
        };
      }
      function Od(r) {
        return Xi(2, r);
      }
      var Id = vc(function(r, o) {
        o = o.length == 1 && ce(o[0]) ? De(o[0], Qe(re())) : De(Me(o, 1), Qe(re()));
        var l = o.length;
        return he(function(c) {
          for (var d = -1, y = Le(c.length, l); ++d < y; )
            c[d] = o[d].call(this, c[d]);
          return Ye(r, this, c);
        });
      }), Io = he(function(r, o) {
        var l = Bt(o, cn(Io));
        return Tt(r, G, n, o, l);
      }), rl = he(function(r, o) {
        var l = Bt(o, cn(rl));
        return Tt(r, Z, n, o, l);
      }), Pd = xt(function(r, o) {
        return Tt(r, x, n, n, n, o);
      });
      function Bd(r, o) {
        if (typeof r != "function")
          throw new ot(u);
        return o = o === n ? o : de(o), he(r, o);
      }
      function Fd(r, o) {
        if (typeof r != "function")
          throw new ot(u);
        return o = o == null ? 0 : Fe(de(o), 0), he(function(l) {
          var c = l[o], d = Lt(l, 0, o);
          return c && Pt(d, c), Ye(r, this, d);
        });
      }
      function Rd(r, o, l) {
        var c = !0, d = !0;
        if (typeof r != "function")
          throw new ot(u);
        return Ae(l) && (c = "leading" in l ? !!l.leading : c, d = "trailing" in l ? !!l.trailing : d), nl(r, o, {
          leading: c,
          maxWait: o,
          trailing: d
        });
      }
      function Nd(r) {
        return Ji(r, 1);
      }
      function Md(r, o) {
        return Io(mo(o), r);
      }
      function Ld() {
        if (!arguments.length)
          return [];
        var r = arguments[0];
        return ce(r) ? r : [r];
      }
      function Vd(r) {
        return it(r, w);
      }
      function Ud(r, o) {
        return o = typeof o == "function" ? o : n, it(r, w, o);
      }
      function Hd(r) {
        return it(r, _ | w);
      }
      function jd(r, o) {
        return o = typeof o == "function" ? o : n, it(r, _ | w, o);
      }
      function zd(r, o) {
        return o == null || za(r, o, Re(o));
      }
      function mt(r, o) {
        return r === o || r !== r && o !== o;
      }
      var qd = cr(ro), Wd = cr(function(r, o) {
        return r >= o;
      }), Yt = Qa(function() {
        return arguments;
      }()) ? Qa : function(r) {
        return ke(r) && Ee.call(r, "callee") && !Ra.call(r, "callee");
      }, ce = P.isArray, Kd = ma ? Qe(ma) : ec;
      function We(r) {
        return r != null && br(r.length) && !At(r);
      }
      function $e(r) {
        return ke(r) && We(r);
      }
      function Gd(r) {
        return r === !0 || r === !1 || ke(r) && He(r) == ge;
      }
      var Vt = lu || jo, Yd = va ? Qe(va) : tc;
      function Qd(r) {
        return ke(r) && r.nodeType === 1 && !In(r);
      }
      function Jd(r) {
        if (r == null)
          return !0;
        if (We(r) && (ce(r) || typeof r == "string" || typeof r.splice == "function" || Vt(r) || fn(r) || Yt(r)))
          return !r.length;
        var o = Ve(r);
        if (o == dt || o == pt)
          return !r.size;
        if ($n(r))
          return !io(r).length;
        for (var l in r)
          if (Ee.call(r, l))
            return !1;
        return !0;
      }
      function Xd(r, o) {
        return Dn(r, o);
      }
      function Zd(r, o, l) {
        l = typeof l == "function" ? l : n;
        var c = l ? l(r, o) : n;
        return c === n ? Dn(r, o, n, l) : !!c;
      }
      function Po(r) {
        if (!ke(r))
          return !1;
        var o = He(r);
        return o == Ue || o == Ie || typeof r.message == "string" && typeof r.name == "string" && !In(r);
      }
      function ep(r) {
        return typeof r == "number" && Ma(r);
      }
      function At(r) {
        if (!Ae(r))
          return !1;
        var o = He(r);
        return o == ft || o == zo || o == ee || o == wl;
      }
      function ol(r) {
        return typeof r == "number" && r == de(r);
      }
      function br(r) {
        return typeof r == "number" && r > -1 && r % 1 == 0 && r <= $;
      }
      function Ae(r) {
        var o = typeof r;
        return r != null && (o == "object" || o == "function");
      }
      function ke(r) {
        return r != null && typeof r == "object";
      }
      var al = ya ? Qe(ya) : rc;
      function tp(r, o) {
        return r === o || ao(r, o, wo(o));
      }
      function np(r, o, l) {
        return l = typeof l == "function" ? l : n, ao(r, o, wo(o), l);
      }
      function rp(r) {
        return il(r) && r != +r;
      }
      function op(r) {
        if (Vc(r))
          throw new ue(s);
        return Ja(r);
      }
      function ap(r) {
        return r === null;
      }
      function ip(r) {
        return r == null;
      }
      function il(r) {
        return typeof r == "number" || ke(r) && He(r) == pn;
      }
      function In(r) {
        if (!ke(r) || He(r) != St)
          return !1;
        var o = Wn(r);
        if (o === null)
          return !0;
        var l = Ee.call(o, "constructor") && o.constructor;
        return typeof l == "function" && l instanceof l && Hn.call(l) == tu;
      }
      var Bo = ba ? Qe(ba) : oc;
      function lp(r) {
        return ol(r) && r >= -$ && r <= $;
      }
      var ll = Sa ? Qe(Sa) : ac;
      function _r(r) {
        return typeof r == "string" || !ce(r) && ke(r) && He(r) == gn;
      }
      function Xe(r) {
        return typeof r == "symbol" || ke(r) && He(r) == Pn;
      }
      var fn = Ea ? Qe(Ea) : ic;
      function sp(r) {
        return r === n;
      }
      function up(r) {
        return ke(r) && Ve(r) == mn;
      }
      function cp(r) {
        return ke(r) && He(r) == Tl;
      }
      var fp = cr(lo), dp = cr(function(r, o) {
        return r <= o;
      });
      function sl(r) {
        if (!r)
          return [];
        if (We(r))
          return _r(r) ? ht(r) : qe(r);
        if (bn && r[bn])
          return js(r[bn]());
        var o = Ve(r), l = o == dt ? Gr : o == pt ? Ln : dn;
        return l(r);
      }
      function kt(r) {
        if (!r)
          return r === 0 ? r : 0;
        if (r = ut(r), r === fe || r === -fe) {
          var o = r < 0 ? -1 : 1;
          return o * U;
        }
        return r === r ? r : 0;
      }
      function de(r) {
        var o = kt(r), l = o % 1;
        return o === o ? l ? o - l : o : 0;
      }
      function ul(r) {
        return r ? qt(de(r), 0, se) : 0;
      }
      function ut(r) {
        if (typeof r == "number")
          return r;
        if (Xe(r))
          return ne;
        if (Ae(r)) {
          var o = typeof r.valueOf == "function" ? r.valueOf() : r;
          r = Ae(o) ? o + "" : o;
        }
        if (typeof r != "string")
          return r === 0 ? r : +r;
        r = Aa(r);
        var l = Wl.test(r);
        return l || Gl.test(r) ? xs(r.slice(2), l ? 2 : 8) : ql.test(r) ? ne : +r;
      }
      function cl(r) {
        return bt(r, Ke(r));
      }
      function pp(r) {
        return r ? qt(de(r), -$, $) : r === 0 ? r : 0;
      }
      function Se(r) {
        return r == null ? "" : Je(r);
      }
      var hp = sn(function(r, o) {
        if ($n(o) || We(o)) {
          bt(o, Re(o), r);
          return;
        }
        for (var l in o)
          Ee.call(o, l) && Cn(r, l, o[l]);
      }), fl = sn(function(r, o) {
        bt(o, Ke(o), r);
      }), Sr = sn(function(r, o, l, c) {
        bt(o, Ke(o), r, c);
      }), gp = sn(function(r, o, l, c) {
        bt(o, Re(o), r, c);
      }), mp = xt(eo);
      function vp(r, o) {
        var l = ln(r);
        return o == null ? l : ja(l, o);
      }
      var yp = he(function(r, o) {
        r = we(r);
        var l = -1, c = o.length, d = c > 2 ? o[2] : n;
        for (d && je(o[0], o[1], d) && (c = 1); ++l < c; )
          for (var y = o[l], S = Ke(y), C = -1, k = S.length; ++C < k; ) {
            var N = S[C], M = r[N];
            (M === n || mt(M, nn[N]) && !Ee.call(r, N)) && (r[N] = y[N]);
          }
        return r;
      }), bp = he(function(r) {
        return r.push(n, Ai), Ye(dl, n, r);
      });
      function _p(r, o) {
        return Ca(r, re(o, 3), yt);
      }
      function Sp(r, o) {
        return Ca(r, re(o, 3), no);
      }
      function Ep(r, o) {
        return r == null ? r : to(r, re(o, 3), Ke);
      }
      function wp(r, o) {
        return r == null ? r : Ga(r, re(o, 3), Ke);
      }
      function Cp(r, o) {
        return r && yt(r, re(o, 3));
      }
      function Tp(r, o) {
        return r && no(r, re(o, 3));
      }
      function xp(r) {
        return r == null ? [] : nr(r, Re(r));
      }
      function Dp(r) {
        return r == null ? [] : nr(r, Ke(r));
      }
      function Fo(r, o, l) {
        var c = r == null ? n : Wt(r, o);
        return c === n ? l : c;
      }
      function Ap(r, o) {
        return r != null && Oi(r, o, Qu);
      }
      function Ro(r, o) {
        return r != null && Oi(r, o, Ju);
      }
      var kp = wi(function(r, o, l) {
        o != null && typeof o.toString != "function" && (o = jn.call(o)), r[o] = l;
      }, Mo(Ge)), $p = wi(function(r, o, l) {
        o != null && typeof o.toString != "function" && (o = jn.call(o)), Ee.call(r, o) ? r[o].push(l) : r[o] = [l];
      }, re), Op = he(xn);
      function Re(r) {
        return We(r) ? Ua(r) : io(r);
      }
      function Ke(r) {
        return We(r) ? Ua(r, !0) : lc(r);
      }
      function Ip(r, o) {
        var l = {};
        return o = re(o, 3), yt(r, function(c, d, y) {
          Ct(l, o(c, d, y), c);
        }), l;
      }
      function Pp(r, o) {
        var l = {};
        return o = re(o, 3), yt(r, function(c, d, y) {
          Ct(l, d, o(c, d, y));
        }), l;
      }
      var Bp = sn(function(r, o, l) {
        rr(r, o, l);
      }), dl = sn(function(r, o, l, c) {
        rr(r, o, l, c);
      }), Fp = xt(function(r, o) {
        var l = {};
        if (r == null)
          return l;
        var c = !1;
        o = De(o, function(y) {
          return y = Mt(y, r), c || (c = y.length > 1), y;
        }), bt(r, So(r), l), c && (l = it(l, _ | E | w, Ac));
        for (var d = o.length; d--; )
          po(l, o[d]);
        return l;
      });
      function Rp(r, o) {
        return pl(r, yr(re(o)));
      }
      var Np = xt(function(r, o) {
        return r == null ? {} : uc(r, o);
      });
      function pl(r, o) {
        if (r == null)
          return {};
        var l = De(So(r), function(c) {
          return [c];
        });
        return o = re(o), oi(r, l, function(c, d) {
          return o(c, d[0]);
        });
      }
      function Mp(r, o, l) {
        o = Mt(o, r);
        var c = -1, d = o.length;
        for (d || (d = 1, r = n); ++c < d; ) {
          var y = r == null ? n : r[_t(o[c])];
          y === n && (c = d, y = l), r = At(y) ? y.call(r) : y;
        }
        return r;
      }
      function Lp(r, o, l) {
        return r == null ? r : An(r, o, l);
      }
      function Vp(r, o, l, c) {
        return c = typeof c == "function" ? c : n, r == null ? r : An(r, o, l, c);
      }
      var hl = xi(Re), gl = xi(Ke);
      function Up(r, o, l) {
        var c = ce(r), d = c || Vt(r) || fn(r);
        if (o = re(o, 4), l == null) {
          var y = r && r.constructor;
          d ? l = c ? new y() : [] : Ae(r) ? l = At(y) ? ln(Wn(r)) : {} : l = {};
        }
        return (d ? rt : yt)(r, function(S, C, k) {
          return o(l, S, C, k);
        }), l;
      }
      function Hp(r, o) {
        return r == null ? !0 : po(r, o);
      }
      function jp(r, o, l) {
        return r == null ? r : ui(r, o, mo(l));
      }
      function zp(r, o, l, c) {
        return c = typeof c == "function" ? c : n, r == null ? r : ui(r, o, mo(l), c);
      }
      function dn(r) {
        return r == null ? [] : Kr(r, Re(r));
      }
      function qp(r) {
        return r == null ? [] : Kr(r, Ke(r));
      }
      function Wp(r, o, l) {
        return l === n && (l = o, o = n), l !== n && (l = ut(l), l = l === l ? l : 0), o !== n && (o = ut(o), o = o === o ? o : 0), qt(ut(r), o, l);
      }
      function Kp(r, o, l) {
        return o = kt(o), l === n ? (l = o, o = 0) : l = kt(l), r = ut(r), Xu(r, o, l);
      }
      function Gp(r, o, l) {
        if (l && typeof l != "boolean" && je(r, o, l) && (o = l = n), l === n && (typeof o == "boolean" ? (l = o, o = n) : typeof r == "boolean" && (l = r, r = n)), r === n && o === n ? (r = 0, o = 1) : (r = kt(r), o === n ? (o = r, r = 0) : o = kt(o)), r > o) {
          var c = r;
          r = o, o = c;
        }
        if (l || r % 1 || o % 1) {
          var d = La();
          return Le(r + d * (o - r + Ts("1e-" + ((d + "").length - 1))), o);
        }
        return uo(r, o);
      }
      var Yp = un(function(r, o, l) {
        return o = o.toLowerCase(), r + (l ? ml(o) : o);
      });
      function ml(r) {
        return No(Se(r).toLowerCase());
      }
      function vl(r) {
        return r = Se(r), r && r.replace(Ql, Ms).replace(gs, "");
      }
      function Qp(r, o, l) {
        r = Se(r), o = Je(o);
        var c = r.length;
        l = l === n ? c : qt(de(l), 0, c);
        var d = l;
        return l -= o.length, l >= 0 && r.slice(l, d) == o;
      }
      function Jp(r) {
        return r = Se(r), r && $l.test(r) ? r.replace(Ko, Ls) : r;
      }
      function Xp(r) {
        return r = Se(r), r && Rl.test(r) ? r.replace(Or, "\\$&") : r;
      }
      var Zp = un(function(r, o, l) {
        return r + (l ? "-" : "") + o.toLowerCase();
      }), eh = un(function(r, o, l) {
        return r + (l ? " " : "") + o.toLowerCase();
      }), th = _i("toLowerCase");
      function nh(r, o, l) {
        r = Se(r), o = de(o);
        var c = o ? en(r) : 0;
        if (!o || c >= o)
          return r;
        var d = (o - c) / 2;
        return ur(Qn(d), l) + r + ur(Yn(d), l);
      }
      function rh(r, o, l) {
        r = Se(r), o = de(o);
        var c = o ? en(r) : 0;
        return o && c < o ? r + ur(o - c, l) : r;
      }
      function oh(r, o, l) {
        r = Se(r), o = de(o);
        var c = o ? en(r) : 0;
        return o && c < o ? ur(o - c, l) + r : r;
      }
      function ah(r, o, l) {
        return l || o == null ? o = 0 : o && (o = +o), fu(Se(r).replace(Ir, ""), o || 0);
      }
      function ih(r, o, l) {
        return (l ? je(r, o, l) : o === n) ? o = 1 : o = de(o), co(Se(r), o);
      }
      function lh() {
        var r = arguments, o = Se(r[0]);
        return r.length < 3 ? o : o.replace(r[1], r[2]);
      }
      var sh = un(function(r, o, l) {
        return r + (l ? "_" : "") + o.toLowerCase();
      });
      function uh(r, o, l) {
        return l && typeof l != "number" && je(r, o, l) && (o = l = n), l = l === n ? se : l >>> 0, l ? (r = Se(r), r && (typeof o == "string" || o != null && !Bo(o)) && (o = Je(o), !o && Zt(r)) ? Lt(ht(r), 0, l) : r.split(o, l)) : [];
      }
      var ch = un(function(r, o, l) {
        return r + (l ? " " : "") + No(o);
      });
      function fh(r, o, l) {
        return r = Se(r), l = l == null ? 0 : qt(de(l), 0, r.length), o = Je(o), r.slice(l, l + o.length) == o;
      }
      function dh(r, o, l) {
        var c = g.templateSettings;
        l && je(r, o, l) && (o = n), r = Se(r), o = Sr({}, o, c, Di);
        var d = Sr({}, o.imports, c.imports, Di), y = Re(d), S = Kr(d, y), C, k, N = 0, M = o.interpolate || Bn, V = "__p += '", K = Yr(
          (o.escape || Bn).source + "|" + M.source + "|" + (M === Go ? zl : Bn).source + "|" + (o.evaluate || Bn).source + "|$",
          "g"
        ), X = "//# sourceURL=" + (Ee.call(o, "sourceURL") ? (o.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++_s + "]") + `
`;
        r.replace(K, function(ie, me, ye, Ze, ze, et) {
          return ye || (ye = Ze), V += r.slice(N, et).replace(Jl, Vs), me && (C = !0, V += `' +
__e(` + me + `) +
'`), ze && (k = !0, V += `';
` + ze + `;
__p += '`), ye && (V += `' +
((__t = (` + ye + `)) == null ? '' : __t) +
'`), N = et + ie.length, ie;
        }), V += `';
`;
        var ae = Ee.call(o, "variable") && o.variable;
        if (!ae)
          V = `with (obj) {
` + V + `
}
`;
        else if (Hl.test(ae))
          throw new ue(f);
        V = (k ? V.replace(xl, "") : V).replace(Dl, "$1").replace(Al, "$1;"), V = "function(" + (ae || "obj") + `) {
` + (ae ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (C ? ", __e = _.escape" : "") + (k ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + V + `return __p
}`;
        var pe = bl(function() {
          return _e(y, X + "return " + V).apply(n, S);
        });
        if (pe.source = V, Po(pe))
          throw pe;
        return pe;
      }
      function ph(r) {
        return Se(r).toLowerCase();
      }
      function hh(r) {
        return Se(r).toUpperCase();
      }
      function gh(r, o, l) {
        if (r = Se(r), r && (l || o === n))
          return Aa(r);
        if (!r || !(o = Je(o)))
          return r;
        var c = ht(r), d = ht(o), y = ka(c, d), S = $a(c, d) + 1;
        return Lt(c, y, S).join("");
      }
      function mh(r, o, l) {
        if (r = Se(r), r && (l || o === n))
          return r.slice(0, Ia(r) + 1);
        if (!r || !(o = Je(o)))
          return r;
        var c = ht(r), d = $a(c, ht(o)) + 1;
        return Lt(c, 0, d).join("");
      }
      function vh(r, o, l) {
        if (r = Se(r), r && (l || o === n))
          return r.replace(Ir, "");
        if (!r || !(o = Je(o)))
          return r;
        var c = ht(r), d = ka(c, ht(o));
        return Lt(c, d).join("");
      }
      function yh(r, o) {
        var l = B, c = Y;
        if (Ae(o)) {
          var d = "separator" in o ? o.separator : d;
          l = "length" in o ? de(o.length) : l, c = "omission" in o ? Je(o.omission) : c;
        }
        r = Se(r);
        var y = r.length;
        if (Zt(r)) {
          var S = ht(r);
          y = S.length;
        }
        if (l >= y)
          return r;
        var C = l - en(c);
        if (C < 1)
          return c;
        var k = S ? Lt(S, 0, C).join("") : r.slice(0, C);
        if (d === n)
          return k + c;
        if (S && (C += k.length - C), Bo(d)) {
          if (r.slice(C).search(d)) {
            var N, M = k;
            for (d.global || (d = Yr(d.source, Se(Yo.exec(d)) + "g")), d.lastIndex = 0; N = d.exec(M); )
              var V = N.index;
            k = k.slice(0, V === n ? C : V);
          }
        } else if (r.indexOf(Je(d), C) != C) {
          var K = k.lastIndexOf(d);
          K > -1 && (k = k.slice(0, K));
        }
        return k + c;
      }
      function bh(r) {
        return r = Se(r), r && kl.test(r) ? r.replace(Wo, Ks) : r;
      }
      var _h = un(function(r, o, l) {
        return r + (l ? " " : "") + o.toUpperCase();
      }), No = _i("toUpperCase");
      function yl(r, o, l) {
        return r = Se(r), o = l ? n : o, o === n ? Hs(r) ? Qs(r) : Ps(r) : r.match(o) || [];
      }
      var bl = he(function(r, o) {
        try {
          return Ye(r, n, o);
        } catch (l) {
          return Po(l) ? l : new ue(l);
        }
      }), Sh = xt(function(r, o) {
        return rt(o, function(l) {
          l = _t(l), Ct(r, l, Oo(r[l], r));
        }), r;
      });
      function Eh(r) {
        var o = r == null ? 0 : r.length, l = re();
        return r = o ? De(r, function(c) {
          if (typeof c[1] != "function")
            throw new ot(u);
          return [l(c[0]), c[1]];
        }) : [], he(function(c) {
          for (var d = -1; ++d < o; ) {
            var y = r[d];
            if (Ye(y[0], this, c))
              return Ye(y[1], this, c);
          }
        });
      }
      function wh(r) {
        return Ku(it(r, _));
      }
      function Mo(r) {
        return function() {
          return r;
        };
      }
      function Ch(r, o) {
        return r == null || r !== r ? o : r;
      }
      var Th = Ei(), xh = Ei(!0);
      function Ge(r) {
        return r;
      }
      function Lo(r) {
        return Xa(typeof r == "function" ? r : it(r, _));
      }
      function Dh(r) {
        return ei(it(r, _));
      }
      function Ah(r, o) {
        return ti(r, it(o, _));
      }
      var kh = he(function(r, o) {
        return function(l) {
          return xn(l, r, o);
        };
      }), $h = he(function(r, o) {
        return function(l) {
          return xn(r, l, o);
        };
      });
      function Vo(r, o, l) {
        var c = Re(o), d = nr(o, c);
        l == null && !(Ae(o) && (d.length || !c.length)) && (l = o, o = r, r = this, d = nr(o, Re(o)));
        var y = !(Ae(l) && "chain" in l) || !!l.chain, S = At(r);
        return rt(d, function(C) {
          var k = o[C];
          r[C] = k, S && (r.prototype[C] = function() {
            var N = this.__chain__;
            if (y || N) {
              var M = r(this.__wrapped__), V = M.__actions__ = qe(this.__actions__);
              return V.push({ func: k, args: arguments, thisArg: r }), M.__chain__ = N, M;
            }
            return k.apply(r, Pt([this.value()], arguments));
          });
        }), r;
      }
      function Oh() {
        return Ne._ === this && (Ne._ = nu), this;
      }
      function Uo() {
      }
      function Ih(r) {
        return r = de(r), he(function(o) {
          return ni(o, r);
        });
      }
      var Ph = yo(De), Bh = yo(wa), Fh = yo(Hr);
      function _l(r) {
        return To(r) ? jr(_t(r)) : cc(r);
      }
      function Rh(r) {
        return function(o) {
          return r == null ? n : Wt(r, o);
        };
      }
      var Nh = Ci(), Mh = Ci(!0);
      function Ho() {
        return [];
      }
      function jo() {
        return !1;
      }
      function Lh() {
        return {};
      }
      function Vh() {
        return "";
      }
      function Uh() {
        return !0;
      }
      function Hh(r, o) {
        if (r = de(r), r < 1 || r > $)
          return [];
        var l = se, c = Le(r, se);
        o = re(o), r -= se;
        for (var d = Wr(c, o); ++l < r; )
          o(l);
        return d;
      }
      function jh(r) {
        return ce(r) ? De(r, _t) : Xe(r) ? [r] : qe(Vi(Se(r)));
      }
      function zh(r) {
        var o = ++eu;
        return Se(r) + o;
      }
      var qh = sr(function(r, o) {
        return r + o;
      }, 0), Wh = bo("ceil"), Kh = sr(function(r, o) {
        return r / o;
      }, 1), Gh = bo("floor");
      function Yh(r) {
        return r && r.length ? tr(r, Ge, ro) : n;
      }
      function Qh(r, o) {
        return r && r.length ? tr(r, re(o, 2), ro) : n;
      }
      function Jh(r) {
        return xa(r, Ge);
      }
      function Xh(r, o) {
        return xa(r, re(o, 2));
      }
      function Zh(r) {
        return r && r.length ? tr(r, Ge, lo) : n;
      }
      function eg(r, o) {
        return r && r.length ? tr(r, re(o, 2), lo) : n;
      }
      var tg = sr(function(r, o) {
        return r * o;
      }, 1), ng = bo("round"), rg = sr(function(r, o) {
        return r - o;
      }, 0);
      function og(r) {
        return r && r.length ? qr(r, Ge) : 0;
      }
      function ag(r, o) {
        return r && r.length ? qr(r, re(o, 2)) : 0;
      }
      return g.after = Dd, g.ary = Ji, g.assign = hp, g.assignIn = fl, g.assignInWith = Sr, g.assignWith = gp, g.at = mp, g.before = Xi, g.bind = Oo, g.bindAll = Sh, g.bindKey = Zi, g.castArray = Ld, g.chain = Gi, g.chunk = Kc, g.compact = Gc, g.concat = Yc, g.cond = Eh, g.conforms = wh, g.constant = Mo, g.countBy = od, g.create = vp, g.curry = el, g.curryRight = tl, g.debounce = nl, g.defaults = yp, g.defaultsDeep = bp, g.defer = Ad, g.delay = kd, g.difference = Qc, g.differenceBy = Jc, g.differenceWith = Xc, g.drop = Zc, g.dropRight = ef, g.dropRightWhile = tf, g.dropWhile = nf, g.fill = rf, g.filter = id, g.flatMap = ud, g.flatMapDeep = cd, g.flatMapDepth = fd, g.flatten = zi, g.flattenDeep = of, g.flattenDepth = af, g.flip = $d, g.flow = Th, g.flowRight = xh, g.fromPairs = lf, g.functions = xp, g.functionsIn = Dp, g.groupBy = dd, g.initial = uf, g.intersection = cf, g.intersectionBy = ff, g.intersectionWith = df, g.invert = kp, g.invertBy = $p, g.invokeMap = hd, g.iteratee = Lo, g.keyBy = gd, g.keys = Re, g.keysIn = Ke, g.map = gr, g.mapKeys = Ip, g.mapValues = Pp, g.matches = Dh, g.matchesProperty = Ah, g.memoize = vr, g.merge = Bp, g.mergeWith = dl, g.method = kh, g.methodOf = $h, g.mixin = Vo, g.negate = yr, g.nthArg = Ih, g.omit = Fp, g.omitBy = Rp, g.once = Od, g.orderBy = md, g.over = Ph, g.overArgs = Id, g.overEvery = Bh, g.overSome = Fh, g.partial = Io, g.partialRight = rl, g.partition = vd, g.pick = Np, g.pickBy = pl, g.property = _l, g.propertyOf = Rh, g.pull = mf, g.pullAll = Wi, g.pullAllBy = vf, g.pullAllWith = yf, g.pullAt = bf, g.range = Nh, g.rangeRight = Mh, g.rearg = Pd, g.reject = _d, g.remove = _f, g.rest = Bd, g.reverse = ko, g.sampleSize = Ed, g.set = Lp, g.setWith = Vp, g.shuffle = wd, g.slice = Sf, g.sortBy = xd, g.sortedUniq = Af, g.sortedUniqBy = kf, g.split = uh, g.spread = Fd, g.tail = $f, g.take = Of, g.takeRight = If, g.takeRightWhile = Pf, g.takeWhile = Bf, g.tap = Yf, g.throttle = Rd, g.thru = hr, g.toArray = sl, g.toPairs = hl, g.toPairsIn = gl, g.toPath = jh, g.toPlainObject = cl, g.transform = Up, g.unary = Nd, g.union = Ff, g.unionBy = Rf, g.unionWith = Nf, g.uniq = Mf, g.uniqBy = Lf, g.uniqWith = Vf, g.unset = Hp, g.unzip = $o, g.unzipWith = Ki, g.update = jp, g.updateWith = zp, g.values = dn, g.valuesIn = qp, g.without = Uf, g.words = yl, g.wrap = Md, g.xor = Hf, g.xorBy = jf, g.xorWith = zf, g.zip = qf, g.zipObject = Wf, g.zipObjectDeep = Kf, g.zipWith = Gf, g.entries = hl, g.entriesIn = gl, g.extend = fl, g.extendWith = Sr, Vo(g, g), g.add = qh, g.attempt = bl, g.camelCase = Yp, g.capitalize = ml, g.ceil = Wh, g.clamp = Wp, g.clone = Vd, g.cloneDeep = Hd, g.cloneDeepWith = jd, g.cloneWith = Ud, g.conformsTo = zd, g.deburr = vl, g.defaultTo = Ch, g.divide = Kh, g.endsWith = Qp, g.eq = mt, g.escape = Jp, g.escapeRegExp = Xp, g.every = ad, g.find = ld, g.findIndex = Hi, g.findKey = _p, g.findLast = sd, g.findLastIndex = ji, g.findLastKey = Sp, g.floor = Gh, g.forEach = Yi, g.forEachRight = Qi, g.forIn = Ep, g.forInRight = wp, g.forOwn = Cp, g.forOwnRight = Tp, g.get = Fo, g.gt = qd, g.gte = Wd, g.has = Ap, g.hasIn = Ro, g.head = qi, g.identity = Ge, g.includes = pd, g.indexOf = sf, g.inRange = Kp, g.invoke = Op, g.isArguments = Yt, g.isArray = ce, g.isArrayBuffer = Kd, g.isArrayLike = We, g.isArrayLikeObject = $e, g.isBoolean = Gd, g.isBuffer = Vt, g.isDate = Yd, g.isElement = Qd, g.isEmpty = Jd, g.isEqual = Xd, g.isEqualWith = Zd, g.isError = Po, g.isFinite = ep, g.isFunction = At, g.isInteger = ol, g.isLength = br, g.isMap = al, g.isMatch = tp, g.isMatchWith = np, g.isNaN = rp, g.isNative = op, g.isNil = ip, g.isNull = ap, g.isNumber = il, g.isObject = Ae, g.isObjectLike = ke, g.isPlainObject = In, g.isRegExp = Bo, g.isSafeInteger = lp, g.isSet = ll, g.isString = _r, g.isSymbol = Xe, g.isTypedArray = fn, g.isUndefined = sp, g.isWeakMap = up, g.isWeakSet = cp, g.join = pf, g.kebabCase = Zp, g.last = st, g.lastIndexOf = hf, g.lowerCase = eh, g.lowerFirst = th, g.lt = fp, g.lte = dp, g.max = Yh, g.maxBy = Qh, g.mean = Jh, g.meanBy = Xh, g.min = Zh, g.minBy = eg, g.stubArray = Ho, g.stubFalse = jo, g.stubObject = Lh, g.stubString = Vh, g.stubTrue = Uh, g.multiply = tg, g.nth = gf, g.noConflict = Oh, g.noop = Uo, g.now = mr, g.pad = nh, g.padEnd = rh, g.padStart = oh, g.parseInt = ah, g.random = Gp, g.reduce = yd, g.reduceRight = bd, g.repeat = ih, g.replace = lh, g.result = Mp, g.round = ng, g.runInContext = D, g.sample = Sd, g.size = Cd, g.snakeCase = sh, g.some = Td, g.sortedIndex = Ef, g.sortedIndexBy = wf, g.sortedIndexOf = Cf, g.sortedLastIndex = Tf, g.sortedLastIndexBy = xf, g.sortedLastIndexOf = Df, g.startCase = ch, g.startsWith = fh, g.subtract = rg, g.sum = og, g.sumBy = ag, g.template = dh, g.times = Hh, g.toFinite = kt, g.toInteger = de, g.toLength = ul, g.toLower = ph, g.toNumber = ut, g.toSafeInteger = pp, g.toString = Se, g.toUpper = hh, g.trim = gh, g.trimEnd = mh, g.trimStart = vh, g.truncate = yh, g.unescape = bh, g.uniqueId = zh, g.upperCase = _h, g.upperFirst = No, g.each = Yi, g.eachRight = Qi, g.first = qi, Vo(g, function() {
        var r = {};
        return yt(g, function(o, l) {
          Ee.call(g.prototype, l) || (r[l] = o);
        }), r;
      }(), { chain: !1 }), g.VERSION = a, rt(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(r) {
        g[r].placeholder = g;
      }), rt(["drop", "take"], function(r, o) {
        ve.prototype[r] = function(l) {
          l = l === n ? 1 : Fe(de(l), 0);
          var c = this.__filtered__ && !o ? new ve(this) : this.clone();
          return c.__filtered__ ? c.__takeCount__ = Le(l, c.__takeCount__) : c.__views__.push({
            size: Le(l, se),
            type: r + (c.__dir__ < 0 ? "Right" : "")
          }), c;
        }, ve.prototype[r + "Right"] = function(l) {
          return this.reverse()[r](l).reverse();
        };
      }), rt(["filter", "map", "takeWhile"], function(r, o) {
        var l = o + 1, c = l == W || l == le;
        ve.prototype[r] = function(d) {
          var y = this.clone();
          return y.__iteratees__.push({
            iteratee: re(d, 3),
            type: l
          }), y.__filtered__ = y.__filtered__ || c, y;
        };
      }), rt(["head", "last"], function(r, o) {
        var l = "take" + (o ? "Right" : "");
        ve.prototype[r] = function() {
          return this[l](1).value()[0];
        };
      }), rt(["initial", "tail"], function(r, o) {
        var l = "drop" + (o ? "" : "Right");
        ve.prototype[r] = function() {
          return this.__filtered__ ? new ve(this) : this[l](1);
        };
      }), ve.prototype.compact = function() {
        return this.filter(Ge);
      }, ve.prototype.find = function(r) {
        return this.filter(r).head();
      }, ve.prototype.findLast = function(r) {
        return this.reverse().find(r);
      }, ve.prototype.invokeMap = he(function(r, o) {
        return typeof r == "function" ? new ve(this) : this.map(function(l) {
          return xn(l, r, o);
        });
      }), ve.prototype.reject = function(r) {
        return this.filter(yr(re(r)));
      }, ve.prototype.slice = function(r, o) {
        r = de(r);
        var l = this;
        return l.__filtered__ && (r > 0 || o < 0) ? new ve(l) : (r < 0 ? l = l.takeRight(-r) : r && (l = l.drop(r)), o !== n && (o = de(o), l = o < 0 ? l.dropRight(-o) : l.take(o - r)), l);
      }, ve.prototype.takeRightWhile = function(r) {
        return this.reverse().takeWhile(r).reverse();
      }, ve.prototype.toArray = function() {
        return this.take(se);
      }, yt(ve.prototype, function(r, o) {
        var l = /^(?:filter|find|map|reject)|While$/.test(o), c = /^(?:head|last)$/.test(o), d = g[c ? "take" + (o == "last" ? "Right" : "") : o], y = c || /^find/.test(o);
        d && (g.prototype[o] = function() {
          var S = this.__wrapped__, C = c ? [1] : arguments, k = S instanceof ve, N = C[0], M = k || ce(S), V = function(me) {
            var ye = d.apply(g, Pt([me], C));
            return c && K ? ye[0] : ye;
          };
          M && l && typeof N == "function" && N.length != 1 && (k = M = !1);
          var K = this.__chain__, X = !!this.__actions__.length, ae = y && !K, pe = k && !X;
          if (!y && M) {
            S = pe ? S : new ve(this);
            var ie = r.apply(S, C);
            return ie.__actions__.push({ func: hr, args: [V], thisArg: n }), new at(ie, K);
          }
          return ae && pe ? r.apply(this, C) : (ie = this.thru(V), ae ? c ? ie.value()[0] : ie.value() : ie);
        });
      }), rt(["pop", "push", "shift", "sort", "splice", "unshift"], function(r) {
        var o = Vn[r], l = /^(?:push|sort|unshift)$/.test(r) ? "tap" : "thru", c = /^(?:pop|shift)$/.test(r);
        g.prototype[r] = function() {
          var d = arguments;
          if (c && !this.__chain__) {
            var y = this.value();
            return o.apply(ce(y) ? y : [], d);
          }
          return this[l](function(S) {
            return o.apply(ce(S) ? S : [], d);
          });
        };
      }), yt(ve.prototype, function(r, o) {
        var l = g[o];
        if (l) {
          var c = l.name + "";
          Ee.call(an, c) || (an[c] = []), an[c].push({ name: o, func: l });
        }
      }), an[lr(n, I).name] = [{
        name: "wrapper",
        func: n
      }], ve.prototype.clone = yu, ve.prototype.reverse = bu, ve.prototype.value = _u, g.prototype.at = Qf, g.prototype.chain = Jf, g.prototype.commit = Xf, g.prototype.next = Zf, g.prototype.plant = td, g.prototype.reverse = nd, g.prototype.toJSON = g.prototype.valueOf = g.prototype.value = rd, g.prototype.first = g.prototype.head, bn && (g.prototype[bn] = ed), g;
    }, tn = Js();
    Ut ? ((Ut.exports = tn)._ = tn, Mr._ = tn) : Ne._ = tn;
  }).call(commonjsGlobal);
})(lodash$1, lodash$1.exports);
var lodashExports = lodash$1.exports;
const lodash = /* @__PURE__ */ getDefaultExportFromCjs(lodashExports), _sfc_main$a = /* @__PURE__ */ defineComponent({
  name: "ElsFormQuery",
  __name: "FormQuery",
  props: {
    queryTableRef: {},
    queryAutoReadData: { type: Boolean },
    queryParameterType: { default: "Query" }
  },
  emits: ["update:modelValue", "search"],
  setup(e, { expose: t, emit: n }) {
    const a = e, { debounce: i } = lodash, s = useSlots(), u = ref(), f = ref(), p = "els-form" + lessCom.Guid32, m = useAttrs();
    let b = reactive({}), _ = ref({});
    const E = computed(() => i(L, 200));
    provide("setQueryData", A), provide("getQueryData", w), provide("labelWidth", m["label-width"]), provide("formType", "Query"), provide("formData", b), onMounted(() => {
      O();
    }), watch(b, (x) => {
      const q = Object.fromEntries(
        Object.keys(x).map((B) => [B, x[B].Value])
      );
      _.value = { ...q }, n("update:modelValue", q);
    }), onBeforeUnmount(() => {
      console.info("卸载");
    });
    function w() {
      return b;
    }
    function A(x) {
      Array.isArray(x) ? x.forEach((q) => {
        b[q.key] = T(q), b[q.key].QueryParameterType != "NoPost" && b[q.key].IsAutoQuery && watch(b[q.key].Value, (B, Y) => {
          B !== "" && B !== 0 && B == Y || E.value();
        });
      }) : (b[x.key] = T(x), b[x.key].QueryParameterType != "NoPost" && b[x.key].IsAutoQuery && watch(b[x.key].Value, (q, B) => {
        q !== "" && q !== 0 && q == B || E.value();
      }));
    }
    function T(x) {
      const q = x.fieldName ?? "", B = x.isAroundComma ?? !1, Y = x.dataType ?? QueryDataType.String, oe = x.method ?? QueryMethod.NoAuto, R = x.isAutoQuery ?? a.queryAutoReadData;
      let W = a.queryParameterType;
      x.parameterType && (W = x.parameterType);
      let te = x.Value ?? "";
      return x.key ? (b[x.key] && b[x.key].Value !== "" && (te = b[x.key].Value), {
        QueryFieldName: q,
        QueryDataType: Y,
        QueryMethod: oe,
        QueryParameterType: W,
        IsAroundComma: B,
        IsAutoQuery: R,
        Value: Y === QueryDataType.Int && te && lessCom.isNumber(te) ? parseFloat(te) : te
      }) : null;
    }
    function O() {
      var x = sessionStorage.getItem(`${p}_QueryData`);
      if (x) {
        var q = JSON.parse(x);
        q.QueryData.forEach((B) => {
          (b[B.Key] || b[B.Key] === 0) && (b[B.Key].Value = B.Value);
        }), H();
      }
      inject("isPageCompleteReadData", !1);
    }
    function I() {
      var x = [];
      for (let Y in b) {
        var q = b[Y];
        (q.Value || q.Value === 0) && x.push({ Key: Y, Value: q.Value });
      }
      var B = { QueryData: x, CreateTime: (/* @__PURE__ */ new Date()).getTime() };
      x.length > 0 && sessionStorage.setItem(`$${p}_QueryData`, JSON.stringify(B));
    }
    function H() {
      sessionStorage.removeItem(`${p}_QueryData`);
    }
    function L() {
      return new Promise((x) => {
        G().then((q) => {
          q ? m.onSearch && (n("search", b), x(!0)) : x(!1);
        });
      });
    }
    function z() {
      nextTick(() => {
        u.value.clearValidate();
      });
    }
    function G() {
      return new Promise((x) => {
        u.value ? u.value.validate().then((q) => {
          x(q);
        }).catch((q) => {
          console.log(q), x(!1);
        }) : x(!0);
      });
    }
    function Z(x) {
      return u.value.validateField(x);
    }
    function J() {
      f.value.$el.trigger("click");
    }
    return t({
      cacheQueryState: I,
      clearValidate: z,
      validateField: Z,
      validate: G,
      handleSubmitButton: J
    }), (x, q) => (openBlock(), createBlock(unref(ElForm), {
      model: unref(_),
      class: "queryForm",
      ref_key: "queryForm",
      ref: u,
      onsubmit: "return false;",
      inline: "",
      "show-message": !1
    }, {
      default: withCtx(() => [
        createCommentVNode("", !0),
        unref(s).default ? renderSlot(x.$slots, "query", { key: 1 }, () => [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(s).default(), (B) => {
            var Y, oe, R;
            return openBlock(), createElementBlock(Fragment, null, [
              !B.type.name || ((Y = B.type) == null ? void 0 : Y.name) === "ElFormItem" || ((oe = B.type) == null ? void 0 : oe.name) === "ElsFormItem" || !B.type.props || !B.type.props.hasFormItem || B.props && B.props.hasFormItem === !1 ? (openBlock(), createBlock(resolveDynamicComponent(() => B), { key: 0 })) : (openBlock(), createBlock(_sfc_main$c, mergeProps({
                key: 1,
                validationTrigger: (R = B.type.props.validationTrigger) == null ? void 0 : R.default
              }, B.props ?? {}), {
                default: withCtx(({ key: W }) => [
                  B.props.hasOwnProperty("modelValue") ? (openBlock(), createBlock(resolveDynamicComponent(B), { key: 0 })) : unref(b)[W] ? (openBlock(), createBlock(resolveDynamicComponent(B), {
                    key: 1,
                    modelValue: unref(b)[W].Value,
                    "onUpdate:modelValue": (te) => unref(b)[W].Value = te
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock(resolveDynamicComponent(B), { key: 2 }))
                ]),
                _: 2
              }, 1040, ["validationTrigger"]))
            ], 64);
          }), 256))
        ], !0) : createCommentVNode("", !0)
      ]),
      _: 3
    }, 8, ["model"]));
  }
}), FormQuery_vue_vue_type_style_index_0_scoped_69af51c2_lang = "", FormQuery = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-69af51c2"]]);
FormQuery.install = (e) => {
  e.component(FormQuery.__name, FormQuery);
};
_sfc_main$c.install = (e) => {
  e.component(_sfc_main$c.__name, _sfc_main$c);
};
/**!
 * Sortable 1.15.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function ownKeys(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, a);
  }
  return n;
}
function _objectSpread2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ownKeys(Object(n), !0).forEach(function(a) {
      _defineProperty(e, a, n[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ownKeys(Object(n)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
    });
  }
  return e;
}
function _typeof(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof = function(t) {
    return typeof t;
  } : _typeof = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, _typeof(e);
}
function _defineProperty(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function _extends() {
  return _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(e, t) {
  if (e == null)
    return {};
  var n = {}, a = Object.keys(e), i, s;
  for (s = 0; s < a.length; s++)
    i = a[s], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function _objectWithoutProperties(e, t) {
  if (e == null)
    return {};
  var n = _objectWithoutPropertiesLoose(e, t), a, i;
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (i = 0; i < s.length; i++)
      a = s[i], !(t.indexOf(a) >= 0) && Object.prototype.propertyIsEnumerable.call(e, a) && (n[a] = e[a]);
  }
  return n;
}
var version = "1.15.0";
function userAgent(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Edge = userAgent(/Edge/i), FireFox = userAgent(/firefox/i), Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i), IOS = userAgent(/iP(ad|od|hone)/i), ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i), captureMode = {
  capture: !1,
  passive: !1
};
function on(e, t, n) {
  e.addEventListener(t, n, !IE11OrLess && captureMode);
}
function off(e, t, n) {
  e.removeEventListener(t, n, !IE11OrLess && captureMode);
}
function matches(e, t) {
  if (t) {
    if (t[0] === ">" && (t = t.substring(1)), e)
      try {
        if (e.matches)
          return e.matches(t);
        if (e.msMatchesSelector)
          return e.msMatchesSelector(t);
        if (e.webkitMatchesSelector)
          return e.webkitMatchesSelector(t);
      } catch {
        return !1;
      }
    return !1;
  }
}
function getParentOrHost(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function closest(e, t, n, a) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && matches(e, t) : matches(e, t)) || a && e === n)
        return e;
      if (e === n)
        break;
    } while (e = getParentOrHost(e));
  }
  return null;
}
var R_SPACE = /\s+/g;
function toggleClass(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var a = (" " + e.className + " ").replace(R_SPACE, " ").replace(" " + t + " ", " ");
      e.className = (a + (n ? " " + t : "")).replace(R_SPACE, " ");
    }
}
function css(e, t, n) {
  var a = e && e.style;
  if (a) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
    !(t in a) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), a[t] = n + (typeof n == "string" ? "" : "px");
  }
}
function matrix(e, t) {
  var n = "";
  if (typeof e == "string")
    n = e;
  else
    do {
      var a = css(e, "transform");
      a && a !== "none" && (n = a + " " + n);
    } while (!t && (e = e.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(n);
}
function find(e, t, n) {
  if (e) {
    var a = e.getElementsByTagName(t), i = 0, s = a.length;
    if (n)
      for (; i < s; i++)
        n(a[i], i);
    return a;
  }
  return [];
}
function getWindowScrollingElement() {
  var e = document.scrollingElement;
  return e || document.documentElement;
}
function getRect(e, t, n, a, i) {
  if (!(!e.getBoundingClientRect && e !== window)) {
    var s, u, f, p, m, b, _;
    if (e !== window && e.parentNode && e !== getWindowScrollingElement() ? (s = e.getBoundingClientRect(), u = s.top, f = s.left, p = s.bottom, m = s.right, b = s.height, _ = s.width) : (u = 0, f = 0, p = window.innerHeight, m = window.innerWidth, b = window.innerHeight, _ = window.innerWidth), (t || n) && e !== window && (i = i || e.parentNode, !IE11OrLess))
      do
        if (i && i.getBoundingClientRect && (css(i, "transform") !== "none" || n && css(i, "position") !== "static")) {
          var E = i.getBoundingClientRect();
          u -= E.top + parseInt(css(i, "border-top-width")), f -= E.left + parseInt(css(i, "border-left-width")), p = u + s.height, m = f + s.width;
          break;
        }
      while (i = i.parentNode);
    if (a && e !== window) {
      var w = matrix(i || e), A = w && w.a, T = w && w.d;
      w && (u /= T, f /= A, _ /= A, b /= T, p = u + b, m = f + _);
    }
    return {
      top: u,
      left: f,
      bottom: p,
      right: m,
      width: _,
      height: b
    };
  }
}
function isScrolledPast(e, t, n) {
  for (var a = getParentAutoScrollElement(e, !0), i = getRect(e)[t]; a; ) {
    var s = getRect(a)[n], u = void 0;
    if (n === "top" || n === "left" ? u = i >= s : u = i <= s, !u)
      return a;
    if (a === getWindowScrollingElement())
      break;
    a = getParentAutoScrollElement(a, !1);
  }
  return !1;
}
function getChild(e, t, n, a) {
  for (var i = 0, s = 0, u = e.children; s < u.length; ) {
    if (u[s].style.display !== "none" && u[s] !== Sortable.ghost && (a || u[s] !== Sortable.dragged) && closest(u[s], n.draggable, e, !1)) {
      if (i === t)
        return u[s];
      i++;
    }
    s++;
  }
  return null;
}
function lastChild(e, t) {
  for (var n = e.lastElementChild; n && (n === Sortable.ghost || css(n, "display") === "none" || t && !matches(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function index(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== Sortable.clone && (!t || matches(e, t)) && n++;
  return n;
}
function getRelativeScrollOffset(e) {
  var t = 0, n = 0, a = getWindowScrollingElement();
  if (e)
    do {
      var i = matrix(e), s = i.a, u = i.d;
      t += e.scrollLeft * s, n += e.scrollTop * u;
    } while (e !== a && (e = e.parentNode));
  return [t, n];
}
function indexOfObject(e, t) {
  for (var n in e)
    if (e.hasOwnProperty(n)) {
      for (var a in t)
        if (t.hasOwnProperty(a) && t[a] === e[n][a])
          return Number(n);
    }
  return -1;
}
function getParentAutoScrollElement(e, t) {
  if (!e || !e.getBoundingClientRect)
    return getWindowScrollingElement();
  var n = e, a = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var i = css(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body)
          return getWindowScrollingElement();
        if (a || t)
          return n;
        a = !0;
      }
    }
  while (n = n.parentNode);
  return getWindowScrollingElement();
}
function extend(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function isRectEqual(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var _throttleTimeout;
function throttle(e, t) {
  return function() {
    if (!_throttleTimeout) {
      var n = arguments, a = this;
      n.length === 1 ? e.call(a, n[0]) : e.apply(a, n), _throttleTimeout = setTimeout(function() {
        _throttleTimeout = void 0;
      }, t);
    }
  };
}
function cancelThrottle() {
  clearTimeout(_throttleTimeout), _throttleTimeout = void 0;
}
function scrollBy(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function clone(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
var expando = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function AnimationStateManager() {
  var e = [], t;
  return {
    captureAnimationState: function() {
      if (e = [], !!this.options.animation) {
        var a = [].slice.call(this.el.children);
        a.forEach(function(i) {
          if (!(css(i, "display") === "none" || i === Sortable.ghost)) {
            e.push({
              target: i,
              rect: getRect(i)
            });
            var s = _objectSpread2({}, e[e.length - 1].rect);
            if (i.thisAnimationDuration) {
              var u = matrix(i, !0);
              u && (s.top -= u.f, s.left -= u.e);
            }
            i.fromRect = s;
          }
        });
      }
    },
    addAnimationState: function(a) {
      e.push(a);
    },
    removeAnimationState: function(a) {
      e.splice(indexOfObject(e, {
        target: a
      }), 1);
    },
    animateAll: function(a) {
      var i = this;
      if (!this.options.animation) {
        clearTimeout(t), typeof a == "function" && a();
        return;
      }
      var s = !1, u = 0;
      e.forEach(function(f) {
        var p = 0, m = f.target, b = m.fromRect, _ = getRect(m), E = m.prevFromRect, w = m.prevToRect, A = f.rect, T = matrix(m, !0);
        T && (_.top -= T.f, _.left -= T.e), m.toRect = _, m.thisAnimationDuration && isRectEqual(E, _) && !isRectEqual(b, _) && // Make sure animatingRect is on line between toRect & fromRect
        (A.top - _.top) / (A.left - _.left) === (b.top - _.top) / (b.left - _.left) && (p = calculateRealTime(A, E, w, i.options)), isRectEqual(_, b) || (m.prevFromRect = b, m.prevToRect = _, p || (p = i.options.animation), i.animate(m, A, _, p)), p && (s = !0, u = Math.max(u, p), clearTimeout(m.animationResetTimer), m.animationResetTimer = setTimeout(function() {
          m.animationTime = 0, m.prevFromRect = null, m.fromRect = null, m.prevToRect = null, m.thisAnimationDuration = null;
        }, p), m.thisAnimationDuration = p);
      }), clearTimeout(t), s ? t = setTimeout(function() {
        typeof a == "function" && a();
      }, u) : typeof a == "function" && a(), e = [];
    },
    animate: function(a, i, s, u) {
      if (u) {
        css(a, "transition", ""), css(a, "transform", "");
        var f = matrix(this.el), p = f && f.a, m = f && f.d, b = (i.left - s.left) / (p || 1), _ = (i.top - s.top) / (m || 1);
        a.animatingX = !!b, a.animatingY = !!_, css(a, "transform", "translate3d(" + b + "px," + _ + "px,0)"), this.forRepaintDummy = repaint(a), css(a, "transition", "transform " + u + "ms" + (this.options.easing ? " " + this.options.easing : "")), css(a, "transform", "translate3d(0,0,0)"), typeof a.animated == "number" && clearTimeout(a.animated), a.animated = setTimeout(function() {
          css(a, "transition", ""), css(a, "transform", ""), a.animated = !1, a.animatingX = !1, a.animatingY = !1;
        }, u);
      }
    }
  };
}
function repaint(e) {
  return e.offsetWidth;
}
function calculateRealTime(e, t, n, a) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * a.animation;
}
var plugins = [], defaults = {
  initializeByDefault: !0
}, PluginManager = {
  mount: function(t) {
    for (var n in defaults)
      defaults.hasOwnProperty(n) && !(n in t) && (t[n] = defaults[n]);
    plugins.forEach(function(a) {
      if (a.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), plugins.push(t);
  },
  pluginEvent: function(t, n, a) {
    var i = this;
    this.eventCanceled = !1, a.cancel = function() {
      i.eventCanceled = !0;
    };
    var s = t + "Global";
    plugins.forEach(function(u) {
      n[u.pluginName] && (n[u.pluginName][s] && n[u.pluginName][s](_objectSpread2({
        sortable: n
      }, a)), n.options[u.pluginName] && n[u.pluginName][t] && n[u.pluginName][t](_objectSpread2({
        sortable: n
      }, a)));
    });
  },
  initializePlugins: function(t, n, a, i) {
    plugins.forEach(function(f) {
      var p = f.pluginName;
      if (!(!t.options[p] && !f.initializeByDefault)) {
        var m = new f(t, n, t.options);
        m.sortable = t, m.options = t.options, t[p] = m, _extends(a, m.defaults);
      }
    });
    for (var s in t.options)
      if (t.options.hasOwnProperty(s)) {
        var u = this.modifyOption(t, s, t.options[s]);
        typeof u < "u" && (t.options[s] = u);
      }
  },
  getEventProperties: function(t, n) {
    var a = {};
    return plugins.forEach(function(i) {
      typeof i.eventProperties == "function" && _extends(a, i.eventProperties.call(n[i.pluginName], t));
    }), a;
  },
  modifyOption: function(t, n, a) {
    var i;
    return plugins.forEach(function(s) {
      t[s.pluginName] && s.optionListeners && typeof s.optionListeners[n] == "function" && (i = s.optionListeners[n].call(t[s.pluginName], a));
    }), i;
  }
};
function dispatchEvent(e) {
  var t = e.sortable, n = e.rootEl, a = e.name, i = e.targetEl, s = e.cloneEl, u = e.toEl, f = e.fromEl, p = e.oldIndex, m = e.newIndex, b = e.oldDraggableIndex, _ = e.newDraggableIndex, E = e.originalEvent, w = e.putSortable, A = e.extraEventProperties;
  if (t = t || n && n[expando], !!t) {
    var T, O = t.options, I = "on" + a.charAt(0).toUpperCase() + a.substr(1);
    window.CustomEvent && !IE11OrLess && !Edge ? T = new CustomEvent(a, {
      bubbles: !0,
      cancelable: !0
    }) : (T = document.createEvent("Event"), T.initEvent(a, !0, !0)), T.to = u || n, T.from = f || n, T.item = i || n, T.clone = s, T.oldIndex = p, T.newIndex = m, T.oldDraggableIndex = b, T.newDraggableIndex = _, T.originalEvent = E, T.pullMode = w ? w.lastPutMode : void 0;
    var H = _objectSpread2(_objectSpread2({}, A), PluginManager.getEventProperties(a, t));
    for (var L in H)
      T[L] = H[L];
    n && n.dispatchEvent(T), O[I] && O[I].call(t, T);
  }
}
var _excluded = ["evt"], pluginEvent = function(t, n) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = a.evt, s = _objectWithoutProperties(a, _excluded);
  PluginManager.pluginEvent.bind(Sortable)(t, n, _objectSpread2({
    dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    dragStarted: moved,
    putSortable,
    activeSortable: Sortable.active,
    originalEvent: i,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function() {
      cloneHidden = !0;
    },
    cloneNowShown: function() {
      cloneHidden = !1;
    },
    dispatchSortableEvent: function(f) {
      _dispatchEvent({
        sortable: n,
        name: f,
        originalEvent: i
      });
    }
  }, s));
};
function _dispatchEvent(e) {
  dispatchEvent(_objectSpread2({
    putSortable,
    cloneEl,
    targetEl: dragEl,
    rootEl,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex
  }, e));
}
var dragEl, parentEl, ghostEl, rootEl, nextEl, lastDownEl, cloneEl, cloneHidden, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, activeGroup, putSortable, awaitingDragStarted = !1, ignoreNextClick = !1, sortables = [], tapEvt, touchEvt, lastDx, lastDy, tapDistanceLeft, tapDistanceTop, moved, lastTarget, lastDirection, pastFirstInvertThresh = !1, isCircumstantialInvert = !1, targetMoveDistance, ghostRelativeParent, ghostRelativeParentInitialScroll = [], _silent = !1, savedInputChecked = [], documentExists = typeof document < "u", PositionGhostAbsolutely = IOS, CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div"), supportCssPointerEvents = function() {
  if (documentExists) {
    if (IE11OrLess)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
}(), _detectDirection = function(t, n) {
  var a = css(t), i = parseInt(a.width) - parseInt(a.paddingLeft) - parseInt(a.paddingRight) - parseInt(a.borderLeftWidth) - parseInt(a.borderRightWidth), s = getChild(t, 0, n), u = getChild(t, 1, n), f = s && css(s), p = u && css(u), m = f && parseInt(f.marginLeft) + parseInt(f.marginRight) + getRect(s).width, b = p && parseInt(p.marginLeft) + parseInt(p.marginRight) + getRect(u).width;
  if (a.display === "flex")
    return a.flexDirection === "column" || a.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (a.display === "grid")
    return a.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (s && f.float && f.float !== "none") {
    var _ = f.float === "left" ? "left" : "right";
    return u && (p.clear === "both" || p.clear === _) ? "vertical" : "horizontal";
  }
  return s && (f.display === "block" || f.display === "flex" || f.display === "table" || f.display === "grid" || m >= i && a[CSSFloatProperty] === "none" || u && a[CSSFloatProperty] === "none" && m + b > i) ? "vertical" : "horizontal";
}, _dragElInRowColumn = function(t, n, a) {
  var i = a ? t.left : t.top, s = a ? t.right : t.bottom, u = a ? t.width : t.height, f = a ? n.left : n.top, p = a ? n.right : n.bottom, m = a ? n.width : n.height;
  return i === f || s === p || i + u / 2 === f + m / 2;
}, _detectNearestEmptySortable = function(t, n) {
  var a;
  return sortables.some(function(i) {
    var s = i[expando].options.emptyInsertThreshold;
    if (!(!s || lastChild(i))) {
      var u = getRect(i), f = t >= u.left - s && t <= u.right + s, p = n >= u.top - s && n <= u.bottom + s;
      if (f && p)
        return a = i;
    }
  }), a;
}, _prepareGroup = function(t) {
  function n(s, u) {
    return function(f, p, m, b) {
      var _ = f.options.group.name && p.options.group.name && f.options.group.name === p.options.group.name;
      if (s == null && (u || _))
        return !0;
      if (s == null || s === !1)
        return !1;
      if (u && s === "clone")
        return s;
      if (typeof s == "function")
        return n(s(f, p, m, b), u)(f, p, m, b);
      var E = (u ? f : p).options.group.name;
      return s === !0 || typeof s == "string" && s === E || s.join && s.indexOf(E) > -1;
    };
  }
  var a = {}, i = t.group;
  (!i || _typeof(i) != "object") && (i = {
    name: i
  }), a.name = i.name, a.checkPull = n(i.pull, !0), a.checkPut = n(i.put), a.revertClone = i.revertClone, t.group = a;
}, _hideGhostForTarget = function() {
  !supportCssPointerEvents && ghostEl && css(ghostEl, "display", "none");
}, _unhideGhostForTarget = function() {
  !supportCssPointerEvents && ghostEl && css(ghostEl, "display", "");
};
documentExists && !ChromeForAndroid && document.addEventListener("click", function(e) {
  if (ignoreNextClick)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), ignoreNextClick = !1, !1;
}, !0);
var nearestEmptyInsertDetectEvent = function(t) {
  if (dragEl) {
    t = t.touches ? t.touches[0] : t;
    var n = _detectNearestEmptySortable(t.clientX, t.clientY);
    if (n) {
      var a = {};
      for (var i in t)
        t.hasOwnProperty(i) && (a[i] = t[i]);
      a.target = a.rootEl = n, a.preventDefault = void 0, a.stopPropagation = void 0, n[expando]._onDragOver(a);
    }
  }
}, _checkOutsideTargetEl = function(t) {
  dragEl && dragEl.parentNode[expando]._isOutsideThisEl(t.target);
};
function Sortable(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
  this.el = e, this.options = t = _extends({}, t), e[expando] = this;
  var n = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(e.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return _detectDirection(e, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(u, f) {
      u.setData("Text", f.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Sortable.supportPointer !== !1 && "PointerEvent" in window && !Safari,
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, e, n);
  for (var a in n)
    !(a in t) && (t[a] = n[a]);
  _prepareGroup(t);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : supportDraggable, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? on(e, "pointerdown", this._onTapStart) : (on(e, "mousedown", this._onTapStart), on(e, "touchstart", this._onTapStart)), this.nativeDraggable && (on(e, "dragover", this), on(e, "dragenter", this)), sortables.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), _extends(this, AnimationStateManager());
}
Sortable.prototype = /** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (lastTarget = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, dragEl) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, a = this.el, i = this.options, s = i.preventOnFilter, u = t.type, f = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, p = (f || t).target, m = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || p, b = i.filter;
      if (_saveInputCheckedState(a), !dragEl && !(/mousedown|pointerdown/.test(u) && t.button !== 0 || i.disabled) && !m.isContentEditable && !(!this.nativeDraggable && Safari && p && p.tagName.toUpperCase() === "SELECT") && (p = closest(p, i.draggable, a, !1), !(p && p.animated) && lastDownEl !== p)) {
        if (oldIndex = index(p), oldDraggableIndex = index(p, i.draggable), typeof b == "function") {
          if (b.call(this, t, p, this)) {
            _dispatchEvent({
              sortable: n,
              rootEl: m,
              name: "filter",
              targetEl: p,
              toEl: a,
              fromEl: a
            }), pluginEvent("filter", n, {
              evt: t
            }), s && t.cancelable && t.preventDefault();
            return;
          }
        } else if (b && (b = b.split(",").some(function(_) {
          if (_ = closest(m, _.trim(), a, !1), _)
            return _dispatchEvent({
              sortable: n,
              rootEl: _,
              name: "filter",
              targetEl: p,
              fromEl: a,
              toEl: a
            }), pluginEvent("filter", n, {
              evt: t
            }), !0;
        }), b)) {
          s && t.cancelable && t.preventDefault();
          return;
        }
        i.handle && !closest(m, i.handle, a, !1) || this._prepareDragStart(t, f, p);
      }
    }
  },
  _prepareDragStart: function(t, n, a) {
    var i = this, s = i.el, u = i.options, f = s.ownerDocument, p;
    if (a && !dragEl && a.parentNode === s) {
      var m = getRect(a);
      if (rootEl = s, dragEl = a, parentEl = dragEl.parentNode, nextEl = dragEl.nextSibling, lastDownEl = a, activeGroup = u.group, Sortable.dragged = dragEl, tapEvt = {
        target: dragEl,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, tapDistanceLeft = tapEvt.clientX - m.left, tapDistanceTop = tapEvt.clientY - m.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, dragEl.style["will-change"] = "all", p = function() {
        if (pluginEvent("delayEnded", i, {
          evt: t
        }), Sortable.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !FireFox && i.nativeDraggable && (dragEl.draggable = !0), i._triggerDragStart(t, n), _dispatchEvent({
          sortable: i,
          name: "choose",
          originalEvent: t
        }), toggleClass(dragEl, u.chosenClass, !0);
      }, u.ignore.split(",").forEach(function(b) {
        find(dragEl, b.trim(), _disableDraggable);
      }), on(f, "dragover", nearestEmptyInsertDetectEvent), on(f, "mousemove", nearestEmptyInsertDetectEvent), on(f, "touchmove", nearestEmptyInsertDetectEvent), on(f, "mouseup", i._onDrop), on(f, "touchend", i._onDrop), on(f, "touchcancel", i._onDrop), FireFox && this.nativeDraggable && (this.options.touchStartThreshold = 4, dragEl.draggable = !0), pluginEvent("delayStart", this, {
        evt: t
      }), u.delay && (!u.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();
          return;
        }
        on(f, "mouseup", i._disableDelayedDrag), on(f, "touchend", i._disableDelayedDrag), on(f, "touchcancel", i._disableDelayedDrag), on(f, "mousemove", i._delayedDragTouchMoveHandler), on(f, "touchmove", i._delayedDragTouchMoveHandler), u.supportPointer && on(f, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(p, u.delay);
      } else
        p();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var n = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    dragEl && _disableDraggable(dragEl), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    off(t, "mouseup", this._disableDelayedDrag), off(t, "touchend", this._disableDelayedDrag), off(t, "touchcancel", this._disableDelayedDrag), off(t, "mousemove", this._delayedDragTouchMoveHandler), off(t, "touchmove", this._delayedDragTouchMoveHandler), off(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? on(document, "pointermove", this._onTouchMove) : n ? on(document, "touchmove", this._onTouchMove) : on(document, "mousemove", this._onTouchMove) : (on(dragEl, "dragend", this), on(rootEl, "dragstart", this._onDragStart));
    try {
      document.selection ? _nextTick(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (awaitingDragStarted = !1, rootEl && dragEl) {
      pluginEvent("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && on(document, "dragover", _checkOutsideTargetEl);
      var a = this.options;
      !t && toggleClass(dragEl, a.dragClass, !1), toggleClass(dragEl, a.ghostClass, !0), Sortable.active = this, t && this._appendGhost(), _dispatchEvent({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX, this._lastY = touchEvt.clientY, _hideGhostForTarget();
      for (var t = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY), t !== n); )
        n = t;
      if (dragEl.parentNode[expando]._isOutsideThisEl(t), n)
        do {
          if (n[expando]) {
            var a = void 0;
            if (a = n[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target: t,
              rootEl: n
            }), a && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = n.parentNode);
      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function(t) {
    if (tapEvt) {
      var n = this.options, a = n.fallbackTolerance, i = n.fallbackOffset, s = t.touches ? t.touches[0] : t, u = ghostEl && matrix(ghostEl, !0), f = ghostEl && u && u.a, p = ghostEl && u && u.d, m = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), b = (s.clientX - tapEvt.clientX + i.x) / (f || 1) + (m ? m[0] - ghostRelativeParentInitialScroll[0] : 0) / (f || 1), _ = (s.clientY - tapEvt.clientY + i.y) / (p || 1) + (m ? m[1] - ghostRelativeParentInitialScroll[1] : 0) / (p || 1);
      if (!Sortable.active && !awaitingDragStarted) {
        if (a && Math.max(Math.abs(s.clientX - this._lastX), Math.abs(s.clientY - this._lastY)) < a)
          return;
        this._onDragStart(t, !0);
      }
      if (ghostEl) {
        u ? (u.e += b - (lastDx || 0), u.f += _ - (lastDy || 0)) : u = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: b,
          f: _
        };
        var E = "matrix(".concat(u.a, ",").concat(u.b, ",").concat(u.c, ",").concat(u.d, ",").concat(u.e, ",").concat(u.f, ")");
        css(ghostEl, "webkitTransform", E), css(ghostEl, "mozTransform", E), css(ghostEl, "msTransform", E), css(ghostEl, "transform", E), lastDx = b, lastDy = _, touchEvt = s;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!ghostEl) {
      var t = this.options.fallbackOnBody ? document.body : rootEl, n = getRect(dragEl, !0, PositionGhostAbsolutely, !0, t), a = this.options;
      if (PositionGhostAbsolutely) {
        for (ghostRelativeParent = t; css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document; )
          ghostRelativeParent = ghostRelativeParent.parentNode;
        ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement ? (ghostRelativeParent === document && (ghostRelativeParent = getWindowScrollingElement()), n.top += ghostRelativeParent.scrollTop, n.left += ghostRelativeParent.scrollLeft) : ghostRelativeParent = getWindowScrollingElement(), ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }
      ghostEl = dragEl.cloneNode(!0), toggleClass(ghostEl, a.ghostClass, !1), toggleClass(ghostEl, a.fallbackClass, !0), toggleClass(ghostEl, a.dragClass, !0), css(ghostEl, "transition", ""), css(ghostEl, "transform", ""), css(ghostEl, "box-sizing", "border-box"), css(ghostEl, "margin", 0), css(ghostEl, "top", n.top), css(ghostEl, "left", n.left), css(ghostEl, "width", n.width), css(ghostEl, "height", n.height), css(ghostEl, "opacity", "0.8"), css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed"), css(ghostEl, "zIndex", "100000"), css(ghostEl, "pointerEvents", "none"), Sortable.ghost = ghostEl, t.appendChild(ghostEl), css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var a = this, i = t.dataTransfer, s = a.options;
    if (pluginEvent("dragStart", this, {
      evt: t
    }), Sortable.eventCanceled) {
      this._onDrop();
      return;
    }
    pluginEvent("setupClone", this), Sortable.eventCanceled || (cloneEl = clone(dragEl), cloneEl.removeAttribute("id"), cloneEl.draggable = !1, cloneEl.style["will-change"] = "", this._hideClone(), toggleClass(cloneEl, this.options.chosenClass, !1), Sortable.clone = cloneEl), a.cloneId = _nextTick(function() {
      pluginEvent("clone", a), !Sortable.eventCanceled && (a.options.removeCloneOnHide || rootEl.insertBefore(cloneEl, dragEl), a._hideClone(), _dispatchEvent({
        sortable: a,
        name: "clone"
      }));
    }), !n && toggleClass(dragEl, s.dragClass, !0), n ? (ignoreNextClick = !0, a._loopId = setInterval(a._emulateDragOver, 50)) : (off(document, "mouseup", a._onDrop), off(document, "touchend", a._onDrop), off(document, "touchcancel", a._onDrop), i && (i.effectAllowed = "move", s.setData && s.setData.call(a, i, dragEl)), on(document, "drop", a), css(dragEl, "transform", "translateZ(0)")), awaitingDragStarted = !0, a._dragStartId = _nextTick(a._dragStarted.bind(a, n, t)), on(document, "selectstart", a), moved = !0, Safari && css(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, a = t.target, i, s, u, f = this.options, p = f.group, m = Sortable.active, b = activeGroup === p, _ = f.sort, E = putSortable || m, w, A = this, T = !1;
    if (_silent)
      return;
    function O($, U) {
      pluginEvent($, A, _objectSpread2({
        evt: t,
        isOwner: b,
        axis: w ? "vertical" : "horizontal",
        revert: u,
        dragRect: i,
        targetRect: s,
        canSort: _,
        fromSortable: E,
        target: a,
        completed: H,
        onMove: function(se, Pe) {
          return _onMove(rootEl, n, dragEl, i, se, getRect(se), t, Pe);
        },
        changed: L
      }, U));
    }
    function I() {
      O("dragOverAnimationCapture"), A.captureAnimationState(), A !== E && E.captureAnimationState();
    }
    function H($) {
      return O("dragOverCompleted", {
        insertion: $
      }), $ && (b ? m._hideClone() : m._showClone(A), A !== E && (toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : m.options.ghostClass, !1), toggleClass(dragEl, f.ghostClass, !0)), putSortable !== A && A !== Sortable.active ? putSortable = A : A === Sortable.active && putSortable && (putSortable = null), E === A && (A._ignoreWhileAnimating = a), A.animateAll(function() {
        O("dragOverAnimationComplete"), A._ignoreWhileAnimating = null;
      }), A !== E && (E.animateAll(), E._ignoreWhileAnimating = null)), (a === dragEl && !dragEl.animated || a === n && !a.animated) && (lastTarget = null), !f.dragoverBubble && !t.rootEl && a !== document && (dragEl.parentNode[expando]._isOutsideThisEl(t.target), !$ && nearestEmptyInsertDetectEvent(t)), !f.dragoverBubble && t.stopPropagation && t.stopPropagation(), T = !0;
    }
    function L() {
      newIndex = index(dragEl), newDraggableIndex = index(dragEl, f.draggable), _dispatchEvent({
        sortable: A,
        name: "change",
        toEl: n,
        newIndex,
        newDraggableIndex,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), a = closest(a, f.draggable, n, !0), O("dragOver"), Sortable.eventCanceled)
      return T;
    if (dragEl.contains(t.target) || a.animated && a.animatingX && a.animatingY || A._ignoreWhileAnimating === a)
      return H(!1);
    if (ignoreNextClick = !1, m && !f.disabled && (b ? _ || (u = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, m, dragEl, t)) && p.checkPut(this, m, dragEl, t))) {
      if (w = this._getDirection(t, a) === "vertical", i = getRect(dragEl), O("dragOverValid"), Sortable.eventCanceled)
        return T;
      if (u)
        return parentEl = rootEl, I(), this._hideClone(), O("revert"), Sortable.eventCanceled || (nextEl ? rootEl.insertBefore(dragEl, nextEl) : rootEl.appendChild(dragEl)), H(!0);
      var z = lastChild(n, f.draggable);
      if (!z || _ghostIsLast(t, w, this) && !z.animated) {
        if (z === dragEl)
          return H(!1);
        if (z && n === t.target && (a = z), a && (s = getRect(a)), _onMove(rootEl, n, dragEl, i, a, s, t, !!a) !== !1)
          return I(), z && z.nextSibling ? n.insertBefore(dragEl, z.nextSibling) : n.appendChild(dragEl), parentEl = n, L(), H(!0);
      } else if (z && _ghostIsFirst(t, w, this)) {
        var G = getChild(n, 0, f, !0);
        if (G === dragEl)
          return H(!1);
        if (a = G, s = getRect(a), _onMove(rootEl, n, dragEl, i, a, s, t, !1) !== !1)
          return I(), n.insertBefore(dragEl, G), parentEl = n, L(), H(!0);
      } else if (a.parentNode === n) {
        s = getRect(a);
        var Z = 0, J, x = dragEl.parentNode !== n, q = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || i, a.animated && a.toRect || s, w), B = w ? "top" : "left", Y = isScrolledPast(a, "top", "top") || isScrolledPast(dragEl, "top", "top"), oe = Y ? Y.scrollTop : void 0;
        lastTarget !== a && (J = s[B], pastFirstInvertThresh = !1, isCircumstantialInvert = !q && f.invertSwap || x), Z = _getSwapDirection(t, a, s, w, q ? 1 : f.swapThreshold, f.invertedSwapThreshold == null ? f.swapThreshold : f.invertedSwapThreshold, isCircumstantialInvert, lastTarget === a);
        var R;
        if (Z !== 0) {
          var W = index(dragEl);
          do
            W -= Z, R = parentEl.children[W];
          while (R && (css(R, "display") === "none" || R === ghostEl));
        }
        if (Z === 0 || R === a)
          return H(!1);
        lastTarget = a, lastDirection = Z;
        var te = a.nextElementSibling, le = !1;
        le = Z === 1;
        var fe = _onMove(rootEl, n, dragEl, i, a, s, t, le);
        if (fe !== !1)
          return (fe === 1 || fe === -1) && (le = fe === 1), _silent = !0, setTimeout(_unsilent, 30), I(), le && !te ? n.appendChild(dragEl) : a.parentNode.insertBefore(dragEl, le ? te : a), Y && scrollBy(Y, 0, oe - Y.scrollTop), parentEl = dragEl.parentNode, J !== void 0 && !isCircumstantialInvert && (targetMoveDistance = Math.abs(J - getRect(a)[B])), L(), H(!0);
      }
      if (n.contains(dragEl))
        return H(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    off(document, "mousemove", this._onTouchMove), off(document, "touchmove", this._onTouchMove), off(document, "pointermove", this._onTouchMove), off(document, "dragover", nearestEmptyInsertDetectEvent), off(document, "mousemove", nearestEmptyInsertDetectEvent), off(document, "touchmove", nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    off(t, "mouseup", this._onDrop), off(t, "touchend", this._onDrop), off(t, "pointerup", this._onDrop), off(t, "touchcancel", this._onDrop), off(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, a = this.options;
    if (newIndex = index(dragEl), newDraggableIndex = index(dragEl, a.draggable), pluginEvent("drop", this, {
      evt: t
    }), parentEl = dragEl && dragEl.parentNode, newIndex = index(dragEl), newDraggableIndex = index(dragEl, a.draggable), Sortable.eventCanceled) {
      this._nulling();
      return;
    }
    awaitingDragStarted = !1, isCircumstantialInvert = !1, pastFirstInvertThresh = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), _cancelNextTick(this.cloneId), _cancelNextTick(this._dragStartId), this.nativeDraggable && (off(document, "drop", this), off(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Safari && css(document.body, "user-select", ""), css(dragEl, "transform", ""), t && (moved && (t.cancelable && t.preventDefault(), !a.dropBubble && t.stopPropagation()), ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl), (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") && cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl), dragEl && (this.nativeDraggable && off(dragEl, "dragend", this), _disableDraggable(dragEl), dragEl.style["will-change"] = "", moved && !awaitingDragStarted && toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, !1), toggleClass(dragEl, this.options.chosenClass, !1), _dispatchEvent({
      sortable: this,
      name: "unchoose",
      toEl: parentEl,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), rootEl !== parentEl ? (newIndex >= 0 && (_dispatchEvent({
      rootEl: parentEl,
      name: "add",
      toEl: parentEl,
      fromEl: rootEl,
      originalEvent: t
    }), _dispatchEvent({
      sortable: this,
      name: "remove",
      toEl: parentEl,
      originalEvent: t
    }), _dispatchEvent({
      rootEl: parentEl,
      name: "sort",
      toEl: parentEl,
      fromEl: rootEl,
      originalEvent: t
    }), _dispatchEvent({
      sortable: this,
      name: "sort",
      toEl: parentEl,
      originalEvent: t
    })), putSortable && putSortable.save()) : newIndex !== oldIndex && newIndex >= 0 && (_dispatchEvent({
      sortable: this,
      name: "update",
      toEl: parentEl,
      originalEvent: t
    }), _dispatchEvent({
      sortable: this,
      name: "sort",
      toEl: parentEl,
      originalEvent: t
    })), Sortable.active && ((newIndex == null || newIndex === -1) && (newIndex = oldIndex, newDraggableIndex = oldDraggableIndex), _dispatchEvent({
      sortable: this,
      name: "end",
      toEl: parentEl,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    pluginEvent("nulling", this), rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null, savedInputChecked.forEach(function(t) {
      t.checked = !0;
    }), savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        dragEl && (this._onDragOver(t), _globalDragOver(t));
        break;
      case "selectstart":
        t.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var t = [], n, a = this.el.children, i = 0, s = a.length, u = this.options; i < s; i++)
      n = a[i], closest(n, u.draggable, this.el, !1) && t.push(n.getAttribute(u.dataIdAttr) || _generateId(n));
    return t;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(t, n) {
    var a = {}, i = this.el;
    this.toArray().forEach(function(s, u) {
      var f = i.children[u];
      closest(f, this.options.draggable, i, !1) && (a[s] = f);
    }, this), n && this.captureAnimationState(), t.forEach(function(s) {
      a[s] && (i.removeChild(a[s]), i.appendChild(a[s]));
    }), n && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var t = this.options.store;
    t && t.set && t.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(t, n) {
    return closest(t, n || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(t, n) {
    var a = this.options;
    if (n === void 0)
      return a[t];
    var i = PluginManager.modifyOption(this, t, n);
    typeof i < "u" ? a[t] = i : a[t] = n, t === "group" && _prepareGroup(a);
  },
  /**
   * Destroy
   */
  destroy: function() {
    pluginEvent("destroy", this);
    var t = this.el;
    t[expando] = null, off(t, "mousedown", this._onTapStart), off(t, "touchstart", this._onTapStart), off(t, "pointerdown", this._onTapStart), this.nativeDraggable && (off(t, "dragover", this), off(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), sortables.splice(sortables.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!cloneHidden) {
      if (pluginEvent("hideClone", this), Sortable.eventCanceled)
        return;
      css(cloneEl, "display", "none"), this.options.removeCloneOnHide && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl), cloneHidden = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (cloneHidden) {
      if (pluginEvent("showClone", this), Sortable.eventCanceled)
        return;
      dragEl.parentNode == rootEl && !this.options.group.revertClone ? rootEl.insertBefore(cloneEl, dragEl) : nextEl ? rootEl.insertBefore(cloneEl, nextEl) : rootEl.appendChild(cloneEl), this.options.group.revertClone && this.animate(dragEl, cloneEl), css(cloneEl, "display", ""), cloneHidden = !1;
    }
  }
};
function _globalDragOver(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function _onMove(e, t, n, a, i, s, u, f) {
  var p, m = e[expando], b = m.options.onMove, _;
  return window.CustomEvent && !IE11OrLess && !Edge ? p = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (p = document.createEvent("Event"), p.initEvent("move", !0, !0)), p.to = t, p.from = e, p.dragged = n, p.draggedRect = a, p.related = i || t, p.relatedRect = s || getRect(t), p.willInsertAfter = f, p.originalEvent = u, e.dispatchEvent(p), b && (_ = b.call(m, p, u)), _;
}
function _disableDraggable(e) {
  e.draggable = !1;
}
function _unsilent() {
  _silent = !1;
}
function _ghostIsFirst(e, t, n) {
  var a = getRect(getChild(n.el, 0, n.options, !0)), i = 10;
  return t ? e.clientX < a.left - i || e.clientY < a.top && e.clientX < a.right : e.clientY < a.top - i || e.clientY < a.bottom && e.clientX < a.left;
}
function _ghostIsLast(e, t, n) {
  var a = getRect(lastChild(n.el, n.options.draggable)), i = 10;
  return t ? e.clientX > a.right + i || e.clientX <= a.right && e.clientY > a.bottom && e.clientX >= a.left : e.clientX > a.right && e.clientY > a.top || e.clientX <= a.right && e.clientY > a.bottom + i;
}
function _getSwapDirection(e, t, n, a, i, s, u, f) {
  var p = a ? e.clientY : e.clientX, m = a ? n.height : n.width, b = a ? n.top : n.left, _ = a ? n.bottom : n.right, E = !1;
  if (!u) {
    if (f && targetMoveDistance < m * i) {
      if (!pastFirstInvertThresh && (lastDirection === 1 ? p > b + m * s / 2 : p < _ - m * s / 2) && (pastFirstInvertThresh = !0), pastFirstInvertThresh)
        E = !0;
      else if (lastDirection === 1 ? p < b + targetMoveDistance : p > _ - targetMoveDistance)
        return -lastDirection;
    } else if (p > b + m * (1 - i) / 2 && p < _ - m * (1 - i) / 2)
      return _getInsertDirection(t);
  }
  return E = E || u, E && (p < b + m * s / 2 || p > _ - m * s / 2) ? p > b + m / 2 ? 1 : -1 : 0;
}
function _getInsertDirection(e) {
  return index(dragEl) < index(e) ? 1 : -1;
}
function _generateId(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, a = 0; n--; )
    a += t.charCodeAt(n);
  return a.toString(36);
}
function _saveInputCheckedState(e) {
  savedInputChecked.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var a = t[n];
    a.checked && savedInputChecked.push(a);
  }
}
function _nextTick(e) {
  return setTimeout(e, 0);
}
function _cancelNextTick(e) {
  return clearTimeout(e);
}
documentExists && on(document, "touchmove", function(e) {
  (Sortable.active || awaitingDragStarted) && e.cancelable && e.preventDefault();
});
Sortable.utils = {
  on,
  off,
  css,
  find,
  is: function(t, n) {
    return !!closest(t, n, t, !1);
  },
  extend,
  throttle,
  closest,
  toggleClass,
  clone,
  index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild
};
Sortable.get = function(e) {
  return e[expando];
};
Sortable.mount = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(a) {
    if (!a.prototype || !a.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(a));
    a.utils && (Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), a.utils)), PluginManager.mount(a);
  });
};
Sortable.create = function(e, t) {
  return new Sortable(e, t);
};
Sortable.version = version;
var autoScrolls = [], scrollEl, scrollRootEl, scrolling = !1, lastAutoScrollX, lastAutoScrollY, touchEvt$1, pointerElemChangedInterval;
function AutoScrollPlugin() {
  function e() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var t in this)
      t.charAt(0) === "_" && typeof this[t] == "function" && (this[t] = this[t].bind(this));
  }
  return e.prototype = {
    dragStarted: function(n) {
      var a = n.originalEvent;
      this.sortable.nativeDraggable ? on(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? on(document, "pointermove", this._handleFallbackAutoScroll) : a.touches ? on(document, "touchmove", this._handleFallbackAutoScroll) : on(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var a = n.originalEvent;
      !this.options.dragOverBubble && !a.rootEl && this._handleAutoScroll(a);
    },
    drop: function() {
      this.sortable.nativeDraggable ? off(document, "dragover", this._handleAutoScroll) : (off(document, "pointermove", this._handleFallbackAutoScroll), off(document, "touchmove", this._handleFallbackAutoScroll), off(document, "mousemove", this._handleFallbackAutoScroll)), clearPointerElemChangedInterval(), clearAutoScrolls(), cancelThrottle();
    },
    nulling: function() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null, autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, a) {
      var i = this, s = (n.touches ? n.touches[0] : n).clientX, u = (n.touches ? n.touches[0] : n).clientY, f = document.elementFromPoint(s, u);
      if (touchEvt$1 = n, a || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(n, this.options, f, a);
        var p = getParentAutoScrollElement(f, !0);
        scrolling && (!pointerElemChangedInterval || s !== lastAutoScrollX || u !== lastAutoScrollY) && (pointerElemChangedInterval && clearPointerElemChangedInterval(), pointerElemChangedInterval = setInterval(function() {
          var m = getParentAutoScrollElement(document.elementFromPoint(s, u), !0);
          m !== p && (p = m, clearAutoScrolls()), autoScroll(n, i.options, m, a);
        }, 10), lastAutoScrollX = s, lastAutoScrollY = u);
      } else {
        if (!this.options.bubbleScroll || getParentAutoScrollElement(f, !0) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }
        autoScroll(n, this.options, getParentAutoScrollElement(f, !1), !1);
      }
    }
  }, _extends(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function clearAutoScrolls() {
  autoScrolls.forEach(function(e) {
    clearInterval(e.pid);
  }), autoScrolls = [];
}
function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}
var autoScroll = throttle(function(e, t, n, a) {
  if (t.scroll) {
    var i = (e.touches ? e.touches[0] : e).clientX, s = (e.touches ? e.touches[0] : e).clientY, u = t.scrollSensitivity, f = t.scrollSpeed, p = getWindowScrollingElement(), m = !1, b;
    scrollRootEl !== n && (scrollRootEl = n, clearAutoScrolls(), scrollEl = t.scroll, b = t.scrollFn, scrollEl === !0 && (scrollEl = getParentAutoScrollElement(n, !0)));
    var _ = 0, E = scrollEl;
    do {
      var w = E, A = getRect(w), T = A.top, O = A.bottom, I = A.left, H = A.right, L = A.width, z = A.height, G = void 0, Z = void 0, J = w.scrollWidth, x = w.scrollHeight, q = css(w), B = w.scrollLeft, Y = w.scrollTop;
      w === p ? (G = L < J && (q.overflowX === "auto" || q.overflowX === "scroll" || q.overflowX === "visible"), Z = z < x && (q.overflowY === "auto" || q.overflowY === "scroll" || q.overflowY === "visible")) : (G = L < J && (q.overflowX === "auto" || q.overflowX === "scroll"), Z = z < x && (q.overflowY === "auto" || q.overflowY === "scroll"));
      var oe = G && (Math.abs(H - i) <= u && B + L < J) - (Math.abs(I - i) <= u && !!B), R = Z && (Math.abs(O - s) <= u && Y + z < x) - (Math.abs(T - s) <= u && !!Y);
      if (!autoScrolls[_])
        for (var W = 0; W <= _; W++)
          autoScrolls[W] || (autoScrolls[W] = {});
      (autoScrolls[_].vx != oe || autoScrolls[_].vy != R || autoScrolls[_].el !== w) && (autoScrolls[_].el = w, autoScrolls[_].vx = oe, autoScrolls[_].vy = R, clearInterval(autoScrolls[_].pid), (oe != 0 || R != 0) && (m = !0, autoScrolls[_].pid = setInterval((function() {
        a && this.layer === 0 && Sortable.active._onTouchMove(touchEvt$1);
        var te = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * f : 0, le = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * f : 0;
        typeof b == "function" && b.call(Sortable.dragged.parentNode[expando], le, te, e, touchEvt$1, autoScrolls[this.layer].el) !== "continue" || scrollBy(autoScrolls[this.layer].el, le, te);
      }).bind({
        layer: _
      }), 24))), _++;
    } while (t.bubbleScroll && E !== p && (E = getParentAutoScrollElement(E, !1)));
    scrolling = m;
  }
}, 30), drop = function(t) {
  var n = t.originalEvent, a = t.putSortable, i = t.dragEl, s = t.activeSortable, u = t.dispatchSortableEvent, f = t.hideGhostForTarget, p = t.unhideGhostForTarget;
  if (n) {
    var m = a || s;
    f();
    var b = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, _ = document.elementFromPoint(b.clientX, b.clientY);
    p(), m && !m.el.contains(_) && (u("spill"), this.onSpill({
      dragEl: i,
      putSortable: a
    }));
  }
};
function Revert() {
}
Revert.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, a = t.putSortable;
    this.sortable.captureAnimationState(), a && a.captureAnimationState();
    var i = getChild(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), a && a.animateAll();
  },
  drop
};
_extends(Revert, {
  pluginName: "revertOnSpill"
});
function Remove() {
}
Remove.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, a = t.putSortable, i = a || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop
};
_extends(Remove, {
  pluginName: "removeOnSpill"
});
Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);
const _hoisted_1$1 = ["innerHTML"], _hoisted_2$1 = { key: 1 }, _hoisted_3$1 = /* @__PURE__ */ createElementVNode("i", { class: "el-icon-question" }, null, -1), _hoisted_4$1 = ["innerHTML"], _hoisted_5 = ["innerHTML"], _hoisted_6 = {
  key: 0,
  class: "el-table-tr-split"
}, _sfc_main$9 = /* @__PURE__ */ defineComponent({
  name: "ElsColumn",
  __name: "TableColumn",
  props: {
    prop: {},
    sortable: { type: [String, Boolean] },
    type: {},
    isLocaleString: { type: Boolean },
    isHb: { type: Boolean },
    isTb: { type: Boolean },
    isEdit: { type: Boolean },
    editFields: {},
    isCustomEdit: { type: Boolean },
    sortExpress: {},
    filterable: { type: Boolean },
    dateFormatter: {},
    isExport: { type: Boolean, default: !0 },
    autoComplete: { type: Boolean, default: !0 },
    triggerActionName: {},
    triggerMenuId: {},
    headerFormatter: {},
    isMergeRow: { type: Boolean },
    mergeRowByFieldname: {},
    mergeFieldname: {},
    mergeMethod: {},
    isMergeSumValue: { type: Boolean },
    showSummary: { type: Boolean },
    summaryMethod: {},
    summaryValue: {},
    trueLabel: { default: "是" },
    falseLabel: { type: [String, Number, Boolean], default: "否" },
    trueValue: { type: [String, Number, Boolean], default: 1 },
    trueClass: {},
    falseClass: { default: "txt-red" },
    enumShowType: { default: "Description" },
    enumEqualType: { default: "Value" },
    enumData: {},
    enumNoneLabel: { default: "未知" },
    hasBottomBorder: { type: Boolean },
    imageStyle: {},
    isPreview: { type: Boolean },
    urlEmptyDesc: {},
    menusFieldname: { default: "PowerMenu" },
    isFold: { type: Boolean },
    unFoldCount: {},
    selectButtonLabel: { default: "选择" },
    sortMethod: {},
    columnKey: {},
    isAvgDay: { type: Boolean },
    sortData: {},
    tipContent: {},
    align: {},
    headerAlign: {},
    require: { type: Boolean },
    requireMessage: {},
    validationExpression: {},
    validationMessage: {},
    validationMethod: {},
    validationTrigger: {}
  },
  setup(e) {
    const t = e, n = inject("setEditData"), a = inject("setSortData"), i = inject("setMergeRowData"), s = inject("setSummaryData"), u = inject("handleTableSelectRow"), f = inject("handlePowerMenu"), p = inject("rowKey"), m = inject("tableCheckData"), b = inject("provideData"), _ = useSlots(), E = useAttrs(), w = ref(""), A = ref(!1);
    let T = ref();
    const O = ref("");
    watch(() => t.sortable, (x) => {
      A.value = x;
    }, { immediate: !0 }), watch(() => t.isEdit, (x) => {
      n && n(t.editFields ?? t.prop, x);
    }, { immediate: !0 }), watch(() => t.isMergeRow, (x) => {
      i && i(t.prop, {
        isMergeRow: x,
        mergeFieldName: t.mergeFieldname ? t.mergeFieldname : t.prop,
        mergeRowByFieldName: t.mergeRowByFieldname,
        mergeMethod: t.mergeMethod,
        isMergeSumValue: t.isMergeSumValue
      });
    }, { immediate: !0 }), watch(() => t.summaryValue, (x) => {
      s && s(t.prop, {
        showSummary: t.showSummary,
        summaryFieldName: t.prop,
        summaryValue: x,
        summaryMethod: t.summaryMethod
      });
    }, { immediate: !0 }), watch(() => t.showSummary, (x) => {
      s && s(t.prop, {
        showSummary: x,
        summaryFieldName: t.prop,
        summaryValue: t.summaryValue,
        summaryMethod: t.summaryMethod
      });
    }, { immediate: !0 }), onErrorCaptured(() => !1), onMounted(() => {
      if (t.sortData) {
        let x = t.sortData;
        typeof x == "string" && (x = JSON.parse(x)), a && a(x);
      }
    });
    function I(x) {
      return !x.PowerMenu || !x.PowerMenu.length ? !1 : x.PowerMenu.some((q) => q.MenuID === t.triggerMenuId || q.ActionName === t.triggerActionName);
    }
    function H(x) {
      f && (t.triggerMenuId ? f(x, t.triggerMenuId) : t.triggerActionName ? f(x, t.triggerActionName) : ElMessage.error("请设置MenuID或则ActionName"));
    }
    function L(x) {
      if (x === void 0)
        return "";
      let q = x;
      return b.avgDay > 0 && t.isAvgDay && (q = lessCom.getAvgDayResult(x, 2, b.avgDay)), lessCom.isNumber(q) && (t.isLocaleString || b.isLocaleString) && (q = parseFloat(q).toLocaleString()), t.dateFormatter && (q = lessCom.formatDate(x, t.dateFormatter)), q;
    }
    function z(x) {
      if (t.enumData[t.enumEqualType] && t.enumData[t.enumShowType]) {
        const q = t.enumData.find((B) => B[t.enumEqualType] == x[t.prop ?? ""]);
        return q ? q[t.enumShowType] : t.enumNoneLabel;
      } else {
        let q = Object.keys(t.enumData).filter((B) => t.enumData[B] == x[t.prop ?? ""]);
        return q.length > 0 ? q[0] : null;
      }
    }
    function G(x) {
      let q = lessCom.getUrlParms("Transfer_SelectTagID"), B = lessCom.getUrlParms("Transfer_IsMuti");
      if (u && u(x), B.toLowerCase() != "true" && q)
        if (lessCom.getUrlParms("Power_ModalType")) {
          var Y = window.parent;
          Y[q] || ElMessage.error("父页面接收方法不存在"), Y[q](x);
        } else
          window[q] || ElMessage.error("页面接收方法不存在"), window[q](x);
    }
    w.value = t.prop ?? "", T = t.sortMethod, t.columnKey && (w.value = t.columnKey), t.isHb && (w.value += "_HB"), t.isTb && (w.value += "_TB"), O.value = "", b.isExport && t.isExport && t.type != "selection" && t.type != "select" && (O.value += "els-isexport "), E["class-name"] && (O.value += E["class-name"]), A.value = t.sortable, A.value === !0 && (A.value = "custom");
    const Z = t.align ?? b.align, J = t.headerAlign ?? t.align ?? b.headerAlign;
    return (x, q) => {
      const B = resolveComponent("el-tooltip"), Y = resolveComponent("els-image"), oe = resolveComponent("el-link"), R = resolveComponent("els-menus-dropdown"), W = resolveComponent("ElsFormItem"), te = resolveComponent("el-input"), le = resolveComponent("els-form-item"), fe = resolveComponent("el-table-column");
      return openBlock(), createBlock(fe, {
        type: x.type,
        prop: x.prop,
        "column-key": w.value,
        "class-name": O.value,
        sortable: A.value,
        "sort-method": unref(T),
        align: unref(Z),
        "header-align": unref(J)
      }, createSlots({ _: 2 }, [
        x.$slots.header ? {
          name: "header",
          fn: withCtx(({ column: $, $index: U }) => [
            renderSlot(x.$slots, "header", {
              column: $,
              $index: U
            }, () => [
              x.headerFormatter ? (openBlock(), createElementBlock("span", {
                key: 0,
                innerHTML: x.headerFormatter
              }, null, 8, _hoisted_1$1)) : x.tipContent ? (openBlock(), createElementBlock("span", _hoisted_2$1, [
                createTextVNode(toDisplayString(unref(E).label) + " ", 1),
                createVNode(B, {
                  content: x.tipContent,
                  placement: "right"
                }, {
                  default: withCtx(() => [
                    _hoisted_3$1
                  ]),
                  _: 1
                }, 8, ["content"])
              ])) : createCommentVNode("", !0)
            ])
          ]),
          key: "0"
        } : void 0,
        x.type != "selection" ? {
          name: "default",
          fn: withCtx(({ row: $, column: U, $index: ne }) => [
            x.isCustomEdit ? renderSlot(x.$slots, "default", {
              key: 0,
              row: $,
              column: U,
              $index: ne
            }, () => [
              x.prop ? (openBlock(), createElementBlock("span", {
                key: 0,
                innerHTML: $[x.prop]
              }, null, 8, _hoisted_4$1)) : createCommentVNode("", !0)
            ]) : (!$.edit || !x.isEdit) && x.prop ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              x.type == "image" ? (openBlock(), createBlock(Y, {
                key: 0,
                "empty-desc": x.urlEmptyDesc,
                url: $[x.prop],
                "is-preview": x.isPreview,
                style: normalizeStyle(x.imageStyle)
              }, null, 8, ["empty-desc", "url", "is-preview", "style"])) : x.type == "enum" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(z($)), 1)
              ], 64)) : x.type == "bool" && x.prop ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                $[x.prop] == x.trueValue ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass(x.trueClass)
                }, toDisplayString(x.trueLabel), 3)) : (openBlock(), createElementBlock("span", {
                  key: 1,
                  class: normalizeClass(x.falseClass)
                }, toDisplayString(x.falseLabel), 3))
              ], 64)) : (x.triggerActionName || x.triggerMenuId) && I($) ? (openBlock(), createBlock(oe, {
                key: 3,
                type: "primary",
                onClick: (se) => H($)
              }, {
                default: withCtx(() => [
                  renderSlot(x.$slots, "default", {
                    row: $,
                    column: U,
                    $index: ne
                  }, () => [
                    createTextVNode(toDisplayString(x.prop ? $[x.prop] : ""), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])) : renderSlot(x.$slots, "default", {
                key: 4,
                row: $,
                column: U,
                $index: ne
              }, () => [
                x.isHb && x.prop ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass(unref(lessCom).getCompareClass(unref(lessCom).getHBResult($, x.prop)))
                }, toDisplayString(unref(lessCom).getHBResult($, x.prop)), 3)) : x.isTb && x.prop ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  class: normalizeClass(unref(lessCom).getCompareClass(unref(lessCom).getTBResult($, x.prop)))
                }, toDisplayString(unref(lessCom).getTBResult($, x.prop)), 3)) : (x.isLocaleString || x.isAvgDay || x.dateFormatter) && x.prop ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                  createTextVNode(toDisplayString(L($[x.prop])), 1)
                ], 64)) : x.prop ? (openBlock(), createElementBlock("span", {
                  key: 3,
                  innerHTML: $[x.prop]
                }, null, 8, _hoisted_5)) : createCommentVNode("", !0)
              ])
            ], 64)) : !$.edit || !x.isEdit ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
              x.type == "operate" ? (openBlock(), createBlock(R, {
                row: $,
                key: $,
                "is-fold": x.isFold,
                "un-fold-count": x.unFoldCount,
                "is-mobile": unref(E)["is-mobile"]
              }, null, 8, ["row", "is-fold", "un-fold-count", "is-mobile"])) : x.type == "select" ? (openBlock(), createBlock(unref(ElButton), {
                key: 1,
                onClick: (se) => G($),
                type: unref(m).checkRowKeys.indexOf($[unref(p)]) > -1 ? "info" : "primary"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(m).checkRowKeys.indexOf($[unref(p)]) > -1 ? "取消选择" : x.selectButtonLabel), 1)
                ]),
                _: 2
              }, 1032, ["onClick", "type"])) : x.type == "expand" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                renderSlot(x.$slots, "default", {
                  row: $,
                  column: U,
                  $index: ne
                }),
                x.hasBottomBorder ? (openBlock(), createElementBlock("div", _hoisted_6)) : createCommentVNode("", !0)
              ], 64)) : renderSlot(x.$slots, "default", {
                key: 3,
                row: $,
                column: U,
                $index: ne
              })
            ], 64)) : x.prop ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
              createCommentVNode("", !0),
              renderSlot(x.$slots, "formitem", {
                row: $,
                column: U,
                $index: ne
              }, () => [
                unref(_).edit ? (openBlock(!0), createElementBlock(Fragment, { key: 0 }, renderList(unref(_).edit({ row: $ })[0].children, (se) => {
                  var Pe, ct;
                  return openBlock(), createElementBlock(Fragment, null, [
                    !se.type.name || se.type.name === "ElFormItem" || ((Pe = se.type) == null ? void 0 : Pe.name) === "ElsFormItem" || !se.type.props || !se.type.props.hasFormItem || se.props && se.props.hasFormItem === !1 ? (openBlock(), createBlock(resolveDynamicComponent(() => se), { key: 0 })) : (openBlock(), createBlock(W, mergeProps({
                      prop: `[${ne}]['${x.prop}']`,
                      key: `[${ne}]['${x.prop}']`,
                      validationTrigger: (ct = se.type.props.validationTrigger) == null ? void 0 : ct.default,
                      require: x.require,
                      requireMessage: x.requireMessage,
                      validationMessage: x.validationMessage,
                      validationExpression: x.validationExpression,
                      validationMethod: x.validationMethod
                    }, se.props ?? {}), {
                      default: withCtx(() => {
                        var Ot;
                        return [
                          (Ot = se.props) != null && Ot.hasOwnProperty("modelValue") ? (openBlock(), createBlock(resolveDynamicComponent(se), { key: 0 })) : $ ? (openBlock(), createBlock(resolveDynamicComponent(se), {
                            key: 1,
                            modelValue: $[x.prop],
                            "onUpdate:modelValue": (tt) => $[x.prop] = tt
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock(resolveDynamicComponent(se), { key: 2 }))
                        ];
                      }),
                      _: 2
                    }, 1040, ["prop", "validationTrigger", "require", "requireMessage", "validationMessage", "validationExpression", "validationMethod"]))
                  ], 64);
                }), 256)) : (openBlock(), createBlock(le, {
                  prop: `[${ne}]['${x.prop}']`,
                  key: `[${ne}]['${x.prop}']`,
                  require: x.require,
                  requireMessage: x.requireMessage,
                  validationMessage: x.validationMessage,
                  validationExpression: x.validationExpression,
                  validationMethod: x.validationMethod,
                  validationTrigger: x.validationTrigger
                }, {
                  default: withCtx(() => [
                    createVNode(te, {
                      name: x.prop,
                      clearable: "",
                      placeholder: "请输入" + unref(E).label,
                      modelValue: $[x.prop],
                      "onUpdate:modelValue": (se) => $[x.prop] = se
                    }, null, 8, ["name", "placeholder", "modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 2
                }, 1032, ["prop", "require", "requireMessage", "validationMessage", "validationExpression", "validationMethod", "validationTrigger"]))
              ])
            ], 64)) : createCommentVNode("", !0)
          ]),
          key: "1"
        } : void 0
      ]), 1032, ["type", "prop", "column-key", "class-name", "sortable", "sort-method", "align", "header-align"]);
    };
  }
}), _hoisted_1 = {
  key: 0,
  class: "select_container"
}, _hoisted_2 = { key: 0 }, _hoisted_3 = {
  key: 0,
  class: "leo-bottom-scroll-fixed"
}, _hoisted_4 = {
  key: 1,
  class: "pagination-container",
  style: { "margin-top": "10px" }
}, _sfc_main$8 = /* @__PURE__ */ defineComponent({
  name: "ElsTable",
  inheritAttrs: !1,
  __name: "Table",
  props: {
    tableName: {},
    url: {},
    queryData: { default: {} },
    saveUrl: {},
    rowKey: { default: "" },
    rowClassName: {},
    data: {},
    hasPage: { type: Boolean, default: !0 },
    pageSize: { default: 20 },
    pageTotal: {},
    recordCount: {},
    pageSizes: { default: [10, 20, 30, 40, 50, 100] },
    pageIndex: { default: 1 },
    pageLayout: { default: "total,slot, sizes, prev, pager, next, jumper" },
    isCustomPageSize: { type: Boolean },
    hasBottomFixdScroll: { type: Boolean, default: !0 },
    isLocaleString: { type: Boolean },
    isExport: { type: Boolean, default: !0 },
    isClientSort: { type: Boolean },
    isClientPage: { type: Boolean },
    isClientSearch: { type: Boolean },
    dragSortable: { type: Boolean },
    align: { default: "center" },
    headerAlign: {},
    initReadData: { type: Boolean, default: !0 },
    isReadDataClearCheckRowKey: { type: Boolean, default: !0 },
    isPostCheckRowData: { type: Boolean },
    isPostNoCheckRow: { type: Boolean },
    checkRowKeys: {},
    checkRows: {},
    extraPowerMenus: {},
    loading: { type: Boolean },
    spanMethod: {},
    showSummary: { type: Boolean },
    showCheckLabelFieldname: {},
    showEditColumn: { type: Boolean, default: !0 },
    summaryMethod: {},
    beforeSave: {},
    beforeReadData: {},
    afterReadData: {},
    headerStickyTop: { type: [Number, Boolean], default: -1 },
    editStatus: { type: Boolean }
  },
  emits: ["update:check-rows", "update:check-row-keys", "drag-move", "drag-start", "update:editStatus", "row-before-context-menu"],
  setup(__props, { expose: __expose, emit: emits }) {
    const props = __props, attrs = useAttrs();
    console.info(props);
    const tagID = lessCom.Guid32(), wrapTagID = "leo-wrap-" + tagID;
    let currSaveUrl = ref(""), currHeaderStickyTop = ref(-1), dataLoading = ref(!1), saveDataLoading = ref(!1), currPageSize = ref(0), currPageIndex = ref(1), currPageTotal = ref(0), currRecourdCount = ref(0);
    const tableData = reactive([]), sourceTableData = reactive([]);
    let editSourceTableData = reactive([]), extendData = reactive({}), rowData = reactive({}), gridMenuVisible = ref(!1), gridMenuPositionLeft = ref(0), gridMenuPositionTop = ref(0), sortSelectRow = reactive({}), currShowSummary = ref(!1), currSpanMethod, currSummaryMethod, currSortChange, columnEditData = reactive([]), columnSortData = reactive({}), columnMergeData = reactive([]), columnSummaryData = reactive([]), isFirstReadData = ref(!0), tableCheckData = reactive({ checkRows: [], checkRowKeys: [] }), provideData = reactive({ avgDay: 0, isLocaleString: !1, isClientPage: !1, isClientSearch: !1, align: "", headerAlign: "", isExport: !0 }), tableBodyWidth = ref(""), scrollLeft = ref(""), isMobile = ref(!1), mobilePageLayout = "total, prev, next, jumper";
    const bottomScroll = ref(), dataTable = ref(), tableForm = ref(), dataGridMenu = ref();
    let tableContainer = h("div", { class: "table-container" }), tableFormContainer = h(_sfc_main$b, { ref: "tableForm", modelValue: tableData, class: "table-form-container", labelWidth: "0", showMessage: !1 });
    watch(() => props.isLocaleString, (e) => {
      provideData.isLocaleString = e;
    }, { immediate: !0 }), props.data && props.data.Data && watch(() => props.data.Data, (e) => {
      e && (props.isReadDataClearCheckRowKey && (tableCheckData.checkRowKeys.length = 0, tableCheckData.checkRows.length = 0), initTableData(props.data));
    }, { deep: !0 }), watch(() => props.data, (e) => {
      console.info("aaa"), Array.isArray(e) && (props.isReadDataClearCheckRowKey && (tableCheckData.checkRowKeys.length = 0, tableCheckData.checkRows.length = 0), initTableData(e));
    }), watch(tableData, () => {
      updateBottomScroll();
    }, { immediate: !0 }), watch(() => props.pageSize, (e) => {
      currPageSize.value = e;
    }), watch(() => props.pageTotal, (e) => {
      currPageSize.value = e ?? 0;
    }), watch(() => props.recordCount, (e) => {
      currRecourdCount.value = e ?? 0;
    }), watch(() => props.pageIndex, (e) => {
      currPageIndex.value = e;
    }), watch(() => props.loading, (e) => {
      dataLoading.value = e;
    }, { immediate: !0 }), watch(() => props.headerStickyTop, (e) => {
      e === !0 ? currHeaderStickyTop.value = 0 : typeof e == "number" && (currHeaderStickyTop.value = e);
    }, { immediate: !0 }), watch(columnMergeData, (e) => {
      e && e.length && (currSpanMethod = handleSpanMethod);
    }, { immediate: !0 }), watch(tableCheckData, (e) => {
      emits("update:check-rows", lessCom.cloneObj(e.checkRows)), emits("update:check-row-keys", lessCom.cloneObj(e.checkRowKeys));
    }, { deep: !0 });
    const currRowClassName = computed(() => props.rowClassName ? props.rowClassName : tableRowClassName), isShowEditColumn = computed(() => props.saveUrl && columnEditData.filter((e) => e.isEdit).length), isEdit = computed(() => columnEditData.filter((e) => e.isEdit).length > 0);
    provide("provideData", provideData), provide("rowKey", props.rowKey), provide("setEditData", setEditData), provide("setSortData", setSortData), provide("setMergeRowData", setMergeRowData), provide("setSummaryData", setSummaryData), provide("handleTableSelectRow", handleTableSelectRow), provide("tableCheckData", tableCheckData), provide("handlePowerMenu", handlePowerMenu), isMobile.value = navigator.userAgent.indexOf("Mobile") > -1;
    function handleTableBodyScroll(e) {
      scrollLeft != e.scrollLeft && (scrollLeft = e.scrollLeft, bottomScroll.value.setScrollLeft(e.scrollLeft));
    }
    function handleBottomFixedScroll(e) {
      scrollLeft != e.scrollLeft && (scrollLeft = e.scrollLeft, dataTable.value.setScrollLeft(e.scrollLeft));
    }
    function updateBottomScroll() {
      props.hasBottomFixdScroll && !isMobile && nextTick(() => {
        setTimeout(function() {
          dataTable.value && (tableBodyWidth.value = parseFloat(dataTable.value.bodyWidth) + "px", setTimeout(() => {
            bottomScroll.value && bottomScroll.value.update();
          }, 50));
        }, 50);
      });
    }
    function getTableSelection(e, t) {
      if (e === !1 && (e = e), t === !1 && (t = t), e) {
        let n = {};
        return n.selectRows = JSON.stringify(tableCheckData.checkRows), n;
      } else {
        let n = {};
        if (props.rowKey) {
          const a = props.rowKey.toString();
          n[a] = tableCheckData.checkRowKeys.toString(), t && (n["No" + props.rowKey] = tableData.map((i) => i[a]).filter((i) => tableCheckData.checkRowKeys.indexOf(i) == -1).toString());
        }
        return n;
      }
    }
    function setDragSortable() {
      props.dragSortable && new Sortable(dataTable.value.$el.querySelector(".el-table__body-wrapper tbody"), {
        handle: ".leo-table-drag",
        draggable: ".el-table__row",
        // 允许拖拽的项目类名
        // 拖拽中 回调函数
        onMove(e) {
          console.info("----DragMove----"), emits("drag-move", e);
        },
        onStart(e) {
          console.info("----DragStart----"), emits("drag-move", e);
        },
        // 拖拽结束，调整位置
        onEnd({ newIndex: e, oldIndex: t }) {
          if (console.info("----DragEnd---"), t && e) {
            const n = tableData.splice(t, 1);
            tableData.splice(e, 0, n), emits("drag-start", { newIndex: e, oldIndex: t });
          }
        }
      });
    }
    function setEditData(e, t) {
      if (!e)
        return;
      let n = columnEditData.findIndex((a) => a.fieldName == e);
      n > -1 && columnEditData.splice(n, 1), columnEditData.push({ fieldName: e, isEdit: t }), columnEditData = columnEditData.filter((a) => a.isEdit);
    }
    function setSortData(e) {
      e && (columnSortData[e.Key] = {
        QueryFieldName: e.Info.QueryFieldName,
        QueryParameterType: e.Info.QueryParameterType,
        SignatureMD5: e.Info.SignatureMD5,
        Value: e.Info.Value
      });
    }
    function setMergeRowData(e, t) {
      if (!e)
        return;
      let n = columnMergeData.findIndex((a) => a.fieldName == e);
      n > -1 && columnMergeData.splice(n, 1), columnMergeData.push({ fieldName: e, mergeData: t }), columnMergeData = columnMergeData.filter((a) => a.mergeData.isMergeRow), currSpanMethod || (currSpanMethod = handleSpanMethod);
    }
    function setSummaryData(e, t) {
      if (!e)
        return;
      let n = columnSummaryData.findIndex((a) => a.fieldName == e);
      n > -1 && columnSummaryData.splice(n, 1), columnSummaryData.push({ fieldName: e, summaryData: t }), columnSummaryData = columnSummaryData.filter((a) => a.summaryData.showSummary), currSummaryMethod || (currSummaryMethod = handleSummaryMethod, currShowSummary.value = !0);
    }
    function initData() {
      props.headerStickyTop === !0 ? currHeaderStickyTop.value = 0 : lodashExports.isNumber(props.headerStickyTop) ? currHeaderStickyTop.value = props.headerStickyTop : currHeaderStickyTop.value = -1, currPageSize.value = props.pageSize, currPageIndex.value = props.pageIndex, provideData.isExport = props.isExport, provideData.isClientPage = props.isClientPage, provideData.isClientSearch = props.isClientSearch, provideData.align = props.align, provideData.headerAlign = props.headerAlign ?? props.align, currSaveUrl.value = props.saveUrl ?? "", props.data && initTableData(props.data);
    }
    function initTableData(e) {
      Array.isArray(e) ? (sourceTableData.length = 0, sourceTableData.push(...e)) : e.Data ? (sourceTableData.length = 0, sourceTableData.push(...e.Data), e.ExtendData && (extendData = e.ExtendData), e.PageSize !== void 0 && !props.isClientPage && (currPageSize.value = e.PageSize), e.PageIndex !== void 0 && (currPageIndex.value = e.PageIndex + 1), e.RecordCountInt !== void 0 && (currRecourdCount.value = e.RecordCountInt), e.PageCount !== void 0 && (currPageTotal.value = e.PageCount), e.DayCount && (provideData.avgDay = e.DayCount)) : (sourceTableData.length = 0, extendData = {}), props.isClientSearch || props.isClientPage ? clientTableData() : (tableData.length = 0, tableData.push(...sourceTableData)), editSourceTableData = lessCom.cloneObj(sourceTableData), setTableCheckRows();
    }
    function setTableCurrentRow(e) {
      if (dataTable.value && props.rowKey) {
        let t = tableData.find((n) => n[props.rowKey.toString()] == e);
        t && dataTable.value.setCurrentRow(t);
      }
    }
    function validTableForm(e) {
      return new Promise((t) => {
        if (!columnEditData.length)
          return ElMessage.error("没有编辑的行"), t(!1);
        e.length || tableData.forEach((n) => {
          if (n.edit) {
            var a = {};
            a[props.rowKey] = n[props.rowKey], columnEditData.forEach((i) => {
              a[i.fieldName] = n[i.fieldName];
            }), e.push(a);
          }
        }), e.length > 1 ? tableForm.value.validate().then(() => {
          t(e);
        }).catch((n) => {
          console.log(n), t(!1);
        }) : validEditRow(e[0]).then(() => {
          t(e);
        }).catch((n) => {
          console.log(n), t(!1);
        });
      }).catch((t) => {
        console.log(t), ElMessage.error("数据异常，保存失败！请联系技术解决！");
      });
    }
    function saveTableData(e, t = []) {
      return new Promise((n, a) => {
        validTableForm(t).then((i) => {
          if (i !== !1) {
            if (props.beforeSave && props.beforeSave(), e || (e = currSaveUrl), !e)
              return ElMessage.error("请设置保存地址"), n(!1);
            if (i.length == 1) {
              let s = tableData.find((u) => u[props.rowKey] == i[0][props.rowKey]);
              s && (s.saveDataLoading = !0);
            } else
              saveDataLoading.value = !0;
            e.post({ tabledata: JSON.stringify(i) }).then((s) => {
              saveDataLoading.value = !1, tableData.forEach((u) => {
                u.saveDataLoading = !1;
              }), tableForm.value.handleSubmitButton(), s.ResultCode != "0" ? ElMessage.error(s.ResultMessage) : s.EventActionData ? lessCom.handleApiResult(s) : (ElMessage.success("保存成功"), compatibleReadData()), n(s);
            }).catch((s) => {
              saveDataLoading.value = !1, tableData.forEach((u) => {
                u.saveDataLoading = !1;
              }), a(s);
            });
          }
        });
      });
    }
    function handleTableRowClick(e) {
      rowData = e;
    }
    function handleTableRowDblClick(e) {
      handleRowEdit(e, tableData.findIndex((t) => t[props.rowKey] == e[props.rowKey]));
    }
    function editTable() {
      tableData.forEach((e) => {
        e.edit = !0;
      }), emits("update:editStatus", !0);
    }
    function unEditTable() {
      tableData.forEach((e) => {
        e.edit = !1;
      }), emits("update:editStatus", !1);
    }
    function handleRowEdit(e, t) {
      if (isEdit) {
        if (e.edit) {
          let n = editSourceTableData.find((a) => a[props.rowKey] == e[props.rowKey]);
          if (n) {
            for (const a in n)
              tableData[t].hasOwnProperty(a) && (tableData[t][a] = n[a]);
            n.edit = !1;
          }
          e.edit = !1;
        } else
          e.edit = !0;
        props.saveUrl && (tableData.find((n) => n.edit === !0) ? emits("update:editStatus", !0) : emits("update:editStatus", !1));
      }
    }
    function handleRowSave(e) {
      if (!props.rowKey) {
        ElMessage.error("主键ID不存在，请设置RowKey");
        return;
      }
      let t = {};
      if (t[props.rowKey] = e[props.rowKey], !columnEditData.length)
        return;
      columnEditData.forEach((a) => {
        t[a.fieldName] = e[a.fieldName];
      }), saveTableData(currSaveUrl, [t]);
    }
    function validEditRow(e) {
      let t = [], n = tableData.findIndex((a) => a[props.rowKey] == e[props.rowKey]);
      n == -1 && ElMessage.error(`【${e[props.rowKey]}】当前行未找到`);
      for (let a in e)
        t.push(`[${n}]['${a}']`);
      return tableForm.value.validateField(t);
    }
    function handleTableSelectSortRow() {
      sortSelectRow = lessCom.cloneObj(rowData);
    }
    function handleTableRowMoveHere(e) {
      e.post({ selectID: sortSelectRow[props.rowKey], moveID: rowData[props.rowKey] }).then((t) => {
        !t || t.ResultCode != "0" ? ElMessage.error(t.ResultMessage) : (ElMessage.success("移动成功"), readData());
      });
    }
    function handleTableRowExchangeMove(e) {
      e.post({ selectID: sortSelectRow[props.rowKey], moveID: rowData[props.rowKey] }).then((t) => {
        !t || t.ResultCode != "0" ? ElMessage.error(t.ResultMessage) : (ElMessage.success("移动成功"), readData());
      });
    }
    function tableRowClassName({ row: e }) {
      if (props.rowKey)
        return sortSelectRow && sortSelectRow[props.rowKey] && e[props.rowKey] == sortSelectRow[props.rowKey] ? "table_selectrow" : tableCheckData.checkRowKeys && tableCheckData.checkRowKeys.indexOf(e[props.rowKey]) > -1 ? "table_checkrow" : "";
    }
    function handleTableSelectRow(e) {
      var t = tableCheckData.checkRowKeys.indexOf(e[props.rowKey]);
      t == -1 ? dataTable.value.toggleRowSelection(e, !0) : dataTable.value.toggleRowSelection(e, !1), handleTableSelect(null, e);
    }
    function handleTableSelect(e, t) {
      if (console.log(e), t[props.rowKey]) {
        var n = tableCheckData.checkRowKeys.indexOf(t[props.rowKey]);
        n == -1 ? (tableCheckData.checkRowKeys.push(t[props.rowKey]), tableCheckData.checkRows.push(t)) : (tableCheckData.checkRows.splice(n, 1), tableCheckData.checkRowKeys.splice(n, 1));
      }
    }
    function handleTableSelectAll(e) {
      e.length > 0 ? e.forEach((t) => {
        var n = tableCheckData.checkRowKeys.indexOf(t[props.rowKey]);
        n == -1 && (tableCheckData.checkRowKeys.push(t[props.rowKey]), tableCheckData.checkRows.push(t));
      }) : tableData.forEach((t) => {
        var n = tableCheckData.checkRowKeys.indexOf(t[props.rowKey]);
        n > -1 && (tableCheckData.checkRowKeys.splice(n, 1), tableCheckData.checkRows.splice(n, 1));
      });
    }
    function handleRowContentMenu(e, t, n) {
      if (console.log(t), !(!e.PowerMenu || !e.PowerMenu.length) && !(n.target.className.indexOf("el-image-viewer") > -1)) {
        var a = n;
        rowData = e, emits("row-before-context-menu", e), gridMenuPositionLeft = a.clientX, gridMenuPositionTop = a.clientY, gridMenuVisible.value = !0, a.returnValue = !1, dataTable.value.setCurrentRow(e);
      }
    }
    function handleSpanMethod({ row: e, column: t, rowIndex: n, columnIndex: a }) {
      var i = 1, s = 1;
      if (columnMergeData.length && t.columnKey) {
        let f = tableData, p = columnMergeData.find((m) => m.fieldName == t.columnKey && m.mergeData.isMergeRow === !0);
        if (p && (p = p.mergeData), p) {
          const m = p.mergeFieldName;
          let b = m;
          p.mergeRowByFieldName && (b = p.mergeRowByFieldName);
          let _ = lessCom.getObjectKey(e, b);
          if (f.findIndex((E) => lessCom.getObjectKey(E, b) === _) === n) {
            let E = f.filter((w) => lessCom.getObjectKey(w, b) === _);
            i = E.length, s = 1, p.isMergeSumValue ? e[t.columnKey] = lessCom.sumArray(E.map((w) => w[m])) : p.mergeMethod && (e[t.columnKey] = p.mergeMethod(E, t));
          } else
            (p.isMergeSumValue || p.mergeMethod) && (e[t.columnKey] = 0), i = 0, s = 0;
        }
      } else {
        let f = extendData;
        if (f && f[n + "_" + a]) {
          var u = f[n + "_" + a];
          u && (i = parseInt(u.split("_")[0]), s = parseInt(u.split("_")[1]));
        }
      }
      return {
        rowspan: i,
        colspan: s
      };
    }
    function handleSummaryMethod(e) {
      let t = [];
      return e.columns.forEach((n, a) => {
        if (a === 0)
          t[a] = "合";
        else {
          let i = columnSummaryData.map((s) => s.summaryData).filter((s) => s.showSummary).find((s) => s.summaryFieldName == n.columnKey);
          i ? i.summaryMethod ? t[a] = i.summaryMethod(n, e.tableRef) : i.summaryValue ? t[a] = i.summaryValue : t[a] = lessCom.sumArray(sourceTableData.map((s) => s[i.summaryFieldName])) : t[a] = "";
        }
      }), t;
    }
    function clientTableData() {
      let e = lessCom.cloneObj(sourceTableData);
      props.isClientSearch && (e = clientTableSearchData(e)), props.isClientPage && (e = clientTablePageData(e)), tableData.length = 0, tableData.push(...e), setTableCheckRows();
    }
    function clientTablePageData(e) {
      var t = lessCom.pageArray(e, currPageIndex.value - 1, currPageSize.value);
      return t.length === 0 && (t = lessCom.pageArray(e, 0, currPageSize.value)), currRecourdCount = e.length, t;
    }
    function clientTableSearchData(e) {
      if (!props.queryData)
        return e;
      let t = e.filter((n) => {
        var a = !0;
        for (let u in props.queryData) {
          let f = props.queryData[u], p = f.QueryFieldName;
          if (p) {
            var i = f.Value, s = f.QueryDataType;
            if (!(i === "" || f.QueryParameterType == "NoQuery" || f.QueryParameterType == "Sort" || f.QueryType == "Parm") && (u.startsWith("StartDate_") || u.startsWith("Start_") ? a = n[p] >= i : u.startsWith("EndDate_") || u.startsWith("End_") ? a = n[p] <= i : s == "Int" ? a = n[p] == i : a = n[p] && n[p].toLowerCase().includes(i.toLowerCase()), !a))
              return a;
          }
        }
        return a;
      });
      return currRecourdCount = t.length, t;
    }
    function searchData() {
      return currPageIndex.value = 1, compatibleReadData();
    }
    function readData() {
      if (!props.url)
        return;
      let e = Object.assign(props.queryData ?? {}, columnSortData);
      e.PageSize = { Value: currPageSize.value }, e.PageIndex = { Value: currPageIndex.value - 1 }, props.beforeReadData && props.beforeReadData(), dataLoading.value = !0;
      let t = lessCom.getQueryData(e);
      return props.url.post(t).then((n) => {
        n.ResultCode === "0" ? (n.Data.ExtendData != null && (extendData = n.Data.ExtendData), n.Data.PageSize != null ? (sourceTableData.length = 0, sourceTableData.push(...n.Data.Data), props.isClientPage || (currPageSize.value = n.Data.PageSize), currPageIndex.value = n.Data.PageIndex + 1, currRecourdCount.value = n.Data.RecordCountInt, currPageTotal.value = n.Data.PageCount) : (sourceTableData.length = 0, sourceTableData.push(...n.Data)), props.isClientSearch || props.isClientPage ? clientTableData() : (tableData.length = 0, tableData.push(...sourceTableData)), editSourceTableData = lessCom.cloneObj(sourceTableData), n.Data.DayCount && (provideData.avgDay = n.Data.DayCount)) : n.ResultCode === "Login" ? window.location.href = n.Data : ElMessage.error(n.ResultMessage), dataLoading.value = !1, props.afterReadData && props.afterReadData(), props.isReadDataClearCheckRowKey && !isFirstReadData && (tableCheckData.checkRowKeys.length = 0, tableCheckData.checkRows.length = 0), isFirstReadData.value = !1, margePowerMenu(), setTableCheckRows();
      }).catch((n) => {
        console.log(n), ElMessage.error("数据加载失败！");
      });
    }
    function initTableCheckRows(e) {
      e && (dataTable.value.clearSelection(), tableCheckData.checkRows = e, props.rowKey && e && (tableCheckData.checkRowKeys = e.map((t) => t[props.rowKey])), setTableCheckRows());
    }
    function initTableCheckKeys(e) {
      e && (tableCheckData.checkRows = tableData.filter((t) => e.indexOf(t[props.rowKey]) > -1), tableCheckData.checkRowKeys = tableCheckData.checkRows.map((t) => t[props.rowKey]), dataTable.value.clearSelection(), setTableCheckRows(tableCheckData.checkRowKeys));
    }
    function toggleRowSelection(e, t) {
      dataTable.value.toggleRowSelection(e, t);
    }
    function setTableCheckRows(e = null) {
      nextTick(() => {
        props.rowKey && tableData.length && tableData.forEach((t) => {
          t[props.rowKey] && (e ? e.indexOf(t[props.rowKey]) > -1 && (tableCheckData.checkRowKeys = lessCom.cloneObj(e), dataTable.value.toggleRowSelection(t, !0)) : tableCheckData.checkRowKeys.indexOf(t[props.rowKey]) > -1 && dataTable.value.toggleRowSelection(t, !0));
        });
      });
    }
    function handlePowerMenu(e, t) {
      if (!e.PowerMenu) {
        ElMessage.error("菜单不存在");
        return;
      }
      setTimeout(() => {
        var n = e.PowerMenu.find((a) => a.MenuID === t || a.ActionName === t);
        if (!n) {
          ElMessage.error("菜单不存在");
          return;
        }
        dataGridMenu.value.handleCommand(n);
      }, 150);
    }
    function margePowerMenu() {
      tableData && props.extraPowerMenus && tableData.forEach((e) => {
        props.extraPowerMenus.forEach((t) => {
          e.PowerMenu.push(t);
        });
      });
    }
    function handleSortTable(e) {
      if (props.isClientPage || props.isClientSearch || props.isClientSort) {
        sortTableData(e.prop, e.order);
        return;
      }
      let t = e.prop;
      if (!t)
        return;
      let n = "";
      e.order === "ascending" ? n = "Asc" : e.order === "descending" && (n = "Desc"), columnSortData["Sort_" + t] && (columnSortData["Sort_" + t].Value = n), searchData();
    }
    function sortTableData(e, t) {
      t == "ascending" ? lessCom.orderBy(sourceTableData, e) : t == "descending" && lessCom.orderByDescending(sourceTableData, e), clientTableData();
    }
    function changePageReadData() {
      if (props.isClientPage) {
        clientTableData();
        return;
      }
      return compatibleReadData();
    }
    function compatibleReadData() {
      if (props.isClientSearch)
        return new Promise((e) => (clientTableData(), e(!0)));
      if (props.url)
        return readData();
    }
    function handleChangePage(e) {
      currPageIndex.value = e, changePageReadData(), emits("update:editStatus", !1);
    }
    function handleChangePageSize(e) {
      currPageSize.value = e, changePageReadData(), emits("update:editStatus", !1);
    }
    function handleDragCheckItem() {
      tableCheckData.checkRowKeys = tableCheckData.checkRows.map((e) => e[props.rowKey]);
    }
    function handleCloseCheckItem(e) {
      lessCom.removeArrayItem(tableCheckData.checkRows, e), tableCheckData.checkRowKeys = tableCheckData.checkRows.map((n) => n[props.rowKey]);
      let t = tableData.find((n) => n[props.rowKey] == e[props.rowKey]);
      t && dataTable.value.toggleRowSelection(t, !1);
    }
    function exportClientTableDataHtml() {
      let e = currPageSize.value, t = currPageIndex.value;
      e = 1e5, t = 0, changePageReadData(), nextTick(() => {
        exportTableDataHtml(), currPageSize.value = e, currPageIndex.value = t, changePageReadData();
      });
    }
    function exportTableDataHtml() {
      let e = getExportFileName(), t = dataTable.value.$el.querySelector(".el-table__header").querySelectorAll("tr").length;
      lessCom.exportTable(dataTable.value.$el, [], t, {
        font: {
          bold: !0
        },
        alignment: { horizontal: "center", vertical: "center", wrap_text: !0 },
        fill: { bgcolor: { rgb: "F5F7FA" }, fgColor: { rgb: "F5F7FA" } }
      }, e);
    }
    function exportTableData(e = []) {
      var t = [], n = [];
      dataTable.value.$refs.tableHeaderRef.columnRows.forEach((s) => {
        s.forEach((u) => {
          u.label && u.property && (t.push(u.label), n.push(u.property));
        });
      }), e.length || (e = tableData);
      const a = formatExportJson(n, e);
      let i = getExportFileName();
      exportDefaultTableData(t, a, i);
    }
    function exportTableReadDataHtml() {
      let e = props.url;
      if (!e) {
        ElMessage.error("接口地址不存在！");
        return;
      }
      props.beforeReadData && props.beforeReadData();
      let t = Object.assign(props.queryData, columnSortData);
      t = lessCom.getQueryData(t), t.Query_PageSize = 1e5, t.Query_PageIndex = 0;
      const n = ElLoading.service({
        lock: !0,
        text: "数据导出中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      e.post(t).then((a) => {
        a.ResultCode === "0" ? (tableData.length = 0, tableData.push(...a.Data.Data), nextTick(() => {
          exportTableDataHtml(), tableData.length = 0, tableData.push(...sourceTableData), n.close();
        })) : (n.close(), ElMessage.error(a.ResultMessage));
      }).catch((a) => {
        n.close(), console.log(a);
      });
    }
    function exportTableReadData() {
      let e = props.url;
      if (!e) {
        ElMessage.error("接口地址不存在！");
        return;
      }
      let t = Object.assign(props.queryData, columnSortData);
      t = lessCom.getQueryData(t), t.Query_PageSize = 1e5, t.Query_PageIndex = 0, e.post(t).then((n) => {
        if (n.ResultCode === "0") {
          var a = n.Data.Data;
          exportTableData(a);
        } else
          ElMessage.error(n.ResultMessage);
      });
    }
    function exportDefaultTableData(e, t, n) {
      n || (n = getExportFileName()), lessCom.exportJSON({
        header: e,
        data: t,
        filename: n,
        autoWidth: !0
      });
    }
    function formatExportJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => j === "timestamp" ? lessCom.parseTime(v[j]) : j.indexOf(".") > -1 ? eval("v." + j) : v[j]));
    }
    function getExportFileName() {
      let e = props.tableName, t = props.queryData;
      return t.StartDate_QueryDate && t.EndDate_QueryDate ? e += "(" + t.StartDate_QueryDate.replaceAll(" 00:00:00", "") + "~" + t.EndDate_QueryDate.replaceAll(" 23:59:59", "") + ")-" + lessCom.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss") : t.StartDate_CreateDate && t.EndDate_CreateDate ? e += "(" + t.StartDate_CreateDate.replaceAll(" 00:00:00", "") + "~" + t.EndDate_CreateDate.replaceAll(" 23:59:59", "") + ")-" + lessCom.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss") : t.DateType ? (t.DateType == 1 || t.DateType == "Day") && t.StartDate_CreateDay ? e += "(" + t.StartDate_CreateDay.replaceAll(" 00:00:00", "") + "~" + t.EndDate_CreateDay.replaceAll(" 23:59:59", "") + ")-" + lessCom.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss") : (t.DateType == 2 || t.DateType == "Week") && t.StartDate_CreateWeek ? e += "(" + t.StartDate_CreateWeek.replaceAll(" 00:00:00", "") + "~" + t.EndDate_CreateWeek.replaceAll(" 23:59:59", "") + ")-" + lessCom.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss") : t.EndDate_CreateMonth ? e += "(" + t.StartDate_CreateMonth.replaceAll(" 00:00:00", "") + "~" + t.EndDate_CreateMonth.replaceAll(" 23:59:59", "") + ")-" + lessCom.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss") : e += "-" + lessCom.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss") : t.StartDate_CreateMonth && t.EndDate_CreateMonth ? e += "(" + t.StartDate_CreateMonth.replaceAll(" 00:00:00", "") + "~" + t.EndDate_CreateMonth.replaceAll(" 23:59:59", "") + ")-" + lessCom.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss") : t.StartDate_CreateDay && t.EndDate_CreateDay ? e += "(" + t.StartDate_CreateDay.replaceAll(" 00:00:00", "") + "~" + t.EndDate_CreateDay.replaceAll(" 23:59:59", "") + ")-" + lessCom.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss") : t.StartDate_CreateWeek && t.EndDate_CreateWeek ? e += "(" + t.StartDate_CreateWeek.replaceAll(" 00:00:00", "") + "~" + t.EndDate_CreateWeek.replaceAll(" 23:59:59", "") + ")-" + lessCom.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss") : e += "-" + lessCom.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss"), e;
    }
    return initData(), onMounted(() => {
      props.initReadData && props.url && readData(), currShowSummary.value = props.showSummary, props.spanMethod ? currSpanMethod = props.spanMethod : columnMergeData.length && (currSpanMethod = handleSpanMethod), attrs.onSortChange ? currSortChange = attrs.onSortChange : currSortChange = handleSortTable, props.summaryMethod ? (currSummaryMethod = props.summaryMethod, currShowSummary.value = !0) : columnSummaryData.length && (currSummaryMethod = handleSummaryMethod, currShowSummary.value = !0), (props.headerStickyTop === !0 || props.headerStickyTop > -1) && setTimeout(() => {
        currHeaderStickyTop.value = lessCom.getToolHeight();
      }, 400), setDragSortable(), window.addEventListener("resize", function() {
        (props.headerStickyTop === !0 || props.headerStickyTop > -1) && setTimeout(() => {
          currHeaderStickyTop.value = lessCom.getToolHeight();
        }, 400);
      });
    }), __expose({
      exportTableReadData,
      exportTableReadDataHtml,
      exportClientTableDataHtml,
      toggleRowSelection,
      initTableCheckKeys,
      initTableCheckRows,
      handleTableRowExchangeMove,
      handleTableRowMoveHere,
      handleTableSelectSortRow,
      setTableCurrentRow,
      getTableSelection,
      handleTableBodyScroll,
      editTable,
      unEditTable
    }), (e, t) => {
      const n = resolveComponent("el-tag"), a = resolveComponent("draggable"), i = resolveComponent("el-button"), s = resolveComponent("el-table"), u = resolveComponent("el-scrollbar"), f = resolveComponent("el-affix"), p = resolveComponent("el-input"), m = resolveComponent("el-pagination"), b = resolveComponent("leo-menus-context"), _ = resolveDirective("loading");
      return openBlock(), createElementBlock(Fragment, null, [
        e.showCheckLabelFieldname || e.$slots.checklabel ? (openBlock(), createElementBlock("div", _hoisted_1, [
          createVNode(a, {
            list: unref(tableCheckData).checkRows,
            "item-key": e.rowKey,
            class: "leo-table-checkrows",
            onEnd: handleDragCheckItem
          }, {
            item: withCtx(({ element: E }) => [
              createVNode(n, {
                closable: !0,
                onClose: (w) => handleCloseCheckItem(E)
              }, {
                default: withCtx(() => [
                  renderSlot(e.$slots, "checklabel", { checkItem: E }, () => [
                    e.showCheckLabelFieldname ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(E[e.showCheckLabelFieldname]), 1)) : createCommentVNode("", !0)
                  ])
                ]),
                _: 2
              }, 1032, ["onClose"])
            ]),
            _: 3
          }, 8, ["list", "item-key"])
        ])) : createCommentVNode("", !0),
        (openBlock(), createBlock(resolveDynamicComponent(isEdit.value ? unref(tableFormContainer) : unref(tableContainer)), null, {
          default: withCtx(() => [
            withDirectives((openBlock(), createBlock(s, mergeProps({
              data: tableData,
              "inner-wrapper-class": wrapTagID,
              border: !0,
              fit: "",
              "highlight-current-row": "",
              class: !unref(isMobile) && e.hasBottomFixdScroll ? unref(tagID) + " leo-table-noScroll" : unref(tagID),
              "row-key": e.rowKey,
              ref_key: "dataTable",
              ref: dataTable,
              "header-sticky-top": unref(currHeaderStickyTop),
              "row-class-name": currRowClassName.value,
              "show-summary": unref(currShowSummary),
              onSortChange: unref(currSortChange),
              onRowContextmenu: handleRowContentMenu,
              onRowDblclick: handleTableRowDblClick,
              onRowClick: handleTableRowClick,
              onSelect: handleTableSelect,
              onSelectAll: handleTableSelectAll,
              "span-method": unref(currSpanMethod),
              "summary-method": unref(currSummaryMethod)
            }, unref(attrs)), {
              default: withCtx(() => [
                renderSlot(e.$slots, "default"),
                e.showEditColumn && (isShowEditColumn.value || e.dragSortable) ? (openBlock(), createBlock(_sfc_main$9, {
                  key: 0,
                  label: "操作",
                  fixed: "right",
                  width: "200"
                }, {
                  default: withCtx(({ row: E, $index: w }) => [
                    E.edit && isEdit.value ? (openBlock(), createBlock(i, {
                      key: 0,
                      type: "success",
                      onClick: (A) => handleRowSave(E),
                      loading: E.saveDataLoading,
                      icon: "Check"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("保存")
                      ]),
                      _: 2
                    }, 1032, ["onClick", "loading"])) : createCommentVNode("", !0),
                    createVNode(i, {
                      onClick: (A) => handleRowEdit(E, w),
                      icon: "Edit",
                      type: E.edit ? "info" : "primary"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(E.edit ? "取消" : "编辑"), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick", "type"]),
                    e.dragSortable ? (openBlock(), createBlock(i, {
                      key: 1,
                      type: "info",
                      class: "leo-table-drag",
                      icon: "Rank"
                    })) : createCommentVNode("", !0)
                  ]),
                  _: 1
                })) : createCommentVNode("", !0)
              ]),
              append: withCtx(() => [
                renderSlot(e.$slots, "append")
              ]),
              empty: withCtx(() => [
                renderSlot(e.$slots, "empty")
              ]),
              _: 3
            }, 16, ["data", "class", "row-key", "header-sticky-top", "row-class-name", "show-summary", "onSortChange", "span-method", "summary-method"])), [
              [_, unref(dataLoading)]
            ]),
            !unref(isMobile) && e.hasBottomFixdScroll && unref(tableBodyWidth) ? (openBlock(), createBlock(f, {
              key: 0,
              position: "bottom",
              ref: "bottomAffix",
              offset: 20,
              target: "." + unref(tagID)
            }, {
              default: withCtx(() => [
                unref(dataLoading) ? createCommentVNode("", !0) : (openBlock(), createElementBlock("div", _hoisted_3, [
                  createVNode(u, {
                    ref_key: "bottomScroll",
                    ref: bottomScroll,
                    class: "leo_scollbar_container",
                    onScroll: handleBottomFixedScroll
                  }, {
                    default: withCtx(() => [
                      createElementVNode("div", {
                        style: normalizeStyle({ width: unref(tableBodyWidth), height: "10px" })
                      }, null, 4)
                    ]),
                    _: 1
                  }, 512)
                ]))
              ]),
              _: 1
            }, 8, ["target"])) : createCommentVNode("", !0)
          ]),
          _: 3
        })),
        e.isClientPage || unref(currPageTotal) > 0 ? (openBlock(), createElementBlock("div", _hoisted_4, [
          e.hasPage ? (openBlock(), createBlock(m, {
            key: 0,
            background: "",
            small: "",
            layout: unref(isMobile) ? unref(mobilePageLayout) : e.pageLayout,
            "page-sizes": e.pageSizes,
            "page-size": unref(currPageSize),
            total: unref(currRecourdCount),
            "current-page": unref(currPageIndex),
            onCurrentChange: handleChangePage,
            onSizeChange: handleChangePageSize
          }, {
            default: withCtx(() => [
              e.isCustomPageSize && !unref(isMobile) ? (openBlock(), createBlock(p, {
                key: 0,
                modelValue: unref(currPageSize),
                "onUpdate:modelValue": t[0] || (t[0] = (E) => isRef(currPageSize) ? currPageSize.value = E : currPageSize = E),
                style: { width: "55px", "margin-left": "5px" },
                onBlur: handleChangePageSize,
                placeholder: "页数"
              }, null, 8, ["modelValue"])) : createCommentVNode("", !0),
              unref(isMobile) ? createCommentVNode("", !0) : (openBlock(), createBlock(n, {
                key: 1,
                type: "info",
                onClick: exportTableDataHtml,
                style: { "margin-right": "10px", cursor: "pointer", "margin-left": "10px" }
              }, {
                default: withCtx(() => [
                  createTextVNode("导出")
                ]),
                _: 1
              }))
            ]),
            _: 1
          }, 8, ["layout", "page-sizes", "page-size", "total", "current-page"])) : createCommentVNode("", !0)
        ])) : createCommentVNode("", !0),
        createVNode(b, {
          ref_key: "dataGridMenu",
          ref: dataGridMenu,
          row: unref(rowData),
          visible: unref(gridMenuVisible),
          positionLeft: unref(gridMenuPositionLeft),
          positionTop: unref(gridMenuPositionTop)
        }, null, 8, ["row", "visible", "positionLeft", "positionTop"])
      ], 64);
    };
  }
});
_sfc_main$8.install = (e) => {
  e.component(_sfc_main$8.__name, _sfc_main$8);
};
_sfc_main$9.install = (e) => {
  e.component(_sfc_main$9.__name, _sfc_main$9);
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  name: "ElsColumnBool",
  __name: "TableColumnBool",
  props: {
    trueLabel: { default: "是" },
    falseLabel: { default: "否" },
    trueValue: { type: [String, Number, Boolean], default: 1 }
  },
  setup(e) {
    const t = e, n = useSlots();
    return (a, i) => (openBlock(), createBlock(_sfc_main$9, mergeProps({ type: "bool" }, t), createSlots({ _: 2 }, [
      unref(n).default ? {
        name: "default",
        fn: withCtx(({ row: s, $index: u }) => [
          renderSlot(a.$slots, "default", {
            row: s,
            $index: u
          })
        ]),
        key: "0"
      } : void 0,
      unref(n).edit ? {
        name: "edit",
        fn: withCtx(({ row: s, $index: u }) => [
          renderSlot(a.$slots, "edit", {
            row: s,
            $index: u
          })
        ]),
        key: "1"
      } : void 0
    ]), 1040));
  }
});
_sfc_main$7.install = (e) => {
  e.component(_sfc_main$7.__name, _sfc_main$7);
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  name: "ElsColumnCheckbox",
  __name: "TableColumnCheckbox",
  setup(e) {
    const t = useSlots();
    return (n, a) => (openBlock(), createBlock(_sfc_main$9, {
      type: "selection",
      isExport: !1
    }, createSlots({ _: 2 }, [
      unref(t).default ? {
        name: "default",
        fn: withCtx(({ row: i, $index: s }) => [
          renderSlot(n.$slots, "default", {
            row: i,
            $index: s
          })
        ]),
        key: "0"
      } : void 0,
      unref(t).edit ? {
        name: "edit",
        fn: withCtx(({ row: i, $index: s }) => [
          renderSlot(n.$slots, "edit", {
            row: i,
            $index: s
          })
        ]),
        key: "1"
      } : void 0
    ]), 1024));
  }
});
_sfc_main$6.install = (e) => {
  e.component(_sfc_main$6.__name, _sfc_main$6);
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  name: "ElsColumnEnum",
  __name: "TableColumnEnum",
  props: {
    enumData: {},
    enumShowType: { default: "Description" },
    enumEqualType: { default: "Value" },
    enumNoneLabel: { default: "未知" }
  },
  setup(e) {
    const t = e, n = useSlots();
    return (a, i) => (openBlock(), createBlock(_sfc_main$9, mergeProps({ type: "enum" }, t), createSlots({ _: 2 }, [
      unref(n).default ? {
        name: "default",
        fn: withCtx(({ row: s, $index: u }) => [
          renderSlot(a.$slots, "default", {
            row: s,
            $index: u
          })
        ]),
        key: "0"
      } : void 0,
      unref(n).edit ? {
        name: "edit",
        fn: withCtx(({ row: s, $index: u }) => [
          renderSlot(a.$slots, "edit", {
            row: s,
            $index: u
          })
        ]),
        key: "1"
      } : void 0
    ]), 1040));
  }
});
_sfc_main$5.install = (e) => {
  e.component(_sfc_main$5.__name, _sfc_main$5);
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  name: "ElsColumnExpand",
  __name: "TableColumnExpand",
  setup(e) {
    const t = useSlots();
    return (n, a) => (openBlock(), createBlock(_sfc_main$9, {
      type: "expand",
      isExport: !1
    }, createSlots({ _: 2 }, [
      unref(t).default ? {
        name: "default",
        fn: withCtx(({ row: i, $index: s }) => [
          renderSlot(n.$slots, "default", {
            row: i,
            $index: s
          })
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
});
_sfc_main$4.install = (e) => {
  e.component(_sfc_main$4.__name, _sfc_main$4);
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  name: "ElsColumnHeader",
  __name: "TableColumnHeader",
  setup(e) {
    const t = useSlots();
    return (n, a) => (openBlock(), createBlock(_sfc_main$9, { type: "header" }, createSlots({ _: 2 }, [
      unref(t).default ? {
        name: "default",
        fn: withCtx(({ row: i, $index: s }) => [
          renderSlot(n.$slots, "default", {
            row: i,
            $index: s
          })
        ]),
        key: "0"
      } : void 0
    ]), 1024));
  }
});
_sfc_main$3.install = (e) => {
  e.component(_sfc_main$3.__name, _sfc_main$3);
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  name: "ElsColumnImage",
  __name: "TableColumnImage",
  setup(e) {
    const t = useSlots();
    return (n, a) => (openBlock(), createBlock(_sfc_main$9, { type: "image" }, createSlots({ _: 2 }, [
      unref(t).default ? {
        name: "default",
        fn: withCtx(({ row: i, $index: s }) => [
          renderSlot(n.$slots, "default", {
            row: i,
            $index: s
          })
        ]),
        key: "0"
      } : void 0,
      unref(t).edit ? {
        name: "edit",
        fn: withCtx(({ row: i, $index: s }) => [
          renderSlot(n.$slots, "edit", {
            row: i,
            $index: s
          })
        ]),
        key: "1"
      } : void 0
    ]), 1024));
  }
});
_sfc_main$2.install = (e) => {
  e.component(_sfc_main$2.__name, _sfc_main$2);
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  name: "ElsColumnOperate",
  __name: "TableColumnOperate",
  props: {
    menusFieldname: { default: "PowerMenu" }
  },
  setup(e) {
    const t = useSlots();
    return (n, a) => (openBlock(), createBlock(_sfc_main$9, {
      label: "操作",
      type: "operate",
      menusFieldname: n.menusFieldname,
      isExport: !1
    }, createSlots({ _: 2 }, [
      unref(t).default ? {
        name: "default",
        fn: withCtx(({ row: i, $index: s }) => [
          renderSlot(n.$slots, "default", {
            row: i,
            $index: s
          })
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["menusFieldname"]));
  }
});
_sfc_main$1.install = (e) => {
  e.component(_sfc_main$1.__name, _sfc_main$1);
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  name: "ElsColumnSelect",
  __name: "TableColumnSelect",
  props: {
    selectButtonLabel: { default: "选择" }
  },
  setup(e) {
    const t = useSlots();
    return (n, a) => (openBlock(), createBlock(_sfc_main$9, {
      type: "select",
      label: "操作",
      width: "120",
      selectButtonLabel: n.selectButtonLabel,
      isExport: !1
    }, createSlots({ _: 2 }, [
      unref(t).default ? {
        name: "default",
        fn: withCtx(({ row: i, $index: s }) => [
          renderSlot(n.$slots, "default", {
            row: i,
            $index: s
          })
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["selectButtonLabel"]));
  }
});
_sfc_main.install = (e) => {
  e.component(_sfc_main.__name, _sfc_main);
};
const components = [
  _sfc_main$t,
  Select,
  ElsRadio,
  _sfc_main$f,
  ElsCheckbox,
  _sfc_main$g,
  _sfc_main$k,
  OptionGroup,
  _sfc_main$e,
  _sfc_main$d,
  _sfc_main$b,
  FormQuery,
  _sfc_main$c,
  _sfc_main$8,
  _sfc_main$9,
  _sfc_main$7,
  _sfc_main$6,
  _sfc_main$5,
  _sfc_main$4,
  _sfc_main$3,
  _sfc_main$2,
  _sfc_main$1,
  _sfc_main
], ElementLess = {
  install(e) {
    components.forEach((t) => {
      e.component(t.name, t);
    });
  }
};
components.forEach((e) => {
  ElementLess[e.name] = e;
});
export {
  ElementLess
};
