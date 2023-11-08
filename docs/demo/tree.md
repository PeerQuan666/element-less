---
title: Tree树形控件
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

# Tree树形控件

*用清晰的层级结构展示信息，可展开或折叠。(单选、多选)*


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

## 大数据开启虚拟化选择

::: vuefile-demo

tree/virtual

:::


## Tree API

### Tree属性
| 属性名                 | 说明                             | 类型                        | 默认  |
| ---------------------- | -------------------------------- | --------------------------- | ----- |
| v-model                | 绑定值                           | ^[string]                   | -     |
| v-model:select         | 选择的对象                       | ^[object]                   | -     |
| v-model:select-label   | 选择的文本                       | ^[string]                   | -     |
| isVirtual              | 数据量时候开启使用虚拟化选择器   | ^[boolean]                  | false |
| url                    | 数据接口地址                     | ^[string]                   | -     |
| data                   | 选项数据                         | ^[object]                   | true  |
| labelField             | 文本字段                         | ^[string]                   | -     |
| valueField             | 值字段                           | ^[string]                   | -     |
| parentIdField          | 父ID字段名                       | ^[string]                   | true  |
| rootParentValue        | 根节点值                         | ^[string]                   | true  |
| disabledField          | 禁用字段名                       | ^[string]                   | -     |
| valueType              | 值类型                           | ^[enum]`String,Number,Bool` | -     |
| checkStrictly          | 是否严格的遵守父子节点不互相关联 | ^[boolean]                  | -     |
| multiple               | 是否多选                         | ^[boolean]                  | -     |
| lazy                   | 是否动态加载子节点               | ^[boolean]                  | -     |
| lazyNoChild            | 懒加载时判断是否有子节点         | ^[Function]                 | -     |
| resetValueByChangeData | 数据改变重置值                   | ^[boolean]                  | true  |
| expandOnClickNode      | 点击节点并展开                   | ^[boolean]                  | -     |
| showSelect             | 选择项后添加勾选样式             | ^[boolean]                  | -     |
| showCheckAll           | 显示全选                         | ^[boolean]                  | -     |
| expandAll              | 展开所有                         | ^[boolean]                  | -     |
| expandDepth            | 展开深度                         | ^[boolean]                  | -     |
| filterable             | 是否可筛选                       | ^[boolean]                  | -     |
| checkWithParent        | 选择之后父节点也勾选             | ^[boolean]                  | -     |
| unCheckWithchild       | 取消选择之后子节点也取消勾选     | ^[boolean]                  | -     |
| load                   | 懒加载方法                       | ^[Function]                 | -     |
| isInitTriggerSelect    | 初始化触发选择                   | ^[boolean]                  | -     |
| isOnlySelectChild      | 是否只有子节点能选择             | ^[boolean]                  | -     |
| showCheckAll           | 显示全选                         | ^[boolean]                  | -     |
| valueSeparator         | 多选分隔符                       | ^[string]                   | ,     |
