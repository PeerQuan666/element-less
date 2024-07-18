---
title: Dropdown下拉菜单
order: 19
date: 2023-08-24
category:
  - ElementUI
tag:
  - Form
  - 单选
sticky: true
star: true
---

# Dropdown下拉菜单

*将动作或菜单折叠到下拉菜单中。*

<!-- more -->

## 基础用法

:::vuefile-demo

dropdown/base

:::

## 固定标题

:::tip
设置<code>title</code>
:::

:::vuefile-demo

dropdown/title

:::

## 读取接口

:::vuefile-demo

dropdown/api

:::

## List API

### List属性

| 属性名        | 说明       | 类型      | 默认 |
| ------------- | ---------- | --------- | ---- |
| title         | 标题       | ^[string] | -    |
| data          | 数据       | ^[array]  | -    |
| url           | 数据接口   | ^[string] | -    |
| labelField    | 文本字段名 | ^[string] | -    |
| valueField    | 值字段名   | ^[string] | -    |
| disabledField | 禁用字段名 | ^[string] | -    |
| iconField     | 图标字段名 | ^[string] | -    |
| maxHeight     | 菜单最大高度 | ^[string] | -    |
### 事件

| 名称    | 说明                     | 回调参数 |
| ------- | ------------------------ | -------- |
| command | 点击菜单项触发的事件回调 | 选项值   |