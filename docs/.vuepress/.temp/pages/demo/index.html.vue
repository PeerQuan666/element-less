<template><div><div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>当前所有基于ElementUI的封装的组件支持所有原生属性</p>
</div>
<div class="hint-container tip">
<p class="hint-container-title">全局配置</p>
<p>使用前请设置全局配置、将页面放置在<code>els-container</code>中、包含默认查询、验证、导出功能。</p>
</div>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>  app<span class="token punctuation">.</span>config<span class="token punctuation">.</span>globalProperties<span class="token punctuation">.</span>$lessConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
      api<span class="token operator">:</span><span class="token punctuation">{</span> <span class="token comment">//api接口返回结构</span>
        code<span class="token operator">:</span><span class="token string">'ResultCode'</span><span class="token punctuation">,</span><span class="token comment">//接口返回状态码</span>
        message<span class="token operator">:</span><span class="token string">'ResultMessage'</span><span class="token punctuation">,</span><span class="token comment">//接口返回说明</span>
        data<span class="token operator">:</span><span class="token string">'Data'</span><span class="token punctuation">,</span><span class="token comment">//接口返回数据</span>
        successCode<span class="token operator">:</span><span class="token string">'0'</span><span class="token comment">//状态码成功值</span>
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
        action<span class="token operator">:</span><span class="token string">'ActionName'</span><span class="token punctuation">,</span><span class="token comment">//菜单动作名称</span>
        actionType<span class="token operator">:</span><span class="token string">'ActionType'</span><span class="token punctuation">,</span><span class="token comment">//菜单动作类型：保存、新增、修改、删除</span>
        icon<span class="token operator">:</span><span class="token string">'ImageUrl'</span><span class="token punctuation">,</span><span class="token comment">//菜单图标</span>
        buttonColor<span class="token operator">:</span><span class="token string">'ButtonColor'</span><span class="token punctuation">,</span><span class="token comment">//按钮颜色</span>
        buttonType<span class="token operator">:</span><span class="token string">'ButtonType'</span><span class="token punctuation">,</span><span class="token comment">//按钮类型：跳转、保存、查询、导入导出</span>
        group<span class="token operator">:</span><span class="token string">'Fold'</span><span class="token comment">//组名</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2>
<ul>
<li>
<p><RouterLink to="/demo/layout.html">Layout布局</RouterLink></p>
</li>
<li>
<p><RouterLink to="/demo/form.html">Form表单</RouterLink></p>
</li>
<li>
<p><RouterLink to="/demo/input.html">Input输入框</RouterLink></p>
</li>
<li>
<p><RouterLink to="/demo/select.html">Select选择器</RouterLink></p>
</li>
<li>
<p><RouterLink to="/demo/checkbox.html">Checkbox多选</RouterLink></p>
</li>
<li>
<p><RouterLink to="/demo/radio.html">Radio单选</RouterLink></p>
</li>
<li>
<p><RouterLink to="/demo/datamodal.html">DataModal弹窗选择</RouterLink></p>
</li>
<li>
<p><RouterLink to="/demo/autocomplete.html">Autocomplete</RouterLink></p>
</li>
<li>
<p><RouterLink to="/demo/date-picker.html">DatePicker日期选择器</RouterLink></p>
</li>
<li>
<p><RouterLink to="/demo/list.html">List遍历组件</RouterLink></p>
</li>
<li>
<p><RouterLink to="/demo/tip.html">Tip提示</RouterLink></p>
</li>
<li>
<p><RouterLink to="/demo/table.html">Table表格</RouterLink></p>
</li>
<li>
<p><RouterLink to="/demo/menu.html">Menu 导航菜单</RouterLink></p>
</li>
<li>
<p><RouterLink to="/demo/menu-tool.html">Menu 页面菜单</RouterLink></p>
</li>
</ul>
</div></template>


