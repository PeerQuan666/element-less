---
title: 页面配置
order: 2
date: 2023-08-24
---

:::tip 全局配置
使用前请设置全局配置、将页面放置在<code>els-container</code>中
包含默认查询、验证、导出功能、缩减大部分重复的代码
:::

```ts
  app.config.globalProperties.$lessConfig = {
      api:{ //api接口返回结构
        code:'ResultCode',//接口返回状态码
        message:'ResultMessage',//接口返回说明
        data:'Data',//接口返回数据
        successCode:'0',//状态码成功值
        eventData:{//接口返回事件
          data:'EventActionData',//数据字段
          data_key:'Name',//事件名：['Alert','TargetUrl','RefreshTable','CloseDialog','CloseDrawer']
          data_value:'value'//事件值
        }
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
        action:'ActionType',//菜单动作类型:保存、新增、修改、删除
        icon:'ImageUrl',//菜单图标
        buttonColor:'ButtonColor',//按钮颜色
        buttonType:'ButtonType',//按钮类型：跳转、保存、查询、导入导出
        group:'Fold',//组名
        url:'TargetUrl',//菜单地址
        areaName:'AreaName',//区域名称
        controllerName:'ControllerName',//控制器名称
        actionName:'ActionName',//动作名称
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
