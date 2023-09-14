---
title: DataModal弹窗选择
icon: square-check
order: 7
date: 2023-08-24
category:
  - ElementUI
tag:
  - Form
  - 数据弹窗选择
sticky: true
star: true
---

弹出窗口中选择数据

<!-- more -->

## 基础用法


:::vuefile-demo

dataModal/base

:::


## 弹出新页面选择数据

:::tip
组件创建完默认会注册一个事件，通过url传递参数<code>Transfer_SelectTagID</code>
然后通过调用<code>window.parent[Transfer_SelectTagID]</code>事件来返回参数
:::

:::vuefile-demo

dataModal/target

:::
