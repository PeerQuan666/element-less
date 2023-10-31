<template><div><div class="hint-container tip">
<p class="hint-container-title">全局配置</p>
<p>使用前请设置全局配置、将页面放置在<code>els-container</code>中<br>
包含默认查询、验证、导出功能、缩减大部分重复的代码</p>
</div>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>  app<span class="token punctuation">.</span>config<span class="token punctuation">.</span>globalProperties<span class="token punctuation">.</span>$lessConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
      api<span class="token operator">:</span><span class="token punctuation">{</span> <span class="token comment">//api接口返回结构</span>
        code<span class="token operator">:</span><span class="token string">'ResultCode'</span><span class="token punctuation">,</span><span class="token comment">//接口返回状态码</span>
        message<span class="token operator">:</span><span class="token string">'ResultMessage'</span><span class="token punctuation">,</span><span class="token comment">//接口返回说明</span>
        data<span class="token operator">:</span><span class="token string">'Data'</span><span class="token punctuation">,</span><span class="token comment">//接口返回数据</span>
        successCode<span class="token operator">:</span><span class="token string">'0'</span><span class="token punctuation">,</span><span class="token comment">//状态码成功值</span>
        eventData<span class="token operator">:</span><span class="token punctuation">{</span><span class="token comment">//接口返回事件</span>
          data<span class="token operator">:</span><span class="token string">'EventActionData'</span><span class="token punctuation">,</span><span class="token comment">//数据字段</span>
          data_key<span class="token operator">:</span><span class="token string">'Name'</span><span class="token punctuation">,</span><span class="token comment">//事件名：['Alert','TargetUrl','RefreshTable','CloseDialog','CloseDrawer']</span>
          data_value<span class="token operator">:</span><span class="token string">'value'</span><span class="token comment">//事件值</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      upload<span class="token operator">:</span><span class="token punctuation">{</span> <span class="token comment">//上传组件</span>
        url<span class="token operator">:</span><span class="token string">'http://manage.ybt2023.com/Home/TestUpload'</span><span class="token punctuation">,</span><span class="token comment">//默认上传地址</span>
        data<span class="token operator">:</span><span class="token string">'UploadInfo'</span><span class="token punctuation">,</span><span class="token comment">//上传完成数据返回在api接口中的data中</span>
        data_path<span class="token operator">:</span><span class="token string">'ResourcePath'</span><span class="token punctuation">,</span><span class="token comment">//上传完返回地址</span>
        data_md5<span class="token operator">:</span><span class="token string">'Md5Value'</span><span class="token punctuation">,</span><span class="token comment">//上传完返回md5</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      menu<span class="token operator">:</span><span class="token punctuation">{</span> <span class="token comment">//菜单：导航菜单、工具栏菜单、右键菜单</span>
        id<span class="token operator">:</span><span class="token string">'MenuID'</span><span class="token punctuation">,</span><span class="token comment">//菜单ID</span>
        name<span class="token operator">:</span><span class="token string">'MenuName'</span><span class="token punctuation">,</span><span class="token comment">//菜单名称</span>
        action<span class="token operator">:</span><span class="token string">'ActionType'</span><span class="token punctuation">,</span><span class="token comment">//菜单动作类型:保存、新增、修改、删除</span>
        icon<span class="token operator">:</span><span class="token string">'ImageUrl'</span><span class="token punctuation">,</span><span class="token comment">//菜单图标</span>
        buttonColor<span class="token operator">:</span><span class="token string">'ButtonColor'</span><span class="token punctuation">,</span><span class="token comment">//按钮颜色</span>
        buttonType<span class="token operator">:</span><span class="token string">'ButtonType'</span><span class="token punctuation">,</span><span class="token comment">//按钮类型：跳转、保存、查询、导入导出</span>
        group<span class="token operator">:</span><span class="token string">'Fold'</span><span class="token punctuation">,</span><span class="token comment">//组名</span>
        url<span class="token operator">:</span><span class="token string">'TargetUrl'</span><span class="token punctuation">,</span><span class="token comment">//菜单地址</span>
        areaName<span class="token operator">:</span><span class="token string">'AreaName'</span><span class="token punctuation">,</span><span class="token comment">//区域名称</span>
        controllerName<span class="token operator">:</span><span class="token string">'ControllerName'</span><span class="token punctuation">,</span><span class="token comment">//控制器名称</span>
        actionName<span class="token operator">:</span><span class="token string">'ActionName'</span><span class="token punctuation">,</span><span class="token comment">//动作名称</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      table<span class="token operator">:</span><span class="token punctuation">{</span> <span class="token comment">//表格</span>
          menu<span class="token operator">:</span><span class="token string">'PowerMenu'</span><span class="token punctuation">,</span> <span class="token comment">//右键菜单字段</span>
          avgDay<span class="token operator">:</span><span class="token string">'DayCount'</span><span class="token punctuation">,</span><span class="token comment">//所选时间段天数，用来做平均使用，一般不配置</span>
          page<span class="token operator">:</span><span class="token punctuation">{</span> <span class="token comment">//分页</span>
            data<span class="token operator">:</span><span class="token string">"Data"</span><span class="token punctuation">,</span><span class="token comment">//数据</span>
            pageSize<span class="token operator">:</span><span class="token string">'PageSize'</span><span class="token punctuation">,</span><span class="token comment">//页大小</span>
            currentPage<span class="token operator">:</span><span class="token string">'PageIndex'</span><span class="token punctuation">,</span><span class="token comment">//当前页</span>
            total<span class="token operator">:</span><span class="token string">'RecordCountInt'</span><span class="token punctuation">,</span><span class="token comment">//总数</span>
            pageCount<span class="token operator">:</span><span class="token string">'PageCount'</span><span class="token comment">//页数</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


