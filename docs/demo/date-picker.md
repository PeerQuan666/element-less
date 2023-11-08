---
title: DatePicker日期选择器
order: 13
date: 2023-08-24
category:
  - ElementUI
tag:
  - DatePicker
sticky: true
star: true
---
# DatePicker日期选择器

*用于选择或输入日期*

<!-- more -->

## 基础用法

:::vuefile-demo

date-picker/base

:::

## 范围选择

:::vuefile-demo

date-picker/range

:::

## 范围选择双控件

::: tip
设置<code>:single="false"</code>

:::
:::vuefile-demo

date-picker/splitRange

:::


## DatePicker API

### DatePicker属性
| 属性名        | 说明                           | 类型                                                                            | 默认 |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------- | ---- |
| type          | 类型                           | ^[enum]`year/month/date/dates/datetime/week/datetimerange/daterange/monthrange` | -    |
| v-model       | 绑定值                         | ^[string]                                                                       | -    |
| valueFormat   | 值格式化                       | ^[string]                                                                       | -    |
| textFormat    | 文本格式化                     | ^[string]                                                                       | -    |
| greaterThan   | 大于                           | ^[string]                                                                       | -    |
| lessThan      | 小于                           | ^[string]                                                                       | -    |
| width         | 宽度                           | ^[string]                                                                       | -    |
| isShortcuts   | 是否有快捷选项                 | ^[boolean]                                                                      | -    |
| disabledDate  | 禁用时间                       | ^[Function]                                                                     | -    |
| shortcutsDate | 快捷选项的初始化时间           | ^[string]                                                                       | -    |
| shortcuts     | 快捷选项                       | ^[array]                                                                        | -    |
| defaultTime   | 选中日期所使用的当日内具体时刻 | ^[string]                                                                       | -    |

### DatePickerRange属性
| 属性名         | 说明       | 类型      | 默认 |
| -------------- | ---------- | --------- | ---- |
| v-model:start  | 开始绑定值 | ^[string] | -    |
| v-model:end    | 结束绑定值 | ^[string] | -    |
| v-model        | 绑定值     | ^[string] | -    |
| valueSeparator | 值分隔符   | ^[string] | ,    |
