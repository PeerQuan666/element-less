---
title: Input输入框
order: 7
date: 2023-08-24
category:
  - ElementUI
tag:
  - Form
  - 输入框
sticky: true
star: true
---

# Input输入框

通过鼠标或键盘输入字符

<!-- more -->
:::tip
默认宽度设置了200
:::

## 基础用法

:::vuefile-demo

input/base

:::

## UrlEncode

:::vuefile-demo

input/encode

:::

## 前后标签

:::vuefile-demo

input/tag

:::


## 范围

:::vuefile-demo

input/range

:::

## Input API

### Input属性
| 属性名        | 说明                 | 类型        | 默认  |
| ------------- | -------------------- | ----------- | ----- |
| modelValue    | 绑定值               | ^[object]   | -     |
| encode        | 是否值编码           | ^[boolean]  | false |
| encodeType    | 编码类型             | ^[string]   | url   |
| prefixTag     | 前缀标签             | ^[Function] | -     |
| suffixTag     | 后缀标签             | ^[string]   | 100px |
| width         | 输入框宽度           | ^[string]   | -     |
| placeholder   | 占位文本             | ^[string]   | -     |
| showWordLimit | 是否显示统计字数     | ^[boolean]  | -     |
| clearable     | 是否显示清除按钮     | ^[boolean]  | -     |
| showPassword  | 是否显示切换密码图标 | ^[boolean]  | -     |
| disabled      | 是否禁用             | ^[boolean]  | -     |

### Textarea属性
| 属性名   | 说明           | 类型       | 默认  |
| -------- | -------------- | ---------- | ----- |
| rows     | 绑定值         | ^[object]  | -     |
| autosize | 高度是否自适应 | ^[boolean] | false |

### 事件

| 属性名 | 说明                                                        | 类型                                           |
| ------ | ----------------------------------------------------------- | ---------------------------------------------- |
| blur   | 当选择器的输入框失去焦点时触发                              | ^[Function]`(event: FocusEvent) => void`       |
| focus  | 当选择器的输入框获得焦点时触发                              | ^[Function]`(event: FocusEvent) => void`       |
| change | 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发 | ^[Function]`(value: string \| number) => void` |
| input  | 在 Input 值改变时触发                                       | ^[Function]`(value: string \| number) => void` |
| clear  | 在点击由 clearable 属性生成的清空按钮时触发                 | ^[Function]`() => void`                        |
