---
title: Menu页面菜单
order: 3
date: 2023-08-24
category:
  - ElementUI
tag:
  - 页面菜单
  - Tool
sticky: true
star: true
---

# 页面菜单

*页面顶部菜单、底部菜单*

<!-- more -->


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

## Menu API

### 属性

| 属性名| 说明                                                             | 类型                                                  | 默认   |
| ------| ------------------------------                                  | ------------------------------------------------------| ---- |
| data  |数据                                                              | ^[array]                                              | -  |
| logUrl   |日志地址                                                        | ^[string]                                            | -  |
| docUrl   |文档地址                                                        | ^[string]                                            | -  |
| noteUrl   |书签地址                                                       | ^[string]                                            | -  |
| mutiSaveUrl   |保存地址                                                   | ^[string]                                            | -  |

### 事件

| 名称       | 说明                           | 回调参数                                 |
| -----     | ----------------------------- | ---------------------------------------- |
| click | 选择菜单事件                      | (item: MenuItem) => void                     |
| uploaded | 上传完成地址                   | (res: ApiResult) => void                     |
