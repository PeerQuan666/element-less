---
title: Table表格
icon: edit
date: 2023-08-29
category:
  - ElementUI
tag:
  - Form
  - 查询表单
  - 编辑表单
sticky: true
star: true

---

表格




## 基础表格

:::tip
默认居中对齐，对齐方式请设置<code>align</code>、<code>header-align</code>
:::

:::vuefile-demo

table/base

:::

## 数据表格

:::tip

设置数据源接口地址<code>url</code>，分页分成服务的分页以及客户端分页，服务端分页会将页数传回接口中请求，客户端分页设置<code>:is-client-page="true"</code>，页码设置<code>:page-size="10"</code>

:::

:::vuefile-demo

table/api

:::

## 列类型



:::vuefile-demo

table/column

:::


## 编辑

:::tip

列设置<code>:is-edit="true"</code>开启编辑,默认输入框，使用其他组件请使用插槽<code>edit</code>,默认在插槽下的组件会带上<code>els-form-item</code>支持校验验证

:::

:::vuefile-demo

table/edit

:::