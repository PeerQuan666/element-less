---
title: Menu导航菜单
order: 2
date: 2023-08-29
category:
  - ElementUI
tag:
  - Form
  - 左侧导航
  - 顶部导航
sticky: true
star: true

---

# Menu 导航菜单

*为网站提供导航功能的菜单*


## 基础导航

:::tip 
跟原生没区别
:::

:::vuefile-demo

menu/base

:::

## 读取接口

:::tip 
指定字段：<code>idField</code>、<code>labelField</code>、<code>parentIdField</code>
点击菜单事件使用：<code>menuClick</code>
:::

:::vuefile-demo

menu/api

:::


## 读取数据源

:::vuefile-demo

menu/data

:::

## 可搜索

:::tip
设置<code>filterable</code>
:::

:::vuefile-demo

menu/filterable

:::


## Menu API

### 属性

| 属性名| 说明                                                             | 类型                                                  | 默认   |
| ------| ------------------------------                                  | ------------------------------------------------------| ----   |
| url   |数据接口                                                          | ^[string]                                             | - |
| data  |数据                                                              | ^[array]                                             | -  |
| idField   |id字段名                                                      | ^[string]                                             | -  |
| labelField   |label字段名                                                | ^[string]                                             | -  |
| parentIdField   |父id字段名                                              | ^[string]                                             | - |
| width   |宽度                                                           | ^[string]                                             | ^[200px]  |
| filterable   |添加filterable属性即可启用搜索功能                          | ^[boolean]                                             | ^[false]  |
| collapse   |展开缩起                          | ^[boolean]                                             | ^[false]   |

### 事件

| 名称       | 说明                           | 回调参数                                 |
| -----     | ----------------------------- | ---------------------------------------- |
| click | 点击事件                   | (item: MenuItem) => void                     |