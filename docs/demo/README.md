---
title: 文档
index: false
icon: laptop-code
category:
  - 使用指南
---

:::tip 提示

当前所有基于ElementUI的封装的组件支持所有原生属性

:::

:::tip 全局配置
使用前请设置全局配置、将页面放置在<code>els-container</code>中、包含默认查询、验证、导出功能。
:::

```ts
  app.config.globalProperties.$lessConfig = {
      api:{ //api接口返回结构
        code:'ResultCode',//接口返回状态码
        message:'ResultMessage',//接口返回说明
        data:'Data',//接口返回数据
        successCode:'0'//状态码成功值
      },
      upload:{ //上传组件
        url:'http://manage.ybt2023.com/Home/TestUpload',//默认上传地址
        data:'UploadInfo',//上传完成数据返回在api接口中的data中
        data_path:'ResourcePath',//上传完返回地址
        data_md5:'Md5Value',//上传完返回md5
      },
      menu:{ //菜单：导航菜单、工具栏菜单、右键菜单
        id:'MenuID',//菜单ID
        name:'MenuName',//菜单名称
        action:'ActionName',//菜单动作名称
        actionType:'ActionType',//菜单动作类型：保存、新增、修改、删除
        icon:'ImageUrl',//菜单图标
        buttonColor:'ButtonColor',//按钮颜色
        buttonType:'ButtonType',//按钮类型：跳转、保存、查询、导入导出
        group:'Fold'//组名
      },
      table:{ //表格
          menu:'PowerMenu', //右键菜单字段
          avgDay:'DayCount',//所选时间段天数，用来做平均使用，一般不配置
          page:{ //分页
            data:"Data",//数据
            pageSize:'PageSize',//页大小
            currentPage:'PageIndex',//当前页
            total:'RecordCountInt',//总数
            pageCount:'PageCount'//页数
          }
      }
  }
```

## 目录

- [Layout布局](layout.md)

- [Form表单](form.md)

- [Input输入框](input.md)

- [Select选择器](select.md)

- [Checkbox多选](checkbox.md)

- [Radio单选](radio.md)

- [DataModal弹窗选择](datamodal.md)

- [Autocomplete](autocomplete.md)

- [DatePicker日期选择器](date-picker.md)

- [List遍历组件](list.md)

- [Tip提示](tip.md)

- [Table表格](table.md)

- [Menu 导航菜单](menu.md)

- [Menu 页面菜单](menu-tool.md)

