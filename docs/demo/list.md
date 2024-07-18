---
title: List遍历组件
order: 18
date: 2023-08-24
category:
  - ElementUI
tag:
  - Form
  - 自动补全
sticky: true
star: true
---

# List遍历组件

*根据数组提供新增、删除、排序的功能*

<!-- more -->

## 基础用法

:::tip
组件内置form表单，一行一个表单，可简化验证属性。
:::

:::vuefile-demo

list/base

:::

## 字符串数组

:::tip
 当为字符串数组时,设置当前数组索引<code>aIndex</code>，并从插槽中获取当前选项<code>element</code>,<code>v-model</code>等于<code>element.value</code>
:::

:::vuefile-demo

list/string

:::

## 无主键表单

:::tip
 当未设置主键<code>itemKey</code>时,需要设置当前数组索引<code>aIndex</code>
:::

:::vuefile-demo

list/nokey

:::

## 边框

:::tip
 设置<code>borderType=borderType1</code>
:::

:::vuefile-demo

list/border

:::


## 折叠面板

:::tip
 设置<code>itemComponent=collapse</code>
:::

:::vuefile-demo

list/collapse

:::


## List API

### List属性

| 属性名          | 说明                 | 类型       | 默认 |
| --------------- | -------------------- | ---------- | ---- |
| v-model         | 数据                 | ^[array]   | -    |
| sortable        | 是否可排序           | ^[boolean] | true    |
| isRemove        | 是否可删除           | ^[boolean] | true    |
| isAdd           | 是否可新增           | ^[boolean] | true    |
| isModify        | 是否可编辑排序       | ^[boolean] | true    |
| isConfirmRemove | 是否显示删除确认框   | ^[boolean] | true    |
| itemClassName   | 行类名               | ^[string]  | -    |
| hasForm         | 是否添加Form表单     | ^[boolean] | true    |
| itemKey         | 主键ID               | ^[string]  | -    |
| labelWidth      | 表单FormItem文本宽度 | ^[string]  | -    |
### 事件

| 名称 | 说明     | 回调参数                |
| ---- | -------- | ----------------------- |
| add  | 新增事件 | `(data) => {return item}` |
