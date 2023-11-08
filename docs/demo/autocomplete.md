---
title: Autocomplete
order: 10
date: 2023-08-24
category:
  - ElementUI
tag:
  - Form
  - 自动补全
sticky: true
star: true
---
# Autocomplete

*根据输入内容提供对应的输入建议。*

<!-- more -->

## 基础用法

:::tip
设置<code>data</code>、<code>value-field</code>
:::

:::vuefile-demo

autocomplete/base

:::

## 接口数据

:::tip
设置<code>url</code>、<code>value-field</code>
:::

:::vuefile-demo

autocomplete/api

:::

## Select API

### Select属性
| 属性名           | 说明               | 类型                                                             | 默认 |
| ---------------- | ------------------ | ---------------------------------------------------------------- | ---- |
| modelValue       | 绑定值             | ^[string]                                                        | -    |
| url              | 数据接口地址       | ^[string]                                                        | -    |
| valueField       | 值字段             | ^[string]                                                        | -    |
| data             | 选项数据           | ^[object]                                                        | -    |
| fetchSuggestions | 获取输入建议的方法 | ^[Function]`(queryString: string, callback: callbackfn) => void` | -    |
| remote           | 是否远程搜索       | ^[boolean]                                                       | -    |
| width            | 宽度               | ^[string]                                                        | true |
