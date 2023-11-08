---
title: Slider滑块
order: 7
date: 2023-08-24
category:
  - ElementUI
tag:
  - Form
  - 滑块
sticky: true
star: true
---
# Slider滑块

*滑动型输入器，展示当前值和可选范围*



## 基础用法

:::vuefile-demo

slider/base

:::

## 范围选择

:::vuefile-demo

slider/range

:::


## Slider API

### Slider属性
| 属性名            | 说明                                           | 类型       | 默认 |
| ----------------- | ---------------------------------------------- | ---------- | ---- |
| modelValue        | 绑定值                                         | ^[number]  | 0    |
| min               | 最小值                                         | ^[number]  | 0    |
| max               | 最大值                                         | ^[number]  | 100  |
| step              | 步长                                           | ^[number]  | 1    |
| showInput         | 是否显示输入框，仅在非范围选择时有效           | ^[boolean] | -    |
| showInputControls | 在显示输入框的情况下，是否显示输入框的控制按钮 | ^[boolean] | -    |
| range             | 是否开启选择范围                               | ^[boolean] | -    |
| vertical          | 垂直模式                                       | ^[boolean] | -    |
