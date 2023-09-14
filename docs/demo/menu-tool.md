---
title: Menu 页面菜单
icon: square-check
order: 13
date: 2023-08-24
category:
  - ElementUI
tag:
  - 页面菜单
  - Tool
sticky: true
star: true
---

页面菜单

<!-- more -->

## 全局配置

```ts
app.config.globalProperties.$lessConfig = {
      menu:{
        id:'MenuID',//菜单ID
        name:'MenuName',//菜单名称
        action:'ActionName',//行为名
        actionType:'ActionType',//行为类型
        icon:'ImageUrl',//图标
        buttonColor:'ButtonColor',//按钮颜色
        buttonType:'ButtonType',//按钮类型
        group:'Fold'//分组
      }
  }
```

## 基础用法

:::tip
设置<code>data</code>或则<code>url</code>点击事件请使用<code>@click</code>
:::


:::vuefile-demo

menu-tool/base

:::

## 操作日志、文档地址、书签地址

:::vuefile-demo

menu-tool/more

:::

