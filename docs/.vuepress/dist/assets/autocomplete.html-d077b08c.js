import{_ as e,r as o,o as E,c as C,a as c,b as t,w as p,d as s,e as a}from"./app-56a85cdb.js";const l={},r=s("p",null,"根据输入内容提供对应的输入建议。",-1),D=s("h2",{id:"基础用法",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#基础用法","aria-hidden":"true"},"#"),a(" 基础用法")],-1),F=s("div",{class:"hint-container tip"},[s("p",{class:"hint-container-title"},"提示"),s("p",null,[a("设置"),s("code",null,"data"),a("、"),s("code",null,"value-field")])],-1),k=s("p",null,"autocomplete/base",-1),u=s("h2",{id:"接口数据",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#接口数据","aria-hidden":"true"},"#"),a(" 接口数据")],-1),i=s("div",{class:"hint-container tip"},[s("p",{class:"hint-container-title"},"提示"),s("p",null,[a("设置"),s("code",null,"url"),a("、"),s("code",null,"value-field")])],-1),A=s("p",null,"autocomplete/api",-1);function d(m,B){const n=o("VpDemo");return E(),C("div",null,[r,c(" more "),D,F,t(n,{source:"%3Cpre%20v-pre%3E%3Ccode%3E%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3Eels%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Eautocomplete%20v%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Emodel%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22selectValue%22%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3Edata%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22data%22%3C%2Fspan%3E%20value%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Efield%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22key%22%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%2F%3C%2Fspan%3Eels%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Eautocomplete%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%2F%3C%2Fspan%3Etemplate%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%0D%0A%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3Escript%20setup%20lang%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22ts%22%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20ref%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3Ereactive%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'vue'%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20selectValue%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3Eref%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E''%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20data%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3Ereactive%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%5B%3C%2Fspan%3E%0D%0A%20%20%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20key%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%E5%8C%97%E4%BA%AC'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20value%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E1%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20group%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%E5%88%86%E7%BB%841'%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%0D%0A%20%20%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20key%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%E5%A4%A9%E6%B4%A5'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20value%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E2%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20group%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%E5%88%86%E7%BB%841'%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%0D%0A%20%20%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20key%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%E7%A6%8F%E5%B7%9E'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20value%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E3%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20group%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%E5%88%86%E7%BB%842'%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%0D%0A%20%20%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20key%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%E5%8E%A6%E9%97%A8'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20value%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E4%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20group%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%E5%88%86%E7%BB%842'%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%0D%0A%20%20%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%5D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%2F%3C%2Fspan%3Escript%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",path:"autocomplete/base","raw-source":"%3Ctemplate%3E%0D%0A%20%20%20%20%3Cels-autocomplete%20v-model%3D%22selectValue%22%20%3Adata%3D%22data%22%20value-field%3D%22key%22%3E%3C%2Fels-autocomplete%3E%0D%0A%3C%2Ftemplate%3E%0D%0A%0D%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0D%0Aimport%20%7B%20ref%20%2Creactive%7D%20from%20'vue'%0D%0Aconst%20selectValue%20%3D%20ref('')%0D%0Aconst%20data%20%3D%20reactive(%5B%0D%0A%20%20%20%20%7B%20key%3A%20'%E5%8C%97%E4%BA%AC'%2C%20value%3A%201%2C%20group%3A%20'%E5%88%86%E7%BB%841'%20%7D%2C%20%0D%0A%20%20%20%20%7B%20key%3A%20'%E5%A4%A9%E6%B4%A5'%2C%20value%3A%202%2C%20group%3A%20'%E5%88%86%E7%BB%841'%20%7D%2C%20%0D%0A%20%20%20%20%7B%20key%3A%20'%E7%A6%8F%E5%B7%9E'%2C%20value%3A%203%2C%20group%3A%20'%E5%88%86%E7%BB%842'%20%7D%2C%20%0D%0A%20%20%20%20%7B%20key%3A%20'%E5%8E%A6%E9%97%A8'%2C%20value%3A%204%2C%20group%3A%20'%E5%88%86%E7%BB%842'%20%7D%0D%0A%20%20%20%20%5D)%0D%0A%3C%2Fscript%3E",description:""},{default:p(()=>[k]),_:1}),u,i,t(n,{source:"%3Cpre%20v-pre%3E%3Ccode%3E%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3Eels%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Eautocomplete%20v%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Emodel%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22selectValue%22%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3Eurl%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22apiUrl%22%3C%2Fspan%3E%20value%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Efield%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22Name%22%3C%2Fspan%3E%20width%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22300%22%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%2F%3C%2Fspan%3Eels%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3Eautocomplete%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%2F%3C%2Fspan%3Etemplate%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%0D%0A%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3Escript%20setup%20lang%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22ts%22%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20ref%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'vue'%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20selectValue%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3Eref%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E''%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20apiUrl%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'http%3A%2F%2Fmanage.ybt2023.com%2Fhome%2Ftest2'%3C%2Fspan%3E%0D%0A%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%2F%3C%2Fspan%3Escript%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",path:"autocomplete/api","raw-source":"%3Ctemplate%3E%0D%0A%20%20%20%20%3Cels-autocomplete%20v-model%3D%22selectValue%22%20%3Aurl%3D%22apiUrl%22%20value-field%3D%22Name%22%20width%3D%22300%22%3E%3C%2Fels-autocomplete%3E%0D%0A%3C%2Ftemplate%3E%0D%0A%0D%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0D%0Aimport%20%7B%20ref%20%7D%20from%20'vue'%0D%0Aconst%20selectValue%20%3D%20ref('')%0D%0Aconst%20apiUrl%20%3D%20'http%3A%2F%2Fmanage.ybt2023.com%2Fhome%2Ftest2'%0D%0A%3C%2Fscript%3E",description:""},{default:p(()=>[A]),_:1})])}const h=e(l,[["render",d],["__file","autocomplete.html.vue"]]);export{h as default};
