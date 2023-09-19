export const data = JSON.parse("{\"key\":\"v-19d854d8\",\"path\":\"/demo/test.html\",\"title\":\"测试页面\",\"lang\":\"zh-CN\",\"frontmatter\":{\"navbar\":false,\"sidebar\":false,\"breadcrumb\":false,\"author\":false,\"title\":\"测试页面\",\"description\":\"这是一个测试页面 :::vuefile-demo test/base :::\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/element-less/demo/test.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Element-Less\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"测试页面\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"这是一个测试页面 :::vuefile-demo test/base :::\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"测试页面\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.08,\"words\":24},\"filePathRelative\":\"demo/test.md\",\"autoDesc\":true,\"excerpt\":\"\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
