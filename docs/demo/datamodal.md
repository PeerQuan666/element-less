---
title: DataModal弹窗选择
order: 12
date: 2023-08-24
category:
  - ElementUI
tag:
  - Form
  - 数据弹窗选择
sticky: true
star: true
---

# DataModal弹窗选择

*弹出窗口中操作数据并返回结果*

<!-- more -->

## 基础用法


:::vuefile-demo

dataModal/base

:::


<!-- more -->

## 自定义显示


:::vuefile-demo

dataModal/custom

:::


## 弹出新页面选择数据

:::tip
组件创建完默认会注册一个事件，通过url传递参数<code>Transfer_SelectTagID</code>
然后通过调用<code>window.parent[Transfer_SelectTagID]</code>事件来返回参数
:::

:::vuefile-demo

dataModal/target

:::


## DataModal API

### DataModal属性
| 属性名               | 说明                             | 类型        | 默认 |
| :------------------- | :------------------------------- | :---------- | :--- |
| modelValue           | 绑定值                           | ^[string]   | -    |
| v-model:select       | 选择的对象                       | ^[object]   | -    |
| v-model:select-label | 选择的文本                       | ^[string]   | -    |
| url                  | 弹窗地址                     | ^[string]   | -    |
| dataUrl              | 获取当前数据的接口，用来还原数据   | ^[object]   | -    |
| inputWidth           | 文本宽度                         | ^[string]   | -    |
| buttonLabel          | 按钮文本                         | ^[string]   | -    |
| hasInput             | 是否有输入框                     | ^[boolean]  | true |
| hasButton            | 是否有按钮                       | ^[boolean]  | true |
| title                | 弹窗标题                         | ^[string]   | true |
| width                | 弹窗宽度                         | ^[string]   | true |
| height               | 弹窗高度                         | ^[string]   | -    |
| labelField           | 文本字段名                       | ^[String]   | -    |
| valueField           | 值字段名                         | ^[String]   | -    |
| multiple             | 是否多选                         | ^[boolean]  | -    |

### 事件
| 属性名               | 说明                             | 类型        | 默认 |
| :------------------- | :------------------------------- | :---------- | :--- |
| open                 | 打开事件                         | ^[Function] | -    |
| close                | 关闭事件                         | ^[Function] | -    |
| confirm              | 提交事件                         | ^[Function] | -    |


