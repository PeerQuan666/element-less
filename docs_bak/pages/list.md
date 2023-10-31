---
title: 列表页
order: 1
date: 2023-08-24
category:
  - ElementUI
tag:
  - 页面
  - 查询、删除、导出
sticky: true
star: true
---

一个基础页面包含顶部菜单栏、查询Form表单、Table数据表格、右键菜单

:::tip
默认使用<code>els-container</code>组件包含，可省去很多复杂的操作
比如页面默认查询、导出、验证
:::

## 默认页面

:::vuefile-demo

pages/base

:::

## 多查询表格页面

:::tip
<code>form-query</code>上设置<code>tableRef</code>，将查询参数传入指定的表格中查询，并不会干扰其他表格参数
:::

:::vuefile-demo

pages/muti

:::


## 客户端查询

:::vuefile-demo

pages/client

:::


## 自动查询

:::tip
不需要添加查询按钮，值改变之后自动查询
:::

:::vuefile-demo

pages/auto

:::

## 导出

:::tip
<code>els-button-export</code>添加导出按钮
:::

:::vuefile-demo

pages/export

:::

