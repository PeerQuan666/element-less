export const data = JSON.parse("{\"key\":\"v-15554e84\",\"path\":\"/test/\",\"title\":\"Test\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Test\",\"article\":false,\"feed\":false,\"sitemap\":false,\"description\":\"\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/element-less/test/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Element-Less\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Test\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"PeerQuan\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Test\\\"}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":1},\"filePathRelative\":null,\"autoDesc\":true,\"excerpt\":\"\"}")

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
