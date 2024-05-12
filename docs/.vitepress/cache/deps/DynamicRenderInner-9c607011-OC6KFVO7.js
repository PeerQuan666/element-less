import {
  dynamicControlType,
  lessCom$1
} from "./chunk-3QIF4CSV.js";
import {
  require_ace
} from "./chunk-Z6P4XJQN.js";
import "./chunk-XRMSH5FH.js";
import "./chunk-5RKO63PX.js";
import "./chunk-WK6OIY7W.js";
import {
  require_FileSaver_min
} from "./chunk-7HNOAAY3.js";
import {
  require_lodash
} from "./chunk-ANMWJVDA.js";
import "./chunk-4VZXYHE3.js";
import "./chunk-QU2NWNC6.js";
import "./chunk-7H6PW3HW.js";
import "./chunk-ETGI5LAL.js";
import "./chunk-37KZVLMF.js";
import "./chunk-CDIIASEF.js";
import "./chunk-7XXE4A3E.js";
import "./chunk-KMIWLYJ3.js";
import "./chunk-O5SR6HRO.js";
import "./chunk-3Q2DQ4TD.js";
import {
  require_vue_json_viewer
} from "./chunk-RZQE3BD4.js";
import {
  require_vuedraggable_umd
} from "./chunk-YPXON4HA.js";
import "./chunk-HJZKQRFM.js";
import "./chunk-NUVG2SJ3.js";
import "./chunk-QMISD67L.js";
import "./chunk-HPQ2WTP6.js";
import {
  useVModel
} from "./chunk-2GPZ6SAN.js";
import "./chunk-UD235IZI.js";
import {
  Fragment,
  computed2 as computed,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  defineComponent,
  init_vue_runtime_esm_bundler,
  inject,
  isRef,
  mergeProps,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  openBlock,
  ref,
  renderList,
  resolveComponent,
  resolveDynamicComponent,
  toDisplayString,
  unref,
  useAttrs,
  watch,
  watchEffect,
  withCtx
} from "./chunk-Y3E3Y6KD.js";
import {
  __toESM
} from "./chunk-TIUEEL27.js";

// node_modules/element-less/DynamicRenderInner-9c607011.js
init_vue_runtime_esm_bundler();
var import_file_saver = __toESM(require_FileSaver_min());
var import_lodash = __toESM(require_lodash());
var import_vuedraggable = __toESM(require_vuedraggable_umd());
var import_ace_builds = __toESM(require_ace());
var import_vue_json_viewer = __toESM(require_vue_json_viewer());
var _sfc_main$2 = defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "DynamicRenderInnerItem",
  props: {
    modelValue: {},
    item: {},
    currDepath: {},
    parentNode: {},
    currNode: {},
    nodeType: {}
  },
  emits: ["update:modelValue", "valueChange"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const attrs = useAttrs();
    const currValue = ref();
    watchEffect(() => {
      currValue.value = props.modelValue;
    });
    const getUploadUrl = inject("getUploadUrl", () => null);
    watch(currValue, (val) => {
      emits("update:modelValue", val);
      emits("valueChange", val);
    });
    function handleClear() {
      if (props.item.dataTypeName == "数字" || props.item.arrayDataTypeName == "数字") {
        currValue.value = 0;
      }
      if (props.item.dataTypeName == "Bool" || props.item.arrayDataTypeName == "Bool") {
        currValue.value = false;
      } else {
        currValue.value = "";
      }
    }
    const dyProvideData = inject("dyProvideData", null);
    const baseAttrs = computed(() => {
      let baseConfig = {};
      const currControl = dynamicControlType.find((ele) => ele.value == props.item.controlType);
      if (currControl == null ? void 0 : currControl.defaultPropertys) {
        const currBaseConfig = Object.assign({}, currControl == null ? void 0 : currControl.defaultPropertys, props.item.config.baseConfig);
        for (var key in currBaseConfig) {
          if (key) {
            if (currBaseConfig[key] === void 0 || currBaseConfig[key] === "") {
              delete currBaseConfig[key];
            }
          }
        }
        baseConfig = currBaseConfig;
      }
      const currAttrs = Object.assign(lessCom$1.cloneObj(baseConfig), { "style": props.item.config.advancedConfig.style }, attrs);
      if (currAttrs == null ? void 0 : currAttrs.max) {
        currAttrs.max = parseInt(currAttrs.max);
      } else {
        delete currAttrs.max;
      }
      if (currAttrs == null ? void 0 : currAttrs.min) {
        currAttrs.min = parseInt(currAttrs.min);
      } else {
        delete currAttrs.min;
      }
      if (currAttrs == null ? void 0 : currAttrs.precision) {
        currAttrs.precision = parseFloat(currAttrs.precision);
      } else {
        delete currAttrs.precision;
      }
      if (currAttrs == null ? void 0 : currAttrs.step) {
        currAttrs.step = parseFloat(currAttrs.step);
      } else {
        delete currAttrs.step;
      }
      if (currAttrs == null ? void 0 : currAttrs.rows) {
        currAttrs.rows = parseFloat(currAttrs.rows);
      } else {
        delete currAttrs.rows;
      }
      if (["ElsSelect", "ElsRadio", "ElsCheckBox", "ElsCascader"].includes(props.item.componentName)) {
        if (props.item.dataTypeName == "数字" || props.item.arrayDataTypeName == "数字") {
          currAttrs.valueType = "Number";
        } else if (props.item.dataTypeName == "Bool" || props.item.arrayDataTypeName == "Bool") {
          currAttrs.valueType = "Bool";
        }
      }
      if (!currAttrs.labelField) {
        delete currAttrs.labelField;
      }
      if (!currAttrs.valueField) {
        delete currAttrs.valueField;
      }
      return currAttrs;
    });
    const componentAttrs = ref(baseAttrs.value);
    const showText = ref("");
    const componentName = ref("");
    watchEffect(() => {
      componentName.value = props.item.componentName;
    });
    watch(dyProvideData, (val) => {
      if (val && ["active-value", "inactive-value", "multiple", "value"].includes(props.item.keyCode)) {
        const currNodeType = val.nodeType;
        showText.value = "";
        if (currNodeType && currNodeType.componentName == "ElsSwitch") {
          if (props.item.keyCode == "active-value" || props.item.keyCode == "inactive-value") {
            if (currNodeType.dataType == "Bool") {
              componentAttrs.value = Object.assign({}, baseAttrs.value, { "disabled": true });
              if (props.item.keyCode == "active-value") {
                currValue.value = true;
                showText.value = "true";
              } else {
                currValue.value = false;
                showText.value = "false";
              }
            } else if (currNodeType.dataType == "数字") {
              componentAttrs.value = Object.assign({}, baseAttrs.value, { "disabled": false });
              if (props.item.keyCode == "active-value") {
                showText.value = "1";
                currValue.value = 1;
              } else {
                currValue.value = 0;
                showText.value = "0";
              }
            } else {
              componentAttrs.value = Object.assign({}, baseAttrs.value, { "disabled": false });
              if (props.item.keyCode == "active-value") {
                if (typeof currValue.value !== "string") {
                  currValue.value = "true";
                }
              } else {
                if (typeof currValue.value !== "string") {
                  currValue.value = "false";
                }
              }
            }
          }
        } else if (currNodeType && ["ElsSelect", "ElsRadio", "ElsCheckBox", "ElsCascader"].includes(currNodeType.componentName)) {
          if (props.item.keyCode === "multiple" && currNodeType.dataType === "数字") {
            currValue.value = false;
            showText.value = "false";
          } else if (props.item.keyCode === "value") {
            if (currNodeType.dataType == "Bool") {
              if (typeof currValue.value !== "boolean") {
                currValue.value = false;
              }
              componentName.value = "ElsSelect";
              componentAttrs.value = Object.assign({ "teleported": false, "width": "80", "data": [{ label: "true", value: true }, { label: "false", value: false }], "type": "radio" }, baseAttrs.value);
            } else if (currNodeType.dataType === "数字") {
              if (typeof currValue.value !== "number") {
                currValue.value = 0;
              }
              componentName.value = "ElsInputNumber";
              componentAttrs.value = Object.assign({}, baseAttrs.value, { "controls-position": "right", "width": "80" });
            }
          }
        }
      }
    }, { immediate: true, deep: true });
    function getFileUploadUrl() {
      let currUrl = props.item.config.baseConfig.url || props.item.config.baseConfig.modalUrl;
      if (currUrl) {
        if (currUrl.startsWith(":")) {
          currUrl = currUrl.substr(1);
          let currEvent = new Function("parentNode,currNode", "return " + currUrl);
          currUrl = currEvent(props.parentNode, props.currNode);
        }
        if (props.item.componentName === "ElsUpload") {
          return getUploadUrl(currUrl, props.item);
        } else {
          return currUrl.setPowerPublicQuery();
        }
      }
    }
    return (_ctx, _cache) => {
      const _component_el_tag = resolveComponent("el-tag");
      return componentName.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        showText.value ? (openBlock(), createBlock(_component_el_tag, { key: 0 }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(showText.value), 1)
          ]),
          _: 1
        })) : (openBlock(), createBlock(resolveDynamicComponent(componentName.value), mergeProps({ key: 1 }, componentAttrs.value, {
          modelValue: currValue.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => currValue.value = $event),
          url: getFileUploadUrl(),
          onClear: handleClear
        }), null, 16, ["modelValue", "url"]))
      ], 64)) : createCommentVNode("", true);
    };
  }
});
var _sfc_main$1 = defineComponent({
  __name: "DynamicRenderInnerArray",
  props: {
    item: {},
    parentNode: {}
  },
  emits: ["update:data"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const currData = useVModel(props, "item", emits);
    function handleDisabledExpress() {
      if (currData.value.config.advancedConfig && currData.value.config.advancedConfig.disabled) {
        let currEvent = new Function("parentNode,currNode", "return " + currData.value.config.advancedConfig.disabled);
        return currEvent(props.parentNode, currData.value);
      }
      return false;
    }
    function handleValueChange(val) {
      if (currData.value.config.advancedConfig && currData.value.config.advancedConfig.eventChange) {
        let currEvent = new Function("val,parentNode,currNode", currData.value.config.advancedConfig.eventChange);
        currEvent(val, props.parentNode, currData.value);
      }
    }
    function getItemDefaultValue() {
      if (currData.value.arrayDataTypeName == "Bool") {
        if (currData.value.defaultValue === "true") {
          return true;
        } else {
          return false;
        }
      } else if (currData.value.arrayDataTypeName === "数字") {
        if (currData.value.defaultValue != void 0 && currData.value.defaultValue !== "") {
          return parseFloat(currData.value.defaultValue);
        } else {
          return 0;
        }
      }
      if (currData.value.defaultValue) {
        return currData.value.defaultValue;
      }
      return "";
    }
    function handleAddItem() {
      currData.value.value.push(getItemDefaultValue());
    }
    const formAttrs = computed(() => {
      const currFormConfig = lessCom$1.cloneObj(currData.value.config.formConfig);
      currFormConfig.labelWidth = "0px";
      if (currFormConfig) {
        if (currFormConfig.validMethod) {
          let currEvent = new Function("parentNode,currNode", "return " + currFormConfig.validMethod);
          currFormConfig.validMethod = currEvent(props.parentNode, currData.value);
        } else {
          delete currFormConfig.validMethod;
        }
      }
      return currFormConfig;
    });
    function initDefault(val) {
      var _a;
      let defaultArrayData = [];
      let defaultValue = (_a = currData.value) == null ? void 0 : _a.defaultValue;
      if (currData.value.arrayDataTypeName === "数字") {
        if (defaultValue && defaultValue !== "") {
          defaultValue = parseFloat(defaultValue);
        } else {
          defaultValue = 0;
        }
      } else if (currData.value.arrayDataTypeName === "Bool") {
        if (defaultValue && (defaultValue == null ? void 0 : defaultValue.toLowerCase()) === "true") {
          defaultValue = parseFloat(defaultValue);
        } else {
          defaultValue = false;
        }
      } else if (!defaultValue) {
        defaultValue = "";
      }
      if (val === void 0 || val === "") {
        defaultArrayData.push(defaultValue);
      } else {
        for (let i = 0; i < val; i++) {
          defaultArrayData.push(defaultValue);
        }
      }
      currData.value.value = defaultArrayData;
    }
    watch(() => currData.value, (val) => {
      if (!val || !Array.isArray(val)) {
        initDefault(currData.value.config.arrayConfig.arrayDefaultLength);
      }
    }, { immediate: true });
    watch(() => currData.value.config.arrayConfig.arrayDefaultLength, (val) => {
      initDefault(val);
    });
    return (_ctx, _cache) => {
      const _component_els_list = resolveComponent("els-list");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({ "horizontal": unref(currData).config.arrayConfig.arrangementType === "Horizontal" }),
        style: { "flex-grow": "1" }
      }, [
        createVNode(_component_els_list, {
          data: unref(currData).value,
          onAdd: handleAddItem,
          "item-key": "",
          style: normalizeStyle([
            { "max-width": unref(currData).config.arrayConfig.maxWidth ? unref(currData).config.arrayConfig.maxWidth + "px" : "" },
            { "max-height": unref(currData).config.arrayConfig.maxHeight ? unref(currData).config.arrayConfig.maxHeight + "px" : "" },
            { "display": unref(currData).config.arrayConfig.arrangementType === "Horizontal" ? "flex" : "" },
            { "flex-wrap": "wrap" },
            { "gap": "5px" }
          ])
        }, {
          default: withCtx(({ index }) => [
            (openBlock(), createBlock(_sfc_main$2, mergeProps(formAttrs.value, {
              key: index,
              "parent-node": _ctx.parentNode,
              "curr-node": unref(currData),
              disabled: handleDisabledExpress(),
              prop: index.toString(),
              item: unref(currData),
              style: _ctx.item.config.advancedConfig.style,
              onValueChange: handleValueChange
            }), null, 16, ["parent-node", "curr-node", "disabled", "prop", "item", "style"]))
          ]),
          _: 1
        }, 8, ["data", "style"])
      ], 2);
    };
  }
});
var _sfc_main = defineComponent({
  __name: "DynamicRenderInner",
  props: {
    nodeItem: {},
    data: {},
    depath: {},
    containerName: {},
    parentNode: {}
  },
  emits: ["update:data"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const currData = useVModel(props, "data", emits);
    const defaultLabelWidth = inject("labelWidth", void 0);
    const labelWidth = ref();
    const currDepath = ref(0);
    const itemClassName = ref("");
    const currNode = computed(() => {
      let currData2 = {};
      props.data.forEach((ele) => {
        if (ele.componentName == "ElsRow") {
          ele.data.forEach((cele) => {
            currData2[cele.keyCode] = cele;
          });
        } else {
          currData2[ele.keyCode] = ele;
        }
      });
      return currData2;
    });
    function handleDisabledExpress(item) {
      if (item.config.baseConfig && item.config.advancedConfig.disabled) {
        let currEvent = new Function("parentNode,currNode", "return " + item.config.advancedConfig.disabled);
        return currEvent(props.parentNode, currNode.value);
      }
      return false;
    }
    function handleIfExpress(item) {
      try {
        if (item.config.advancedConfig && item.config.advancedConfig.vif) {
          let currEvent = new Function("parentNode,currNode", "return " + item.config.advancedConfig.vif);
          return currEvent(props.parentNode, currNode.value);
        }
      } catch (err) {
        console.error(err);
        debugger;
      }
      return true;
    }
    function handleValueChange(val, item) {
      if (item.config.advancedConfig && item.config.advancedConfig.eventChange) {
        let currEvent = new Function("val,parentNode,currNode", item.config.advancedConfig.eventChange);
        currEvent(val, props.parentNode, currNode.value);
      }
    }
    function getFormItemAttr(item) {
      var _a;
      const currFormConfig = lessCom$1.cloneObj(item.config.formConfig);
      if (item.dataTypeName == "无" || ((_a = item.config.baseConfig) == null ? void 0 : _a.componentName) == "ElsCaption" || item.componentName === "ElsRow") {
        currFormConfig.labelWidth = "0px";
      } else if (item.dataTypeName == "Array" && item.arrayDataTypeName == "Object") {
        delete currFormConfig.labelWidth;
      }
      if (currFormConfig) {
        if (currFormConfig.validMethod) {
          let currEvent = new Function("parentNode,currNode", "return " + currFormConfig.validMethod);
          currFormConfig.validMethod = currEvent(props.parentNode, currNode.value);
        } else {
          delete currFormConfig.validMethod;
        }
      }
      return currFormConfig;
    }
    function handleAddItem(item) {
      item.data.push(lessCom$1.cloneObj(item.arrayObjData));
    }
    if (props.depath && props.depath > 0) {
      itemClassName.value = "els-dynamic-r-item-child";
    } else {
      itemClassName.value = "els-dynamic-r-item";
    }
    watchEffect(() => {
      var _a;
      const formConfig = (_a = props.nodeItem) == null ? void 0 : _a.config.formConfig;
      if (props.nodeItem && formConfig) {
        labelWidth.value = formConfig.labelWidth ? formConfig.labelWidth : void 0;
      }
      if (!labelWidth.value && defaultLabelWidth) {
        labelWidth.value = defaultLabelWidth.value;
      }
    });
    currDepath.value += 1;
    return (_ctx, _cache) => {
      const _component_els_caption = resolveComponent("els-caption");
      const _component_els_list = resolveComponent("els-list");
      const _component_els_form_item = resolveComponent("els-form-item");
      const _component_els_form = resolveComponent("els-form");
      return openBlock(), createBlock(_component_els_form, {
        modelValue: unref(currData),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(currData) ? currData.value = $event : null),
        "label-width": labelWidth.value
      }, {
        default: withCtx(() => {
          var _a, _b, _c;
          return [
            (openBlock(), createBlock(resolveDynamicComponent(((_a = _ctx.nodeItem) == null ? void 0 : _a.componentName) == "ElsRow" ? "ElsRow" : "div"), {
              class: normalizeClass(itemClassName.value),
              style: normalizeStyle(((_b = _ctx.nodeItem) == null ? void 0 : _b.componentName) === "ElsRow" ? _ctx.nodeItem ? (_c = _ctx.nodeItem.config.advancedConfig) == null ? void 0 : _c.style : "" : "")
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(currData), (item, index) => {
                  var _a2;
                  return openBlock(), createBlock(resolveDynamicComponent(((_a2 = _ctx.nodeItem) == null ? void 0 : _a2.componentName) === "ElsRow" ? "els-col" : "div"), null, {
                    default: withCtx(() => {
                      var _a3, _b2, _c2;
                      return [
                        handleIfExpress(item) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                          item.componentName == "ElsRow" ? (openBlock(), createBlock(_sfc_main, {
                            key: 0,
                            data: item.data,
                            parentNode: currNode.value,
                            "node-item": item,
                            depath: currDepath.value
                          }, null, 8, ["data", "parentNode", "node-item", "depath"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                            ((_a3 = item.config.baseConfig) == null ? void 0 : _a3.componentName) == "ElsCaption" ? (openBlock(), createBlock(_component_els_caption, mergeProps({ key: 0 }, item.config.baseConfig, {
                              title: !item.config.baseConfig.title ? item.keyName : item.config.baseConfig.title
                            }), null, 16, ["title"])) : createCommentVNode("", true),
                            item.componentGroup === "Form" || item.dataTypeName === "Array" || item.dataTypeName == "Object" ? (openBlock(), createBlock(_component_els_form_item, mergeProps({
                              hasFormItem: false,
                              key: item.keyID
                            }, getFormItemAttr(item), {
                              class: item.dataTypeName == "Object" ? "els-dynamic-obj" : "",
                              style: ((_b2 = item.config.baseConfig) == null ? void 0 : _b2.componentName) == "ElsCaption" || item.dataTypeName == "Object" ? "margin-bottom:0 !important" : "",
                              label: ((_c2 = item.config.baseConfig) == null ? void 0 : _c2.componentName) == "ElsCaption" ? "" : item.keyName,
                              prop: `[${index}].value`
                            }), {
                              default: withCtx(() => [
                                item.dataTypeName != "Array" && item.dataTypeName != "Object" && item.componentName !== "ElsRow" ? (openBlock(), createBlock(_sfc_main$2, {
                                  key: item.keyID,
                                  disabled: handleDisabledExpress(item),
                                  "parent-node": _ctx.parentNode,
                                  "curr-node": currNode.value,
                                  item,
                                  modelValue: item.value,
                                  "onUpdate:modelValue": ($event) => item.value = $event,
                                  style: normalizeStyle(item.config.advancedConfig.style),
                                  onValueChange: ($event) => handleValueChange($event, item)
                                }, null, 8, ["disabled", "parent-node", "curr-node", "item", "modelValue", "onUpdate:modelValue", "style", "onValueChange"])) : item.dataTypeName == "Object" ? (openBlock(), createBlock(_sfc_main, {
                                  key: 1,
                                  data: item.data,
                                  parentNode: currNode.value,
                                  "node-item": item,
                                  depath: currDepath.value
                                }, null, 8, ["data", "parentNode", "node-item", "depath"])) : item.dataTypeName == "Array" && item.arrayDataTypeName == "Object" ? (openBlock(), createElementBlock("div", {
                                  key: 2,
                                  class: normalizeClass(["els-dynamic-r-array-container", { "horizontal": item.config.baseConfig.arrangementType === "Horizontal" }])
                                }, [
                                  createVNode(_component_els_list, {
                                    labelWidth: item.config.formConfig.labelWidth,
                                    data: item.data,
                                    onAdd: ($event) => handleAddItem(item),
                                    "item-class-name": "els-dynamic-r-array",
                                    hasForm: false,
                                    style: normalizeStyle(item.config.advancedConfig.style ? item.config.advancedConfig.style : [{ "max-width": item.config.baseConfig.maxWidth ? item.config.baseConfig.maxWidth + "px" : "" }, { "max-height": item.config.baseConfig.maxHeight ? item.config.baseConfig.maxHeight + "px" : "" }, { "display": item.config.baseConfig.arrangementType === "Horizontal" ? "flex" : "" }, { "flex-wrap": "wrap" }])
                                  }, {
                                    default: withCtx(({ $item }) => [
                                      createVNode(_sfc_main, {
                                        "parent-node": currNode.value,
                                        "node-item": item,
                                        data: $item,
                                        class: "test1111111111",
                                        depath: currDepath.value
                                      }, null, 8, ["parent-node", "node-item", "data", "depath"])
                                    ]),
                                    _: 2
                                  }, 1032, ["labelWidth", "data", "onAdd", "style"])
                                ], 2)) : item.dataTypeName == "Array" && item.arrayDataType && item.arrayDataTypeName != "Object" ? (openBlock(), createBlock(_sfc_main$1, {
                                  key: 3,
                                  "parent-node": _ctx.parentNode,
                                  item,
                                  depath: currDepath.value
                                }, null, 8, ["parent-node", "item", "depath"])) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1040, ["class", "style", "label", "prop"])) : createCommentVNode("", true),
                            item.componentGroup === "Desc" && item.componentName == "ElsCaption" ? (openBlock(), createBlock(_component_els_caption, normalizeProps(mergeProps({ key: 2 }, item.config.baseConfig)), null, 16)) : createCommentVNode("", true)
                          ], 64))
                        ], 64)) : createCommentVNode("", true)
                      ];
                    }),
                    _: 2
                  }, 1024);
                }), 256))
              ]),
              _: 1
            }, 8, ["class", "style"]))
          ];
        }),
        _: 1
      }, 8, ["modelValue", "label-width"]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=DynamicRenderInner-9c607011-OC6KFVO7.js.map
