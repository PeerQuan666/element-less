---
title: Cascader级联选择器

order: 11
date: 2023-08-29
category:
  - ElementUI
tag:
  - Form
  - 左侧导航
  - 顶部导航
sticky: true
star: true

---

# Cascader级联选择器

*当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。*


## 基础用法

:::tip
数据扁平式结构<code>mutiple</code>时为多选
:::

:::vuefile-demo

cascader/base

:::

## 读取接口

:::tip 
指定：<code>url</code>读取接口数据
:::

:::vuefile-demo

cascader/api

:::

## 级联面板

:::tip 
使用：<code>els-cascader-panel</code>
:::

:::vuefile-demo

cascader/panel

:::

## Cascader API

### Cascader属性
| 属性名                 | 说明                                           | 类型                        | 默认     |
| ---------------------- | ---------------------------------------------- | --------------------------- | -------- |
| modelValue             | 绑定值                                         | ^[string]                   | -        |
| v-model:select         | 选择的对象                                     | ^[object]                   | -        |
| v-model:select-label   | 选择的文本                                     | ^[string]                   | -        |
| url                    | 数据接口地址                                   | ^[string]                   | -        |
| data                   | 选项数据                                       | ^[object]                   | true     |
| labelField             | 文本字段                                       | ^[string]                   | -        |
| valueField             | 值字段                                         | ^[string]                   | -        |
| parentIdField          | 父ID字段名                                     | ^[string]                   | true     |
| rootParentValue        | 根节点值                                       | ^[string]                   | true     |
| leafField              | 指定选项的叶子节点的标志位字段名               | ^[string]                   | true     |
| childrenField          | 字节点字段名                                   | ^[string]                   | true     |
| disabledField          | 禁用字段名                                     | ^[string]                   | -        |
| valueType              | 值类型                                         | ^[enum]`String,Number,Bool` | -        |
| expandTrigger          | 次级菜单的展开方式                             | ^[string]`click,hover`      | -        |
| checkStrictly          | 是否严格的遵守父子节点不互相关联               | ^[string]                   | 未知选项 |
| multiple               | 是否多选                                       | ^[number]                   | -1       |
| emitPath               | 返回由该节点所在的各级菜单的值                 | ^[boolean]                  | -        |
| lazy                   | 是否动态加载子节点，需与 lazyLoad 方法结合使用 | ^[boolean]                  | -        |
| lazyLoad               | 加载动态数据的方法，仅在 lazy 为 true 时有效   | ^[Function]                 | -        |
| resetValueByChangeData | 数据改变重置值                                 | ^[boolean]                  | true     |
| pathSeparator          | 路径分隔符                                     | ^[string]                   | $        |
| isInitTriggerSelect    | 初始化触发选择项                               | ^[boolean]                  | true     |
| valueSeparator         | 多选分隔符                                     | ^[string]                   | ,        |


