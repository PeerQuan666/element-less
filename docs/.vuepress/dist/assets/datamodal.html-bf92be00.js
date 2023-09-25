import{_ as e,r as o,o as E,c as C,a as r,b as t,w as p,d as s,e as a}from"./app-964ac5c8.js";const l={},D=s("p",null,"弹出窗口中选择数据",-1),c=s("h2",{id:"基础用法",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#基础用法","aria-hidden":"true"},"#"),a(" 基础用法")],-1),F=s("p",null,"dataModal/base",-1),k=s("h2",{id:"弹出新页面选择数据",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#弹出新页面选择数据","aria-hidden":"true"},"#"),a(" 弹出新页面选择数据")],-1),i=s("div",{class:"hint-container tip"},[s("p",{class:"hint-container-title"},"提示"),s("p",null,[a("组件创建完默认会注册一个事件，通过url传递参数"),s("code",null,"Transfer_SelectTagID"),s("br"),a(" 然后通过调用"),s("code",null,"window.parent[Transfer_SelectTagID]"),a("事件来返回参数")])],-1),u=s("p",null,"dataModal/target",-1);function d(A,m){const n=o("VpDemo");return E(),C("div",null,[D,r(" more "),c,t(n,{source:"%3Cpre%20v-pre%3E%3Ccode%3E%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3Eels%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Edata%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Emodal%20v%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Emodel%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22selectValue%22%3C%2Fspan%3E%20title%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22%E9%80%89%E6%8B%A9%E6%95%B0%E6%8D%AE%22%3C%2Fspan%3E%20width%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%2230%25%22%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3Econfirm%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22handleConfim%22%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3Eels%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Eform%20v%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Emodel%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22editData%22%3C%2Fspan%3E%20ref%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22editForm%22%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3Eels%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Einput%20prop%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22input1%22%3C%2Fspan%3E%20label%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22%E5%BC%80%E5%A7%8B%22%3C%2Fspan%3E%20required%20width%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22200%22%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%2F%3C%2Fspan%3Eels%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Einput%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3Eels%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Einput%20prop%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22input2%22%3C%2Fspan%3E%20label%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22%E7%BB%93%E6%9D%9F%22%3C%2Fspan%3E%20width%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22200%22%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%2F%3C%2Fspan%3Eels%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Einput%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%2F%3C%2Fspan%3Eels%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Eform%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%2F%3C%2Fspan%3Eels%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Edata%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Emodal%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%2F%3C%2Fspan%3Etemplate%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%0D%0A%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3Escript%20setup%20lang%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22ts%22%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20ref%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20reactive%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'vue'%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20selectValue%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3Eref%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E''%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20editData%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3Ereactive%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0D%0A%20%20%20%20input1%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E''%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0D%0A%20%20%20%20input2%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E''%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20editForm%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3Eref%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Efunction%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3EhandleConfim%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0D%0A%20%20%20%20%3Cspan%20class%3D%22token%20keyword%22%3Ereturn%3C%2Fspan%3E%20editForm%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3Evalue%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3Evalidate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3Ethen%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3Eres%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20keyword%22%3Eif%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3Eres%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20selectValue%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3Evalue%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20editData%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3Einput1%20%3Cspan%20class%3D%22token%20operator%22%3E%2B%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'-'%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%2B%3C%2Fspan%3E%20editData%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3Einput2%0D%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20keyword%22%3Ereturn%3C%2Fspan%3E%20res%0D%0A%20%20%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%2F%3C%2Fspan%3Escript%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",path:"dataModal/base","raw-source":"%3Ctemplate%3E%0D%0A%20%20%20%20%3Cels-data-modal%20v-model%3D%22selectValue%22%20title%3D%22%E9%80%89%E6%8B%A9%E6%95%B0%E6%8D%AE%22%20width%3D%2230%25%22%20%3Aconfirm%3D%22handleConfim%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Cels-form%20v-model%3D%22editData%22%20ref%3D%22editForm%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cels-input%20prop%3D%22input1%22%20label%3D%22%E5%BC%80%E5%A7%8B%22%20required%20width%3D%22200%22%3E%3C%2Fels-input%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cels-input%20prop%3D%22input2%22%20label%3D%22%E7%BB%93%E6%9D%9F%22%20width%3D%22200%22%3E%3C%2Fels-input%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fels-form%3E%0D%0A%20%20%20%20%3C%2Fels-data-modal%3E%0D%0A%3C%2Ftemplate%3E%0D%0A%0D%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0D%0Aimport%20%7B%20ref%2C%20reactive%20%7D%20from%20'vue'%0D%0Aconst%20selectValue%20%3D%20ref('')%0D%0Aconst%20editData%20%3D%20reactive(%7B%0D%0A%20%20%20%20input1%3A%20''%2C%0D%0A%20%20%20%20input2%3A%20''%0D%0A%7D)%0D%0Aconst%20editForm%20%3D%20ref()%0D%0Afunction%20handleConfim()%20%7B%0D%0A%20%20%20%20return%20editForm.value.validate().then(res%20%3D%3E%20%7B%0D%0A%20%20%20%20%20%20%20%20if%20(res)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20selectValue.value%20%3D%20editData.input1%20%2B%20'-'%20%2B%20editData.input2%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20return%20res%0D%0A%20%20%20%20%7D)%0D%0A%7D%0D%0A%3C%2Fscript%3E",description:""},{default:p(()=>[F]),_:1}),k,i,t(n,{source:"%3Cpre%20v-pre%3E%3Ccode%3E%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3Eels%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Edata%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Emodal%20v%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Emodel%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22selectValue%22%3C%2Fspan%3E%20title%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22%E6%96%B0%E9%A1%B5%E9%9D%A2%E9%80%89%E6%8B%A9%E6%95%B0%E6%8D%AE%22%3C%2Fspan%3E%20valueField%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22value%22%3C%2Fspan%3E%20labelField%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22key%22%3C%2Fspan%3E%20width%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%2250%25%22%3C%2Fspan%3E%20url%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22%2Felement-less%2Ftest%2Ftest.html%22%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%2F%3C%2Fspan%3Eels%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Edata%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Emodal%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%2F%3C%2Fspan%3Etemplate%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%0D%0A%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3Escript%20setup%20lang%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22ts%22%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20ref%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'vue'%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20selectValue%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3Eref%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E''%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%2F%3C%2Fspan%3Escript%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",path:"dataModal/target","raw-source":"%3Ctemplate%3E%0D%0A%20%20%20%20%3Cels-data-modal%20v-model%3D%22selectValue%22%20title%3D%22%E6%96%B0%E9%A1%B5%E9%9D%A2%E9%80%89%E6%8B%A9%E6%95%B0%E6%8D%AE%22%20valueField%3D%22value%22%20labelField%3D%22key%22%20width%3D%2250%25%22%20url%3D%22%2Felement-less%2Ftest%2Ftest.html%22%3E%0D%0A%20%20%20%20%3C%2Fels-data-modal%3E%0D%0A%3C%2Ftemplate%3E%0D%0A%0D%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0D%0Aimport%20%7B%20ref%20%7D%20from%20'vue'%0D%0Aconst%20selectValue%20%3D%20ref('')%0D%0A%3C%2Fscript%3E",description:""},{default:p(()=>[u]),_:1})])}const f=e(l,[["render",d],["__file","datamodal.html.vue"]]);export{f as default};
