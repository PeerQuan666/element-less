---
title: CheckBox多选
order: 9
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

# CheckBox多选

:::tip
在一组可选项中进行多项选择时
单独使用可以表示两种状态之间的切换，和 Switch 类似
:::


<!-- more -->

## 基础用法

:::vuefile-demo

checkbox/base

:::


## 分组

:::vuefile-demo

checkbox/group

:::

## 读取数据源

:::vuefile-demo

checkbox/data

:::

## 读取接口

:::vuefile-demo

checkbox/api

:::

## Checkbox API

### Checkbox属性
| 属性名                 | 说明                     | 类型                           | 默认     |
| ---------------------- | ------------------------ | ------------------------------ | -------- |
| modelValue             | 绑定值                   | ^[string]/^[number]/^[boolean] | -        |
| v-model:select         | 选择的对象               | ^[object]                      | -        |
| v-model:select-label   | 选择的文本               | ^[string]                      | -        |
| data                   | 选项数据                 | ^[object]                      | -        |
| url                    | 数据接口地址             | ^[string]                      | -        |
| labelField             | 文本字段                 | ^[string]                      | -        |
| valueField             | 值字段                   | ^[string]                      | -        |
| groupField             | 分组字段名               | ^[string]                      | -        |
| valueType              | 值类型                   | ^[enum]`String,Number,Bool`    | -        |
| hasNoExistOption       | 值不存在时，添加未知选项 | ^[boolean]                     | true     |
| noExistOptionPrefix    | 未知选项前缀             | ^[string]                      | 未知选项 |
| disabledField          | 禁用字段名               | ^[string]                      | -        |
| selectIndex            | 默认选择第几项           | ^[number]                      | -1       |
| resetValueByChangeData | 数据更新重置选项值       | ^[boolean]                     | true     |
| isInitTriggerSelect    | 初始化后触发选择事件     | ^[boolean]                     | true     |
| trueLabel              | 选中时的值               | ^[string]/^[number]/^[boolean] | -        |
| falseLabel             | 没有选中时的值           | ^[string]/^[number]/^[boolean] | -        |
| width                  | 宽度                     | ^[string]                      | true     |
| height                 | 高度                     | ^[string]                      | true     |
| valueSeparator         | 多选分隔符               | ^[string]                      | ,        |

### 事件
| 属性名       | 说明               | 类型        | 默认 |
| ------------ | ------------------ | ----------- | ---- |
| select       | 选择事件           | ^[Function] | -    |
| click-option | 点击选项事件       | ^[Function] | -    |
| readdataed   | 读取数据结束后事件 | ^[Function] | -    |

