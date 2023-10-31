import { defineComponent, inject, ref, computed, watch, resolveComponent, openBlock, createBlock, unref, isRef, normalizeClass, withCtx, createElementBlock, createElementVNode, createCommentVNode, createVNode, createSlots, toDisplayString, Fragment, createTextVNode, nextTick } from "vue";
import { l as lessCom, p as property_arrayAndObject, a as property_array, b as property_form, c as property_advanced, d as _sfc_main$1 } from "./index-8124f90e.js";
import { useVModel } from "@vueuse/core";
import { ElMessage } from "element-plus";
import "axios";
import "file-saver";
import "xlsx";
import "lodash";
import "vuedraggable";
import "sortablejs";
import "md-editor-v3";
import "pinia";
import "ace-builds";
import "vue-json-viewer";
const _hoisted_1 = {
  key: 0,
  class: "els-dynamic-d-item-div"
};
const _hoisted_2 = { class: "keyName" };
const _hoisted_3 = { class: "keyCode" };
const _hoisted_4 = { class: "dataType" };
const _hoisted_5 = { class: "dataType-detail-t" };
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { key: 1 };
const _hoisted_8 = ["title"];
const _hoisted_9 = ["title"];
const _hoisted_10 = { class: "dataType-detail-t" };
const _hoisted_11 = { key: 0 };
const _hoisted_12 = { key: 1 };
const _hoisted_13 = ["title"];
const _hoisted_14 = ["title"];
const _hoisted_15 = { class: "componentType" };
const _hoisted_16 = { class: "config" };
const _hoisted_17 = { class: "required" };
const _hoisted_18 = { class: "description" };
const _hoisted_19 = { class: "defaultValue" };
const _hoisted_20 = { class: "oper" };
const _hoisted_21 = { class: "els-dynamic-d-oper" };
const _sfc_main = /* @__PURE__ */ defineComponent({
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
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const camelCase = inject("camelCase", false);
    const allowCreateType = inject("allowCreateType", false);
    const allowCreateComponent = inject("allowCreateComponent", false);
    const openCreateType = inject("openCreateType", () => null);
    const openCreateComponent = inject("openCreateComponent", () => null);
    const componentSettingVisible = inject("componentSettingVisible", true);
    const props = __props;
    const dataTypeData = inject("dataTypeData", null);
    const controlData = inject("componentData", null);
    const currDepath = ref(props.depath + 1);
    const currData = useVModel(props, "data", emits);
    const currItem = useVModel(props, "item", emits);
    const selectDataTypeItem = ref();
    const selectArrayDataTypeItem = ref();
    function handleRemove(item) {
      var index = currData.value.indexOf(item);
      currData.value.splice(index, 1);
    }
    function handleChangeKeyCode() {
      if (camelCase && currItem.value.keyCode) {
        const keyCode = currItem.value.keyCode;
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
    const currArrayDataType = computed(() => {
      if (dataTypeData) {
        const currVal = dataTypeData.find((ele) => ele.value == currItem.value.arrayDataType);
        return currVal ?? {};
      }
      return {};
    });
    const currDataType = computed(() => {
      if (dataTypeData) {
        if (itemDataType && itemDataType.value.type == "Array") {
          return currArrayDataType.value;
        }
        return itemDataType.value;
      }
      return {};
    });
    const currComponentType = computed(() => {
      if (controlData) {
        const currVal = controlData.find((ele) => ele.value == currItem.value.componentType);
        return currVal ?? {};
      }
      return {};
    });
    const currComponentTypeData = computed(() => {
      if (controlData) {
        return controlData.filter((ele) => {
          var _a, _b;
          return !currDataType.value || ele.dataTypes.includes((_a = currDataType.value) == null ? void 0 : _a.value) || ele.dataTypes.includes((_b = currDataType.value) == null ? void 0 : _b.type);
        });
      }
      return [];
    });
    const isObject = computed(() => {
      return itemDataType.value.type == "Object" || currArrayDataType.value.type == "Object";
    });
    const isRow = computed(() => {
      return currComponentType.value.type == "Row";
    });
    const currPropertys = computed(() => {
      if (currItem.value.dataType !== void 0) {
        if (!currItem.value.componentType) {
          const currVal = dataTypeData.find((ele) => ele.value == currItem.value.dataType);
          const arrayVal = dataTypeData.find((ele) => ele.value == currItem.value.arrayDataType);
          if ((currVal == null ? void 0 : currVal.type) == "Array" && (arrayVal == null ? void 0 : arrayVal.type) === "Object" || (currVal == null ? void 0 : currVal.type) == "Object") {
            return lessCom.cloneObj(property_arrayAndObject);
          }
        } else {
          if (controlData) {
            const currControlData = controlData.find((ele) => ele.value == currItem.value.componentType);
            if (currControlData) {
              return currControlData.propertys;
            }
          }
        }
      } else {
        if (!currItem.value.componentType) {
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
    watch(() => currItem.value.componentType, () => {
      if (isRow.value) {
        currItem.value.data.length = 0;
        currItem.value.dataType = 0;
        currItem.value.data.push(
          {
            keyID: lessCom.generateID(),
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
      if (currItem.value.arrayDataType) {
        currItem.value.arrayDataType = void 0;
      }
      currItem.value.componentType = void 0;
      nextTick(() => {
        if (currComponentTypeData.value.length) {
          if (isObject.value) {
            currItem.value.componentType = "";
          } else if (currDataType.value && currDataType.value.type !== "Array") {
            currItem.value.componentType = currComponentTypeData.value[0].value;
          } else if (currItem.value.arrayDataType) {
            currItem.value.componentType = currComponentTypeData.value[0].value;
          }
        }
      });
      if (isObject.value) {
        currItem.value.data.length = 0;
        currItem.value.data.push({
          keyID: lessCom.generateID(),
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
    watch(dataTypeData, (val) => {
      if (currItem.value.dataType) {
        selectDataTypeItem.value = val.find((ele) => ele.value === currItem.value.dataType);
      }
      if (currItem.value.arrayDataType) {
        selectArrayDataTypeItem.value = val.find((ele) => ele.value === currItem.value.arrayDataType);
      }
    });
    function validationCode(rule, value, callback) {
      console.log(rule);
      if (value === "") {
        callback(new Error("keyCode不能为空"));
      } else if (props.data.filter((ele) => ele.keyCode == value).length > 1) {
        ElMessage.warning(`[${value}]重复`);
        callback(new Error("keyCode重复"));
      } else {
        callback();
      }
    }
    return (_ctx, _cache) => {
      const _component_els_input = resolveComponent("els-input");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_table = resolveComponent("el-table");
      const _component_els_select = resolveComponent("els-select");
      const _component_el_popover = resolveComponent("el-popover");
      const _component_ElsDynamicRender = resolveComponent("ElsDynamicRender");
      const _component_el_tab_pane = resolveComponent("el-tab-pane");
      const _component_el_tabs = resolveComponent("el-tabs");
      const _component_els_form = resolveComponent("els-form");
      const _component_el_link = resolveComponent("el-link");
      const _component_els_switch = resolveComponent("els-switch");
      const _component_Rank = resolveComponent("Rank");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_Remove = resolveComponent("Remove");
      const _component_el_popconfirm = resolveComponent("el-popconfirm");
      return openBlock(), createBlock(_component_els_form, {
        modelValue: unref(currItem),
        "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => isRef(currItem) ? currItem.value = $event : null),
        labelWidth: "0",
        inputWidth: "100%",
        class: normalizeClass([{ "els-dynamic-d-item-parentdiv": isObject.value && !unref(currItem).componentType }, { "els-dynamic-d-item-container": isRow.value }]),
        "show-message": false
      }, {
        default: withCtx(() => [
          !isRow.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
            createElementVNode("span", _hoisted_2, [
              itemDataType.value.type != "None" ? (openBlock(), createBlock(_component_els_input, {
                key: 0,
                clearable: "",
                placeholder: "请输入名称",
                prop: "keyName"
              })) : createCommentVNode("", true)
            ]),
            createElementVNode("span", _hoisted_3, [
              itemDataType.value.type != "None" ? (openBlock(), createBlock(_component_els_input, {
                key: 0,
                placeholder: "编码",
                validMethod: validationCode,
                required: "",
                clearable: "",
                disabled: unref(currItem).isModify,
                onBlur: handleChangeKeyCode,
                prop: "keyCode"
              }, null, 8, ["disabled"])) : createCommentVNode("", true)
            ]),
            createElementVNode("span", _hoisted_4, [
              selectDataTypeItem.value && selectDataTypeItem.value.id ? (openBlock(), createBlock(_component_el_popover, {
                key: 0,
                width: "400",
                placement: "right"
              }, {
                reference: withCtx(() => [
                  createVNode(_component_els_select, {
                    onClickOption: handleChangeDataType,
                    class: "txt-blue-light",
                    filterable: "",
                    select: selectDataTypeItem.value,
                    "onUpdate:select": _cache[2] || (_cache[2] = ($event) => selectDataTypeItem.value = $event),
                    required: "",
                    initSelect: false,
                    data: unref(dataTypeData),
                    valueField: "value",
                    labelField: "label",
                    placeholder: "值类型",
                    prop: "dataType"
                  }, createSlots({
                    default: withCtx(({ item }) => [
                      createElementVNode("span", {
                        title: item.description
                      }, toDisplayString(item.label), 9, _hoisted_8)
                    ]),
                    _: 2
                  }, [
                    unref(allowCreateType) ? {
                      name: "extra",
                      fn: withCtx(() => [
                        createElementVNode("li", {
                          class: "dynamic-create-dtype",
                          onClick: _cache[1] || (_cache[1] = ($event) => unref(openCreateType)())
                        }, "创建类型")
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["select", "data"])
                ]),
                default: withCtx(() => [
                  createElementVNode("div", null, [
                    createElementVNode("div", _hoisted_5, [
                      createElementVNode("span", null, toDisplayString(selectDataTypeItem.value.type === "Enum" ? "Enum" : "Object"), 1),
                      createElementVNode("span", {
                        onClick: _cache[0] || (_cache[0] = ($event) => unref(openCreateType)(selectDataTypeItem.value.id))
                      }, "查看详细")
                    ]),
                    selectDataTypeItem.value.type === "Enum" ? (openBlock(), createElementBlock("div", _hoisted_6, [
                      createVNode(_component_el_table, {
                        data: selectDataTypeItem.value.componentType.defaultPropertys.data
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_table_column, {
                            prop: "label",
                            label: "label"
                          }),
                          createVNode(_component_el_table_column, {
                            prop: "value",
                            label: "value"
                          })
                        ]),
                        _: 1
                      }, 8, ["data"])
                    ])) : (openBlock(), createElementBlock("div", _hoisted_7, [
                      createVNode(_component_el_table, {
                        data: selectDataTypeItem.value.componentType.defaultPropertys.config
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_table_column, {
                            prop: "keyName",
                            label: "keyName"
                          }),
                          createVNode(_component_el_table_column, {
                            prop: "keyCode",
                            label: "keyCode"
                          }),
                          createVNode(_component_el_table_column, {
                            prop: "dataType",
                            label: "类型"
                          })
                        ]),
                        _: 1
                      }, 8, ["data"])
                    ]))
                  ])
                ]),
                _: 1
              })) : (openBlock(), createBlock(_component_els_select, {
                key: 1,
                onClickOption: handleChangeDataType,
                filterable: "",
                select: selectDataTypeItem.value,
                "onUpdate:select": _cache[4] || (_cache[4] = ($event) => selectDataTypeItem.value = $event),
                required: "",
                initSelect: false,
                data: unref(dataTypeData),
                valueField: "value",
                labelField: "label",
                placeholder: "值类型",
                prop: "dataType"
              }, createSlots({
                default: withCtx(({ item }) => [
                  createElementVNode("span", {
                    title: item.description
                  }, toDisplayString(item.label), 9, _hoisted_9)
                ]),
                _: 2
              }, [
                unref(allowCreateType) ? {
                  name: "extra",
                  fn: withCtx(() => [
                    createElementVNode("li", {
                      class: "dynamic-create-dtype",
                      onClick: _cache[3] || (_cache[3] = ($event) => unref(openCreateType)())
                    }, "创建类型")
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["select", "data"])),
              itemDataType.value.type == "Array" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                selectArrayDataTypeItem.value && selectArrayDataTypeItem.value.id ? (openBlock(), createBlock(_component_el_popover, {
                  key: 0,
                  placement: "right",
                  width: "400"
                }, {
                  reference: withCtx(() => [
                    createVNode(_component_els_select, {
                      onClickOption: handleChangeDataType,
                      filterable: "",
                      class: "txt-blue-light",
                      select: selectArrayDataTypeItem.value,
                      "onUpdate:select": _cache[7] || (_cache[7] = ($event) => selectArrayDataTypeItem.value = $event),
                      required: "",
                      data: unref(dataTypeData).filter((ele) => ele.type != "None" && ele.type != "Array"),
                      valueField: "value",
                      labelField: "label",
                      prop: "arrayDataType"
                    }, createSlots({
                      default: withCtx(({ item }) => [
                        createElementVNode("span", {
                          title: item.description
                        }, toDisplayString(item.type), 9, _hoisted_13)
                      ]),
                      _: 2
                    }, [
                      unref(allowCreateType) ? {
                        name: "extra",
                        fn: withCtx(() => [
                          createElementVNode("li", {
                            class: "dynamic-create-dtype",
                            onClick: _cache[6] || (_cache[6] = ($event) => unref(openCreateType)())
                          }, "创建类型")
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1032, ["select", "data"])
                  ]),
                  default: withCtx(() => [
                    createElementVNode("div", null, [
                      createElementVNode("div", _hoisted_10, [
                        createElementVNode("span", null, toDisplayString(selectArrayDataTypeItem.value.type === "Enum" ? "Enum" : "Object"), 1),
                        createElementVNode("span", {
                          onClick: _cache[5] || (_cache[5] = ($event) => unref(openCreateType)(selectArrayDataTypeItem.value.id))
                        }, "查看详细")
                      ]),
                      selectArrayDataTypeItem.value.type === "Enum" ? (openBlock(), createElementBlock("div", _hoisted_11, [
                        createVNode(_component_el_table, {
                          data: selectArrayDataTypeItem.value.componentType.defaultPropertys.data
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_table_column, {
                              prop: "label",
                              label: "label"
                            }),
                            createVNode(_component_el_table_column, {
                              prop: "value",
                              label: "value"
                            })
                          ]),
                          _: 1
                        }, 8, ["data"])
                      ])) : (openBlock(), createElementBlock("div", _hoisted_12, [
                        createVNode(_component_el_table, {
                          data: selectArrayDataTypeItem.value.componentType.defaultPropertys.config
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_table_column, {
                              prop: "keyName",
                              label: "keyName"
                            }),
                            createVNode(_component_el_table_column, {
                              prop: "keyCode",
                              label: "keyCode"
                            }),
                            createVNode(_component_el_table_column, {
                              prop: "dataType",
                              label: "类型"
                            })
                          ]),
                          _: 1
                        }, 8, ["data"])
                      ]))
                    ])
                  ]),
                  _: 1
                })) : (openBlock(), createBlock(_component_els_select, {
                  key: 1,
                  onClickOption: handleChangeDataType,
                  filterable: "",
                  select: selectArrayDataTypeItem.value,
                  "onUpdate:select": _cache[9] || (_cache[9] = ($event) => selectArrayDataTypeItem.value = $event),
                  required: "",
                  data: unref(dataTypeData).filter((ele) => ele.type != "None" && ele.type != "Array"),
                  valueField: "value",
                  labelField: "label",
                  prop: "arrayDataType"
                }, createSlots({
                  default: withCtx(({ item }) => [
                    createElementVNode("span", {
                      title: item.description
                    }, toDisplayString(item.type), 9, _hoisted_14)
                  ]),
                  _: 2
                }, [
                  unref(allowCreateType) ? {
                    name: "extra",
                    fn: withCtx(() => [
                      createElementVNode("li", {
                        class: "dynamic-create-dtype",
                        onClick: _cache[8] || (_cache[8] = ($event) => unref(openCreateType)())
                      }, "创建类型")
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["select", "data"]))
              ], 64)) : createCommentVNode("", true)
            ]),
            unref(componentSettingVisible) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createElementVNode("span", _hoisted_15, [
                itemDataType.value.type != "Object" && currArrayDataType.value.type != "Object" || isObject.value && currComponentTypeData.value.length ? (openBlock(), createBlock(_component_els_select, {
                  key: 0,
                  filterable: "",
                  disabled: unref(currItem).dataType === void 0,
                  placeholder: "组件",
                  clearable: "",
                  prop: "componentType",
                  data: currComponentTypeData.value,
                  valueField: "value",
                  labelField: "label"
                }, createSlots({ _: 2 }, [
                  unref(allowCreateComponent) ? {
                    name: "extra",
                    fn: withCtx(() => [
                      createElementVNode("li", {
                        class: "dynamic-create-dtype",
                        onClick: _cache[10] || (_cache[10] = ($event) => unref(openCreateComponent)())
                      }, "创建组件")
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["disabled", "data"])) : createCommentVNode("", true)
              ]),
              createElementVNode("span", _hoisted_16, [
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
                                    "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => unref(currItem).config.baseConfig = $event),
                                    nodeType: { dataType: (_a = currDataType.value) == null ? void 0 : _a.type, componentName: (_b = currComponentType.value) == null ? void 0 : _b.componentName },
                                    config: currPropertys.value,
                                    inputWidth: "100%"
                                  }, null, 8, ["modelValue", "nodeType", "config"])
                                ];
                              }),
                              _: 1
                            }),
                            itemDataType.value.type == "Array" ? (openBlock(), createBlock(_component_el_tab_pane, {
                              key: 0,
                              label: "数组属性"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_ElsDynamicRender, {
                                  modelValue: unref(currItem).config.arrayConfig,
                                  "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => unref(currItem).config.arrayConfig = $event),
                                  config: unref(property_array),
                                  inputWidth: "100%"
                                }, null, 8, ["modelValue", "config"])
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            itemDataType.value.type != "None" ? (openBlock(), createBlock(_component_el_tab_pane, {
                              key: 1,
                              label: "表单属性"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_ElsDynamicRender, {
                                  modelValue: unref(currItem).config.formConfig,
                                  "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => unref(currItem).config.formConfig = $event),
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
                                  "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => unref(currItem).config.advancedConfig = $event),
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
              ])
            ], 64)) : createCommentVNode("", true),
            createElementVNode("span", _hoisted_17, [
              itemDataType.value.type !== "None" ? (openBlock(), createBlock(_component_els_switch, {
                key: 0,
                "active-value": true,
                "inactive-value": false,
                prop: "required"
              })) : createCommentVNode("", true)
            ]),
            createElementVNode("span", _hoisted_18, [
              itemDataType.value.type !== "None" ? (openBlock(), createBlock(_component_els_input, {
                key: 0,
                placeholder: "描述",
                clearable: "",
                prop: "description"
              })) : createCommentVNode("", true)
            ]),
            createElementVNode("span", _hoisted_19, [
              !isObject.value && itemDataType.value.type !== "None" ? (openBlock(), createBlock(_component_els_input, {
                key: 0,
                placeholder: "默认值",
                clearable: "",
                prop: "defaultValue"
              })) : createCommentVNode("", true)
            ]),
            createElementVNode("span", _hoisted_20, [
              createElementVNode("span", _hoisted_21, [
                createVNode(_component_el_icon, { class: "el-icon-rank" }, {
                  default: withCtx(() => [
                    createVNode(_component_Rank)
                  ]),
                  _: 1
                }),
                createVNode(_component_el_popconfirm, {
                  title: "确定删除吗？",
                  onConfirm: _cache[15] || (_cache[15] = ($event) => handleRemove(_ctx.item))
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
          isObject.value && !unref(currItem).componentType || isRow.value ? (openBlock(), createBlock(_sfc_main$1, {
            key: 1,
            data: unref(currItem).data,
            onRemoveItem: _cache[16] || (_cache[16] = ($event) => handleRemove(_ctx.item)),
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
const DynamicDesignerInnerItem_vue_vue_type_style_index_0_lang = "";
export {
  _sfc_main as default
};
