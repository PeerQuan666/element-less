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

:::tip

列类型分为<code>checkbox</code>、<code>expand</code>、<code>header</code>、<code>enum</code>、<code>bool</code>、<code>image</code>、<code>select</code>、<code>operate</code>

:::

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

## 拖动

:::tip

列设置<code>draggable</code>开启拖动,拖动完事件<code>dragEnd</code>

:::

:::vuefile-demo

table/drag

:::

## 导出

:::tip

导出分为客户端导出、服务端导出
客户端导出会将当前所有数据根据表格渲染导出
服务端导出应用在数据量大情况，由服务端分页
服务端导出会去重新请求一次接口并且页数设置100000，由接口去处理请求之后返回数据重新渲染完成导出，导出之后会再请求一次当前页的数据还原

:::

:::vuefile-demo

table/export

:::

## 菜单

:::tip

需要设置全局配置

:::

```ts
app.config.globalProperties.$lessConfig = {
    table:{
        menuFieldname:'PowerMenu',//列表数据字段名
        contextMenu:{
            idFieldname:'MenuID',//菜单主键ID
            nameFieldname:'MenuName',//菜单名称
            actionFieldname:'ActionName',//处理名称（可不填）
            iconFieldname:'ImageUrl'//图标 可使用fontawesome图标库
        }
        
    }
}
```
### 右键菜单

禁用<code>:hasContextMenu="false"</code>

:::vuefile-demo

table/menu

:::

### 右侧菜单 

添加<code>els-column-operate</code>列

:::vuefile-demo

table/menu-operate

:::


## 合并行、汇总

:::tip

设置<code>mergeRow</code>或者<code>mergeRowByFieldname</code>
合并行汇总使用<code>mergeSum</code>
汇总使用<code>showSummary</code>、可使用方法返回<code>:summaryMethod</code> 或者自定义数据 <code>:summaryValue</code>
:::

:::vuefile-demo

table/merge

:::

