---
title: Upload上传
order: 17
date: 2023-08-24
category:
  - ElementUI
tag:
  - Tip
sticky: true
star: true
---

# Upload上传

*上传图片文件*

<!-- more -->

## 上传文件

:::vuefile-demo

upload/file

:::

## 多文件

:::tip
设置<code>multiple</code>
:::

:::vuefile-demo

upload/file-multiple

:::

## 上传图片

:::vuefile-demo

upload/pic

:::

## 多图

:::tip
设置<code>multiple</code>或者<code>type='MutiPic'</code>
:::

:::vuefile-demo

upload/pic-multiple

:::


## Upload API

### Upload属性
| 属性名           | 说明                        | 类型                                                   | 默认 |
| ---------------- | --------------------------- | ------------------------------------------------------ | ---- |
| type             | 类型                        | ^[enum]`None,Pic,File`                                 | -    |
| v-model          | 绑定值                      | ^[string]                                              | -    |
| width            | type='Pic'时设置图片的宽度  | ^[string]                                              | -    |
| height           | type='Pic'时设置图片的高度  | ^[string]                                              | -    |
| url              | 上传地址                    | ^[string]                                              | -    |
| showInput        | 显示输入框                  | ^[string]                                              | -    |
| inputPlaceholder | 输入框占位文本              | ^[string]                                              | -    |
| inputWidth       | 输入框宽度                  | ^[string]                                              | -    |
| showFileList     | type='File'是否显示文件列表 | ^[boolean]                                             | -    |
| valueSeparator   | 多文件上传值分隔符          | ^[string]                                              | $    |
| buttonLabel      | 按钮文本                    | ^[boolean]                                             | -    |
| sizeLimit        | 文件大小限制M               | ^[number]                                              | -    |
| fileTypes        | 文件类型限制                | ^[string]                                              | -    |
| picWidthLimit    | 图片宽度限制                | ^[string]                                              | -    |
| picHeightLimit   | 图片高度限制                | ^[string]                                              | -    |
| picLimitType     | 图片限制类型                | ^[enum]`最小Min,最大Max,固定Fixed,等比FixedProportion` | -    |
| resourceCode     | 上传资源码                  | ^[string]                                              | -    |
| restrictCode     | 上传限制码                  | ^[string]                                              | -    |
| hasMd5Parameter  | 是否返回MD5参数             | ^[boolean]                                             | -    |
| isReturnSize     | 是否返回文件大小            | ^[boolean]                                             | -    |


### 事件
| 属性名    | 说明             | 类型        | 默认 |
| --------- | ---------------- | ----------- | ---- |
| completed | 全部上传完成事件 | ^[Function] | -    |
| uploaded  | 上传成功事件     | ^[Function] | -    |

