---
title: Form表单
order: 6
date: 2023-08-29
category:
  - ElementUI
tag:
  - Form
  - 查询表单
  - 编辑表单
sticky: true
star: true

---

# Form表单

*编辑表单、验证提交*

:::tip 提示

重写的组件<code>Props</code>继承<code>FormItemProps</code>在<code>els-form</code>表单下会默认添加<code>els-form-item</code>,如不需要添加属性:<code>hasFormItem="false"</code>

:::





## 编辑表单

:::vuefile-demo

form/edit

:::

## 查询表单

:::vuefile-demo

form/query

:::

## Form API

### Form属性
| 属性名     | 说明                | 类型        | 默认  |
| ---------- | ------------------- | ----------- | ----- |
| modelValue | 表单数据对象        | ^[object]   | -     |
| saveUrl    | 保存地址            | ^[string]   | -     |
| beforeSave | 保存前事件          | ^[Function] | -     |
| afterSave  | 保存后事件          | ^[Function] | -     |
| labelWidth | FormItem 标签的长度 | ^[string]   | 100px |
| inputWidth | 输入框宽度          | ^[string]   | -     |

### FormQuery属性
| 属性名        | 说明                 | 类型                                             | 默认  |
| ------------- | -------------------- | ------------------------------------------------ | ----- |
| modelValue    | 表单数据对象         | ^[object]                                        | -     |
| queryData     | 查询表单原始数据     | ^[object]                                        | -     |
| tableRef      | 要查询Table的Ref名   | ^[Function]                                      | -     |
| autoReadData  | 是否值改变就自动查询 | ^[boolean]                                       | 100px |
| parameterType | 参数类型             | ^[string]`NoPost:不传,NoQuery:不查询,Query:查询` | Query |


### FormQuery方法
| 属性名        | 说明                                                          | 类型        | 默认 |
| ------------- | ------------------------------------------------------------- | ----------- | ---- |
| validate      | 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。 | ^[Function] | -    |
| clearValidate | 清除验证状态                                                  | ^[Function] | -    |


