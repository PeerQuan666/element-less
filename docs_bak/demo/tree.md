---
title: Tree 树形控件(单选、多选)
order: 16
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

用清晰的层级结构展示信息，可展开或折叠。


## 基础用法

:::tip
数据扁平式结构，添加<code>v-model</code>将选择的值回传，<code>show-checkbox</code>或者<code>mutiple</code>时为多选
默认设置了<code>check-strictly</code>父子默认不关联，
新增两个属性<code>checkWithParent</code>、<code>unCheckWithchild</code>增加选择灵活性
:::

:::vuefile-demo

tree/base

:::

## 读取接口

:::tip 
指定字段：<code>idField</code>、<code>labelField</code>、<code>parentIdField</code>
:::

:::vuefile-demo

tree/api

:::

