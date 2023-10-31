---
layout: home

title: Element-Less
titleTemplate: 代码量减少50%+

hero:
  name: Element-Less
  text: 代码量减少50%+
  tagline: 为开发提供更轻便的组件库
  image:
    src: /logo-with-shadow.png
    alt: Vite
  actions:
    - theme: brand
      text: 开始
      link: /guide/
    - theme: alt
      text: 演示
      link: /guide/why
    - theme: alt
      text: 组件
      link: https://github.com/vitejs/vite

features:
  - icon: 💡
    title: 更少的代码
    details: 合并表单组件，Form下默认嵌套Form-Item组件
  - icon: ⚡️
    title: 数据添加接口请求
    details: 只许传入接口地址，不用再去手动调用接口赋值
  - icon: 🛠️
    title: 支持扁平化数据
    details: 树组件支持扁平化数据，不再为结构复杂而烦扰
  - icon: 📦
    title: 表单验证统一化
    details: 无论页面有多少个表单，只需一个方法便可全验证
  - icon: 🔩
    title: 轻松合并行列、自定义统计
    details: Table列中只需定义一个属性，就能实现合并及统计
  - icon: 🔑
    title: 更多
    details: 还有更多的功能请看具体组件使用
---
<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
