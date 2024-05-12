import {
  _sfc_main$c,
  lessCom$1,
  property_advanced,
  property_array,
  property_arrayAndObject,
  property_form
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
  computed2 as computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  defineComponent,
  init_vue_runtime_esm_bundler,
  inject,
  isRef,
  normalizeClass,
  openBlock,
  ref,
  resolveComponent,
  unref,
  watch,
  withCtx
} from "./chunk-Y3E3Y6KD.js";
import {
  __toESM
} from "./chunk-TIUEEL27.js";

// node_modules/element-less/DynamicDesignerInnerItem-5e363b74.js
init_vue_runtime_esm_bundler();
var import_file_saver = __toESM(require_FileSaver_min());
var import_lodash = __toESM(require_lodash());
var import_vuedraggable = __toESM(require_vuedraggable_umd());
var import_ace_builds = __toESM(require_ace());
var import_vue_json_viewer = __toESM(require_vue_json_viewer());
var _hoisted_1 = {
  key: 0,
  class: "els-dynamic-d-item-div"
};
var _hoisted_2 = { class: "keyName" };
var _hoisted_3 = { class: "keyCode" };
var _hoisted_4 = { class: "dataType" };
var _hoisted_5 = { class: "controlType" };
var _hoisted_6 = { class: "config" };
var _hoisted_7 = { class: "defaultValue" };
var _hoisted_8 = { class: "oper" };
var _hoisted_9 = { class: "els-dynamic-d-oper" };
var _sfc_main = defineComponent({
  ...{
    name: "ElsDynamicDesigner"
  },
  __name: "DynamicDesignerInnerItem",
  props: {
    depath: {},
    data: {},
    item: {}
  },
  emits: ["update:item", "update:data"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const camelCase = inject("camelCase", false);
    const dataTypeData = inject("dataTypeData", null);
    const controlData = inject("controlData", null);
    const arrayObjectType = inject("arrayObjectType", []);
    const currDepath = ref(props.depath + 1);
    const currData = useVModel(props, "data", emits);
    const currItem = useVModel(props, "item", emits);
    function handleRemove(item) {
      var index = currData.value.indexOf(item);
      currData.value.splice(index, 1);
    }
    function handleChangeKeyCode(keyCode) {
      if (camelCase) {
        currItem.value.keyCode = keyCode.replace(keyCode[0], keyCode[0].toLowerCase());
      }
    }
    const itemDataType = computed(() => {
      if (dataTypeData) {
        const currVal = dataTypeData.find((ele) => ele.value == currItem.value.dataType);
        return currVal ?? {};
      }
      return {};
    });
    const arrayDataType = computed(() => {
      if (dataTypeData) {
        const currVal = dataTypeData.find((ele) => ele.value == currItem.value.arrayDataType);
        return currVal ?? {};
      }
      return {};
    });
    const currDataType = computed(() => {
      if (dataTypeData) {
        if (itemDataType && itemDataType.value.label == "Array") {
          return arrayDataType.value;
        }
        return itemDataType.value;
      }
      return {};
    });
    const currControlType = computed(() => {
      if (controlData) {
        const currVal = controlData.find((ele) => ele.value == currItem.value.controlType);
        return currVal ?? {};
      }
      return {};
    });
    const currControlTypeData = computed(() => {
      if (controlData) {
        return controlData.filter((ele) => {
          var _a;
          return !currDataType.value || ele.dataTypes.includes((_a = currDataType.value) == null ? void 0 : _a.label);
        });
      }
      return [];
    });
    const isObject = computed(() => {
      return itemDataType.value.label == "Object" || arrayDataType.value.label == "Object";
    });
    const isRow = computed(() => {
      return currControlType.value.label == "栅格";
    });
    const currPropertys = computed(() => {
      if (currItem.value.dataType !== void 0) {
        if (!currItem.value.controlType) {
          const currVal = dataTypeData.find((ele) => ele.value == currItem.value.dataType);
          const arrayVal = dataTypeData.find((ele) => ele.value == currItem.value.arrayDataType);
          if ((currVal == null ? void 0 : currVal.label) == "Array" && (arrayVal == null ? void 0 : arrayVal.label) === "Object" || (currVal == null ? void 0 : currVal.label) == "Object") {
            return lessCom$1.cloneObj(property_arrayAndObject);
          }
        } else {
          if (controlData) {
            const currControlData = controlData.find((ele) => ele.value == currItem.value.controlType);
            if (currControlData) {
              return currControlData.propertys;
            }
          }
        }
      } else {
        if (!currItem.value.controlType) {
          currItem.value.config = {
            formConfig: {},
            baseConfig: {},
            advancedConfig: {},
            arrayConfig: {}
          };
        }
        return null;
      }
    });
    watch(() => currItem.value.controlType, () => {
      if (isRow.value) {
        currItem.value.data.length = 0;
        currItem.value.dataType = 0;
        currItem.value.data.push(
          {
            keyID: lessCom$1.Guid32(),
            keyName: "",
            keyCode: "",
            data: [],
            config: {
              formConfig: {},
              baseConfig: {},
              advancedConfig: {},
              arrayConfig: {}
            }
          }
        );
      } else {
        currItem.value.data.length = 0;
      }
    });
    function handleChangeDataType() {
      currItem.value.controlType = void 0;
      if (isObject.value) {
        currItem.value.data.length = 0;
        currItem.value.data.push({
          keyID: lessCom$1.Guid32(),
          keyName: "",
          keyCode: "",
          data: [],
          config: {
            formConfig: {},
            baseConfig: {},
            advancedConfig: {},
            arrayConfig: {}
          }
        });
      } else {
        currItem.value.data.length = 0;
      }
    }
    return (_ctx, _cache) => {
      const _component_els_input = resolveComponent("els-input");
      const _component_els_select = resolveComponent("els-select");
      const _component_ElsDynamicRender = resolveComponent("ElsDynamicRender");
      const _component_el_tab_pane = resolveComponent("el-tab-pane");
      const _component_el_tabs = resolveComponent("el-tabs");
      const _component_els_form = resolveComponent("els-form");
      const _component_el_link = resolveComponent("el-link");
      const _component_el_popover = resolveComponent("el-popover");
      const _component_Rank = resolveComponent("Rank");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_Remove = resolveComponent("Remove");
      const _component_el_popconfirm = resolveComponent("el-popconfirm");
      return openBlock(), createBlock(_component_els_form, {
        modelValue: unref(currItem),
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => isRef(currItem) ? currItem.value = $event : null),
        labelWidth: "0",
        inputWidth: "100%",
        class: normalizeClass([{ "els-dynamic-d-item-parentdiv": isObject.value }, { "els-dynamic-d-item-container": isRow.value }]),
        "show-message": false
      }, {
        default: withCtx(() => [
          !isRow.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
            createBaseVNode("span", _hoisted_2, [
              itemDataType.value.label != "无" ? (openBlock(), createBlock(_component_els_input, {
                key: 0,
                clearable: "",
                placeholder: "请输入名称",
                prop: "keyName"
              })) : createCommentVNode("", true)
            ]),
            createBaseVNode("span", _hoisted_3, [
              itemDataType.value.label != "无" ? (openBlock(), createBlock(_component_els_input, {
                key: 0,
                placeholder: "编码",
                required: "",
                clearable: "",
                disabled: unref(currItem).isModify,
                onInput: handleChangeKeyCode,
                prop: "keyCode"
              }, null, 8, ["disabled"])) : createCommentVNode("", true)
            ]),
            createBaseVNode("span", _hoisted_4, [
              createVNode(_component_els_select, {
                onClickOption: handleChangeDataType,
                initSelect: false,
                data: unref(dataTypeData),
                valueField: "value",
                labelField: "label",
                placeholder: "值类型",
                prop: "dataType"
              }, null, 8, ["data"]),
              itemDataType.value.label == "Array" ? (openBlock(), createBlock(_component_els_select, {
                key: 0,
                onClickOption: handleChangeDataType,
                data: unref(arrayObjectType),
                valueField: "value",
                labelField: "label",
                prop: "arrayDataType"
              }, null, 8, ["data"])) : createCommentVNode("", true)
            ]),
            createBaseVNode("span", _hoisted_5, [
              itemDataType.value.label != "Object" && arrayDataType.value.label != "Object" ? (openBlock(), createBlock(_component_els_select, {
                key: 0,
                filterable: "",
                required: "",
                disabled: unref(currItem).dataType === void 0,
                placeholder: "控件",
                prop: "controlType",
                data: currControlTypeData.value,
                valueField: "value",
                labelField: "label"
              }, null, 8, ["disabled", "data"])) : createCommentVNode("", true)
            ]),
            createBaseVNode("span", _hoisted_6, [
              createVNode(_component_el_popover, {
                placement: "right-start",
                trigger: "click",
                width: "600"
              }, {
                reference: withCtx(() => [
                  createVNode(_component_el_link, { type: "primary" }, {
                    default: withCtx(() => [
                      createTextVNode("配置")
                    ]),
                    _: 1
                  })
                ]),
                default: withCtx(() => [
                  createVNode(_component_els_form, { labelWidth: "120" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_tabs, null, {
                        default: withCtx(() => [
                          createVNode(_component_el_tab_pane, { label: "组件属性" }, {
                            default: withCtx(() => {
                              var _a, _b;
                              return [
                                createVNode(_component_ElsDynamicRender, {
                                  modelValue: unref(currItem).config.baseConfig,
                                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(currItem).config.baseConfig = $event),
                                  nodeType: { dataType: (_a = currDataType.value) == null ? void 0 : _a.label, componentName: (_b = currControlType.value) == null ? void 0 : _b.componentName },
                                  config: currPropertys.value,
                                  inputWidth: "100%"
                                }, null, 8, ["modelValue", "nodeType", "config"])
                              ];
                            }),
                            _: 1
                          }),
                          itemDataType.value.label == "Array" ? (openBlock(), createBlock(_component_el_tab_pane, {
                            key: 0,
                            label: "数组属性"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_ElsDynamicRender, {
                                modelValue: unref(currItem).config.arrayConfig,
                                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(currItem).config.arrayConfig = $event),
                                config: unref(property_array),
                                inputWidth: "100%"
                              }, null, 8, ["modelValue", "config"])
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          itemDataType.value.label != "无" ? (openBlock(), createBlock(_component_el_tab_pane, {
                            key: 1,
                            label: "表单属性"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_ElsDynamicRender, {
                                modelValue: unref(currItem).config.formConfig,
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(currItem).config.formConfig = $event),
                                config: unref(property_form),
                                inputWidth: "100%"
                              }, null, 8, ["modelValue", "config"])
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(_component_el_tab_pane, { label: "高级属性" }, {
                            default: withCtx(() => [
                              createVNode(_component_ElsDynamicRender, {
                                modelValue: unref(currItem).config.advancedConfig,
                                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(currItem).config.advancedConfig = $event),
                                config: unref(property_advanced),
                                inputWidth: "100%"
                              }, null, 8, ["modelValue", "config"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            createBaseVNode("span", _hoisted_7, [
              !isObject.value && itemDataType.value.label !== "无" ? (openBlock(), createBlock(_component_els_input, {
                key: 0,
                placeholder: "默认值",
                clearable: "",
                modelValue: unref(currItem).defaultValue,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(currItem).defaultValue = $event)
              }, null, 8, ["modelValue"])) : createCommentVNode("", true)
            ]),
            createBaseVNode("span", _hoisted_8, [
              createBaseVNode("span", _hoisted_9, [
                createVNode(_component_el_icon, { class: "el-icon-rank" }, {
                  default: withCtx(() => [
                    createVNode(_component_Rank)
                  ]),
                  _: 1
                }),
                createVNode(_component_el_popconfirm, {
                  title: "确定删除吗？",
                  onConfirm: _cache[5] || (_cache[5] = ($event) => handleRemove(_ctx.item))
                }, {
                  reference: withCtx(() => [
                    createVNode(_component_el_icon, { class: "el-icon-remove" }, {
                      default: withCtx(() => [
                        createVNode(_component_Remove)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ])
          ])) : createCommentVNode("", true),
          isObject.value || isRow.value ? (openBlock(), createBlock(_sfc_main$c, {
            key: 1,
            data: unref(currItem).data,
            onRemoveItem: _cache[6] || (_cache[6] = ($event) => handleRemove(_ctx.item)),
            config: unref(currItem).config.advancedConfig,
            "is-container": isRow.value,
            depath: currDepath.value
          }, null, 8, ["data", "config", "is-container", "depath"])) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["modelValue", "class"]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=DynamicDesignerInnerItem-5e363b74-ARYLLHGX.js.map
