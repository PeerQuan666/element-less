---
title: Table表格
order: 5
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

# 表格

*展示行列报表数据，加入导出、分页，右键菜单，多行编辑等功能*




## 基础表格

:::tip
默认居中对齐，对齐方式请设置<code>align</code>、<code>header-align</code>
:::

:::vuefile-demo

table/base

:::

## 数据表格

:::tip

设置数据源接口地址<code>url</code>，分页分成服务的分页以及客户端分页，服务端分页会将页数传回接口中请求，客户端分页设置<code>:is-client-page="true"</code>，页码设置<code>:page-size="10"</code>

:::

:::vuefile-demo

table/api

:::

## 列类型

:::tip

列类型分为<code>checkbox</code>、<code>expand</code>、<code>header</code>、<code>enum</code>、<code>bool</code>、<code>image</code>、<code>select</code>、<code>operate</code>

:::

:::vuefile-demo

table/column

:::


## 编辑

:::tip

列设置<code>:is-edit="true"</code>开启编辑,默认输入框，使用其他组件请使用插槽<code>edit</code>,默认在插槽下的组件会带上<code>els-form-item</code>支持校验验证

:::

:::vuefile-demo

table/edit

:::

## 拖动

:::tip

列设置<code>draggable</code>开启拖动,拖动完事件<code>dragEnd</code>

:::

:::vuefile-demo

table/drag

:::

## 导出

:::tip

导出分为客户端导出、服务端导出
客户端导出会将当前所有数据根据表格渲染导出
服务端导出应用在数据量大情况，由服务端分页
服务端导出会去重新请求一次接口并且页数设置100000，由接口去处理请求之后返回数据重新渲染完成导出，导出之后会再请求一次当前页的数据还原

:::

:::vuefile-demo

table/export

:::

## 菜单

:::tip

需要设置全局配置，全局配置请参考组件页面
:::
### 右键菜单


禁用<code>:hasContextMenu="false"</code>

:::vuefile-demo

table/menu

:::

### 右侧菜单 

添加<code>els-column-operate</code>列

:::vuefile-demo

table/menu-operate

:::


## 合并行、汇总

:::tip

设置<code>mergeRow</code>或者<code>mergeRowByFieldname</code>
合并行汇总使用<code>mergeSum</code>
汇总使用<code>showSummary</code>、可使用方法返回<code>:summaryMethod</code> 或者自定义数据 <code>:summaryValue</code>
:::

:::vuefile-demo

table/merge

:::

## 绑定列

:::tip
设置<code>columns</code>属性
:::

:::vuefile-demo

table/columndata

:::

## Table API

### Table属性

| 属性名                     | 说明                         | 类型                                                     | 默认                                 |
| -------------------------- | ---------------------------- | -------------------------------------------------------- | ------------------------------------ |
| tableName                  | Table名称                    | ^[string]                                                | -                                    |
| url                        | 数据地址                     | ^[string]                                                | -                                    |
| saveUrl                    | 保存地址                     | ^[string]                                                | -                                    |
| rowKey                     | 行Key                        | ^[string]                                                | -                                    |
| rowClassName               | 行类名                       | ^[string]                                                | -                                    |
| data                       | 数据                         | ^[array]                                                 | -                                    |
| hasPage                    | 是否有分页                   | ^[boolean]                                               | ^[false]                             |
| pageSize                   | 页大小                       | ^[number]                                                | ^[false]                             |
| pageTotal                  | 页总数                       | ^[number]                                                | ^[false]                             |
| recordCount                | 数据条数                     | ^[number]                                                | ^[false]                             |
| pageSizes                  | 每页显示个数选择器的选项设置 | ^[array]`number[]`                                       | [10, 20, 30, 40, 50, 100]            |
| pageIndex                  | 当前页                       | ^[number]                                                | -                                    |
| pageLayout                 | 组件布局，子组件名用逗号分隔 | ^[string]                                                | prev, pager, next, jumper, ->, total |
| isCustomPageSize           | 是否显示自定义分页           | ^[boolean]                                               | ^[false]                             |
| hasBottomFixdScroll        | 是否显示固定底部滚动条       | ^[boolean]                                               | ^[true]                              |
| isExport                   | 是否可导出                   | ^[boolean]                                               | ^[true]                              |
| isLocaleString             | 数据千分符                   | ^[boolean]                                               | ^[false]                             |
| isClientSort               | 否客户端排序                 | ^[boolean]                                               | ^[false]                             |
| isClientPage               | 否客户端分页                 | ^[boolean]                                               | ^[false]                             |
| isClientSearch             | 客户端搜索                   | ^[boolean]                                               | ^[false]                             |
| dragRow                    | 拖动行                       | ^[boolean]                                               | ^[false]                             |
| align                      | 对齐方式                     | ^[string]                                                | ^[center]                            |
| headerAlign                | 表头对齐方式                 | ^[string]                                                | ^[center]                            |
| initReadData               | 初始化读取接口数据           | ^[boolean]                                               | ^[true]                              |
| isReadDataClearCheckRowKey | 读取数据清空选择             | ^[boolean]                                               | ^[true]                              |
| isPostCheckRowData         | 选择是否包含选择行           | ^[boolean]                                               | ^[false]                             |
| isPostNoCheckRow           | 选择是否包含未选行           | ^[boolean]                                               | ^[false]                             |
| checkRowKeys               | 选择行Keys                   | ^[array]                                                 | -                                    |
| checkRows                  | 选择行                       | ^[array]                                                 | -                                    |
| loading                    | 加载状态                     | ^[boolean]                                               | ^[false]                             |
| spanMethod                 | 合并行或列的计算方法         | ^[function]`function({row,column,rowIndex,columnIndex})` |                                      |
| showSummary                | 显示汇总                     | ^[boolean]                                               | ^[false]                             |
| showCheckField             | 显示选择字段名               | ^[string]                                                | -                                    |
| showEditColumn             | 显示编辑列                   | ^[boolean]                                               | ^[true]                              |
| summaryMethod              | 汇总计算方法                 | ^[function]                                              | function({ columns, data })          |
| beforeSave                 | 保存之前方法                 | ^[function]                                              | -                                    |
| beforeReadData             | 读取数据之前方法             | ^[function]                                              | -                                    |
| afterReadData              | 读取接口之后方法             | ^[function]                                              |                                      |
| headerStickyTop            | 固定头部                     | ^[number]                                                | -1                                   |
| editStatus                 | 编辑状态                     | ^[boolean]                                               | ^[false]                             |
| beforeTriggerContextMenu   | 触发右键菜单之前             | ^[function]                                              | -                                    |
| contextMenus               | 右键菜单数据                 | ^[array]                                                 | -                                    |
| hasContextMenu             | 是否有右键菜单               | ^[boolean]                                               | ^[true]                              |
| columns                    | 列表数据                     | ^[array]`[{prop:'',label:''}]`                           | -                                    |


### Table事件
| 属性名    | 说明         | 类型        | 默认 |
| --------- | ------------ | ----------- | ---- |
| dragMove  | 拖动行事件   | ^[function] | -    |
| dragEnd   | 拖动结束事件 | ^[function] | -    |
| menuClick | 菜单点击事件 | ^[function] | -    |

## TableColumn API

### TableColumn属性
| 属性名              | 说明                     | 类型                            | 默认  |
| ------------------- | ------------------------ | ------------------------------- | ----- |
| prop                | 字段名称                 | ^[string]                       | -     |
| sortable            | 排序                     | ^[boolean]                      | false |
| isLocaleString      | 数据千分符               | ^[boolean]                      | false |
| isHb                | 是否环比，读取row.HBData | ^[boolean]                      | false |
| isTb                | 是否同比，读取row.TBData | ^[boolean]                      | false |
| isEdit              | 是否编辑                 | ^[boolean]                      | false |
| editFields          | 编辑字段，多个逗号分割   | ^[string]                       | -     |
| isCustomEdit        | 是否自定义编辑           | ^[boolean]                      | false |
| sortExpress         | 排序                     | ^[string]`desc,asc`             | -     |
| dateFormatter       | 时间格式化               | ^[function]`(val)=>{return ''}` | -     |
| isExport            | 是否可导出               | ^[boolean]                      | true  |
| triggerActionName   | 根据动作点击触发菜单     | ^[string]                       | -     |
| triggerMenuId       | 根据ID点击触发菜单ID     | ^[string]                       | -     |
| headerFormatter     | 头部格式化               | ^[function]`(val)=>{return ''}` | -     |
| mergeRow            | 合并行                   | ^[boolean]                      | false |
| mergeRowByFieldname | 根据字段合并             | ^[string]                       | -     |
| mergeFieldname      | 合并行字段               | ^[string]                       | -     |
| mergeMethod         | 合并方法                 | ^[function]                     | -     |
| mergeSum            | 是否合并汇总             | ^[boolean]                      | false |
| showSummary         | 显示汇总                 | ^[boolean]                      | false |
| summaryMethod       | 汇总方法                 | ^[function]                     | -     |
| hasBottomBorder     | 是否有底部边框           | ^[boolean]                      | false |
| sortMethod          | 排序方法                 | ^[function]                     | -     |
| isAvgDay            | 是否平均值               | ^[boolean]                      | false |
| tipContent          | 头部提示信息             | ^[string]                       | -     |

### TableColumnBool属性
| 属性名     | 说明      | 类型       | 默认    |
| ---------- | --------- | ---------- | ------- |
| trueLabel  | true文本  | ^[boolean] | 是      |
| falseLabel | false文本 | ^[boolean] | 否      |
| falseClass | false类名 | ^[boolean] | txt-red |
| trueValue  | true值    | ^[boolean] | 1       |

### TableColumnEnum属性
| 属性名        | 说明               | 类型                             | 默认        |
| ------------- | ------------------ | -------------------------------- | ----------- |
| enumData      | 枚举               | ^[object]                        |             |
| enumShowType  | 枚举显示类型       | ^[string]`Description,Key,Value` | Description |
| enumEqualType | 枚举比较值         | ^[boolean]                       | Value       |
| enumNoneLabel | 枚举无配置显示文本 | ^[boolean]                       | 未知        |

### TableColumnImage属性
| 属性名         | 说明       | 类型       | 默认 |
| -------------- | ---------- | ---------- | ---- |
| isPreview      | 是否可预览 | ^[boolean] | true |
| imageStyle     | 图片样式   | ^[string]  |      |
| imageEmptyDesc | 空地址显示 | ^[string]  |      |
### TableColumnSelect属性
| 属性名            | 说明         | 类型       | 默认 |
| ----------------- | ------------ | ---------- | ---- |
| selectButtonLabel | 选择按钮文本 | ^[boolean] | 选择 |

### TableColumnOperate属性
| 属性名      | 说明         | 类型       | 默认 |
| ----------- | ------------ | ---------- | ---- |
| isFold      | 菜单是否合并 | ^[boolean] | 1    |
| unFoldCount | 不合并数     | ^[number]  | 1    |



