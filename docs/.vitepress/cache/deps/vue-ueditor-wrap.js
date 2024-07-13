import {
  createVNode,
  defineComponent,
  init_vue_esm_bundler,
  nextTick,
  onBeforeUnmount,
  onDeactivated,
  ref,
  toRef,
  watch
} from "./chunk-4IFYGZA2.js";
import "./chunk-TIUEEL27.js";

// node_modules/vue-ueditor-wrap/es/utils/camelize.js
function camelize(str) {
  return str.replace(/-(\w)/g, function(_, c) {
    return c ? c.toUpperCase() : "";
  });
}

// node_modules/vue-ueditor-wrap/es/utils/with-install.js
function withInstall(options) {
  options.install = function(app) {
    var _ref = options, name = _ref.name;
    app.component(name, options);
    app.component(camelize("-" + name), options);
  };
  return options;
}

// node_modules/vue-ueditor-wrap/es/utils/LoadEvent.js
var LoadEvent = function() {
  function LoadEvent2() {
    this.listeners = {};
  }
  var _proto = LoadEvent2.prototype;
  _proto.on = function on(eventName, callback) {
    if (this.listeners[eventName] === void 0) {
      this.listeners[eventName] = {
        triggered: false,
        requested: false,
        cbs: []
      };
    }
    if (this.listeners[eventName].triggered) {
      callback();
    }
    this.listeners[eventName].cbs.push(callback);
  };
  _proto.emit = function emit(eventName) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].triggered = true;
      this.listeners[eventName].cbs.forEach(function(callback) {
        return callback();
      });
    }
  };
  return LoadEvent2;
}();

// node_modules/vue-ueditor-wrap/es/utils/debounce.js
function debounce(func, delay) {
  var timer;
  var debouncedFunction = function debouncedFunction2() {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (timer)
      clearTimeout(timer);
    timer = setTimeout(function() {
      func.apply(_this, args);
    }, delay);
  };
  debouncedFunction.cancel = function() {
    if (timer !== void 0) {
      clearTimeout(timer);
    }
  };
  return debouncedFunction;
}

// node_modules/vue-ueditor-wrap/es/utils/async-series.js
function asyncSeries(funs) {
  return funs.reduce(function(promise, fun) {
    return promise.then(fun);
  }, Promise.resolve());
}

// node_modules/vue-ueditor-wrap/es/utils/randomString.js
function randomString(length) {
  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  var str = "";
  for (var i = 0; i < length; i++) {
    str += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return str;
}

// node_modules/vue-ueditor-wrap/es/vue-ueditor-wrap/VueUeditorWrap.js
init_vue_esm_bundler();
init_vue_esm_bundler();
var VueUeditorWrap_default = defineComponent({
  name: "vue-ueditor-wrap",
  props: {
    // 手动设置 UEditor ID
    editorId: String,
    // 常用于表单中 http://fex.baidu.com/ueditor/#start-submit
    name: String,
    modelValue: {
      type: String,
      default: ""
    },
    // http://fex.baidu.com/ueditor/#start-config
    config: Object,
    // 监听富文本内容变化的方式
    mode: {
      type: String,
      default: "observer",
      validator: function validator(value) {
        return ["observer", "listener"].indexOf(value) !== -1;
      }
    },
    // MutationObserver 的配置 https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit
    observerOptions: {
      type: Object,
      default: function _default() {
        return {
          attributes: true,
          // 是否监听 DOM 元素的属性变化
          attributeFilter: ["src", "style", "type", "name"],
          // 只有在该数组中的属性值的变化才会监听
          characterData: true,
          // 是否监听文本节点
          childList: true,
          // 是否监听子节点
          subtree: true
          // 是否监听后代元素
        };
      }
    },
    // MutationObserver 的回调函数防抖间隔
    observerDebounceTime: {
      type: Number,
      default: 50,
      validator: function validator2(value) {
        return value >= 20;
      }
    },
    //  SSR 项目，服务端实例化组件时组件内部不会对 UEditor 进行初始化，仅在客户端初始化 UEditor，这个参数设置为 true 可以跳过环境检测，直接初始化
    forceInit: Boolean,
    // 是否在组建销毁时销毁 UEditor 实例
    destroy: {
      type: Boolean,
      default: true
    },
    // 指定 UEditor 依赖的静态资源，js & css
    editorDependencies: {
      type: Array
    },
    // 检测依赖的静态资源是否加载完成的方法
    editorDependenciesChecker: {
      type: Function
    }
  },
  emits: ["update:modelValue", "before-init", "ready"],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var STATUS_MAP = {
      UN_READY: "UN_READY",
      // 尚未初始化
      PENDING: "PENDING",
      // 开始初始化但尚未 ready
      READY: "READY"
      // 初始化完成并已 ready
    };
    var status = STATUS_MAP.UN_READY;
    var editor;
    var observer;
    var innerValue;
    var container = ref();
    var defaultEditorDependencies = ["ueditor.config.js", "ueditor.all.min.js"];
    var defaultEditorDependenciesChecker = function defaultEditorDependenciesChecker2() {
      return window.UE && window.UE.getEditor && window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0;
    };
    var modelValue = toRef(props, "modelValue");
    if (!window.$loadEventBus) {
      window.$loadEventBus = new LoadEvent();
    }
    var loadScript = function loadScript2(link) {
      return new Promise(function(resolve, reject) {
        window.$loadEventBus.on(link, resolve);
        if (window.$loadEventBus.listeners[link].requested === false) {
          window.$loadEventBus.listeners[link].requested = true;
          var script = document.createElement("script");
          script.src = link;
          script.onload = function() {
            window.$loadEventBus.emit(link);
          };
          script.onerror = reject;
          document.getElementsByTagName("head")[0].appendChild(script);
        }
      });
    };
    var loadCss = function loadCss2(link) {
      return new Promise(function(resolve, reject) {
        window.$loadEventBus.on(link, resolve);
        if (window.$loadEventBus.listeners[link].requested === false) {
          window.$loadEventBus.listeners[link].requested = true;
          var css = document.createElement("link");
          css.type = "text/css";
          css.rel = "stylesheet";
          css.href = link;
          css.onload = function() {
            window.$loadEventBus.emit(link);
          };
          css.onerror = reject;
          document.getElementsByTagName("head")[0].appendChild(css);
        }
      });
    };
    var loadEditorDependencies = function loadEditorDependencies2() {
      return new Promise(function(resolve, reject) {
        if (props.editorDependencies && props.editorDependenciesChecker && props.editorDependenciesChecker()) {
          resolve();
          return;
        }
        if (!props.editorDependencies && defaultEditorDependenciesChecker()) {
          resolve();
          return;
        }
        var _reduce = (props.editorDependencies || defaultEditorDependencies).reduce(function(res, link) {
          var isFullUrl = /^((https?:)?\/\/)?[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)+\//.test(link);
          if (!isFullUrl) {
            var _props$config;
            link = (((_props$config = props.config) == null ? void 0 : _props$config.UEDITOR_HOME_URL) || "") + link;
          }
          if (link.slice(-3) === ".js") {
            res.jsLinks.push(link);
          } else if (link.slice(-4) === ".css") {
            res.cssLinks.push(link);
          }
          return res;
        }, {
          jsLinks: [],
          cssLinks: []
        }), jsLinks = _reduce.jsLinks, cssLinks = _reduce.cssLinks;
        Promise.all([
          Promise.all(cssLinks.map(function(link) {
            return loadCss(link);
          })),
          // 依次加载依赖的 JS 文件，JS 执行是有顺序要求的，比如 ueditor.all.js 就要晚于 ueditor.config.js 执行
          // 动态创建 script 是先加载完的先执行，所以不可以一次性创建所有资源的引入脚本
          asyncSeries(jsLinks.map(function(link) {
            return function() {
              return loadScript(link);
            };
          }))
        ]).then(function() {
          return resolve();
        }).catch(reject);
      });
    };
    var observerContentChangeHandler = function observerContentChangeHandler2() {
      innerValue = editor.getContent();
      emit("update:modelValue", innerValue);
    };
    var normalChangeListener = function normalChangeListener2() {
      editor.addListener("contentChange", observerContentChangeHandler);
    };
    var changeHandle = function changeHandle2() {
      if (editor.document.getElementById("baidu_pastebin")) {
        return;
      }
      innerValue = editor.getContent();
      emit("update:modelValue", innerValue);
    };
    var observerChangeListener = function observerChangeListener2() {
      observer = new MutationObserver(debounce(changeHandle, props.observerDebounceTime));
      observer.observe(editor.body, props.observerOptions);
    };
    var initEditor = function initEditor2() {
      var editorId = props.editorId || "editor_" + randomString(8);
      container.value.id = editorId;
      emit("before-init", editorId);
      editor = window.UE.getEditor(editorId, props.config);
      editor.addListener("ready", function() {
        if (status === STATUS_MAP.READY) {
          editor.setContent(props.modelValue);
        } else {
          status = STATUS_MAP.READY;
          emit("ready", editor);
          if (props.modelValue) {
            editor.setContent(props.modelValue);
          }
        }
        if (props.mode === "observer" && window.MutationObserver) {
          observerChangeListener();
        } else {
          normalChangeListener();
        }
      });
    };
    watch(modelValue, function(value) {
      if (status === STATUS_MAP.UN_READY) {
        status = STATUS_MAP.PENDING;
        (props.forceInit || typeof window !== "undefined") && loadEditorDependencies().then(function() {
          container.value ? initEditor() : nextTick(function() {
            return initEditor();
          });
        }).catch(function() {
          throw new Error("[vue-ueditor-wrap] UEditor 资源加载失败！请检查资源是否存在，UEDITOR_HOME_URL 是否配置正确！");
        });
      } else if (status === STATUS_MAP.READY) {
        value === innerValue || editor.setContent(value || "");
      }
    }, {
      immediate: true
    });
    onDeactivated(function() {
      editor && editor.removeListener("contentChange", observerContentChangeHandler);
      observer && observer.disconnect();
    });
    onBeforeUnmount(function() {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
      if (props.destroy && editor && editor.destroy) {
        editor.destroy();
      }
    });
    return function() {
      return createVNode("div", null, [createVNode("div", {
        "ref": container,
        "name": props.name
      }, null)]);
    };
  }
});

// node_modules/vue-ueditor-wrap/es/vue-ueditor-wrap/index.js
var VueUeditorWrap = withInstall(VueUeditorWrap_default);
var vue_ueditor_wrap_default = VueUeditorWrap;

// node_modules/vue-ueditor-wrap/es/index.js
var version = "3.0.8";
function install(app) {
  var components = [vue_ueditor_wrap_default];
  components.forEach(function(item) {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}
var es_default = {
  install,
  version
};
export {
  vue_ueditor_wrap_default as VueUeditorWrap,
  es_default as default,
  install,
  version
};
//# sourceMappingURL=vue-ueditor-wrap.js.map
