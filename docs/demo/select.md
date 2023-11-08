---
title: Select选择器
order: 8
date: 2023-08-24
category:
  - ElementUI
tag:
  - Form
  - 单选
  - 多选
sticky: true
star: true
---

# Select选择器

*弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时*

## 基础用法

:::vuefile-demo

select/base

:::

## 分组

:::vuefile-demo

select/group

:::

## 读取数据源


::: vuefile-demo

select/data

:::

## 读取接口

::: vuefile-demo

select/api

:::

## 大数据开启虚拟化选择

::: vuefile-demo

select/virtual

:::


## Select API

### Select属性
| 属性名                    | 说明                               | 类型                           | 默认     |
| ------------------------- | ---------------------------------- | ------------------------------ | -------- |
| modelValue                | 绑定值                             | ^[string]/^[number]/^[boolean] | -        |
| v-model:select            | 选择的对象                         | ^[object]                      | -        |
| v-model:select-label      | 选择的文本                         | ^[string]                      | -        |
| isVirtual                 | 数据量时候开启使用虚拟化选择器     | ^[boolean]                     | false    |
| data                      | 选项数据                           | ^[object]                      | -        |
| url                       | 数据接口地址                       | ^[string]                      | -        |
| labelField                | 文本字段                           | ^[string]                      | -        |
| valueField                | 值字段                             | ^[string]                      | -        |
| groupField                | 分组字段名                         | ^[string]                      | true     |
| valueType                 | 值类型                             | ^[enum]`String,Number,Bool`    | -        |
| hasNoExistOption          | 值不存在时，添加未知选项           | ^[boolean]                     | true     |
| noExistOptionPrefix       | 未知选项前缀                       | ^[string]                      | 未知选项 |
| disabledField             | 禁用字段名                         | ^[string]                      | -        |
| selectIndex               | 默认选择第几项                     | ^[number]                      | -1       |
| resetValueByChangeData    | 数据更新重置选项值                 | ^[boolean]                     | true     |
| isInitTriggerSelect       | 初始化后触发选择事件               | ^[boolean]                     | true     |
| trueLabel                 | 选中时的值                         | ^[string]/^[number]/^[boolean] | -        |
| falseLabel                | 没有选中时的值                     | ^[string]/^[number]/^[boolean] | -        |
| width                     | 宽度                               | ^[string]                      | true     |
| isClearWithSearch         | 清除选择项并清除搜索词             | ^[string]                      | true     |
| isClearSearchWithNoSelect | 未选择时，下拉框隐藏后会清除搜索词 | ^[string]                      | true     |
| valueSeparator            | 多选分隔符                         | ^[string]                      | ,        |
| multiple                  | 是否多选                           | ^[boolean]                     | false    |

### 事件
| 属性名       | 说明               | 类型        | 默认 |
| ------------ | ------------------ | ----------- | ---- |
| select       | 选择事件           | ^[Function] | -    |
| click-option | 点击选项事件       | ^[Function] | -    |
| readdataed   | 读取数据结束后事件 | ^[Function] | -    |