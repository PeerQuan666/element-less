---
title: TimePicker时间选择器
order: 14
date: 2023-08-24
category:
  - ElementUI
tag:
  - TimePicker
sticky: true
star: true
---

# TimePicker时间选择器

*用于选择或输入时间*

<!-- more -->

:::tip
返回时间格式不再是Date 默认为HH:mm:ss
:::

## 基础用法

:::vuefile-demo

time-picker/base

:::

## 范围选择

:::vuefile-demo

time-picker/range

:::

## 范围选择双控件

::: tip
设置<code>:single="false"</code>

:::
:::vuefile-demo

time-picker/splitRange

:::

## TimePicker API

### TimePicker属性
| 属性名        | 说明                           | 类型                                                                            | 默认 |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------- | ---- |
| v-model       | 绑定值                         | ^[string]                                                                       | -    |
| clearable   | 大于                           | ^[string]                                                                       | -    |
| lessThan      | 小于                           | ^[string]                                                                       | -    |
| width         | 宽度                           | ^[string]                                                                       | -    |

### TimePickerRange属性
| 属性名         | 说明       | 类型      | 默认 |
| -------------- | ---------- | --------- | ---- |
| v-model:start  | 开始绑定值 | ^[string] | -    |
| v-model:end    | 结束绑定值 | ^[string] | -    |
| v-model        | 绑定值     | ^[string] | -    |
| valueSeparator | 值分隔符   | ^[string] | ,    |