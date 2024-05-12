---
title: Tabs标签页
order: 8
date: 2023-08-24
category:
  - ElementUI
tag:
  - Form
  - 单选
sticky: true
star: true
---

# Tabs标签页

*单选组件*

<!-- more -->

## 基础用法

:::vuefile-demo

tabs/base

:::

## 读取数据源

:::vuefile-demo

tabs/data

:::

## 读取接口

:::vuefile-demo

tabs/api

:::

## Radio API

### Radio属性
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
| data                   | 选项数据                 | ^[object]                      | -        |
| valueType              | 值类型                   | ^[enum]`String,Number,Bool`    | -        |
| hasNoExistOption       | 值不存在时，添加未知选项 | ^[boolean]                     | true     |
| noExistOptionPrefix    | 未知选项前缀             | ^[string]                      | 未知选项 |
| disabledField          | 禁用字段名               | ^[string]                      | -        |
| selectIndex            | 默认选择第几项           | ^[number]                      | -1       |
| resetValueByChangeData | 数据更新重置选项值       | ^[boolean]                     | true     |
| isInitTriggerSelect    | 初始化后触发选择事件     | ^[boolean]                     | true     |

### 事件
| 属性名       | 说明               | 类型        | 默认 |
| ------------ | ------------------ | ----------- | ---- |
| select       | 选择事件           | ^[Function] | -    |
| click-option | 点击选项事件       | ^[Function] | -    |
| readdataed   | 读取数据结束后事件 | ^[Function] | -    |

